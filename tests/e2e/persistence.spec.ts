import { expect, test } from '@playwright/test';

test('persistence saves, loads, backs up, and clears locally', async ({ page }) => {
  await page.goto('/');

  const result = await page.evaluate(async () => {
    const persistenceModulePath = '/src/persistence/index.ts';
    const rulesModulePath = '/src/rules/index.ts';

    const persistenceModule = (await import(
      persistenceModulePath
    )) as typeof import('../../src/persistence/index.ts');
    const rulesModule = (await import(
      rulesModulePath
    )) as typeof import('../../src/rules/index.ts');

    const persistence = await persistenceModule.createPersistence();
    const state = rulesModule.createInitialState(123);

    const initial = await persistence.campaigns.load();
    await persistence.campaigns.save(state);
    const loaded = await persistence.campaigns.load();
    await persistence.campaigns.save({ ...state, week: 2 });
    const backup = await persistence.campaigns.readBackup();

    await persistence.settings.save({
      captions: false,
      reducedMotion: true,
      scale: 1.2,
      volume: 0.5,
    });
    const settings = await persistence.settings.load();

    await persistence.clearAllData();
    const afterClear = await persistence.campaigns.load();
    const settingsAfterClear = await persistence.settings.load();

    persistence.close();

    return {
      initialStatus: initial.status,
      loadedStatus: loaded.status,
      loadedWeek: loaded.status === 'loaded' ? loaded.state.week : null,
      backupStatus: backup.status,
      backupWeek: backup.status === 'loaded' ? backup.state.week : null,
      settings,
      afterClearStatus: afterClear.status,
      settingsAfterClear,
    };
  });

  expect(result.initialStatus).toBe('empty');
  expect(result.loadedStatus).toBe('loaded');
  expect(result.loadedWeek).toBe(1);
  expect(result.backupStatus).toBe('loaded');
  expect(result.backupWeek).toBe(1);
  expect(result.settings).toEqual({
    captions: false,
    reducedMotion: true,
    scale: 1.2,
    volume: 0.5,
  });
  expect(result.afterClearStatus).toBe('empty');
  expect(result.settingsAfterClear).toEqual({
    captions: true,
    reducedMotion: false,
    scale: 1,
    volume: 1,
  });
});

test('invalid stored data is refused and never replaces the backup', async ({ page }) => {
  await page.goto('/');

  const result = await page.evaluate(async () => {
    const persistenceModulePath = '/src/persistence/index.ts';
    const rulesModulePath = '/src/rules/index.ts';

    const persistenceModule = (await import(
      persistenceModulePath
    )) as typeof import('../../src/persistence/index.ts');
    const rulesModule = (await import(
      rulesModulePath
    )) as typeof import('../../src/rules/index.ts');

    const database = await persistenceModule.openCampaignDatabase();
    await database.put('campaign', { version: 1, broken: true }, persistenceModule.CAMPAIGN_KEY);
    await database.put('backup', rulesModule.createInitialState(9), persistenceModule.BACKUP_KEY);
    database.close();

    const persistence = await persistenceModule.createPersistence();
    const loaded = await persistence.campaigns.load();

    let saveRejected = false;
    try {
      await persistence.campaigns.save({
        ...rulesModule.createInitialState(1),
        energy: 99,
      });
    } catch {
      saveRejected = true;
    }

    await persistence.campaigns.save(rulesModule.createInitialState(4));
    const backup = await persistence.campaigns.readBackup();
    persistence.close();

    return {
      loadedStatus: loaded.status,
      loadedIssueCount: loaded.status === 'invalid' ? loaded.issues.length : 0,
      saveRejected,
      backupStatus: backup.status,
      backupSeed: backup.status === 'loaded' ? backup.state.seed : null,
    };
  });

  expect(result.loadedStatus).toBe('invalid');
  expect(result.loadedIssueCount).toBeGreaterThan(0);
  expect(result.saveRejected).toBe(true);
  expect(result.backupStatus).toBe('loaded');
  expect(result.backupSeed).toBe(9);
});
