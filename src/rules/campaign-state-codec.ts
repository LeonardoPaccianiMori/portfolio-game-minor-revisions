import { validateCampaignState } from './campaign-state';
import type { CampaignState, CheckedResult } from './campaign-state-types';

const invalidText = (): CheckedResult<never> => ({
  kind: 'failure',
  issue: { path: '/', reason: 'wrongType' },
});

const hasDuplicateObjectMember = (text: string): boolean => {
  let index = 0;
  const skipWhitespace = (): void => {
    while (/\s/u.test(text[index] ?? '')) index += 1;
  };
  const readString = (): string | null => {
    if (text[index] !== '"') return null;
    const start = index;
    index += 1;
    while (index < text.length) {
      if (text[index] === '\\') {
        index += 2;
        continue;
      }
      if (text[index] === '"') {
        index += 1;
        try {
          const decoded = JSON.parse(text.slice(start, index)) as unknown;
          return typeof decoded === 'string' ? decoded : null;
        } catch {
          return null;
        }
      }
      index += 1;
    }
    return null;
  };
  function scanValue(): boolean | null {
    skipWhitespace();
    if (text[index] === '{') return scanObject();
    if (text[index] === '[') return scanArray();
    if (text[index] === '"') return readString() === null ? null : false;
    const start = index;
    while (index < text.length && !/[\s,\]}]/u.test(text[index]!)) index += 1;
    return index === start ? null : false;
  }
  const scanObject = (): boolean | null => {
    index += 1;
    skipWhitespace();
    if (text[index] === '}') {
      index += 1;
      return false;
    }
    const keys = new Set<string>();
    while (index < text.length) {
      const key = readString();
      if (key === null) return null;
      if (keys.has(key)) return true;
      keys.add(key);
      skipWhitespace();
      if (text[index] !== ':') return null;
      index += 1;
      const nestedDuplicate = scanValue();
      if (nestedDuplicate !== false) return nestedDuplicate;
      skipWhitespace();
      if (text[index] === '}') {
        index += 1;
        return false;
      }
      if (text[index] !== ',') return null;
      index += 1;
      skipWhitespace();
    }
    return null;
  };
  const scanArray = (): boolean | null => {
    index += 1;
    skipWhitespace();
    if (text[index] === ']') {
      index += 1;
      return false;
    }
    while (index < text.length) {
      const nestedDuplicate = scanValue();
      if (nestedDuplicate !== false) return nestedDuplicate;
      skipWhitespace();
      if (text[index] === ']') {
        index += 1;
        return false;
      }
      if (text[index] !== ',') return null;
      index += 1;
      skipWhitespace();
    }
    return null;
  };
  const duplicate = scanValue();
  if (duplicate === true) return true;
  return false;
};

const sortRecord = <T>(record: Record<string, T>): Record<string, T> =>
  Object.fromEntries(
    Object.entries(record).sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0)),
  );

const canonicalizeIdRecords = (source: CampaignState): CampaignState => {
  const state = structuredClone(source);
  state.experiments.equipmentById = sortRecord(state.experiments.equipmentById);
  state.experiments.preparationById = sortRecord(state.experiments.preparationById);
  state.experiments.runsById = sortRecord(state.experiments.runsById);
  state.experiments.rawRecordsById = sortRecord(state.experiments.rawRecordsById);
  state.experiments.evidenceCardsById = sortRecord(state.experiments.evidenceCardsById);
  state.experiments.stopLogsById = sortRecord(state.experiments.stopLogsById);
  state.manuscript.snapshotsById = sortRecord(state.manuscript.snapshotsById);
  state.manuscript.revisionTasksById = sortRecord(state.manuscript.revisionTasksById);
  state.manuscript.reviewerReportsById = sortRecord(state.manuscript.reviewerReportsById);
  state.manuscript.reportedReadingsByEvidenceId = sortRecord(
    state.manuscript.reportedReadingsByEvidenceId,
  );
  state.narrative.scenesById = sortRecord(state.narrative.scenesById);
  state.narrative.messagesById = sortRecord(state.narrative.messagesById);
  state.narrative.requestsById = sortRecord(state.narrative.requestsById);
  state.narrative.concernsById = sortRecord(state.narrative.concernsById);
  state.narrative.routesById = sortRecord(state.narrative.routesById);
  state.narrative.scheduler.eventsById = sortRecord(state.narrative.scheduler.eventsById);
  state.relationships.byId = sortRecord(state.relationships.byId);
  state.world.characterPlacementsById = sortRecord(state.world.characterPlacementsById);
  state.world.roomStatesById = sortRecord(state.world.roomStatesById);
  state.contentHistory.selectedVariantsById = sortRecord(state.contentHistory.selectedVariantsById);
  return state;
};

export const CampaignStateCodec = {
  parse(text: string): CheckedResult<CampaignState> {
    if (typeof text !== 'string') return invalidText();
    let decoded: unknown;
    try {
      if (hasDuplicateObjectMember(text)) return invalidText();
      decoded = JSON.parse(text) as unknown;
    } catch {
      return invalidText();
    }
    return validateCampaignState(decoded);
  },

  serialize(state: unknown): CheckedResult<string> {
    const checked = validateCampaignState(state);
    if (checked.kind === 'failure') return checked;
    return { kind: 'success', value: JSON.stringify(canonicalizeIdRecords(checked.value)) };
  },
} as const;
