import { CONTENT_FAMILIES } from './types.ts';
import type {
  AuthoredContentItem,
  BuiltContentItem,
  BuiltContentPackage,
  ContentFamily,
  ContentIssue,
  ContentResult,
  ProfileSource,
  SourceManifest,
} from './types.ts';

export const DATA_FILE_BY_FAMILY: Readonly<Record<ContentFamily, string>> = {
  characters: 'content/data/characters.json',
  locations: 'content/data/locations.json',
  actions: 'content/data/actions.json',
  experiments: 'content/data/experiments.json',
  tasks: 'content/data/tasks.json',
  roomStates: 'content/data/room-states.json',
  events: 'content/data/events.json',
  scenes: 'content/data/scenes.json',
  messages: 'content/data/messages.json',
  notifications: 'content/data/notifications.json',
  records: 'content/data/records.json',
  endings: 'content/data/endings.json',
  citations: 'content/data/citations.json',
  environmentalItems: 'content/data/environmental-items.json',
  contextualLines: 'content/data/contextual-lines.json',
  tutorials: 'content/data/tutorials.json',
  interface: 'content/data/interface.json',
  audio: 'content/data/audio.json',
};
export const DATA_FILES = CONTENT_FAMILIES.map((family) => DATA_FILE_BY_FAMILY[family]);
export const PROFILE_FILES = [
  'content/profiles/full.json',
  'content/profiles/fallback.json',
  'content/profiles/slice.json',
] as const;
export const ALL_SOURCE_FILES = [
  'content/manifest.json',
  ...DATA_FILES,
  'content/strings.en.json',
  ...PROFILE_FILES,
] as const;

type RecordValue = Record<string, unknown>;
const isRecord = (value: unknown): value is RecordValue =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
const sorted = (values: readonly string[]): boolean =>
  values.every((value, index) => index === 0 || values[index - 1]! < value);
export const isContentId = (value: unknown): value is string =>
  typeof value === 'string' && value.length <= 128 && /^MR-[A-Z0-9]+(?:-[A-Z0-9]+)*$/u.test(value);
export const isTextKey = (value: unknown): value is string =>
  typeof value === 'string' &&
  value.length <= 128 &&
  /^[a-z][A-Za-z0-9]*(?:\.[a-z][A-Za-z0-9]*)*$/u.test(value);
const isInt = (value: unknown, minimum = 0, maximum = Number.MAX_SAFE_INTEGER): value is number =>
  Number.isSafeInteger(value) &&
  !Object.is(value, -0) &&
  (value as number) >= minimum &&
  (value as number) <= maximum;
const isOneOf = <T extends string>(value: unknown, values: readonly T[]): value is T =>
  typeof value === 'string' && values.includes(value as T);

class Check {
  readonly issues: ContentIssue[] = [];
  readonly file: string;
  readonly id: string | null;
  constructor(file: string, id: string | null = null) {
    this.file = file;
    this.id = id;
  }
  issue(path: string, code: ContentIssue['code'] = 'invalidObject', id = this.id): false {
    this.issues.push({ code, file: this.file, path, idOrKey: id });
    return false;
  }
  record(
    value: unknown,
    path: string,
    keys: readonly string[],
    code: ContentIssue['code'] = 'invalidObject',
  ): value is RecordValue {
    if (!isRecord(value)) return this.issue(path, code);
    const actual = Object.keys(value).sort();
    const expected = [...keys].sort();
    return (
      (actual.length === expected.length &&
        actual.every((key, index) => key === expected[index])) ||
      this.issue(path, code)
    );
  }
  string(value: unknown, path: string): value is string {
    return typeof value === 'string' || this.issue(path);
  }
  nullableString(value: unknown, path: string): value is string | null {
    return value === null || this.string(value, path);
  }
  bool(value: unknown, path: string): value is boolean {
    return typeof value === 'boolean' || this.issue(path);
  }
  int(value: unknown, path: string, min = 0, max = Number.MAX_SAFE_INTEGER): value is number {
    return isInt(value, min, max) || this.issue(path);
  }
  literal<T extends string>(value: unknown, path: string, values: readonly T[]): value is T {
    return isOneOf(value, values) || this.issue(path);
  }
  idValue(value: unknown, path: string): value is string {
    return (
      isContentId(value) ||
      this.issue(path, 'invalidId', typeof value === 'string' ? value : this.id)
    );
  }
  key(value: unknown, path: string): value is string {
    return (
      isTextKey(value) || this.issue(path, 'invalidId', typeof value === 'string' ? value : this.id)
    );
  }
  array(value: unknown, path: string): value is unknown[] {
    return Array.isArray(value) || this.issue(path);
  }
  set(
    value: unknown,
    path: string,
    item: (entry: unknown, entryPath: string) => boolean,
  ): value is unknown[] {
    if (!this.array(value, path)) return false;
    let good = true;
    const seen = new Set<string>();
    for (const [index, entry] of value.entries()) {
      if (!item(entry, `${path}/${index}`)) good = false;
      const token = JSON.stringify(entry);
      if (seen.has(token)) good = this.issue(`${path}/${index}`, 'invalidObject') && good;
      seen.add(token);
    }
    if (!sorted(value.map((entry) => JSON.stringify(entry))))
      good = this.issue(path, 'invalidObject') && good;
    return good;
  }
}

const result = <T>(check: Check, value: T): ContentResult<T> =>
  check.issues.length === 0 ? { kind: 'valid', value } : { kind: 'invalid', issues: check.issues };

const ref = (check: Check, value: unknown, path: string): boolean => {
  if (!check.record(value, path, ['family', 'id'])) return false;
  return (
    check.literal(value.family, `${path}/family`, CONTENT_FAMILIES) &&
    check.idValue(value.id, `${path}/id`)
  );
};
const ownedRef = (check: Check, value: unknown, path: string): boolean => {
  if (!check.record(value, path, ['owner', 'id'])) return false;
  return ref(check, value.owner, `${path}/owner`) && check.idValue(value.id, `${path}/id`);
};
const windowValue = (check: Check, value: unknown, path: string): boolean => {
  if (!check.record(value, path, ['first', 'last'])) return false;
  return (
    check.int(value.first, `${path}/first`, 0, 63) &&
    check.int(value.last, `${path}/last`, 0, 63) &&
    (value.first <= value.last || check.issue(path))
  );
};

