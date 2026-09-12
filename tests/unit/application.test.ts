import { describe, expect, it } from 'vitest';

import { createApplication } from '../../src/application/index.ts';
import type { ApplicationFault } from '../../src/application/index.ts';

const testFault: ApplicationFault = { code: 'test:fault', message: 'A test fault.' };

describe('application coordinator', () => {
  it('runs startup stages in order and starts the frame loop', async () => {
    const order: string[] = [];
    const frameLoop = {
      started: 0,
      stopped: 0,
      start() {
        this.started += 1;
      },
      stop() {
        this.stopped += 1;
      },
    };
    const application = createApplication({
      startup: [
        {
          name: 'first',
          run: () => {
            order.push('first');
            return null;
          },
        },
        {
          name: 'second',
          run: async () => {
            await Promise.resolve();
            order.push('second');
            return null;
          },
        },
      ],
      shutdown: [],
      frameLoop,
    });

    const outcome = await application.start();

    expect(order).toEqual(['first', 'second']);
    expect(outcome).toEqual({ status: 'ready', fault: null });
    expect(frameLoop.started).toBe(1);
    expect(application.isRunning()).toBe(true);

    await application.stop();

    expect(frameLoop.stopped).toBe(1);
    expect(application.isRunning()).toBe(false);
  });

  it('returns a stage fault and runs shutdown in reverse order', async () => {
    const order: string[] = [];
    const application = createApplication({
      startup: [
        {
          name: 'first',
          run: () => {
            order.push('start:first');
            return null;
          },
        },
        { name: 'second', run: () => testFault },
      ],
      shutdown: [
        {
          name: 'cleanup-a',
          run: () => {
            order.push('stop:cleanup-a');
            return null;
          },
        },
        {
          name: 'cleanup-b',
          run: () => {
            order.push('stop:cleanup-b');
            return null;
          },
        },
      ],
      frameLoop: {
        start: () => {
          order.push('loop:start');
        },
        stop: () => {
          order.push('loop:stop');
        },
      },
    });

    const outcome = await application.start();

    expect(outcome).toEqual({ status: 'failed', fault: testFault });
    expect(order).toEqual(['start:first', 'stop:cleanup-b', 'stop:cleanup-a']);
    expect(application.isRunning()).toBe(false);
  });

  it('sanitizes an unexpected startup error', async () => {
    const application = createApplication({
      startup: [
        {
          name: 'compatibility',
          run: () => {
            throw new Error('raw detail');
          },
        },
      ],
      shutdown: [],
      frameLoop: { start: () => undefined, stop: () => undefined },
    });

    const outcome = await application.start();

    expect(outcome.status).toBe('failed');
    expect(outcome.fault).toEqual({
      code: 'startup:compatibility',
      message: 'The game could not start.',
    });
  });

  it('runs startup once when called repeatedly', async () => {
    let runs = 0;
    const application = createApplication({
      startup: [
        {
          name: 'once',
          run: () => {
            runs += 1;
            return null;
          },
        },
      ],
      shutdown: [],
      frameLoop: { start: () => undefined, stop: () => undefined },
    });

    await Promise.all([application.start(), application.start()]);

    expect(runs).toBe(1);
  });

  it('keeps shutdown idempotent', async () => {
    let stops = 0;
    const application = createApplication({
      startup: [{ name: 'ok', run: () => null }],
      shutdown: [
        {
          name: 'cleanup',
          run: () => {
            stops += 1;
            return null;
          },
        },
      ],
      frameLoop: { start: () => undefined, stop: () => undefined },
    });

    await application.start();
    await application.stop();
    await application.stop();

    expect(stops).toBe(1);
  });
});
