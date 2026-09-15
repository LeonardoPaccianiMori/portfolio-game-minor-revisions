import { describe, expect, it } from 'vitest';

import {
  ENDING_IDS,
  buildPersonnelFile,
  computeKept,
  computeStayed,
  computeSuccess,
  createInitialState,
  dispatch,
  evaluateRunState,
  quitRun,
  resolveContractEnding,
  validatePersonnelFile,
  validateState,
} from '../../src/rules/index.ts';
import type {
  CampaignState,
  EndingId,
  PaperOutcome,
  PersonnelFile,
  RunEndedCause,
} from '../../src/rules/index.ts';

const withPaperOutcome = (state: CampaignState, outcome: PaperOutcome): CampaignState => ({
  ...state,
  paper: { ...state.paper, outcome },
});

const withRenewalClosed = (state: CampaignState): CampaignState => ({
  ...state,
  flags: { ...state.flags, 'renewal.closed': true },
});

const resolveContract = (state: CampaignState): EndingId => resolveContractEnding(state);

describe('ejection warning', () => {
  it('warns once when standing falls to the line', () => {
    const state: CampaignState = { ...createInitialState(1), standing: 20 };
    const result = evaluateRunState(state);

    expect(result.state.standingWarningWeek).toBe(1);
    expect(result.state.flags['ejection.warning']).toBe(true);
    expect(result.state.resolution.cause).toBe('none');
    expect(result.effects).toEqual([
      { kind: 'message', payload: { messageId: 'message.ejection.warning' } },
    ]);
  });

  it('does not warn above the line', () => {
    const result = evaluateRunState({ ...createInitialState(1), standing: 21 });

    expect(result.state.standingWarningWeek).toBeNull();
    expect(result.state.flags['ejection.warning']).toBeUndefined();
    expect(result.effects).toEqual([]);
  });

  it('clears the live warning when standing recovers', () => {
    const state: CampaignState = {
      ...createInitialState(1),
      standing: 30,
      standingWarningWeek: 1,
      flags: { 'ejection.warning': true },
    };
    const result = evaluateRunState(state);

    expect(result.state.standingWarningWeek).toBeNull();
    expect(result.state.resolution.cause).toBe('none');
  });

  it('ends the run at the deadline while still at or below the line', () => {
    const state: CampaignState = {
      ...createInitialState(1),
      week: 3,
      standing: 20,
      standingWarningWeek: 1,
    };
    const result = evaluateRunState(state);

    expect(result.state.resolution).toEqual({
      cause: 'ejection',
      ending: 'ending.ejected',
      week: 3,
    });
    expect(result.state.history).toEqual(['ending:ending.ejected']);
    expect(result.effects).toContainEqual({
      kind: 'run-ended',
      payload: { cause: 'ejection', ending: 'ending.ejected', week: 3 },
    });
  });

  it('waits the full two turns before ejecting', () => {
    const state: CampaignState = {
      ...createInitialState(1),
      week: 2,
      standing: 15,
      standingWarningWeek: 1,
    };

    expect(evaluateRunState(state).state.resolution.cause).toBe('none');
  });

  it('does not eject when recovered by the deadline', () => {
    const state: CampaignState = {
      ...createInitialState(1),
      week: 3,
      standing: 40,
      standingWarningWeek: 1,
      flags: { 'ejection.warning': true },
    };
    const result = evaluateRunState(state);

    expect(result.state.standingWarningWeek).toBeNull();
    expect(result.state.resolution.cause).toBe('none');
  });
});

describe('burnout', () => {
  it('ends the run on a second crash in the same act', () => {
    const state: CampaignState = { ...createInitialState(1), crashWeeks: [1, 3] };
    const result = evaluateRunState(state);

    expect(result.state.resolution).toEqual({
      cause: 'burnout',
      ending: 'ending.ejected',
      week: 1,
    });
    expect(result.effects).toContainEqual({
      kind: 'run-ended',
      payload: { cause: 'burnout', ending: 'ending.ejected', week: 1 },
    });
  });

  it('allows crashes in different acts', () => {
    const acrossActs: CampaignState = { ...createInitialState(1), crashWeeks: [4, 5] };
    const threeActs: CampaignState = { ...createInitialState(1), crashWeeks: [1, 5, 9] };

    expect(evaluateRunState(acrossActs).state.resolution.cause).toBe('none');
    expect(evaluateRunState(threeActs).state.resolution.cause).toBe('none');
  });

  it('records the crash week when a crash happens', () => {
    const state: CampaignState = {
      ...createInitialState(1),
      week: 4,
      energy: 1,
      paper: { ...createInitialState(1).paper, requirements: [{ id: 'controls', state: 'open' }] },
      experiments: [
        {
          id: 'experiment.controls.1',
          requirementId: 'controls',
          step: 0,
          steps: 3,
          state: 'running',
        },
      ],
    };
    const result = dispatch(state, { type: 'performAction', action: 'experiment' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.crashWeeks).toEqual([4]);
      expect(result.state.week).toBe(5);
      expect(result.state.resolution.cause).toBe('none');
    }
  });
});

