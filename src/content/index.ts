import { validateCampaignState } from '../rules';
import type { CampaignState, CheckedResult } from '../rules';
import type { BuiltMetadata, ContentRulesView } from './types.ts';

const connectedFailure = (path: string): CheckedResult<never> => ({
  kind: 'failure',
  issue: { path, reason: 'invalidReference' },
});

export const validateCampaignStateAgainstContent = (
  state: CampaignState,
  metadata: BuiltMetadata,
  rules: ContentRulesView,
): CheckedResult<CampaignState> => {
  if (
    typeof state === 'object' &&
    state !== null &&
    metadata?.profileId === 'slice' &&
    state.metadata?.buildProfileId === 'slice'
  ) {
    const selectedRecordIds = new Set(rules?.families?.records?.map((item) => item.id) ?? []);
    const selectedRoomIds = new Set(rules?.families?.roomStates?.map((item) => item.id) ?? []);
    const reviewers = state.manuscript?.reviewerReportsById;
    for (const id of ['MR-REC-REVIEWER-1', 'MR-REC-REVIEWER-2', 'MR-REC-REVIEWER-3'] as const)
      if (
        !selectedRecordIds.has(id) &&
        typeof reviewers?.[id] === 'object' &&
        reviewers[id] !== null &&
        reviewers[id].form !== null
      )
        return connectedFailure(`/manuscript/reviewerReportsById/${id}/form`);
    const rooms = state.world?.roomStatesById;
    for (const id of ['MR-ROOM-IMAGING-BOOKING', 'MR-ROOM-IMAGING-SERVICE-LIMIT'] as const)
      if (
        !selectedRoomIds.has(id) &&
        typeof rooms?.[id] === 'object' &&
        rooms[id] !== null &&
        rooms[id].condition !== 'inactive'
      )
        return connectedFailure(`/world/roomStatesById/${id}/condition`);
  }
  const checked = validateCampaignState(state);
  if (checked.kind === 'failure') return checked;
  const value = checked.value;
  if (value.metadata.buildProfileId !== metadata.profileId)
    return connectedFailure('/metadata/buildProfileId');
  if (value.metadata.contentVersion !== metadata.contentVersion)
    return connectedFailure('/metadata/contentVersion');

  type Data = Record<string, unknown>;
  const asData = (candidate: unknown): Data | null =>
    typeof candidate === 'object' && candidate !== null && !Array.isArray(candidate)
      ? (candidate as Data)
      : null;
  const topIds = new Map<string, string>();
  const experimentOptions = new Map<string, { readonly ownerId: string; readonly kind: string }>();
  const biologicalResults = new Map<string, { readonly ownerId: string; readonly value: string }>();
  const scienceDefinitions = new Map<string, string>();
  const choices = new Map<
    string,
    { readonly ownerId: string; readonly optionIds: ReadonlySet<string> }
  >();
  const options = new Map<string, string>();
  const formsByScene = new Map<string, ReadonlySet<string>>();
  for (const [family, items] of Object.entries(rules.families))
    for (const item of items) {
      topIds.set(item.id, family);
      const row = item as unknown as Data;
      if (family === 'experiments') {
        for (const candidate of Array.isArray(row.options) ? row.options : []) {
          const option = asData(candidate);
          if (typeof option?.id === 'string' && typeof option.kind === 'string')
            experimentOptions.set(option.id, { ownerId: item.id, kind: option.kind });
        }
        for (const candidate of Array.isArray(row.biologicalResults) ? row.biologicalResults : []) {
          const result = asData(candidate);
          if (typeof result?.id === 'string' && typeof result.value === 'string')
            biologicalResults.set(result.id, { ownerId: item.id, value: result.value });
        }
      }
      if (family === 'interface') {
        if (row.type === 'scienceDefinition' && typeof row.kind === 'string')
          scienceDefinitions.set(item.id, row.kind);
      }
      if (family === 'scenes') {
        const formIds = new Set<string>();
        for (const candidate of [row.baseForm, row.conditionalForm]) {
          const form = asData(candidate);
          if (typeof form?.id === 'string') formIds.add(form.id);
        }
        formsByScene.set(item.id, formIds);
      }
      if (family === 'scenes' || family === 'messages' || family === 'tasks')
        for (const candidate of Array.isArray(row.choices) ? row.choices : []) {
          const choice = asData(candidate);
          if (typeof choice?.id !== 'string') continue;
          const optionIds = new Set<string>();
          for (const optionCandidate of Array.isArray(choice.options) ? choice.options : []) {
            const option = asData(optionCandidate);
            if (typeof option?.id === 'string') {
              optionIds.add(option.id);
              options.set(option.id, choice.id);
            }
          }
          choices.set(choice.id, { ownerId: item.id, optionIds });
        }
    }
  const requireTop = (id: string, family: string, path: string): CheckedResult<never> | null =>
    topIds.get(id) === family ? null : connectedFailure(path);
  const requireAnyTop = (
    id: string,
    families: readonly string[],
    path: string,
  ): CheckedResult<never> | null =>
    families.includes(topIds.get(id) ?? '') ? null : connectedFailure(path);

  const dormantReviewers = new Set(['MR-REC-REVIEWER-1', 'MR-REC-REVIEWER-2', 'MR-REC-REVIEWER-3']);
  for (const id of Object.keys(value.manuscript.reviewerReportsById).sort()) {
    const report = value.manuscript.reviewerReportsById[id]!;
    if (topIds.get(id) === 'records') continue;
    if (
      metadata.profileId === 'slice' &&
      value.metadata.buildProfileId === 'slice' &&
      dormantReviewers.has(id) &&
      report.form === null
    )
      continue;
    return connectedFailure(
      `/manuscript/reviewerReportsById/${id}/${dormantReviewers.has(id) ? 'form' : 'id'}`,
    );
  }

  const dormantRooms = new Set(['MR-ROOM-IMAGING-BOOKING', 'MR-ROOM-IMAGING-SERVICE-LIMIT']);
  for (const id of Object.keys(value.world.roomStatesById).sort()) {
    const room = value.world.roomStatesById[id]!;
    if (topIds.get(id) === 'roomStates') continue;
    if (
      metadata.profileId === 'slice' &&
      value.metadata.buildProfileId === 'slice' &&
      dormantRooms.has(id) &&
      room.condition === 'inactive'
    )
      continue;
    return connectedFailure(
      `/world/roomStatesById/${id}/${dormantRooms.has(id) ? 'condition' : 'id'}`,
    );
  }

  const checks: readonly [Readonly<Record<string, object>>, string, string][] = [
    [value.narrative.scenesById, 'scenes', '/narrative/scenesById'],
    [value.narrative.scheduler.eventsById, 'events', '/narrative/scheduler/eventsById'],
    [value.narrative.messagesById, 'messages', '/narrative/messagesById'],
    [value.narrative.requestsById, 'tasks', '/narrative/requestsById'],
    [value.manuscript.revisionTasksById, 'tasks', '/manuscript/revisionTasksById'],
    [value.relationships.byId, 'characters', '/relationships/byId'],
  ];
  for (const [collection, family, path] of checks)
    for (const id of Object.keys(collection).sort()) {
      const failure = requireTop(id, family, `${path}/${id}`);
      if (failure !== null) return failure;
    }
  for (const [id, scene] of Object.entries(value.narrative.scenesById).sort())
    if (scene.authoredFormId !== null && !formsByScene.get(id)?.has(scene.authoredFormId))
      return connectedFailure(`/narrative/scenesById/${id}/authoredFormId`);
  for (const [id, message] of Object.entries(value.narrative.messagesById).sort()) {
    if (message.replyId === null) continue;
    const choiceId = options.get(message.replyId);
    if (choiceId === undefined || choices.get(choiceId)?.ownerId !== id)
      return connectedFailure(`/narrative/messagesById/${id}/replyId`);
  }
  for (const [id, request] of Object.entries(value.narrative.requestsById).sort()) {
    if (request.responseId === null) continue;
    const choiceId = options.get(request.responseId);
    if (choiceId === undefined || choices.get(choiceId)?.ownerId !== id)
      return connectedFailure(`/narrative/requestsById/${id}/responseId`);
  }
  for (const [id, relationship] of Object.entries(value.relationships.byId).sort())
    if (
      relationship.lastConsequentialSceneId !== null &&
      topIds.get(relationship.lastConsequentialSceneId) !== 'scenes'
    )
      return connectedFailure(`/relationships/byId/${id}/lastConsequentialSceneId`);
  for (const [id, placement] of Object.entries(value.world.characterPlacementsById).sort()) {
    const failure = requireTop(id, 'characters', `/world/characterPlacementsById/${id}`);
    if (failure !== null) return failure;
    void placement;
  }
  for (const [id, run] of Object.entries(value.experiments.runsById).sort()) {
    const failure = requireTop(
      run.templateId,
      'experiments',
      `/experiments/runsById/${id}/templateId`,
    );
    if (failure !== null) return failure;
    for (const [field, reference, kind] of [
      ['goalId', run.goalId, 'goal'],
      ['controlId', run.controlId, 'control'],
      ['observationId', run.observationId, 'observation'],
      ['familyChoiceId', run.familyChoiceId, 'familyChoice'],
      ['equipmentId', run.equipmentId, 'equipment'],
    ] as const)
      if (
        experimentOptions.get(reference)?.ownerId !== run.templateId ||
        experimentOptions.get(reference)?.kind !== kind
      )
        return connectedFailure(`/experiments/runsById/${id}/${field}`);
  }
  for (const [id, raw] of Object.entries(value.experiments.rawRecordsById).sort())
    for (const [field, reference, kind] of [
      ['biologicalResultId', raw.biologicalResultId, 'biological'],
      ['structureResultId', raw.structureResultId, 'structure'],
      ['rhythmResultId', raw.rhythmResultId, 'rhythm'],
      ['repatterningResultId', raw.repatterningResultId, 'repatterning'],
      ['controlResultId', raw.controlResultId, 'control'],
    ] as const)
      if (
        kind === 'biological'
          ? biologicalResults.get(reference)?.ownerId !==
            value.experiments.runsById[raw.runId]?.templateId
          : scienceDefinitions.get(reference) !== kind
      )
        return connectedFailure(`/experiments/rawRecordsById/${id}/${field}`);
  for (const [id, card] of Object.entries(value.experiments.evidenceCardsById).sort()) {
    if (scienceDefinitions.get(card.selectedReadingId) !== 'reading')
      return connectedFailure(`/experiments/evidenceCardsById/${id}/selectedReadingId`);
    if (scienceDefinitions.get(card.selectedCaveatId) !== 'caveat')
      return connectedFailure(`/experiments/evidenceCardsById/${id}/selectedCaveatId`);
  }
  const histories: readonly [readonly string[], readonly string[], string][] = [
    [
      value.contentHistory.completedContentIds,
      ['scenes', 'events', 'tasks', 'roomStates', 'tutorials'],
      '/contentHistory/completedContentIds',
    ],
    [
      value.contentHistory.expiredContentIds,
      ['events', 'messages', 'tasks'],
      '/contentHistory/expiredContentIds',
    ],
    [value.contentHistory.readMessageIds, ['messages'], '/contentHistory/readMessageIds'],
    [
      value.contentHistory.consumedContextualContentIds,
      ['contextualLines', 'notifications'],
      '/contentHistory/consumedContextualContentIds',
    ],
    [
      value.contentHistory.displayedEnvironmentalTextIds,
      ['environmentalItems'],
      '/contentHistory/displayedEnvironmentalTextIds',
    ],
    [
      value.contentHistory.recordedSceneClosingIds,
      ['scenes'],
      '/contentHistory/recordedSceneClosingIds',
    ],
    [
      value.contentHistory.recordedSceneRecapIds,
      ['scenes'],
      '/contentHistory/recordedSceneRecapIds',
    ],
    [value.contentHistory.citationIds, ['citations'], '/contentHistory/citationIds'],
  ];
  for (const [ids, families, path] of histories)
    for (const [index, id] of ids.entries()) {
      const failure = requireAnyTop(id, families, `${path}/${index}`);
      if (failure !== null) return failure;
    }
  for (const [choiceId, optionId] of Object.entries(
    value.contentHistory.selectedVariantsById,
  ).sort())
    if (!choices.get(choiceId)?.optionIds.has(optionId) || options.get(optionId) !== choiceId)
      return connectedFailure(`/contentHistory/selectedVariantsById/${choiceId}`);
  for (const omitted of [...dormantReviewers, ...dormantRooms]) {
    const referenced = histories.some(([ids]) => ids.includes(omitted));
    if (referenced) return connectedFailure('/contentHistory');
  }
  return { kind: 'success', value };
};

export { createBuiltContentPackage, validateSourceCatalogue } from './source.ts';
export { validateContentPackage } from './views.ts';
export type {
  BuiltContentPackage,
  BuiltMetadata,
  ContentFamily,
  ContentIssue,
  ContentIssueCode,
  ContentPresentationView,
  ContentProfile,
  ContentResult,
  ContentRulesView,
  RawSourceFiles,
  ValidatedContent,
  ValidatedSourceCatalogue,
} from './types.ts';
