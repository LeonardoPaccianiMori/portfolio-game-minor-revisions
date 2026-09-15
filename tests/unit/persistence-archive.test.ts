import { describe, expect, it } from 'vitest';

import { validateArchivedRun } from '../../src/persistence/index.ts';
import { buildPersonnelFile, createInitialState } from '../../src/rules/index.ts';

const baseRun = (): Record<string, unknown> => ({
  runId: 'run-1',
  archivedAt: 1000,
  seed: 21,
  ending: 'ending.intact',
  cause: 'quit',
  week: 4,
  personnelFile: buildPersonnelFile(createInitialState(21), {
    cause: 'quit',
    ending: 'ending.intact',
    week: 4,
  }),
});

const withOverride = (overrides: Record<string, unknown>): unknown => ({
  ...baseRun(),
  ...overrides,
});

describe('archived runs', () => {
  it('accepts a valid entry', () => {
    const result = validateArchivedRun(baseRun());

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.entry.runId).toBe('run-1');
      expect(result.entry.personnelFile.ending).toBe('ending.intact');
    }
  });

  it('rejects malformed shapes', () => {
    expect(validateArchivedRun(null)).toEqual({
      ok: false,
      issues: ['archived run must be an object'],
    });

    const cases: readonly (readonly [Record<string, unknown>, string])[] = [
      [{ runId: '  ' }, 'archived run id must be a non-empty string'],
      [{ archivedAt: -1 }, 'archived run timestamp is out of range'],
      [{ seed: 4294967296 }, 'archived run seed is out of range'],
      [{ ending: 'ending.win' }, 'archived run ending is unknown'],
      [{ cause: 'none' }, 'archived run cause is unknown'],
      [{ week: 13 }, 'archived run week is out of range'],
    ];

    for (const [overrides, expected] of cases) {
      const result = validateArchivedRun(withOverride(overrides));

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.issues).toContain(expected);
      }
    }
  });

  it('rejects entries that disagree with their personnel file', () => {
    const ending = validateArchivedRun(withOverride({ ending: 'ending.hollow' }));
    const cause = validateArchivedRun(withOverride({ cause: 'contract' }));
    const week = validateArchivedRun(withOverride({ week: 5 }));
    const seed = validateArchivedRun(withOverride({ seed: 99 }));

    expect(ending.ok).toBe(false);
    if (!ending.ok) {
      expect(ending.issues).toContain('archived run ending must match its personnel file');
    }
    expect(cause.ok).toBe(false);
    if (!cause.ok) {
      expect(cause.issues).toContain('archived run cause must match its personnel file');
    }
    expect(week.ok).toBe(false);
    if (!week.ok) {
      expect(week.issues).toContain('archived run week must match its personnel file');
    }
    expect(seed.ok).toBe(false);
    if (!seed.ok) {
      expect(seed.issues).toContain('archived run seed must match its personnel file');
    }
  });

  it('rejects a malformed personnel file', () => {
    const result = validateArchivedRun({
      ...baseRun(),
      personnelFile: { ending: 'ending.intact' },
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues.length).toBeGreaterThan(1);
    }
  });
});
