import { METER_MAX, METER_MIN } from './campaign-state.ts';
import type { CampaignState } from './campaign-state.ts';
import type { PresentationEffect } from './commands.ts';
import { FELLOWSHIP_REQUIREMENT_IDS } from './fellowship.ts';
import type { FellowshipAnswerType } from './commands.ts';
import type { PaperOutcome, PaperRequirementId } from './paper.ts';
import { createPrng } from './prng.ts';

export interface OutcomeResolution {
  readonly state: CampaignState;
  readonly effects: readonly PresentationEffect[];
}

export const REVIEWER_IDS = [
  'reviewer.methods',
  'reviewer.significance',
  'reviewer.profile',
] as const;
export type ReviewerId = (typeof REVIEWER_IDS)[number];

export const REVIEW_RECOMMENDATIONS = [
  'accept',
  'minor-revision',
  'major-revision',
  'reject',
] as const;
export type ReviewRecommendation = (typeof REVIEW_RECOMMENDATIONS)[number];

const RECOMMENDATION_RANK: Readonly<Record<ReviewRecommendation, number>> = {
  accept: 0,
  'minor-revision': 1,
  'major-revision': 2,
  reject: 3,
};

const PANEL_ANSWER_SCORES: Readonly<Record<FellowshipAnswerType, number>> = {
  honest: 2,
  inflate: 3,
  fabricate: 4,
  imitate: 2,
  blank: 0,
};

const PANEL_FUNDED_MIN = 12;
const PANEL_WAITLISTED_MIN = 8;
const DISCOVERY_INTEGRITY_LOSS = 10;

const PANEL_STANDING: Readonly<Record<'funded' | 'waitlisted' | 'rejected', number>> = {
  funded: 10,
  waitlisted: 0,
  rejected: -5,
};

