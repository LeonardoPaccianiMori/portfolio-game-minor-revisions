import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

interface Issue {
  readonly path: string;
  readonly message: string;
}

const contentRoot = join(process.cwd(), 'content');
const issues: Issue[] = [];
let jsonFileCount = 0;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const report = (path: string, message: string): void => {
  issues.push({ path, message });
};

const parseJson = (path: string, source: string): unknown => {
  try {
    return JSON.parse(source) as unknown;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown parse error';
    report(path, `invalid JSON: ${message}`);
    return null;
  }
};

const checkMarkers = (value: unknown, path: string): void => {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      checkMarkers(item, `${path}[${index}]`);
    });
    return;
  }

  if (!isRecord(value)) {
    return;
  }

  if (value['implementationStatus'] === 'incomplete') {
    report(path, 'development-only incomplete marker');
  }

  if (value['placeholder'] === true) {
    report(path, 'placeholder marker');
  }

  for (const [key, child] of Object.entries(value)) {
    checkMarkers(child, `${path}.${key}`);
  }
};

const collectJsonFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const child = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectJsonFiles(child)));
    } else if (entry.name.endsWith('.json')) {
      files.push(child);
    }
  }

  return files;
};

const checkManifest = async (manifestPath: string): Promise<void> => {
  let source: string;
  try {
    source = await readFile(manifestPath, 'utf8');
  } catch {
    report(manifestPath, 'manifest is missing or unreadable');
    return;
  }

  const manifest = parseJson(manifestPath, source);
  if (!isRecord(manifest) || typeof manifest['contentVersion'] !== 'string') {
    report(manifestPath, 'manifest must declare a string contentVersion');
    return;
  }

  if (manifest['completeness'] === 'incomplete') {
    report(manifestPath, 'manifest completeness is incomplete');
  }
};

const main = async (): Promise<void> => {
  await checkManifest(join(contentRoot, 'manifest.json'));

  const files = await collectJsonFiles(contentRoot);
  jsonFileCount = files.length;

  for (const file of files) {
    const source = await readFile(file, 'utf8');
    const value = parseJson(file, source);
    if (value !== null) {
      checkMarkers(value, file);
    }
  }

  if (issues.length > 0) {
    for (const issue of issues) {
      console.error(`${relative(process.cwd(), issue.path)}: ${issue.message}`);
    }
    console.error(`Content check failed with ${issues.length} issue(s).`);
    process.exitCode = 1;
    return;
  }

  console.log(`Content check passed: ${jsonFileCount} JSON file(s).`);
};

await main();
