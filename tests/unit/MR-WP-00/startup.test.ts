import { describe, expect, it, vi } from 'vitest';

import {
  bootstrapStartup,
  createStartupCoordinatorForTests,
  createStartupScreenForTests,
  installBrowserErrorBoundaryForTests,
  type SanitizedDiagnostic,
} from '../../../src/bootstrap';
import type { CompatibilityCheckResult, CompatibilityReport } from '../../../src/platform';
import type { ApplicationController } from '../../../src/application';

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
  startApplication: () => Promise.resolve(undefined),
  ...overrides,
});

const settle = async (): Promise<void> => {
  for (let index = 0; index < 32; index += 1) {
    await Promise.resolve();
  }
};

type ControlledEvent = Event & Readonly<Record<string, unknown>>;

const controlledEvent = (
  type: string,
  values: Readonly<Record<string, unknown>> = {},
): ControlledEvent => {
  const event = {
    type,
    defaultPrevented: false,
    preventDefault(): void {
      event.defaultPrevented = true;
    },
    ...values,
  };
  return event as unknown as ControlledEvent;
};

class ControlledEventTarget {
  private readonly listeners = new Map<string, Set<EventListenerOrEventListenerObject>>();

  public addEventListener(type: string, callback: EventListenerOrEventListenerObject | null): void {
    if (callback === null) {
      return;
    }
    const listeners = this.listeners.get(type) ?? new Set<EventListenerOrEventListenerObject>();
    listeners.add(callback);
    this.listeners.set(type, listeners);
  }

  public removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
  ): void {
    if (callback !== null) {
      this.listeners.get(type)?.delete(callback);
    }
  }

  public dispatchEvent(event: Event): boolean {
    for (const listener of [...(this.listeners.get(event.type) ?? [])]) {
      if (typeof listener === 'function') {
        listener(event);
      } else {
        listener.handleEvent(event);
      }
    }
    return !event.defaultPrevented;
  }
}

const deferred = <T>() => {
  let resolve: (value: T) => void = () => undefined;
  const promise = new Promise<T>((complete) => {
    resolve = complete;
  });
  return { promise, resolve };
};

class FakeElement {
  public readonly attributes = new Map<string, string>();
  public readonly children: (FakeElement | string)[] = [];
  public className = '';
  public focused = false;
  public textContent: string | null = null;
  public type = '';
  private readonly listeners = new Map<string, { listener: EventListener; once: boolean }[]>();

  public constructor(public readonly tagName: string) {}

  public addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    if (callback === null) {
      return;
    }
    const listener: EventListener =
      typeof callback === 'function' ? callback : (event) => callback.handleEvent(event);
    const once = typeof options === 'object' && options.once === true;
    const listeners = this.listeners.get(type) ?? [];
    listeners.push({ listener, once });
    this.listeners.set(type, listeners);
  }

  public append(...nodes: (FakeElement | string)[]): void {
    this.children.push(...nodes);
  }

  public click(): void {
    const listeners = [...(this.listeners.get('click') ?? [])];
    for (const item of listeners) {
      item.listener(controlledEvent('click'));
    }
    this.listeners.set(
      'click',
      listeners.filter((item) => !item.once),
    );
  }

  public focus(): void {
    this.focused = true;
  }

  public replaceChildren(...nodes: FakeElement[]): void {
    this.children.splice(0, this.children.length, ...nodes);
  }

  public setAttribute(name: string, value: string): void {
    this.attributes.set(name, value);
  }
}

const screenHarness = (copyText = vi.fn(() => Promise.resolve())) => {
  const root = new FakeElement('main');
  const elements: FakeElement[] = [];
  const startupDocument = {
    createElement: (tag: string) => {
      const created = new FakeElement(tag);
      elements.push(created);
      return created;
    },
  } as unknown as Pick<Document, 'createElement'>;
  const reloadPage = vi.fn();
  const screen = createStartupScreenForTests(
    root as unknown as HTMLElement,
    { copyText, reloadPage },
    startupDocument,
  );
  const byText = (text: string): FakeElement | undefined =>
    elements.find((candidate) => candidate.textContent === text);
  return { root, elements, screen, copyText, reloadPage, byText };
};