const REVIEW_STANDING: Readonly<Record<Exclude<PaperOutcome, 'pending'>, number>> = {
  accept: 10,
  'minor-revision': 5,
  'major-revision': 0,
  reject: -5,
  'not-submitted': -10,
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const message = (messageId: string): PresentationEffect => ({
  kind: 'message',
  payload: { messageId },
});

const overlapCount = (state: CampaignState): number =>
  state.evidence.filter((entry) => entry.overlap).length;

const fabricatedCount = (state: CampaignState): number =>
  state.fellowship.requirements.filter((requirement) => requirement.answer === 'fabricate').length;

const takeCredit = (state: CampaignState): boolean =>
  state.flags['complicity.take-credit'] === true;

const hasDiscovery = (state: CampaignState): boolean =>
  state.flags['discovery.panel'] === true || state.flags['discovery.review'] === true;

const satisfied = (state: CampaignState, requirementId: PaperRequirementId): boolean =>
  state.paper.requirements.some(
    (requirement) => requirement.id === requirementId && requirement.state === 'satisfied',
  );

export const recommendReview = (score: number): ReviewRecommendation => {
  if (score >= 3) {
    return 'accept';
  }

  if (score >= 1) {
    return 'minor-revision';
  }

  if (score >= -1) {
    return 'major-revision';
  }

  return 'reject';
};

export const decideVerdict = (
  recommendations: readonly ReviewRecommendation[],
): ReviewRecommendation => {
  const majority = recommendations.find(
    (candidate) =>
      recommendations.filter((recommendation) => recommendation === candidate).length >= 2,
  );

  if (majority !== undefined) {
    return majority;
  }

  return recommendations.reduce((worst, candidate) =>
    RECOMMENDATION_RANK[candidate] > RECOMMENDATION_RANK[worst] ? candidate : worst,
  );
};

export const downgradeVerdict = (recommendation: ReviewRecommendation): ReviewRecommendation => {
  if (recommendation === 'accept') {
    return 'minor-revision';
  }

  if (recommendation === 'minor-revision') {
    return 'major-revision';
  }

  return 'reject';
};

export const scorePanelAnswers = (state: CampaignState): number =>
  state.fellowship.requirements
    .filter((requirement) => FELLOWSHIP_REQUIREMENT_IDS.includes(requirement.id))
    .reduce((total, requirement) => {
      const base = requirement.answer === null ? 0 : PANEL_ANSWER_SCORES[requirement.answer];
      return total + Math.max(0, requirement.state === 'stale' ? base - 1 : base);
    }, 0);

export const resolvePanel = (state: CampaignState): OutcomeResolution => {
  if (state.flags['event.fellowship.missed'] === true) {
    return {
      state: {
        ...state,
        fellowship: { ...state.fellowship, outcome: 'rejected' },
        flags: { ...state.flags, 'panel.rejected': true, 'renewal.closed': true },
        history: [...state.history, 'panel:rejected'],
      },
      effects: [
        { kind: 'panel-outcome', payload: { outcome: 'rejected', detected: false } },
        message('message.panel.missed'),
      ],
    };
  }

  const prng = createPrng(state.rngState);
  const mood = prng.nextInt(3) - 1;
  const risk = fabricatedCount(state) + overlapCount(state) + (takeCredit(state) ? 1 : 0);
  const detected = prng.nextInt(4) < Math.min(risk, 3);

  const total = scorePanelAnswers(state) + mood;
  const outcome = detected
    ? 'rejected'
    : total >= PANEL_FUNDED_MIN
      ? 'funded'
      : total >= PANEL_WAITLISTED_MIN
        ? 'waitlisted'
        : 'rejected';

  return {
    state: {
      ...state,
      fellowship: { ...state.fellowship, outcome },
      standing: clamp(state.standing + PANEL_STANDING[outcome], METER_MIN, METER_MAX),
      integrity: detected
        ? clamp(state.integrity - DISCOVERY_INTEGRITY_LOSS, METER_MIN, METER_MAX)
        : state.integrity,
      flags: {
        ...state.flags,
        [`panel.${outcome}`]: true,
        ...(outcome === 'rejected' ? { 'renewal.closed': true } : {}),
        ...(detected ? { 'discovery.panel': true } : {}),
      },
      history: [...state.history, `panel:${outcome}`],
      rngState: prng.state(),
    },
    effects: [
      { kind: 'panel-outcome', payload: { outcome, detected } },
      message(detected ? 'message.discovery.panel' : `message.panel.${outcome}`),
    ],
  };
};

export const resolveReview = (state: CampaignState): OutcomeResolution => {
  const submitted =
    state.paper.requirements.length > 0 &&
    state.paper.requirements.every((requirement) => requirement.state === 'satisfied');

  if (!submitted) {
    return {
      state: {
        ...state,
        paper: { ...state.paper, outcome: 'not-submitted' },
        standing: clamp(state.standing + REVIEW_STANDING['not-submitted'], METER_MIN, METER_MAX),
        flags: { ...state.flags, 'paper.not-submitted': true, 'renewal.closed': true },
        history: [...state.history, 'review:not-submitted'],
      },
      effects: [
        { kind: 'review-verdict', payload: { outcome: 'not-submitted', detected: false } },
        message('message.review.not-submitted'),
      ],
    };
  }

  const prng = createPrng(state.rngState);
  const methodsQuirk = prng.nextInt(3) - 1;
  const significanceQuirk = prng.nextInt(3) - 1;
  const profileQuirk = prng.nextInt(3) - 1;
  const risk = overlapCount(state) + (takeCredit(state) ? 1 : 0);
  const detected = prng.nextInt(4) < Math.min(risk, 3);

  const noStaleEvidence = state.evidence.every((entry) => entry.state === 'current');
  const methods =
    (satisfied(state, 'controls') ? 1 : 0) +
    (satisfied(state, 'replicates') ? 1 : 0) +
    (noStaleEvidence ? 1 : 0) -
    (state.paper.revision > 1 ? 1 : 0) +
    methodsQuirk;
  const significance =
    (satisfied(state, 'impact') ? 1 : 0) +
    (satisfied(state, 'presentation') ? 1 : 0) +
    (state.paper.revision >= 1 ? 1 : 0) +
    significanceQuirk;
  const profile =
    (state.relationships.voss >= 60 ? 1 : 0) +
    (takeCredit(state) ? 1 : 0) -
    (hasDiscovery(state) ? 2 : 0) +
    profileQuirk;

  const recommendations = [
    recommendReview(methods),
    recommendReview(significance),
    recommendReview(profile),
  ];
  const outcome = detected
    ? downgradeVerdict(decideVerdict(recommendations))
    : decideVerdict(recommendations);

  const reports = REVIEWER_IDS.map((reviewerId, index) => {
    const recommendation = recommendations[index] ?? 'reject';

    return {
      kind: 'review-report',
      payload: {
        reviewerId,
        recommendation,
        commentIds: [`${reviewerId}.${recommendation}.1`, `${reviewerId}.${recommendation}.2`],
      },
    };
  });

  return {
    state: {
      ...state,
      paper: { ...state.paper, outcome },
      standing: clamp(state.standing + REVIEW_STANDING[outcome], METER_MIN, METER_MAX),
      integrity: detected
        ? clamp(state.integrity - DISCOVERY_INTEGRITY_LOSS, METER_MIN, METER_MAX)
        : state.integrity,
      flags: {
        ...state.flags,
        'paper.submitted': true,
        ...(detected ? { 'discovery.review': true } : {}),
      },
      history: [...state.history, `review:${outcome}`],
      rngState: prng.state(),
    },
    effects: [
      ...reports,
      { kind: 'review-verdict', payload: { outcome, detected } },
      message(detected ? 'message.discovery.review' : `message.review.${outcome}`),
    ],
  };
};
