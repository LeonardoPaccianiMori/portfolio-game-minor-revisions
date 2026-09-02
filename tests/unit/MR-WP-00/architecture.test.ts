import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const repositoryRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const sourceRoot = resolve(repositoryRoot, 'src');

const runtimeSources = async () => {
  const modules = (await readdir(sourceRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const files = (
    await Promise.all(
      modules.map(async (module) =>
        (await readdir(resolve(sourceRoot, module)))
          .filter((name) => name.endsWith('.ts'))
          .map((name) => ({ module, name })),
      ),
    )
  ).flat();
  return await Promise.all(
    files.map(async (file) => ({
      ...file,
      source: await readFile(resolve(sourceRoot, file.module, file.name), 'utf8'),
    })),
  );
};

const imports = (source: string): string[] =>
  [...source.matchAll(/from\s+['"]([^'"]+)['"]/gu)].map((match) => match[1] ?? '');

describe('Step-3 runtime architecture', () => {
  it('uses public module entrances with the approved dependency direction and no cycle', async () => {
    const sources = await runtimeSources();
    const edges = new Map<string, Set<string>>();
    for (const file of sources) {
      for (const imported of imports(file.source)) {
        const crossModule = imported.match(/^\.\.\/([^/]+)(?:\/(.+))?$/u);
        if (crossModule === null) continue;
        expect(crossModule[2], `${file.module}/${file.name}: ${imported}`).toBeUndefined();
        const target = crossModule[1];
        if (target !== undefined) {
          const targets = edges.get(file.module) ?? new Set<string>();
          targets.add(target);
          edges.set(file.module, targets);
        }
      }
    }

    expect([...(edges.get('application') ?? [])]).toEqual([]);
    expect([...(edges.get('platform') ?? [])]).toEqual(['application']);
    expect([...(edges.get('bootstrap') ?? [])].sort()).toEqual(['application', 'platform']);

    const visit = (module: string, active: Set<string>, complete: Set<string>): void => {
      expect(active.has(module), `circular import through ${module}`).toBe(false);
      if (complete.has(module)) return;
      active.add(module);
      for (const target of edges.get(module) ?? []) visit(target, active, complete);
      active.delete(module);
      complete.add(module);
    };
    const complete = new Set<string>();
    for (const module of ['application', 'platform', 'bootstrap']) {
      visit(module, new Set(), complete);
    }
  });

  it('keeps browser objects with approved owners and temporary adapters fully inactive', async () => {
    const sources = await runtimeSources();
    const application = sources
      .filter((file) => file.module === 'application')
      .map((file) => file.source)
      .join('\n');
    const temporary = sources.find((file) => file.name === 'temporary-adapters.ts')?.source ?? '';

    expect(application).not.toMatch(/\b(?:window|document|indexedDB|AudioContext|HTMLElement)\b/u);
    expect(temporary).not.toMatch(
      /\b(?:window|document|indexedDB|AudioContext|requestAnimationFrame|setTimeout|addEventListener)\b/u,
    );
    expect(temporary).not.toMatch(
      /(?:three|campaign|save payload|fetch|XMLHttpRequest|WebSocket)/iu,
    );
  });

  it('contains no runtime telemetry, external request, or production source-map path', async () => {
    const sources = await runtimeSources();
    const production = sources.map((file) => file.source).join('\n');
    const vite = await readFile(resolve(repositoryRoot, 'vite.config.ts'), 'utf8');

    expect(production).not.toMatch(/\b(?:fetch|XMLHttpRequest|WebSocket|sendBeacon)\b/u);
    expect(production).not.toMatch(/\b(?:localStorage|sessionStorage)\b/u);
    expect(vite).toContain('sourcemap: false');
  });
});
