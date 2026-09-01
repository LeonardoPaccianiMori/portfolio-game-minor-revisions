import type { CapabilityId, CapabilityStatus, CompatibilityReport } from '../platform';

declare global {
  interface ImportMeta {
    readonly env: Readonly<{ DEV: boolean }>;
  }
}

export type DiagnosticSeverity = 'warning' | 'recoverable' | 'fatal';
export type DiagnosticPhase = 'startup' | 'compatibility' | 'presentation';
export type DiagnosticModule = 'BOOTSTRAP' | 'PLATFORM' | 'DIAGNOSTICS';
export type DiagnosticOperation =
  'START_BOOTSTRAP' | 'CHECK_COMPATIBILITY' | 'PRESENT_STARTUP' | 'CREATE_DIAGNOSTIC';
export type GraphicsProfile = 'low' | 'standard' | 'high';
export type DiagnosticContextCode =
  'STARTUP_INTERRUPTED' | 'COMPATIBILITY_BLOCKED' | 'PRESENTATION_FAILED' | 'CLEANUP_FAILED';
export type RecoveryAction = 'retryCheck' | 'reloadPage';

type DiagnosticFaultMetadata = Readonly<{
  severity: DiagnosticSeverity;
  phase: DiagnosticPhase;
  module: DiagnosticModule;
  operation: DiagnosticOperation;
  recoveryActions: readonly RecoveryAction[];
}>;

const diagnosticFaultCatalogue = Object.freeze({
  'MRD1-BOOTSTRAP-START_WARNING': Object.freeze({
    severity: 'warning',
    phase: 'startup',
    module: 'BOOTSTRAP',
    operation: 'START_BOOTSTRAP',
    recoveryActions: Object.freeze([] as const),
  }),
  'MRD1-PLATFORM-CHECK_RETRY': Object.freeze({
    severity: 'recoverable',
    phase: 'compatibility',
    module: 'PLATFORM',
    operation: 'CHECK_COMPATIBILITY',
    recoveryActions: Object.freeze(['retryCheck'] as const),
  }),
  'MRD1-PLATFORM-CHECK_FAILED': Object.freeze({
    severity: 'recoverable',
    phase: 'compatibility',
    module: 'PLATFORM',
    operation: 'CHECK_COMPATIBILITY',
    recoveryActions: Object.freeze([] as const),
  }),
  'MRD1-BOOTSTRAP-START_FAILED': Object.freeze({
    severity: 'fatal',
    phase: 'startup',
    module: 'BOOTSTRAP',
    operation: 'START_BOOTSTRAP',
    recoveryActions: Object.freeze(['reloadPage'] as const),
  }),
  'MRD1-BOOTSTRAP-PRESENTATION_FAILED': Object.freeze({
    severity: 'fatal',
    phase: 'presentation',
    module: 'BOOTSTRAP',
    operation: 'PRESENT_STARTUP',
    recoveryActions: Object.freeze(['reloadPage'] as const),
  }),
  'MRD1-BOOTSTRAP-UNEXPECTED': Object.freeze({
    severity: 'fatal',
    phase: 'startup',
    module: 'BOOTSTRAP',
    operation: 'START_BOOTSTRAP',
    recoveryActions: Object.freeze(['reloadPage'] as const),
  }),
  'MRD1-PLATFORM-UNEXPECTED': Object.freeze({
    severity: 'fatal',
    phase: 'compatibility',
    module: 'PLATFORM',
    operation: 'CHECK_COMPATIBILITY',
    recoveryActions: Object.freeze(['reloadPage'] as const),
  }),
  'MRD1-DIAGNOSTICS-UNEXPECTED': Object.freeze({
    severity: 'fatal',
    phase: 'startup',
    module: 'DIAGNOSTICS',
    operation: 'CREATE_DIAGNOSTIC',
    recoveryActions: Object.freeze(['reloadPage'] as const),
  }),
  'MRD1-DIAGNOSTICS-CREATION_FAILED': Object.freeze({
    severity: 'fatal',
    phase: 'startup',
    module: 'DIAGNOSTICS',
    operation: 'CREATE_DIAGNOSTIC',
    recoveryActions: Object.freeze(['reloadPage'] as const),
  }),
} as const satisfies Readonly<Record<`MRD1-${string}`, DiagnosticFaultMetadata>>);

export type DiagnosticFaultCode = keyof typeof diagnosticFaultCatalogue;