const leaf = (check: Check, value: unknown, path: string): boolean => {
  if (!isRecord(value) || typeof value.type !== 'string') return check.issue(path);
  const type = value.type;
  const exact = (keys: readonly string[]): boolean => check.record(value, path, ['type', ...keys]);
  if (type === 'periodInWindow')
    return exact(['window']) && windowValue(check, value.window, `${path}/window`);
  if (type === 'actIs')
    return (
      exact(['value']) &&
      check.literal(value.value, `${path}/value`, [
        'orderlyButOverbooked',
        'manuscriptClutter',
        'rejectionAndPublicRecord',
        'reviewPressure',
        'decisionHorizon',
      ])
    );
  if (type === 'pressureProfileIs')
    return (
      exact(['value']) && check.literal(value.value, `${path}/value`, ['standard', 'supported'])
    );
  if (type === 'enumIs') {
    if (
      !exact(['fact', 'value']) ||
      !check.literal(value.fact, `${path}/fact`, [
        'claimLevel',
        'haoranAuthorship',
        'samiraAuthorship',
      ])
    )
      return false;
    const values =
      value.fact === 'claimLevel'
        ? ['careful', 'strong', 'inflated']
        : ['notIncluded', 'credited', 'declined'];
    return value.value === null || check.literal(value.value, `${path}/value`, values);
  }
  if (type === 'booleanIs')
    return (
      exact(['fact', 'value']) &&
      check.literal(value.fact, `${path}/fact`, [
        'pendingCrash',
        'camilaReplySent',
        'morrowVideoCompleted',
        'fabricationConfessedToCamila',
      ]) &&
      check.bool(value.value, `${path}/value`)
    );
  if (type === 'integerInRange') {
    if (
      !exact(['fact', 'minimum', 'maximum']) ||
      !check.literal(value.fact, `${path}/fact`, [
        'energy',
        'evidence',
        'elenaPaperConfidence',
        'integrity',
        'integrityRecoveryUsed',
      ])
    )
      return false;
    const limits: Record<string, number> = {
      energy: 5,
      evidence: 12,
      elenaPaperConfidence: 100,
      integrity: 100,
      integrityRecoveryUsed: 10,
    };
    return (
      check.int(value.minimum, `${path}/minimum`, 0, limits[value.fact as string]) &&
      check.int(value.maximum, `${path}/maximum`, 0, limits[value.fact as string]) &&
      (Number(value.minimum) <= Number(value.maximum) || check.issue(path))
    );
  }
  if (type === 'idPresenceIs')
    return (
      exact(['collection', 'target', 'present']) &&
      check.literal(value.collection, `${path}/collection`, [
        'completedContentIds',
        'expiredContentIds',
        'readMessageIds',
        'consumedContextualContentIds',
        'displayedEnvironmentalTextIds',
        'recordedSceneClosingIds',
        'recordedSceneRecapIds',
        'citationIds',
      ]) &&
      ref(check, value.target, `${path}/target`) &&
      check.bool(value.present, `${path}/present`)
    );
  if (type === 'contentStateIs') {
    if (Object.hasOwn(value, 'selectedOptionId'))
      return (
        exact(['target', 'selectedOptionId']) &&
        ownedRef(check, value.target, `${path}/target`) &&
        check.idValue(value.selectedOptionId, `${path}/selectedOptionId`)
      );
    if (!exact(['target', 'state']) || !ref(check, value.target, `${path}/target`)) return false;
    const target = value.target as RecordValue;
    const states: Readonly<Record<string, readonly string[]>> = {
      scenes: ['locked', 'eligible', 'queued', 'inProgress', 'completed', 'skipped'],
      messages: ['locked', 'available', 'read', 'replied', 'expired'],
      tasks: ['locked', 'available', 'completed', 'committed', 'expired'],
      events: ['locked', 'eligible', 'queued', 'active', 'completed', 'expired'],
    };
    const permitted = states[String(target.family)];
    return (
      (permitted !== undefined && check.literal(value.state, `${path}/state`, permitted)) ||
      check.issue(`${path}/target/family`)
    );
  }
  if (type === 'experimentStateIs') {
    if (
      !exact(['experimentId', 'runNumber', 'field', 'value']) ||
      !check.idValue(value.experimentId, `${path}/experimentId`) ||
      !(
        value.runNumber === null ||
        value.runNumber === 1 ||
        value.runNumber === 2 ||
        check.issue(`${path}/runNumber`)
      ) ||
      !check.literal(value.field, `${path}/field`, [
        'stage',
        'sampleCondition',
        'equipmentState',
        'attentionState',
        'finalResultBand',
      ])
    )
      return false;
    const values: Readonly<Record<string, readonly string[]>> = {
      stage: ['configured', 'running', 'readyForAnalysis', 'analysed', 'stopped'],
      sampleCondition: ['stable', 'stressed', 'failing'],
      equipmentState: ['ready', 'limited', 'unavailable'],
      attentionState: ['normal', 'checkReady', 'attentionNeeded'],
      finalResultBand: ['robust', 'mixed', 'compromised'],
    };
    return value.value === null
      ? value.field === 'finalResultBand' || check.issue(`${path}/value`)
      : check.literal(value.value, `${path}/value`, values[String(value.field)]!);
  }
  if (type === 'manuscriptStateIs') {
    if (value.fact === 'hasSnapshot')
      return (
        exact(['fact', 'target', 'value']) &&
        (value.target === null || check.issue(`${path}/target`)) &&
        check.bool(value.value, `${path}/value`)
      );
    if (value.fact === 'reading')
      return (
        exact(['fact', 'target', 'value']) &&
        ref(check, value.target, `${path}/target`) &&
        check.literal(value.value, `${path}/value`, ['honest', 'altered', 'unsupported'])
      );
    if (value.fact === 'requirement')
      return (
        exact(['fact', 'target', 'value']) &&
        ownedRef(check, value.target, `${path}/target`) &&
        (value.value === null ||
          check.literal(value.value, `${path}/value`, [
            'met',
            'missing',
            'conflict',
            'unsupported',
          ]))
      );
    if (value.fact === 'reviewerForm')
      return (
        exact(['fact', 'target', 'value']) &&
        ownedRef(check, value.target, `${path}/target`) &&
        (value.value === null ||
          check.literal(value.value, `${path}/value`, ['base', 'conditional']))
      );
    return check.issue(`${path}/fact`);
  }
  if (type === 'concernStateIs') {
    if (
      !exact(['concernId', 'field', 'value']) ||
      !check.idValue(value.concernId, `${path}/concernId`) ||
      !check.literal(value.field, `${path}/field`, ['visible', 'response', 'routeImpact'])
    )
      return false;
    if (value.field === 'visible') return check.bool(value.value, `${path}/value`);
    if (value.field === 'response')
      return (
        value.value === null ||
        check.literal(value.value, `${path}/value`, ['correct', 'deny', 'defer', 'ignoreReminder'])
      );
    return check.literal(value.value, `${path}/value`, ['none', 'aldercroft', 'morrow', 'both']);
  }
  if (type === 'routeStateIs')
    return (
      exact(['route', 'state']) &&
      check.literal(value.route, `${path}/route`, ['aldercroft', 'morrow']) &&
      check.literal(value.state, `${path}/state`, [
        'locked',
        'developing',
        'available',
        'closed',
        'chosen',
        'declined',
      ])
    );
  if (type === 'relationshipStateIs') {
    if (
      !exact(['characterId', 'field', 'minimum', 'maximum', 'value']) ||
      !check.idValue(value.characterId, `${path}/characterId`) ||
      !check.literal(value.field, `${path}/field`, [
        'trust',
        'introduced',
        'permanentBreach',
        'supportConsumed',
      ])
    )
      return false;
    if (value.field === 'trust')
      return (
        check.int(value.minimum, `${path}/minimum`, 0, 100) &&
        check.int(value.maximum, `${path}/maximum`, 0, 100) &&
        Number(value.minimum) <= Number(value.maximum) &&
        (value.value === null || check.issue(`${path}/value`))
      );
    return (
      (value.minimum === null || check.issue(`${path}/minimum`)) &&
      (value.maximum === null || check.issue(`${path}/maximum`)) &&
      check.bool(value.value, `${path}/value`)
    );
  }
  if (type === 'piimStateIs') {
    if (
      !exact(['fact', 'value']) ||
      !check.literal(value.fact, `${path}/fact`, ['batch', 'oxygen', 'claim', 'outcome'])
    )
      return false;
    const permitted =
      value.fact === 'outcome'
        ? ['published', 'acceptedPendingFinalWork', 'underReview', 'rejected']
        : ['met', 'partlyMet', 'notMet'];
    return value.value === null || check.literal(value.value, `${path}/value`, permitted);
  }
  if (type === 'paperStateIs') {
    if (
      !exact(['fact', 'value']) ||
      !check.literal(value.fact, `${path}/fact`, ['preprint', 'journal', 'final'])
    )
      return false;
    const permitted =
      value.fact === 'preprint'
        ? ['notPosted', 'public', 'withdrawn']
        : value.fact === 'journal'
          ? ['notSubmitted', 'submitted', 'majorRevision', 'withdrawn', 'resolved']
          : ['published', 'acceptedPendingFinalWork', 'underReview', 'rejectedOrWithdrawn'];
    return value.value === null
      ? value.fact === 'final' || check.issue(`${path}/value`)
      : check.literal(value.value, `${path}/value`, permitted);
  }
  if (type === 'fatigueStateIs') {
    if (
      !exact(['fact', 'minimum', 'maximum', 'value']) ||
      !check.literal(value.fact, `${path}/fact`, ['pendingCrash', 'crashCount', 'energy'])
    )
      return false;
    if (value.fact === 'pendingCrash')
      return (
        (value.minimum === null || check.issue(`${path}/minimum`)) &&
        (value.maximum === null || check.issue(`${path}/maximum`)) &&
        check.bool(value.value, `${path}/value`)
      );
    const maximum = value.fact === 'energy' ? 5 : 64;
    return (
      check.int(value.minimum, `${path}/minimum`, 0, maximum) &&
      check.int(value.maximum, `${path}/maximum`, 0, maximum) &&
      Number(value.minimum) <= Number(value.maximum) &&
      (value.value === null || check.issue(`${path}/value`))
    );
  }
  if (type === 'conclusionStateIs') {
    if (
      !exact(['fact', 'value']) ||
      !check.literal(value.fact, `${path}/fact`, ['state', 'choice'])
    )
      return false;
    if (value.fact === 'state')
      return check.literal(value.value, `${path}/value`, [
        'unresolved',
        'choicePending',
        'confirmed',
        'epilogueInProgress',
        'completed',
      ]);
    return (
      value.value === null ||
      check.literal(value.value, `${path}/value`, ['aldercroft', 'morrow', 'leave', 'neither'])
    );
  }
  if (type === 'countInRange') {
    if (
      !exact(['collection', 'minimum', 'maximum']) ||
      !check.literal(value.collection, `${path}/collection`, [
        'analysedRuns',
        'activeRuns',
        'rawRecords',
        'evidenceCards',
        'snapshots',
        'citations',
      ])
    )
      return false;
    const maximum =
      value.collection === 'activeRuns'
        ? 3
        : value.collection === 'citations'
          ? 12
          : Number.MAX_SAFE_INTEGER;
    return (
      check.int(value.minimum, `${path}/minimum`, 0, maximum) &&
      check.int(value.maximum, `${path}/maximum`, 0, maximum) &&
      (Number(value.minimum) <= Number(value.maximum) || check.issue(path))
    );
  }
  return check.issue(`${path}/type`);
};

