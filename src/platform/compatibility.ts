export const capabilityIds = [
  'esModules',
  'webgl2',
  'indexedDb',
  'webAudio',
  'pointerLock',
  'controller',
] as const;

export type CapabilityId = (typeof capabilityIds)[number];
export type CapabilityStatus = 'ready' | 'unavailable' | 'failed';
export type CompatibilityOverall = 'supported' | 'degraded' | 'blocked';

export type CapabilityReasonCode =
  | 'ES_MODULES_UNAVAILABLE'
  | 'ES_MODULES_FAILED'
  | 'WEBGL2_UNAVAILABLE'
  | 'WEBGL2_FAILED'
  | 'INDEXED_DB_UNAVAILABLE'
  | 'INDEXED_DB_FAILED'
  | 'WEB_AUDIO_UNAVAILABLE'
  | 'WEB_AUDIO_FAILED'
  | 'POINTER_LOCK_UNAVAILABLE'
  | 'POINTER_LOCK_FAILED'
  | 'CONTROLLER_UNAVAILABLE'
  | 'CONTROLLER_FAILED';

export type CapabilityEntry = Readonly<{
  id: CapabilityId;
  required: boolean;
  status: CapabilityStatus;
  reasonCode: CapabilityReasonCode | null;
}>;

export type CompatibilityReport = Readonly<{
  schemaVersion: 1;
  overall: CompatibilityOverall;
  capabilities: readonly CapabilityEntry[];
}>;

export type CompatibilityCheckResult =
  | Readonly<{ kind: 'complete'; report: CompatibilityReport }>
  | Readonly<{ kind: 'alreadyRunning' }>
  | Readonly<{ kind: 'cancelled' }>;

type ProbeResult = Readonly<{
  status: CapabilityStatus;
  reasonCode: CapabilityReasonCode | null;
}>;

type CompatibilityAdapters = Readonly<{
  getEsModulesStatus: () => ProbeResult;
  probeWebGl2: (signal: AbortSignal) => Promise<ProbeResult>;
  probeIndexedDb: (signal: AbortSignal) => Promise<ProbeResult>;
  getWebAudioStatus: () => ProbeResult;
  getPointerLockStatus: () => ProbeResult;
  getControllerStatus: () => ProbeResult;
}>;

type BrowserCompatibilityEnvironment = Readonly<{
  createCanvas: () => HTMLCanvasElement;
  indexedDb: IDBFactory | undefined;
  hasWebAudio: () => boolean;
  hasPointerLock: () => boolean;
  hasController: () => boolean;
}>;

const PROBE_DATABASE_NAME = 'minor-revisions-capability-probe';

const ready = (): ProbeResult => Object.freeze({ status: 'ready', reasonCode: null });

const unavailable = (reasonCode: CapabilityReasonCode): ProbeResult =>
  Object.freeze({ status: 'unavailable', reasonCode });

const failed = (reasonCode: CapabilityReasonCode): ProbeResult =>
  Object.freeze({ status: 'failed', reasonCode });