type DiagnosticFaultFor<Code extends DiagnosticFaultCode> = Readonly<{
  code: Code;
  severity: (typeof diagnosticFaultCatalogue)[Code]['severity'];
  phase: (typeof diagnosticFaultCatalogue)[Code]['phase'];
  module: (typeof diagnosticFaultCatalogue)[Code]['module'];
  operation: (typeof diagnosticFaultCatalogue)[Code]['operation'];
  contentVersion: string | null;
  graphicsProfile: GraphicsProfile | null;
  compatibility: CompatibilityReport | null;
  contextCodes: readonly DiagnosticContextCode[];
  recoveryActions: (typeof diagnosticFaultCatalogue)[Code]['recoveryActions'];
}>;

export type DiagnosticFault = {
  [Code in DiagnosticFaultCode]: DiagnosticFaultFor<Code>;
}[DiagnosticFaultCode];

export type CapabilityStatuses = Readonly<Record<CapabilityId, CapabilityStatus>>;

export type DiagnosticRecord = Readonly<{
  schemaVersion: 1;
  code: string;
  severity: DiagnosticSeverity;
  phase: DiagnosticPhase;
  module: DiagnosticModule;
  operation: DiagnosticOperation;
  buildVersion: '0.0.0';
  contentVersion: string | null;
  graphicsProfile: GraphicsProfile | null;
  capabilities: CapabilityStatuses | null;
  contextCodes: readonly DiagnosticContextCode[];
  recoveryActions: readonly RecoveryAction[];
}>;

export type SanitizedDiagnostic = Readonly<{
  record: DiagnosticRecord;
  copyForm: string;
}>;

type DiagnosticAdapters = Readonly<{
  development: boolean;
  encode: (value: string) => Uint8Array;
  stringify: (value: DiagnosticRecord) => string;
  freeze: <T>(value: T) => Readonly<T>;
  reportDevelopmentError: (error: Error) => void;
}>;

const BUILD_VERSION = '0.0.0' as const;
const MAX_COPY_BYTES = 2_048;
const capabilityOrder: readonly CapabilityId[] = Object.freeze([
  'esModules',
  'webgl2',
  'indexedDb',
  'webAudio',
  'pointerLock',
  'controller',
]);
const requiredByCapability: Readonly<Record<CapabilityId, boolean>> = Object.freeze({
  esModules: true,
  webgl2: true,
  indexedDb: true,
  webAudio: true,
  pointerLock: true,
  controller: false,
});
const reasonPrefixByCapability: Readonly<Record<CapabilityId, string>> = Object.freeze({
  esModules: 'ES_MODULES',
  webgl2: 'WEBGL2',
  indexedDb: 'INDEXED_DB',
  webAudio: 'WEB_AUDIO',
  pointerLock: 'POINTER_LOCK',
  controller: 'CONTROLLER',
});

const fixedFallbackMetadata = diagnosticFaultCatalogue['MRD1-DIAGNOSTICS-CREATION_FAILED'];
const fixedFallbackRecord: DiagnosticRecord = Object.freeze({
  schemaVersion: 1,
  code: 'MRD1-DIAGNOSTICS-CREATION_FAILED',
  severity: fixedFallbackMetadata.severity,
  phase: fixedFallbackMetadata.phase,
  module: fixedFallbackMetadata.module,
  operation: fixedFallbackMetadata.operation,
  buildVersion: BUILD_VERSION,
  contentVersion: null,
  graphicsProfile: null,
  capabilities: null,
  contextCodes: Object.freeze([] as DiagnosticContextCode[]),
  recoveryActions: fixedFallbackMetadata.recoveryActions,
});
const fixedFallback: SanitizedDiagnostic = Object.freeze({
  record: fixedFallbackRecord,
  copyForm: JSON.stringify(fixedFallbackRecord),
});

type NormalizedDiagnosticFault = Readonly<{
  code: DiagnosticFaultCode;
  severity: DiagnosticSeverity;
  phase: DiagnosticPhase;
  module: DiagnosticModule;
  operation: DiagnosticOperation;
  contentVersion: string | null;
  graphicsProfile: GraphicsProfile | null;
  capabilities: CapabilityStatuses | null;
  contextCodes: readonly DiagnosticContextCode[];
  recoveryActions: readonly RecoveryAction[];
}>;

const readExactDataProperties = (
  value: unknown,
  expected: readonly string[],
): Readonly<Record<string, unknown>> | null => {
  if (typeof value !== 'object' || value === null) {
    return null;
  }

  const descriptors = Object.getOwnPropertyDescriptors(value);
  const ownKeys = Reflect.ownKeys(descriptors);
  if (
    ownKeys.length !== expected.length ||
    ownKeys.some((key) => typeof key !== 'string' || !expected.includes(key))
  ) {
    return null;
  }

  const snapshot: Record<string, unknown> = {};
  for (const key of expected) {
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !('value' in descriptor)) {
      return null;
    }
    snapshot[key] = descriptor.value;
  }
  return Object.freeze(snapshot);
};

