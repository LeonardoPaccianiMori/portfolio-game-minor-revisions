import { describe, expect, it, vi } from 'vitest';

import {
  createDiagnosticConverterForTests,
  type DiagnosticFault,
} from '../../../src/bootstrap/diagnostics';

type TestAdapters = Parameters<typeof createDiagnosticConverterForTests>[0];

const adapters = (overrides: Partial<TestAdapters> = {}): TestAdapters => ({
  development: false,
  encode: (value) => new TextEncoder().encode(value),
  stringify: (value) => JSON.stringify(value),
  freeze: Object.freeze,
  reportDevelopmentError: () => undefined,
  ...overrides,
});

const validFault = (overrides: Partial<DiagnosticFault> = {}): DiagnosticFault => ({
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

describe('MR-S11-DIA-001 diagnostics', () => {
  it.each([
    ['warning', []],
    ['recoverable', ['retryCheck']],
    ['recoverable', []],
    ['fatal', ['reloadPage']],
  ] as const)('converts the closed %s recovery form', (severity, recoveryActions) => {
    const diagnostic = createDiagnosticConverterForTests(adapters()).create(
      validFault({ severity, recoveryActions }),
      'BOOTSTRAP',
    );

    expect(diagnostic.record.severity).toBe(severity);
    expect(diagnostic.record.recoveryActions).toEqual(recoveryActions);
    expect(Object.isFrozen(diagnostic.record)).toBe(true);
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
