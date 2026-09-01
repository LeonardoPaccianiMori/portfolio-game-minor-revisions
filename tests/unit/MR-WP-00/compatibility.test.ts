import { describe, expect, it } from 'vitest';

import {
  capabilityIds,
  createBrowserCompatibilityAdaptersForTests,
  createCompatibilityCheckerForTests,
  type CapabilityReasonCode,
  type CapabilityStatus,
} from '../../../src/platform/compatibility';

type TestAdapters = Parameters<typeof createCompatibilityCheckerForTests>[0];
type Probe = Awaited<ReturnType<TestAdapters['probeWebGl2']>>;

const probe = (
  status: CapabilityStatus = 'ready',
  reasonCode: CapabilityReasonCode | null = null,
): Probe => Object.freeze({ status, reasonCode });

const adapters = (overrides: Partial<TestAdapters> = {}): TestAdapters => ({
  getEsModulesStatus: () => probe(),
  probeWebGl2: () => Promise.resolve(probe()),
  probeIndexedDb: () => Promise.resolve(probe()),
  getWebAudioStatus: () => probe(),
  getPointerLockStatus: () => probe(),
  getControllerStatus: () => probe(),
  ...overrides,
});

const completeReport = async (testAdapters: TestAdapters) => {
  const result = await createCompatibilityCheckerForTests(testAdapters).check();
  expect(result.kind).toBe('complete');
  if (result.kind !== 'complete') {
    throw new Error('Expected a complete compatibility report.');
  }
  return result.report;
};

type ControlledRequest = IDBOpenDBRequest & {
  controlledResult?: IDBDatabase;
};

const request = (result?: IDBDatabase): ControlledRequest =>
  ({
    onblocked: null,
    onerror: null,
    onsuccess: null,
    onupgradeneeded: null,
    result,
  }) as unknown as ControlledRequest;

const fire = (
  controlledRequest: ControlledRequest,
  type: 'blocked' | 'error' | 'success' | 'upgradeneeded',
): void => {
  const handler = controlledRequest[`on${type}`];
  if (handler !== null) {
    (handler as (this: ControlledRequest, event: Event) => unknown).call(
      controlledRequest,
      new Event(type),
    );
  }
};

const indexedDbEnvironment = (
  options: {
    openThrows?: boolean;
    deleteThrows?: boolean;
  } = {},
) => {
  const openRequests: ControlledRequest[] = [];
  const deleteRequests: ControlledRequest[] = [];
  const openedNames: string[] = [];
  const deletedNames: string[] = [];
  const factory = {
    open: (name: string) => {
      openedNames.push(name);
      if (options.openThrows === true) {
        throw new Error('Controlled open failure.');
      }
      const openRequest = request();
      openRequests.push(openRequest);
      return openRequest;
    },
    deleteDatabase: (name: string) => {
      deletedNames.push(name);
      if (options.deleteThrows === true) {
        throw new Error('Controlled delete failure.');
      }
      const deleteRequest = request();
      deleteRequests.push(deleteRequest);
      return deleteRequest;
    },
  } as unknown as IDBFactory;
  return {
    factory,
    get openRequest() {
      return openRequests[0]!;
    },
    openRequests,
    deleteRequests,
    openedNames,
    deletedNames,
  };
};

const flushMicrotasks = async (): Promise<void> => {
  for (let index = 0; index < 8; index += 1) {
    await Promise.resolve();
  }
};

const lowLevelAdapters = (
  indexedDb: IDBFactory | undefined,
  createCanvas: () => HTMLCanvasElement = () =>
    ({ getContext: () => ({}) }) as unknown as HTMLCanvasElement,
) =>
  createBrowserCompatibilityAdaptersForTests({
    createCanvas,
    indexedDb,
    hasWebAudio: () => true,
    hasPointerLock: () => true,
    hasController: () => true,
  });

