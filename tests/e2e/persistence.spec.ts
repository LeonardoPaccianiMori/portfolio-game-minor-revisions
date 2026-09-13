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
