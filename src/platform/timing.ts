export interface TimingSource {
  now(): number;
}

export const createTimingSource = (): TimingSource => ({
  now: () => performance.now(),
});
