import type { IDBPDatabase } from 'idb';

import { createCampaignStore } from './campaign-store.ts';
import type { CampaignStore } from './campaign-store.ts';
import { clearAllData } from './clear.ts';
import { openCampaignDatabase } from './database.ts';
import type { CampaignDatabase } from './database.ts';
import { createSettingsStore } from './settings-store.ts';
import type { SettingsStore } from './settings-store.ts';

export interface Persistence {
  readonly database: IDBPDatabase<CampaignDatabase>;
  readonly campaigns: CampaignStore;
  readonly settings: SettingsStore;
  clearAllData(): Promise<void>;
  close(): void;
}

export const createPersistence = async (): Promise<Persistence> => {
  const database = await openCampaignDatabase();

  return {
    database,
    campaigns: createCampaignStore(database),
    settings: createSettingsStore(database),
    clearAllData: () => clearAllData(database),
    close: () => {
      database.close();
    },
  };
};
