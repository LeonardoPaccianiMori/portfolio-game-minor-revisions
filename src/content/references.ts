import { CONTENT_FAMILIES } from './types.ts';
import type {
  AuthoredContentItem,
  BuiltContentItem,
  ContentFamily,
  ContentIssue,
} from './types.ts';

type AnyItem = AuthoredContentItem | BuiltContentItem;
type RecordValue = Record<string, unknown>;
interface ExpectedReference {
  readonly family: ContentFamily;
  readonly id: string;
  readonly path: string;
}

const simpleFamily: Readonly<Record<string, ContentFamily>> = {
  actionId: 'actions',
  experimentId: 'experiments',
  recordId: 'records',
  roomStateId: 'roomStates',
  taskId: 'tasks',
  interfaceId: 'interface',
  sceneId: 'scenes',
  eventId: 'events',
  audioId: 'audio',
  locationId: 'locations',
  activationEventId: 'events',
  completionId: 'interface',
};
const arrayFamily: Readonly<Record<string, ContentFamily>> = {
  affectedExperimentIds: 'experiments',
  followupEventIds: 'events',
  locationIds: 'locations',
  scienceDefinitionIds: 'interface',
  resultRefs: 'records',
};

const collect = (value: unknown, path: string, output: ExpectedReference[]): void => {
  if (Array.isArray(value)) {
    for (const [index, entry] of value.entries()) collect(entry, `${path}/${index}`, output);
    return;
  }
  if (typeof value !== 'object' || value === null) return;
  const row = value as RecordValue;
  if (
    typeof row.family === 'string' &&
    CONTENT_FAMILIES.includes(row.family as ContentFamily) &&
    typeof row.id === 'string' &&
    Object.keys(row).every((key) => key === 'family' || key === 'id')
  )
    output.push({ family: row.family as ContentFamily, id: row.id, path: `${path}/id` });
  for (const [key, entry] of Object.entries(row)) {
    const expected = simpleFamily[key];
    if (expected !== undefined && typeof entry === 'string')
      output.push({ family: expected, id: entry, path: `${path}/${key}` });
    const expectedArray = arrayFamily[key];
    if (expectedArray !== undefined && Array.isArray(entry))
      for (const [index, id] of entry.entries())
        if (typeof id === 'string')
          output.push({ family: expectedArray, id, path: `${path}/${key}/${index}` });
    collect(entry, `${path}/${key}`, output);
  }
};

const effectReferenceOverrides = (
  item: AnyItem,
  path: string,
  output: ExpectedReference[],
): void => {
  const walk = (value: unknown, current: string): void => {
    if (Array.isArray(value)) {
      for (const [index, entry] of value.entries()) walk(entry, `${current}/${index}`);
      return;
    }
    if (typeof value !== 'object' || value === null) return;
    const row = value as RecordValue;
    if (row.kind === 'activateTask' && typeof row.taskId === 'string')
      output.push({ family: 'tasks', id: row.taskId, path: `${current}/taskId` });
    if (row.kind === 'recordPrimary' && typeof row.recordId === 'string')
      output.push({ family: 'records', id: row.recordId, path: `${current}/recordId` });
    if (row.kind === 'resolveRoom' && typeof row.roomStateId === 'string')
      output.push({ family: 'roomStates', id: row.roomStateId, path: `${current}/roomStateId` });
    if (row.kind === 'commitManuscript' && typeof row.taskId === 'string')
      output.push({ family: 'tasks', id: row.taskId, path: `${current}/taskId` });
    for (const [key, entry] of Object.entries(row)) walk(entry, `${current}/${key}`);
  };
  walk(item, path);
};

export const validateReferences = (
  families: Readonly<Record<ContentFamily, readonly AnyItem[]>>,
  fileForFamily: (family: ContentFamily) => string,
  selectedOnly: boolean,
): readonly ContentIssue[] => {
  const indexes = {} as Record<ContentFamily, Set<string>>;
  const all = new Map<string, ContentFamily>();
  for (const family of CONTENT_FAMILIES) {
    indexes[family] = new Set(families[family].map((item) => item.id));
    for (const id of indexes[family]) all.set(id, family);
  }
  const issues: ContentIssue[] = [];
  for (const family of CONTENT_FAMILIES)
    for (const [index, item] of families[family].entries()) {
      const references: ExpectedReference[] = [];
      collect(item, `/items/${index}`, references);
      effectReferenceOverrides(item, `/items/${index}`, references);
      const unique = new Map<string, ExpectedReference>();
      for (const reference of references)
        unique.set(`${reference.family}|${reference.id}|${reference.path}`, reference);
      for (const reference of unique.values())
        if (!indexes[reference.family].has(reference.id)) {
          const actual = all.get(reference.id);
          issues.push({
            code: actual === undefined ? 'missingReference' : 'wrongReferenceFamily',
            file: fileForFamily(family),
            path: reference.path,
            idOrKey: item.id,
          });
        }
      const row = item as unknown as RecordValue;
      if (family === 'roomStates' && Array.isArray(row.routes)) {
        const routeIds = new Set(
          row.routes.flatMap((route) =>
            typeof route === 'object' &&
            route !== null &&
            typeof (route as RecordValue).id === 'string'
              ? [(route as RecordValue).id as string]
              : [],
          ),
        );
        if (typeof row.expiryRouteId === 'string' && !routeIds.has(row.expiryRouteId))
          issues.push({
            code: 'missingReference',
            file: fileForFamily(family),
            path: `/items/${index}/expiryRouteId`,
            idOrKey: item.id,
          });
      }
      if (family === 'scenes' && typeof row.eventId === 'string') {
        const event = families.events.find(
          (candidate) => candidate.id === row.eventId,
        ) as unknown as RecordValue | undefined;
        const target = event?.delivery as RecordValue | undefined;
        if (
          target?.kind !== 'scene' ||
          typeof target.target !== 'object' ||
          target.target === null ||
          (target.target as RecordValue).id !== item.id
        )
          issues.push({
            code: selectedOnly ? 'excludedDependency' : 'invariantFailure',
            file: fileForFamily(family),
            path: `/items/${index}/eventId`,
            idOrKey: item.id,
          });
      }
    }
  return issues;
};

export const validateReplacementGraph = (
  profiles: readonly {
    readonly id: string;
    readonly replacements: readonly {
      readonly family: ContentFamily;
      readonly fromId: string;
      readonly toId: string;
    }[];
  }[],
): readonly ContentIssue[] => {
  const issues: ContentIssue[] = [];
  for (const profile of profiles) {
    const targets = new Set<string>();
    const sources = new Set(profile.replacements.map((entry) => `${entry.family}|${entry.fromId}`));
    for (const [index, replacement] of profile.replacements.entries()) {
      const target = `${replacement.family}|${replacement.toId}`;
      if (targets.has(target) || sources.has(target))
        issues.push({
          code: sources.has(target) ? 'circularReference' : 'invalidProfile',
          file: `content/profiles/${profile.id}.json`,
          path: `/replacements/${index}`,
          idOrKey: replacement.fromId,
        });
      targets.add(target);
    }
  }
  return issues;
};
