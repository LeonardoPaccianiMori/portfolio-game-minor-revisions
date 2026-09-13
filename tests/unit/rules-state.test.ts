import { describe, expect, it } from 'vitest';

import {
  CAMPAIGN_STATE_VERSION,
  createInitialState,
  deserializeState,
  serializeState,
  validateState,
} from '../../src/rules/index.ts';

describe('campaign state', () => {
  it('creates a valid initial state', () => {
    const state = createInitialState(42);

    expect(state.version).toBe(CAMPAIGN_STATE_VERSION);
    expect(state.seed).toBe(42);
    expect(state.week).toBe(1);
    expect(state.actionsLeft).toBe(3);
    expect(state.energy).toBe(5);
    expect(state.relationships).toEqual({ voss: 50, dario: 50, mara: 50 });
    expect(validateState(state)).toEqual({ ok: true, state });
  });

  it('normalizes the seed to an unsigned integer', () => {
    const state = createInitialState(-1);

    expect(state.seed).toBe(4294967295);
  });

  it('rejects malformed states with precise issues', () => {
    const state = createInitialState(1);
    const malformed = {
      ...state,
      energy: 9,
      week: 0,
      relationships: { ...state.relationships, dario: -1 },
    };

    const result = validateState(malformed);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues).toContain('energy is out of range');
      expect(result.issues).toContain('week is out of range');
      expect(result.issues).toContain('relationships.dario is out of range');
    }
  });

  it('rejects an unknown state version', () => {
    const result = validateState({ ...createInitialState(1), version: 99 });

    expect(result.ok).toBe(false);
  });

  it('round-trips through JSON', () => {
    const state = createInitialState(7);
    const restored = deserializeState(serializeState(state));

    expect(restored).toEqual({ ok: true, state });
  });

  it('refuses invalid JSON', () => {
    const result = deserializeState('{not json');

    expect(result.ok).toBe(false);
  });
});
