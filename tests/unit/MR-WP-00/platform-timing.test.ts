import { describe, expect, it, vi } from 'vitest';

import { createTimingPortForTests } from '../../../src/platform';

const scheduler = () => {
  let nextHandle = 1;
  const pending = new Map<number, (timestamp: number) => void>();
  const cancel = vi.fn((handle: number) => {
    pending.delete(handle);
  });
  return {
    adapters: {
      schedule: (handler: (timestamp: number) => void) => {
        const handle = nextHandle++;
        pending.set(handle, handler);
        return handle;
      },
      cancel,
    },
    cancel,
    fire: (timestamp: number) => {
      const entry = pending.entries().next().value as
        [number, (timestamp: number) => void] | undefined;
      if (entry === undefined) throw new Error('No controlled frame is pending.');
      pending.delete(entry[0]);
      entry[1](timestamp);
    },
    pendingCount: () => pending.size,
  };
};

describe('Step-3 platform timing', () => {
  it('owns one controlled loop with safe delta values and a 0.05-second cap', () => {
    const controlled = scheduler();
    const timing = createTimingPortForTests(controlled.adapters);
    const frames: number[] = [];

    timing.startFrameLoop((frame) => frames.push(frame.deltaSeconds));
    expect(controlled.pendingCount()).toBe(1);
    controlled.fire(1_000);
    controlled.fire(1_016);
    controlled.fire(1_200);
    controlled.fire(1_150);

    expect(frames).toEqual([0, 0.016, 0.05, 0]);
    expect(controlled.pendingCount()).toBe(1);
  });

  it('pauses, resumes with zero missing-time catch-up, and stops repeatedly', () => {
    const controlled = scheduler();
    const timing = createTimingPortForTests(controlled.adapters);
    const frames: number[] = [];
    timing.startFrameLoop((frame) => frames.push(frame.deltaSeconds));
    controlled.fire(100);

    timing.pauseFrameLoop();
    timing.pauseFrameLoop();
    expect(controlled.pendingCount()).toBe(0);
    timing.resumeFrameLoop();
    timing.resumeFrameLoop();
    controlled.fire(5_000);
    expect(frames).toEqual([0, 0]);

    timing.stopFrameLoop();
    timing.stopFrameLoop();
    expect(controlled.pendingCount()).toBe(0);
    expect(controlled.cancel).toHaveBeenCalledTimes(2);
    expect(() => timing.startFrameLoop(() => undefined)).toThrow(/already started/u);
  });
});
