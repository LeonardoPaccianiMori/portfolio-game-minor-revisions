import { describe, expect, it } from 'vitest';

import {
  EVENT_CATALOGUE,
  PAPER_REQUIREMENT_IDS,
  REVIEWER_IDS,
  createInitialState,
  decideVerdict,
  downgradeVerdict,
  evaluateEvents,
  recommendReview,
  resolvePanel,
  resolveReview,
  scorePanelAnswers,
} from '../../src/rules/index.ts';
import type {
  CampaignState,
  FellowshipAnswerType,
  FellowshipRequirementId,
  PaperOutcome,
  ReviewRecommendation,
} from '../../src/rules/index.ts';

const FELLOWSHIP_IDS = ['impact', 'feasibility', 'independence', 'support'] as const;

const RANK: Readonly<Record<ReviewRecommendation, number>> = {
  accept: 0,
  'minor-revision': 1,
  'major-revision': 2,
  reject: 3,
};

const REVIEW_STANDING: Readonly<Record<Exclude<PaperOutcome, 'pending'>, number>> = {
  accept: 10,
  'minor-revision': 5,
  'major-revision': 0,
  reject: -5,
  'not-submitted': -10,
};

const answered = (
  answerOf: (id: FellowshipRequirementId) => FellowshipAnswerType,
  state: CampaignState = createInitialState(1),
): CampaignState => ({
  ...state,
  fellowship: {
    ...state.fellowship,
    requirements: FELLOWSHIP_IDS.map((id) => ({
      id,
      state: 'answered' as const,
      answer: answerOf(id),
    })),
  },
});

const staleAnswer = (state: CampaignState, id: FellowshipRequirementId): CampaignState => ({
  ...state,
  fellowship: {
    ...state.fellowship,
    requirements: state.fellowship.requirements.map((requirement) =>
      requirement.id === id ? { ...requirement, state: 'stale' as const } : requirement,
    ),
  },
});

const submitted = (state: CampaignState = createInitialState(1)): CampaignState => ({
  ...state,
  paper: {
    ...state.paper,
    framing: 'agricultural impact',
    revision: 1,
    requirements: PAPER_REQUIREMENT_IDS.map((id) => ({ id, state: 'satisfied' as const })),
  },
});

const findSeed = (predicate: (seed: number) => boolean): number => {
  for (let seed = 1; seed <= 80; seed += 1) {
    if (predicate(seed)) {
      return seed;
    }
  }

  throw new Error('no seed found');
};

const recommendationOf = (
  effects: readonly { kind: string; payload: Readonly<Record<string, unknown>> }[],
  reviewerId: string,
): ReviewRecommendation | undefined => {
  const report = effects.find(
    (effect) => effect.kind === 'review-report' && effect.payload['reviewerId'] === reviewerId,
  );

  return report?.payload['recommendation'] as ReviewRecommendation | undefined;
};

