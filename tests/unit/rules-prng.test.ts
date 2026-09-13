import { describe, expect, it } from 'vitest';

import { createPrng } from '../../src/rules/index.ts';

describe('seeded PRNG', () => {
  it('produces the same sequence for the same seed', () => {
    const first = createPrng(1234);
    const second = createPrng(1234);

    const firstValues = [first.next(), first.next(), first.next()];
    const secondValues = [second.next(), second.next(), second.next()];

    expect(firstValues).toEqual(secondValues);
  });

  it('produces different sequences for different seeds', () => {
    const first = createPrng(1).next();
    const second = createPrng(2).next();

    expect(first).not.toBe(second);
  });

  it('keeps next in the unit interval', () => {
    const prng = createPrng(99);

    for (let index = 0; index < 100; index += 1) {
      const value = prng.next();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it('returns bounded integers from nextInt', () => {
    const prng = createPrng(5);

    for (let index = 0; index < 100; index += 1) {
      const value = prng.nextInt(6);
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(6);
    }
  });

  it('refuses an invalid integer bound', () => {
    const prng = createPrng(5);

    expect(() => prng.nextInt(0)).toThrow(RangeError);
    expect(() => prng.nextInt(1.5)).toThrow(RangeError);
  });

  it('exposes its serializable internal state', () => {
    const prng = createPrng(8);
    const before = prng.state();
    prng.next();

    expect(prng.state()).not.toBe(before);
    expect(Number.isInteger(prng.state())).toBe(true);
  });
});