const conditions = (check: Check, value: unknown, path: string): boolean => {
  if (!check.record(value, path, ['allOf', 'anyOf', 'noneOf'])) return false;
  return ['allOf', 'anyOf', 'noneOf'].every(
    (key) =>
      check.array(value[key], `${path}/${key}`) &&
      value[key].every((entry, index) => leaf(check, entry, `${path}/${key}/${index}`)),
  );
};
const availability = (check: Check, value: unknown, path: string): boolean => {
  if (!check.record(value, path, ['window', 'when', 'blocking', 'expiry', 'repeat'])) return false;
  const windowOk = value.window === null || windowValue(check, value.window, `${path}/window`);
  return (
    windowOk &&
    conditions(check, value.when, `${path}/when`) &&
    conditions(check, value.blocking, `${path}/blocking`) &&
    check.literal(value.expiry, `${path}/expiry`, ['permanent', 'afterWindow']) &&
    check.literal(value.repeat, `${path}/repeat`, ['once', 'repeatable']) &&
    (value.expiry !== 'afterWindow' || value.window !== null || check.issue(`${path}/window`))
  );
};
const trace = (check: Check, value: unknown, path: string): boolean => {
  if (!check.record(value, path, ['requirementIds', 'testIds'])) return false;
  const ids = (entry: unknown, entryPath: string): boolean => check.idValue(entry, entryPath);
  return (
    check.set(value.requirementIds, `${path}/requirementIds`, ids) &&
    check.set(value.testIds, `${path}/testIds`, ids) &&
    ((Array.isArray(value.requirementIds) && value.requirementIds.length > 0) ||
      check.issue(`${path}/requirementIds`)) &&
    ((Array.isArray(value.testIds) && value.testIds.length > 0) || check.issue(`${path}/testIds`))
  );
};
const textForm = (check: Check, value: unknown, path: string): boolean => {
  if (!check.record(value, path, ['id', 'when', 'bodyKeys'])) return false;
  return (
    check.idValue(value.id, `${path}/id`) &&
    conditions(check, value.when, `${path}/when`) &&
    check.array(value.bodyKeys, `${path}/bodyKeys`) &&
    value.bodyKeys.length > 0 &&
    value.bodyKeys.every((key, index) => check.key(key, `${path}/bodyKeys/${index}`))
  );
};
const beat = (check: Check, value: unknown, path: string): boolean => {
  if (!check.record(value, path, ['id', 'speakerId', 'textKey', 'choiceId', 'locationId']))
    return false;
  const idOk = check.idValue(value.id, `${path}/id`);
  const speakerOk = value.speakerId === null || check.idValue(value.speakerId, `${path}/speakerId`);
  const textOk = value.textKey === null || check.key(value.textKey, `${path}/textKey`);
  const choiceOk = value.choiceId === null || check.idValue(value.choiceId, `${path}/choiceId`);
  const locationOk =
    value.locationId === null || check.idValue(value.locationId, `${path}/locationId`);
  return (
    idOk &&
    speakerOk &&
    textOk &&
    choiceOk &&
    locationOk &&
    ((value.textKey === null) !== (value.choiceId === null) || check.issue(path)) &&
    (value.textKey === null
      ? value.speakerId === null || check.issue(`${path}/speakerId`)
      : value.speakerId !== null || check.issue(`${path}/speakerId`))
  );
};

const COMMANDS = [
  'configureExperiment',
  'startExperiment',
  'respondToMonitoring',
  'analyseExperiment',
  'commitInitialManuscript',
  'commitManuscriptRevision',
  'commitPiimResponse',
  'reportToElena',
  'completeCareerTask',
  'replyToMessage',
  'respondToConcern',
  'useCharacterSupport',
  'takeProtectedBreak',
  'resolveRoomState',
  'requestScene',
  'chooseSceneOption',
  'skipScene',
  'confirmConclusionChoice',
  'applyScheduledTransition',
  'resolvePendingCrash',
  'resolvePiimOutcome',
  'evaluateCareerRoute',
  'finalizeCampaign',
  'recordContentPresentation',
] as const;
const effect = (check: Check, value: unknown, path: string): boolean => {
  if (!isRecord(value) || typeof value.type !== 'string') return check.issue(path);
  const common = (keys: readonly string[]): boolean =>
    check.record(value, path, ['type', 'owner', 'reasonKey', ...keys]) &&
    check.literal(value.owner, `${path}/owner`, COMMANDS) &&
    check.key(value.reasonKey, `${path}/reasonKey`);
  if (value.type === 'adjustMetric')
    return (
      common(['metric', 'characterId', 'delta']) &&
      check.literal(value.metric, `${path}/metric`, [
        'elenaPaperConfidence',
        'integrity',
        'evidence',
        'trust',
      ]) &&
      (value.characterId === null || check.idValue(value.characterId, `${path}/characterId`)) &&
      check.int(value.delta, `${path}/delta`, -100, 100) &&
      ((value.metric === 'trust') === (value.characterId !== null) ||
        check.issue(`${path}/characterId`))
    );
  if (value.type === 'setFact')
    return (
      common(['fact', 'value']) &&
      check.literal(value.fact, `${path}/fact`, [
        'camilaReplySent',
        'morrowVideoCompleted',
        'fabricationConfessedToCamila',
      ]) &&
      check.bool(value.value, `${path}/value`)
    );
  if (value.type === 'recordHistory')
    return (
      common(['collection', 'target']) &&
      check.literal(value.collection, `${path}/collection`, [
        'completedContentIds',
        'expiredContentIds',
        'readMessageIds',
        'consumedContextualContentIds',
        'displayedEnvironmentalTextIds',
        'recordedSceneClosingIds',
        'recordedSceneRecapIds',
        'citationIds',
      ]) &&
      ref(check, value.target, `${path}/target`)
    );
  if (value.type === 'applyActionCost')
    return common(['actionId']) && check.idValue(value.actionId, `${path}/actionId`);
  if (value.type === 'applyDomainResult') {
    if (!common(['result']) || !isRecord(value.result) || typeof value.result.kind !== 'string')
      return check.issue(`${path}/result`);
    const domain = value.result;
    const exact = (keys: readonly string[]): boolean =>
      check.record(domain, `${path}/result`, ['kind', ...keys]);
    if (domain.kind === 'activateTask')
      return exact(['taskId']) && check.idValue(domain.taskId, `${path}/result/taskId`);
    if (domain.kind === 'recordPrimary')
      return exact(['recordId']) && check.idValue(domain.recordId, `${path}/result/recordId`);
    if (domain.kind === 'selectOption')
      return (
        exact(['choice', 'optionId']) &&
        ownedRef(check, domain.choice, `${path}/result/choice`) &&
        check.idValue(domain.optionId, `${path}/result/optionId`)
      );
    if (domain.kind === 'resolveRoom')
      return (
        exact(['roomStateId', 'routeId', 'equipmentState']) &&
        check.idValue(domain.roomStateId, `${path}/result/roomStateId`) &&
        check.idValue(domain.routeId, `${path}/result/routeId`) &&
        check.literal(domain.equipmentState, `${path}/result/equipmentState`, ['ready', 'limited'])
      );
    if (domain.kind === 'applySupport')
      return (
        exact(['characterId', 'target']) &&
        check.idValue(domain.characterId, `${path}/result/characterId`) &&
        ref(check, domain.target, `${path}/result/target`)
      );
    if (domain.kind === 'commitManuscript')
      return exact(['taskId']) && check.idValue(domain.taskId, `${path}/result/taskId`);
    if (domain.kind === 'completeSlice')
      return (
        exact(['taskId', 'interfaceId']) &&
        domain.taskId === 'MR-SLICE-CLAIM-REHEARSAL' &&
        domain.interfaceId === 'MR-UI-SLICE-COMPLETE'
      );
    return check.issue(`${path}/result/kind`);
  }
  if (value.type === 'requestPresentation') {
    if (
      !common(['presentation']) ||
      !isRecord(value.presentation) ||
      typeof value.presentation.kind !== 'string'
    )
      return check.issue(`${path}/presentation`);
    const presentation = value.presentation;
    const exact = (keys: readonly string[]): boolean =>
      check.record(presentation, `${path}/presentation`, ['kind', ...keys]);
    if (presentation.kind === 'saveCheckpoint')
      return (
        exact(['reasonId']) && check.idValue(presentation.reasonId, `${path}/presentation/reasonId`)
      );
    if (presentation.kind === 'showNotice')
      return (
        exact(['interfaceId', 'noticeKey']) &&
        check.idValue(presentation.interfaceId, `${path}/presentation/interfaceId`) &&
        check.key(presentation.noticeKey, `${path}/presentation/noticeKey`)
      );
    if (presentation.kind === 'startCutscene')
      return (
        exact(['sceneId']) && check.idValue(presentation.sceneId, `${path}/presentation/sceneId`)
      );
    if (presentation.kind === 'playAudioCue')
      return (
        exact(['audioId']) && check.idValue(presentation.audioId, `${path}/presentation/audioId`)
      );
    if (presentation.kind === 'completeCampaign') return exact([]);
    return check.issue(`${path}/presentation/kind`);
  }
  return check.issue(`${path}/type`);
};

