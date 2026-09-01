import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const repositoryRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));

describe('MR-WP-00 foundation', () => {
  it('keeps the local page free of runtime modules and Three.js imports', async () => {
    const page = await readFile(resolve(repositoryRoot, 'index.html'), 'utf8');

    expect(page).toContain('<h1>Minor Revisions</h1>');
    expect(page).toContain('Game systems are not yet available.');
    expect(page).not.toMatch(/<script\b/i);
    expect(page).not.toMatch(/three(?:\.js)?/i);
  });
});
