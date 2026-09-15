import { ENDING_IDS, RUN_ENDED_CAUSES, validatePersonnelFile } from '../rules/index.ts';
import type { EndingId, PersonnelFile, RunEndedCause } from '../rules/index.ts';

export interface ArchivedRun {
  readonly runId: string;
  readonly archivedAt: number;
  readonly seed: number;
  readonly ending: EndingId;
  readonly cause: RunEndedCause;
  readonly week: number;
  readonly personnelFile: PersonnelFile;
}

export interface ArchiveValidationOk {
  readonly ok: true;
  readonly entry: ArchivedRun;
}

export interface ArchiveValidationFailure {
  readonly ok: false;
  readonly issues: readonly string[];
}

export type ArchiveValidation = ArchiveValidationOk | ArchiveValidationFailure;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value);

export const validateArchivedRun = (value: unknown): ArchiveValidation => {
  if (!isRecord(value)) {
    return { ok: false, issues: ['archived run must be an object'] };
  }

  const issues: string[] = [];

  const runId = value['runId'];
  if (typeof runId !== 'string' || runId.trim().length === 0) {
    issues.push('archived run id must be a non-empty string');
  }

  const archivedAt = value['archivedAt'];
  if (!isInteger(archivedAt) || archivedAt < 0) {
    issues.push('archived run timestamp is out of range');
  }

  const seed = value['seed'];
  if (!isInteger(seed) || seed < 0 || seed > 4294967295) {
    issues.push('archived run seed is out of range');
  }

  const ending = value['ending'];
  if (!ENDING_IDS.includes(ending as EndingId)) {
    issues.push('archived run ending is unknown');
  }

  const cause = value['cause'];
  if (!RUN_ENDED_CAUSES.includes(cause as RunEndedCause)) {
    issues.push('archived run cause is unknown');
  }

  const week = value['week'];
  if (!isInteger(week) || week < 1 || week > 12) {
    issues.push('archived run week is out of range');
  }

  issues.push(...validatePersonnelFile(value['personnelFile']));

  const file = value['personnelFile'];
  if (isRecord(file)) {
    if (file['ending'] !== ending) {
      issues.push('archived run ending must match its personnel file');
    }

    if (file['cause'] !== cause) {
      issues.push('archived run cause must match its personnel file');
    }

    if (file['week'] !== week) {
      issues.push('archived run week must match its personnel file');
    }

    if (file['seed'] !== seed) {
      issues.push('archived run seed must match its personnel file');
    }
  }

  if (issues.length > 0) {
    return { ok: false, issues };
  }

  return { ok: true, entry: value as unknown as ArchivedRun };
};
