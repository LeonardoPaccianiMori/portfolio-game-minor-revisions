import { describe, expect, it } from 'vitest';

import { createInitialState, dispatch } from '../../src/rules/index.ts';
import type { Command } from '../../src/rules/index.ts';

describe('command dispatch', () => {
  it('routes a quit to the ending resolver', () => {
    const state = createInitialState(3);
    const before = JSON.stringify(state);

    const result = dispatch(state, { type: 'quit' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.resolution).toEqual({
        cause: 'quit',
        ending: 'ending.intact',
        week: 1,
      });
      expect(result.state.history).toEqual(['quit', 'ending:ending.intact']);
      expect(result.effects.map((effect) => effect.kind)).toEqual([
        'run-ended',
        'personnel-file',
        'message',
      ]);
    }

    expect(JSON.stringify(state)).toBe(before);
  });

  it('refuses every command once the run has ended', () => {
    const quit = dispatch(createInitialState(3), { type: 'quit' });
    expect(quit.ok).toBe(true);
    if (!quit.ok) {
      return;
    }

    const after = quit.state;
    const before = JSON.stringify(after);
    const blocked: readonly Command[] = [
      { type: 'quit' },
      { type: 'advanceWeek' },
      { type: 'meetPI' },
      { type: 'performAction', action: 'rest' },
    ];

    for (const command of blocked) {
      expect(dispatch(after, command)).toEqual({
        ok: false,
        reason: 'run-finished',
        message: 'The run has ended.',
      });
    }

    expect(dispatch(after, {} as unknown as Command)).toEqual({
      ok: false,
      reason: 'run-finished',
      message: 'The run has ended.',
    });

    expect(JSON.stringify(after)).toBe(before);
  });

  it('routes an implemented command', () => {
    const state = createInitialState(3);
    const result = dispatch(state, { type: 'performAction', action: 'rest' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.energy).toBe(5);
      expect(result.state.actionsLeft).toBe(2);
    }
  });

  it('routes an event resolution to the event rules', () => {
    const result = dispatch(createInitialState(1), {
      type: 'resolveEvent',
      eventId: 'rent',
      choiceId: 'borrow',
    });

    expect(result).toEqual({
      ok: false,
      reason: 'no-pending-event',
      message: 'That event is not waiting for a choice.',
    });
  });

  it('rejects an invalid state before reading the command', () => {
    const invalidState = { ...createInitialState(1), version: 42 };

    const result = dispatch(invalidState, { type: 'advanceWeek' });

    expect(result).toEqual({
      ok: false,
      reason: 'invalid-state',
      message: 'The campaign state is not valid.',
    });
  });

  it('rejects an invalid command shape', () => {
    const result = dispatch(createInitialState(1), {} as unknown as Command);

    expect(result).toEqual({
      ok: false,
      reason: 'invalid-command',
      message: 'The command is not valid.',
    });
  });
});
