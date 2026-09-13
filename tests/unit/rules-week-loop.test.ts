import { describe, expect, it } from 'vitest';

import { CRASH_STANDING_LOSS, createInitialState, dispatch } from '../../src/rules/index.ts';
import type { Command } from '../../src/rules/index.ts';

describe('week loop', () => {
  it('spends energy and a slot on an action', () => {
    const result = dispatch(createInitialState(1), {
      type: 'performAction',
      action: 'experiment',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.energy).toBe(4);
      expect(result.state.actionsLeft).toBe(2);
      expect(result.state.week).toBe(1);
      expect(result.state.history).toEqual(['action:experiment']);
      expect(result.effects[0]).toEqual({
        kind: 'action',
        payload: { action: 'experiment' },
      });
    }
  });

  it('advances the week automatically after the third action', () => {
    let state = createInitialState(1);

    for (let index = 0; index < 3; index += 1) {
      const result = dispatch(state, { type: 'performAction', action: 'experiment' });
      expect(result.ok).toBe(true);
      if (result.ok) {
        state = result.state;
      }
    }

    expect(state.week).toBe(2);
    expect(state.actionsLeft).toBe(3);
    expect(state.energy).toBe(3);
    expect(state.history.at(-1)).toBe('week:2');
  });

  it('rests for energy at the cost of a slot', () => {
    const state = { ...createInitialState(1), energy: 1 };
    const result = dispatch(state, { type: 'performAction', action: 'rest' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.energy).toBe(3);
      expect(result.state.actionsLeft).toBe(2);
    }
  });

  it('rejects an action without enough energy', () => {
    const state = { ...createInitialState(1), energy: 0 };
    const result = dispatch(state, { type: 'performAction', action: 'experiment' });

    expect(result).toEqual({
      ok: false,
      reason: 'insufficient-energy',
      message: 'Not enough energy for this action.',
    });
  });

  it('crashes at zero energy and loses the next week', () => {
    const state = { ...createInitialState(1), energy: 1 };
    const result = dispatch(state, { type: 'performAction', action: 'experiment' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.energy).toBe(0);
      expect(result.state.crashed).toBe(true);
      expect(result.state.week).toBe(2);
      expect(result.state.actionsLeft).toBe(0);
      expect(result.state.standing).toBe(50 - CRASH_STANDING_LOSS);
      expect(result.state.history).toContain('crash');
      expect(result.effects.some((effect) => effect.kind === 'crash')).toBe(true);
    }

    const crashingState = result.ok ? result.state : state;
    const rejected = dispatch(crashingState, { type: 'performAction', action: 'rest' });

    expect(rejected).toEqual({
      ok: false,
      reason: 'week-lost',
      message: 'This week is lost. End the week to recover.',
    });
  });

  it('recovers after the lost week without energy recovery', () => {
    const state = {
      ...createInitialState(1),
      energy: 0,
      crashed: true,
      week: 2,
      actionsLeft: 0,
      standing: 40,
    };
    const result = dispatch(state, { type: 'advanceWeek' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.crashed).toBe(false);
      expect(result.state.week).toBe(3);
      expect(result.state.actionsLeft).toBe(3);
      expect(result.state.energy).toBe(0);
      expect(result.state.standing).toBe(40);
    }
  });

  it('ends a normal week early with recovery', () => {
    const state = createInitialState(1);
    const result = dispatch(state, { type: 'advanceWeek' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.week).toBe(2);
      expect(result.state.actionsLeft).toBe(3);
      expect(result.state.energy).toBe(5);
      expect(result.state.history).toEqual(['week:2']);
    }
  });

  it('closes week 12 and refuses to advance beyond it', () => {
    const state = { ...createInitialState(1), week: 12 };
    const closed = dispatch(state, { type: 'advanceWeek' });

    expect(closed.ok).toBe(true);
    if (closed.ok) {
      expect(closed.state.week).toBe(12);
      expect(closed.state.actionsLeft).toBe(0);
      expect(closed.state.history).toEqual(['contract:closed']);
    }

    const finished = dispatch(closed.ok ? closed.state : state, { type: 'advanceWeek' });

    expect(finished).toEqual({
      ok: false,
      reason: 'contract-finished',
      message: 'The contract is finished.',
    });
  });

  it('rejects an unknown action', () => {
    const result = dispatch(createInitialState(1), {
      type: 'performAction',
      action: 'fly',
    } as unknown as Command);

    expect(result).toEqual({
      ok: false,
      reason: 'invalid-command',
      message: 'The action is not valid.',
    });
  });
});