const effects = (check: Check, value: unknown, path: string): boolean =>
  check.array(value, path) &&
  value.every((entry, index) => effect(check, entry, `${path}/${index}`));
const sceneForm = (check: Check, value: unknown, path: string): boolean =>
  check.record(value, path, ['id', 'when', 'beats']) &&
  check.idValue(value.id, `${path}/id`) &&
  conditions(check, value.when, `${path}/when`) &&
  check.array(value.beats, `${path}/beats`) &&
  value.beats.length > 0 &&
  value.beats.every((entry, index) => beat(check, entry, `${path}/beats/${index}`));
const choice = (check: Check, value: unknown, path: string): boolean => {
  if (!check.record(value, path, ['id', 'options', 'recapKey'])) return false;
  if (
    !check.idValue(value.id, `${path}/id`) ||
    !check.array(value.options, `${path}/options`) ||
    value.options.length < 2 ||
    value.options.length > 4
  )
    return false;
  const recapOk = value.recapKey === null || check.key(value.recapKey, `${path}/recapKey`);
  return (
    recapOk &&
    value.options.every((entry, index) => {
      const itemPath = `${path}/options/${index}`;
      if (
        !check.record(entry, itemPath, [
          'id',
          'labelKey',
          'when',
          'effects',
          'confirmationKey',
          'recapKey',
          'closingBeats',
        ])
      )
        return false;
      return (
        check.idValue(entry.id, `${itemPath}/id`) &&
        check.key(entry.labelKey, `${itemPath}/labelKey`) &&
        conditions(check, entry.when, `${itemPath}/when`) &&
        effects(check, entry.effects, `${itemPath}/effects`) &&
        (entry.confirmationKey === null ||
          check.key(entry.confirmationKey, `${itemPath}/confirmationKey`)) &&
        (entry.recapKey === null || check.key(entry.recapKey, `${itemPath}/recapKey`)) &&
        check.array(entry.closingBeats, `${itemPath}/closingBeats`) &&
        entry.closingBeats.every((entryBeat, beatIndex) =>
          beat(check, entryBeat, `${itemPath}/closingBeats/${beatIndex}`),
        )
      );
    })
  );
};
const cue = (check: Check, value: unknown, path: string): boolean =>
  check.record(value, path, ['id', 'locationId', 'interfaceId', 'audioId']) &&
  check.idValue(value.id, `${path}/id`) &&
  check.idValue(value.locationId, `${path}/locationId`) &&
  check.idValue(value.interfaceId, `${path}/interfaceId`) &&
  (value.audioId === null || check.idValue(value.audioId, `${path}/audioId`));

const base = (
  check: Check,
  value: unknown,
  path: string,
  type: string,
  keys: readonly string[],
): value is RecordValue =>
  check.record(value, path, ['id', 'type', 'trace', ...keys]) &&
  check.idValue(value.id, `${path}/id`) &&
  value.type === type &&
  trace(check, value.trace, `${path}/trace`);

const idArray = (check: Check, value: unknown, path: string, asSet = true): boolean =>
  asSet
    ? check.set(value, path, (entry, entryPath) => check.idValue(entry, entryPath))
    : check.array(value, path) &&
      value.every((entry, index) => check.idValue(entry, `${path}/${index}`));
const keyArray = (check: Check, value: unknown, path: string, asSet = false): boolean =>
  asSet
    ? check.set(value, path, (entry, entryPath) => check.key(entry, entryPath))
    : check.array(value, path) &&
      value.every((entry, index) => check.key(entry, `${path}/${index}`));

const delivery = (check: Check, value: unknown, path: string): boolean => {
  if (
    !isRecord(value) ||
    typeof value.kind !== 'string' ||
    !check.record(value, path, ['kind', 'target'])
  )
    return false;
  if (value.kind === 'transition') {
    if (!isRecord(value.target) || typeof value.target.kind !== 'string')
      return check.issue(`${path}/target`);
    if (value.target.kind === 'activateRoom')
      return (
        check.record(value.target, `${path}/target`, ['kind', 'roomState']) &&
        ref(check, value.target.roomState, `${path}/target/roomState`)
      );
    if (value.target.kind === 'resolveRoom')
      return (
        check.record(value.target, `${path}/target`, ['kind', 'route']) &&
        ownedRef(check, value.target.route, `${path}/target/route`)
      );
    return check.issue(`${path}/target/kind`);
  }
  if (
    !check.literal(value.kind, `${path}/kind`, ['scene', 'message', 'notification']) ||
    !ref(check, value.target, `${path}/target`)
  )
    return false;
  return (
    (value.target as RecordValue).family === `${value.kind}s` ||
    check.issue(`${path}/target/family`)
  );
};
const roomResult = (check: Check, value: unknown, path: string): boolean =>
  check.record(value, path, ['equipmentState', 'controlKind', 'observationCoverage']) &&
  check.literal(value.equipmentState, `${path}/equipmentState`, ['ready', 'limited']) &&
  check.literal(value.controlKind, `${path}/controlKind`, ['matched', 'limited']) &&
  check.literal(value.observationCoverage, `${path}/observationCoverage`, ['full', 'limited']) &&
  ((value.equipmentState === 'ready' &&
    value.controlKind === 'matched' &&
    value.observationCoverage === 'full') ||
    (value.equipmentState === 'limited' &&
      value.controlKind === 'limited' &&
      value.observationCoverage === 'limited') ||
    check.issue(path, 'invariantFailure'));
const roomRoute = (check: Check, value: unknown, path: string): boolean => {
  if (!isRecord(value) || typeof value.kind !== 'string') return check.issue(path);
  if (value.kind === 'directResolve')
    return (
      check.record(value, path, [
        'kind',
        'id',
        'labelKey',
        'when',
        'actionId',
        'resultReasonKey',
        'result',
        'effects',
      ]) &&
      check.idValue(value.id, `${path}/id`) &&
      check.key(value.labelKey, `${path}/labelKey`) &&
      conditions(check, value.when, `${path}/when`) &&
      (value.actionId === null || check.idValue(value.actionId, `${path}/actionId`)) &&
      check.key(value.resultReasonKey, `${path}/resultReasonKey`) &&
      roomResult(check, value.result, `${path}/result`) &&
      check.array(value.effects, `${path}/effects`) &&
      value.effects.length === 0
    );
  if (value.kind === 'openScene')
    return (
      check.record(value, path, [
        'kind',
        'id',
        'labelKey',
        'when',
        'actionId',
        'resultReasonKey',
        'eventId',
        'effects',
      ]) &&
      check.idValue(value.id, `${path}/id`) &&
      check.key(value.labelKey, `${path}/labelKey`) &&
      conditions(check, value.when, `${path}/when`) &&
      value.actionId === null &&
      value.resultReasonKey === null &&
      check.idValue(value.eventId, `${path}/eventId`) &&
      check.array(value.effects, `${path}/effects`) &&
      value.effects.length === 0
    );
  if (value.kind === 'sceneResolve')
    return (
      check.record(value, path, [
        'kind',
        'id',
        'labelKey',
        'when',
        'actionId',
        'resultReasonKey',
        'trigger',
        'result',
        'effects',
      ]) &&
      check.idValue(value.id, `${path}/id`) &&
      value.labelKey === null &&
      conditions(check, value.when, `${path}/when`) &&
      ((isRecord(value.when) &&
        JSON.stringify(value.when) === '{"allOf":[],"anyOf":[],"noneOf":[]}') ||
        check.issue(`${path}/when`, 'invariantFailure')) &&
      value.actionId === null &&
      check.key(value.resultReasonKey, `${path}/resultReasonKey`) &&
      check.record(value.trigger, `${path}/trigger`, ['eventId', 'optionId']) &&
      check.idValue(value.trigger.eventId, `${path}/trigger/eventId`) &&
      check.idValue(value.trigger.optionId, `${path}/trigger/optionId`) &&
      roomResult(check, value.result, `${path}/result`) &&
      check.array(value.effects, `${path}/effects`) &&
      value.effects.length === 0
    );
  return check.issue(`${path}/kind`);
};