const probeIndexedDb = (
  factory: IDBFactory | undefined,
  signal: AbortSignal,
): Promise<ProbeResult> => {
  if (factory === undefined) {
    return Promise.resolve(unavailable('INDEXED_DB_UNAVAILABLE'));
  }
  if (signal.aborted) {
    return Promise.resolve(failed('INDEXED_DB_FAILED'));
  }

  return new Promise<ProbeResult>((resolve) => {
    let openRequest: IDBOpenDBRequest | undefined;
    let handle: IDBDatabase | undefined;
    let cancelled = false;
    let openTerminal = false;
    let deleteStarted = false;
    let deleteTerminal = false;
    let settled = false;

    const closeHandle = (): boolean => {
      try {
        handle?.close();
        return true;
      } catch {
        return false;
      } finally {
        handle = undefined;
      }
    };

    const settle = (result: ProbeResult): void => {
      if (settled) {
        return;
      }
      settled = true;
      signal.removeEventListener('abort', cancel);
      resolve(result);
    };

    const deleteProbe = (acceptedResult: ProbeResult): void => {
      if (deleteStarted || settled) {
        return;
      }
      deleteStarted = true;
      const result = closeHandle() ? acceptedResult : failed('INDEXED_DB_FAILED');
      let deleteRequest: IDBOpenDBRequest;
      try {
        deleteRequest = factory.deleteDatabase(PROBE_DATABASE_NAME);
      } catch {
        settle(failed('INDEXED_DB_FAILED'));
        return;
      }
      deleteRequest.onsuccess = () => {
        if (deleteTerminal) {
          return;
        }
        deleteTerminal = true;
        settle(cancelled ? failed('INDEXED_DB_FAILED') : result);
      };
      deleteRequest.onerror = () => {
        if (deleteTerminal) {
          return;
        }
        deleteTerminal = true;
        settle(failed('INDEXED_DB_FAILED'));
      };
      deleteRequest.onblocked = () => {
        // A blocked request can still reach success or error. Keep retry unavailable.
      };
    };

    function cancel(): void {
      cancelled = true;
    }

    signal.addEventListener('abort', cancel, { once: true });

    try {
      openRequest = factory.open(PROBE_DATABASE_NAME);
    } catch {
      openTerminal = true;
      deleteProbe(failed('INDEXED_DB_FAILED'));
      return;
    }

    openRequest.onupgradeneeded = () => {
      // The probe database stays empty. No object store is permitted here.
    };
    openRequest.onblocked = () => {
      // A blocked request can still reach success or error. Keep retry unavailable.
    };
    openRequest.onerror = () => {
      if (openTerminal) {
        return;
      }
      openTerminal = true;
      deleteProbe(failed('INDEXED_DB_FAILED'));
    };
    openRequest.onsuccess = () => {
      if (openTerminal) {
        return;
      }
      openTerminal = true;

      let result = failed('INDEXED_DB_FAILED');
      try {
        const opened = openRequest?.result;
        if (opened !== undefined) {
          handle = opened;
          if (!cancelled && opened.objectStoreNames.length === 0) {
            result = ready();
          }
        }
      } catch {
        result = failed('INDEXED_DB_FAILED');
      }
      deleteProbe(result);
    };
  });
};

const probeWebGl2 = (
  createCanvas: () => HTMLCanvasElement,
  signal: AbortSignal,
): Promise<ProbeResult> => {
  if (signal.aborted) {
    return Promise.resolve(unavailable('WEBGL2_UNAVAILABLE'));
  }

  try {
    const canvas = createCanvas();
    const context = canvas.getContext('webgl2', {
      alpha: false,
      antialias: true,
      depth: true,
      preserveDrawingBuffer: false,
      stencil: false,
    });
    return Promise.resolve(context === null ? unavailable('WEBGL2_UNAVAILABLE') : ready());
  } catch {
    return Promise.resolve(failed('WEBGL2_FAILED'));
  }
};

const createBrowserAdapters = (
  environment: BrowserCompatibilityEnvironment,
): CompatibilityAdapters =>
  Object.freeze({
    getEsModulesStatus: ready,
    probeWebGl2: async (signal) => await probeWebGl2(environment.createCanvas, signal),
    probeIndexedDb: async (signal) => await probeIndexedDb(environment.indexedDb, signal),
    getWebAudioStatus: () =>
      environment.hasWebAudio() ? ready() : unavailable('WEB_AUDIO_UNAVAILABLE'),
    getPointerLockStatus: () =>
      environment.hasPointerLock() ? ready() : unavailable('POINTER_LOCK_UNAVAILABLE'),
    getControllerStatus: () =>
      environment.hasController() ? ready() : unavailable('CONTROLLER_UNAVAILABLE'),
  });

const productionAdapters = createBrowserAdapters({
  createCanvas: () => document.createElement('canvas'),
  indexedDb: typeof indexedDB === 'undefined' ? undefined : indexedDB,
  hasWebAudio: () => typeof AudioContext === 'function',
  hasPointerLock: () =>
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype.requestPointerLock === 'function' &&
    typeof document.exitPointerLock === 'function',
  hasController: () => typeof navigator.getGamepads === 'function',
});

