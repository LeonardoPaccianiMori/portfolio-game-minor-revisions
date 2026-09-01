import { describe, expect, it, vi } from 'vitest';

import {
  createDiagnosticConverterForTests,
  type DiagnosticFault,
} from '../../../src/bootstrap/diagnostics';
import type { CompatibilityReport } from '../../../src/platform';

type TestAdapters = Parameters<typeof createDiagnosticConverterForTests>[0];

const adapters = (overrides: Partial<TestAdapters> = {}): TestAdapters => ({
  development: false,
  encode: (value) => new TextEncoder().encode(value),
  stringify: (value) => JSON.stringify(value),
  freeze: Object.freeze,
  reportDevelopmentError: () => undefined,
  ...overrides,
});

type FaultInput = Readonly<{
  code: string;
  severity: string;
  phase: string;
  module: string;
  operation: string;
  contentVersion: string | null;
  graphicsProfile: string | null;
  compatibility: CompatibilityReport | null;
  contextCodes: readonly string[];
  recoveryActions: readonly string[];
}>;

const validFault = (overrides: Partial<FaultInput> = {}): FaultInput => ({
  code: 'MRD1-BOOTSTRAP-START_FAILED',
  severity: 'fatal',
  phase: 'startup',
  module: 'BOOTSTRAP',
  operation: 'START_BOOTSTRAP',
  contentVersion: null,
  graphicsProfile: null,
  compatibility: null,
  contextCodes: ['STARTUP_INTERRUPTED'],
  recoveryActions: ['reloadPage'],
  ...overrides,
});

const catalogueCases = [
  {
    code: 'MRD1-BOOTSTRAP-START_WARNING',
    severity: 'warning',
    phase: 'startup',
    module: 'BOOTSTRAP',
    operation: 'START_BOOTSTRAP',
    recoveryActions: [],
  },
  {
    code: 'MRD1-PLATFORM-CHECK_RETRY',
    severity: 'recoverable',
    phase: 'compatibility',
    module: 'PLATFORM',
    operation: 'CHECK_COMPATIBILITY',
    recoveryActions: ['retryCheck'],
  },
  {
    code: 'MRD1-PLATFORM-CHECK_FAILED',
    severity: 'recoverable',
    phase: 'compatibility',
    module: 'PLATFORM',
    operation: 'CHECK_COMPATIBILITY',
    recoveryActions: [],
  },
  {
    code: 'MRD1-BOOTSTRAP-START_FAILED',
    severity: 'fatal',
    phase: 'startup',
    module: 'BOOTSTRAP',
    operation: 'START_BOOTSTRAP',
    recoveryActions: ['reloadPage'],
  },
  {
    code: 'MRD1-BOOTSTRAP-PRESENTATION_FAILED',
    severity: 'fatal',
    phase: 'presentation',
    module: 'BOOTSTRAP',
    operation: 'PRESENT_STARTUP',
    recoveryActions: ['reloadPage'],
  },
  {
    code: 'MRD1-BOOTSTRAP-UNEXPECTED',
    severity: 'fatal',
    phase: 'startup',
    module: 'BOOTSTRAP',
    operation: 'START_BOOTSTRAP',
    recoveryActions: ['reloadPage'],
  },
  {
    code: 'MRD1-PLATFORM-UNEXPECTED',
    severity: 'fatal',
    phase: 'compatibility',
    module: 'PLATFORM',
    operation: 'CHECK_COMPATIBILITY',
    recoveryActions: ['reloadPage'],
  },
  {
    code: 'MRD1-DIAGNOSTICS-UNEXPECTED',
    severity: 'fatal',
    phase: 'startup',
    module: 'DIAGNOSTICS',
    operation: 'CREATE_DIAGNOSTIC',
    recoveryActions: ['reloadPage'],
  },
  {
    code: 'MRD1-DIAGNOSTICS-CREATION_FAILED',
    severity: 'fatal',
    phase: 'startup',
    module: 'DIAGNOSTICS',
    operation: 'CREATE_DIAGNOSTIC',
    recoveryActions: ['reloadPage'],
  },
] as const;

const validCompatibility = () => ({
  schemaVersion: 1,
  overall: 'supported',
  capabilities: [
    { id: 'esModules', required: true, status: 'ready', reasonCode: null },
    { id: 'webgl2', required: true, status: 'ready', reasonCode: null },
    { id: 'indexedDb', required: true, status: 'ready', reasonCode: null },
    { id: 'webAudio', required: true, status: 'ready', reasonCode: null },
    { id: 'pointerLock', required: true, status: 'ready', reasonCode: null },
    { id: 'controller', required: false, status: 'ready', reasonCode: null },
  ],
});

