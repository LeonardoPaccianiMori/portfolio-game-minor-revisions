import { validateEvidenceList } from './evidence.ts';
import type { Evidence } from './evidence.ts';
import { createInitialFellowship, validateFellowship } from './fellowship.ts';
import type { FellowshipState } from './fellowship.ts';
import { PAPER_REQUIREMENT_IDS, createInitialPaper, validatePaper } from './paper.ts';
import type { PaperRequirementId, PaperState } from './paper.ts';

export const CAMPAIGN_STATE_VERSION = 1;

export const ENERGY_MIN = 0;
export const ENERGY_MAX = 5;
export const ACTIONS_PER_WEEK = 3;
export const WEEK_MIN = 1;
export const WEEK_MAX = 12;
export const METER_MIN = 0;
export const METER_MAX = 100;
export const UINT32_MAX = 4294967295;

export type RelationshipId = 'voss' | 'dario' | 'mara';

export const RELATIONSHIP_IDS: readonly RelationshipId[] = ['voss', 'dario', 'mara'];

export interface PendingEvent {
  readonly id: string;
  readonly choices: readonly string[];
}

export const EXPERIMENT_STATES = ['running', 'paused', 'done', 'attached'] as const;
export type ExperimentState = (typeof EXPERIMENT_STATES)[number];

export interface ExperimentAssignment {
  readonly id: string;
  readonly requirementId: PaperRequirementId;
  readonly step: number;
  readonly steps: number;
  readonly state: ExperimentState;
}

export const RUN_ENDED_CAUSES = ['contract', 'ejection', 'burnout', 'quit'] as const;
export type RunEndedCause = (typeof RUN_ENDED_CAUSES)[number];

export const RUN_END_CAUSES = ['none', ...RUN_ENDED_CAUSES] as const;
export type RunEndCause = (typeof RUN_END_CAUSES)[number];

export const ENDING_IDS = [
  'ending.hollow',
  'ending.complicit',
  'ending.intact',
  'ending.ejected',
] as const;
export type EndingId = (typeof ENDING_IDS)[number];

export interface RunResolution {
  readonly cause: RunEndCause;
  readonly ending: EndingId | null;
  readonly week: number | null;
}

export interface CampaignState {
  readonly version: number;
  readonly seed: number;
  readonly rngState: number;
  readonly week: number;
  readonly actionsLeft: number;
  readonly crashed: boolean;
  readonly energy: number;
  readonly standing: number;
  readonly integrity: number;
  readonly relationships: Readonly<Record<RelationshipId, number>>;
  readonly paper: PaperState;
  readonly fellowship: FellowshipState;
  readonly evidence: readonly Evidence[];
  readonly experiments: readonly ExperimentAssignment[];
  readonly pendingEvent: PendingEvent | null;
  readonly resolution: RunResolution;
  readonly crashWeeks: readonly number[];
  readonly standingWarningWeek: number | null;
  readonly history: readonly string[];
  readonly flags: Readonly<Record<string, boolean>>;
}

export interface StateValidationOk {
  readonly ok: true;
  readonly state: CampaignState;
}

export interface StateValidationFailure {
  readonly ok: false;
  readonly issues: readonly string[];
}

export type StateValidation = StateValidationOk | StateValidationFailure;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value);

const isMeter = (value: unknown): value is number =>
  isInteger(value) && value >= METER_MIN && value <= METER_MAX;

const validateExperiments = (value: unknown): readonly string[] => {
  if (!Array.isArray(value)) {
    return ['experiments must be a list'];
  }

  const issues: string[] = [];
  const seen = new Set<string>();

  value.forEach((entry, index) => {
    if (!isRecord(entry)) {
      issues.push(`experiments[${index}] must be an object`);
      return;
    }

    const id = entry['id'];
    if (typeof id !== 'string' || id.trim().length === 0) {
      issues.push(`experiments[${index}].id must be a non-empty string`);
    } else if (seen.has(id)) {
      issues.push(`experiments[${index}].id is duplicated`);
    } else {
      seen.add(id);
    }

    if (!PAPER_REQUIREMENT_IDS.includes(entry['requirementId'] as PaperRequirementId)) {
      issues.push(`experiments[${index}].requirementId is unknown`);
    }

    const steps = entry['steps'];
    if (!isInteger(steps) || steps < 2 || steps > 4) {
      issues.push(`experiments[${index}].steps is out of range`);
    }

    const step = entry['step'];
    if (!isInteger(step) || step < 0 || (isInteger(steps) && step > steps)) {
      issues.push(`experiments[${index}].step is out of range`);
    }

    if (!EXPERIMENT_STATES.includes(entry['state'] as ExperimentState)) {
      issues.push(`experiments[${index}].state is unknown`);
    }
  });

  return issues;
};

