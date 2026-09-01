import { describe, expect, it } from 'vitest';

import {
  capabilityIds,
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
});