describe('MR-S11-CMP-001 compatibility', () => {
  it('returns one immutable supported report with exactly the six entries in order', async () => {
    const report = await completeReport(adapters());

    expect(report).toEqual({
      schemaVersion: 1,
      overall: 'supported',
      capabilities: capabilityIds.map((id) => ({
        id,
        required: id !== 'controller',
        status: 'ready',
        reasonCode: null,
      })),
    });
    expect(Object.isFrozen(report)).toBe(true);
    expect(Object.isFrozen(report.capabilities)).toBe(true);
    expect(report.capabilities.every(Object.isFrozen)).toBe(true);
  });

  it.each([
    ['esModules', 'unavailable', 'ES_MODULES_UNAVAILABLE'],
    ['esModules', 'failed', 'ES_MODULES_FAILED'],
    ['webgl2', 'unavailable', 'WEBGL2_UNAVAILABLE'],
    ['webgl2', 'failed', 'WEBGL2_FAILED'],
    ['indexedDb', 'unavailable', 'INDEXED_DB_UNAVAILABLE'],
    ['indexedDb', 'failed', 'INDEXED_DB_FAILED'],
    ['webAudio', 'unavailable', 'WEB_AUDIO_UNAVAILABLE'],
    ['webAudio', 'failed', 'WEB_AUDIO_FAILED'],
    ['pointerLock', 'unavailable', 'POINTER_LOCK_UNAVAILABLE'],
    ['pointerLock', 'failed', 'POINTER_LOCK_FAILED'],
  ] as const)('blocks when required capability %s is %s', async (id, status, reasonCode) => {
    const keyById = {
      esModules: 'getEsModulesStatus',
      webgl2: 'probeWebGl2',
      indexedDb: 'probeIndexedDb',
      webAudio: 'getWebAudioStatus',
      pointerLock: 'getPointerLockStatus',
    } as const;
    const key = keyById[id];
    const value = key.startsWith('probe')
      ? () => Promise.resolve(probe(status, reasonCode))
      : () => probe(status, reasonCode);
    const report = await completeReport(adapters({ [key]: value }));

    expect(report.overall).toBe('blocked');
    expect(report.capabilities.find((entry) => entry.id === id)).toMatchObject({
      status,
      reasonCode,
    });
  });

  it('keeps multiple failures and their typed failed results in one blocked report', async () => {
    const report = await completeReport(
      adapters({
        probeWebGl2: () => Promise.resolve(probe('failed', 'WEBGL2_FAILED')),
        probeIndexedDb: () => Promise.resolve(probe('failed', 'INDEXED_DB_FAILED')),
        getPointerLockStatus: () => probe('unavailable', 'POINTER_LOCK_UNAVAILABLE'),
      }),
    );

    expect(report.overall).toBe('blocked');
    expect(report.capabilities.filter((entry) => entry.status !== 'ready')).toHaveLength(3);
  });

  it('degrades but does not block when only the optional controller interface is absent', async () => {
    const report = await completeReport(
      adapters({
        getControllerStatus: () => probe('unavailable', 'CONTROLLER_UNAVAILABLE'),
      }),
    );

    expect(report.overall).toBe('degraded');
    expect(report.capabilities[5]).toEqual({
      id: 'controller',
      required: false,
      status: 'unavailable',
      reasonCode: 'CONTROLLER_UNAVAILABLE',
    });
  });

  it('rejects a concurrent operation, settles cancellation cleanup, and then retries completely', async () => {
    let releaseProbe: (() => void) | undefined;
    let cleanups = 0;
    let calls = 0;
    const checker = createCompatibilityCheckerForTests(
      adapters({
        probeWebGl2: async (signal) => {
          calls += 1;
          await new Promise<void>((resolve) => {
            releaseProbe = resolve;
            signal.addEventListener(
              'abort',
              () => {
                cleanups += 1;
                resolve();
              },
              { once: true },
            );
          });
          return probe();
        },
      }),
    );

    const first = checker.check();
    await Promise.resolve();
    await expect(checker.check()).resolves.toEqual({ kind: 'alreadyRunning' });
    await checker.cancel();
    await expect(first).resolves.toEqual({ kind: 'cancelled' });
    expect(cleanups).toBe(1);

    releaseProbe?.();
    const retry = checker.check();
    await Promise.resolve();
    releaseProbe?.();
    await expect(retry).resolves.toMatchObject({ kind: 'complete' });
    expect(calls).toBe(2);
  });

  it('executes the real WebGL2 probe with the exact temporary context attributes', async () => {
    const received: WebGLContextAttributes[] = [];
    const adapters = lowLevelAdapters(
      undefined,
      () =>
        ({
          getContext: (_type: string, attributes: WebGLContextAttributes) => {
            received.push(attributes);
            return {};
          },
        }) as unknown as HTMLCanvasElement,
    );

    await expect(adapters.probeWebGl2(new AbortController().signal)).resolves.toEqual({
      status: 'ready',
      reasonCode: null,
    });
    expect(received).toEqual([
      {
        alpha: false,
        antialias: true,
        depth: true,
        preserveDrawingBuffer: false,
        stencil: false,
      },
    ]);
  });

  it('returns typed WebGL2 unavailable, failed, and cancelled results', async () => {
    const unavailableAdapters = lowLevelAdapters(
      undefined,
      () => ({ getContext: () => null }) as unknown as HTMLCanvasElement,
    );
    const failedAdapters = lowLevelAdapters(undefined, () => {
      throw new Error('Controlled canvas failure.');
    });
    const cancelled = new AbortController();
    cancelled.abort();

    await expect(unavailableAdapters.probeWebGl2(new AbortController().signal)).resolves.toEqual({
      status: 'unavailable',
      reasonCode: 'WEBGL2_UNAVAILABLE',
    });
    await expect(failedAdapters.probeWebGl2(new AbortController().signal)).resolves.toEqual({
      status: 'failed',
      reasonCode: 'WEBGL2_FAILED',
    });
    await expect(unavailableAdapters.probeWebGl2(cancelled.signal)).resolves.toEqual({
      status: 'unavailable',
      reasonCode: 'WEBGL2_UNAVAILABLE',
    });
  });

  it('opens, closes, and deletes the exact empty IndexedDB probe before ready', async () => {
    const environment = indexedDbEnvironment();
    const result = lowLevelAdapters(environment.factory).probeIndexedDb(
      new AbortController().signal,
    );
    let closes = 0;
    const handle = {
      close: () => {
        closes += 1;
      },
      objectStoreNames: { length: 0 },
    } as unknown as IDBDatabase;
    Object.defineProperty(environment.openRequest, 'result', { value: handle });

    fire(environment.openRequest, 'upgradeneeded');
    fire(environment.openRequest, 'success');
    expect(closes).toBe(1);
    expect(environment.deleteRequests).toHaveLength(1);
    fire(environment.deleteRequests[0]!, 'success');

    await expect(result).resolves.toEqual({ status: 'ready', reasonCode: null });
    expect(environment.openedNames).toEqual(['minor-revisions-capability-probe']);
    expect(environment.deletedNames).toEqual(['minor-revisions-capability-probe']);
  });

  it('fails, closes, and deletes a nonempty reserved probe without inspecting stores', async () => {
    const environment = indexedDbEnvironment();
    const result = lowLevelAdapters(environment.factory).probeIndexedDb(
      new AbortController().signal,
    );
    let closes = 0;
    let storeInspections = 0;
    const handle = {
      close: () => {
        closes += 1;
      },
      objectStoreNames: { length: 1 },
    } as unknown as IDBDatabase;
    Object.defineProperty(handle, 'transaction', {
      get: () => {
        storeInspections += 1;
        throw new Error('Object stores must not be inspected.');
      },
    });
    Object.defineProperty(environment.openRequest, 'result', { value: handle });

    fire(environment.openRequest, 'success');
    fire(environment.deleteRequests[0]!, 'success');

    await expect(result).resolves.toEqual({
      status: 'failed',
      reasonCode: 'INDEXED_DB_FAILED',
    });
    expect(closes).toBe(1);
    expect(storeInspections).toBe(0);
    expect(environment.openedNames).toEqual(['minor-revisions-capability-probe']);
    expect(environment.deletedNames).toEqual(['minor-revisions-capability-probe']);
  });

  it('keeps a blocked IndexedDB open pending until a terminal error and deletion', async () => {
    const environment = indexedDbEnvironment();
    const result = lowLevelAdapters(environment.factory).probeIndexedDb(
      new AbortController().signal,
    );
    let settled = false;
    void result.then(() => {
      settled = true;
    });

    fire(environment.openRequest, 'blocked');
    await flushMicrotasks();
    expect(settled).toBe(false);
    expect(environment.deleteRequests).toHaveLength(0);

    fire(environment.openRequest, 'error');
    fire(environment.deleteRequests[0]!, 'success');
    await expect(result).resolves.toEqual({
      status: 'failed',
      reasonCode: 'INDEXED_DB_FAILED',
    });
  });

  it('keeps a blocked IndexedDB deletion pending until terminal success', async () => {
    const environment = indexedDbEnvironment();
    const result = lowLevelAdapters(environment.factory).probeIndexedDb(
      new AbortController().signal,
    );
    const handle = {
      close: () => undefined,
      objectStoreNames: { length: 0 },
    } as unknown as IDBDatabase;
    Object.defineProperty(environment.openRequest, 'result', { value: handle });
    let settled = false;
    void result.then(() => {
      settled = true;
    });

    fire(environment.openRequest, 'success');
    fire(environment.deleteRequests[0]!, 'blocked');
    await flushMicrotasks();
    expect(settled).toBe(false);

    fire(environment.deleteRequests[0]!, 'success');
    await expect(result).resolves.toEqual({ status: 'ready', reasonCode: null });
  });

  it('maps a terminal IndexedDB deletion error to typed failure', async () => {
    const environment = indexedDbEnvironment();
    const result = lowLevelAdapters(environment.factory).probeIndexedDb(
      new AbortController().signal,
    );
    const handle = {
      close: () => undefined,
      objectStoreNames: { length: 0 },
    } as unknown as IDBDatabase;
    Object.defineProperty(environment.openRequest, 'result', { value: handle });

    fire(environment.openRequest, 'success');
    fire(environment.deleteRequests[0]!, 'error');

    await expect(result).resolves.toEqual({
      status: 'failed',
      reasonCode: 'INDEXED_DB_FAILED',
    });
  });

  it('settles thrown open and deletion operations through the typed failure path', async () => {
    const openFailure = indexedDbEnvironment({ openThrows: true });
    const openResult = lowLevelAdapters(openFailure.factory).probeIndexedDb(
      new AbortController().signal,
    );
    fire(openFailure.deleteRequests[0]!, 'success');
    await expect(openResult).resolves.toMatchObject({ status: 'failed' });

    const deleteFailure = indexedDbEnvironment({ deleteThrows: true });
    const deleteResult = lowLevelAdapters(deleteFailure.factory).probeIndexedDb(
      new AbortController().signal,
    );
    const handle = {
      close: () => undefined,
      objectStoreNames: { length: 0 },
    } as unknown as IDBDatabase;
    Object.defineProperty(deleteFailure.openRequest, 'result', { value: handle });
    fire(deleteFailure.openRequest, 'success');
    await expect(deleteResult).resolves.toMatchObject({ status: 'failed' });
  });

  it('waits for terminal open and deletion events after IndexedDB cancellation', async () => {
    const environment = indexedDbEnvironment();
    const controller = new AbortController();
    const result = lowLevelAdapters(environment.factory).probeIndexedDb(controller.signal);
    let settled = false;
    void result.then(() => {
      settled = true;
    });

    controller.abort();
    fire(environment.openRequest, 'blocked');
    await flushMicrotasks();
    expect(settled).toBe(false);
    expect(environment.deleteRequests).toHaveLength(0);

    let closes = 0;
    const lateHandle = {
      close: () => {
        closes += 1;
      },
      objectStoreNames: { length: 0 },
    } as unknown as IDBDatabase;
    Object.defineProperty(environment.openRequest, 'result', { value: lateHandle });
    fire(environment.openRequest, 'success');
    expect(closes).toBe(1);
    fire(environment.deleteRequests[0]!, 'blocked');
    await flushMicrotasks();
    expect(settled).toBe(false);

    fire(environment.deleteRequests[0]!, 'success');
    await expect(result).resolves.toEqual({
      status: 'failed',
      reasonCode: 'INDEXED_DB_FAILED',
    });
  });

  it('keeps retry gated until old IndexedDB cleanup cannot affect the new probe', async () => {
    const environment = indexedDbEnvironment();
    const checker = createCompatibilityCheckerForTests(lowLevelAdapters(environment.factory));
    const first = checker.check();
    await flushMicrotasks();
    expect(environment.openRequests).toHaveLength(1);

    const cancellation = checker.cancel();
    fire(environment.openRequests[0]!, 'blocked');
    await expect(checker.check()).resolves.toEqual({ kind: 'alreadyRunning' });

    let oldCloses = 0;
    const oldHandle = {
      close: () => {
        oldCloses += 1;
      },
      objectStoreNames: { length: 0 },
    } as unknown as IDBDatabase;
    Object.defineProperty(environment.openRequests[0]!, 'result', { value: oldHandle });
    fire(environment.openRequests[0]!, 'success');
    fire(environment.deleteRequests[0]!, 'blocked');
    await expect(checker.check()).resolves.toEqual({ kind: 'alreadyRunning' });

    fire(environment.deleteRequests[0]!, 'success');
    await cancellation;
    await expect(first).resolves.toEqual({ kind: 'cancelled' });

    const retry = checker.check();
    await flushMicrotasks();
    expect(environment.openRequests).toHaveLength(2);
    fire(environment.openRequests[0]!, 'success');
    fire(environment.openRequests[0]!, 'error');
    fire(environment.deleteRequests[0]!, 'success');
    expect(environment.deleteRequests).toHaveLength(1);

    let retryCloses = 0;
    const retryHandle = {
      close: () => {
        retryCloses += 1;
      },
      objectStoreNames: { length: 0 },
    } as unknown as IDBDatabase;
    Object.defineProperty(environment.openRequests[1]!, 'result', { value: retryHandle });
    fire(environment.openRequests[1]!, 'success');
    fire(environment.deleteRequests[1]!, 'success');

    await expect(retry).resolves.toMatchObject({ kind: 'complete' });
    expect(oldCloses).toBe(1);
    expect(retryCloses).toBe(1);
    expect(environment.openedNames).toEqual([
      'minor-revisions-capability-probe',
      'minor-revisions-capability-probe',
    ]);
    expect(environment.deletedNames).toEqual([
      'minor-revisions-capability-probe',
      'minor-revisions-capability-probe',
    ]);
  });

  it('settles initially cancelled and missing-open-result probes as typed failures', async () => {
    const initiallyCancelled = indexedDbEnvironment();
    const controller = new AbortController();
    controller.abort();
    const cancelledResult = lowLevelAdapters(initiallyCancelled.factory).probeIndexedDb(
      controller.signal,
    );
    await expect(cancelledResult).resolves.toMatchObject({ status: 'failed' });
    expect(initiallyCancelled.openedNames).toHaveLength(0);
    expect(initiallyCancelled.deletedNames).toHaveLength(0);

    const missingResult = indexedDbEnvironment();
    const result = lowLevelAdapters(missingResult.factory).probeIndexedDb(
      new AbortController().signal,
    );
    fire(missingResult.openRequest, 'success');
    fire(missingResult.deleteRequests[0]!, 'success');
    await expect(result).resolves.toMatchObject({ status: 'failed' });
  });

  it('contains an IndexedDB close failure and still deletes the reserved probe', async () => {
    const environment = indexedDbEnvironment();
    const result = lowLevelAdapters(environment.factory).probeIndexedDb(
      new AbortController().signal,
    );
    const handle = {
      close: () => {
        throw new Error('Controlled close failure.');
      },
      objectStoreNames: { length: 0 },
    } as unknown as IDBDatabase;
    Object.defineProperty(environment.openRequest, 'result', { value: handle });
    fire(environment.openRequest, 'success');
    fire(environment.deleteRequests[0]!, 'success');

    await expect(result).resolves.toEqual({
      status: 'failed',
      reasonCode: 'INDEXED_DB_FAILED',
    });
    expect(environment.deletedNames).toEqual(['minor-revisions-capability-probe']);
  });

  it('maps a thrown high-level probe to the stable capability failed code', async () => {
    const checker = createCompatibilityCheckerForTests(
      adapters({ probeIndexedDb: () => Promise.reject(new Error('controlled probe rejection')) }),
    );
    const result = await checker.check();
    expect(result.kind).toBe('complete');
    if (result.kind !== 'complete') {
      throw new Error('Expected a complete controlled report.');
    }
    expect(result.report.overall).toBe('blocked');
    expect(result.report.capabilities.find((entry) => entry.id === 'indexedDb')).toEqual({
      id: 'indexedDb',
      required: true,
      status: 'failed',
      reasonCode: 'INDEXED_DB_FAILED',
    });
    await checker.cancel();
  });

  it('reports IndexedDB absence and all interface-presence branches without using them', async () => {
    const missing = createBrowserCompatibilityAdaptersForTests({
      createCanvas: () => ({ getContext: () => ({}) }) as unknown as HTMLCanvasElement,
      indexedDb: undefined,
      hasWebAudio: () => false,
      hasPointerLock: () => false,
      hasController: () => false,
    });

    await expect(missing.probeIndexedDb(new AbortController().signal)).resolves.toEqual({
      status: 'unavailable',
      reasonCode: 'INDEXED_DB_UNAVAILABLE',
    });
    expect(missing.getWebAudioStatus()).toMatchObject({ status: 'unavailable' });
    expect(missing.getPointerLockStatus()).toMatchObject({ status: 'unavailable' });
    expect(missing.getControllerStatus()).toMatchObject({ status: 'unavailable' });

    const present = lowLevelAdapters(undefined);
    expect(present.getWebAudioStatus()).toMatchObject({ status: 'ready' });
    expect(present.getPointerLockStatus()).toMatchObject({ status: 'ready' });
    expect(present.getControllerStatus()).toMatchObject({ status: 'ready' });
  });
});
