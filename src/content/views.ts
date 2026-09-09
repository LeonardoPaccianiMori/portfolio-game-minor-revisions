import {
  collectSelectedTextKeys,
  SLICE_SELECTIONS,
  SLICE_STRING_KEYS,
  tutorialInputRows,
} from './profiles.ts';
import { validateReferences } from './references.ts';
import { countUniqueWords, validateBuiltShape } from './schemas.ts';
import { validateSemanticContent } from './semantics.ts';
import { CONTENT_FAMILIES } from './types.ts';
import type {
  BuiltContentItem,
  BuiltContentPackage,
  ContentFamily,
  ContentIssue,
  ContentResult,
  PlainData,
  PresentationItem,
  RulesItem,
  ValidatedContent,
} from './types.ts';

type RecordValue = Record<string, unknown>;
const RULE_FIELDS: Readonly<Record<ContentFamily, readonly string[]>> = {
  characters: ['presence', 'speakerId', 'relationshipId'],
  locations: ['roomType'],
  actions: ['workClass', 'periodCost', 'baseEnergyCost', 'command', 'reasonKeys'],
  experiments: [
    'availability',
    'family',
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
  ],
  tasks: [
    'availability',
    'command',
    'experiment',
    'completion',
    'resultRefs',
    'activeRequestId',
    'actionId',
    'allowedClaimIds',
    'experimentId',
    'completionId',
  ],
  roomStates: [
    'availability',
    'locationId',
    'affectedExperimentIds',
    'activationEventId',
    'routes',
    'expiryRouteId',
  ],
  events: [
    'availability',
    'status',
    'priority',
    'authoredOrder',
    'delivery',
    'cue',
    'fallback',
    'threadId',
    'effects',
  ],
  scenes: [
    'availability',
    'eventId',
    'locationIds',
    'mandatory',
    'baseForm',
    'conditionalForm',
    'choices',
    'periodEffect',
    'completionEffects',
    'recapKey',
  ],
  messages: [
    'availability',
    'eventId',
    'senderId',
    'threadId',
    'forms',
    'choices',
    'deferral',
    'followupEventIds',
    'expiryEffects',
  ],
  notifications: ['availability', 'eventId', 'senderId', 'threadId', 'forms', 'followupEventIds'],
  records: ['availability', 'source', 'selection', 'baseForm'],
  endings: ['family', 'when', 'variants'],
  citations: ['when', 'permanent'],
  environmentalItems: ['availability', 'locationId', 'acts'],
  contextualLines: ['availability', 'speakerId', 'when'],
  tutorials: ['availability', 'trigger', 'inputActions'],
  interface: ['availability', 'purpose', 'confirmation', 'definitions', 'kind', 'meaning'],
  audio: ['role'],
};
const PRESENT_FIELDS: Readonly<Record<ContentFamily, readonly string[]>> = {
  characters: ['nameKey', 'roleKey', 'presence', 'speakerId'],
  locations: ['nameKey', 'roomType', 'cueRoles', 'mappingKey'],
  actions: ['labelKey', 'workClass', 'periodCost', 'baseEnergyCost', 'forecastKey', 'reasonKeys'],
  experiments: [
    'family',
    'labelKey',
    'questionKeys',
    'pairedLimitForecastKey',
    'options',
    'scienceDefinitionIds',
    'biologicalResults',
    'outcomes',
  ],
  tasks: ['labelKey', 'choices', 'allowedClaimIds', 'completionId'],
  roomStates: ['locationId', 'forecastKey', 'routes'],
  events: ['cue'],
  scenes: [
    'eventId',
    'locationIds',
    'cue',
    'baseForm',
    'conditionalForm',
    'choices',
    'periodEffect',
    'closingBeats',
    'recapKey',
  ],
  messages: ['senderId', 'subjectKey', 'forms', 'choices'],
  notifications: ['senderId', 'forms', 'presentation'],
  records: ['titleKey', 'baseForm', 'selection', 'repeatNoteKeys'],
  endings: ['family', 'bodyKey', 'variants'],
  citations: ['titleKey', 'bodyKey', 'permanent', 'archiveOrder'],
  environmentalItems: ['locationId', 'presentation', 'textKeys'],
  contextualLines: ['speakerId', 'textKey'],
  tutorials: ['headingKey', 'bodyKey', 'acknowledgement', 'inputActions'],
  interface: [
    'purpose',
    'textKeys',
    'confirmation',
    'dynamicFields',
    'definitions',
    'kind',
    'meaning',
    'labelKey',
  ],
  audio: ['role', 'meaningKey', 'visibleDuplicate'],
};

