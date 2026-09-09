import { describe, expect, it } from 'vitest';
import { createBuiltContentPackage, validateSourceCatalogue } from '../../../src/content';
import { rawSourceFixture } from './campaign-test-data';

describe('MR-IF-006 source catalogue', () => {
  it('validates the exact staged source and builds no partial value on failure', () => {
    const source = validateSourceCatalogue(rawSourceFixture());
    if (source.kind === 'invalid') expect(source.issues).toEqual([]);
    expect(source.kind).toBe('valid');
    if (source.kind === 'invalid') return;
    expect(createBuiltContentPackage(source.value, 'slice').kind).toBe('valid');
  });
});
