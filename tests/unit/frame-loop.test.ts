import { describe, expect, it } from 'vitest';

import { createFrameLoop } from '../../src/application/index.ts';
import type { FrameScheduler, TimingSource } from '../../src/platform/index.ts';

interface FakeScheduler extends FrameScheduler {
  fire(timeMs: number): void;
  readonly cancelled: number[];
  readonly requests: number;
}

const createFakeScheduler = (): FakeScheduler => {
  let handle = 0;
  let callback: ((timeMs: number) => void) | null = null;
  let requests = 0;
  const cancelled: number[] = [];

  return {
    get requests() {
      return requests;
    },
    cancelled,
    request: (next) => {
      handle += 1;
      requests += 1;
      callback = next;
      return handle;
    },
    cancel: (value) => {
      cancelled.push(value);
    },
    fire: (timeMs) => {
      callback?.(timeMs);
    },
  };
};

const timing: TimingSource = { now: () => 0 };

describe('frame loop', () => {
  it('delivers deltas to subscribers and stops cleanly', () => {
    const scheduler = createFakeScheduler();
    const loop = createFrameLoop({ scheduler, timing });
    const deltas: number[] = [];
    const unsubscribe = loop.subscribe((deltaMs) => {
      deltas.push(deltaMs);
    });

    loop.start();
    expect(loop.isRunning()).toBe(true);
    expect(scheduler.requests).toBe(1);

    loop.start();
    expect(scheduler.requests).toBe(1);

    scheduler.fire(0);
    scheduler.fire(16);
    scheduler.fire(40);

    expect(deltas).toEqual([0, 16, 24]);

    unsubscribe();
    scheduler.fire(64);
    expect(deltas).toEqual([0, 16, 24]);

    loop.stop();
    expect(loop.isRunning()).toBe(false);
    expect(scheduler.cancelled).toHaveLength(1);

    scheduler.fire(80);
    expect(deltas).toEqual([0, 16, 24]);
  });
});
