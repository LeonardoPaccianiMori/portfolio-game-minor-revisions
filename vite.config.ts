import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

import { buildContentForMode } from './scripts/content-build.ts';

const virtualContentId = 'virtual:minor-revisions-content';
const resolvedVirtualContentId = `\0${virtualContentId}`;

const contentPlugin = (mode: string, command: 'build' | 'serve'): Plugin => {
  let outputDirectory: string | null = null;
  let contentResult: Awaited<ReturnType<typeof buildContentForMode>> | null = null;
  return {
    name: 'minor-revisions-content',
    enforce: 'pre',
    configResolved(config) {
      const candidate = resolve(config.root, config.build.outDir);
      const safeBuildRoot = resolve(config.root, 'local-artifacts/build-profiles');
      const defaultOutput = resolve(config.root, 'dist');
      outputDirectory =
        candidate === defaultOutput || candidate.startsWith(`${safeBuildRoot}/`) ? candidate : null;
    },
    async buildStart() {
      if (command !== 'build') return;
      if (outputDirectory !== null) await rm(outputDirectory, { recursive: true, force: true });
      contentResult = await buildContentForMode(mode);
      if (contentResult.kind === 'invalid') {
        const code = contentResult.issues[0]?.code ?? 'invalidObject';
        throw new Error(`CONTENT_BUILD:${code}`);
      }
    },
    resolveId(id) {
      return id === virtualContentId ? resolvedVirtualContentId : null;
    },
    async load(id) {
      if (id !== resolvedVirtualContentId) return null;
      contentResult ??= await buildContentForMode(mode);
      return `export default ${JSON.stringify(contentResult)};`;
    },
  };
};

export default defineConfig(({ command, mode }) => ({
  base: './',
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    sourcemap: false,
    target: 'es2022',
  },
  envDir: false,
  plugins: [contentPlugin(mode, command)],
  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
}));
