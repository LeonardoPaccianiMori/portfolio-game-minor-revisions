import { describe, expect, it } from 'vitest';

import {
  applyFellowshipEdit,
  applyReframe,
  createInitialFellowship,
  createInitialState,
  dispatch,
  FELLOWSHIP_DEADLINE_WEEK,
  validateState,
} from '../../src/rules/index.ts';
import type { FellowshipRequirementId, FellowshipState } from '../../src/rules/index.ts';

describe('fellowship track', () => {
  it('starts empty with a framing label, deadline, and pending outcome', () => {
    const fellowship = createInitialFellowship();

    expect(fellowship.framing).toBe('initial');
    expect(fellowship.revision).toBe(0);
    expect(fellowship.requirements).toEqual([]);
    expect(fellowship.deadlineWeek).toBe(FELLOWSHIP_DEADLINE_WEEK);
    expect(fellowship.outcome).toBe('pending');
  });

  it('adds requirements and refuses duplicates or unknown ids', () => {
    const added = applyFellowshipEdit(createInitialFellowship(), {
      kind: 'add',
      requirementId: 'impact',
    });

    expect(added.ok).toBe(true);
    if (added.ok) {
      expect(added.fellowship.requirements).toEqual([
        { id: 'impact', state: 'open', answer: null },
      ]);

      expect(
        applyFellowshipEdit(added.fellowship, { kind: 'add', requirementId: 'impact' }).ok,
      ).toBe(false);
    }

    expect(
      applyFellowshipEdit(createInitialFellowship(), {
        kind: 'add',
        requirementId: 'budget' as unknown as FellowshipRequirementId,
      }).ok,
    ).toBe(false);
  });

  it('answers a requirement and rejects unknown or invalid ones', () => {
    const fellowship = applyFellowshipEdit(createInitialFellowship(), {
      kind: 'add',
      requirementId: 'impact',
    });

    expect(fellowship.ok).toBe(true);
    if (!fellowship.ok) {
      return;
    }

    const state = { ...createInitialState(1), fellowship: fellowship.fellowship };
    const answered = dispatch(state, {
      type: 'answerRequirement',
      requirementId: 'impact',
      answer: 'inflate',
    });

    expect(answered.ok).toBe(true);
    if (answered.ok) {
      expect(answered.state.fellowship.requirements).toEqual([
        { id: 'impact', state: 'answered', answer: 'inflate' },
      ]);
    }

    expect(
      dispatch(state, {
        type: 'answerRequirement',
        requirementId: 'support',
        answer: 'honest',
      }),
    ).toEqual({
      ok: false,
      reason: 'unknown-requirement',
      message: 'Unknown fellowship requirement.',
    });

    expect(
      dispatch(state, {
        type: 'answerRequirement',
        requirementId: 'impact',
        answer: 'wishful' as never,
      }),
    ).toEqual({
      ok: false,
      reason: 'invalid-command',
      message: 'The answer type is not valid.',
    });
  });

  it('reframes the fellowship and makes answered requirements stale', () => {
    const fellowship: FellowshipState = {
      framing: 'initial',
      revision: 0,
      requirements: [
        { id: 'impact', state: 'answered', answer: 'inflate' },
        { id: 'support', state: 'open', answer: null },
      ],
      deadlineWeek: 8,
      outcome: 'pending',
    };

    const result = applyFellowshipEdit(fellowship, {
      kind: 'reframe',
      framing: 'climate relevance',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.fellowship.framing).toBe('climate relevance');
      expect(result.fellowship.revision).toBe(1);
      expect(result.fellowship.requirements).toEqual([
        { id: 'impact', state: 'stale', answer: 'inflate' },
        { id: 'support', state: 'open', answer: null },
      ]);
    }
  });

  it('links the reframe across paper, fellowship, and shared evidence', () => {
    const state = {
      ...createInitialState(1),
      paper: {
        framing: 'initial',
        revision: 0,
        requirements: [{ id: 'controls' as const, state: 'satisfied' as const }],
      },
      fellowship: {
        framing: 'initial',
        revision: 0,
        requirements: [
          { id: 'impact' as const, state: 'answered' as const, answer: 'honest' as const },
        ],
        deadlineWeek: 8,
        outcome: 'pending' as const,
      },
      evidence: [
        {
          id: 'paper.evidence.sequence.1',
          state: 'current' as const,
          track: 'paper' as const,
          overlap: false,
        },
      ],
    };

    const result = applyReframe(state, 'community relevance');

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.paper.framing).toBe('community relevance');
      expect(result.state.paper.requirements).toEqual([{ id: 'controls', state: 'stale' }]);
      expect(result.state.fellowship.framing).toBe('community relevance');
      expect(result.state.fellowship.requirements).toEqual([
        { id: 'impact', state: 'stale', answer: 'honest' },
      ]);
      expect(result.state.evidence[0]?.state).toBe('stale');
    }

    expect(applyReframe(state, '  ').ok).toBe(false);
  });

  it('validates the fellowship inside the campaign state', () => {
    const state = createInitialState(1);
    const invalid = { ...state, fellowship: { ...state.fellowship, framing: '' } };

    const result = validateState(invalid);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues).toContain('fellowship.framing must be a non-empty string');
    }
  });
});
