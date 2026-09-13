import { describe, expect, it } from 'vitest';

import { createInitialState, dispatch } from '../../src/rules/index.ts';
import type { Command } from '../../src/rules/index.ts';

const UNIMPLEMENTED_COMMANDS: readonly Command[] = [
  { type: 'assignEvidence', evidenceId: 'paper.evidence.sequence.1', track: 'both' },
  { type: 'answerRequirement', requirementId: 'fellowship.requirement.impact', answer: 'inflate' },
  { type: 'comply', action: 'take-credit' },
  { type: 'meetPI' },
  { type: 'quit' },
];

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
    const result = dispatch(state, { type: 'performAction', action: 'experiment' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.energy).toBe(4);
      expect(result.state.actionsLeft).toBe(2);
    }
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
