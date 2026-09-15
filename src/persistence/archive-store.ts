import type { IDBPDatabase } from 'idb';

import { validateArchivedRun } from './archive.ts';
import type { ArchivedRun } from './archive.ts';
import type { CampaignDatabase } from './database.ts';

export interface ArchiveListOk {
  readonly status: 'ok';
  readonly entries: readonly ArchivedRun[];
}

export interface ArchiveListInvalid {
  readonly status: 'invalid';
  readonly issues: readonly string[];
}

export type ArchiveListOutcome = ArchiveListOk | ArchiveListInvalid;

export interface ArchiveStore {
  save(entry: ArchivedRun): Promise<void>;
  list(): Promise<ArchiveListOutcome>;
  remove(runId: string): Promise<void>;
}

const byNewest = (left: ArchivedRun, right: ArchivedRun): number => {
  if (right.archivedAt !== left.archivedAt) {
    return right.archivedAt - left.archivedAt;
  }

  if (left.runId === right.runId) {
    return 0;
  }

  return left.runId < right.runId ? -1 : 1;
};

export const createArchiveStore = (database: IDBPDatabase<CampaignDatabase>): ArchiveStore => ({
  async save(entry) {
    const validation = validateArchivedRun(entry);
    if (!validation.ok) {
      throw new Error('Refusing to save an invalid archived run.');
    }

    await database.put('archive', entry, entry.runId);
  },
  async list() {
    const values = await database.getAll('archive');
    const entries: ArchivedRun[] = [];
    const issues: string[] = [];

    for (const value of values) {
      const validation = validateArchivedRun(value);

      if (validation.ok) {
        entries.push(validation.entry);
      } else {
        const runId =
          typeof value === 'object' && value !== null && 'runId' in value
            ? String(value.runId)
            : 'unknown';

        issues.push(...validation.issues.map((issue) => `${runId}: ${issue}`));
      }
    }

    if (issues.length > 0) {
      return { status: 'invalid', issues };
    }

    return { status: 'ok', entries: entries.sort(byNewest) };
  },
  async remove(runId) {
    await database.delete('archive', runId);
  },
});
