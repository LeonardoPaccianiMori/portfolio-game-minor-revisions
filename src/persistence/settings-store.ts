import type { IDBPDatabase } from 'idb';

import { SETTINGS_KEY } from './database.ts';
import type { CampaignDatabase } from './database.ts';
import { resolveSettings, validateSettings } from './settings.ts';
import type { Settings } from './settings.ts';

export interface SettingsStore {
  save(settings: Settings): Promise<void>;
  load(): Promise<Settings>;
}

export const createSettingsStore = (database: IDBPDatabase<CampaignDatabase>): SettingsStore => ({
  async save(settings) {
    const validation = validateSettings(settings);
    if (!validation.ok) {
      throw new Error('Refusing to save invalid settings.');
    }

    await database.put('settings', settings, SETTINGS_KEY);
  },
  async load() {
    return resolveSettings(await database.get('settings', SETTINGS_KEY));
  },
});
