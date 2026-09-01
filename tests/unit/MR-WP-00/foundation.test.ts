import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const repositoryRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));

type PackageManifest = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  engines: { node: string };
  name: string;
  packageManager: string;
  private: boolean;
  scripts: Record<string, string>;
  type: string;
};

type TypeScriptConfig = {
  compilerOptions: Record<string, unknown>;
  include: string[];
};

const readJson = async <T>(path: string): Promise<T> => {
  return JSON.parse(await readFile(path, 'utf8')) as T;
};

describe('MR-WP-00 foundation', () => {
  it('uses the exact S01 package and configuration baseline', async () => {
    const manifest = await readJson<PackageManifest>(resolve(repositoryRoot, 'package.json'));
    const typeScriptConfig = await readJson<TypeScriptConfig>(
      resolve(repositoryRoot, 'tsconfig.json'),
    );
    const npmConfig = await readFile(resolve(repositoryRoot, '.npmrc'), 'utf8');
    const nvmVersion = await readFile(resolve(repositoryRoot, '.nvmrc'), 'utf8');
    const viteConfig = await readFile(resolve(repositoryRoot, 'vite.config.ts'), 'utf8');

    expect(nvmVersion.trim()).toBe('24.20.0');
    expect(npmConfig).toBe('engine-strict=true\nsave-exact=true\npackage-lock=true\n');
    expect(manifest).toMatchObject({
      engines: { node: '24.20.0' },
      name: 'minor-revisions',
      packageManager: 'npm@11.19.0',
      private: true,
      type: 'module',
    });
    expect(manifest.dependencies).toEqual({
      idb: '8.0.3',
      three: '0.185.1',
      zod: '4.5.2',
    });
    expect(manifest.devDependencies).toEqual({
      '@eslint/js': '10.0.1',
      '@playwright/test': '1.62.1',
      '@types/node': '24.13.3',
      '@vitest/coverage-v8': '4.1.11',
      'cross-env': '10.1.0',
      eslint: '10.9.1',
      globals: '17.11.0',
      prettier: '3.9.6',
      typescript: '6.0.3',
      'typescript-eslint': '8.68.0',
      vite: '8.2.2',
      vitest: '4.1.11',
    });
    expect(manifest.scripts).toEqual({
      'setup:browsers':
        'cross-env PLAYWRIGHT_BROWSERS_PATH=0 playwright install chromium firefox webkit',
      dev: 'vite',
      build: 'npm run typecheck && vite build',
      preview: 'vite preview',
      typecheck: 'tsc --noEmit',
      lint: 'eslint .',
      'format:check': 'prettier --check .',
      format: 'prettier --write .',
      test: 'vitest run',
      'test:coverage': 'vitest run --coverage',
      'test:e2e': 'cross-env PLAYWRIGHT_BROWSERS_PATH=0 playwright test',
      check: 'npm run typecheck && npm run lint && npm run format:check && npm test',
      verify:
        'npm run lint && npm run format:check && npm run test:coverage && npm run build && npm run test:e2e',
    });
    expect(typeScriptConfig.include).toEqual(['*.ts', 'src/**/*.ts', 'tests/**/*.ts']);
    expect(typeScriptConfig.compilerOptions.lib).toEqual(['ES2022', 'DOM', 'DOM.Iterable']);
    expect(typeScriptConfig.compilerOptions.types).toEqual(['node']);
    expect(typeScriptConfig.compilerOptions).toMatchObject({
      exactOptionalPropertyTypes: true,
      forceConsistentCasingInFileNames: true,
      isolatedModules: true,
      module: 'ESNext',
      moduleDetection: 'force',
      moduleResolution: 'Bundler',
      noEmit: true,
      noFallthroughCasesInSwitch: true,
      noImplicitOverride: true,
      noUncheckedIndexedAccess: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      resolveJsonModule: true,
      strict: true,
      target: 'ES2022',
      verbatimModuleSyntax: true,
    });
    expect(viteConfig).toContain(`base: './',
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    sourcemap: false,
    target: 'es2022',
  },
  envDir: false,`);
    expect(viteConfig).toContain(`preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
  },`);
    expect(viteConfig).toContain(`server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },`);
  });

  it('keeps the local page free of runtime modules and Three.js imports', async () => {
    const page = await readFile(resolve(repositoryRoot, 'index.html'), 'utf8');

    expect(page).toContain('<h1>Minor Revisions</h1>');
    expect(page).toContain('Game systems are not yet available.');
    expect(page).not.toMatch(/<script\b/i);
    expect(page).not.toMatch(/three(?:\.js)?/i);
  });
});