const isRecord = (value: unknown): value is RecordValue =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const nested = (value: unknown, mode: 'rules' | 'presentation'): PlainData => {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
    return value;
  if (Array.isArray(value)) return value.map((entry) => nested(entry, mode));
  if (!isRecord(value)) return null;
  const keys = Object.keys(value);
  let allowed = keys;
  if (keys.includes('beats') && keys.includes('when'))
    allowed = mode === 'rules' ? ['id', 'when'] : ['id', 'beats'];
  else if (keys.includes('bodyKeys') && keys.includes('when'))
    allowed = mode === 'rules' ? ['id', 'when'] : ['id', 'bodyKeys'];
  else if (keys.includes('options') && keys.includes('recapKey') && !keys.includes('labelKey'))
    allowed = mode === 'rules' ? ['id', 'options'] : ['id', 'options', 'recapKey'];
  else if (keys.includes('closingBeats') && keys.includes('labelKey'))
    allowed =
      mode === 'rules'
        ? ['id', 'when', 'effects', 'confirmationKey', 'recapKey']
        : ['id', 'labelKey', 'confirmationKey', 'recapKey', 'closingBeats'];
  else if (keys.includes('biologicalResultId'))
    allowed = mode === 'rules' ? keys.filter((key) => key !== 'bodyKey') : keys;
  else if (keys.includes('labelKey') && keys.includes('kind') && keys.includes('value'))
    allowed = mode === 'rules' ? ['id', 'kind', 'value'] : ['id', 'kind', 'value', 'labelKey'];
  else if (keys.includes('resultReasonKey') && keys.includes('kind')) {
    if (mode === 'rules')
      allowed =
        value.kind === 'directResolve'
          ? ['kind', 'id', 'when', 'actionId', 'resultReasonKey', 'result']
          : value.kind === 'openScene'
            ? ['kind', 'id', 'when', 'eventId']
            : ['kind', 'id', 'when', 'trigger', 'resultReasonKey', 'result'];
    else
      allowed =
        value.kind === 'directResolve'
          ? ['kind', 'id', 'labelKey', 'actionId', 'result']
          : value.kind === 'openScene'
            ? ['kind', 'id', 'labelKey', 'eventId']
            : ['kind', 'id', 'labelKey', 'actionId', 'trigger', 'result'];
  }
  const result: Record<string, PlainData> = {};
  for (const key of allowed) if (Object.hasOwn(value, key)) result[key] = nested(value[key], mode);
  return result;
};

const project = (
  family: ContentFamily,
  item: BuiltContentItem,
  mode: 'rules' | 'presentation',
): RulesItem | PresentationItem => {
  const fields = mode === 'rules' ? RULE_FIELDS[family] : PRESENT_FIELDS[family];
  const source = item as unknown as RecordValue;
  const output: Record<string, PlainData> = { id: item.id, type: item.type };
  for (const field of fields)
    if (Object.hasOwn(source, field))
      output[field] =
        field === 'inputActions' && mode === 'presentation' && Array.isArray(source[field])
          ? tutorialInputRows(
              source[field].filter((entry): entry is string => typeof entry === 'string'),
            )
          : nested(source[field], mode);
  return output as unknown as RulesItem | PresentationItem;
};

const freeze = <T>(value: T, seen = new WeakSet<object>()): T => {
  if (typeof value !== 'object' || value === null || seen.has(value)) return value;
  seen.add(value);
  for (const child of Object.values(value as object)) freeze(child, seen);
  return Object.freeze(value);
};
const invalid = (issues: readonly ContentIssue[]): ContentResult<never> => ({
  kind: 'invalid',
  issues: [...issues].sort((a, b) => a.path.localeCompare(b.path) || a.code.localeCompare(b.code)),
});

const validatePackageContract = (built: BuiltContentPackage): readonly ContentIssue[] => {
  const issues: ContentIssue[] = [];
  if (built.metadata.profileId !== 'slice')
    issues.push({
      code: 'incompleteProfile',
      file: 'built-content',
      path: '/metadata/profileId',
      idOrKey: null,
    });
  for (const family of CONTENT_FAMILIES) {
    const ids = built.families[family].map((item) => item.id);
    if (JSON.stringify(ids) !== JSON.stringify(SLICE_SELECTIONS[family]))
      issues.push({
        code: 'countMismatch',
        file: 'built-content',
        path: `/families/${family}`,
        idOrKey: null,
      });
  }
  const selectedKeys = collectSelectedTextKeys(built.families);
  const actualKeys = Object.keys(built.strings);
  if (
    JSON.stringify(selectedKeys) !== JSON.stringify(SLICE_STRING_KEYS) ||
    JSON.stringify(selectedKeys) !== JSON.stringify(actualKeys)
  )
    issues.push({ code: 'countMismatch', file: 'built-content', path: '/strings', idOrKey: null });
  if (countUniqueWords(built.strings) > 6000)
    issues.push({
      code: 'wordLimitExceeded',
      file: 'built-content',
      path: '/strings',
      idOrKey: null,
    });
  return issues;
};

export const validateContentPackage = (raw: unknown): ContentResult<ValidatedContent> => {
  const shape = validateBuiltShape(raw);
  if (shape.kind === 'invalid') return invalid(shape.issues);
  const built = shape.value;
  const references = validateReferences(built.families, () => 'built-content', true);
  if (references.length > 0) return invalid(references);
  const semantics = validateSemanticContent(built.families, () => 'built-content');
  if (semantics.length > 0) return invalid(semantics);
  const contract = validatePackageContract(built);
  if (contract.length > 0) return invalid(contract);
  const rules = {} as Record<ContentFamily, readonly RulesItem[]>;
  const presentation = {} as Record<ContentFamily, readonly PresentationItem[]>;
  for (const family of CONTENT_FAMILIES) {
    rules[family] = built.families[family].map((item) => project(family, item, 'rules'));
    presentation[family] = built.families[family].map((item) =>
      project(family, item, 'presentation'),
    );
  }
  const value: ValidatedContent = {
    metadata: structuredClone(built.metadata),
    rules: { families: rules },
    presentation: { families: presentation },
    strings: structuredClone(built.strings),
  };
  return { kind: 'valid', value: freeze(value) };
};
