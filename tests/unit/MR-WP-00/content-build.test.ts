import { access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import {
  buildContentForMode,
  profileForMode,
  writeContentForMode,
} from '../../../scripts/content-build';

const repositoryRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));

describe('Step 5 content build boundary', () => {
  it('maps only the approved Vite modes', () => {
    expect(profileForMode('development')).toEqual({ kind: 'valid', value: 'full' });
    expect(profileForMode('production')).toEqual({ kind: 'valid', value: 'full' });
    expect(profileForMode('full')).toEqual({ kind: 'valid', value: 'full' });
    expect(profileForMode('fallback')).toEqual({ kind: 'valid', value: 'fallback' });
    expect(profileForMode('slice')).toEqual({ kind: 'valid', value: 'slice' });
    expect(profileForMode('query-selected')).toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'invalidProfile' }],
    });
  });

  it('rejects incomplete full and builds the complete slice', async () => {
    await expect(buildContentForMode('full')).resolves.toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'incompleteProfile' }],
    });
    const slice = await buildContentForMode('slice');
    expect(slice.kind).toBe('valid');
    if (slice.kind === 'valid') {
      expect(Object.values(slice.value.families).flat()).toHaveLength(97);
      expect(Object.keys(slice.value.strings)).toHaveLength(213);
      expect(slice.value.strings).toMatchObject({
        'character.elena.name': 'Elena Markovic',
        'character.gabriel.name': 'Gabriel da Silva',
        'location.facility.name': 'Facility',
        'location.mainLab.name': 'Main laboratory',
        'location.piOffice.name': 'PI office',
        'location.sharedDesks.name': 'Shared desks',
        'location.tissueCulture.name': 'Tissue culture',
        'tutorial.interact': 'Look at a marked object and use Primary Action to interact.',
        'tutorial.move': 'Use Move to travel through the room. Use Look to change your view.',
        'tutorial.status':
          'Open Research Status to review visible changes without showing hidden formulas.',
      });
    }
  });

  it('allows only a narrow output name and leaves no file on rejection', async () => {
    await expect(writeContentForMode('slice', '../outside')).resolves.toMatchObject({
      kind: 'invalid',
      issues: [{ code: 'invalidProfile' }],
    });
    const outside = resolve(repositoryRoot, 'local-artifacts/outside/content-package.json');
    await expect(access(outside)).rejects.toThrow();
  });
});
