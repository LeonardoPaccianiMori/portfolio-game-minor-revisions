import { describe, expect, it } from 'vitest';
import {
  createBuiltContentPackage,
  validateContentPackage,
  validateSourceCatalogue,
} from '../../../src/content';
import { builtContentFixture, rawSourceFixture } from './campaign-test-data';
import {
  collectSelectedTextKeys,
  SLICE_SELECTIONS,
  SLICE_STRING_KEYS,
} from '../../../src/content/profiles';

describe('content build profiles', () => {
  it('owns all 97 selections and all 213 fixed keys through exact fields or named groups', () => {
    const built = builtContentFixture();
    expect(Object.values(SLICE_SELECTIONS).reduce((total, ids) => total + ids.length, 0)).toBe(97);
    expect(SLICE_STRING_KEYS).toHaveLength(213);
    expect(new Set(SLICE_STRING_KEYS).size).toBe(213);
    expect(collectSelectedTextKeys(built.families)).toEqual(SLICE_STRING_KEYS);
  });
  it('rejects an aggregate key list substituted for an exact named interface group', () => {
    const built = structuredClone(builtContentFixture());
    const rehearsal = built.families.interface.find(
      (item) => item.id === 'MR-UI-SLICE-REHEARSAL',
    ) as unknown as { textKeys: string[] };
    rehearsal.textKeys = [...SLICE_STRING_KEYS];
    expect(validateContentPackage(built)).toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'invariantFailure' }],
    });
  });
  it('builds only the exact complete slice and rejects incomplete profiles', () => {
    const checked = validateSourceCatalogue(rawSourceFixture());
    expect(checked.kind).toBe('valid');
    if (checked.kind === 'invalid') return;
    expect(createBuiltContentPackage(checked.value, 'full')).toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'incompleteProfile' }],
    });
    const slice = createBuiltContentPackage(checked.value, 'slice');
    expect(slice.kind).toBe('valid');
    if (slice.kind === 'invalid') return;
    expect(slice.value.metadata.expectedCounts.interface).toBe(29);
    expect(Object.keys(slice.value.strings)).toHaveLength(213);
  });
  it('rejects a forged checked source value', () => {
    expect(createBuiltContentPackage({} as never, 'slice')).toEqual({
      kind: 'invalid',
      issues: [{ code: 'invalidObject', file: 'built-content', path: '/', idOrKey: null }],
    });
  });
  it('retains no caller source reference', () => {
    const raw = rawSourceFixture();
    const checked = validateSourceCatalogue(raw);
    expect(checked.kind).toBe('valid');
    if (checked.kind === 'invalid') return;
    raw.get('content/strings.en.json')?.fill(0);
    const built = createBuiltContentPackage(checked.value, 'slice');
    expect(built.kind).toBe('valid');
    if (built.kind === 'invalid') return;
    expect(built.value.strings['ui.content.invalid']).toContain('Text for');
  });
});
