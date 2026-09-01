import { describe, expect, it, vi } from 'vitest';

import { createStartupCoordinatorForTests } from '../../../src/bootstrap/startup';
import type {
  CompatibilityCheckResult,
  CompatibilityReport,
} from '../../../src/platform/compatibility';
import type { SanitizedDiagnostic } from '../../../src/bootstrap/diagnostics';

type Dependencies = Parameters<typeof createStartupCoordinatorForTests>[0];

const report = (overall: CompatibilityReport['overall']): CompatibilityReport =>
  Object.freeze({
    schemaVersion: 1,
    overall,
    capabilities: Object.freeze([
      { id: 'esModules', required: true, status: 'ready', reasonCode: null },
      {
        id: 'webgl2',
        required: true,
        status: overall === 'blocked' ? 'unavailable' : 'ready',
        reasonCode: overall === 'blocked' ? 'WEBGL2_UNAVAILABLE' : null,
      },
      { id: 'indexedDb', required: true, status: 'ready', reasonCode: null },
      { id: 'webAudio', required: true, status: 'ready', reasonCode: null },
      { id: 'pointerLock', required: true, status: 'ready', reasonCode: null },
      {
        id: 'controller',
        required: false,
        status: overall === 'degraded' ? 'unavailable' : 'ready',
        reasonCode: overall === 'degraded' ? 'CONTROLLER_UNAVAILABLE' : null,
      },
    ] satisfies CompatibilityReport['capabilities']),
  });

const diagnostic: SanitizedDiagnostic = Object.freeze({
  record: Object.freeze({
    schemaVersion: 1,
    code: 'MRD1-BOOTSTRAP-UNEXPECTED',
    severity: 'fatal',
    phase: 'startup',
    module: 'BOOTSTRAP',
    operation: 'START_BOOTSTRAP',
    buildVersion: '0.0.0',
    contentVersion: null,
    graphicsProfile: null,
    capabilities: null,
    contextCodes: Object.freeze(['STARTUP_INTERRUPTED'] as const),
    recoveryActions: Object.freeze(['reloadPage'] as const),
  }),
  copyForm: '{}',
});

const dependencies = (overrides: Partial<Dependencies> = {}): Dependencies => ({
  checkCompatibility: () => Promise.resolve({ kind: 'complete', report: report('supported') }),
  cancelCompatibilityCheck: () => Promise.resolve(),
  showChecking: vi.fn(),
  showReady: vi.fn(),
  showBlocked: vi.fn(),
  showFatal: vi.fn(),
  createUnexpectedDiagnostic: () => diagnostic,
  addErrorListener: () => () => undefined,
  ...overrides,
});

const settle = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 0));
};

describe('Step-2 startup coordinator', () => {
  it.each(['supported', 'degraded'] as const)(
    'shows Checking browser before the factual %s Ready result',
    async (overall) => {
      const events: string[] = [];
      const testDependencies = dependencies({
        checkCompatibility: () => {
          events.push('check');
          return Promise.resolve({ kind: 'complete', report: report(overall) });
        },
        showChecking: () => events.push('checking'),
        showReady: () => events.push('ready'),
      });

      createStartupCoordinatorForTests(testDependencies).start();
      expect(events).toEqual(['checking', 'check']);
      await settle();
      expect(events).toEqual(['checking', 'check', 'ready']);
      expect(testDependencies.showBlocked).not.toHaveBeenCalled();
    },
  );

  it('shows one blocked result and performs a complete retry only after activation', async () => {
    const results: CompatibilityCheckResult[] = [
      { kind: 'complete', report: report('blocked') },
      { kind: 'complete', report: report('supported') },
    ];
    let retry: (() => void) | undefined;
    const showReady = vi.fn();
    const testDependencies = dependencies({
      checkCompatibility: () => Promise.resolve(results.shift() ?? { kind: 'cancelled' }),
      showBlocked: (_report, action) => {
        retry = action;
      },
      showReady,
    });

    createStartupCoordinatorForTests(testDependencies).start();
    await settle();
    expect(retry).toBeTypeOf('function');
    expect(showReady).not.toHaveBeenCalled();
    retry?.();
    await settle();
    expect(testDependencies.showChecking).toHaveBeenCalledTimes(2);
    expect(showReady).toHaveBeenCalledOnce();
  });

  it('uses the safe fatal presentation for unexpected startup failure', async () => {
    const raw = new Error('private raw test error');
    const create = vi.fn(() => diagnostic);
    const showFatal = vi.fn();
    const testDependencies = dependencies({
      checkCompatibility: () => Promise.reject(raw),
      createUnexpectedDiagnostic: create,
      showFatal,
    });

    createStartupCoordinatorForTests(testDependencies).start();
    await settle();

    expect(create).toHaveBeenCalledWith(raw);
    expect(showFatal).toHaveBeenCalledWith(diagnostic);
    expect(testDependencies.showReady).not.toHaveBeenCalled();
  });

  it('installs and removes the early fatal boundary and cancels once on repeated stop', async () => {
    const remove = vi.fn();
    const cancel = vi.fn(() => Promise.resolve());
    const add = vi.fn(() => remove);
    const testDependencies = dependencies({
      addErrorListener: add,
      cancelCompatibilityCheck: cancel,
    });

    const handle = createStartupCoordinatorForTests(testDependencies).start();
    await handle.stop();
    await handle.stop();

    expect(add).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledOnce();
    expect(cancel).toHaveBeenCalledOnce();
  });
});