describe('fellowship panel', () => {
  it('rejects a missed deadline without reading a proposal', () => {
    const state: CampaignState = {
      ...answered(() => 'honest'),
      flags: { 'event.fellowship.missed': true },
    };

    const result = resolvePanel(state);

    expect(result.state.fellowship.outcome).toBe('rejected');
    expect(result.state.standing).toBe(50);
    expect(result.state.integrity).toBe(100);
    expect(result.state.flags['panel.rejected']).toBe(true);
    expect(result.state.flags['renewal.closed']).toBe(true);
    expect(result.state.history.at(-1)).toBe('panel:rejected');
    expect(result.effects).toContainEqual({
      kind: 'panel-outcome',
      payload: { outcome: 'rejected', detected: false },
    });
    expect(result.effects).toContainEqual({
      kind: 'message',
      payload: { messageId: 'message.panel.missed' },
    });
  });

  it('rejects blank answers and never funds honest ones', () => {
    const blank = resolvePanel(answered(() => 'blank'));
    const honest = resolvePanel(answered(() => 'honest'));

    expect(blank.state.fellowship.outcome).toBe('rejected');
    expect(blank.state.standing).toBe(45);
    expect(blank.state.flags['renewal.closed']).toBe(true);
    expect(blank.effects).toContainEqual({
      kind: 'message',
      payload: { messageId: 'message.panel.rejected' },
    });

    expect(['waitlisted', 'rejected']).toContain(honest.state.fellowship.outcome);
  });

  it('funds confident answers when the mood allows and never rejects them', () => {
    const overall = resolvePanel(answered(() => 'inflate'));
    expect(['funded', 'waitlisted']).toContain(overall.state.fellowship.outcome);

    const seed = findSeed(
      (candidate) =>
        resolvePanel(answered(() => 'inflate', createInitialState(candidate))).state.fellowship
          .outcome === 'funded',
    );
    const result = resolvePanel(answered(() => 'inflate', createInitialState(seed)));

    expect(result.state.fellowship.outcome).toBe('funded');
    expect(result.state.standing).toBe(60);
    expect(result.state.flags['panel.funded']).toBe(true);
    expect(result.state.flags['renewal.closed']).toBeUndefined();
    expect(result.effects).toContainEqual({
      kind: 'message',
      payload: { messageId: 'message.panel.funded' },
    });
  });

  it('forces a rejection and a discovery cost when fabrication is caught', () => {
    const seed = findSeed(
      (candidate) =>
        resolvePanel(answered(() => 'fabricate', createInitialState(candidate))).state.flags[
          'discovery.panel'
        ] === true,
    );
    const result = resolvePanel(answered(() => 'fabricate', createInitialState(seed)));

    expect(result.state.fellowship.outcome).toBe('rejected');
    expect(result.state.standing).toBe(45);
    expect(result.state.integrity).toBe(90);
    expect(result.state.flags['panel.rejected']).toBe(true);
    expect(result.state.flags['discovery.panel']).toBe(true);
    expect(result.state.flags['renewal.closed']).toBe(true);
    expect(result.effects).toContainEqual({
      kind: 'panel-outcome',
      payload: { outcome: 'rejected', detected: true },
    });
    expect(result.effects).toContainEqual({
      kind: 'message',
      payload: { messageId: 'message.discovery.panel' },
    });
  });

  it('scores the answers and the staleness penalty', () => {
    expect(scorePanelAnswers(answered(() => 'honest'))).toBe(8);
    expect(scorePanelAnswers(answered(() => 'fabricate'))).toBe(16);
    expect(scorePanelAnswers(answered(() => 'blank'))).toBe(0);
    expect(
      scorePanelAnswers(
        staleAnswer(
          answered(() => 'honest'),
          'impact',
        ),
      ),
    ).toBe(7);
    expect(scorePanelAnswers(createInitialState(1))).toBe(0);
  });

  it('does not mutate the original state and is deterministic', () => {
    const state = answered(() => 'inflate');
    const before = JSON.stringify(state);

    const first = resolvePanel(state);
    const second = resolvePanel(state);

    expect(second.state).toEqual(first.state);
    expect(JSON.stringify(state)).toBe(before);
    expect(first.state.rngState).not.toBe(state.rngState);
  });
});

