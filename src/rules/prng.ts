export interface Prng {
  next(): number;
  nextInt(maxExclusive: number): number;
  state(): number;
}

export const createPrng = (initialState: number): Prng => {
  let state = initialState >>> 0;

  const next = (): number => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  const nextInt = (maxExclusive: number): number => {
    if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
      throw new RangeError('nextInt requires a positive integer bound');
    }

    return Math.floor(next() * maxExclusive);
  };

  return {
    next,
    nextInt,
    state: () => state,
  };
};
