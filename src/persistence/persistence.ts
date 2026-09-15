import { createArchiveStore } from './archive-store.ts';
import type { ArchiveStore } from './archive-store.ts';
import { createCampaignStore } from './campaign-store.ts';
import type { CampaignStore } from './campaign-store.ts';
import { clearAllData } from './clear.ts';
import { openCampaignDatabase } from './database.ts';
import { createSettingsStore } from './settings-store.ts';
import type { SettingsStore } from './settings-store.ts';

export interface Persistence {
  readonly campaigns: CampaignStore;
  readonly settings: SettingsStore;
  readonly archive: ArchiveStore;
  clearAllData(): Promise<void>;
  close(): void;
}

export const createPersistence = async (): Promise<Persistence> => {
  const database = await openCampaignDatabase();

  return {
    campaigns: createCampaignStore(database),
    settings: createSettingsStore(database),
    archive: createArchiveStore(database),
    clearAllData: () => clearAllData(database),
    close: () => {
      database.close();
    },
  };
};
