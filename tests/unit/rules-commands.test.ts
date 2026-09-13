import { describe, expect, it } from 'vitest';

import { createInitialState, dispatch } from '../../src/rules/index.ts';
import type { Command } from '../../src/rules/index.ts';

const UNIMPLEMENTED_COMMANDS: readonly Command[] = [{ type: 'quit' }];

describe('command dispatch', () => {
  it('rejects every not-yet-implemented command without mutating the state', () => {
    const state = createInitialState(3);
    const before = JSON.stringify(state);

    for (const command of UNIMPLEMENTED_COMMANDS) {
      const result = dispatch(state, command);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.reason).toBe('not-implemented');
        expect(result.message).toContain(command.type);
      }
    }

    expect(JSON.stringify(state)).toBe(before);
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
