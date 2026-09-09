import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { access, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const runFile = promisify(execFile);
const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const vite = 'vite';
const outputRoot = resolve(repositoryRoot, 'local-artifacts/build-profiles');
const absent = async (path: string): Promise<boolean> =>
  await access(path).then(
    () => false,
    () => true,
  );

const runBuild = async (mode: string | null, name: string) => {
  const output = resolve(outputRoot, name);
  await mkdir(output, { recursive: true });
  await writeFile(resolve(output, 'stale.txt'), 'stale');
  const args = ['build', '--outDir', `local-artifacts/build-profiles/${name}`];
  if (mode !== null) args.push('--mode', mode);
  try {
    const result = await runFile(vite, args, { cwd: repositoryRoot });
    return { kind: 'success' as const, output, text: `${result.stdout}${result.stderr}` };
  } catch (error) {
    const failure = error as { stdout?: string; stderr?: string };
    return {
      kind: 'failure' as const,
      output,
      text: `${failure.stdout ?? ''}${failure.stderr ?? ''}`,
    };
  }
};

for (const [mode, name, code] of [
  [null, 'default', 'incompleteProfile'],
  ['full', 'full', 'incompleteProfile'],
  ['fallback', 'fallback', 'incompleteProfile'],
  ['unlisted', 'unknown', 'invalidProfile'],
] as const) {
  void test(`${name} Vite build rejects safely and removes its output`, async () => {
    const result = await runBuild(mode, name);
    assert.equal(result.kind, 'failure');
    assert.match(result.text, new RegExp(`CONTENT_BUILD:${code}`, 'u'));
    assert.equal(await absent(result.output), true);
  });
}

void test('slice Vite build contains only its validated package identity and strings', async () => {
  const result = await runBuild('slice', 'slice');
  assert.equal(result.kind, 'success');
  const files = await readdir(result.output, { recursive: true });
  const text = (
    await Promise.all(
      files
        .filter((name) => name.endsWith('.js') || name.endsWith('.html'))
        .map((name) => readFile(resolve(result.output, name), 'utf8')),
    )
  ).join('\n');
  assert.match(text, /minor-revisions-content/u);
  assert.match(text, /1\.1\.0/u);
  assert.match(text, /profileId:`slice`/u);
  assert.match(text, /Game content could not be verified/u);
  assert.doesNotMatch(text, /ending\.career\.aldercroft/u);
  assert.equal(await absent(resolve(result.output, 'stale.txt')), true);
  await rm(result.output, { recursive: true, force: true });
});
