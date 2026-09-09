import { decodeJsonFile } from './json.ts';
import {
  collectSelectedTextKeys,
  selectBuiltFamilies,
  SLICE_STRING_KEYS,
  validateProfileContracts,
} from './profiles.ts';
import { validateReferences, validateReplacementGraph } from './references.ts';
import {
  ALL_SOURCE_FILES,
  DATA_FILE_BY_FAMILY,
  PROFILE_FILES,
  countUniqueWords,
  validateDataEnvelope,
  validateManifestShape,
  validateProfileShape,
  validateStringsShape,
} from './schemas.ts';
import { validateSemanticContent } from './semantics.ts';
import type {
  AuthoredContentItem,
  BuiltContentPackage,
  ContentFamily,
  ContentIssue,
  ContentProfile,
  ContentResult,
  ProfileSource,
  RawSourceFiles,
  SourceManifest,
  ValidatedSourceCatalogue,
} from './types.ts';
import { CONTENT_FAMILIES } from './types.ts';

interface SourceData {
  readonly manifest: SourceManifest;
  readonly families: Readonly<Record<ContentFamily, readonly AuthoredContentItem[]>>;
  readonly strings: Readonly<Record<string, string>>;
  readonly profiles: Readonly<Record<ContentProfile, ProfileSource>>;
}
const checkedSources = new WeakMap<object, SourceData>();

const orderedFiles = new Map(ALL_SOURCE_FILES.map((file, index) => [file, index]));
const invalid = (issues: readonly ContentIssue[]): ContentResult<never> => ({
  kind: 'invalid',
  issues: [...issues].sort(
    (a, b) =>
      (orderedFiles.get(a.file) ?? 999) - (orderedFiles.get(b.file) ?? 999) ||
      String(a.idOrKey ?? '').localeCompare(String(b.idOrKey ?? '')) ||
      a.path.localeCompare(b.path) ||
      a.code.localeCompare(b.code),
  ),
});

const freeze = <T>(value: T, seen = new WeakSet<object>()): T => {
  if (typeof value !== 'object' || value === null || seen.has(value)) return value;
  seen.add(value);
  for (const child of Object.values(value as object)) freeze(child, seen);
  return Object.freeze(value);
};

const referencedKeyIssues = (
  families: Readonly<Record<ContentFamily, readonly AuthoredContentItem[]>>,
  strings: Readonly<Record<string, string>>,
): readonly ContentIssue[] => {
  const built = {} as Record<ContentFamily, readonly import('./types').BuiltContentItem[]>;
  for (const family of CONTENT_FAMILIES)
    built[family] = families[family].map((item) => {
      const { trace, ...copy } = item;
      void trace;
      return copy;
    });
  return collectSelectedTextKeys(built).flatMap((key) =>
    Object.hasOwn(strings, key)
      ? []
      : [
          {
            code: 'missingReference' as const,
            file: 'content/strings.en.json',
            path: `/${key.replaceAll('~', '~0').replaceAll('/', '~1')}`,
            idOrKey: key,
          },
        ],
  );
};

