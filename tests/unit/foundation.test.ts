import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const root = process.cwd();

const readJson = async (path: string): Promise<Record<string, unknown>> => {
  const source = await readFile(join(root, path), 'utf8');
  return JSON.parse(source) as Record<string, unknown>;
};

describe('foundation', () => {
  it('pins the private package, engine, and package manager', async () => {
    const packageJson = await readJson('package.json');

    expect(packageJson['private']).toBe(true);
    expect(packageJson['engines']).toEqual({ node: '24.20.0' });
    expect(packageJson['packageManager']).toBe('npm@12.0.2');
  });

  it('keeps exact runtime dependency pins', async () => {
    const packageJson = await readJson('package.json');

    expect(packageJson['dependencies']).toEqual({
      idb: '8.0.3',
      three: '0.185.1',
      zod: '4.5.2',
    });
  });

  it('defines the quality commands', async () => {
    const packageJson = await readJson('package.json');
    const scripts = packageJson['scripts'] as Record<string, string>;

    expect(scripts['check']).toContain('npm test');
    expect(scripts['check']).toContain('content:check');
    expect(scripts['verify']).toContain('test:e2e');
    expect(scripts['verify']).toContain('build');
  });

  it('uses strict TypeScript without emitting', async () => {
    const tsconfig = await readJson('tsconfig.json');
    const compilerOptions = tsconfig['compilerOptions'] as Record<string, unknown>;

    expect(compilerOptions['strict']).toBe(true);
    expect(compilerOptions['noEmit']).toBe(true);
  });

  it('records the exact Node version', async () => {
    const nvmrc = await readFile(join(root, '.nvmrc'), 'utf8');

    expect(nvmrc.trim()).toBe('24.20.0');
  });

  it('declares the content manifest', async () => {
    const manifest = await readJson('content/manifest.json');

    expect(typeof manifest['contentVersion']).toBe('string');
  });
});