const STATE_KEYS: ReadonlySet<string> = new Set([
  'version',
  'seed',
  'rngState',
  'week',
  'actionsLeft',
  'crashed',
  'energy',
  'standing',
  'integrity',
  'relationships',
  'paper',
  'fellowship',
  'evidence',
  'experiments',
  'pendingEvent',
  'resolution',
  'crashWeeks',
  'standingWarningWeek',
  'history',
  'flags',
]);

export const createInitialState = (seed: number): CampaignState => {
  const normalizedSeed = seed >>> 0;

  return {
    version: CAMPAIGN_STATE_VERSION,
    seed: normalizedSeed,
    rngState: normalizedSeed,
    week: WEEK_MIN,
    actionsLeft: ACTIONS_PER_WEEK,
    crashed: false,
    energy: ENERGY_MAX,
    standing: 50,
    integrity: METER_MAX,
    relationships: {
      voss: 50,
      dario: 50,
      mara: 50,
    },
    paper: createInitialPaper(),
    fellowship: createInitialFellowship(),
    evidence: [],
    experiments: [],
    pendingEvent: null,
    resolution: { cause: 'none', ending: null, week: null },
    crashWeeks: [],
    standingWarningWeek: null,
    history: [],
    flags: {},
  };
};

export const validateState = (value: unknown): StateValidation => {
  if (!isRecord(value)) {
    return { ok: false, issues: ['state must be an object'] };
  }

  const issues: string[] = [];

  for (const key of Object.keys(value)) {
    if (!STATE_KEYS.has(key)) {
      issues.push(`unexpected state field: ${key}`);
    }
  }

  if (value['version'] !== CAMPAIGN_STATE_VERSION) {
    issues.push('state version is unknown');
  }

  for (const field of ['seed', 'rngState'] as const) {
    const candidate = value[field];
    if (!isInteger(candidate) || candidate < 0 || candidate > UINT32_MAX) {
      issues.push(`${field} must be an unsigned 32-bit integer`);
    }
  }

  if (!isInteger(value['week']) || value['week'] < WEEK_MIN || value['week'] > WEEK_MAX) {
    issues.push('week is out of range');
  }

  if (
    !isInteger(value['actionsLeft']) ||
    value['actionsLeft'] < 0 ||
    value['actionsLeft'] > ACTIONS_PER_WEEK
  ) {
    issues.push('actionsLeft is out of range');
  }

  if (typeof value['crashed'] !== 'boolean') {
    issues.push('crashed must be a boolean');
  }

  if (!isInteger(value['energy']) || value['energy'] < ENERGY_MIN || value['energy'] > ENERGY_MAX) {
    issues.push('energy is out of range');
  }

  if (!isMeter(value['standing'])) {
    issues.push('standing is out of range');
  }

  if (!isMeter(value['integrity'])) {
    issues.push('integrity is out of range');
  }

  const relationships = value['relationships'];
  if (!isRecord(relationships)) {
    issues.push('relationships must be an object');
  } else {
    for (const id of RELATIONSHIP_IDS) {
      if (!isMeter(relationships[id])) {
        issues.push(`relationships.${id} is out of range`);
      }
    }

    for (const key of Object.keys(relationships)) {
      if (!RELATIONSHIP_IDS.includes(key as RelationshipId)) {
        issues.push(`unexpected relationship: ${key}`);
      }
    }
  }

  const history = value['history'];
  if (!Array.isArray(history) || !history.every((entry) => typeof entry === 'string')) {
    issues.push('history must be a list of strings');
  }

  const pendingEvent = value['pendingEvent'];
  if (pendingEvent !== null) {
    if (
      !isRecord(pendingEvent) ||
      typeof pendingEvent['id'] !== 'string' ||
      pendingEvent['id'].trim().length === 0
    ) {
      issues.push('pendingEvent.id must be a non-empty string');
    } else if (
      !Array.isArray(pendingEvent['choices']) ||
      !pendingEvent['choices'].every(
        (choice) => typeof choice === 'string' && choice.trim().length > 0,
      )
    ) {
      issues.push('pendingEvent.choices must be a list of non-empty strings');
    }
  }

  const resolution = value['resolution'];
  if (!isRecord(resolution)) {
    issues.push('resolution must be an object');
  } else {
    const cause = resolution['cause'];
    const ending = resolution['ending'];
    const resolvedWeek = resolution['week'];
    const knownCause = RUN_END_CAUSES.includes(cause as RunEndCause);

    if (!knownCause) {
      issues.push('resolution.cause is unknown');
    }

    if (ending !== null && !ENDING_IDS.includes(ending as EndingId)) {
      issues.push('resolution.ending is unknown');
    }

    if (
      resolvedWeek !== null &&
      (!isInteger(resolvedWeek) || resolvedWeek < WEEK_MIN || resolvedWeek > WEEK_MAX)
    ) {
      issues.push('resolution.week is out of range');
    }

    if (cause === 'none') {
      if (ending !== null) {
        issues.push('resolution.ending must be null before the run ends');
      }

      if (resolvedWeek !== null) {
        issues.push('resolution.week must be null before the run ends');
      }
    } else if (knownCause) {
      if (ending === null) {
        issues.push('resolution.ending is required once the run ends');
      }

      if (resolvedWeek === null) {
        issues.push('resolution.week is required once the run ends');
      } else if (resolvedWeek !== value['week']) {
        issues.push('resolution.week must match the current week');
      }

      const expectedEnding =
        cause === 'quit'
          ? 'ending.intact'
          : cause === 'ejection' || cause === 'burnout'
            ? 'ending.ejected'
            : null;

      if (expectedEnding !== null && ending !== expectedEnding) {
        issues.push(`resolution.ending must be ${expectedEnding} for this cause`);
      }
    }
  }

  const crashWeeks = value['crashWeeks'];
  if (
    !Array.isArray(crashWeeks) ||
    !crashWeeks.every((week) => isInteger(week) && week >= WEEK_MIN && week <= WEEK_MAX)
  ) {
    issues.push('crashWeeks must be a list of week numbers');
  } else if (!crashWeeks.every((week, index) => index === 0 || week > crashWeeks[index - 1])) {
    issues.push('crashWeeks must be increasing week numbers without repeats');
  }

  const standingWarningWeek = value['standingWarningWeek'];
  if (
    standingWarningWeek !== null &&
    (!isInteger(standingWarningWeek) ||
      standingWarningWeek < WEEK_MIN ||
      standingWarningWeek > WEEK_MAX)
  ) {
    issues.push('standingWarningWeek is out of range');
  }

  const flags = value['flags'];
  if (!isRecord(flags) || !Object.values(flags).every((flag) => typeof flag === 'boolean')) {
    issues.push('flags must be a record of booleans');
  }

  issues.push(...validatePaper(value['paper']));
  issues.push(...validateFellowship(value['fellowship']));
  issues.push(...validateEvidenceList(value['evidence']));
  issues.push(...validateExperiments(value['experiments']));

  if (issues.length > 0) {
    return { ok: false, issues };
  }

  return { ok: true, state: value as unknown as CampaignState };
};

export const serializeState = (state: CampaignState): string => JSON.stringify(state);

export const deserializeState = (source: string): StateValidation => {
  let value: unknown;

  try {
    value = JSON.parse(source) as unknown;
  } catch {
    return { ok: false, issues: ['state is not valid JSON'] };
  }

  return validateState(value);
};