const readClosedArray = (value: unknown, maximumLength: number): readonly unknown[] | null => {
  if (!Array.isArray(value)) {
    return null;
  }
  const descriptors = Object.getOwnPropertyDescriptors(value as object);
  const lengthDescriptor = descriptors.length;
  if (
    lengthDescriptor === undefined ||
    !('value' in lengthDescriptor) ||
    typeof lengthDescriptor.value !== 'number' ||
    lengthDescriptor.value > maximumLength
  ) {
    return null;
  }

  const length = lengthDescriptor.value;
  const expectedKeys = Array.from({ length }, (_, index) => String(index));
  expectedKeys.push('length');
  const ownKeys = Reflect.ownKeys(descriptors);
  if (
    ownKeys.length !== expectedKeys.length ||
    ownKeys.some((key) => typeof key !== 'string' || !expectedKeys.includes(key))
  ) {
    return null;
  }

  const snapshot: unknown[] = [];
  for (let index = 0; index < length; index += 1) {
    const descriptor = descriptors[String(index)];
    if (descriptor === undefined || !descriptor.enumerable || !('value' in descriptor)) {
      return null;
    }
    snapshot.push(descriptor.value);
  }
  return Object.freeze(snapshot);
};

const normalizeCompatibility = (value: unknown): CapabilityStatuses | null | undefined => {
  if (value === null) {
    return null;
  }
  const candidate = readExactDataProperties(value, ['capabilities', 'overall', 'schemaVersion']);
  if (candidate === null) {
    return undefined;
  }
  const capabilities = readClosedArray(candidate.capabilities, capabilityOrder.length);
  if (
    candidate.schemaVersion !== 1 ||
    !['supported', 'degraded', 'blocked'].some((allowed) => allowed === candidate.overall) ||
    capabilities === null ||
    capabilities.length !== capabilityOrder.length
  ) {
    return undefined;
  }

  const statuses = {} as Record<CapabilityId, CapabilityStatus>;
  let requiredBlocked = false;
  let controllerReady = false;
  for (const [index, id] of capabilityOrder.entries()) {
    const entry = readExactDataProperties(capabilities[index], [
      'id',
      'reasonCode',
      'required',
      'status',
    ]);
    if (entry === null) {
      return undefined;
    }
    if (
      entry.id !== id ||
      entry.required !== requiredByCapability[id] ||
      !['ready', 'unavailable', 'failed'].some((allowed) => allowed === entry.status)
    ) {
      return undefined;
    }
    const status = entry.status as CapabilityStatus;
    const expectedReason =
      status === 'ready'
        ? null
        : `${reasonPrefixByCapability[id]}_${status === 'failed' ? 'FAILED' : 'UNAVAILABLE'}`;
    if (entry.reasonCode !== expectedReason) {
      return undefined;
    }
    statuses[id] = status;
    requiredBlocked ||= entry.required === true && status !== 'ready';
    if (id === 'controller') {
      controllerReady = status === 'ready';
    }
  }

  const expectedOverall = requiredBlocked ? 'blocked' : controllerReady ? 'supported' : 'degraded';
  return candidate.overall === expectedOverall ? Object.freeze(statuses) : undefined;
};