const familyItem = (check: Check, family: ContentFamily, value: unknown, path: string): boolean => {
  if (!isRecord(value) || typeof value.type !== 'string') return check.issue(path);
  if (family === 'characters')
    return (
      base(check, value, path, 'character', [
        'nameKey',
        'roleKey',
        'presence',
        'speakerId',
        'relationshipId',
      ]) &&
      check.key(value.nameKey, `${path}/nameKey`) &&
      check.key(value.roleKey, `${path}/roleKey`) &&
      check.literal(value.presence, `${path}/presence`, ['physical', 'remote']) &&
      check.idValue(value.speakerId, `${path}/speakerId`) &&
      (value.relationshipId === null ||
        check.idValue(value.relationshipId, `${path}/relationshipId`))
    );
  if (family === 'locations')
    return (
      base(check, value, path, 'location', ['nameKey', 'roomType', 'cueRoles', 'mappingKey']) &&
      check.key(value.nameKey, `${path}/nameKey`) &&
      check.literal(value.roomType, `${path}/roomType`, [
        'tissueCulture',
        'mainLab',
        'piOffice',
        'sharedDesks',
        'imaging',
        'facility',
        'breakRoom',
        'corridor',
        'southCorridor',
        'exitVestibule',
      ]) &&
      check.set(value.cueRoles, `${path}/cueRoles`, (entry, entryPath) =>
        check.literal(entry, entryPath, ['required', 'optional', 'warning']),
      ) &&
      check.idValue(value.mappingKey, `${path}/mappingKey`)
    );
  if (family === 'actions')
    return (
      base(check, value, path, 'action', [
        'labelKey',
        'workClass',
        'periodCost',
        'baseEnergyCost',
        'command',
        'forecastKey',
        'reasonKeys',
      ]) &&
      check.key(value.labelKey, `${path}/labelKey`) &&
      check.literal(value.workClass, `${path}/workClass`, [
        'recovery',
        'light',
        'focused',
        'intense',
        'major',
      ]) &&
      check.int(value.periodCost, `${path}/periodCost`, 0, 63) &&
      check.int(value.baseEnergyCost, `${path}/baseEnergyCost`, 0, 5) &&
      check.literal(value.command, `${path}/command`, COMMANDS) &&
      check.key(value.forecastKey, `${path}/forecastKey`) &&
      keyArray(check, value.reasonKeys, `${path}/reasonKeys`, true)
    );
  if (family === 'experiments') return experiment(check, value, path);
  if (family === 'tasks') return task(check, value, path);
  if (family === 'roomStates')
    return (
      base(check, value, path, 'roomState', [
        'availability',
        'locationId',
        'affectedExperimentIds',
        'activationEventId',
        'forecastKey',
        'routes',
        'expiryRouteId',
      ]) &&
      availability(check, value.availability, `${path}/availability`) &&
      check.idValue(value.locationId, `${path}/locationId`) &&
      idArray(check, value.affectedExperimentIds, `${path}/affectedExperimentIds`) &&
      check.idValue(value.activationEventId, `${path}/activationEventId`) &&
      check.key(value.forecastKey, `${path}/forecastKey`) &&
      check.array(value.routes, `${path}/routes`) &&
      value.routes.length >= 2 &&
      value.routes.every((route, index) => roomRoute(check, route, `${path}/routes/${index}`)) &&
      check.idValue(value.expiryRouteId, `${path}/expiryRouteId`)
    );
  if (family === 'events')
    return (
      base(check, value, path, 'event', [
        'availability',
        'status',
        'priority',
        'authoredOrder',
        'delivery',
        'cue',
        'fallback',
        'threadId',
        'effects',
      ]) &&
      availability(check, value.availability, `${path}/availability`) &&
      check.literal(value.status, `${path}/status`, ['required', 'optional']) &&
      check.literal(value.priority, `${path}/priority`, [
        'automaticTransition',
        'mandatoryContent',
        'requiredMessage',
        'optionalContent',
      ]) &&
      check.int(value.authoredOrder, `${path}/authoredOrder`, 0, 9999) &&
      delivery(check, value.delivery, `${path}/delivery`) &&
      (value.cue === null || cue(check, value.cue, `${path}/cue`)) &&
      (value.fallback === null || delivery(check, value.fallback, `${path}/fallback`)) &&
      (value.threadId === null || check.idValue(value.threadId, `${path}/threadId`)) &&
      effects(check, value.effects, `${path}/effects`)
    );
  if (family === 'scenes') return scene(check, value, path);
  if (family === 'messages')
    return (
      base(check, value, path, 'message', [
        'availability',
        'eventId',
        'senderId',
        'threadId',
        'subjectKey',
        'forms',
        'choices',
        'deferral',
        'followupEventIds',
        'expiryEffects',
      ]) &&
      availability(check, value.availability, `${path}/availability`) &&
      check.idValue(value.eventId, `${path}/eventId`) &&
      check.idValue(value.senderId, `${path}/senderId`) &&
      check.idValue(value.threadId, `${path}/threadId`) &&
      check.key(value.subjectKey, `${path}/subjectKey`) &&
      check.array(value.forms, `${path}/forms`) &&
      value.forms.every((form, index) => textForm(check, form, `${path}/forms/${index}`)) &&
      check.array(value.choices, `${path}/choices`) &&
      value.choices.every((entry, index) => choice(check, entry, `${path}/choices/${index}`)) &&
      check.literal(value.deferral, `${path}/deferral`, ['leaveAvailable', 'expireAtWindow']) &&
      idArray(check, value.followupEventIds, `${path}/followupEventIds`) &&
      effects(check, value.expiryEffects, `${path}/expiryEffects`)
    );
  if (family === 'notifications')
    return (
      base(check, value, path, 'notification', [
        'availability',
        'eventId',
        'senderId',
        'threadId',
        'forms',
        'presentation',
        'followupEventIds',
      ]) &&
      availability(check, value.availability, `${path}/availability`) &&
      check.idValue(value.eventId, `${path}/eventId`) &&
      check.idValue(value.senderId, `${path}/senderId`) &&
      (value.threadId === null || check.idValue(value.threadId, `${path}/threadId`)) &&
      check.array(value.forms, `${path}/forms`) &&
      value.forms.every((form, index) => textForm(check, form, `${path}/forms/${index}`)) &&
      check.literal(value.presentation, `${path}/presentation`, ['desk', 'direct']) &&
      idArray(check, value.followupEventIds, `${path}/followupEventIds`)
    );
  if (family === 'records') return recordItem(check, value, path);
  if (family === 'endings')
    return (
      base(check, value, path, 'ending', ['family', 'when', 'bodyKey', 'variants']) &&
      check.literal(value.family, `${path}/family`, [
        'career',
        'paper',
        'relationship',
        'integrity',
        'fatigue',
      ]) &&
      conditions(check, value.when, `${path}/when`) &&
      check.key(value.bodyKey, `${path}/bodyKey`) &&
      check.array(value.variants, `${path}/variants`) &&
      value.variants.every((form, index) => textForm(check, form, `${path}/variants/${index}`))
    );
  if (family === 'citations')
    return (
      base(check, value, path, 'citation', [
        'titleKey',
        'bodyKey',
        'when',
        'permanent',
        'archiveOrder',
      ]) &&
      check.key(value.titleKey, `${path}/titleKey`) &&
      check.key(value.bodyKey, `${path}/bodyKey`) &&
      conditions(check, value.when, `${path}/when`) &&
      value.permanent === true &&
      check.int(value.archiveOrder, `${path}/archiveOrder`)
    );
  if (family === 'environmentalItems')
    return (
      base(check, value, path, 'environmentalItem', [
        'availability',
        'locationId',
        'acts',
        'presentation',
        'textKeys',
      ]) &&
      availability(check, value.availability, `${path}/availability`) &&
      check.idValue(value.locationId, `${path}/locationId`) &&
      check.set(value.acts, `${path}/acts`, (entry, entryPath) =>
        check.literal(entry, entryPath, [
          'orderlyButOverbooked',
          'manuscriptClutter',
          'rejectionAndPublicRecord',
          'reviewPressure',
          'decisionHorizon',
        ]),
      ) &&
      check.literal(value.presentation, `${path}/presentation`, ['glance', 'focused']) &&
      keyArray(check, value.textKeys, `${path}/textKeys`)
    );
  if (family === 'contextualLines')
    return (
      base(check, value, path, 'contextualLine', [
        'availability',
        'speakerId',
        'when',
        'textKey',
      ]) &&
      availability(check, value.availability, `${path}/availability`) &&
      check.idValue(value.speakerId, `${path}/speakerId`) &&
      conditions(check, value.when, `${path}/when`) &&
      check.key(value.textKey, `${path}/textKey`)
    );
  if (family === 'tutorials') return tutorial(check, value, path);
  if (family === 'interface') return interfaceItem(check, value, path);
  return (
    base(check, value, path, 'audioRole', ['role', 'meaningKey', 'visibleDuplicate']) &&
    check.literal(value.role, `${path}/role`, [
      'ambience',
      'music',
      'requiredCue',
      'optionalCue',
      'warningCue',
      'confirmationCue',
      'dialogue',
    ]) &&
    check.key(value.meaningKey, `${path}/meaningKey`) &&
    check.literal(value.visibleDuplicate, `${path}/visibleDuplicate`, [
      'none',
      'dialogueText',
      'experimentAttentionState',
    ])
  );
};

