import { readFile, readdir } from 'node:fs/promises';
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
  version: string;
};

type TypeScriptConfig = {
  compilerOptions: Record<string, unknown>;
  include: string[];
};

type PackageLock = {
  lockfileVersion: number;
  name: string;
  packages: {
    '': {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
      engines: { node: string };
      name: string;
      version: string;
    };
  };
  requires: boolean;
  version: string;
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
    expect(Object.keys(manifest).sort()).toEqual([
      'dependencies',
      'devDependencies',
      'engines',
      'name',
      'packageManager',
      'private',
      'scripts',
      'type',
      'version',
    ]);
    expect(manifest.engines).toEqual({ node: '24.20.0' });
    expect(manifest.name).toBe('minor-revisions');
    expect(manifest.packageManager).toBe('npm@12.0.2');
    expect(manifest.private).toBe(true);
    expect(manifest.type).toBe('module');
    expect(manifest.version).toBe('0.0.0');
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
    expect(Object.keys(typeScriptConfig).sort()).toEqual(['compilerOptions', 'include']);
    expect(typeScriptConfig.include).toEqual(['*.ts', 'src/**/*.ts', 'tests/**/*.ts']);
    expect(typeScriptConfig.compilerOptions).toEqual({
      exactOptionalPropertyTypes: true,
      forceConsistentCasingInFileNames: true,
      isolatedModules: true,
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
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
      types: ['node'],
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

  it('uses the approved module shell without a Three.js import or enabled game control', async () => {
    const page = await readFile(resolve(repositoryRoot, 'index.html'), 'utf8');

    expect(page).toContain('<h1>Minor Revisions</h1>');
    expect(page).toContain('Game systems are not yet available.');
    expect(page).toContain('This browser cannot run this version of Minor Revisions.');
    expect(page).toContain('<script type="module" src="/src/bootstrap/main.ts"></script>');
    expect(page).not.toMatch(/three(?:\.js)?/i);
    expect(page).not.toMatch(/>\s*(Continue|New Game)\s*</i);
  });

  it('routes every bootstrap platform import through the public platform entrance', async () => {
    const bootstrapDirectory = resolve(repositoryRoot, 'src/bootstrap');
    const bootstrapFiles = (await readdir(bootstrapDirectory))
      .filter((name) => name.endsWith('.ts'))
      .sort();
    const bootstrapSources = await Promise.all(
      bootstrapFiles.map(async (name) => ({
        name,
        source: await readFile(resolve(bootstrapDirectory, name), 'utf8'),
      })),
    );
    const platformEntrance = await readFile(
      resolve(repositoryRoot, 'src/platform/index.ts'),
      'utf8',
    );

    expect(bootstrapFiles).toEqual([
      'application-bootstrap.ts',
      'campaign-state-diagnostic.ts',
      'diagnostics.ts',
      'index.ts',
      'main.ts',
      'startup-screen.ts',
      'startup.ts',
      'temporary-adapters.ts',
    ]);
    for (const { name, source } of bootstrapSources) {
      expect(source, name).not.toMatch(/from ['"]\.\.\/platform\//u);
    }
    expect(
      bootstrapSources
        .filter(({ source }) => /from ['"]\.\.\/platform['"]/u.test(source))
        .map(({ name }) => name),
    ).toEqual(['application-bootstrap.ts', 'diagnostics.ts', 'startup-screen.ts', 'startup.ts']);
    expect(platformEntrance)
      .toBe(`export { cancelCompatibilityCheck, checkCompatibility } from './compatibility';
export type {
  CapabilityId,
  CapabilityStatus,
  CompatibilityCheckResult,
  CompatibilityReport,
} from './compatibility';
export { createTimingPort, createTimingPortForTests } from './timing';
`);
  });

  it('keeps the remaining frozen S01 tool configuration and lockfile-root facts exact', async () => {
    const [
      gitIgnore,
      prettierIgnore,
      eslintConfig,
      prettierConfig,
      vitestConfig,
      playwrightConfig,
      packageLock,
    ] = await Promise.all([
      readFile(resolve(repositoryRoot, '.gitignore'), 'utf8'),
      readFile(resolve(repositoryRoot, '.prettierignore'), 'utf8'),
      readFile(resolve(repositoryRoot, 'eslint.config.js'), 'utf8'),
      readFile(resolve(repositoryRoot, 'prettier.config.js'), 'utf8'),
      readFile(resolve(repositoryRoot, 'vitest.config.ts'), 'utf8'),
      readFile(resolve(repositoryRoot, 'playwright.config.ts'), 'utf8'),
      readJson<PackageLock>(resolve(repositoryRoot, 'package-lock.json')),
    ]);

    expect(gitIgnore).toBe(`node_modules/
dist/
coverage/
playwright-report/
test-results/
local-artifacts/performance/
.vite/
.cache/
.eslintcache
*.tsbuildinfo
*.log
.env
.env.*
.DS_Store
Thumbs.db
.vscode/
.idea/
*.swp
*.swo
*~
.worktrees/
`);
    expect(prettierIgnore).toBe(`node_modules/
dist/
coverage/
playwright-report/
test-results/
local-artifacts/performance/
.vite/
.cache/
package-lock.json
`);
    expect(eslintConfig).toBe(`import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'coverage/',
      'dist/',
      'local-artifacts/',
      'node_modules/',
      'playwright-report/',
      'test-results/',
      '.worktrees/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
    },
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['tests/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['eslint.config.js', 'playwright.config.ts', 'vite.config.ts', 'vitest.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
);
`);
    expect(prettierConfig).toBe(`export default {
  endOfLine: 'lf',
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};
`);
    expect(vitestConfig).toBe(`import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      thresholds: {
        branches: 85,
        lines: 90,
      },
    },
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
  },
});
`);
    expect(playwrightConfig).toBe(`import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  outputDir: 'test-results',
  testDir: 'tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'off',
  },
  webServer: {
    command: 'npm run dev',
    reuseExistingServer: false,
    url: 'http://127.0.0.1:5173',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
`);
    expect(Object.keys(packageLock).sort()).toEqual([
      'lockfileVersion',
      'name',
      'packages',
      'requires',
      'version',
    ]);
    expect(packageLock).toMatchObject({
      lockfileVersion: 3,
      name: 'minor-revisions',
      requires: true,
      version: '0.0.0',
    });
    expect(packageLock.packages['']).toEqual({
      dependencies: {
        idb: '8.0.3',
        three: '0.185.1',
        zod: '4.5.2',
      },
      devDependencies: {
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
      },
      engines: { node: '24.20.0' },
      name: 'minor-revisions',
      version: '0.0.0',
    });
  });
});
