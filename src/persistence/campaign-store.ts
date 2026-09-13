import type { IDBPDatabase } from 'idb';

import { validateState } from '../rules/index.ts';
import type { CampaignState } from '../rules/index.ts';
import { BACKUP_KEY, CAMPAIGN_KEY } from './database.ts';
import type { CampaignDatabase } from './database.ts';

export type CampaignLoadOutcome =
  | { readonly status: 'loaded'; readonly state: CampaignState }
  | { readonly status: 'empty' }
  | { readonly status: 'invalid'; readonly issues: readonly string[] };

export interface CampaignStore {
  save(state: CampaignState): Promise<void>;
  load(): Promise<CampaignLoadOutcome>;
  readBackup(): Promise<CampaignLoadOutcome>;
}

const readState = (value: unknown): CampaignLoadOutcome => {
  if (value === undefined) {
    return { status: 'empty' };
  }

  const validation = validateState(value);
  if (!validation.ok) {
    return { status: 'invalid', issues: validation.issues };
  }

  return { status: 'loaded', state: validation.state };
};

export const createCampaignStore = (database: IDBPDatabase<CampaignDatabase>): CampaignStore => ({
  async save(state) {
    const validation = validateState(state);
    if (!validation.ok) {
      throw new Error('Refusing to save an invalid campaign state.');
    }

    const current = await database.get('campaign', CAMPAIGN_KEY);
    if (current !== undefined) {
      await database.put('backup', current, BACKUP_KEY);
    }

    await database.put('campaign', state, CAMPAIGN_KEY);
  },
  async load() {
    return readState(await database.get('campaign', CAMPAIGN_KEY));
  },
  async readBackup() {
    return readState(await database.get('backup', BACKUP_KEY));
  },
});