describe('quitting', () => {
  it('resolves to the intact ending and records the facts', () => {
    const result = quitRun(createInitialState(7));

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.resolution).toEqual({
        cause: 'quit',
        ending: 'ending.intact',
        week: 1,
      });

      const fileEffect = result.effects.find((effect) => effect.kind === 'personnel-file');
      const file = fileEffect?.payload as unknown as PersonnelFile;

      expect(file.ending).toBe('ending.intact');
      expect(file.cause).toBe('quit');
      expect(file.quit).toBe(true);
      expect(file.seed).toBe(7);
      expect(result.effects).toContainEqual({
        kind: 'message',
        payload: { messageId: 'message.ending.intact' },
      });
    }
  });

  it('refuses a second quit after the run has ended', () => {
    const first = quitRun(createInitialState(7));
    expect(first.ok).toBe(true);
    if (!first.ok) {
      return;
    }

    expect(quitRun(first.state)).toEqual({
      ok: false,
      reason: 'run-finished',
      message: 'The run has ended.',
    });
  });
});

describe('the contract-end decision', () => {
  it('derives success and kept from the state', () => {
    const base = createInitialState(1);
    const published = withPaperOutcome(base, 'accept');
    const rejected = withPaperOutcome(withRenewalClosed(base), 'reject');
    const kept: CampaignState = {
      ...base,
      integrity: 80,
      relationships: { ...base.relationships, dario: 50, mara: 10 },
    };
    const alone: CampaignState = {
      ...base,
      integrity: 80,
      relationships: { ...base.relationships, dario: 10, mara: 10 },
    };

    expect(computeSuccess(base)).toBe(true);
    expect(computeSuccess(published)).toBe(true);
    expect(computeSuccess(rejected)).toBe(false);
    expect(computeStayed(kept)).toEqual(['dario']);
    expect(computeKept(kept)).toBe(true);
    expect(computeKept(alone)).toBe(false);
  });

  it('covers all four quadrants', () => {
    const base = createInitialState(1);
    const notKept: CampaignState = {
      ...base,
      integrity: 40,
      relationships: { voss: 50, dario: 10, mara: 10 },
    };
    const kept: CampaignState = {
      ...base,
      integrity: 80,
      relationships: { voss: 50, dario: 50, mara: 50 },
    };

    expect(resolveContract(withRenewalClosed(notKept))).toBe('ending.ejected');
    expect(resolveContract(withRenewalClosed(kept))).toBe('ending.intact');
    expect(resolveContract(withPaperOutcome(withRenewalClosed(notKept), 'reject'))).toBe(
      'ending.ejected',
    );
    expect(resolveContract(notKept)).toBe('ending.complicit');
    expect(resolveContract(kept)).toBe('ending.hollow');
    expect(resolveContract(withPaperOutcome(withRenewalClosed(kept), 'accept'))).toBe(
      'ending.hollow',
    );
  });

  it('resolves the run when the paper outcome is final', () => {
    const state = withPaperOutcome(createInitialState(1), 'accept');
    const result = evaluateRunState(state);

    expect(result.state.resolution.cause).toBe('contract');
    expect(ENDING_IDS).toContain(result.state.resolution.ending);
    expect(result.effects.map((effect) => effect.kind)).toEqual([
      'run-ended',
      'personnel-file',
      'message',
    ]);
  });

  it('resolves at the end of week 12 through the dispatcher', () => {
    const base = createInitialState(3);
    const state: CampaignState = {
      ...base,
      week: 12,
      actionsLeft: 1,
      paper: {
        ...base.paper,
        requirements: (
          ['controls', 'replicates', 'mechanism', 'impact', 'presentation'] as const
        ).map((id) => ({ id, state: 'satisfied' as const })),
      },
      flags: Object.fromEntries(
        [
          'requests-first',
          'funding-review',
          'requests-method',
          'rent',
          'contamination',
          'requests-impact',
          'fellowship-deadline',
          'fellowship-panel',
          'contract-decision',
        ].map((id) => [`event.${id}`, true]),
      ),
    };

    const result = dispatch(state, { type: 'performAction', action: 'rest' });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }

    expect(result.state.paper.outcome).not.toBe('pending');
    expect(result.state.resolution.cause).toBe('contract');
    expect(ENDING_IDS).toContain(result.state.resolution.ending);
    expect(result.state.history.at(-1)).toBe(`ending:${String(result.state.resolution.ending)}`);

    const after = dispatch(result.state, { type: 'advanceWeek' });

    expect(after).toEqual({
      ok: false,
      reason: 'run-finished',
      message: 'The run has ended.',
    });
  });
});

