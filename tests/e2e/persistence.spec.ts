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

    const personnelFile = {
      ending: 'ending.intact' as const,
      cause: 'quit' as const,
      week: 4,
      seed: 123,
      paperOutcome: 'pending' as const,
      fellowshipOutcome: 'pending' as const,
      standing: 50,
      integrity: 100,
      relationships: { voss: 50, dario: 50, mara: 50 },
      stayed: ['dario', 'mara'] as const,
      complicity: [],
      discoveries: [],
      crashes: [],
      quit: true,
    };

    await persistence.archive.save({
      runId: 'run-a',
      archivedAt: 2000,
      seed: 123,
      ending: 'ending.intact' as const,
      cause: 'quit' as const,
      week: 4,
      personnelFile,
    });
    await persistence.archive.save({
      runId: 'run-b',
      archivedAt: 1000,
      seed: 124,
      ending: 'ending.intact' as const,
      cause: 'quit' as const,
      week: 4,
      personnelFile: { ...personnelFile, seed: 124 },
    });
    const archived = await persistence.archive.list();
    await persistence.archive.remove('run-a');
    const afterRemove = await persistence.archive.list();

    await persistence.clearAllData();
    const afterClear = await persistence.campaigns.load();
    const settingsAfterClear = await persistence.settings.load();
    const archiveAfterClear = await persistence.archive.list();

    persistence.close();

    return {
      initialStatus: initial.status,
      loadedStatus: loaded.status,
      loadedWeek: loaded.status === 'loaded' ? loaded.state.week : null,
      backupStatus: backup.status,
      backupWeek: backup.status === 'loaded' ? backup.state.week : null,
      settings,
      archived: archived.map((entry) => entry.runId),
      afterRemove: afterRemove.map((entry) => entry.runId),
      afterClearStatus: afterClear.status,
      settingsAfterClear,
      archiveAfterClearCount: archiveAfterClear.length,
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
  expect(result.archived).toEqual(['run-a', 'run-b']);
  expect(result.afterRemove).toEqual(['run-b']);
  expect(result.archiveAfterClearCount).toBe(0);
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
