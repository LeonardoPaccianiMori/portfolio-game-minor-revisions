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

  const flags = value['flags'];
  if (!isRecord(flags) || !Object.values(flags).every((flag) => typeof flag === 'boolean')) {
    issues.push('flags must be a record of booleans');
  }

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
