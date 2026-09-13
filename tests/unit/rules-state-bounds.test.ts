import { describe, expect, it } from 'vitest';

import { createInitialState, validateState } from '../../src/rules/index.ts';

describe('campaign state validation bounds', () => {
  it('accepts unsigned 32-bit seeds and rng states', () => {
    const state = {
      ...createInitialState(1),
      seed: 4294967295,
      rngState: 4294967295,
    };

    expect(validateState(state).ok).toBe(true);
  });

  it('rejects seeds and rng states above the unsigned 32-bit bound', () => {
    const state = {
      ...createInitialState(1),
      seed: 4294967296,
      rngState: 4294967296,
    };

    const result = validateState(state);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues).toContain('seed must be an unsigned 32-bit integer');
      expect(result.issues).toContain('rngState must be an unsigned 32-bit integer');
    }
  });

  it('rejects unexpected top-level fields', () => {
    const result = validateState({ ...createInitialState(1), extra: true });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues).toContain('unexpected state field: extra');
    }
  });

  it('rejects unexpected relationship fields', () => {
    const state = createInitialState(1);

    const result = validateState({
      ...state,
      relationships: { ...state.relationships, ghost: 50 },
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues).toContain('unexpected relationship: ghost');
    }
  });

  it('keeps flags open for authored event names', () => {
    const state = { ...createInitialState(1), flags: { 'event.rent.1': true } };

    expect(validateState(state).ok).toBe(true);
  });
});
