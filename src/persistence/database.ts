import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';

export const DATABASE_NAME = 'minor-revisions';
export const DATABASE_VERSION = 1;

export const CAMPAIGN_KEY = 'active';
export const BACKUP_KEY = 'backup';
export const SETTINGS_KEY = 'settings';

export const STORE_NAMES = ['campaign', 'backup', 'settings', 'archive', 'meta'] as const;
export type StoreName = (typeof STORE_NAMES)[number];

export interface CampaignDatabase extends DBSchema {
  campaign: { key: string; value: unknown };
  backup: { key: string; value: unknown };
  settings: { key: string; value: unknown };
  archive: { key: string; value: unknown };
  meta: { key: string; value: unknown };
}

export const openCampaignDatabase = async (): Promise<IDBPDatabase<CampaignDatabase>> =>
  openDB<CampaignDatabase>(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
      for (const name of STORE_NAMES) {
        if (!database.objectStoreNames.contains(name)) {
          database.createObjectStore(name);
        }
      }
    },
  });