describe('Step-2 startup coordinator', () => {
  it('starts the transferred application after compatibility and before Ready', async () => {
    const events: string[] = [];
    const application = {
      stop: vi.fn(() => Promise.resolve({ kind: 'success' as const })),
      getStatus: () => ({
        lifecycle: 'ready' as const,
        acceptsRequests: true,
        frameLoopActive: true,
      }),
    } as unknown as ApplicationController;
    const testDependencies = dependencies({
      checkCompatibility: () => {
        events.push('check');
        return Promise.resolve({ kind: 'complete', report: report('supported') });
      },
      startApplication: () => {
        events.push('application');
        return Promise.resolve(application);
      },
      showReady: () => events.push('ready'),
    });

    const handle = createStartupCoordinatorForTests(testDependencies).start();
    await settle();
    expect(events).toEqual(['check', 'application', 'ready']);
    expect(handle.getStatus()).toEqual({
      lifecycle: 'ready',
      acceptsRequests: true,
      frameLoopActive: true,
    });
    await handle.stop();
    expect(application.stop).toHaveBeenCalledOnce();
  });

  it('does not create an application while compatibility remains blocked', async () => {
    const startApplication = vi.fn(() => Promise.resolve(undefined));
    const testDependencies = dependencies({
      checkCompatibility: () => Promise.resolve({ kind: 'complete', report: report('blocked') }),
      startApplication,
    });

    const handle = createStartupCoordinatorForTests(testDependencies).start();
    await settle();
    expect(startApplication).not.toHaveBeenCalled();
    expect(handle.getStatus()).toEqual({
      lifecycle: 'starting',
      acceptsRequests: false,
      frameLoopActive: false,
    });
    await handle.stop();
  });

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
    const cancel = vi.fn(() => Promise.resolve());
    const testDependencies = dependencies({
      checkCompatibility: () => Promise.reject(raw),
      cancelCompatibilityCheck: cancel,
      createUnexpectedDiagnostic: create,
      showFatal,
    });

    createStartupCoordinatorForTests(testDependencies).start();
    await settle();

    expect(create).toHaveBeenCalledWith(raw);
    expect(showFatal).toHaveBeenCalledWith(diagnostic);
    expect(testDependencies.showReady).not.toHaveBeenCalled();
    expect(cancel).toHaveBeenCalledOnce();
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

  it('cancels and settles active work on fatal, removes listeners, and ignores late completion', async () => {
    const check = deferred<CompatibilityCheckResult>();
    const cleanup = deferred<void>();
    let fatalListener: ((fault: unknown) => void) | undefined;
    const remove = vi.fn();
    const showFatal = vi.fn();
    const showReady = vi.fn();
    const cancel = vi.fn(() => cleanup.promise);
    const testDependencies = dependencies({
      checkCompatibility: () => check.promise,
      cancelCompatibilityCheck: cancel,
      addErrorListener: (listener) => {
        fatalListener = listener;
        return remove;
      },
      showFatal,
      showReady,
    });
    const handle = createStartupCoordinatorForTests(testDependencies).start();

    fatalListener?.(new Error('controlled active failure'));
    fatalListener?.(new Error('ignored repeated failure'));
    expect(cancel).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledOnce();
    expect(showFatal).toHaveBeenCalledOnce();

    check.resolve({ kind: 'complete', report: report('supported') });
    await settle();
    expect(showReady).not.toHaveBeenCalled();

    const stopped = handle.stop();
    let stopSettled = false;
    void stopped.then(() => {
      stopSettled = true;
    });
    await Promise.resolve();
    expect(stopSettled).toBe(false);
    cleanup.resolve();
    await stopped;
    expect(stopSettled).toBe(true);
    await handle.stop();
    expect(cancel).toHaveBeenCalledOnce();
  });

  it('does not replace a stopped or cancelled startup with a later presentation', async () => {
    const pending = deferred<CompatibilityCheckResult>();
    const showReady = vi.fn();
    const testDependencies = dependencies({
      checkCompatibility: () => pending.promise,
      showReady,
    });
    const handle = createStartupCoordinatorForTests(testDependencies).start();
    await handle.stop();
    pending.resolve({ kind: 'complete', report: report('supported') });
    await settle();
    expect(showReady).not.toHaveBeenCalled();

    const cancelledDependencies = dependencies({
      checkCompatibility: () => Promise.resolve({ kind: 'cancelled' }),
      showReady,
    });
    createStartupCoordinatorForTests(cancelledDependencies).start();
    await settle();
    expect(showReady).not.toHaveBeenCalled();
  });

  it('routes an already-running startup result to one fatal result', async () => {
    const showFatal = vi.fn();
    createStartupCoordinatorForTests(
      dependencies({
        checkCompatibility: () => Promise.resolve({ kind: 'alreadyRunning' }),
        showFatal,
      }),
    ).start();
    await settle();
    expect(showFatal).toHaveBeenCalledOnce();
  });
});

describe('early browser fatal boundary', () => {
  it.each([
    ['error', 'error'],
    ['unhandledrejection', 'reason'],
  ] as const)(
    'handles and prevents default %s output, then removes the listener',
    (type, field) => {
      const target = new ControlledEventTarget();
      const listener = vi.fn();
      const remove = installBrowserErrorBoundaryForTests(target, listener);
      const raw = new Error(`controlled ${type}`);
      const event = controlledEvent(type, { [field]: raw });

      target.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
      expect(listener).toHaveBeenCalledWith(raw);

      remove();
      const later = controlledEvent(type, { [field]: raw });
      target.dispatchEvent(later);
      expect(listener).toHaveBeenCalledOnce();
    },
  );
});

