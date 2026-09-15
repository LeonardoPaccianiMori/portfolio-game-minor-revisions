import { describe, expect, it } from 'vitest';

import { applyPiRequest, createInitialState, dispatch } from '../../src/rules/index.ts';
import type {
  CampaignState,
  ComplicityAction,
  FellowshipState,
  PaperState,
  PiRequest,
} from '../../src/rules/index.ts';

const withPaper = (paper: PaperState): CampaignState => ({
  ...createInitialState(1),
  paper,
});

const withFellowship = (fellowship: FellowshipState): CampaignState => ({
  ...createInitialState(1),
  fellowship,
});

describe('PI requests', () => {
  it('adds a paper requirement and refuses a duplicate', () => {
    const request: PiRequest = { kind: 'add-paper', requirementId: 'controls' };
    const result = applyPiRequest(createInitialState(1), request);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.paper.requirements).toEqual([{ id: 'controls', state: 'open' }]);
      expect(result.state.history).toEqual(['pi:add:paper:controls']);
      expect(result.effects[0]?.kind).toBe('add-paper');
    }

    const duplicate = applyPiRequest(result.ok ? result.state : createInitialState(1), request);

    expect(duplicate.ok).toBe(false);
  });

  it('adds a fellowship requirement', () => {
    const result = applyPiRequest(createInitialState(1), {
      kind: 'add-fellowship',
      requirementId: 'impact',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.fellowship.requirements).toEqual([
        { id: 'impact', state: 'open', answer: null },
      ]);
      expect(result.state.history).toEqual(['pi:add:fellowship:impact']);
    }
  });

  it('reframes both tracks and stales current evidence', () => {
    const state: CampaignState = {
      ...createInitialState(2),
      paper: {
        framing: 'initial',
        revision: 0,
        requirements: [{ id: 'controls', state: 'satisfied' }],
        outcome: 'pending',
      },
      fellowship: {
        framing: 'initial',
        revision: 0,
        requirements: [{ id: 'impact', state: 'answered', answer: 'honest' }],
        deadlineWeek: 8,
        outcome: 'pending',
      },
      evidence: [
        {
          id: 'paper.evidence.sequence.1',
          state: 'current',
          track: 'paper',
          overlap: false,
        },
      ],
    };

    const result = applyPiRequest(state, {
      kind: 'reframe',
      framing: 'community relevance',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.paper.revision).toBe(1);
      expect(result.state.paper.requirements).toEqual([{ id: 'controls', state: 'stale' }]);
      expect(result.state.fellowship.revision).toBe(1);
      expect(result.state.fellowship.requirements).toEqual([
        { id: 'impact', state: 'stale', answer: 'honest' },
      ]);
      expect(result.state.evidence[0]?.state).toBe('stale');
      expect(result.state.history).toEqual(['pi:reframe']);
    }

    expect(applyPiRequest(state, { kind: 'reframe', framing: '  ' }).ok).toBe(false);
  });

  it('reverts a paper requirement and a fellowship answer', () => {
    const paperResult = applyPiRequest(
      withPaper({
        framing: 'initial',
        revision: 1,
        requirements: [{ id: 'controls', state: 'stale' }],
        outcome: 'pending',
      }),
      { kind: 'revert-paper', requirementId: 'controls' },
    );

    expect(paperResult.ok).toBe(true);
    if (paperResult.ok) {
      expect(paperResult.state.paper.requirements).toEqual([{ id: 'controls', state: 'open' }]);
      expect(paperResult.state.history).toEqual(['pi:revert:paper:controls']);
    }

    const fellowshipResult = applyPiRequest(
      withFellowship({
        framing: 'initial',
        revision: 1,
        requirements: [{ id: 'support', state: 'answered', answer: 'honest' }],
        deadlineWeek: 8,
        outcome: 'pending',
      }),
      { kind: 'revert-fellowship', requirementId: 'support' },
    );

    expect(fellowshipResult.ok).toBe(true);
    if (fellowshipResult.ok) {
      expect(fellowshipResult.state.fellowship.requirements).toEqual([
        { id: 'support', state: 'open', answer: null },
      ]);
    }
  });

  it('does not mutate the original state', () => {
    const state = createInitialState(1);
    const before = JSON.stringify(state);

    applyPiRequest(state, { kind: 'add-paper', requirementId: 'controls' });

    expect(JSON.stringify(state)).toBe(before);
  });
});