const experiment = (check: Check, value: RecordValue, path: string): boolean => {
  const keys = [
    'availability',
    'family',
    'labelKey',
    'questionKeys',
    'pairedLimitForecastKey',
    'maxRuns',
    'goalIds',
    'options',
    'stageActions',
    'monitoringOffsets',
    'recordId',
    'evidenceIdPattern',
    'scienceDefinitionIds',
    'biologicalResults',
    'outcomes',
  ];
  if (
    !base(check, value, path, 'experiment', keys) ||
    value.family !== 'laserSham' ||
    value.labelKey !== 'experiment.laserSham' ||
    value.pairedLimitForecastKey !== 'forecast.laserPairedLimit' ||
    value.maxRuns !== 2 ||
    value.evidenceIdPattern !== 'evidence:run:<templateId>:<runNumber>'
  )
    return check.issue(path);
  if (
    !availability(check, value.availability, `${path}/availability`) ||
    !check.record(value.questionKeys, `${path}/questionKeys`, ['baseline', 'higherRisk']) ||
    value.questionKeys.baseline !== 'experiment.laserSham.question.baseline' ||
    value.questionKeys.higherRisk !== 'experiment.laserSham.question.higherRisk'
  )
    return false;
  let good =
    idArray(check, value.goalIds, `${path}/goalIds`) &&
    check.array(value.options, `${path}/options`) &&
    check.record(value.stageActions, `${path}/stageActions`, [
      'configure',
      'start',
      'monitor',
      'qualityMonitor',
      'stabilize',
      'stop',
      'analyse',
    ]) &&
    check.array(value.monitoringOffsets, `${path}/monitoringOffsets`) &&
    check.idValue(value.recordId, `${path}/recordId`) &&
    idArray(check, value.scienceDefinitionIds, `${path}/scienceDefinitionIds`) &&
    check.array(value.biologicalResults, `${path}/biologicalResults`) &&
    check.array(value.outcomes, `${path}/outcomes`);
  if (!good) return false;
  const options = value.options as unknown[];
  const stageActions = value.stageActions as RecordValue;
  const offsets = value.monitoringOffsets as unknown[];
  const biologicalResults = value.biologicalResults as unknown[];
  const outcomes = value.outcomes as unknown[];
  good =
    options.every((option, index) => {
      const optionPath = `${path}/options/${index}`;
      if (
        !check.record(option, optionPath, ['id', 'kind', 'labelKey', 'value']) ||
        !check.idValue(option.id, `${optionPath}/id`) ||
        !check.literal(option.kind, `${optionPath}/kind`, [
          'goal',
          'control',
          'observation',
          'sample',
          'equipment',
          'familyChoice',
        ]) ||
        !check.key(option.labelKey, `${optionPath}/labelKey`)
      )
        return false;
      const values: Readonly<Record<string, readonly string[]>> = {
        goal: ['MR-EXP-LASER-SHAM-GOAL-REPLICATION'],
        control: ['matched', 'limited'],
        observation: ['structure', 'rhythm', 'paired'],
        sample: ['stable', 'stressed', 'failing'],
        equipment: ['ready', 'limited', 'unavailable'],
        familyChoice: ['baseline', 'higherRisk'],
      };
      return check.literal(option.value, `${optionPath}/value`, values[String(option.kind)]!);
    }) && good;
  for (const [key, actionId] of Object.entries(stageActions))
    if (!check.idValue(actionId, `${path}/stageActions/${key}`)) good = false;
  good =
    offsets.every(
      (offset, index) =>
        check.record(offset, `${path}/monitoringOffsets/${index}`, ['first', 'last']) &&
        check.int(offset.first, `${path}/monitoringOffsets/${index}/first`) &&
        check.int(offset.last, `${path}/monitoringOffsets/${index}/last`) &&
        Number(offset.first) <= Number(offset.last),
    ) && good;
  good =
    biologicalResults.every(
      (entry, index) =>
        check.record(entry, `${path}/biologicalResults/${index}`, ['id', 'value']) &&
        check.idValue(entry.id, `${path}/biologicalResults/${index}/id`) &&
        check.literal(entry.value, `${path}/biologicalResults/${index}/value`, [
          'strong',
          'limited',
          'weak',
        ]),
    ) && good;
  const outcomeKeys = [
    'familyChoice',
    'biologicalResult',
    'observation',
    'access',
    'monitoringResponse',
    'biologicalResultId',
    'structureId',
    'rhythmId',
    'repatterningId',
    'controlId',
    'observationCoverage',
    'bodyKey',
  ];
  return (
    outcomes.every(
      (row, index) =>
        check.record(row, `${path}/outcomes/${index}`, outcomeKeys) &&
        check.literal(row.familyChoice, `${path}/outcomes/${index}/familyChoice`, [
          'baseline',
          'higherRisk',
        ]) &&
        check.literal(row.biologicalResult, `${path}/outcomes/${index}/biologicalResult`, [
          'strong',
          'limited',
          'weak',
        ]) &&
        check.literal(row.observation, `${path}/outcomes/${index}/observation`, [
          'structure',
          'rhythm',
          'paired',
        ]) &&
        check.literal(row.access, `${path}/outcomes/${index}/access`, [
          'readyMatched',
          'limitedRoute',
        ]) &&
        check.literal(row.monitoringResponse, `${path}/outcomes/${index}/monitoringResponse`, [
          'continue',
          'qualityCheck',
          'stabilize',
          'missed',
        ]) &&
        ['biologicalResultId', 'structureId', 'rhythmId', 'repatterningId', 'controlId'].every(
          (key) => check.idValue(row[key], `${path}/outcomes/${index}/${key}`),
        ) &&
        check.literal(row.observationCoverage, `${path}/outcomes/${index}/observationCoverage`, [
          'full',
          'limited',
        ]) &&
        check.key(row.bodyKey, `${path}/outcomes/${index}/bodyKey`),
    ) && good
  );
};

const task = (check: Check, value: RecordValue, path: string): boolean => {
  if (value.type === 'experimentMilestone')
    return (
      base(check, value, path, 'experimentMilestone', [
        'availability',
        'labelKey',
        'command',
        'experiment',
        'completion',
        'resultRefs',
        'activeRequestId',
      ]) &&
      availability(check, value.availability, `${path}/availability`) &&
      value.labelKey === 'task.laserSham' &&
      value.command === 'analyseExperiment' &&
      ref(check, value.experiment, `${path}/experiment`) &&
      check.record(value.completion, `${path}/completion`, ['kind', 'record']) &&
      value.completion.kind === 'firstSuccessfulAnalysis' &&
      ref(check, value.completion.record, `${path}/completion/record`) &&
      check.array(value.resultRefs, `${path}/resultRefs`) &&
      value.resultRefs.every((entry, index) => ref(check, entry, `${path}/resultRefs/${index}`)) &&
      value.activeRequestId === null
    );
  if (value.type === 'sliceRehearsal')
    return (
      base(check, value, path, 'sliceRehearsal', [
        'availability',
        'labelKey',
        'command',
        'actionId',
        'allowedClaimIds',
        'experimentId',
        'completionId',
        'activeRequestId',
      ]) &&
      availability(check, value.availability, `${path}/availability`) &&
      check.key(value.labelKey, `${path}/labelKey`) &&
      value.command === 'commitInitialManuscript' &&
      check.idValue(value.actionId, `${path}/actionId`) &&
      idArray(check, value.allowedClaimIds, `${path}/allowedClaimIds`) &&
      value.experimentId === 'MR-EXP-LASER-SHAM' &&
      value.completionId === 'MR-UI-SLICE-COMPLETE' &&
      value.activeRequestId === null
    );
  return check.issue(`${path}/type`);
};
const scene = (check: Check, value: RecordValue, path: string): boolean =>
  base(check, value, path, 'scene', [
    'availability',
    'eventId',
    'locationIds',
    'cue',
    'mandatory',
    'baseForm',
    'conditionalForm',
    'choices',
    'periodEffect',
    'completionEffects',
    'closingBeats',
    'recapKey',
  ]) &&
  availability(check, value.availability, `${path}/availability`) &&
  check.idValue(value.eventId, `${path}/eventId`) &&
  idArray(check, value.locationIds, `${path}/locationIds`, false) &&
  (value.cue === null || cue(check, value.cue, `${path}/cue`)) &&
  check.bool(value.mandatory, `${path}/mandatory`) &&
  sceneForm(check, value.baseForm, `${path}/baseForm`) &&
  (value.conditionalForm === null ||
    sceneForm(check, value.conditionalForm, `${path}/conditionalForm`)) &&
  check.array(value.choices, `${path}/choices`) &&
  value.choices.every((entry, index) => choice(check, entry, `${path}/choices/${index}`)) &&
  (value.periodEffect === 0 || value.periodEffect === 1 || check.issue(`${path}/periodEffect`)) &&
  effects(check, value.completionEffects, `${path}/completionEffects`) &&
  check.array(value.closingBeats, `${path}/closingBeats`) &&
  value.closingBeats.every((entry, index) => beat(check, entry, `${path}/closingBeats/${index}`)) &&
  (value.recapKey === null || check.key(value.recapKey, `${path}/recapKey`));
