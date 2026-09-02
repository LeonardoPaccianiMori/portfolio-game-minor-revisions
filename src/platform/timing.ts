import type { FrameUpdate, TimingPort } from '../application';

type TimingAdapters = Readonly<{
  schedule: (handler: (timestampMilliseconds: number) => void) => number;
  cancel: (handle: number) => void;
}>;

class FrameTiming implements TimingPort {
  private active = false;
  private everStarted = false;
  private paused = false;
  private scheduledHandle: number | undefined;
  private previousTimestamp: number | undefined;
  private handler: ((frame: FrameUpdate) => void) | undefined;

  public constructor(private readonly adapters: TimingAdapters) {}

  public startFrameLoop(handler: (frame: FrameUpdate) => void): void {
    if (this.everStarted) {
      throw new Error('The permanent frame loop was already started.');
    }
    this.everStarted = true;
    this.active = true;
    this.handler = handler;
    this.scheduleNext();
  }

  public pauseFrameLoop(): void {
    if (!this.active || this.paused) return;
    this.paused = true;
    this.previousTimestamp = undefined;
    this.cancelScheduled();
  }

  public resumeFrameLoop(): void {
    if (!this.active || !this.paused) return;
    this.paused = false;
    this.previousTimestamp = undefined;
    this.scheduleNext();
  }

  public stopFrameLoop(): void {
    if (!this.active) return;
    this.active = false;
    this.paused = false;
    this.previousTimestamp = undefined;
    this.handler = undefined;
    this.cancelScheduled();
  }

  private scheduleNext(): void {
    if (!this.active || this.paused || this.scheduledHandle !== undefined) return;
    this.scheduledHandle = this.adapters.schedule((timestamp) => this.runFrame(timestamp));
  }

  private runFrame(timestampMilliseconds: number): void {
    this.scheduledHandle = undefined;
    if (!this.active || this.paused) return;
    const previous = this.previousTimestamp;
    this.previousTimestamp = timestampMilliseconds;
    const deltaSeconds =
      previous === undefined
        ? 0
        : Math.min(Math.max((timestampMilliseconds - previous) / 1_000, 0), 0.05);
    this.handler?.(Object.freeze({ deltaSeconds }));
    this.scheduleNext();
  }

  private cancelScheduled(): void {
    const handle = this.scheduledHandle;
    if (handle === undefined) return;
    this.scheduledHandle = undefined;
    this.adapters.cancel(handle);
  }
}

const browserAdapters: TimingAdapters = Object.freeze({
  schedule: (handler) => window.requestAnimationFrame(handler),
  cancel: (handle) => window.cancelAnimationFrame(handle),
});

export const createTimingPort = (): TimingPort => new FrameTiming(browserAdapters);
export const createTimingPortForTests = (adapters: TimingAdapters): TimingPort =>
  new FrameTiming(adapters);
