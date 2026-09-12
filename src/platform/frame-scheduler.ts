export interface FrameScheduler {
  request(callback: (timeMs: number) => void): number;
  cancel(handle: number): void;
}

export const createFrameScheduler = (): FrameScheduler => ({
  request: (callback) => window.requestAnimationFrame(callback),
  cancel: (handle) => {
    window.cancelAnimationFrame(handle);
  },
});
