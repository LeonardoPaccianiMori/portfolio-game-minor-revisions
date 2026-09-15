import { ENDING_IDS, RUN_ENDED_CAUSES } from './campaign-state.ts';
import type {
  CampaignState,
  EndingId,
  RelationshipId,
  RunEndedCause,
  RunResolution,
} from './campaign-state.ts';
import { COMPLICITY_ACTIONS } from './commands.ts';
import type {
  CommandRejectionReason,
  CommandResult,
  ComplicityAction,
  PresentationEffect,
} from './commands.ts';
import { FELLOWSHIP_OUTCOMES } from './fellowship.ts';
import type { FellowshipOutcome } from './fellowship.ts';
import { PAPER_OUTCOMES } from './paper.ts';
import type { PaperOutcome } from './paper.ts';

export const EJECTION_WARNING_STANDING = 20;
export const EJECTION_WARNING_TURNS = 2;
export const KEPT_INTEGRITY = 60;
export const STAYED_TRUST = 40;

export const COLLEAGUE_IDS = ['dario', 'mara'] as const;
export type ColleagueId = (typeof COLLEAGUE_IDS)[number];

export const DISCOVERY_KINDS = ['panel', 'review'] as const;
export type DiscoveryKind = (typeof DISCOVERY_KINDS)[number];

export interface PersonnelFile {
  readonly ending: EndingId;
  readonly cause: RunEndedCause;
  readonly week: number;
  readonly seed: number;
  readonly paperOutcome: PaperOutcome;
  readonly fellowshipOutcome: FellowshipOutcome;
  readonly standing: number;
  readonly integrity: number;
  readonly relationships: Readonly<Record<RelationshipId, number>>;
  readonly stayed: readonly ColleagueId[];
  readonly complicity: readonly ComplicityAction[];
  readonly discoveries: readonly DiscoveryKind[];
  readonly crashes: readonly number[];
  readonly quit: boolean;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value);

const isMeter = (value: unknown): value is number => isInteger(value) && value >= 0 && value <= 100;

const rejection = (reason: CommandRejectionReason, message: string): CommandResult => ({
  ok: false,
  reason,
  message,
});

const actOf = (week: number): number => Math.ceil(week / 4);

export const computeStayed = (state: CampaignState): readonly ColleagueId[] =>
  COLLEAGUE_IDS.filter((id) => state.relationships[id] >= STAYED_TRUST);

export const computeSuccess = (state: CampaignState): boolean =>
  state.flags['renewal.closed'] !== true ||
  state.paper.outcome === 'accept' ||
  state.paper.outcome === 'minor-revision';

export const computeKept = (state: CampaignState): boolean =>
  state.integrity >= KEPT_INTEGRITY && computeStayed(state).length > 0;

export const resolveContractEnding = (state: CampaignState): EndingId => {
  const success = computeSuccess(state);
  const kept = computeKept(state);

  if (success) {
    return kept ? 'ending.hollow' : 'ending.complicit';
  }

  return kept ? 'ending.intact' : 'ending.ejected';
};

export const resolveEnding = (state: CampaignState, cause: RunEndedCause): EndingId => {
  if (cause === 'ejection' || cause === 'burnout') {
    return 'ending.ejected';
  }

  if (cause === 'quit') {
    return 'ending.intact';
  }

  return resolveContractEnding(state);
};

export const buildPersonnelFile = (
  state: CampaignState,
  resolution: { readonly cause: RunEndedCause; readonly ending: EndingId; readonly week: number },
): PersonnelFile => ({
  ending: resolution.ending,
  cause: resolution.cause,
  week: resolution.week,
  seed: state.seed,
  paperOutcome: state.paper.outcome,
  fellowshipOutcome: state.fellowship.outcome,
  standing: state.standing,
  integrity: state.integrity,
  relationships: {
    voss: state.relationships.voss,
    dario: state.relationships.dario,
    mara: state.relationships.mara,
  },
  stayed: computeStayed(state),
  complicity: COMPLICITY_ACTIONS.filter((action) => state.flags[`complicity.${action}`] === true),
  discoveries: DISCOVERY_KINDS.filter((kind) => state.flags[`discovery.${kind}`] === true),
  crashes: [...state.crashWeeks],
  quit: resolution.cause === 'quit',
});

const hasDoubleCrash = (state: CampaignState): boolean => {
  const acts = state.crashWeeks.map(actOf);

  return new Set(acts).size < acts.length;
};

const resolveRun = (
  state: CampaignState,
  cause: RunEndedCause,
  extraHistory: readonly string[] = [],
): { readonly state: CampaignState; readonly effects: readonly PresentationEffect[] } => {
  const ending = resolveEnding(state, cause);
  const resolution: RunResolution = { cause, ending, week: state.week };
  const file = buildPersonnelFile(state, {
    cause,
    ending,
    week: state.week,
  });

  return {
    state: {
      ...state,
      resolution,
      history: [...state.history, ...extraHistory, `ending:${ending}`],
    },
    effects: [
      { kind: 'run-ended', payload: { cause, ending, week: state.week } },
      { kind: 'personnel-file', payload: { ...file } },
      { kind: 'message', payload: { messageId: `message.${ending}` } },
    ],
  };
};

