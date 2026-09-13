import { describe, expect, it } from 'vitest';

import {
  EXPERIMENT_STEP_COUNTS,
  applyReframe,
  createInitialState,
  dispatch,
  validateState,
} from '../../src/rules/index.ts';
import type { CampaignState, PaperRequirementId } from '../../src/rules/index.ts';

const withRequirements = (
  requirementIds: readonly PaperRequirementId[],
  state: CampaignState = createInitialState(1),
): CampaignState => ({
  ...state,
  paper: {
    ...state.paper,
    requirements: requirementIds.map((id) => ({ id, state: 'open' as const })),
  },
});

const withFinishedResult = (
  requirementId: PaperRequirementId,
  state: CampaignState = createInitialState(1),
): CampaignState => {
  const steps = EXPERIMENT_STEP_COUNTS[requirementId];

  return {
    ...withRequirements([requirementId], state),
    experiments: [
      {
        id: `experiment.${requirementId}.1`,
        requirementId,
        step: steps,
        steps,
        state: 'done',
      },
    ],
  };
};

const start = (state: CampaignState, requirementId: PaperRequirementId) =>
  dispatch(state, { type: 'startExperiment', requirementId });

const attach = (
  state: CampaignState,
  requirementId: PaperRequirementId,
  track: 'paper' | 'fellowship' | 'both' = 'paper',
) =>
  dispatch(state, {
    type: 'assignEvidence',
    evidenceId: `experiment.${requirementId}.1`,
    track,
  });

describe('experiment assignments', () => {
  it('starts a running assignment with the approved step count', () => {
    const result = start(withRequirements(['controls']), 'controls');

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.experiments).toEqual([
        {
          id: 'experiment.controls.1',
          requirementId: 'controls',
          step: 0,
          steps: 3,
          state: 'running',
        },
      ]);
      expect(result.state.history).toEqual(['experiment:start:controls']);
      expect(result.effects[0]).toEqual({
        kind: 'experiment-started',
        payload: { assignmentId: 'experiment.controls.1', resumed: false },
      });
    }
  });

  it('pauses the running assignment and resumes an unfinished one', () => {
    const first = start(withRequirements(['controls', 'mechanism']), 'controls');
    expect(first.ok).toBe(true);
    if (!first.ok) {
      return;
    }

    const second = start(first.state, 'mechanism');
    expect(second.ok).toBe(true);
    if (!second.ok) {
      return;
    }

    expect(second.state.experiments).toEqual([
      {
        id: 'experiment.controls.1',
        requirementId: 'controls',
        step: 0,
        steps: 3,
        state: 'paused',
      },
      {
        id: 'experiment.mechanism.1',
        requirementId: 'mechanism',
        step: 0,
        steps: 4,
        state: 'running',
      },
    ]);

    const resumed = start(second.state, 'controls');
    expect(resumed.ok).toBe(true);
    if (resumed.ok) {
      expect(resumed.state.experiments[0]?.state).toBe('running');
      expect(resumed.state.experiments[1]?.state).toBe('paused');
      expect(resumed.effects[0]).toEqual({
        kind: 'experiment-started',
        payload: { assignmentId: 'experiment.controls.1', resumed: true },
      });
    }
  });

  it('refuses a requirement that is not in the meter or is unknown', () => {
    expect(start(withRequirements(['controls']), 'mechanism')).toEqual({
      ok: false,
      reason: 'unknown-requirement',
      message: 'Unknown paper requirement.',
    });

    expect(
      start(withRequirements(['controls']), 'budget' as unknown as PaperRequirementId),
    ).toEqual({
      ok: false,
      reason: 'invalid-command',
      message: 'The paper requirement is not valid.',
    });
  });

  it('advances the running assignment and completes it on the last step', () => {
    const started = start(withRequirements(['controls']), 'controls');
    expect(started.ok).toBe(true);
    if (!started.ok) {
      return;
    }

    let state = started.state;
    for (let index = 0; index < 3; index += 1) {
      const result = dispatch(state, { type: 'performAction', action: 'experiment' });
      expect(result.ok).toBe(true);
      if (result.ok) {
        state = result.state;
      }
    }

    expect(state.experiments[0]).toEqual({
      id: 'experiment.controls.1',
      requirementId: 'controls',
      step: 3,
      steps: 3,
      state: 'done',
    });
    expect(state.energy).toBe(3);
  });

  it('refuses the experiment action when nothing is running', () => {
    const result = dispatch(createInitialState(1), {
      type: 'performAction',
      action: 'experiment',
    });

    expect(result).toEqual({
      ok: false,
      reason: 'no-running-experiment',
      message: 'No experiment is in progress.',
    });
  });
});

