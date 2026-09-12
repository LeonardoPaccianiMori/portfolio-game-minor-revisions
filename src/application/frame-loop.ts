import type { FrameScheduler, TimingSource } from '../platform/index.ts';

export type FrameListener = (deltaMs: number) => void;

export interface FrameLoop {
  start(): void;
  stop(): void;
  isRunning(): boolean;
  subscribe(listener: FrameListener): () => void;
}

export interface FrameLoopOptions {
  readonly scheduler: FrameScheduler;
  readonly timing: TimingSource;
}

export const createFrameLoop = (options: FrameLoopOptions): FrameLoop => {
  const listeners = new Set<FrameListener>();
  let handle: number | null = null;
  let running = false;
  let lastTimeMs: number | null = null;

  const tick = (timeMs: number): void => {
    if (!running) {
      return;
    }

    const deltaMs = lastTimeMs === null ? 0 : timeMs - lastTimeMs;
    lastTimeMs = timeMs;

    for (const listener of listeners) {
      listener(deltaMs);
    }

    handle = options.scheduler.request(tick);
  };

  const start = (): void => {
    if (running) {
      return;
    }

    running = true;
    lastTimeMs = options.timing.now();
    handle = options.scheduler.request(tick);
  };

  const stop = (): void => {
    running = false;

    if (handle !== null) {
      options.scheduler.cancel(handle);
      handle = null;
    }

    lastTimeMs = null;
  };

  const subscribe = (listener: FrameListener): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return {
    start,
    stop,
    isRunning: () => running,
    subscribe,
  };
};
