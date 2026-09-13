import { describe, expect, it } from 'vitest';

import { createInitialState, dispatch } from '../../src/rules/index.ts';
import type { Command } from '../../src/rules/index.ts';

const ALL_COMMANDS: readonly Command[] = [
  { type: 'performAction', action: 'experiment' },
  { type: 'assignEvidence', evidenceId: 'paper.evidence.sequence.1', track: 'both' },
  { type: 'answerRequirement', requirementId: 'fellowship.requirement.impact', answer: 'inflate' },
  { type: 'comply', action: 'take-credit' },
  { type: 'meetPI' },
  { type: 'rest' },
  { type: 'quit' },
  { type: 'advanceWeek' },
];

describe('command dispatch', () => {
  it('rejects every command until its rules land, without mutating the state', () => {
    const state = createInitialState(3);
    const before = JSON.stringify(state);

    for (const command of ALL_COMMANDS) {
      const result = dispatch(state, command);

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.reason).toBe('not-implemented');
        expect(result.message).toContain(command.type);
      }
    }

    expect(JSON.stringify(state)).toBe(before);
  });

  it('rejects an invalid state before reading the command', () => {
    const invalidState = { ...createInitialState(1), version: 42 };

    const result = dispatch(invalidState, { type: 'rest' });

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
