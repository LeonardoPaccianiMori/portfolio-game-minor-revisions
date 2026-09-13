import type { IDBPDatabase } from 'idb';

import { STORE_NAMES } from './database.ts';
import type { CampaignDatabase } from './database.ts';

export const clearAllData = async (database: IDBPDatabase<CampaignDatabase>): Promise<void> => {
  const transaction = database.transaction(STORE_NAMES, 'readwrite');

  await Promise.all(STORE_NAMES.map((name) => transaction.objectStore(name).clear()));
  await transaction.done;
};
