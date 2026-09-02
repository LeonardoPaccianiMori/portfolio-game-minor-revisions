import { describe, expect, it, vi } from 'vitest';

import { createApplicationBootstrapForTests } from '../../../src/bootstrap';
import type { ApplicationController, ApplicationOperationResult } from '../../../src/application';
import { createApplicationFakes } from './application-fakes';

const result = (value: ApplicationOperationResult) => Promise.resolve(value);

describe('Step-3 application bootstrap ownership', () => {
  it('creates inactive dependencies, transfers them after controller creation, and starts once', async () => {
    const fake = createApplicationFakes();
    const events: string[] = [];
    const controller = {
      start: () => {
        events.push('controller:start');
        return result({ kind: 'success' });
      },
    } as ApplicationController;
    const bootstrap = createApplicationBootstrapForTests({
      createDependencies: () => {
        events.push('dependencies:create');
        return fake.dependencies;
      },
      createController: (dependencies, content) => {
        events.push('controller:create');
        expect(dependencies).toBe(fake.dependencies);
        expect(content).toEqual({ kind: 'temporaryNoContent' });
        return controller;
      },
    });

    await expect(bootstrap.start()).resolves.toBe(controller);
    expect(events).toEqual(['dependencies:create', 'controller:create', 'controller:start']);
    expect(fake.calls).toEqual([]);
  });

  it('does not start or clean inactive dependencies when controller creation fails', async () => {
    const fake = createApplicationFakes();
    const bootstrap = createApplicationBootstrapForTests({
      createDependencies: () => fake.dependencies,
      createController: () => {
        throw new Error('Controlled creation failure.');
      },
    });

    await expect(bootstrap.start()).rejects.toThrow(/creation failure/u);
    expect(fake.calls).toEqual([]);
  });

  it('reports a typed controller startup failure without starting it a second time', async () => {
    const fake = createApplicationFakes();
    const start = vi.fn(() =>
      result({
        kind: 'failure',
        fault: {
          code: 'MR-APPLICATION-UNEXPECTED',
          operation: 'start',
          severity: 'fatal',
        },
      }),
    );
    const controller = { start } as unknown as ApplicationController;
    const bootstrap = createApplicationBootstrapForTests({
      createDependencies: () => fake.dependencies,
      createController: () => controller,
    });

    await expect(bootstrap.start()).rejects.toMatchObject({
      fault: { operation: 'start' },
    });
    expect(start).toHaveBeenCalledOnce();
  });
});
