import { describe, expect, it } from 'vitest';

import { createApplication, type ApplicationRequest } from '../../../src/application';
import { createApplicationFakes, deferred } from './application-fakes';

const request: ApplicationRequest = Object.freeze({
  kind: 'settingsOrLocalData',
  action: 'clearSavedData',
});

const startupOrder = [
  'platform:start',
  'persistence:start',
  'interaction:start',
  'player:start',
  'world:start',
  'rendering:start',
  'ui:start',
  'audio:start',
  'cutscenes:start',
  'timing:start',
  'input:start',
];

const stopOrder = [
  'input:stop',
  'timing:stop',
  'cutscenes:stop',
  'audio:stop',
  'ui:stop',
  'rendering:stop',
  'world:stop',
  'player:stop',
  'interaction:stop',
  'persistence:stop',
  'platform:stop',
];

describe('Step-3 application controller', () => {
  it('starts exactly once in order and reaches one ready frame loop', async () => {
    const fake = createApplicationFakes();
    const application = createApplication(fake.dependencies, { kind: 'temporaryNoContent' });

    expect(application.getStatus()).toEqual({
      lifecycle: 'new',
      acceptsRequests: false,
      frameLoopActive: false,
    });
    await expect(application.start()).resolves.toEqual({ kind: 'success' });
    await expect(application.start()).resolves.toEqual({ kind: 'success' });
    expect(fake.calls).toEqual(startupOrder);
    expect(application.getStatus()).toEqual({
      lifecycle: 'ready',
      acceptsRequests: true,
      frameLoopActive: true,
    });
  });

  it('cleans a partial startup locally and completed owners in reverse order', async () => {
    const fake = createApplicationFakes({ failOn: new Set(['world:start']) });
    const application = createApplication(fake.dependencies, { kind: 'temporaryNoContent' });

    await expect(application.start()).resolves.toMatchObject({
      kind: 'failure',
      fault: { operation: 'start', severity: 'fatal' },
    });
    expect(fake.calls).toEqual([
      'platform:start',
      'persistence:start',
      'interaction:start',
      'player:start',
      'world:start',
      'world:partial-stop',
      'player:stop',
      'interaction:stop',
      'persistence:stop',
      'platform:stop',
    ]);
    expect(application.getStatus().lifecycle).toBe('failed');
    await expect(application.start()).resolves.toEqual({
      kind: 'unavailable',
      reason: 'notRestartable',
    });
  });

  it('stops input and timing first, reverses ownership, and repeats harmlessly', async () => {
    const fake = createApplicationFakes();
    const application = createApplication(fake.dependencies, { kind: 'temporaryNoContent' });
    await application.start();
    fake.calls.splice(0);

    await expect(application.stop()).resolves.toEqual({ kind: 'success' });
    await expect(application.stop()).resolves.toEqual({ kind: 'success' });
    expect(fake.calls).toEqual(stopOrder);
    expect(application.getStatus()).toEqual({
      lifecycle: 'stopped',
      acceptsRequests: false,
      frameLoopActive: false,
    });
    await expect(application.start()).resolves.toEqual({
      kind: 'unavailable',
      reason: 'notRestartable',
    });
  });

  it('completes concurrent requests and their asynchronous work in strict order', async () => {
    const first = deferred();
    const second = deferred();
    let call = 0;
    const fake = createApplicationFakes({
      clearSavedData: () => (++call === 1 ? first.promise : second.promise),
    });
    const application = createApplication(fake.dependencies, { kind: 'temporaryNoContent' });
    await application.start();
    fake.calls.splice(0);

    const firstResult = application.submit(request);
    const secondResult = application.submit(request);
    await Promise.resolve();
    expect(fake.calls).toEqual(['persistence:clear']);
    first.resolve();
    await expect(firstResult).resolves.toEqual({ kind: 'success' });
    await Promise.resolve();
    expect(fake.calls).toEqual(['persistence:clear', 'persistence:clear']);
    second.resolve();
    await expect(secondResult).resolves.toEqual({ kind: 'success' });
  });

  it('keeps stable visual frames active while queued work is pending', async () => {
    const pending = deferred();
    const fake = createApplicationFakes({ clearSavedData: () => pending.promise });
    const application = createApplication(fake.dependencies, { kind: 'temporaryNoContent' });
    await application.start();
    const operation = application.submit(request);
    await Promise.resolve();
    fake.calls.splice(0);

    fake.runFrame();
    expect(fake.calls).toEqual([
      'input:frame',
      'cutscenes:frame',
      'world:movement',
      'player:frame',
      'world:frame',
      'world:interaction',
      'interaction:frame',
      'audio:frame',
      'ui:frame',
      'rendering:frame',
    ]);
    pending.resolve();
    await operation;
  });

  it('blocks new requests and stops input and timing before pending work settles', async () => {
    const pending = deferred();
    const fake = createApplicationFakes({ clearSavedData: () => pending.promise });
    const application = createApplication(fake.dependencies, { kind: 'temporaryNoContent' });
    await application.start();
    fake.calls.splice(0);

    const operation = application.submit(request);
    await Promise.resolve();
    const stopping = application.stop();
    await expect(application.submit(request)).resolves.toEqual({
      kind: 'unavailable',
      reason: 'notReady',
    });
    expect(fake.calls).toEqual(['persistence:clear', 'input:stop', 'timing:stop']);

    pending.resolve();
    await expect(operation).resolves.toEqual({ kind: 'success' });
    await expect(stopping).resolves.toEqual({ kind: 'success' });
  });

  it('converts an unexpected queued exception to a fatal typed result and safe cleanup', async () => {
    const fake = createApplicationFakes({
      clearSavedData: () => Promise.reject(new Error('Controlled request failure.')),
    });
    const application = createApplication(fake.dependencies, { kind: 'temporaryNoContent' });
    await application.start();
    fake.calls.splice(0);

    await expect(application.submit(request)).resolves.toMatchObject({
      kind: 'failure',
      fault: { code: 'MR-APPLICATION-UNEXPECTED', operation: 'request' },
    });
    await application.stop();
    expect(fake.calls.slice(0, 3)).toEqual(['persistence:clear', 'input:stop', 'timing:stop']);
    expect(application.getStatus().lifecycle).toBe('failed');
    await expect(application.submit(request)).resolves.toEqual({
      kind: 'unavailable',
      reason: 'notReady',
    });
  });

  it('converts an unexpected frame exception and stops input and timing', async () => {
    const fake = createApplicationFakes({ failOn: new Set(['rendering:frame']) });
    const application = createApplication(fake.dependencies, { kind: 'temporaryNoContent' });
    await application.start();
    fake.calls.splice(0);

    fake.runFrame();
    expect(application.getStatus().lifecycle).toBe('failed');
    await application.stop();
    expect(fake.calls).toContain('rendering:frame');
    expect(fake.calls.indexOf('input:stop')).toBeLessThan(fake.calls.indexOf('timing:stop'));
  });

  it('pauses and resumes the controlled loop through the visibility port', async () => {
    const fake = createApplicationFakes();
    const application = createApplication(fake.dependencies, { kind: 'temporaryNoContent' });
    await application.start();
    fake.calls.splice(0);

    fake.setVisible(false);
    fake.setVisible(true);
    expect(fake.calls).toEqual(['timing:pause', 'timing:resume']);
  });

  it('continues reverse cleanup and returns a typed stop fault after a port exception', async () => {
    const fake = createApplicationFakes({ failOn: new Set(['ui:stop']) });
    const application = createApplication(fake.dependencies, { kind: 'temporaryNoContent' });
    await application.start();
    fake.calls.splice(0);

    await expect(application.stop()).resolves.toMatchObject({
      kind: 'failure',
      fault: { operation: 'stop', severity: 'fatal' },
    });
    expect(fake.calls).toEqual(stopOrder);
    expect(application.getStatus().lifecycle).toBe('failed');
  });
});