const recordItem = (check: Check, value: RecordValue, path: string): boolean => {
  if (value.type === 'notebook')
    return (
      base(check, value, path, 'notebook', [
        'availability',
        'titleKey',
        'baseForm',
        'source',
        'selection',
        'repeatNoteKeys',
      ]) &&
      availability(check, value.availability, `${path}/availability`) &&
      value.titleKey === 'record.projectNotebook.title' &&
      textForm(check, value.baseForm, `${path}/baseForm`) &&
      ref(check, value.source, `${path}/source`) &&
      value.selection === 'onCreation' &&
      keyArray(check, value.repeatNoteKeys, `${path}/repeatNoteKeys`)
    );
  if (value.type === 'experiment')
    return (
      base(check, value, path, 'experiment', [
        'availability',
        'titleKey',
        'source',
        'selection',
        'repeatNoteKeys',
      ]) &&
      availability(check, value.availability, `${path}/availability`) &&
      value.titleKey === 'record.laserSham.title' &&
      ref(check, value.source, `${path}/source`) &&
      check.record(value.selection, `${path}/selection`, [
        'kind',
        'experimentId',
        'allowedBodyKeys',
      ]) &&
      value.selection.kind === 'laserOutcomeRow' &&
      value.selection.experimentId === 'MR-EXP-LASER-SHAM' &&
      keyArray(check, value.selection.allowedBodyKeys, `${path}/selection/allowedBodyKeys`, true) &&
      keyArray(check, value.repeatNoteKeys, `${path}/repeatNoteKeys`)
    );
  return check.issue(`${path}/type`);
};
const tutorial = (check: Check, value: RecordValue, path: string): boolean =>
  base(check, value, path, 'tutorial', [
    'availability',
    'trigger',
    'headingKey',
    'bodyKey',
    'acknowledgement',
    'inputActions',
  ]) &&
  availability(check, value.availability, `${path}/availability`) &&
  check.record(value.trigger, `${path}/trigger`, ['kind', 'event']) &&
  value.trigger.kind === 'firstSemanticEvent' &&
  check.literal(value.trigger.event, `${path}/trigger/event`, [
    'freeMovementReady',
    'interactionTargetReady',
    'focusedViewOpened',
    'actionCostShown',
    'sampleConfigured',
    'monitoringWindowAvailable',
    'researchStatusAvailable',
    'safeSaveAvailable',
  ]) &&
  check.key(value.headingKey, `${path}/headingKey`) &&
  check.key(value.bodyKey, `${path}/bodyKey`) &&
  value.acknowledgement === 'dismissible' &&
  check.array(value.inputActions, `${path}/inputActions`) &&
  value.inputActions.every((entry, index) =>
    check.literal(entry, `${path}/inputActions/${index}`, [
      'move',
      'look',
      'uiNavigate',
      'primaryAction',
      'backPause',
      'researchStatus',
      'previousPanel',
      'nextPanel',
      'interactionAssist',
    ]),
  ) &&
  new Set(value.inputActions).size === value.inputActions.length;
const interfaceItem = (check: Check, value: RecordValue, path: string): boolean => {
  if (value.type === 'scienceDefinition') {
    if (
      !base(check, value, path, 'scienceDefinition', ['kind', 'meaning', 'labelKey']) ||
      !check.literal(value.kind, `${path}/kind`, [
        'structure',
        'rhythm',
        'repatterning',
        'control',
        'reading',
        'caveat',
      ]) ||
      !check.key(value.labelKey, `${path}/labelKey`)
    )
      return false;
    const meanings: Readonly<Record<string, readonly string[]>> = {
      structure: ['recovery', 'partial', 'none', 'unobserved'],
      rhythm: ['recovery', 'partial', 'none', 'unobserved'],
      repatterning: ['tracksRecovery', 'noAssociation', 'unobserved'],
      control: ['matched', 'limited'],
      reading: ['recovery', 'association', 'noRecovery', 'unresolved'],
      caveat: ['condition', 'association', 'process'],
    };
    return check.literal(value.meaning, `${path}/meaning`, meanings[String(value.kind)]!);
  }
  if (
    value.type !== 'interface' ||
    !base(check, value, path, 'interface', [
      'availability',
      'purpose',
      'textKeys',
      'confirmation',
      'dynamicFields',
      'definitions',
    ])
  )
    return check.issue(`${path}/type`);
  return (
    availability(check, value.availability, `${path}/availability`) &&
    check.literal(value.purpose, `${path}/purpose`, [
      'menuContinue',
      'menuNewGame',
      'menuSaveQuit',
      'saveSuccess',
      'saveFailure',
      'saveRecovery',
      'saveReset',
      'replaceSave',
      'clearData',
      'researchStatus',
      'controls',
      'settings',
      'accessibility',
      'profile',
      'contentInvalid',
      'sliceRehearsal',
      'sliceComplete',
      'claim',
      'requirement',
      'availabilityCue',
      'confirmation',
    ]) &&
    keyArray(check, value.textKeys, `${path}/textKeys`) &&
    check.literal(value.confirmation, `${path}/confirmation`, ['none', 'required']) &&
    check.set(value.dynamicFields, `${path}/dynamicFields`, (entry, entryPath) =>
      check.literal(entry, entryPath, [
        'actionPeriods',
        'actionEnergy',
        'controlLabel',
        'currentValue',
        'protagonistName',
        'subjectPronoun',
        'objectPronoun',
        'possessiveAdjective',
        'possessivePronoun',
        'reflexivePronoun',
      ]),
    ) &&
    check.array(value.definitions, `${path}/definitions`) &&
    value.definitions.every((entry, index) => {
      const definitionPath = `${path}/definitions/${index}`;
      if (
        !check.record(entry, definitionPath, ['id', 'kind', 'value', 'labelKey']) ||
        !check.idValue(entry.id, `${definitionPath}/id`) ||
        !check.literal(entry.kind, `${definitionPath}/kind`, ['claim', 'requirement']) ||
        !check.key(entry.labelKey, `${definitionPath}/labelKey`)
      )
        return false;
      return entry.kind === 'claim'
        ? check.literal(entry.value, `${definitionPath}/value`, ['careful', 'strong', 'inflated'])
        : check.literal(entry.value, `${definitionPath}/value`, [
            'supportedFigure',
            'relevantControl',
            'distinctExperimentFigures',
            'structureCoverage',
            'rhythmCoverage',
            'matchedControl',
            'caveat',
            'associationSupport',
            'causalSupport',
          ]);
    })
  );
};

