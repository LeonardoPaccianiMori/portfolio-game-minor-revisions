import type { CampaignState } from './campaign-state.ts';
import { staleCurrentEvidence } from './evidence.ts';
import { applyFellowshipEdit } from './fellowship.ts';
import { applyPaperEdit } from './paper.ts';

export interface ReframeOk {
  readonly ok: true;
  readonly state: CampaignState;
}

export interface ReframeFailure {
  readonly ok: false;
  readonly reason: string;
}

export type ReframeOutcome = ReframeOk | ReframeFailure;

export const applyReframe = (state: CampaignState, framing: string): ReframeOutcome => {
  const paperResult = applyPaperEdit(state.paper, { kind: 'reframe', framing });
  if (!paperResult.ok) {
    return { ok: false, reason: paperResult.reason };
  }

  const fellowshipResult = applyFellowshipEdit(state.fellowship, {
    kind: 'reframe',
    framing,
  });
  if (!fellowshipResult.ok) {
    return { ok: false, reason: fellowshipResult.reason };
  }

  return {
    ok: true,
    state: {
      ...state,
      paper: paperResult.paper,
      fellowship: fellowshipResult.fellowship,
      evidence: staleCurrentEvidence(state.evidence),
    },
  };
};