describe('results and write-up', () => {
  it('refuses a running result and an unknown result', () => {
    const started = start(withRequirements(['controls']), 'controls');
    expect(started.ok).toBe(true);
    if (!started.ok) {
      return;
    }

    expect(
      dispatch(started.state, {
        type: 'assignEvidence',
        evidenceId: 'experiment.controls.1',
        track: 'paper',
      }),
    ).toEqual({
      ok: false,
      reason: 'result-not-ready',
      message: 'That result is still in progress.',
    });

    expect(
      dispatch(started.state, {
        type: 'assignEvidence',
        evidenceId: 'experiment.controls.9',
        track: 'paper',
      }),
    ).toEqual({
      ok: false,
      reason: 'unknown-result',
      message: 'That result is not available.',
    });
  });

  it('writes up the oldest requirement with current attached evidence', () => {
    let state = withRequirements(['controls', 'mechanism']);
    state = {
      ...state,
      experiments: [
        {
          id: 'experiment.controls.1',
          requirementId: 'controls',
          step: 3,
          steps: 3,
          state: 'done',
        },
        {
          id: 'experiment.mechanism.1',
          requirementId: 'mechanism',
          step: 4,
          steps: 4,
          state: 'done',
        },
      ],
    };

    const first = attach(state, 'controls');
    expect(first.ok).toBe(true);
    if (!first.ok) {
      return;
    }
    const second = attach(first.state, 'mechanism', 'both');
    expect(second.ok).toBe(true);
    if (!second.ok) {
      return;
    }

    expect(second.state.evidence.map((entry) => entry.track)).toEqual(['paper', 'both']);

    const write = dispatch(second.state, { type: 'performAction', action: 'write-paper' });
    expect(write.ok).toBe(true);
    if (write.ok) {
      expect(write.state.paper.requirements).toEqual([
        { id: 'controls', state: 'satisfied' },
        { id: 'mechanism', state: 'open' },
      ]);
      expect(write.effects).toContainEqual({
        kind: 'requirement-satisfied',
        payload: { requirementId: 'controls' },
      });
    }
  });

  it('refuses a write-up without a current result', () => {
    const empty = dispatch(withRequirements(['controls']), {
      type: 'performAction',
      action: 'write-paper',
    });

    expect(empty).toEqual({
      ok: false,
      reason: 'nothing-to-write-up',
      message: 'There is no current result to write up.',
    });

    const finished = withFinishedResult('controls');
    const attached = attach(finished, 'controls');
    expect(attached.ok).toBe(true);
    if (!attached.ok) {
      return;
    }

    const reframed = applyReframe(attached.state, 'agricultural impact');
    expect(reframed.ok).toBe(true);
    if (!reframed.ok) {
      return;
    }

    expect(dispatch(reframed.state, { type: 'performAction', action: 'write-paper' })).toEqual({
      ok: false,
      reason: 'nothing-to-write-up',
      message: 'There is no current result to write up.',
    });
  });

  it('refreshes the oldest stale evidence and rewrites the requirement', () => {
    const finished = withRequirements(['controls']);
    const withResults: CampaignState = {
      ...finished,
      experiments: [
        {
          id: 'experiment.controls.1',
          requirementId: 'controls',
          step: 3,
          steps: 3,
          state: 'done',
        },
        {
          id: 'experiment.controls.2',
          requirementId: 'controls',
          step: 3,
          steps: 3,
          state: 'done',
        },
      ],
    };

    const first = attach(withResults, 'controls');
    expect(first.ok).toBe(true);
    if (!first.ok) {
      return;
    }

    const both = dispatch(first.state, {
      type: 'assignEvidence',
      evidenceId: 'experiment.controls.2',
      track: 'paper',
    });
    expect(both.ok).toBe(true);
    if (!both.ok) {
      return;
    }

    const reframed = applyReframe(both.state, 'agricultural impact');
    expect(reframed.ok).toBe(true);
    if (!reframed.ok) {
      return;
    }
    expect(reframed.state.evidence.every((entry) => entry.state === 'stale')).toBe(true);

    const analysed = dispatch(reframed.state, { type: 'performAction', action: 'analyse' });
    expect(analysed.ok).toBe(true);
    if (analysed.ok) {
      expect(analysed.state.evidence[0]?.state).toBe('current');
      expect(analysed.state.evidence[1]?.state).toBe('stale');
      expect(analysed.effects).toContainEqual({
        kind: 'evidence-refreshed',
        payload: { evidenceId: 'experiment.controls.1' },
      });
    }

    const write = dispatch(analysed.ok ? analysed.state : reframed.state, {
      type: 'performAction',
      action: 'write-paper',
    });
    expect(write.ok).toBe(true);
    if (write.ok) {
      expect(write.state.paper.requirements).toEqual([{ id: 'controls', state: 'satisfied' }]);
    }
  });

  it('refuses analysis when nothing is stale', () => {
    const result = dispatch(createInitialState(1), {
      type: 'performAction',
      action: 'analyse',
    });

    expect(result).toEqual({
      ok: false,
      reason: 'nothing-to-analyse',
      message: 'There is no stale evidence to analyse.',
    });
  });
});