export const validateManifestShape = (
  raw: unknown,
  file = 'content/manifest.json',
): ContentResult<SourceManifest> => {
  const check = new Check(file);
  if (
    !check.record(raw, '/', [
      'packageId',
      'schemaVersion',
      'contentVersion',
      'language',
      'dataFiles',
      'stringsFile',
      'profileFiles',
      'compatibleEarlierVersions',
    ])
  )
    return result(check, raw as SourceManifest);
  const good =
    raw.packageId === 'minor-revisions-content' &&
    raw.schemaVersion === 1 &&
    raw.contentVersion === '1.1.0' &&
    raw.language === 'en' &&
    Array.isArray(raw.dataFiles) &&
    JSON.stringify(raw.dataFiles) === JSON.stringify(DATA_FILES) &&
    raw.stringsFile === 'content/strings.en.json' &&
    Array.isArray(raw.profileFiles) &&
    JSON.stringify(raw.profileFiles) === JSON.stringify(PROFILE_FILES) &&
    Array.isArray(raw.compatibleEarlierVersions) &&
    raw.compatibleEarlierVersions.length === 0;
  if (!good) check.issue('/', 'invalidManifest');
  return result(check, structuredClone(raw) as unknown as SourceManifest);
};
export const validateDataEnvelope = (
  raw: unknown,
  family: ContentFamily,
  file = DATA_FILE_BY_FAMILY[family],
): ContentResult<readonly AuthoredContentItem[]> => {
  const check = new Check(file);
  if (
    !check.record(raw, '/', ['schemaVersion', 'family', 'items']) ||
    raw.schemaVersion !== 1 ||
    raw.family !== family ||
    !check.array(raw.items, '/items')
  ) {
    if (check.issues.length === 0) check.issue('/');
    return result(check, []);
  }
  let previous = '';
  for (const [index, item] of raw.items.entries()) {
    const id = isRecord(item) && typeof item.id === 'string' ? item.id : null;
    const itemCheck = new Check(file, id);
    const validItem = familyItem(itemCheck, family, item, `/items/${index}`);
    if (!validItem && itemCheck.issues.length === 0) itemCheck.issue(`/items/${index}`);
    check.issues.push(...itemCheck.issues);
    if (id !== null && previous >= id)
      check.issue(`/items/${index}/id`, id === previous ? 'duplicateId' : 'invalidObject', id);
    if (id !== null) previous = id;
  }
  return result(check, structuredClone(raw.items) as AuthoredContentItem[]);
};
export const validateStringsShape = (
  raw: unknown,
  file = 'content/strings.en.json',
): ContentResult<Readonly<Record<string, string>>> => {
  const check = new Check(file);
  if (!isRecord(raw)) {
    check.issue('/', 'invalidText');
    return result(check, {});
  }
  const keys = Object.keys(raw);
  if (!sorted(keys)) check.issue('/', 'invalidText');
  const allowedPlaceholders = new Set([
    'protagonistName',
    'subjectPronoun',
    'objectPronoun',
    'possessiveAdjective',
    'possessivePronoun',
    'reflexivePronoun',
  ]);
  for (const key of keys) {
    if (key.length > 128 || !/^[a-z][A-Za-z0-9]*(?:\.[a-z][A-Za-z0-9]*)*$/u.test(key)) {
      check.issue(`/${key}`, 'invalidId', key);
      continue;
    }
    const value = raw[key];
    if (
      typeof value !== 'string' ||
      value.length === 0 ||
      value !== value.normalize('NFC') ||
      /<\/?[A-Za-z][^>]*>|javascript:|```/iu.test(value)
    ) {
      check.issue(`/${key}`, 'invalidText', key);
      continue;
    }
    const tokens = [...value.matchAll(/\{([^{}]*)\}/gu)];
    if (
      tokens.some((token) => !allowedPlaceholders.has(token[1]!)) ||
      value.replaceAll(/\{[^{}]*\}/gu, '').includes('{') ||
      value.replaceAll(/\{[^{}]*\}/gu, '').includes('}')
    )
      check.issue(`/${key}`, 'invalidText', key);
  }
  return result(check, structuredClone(raw) as Record<string, string>);
};
export const validateProfileShape = (
  raw: unknown,
  expectedId: 'full' | 'fallback' | 'slice',
  file = `content/profiles/${expectedId}.json`,
): ContentResult<ProfileSource> => {
  const check = new Check(file);
  if (
    !check.record(raw, '/', [
      'schemaVersion',
      'id',
      'implementationStatus',
      'campaignMode',
      'selections',
      'replacements',
      'expectedCounts',
      'sliceCompletionId',
    ])
  )
    return result(check, raw as ProfileSource);
  let good =
    raw.schemaVersion === 1 &&
    raw.id === expectedId &&
    check.literal(raw.implementationStatus, '/implementationStatus', ['complete', 'incomplete']) &&
    raw.campaignMode === (expectedId === 'slice' ? 'evaluationSlice' : 'campaign') &&
    (expectedId === 'slice'
      ? raw.sliceCompletionId === 'MR-UI-SLICE-COMPLETE'
      : raw.sliceCompletionId === null) &&
    check.record(raw.selections, '/selections', CONTENT_FAMILIES) &&
    check.record(raw.expectedCounts, '/expectedCounts', CONTENT_FAMILIES) &&
    check.array(raw.replacements, '/replacements');
  if (isRecord(raw.selections) && isRecord(raw.expectedCounts))
    for (const family of CONTENT_FAMILIES) {
      good =
        idArray(check, raw.selections[family], `/selections/${family}`) &&
        check.int(raw.expectedCounts[family], `/expectedCounts/${family}`) &&
        Number(raw.expectedCounts[family]) === (raw.selections[family] as unknown[]).length &&
        good;
    }
  if (Array.isArray(raw.replacements))
    good =
      raw.replacements.every(
        (entry, index) =>
          check.record(entry, `/replacements/${index}`, ['family', 'fromId', 'toId']) &&
          check.literal(entry.family, `/replacements/${index}/family`, CONTENT_FAMILIES) &&
          check.idValue(entry.fromId, `/replacements/${index}/fromId`) &&
          check.idValue(entry.toId, `/replacements/${index}/toId`) &&
          entry.fromId !== entry.toId,
      ) && good;
  if (!good && check.issues.length === 0) check.issue('/', 'invalidProfile');
  for (const issue of check.issues)
    if (issue.code === 'invalidObject')
      (issue as { code: ContentIssue['code'] }).code = 'invalidProfile';
  return result(check, structuredClone(raw) as unknown as ProfileSource);
};

export const validateBuiltShape = (raw: unknown): ContentResult<BuiltContentPackage> => {
  const check = new Check('built-content');
  if (
    !check.record(raw, '/', ['metadata', 'families', 'strings']) ||
    !check.record(raw.metadata, '/metadata', [
      'packageId',
      'schemaVersion',
      'contentVersion',
      'language',
      'profileId',
      'compatibleEarlierVersions',
      'expectedCounts',
    ]) ||
    !check.record(raw.families, '/families', CONTENT_FAMILIES) ||
    !check.record(raw.metadata.expectedCounts, '/metadata/expectedCounts', CONTENT_FAMILIES)
  )
    return result(check, raw as BuiltContentPackage);
  const metadata = raw.metadata;
  if (
    metadata.packageId !== 'minor-revisions-content' ||
    metadata.schemaVersion !== 1 ||
    metadata.contentVersion !== '1.1.0' ||
    metadata.language !== 'en' ||
    !check.literal(metadata.profileId, '/metadata/profileId', ['full', 'fallback', 'slice']) ||
    !Array.isArray(metadata.compatibleEarlierVersions) ||
    metadata.compatibleEarlierVersions.length !== 0
  )
    check.issue('/metadata');
  const expectedCounts = metadata.expectedCounts as RecordValue;
  for (const family of CONTENT_FAMILIES) {
    if (
      !check.array(raw.families[family], `/families/${family}`) ||
      !check.int(expectedCounts[family], `/metadata/expectedCounts/${family}`) ||
      raw.families[family].length !== expectedCounts[family]
    )
      continue;
    for (const [index, item] of raw.families[family].entries()) {
      if (!isRecord(item) || Object.hasOwn(item, 'trace')) {
        check.issue(`/families/${family}/${index}`);
        continue;
      }
      const sourceItem = {
        ...item,
        trace: { requirementIds: ['MR-REQ-CONTENT-001'], testIds: ['MR-TEST-CONT-001'] },
      };
      const itemCheck = new Check('built-content', typeof item.id === 'string' ? item.id : null);
      familyItem(itemCheck, family, sourceItem, `/families/${family}/${index}`);
      check.issues.push(...itemCheck.issues);
    }
  }
  const stringsResult = validateStringsShape(raw.strings, 'built-content');
  if (stringsResult.kind === 'invalid') check.issues.push(...stringsResult.issues);
  return result(check, structuredClone(raw) as unknown as BuiltContentPackage);
};

export const cloneBuiltItem = (item: AuthoredContentItem): BuiltContentItem => {
  const { trace, ...built } = item;
  void trace;
  return structuredClone(built);
};
export const countUniqueWords = (strings: Readonly<Record<string, string>>): number => {
  const words = new Set<string>();
  for (const value of Object.values(strings)) {
    const normalized = value
      .normalize('NFC')
      .replaceAll(
        /\{(?:protagonistName|subjectPronoun|objectPronoun|possessiveAdjective|possessivePronoun|reflexivePronoun)\}/gu,
        ' ',
      )
      .toLowerCase();
    for (const match of normalized.matchAll(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu))
      words.add(match[0]);
  }
  return words.size;
};