describe('PI meetings', () => {
  it('spends a slot and records the meeting', () => {
    const result = dispatch(createInitialState(1), { type: 'meetPI' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.actionsLeft).toBe(2);
      expect(result.state.history).toEqual(['meeting:pi']);
      expect(result.effects[0]?.kind).toBe('pi-meeting');
    }
  });

  it('advances the week when the meeting spends the last slot', () => {
    const state = { ...createInitialState(1), actionsLeft: 1 };
    const result = dispatch(state, { type: 'meetPI' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.week).toBe(2);
      expect(result.state.actionsLeft).toBe(3);
      expect(result.state.history).toContain('week:2');
    }
  });

  it('refuses a meeting in a lost week or after the contract', () => {
    expect(
      dispatch({ ...createInitialState(1), crashed: true, actionsLeft: 0 }, { type: 'meetPI' }),
    ).toEqual({
      ok: false,
      reason: 'week-lost',
      message: 'This week is lost. End the week to recover.',
    });

    expect(
      dispatch({ ...createInitialState(1), week: 12, actionsLeft: 0 }, { type: 'meetPI' }),
    ).toEqual({
      ok: false,
      reason: 'contract-finished',
      message: 'The contract is finished.',
    });
  });
});

describe('complicity', () => {
  const comply = (action: ComplicityAction, state = createInitialState(1)) =>
    dispatch(state, { type: 'comply', action });

  it('applies the approved baseline for every action', () => {
    const inflate = comply('inflate-claim');
    expect(inflate.ok).toBe(true);
    if (inflate.ok) {
      expect(inflate.state.standing).toBe(60);
      expect(inflate.state.integrity).toBe(85);
      expect(inflate.state.flags['complicity.inflate-claim']).toBe(true);
      expect(inflate.state.history).toEqual(['comply:inflate-claim']);
    }

    const takeCredit = comply('take-credit');
    expect(takeCredit.ok).toBe(true);
    if (takeCredit.ok) {
      expect(takeCredit.state.standing).toBe(60);
      expect(takeCredit.state.integrity).toBe(90);
      expect(takeCredit.state.relationships.dario).toBe(30);
    }

    const flatter = comply('flatter-pi');
    expect(flatter.ok).toBe(true);
    if (flatter.ok) {
      expect(flatter.state.integrity).toBe(95);
      expect(flatter.state.relationships.voss).toBe(60);
    }

    const drop = comply('drop-replicate', {
      ...createInitialState(1),
      actionsLeft: 2,
    });
    expect(drop.ok).toBe(true);
    if (drop.ok) {
      expect(drop.state.integrity).toBe(90);
      expect(drop.state.actionsLeft).toBe(3);
    }

    const dump = comply('dump-work', {
      ...createInitialState(1),
      actionsLeft: 2,
    });
    expect(dump.ok).toBe(true);
    if (dump.ok) {
      expect(dump.state.integrity).toBe(90);
      expect(dump.state.actionsLeft).toBe(3);
      expect(dump.state.relationships.mara).toBe(35);
    }
  });

  it('clamps the meters at their bounds', () => {
    const atFloor = comply('inflate-claim', {
      ...createInitialState(1),
      integrity: 5,
    });
    expect(atFloor.ok).toBe(true);
    if (atFloor.ok) {
      expect(atFloor.state.integrity).toBe(0);
    }

    const atCeiling = comply('take-credit', {
      ...createInitialState(1),
      standing: 95,
    });
    expect(atCeiling.ok).toBe(true);
    if (atCeiling.ok) {
      expect(atCeiling.state.standing).toBe(100);
    }
  });

  it('refuses an invalid action, a lost week, and the finished contract', () => {
    expect(
      dispatch(createInitialState(1), {
        type: 'comply',
        action: 'bribe' as unknown as ComplicityAction,
      }),
    ).toEqual({
      ok: false,
      reason: 'invalid-command',
      message: 'The complicity action is not valid.',
    });

    expect(
      dispatch(
        { ...createInitialState(1), crashed: true, actionsLeft: 0 },
        { type: 'comply', action: 'take-credit' },
      ),
    ).toEqual({
      ok: false,
      reason: 'week-lost',
      message: 'This week is lost. End the week to recover.',
    });

    expect(
      dispatch(
        { ...createInitialState(1), week: 12, actionsLeft: 0 },
        { type: 'comply', action: 'take-credit' },
      ),
    ).toEqual({
      ok: false,
      reason: 'contract-finished',
      message: 'The contract is finished.',
    });
  });

  it('does not mutate the original state on rejection', () => {
    const state = { ...createInitialState(1), crashed: true, actionsLeft: 0 };
    const before = JSON.stringify(state);

    comply('take-credit', state);

    expect(JSON.stringify(state)).toBe(before);
  });
});
