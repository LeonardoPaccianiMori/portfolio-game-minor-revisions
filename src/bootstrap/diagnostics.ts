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

const isDiagnosticFault = (value: unknown): value is DiagnosticFault => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const candidate = value as Partial<DiagnosticFault>;
  const keys = Object.keys(value).sort();
  return (
    JSON.stringify(keys) ===
      JSON.stringify(
        [
          'code',
          'severity',
          'phase',
          'module',
          'operation',
          'contentVersion',
          'graphicsProfile',
          'compatibility',
          'contextCodes',
          'recoveryActions',
        ].sort(),
      ) &&
    typeof candidate.code === 'string' &&
    candidate.code.length <= 64 &&
    codePattern.test(candidate.code) &&
    ['warning', 'recoverable', 'fatal'].includes(candidate.severity ?? '') &&
    ['startup', 'compatibility', 'presentation'].includes(candidate.phase ?? '') &&
    ['BOOTSTRAP', 'PLATFORM', 'DIAGNOSTICS'].includes(candidate.module ?? '') &&
    ['START_BOOTSTRAP', 'CHECK_COMPATIBILITY', 'PRESENT_STARTUP', 'CREATE_DIAGNOSTIC'].includes(
      candidate.operation ?? '',
    ) &&
    (candidate.contentVersion === null || candidate.contentVersion === BUILD_VERSION) &&
    (candidate.graphicsProfile === null ||
      ['low', 'standard', 'high'].includes(candidate.graphicsProfile ?? '')) &&
    (candidate.compatibility === null || candidate.compatibility?.schemaVersion === 1) &&
    Array.isArray(candidate.contextCodes) &&
    candidate.contextCodes.length <= 8 &&
    candidate.contextCodes.every(
      (code) =>
        typeof code === 'string' &&
        [
          'STARTUP_INTERRUPTED',
          'COMPATIBILITY_BLOCKED',
          'PRESENTATION_FAILED',
          'CLEANUP_FAILED',
        ].some((allowed) => allowed === code),
    ) &&
    Array.isArray(candidate.recoveryActions) &&
    candidate.recoveryActions.every(
      (action) =>
        typeof action === 'string' &&
        ['retryCheck', 'reloadPage'].some((allowed) => allowed === action),
    )
  );
};

const capabilityStatuses = (report: CompatibilityReport | null): CapabilityStatuses | null => {
  if (report === null || report.capabilities.length !== capabilityOrder.length) {
    return null;
  }
  const statuses = {} as Record<CapabilityId, CapabilityStatus>;
  for (const [index, id] of capabilityOrder.entries()) {
    const entry = report.capabilities[index];
    if (entry?.id !== id) {
      return null;
    }
    statuses[id] = entry.status;
  }
  return Object.freeze(statuses);
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

    const fault = isDiagnosticFault(input) ? input : this.unknownFault(owningModule);
    try {
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
        capabilities: capabilityStatuses(fault.compatibility),
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

  private unknownFault(module: DiagnosticModule): DiagnosticFault {
    return Object.freeze({
      code: `MRD1-${module}-UNEXPECTED`,
      severity: 'fatal',
      phase: 'startup',
      module,
      operation: operationForModule[module],
      contentVersion: null,
      graphicsProfile: null,
      compatibility: null,
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