describe('MR-S11-DIA-001 diagnostics', () => {
  it.each(catalogueCases)('converts the exact closed catalogue mapping for $code', (mapping) => {
    const diagnostic = createDiagnosticConverterForTests(adapters()).create(
      validFault(mapping),
      'BOOTSTRAP',
    );

    expect(diagnostic.record).toMatchObject(mapping);
    expect(Object.isFrozen(diagnostic.record)).toBe(true);
  });

  it.each([
    { code: 'MRD1-BOOTSTRAP-NOT_CATALOGUED' },
    { code: 'MRD1-BOOTSTRAP-START_FAILED', module: 'PLATFORM' },
    { code: 'MRD1-BOOTSTRAP-START_FAILED', phase: 'presentation' },
    { code: 'MRD1-BOOTSTRAP-START_FAILED', operation: 'PRESENT_STARTUP' },
    { code: 'MRD1-BOOTSTRAP-START_FAILED', severity: 'recoverable' },
    { code: 'MRD1-BOOTSTRAP-START_FAILED', recoveryActions: [] },
    { code: 'MRD1-BOOTSTRAP-START_FAILED', recoveryActions: ['retryCheck'] },
  ])('rejects an unknown or inconsistent catalogue combination %#', (override) => {
    const diagnostic = createDiagnosticConverterForTests(adapters()).create(
      validFault(override),
      'BOOTSTRAP',
    );

    expect(diagnostic.record.code).toBe('MRD1-BOOTSTRAP-UNEXPECTED');
    expect(diagnostic.record.severity).toBe('fatal');
    expect(diagnostic.record.recoveryActions).toEqual(['reloadPage']);
  });

  it('uses the fixed canonical field order and only approved safe values', () => {
    const diagnostic = createDiagnosticConverterForTests(adapters()).create(
      validFault(),
      'BOOTSTRAP',
    );

    expect(Object.keys(diagnostic.record)).toEqual([
      'schemaVersion',
      'code',
      'severity',
      'phase',
      'module',
      'operation',
      'buildVersion',
      'contentVersion',
      'graphicsProfile',
      'capabilities',
      'contextCodes',
      'recoveryActions',
    ]);
    expect(diagnostic.copyForm).toBe(JSON.stringify(diagnostic.record));
    expect(new TextEncoder().encode(diagnostic.copyForm).byteLength).toBeLessThanOrEqual(2_048);
    expect(diagnostic.copyForm).not.toMatch(
      /stack|path|https?:|userAgent|player|campaign|save|device|password|token/iu,
    );
  });

  it('copies exactly the six safe capability statuses in canonical order', () => {
    const diagnostic = createDiagnosticConverterForTests(adapters()).create(
      validFault({
        compatibility: {
          schemaVersion: 1,
          overall: 'blocked',
          capabilities: [
            { id: 'esModules', required: true, status: 'ready', reasonCode: null },
            { id: 'webgl2', required: true, status: 'failed', reasonCode: 'WEBGL2_FAILED' },
            { id: 'indexedDb', required: true, status: 'ready', reasonCode: null },
            { id: 'webAudio', required: true, status: 'ready', reasonCode: null },
            {
              id: 'pointerLock',
              required: true,
              status: 'unavailable',
              reasonCode: 'POINTER_LOCK_UNAVAILABLE',
            },
            {
              id: 'controller',
              required: false,
              status: 'unavailable',
              reasonCode: 'CONTROLLER_UNAVAILABLE',
            },
          ],
        },
      }),
      'BOOTSTRAP',
    );

    expect(diagnostic.record.capabilities).toEqual({
      esModules: 'ready',
      webgl2: 'failed',
      indexedDb: 'ready',
      webAudio: 'ready',
      pointerLock: 'unavailable',
      controller: 'unavailable',
    });
    expect(Object.keys(diagnostic.record.capabilities ?? {})).toEqual([
      'esModules',
      'webgl2',
      'indexedDb',
      'webAudio',
      'pointerLock',
      'controller',
    ]);
    expect(Object.isFrozen(diagnostic.record.capabilities)).toBe(true);
  });

  it('maps arbitrary or prohibited input to one stable owning-module result', () => {
    const converter = createDiagnosticConverterForTests(adapters());
    const prohibited = {
      message: 'raw browser error',
      stack: '/private/path/source.ts',
      url: 'https://outside.invalid',
      campaign: { player: 'private' },
    };

    const first = converter.create(prohibited, 'PLATFORM');
    const second = converter.create({ different: 'arbitrary' }, 'PLATFORM');

    expect(first.record.code).toBe('MRD1-PLATFORM-UNEXPECTED');
    expect(second).toEqual(first);
    expect(first.copyForm).not.toContain(JSON.stringify(prohibited));
  });

  it('rejects extra fields and more than eight context codes as non-closed input', () => {
    const converter = createDiagnosticConverterForTests(adapters());
    const withExtraField = { ...validFault(), rawError: 'prohibited' };
    const withTooManyCodes = {
      ...validFault(),
      contextCodes: Array.from({ length: 9 }, () => 'STARTUP_INTERRUPTED'),
    };

    expect(converter.create(withExtraField, 'BOOTSTRAP').record.code).toBe(
      'MRD1-BOOTSTRAP-UNEXPECTED',
    );
    expect(converter.create(withTooManyCodes, 'BOOTSTRAP').record.code).toBe(
      'MRD1-BOOTSTRAP-UNEXPECTED',
    );
  });

  it.each([
    { ...validCompatibility(), extra: 'not allowed' },
    { ...validCompatibility(), schemaVersion: 2 },
    { ...validCompatibility(), overall: 'arbitrary' },
    { ...validCompatibility(), capabilities: null },
    { ...validCompatibility(), capabilities: validCompatibility().capabilities.slice(0, 5) },
    {
      ...validCompatibility(),
      capabilities: [null, ...validCompatibility().capabilities.slice(1)],
    },
    {
      ...validCompatibility(),
      capabilities: validCompatibility().capabilities.map((entry, index) =>
        index === 0 ? { ...entry, extra: 'not allowed' } : entry,
      ),
    },
    {
      ...validCompatibility(),
      capabilities: validCompatibility().capabilities.map((entry, index) =>
        index === 0 ? { ...entry, id: 'webgl2' } : entry,
      ),
    },
    {
      ...validCompatibility(),
      capabilities: validCompatibility().capabilities.map((entry, index) =>
        index === 5 ? { ...entry, required: true } : entry,
      ),
    },
    {
      ...validCompatibility(),
      capabilities: validCompatibility().capabilities.map((entry, index) =>
        index === 1 ? { ...entry, status: 'private-value' } : entry,
      ),
    },
    {
      ...validCompatibility(),
      capabilities: validCompatibility().capabilities.map((entry, index) =>
        index === 1 ? { ...entry, reasonCode: 'WEBGL2_FAILED' } : entry,
      ),
    },
    { ...validCompatibility(), overall: 'degraded' },
  ])('rejects malformed closed compatibility input %#', (compatibility) => {
    const result = createDiagnosticConverterForTests(adapters()).create(
      { ...validFault(), compatibility },
      'BOOTSTRAP',
    );

    expect(result.record.code).toBe('MRD1-BOOTSTRAP-UNEXPECTED');
    expect(result.record.capabilities).toBeNull();
    expect(result.copyForm).not.toContain('private-value');
  });

  it('rejects a hostile top-level accessor without invoking or copying it', () => {
    let reads = 0;
    const arbitrary = 'PRIVATE-TOP-LEVEL-VALUE';
    const input = validFault();
    Object.defineProperty(input, 'code', {
      configurable: true,
      enumerable: true,
      get: () => {
        reads += 1;
        return reads === 1 ? 'MRD1-BOOTSTRAP-START_FAILED' : arbitrary;
      },
    });

    const result = createDiagnosticConverterForTests(adapters()).create(input, 'BOOTSTRAP');
    expect(result.record.code).toBe('MRD1-BOOTSTRAP-UNEXPECTED');
    expect(reads).toBe(0);
    expect(result.copyForm).not.toContain(arbitrary);
  });

  it('rejects a changing nested capability accessor without invoking or copying it', () => {
    let reads = 0;
    const arbitrary = 'PRIVATE-NESTED-CAPABILITY-VALUE';
    const compatibility = validCompatibility();
    Object.defineProperty(compatibility.capabilities[0], 'status', {
      configurable: true,
      enumerable: true,
      get: () => {
        reads += 1;
        return reads === 1 ? 'ready' : arbitrary;
      },
    });

    const result = createDiagnosticConverterForTests(adapters()).create(
      { ...validFault(), compatibility },
      'BOOTSTRAP',
    );
    expect(result.record.code).toBe('MRD1-BOOTSTRAP-UNEXPECTED');
    expect(result.record.capabilities).toBeNull();
    expect(reads).toBe(0);
    expect(result.copyForm).not.toContain(arbitrary);
  });

  it('rejects a throwing accessor without invoking it', () => {
    let reads = 0;
    const input = validFault();
    Object.defineProperty(input, 'compatibility', {
      configurable: true,
      enumerable: true,
      get: () => {
        reads += 1;
        throw new Error('controlled hostile getter');
      },
    });

    const result = createDiagnosticConverterForTests(adapters()).create(input, 'BOOTSTRAP');
    expect(result.record.code).toBe('MRD1-BOOTSTRAP-UNEXPECTED');
    expect(reads).toBe(0);
  });

  it('accepts the closed optional content, graphics, context, and recovery values', () => {
    const result = createDiagnosticConverterForTests(adapters()).create(
      validFault({
        contentVersion: '0.0.0',
        graphicsProfile: 'standard',
        contextCodes: [
          'STARTUP_INTERRUPTED',
          'COMPATIBILITY_BLOCKED',
          'PRESENTATION_FAILED',
          'CLEANUP_FAILED',
        ],
        recoveryActions: ['reloadPage'],
      }),
      'BOOTSTRAP',
    );
    expect(result.record).toMatchObject({
      contentVersion: '0.0.0',
      graphicsProfile: 'standard',
    });
  });

  it('uses the fixed non-recursive fallback when conversion fails', () => {
    const converter = createDiagnosticConverterForTests(
      adapters({
        stringify: () => {
          throw new Error('controlled conversion failure');
        },
      }),
    );

    const result = converter.create(validFault(), 'BOOTSTRAP');

    expect(result.record.code).toBe('MRD1-DIAGNOSTICS-CREATION_FAILED');
    expect(result.copyForm).toBe(JSON.stringify(result.record));
  });

  it('accepts the inclusive 2-KiB boundary and rejects 2,049 bytes without truncation', () => {
    const atLimit = createDiagnosticConverterForTests(
      adapters({ encode: () => new Uint8Array(2_048) }),
    ).create(validFault(), 'BOOTSTRAP');
    const overLimit = createDiagnosticConverterForTests(
      adapters({ encode: () => new Uint8Array(2_049) }),
    ).create(validFault(), 'BOOTSTRAP');

    expect(atLimit.record.code).toBe('MRD1-BOOTSTRAP-START_FAILED');
    expect(overLimit.record.code).toBe('MRD1-DIAGNOSTICS-CREATION_FAILED');
    expect(overLimit.copyForm).toBe(JSON.stringify(overLimit.record));
  });

  it('keeps raw Error visibility in local development only', () => {
    const report = vi.fn();
    const error = new Error('controlled private development error');

    createDiagnosticConverterForTests(
      adapters({ development: false, reportDevelopmentError: report }),
    ).create(error, 'BOOTSTRAP');
    expect(report).not.toHaveBeenCalled();

    createDiagnosticConverterForTests(
      adapters({ development: true, reportDevelopmentError: report }),
    ).create(error, 'BOOTSTRAP');
    expect(report).toHaveBeenCalledOnce();
    expect(report).toHaveBeenCalledWith(error);
  });

  it('performs conversion without clipboard, storage, console, or network output', () => {
    const sideEffect = vi.fn();
    const converter = createDiagnosticConverterForTests(
      adapters({
        development: false,
        reportDevelopmentError: sideEffect,
      }),
    );
    const result = converter.create(validFault(), 'BOOTSTRAP');

    expect(result.copyForm).toBeTypeOf('string');
    expect(sideEffect).not.toHaveBeenCalled();
  });

  it('keeps canonical JSON independent of object insertion order', () => {
    const converter = createDiagnosticConverterForTests(adapters());
    const first = converter.create(validFault(), 'BOOTSTRAP');
    const reordered = {
      recoveryActions: ['reloadPage'],
      contextCodes: ['STARTUP_INTERRUPTED'],
      compatibility: null,
      graphicsProfile: null,
      contentVersion: null,
      operation: 'START_BOOTSTRAP',
      module: 'BOOTSTRAP',
      phase: 'startup',
      severity: 'fatal',
      code: 'MRD1-BOOTSTRAP-START_FAILED',
    } satisfies DiagnosticFault;
    const second = converter.create(reordered, 'BOOTSTRAP');

    expect(second.copyForm).toBe(first.copyForm);
  });
});
