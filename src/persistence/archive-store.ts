import type { IDBPDatabase } from 'idb';

import { validateArchivedRun } from './archive.ts';
import type { ArchiveValidationOk, ArchivedRun } from './archive.ts';
import type { CampaignDatabase } from './database.ts';

export interface ArchiveStore {
  save(entry: ArchivedRun): Promise<void>;
  list(): Promise<readonly ArchivedRun[]>;
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

    return values
      .map((value) => validateArchivedRun(value))
      .filter((validation): validation is ArchiveValidationOk => validation.ok)
      .map((validation) => validation.entry)
      .sort(byNewest);
  },
  async remove(runId) {
    await database.delete('archive', runId);
  },
});