describe('gating and purity', () => {
  it('refuses work in a lost week and after the contract', () => {
    const lost: CampaignState = {
      ...withRequirements(['controls']),
      crashed: true,
      actionsLeft: 0,
    };
    const finished: CampaignState = {
      ...withRequirements(['controls']),
      week: 12,
      actionsLeft: 0,
    };

    expect(start(lost, 'controls')).toEqual({
      ok: false,
      reason: 'week-lost',
      message: 'This week is lost. End the week to recover.',
    });
    expect(dispatch(lost, { type: 'performAction', action: 'experiment' })).toEqual({
      ok: false,
      reason: 'week-lost',
      message: 'This week is lost. End the week to recover.',
    });
    expect(
      dispatch(lost, {
        type: 'assignEvidence',
        evidenceId: 'experiment.controls.1',
        track: 'paper',
      }),
    ).toEqual({
      ok: false,
      reason: 'week-lost',
      message: 'This week is lost. End the week to recover.',
    });

    expect(start(finished, 'controls')).toEqual({
      ok: false,
      reason: 'contract-finished',
      message: 'The contract is finished.',
    });
    expect(
      dispatch(finished, {
        type: 'assignEvidence',
        evidenceId: 'experiment.controls.1',
        track: 'paper',
      }),
    ).toEqual({
      ok: false,
      reason: 'contract-finished',
      message: 'The contract is finished.',
    });
  });

  it('does not mutate the original state', () => {
    const state = withFinishedResult('controls');
    const before = JSON.stringify(state);

    attach(state, 'controls');
    start(state, 'controls');
    dispatch(state, { type: 'performAction', action: 'write-paper' });

    expect(JSON.stringify(state)).toBe(before);
  });

  it('is deterministic for the same state and command', () => {
    const state = withRequirements(['controls']);

    const first = start(state, 'controls');
    const second = start(state, 'controls');

    expect(second).toEqual(first);
  });

  it('rejects malformed experiment entries in the state', () => {
    const base = createInitialState(1);
    const badStep = validateState({
      ...base,
      experiments: [
        {
          id: 'experiment.controls.1',
          requirementId: 'controls',
          step: 5,
          steps: 3,
          state: 'done',
        },
      ],
    });
    const badState = validateState({
      ...base,
      experiments: [
        {
          id: 'experiment.controls.1',
          requirementId: 'controls',
          step: 1,
          steps: 3,
          state: 'tired',
        },
      ],
    });
    const duplicated = validateState({
      ...base,
      experiments: [
        {
          id: 'experiment.controls.1',
          requirementId: 'controls',
          step: 1,
          steps: 3,
          state: 'running',
        },
        {
          id: 'experiment.controls.1',
          requirementId: 'controls',
          step: 2,
          steps: 3,
          state: 'paused',
        },
      ],
    });

    expect(badStep.ok).toBe(false);
    if (!badStep.ok) {
      expect(badStep.issues).toContain('experiments[0].step is out of range');
    }
    expect(badState.ok).toBe(false);
    if (!badState.ok) {
      expect(badState.issues).toContain('experiments[0].state is unknown');
    }
    expect(duplicated.ok).toBe(false);
    if (!duplicated.ok) {
      expect(duplicated.issues).toContain('experiments[1].id is duplicated');
    }
  });
});
