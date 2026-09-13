import { describe, expect, it } from 'vitest';

import {
  assignEvidence,
  createInitialState,
  dispatch,
  validateEvidenceList,
  validateState,
} from '../../src/rules/index.ts';
import type { CampaignState, Command, PaperRequirementId } from '../../src/rules/index.ts';

const withFinishedResult = (
  state: CampaignState,
  requirementId: PaperRequirementId = 'controls',
): CampaignState => ({
  ...state,
  paper: { ...state.paper, requirements: [{ id: requirementId, state: 'open' }] },
  experiments: [
    {
      id: `experiment.${requirementId}.1`,
      requirementId,
      step: 3,
      steps: 3,
      state: 'done',
    },
  ],
});

describe('shared evidence', () => {
  it('attaches current evidence with a track and no overlap', () => {
    const state = withFinishedResult(createInitialState(1));
    const result = dispatch(state, {
      type: 'assignEvidence',
      evidenceId: 'experiment.controls.1',
      track: 'paper',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.evidence).toEqual([
        {
          id: 'experiment.controls.1',
          state: 'current',
          track: 'paper',
          overlap: false,
        },
      ]);
      expect(result.state.experiments[0]?.state).toBe('attached');
    }
  });

  it('attaches a result to the fellowship track without overlap', () => {
    const state = withFinishedResult(createInitialState(1));
    const result = assignEvidence(state, {
      type: 'assignEvidence',
      evidenceId: 'experiment.controls.1',
      track: 'fellowship',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.evidence).toEqual([
        {
          id: 'experiment.controls.1',
          state: 'current',
          track: 'fellowship',
          overlap: false,
        },
      ]);
      expect(result.state.experiments[0]?.state).toBe('attached');
    }
  });

  it('sets the overlap flag when a result is assigned to both tracks', () => {
    const state = withFinishedResult(createInitialState(1));
    const result = assignEvidence(state, {
      type: 'assignEvidence',
      evidenceId: 'experiment.controls.1',
      track: 'both',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.evidence[0]?.overlap).toBe(true);
      expect(result.effects[0]).toEqual({
        kind: 'evidence-assigned',
        payload: {
          evidenceId: 'experiment.controls.1',
          track: 'both',
          overlap: true,
        },
      });
    }
  });

  it('refuses a duplicate identifier across tracks without mutating the state', () => {
    const state = withFinishedResult(createInitialState(1));
    const first = assignEvidence(state, {
      type: 'assignEvidence',
      evidenceId: 'experiment.controls.1',
      track: 'paper',
    });

    expect(first.ok).toBe(true);
    if (!first.ok) {
      return;
    }

    const before = JSON.stringify(first.state);
    const duplicate = assignEvidence(first.state, {
      type: 'assignEvidence',
      evidenceId: 'experiment.controls.1',
      track: 'fellowship',
    });

    expect(duplicate).toEqual({
      ok: false,
      reason: 'duplicate-evidence',
      message: 'This evidence is already attached.',
    });
    expect(JSON.stringify(first.state)).toBe(before);
  });

  it('rejects an empty identifier and an invalid track', () => {
    const state = createInitialState(1);

    expect(
      assignEvidence(state, {
        type: 'assignEvidence',
        evidenceId: '   ',
        track: 'paper',
      }),
    ).toEqual({
      ok: false,
      reason: 'invalid-command',
      message: 'The evidence identifier is empty.',
    });

    expect(
      assignEvidence(state, {
        type: 'assignEvidence',
        evidenceId: 'paper.evidence.sequence.1',
        track: 'journal' as unknown as 'paper',
      }),
    ).toEqual({
      ok: false,
      reason: 'invalid-command',
      message: 'The evidence track is not valid.',
    });
  });

  it('validates the evidence list inside the campaign state', () => {
    const state = createInitialState(1);
    const invalid = {
      ...state,
      evidence: [{ id: 'x', state: 'current', track: 'paper', overlap: 'yes' }],
    };

    const result = validateState(invalid);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues).toContain('evidence[0].overlap must be a boolean');
    }

    expect(validateEvidenceList('nope')).toEqual(['evidence must be a list']);
  });

  it('keeps the dispatcher rejection contract for an invalid command shape', () => {
    const state = createInitialState(1);
    const result = dispatch(state, {} as unknown as Command);

    expect(result.ok).toBe(false);
  });
});