export const evaluateRunState = (
  state: CampaignState,
): { readonly state: CampaignState; readonly effects: readonly PresentationEffect[] } => {
  if (state.resolution.cause !== 'none') {
    return { state, effects: [] };
  }

  if (hasDoubleCrash(state)) {
    return resolveRun(state, 'burnout');
  }

  if (
    state.standingWarningWeek !== null &&
    state.week >= state.standingWarningWeek + EJECTION_WARNING_TURNS &&
    state.standing <= EJECTION_WARNING_STANDING
  ) {
    return resolveRun(state, 'ejection');
  }

  let next = state;
  const effects: PresentationEffect[] = [];

  if (next.standing <= EJECTION_WARNING_STANDING && next.standingWarningWeek === null) {
    next = {
      ...next,
      standingWarningWeek: next.week,
      flags: { ...next.flags, 'ejection.warning': true },
    };
    effects.push({ kind: 'message', payload: { messageId: 'message.ejection.warning' } });
  } else if (next.standing > EJECTION_WARNING_STANDING && next.standingWarningWeek !== null) {
    next = { ...next, standingWarningWeek: null };
  }

  if (next.paper.outcome !== 'pending') {
    const resolved = resolveRun(next, 'contract');

    return { state: resolved.state, effects: [...effects, ...resolved.effects] };
  }

  return { state: next, effects };
};

export const quitRun = (state: CampaignState): CommandResult => {
  if (state.resolution.cause !== 'none') {
    return rejection('run-finished', 'The run has ended.');
  }

  const resolved = resolveRun(state, 'quit', ['quit']);

  return { ok: true, state: resolved.state, effects: resolved.effects };
};

export const validatePersonnelFile = (value: unknown): readonly string[] => {
  if (!isRecord(value)) {
    return ['personnel file must be an object'];
  }

  const issues: string[] = [];

  if (!ENDING_IDS.includes(value['ending'] as EndingId)) {
    issues.push('personnel file ending is unknown');
  }

  if (!RUN_ENDED_CAUSES.includes(value['cause'] as RunEndedCause)) {
    issues.push('personnel file cause is unknown');
  }

  if (!isInteger(value['week']) || value['week'] < 1 || value['week'] > 12) {
    issues.push('personnel file week is out of range');
  }

  if (!isInteger(value['seed']) || value['seed'] < 0 || value['seed'] > 4294967295) {
    issues.push('personnel file seed is out of range');
  }

  if (!PAPER_OUTCOMES.includes(value['paperOutcome'] as PaperOutcome)) {
    issues.push('personnel file paper outcome is unknown');
  }

  if (!FELLOWSHIP_OUTCOMES.includes(value['fellowshipOutcome'] as FellowshipOutcome)) {
    issues.push('personnel file fellowship outcome is unknown');
  }

  if (!isMeter(value['standing'])) {
    issues.push('personnel file standing is out of range');
  }

  if (!isMeter(value['integrity'])) {
    issues.push('personnel file integrity is out of range');
  }

  const relationships = value['relationships'];
  if (!isRecord(relationships)) {
    issues.push('personnel file relationships must be an object');
  } else {
    for (const id of ['voss', 'dario', 'mara'] as const) {
      if (!isMeter(relationships[id])) {
        issues.push(`personnel file relationships.${id} is out of range`);
      }
    }
  }

  const lists: readonly (readonly [string, readonly string[]])[] = [
    ['stayed', COLLEAGUE_IDS],
    ['complicity', COMPLICITY_ACTIONS],
    ['discoveries', DISCOVERY_KINDS],
  ];

  for (const [key, allowed] of lists) {
    const entries = value[key];
    if (
      !Array.isArray(entries) ||
      !entries.every((entry) => typeof entry === 'string' && allowed.includes(entry)) ||
      new Set(entries).size !== entries.length
    ) {
      issues.push(`personnel file ${key} must be a list of known values without repeats`);
    }
  }

  const crashes = value['crashes'];
  if (
    !Array.isArray(crashes) ||
    !crashes.every((week) => isInteger(week) && week >= 1 && week <= 12) ||
    new Set(crashes).size !== crashes.length
  ) {
    issues.push('personnel file crashes must be a list of week numbers without repeats');
  }

  if (typeof value['quit'] !== 'boolean') {
    issues.push('personnel file quit must be a boolean');
  } else if (value['quit'] !== (value['cause'] === 'quit')) {
    issues.push('personnel file quit must match the cause');
  }

  return issues;
};