describe('Step-2 StartupScreen', () => {
  it('shows the immediate semantic Checking browser state', () => {
    const harness = screenHarness();
    harness.screen.showChecking();

    expect(harness.byText('Minor Revisions')).toBeDefined();
    const stage = harness.byText('Checking browser');
    expect(stage?.attributes.get('role')).toBe('status');
    expect(stage?.attributes.get('aria-live')).toBe('polite');
    expect(harness.root.children).toHaveLength(1);
  });

  it.each(['supported', 'degraded'] as const)('shows the exact %s Ready result', (overall) => {
    const harness = screenHarness();
    harness.screen.showReady(report(overall));

    expect(harness.byText('Ready')?.attributes.get('role')).toBe('status');
    expect(harness.byText('Startup checks passed.')).toBeDefined();
    expect(harness.byText('Game systems are not yet available.')).toBeDefined();
    expect(
      harness.byText('Controller input is unavailable. Use keyboard and mouse.') !== undefined,
    ).toBe(overall === 'degraded');
  });

  it('shows the fixed safe content failure without technical details', () => {
    const harness = screenHarness();
    harness.screen.showContentInvalid();

    expect(harness.byText('Minor Revisions')).toBeDefined();
    expect(harness.byText('Content check blocked')?.attributes.get('role')).toBe('alert');
    expect(
      harness.byText('Game content could not be verified. No saved campaign data was changed.'),
    ).toBeDefined();
  });

  it('lists all blocking reasons together and focuses one semantic retry action', () => {
    const retry = vi.fn();
    const harness = screenHarness();
    const blocked = {
      ...report('blocked'),
      capabilities: report('blocked').capabilities.map((entry) =>
        entry.id === 'indexedDb'
          ? {
              ...entry,
              status: 'failed' as const,
              reasonCode: 'INDEXED_DB_FAILED' as const,
            }
          : entry,
      ),
    } satisfies CompatibilityReport;
    harness.screen.showBlocked(blocked, retry);

    expect(harness.byText('3D graphics are not available.')).toBeDefined();
    expect(harness.byText('Local saved data is not available.')).toBeDefined();
    expect(harness.byText('Campaign data did not change.')).toBeDefined();
    const retryButton = harness.byText('Retry Check');
    expect(retryButton?.tagName).toBe('button');
    expect(retryButton?.type).toBe('button');
    expect(retryButton?.focused).toBe(true);
    retryButton?.click();
    retryButton?.click();
    expect(retry).toHaveBeenCalledOnce();
  });

  it('shows fatal controls without automatic action and handles copy and reload activation', async () => {
    const harness = screenHarness();
    harness.screen.showFatal(diagnostic);

    expect(
      harness.byText('Minor Revisions must stop because it cannot continue safely.'),
    ).toBeDefined();
    expect(harness.byText('MRD1-BOOTSTRAP-UNEXPECTED')).toBeDefined();
    const copy = harness.byText('Copy Diagnostic');
    const reload = harness.byText('Reload Page');
    expect(copy?.focused).toBe(true);
    expect(harness.copyText).not.toHaveBeenCalled();
    expect(harness.reloadPage).not.toHaveBeenCalled();

    copy?.click();
    reload?.click();
    await Promise.resolve();
    expect(harness.copyText).toHaveBeenCalledWith(diagnostic.copyForm);
    expect(harness.reloadPage).toHaveBeenCalledOnce();
  });

  it('keeps a failed explicit copy action contained', async () => {
    const copyFailure = vi.fn(() => Promise.reject(new Error('controlled clipboard failure')));
    const harness = screenHarness(copyFailure);
    harness.screen.showFatal(diagnostic);
    harness.byText('Copy Diagnostic')?.click();
    await settle();
    expect(copyFailure).toHaveBeenCalledOnce();
  });
});

describe('production bootstrap wiring', () => {
  it('connects the real startup dependencies and contains an unavailable clipboard action', async () => {
    const root = new FakeElement('main');
    const elements: FakeElement[] = [];
    const startupDocument = {
      createElement: (tag: string) => {
        const created = new FakeElement(tag);
        if (tag === 'canvas') {
          Object.assign(created, { getContext: () => ({}) });
        }
        elements.push(created);
        return created;
      },
      exitPointerLock: () => undefined,
    };
    const target = new ControlledEventTarget() as unknown as EventTarget & {
      location: { reload: () => void };
    };
    target.location = { reload: vi.fn() };
    vi.stubGlobal('document', startupDocument);
    vi.stubGlobal('window', target);
    vi.stubGlobal('navigator', { getGamepads: () => [] });
    vi.stubGlobal('AudioContext', class {});
    vi.stubGlobal(
      'HTMLElement',
      class {
        public requestPointerLock(): void {}
      },
    );

    const handle = bootstrapStartup(root as unknown as HTMLElement);
    await settle();
    expect(elements.some((element) => element.textContent === 'Browser check blocked')).toBe(true);
    const fatalEvent = controlledEvent('error', {
      error: new Error('controlled production input'),
    });
    target.dispatchEvent(fatalEvent);
    expect(fatalEvent.defaultPrevented).toBe(true);
    elements.find((element) => element.textContent === 'Copy Diagnostic')?.click();
    elements.find((element) => element.textContent === 'Reload Page')?.click();
    await settle();
    expect(target.location.reload).toHaveBeenCalledOnce();
    await handle.stop();
    vi.unstubAllGlobals();
  });
});
