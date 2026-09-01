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

const PROBE_DATABASE_NAME = 'minor-revisions-capability-probe';

const ready = (): ProbeResult => Object.freeze({ status: 'ready', reasonCode: null });

const unavailable = (reasonCode: CapabilityReasonCode): ProbeResult =>
  Object.freeze({ status: 'unavailable', reasonCode });

const failed = (reasonCode: CapabilityReasonCode): ProbeResult =>
  Object.freeze({ status: 'failed', reasonCode });

const deleteProbeDatabase = async (): Promise<boolean> => {
  return await new Promise<boolean>((resolve) => {
    let request: IDBOpenDBRequest;
    try {
      request = indexedDB.deleteDatabase(PROBE_DATABASE_NAME);
    } catch {
      resolve(false);
      return;
    }
    request.onsuccess = () => resolve(true);
    request.onerror = () => resolve(false);
  });
};

const probeIndexedDb = async (signal: AbortSignal): Promise<ProbeResult> => {
  if (typeof indexedDB === 'undefined') {
    return unavailable('INDEXED_DB_UNAVAILABLE');
  }

  if (signal.aborted) {
    await deleteProbeDatabase();
    return failed('INDEXED_DB_FAILED');
  }

  return await new Promise<ProbeResult>((resolve) => {
    let request: IDBOpenDBRequest;
    try {
      request = indexedDB.open(PROBE_DATABASE_NAME);
    } catch {
      void deleteProbeDatabase().then(() => resolve(failed('INDEXED_DB_FAILED')));
      return;
    }

    request.onupgradeneeded = () => {
      // The probe database stays empty. No object store is permitted here.
    };
    request.onerror = () => {
      void deleteProbeDatabase().then(() => resolve(failed('INDEXED_DB_FAILED')));
    };
    request.onsuccess = () => {
      request.result.close();
      void deleteProbeDatabase().then((deleted) => {
        if (signal.aborted || !deleted) {
          resolve(failed('INDEXED_DB_FAILED'));
          return;
        }
        resolve(ready());
      });
    };
  });
};

const probeWebGl2 = (signal: AbortSignal): Promise<ProbeResult> => {
  if (signal.aborted || typeof document === 'undefined') {
    return Promise.resolve(unavailable('WEBGL2_UNAVAILABLE'));
  }

  try {
    const canvas = document.createElement('canvas');
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

const productionAdapters: CompatibilityAdapters = Object.freeze({
  getEsModulesStatus: ready,
  probeWebGl2,
  probeIndexedDb,
  getWebAudioStatus: () =>
    typeof AudioContext === 'function' ? ready() : unavailable('WEB_AUDIO_UNAVAILABLE'),
  getPointerLockStatus: () =>
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype.requestPointerLock === 'function' &&
    typeof document.exitPointerLock === 'function'
      ? ready()
      : unavailable('POINTER_LOCK_UNAVAILABLE'),
  getControllerStatus: () =>
    typeof navigator.getGamepads === 'function' ? ready() : unavailable('CONTROLLER_UNAVAILABLE'),
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