describe('journal review', () => {
  it('desk-rejects an incomplete manuscript', () => {
    const state: CampaignState = {
      ...createInitialState(1),
      paper: {
        ...createInitialState(1).paper,
        requirements: [{ id: 'controls', state: 'open' }],
      },
    };

    const result = resolveReview(state);

    expect(result.state.paper.outcome).toBe('not-submitted');
    expect(result.state.standing).toBe(40);
    expect(result.state.flags['paper.not-submitted']).toBe(true);
    expect(result.state.flags['renewal.closed']).toBe(true);
    expect(result.state.history.at(-1)).toBe('review:not-submitted');
    expect(result.effects).toContainEqual({
      kind: 'review-verdict',
      payload: { outcome: 'not-submitted', detected: false },
    });
    expect(result.effects.some((effect) => effect.kind === 'review-report')).toBe(false);
  });

  it('emits three reports, a verdict, and the matching standing change', () => {
    const result = resolveReview(submitted());
    const reports = result.effects.filter((effect) => effect.kind === 'review-report');

    expect(reports).toHaveLength(3);
    expect(reports.map((report) => report.payload['reviewerId'])).toEqual([...REVIEWER_IDS]);

    const recommendations = reports.map(
      (report) => report.payload['recommendation'] as ReviewRecommendation,
    );
    const outcome = result.state.paper.outcome as Exclude<PaperOutcome, 'pending'>;

    expect(outcome).toBe(decideVerdict(recommendations));
    expect(outcome).not.toBe('not-submitted');
    expect(result.state.flags['paper.submitted']).toBe(true);
    expect(result.state.standing).toBe(50 + REVIEW_STANDING[outcome]);
    expect(result.state.history.at(-1)).toBe(`review:${outcome}`);
    expect(result.effects).toContainEqual({
      kind: 'review-verdict',
      payload: { outcome, detected: false },
    });

    for (const report of reports) {
      const recommendation = report.payload['recommendation'] as ReviewRecommendation;
      expect(report.payload['commentIds']).toEqual([
        `${String(report.payload['reviewerId'])}.${recommendation}.1`,
        `${String(report.payload['reviewerId'])}.${recommendation}.2`,
      ]);
    }
  });

  it('keeps the standing consistent with the outcome across seeds', () => {
    for (let seed = 1; seed <= 12; seed += 1) {
      const result = resolveReview(submitted(createInitialState(seed)));
      const outcome = result.state.paper.outcome as Exclude<PaperOutcome, 'pending'>;

      expect(outcome).not.toBe('not-submitted');
      expect(result.state.standing).toBe(50 + REVIEW_STANDING[outcome]);
      expect(result.state.flags['discovery.review']).toBeUndefined();
    }
  });

  it('drops the verdict one rank when overlap is caught', () => {
    const risky = (seed: number): CampaignState => {
      const state = submitted(createInitialState(seed));

      return {
        ...state,
        evidence: [
          { id: 'experiment.controls.1', state: 'current', track: 'both', overlap: true },
          { id: 'experiment.mechanism.1', state: 'current', track: 'both', overlap: true },
        ],
        flags: { ...state.flags, 'complicity.take-credit': true },
      };
    };

    const seed = findSeed(
      (candidate) => resolveReview(risky(candidate)).state.flags['discovery.review'] === true,
    );
    const result = resolveReview(risky(seed));
    const reports = result.effects.filter((effect) => effect.kind === 'review-report');
    const recommendations = reports.map(
      (report) => report.payload['recommendation'] as ReviewRecommendation,
    );

    expect(result.state.paper.outcome).toBe(downgradeVerdict(decideVerdict(recommendations)));
    expect(result.state.integrity).toBe(90);
    expect(result.state.flags['discovery.review']).toBe(true);
    expect(result.effects).toContainEqual({
      kind: 'message',
      payload: { messageId: 'message.discovery.review' },
    });
  });

  it('punishes a panel discovery through the profile reviewer', () => {
    const clean = submitted();
    const discovered: CampaignState = {
      ...submitted(),
      flags: { ...clean.flags, 'discovery.panel': true },
    };

    const cleanResult = resolveReview(clean);
    const discoveredResult = resolveReview(discovered);
    const cleanRecommendation = recommendationOf(cleanResult.effects, 'reviewer.profile');
    const discoveredRecommendation = recommendationOf(discoveredResult.effects, 'reviewer.profile');

    expect(cleanRecommendation).toBeDefined();
    expect(discoveredRecommendation).toBeDefined();
    expect(RANK[discoveredRecommendation as ReviewRecommendation]).toBeGreaterThanOrEqual(
      RANK[cleanRecommendation as ReviewRecommendation],
    );
  });

  it('punishes stale evidence through the methods reviewer', () => {
    const clean = submitted();
    const stale: CampaignState = {
      ...submitted(),
      evidence: [{ id: 'experiment.controls.1', state: 'stale', track: 'paper', overlap: false }],
    };

    const cleanResult = resolveReview(clean);
    const staleResult = resolveReview(stale);
    const cleanRecommendation = recommendationOf(cleanResult.effects, 'reviewer.methods');
    const staleRecommendation = recommendationOf(staleResult.effects, 'reviewer.methods');

    expect(RANK[staleRecommendation as ReviewRecommendation]).toBeGreaterThanOrEqual(
      RANK[cleanRecommendation as ReviewRecommendation],
    );
  });

  it('does not mutate the original state and is deterministic', () => {
    const state = submitted();
    const before = JSON.stringify(state);

    const first = resolveReview(state);
    const second = resolveReview(state);

    expect(second.state).toEqual(first.state);
    expect(JSON.stringify(state)).toBe(before);
    expect(first.state.rngState).not.toBe(state.rngState);
  });
});