describe('the personnel file', () => {
  const validFile = (): PersonnelFile => {
    const state = createInitialState(11);
    const resolution = {
      cause: 'contract' as RunEndedCause,
      ending: 'ending.hollow' as EndingId,
      week: 12,
    };

    return buildPersonnelFile(withPaperOutcome(state, 'accept'), resolution);
  };

  it('records the ending facts and validates', () => {
    const file = validFile();

    expect(file).toEqual({
      ending: 'ending.hollow',
      cause: 'contract',
      week: 12,
      seed: 11,
      paperOutcome: 'accept',
      fellowshipOutcome: 'pending',
      standing: 50,
      integrity: 100,
      relationships: { voss: 50, dario: 50, mara: 50 },
      stayed: ['dario', 'mara'],
      complicity: [],
      discoveries: [],
      crashes: [],
      quit: false,
    });
    expect(validatePersonnelFile(file)).toEqual([]);
  });

  it('rejects malformed personnel files', () => {
    const file = validFile();

    expect(validatePersonnelFile(null)).toEqual(['personnel file must be an object']);
    expect(
      validatePersonnelFile({ ...file, ending: 'ending.win' }).includes(
        'personnel file ending is unknown',
      ),
    ).toBe(true);
    expect(
      validatePersonnelFile({ ...file, quit: true }).includes(
        'personnel file quit must match the cause',
      ),
    ).toBe(true);
    expect(
      validatePersonnelFile({ ...file, stayed: ['dario', 'dario'] }).includes(
        'personnel file stayed must be a list of known values without repeats',
      ),
    ).toBe(true);
    expect(
      validatePersonnelFile({ ...file, crashes: [1, 1] }).includes(
        'personnel file crashes must be a list of week numbers without repeats',
      ),
    ).toBe(true);
  });
});

describe('run state gating and purity', () => {
  it('does not mutate or warn twice', () => {
    const state: CampaignState = { ...createInitialState(1), standing: 20 };
    const before = JSON.stringify(state);

    const first = evaluateRunState(state);
    const second = evaluateRunState(first.state);

    expect(JSON.stringify(state)).toBe(before);
    expect(second.state.standingWarningWeek).toBe(1);
    expect(second.effects).toEqual([]);
  });

  it('is deterministic for the same state', () => {
    const state = withPaperOutcome(createInitialState(5), 'minor-revision');

    expect(evaluateRunState(state)).toEqual(evaluateRunState(state));
  });

  it('validates the new state fields', () => {
    const base = createInitialState(1);
    const badCause = validateState({
      ...base,
      resolution: { cause: 'retired', ending: null, week: null },
    });
    const missingEnding = validateState({
      ...base,
      resolution: { cause: 'quit', ending: null, week: null },
    });
    const earlyEnding = validateState({
      ...base,
      resolution: { cause: 'none', ending: 'ending.intact', week: null },
    });
    const repeatedCrash = validateState({ ...base, crashWeeks: [2, 2] });
    const badWarning = validateState({ ...base, standingWarningWeek: 13 });

    expect(badCause.ok).toBe(false);
    if (!badCause.ok) {
      expect(badCause.issues).toContain('resolution.cause is unknown');
    }
    expect(missingEnding.ok).toBe(false);
    if (!missingEnding.ok) {
      expect(missingEnding.issues).toContain('resolution.ending is required once the run ends');
    }
    expect(earlyEnding.ok).toBe(false);
    if (!earlyEnding.ok) {
      expect(earlyEnding.issues).toContain('resolution.ending must be null before the run ends');
    }
    expect(repeatedCrash.ok).toBe(false);
    if (!repeatedCrash.ok) {
      expect(repeatedCrash.issues).toContain('crashWeeks must not repeat a week');
    }
    expect(badWarning.ok).toBe(false);
    if (!badWarning.ok) {
      expect(badWarning.issues).toContain('standingWarningWeek is out of range');
    }
  });
});