export const validateSourceCatalogue = (
  raw: RawSourceFiles,
): ContentResult<ValidatedSourceCatalogue> => {
  const pathIssues: ContentIssue[] = [];
  if (!(raw instanceof Map))
    return invalid([
      { code: 'invalidManifest', file: 'content/manifest.json', path: '/', idOrKey: null },
    ]);
  const sourceFiles: RawSourceFiles = raw;
  for (const file of ALL_SOURCE_FILES)
    if (!sourceFiles.has(file))
      pathIssues.push({ code: 'invalidManifest', file, path: '/', idOrKey: null });
  for (const file of sourceFiles.keys())
    if (!orderedFiles.has(file))
      pathIssues.push({
        code: 'invalidManifest',
        file: 'content/manifest.json',
        path: '/dataFiles',
        idOrKey: null,
      });
  if (pathIssues.length > 0) return invalid(pathIssues);
  const parsed = new Map<string, unknown>();
  const parseIssues: ContentIssue[] = [];
  for (const file of ALL_SOURCE_FILES) {
    const bytes = sourceFiles.get(file);
    if (!(bytes instanceof Uint8Array)) {
      parseIssues.push({ code: 'malformedJson', file, path: '/', idOrKey: null });
      continue;
    }
    const decoded = decodeJsonFile(
      bytes,
      file,
      file === 'content/strings.en.json' ? 'duplicateTextKey' : 'malformedJson',
    );
    if (decoded.kind === 'invalid') parseIssues.push(...decoded.issues);
    else parsed.set(file, decoded.value);
  }
  if (parseIssues.length > 0) return invalid(parseIssues);
  const manifestResult = validateManifestShape(parsed.get('content/manifest.json'));
  if (manifestResult.kind === 'invalid') return invalid(manifestResult.issues);
  const families = {} as Record<ContentFamily, readonly AuthoredContentItem[]>;
  const shapeIssues: ContentIssue[] = [];
  for (const family of CONTENT_FAMILIES) {
    const checked = validateDataEnvelope(parsed.get(DATA_FILE_BY_FAMILY[family]), family);
    if (checked.kind === 'invalid') shapeIssues.push(...checked.issues);
    else families[family] = checked.value;
  }
  const stringsResult = validateStringsShape(parsed.get('content/strings.en.json'));
  if (stringsResult.kind === 'invalid') shapeIssues.push(...stringsResult.issues);
  const profiles = {} as Record<ContentProfile, ProfileSource>;
  for (const [index, id] of (['full', 'fallback', 'slice'] as const).entries()) {
    const checked = validateProfileShape(parsed.get(PROFILE_FILES[index]!), id);
    if (checked.kind === 'invalid') shapeIssues.push(...checked.issues);
    else profiles[id] = checked.value;
  }
  if (shapeIssues.length > 0) return invalid(shapeIssues);
  const strings = stringsResult.kind === 'valid' ? stringsResult.value : {};
  const referenceIssues = [
    ...validateReferences(families, (family) => DATA_FILE_BY_FAMILY[family], false),
    ...referencedKeyIssues(families, strings),
  ];
  if (referenceIssues.length > 0) return invalid(referenceIssues);
  const semanticIssues = validateSemanticContent(families, (family) => DATA_FILE_BY_FAMILY[family]);
  if (semanticIssues.length > 0) return invalid(semanticIssues);
  const profileIssues = [
    ...validateProfileContracts(profiles),
    ...validateReplacementGraph(Object.values(profiles)),
  ];
  if (profileIssues.length > 0) return invalid(profileIssues);
  const data = freeze(
    structuredClone({ manifest: manifestResult.value, families, strings, profiles }),
  );
  const opaque = freeze({}) as ValidatedSourceCatalogue;
  checkedSources.set(opaque, data);
  return { kind: 'valid', value: opaque };
};

export const createBuiltContentPackage = (
  source: ValidatedSourceCatalogue,
  profileId: ContentProfile,
): ContentResult<BuiltContentPackage> => {
  const data = checkedSources.get(source);
  if (data === undefined)
    return invalid([{ code: 'invalidObject', file: 'built-content', path: '/', idOrKey: null }]);
  const profile = data.profiles[profileId];
  if (profile === undefined)
    return invalid([
      { code: 'invalidProfile', file: 'built-content', path: '/metadata/profileId', idOrKey: null },
    ]);
  if (profile.implementationStatus !== 'complete')
    return invalid([
      {
        code: 'incompleteProfile',
        file: `content/profiles/${profileId}.json`,
        path: '/implementationStatus',
        idOrKey: null,
      },
    ]);
  const selected = selectBuiltFamilies(data.families, profile);
  if (selected.issues.length > 0) return invalid(selected.issues);
  const refIssues = validateReferences(selected.families, () => 'built-content', true);
  if (refIssues.length > 0) return invalid(refIssues);
  const semanticIssues = validateSemanticContent(selected.families, () => 'built-content');
  if (semanticIssues.length > 0) return invalid(semanticIssues);
  const selectedKeys = collectSelectedTextKeys(selected.families);
  const issues: ContentIssue[] = [];
  const strings: Record<string, string> = {};
  for (const key of selectedKeys) {
    const value = data.strings[key];
    if (value === undefined)
      issues.push({
        code: 'excludedDependency',
        file: 'built-content',
        path: `/strings/${key}`,
        idOrKey: key,
      });
    else strings[key] = value;
  }
  if (profileId === 'slice' && JSON.stringify(selectedKeys) !== JSON.stringify(SLICE_STRING_KEYS))
    issues.push({ code: 'countMismatch', file: 'built-content', path: '/strings', idOrKey: null });
  if (issues.length > 0) return invalid(issues);
  if (countUniqueWords(strings) > 6000)
    return invalid([
      { code: 'wordLimitExceeded', file: 'built-content', path: '/strings', idOrKey: null },
    ]);
  const expectedCounts = Object.fromEntries(
    CONTENT_FAMILIES.map((family) => [family, profile.expectedCounts[family]]),
  ) as unknown as import('./types').FamilyCounts;
  const built: BuiltContentPackage = {
    metadata: {
      packageId: 'minor-revisions-content',
      schemaVersion: 1,
      contentVersion: data.manifest.contentVersion,
      language: 'en',
      profileId,
      compatibleEarlierVersions: [...data.manifest.compatibleEarlierVersions],
      expectedCounts,
    },
    families: selected.families,
    strings,
  };
  return { kind: 'valid', value: freeze(structuredClone(built)) };
};