describe('reviewer decisions', () => {
  it('maps scores to recommendations', () => {
    expect(recommendReview(3)).toBe('accept');
    expect(recommendReview(2)).toBe('minor-revision');
    expect(recommendReview(1)).toBe('minor-revision');
    expect(recommendReview(0)).toBe('major-revision');
    expect(recommendReview(-1)).toBe('major-revision');
    expect(recommendReview(-2)).toBe('reject');
  });

  it('takes the majority and the harshest on a split', () => {
    expect(decideVerdict(['accept', 'accept', 'reject'])).toBe('accept');
    expect(decideVerdict(['reject', 'major-revision', 'reject'])).toBe('reject');
    expect(decideVerdict(['minor-revision', 'accept', 'reject'])).toBe('reject');
    expect(decideVerdict(['accept', 'minor-revision', 'major-revision'])).toBe('major-revision');
  });

  it('downgrades one rank and holds at the floor', () => {
    expect(downgradeVerdict('accept')).toBe('minor-revision');
    expect(downgradeVerdict('minor-revision')).toBe('major-revision');
    expect(downgradeVerdict('major-revision')).toBe('reject');
    expect(downgradeVerdict('reject')).toBe('reject');
  });
});

describe('outcome events', () => {
  it('fires the panel once through the catalogue', () => {
    const flags = Object.fromEntries(
      EVENT_CATALOGUE.filter((event) => event.id !== 'fellowship-panel').map((event) => [
        `event.${event.id}`,
        true,
      ]),
    );
    const state: CampaignState = {
      ...answered(() => 'inflate'),
      week: 9,
      flags,
    };

    const first = evaluateEvents(state);

    expect(first.fired).toEqual(['fellowship-panel']);
    expect(first.state.fellowship.outcome).not.toBe('pending');

    const second = evaluateEvents(first.state);

    expect(second.fired).toEqual([]);
    expect(second.state.fellowship.outcome).toBe(first.state.fellowship.outcome);
  });

  it('fires the review once through the catalogue', () => {
    const flags = Object.fromEntries(
      EVENT_CATALOGUE.filter((event) => event.id !== 'journal-review').map((event) => [
        `event.${event.id}`,
        true,
      ]),
    );
    const state: CampaignState = {
      ...submitted(),
      week: 12,
      actionsLeft: 0,
      flags,
    };

    const first = evaluateEvents(state);

    expect(first.fired).toEqual(['journal-review']);
    expect(first.state.paper.outcome).not.toBe('pending');

    const second = evaluateEvents(first.state);

    expect(second.fired).toEqual([]);
    expect(second.state.paper.outcome).toBe(first.state.paper.outcome);
  });
});