const freezeReport = (entries: CapabilityEntry[]): CompatibilityReport => {
  const capabilities = Object.freeze(entries.map((entry) => Object.freeze(entry)));
  const requiredBlocked = capabilities.some((entry) => entry.required && entry.status !== 'ready');
  const controller = capabilities[5];
  const overall: CompatibilityOverall = requiredBlocked
    ? 'blocked'
    : controller?.status === 'ready'
      ? 'supported'
      : 'degraded';
  return Object.freeze({ schemaVersion: 1, overall, capabilities });
};

class CompatibilityChecker {
  private active:
    | Readonly<{
        controller: AbortController;
        promise: Promise<CompatibilityCheckResult>;
      }>
    | undefined;

  public constructor(private readonly adapters: CompatibilityAdapters) {}

  public check(): Promise<CompatibilityCheckResult> {
    if (this.active !== undefined) {
      return Promise.resolve(Object.freeze({ kind: 'alreadyRunning' }));
    }

    const controller = new AbortController();
    const promise = this.run(controller.signal).finally(() => {
      if (this.active?.promise === promise) {
        this.active = undefined;
      }
    });
    this.active = Object.freeze({ controller, promise });
    return promise;
  }

  public async cancel(): Promise<void> {
    const active = this.active;
    if (active === undefined) {
      return;
    }
    active.controller.abort();
    await active.promise;
  }

  private async run(signal: AbortSignal): Promise<CompatibilityCheckResult> {
    const entries: CapabilityEntry[] = [];
    const checks: readonly (() => Promise<ProbeResult>)[] = [
      () => Promise.resolve(this.adapters.getEsModulesStatus()),
      () => this.adapters.probeWebGl2(signal),
      () => this.adapters.probeIndexedDb(signal),
      () => Promise.resolve(this.adapters.getWebAudioStatus()),
      () => Promise.resolve(this.adapters.getPointerLockStatus()),
      () => Promise.resolve(this.adapters.getControllerStatus()),
    ];

    for (const [index, check] of checks.entries()) {
      if (signal.aborted) {
        return Object.freeze({ kind: 'cancelled' });
      }
      let result: ProbeResult;
      try {
        result = await check();
      } catch {
        const id = capabilityIds[index];
        if (id === undefined) {
          return Object.freeze({ kind: 'cancelled' });
        }
        result = failed(failedReasonCodes[id]);
      }
      if (signal.aborted) {
        return Object.freeze({ kind: 'cancelled' });
      }
      const id = capabilityIds[index];
      if (id === undefined) {
        return Object.freeze({ kind: 'cancelled' });
      }
      entries.push({ id, required: id !== 'controller', ...result });
    }

    return Object.freeze({ kind: 'complete', report: freezeReport(entries) });
  }
}

const failedReasonCodes: Readonly<Record<CapabilityId, CapabilityReasonCode>> = Object.freeze({
  esModules: 'ES_MODULES_FAILED',
  webgl2: 'WEBGL2_FAILED',
  indexedDb: 'INDEXED_DB_FAILED',
  webAudio: 'WEB_AUDIO_FAILED',
  pointerLock: 'POINTER_LOCK_FAILED',
  controller: 'CONTROLLER_FAILED',
});

const productionChecker = new CompatibilityChecker(productionAdapters);

export const checkCompatibility = async (): Promise<CompatibilityCheckResult> =>
  await productionChecker.check();

export const cancelCompatibilityCheck = async (): Promise<void> => await productionChecker.cancel();

export const createCompatibilityCheckerForTests = (adapters: CompatibilityAdapters) => {
  const checker = new CompatibilityChecker(adapters);
  return Object.freeze({
    check: async (): Promise<CompatibilityCheckResult> => await checker.check(),
    cancel: async (): Promise<void> => await checker.cancel(),
  });
};

export const createBrowserCompatibilityAdaptersForTests = (
  environment: BrowserCompatibilityEnvironment,
): CompatibilityAdapters => createBrowserAdapters(environment);
