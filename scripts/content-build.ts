import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createBuiltContentPackage, validateSourceCatalogue } from '../src/content/source.ts';
import { ALL_SOURCE_FILES } from '../src/content/schemas.ts';
import type {
  BuiltContentPackage,
  ContentIssueCode,
  ContentProfile,
  ContentResult,
  RawSourceFiles,
} from '../src/content/types.ts';

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputRoot = resolve(repositoryRoot, 'local-artifacts/content-build');

export const profileForMode = (mode: string): ContentResult<ContentProfile> => {
  if (mode === 'development' || mode === 'production' || mode === 'full')
    return { kind: 'valid', value: 'full' };
  if (mode === 'fallback' || mode === 'slice') return { kind: 'valid', value: mode };
  return {
    kind: 'invalid',
    issues: [{ code: 'invalidProfile', file: 'build-profile', path: '/mode', idOrKey: null }],
  };
};

export const readSourceFiles = async (): Promise<RawSourceFiles> => {
  const files = new Map<string, Uint8Array>();
  for (const path of ALL_SOURCE_FILES)
    files.set(path, await readFile(resolve(repositoryRoot, path)));
  return files;
};

export const buildContentForMode = async (
  mode: string,
): Promise<ContentResult<BuiltContentPackage>> => {
  const selected = profileForMode(mode);
  if (selected.kind === 'invalid') return selected;
  const source = validateSourceCatalogue(await readSourceFiles());
  if (source.kind === 'invalid') return source;
  return createBuiltContentPackage(source.value, selected.value);
};

const firstCode = (
  result: Extract<ContentResult<unknown>, { readonly kind: 'invalid' }>,
): ContentIssueCode => result.issues[0]?.code ?? 'invalidObject';

export const writeContentForMode = async (
  mode: string,
  outputName: string,
): Promise<ContentResult<BuiltContentPackage>> => {
  if (!/^[a-z0-9-]{1,48}$/u.test(outputName))
    return {
      kind: 'invalid',
      issues: [
        { code: 'invalidProfile', file: 'build-profile', path: '/outputName', idOrKey: null },
      ],
    };
  const outputDirectory = resolve(outputRoot, outputName);
  if (!outputDirectory.startsWith(`${outputRoot}/`))
    return {
      kind: 'invalid',
      issues: [
        { code: 'invalidProfile', file: 'build-profile', path: '/outputName', idOrKey: null },
      ],
    };
  await rm(outputDirectory, { recursive: true, force: true });
  const result = await buildContentForMode(mode);
  if (result.kind === 'invalid') return result;
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(
    resolve(outputDirectory, 'content-package.json'),
    `${JSON.stringify(result.value)}\n`,
    'utf8',
  );
  return result;
};

const run = async (): Promise<void> => {
  const args = process.argv.slice(2);
  const modeIndex = args.indexOf('--mode');
  const outputIndex = args.indexOf('--output-name');
  const mode = modeIndex >= 0 ? args[modeIndex + 1] : undefined;
  const outputName = outputIndex >= 0 ? args[outputIndex + 1] : undefined;
  if (mode === undefined || outputName === undefined) {
    process.stderr.write('CONTENT_BUILD:invalidProfile\n');
    process.exitCode = 1;
    return;
  }
  const result = await writeContentForMode(mode, outputName);
  if (result.kind === 'invalid') {
    process.stderr.write(`CONTENT_BUILD:${firstCode(result)}\n`);
    process.exitCode = 1;
    return;
  }
  process.stdout.write(`CONTENT_BUILD:valid:${result.value.metadata.profileId}\n`);
};

if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  await run();