const normalizeDiagnosticFault = (value: unknown): NormalizedDiagnosticFault | null => {
  const candidate = readExactDataProperties(value, [
    'code',
    'compatibility',
    'contentVersion',
    'contextCodes',
    'graphicsProfile',
    'module',
    'operation',
    'phase',
    'recoveryActions',
    'severity',
  ]);
  if (candidate === null) {
    return null;
  }

  const compatibility = normalizeCompatibility(candidate.compatibility);
  const contextCodes = readClosedArray(candidate.contextCodes, 8);
  const recoveryActions = readClosedArray(candidate.recoveryActions, 1);
  const code = candidate.code;
  const metadata =
    typeof code === 'string' && Object.hasOwn(diagnosticFaultCatalogue, code)
      ? diagnosticFaultCatalogue[code as DiagnosticFaultCode]
      : undefined;
  if (
    metadata !== undefined &&
    candidate.severity === metadata.severity &&
    candidate.phase === metadata.phase &&
    candidate.module === metadata.module &&
    candidate.operation === metadata.operation &&
    (candidate.contentVersion === null || candidate.contentVersion === BUILD_VERSION) &&
    (candidate.graphicsProfile === null ||
      ['low', 'standard', 'high'].some((allowed) => allowed === candidate.graphicsProfile)) &&
    compatibility !== undefined &&
    contextCodes !== null &&
    contextCodes.every(
      (code) =>
        typeof code === 'string' &&
        [
          'STARTUP_INTERRUPTED',
          'COMPATIBILITY_BLOCKED',
          'PRESENTATION_FAILED',
          'CLEANUP_FAILED',
        ].some((allowed) => allowed === code),
    ) &&
    recoveryActions !== null &&
    recoveryActions.length === metadata.recoveryActions.length &&
    recoveryActions.every((action, index) => action === metadata.recoveryActions[index])
  ) {
    return Object.freeze({
      code: code as DiagnosticFaultCode,
      severity: metadata.severity,
      phase: metadata.phase,
      module: metadata.module,
      operation: metadata.operation,
      contentVersion: candidate.contentVersion,
      graphicsProfile: candidate.graphicsProfile as GraphicsProfile | null,
      capabilities: compatibility,
      contextCodes: contextCodes as readonly DiagnosticContextCode[],
      recoveryActions: metadata.recoveryActions,
    });
  }
  return null;
};

const unexpectedCodeForModule: Readonly<Record<DiagnosticModule, DiagnosticFaultCode>> =
  Object.freeze({
    BOOTSTRAP: 'MRD1-BOOTSTRAP-UNEXPECTED',
    PLATFORM: 'MRD1-PLATFORM-UNEXPECTED',
    DIAGNOSTICS: 'MRD1-DIAGNOSTICS-UNEXPECTED',
  });

class DiagnosticConverter {
  public constructor(private readonly adapters: DiagnosticAdapters) {}

  public create(input: unknown, owningModule: DiagnosticModule): SanitizedDiagnostic {
    if (this.adapters.development && input instanceof Error) {
      this.adapters.reportDevelopmentError(input);
    }

    try {
      const fault = normalizeDiagnosticFault(input) ?? this.unknownFault(owningModule);
      const record = this.adapters.freeze({
        schemaVersion: 1 as const,
        code: fault.code,
        severity: fault.severity,
        phase: fault.phase,
        module: fault.module,
        operation: fault.operation,
        buildVersion: BUILD_VERSION,
        contentVersion: fault.contentVersion,
        graphicsProfile: fault.graphicsProfile,
        capabilities: fault.capabilities,
        contextCodes: this.adapters.freeze([...fault.contextCodes]),
        recoveryActions: this.adapters.freeze([...fault.recoveryActions]),
      });
      const copyForm = this.adapters.stringify(record);
      if (this.adapters.encode(copyForm).byteLength > MAX_COPY_BYTES) {
        return fixedFallback;
      }
      return this.adapters.freeze({ record, copyForm });
    } catch {
      return fixedFallback;
    }
  }

  private unknownFault(module: DiagnosticModule): NormalizedDiagnosticFault {
    const code = unexpectedCodeForModule[module];
    const metadata = diagnosticFaultCatalogue[code];
    return Object.freeze({
      code,
      severity: metadata.severity,
      phase: metadata.phase,
      module: metadata.module,
      operation: metadata.operation,
      contentVersion: null,
      graphicsProfile: null,
      capabilities: null,
      contextCodes: Object.freeze(['STARTUP_INTERRUPTED'] as DiagnosticContextCode[]),
      recoveryActions: metadata.recoveryActions,
    });
  }
}

const productionConverter = new DiagnosticConverter({
  development: import.meta.env.DEV,
  encode: (value) => new TextEncoder().encode(value),
  stringify: (value) => JSON.stringify(value),
  freeze: Object.freeze,
  reportDevelopmentError: import.meta.env.DEV
    ? (error) => console.error('Local startup failure', error)
    : () => undefined,
});

export const createDiagnostic = (fault: DiagnosticFault): SanitizedDiagnostic =>
  productionConverter.create(fault, fault.module);

export const createUnexpectedDiagnostic = (
  owningModule: DiagnosticModule,
  fault: unknown,
): SanitizedDiagnostic => productionConverter.create(fault, owningModule);

export const createDiagnosticConverterForTests = (adapters: DiagnosticAdapters) => {
  const converter = new DiagnosticConverter(adapters);
  return Object.freeze({
    catalogue: diagnosticFaultCatalogue,
    create: (input: unknown, owningModule: DiagnosticModule): SanitizedDiagnostic =>
      converter.create(input, owningModule),
  });
};
