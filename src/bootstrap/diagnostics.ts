import type {
  CapabilityId,
  CapabilityStatus,
  CompatibilityReport,
} from '../platform/compatibility';

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

export type DiagnosticFault = Readonly<{
  code: `MRD1-${string}`;
  severity: DiagnosticSeverity;
  phase: DiagnosticPhase;
  module: DiagnosticModule;
  operation: DiagnosticOperation;
  contentVersion: string | null;
  graphicsProfile: GraphicsProfile | null;
  compatibility: CompatibilityReport | null;
  contextCodes: readonly DiagnosticContextCode[];
  recoveryActions: readonly RecoveryAction[];
}>;

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
const codePattern = /^MRD1-[A-Z0-9_]+-[A-Z0-9_]+$/u;
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

const fixedFallbackRecord: DiagnosticRecord = Object.freeze({
  schemaVersion: 1,
  code: 'MRD1-DIAGNOSTICS-CREATION_FAILED',
  severity: 'fatal',
  phase: 'startup',
  module: 'DIAGNOSTICS',
  operation: 'CREATE_DIAGNOSTIC',
  buildVersion: BUILD_VERSION,
  contentVersion: null,
  graphicsProfile: null,
  capabilities: null,
  contextCodes: Object.freeze([] as DiagnosticContextCode[]),
  recoveryActions: Object.freeze(['reloadPage'] as RecoveryAction[]),
});
const fixedFallback: SanitizedDiagnostic = Object.freeze({
  record: fixedFallbackRecord,
  copyForm: JSON.stringify(fixedFallbackRecord),
});

type NormalizedDiagnosticFault = Readonly<{
  code: `MRD1-${string}`;
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
  if (
    typeof candidate.code === 'string' &&
    candidate.code.length <= 64 &&
    codePattern.test(candidate.code) &&
    ['warning', 'recoverable', 'fatal'].some((allowed) => allowed === candidate.severity) &&
    ['startup', 'compatibility', 'presentation'].some((allowed) => allowed === candidate.phase) &&
    ['BOOTSTRAP', 'PLATFORM', 'DIAGNOSTICS'].some((allowed) => allowed === candidate.module) &&
    ['START_BOOTSTRAP', 'CHECK_COMPATIBILITY', 'PRESENT_STARTUP', 'CREATE_DIAGNOSTIC'].includes(
      candidate.operation as string,
    ) &&
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
    recoveryActions.every(
      (action) =>
        typeof action === 'string' &&
        ['retryCheck', 'reloadPage'].some((allowed) => allowed === action),
    )
  ) {
    const severity = candidate.severity as DiagnosticSeverity;
    const recoveryIsValid =
      (severity === 'warning' && recoveryActions.length === 0) ||
      (severity === 'recoverable' &&
        (recoveryActions.length === 0 ||
          (recoveryActions.length === 1 && recoveryActions[0] === 'retryCheck'))) ||
      (severity === 'fatal' && recoveryActions.length === 1 && recoveryActions[0] === 'reloadPage');
    if (!recoveryIsValid) {
      return null;
    }

    return Object.freeze({
      code: candidate.code as `MRD1-${string}`,
      severity,
      phase: candidate.phase as DiagnosticPhase,
      module: candidate.module as DiagnosticModule,
      operation: candidate.operation as DiagnosticOperation,
      contentVersion: candidate.contentVersion,
      graphicsProfile: candidate.graphicsProfile as GraphicsProfile | null,
      capabilities: compatibility,
      contextCodes: contextCodes as readonly DiagnosticContextCode[],
      recoveryActions: recoveryActions as readonly RecoveryAction[],
    });
  }
  return null;
};

const operationForModule: Readonly<Record<DiagnosticModule, DiagnosticOperation>> = Object.freeze({
  BOOTSTRAP: 'START_BOOTSTRAP',
  PLATFORM: 'CHECK_COMPATIBILITY',
  DIAGNOSTICS: 'CREATE_DIAGNOSTIC',
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
    return Object.freeze({
      code: `MRD1-${module}-UNEXPECTED`,
      severity: 'fatal',
      phase: 'startup',
      module,
      operation: operationForModule[module],
      contentVersion: null,
      graphicsProfile: null,
      capabilities: null,
      contextCodes: Object.freeze(['STARTUP_INTERRUPTED'] as DiagnosticContextCode[]),
      recoveryActions: Object.freeze(['reloadPage'] as RecoveryAction[]),
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
    create: (input: unknown, owningModule: DiagnosticModule): SanitizedDiagnostic =>
      converter.create(input, owningModule),
  });
};
