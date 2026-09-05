import { describe, expect, it } from 'vitest';

import { createInitialCampaignState, validateCampaignState } from '../../../src/rules';
import type {
  CampaignState,
  ChangeRecord,
  ExperimentRun,
  ManuscriptRequirementResults,
} from '../../../src/rules/campaign-state-types';
import { copyCampaign, initialCampaign, standardInput } from './campaign-test-data';

describe('MR-IF-002 v4 campaign creation', () => {
  it('creates the complete fixed Standard starting state', () => {
    const result = createInitialCampaignState(standardInput);
    expect(result.kind).toBe('success');
    if (result.kind === 'failure') return;
    expect(result.value).toEqual({
      metadata: {
        schemaVersion: 1,
        contentVersion: '1.0.0',
        campaignId: standardInput.campaignId,
        campaignSeed: 305_419_896,
        stateRevision: 0,
        buildProfileId: 'full',
        pressureProfile: 'standard',
      },
      calendar: { periodIndex: 0, pendingCrash: false, crashPeriods: [] },
      campaignValues: {
        energy: 4,
        evidence: 3,
        elenaPaperConfidence: 45,
        integrity: 100,
        integrityRecoveryUsed: 0,
        histories: {
          energy: [],
          evidence: [],
          elenaPaperConfidence: [],
          integrity: [],
          integrityRecoveryUsed: [],
        },
      },
      experiments: {
        equipmentById: {},
        preparationById: {},
        runsById: {},
        activeRunIds: [],
        rawRecordsById: {},
        evidenceCardsById: {},
        stopLogsById: {},
      },
      manuscript: {
        board: {
          claim: null,
          claimLevel: null,
          figures: [null, null, null],
          controls: [null, null],
          caveat: null,
          authorship: null,
          supplementary: null,
          activeRequest: null,
        },
        snapshotsById: {},
        snapshotOrder: [],
        currentSnapshotId: null,
        revisionTasksById: {},
        reviewerReportsById: {
          'MR-REC-REVIEWER-1': { id: 'MR-REC-REVIEWER-1', form: null },
          'MR-REC-REVIEWER-2': { id: 'MR-REC-REVIEWER-2', form: null },
          'MR-REC-REVIEWER-3': { id: 'MR-REC-REVIEWER-3', form: null },
        },
        preprintState: 'notPosted',
        journalState: 'notSubmitted',
        finalPaperState: null,
        piimCards: { batch: null, oxygen: null, claim: null },
        piimCardSources: {
          batchEvidenceCardId: null,
          oxygenEvidenceCardId: null,
          claimSnapshotId: null,
        },
        piimMilestones: {
          publicPreprintRevision: null,
          journalChainRevision: null,
          reviewerReportsRevision: null,
          piimCardsRevision: null,
          piimOutcomeRevision: null,
        },
        piimOutcome: null,
        authorship: { haoran: 'notIncluded', samira: 'notIncluded' },
        reportedReadingsByEvidenceId: {},
        omittedEvidenceIds: [],
        committedEffectIds: [],
      },
      narrative: {
        protagonist: { name: 'Morgan', pronounSet: 'theyThem' },
        careerProgress: {
          researchPlanCompletedPeriod: null,
          camilaReplySent: false,
          morrowVideoCompleted: false,
          fabricationConfessedToCamila: false,
        },
        scenesById: {
          'MR-SCN-CLARIFIED': {
            id: 'MR-SCN-CLARIFIED',
            state: 'queued',
            authoredFormId: null,
            finalPresentationState: null,
          },
        },
        messagesById: {},
        requestsById: {},
        concernsById: {},
        routesById: {
          aldercroft: {
            id: 'aldercroft',
            state: 'locked',
            evaluated: false,
            evaluation: null,
            closureReason: null,
          },
          morrow: {
            id: 'morrow',
            state: 'locked',
            evaluated: false,
            evaluation: null,
            closureReason: null,
          },
        },
        scheduler: {
          eventsById: {
            'MR-SCN-CLARIFIED': {
              id: 'MR-SCN-CLARIFIED',
              state: 'queued',
              firstEligiblePeriod: 0,
              resolvedPeriod: null,
            },
          },
          queue: ['MR-SCN-CLARIFIED'],
          activeEventId: null,
          lastSchedulerRevision: 0,
        },
      },
      relationships: {
        byId: {
          'MR-CHR-CAMILA': {
            id: 'MR-CHR-CAMILA',
            trust: 40,
            introduced: false,
            permanentBreach: false,
            supportConsumed: false,
            lastConsequentialSceneId: null,
            history: [],
          },
          'MR-CHR-ELENA': {
            id: 'MR-CHR-ELENA',
            trust: 60,
            introduced: true,
            permanentBreach: false,
            supportConsumed: false,
            lastConsequentialSceneId: null,
            history: [],
          },
          'MR-CHR-GABRIEL': {
            id: 'MR-CHR-GABRIEL',
            trust: 60,
            introduced: true,
            permanentBreach: false,
            supportConsumed: false,
            lastConsequentialSceneId: null,
            history: [],
          },
          'MR-CHR-HAORAN': {
            id: 'MR-CHR-HAORAN',
            trust: 60,
            introduced: true,
            permanentBreach: false,
            supportConsumed: false,
            lastConsequentialSceneId: null,
            history: [],
          },
          'MR-CHR-SAMIRA': {
            id: 'MR-CHR-SAMIRA',
            trust: 40,
            introduced: true,
            permanentBreach: false,
            supportConsumed: false,
            lastConsequentialSceneId: null,
            history: [],
          },
        },
      },
      world: {
        floorAct: 'orderlyButOverbooked',
        safeAnchorId: 'MR-ANCHOR-REC-SHARED-DESKS',
        characterPlacementsById: {
          'MR-CHR-ELENA': { id: 'MR-CHR-ELENA', anchorId: null },
          'MR-CHR-GABRIEL': {
            id: 'MR-CHR-GABRIEL',
            anchorId: 'MR-ANCHOR-CHARACTER-GABRIEL-FACILITY',
          },
          'MR-CHR-HAORAN': {
            id: 'MR-CHR-HAORAN',
            anchorId: 'MR-ANCHOR-CHARACTER-HAORAN-TISSUE-CULTURE',
          },
          'MR-CHR-SAMIRA': {
            id: 'MR-CHR-SAMIRA',
            anchorId: 'MR-ANCHOR-CHARACTER-SAMIRA-SHARED-DESKS',
          },
        },
        roomStatesById: {
          'MR-ROOM-FACILITY-QUEUE': {
            id: 'MR-ROOM-FACILITY-QUEUE',
            condition: 'inactive',
          },
          'MR-ROOM-IMAGING-BOOKING': {
            id: 'MR-ROOM-IMAGING-BOOKING',
            condition: 'inactive',
          },
          'MR-ROOM-IMAGING-SERVICE-LIMIT': {
            id: 'MR-ROOM-IMAGING-SERVICE-LIMIT',
            condition: 'inactive',
          },
        },
        persistentEnvironmentIds: [],
      },
      contentHistory: {
        selectedVariantsById: {},
        completedContentIds: [],
        expiredContentIds: [],
        readMessageIds: [],
        consumedContextualContentIds: [],
        displayedEnvironmentalTextIds: [],
        recordedSceneClosingIds: [],
        recordedSceneRecapIds: [],
        citationIds: [],
      },
      conclusion: { state: 'unresolved', finalChoiceId: null, endingModuleIds: null },
    });
  });

  it('changes only profile and energy for Supported', () => {
    const standard = initialCampaign();
    const supported = initialCampaign({ ...standardInput, pressureProfile: 'supported' });
    supported.metadata.pressureProfile = 'standard';
    supported.campaignValues.energy = 4;
    expect(supported).toEqual(standard);
  });

  it('normalizes the supplied name and retains no creation-input reference', () => {
    const input = structuredClone(standardInput);
    input.protagonist.name = 'Morg\u0061\u0301n';
    const result = createInitialCampaignState(input);
    expect(result.kind).toBe('success');
    if (result.kind === 'failure') return;
    expect(result.value.narrative.protagonist.name).toBe('Morgán');
    input.protagonist.name = 'Changed';
    expect(result.value.narrative.protagonist.name).toBe('Morgán');
    expect(result.value.narrative.protagonist).not.toBe(input.protagonist);
  });

  it.each([
    [{ ...standardInput, extra: true }, 'unknownField'],
    [{ ...standardInput, campaignSeed: -0 }, 'invalidNumber'],
    [{ ...standardInput, campaignSeed: 4_294_967_296 }, 'invalidNumber'],
    [{ ...standardInput, campaignId: 'INVALID' }, 'invalidId'],
    [{ ...standardInput, protagonist: { name: ' ', pronounSet: 'theyThem' } }, 'wrongType'],
  ])('rejects an invalid creation input without partial state', (input, reason) => {
    const result = createInitialCampaignState(input as typeof standardInput);
    expect(result).toMatchObject({ kind: 'failure', issue: { reason } });
    expect(result).not.toHaveProperty('state');
  });

  it.each(['01.0.0', '9007199254740992.0.0'])(
    'rejects unsafe or non-canonical creation content version %s',
    (contentVersion) => {
      expect(createInitialCampaignState({ ...standardInput, contentVersion })).toMatchObject({
        kind: 'failure',
        issue: { path: '/contentVersion' },
      });
    },
  );

  it.each(['0.0.0', '9007199254740991.0.0'])(
    'accepts canonical safe-integer content version boundary %s',
    (contentVersion) => {
      const created = createInitialCampaignState({ ...standardInput, contentVersion });
      expect(created.kind).toBe('success');
      if (created.kind === 'failure') return;
      expect(created.value.metadata.contentVersion).toBe(contentVersion);
      expect(validateCampaignState(created.value).kind).toBe('success');
    },
  );
});

describe('strict campaign validation', () => {
  it.each(['01.0.0', '9007199254740992.0.0'])(
    'rejects unsafe or non-canonical stored content version %s',
    (contentVersion) => {
      const state = copyCampaign();
      state.metadata.contentVersion = contentVersion;
      expect(validateCampaignState(state)).toMatchObject({
        kind: 'failure',
        issue: { path: '/metadata/contentVersion' },
      });
    },
  );

  it.each([
    ['missingField', (state: Record<string, unknown>) => delete state.calendar],
    ['unknownField', (state: Record<string, unknown>) => Object.assign(state, { unexpected: {} })],
    ['wrongType', (state: Record<string, unknown>) => Object.assign(state, { conclusion: 'done' })],
  ])('returns the stable %s structural reason', (reason, change) => {
    const value = copyCampaign() as unknown as Record<string, unknown>;
    change(value);
    expect(validateCampaignState(value)).toMatchObject({ kind: 'failure', issue: { reason } });
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY, -0, 0.5, Number.MAX_SAFE_INTEGER + 1])(
    'rejects the invalid stored number %s',
    (number) => {
      const value = copyCampaign();
      value.calendar.periodIndex = number;
      expect(validateCampaignState(value)).toMatchObject({
        kind: 'failure',
        issue: { reason: 'invalidNumber' },
      });
    },
  );

  it.each(['camera', 'pointerLock', 'openPanel', 'focusedPanel'])(
    'rejects forbidden presentation data: %s',
    (field) => {
      const value = copyCampaign() as unknown as Record<string, unknown>;
      Object.assign(value, { [field]: true });
      expect(validateCampaignState(value)).toMatchObject({
        kind: 'failure',
        issue: { path: `/${field}`, reason: 'forbiddenPresentationField' },
      });
    },
  );

  it('rejects key mismatches, unsorted collections, missing references, and cross-section failures', () => {
    const keyMismatch = copyCampaign();
    keyMismatch.relationships.byId['MR-CHR-CAMILA']!.id = 'other';
    expect(validateCampaignState(keyMismatch)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invalidId' },
    });

    const unsorted = copyCampaign();
    unsorted.calendar.periodIndex = 1;
    unsorted.calendar.crashPeriods = [1, 0];
    expect(validateCampaignState(unsorted)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invariantViolation' },
    });

    const missingRun = copyCampaign();
    missingRun.experiments.activeRunIds = ['run:MR-EXP-TEST:1'];
    expect(validateCampaignState(missingRun)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invalidReference' },
    });

    const wrongAct = copyCampaign();
    wrongAct.world.floorAct = 'decisionHorizon';
    expect(validateCampaignState(wrongAct)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invariantViolation' },
    });

    const futureScheduler = copyCampaign();
    futureScheduler.narrative.scheduler.lastSchedulerRevision = 1;
    expect(validateCampaignState(futureScheduler)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invariantViolation' },
    });

    const earlyCamila = copyCampaign();
    earlyCamila.relationships.byId['MR-CHR-CAMILA']!.introduced = true;
    expect(validateCampaignState(earlyCamila)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invariantViolation' },
    });

    const prematureConclusion = copyCampaign();
    prematureConclusion.conclusion.state = 'completed';
    expect(validateCampaignState(prematureConclusion)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invariantViolation' },
    });
  });

  it('returns a deep checked copy and does not mutate the supplied state', () => {
    const supplied = initialCampaign();
    const before = structuredClone(supplied);
    const result = validateCampaignState(supplied);
    expect(result.kind).toBe('success');
    expect(supplied).toEqual(before);
    if (result.kind === 'failure') return;
    expect(result.value).not.toBe(supplied);
    expect(result.value.metadata).not.toBe(supplied.metadata);
    expect(result.value.narrative.scheduler.queue).not.toBe(supplied.narrative.scheduler.queue);
    result.value.calendar.pendingCrash = true;
    expect(supplied.calendar.pendingCrash).toBe(false);
  });

  it('rejects non-initial route, relationship, and sparse facts at revision zero', () => {
    const availableRoute = copyCampaign();
    availableRoute.narrative.routesById.aldercroft!.state = 'available';
    availableRoute.narrative.routesById.aldercroft!.evaluated = true;
    expect(validateCampaignState(availableRoute)).toMatchObject({ kind: 'failure' });

    const consumedAndBreached = copyCampaign();
    consumedAndBreached.relationships.byId['MR-CHR-ELENA']!.supportConsumed = true;
    consumedAndBreached.relationships.byId['MR-CHR-ELENA']!.permanentBreach = true;
    expect(validateCampaignState(consumedAndBreached)).toMatchObject({ kind: 'failure' });

    const revisionTask = copyCampaign();
    revisionTask.manuscript.revisionTasksById['MR-REVISION-TEST'] = {
      id: 'MR-REVISION-TEST',
      state: 'locked',
    };
    expect(validateCampaignState(revisionTask)).toMatchObject({ kind: 'failure' });
  });
});

const changeRecord = (overrides: Partial<ChangeRecord> = {}): ChangeRecord => ({
  id: 'change:1:1',
  stateRevision: 1,
  sequence: 1,
  sourceType: 'playerAction',
  sourceId: 'MR-ACTION-TEST',
  fieldPath: '/campaignValues/energy',
  previousValue: 4,
  newValue: 3,
  integrityEventType: null,
  ...overrides,
});

const configuredRun = (overrides: Partial<ExperimentRun> = {}): ExperimentRun => ({
  id: 'run:MR-EXP-TEST:1',
  templateId: 'MR-EXP-TEST',
  runNumber: 1,
  stage: 'configured',
  goalId: 'MR-GOAL-TEST',
  controlId: 'MR-CONTROL-TEST',
  observationId: 'MR-OBSERVATION-TEST',
  familyChoiceId: 'MR-FAMILY-TEST',
  sampleCondition: 'stable',
  equipmentId: 'MR-EQUIPMENT-TEST',
  equipmentState: 'ready',
  attentionState: 'normal',
  issueCount: 0,
  severeIssue: false,
  projectedResultBand: null,
  finalResultBand: null,
  variationNamespace: null,
  variationTargetId: null,
  variationDrawIndex: null,
  variationBucket: null,
  monitoringResponses: [],
  ...overrides,
});

const addConfiguredRun = (state: CampaignState, run: ExperimentRun = configuredRun()): void => {
  state.metadata.stateRevision = Math.max(state.metadata.stateRevision, 1);
  state.experiments.runsById[run.id] = run;
  state.experiments.equipmentById[run.id] = {
    id: run.id,
    condition: run.equipmentState,
    history: [],
  };
  const band =
    run.severeIssue || run.issueCount >= 2
      ? 'compromised'
      : run.issueCount === 1
        ? 'mixed'
        : 'robust';
  state.experiments.preparationById[run.id] = { id: run.id, band, history: [] };
  if (['configured', 'running', 'readyForAnalysis'].includes(run.stage))
    state.experiments.activeRunIds.push(run.id);
};

const emptyRequirementResults = (): ManuscriptRequirementResults => ({
  supportedFigure: null,
  relevantControl: null,
  distinctExperimentFigures: null,
  structureCoverage: null,
  rhythmCoverage: null,
  matchedControl: null,
  caveat: null,
  causalSupport: null,
});

const eligibleAldercroftEvaluation = () => ({
  routeId: 'aldercroft' as const,
  evaluationRevision: 6,
  evaluationPeriod: 48,
  researchPlanOnTime: true,
  evidenceAtLeastSix: true,
  elenaConfidenceOrTrust: true,
  noBlockingConcern: true,
  publicRecordNotWithdrawn: true,
  eligible: true,
});

const eligibleMorrowEvaluation = () => ({
  routeId: 'morrow' as const,
  evaluationRevision: 7,
  evaluationPeriod: 56,
  camilaReplySent: true,
  morrowVideoCompleted: true,
  publicPreprintAvailable: true,
  threeAnalysedRecords: true,
  honestLimitationPresent: true,
  camilaTrustAtLeast41: true,
  noFabricationConfession: true,
  noBlockingConflict: true,
  eligible: true,
});

const setEvidenceSix = (state: CampaignState): void => {
  state.campaignValues.evidence = 6;
  state.campaignValues.histories.evidence = [
    changeRecord({
      id: 'change:2:1',
      stateRevision: 2,
      sequence: 1,
      sourceType: 'systemTransition',
      sourceId: 'MR-EVIDENCE-SIX',
      fieldPath: '/campaignValues/evidence',
      previousValue: 3,
      newValue: 6,
    }),
  ];
};

const setCamilaTrust41 = (state: CampaignState, sequence = 1): void => {
  state.relationships.byId['MR-CHR-CAMILA']!.trust = 41;
  state.relationships.byId['MR-CHR-CAMILA']!.introduced = true;
  state.relationships.byId['MR-CHR-CAMILA']!.history = [
    changeRecord({
      id: `change:6:${sequence}`,
      stateRevision: 6,
      sequence,
      sourceType: 'sceneOutcome',
      sourceId: 'MR-SCN-CAMILA-TRUST',
      fieldPath: '/relationships/byId/MR-CHR-CAMILA/trust',
      previousValue: 40,
      newValue: 41,
    }),
  ];
};

const addPiimEvidence = (
  state: CampaignState,
  templateId: string,
  role: 'batch' | 'oxygen' | 'none',
  quality: 'usable' | 'worthRepeating' | 'inconclusive' | 'suspicious' = 'usable',
): string => {
  const runId = `run:${templateId}:1`;
  const controlId = `MR-CONTROL-${role.toUpperCase()}`;
  const run = configuredRun({
    id: runId,
    templateId,
    controlId,
    stage: 'analysed',
    variationNamespace: 'experimentVariation',
    variationTargetId: runId,
    variationDrawIndex: 0,
    variationBucket: 17,
    projectedResultBand: 'robust',
    finalResultBand: 'robust',
    monitoringResponses: [{ windowIndex: 0, response: 'qualityCheck', completedPeriod: 0 }],
  });
  addConfiguredRun(state, run);
  const rawId = `raw:${runId}`;
  const evidenceId = `evidence:${runId}`;
  state.experiments.rawRecordsById[rawId] = {
    id: rawId,
    runId,
    biologicalResultId: `MR-RESULT-${role.toUpperCase()}`,
    finalPreparationBand: 'robust',
    structureResultId: `MR-STRUCTURE-${role.toUpperCase()}`,
    rhythmResultId: `MR-RHYTHM-${role.toUpperCase()}`,
    repatterningResultId: `MR-REPATTERNING-${role.toUpperCase()}`,
    controlResultId: controlId,
    observationCoverage: 'full',
    monitoringResultId: `MR-MONITORING-${role.toUpperCase()}`,
    fatigueAffected: false,
    internalMismatch: false,
  };
  state.experiments.evidenceCardsById[evidenceId] = {
    id: evidenceId,
    runId,
    rawRecordId: rawId,
    sourceId: rawId,
    quality,
    selectedReadingId: `MR-READING-${role.toUpperCase()}`,
    selectedCaveatId: 'MR-CAVEAT-PIIM',
    reportedReadingStatus: 'honest',
    awardedSupport: 1,
    piimRole: role,
  };
  return evidenceId;
};

const completePiimState = (
  state: CampaignState,
  cards: CampaignState['manuscript']['piimCards'],
): void => {
  state.metadata.stateRevision = 7;
  const batchId =
    cards.batch === 'notMet'
      ? null
      : addPiimEvidence(
          state,
          'MR-EXP-BATCH-CHECK',
          'batch',
          cards.batch === 'met' ? 'usable' : 'worthRepeating',
        );
  const oxygenId =
    cards.oxygen === 'notMet'
      ? null
      : addPiimEvidence(
          state,
          'MR-EXP-OXYGEN-CHECK',
          'oxygen',
          cards.oxygen === 'met' ? 'usable' : 'worthRepeating',
        );
  const otherId = addPiimEvidence(state, 'MR-EXP-OTHER-CHECK', 'none');
  const sourceIds = [batchId, oxygenId].filter((id): id is string => id !== null);
  const usableSourceIds = sourceIds.filter(
    (id) => state.experiments.evidenceCardsById[id]!.quality === 'usable',
  );
  let claimLevel: 'careful' | 'strong' | 'inflated';
  let claimFigureIds: string[];
  let statedMissingRequirement: keyof ManuscriptRequirementResults | null = null;
  const requirementResults = emptyRequirementResults();
  if (cards.claim === 'met') {
    claimLevel = 'careful';
    claimFigureIds = usableSourceIds.length > 0 ? sourceIds : [...sourceIds, otherId];
    requirementResults.supportedFigure = 'met';
    requirementResults.relevantControl = 'met';
    requirementResults.caveat = 'met';
  } else if (cards.claim === 'partlyMet') {
    claimLevel = 'strong';
    claimFigureIds = usableSourceIds.length > 0 ? sourceIds : [...sourceIds, otherId];
    requirementResults.distinctExperimentFigures = 'missing';
    requirementResults.structureCoverage = 'met';
    requirementResults.rhythmCoverage = 'met';
    requirementResults.matchedControl = 'met';
    requirementResults.caveat = 'met';
    statedMissingRequirement = 'distinctExperimentFigures';
    if (usableSourceIds.length === 0 && batchId !== null) {
      const otherRawId = state.experiments.evidenceCardsById[otherId]!.rawRecordId!;
      state.experiments.rawRecordsById[otherRawId]!.controlResultId = 'MR-CONTROL-BATCH';
    }
  } else {
    claimLevel = 'inflated';
    claimFigureIds = [...usableSourceIds];
    if (claimFigureIds.length < 2) claimFigureIds.push(otherId);
    if (claimFigureIds.length < 2)
      claimFigureIds.push(addPiimEvidence(state, 'MR-EXP-CLAIM-CHECK', 'none'));
    requirementResults.distinctExperimentFigures = 'met';
    requirementResults.structureCoverage = 'met';
    requirementResults.rhythmCoverage = 'met';
    requirementResults.matchedControl = 'met';
    requirementResults.caveat = 'met';
    requirementResults.causalSupport = 'unsupported';
  }
  const figureIds = [...new Set([...sourceIds, ...claimFigureIds])].slice(0, 3);
  const controlIds = figureIds
    .flatMap((id) => {
      const rawId = state.experiments.evidenceCardsById[id]!.rawRecordId;
      const controlId =
        rawId === null ? null : state.experiments.rawRecordsById[rawId]!.controlResultId;
      return controlId === null ? [] : [controlId];
    })
    .filter((id, index, ids) => ids.indexOf(id) === index)
    .slice(0, 2);
  state.manuscript.board = {
    claim: 'MR-CLAIM-PIIM',
    claimLevel,
    figures: [figureIds[0] ?? null, figureIds[1] ?? null, figureIds[2] ?? null],
    controls: [controlIds[0] ?? null, controlIds[1] ?? null],
    caveat: 'MR-CAVEAT-PIIM',
    authorship: null,
    supplementary: null,
    activeRequest: null,
  };
  state.manuscript.snapshotsById['snapshot:1'] = {
    id: 'snapshot:1',
    stateRevision: 1,
    board: structuredClone(state.manuscript.board),
    requirementResults,
    statedMissingRequirement,
  };
  state.manuscript.snapshotsById['snapshot:5'] = {
    id: 'snapshot:5',
    stateRevision: 5,
    board: structuredClone(state.manuscript.board),
    requirementResults: structuredClone(requirementResults),
    statedMissingRequirement,
  };
  state.manuscript.snapshotOrder = ['snapshot:1', 'snapshot:5'];
  state.manuscript.currentSnapshotId = 'snapshot:5';
  for (const report of Object.values(state.manuscript.reviewerReportsById)) report.form = 'base';
  state.manuscript.preprintState = 'public';
  state.manuscript.journalState = 'resolved';
  state.manuscript.piimCards = cards;
  state.manuscript.piimCardSources = {
    batchEvidenceCardId: batchId,
    oxygenEvidenceCardId: oxygenId,
    claimSnapshotId: 'snapshot:5',
  };
  state.manuscript.piimMilestones = {
    publicPreprintRevision: 2,
    journalChainRevision: 3,
    reviewerReportsRevision: 4,
    piimCardsRevision: 5,
    piimOutcomeRevision: null,
  };
};

const claimSnapshotState = (
  claimLevel: 'careful' | 'strong' | 'inflated',
  evidenceQualities: Array<'usable' | 'inconclusive' | 'suspicious'>,
  requirementResults: ManuscriptRequirementResults,
  options: {
    reportedEvidence?: { index: number; status: 'altered' | 'unsupported' };
    emptyBoard?: boolean;
  } = {},
): CampaignState => {
  const state = copyCampaign();
  state.metadata.stateRevision = 1;
  const evidenceIds = evidenceQualities.map((quality, index) =>
    addPiimEvidence(state, `MR-EXP-CLAIM-${index + 1}`, 'none', quality),
  );
  if (options.reportedEvidence !== undefined) {
    const evidenceId = evidenceIds[options.reportedEvidence.index]!;
    state.experiments.evidenceCardsById[evidenceId]!.reportedReadingStatus =
      options.reportedEvidence.status;
    state.manuscript.reportedReadingsByEvidenceId[evidenceId] = options.reportedEvidence.status;
  }
  for (const evidenceId of evidenceIds) {
    const card = state.experiments.evidenceCardsById[evidenceId]!;
    if (card.quality !== 'suspicious') continue;
    state.experiments.rawRecordsById[card.rawRecordId!]!.internalMismatch = true;
  }
  const boardEvidenceIds = options.emptyBoard ? [] : evidenceIds;
  const controlIds = boardEvidenceIds
    .map((evidenceId) => {
      const rawId = state.experiments.evidenceCardsById[evidenceId]!.rawRecordId!;
      return state.experiments.rawRecordsById[rawId]!.controlResultId;
    })
    .filter((id, index, ids) => ids.indexOf(id) === index);
  state.manuscript.board = {
    claim: 'MR-CLAIM-TEST',
    claimLevel,
    figures: [
      boardEvidenceIds[0] ?? null,
      boardEvidenceIds[1] ?? null,
      boardEvidenceIds[2] ?? null,
    ],
    controls: [controlIds[0] ?? null, controlIds[1] ?? null],
    caveat: options.emptyBoard ? null : 'MR-CAVEAT-PIIM',
    authorship: null,
    supplementary: null,
    activeRequest: null,
  };
  state.manuscript.snapshotsById['snapshot:1'] = {
    id: 'snapshot:1',
    stateRevision: 1,
    board: structuredClone(state.manuscript.board),
    requirementResults,
    statedMissingRequirement: null,
  };
  state.manuscript.snapshotOrder = ['snapshot:1'];
  state.manuscript.currentSnapshotId = 'snapshot:1';
  return state;
};

const appendCurrentSnapshot = (
  state: CampaignState,
  stateRevision: number,
  requirementResults: ManuscriptRequirementResults,
): void => {
  const id = `snapshot:${stateRevision}`;
  state.metadata.stateRevision = stateRevision;
  state.manuscript.snapshotsById[id] = {
    id,
    stateRevision,
    board: structuredClone(state.manuscript.board),
    requirementResults,
    statedMissingRequirement: null,
  };
  state.manuscript.snapshotOrder.push(id);
  state.manuscript.currentSnapshotId = id;
};

const moveCurrentSnapshot = (state: CampaignState, stateRevision: number): void => {
  const oldId = state.manuscript.currentSnapshotId!;
  const snapshot = state.manuscript.snapshotsById[oldId]!;
  const newId = `snapshot:${stateRevision}`;
  delete state.manuscript.snapshotsById[oldId];
  snapshot.id = newId;
  snapshot.stateRevision = stateRevision;
  state.manuscript.snapshotsById[newId] = snapshot;
  state.manuscript.snapshotOrder[state.manuscript.snapshotOrder.length - 1] = newId;
  state.manuscript.currentSnapshotId = newId;
  if (state.manuscript.piimCardSources.claimSnapshotId !== null)
    state.manuscript.piimCardSources.claimSnapshotId = newId;
};

const endingModules: NonNullable<CampaignState['conclusion']['endingModuleIds']> = [
  'MR-END-CAREER-ACADEMIA',
  'MR-END-PAPER-PUBLISHED',
  'MR-END-INTEGRITY-DEFENSIBLE',
  'MR-END-FATIGUE-CLEAR',
  'MR-END-REL-CAMILA-AMBIGUOUS',
];

const addFinalScene = (
  state: CampaignState,
  sceneState: 'eligible' | 'queued' | 'inProgress' | 'completed' | 'skipped',
  finalPresentationState: 'closingPlayed' | 'recapShown' | null = null,
): void => {
  state.metadata.stateRevision = Math.max(state.metadata.stateRevision, 1);
  state.calendar.periodIndex = 63;
  state.world.floorAct = 'decisionHorizon';
  state.narrative.scenesById['MR-SCN-0642'] = {
    id: 'MR-SCN-0642',
    state: sceneState,
    authoredFormId: sceneState === 'eligible' || sceneState === 'queued' ? null : 'MR-FORM-0642',
    finalPresentationState,
  };
  const eventState =
    sceneState === 'inProgress' ? 'active' : sceneState === 'skipped' ? 'completed' : sceneState;
  state.narrative.scheduler.eventsById['MR-SCN-0642'] = {
    id: 'MR-SCN-0642',
    state: eventState,
    firstEligiblePeriod: 63,
    resolvedPeriod: ['completed', 'skipped'].includes(sceneState) ? 63 : null,
  };
  if (sceneState === 'queued') state.narrative.scheduler.queue.push('MR-SCN-0642');
  if (sceneState === 'inProgress') {
    state.narrative.scheduler.activeEventId = 'MR-SCN-0642';
    state.narrative.scheduler.queue = [];
    state.narrative.scheduler.eventsById['MR-SCN-CLARIFIED']!.state = 'eligible';
    state.narrative.scenesById['MR-SCN-CLARIFIED']!.state = 'eligible';
  }
  if (finalPresentationState === 'closingPlayed')
    state.contentHistory.recordedSceneClosingIds.push('MR-SCN-0642');
  if (finalPresentationState === 'recapShown')
    state.contentHistory.recordedSceneRecapIds.push('MR-SCN-0642');
};

const conclusionState = (
  finalChoiceId: 'aldercroft' | 'morrow' | 'leave' | 'neither',
  conclusion: 'confirmed' | 'epilogueInProgress' | 'completed' = 'confirmed',
): CampaignState => {
  const state = copyCampaign();
  completePiimState(state, { batch: 'met', oxygen: 'met', claim: 'met' });
  setEvidenceSix(state);
  if (finalChoiceId !== 'neither') setCamilaTrust41(state);
  state.manuscript.piimOutcome = {
    responseBand: 'top',
    namespace: 'piimOutcome',
    targetId: 'MR-PIIM-OUTCOME',
    drawIndex: 0,
    bucket: 1,
    result: 'published',
  };
  state.manuscript.piimMilestones.piimOutcomeRevision = 6;
  state.manuscript.finalPaperState = 'published';
  const aldercroftEligible = !['morrow', 'neither'].includes(finalChoiceId);
  const morrowEligible = finalChoiceId !== 'neither';
  state.narrative.careerProgress = {
    researchPlanCompletedPeriod: aldercroftEligible ? 43 : null,
    camilaReplySent: true,
    morrowVideoCompleted: true,
    fabricationConfessedToCamila: false,
  };
  state.relationships.byId['MR-CHR-CAMILA']!.introduced = true;
  addFinalScene(state, 'completed', conclusion === 'confirmed' ? null : 'closingPlayed');
  state.metadata.stateRevision = Math.max(state.metadata.stateRevision, 8);
  state.narrative.routesById.aldercroft = {
    id: 'aldercroft',
    state:
      finalChoiceId === 'aldercroft' ? 'chosen' : finalChoiceId === 'leave' ? 'declined' : 'closed',
    evaluated: true,
    evaluation: aldercroftEligible
      ? eligibleAldercroftEvaluation()
      : { ...eligibleAldercroftEvaluation(), researchPlanOnTime: false, eligible: false },
    closureReason: aldercroftEligible ? null : 'failedEvaluation',
  };
  state.narrative.routesById.morrow = {
    id: 'morrow',
    state:
      finalChoiceId === 'morrow'
        ? 'chosen'
        : finalChoiceId === 'leave' || finalChoiceId === 'aldercroft'
          ? 'declined'
          : 'closed',
    evaluated: true,
    evaluation: morrowEligible
      ? eligibleMorrowEvaluation()
      : { ...eligibleMorrowEvaluation(), camilaTrustAtLeast41: false, eligible: false },
    closureReason: morrowEligible ? null : 'failedEvaluation',
  };
  state.conclusion.state = conclusion;
  state.conclusion.finalChoiceId = finalChoiceId;
  state.conclusion.endingModuleIds =
    conclusion === 'confirmed' ? null : structuredClone(endingModules);
  if (finalChoiceId === 'morrow' && state.conclusion.endingModuleIds !== null)
    state.conclusion.endingModuleIds[0] = 'MR-END-CAREER-MORROW';
  if (finalChoiceId === 'leave' && state.conclusion.endingModuleIds !== null)
    state.conclusion.endingModuleIds[0] = 'MR-END-CAREER-LEAVE';
  if (finalChoiceId === 'neither' && state.conclusion.endingModuleIds !== null)
    state.conclusion.endingModuleIds[0] = 'MR-END-CAREER-NONE';
  if (finalChoiceId === 'neither' && state.conclusion.endingModuleIds !== null)
    state.conclusion.endingModuleIds[4] = 'MR-END-REL-ELENA-AMBIGUOUS';
  return state;
};

const resolvedPiimState = (
  cards: CampaignState['manuscript']['piimCards'],
  responseBand: NonNullable<CampaignState['manuscript']['piimOutcome']>['responseBand'],
  bucket: number,
  result: NonNullable<CampaignState['manuscript']['piimOutcome']>['result'],
): CampaignState => {
  const state = copyCampaign();
  state.calendar.periodIndex = 56;
  state.world.floorAct = 'decisionHorizon';
  completePiimState(state, cards);
  state.manuscript.piimOutcome = {
    responseBand,
    namespace: 'piimOutcome',
    targetId: 'MR-PIIM-OUTCOME',
    drawIndex: 0,
    bucket,
    result,
  };
  state.manuscript.piimMilestones.piimOutcomeRevision = 6;
  state.manuscript.finalPaperState = result === 'rejected' ? 'rejectedOrWithdrawn' : result;
  return state;
};

const availableAldercroftState = (): CampaignState => {
  const state = copyCampaign();
  state.metadata.stateRevision = 6;
  state.calendar.periodIndex = 48;
  state.world.floorAct = 'reviewPressure';
  state.narrative.careerProgress.researchPlanCompletedPeriod = 43;
  setEvidenceSix(state);
  state.narrative.routesById.aldercroft = {
    id: 'aldercroft',
    state: 'available',
    evaluated: true,
    evaluation: eligibleAldercroftEvaluation(),
    closureReason: null,
  };
  return state;
};

const availableAldercroftStateWithPublicPreprint = (): CampaignState => {
  const state = copyCampaign();
  completePiimState(state, { batch: 'met', oxygen: 'met', claim: 'met' });
  state.metadata.stateRevision = 6;
  state.calendar.periodIndex = 48;
  state.world.floorAct = 'reviewPressure';
  state.narrative.careerProgress.researchPlanCompletedPeriod = 43;
  setEvidenceSix(state);
  state.narrative.routesById.aldercroft = {
    id: 'aldercroft',
    state: 'available',
    evaluated: true,
    evaluation: eligibleAldercroftEvaluation(),
    closureReason: null,
  };
  return state;
};

const availableMorrowState = (): CampaignState => {
  const state = copyCampaign();
  completePiimState(state, { batch: 'met', oxygen: 'met', claim: 'met' });
  state.calendar.periodIndex = 56;
  state.world.floorAct = 'decisionHorizon';
  state.narrative.careerProgress.camilaReplySent = true;
  state.narrative.careerProgress.morrowVideoCompleted = true;
  setCamilaTrust41(state);
  state.narrative.routesById.morrow = {
    id: 'morrow',
    state: 'available',
    evaluated: true,
    evaluation: eligibleMorrowEvaluation(),
    closureReason: null,
  };
  return state;
};

const addBlockingConcern = (
  state: CampaignState,
  routeImpact: 'aldercroft' | 'morrow' | 'both',
): void => {
  const id = `MR-CONCERN-${routeImpact.toUpperCase()}`;
  state.narrative.concernsById[id] = {
    id,
    sourceId: `MR-SOURCE-${routeImpact.toUpperCase()}`,
    visible: true,
    currentResponse: 'defer',
    responseHistory: ['defer'],
    routeImpact,
  };
};

const addAnalysedRun = (state: CampaignState): void => {
  const run = configuredRun({
    stage: 'analysed',
    variationNamespace: 'experimentVariation',
    variationTargetId: 'run:MR-EXP-TEST:1',
    variationDrawIndex: 0,
    variationBucket: 17,
    projectedResultBand: 'robust',
    finalResultBand: 'robust',
    monitoringResponses: [{ windowIndex: 0, response: 'qualityCheck', completedPeriod: 0 }],
  });
  addConfiguredRun(state, run);
  state.experiments.rawRecordsById['raw:run:MR-EXP-TEST:1'] = {
    id: 'raw:run:MR-EXP-TEST:1',
    runId: 'run:MR-EXP-TEST:1',
    biologicalResultId: 'MR-RESULT-TEST',
    finalPreparationBand: 'robust',
    structureResultId: 'MR-STRUCTURE-TEST',
    rhythmResultId: 'MR-RHYTHM-TEST',
    repatterningResultId: 'MR-REPATTERNING-TEST',
    controlResultId: 'MR-CONTROL-TEST',
    observationCoverage: 'full',
    monitoringResultId: 'MR-MONITORING-TEST',
    fatigueAffected: false,
    internalMismatch: false,
  };
  state.experiments.evidenceCardsById['evidence:run:MR-EXP-TEST:1'] = {
    id: 'evidence:run:MR-EXP-TEST:1',
    runId: 'run:MR-EXP-TEST:1',
    rawRecordId: 'raw:run:MR-EXP-TEST:1',
    sourceId: 'raw:run:MR-EXP-TEST:1',
    quality: 'usable',
    selectedReadingId: 'MR-READING-TEST',
    selectedCaveatId: 'MR-CAVEAT-TEST',
    reportedReadingStatus: 'honest',
    awardedSupport: 1,
    piimRole: 'none',
  };
};

const addStoppedRun = (state: CampaignState): void => {
  const run = configuredRun({
    stage: 'stopped',
    variationNamespace: 'experimentVariation',
    variationTargetId: 'run:MR-EXP-TEST:1',
    variationDrawIndex: 0,
    variationBucket: 17,
    projectedResultBand: 'robust',
    monitoringResponses: [{ windowIndex: 0, response: 'stop', completedPeriod: 0 }],
  });
  addConfiguredRun(state, run);
  state.experiments.stopLogsById['stop:run:MR-EXP-TEST:1'] = {
    id: 'stop:run:MR-EXP-TEST:1',
    runId: 'run:MR-EXP-TEST:1',
    stoppedPeriod: 0,
    reasonId: 'MR-STOP-REASON-TEST',
  };
};

describe('cross-section and permanent-history invariants', () => {
  it.each([
    [16, 'manuscriptClutter'],
    [28, 'rejectionAndPublicRecord'],
    [36, 'reviewPressure'],
    [56, 'decisionHorizon'],
  ] as const)('accepts period %i only with its exact floor act', (periodIndex, floorAct) => {
    const state = copyCampaign();
    state.metadata.stateRevision = 1;
    state.calendar.periodIndex = periodIndex;
    state.world.floorAct = floorAct;
    expect(validateCampaignState(state).kind).toBe('success');
  });

  it('accepts continuous histories and rejects every immutable-history fault', () => {
    const valid = copyCampaign();
    valid.metadata.stateRevision = 2;
    valid.campaignValues.energy = 2;
    valid.campaignValues.histories.energy = [
      changeRecord(),
      changeRecord({
        id: 'change:2:1',
        stateRevision: 2,
        previousValue: 3,
        newValue: 2,
      }),
    ];
    expect(validateCampaignState(valid).kind).toBe('success');

    const cases: CampaignState[] = [];
    const badId = copyCampaign(valid);
    badId.campaignValues.histories.energy[0]!.id = 'change:1:2';
    cases.push(badId);
    const future = copyCampaign(valid);
    future.campaignValues.histories.energy[1]!.stateRevision = 3;
    future.campaignValues.histories.energy[1]!.id = 'change:3:1';
    cases.push(future);
    const reversed = copyCampaign(valid);
    reversed.campaignValues.histories.energy.reverse();
    cases.push(reversed);
    const badSequence = copyCampaign(valid);
    badSequence.campaignValues.histories.energy[1]!.sequence = 2;
    badSequence.campaignValues.histories.energy[1]!.id = 'change:2:2';
    cases.push(badSequence);
    const badPrevious = copyCampaign(valid);
    badPrevious.campaignValues.histories.energy[1]!.previousValue = 4;
    cases.push(badPrevious);
    const noChange = copyCampaign(valid);
    noChange.campaignValues.histories.energy[1]!.newValue = 3;
    cases.push(noChange);
    const wrongCurrent = copyCampaign(valid);
    wrongCurrent.campaignValues.energy = 1;
    cases.push(wrongCurrent);
    for (const state of cases)
      expect(validateCampaignState(state)).toMatchObject({ kind: 'failure' });
  });

  it('uses one global sequence per revision and exact per-field ownership and initial values', () => {
    const valid = copyCampaign();
    valid.metadata.stateRevision = 1;
    valid.campaignValues.energy = 3;
    valid.campaignValues.evidence = 4;
    valid.campaignValues.histories.energy = [changeRecord()];
    valid.campaignValues.histories.evidence = [
      changeRecord({
        id: 'change:1:2',
        sequence: 2,
        fieldPath: '/campaignValues/evidence',
        previousValue: 3,
        newValue: 4,
      }),
    ];
    expect(validateCampaignState(valid).kind).toBe('success');

    const gap = copyCampaign(valid);
    gap.campaignValues.histories.evidence[0]!.id = 'change:1:3';
    gap.campaignValues.histories.evidence[0]!.sequence = 3;
    expect(validateCampaignState(gap)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'historyRegression' },
    });

    const duplicateSequence = copyCampaign(valid);
    duplicateSequence.campaignValues.histories.evidence[0]!.id = 'change:1:1';
    duplicateSequence.campaignValues.histories.evidence[0]!.sequence = 1;
    expect(validateCampaignState(duplicateSequence)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'duplicateId' },
    });

    const wrongOwner = copyCampaign(valid);
    wrongOwner.campaignValues.histories.evidence[0]!.fieldPath = '/campaignValues/energy';
    expect(validateCampaignState(wrongOwner)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invalidReference' },
    });

    const wrongInitial = copyCampaign(valid);
    wrongInitial.campaignValues.histories.energy[0]!.previousValue = 5;
    expect(validateCampaignState(wrongInitial)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'historyRegression' },
    });

    const changedWithoutHistory = copyCampaign();
    changedWithoutHistory.campaignValues.energy = 3;
    expect(validateCampaignState(changedWithoutHistory)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'historyRegression' },
    });
  });

  it('checks all fact-history owners, unique change IDs, and integrity-event meaning', () => {
    const equipment = copyCampaign();
    equipment.metadata.stateRevision = 1;
    addConfiguredRun(equipment);
    equipment.experiments.runsById['run:MR-EXP-TEST:1']!.equipmentState = 'limited';
    equipment.experiments.equipmentById['run:MR-EXP-TEST:1'] = {
      id: 'run:MR-EXP-TEST:1',
      condition: 'limited',
      history: [
        changeRecord({
          fieldPath: '/experiments/equipmentById/run:MR-EXP-TEST:1/condition',
          previousValue: 'ready',
          newValue: 'limited',
        }),
      ],
    };
    expect(validateCampaignState(equipment).kind).toBe('success');

    const badIntegrityEvent = copyCampaign(equipment);
    badIntegrityEvent.experiments.equipmentById[
      'run:MR-EXP-TEST:1'
    ]!.history[0]!.integrityEventType = 'alteredReading';
    expect(validateCampaignState(badIntegrityEvent)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invariantViolation' },
    });

    const integrity = copyCampaign();
    integrity.metadata.stateRevision = 1;
    integrity.campaignValues.integrity = 90;
    integrity.campaignValues.histories.integrity = [
      changeRecord({
        fieldPath: '/campaignValues/integrity',
        previousValue: 100,
        newValue: 90,
        integrityEventType: 'omittedEvidence',
      }),
    ];
    expect(validateCampaignState(integrity).kind).toBe('success');
    integrity.campaignValues.histories.integrity[0]!.integrityEventType = null;
    expect(validateCampaignState(integrity)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invariantViolation' },
    });

    const duplicate = copyCampaign();
    duplicate.metadata.stateRevision = 1;
    duplicate.campaignValues.energy = 3;
    duplicate.campaignValues.evidence = 4;
    duplicate.campaignValues.histories.energy = [changeRecord()];
    duplicate.campaignValues.histories.evidence = [
      changeRecord({
        id: 'change:1:1',
        fieldPath: '/campaignValues/evidence',
        previousValue: 3,
        newValue: 4,
      }),
    ];
    expect(validateCampaignState(duplicate)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'duplicateId' },
    });
  });

  it('checks active, analysed, stopped, raw-record, and evidence-card relationships', () => {
    const active = copyCampaign();
    addConfiguredRun(active);
    expect(validateCampaignState(active).kind).toBe('success');

    const absentFromActive = copyCampaign(active);
    absentFromActive.experiments.activeRunIds = [];
    expect(validateCampaignState(absentFromActive)).toMatchObject({ kind: 'failure' });

    const terminalActive = copyCampaign(active);
    terminalActive.experiments.runsById['run:MR-EXP-TEST:1']!.stage = 'analysed';
    expect(validateCampaignState(terminalActive)).toMatchObject({ kind: 'failure' });

    const analysedMissingRecords = copyCampaign();
    analysedMissingRecords.experiments.runsById['run:MR-EXP-TEST:1'] = configuredRun({
      stage: 'analysed',
    });
    expect(validateCampaignState(analysedMissingRecords)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invalidReference' },
    });

    const stoppedMissingLog = copyCampaign();
    stoppedMissingLog.experiments.runsById['run:MR-EXP-TEST:1'] = configuredRun({
      stage: 'stopped',
    });
    expect(validateCampaignState(stoppedMissingLog)).toMatchObject({ kind: 'failure' });

    const orphanRaw = copyCampaign();
    orphanRaw.experiments.rawRecordsById['raw:run:MR-EXP-TEST:1'] = {
      id: 'raw:run:MR-EXP-TEST:1',
      runId: 'run:MR-EXP-TEST:1',
      biologicalResultId: 'MR-RESULT-TEST',
      finalPreparationBand: 'mixed',
      structureResultId: 'MR-STRUCTURE-TEST',
      rhythmResultId: 'MR-RHYTHM-TEST',
      repatterningResultId: 'MR-REPATTERNING-TEST',
      controlResultId: 'MR-CONTROL-TEST',
      observationCoverage: 'full',
      monitoringResultId: 'MR-MONITORING-TEST',
      fatigueAffected: false,
      internalMismatch: false,
    };
    expect(validateCampaignState(orphanRaw)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invalidReference' },
    });

    const orphanCard = copyCampaign();
    orphanCard.experiments.evidenceCardsById['evidence:run:MR-EXP-TEST:1'] = {
      id: 'evidence:run:MR-EXP-TEST:1',
      runId: null,
      rawRecordId: null,
      sourceId: 'MR-SOURCE-TEST',
      quality: 'usable',
      selectedReadingId: 'MR-READING-TEST',
      selectedCaveatId: 'MR-CAVEAT-TEST',
      reportedReadingStatus: 'honest',
      awardedSupport: 1,
      piimRole: 'none',
    };
    expect(validateCampaignState(orphanCard)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invalidReference' },
    });

    const malformedRunId = copyCampaign(active);
    malformedRunId.experiments.runsById['run:MR-EXP-TEST:1']!.templateId = 'MR-EXP-OTHER';
    expect(validateCampaignState(malformedRunId)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'invalidId' },
    });
  });

  it('accepts complete analysed and stopped run fact sets', () => {
    const analysed = copyCampaign();
    const analysedRun = configuredRun({
      stage: 'analysed',
      variationNamespace: 'experimentVariation',
      variationTargetId: 'run:MR-EXP-TEST:1',
      variationDrawIndex: 0,
      variationBucket: 17,
      projectedResultBand: 'robust',
      finalResultBand: 'robust',
      monitoringResponses: [{ windowIndex: 0, response: 'qualityCheck', completedPeriod: 0 }],
    });
    addConfiguredRun(analysed, analysedRun);
    analysed.experiments.rawRecordsById['raw:run:MR-EXP-TEST:1'] = {
      id: 'raw:run:MR-EXP-TEST:1',
      runId: 'run:MR-EXP-TEST:1',
      biologicalResultId: 'MR-RESULT-TEST',
      finalPreparationBand: 'robust',
      structureResultId: 'MR-STRUCTURE-TEST',
      rhythmResultId: 'MR-RHYTHM-TEST',
      repatterningResultId: 'MR-REPATTERNING-TEST',
      controlResultId: 'MR-CONTROL-TEST',
      observationCoverage: 'full',
      monitoringResultId: 'MR-MONITORING-TEST',
      fatigueAffected: false,
      internalMismatch: false,
    };
    analysed.experiments.evidenceCardsById['evidence:run:MR-EXP-TEST:1'] = {
      id: 'evidence:run:MR-EXP-TEST:1',
      runId: 'run:MR-EXP-TEST:1',
      rawRecordId: 'raw:run:MR-EXP-TEST:1',
      sourceId: 'raw:run:MR-EXP-TEST:1',
      quality: 'usable',
      selectedReadingId: 'MR-READING-TEST',
      selectedCaveatId: 'MR-CAVEAT-TEST',
      reportedReadingStatus: 'honest',
      awardedSupport: 1,
      piimRole: 'none',
    };
    expect(validateCampaignState(analysed).kind).toBe('success');

    const stopped = copyCampaign();
    const stoppedRun = configuredRun({
      stage: 'stopped',
      variationNamespace: 'experimentVariation',
      variationTargetId: 'run:MR-EXP-TEST:1',
      variationDrawIndex: 0,
      variationBucket: 17,
      projectedResultBand: 'robust',
      monitoringResponses: [{ windowIndex: 0, response: 'stop', completedPeriod: 0 }],
    });
    addConfiguredRun(stopped, stoppedRun);
    stopped.experiments.stopLogsById['stop:run:MR-EXP-TEST:1'] = {
      id: 'stop:run:MR-EXP-TEST:1',
      runId: 'run:MR-EXP-TEST:1',
      stoppedPeriod: 0,
      reasonId: 'MR-STOP-REASON-TEST',
    };
    expect(validateCampaignState(stopped).kind).toBe('success');
  });

  it.each([
    [0, false, 'robust'],
    [1, false, 'mixed'],
    [2, false, 'compromised'],
    [0, true, 'compromised'],
  ] as const)('derives preparation %s/%s as %s', (issueCount, severeIssue, expectedBand) => {
    const state = copyCampaign();
    const run = configuredRun({ issueCount, severeIssue });
    addConfiguredRun(state, run);
    expect(state.experiments.preparationById[run.id]!.band).toBe(expectedBand);
    expect(validateCampaignState(state).kind).toBe('success');
  });

  it('rejects a compromised preparation band when there are no issues', () => {
    const state = copyCampaign();
    addConfiguredRun(state);
    state.experiments.preparationById['run:MR-EXP-TEST:1']!.band = 'compromised';
    expect(validateCampaignState(state)).toMatchObject({
      kind: 'failure',
      issue: {
        path: '/experiments/preparationById/run:MR-EXP-TEST:1/band',
        reason: 'invariantViolation',
      },
    });
  });

  it('accepts equal monitoring periods and rejects a decreasing sequence', () => {
    const oxygenState = (secondPeriod: number): CampaignState => {
      const state = copyCampaign();
      state.calendar.periodIndex = 5;
      addConfiguredRun(
        state,
        configuredRun({
          id: 'run:MR-EXP-OXYGEN-LOSS:1',
          templateId: 'MR-EXP-OXYGEN-LOSS',
          stage: 'readyForAnalysis',
          variationNamespace: 'experimentVariation',
          variationTargetId: 'run:MR-EXP-OXYGEN-LOSS:1',
          variationDrawIndex: 0,
          variationBucket: 17,
          projectedResultBand: 'robust',
          finalResultBand: 'robust',
          monitoringResponses: [
            { windowIndex: 0, response: 'continue', completedPeriod: 5 },
            { windowIndex: 1, response: 'continue', completedPeriod: secondPeriod },
          ],
        }),
      );
      return state;
    };

    expect(validateCampaignState(oxygenState(5)).kind).toBe('success');
    expect(validateCampaignState(oxygenState(4))).toMatchObject({
      kind: 'failure',
      issue: {
        path: '/experiments/runsById/run:MR-EXP-OXYGEN-LOSS:1/monitoringResponses/1',
        reason: 'invariantViolation',
      },
    });
  });

  it('rejects each detailed run-stage, variation, monitoring, and terminal-fact conflict', () => {
    const cases: [string, CampaignState][] = [];

    const equipmentMismatch = copyCampaign();
    addConfiguredRun(equipmentMismatch);
    equipmentMismatch.experiments.equipmentById['run:MR-EXP-TEST:1']!.condition = 'limited';
    cases.push(['equipment mismatch', equipmentMismatch]);

    const partialVariation = copyCampaign();
    addConfiguredRun(partialVariation);
    partialVariation.experiments.runsById['run:MR-EXP-TEST:1']!.variationNamespace =
      'experimentVariation';
    cases.push(['partial variation facts', partialVariation]);

    const configuredAttention = copyCampaign();
    addConfiguredRun(configuredAttention);
    configuredAttention.experiments.runsById['run:MR-EXP-TEST:1']!.attentionState =
      'attentionNeeded';
    cases.push(['configured attention state', configuredAttention]);

    const running = (): CampaignState => {
      const state = copyCampaign();
      addConfiguredRun(
        state,
        configuredRun({
          stage: 'running',
          variationNamespace: 'experimentVariation',
          variationTargetId: 'run:MR-EXP-TEST:1',
          variationDrawIndex: 0,
          variationBucket: 17,
          projectedResultBand: 'robust',
        }),
      );
      return state;
    };

    const tooManyWindows = running();
    tooManyWindows.experiments.runsById['run:MR-EXP-TEST:1']!.monitoringResponses = [
      { windowIndex: 0, response: 'continue', completedPeriod: 0 },
      { windowIndex: 1, response: 'continue', completedPeriod: 0 },
    ];
    cases.push(['too many monitoring windows', tooManyWindows]);

    const wrongWindowIndex = running();
    wrongWindowIndex.experiments.runsById['run:MR-EXP-TEST:1']!.monitoringResponses = [
      { windowIndex: 1, response: 'continue', completedPeriod: 0 },
    ];
    cases.push(['wrong monitoring index', wrongWindowIndex]);

    const stopBeforeLastWindow = copyCampaign();
    addConfiguredRun(
      stopBeforeLastWindow,
      configuredRun({
        id: 'run:MR-EXP-OXYGEN-LOSS:1',
        templateId: 'MR-EXP-OXYGEN-LOSS',
        stage: 'running',
        variationNamespace: 'experimentVariation',
        variationTargetId: 'run:MR-EXP-OXYGEN-LOSS:1',
        variationDrawIndex: 0,
        variationBucket: 17,
        projectedResultBand: 'robust',
        monitoringResponses: [
          { windowIndex: 0, response: 'stop', completedPeriod: 0 },
          { windowIndex: 1, response: 'continue', completedPeriod: 0 },
        ],
      }),
    );
    cases.push(['stop before final window', stopBeforeLastWindow]);

    const runningAfterStop = running();
    runningAfterStop.experiments.runsById['run:MR-EXP-TEST:1']!.monitoringResponses = [
      { windowIndex: 0, response: 'stop', completedPeriod: 0 },
    ];
    cases.push(['running stage after stop', runningAfterStop]);

    const runningAfterFinalWindow = running();
    runningAfterFinalWindow.experiments.runsById['run:MR-EXP-TEST:1']!.monitoringResponses = [
      { windowIndex: 0, response: 'continue', completedPeriod: 0 },
    ];
    cases.push(['running after final window', runningAfterFinalWindow]);

    const earlyFinalBand = running();
    earlyFinalBand.experiments.runsById['run:MR-EXP-TEST:1']!.finalResultBand = 'robust';
    cases.push(['final band while running', earlyFinalBand]);

    const preparationMismatch = running();
    preparationMismatch.experiments.preparationById['run:MR-EXP-TEST:1']!.band = 'mixed';
    cases.push(['preparation and projected band mismatch', preparationMismatch]);

    const analysedMissingCard = copyCampaign();
    addAnalysedRun(analysedMissingCard);
    delete analysedMissingCard.experiments.evidenceCardsById['evidence:run:MR-EXP-TEST:1'];
    cases.push(['analysed run missing card', analysedMissingCard]);

    const terminalFactsOnReadyRun = copyCampaign();
    addAnalysedRun(terminalFactsOnReadyRun);
    terminalFactsOnReadyRun.experiments.runsById['run:MR-EXP-TEST:1']!.stage = 'readyForAnalysis';
    terminalFactsOnReadyRun.experiments.activeRunIds = ['run:MR-EXP-TEST:1'];
    cases.push(['terminal facts on ready run', terminalFactsOnReadyRun]);

    const stoppedMissingLog = copyCampaign();
    addStoppedRun(stoppedMissingLog);
    delete stoppedMissingLog.experiments.stopLogsById['stop:run:MR-EXP-TEST:1'];
    cases.push(['stopped run missing log', stoppedMissingLog]);

    const stoppedPeriodMismatch = copyCampaign();
    addStoppedRun(stoppedPeriodMismatch);
    stoppedPeriodMismatch.experiments.stopLogsById['stop:run:MR-EXP-TEST:1']!.stoppedPeriod = 1;
    cases.push(['stop period mismatch', stoppedPeriodMismatch]);

    const invalidSamiraSource = copyCampaign();
    invalidSamiraSource.experiments.evidenceCardsById['evidence:MR-SUP-SAMIRA-EVIDENCE'] = {
      id: 'evidence:MR-SUP-SAMIRA-EVIDENCE',
      runId: null,
      rawRecordId: null,
      sourceId: 'MR-SOURCE-WRONG',
      quality: 'usable',
      selectedReadingId: 'MR-READING-TEST',
      selectedCaveatId: 'MR-CAVEAT-TEST',
      reportedReadingStatus: 'honest',
      awardedSupport: 1,
      piimRole: 'none',
    };
    cases.push(['invalid Samira source', invalidSamiraSource]);

    for (const [label, state] of cases)
      expect(validateCampaignState(state), label).toMatchObject({ kind: 'failure' });
  });

  it('checks snapshots and scheduler queue, active-event, and period facts', () => {
    const badCurrent = copyCampaign();
    badCurrent.manuscript.currentSnapshotId = 'snapshot:1';
    expect(validateCampaignState(badCurrent)).toMatchObject({ kind: 'failure' });

    const missingSnapshot = copyCampaign();
    missingSnapshot.manuscript.snapshotOrder = ['snapshot:1'];
    missingSnapshot.manuscript.currentSnapshotId = 'snapshot:1';
    expect(validateCampaignState(missingSnapshot)).toMatchObject({ kind: 'failure' });

    const snapshot = copyCampaign();
    snapshot.metadata.stateRevision = 1;
    snapshot.manuscript.snapshotsById['snapshot:1'] = {
      id: 'snapshot:1',
      stateRevision: 1,
      board: structuredClone(snapshot.manuscript.board),
      requirementResults: emptyRequirementResults(),
      statedMissingRequirement: null,
    };
    snapshot.manuscript.snapshotOrder = ['snapshot:1'];
    snapshot.manuscript.currentSnapshotId = 'snapshot:1';
    expect(validateCampaignState(snapshot).kind).toBe('success');
    snapshot.manuscript.currentSnapshotId = null;
    expect(validateCampaignState(snapshot)).toMatchObject({ kind: 'failure' });

    const duplicateQueue = copyCampaign();
    duplicateQueue.narrative.scheduler.queue.push('MR-SCN-CLARIFIED');
    expect(validateCampaignState(duplicateQueue)).toMatchObject({ kind: 'failure' });

    const wrongQueueState = copyCampaign();
    wrongQueueState.narrative.scheduler.eventsById['MR-SCN-CLARIFIED']!.state = 'eligible';
    expect(validateCampaignState(wrongQueueState)).toMatchObject({ kind: 'failure' });

    const active = copyCampaign();
    active.metadata.stateRevision = 1;
    active.narrative.scheduler.queue = [];
    active.narrative.scheduler.activeEventId = 'MR-SCN-CLARIFIED';
    active.narrative.scheduler.eventsById['MR-SCN-CLARIFIED']!.state = 'active';
    active.narrative.scenesById['MR-SCN-CLARIFIED']!.state = 'inProgress';
    active.narrative.scenesById['MR-SCN-CLARIFIED']!.authoredFormId = 'MR-FORM-CLARIFIED';
    expect(validateCampaignState(active).kind).toBe('success');
    active.narrative.scenesById['MR-SCN-CLARIFIED']!.state = 'queued';
    expect(validateCampaignState(active)).toMatchObject({ kind: 'failure' });

    const lockedWithPeriod = copyCampaign();
    lockedWithPeriod.narrative.scheduler.eventsById['MR-SCN-CLARIFIED']!.state = 'locked';
    expect(validateCampaignState(lockedWithPeriod)).toMatchObject({ kind: 'failure' });

    const terminalWithoutPeriod = copyCampaign();
    terminalWithoutPeriod.narrative.scheduler.queue = [];
    terminalWithoutPeriod.narrative.scheduler.eventsById['MR-SCN-CLARIFIED']!.state = 'completed';
    expect(validateCampaignState(terminalWithoutPeriod)).toMatchObject({ kind: 'failure' });

    const futureEligibility = copyCampaign();
    futureEligibility.narrative.scheduler.eventsById['MR-SCN-CLARIFIED']!.firstEligiblePeriod = 1;
    expect(validateCampaignState(futureEligibility)).toMatchObject({ kind: 'failure' });
  });

  it.each([
    {
      label: 'top below 80',
      cards: { batch: 'met', oxygen: 'met', claim: 'met' },
      responseBand: 'top',
      bucket: 79,
      result: 'published',
    },
    {
      label: 'top at 80',
      cards: { batch: 'met', oxygen: 'met', claim: 'met' },
      responseBand: 'top',
      bucket: 80,
      result: 'acceptedPendingFinalWork',
    },
    {
      label: 'middle below 50',
      cards: { batch: 'met', oxygen: 'partlyMet', claim: 'partlyMet' },
      responseBand: 'middle',
      bucket: 49,
      result: 'acceptedPendingFinalWork',
    },
    {
      label: 'middle at 50',
      cards: { batch: 'met', oxygen: 'partlyMet', claim: 'partlyMet' },
      responseBand: 'middle',
      bucket: 50,
      result: 'underReview',
    },
    {
      label: 'weak below 20',
      cards: { batch: 'partlyMet', oxygen: 'partlyMet', claim: 'partlyMet' },
      responseBand: 'weak',
      bucket: 19,
      result: 'underReview',
    },
    {
      label: 'weak with an honest inflated claim',
      cards: { batch: 'met', oxygen: 'met', claim: 'notMet' },
      responseBand: 'weak',
      bucket: 19,
      result: 'underReview',
    },
    {
      label: 'weak at 20',
      cards: { batch: 'notMet', oxygen: 'met', claim: 'met' },
      responseBand: 'weak',
      bucket: 20,
      result: 'rejected',
    },
  ] satisfies Array<{
    label: string;
    cards: CampaignState['manuscript']['piimCards'];
    responseBand: NonNullable<CampaignState['manuscript']['piimOutcome']>['responseBand'];
    bucket: number;
    result: NonNullable<CampaignState['manuscript']['piimOutcome']>['result'];
  }>)(
    'accepts the exact PIIM boundary mapping: $label',
    ({ cards, responseBand, bucket, result }) => {
      expect(
        validateCampaignState(resolvedPiimState(cards, responseBand, bucket, result)).kind,
      ).toBe('success');
    },
  );

  it('rejects PIIM response, bucket, journal, and timing conflicts', () => {
    const wrongResponseBand = resolvedPiimState(
      { batch: 'met', oxygen: 'met', claim: 'met' },
      'middle',
      49,
      'acceptedPendingFinalWork',
    );
    expect(validateCampaignState(wrongResponseBand)).toMatchObject({
      kind: 'failure',
      issue: { path: '/manuscript/piimOutcome/responseBand' },
    });

    const wrongBoundaryResults = [
      resolvedPiimState({ batch: 'met', oxygen: 'met', claim: 'met' }, 'top', 80, 'published'),
      resolvedPiimState(
        { batch: 'met', oxygen: 'partlyMet', claim: 'partlyMet' },
        'middle',
        50,
        'acceptedPendingFinalWork',
      ),
      resolvedPiimState(
        { batch: 'partlyMet', oxygen: 'partlyMet', claim: 'partlyMet' },
        'weak',
        20,
        'underReview',
      ),
    ];
    for (const state of wrongBoundaryResults)
      expect(validateCampaignState(state)).toMatchObject({
        kind: 'failure',
        issue: { path: '/manuscript/piimOutcome/result' },
      });

    const unresolvedJournal = resolvedPiimState(
      { batch: 'met', oxygen: 'met', claim: 'met' },
      'top',
      79,
      'published',
    );
    unresolvedJournal.manuscript.journalState = 'majorRevision';
    expect(validateCampaignState(unresolvedJournal)).toMatchObject({
      kind: 'failure',
      issue: { path: '/manuscript/piimOutcome' },
    });

    const earlyOutcome = resolvedPiimState(
      { batch: 'met', oxygen: 'met', claim: 'met' },
      'top',
      79,
      'published',
    );
    earlyOutcome.calendar.periodIndex = 55;
    earlyOutcome.world.floorAct = 'reviewPressure';
    expect(validateCampaignState(earlyOutcome)).toMatchObject({
      kind: 'failure',
      issue: { path: '/manuscript/piimOutcome' },
    });
  });

  it.each([
    ['aldercroft', 0],
    ['aldercroft', 47],
    ['morrow', 0],
    ['morrow', 55],
  ] as const)('rejects route %s availability at early period %i', (routeId, periodIndex) => {
    const state = routeId === 'aldercroft' ? availableAldercroftState() : availableMorrowState();
    state.calendar.periodIndex = periodIndex;
    state.world.floorAct = periodIndex >= 36 ? 'reviewPressure' : 'orderlyButOverbooked';
    if (routeId === 'morrow' && periodIndex < 28)
      state.relationships.byId['MR-CHR-CAMILA']!.introduced = false;
    expect(validateCampaignState(state)).toMatchObject({
      kind: 'failure',
      issue: { path: `/narrative/routesById/${routeId}/evaluation` },
    });
  });

  it.each([
    ['aldercroft', 48, 'reviewPressure'],
    ['morrow', 56, 'decisionHorizon'],
  ] as const)(
    'accepts route %s availability at boundary period %i',
    (routeId, periodIndex, floorAct) => {
      const state = copyCampaign();
      if (routeId === 'morrow') {
        completePiimState(state, { batch: 'met', oxygen: 'met', claim: 'met' });
        state.narrative.careerProgress.camilaReplySent = true;
        state.narrative.careerProgress.morrowVideoCompleted = true;
        setCamilaTrust41(state);
      } else {
        state.metadata.stateRevision = 6;
        state.narrative.careerProgress.researchPlanCompletedPeriod = 43;
        setEvidenceSix(state);
      }
      state.calendar.periodIndex = periodIndex;
      state.world.floorAct = floorAct;
      state.narrative.routesById[routeId]!.state = 'available';
      state.narrative.routesById[routeId]!.evaluated = true;
      state.narrative.routesById[routeId]!.evaluation =
        routeId === 'aldercroft' ? eligibleAldercroftEvaluation() : eligibleMorrowEvaluation();
      expect(validateCampaignState(state).kind).toBe('success');
    },
  );

  it('checks exact relationships, world placement, presentation receipts, routes, and conclusion', () => {
    const missingRelationship = copyCampaign();
    delete missingRelationship.relationships.byId['MR-CHR-CAMILA'];
    expect(validateCampaignState(missingRelationship)).toMatchObject({ kind: 'failure' });

    const physicalCamila = copyCampaign();
    physicalCamila.world.characterPlacementsById = {
      'MR-CHR-CAMILA': { id: 'MR-CHR-CAMILA', anchorId: null },
      ...physicalCamila.world.characterPlacementsById,
    };
    expect(validateCampaignState(physicalCamila)).toMatchObject({ kind: 'failure' });

    const missingRoom = copyCampaign();
    delete missingRoom.world.roomStatesById['MR-ROOM-FACILITY-QUEUE'];
    expect(validateCampaignState(missingRoom)).toMatchObject({ kind: 'failure' });

    const invalidAnchor = copyCampaign();
    invalidAnchor.world.safeAnchorId = 'MR-LOCATION-TEST';
    expect(validateCampaignState(invalidAnchor)).toMatchObject({ kind: 'failure' });

    const contradictoryReceipt = copyCampaign();
    contradictoryReceipt.contentHistory.recordedSceneClosingIds = ['MR-SCN-CLARIFIED'];
    contradictoryReceipt.contentHistory.recordedSceneRecapIds = ['MR-SCN-CLARIFIED'];
    expect(validateCampaignState(contradictoryReceipt)).toMatchObject({ kind: 'failure' });

    const twoRoutes = copyCampaign();
    twoRoutes.narrative.routesById.aldercroft!.state = 'chosen';
    twoRoutes.narrative.routesById.morrow!.state = 'chosen';
    expect(validateCampaignState(twoRoutes)).toMatchObject({ kind: 'failure' });

    const missingModules = copyCampaign();
    missingModules.conclusion.state = 'epilogueInProgress';
    missingModules.conclusion.finalChoiceId = 'aldercroft';
    expect(validateCampaignState(missingModules)).toMatchObject({ kind: 'failure' });

    expect(validateCampaignState(conclusionState('aldercroft', 'completed')).kind).toBe('success');

    const recapCompletion = conclusionState('neither', 'completed');
    recapCompletion.narrative.scenesById['MR-SCN-0642']!.finalPresentationState = 'recapShown';
    recapCompletion.contentHistory.recordedSceneClosingIds = [];
    recapCompletion.contentHistory.recordedSceneRecapIds = ['MR-SCN-0642'];
    expect(validateCampaignState(recapCompletion).kind).toBe('success');

    const exhaustedCompletion = conclusionState('aldercroft', 'completed');
    exhaustedCompletion.calendar.crashPeriods = [63];
    exhaustedCompletion.conclusion.endingModuleIds![3] = 'MR-END-FATIGUE-EXHAUSTED';
    expect(validateCampaignState(exhaustedCompletion).kind).toBe('success');
  });

  it('accepts each exact conclusion phase and all four valid final choices', () => {
    const choicePending = conclusionState('aldercroft');
    choicePending.narrative.scenesById['MR-SCN-0642'] = {
      id: 'MR-SCN-0642',
      state: 'queued',
      authoredFormId: null,
      finalPresentationState: null,
    };
    choicePending.narrative.scheduler.eventsById['MR-SCN-0642'] = {
      id: 'MR-SCN-0642',
      state: 'queued',
      firstEligiblePeriod: 63,
      resolvedPeriod: null,
    };
    choicePending.narrative.scheduler.queue.push('MR-SCN-0642');
    choicePending.narrative.routesById.aldercroft!.state = 'available';
    choicePending.narrative.routesById.morrow!.state = 'closed';
    choicePending.narrative.routesById.morrow!.closureReason = 'playerDeclined';
    choicePending.conclusion.state = 'choicePending';
    choicePending.conclusion.finalChoiceId = null;

    expect(validateCampaignState(copyCampaign()).kind).toBe('success');
    expect(validateCampaignState(choicePending).kind).toBe('success');
    expect(validateCampaignState(conclusionState('aldercroft')).kind).toBe('success');
    expect(validateCampaignState(conclusionState('morrow')).kind).toBe('success');
    expect(validateCampaignState(conclusionState('leave')).kind).toBe('success');
    expect(validateCampaignState(conclusionState('neither')).kind).toBe('success');
    expect(validateCampaignState(conclusionState('aldercroft', 'epilogueInProgress')).kind).toBe(
      'success',
    );
    expect(validateCampaignState(conclusionState('aldercroft', 'completed')).kind).toBe('success');
  });

  it('rejects invalid choices, missing declines, skipped phases, and premature completion', () => {
    const cases: [string, CampaignState][] = [];

    const unknownChoice = conclusionState('aldercroft');
    unknownChoice.conclusion.finalChoiceId = 'MR-CHOICE-UNKNOWN';
    cases.push(['unknown final choice', unknownChoice]);

    const unavailableRoute = conclusionState('aldercroft');
    unavailableRoute.narrative.routesById.aldercroft!.state = 'closed';
    cases.push(['chosen route not recorded as chosen', unavailableRoute]);

    const missingDecline = conclusionState('aldercroft');
    missingDecline.narrative.routesById.morrow!.state = 'available';
    cases.push(['other available route not declined', missingDecline]);

    const departureWithoutRoute = conclusionState('leave');
    departureWithoutRoute.narrative.routesById.aldercroft!.state = 'closed';
    departureWithoutRoute.narrative.routesById.morrow!.state = 'closed';
    cases.push(['deliberate departure without a declined available route', departureWithoutRoute]);

    const neitherWithRoute = conclusionState('neither');
    neitherWithRoute.narrative.routesById.aldercroft!.state = 'declined';
    cases.push(['neither while a route remained', neitherWithRoute]);

    const unresolvedWithFinalScene = copyCampaign();
    addFinalScene(unresolvedWithFinalScene, 'queued');
    cases.push(['unresolved after the final scene became due', unresolvedWithFinalScene]);

    const pendingAfterChoice = conclusionState('aldercroft');
    pendingAfterChoice.conclusion.state = 'choicePending';
    pendingAfterChoice.conclusion.finalChoiceId = null;
    cases.push(['choice pending after the final scene became terminal', pendingAfterChoice]);

    const pendingBeforeRouteChecks = copyCampaign();
    addFinalScene(pendingBeforeRouteChecks, 'queued');
    pendingBeforeRouteChecks.conclusion.state = 'choicePending';
    cases.push(['choice pending before both route checks', pendingBeforeRouteChecks]);

    const pendingWithoutPaperResult = conclusionState('aldercroft');
    pendingWithoutPaperResult.narrative.scenesById['MR-SCN-0642']!.state = 'queued';
    pendingWithoutPaperResult.narrative.scenesById['MR-SCN-0642']!.authoredFormId = null;
    pendingWithoutPaperResult.narrative.scheduler.eventsById['MR-SCN-0642']!.state = 'queued';
    pendingWithoutPaperResult.narrative.scheduler.eventsById['MR-SCN-0642']!.resolvedPeriod = null;
    pendingWithoutPaperResult.narrative.scheduler.queue.push('MR-SCN-0642');
    pendingWithoutPaperResult.narrative.routesById.aldercroft!.state = 'available';
    pendingWithoutPaperResult.conclusion.state = 'choicePending';
    pendingWithoutPaperResult.conclusion.finalChoiceId = null;
    pendingWithoutPaperResult.manuscript.piimOutcome = null;
    pendingWithoutPaperResult.manuscript.finalPaperState = null;
    cases.push(['choice pending without a final paper result', pendingWithoutPaperResult]);

    const chosenWithUnevaluatedAlternative = conclusionState('aldercroft');
    chosenWithUnevaluatedAlternative.narrative.routesById.morrow = {
      id: 'morrow',
      state: 'locked',
      evaluated: false,
      evaluation: null,
      closureReason: null,
    };
    cases.push(['confirmed choice before the other route check', chosenWithUnevaluatedAlternative]);

    const skippedModulePhase = conclusionState('aldercroft', 'completed');
    skippedModulePhase.conclusion.endingModuleIds = null;
    cases.push(['completed without the first finalize phase', skippedModulePhase]);

    const wrongModuleOrder = conclusionState('aldercroft', 'epilogueInProgress');
    [
      wrongModuleOrder.conclusion.endingModuleIds![2],
      wrongModuleOrder.conclusion.endingModuleIds![3],
    ] = [
      wrongModuleOrder.conclusion.endingModuleIds![3],
      wrongModuleOrder.conclusion.endingModuleIds![2],
    ];
    cases.push(['ending modules outside exact family order', wrongModuleOrder]);

    const wrongCareerModule = conclusionState('morrow', 'epilogueInProgress');
    wrongCareerModule.conclusion.endingModuleIds![0] = 'MR-END-CAREER-ACADEMIA';
    cases.push(['career module does not match final choice', wrongCareerModule]);

    const missingPaperResult = conclusionState('aldercroft', 'epilogueInProgress');
    missingPaperResult.manuscript.piimOutcome = null;
    missingPaperResult.manuscript.finalPaperState = null;
    cases.push(['ending modules before final paper result', missingPaperResult]);

    const wrongPaperModule = conclusionState('aldercroft', 'epilogueInProgress');
    wrongPaperModule.conclusion.endingModuleIds![1] = 'MR-END-PAPER-REVIEW';
    cases.push(['paper module does not match final paper state', wrongPaperModule]);

    const wrongFatigueModule = conclusionState('aldercroft', 'epilogueInProgress');
    wrongFatigueModule.conclusion.endingModuleIds![3] = 'MR-END-FATIGUE-EXHAUSTED';
    cases.push(['fatigue module does not match final fatigue facts', wrongFatigueModule]);

    const epilogueBeforeFinalPresentation = conclusionState('aldercroft', 'epilogueInProgress');
    epilogueBeforeFinalPresentation.narrative.scenesById['MR-SCN-0642']!.finalPresentationState =
      null;
    epilogueBeforeFinalPresentation.contentHistory.recordedSceneClosingIds = [];
    cases.push(['epilogue before final-scene presentation', epilogueBeforeFinalPresentation]);

    const completedBeforeFinalPresentation = conclusionState('aldercroft', 'completed');
    completedBeforeFinalPresentation.narrative.scenesById['MR-SCN-0642']!.finalPresentationState =
      null;
    completedBeforeFinalPresentation.contentHistory.recordedSceneClosingIds = [];
    cases.push([
      'campaign completion before presentation or recap',
      completedBeforeFinalPresentation,
    ]);

    for (const [label, state] of cases)
      expect(validateCampaignState(state), label).toMatchObject({ kind: 'failure' });
  });

  it('rejects every internally checkable sparse, manuscript, content, and route fault', () => {
    const cases: [string, CampaignState][] = [];

    const missingRunEquipment = copyCampaign();
    addConfiguredRun(missingRunEquipment);
    delete missingRunEquipment.experiments.equipmentById['run:MR-EXP-TEST:1'];
    cases.push(['missing run-owned equipment', missingRunEquipment]);

    const orphanPreparation = copyCampaign();
    orphanPreparation.experiments.preparationById['run:MR-EXP-TEST:1'] = {
      id: 'run:MR-EXP-TEST:1',
      band: 'robust',
      history: [],
    };
    cases.push(['orphan preparation', orphanPreparation]);

    const openBand = copyCampaign();
    addConfiguredRun(openBand);
    Object.assign(openBand.experiments.preparationById['run:MR-EXP-TEST:1']!, {
      band: 'workable',
    });
    cases.push(['open preparation vocabulary', openBand]);

    const runningWithoutVariation = copyCampaign();
    addConfiguredRun(runningWithoutVariation);
    runningWithoutVariation.experiments.runsById['run:MR-EXP-TEST:1']!.stage = 'running';
    cases.push(['running without locked variation', runningWithoutVariation]);

    const forbiddenRepeat = copyCampaign();
    addConfiguredRun(
      forbiddenRepeat,
      configuredRun({
        id: 'run:MR-EXP-OXYGEN-LOSS:2',
        templateId: 'MR-EXP-OXYGEN-LOSS',
        runNumber: 2,
      }),
    );
    cases.push(['repeat for a non-repeatable template', forbiddenRepeat]);

    const fallbackRepeat = copyCampaign();
    addConfiguredRun(
      fallbackRepeat,
      configuredRun({
        id: 'run:MR-FB-EXP-RANGE-REPAIR:2',
        templateId: 'MR-FB-EXP-RANGE-REPAIR',
        runNumber: 2,
      }),
    );
    cases.push(['fallback range-repair run 2', fallbackRepeat]);

    const boardWithoutSnapshot = copyCampaign();
    boardWithoutSnapshot.manuscript.board.claim = 'MR-CLAIM-TEST';
    cases.push(['uncommitted manuscript board', boardWithoutSnapshot]);

    const missingReviewer = copyCampaign();
    delete missingReviewer.manuscript.reviewerReportsById['MR-REC-REVIEWER-3'];
    cases.push(['missing fixed reviewer', missingReviewer]);

    const prematurePiimCard = copyCampaign();
    prematurePiimCard.manuscript.piimCards.batch = 'met';
    prematurePiimCard.manuscript.piimCards.oxygen = 'met';
    prematurePiimCard.manuscript.piimCards.claim = 'met';
    cases.push(['PIIM facts before reviewer reports', prematurePiimCard]);

    const missingReadingEvidence = copyCampaign();
    missingReadingEvidence.manuscript.reportedReadingsByEvidenceId['evidence:missing'] = 'honest';
    cases.push(['reported reading without evidence', missingReadingEvidence]);

    const missingOmittedEvidence = copyCampaign();
    missingOmittedEvidence.manuscript.omittedEvidenceIds = ['evidence:missing'];
    cases.push(['omission without evidence', missingOmittedEvidence]);

    const sceneWithoutEvent = copyCampaign();
    sceneWithoutEvent.narrative.scenesById['MR-SCN-TEST'] = {
      id: 'MR-SCN-TEST',
      state: 'locked',
      authoredFormId: null,
      finalPresentationState: null,
    };
    cases.push(['scene without scheduler event', sceneWithoutEvent]);

    const missingOpening = copyCampaign();
    delete missingOpening.narrative.scenesById['MR-SCN-CLARIFIED'];
    cases.push(['missing permanent opening scene', missingOpening]);

    const replyWithoutState = copyCampaign();
    replyWithoutState.narrative.messagesById['MR-MSG-TEST'] = {
      id: 'MR-MSG-TEST',
      state: 'available',
      replyId: 'MR-REPLY-TEST',
    };
    cases.push(['message reply without replied state', replyWithoutState]);

    const responseWithoutState = copyCampaign();
    responseWithoutState.narrative.requestsById['MR-REQUEST-TEST'] = {
      id: 'MR-REQUEST-TEST',
      state: 'available',
      responseId: 'MR-RESPONSE-TEST',
    };
    cases.push(['request response without completed state', responseWithoutState]);

    const concernRegression = copyCampaign();
    concernRegression.narrative.concernsById['MR-CONCERN-TEST'] = {
      id: 'MR-CONCERN-TEST',
      sourceId: 'MR-SOURCE-TEST',
      visible: true,
      currentResponse: 'deny',
      responseHistory: ['correct'],
      routeImpact: 'both',
    };
    cases.push(['concern response regression', concernRegression]);

    const missingRoute = copyCampaign();
    delete missingRoute.narrative.routesById.morrow;
    cases.push(['missing fixed route', missingRoute]);

    const unevaluatedAvailableRoute = copyCampaign();
    unevaluatedAvailableRoute.narrative.routesById.aldercroft!.state = 'available';
    cases.push(['available route without evaluation', unevaluatedAvailableRoute]);

    const receiptWithoutPresentation = copyCampaign();
    receiptWithoutPresentation.contentHistory.recordedSceneClosingIds = ['MR-SCN-CLARIFIED'];
    cases.push(['closing receipt without terminal presentation', receiptWithoutPresentation]);

    const completedAndExpired = copyCampaign();
    completedAndExpired.contentHistory.completedContentIds = ['MR-CONTENT-TEST'];
    completedAndExpired.contentHistory.expiredContentIds = ['MR-CONTENT-TEST'];
    cases.push(['content both completed and expired', completedAndExpired]);

    for (const [label, state] of cases)
      expect(validateCampaignState(state), label).toMatchObject({ kind: 'failure' });
  });

  it('rejects detailed manuscript, scheduler, relationship, and conclusion conflicts', () => {
    const cases: [string, CampaignState][] = [];

    const snapshot = (): CampaignState => {
      const state = copyCampaign();
      state.metadata.stateRevision = 1;
      state.manuscript.snapshotsById['snapshot:1'] = {
        id: 'snapshot:1',
        stateRevision: 1,
        board: structuredClone(state.manuscript.board),
        requirementResults: emptyRequirementResults(),
        statedMissingRequirement: null,
      };
      state.manuscript.snapshotOrder = ['snapshot:1'];
      state.manuscript.currentSnapshotId = 'snapshot:1';
      return state;
    };

    const partialReviewer = snapshot();
    partialReviewer.manuscript.reviewerReportsById['MR-REC-REVIEWER-1']!.form = 'base';
    cases.push(['partial reviewer forms', partialReviewer]);

    const reportsWithoutSnapshot = copyCampaign();
    for (const report of Object.values(reportsWithoutSnapshot.manuscript.reviewerReportsById))
      report.form = 'base';
    cases.push(['reviewer forms without snapshot', reportsWithoutSnapshot]);

    const publicWithoutSnapshot = copyCampaign();
    publicWithoutSnapshot.manuscript.preprintState = 'public';
    cases.push(['public preprint without snapshot', publicWithoutSnapshot]);

    const submittedWithoutSnapshot = copyCampaign();
    submittedWithoutSnapshot.manuscript.journalState = 'submitted';
    cases.push(['journal submission without snapshot', submittedWithoutSnapshot]);

    const majorRevisionWithoutReports = snapshot();
    majorRevisionWithoutReports.manuscript.journalState = 'majorRevision';
    cases.push(['major revision without reports', majorRevisionWithoutReports]);

    const piimOutcomeWithoutCards = snapshot();
    for (const report of Object.values(piimOutcomeWithoutCards.manuscript.reviewerReportsById))
      report.form = 'base';
    piimOutcomeWithoutCards.manuscript.piimOutcome = {
      responseBand: 'top',
      namespace: 'piimOutcome',
      targetId: 'MR-PIIM-OUTCOME',
      drawIndex: 0,
      bucket: 1,
      result: 'published',
    };
    cases.push(['PIIM outcome without cards', piimOutcomeWithoutCards]);

    const mismatchedPiimResult = snapshot();
    for (const report of Object.values(mismatchedPiimResult.manuscript.reviewerReportsById))
      report.form = 'base';
    mismatchedPiimResult.manuscript.piimCards = {
      batch: 'met',
      oxygen: 'met',
      claim: 'met',
    };
    mismatchedPiimResult.manuscript.piimOutcome = {
      responseBand: 'top',
      namespace: 'piimOutcome',
      targetId: 'MR-PIIM-OUTCOME',
      drawIndex: 0,
      bucket: 1,
      result: 'published',
    };
    mismatchedPiimResult.manuscript.finalPaperState = 'underReview';
    cases.push(['PIIM result and paper state mismatch', mismatchedPiimResult]);

    const paperWithoutOutcome = snapshot();
    paperWithoutOutcome.manuscript.finalPaperState = 'published';
    cases.push(['final paper without outcome', paperWithoutOutcome]);

    const unexplainedRejection = snapshot();
    unexplainedRejection.manuscript.finalPaperState = 'rejectedOrWithdrawn';
    cases.push(['rejection without outcome or withdrawal', unexplainedRejection]);

    const samiraWithoutCredit = copyCampaign();
    samiraWithoutCredit.experiments.evidenceCardsById['evidence:MR-SUP-SAMIRA-EVIDENCE'] = {
      id: 'evidence:MR-SUP-SAMIRA-EVIDENCE',
      runId: null,
      rawRecordId: null,
      sourceId: 'MR-SUP-SAMIRA-EVIDENCE',
      quality: 'usable',
      selectedReadingId: 'MR-READING-TEST',
      selectedCaveatId: 'MR-CAVEAT-TEST',
      reportedReadingStatus: 'honest',
      awardedSupport: 1,
      piimRole: 'none',
    };
    samiraWithoutCredit.manuscript.reportedReadingsByEvidenceId['evidence:MR-SUP-SAMIRA-EVIDENCE'] =
      'honest';
    cases.push(['Samira evidence without credit', samiraWithoutCredit]);

    const activeAlsoQueued = copyCampaign();
    activeAlsoQueued.narrative.scheduler.activeEventId = 'MR-SCN-CLARIFIED';
    activeAlsoQueued.narrative.scheduler.eventsById['MR-SCN-CLARIFIED']!.state = 'active';
    activeAlsoQueued.narrative.scenesById['MR-SCN-CLARIFIED']!.state = 'inProgress';
    activeAlsoQueued.narrative.scenesById['MR-SCN-CLARIFIED']!.authoredFormId = 'MR-FORM-CLARIFIED';
    cases.push(['active event also queued', activeAlsoQueued]);

    const activeWithoutScene = copyCampaign();
    activeWithoutScene.narrative.scheduler.queue = [];
    activeWithoutScene.narrative.scheduler.activeEventId = 'MR-SCN-CLARIFIED';
    activeWithoutScene.narrative.scheduler.eventsById['MR-SCN-CLARIFIED']!.state = 'active';
    cases.push(['active event without in-progress scene', activeWithoutScene]);

    const unresolvedPeriod = copyCampaign();
    unresolvedPeriod.narrative.scheduler.eventsById['MR-SCN-CLARIFIED']!.resolvedPeriod = 0;
    cases.push(['resolved period on queued event', unresolvedPeriod]);

    const readWithoutReceipt = copyCampaign();
    readWithoutReceipt.narrative.messagesById['MR-MSG-TEST'] = {
      id: 'MR-MSG-TEST',
      state: 'read',
      replyId: null,
    };
    cases.push(['read message without receipt', readWithoutReceipt]);

    const consequentialSceneMissing = copyCampaign();
    consequentialSceneMissing.relationships.byId['MR-CHR-ELENA']!.lastConsequentialSceneId =
      'MR-SCN-MISSING';
    cases.push(['missing consequential scene', consequentialSceneMissing]);

    const routesAfterWithdrawal = snapshot();
    routesAfterWithdrawal.manuscript.preprintState = 'withdrawn';
    cases.push(['non-closed routes after public withdrawal', routesAfterWithdrawal]);

    const wrongConclusionRoute = copyCampaign();
    wrongConclusionRoute.calendar.periodIndex = 63;
    wrongConclusionRoute.world.floorAct = 'decisionHorizon';
    wrongConclusionRoute.conclusion.state = 'confirmed';
    wrongConclusionRoute.conclusion.finalChoiceId = 'aldercroft';
    wrongConclusionRoute.narrative.scenesById['MR-SCN-0642'] = {
      id: 'MR-SCN-0642',
      state: 'completed',
      authoredFormId: 'MR-FORM-0642',
      finalPresentationState: null,
    };
    wrongConclusionRoute.narrative.scheduler.eventsById['MR-SCN-0642'] = {
      id: 'MR-SCN-0642',
      state: 'completed',
      firstEligiblePeriod: 63,
      resolvedPeriod: 63,
    };
    cases.push(['conclusion route not chosen', wrongConclusionRoute]);

    for (const [label, state] of cases)
      expect(validateCampaignState(state), label).toMatchObject({ kind: 'failure' });
  });

  it('reconstructs every exact claim requirement and stated limitation', () => {
    const carefulMetResults = emptyRequirementResults();
    carefulMetResults.supportedFigure = 'met';
    carefulMetResults.relevantControl = 'met';
    carefulMetResults.caveat = 'met';
    const carefulMet = claimSnapshotState('careful', ['usable'], carefulMetResults);
    expect(validateCampaignState(carefulMet).kind).toBe('success');

    const carefulMissingResults = emptyRequirementResults();
    carefulMissingResults.supportedFigure = 'missing';
    carefulMissingResults.relevantControl = 'missing';
    carefulMissingResults.caveat = 'missing';
    expect(
      validateCampaignState(
        claimSnapshotState('careful', [], carefulMissingResults, { emptyBoard: true }),
      ).kind,
    ).toBe('success');

    const carefulUnsupportedResults = emptyRequirementResults();
    carefulUnsupportedResults.supportedFigure = 'unsupported';
    carefulUnsupportedResults.relevantControl = 'unsupported';
    carefulUnsupportedResults.caveat = 'unsupported';
    expect(
      validateCampaignState(
        claimSnapshotState('careful', ['inconclusive'], carefulUnsupportedResults),
      ).kind,
    ).toBe('success');

    const carefulConflictResults = emptyRequirementResults();
    carefulConflictResults.supportedFigure = 'conflict';
    carefulConflictResults.relevantControl = 'conflict';
    carefulConflictResults.caveat = 'conflict';
    expect(
      validateCampaignState(claimSnapshotState('careful', ['suspicious'], carefulConflictResults))
        .kind,
    ).toBe('success');

    const strongMissingResults = emptyRequirementResults();
    strongMissingResults.distinctExperimentFigures = 'missing';
    strongMissingResults.structureCoverage = 'met';
    strongMissingResults.rhythmCoverage = 'met';
    strongMissingResults.matchedControl = 'met';
    strongMissingResults.caveat = 'met';
    const stated = claimSnapshotState('strong', ['usable'], strongMissingResults);
    stated.manuscript.snapshotsById['snapshot:1']!.statedMissingRequirement =
      'distinctExperimentFigures';
    expect(validateCampaignState(stated).kind).toBe('success');

    const inflatedHonestResults = emptyRequirementResults();
    inflatedHonestResults.distinctExperimentFigures = 'met';
    inflatedHonestResults.structureCoverage = 'met';
    inflatedHonestResults.rhythmCoverage = 'met';
    inflatedHonestResults.matchedControl = 'met';
    inflatedHonestResults.caveat = 'met';
    inflatedHonestResults.causalSupport = 'unsupported';
    expect(
      validateCampaignState(
        claimSnapshotState('inflated', ['usable', 'usable'], inflatedHonestResults),
      ).kind,
    ).toBe('success');

    const inflatedApparentResults = structuredClone(inflatedHonestResults);
    inflatedApparentResults.causalSupport = 'met';
    expect(
      validateCampaignState(
        claimSnapshotState('inflated', ['usable', 'usable'], inflatedApparentResults, {
          reportedEvidence: { index: 0, status: 'altered' },
        }),
      ).kind,
    ).toBe('success');
    expect(
      validateCampaignState(
        claimSnapshotState('inflated', ['usable', 'usable'], inflatedApparentResults, {
          reportedEvidence: { index: 0, status: 'unsupported' },
        }),
      ).kind,
    ).toBe('success');

    const nonApplicable = structuredClone(carefulMet);
    nonApplicable.manuscript.snapshotsById['snapshot:1']!.requirementResults.causalSupport = 'met';
    expect(validateCampaignState(nonApplicable)).toMatchObject({ kind: 'failure' });

    const absentApplicable = structuredClone(stated);
    absentApplicable.manuscript.snapshotsById['snapshot:1']!.requirementResults.matchedControl =
      null;
    expect(validateCampaignState(absentApplicable)).toMatchObject({ kind: 'failure' });

    const wrongStatedRequirement = structuredClone(stated);
    wrongStatedRequirement.manuscript.snapshotsById['snapshot:1']!.statedMissingRequirement =
      'matchedControl';
    expect(validateCampaignState(wrongStatedRequirement)).toMatchObject({ kind: 'failure' });
  });

  it.each([
    {
      label: 'expected met changed to missing',
      claimLevel: 'careful',
      evidenceQualities: ['usable'],
      expectedResults: {
        supportedFigure: 'met',
        relevantControl: 'met',
        caveat: 'met',
      },
      key: 'supportedFigure',
      wrongResult: 'missing',
    },
    {
      label: 'expected met changed to unsupported',
      claimLevel: 'careful',
      evidenceQualities: ['usable'],
      expectedResults: {
        supportedFigure: 'met',
        relevantControl: 'met',
        caveat: 'met',
      },
      key: 'relevantControl',
      wrongResult: 'unsupported',
    },
    {
      label: 'expected missing changed to met',
      claimLevel: 'strong',
      evidenceQualities: ['usable'],
      expectedResults: {
        distinctExperimentFigures: 'missing',
        structureCoverage: 'met',
        rhythmCoverage: 'met',
        matchedControl: 'met',
        caveat: 'met',
      },
      key: 'distinctExperimentFigures',
      wrongResult: 'met',
    },
    {
      label: 'expected unsupported changed to met',
      claimLevel: 'careful',
      evidenceQualities: ['inconclusive'],
      expectedResults: {
        supportedFigure: 'unsupported',
        relevantControl: 'unsupported',
        caveat: 'unsupported',
      },
      key: 'supportedFigure',
      wrongResult: 'met',
    },
    {
      label: 'expected conflict changed to met',
      claimLevel: 'careful',
      evidenceQualities: ['suspicious'],
      expectedResults: {
        supportedFigure: 'conflict',
        relevantControl: 'conflict',
        caveat: 'conflict',
      },
      key: 'supportedFigure',
      wrongResult: 'met',
    },
    {
      label: 'honest Inflated causal support changed from unsupported to met',
      claimLevel: 'inflated',
      evidenceQualities: ['usable', 'usable'],
      expectedResults: {
        distinctExperimentFigures: 'met',
        structureCoverage: 'met',
        rhythmCoverage: 'met',
        matchedControl: 'met',
        caveat: 'met',
        causalSupport: 'unsupported',
      },
      key: 'causalSupport',
      wrongResult: 'met',
    },
  ] satisfies Array<{
    label: string;
    claimLevel: 'careful' | 'strong' | 'inflated';
    evidenceQualities: Array<'usable' | 'inconclusive' | 'suspicious'>;
    expectedResults: Partial<ManuscriptRequirementResults>;
    key: keyof ManuscriptRequirementResults;
    wrongResult: 'met' | 'missing' | 'unsupported';
  }>)(
    'rejects an isolated stored claim result mismatch: $label',
    ({ label, claimLevel, evidenceQualities, expectedResults, key, wrongResult }) => {
      const validResults = { ...emptyRequirementResults(), ...expectedResults };
      const validState = claimSnapshotState(claimLevel, evidenceQualities, validResults);
      expect(validateCampaignState(validState), `${label} positive control`).toMatchObject({
        kind: 'success',
      });

      const wrongStoredResult = structuredClone(validState);
      wrongStoredResult.manuscript.snapshotsById['snapshot:1']!.requirementResults[key] =
        wrongResult;
      expect(validateCampaignState(wrongStoredResult), label).toMatchObject({
        kind: 'failure',
        issue: {
          path: `/manuscript/snapshotsById/snapshot:1/requirementResults/${key}`,
        },
      });
    },
  );

  it('keeps historical requirement truth when evidence is later omitted, restored, or corrected', () => {
    const metResults = {
      ...emptyRequirementResults(),
      supportedFigure: 'met' as const,
      relevantControl: 'met' as const,
      caveat: 'met' as const,
    };

    const laterOmission = claimSnapshotState('careful', ['usable'], metResults);
    const historicalEvidenceId = laterOmission.manuscript.board.figures[0]!;
    const replacementId = addPiimEvidence(laterOmission, 'MR-EXP-LATER-EVIDENCE', 'none');
    const replacementRawId =
      laterOmission.experiments.evidenceCardsById[replacementId]!.rawRecordId!;
    laterOmission.manuscript.board.figures = [replacementId, null, null];
    laterOmission.manuscript.board.controls = [
      laterOmission.experiments.rawRecordsById[replacementRawId]!.controlResultId,
      null,
    ];
    laterOmission.manuscript.omittedEvidenceIds = [historicalEvidenceId];
    appendCurrentSnapshot(laterOmission, 2, structuredClone(metResults));
    expect(validateCampaignState(laterOmission).kind).toBe('success');

    const laterRestoration = claimSnapshotState('careful', ['usable'], structuredClone(metResults));
    const restoredHistorical = laterRestoration.manuscript.snapshotsById['snapshot:1']!;
    restoredHistorical.requirementResults.supportedFigure = 'missing';
    restoredHistorical.requirementResults.relevantControl = 'missing';
    restoredHistorical.requirementResults.caveat = 'missing';
    appendCurrentSnapshot(laterRestoration, 2, structuredClone(metResults));
    expect(validateCampaignState(laterRestoration).kind).toBe('success');

    const correctedDraft = claimSnapshotState('careful', ['inconclusive'], metResults, {
      reportedEvidence: { index: 0, status: 'altered' },
    });
    const correctedEvidenceId = correctedDraft.manuscript.board.figures[0]!;
    correctedDraft.manuscript.reportedReadingsByEvidenceId[correctedEvidenceId] = 'honest';
    appendCurrentSnapshot(correctedDraft, 2, {
      ...emptyRequirementResults(),
      supportedFigure: 'unsupported',
      relevantControl: 'unsupported',
      caveat: 'unsupported',
    });
    expect(validateCampaignState(correctedDraft).kind).toBe('success');
  });

  it.each(['current', 'historical'] as const)(
    'rejects missing manuscript evidence references in a %s snapshot at the exact board path',
    (snapshotAge) => {
      const makeState = (): CampaignState => {
        const state = claimSnapshotState('careful', ['usable'], {
          ...emptyRequirementResults(),
          supportedFigure: 'met',
          relevantControl: 'met',
          caveat: 'met',
        });
        if (snapshotAge === 'historical')
          appendCurrentSnapshot(
            state,
            2,
            structuredClone(state.manuscript.snapshotsById['snapshot:1']!.requirementResults),
          );
        return state;
      };
      const snapshotId = snapshotAge === 'current' ? 'snapshot:1' : 'snapshot:1';

      const missingFigure = makeState();
      missingFigure.manuscript.snapshotsById[snapshotId]!.board.figures[0] = 'evidence:missing';
      if (snapshotAge === 'current') missingFigure.manuscript.board.figures[0] = 'evidence:missing';
      expect(validateCampaignState(missingFigure)).toMatchObject({
        kind: 'failure',
        issue: {
          path: `/manuscript/snapshotsById/${snapshotId}/board/figures/0`,
          reason: 'invalidReference',
        },
      });

      const unmatchedControl = makeState();
      unmatchedControl.manuscript.snapshotsById[snapshotId]!.board.controls[0] =
        'MR-CONTROL-MISSING';
      if (snapshotAge === 'current')
        unmatchedControl.manuscript.board.controls[0] = 'MR-CONTROL-MISSING';
      expect(validateCampaignState(unmatchedControl)).toMatchObject({
        kind: 'failure',
        issue: {
          path: `/manuscript/snapshotsById/${snapshotId}/board/controls/0`,
          reason: 'invalidReference',
        },
      });

      const unmatchedCaveat = makeState();
      unmatchedCaveat.manuscript.snapshotsById[snapshotId]!.board.caveat = 'MR-CAVEAT-MISSING';
      if (snapshotAge === 'current') unmatchedCaveat.manuscript.board.caveat = 'MR-CAVEAT-MISSING';
      expect(validateCampaignState(unmatchedCaveat)).toMatchObject({
        kind: 'failure',
        issue: {
          path: `/manuscript/snapshotsById/${snapshotId}/board/caveat`,
          reason: 'invalidReference',
        },
      });
    },
  );

  it('enforces PIIM source identity, inclusion, milestone order, and the exact target', () => {
    const valid = resolvedPiimState(
      { batch: 'met', oxygen: 'partlyMet', claim: 'met' },
      'middle',
      49,
      'acceptedPendingFinalWork',
    );
    expect(validateCampaignState(valid).kind).toBe('success');

    const sourceCases: CampaignState[] = [];
    const wrongRole = structuredClone(valid);
    wrongRole.experiments.evidenceCardsById[
      wrongRole.manuscript.piimCardSources.batchEvidenceCardId!
    ]!.piimRole = 'oxygen';
    sourceCases.push(wrongRole);
    const missingFigure = structuredClone(valid);
    missingFigure.manuscript.board.figures[0] = null;
    missingFigure.manuscript.snapshotsById['snapshot:1']!.board.figures[0] = null;
    sourceCases.push(missingFigure);
    const missingControl = structuredClone(valid);
    missingControl.manuscript.board.controls[0] = null;
    missingControl.manuscript.snapshotsById['snapshot:1']!.board.controls[0] = null;
    sourceCases.push(missingControl);
    const wrongCaveat = structuredClone(valid);
    wrongCaveat.manuscript.board.caveat = 'MR-CAVEAT-OTHER';
    wrongCaveat.manuscript.snapshotsById['snapshot:1']!.board.caveat = 'MR-CAVEAT-OTHER';
    sourceCases.push(wrongCaveat);
    const omitted = structuredClone(valid);
    omitted.manuscript.omittedEvidenceIds = [
      omitted.manuscript.piimCardSources.batchEvidenceCardId!,
    ];
    sourceCases.push(omitted);
    const staleSnapshot = structuredClone(valid);
    staleSnapshot.manuscript.piimCardSources.claimSnapshotId = 'snapshot:other';
    sourceCases.push(staleSnapshot);
    for (const state of sourceCases)
      expect(validateCampaignState(state)).toMatchObject({ kind: 'failure' });

    const badMilestone = structuredClone(valid);
    badMilestone.manuscript.piimMilestones.reviewerReportsRevision = 3;
    expect(validateCampaignState(badMilestone)).toMatchObject({
      kind: 'failure',
      issue: { path: '/manuscript/piimMilestones/reviewerReportsRevision' },
    });

    const missingMilestone = structuredClone(valid);
    missingMilestone.manuscript.piimOutcome = null;
    missingMilestone.manuscript.piimMilestones.piimOutcomeRevision = null;
    missingMilestone.manuscript.finalPaperState = null;
    missingMilestone.manuscript.piimMilestones.piimCardsRevision = null;
    expect(validateCampaignState(missingMilestone)).toMatchObject({
      kind: 'failure',
      issue: { path: '/manuscript/piimMilestones/piimCardsRevision' },
    });

    const futurePreprintSource = structuredClone(valid);
    futurePreprintSource.manuscript.piimMilestones.publicPreprintRevision = 1;
    expect(validateCampaignState(futurePreprintSource)).toMatchObject({
      kind: 'failure',
      issue: { path: '/manuscript/piimMilestones/publicPreprintRevision' },
    });

    const olderPiimSnapshot = structuredClone(valid);
    moveCurrentSnapshot(olderPiimSnapshot, 4);
    expect(validateCampaignState(olderPiimSnapshot)).toMatchObject({
      kind: 'failure',
      issue: { path: '/manuscript/piimMilestones/piimCardsRevision' },
    });

    const futurePiimSnapshot = structuredClone(valid);
    moveCurrentSnapshot(futurePiimSnapshot, 6);
    expect(validateCampaignState(futurePiimSnapshot)).toMatchObject({
      kind: 'failure',
      issue: { path: '/manuscript/piimMilestones/piimCardsRevision' },
    });

    const sameRevisionPiimSnapshot = structuredClone(valid);
    expect(
      sameRevisionPiimSnapshot.manuscript.snapshotsById[
        sameRevisionPiimSnapshot.manuscript.currentSnapshotId!
      ]!.stateRevision,
    ).toBe(sameRevisionPiimSnapshot.manuscript.piimMilestones.piimCardsRevision);
    expect(validateCampaignState(sameRevisionPiimSnapshot).kind).toBe('success');

    const wrongTarget = structuredClone(valid);
    wrongTarget.manuscript.piimOutcome!.targetId = 'MR-PIIM-OTHER';
    expect(validateCampaignState(wrongTarget)).toMatchObject({
      kind: 'failure',
      issue: { path: '/manuscript/piimOutcome/targetId' },
    });
  });

  it('forces Weak PIIM response when the current snapshot has a visible conflict', () => {
    const state = resolvedPiimState(
      { batch: 'met', oxygen: 'met', claim: 'met' },
      'top',
      1,
      'published',
    );
    const snapshot = state.manuscript.snapshotsById['snapshot:5']!;
    const conflictingEvidenceId = snapshot.board.figures[0]!;
    const conflictingCard = state.experiments.evidenceCardsById[conflictingEvidenceId]!;
    conflictingCard.quality = 'suspicious';
    state.experiments.rawRecordsById[conflictingCard.rawRecordId!]!.internalMismatch = true;
    snapshot.requirementResults.supportedFigure = 'conflict';
    snapshot.requirementResults.relevantControl = 'conflict';
    snapshot.requirementResults.caveat = 'conflict';
    state.manuscript.piimCards = { batch: 'notMet', oxygen: 'met', claim: 'notMet' };
    state.manuscript.piimOutcome!.responseBand = 'weak';
    state.manuscript.piimOutcome!.result = 'underReview';
    state.manuscript.finalPaperState = 'underReview';
    expect(validateCampaignState(state).kind).toBe('success');
    state.manuscript.piimOutcome!.responseBand = 'top';
    expect(validateCampaignState(state)).toMatchObject({
      kind: 'failure',
      issue: { path: '/manuscript/piimOutcome/responseBand' },
    });
  });

  it('keeps batch and oxygen source-local when an unrelated figure contradicts the claim', () => {
    const state = resolvedPiimState(
      { batch: 'met', oxygen: 'met', claim: 'met' },
      'top',
      1,
      'published',
    );
    const unrelatedId = addPiimEvidence(state, 'MR-EXP-UNRELATED-CONFLICT', 'none', 'suspicious');
    const unrelatedCard = state.experiments.evidenceCardsById[unrelatedId]!;
    state.experiments.rawRecordsById[unrelatedCard.rawRecordId!]!.internalMismatch = true;
    const currentSnapshot = state.manuscript.snapshotsById[state.manuscript.currentSnapshotId!]!;
    currentSnapshot.board.figures[2] = unrelatedId;
    state.manuscript.board.figures[2] = unrelatedId;
    currentSnapshot.requirementResults.supportedFigure = 'conflict';
    currentSnapshot.requirementResults.caveat = 'conflict';
    state.manuscript.piimCards = { batch: 'met', oxygen: 'met', claim: 'notMet' };
    state.manuscript.piimOutcome!.responseBand = 'weak';
    state.manuscript.piimOutcome!.result = 'underReview';
    state.manuscript.finalPaperState = 'underReview';
    expect(validateCampaignState(state).kind).toBe('success');
  });

  it.each([
    ['batch', 'altered'],
    ['batch', 'unsupported'],
    ['oxygen', 'altered'],
    ['oxygen', 'unsupported'],
  ] as const)('maps an apparently supportive %s report with %s status to Met', (role, status) => {
    const state = resolvedPiimState(
      { batch: 'met', oxygen: 'met', claim: 'met' },
      'top',
      1,
      'published',
    );
    const sourceId =
      role === 'batch'
        ? state.manuscript.piimCardSources.batchEvidenceCardId!
        : state.manuscript.piimCardSources.oxygenEvidenceCardId!;
    state.experiments.evidenceCardsById[sourceId]!.quality = 'worthRepeating';
    state.manuscript.reportedReadingsByEvidenceId[sourceId] = status;
    expect(validateCampaignState(state).kind).toBe('success');
  });

  it.each([
    ['batch', 'altered'],
    ['batch', 'unsupported'],
    ['oxygen', 'altered'],
    ['oxygen', 'unsupported'],
  ] as const)('maps a locally contradicted %s report with %s status to Not Met', (role, status) => {
    const state = resolvedPiimState(
      { batch: 'met', oxygen: 'met', claim: 'met' },
      'top',
      1,
      'published',
    );
    const sourceId =
      role === 'batch'
        ? state.manuscript.piimCardSources.batchEvidenceCardId!
        : state.manuscript.piimCardSources.oxygenEvidenceCardId!;
    const card = state.experiments.evidenceCardsById[sourceId]!;
    state.manuscript.reportedReadingsByEvidenceId[sourceId] = status;
    card.quality = 'suspicious';
    state.experiments.rawRecordsById[card.rawRecordId!]!.internalMismatch = true;
    const currentSnapshot = state.manuscript.snapshotsById[state.manuscript.currentSnapshotId!]!;
    currentSnapshot.requirementResults.supportedFigure = 'conflict';
    currentSnapshot.requirementResults.relevantControl = 'conflict';
    currentSnapshot.requirementResults.caveat = 'conflict';
    state.manuscript.piimCards = {
      batch: role === 'batch' ? 'notMet' : 'met',
      oxygen: role === 'oxygen' ? 'notMet' : 'met',
      claim: 'notMet',
    };
    state.manuscript.piimOutcome!.responseBand = 'weak';
    state.manuscript.piimOutcome!.result = 'underReview';
    state.manuscript.finalPaperState = 'underReview';
    expect(validateCampaignState(state).kind).toBe('success');
  });

  it.each([
    ['aldercroft', availableAldercroftState, 49],
    ['morrow', availableMorrowState, 57],
  ] as const)(
    'requires the saved %s evaluation period to equal the current period at evaluation',
    (routeId, makeState, laterPeriod) => {
      const positive = makeState();
      expect(validateCampaignState(positive).kind).toBe('success');

      const mismatchedPeriod = makeState();
      mismatchedPeriod.calendar.periodIndex = laterPeriod;
      expect(validateCampaignState(mismatchedPeriod)).toMatchObject({
        kind: 'failure',
        issue: { path: `/narrative/routesById/${routeId}/evaluation/evaluationPeriod` },
      });

      const laterLockedProof = makeState();
      laterLockedProof.metadata.stateRevision += 1;
      laterLockedProof.calendar.periodIndex = laterPeriod;
      expect(validateCampaignState(laterLockedProof).kind).toBe('success');
    },
  );

  it('checks every current-only Aldercroft predicate exactly at evaluation', () => {
    const publicPositive = availableAldercroftStateWithPublicPreprint();
    expect(validateCampaignState(publicPositive).kind).toBe('success');

    for (const routeImpact of ['aldercroft', 'both'] as const) {
      const blocked = availableAldercroftState();
      addBlockingConcern(blocked, routeImpact);
      expect(validateCampaignState(blocked), routeImpact).toMatchObject({
        kind: 'failure',
        issue: { path: '/narrative/routesById/aldercroft/evaluation/noBlockingConcern' },
      });
    }

    const falseWithoutConcern = availableAldercroftState();
    const falseEvaluation = falseWithoutConcern.narrative.routesById.aldercroft!.evaluation!;
    if (falseEvaluation.routeId !== 'aldercroft') throw new Error('missing Aldercroft proof');
    falseEvaluation.noBlockingConcern = false;
    falseEvaluation.eligible = false;
    falseWithoutConcern.narrative.routesById.aldercroft!.state = 'closed';
    falseWithoutConcern.narrative.routesById.aldercroft!.closureReason = 'failedEvaluation';
    expect(validateCampaignState(falseWithoutConcern)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/aldercroft/evaluation/noBlockingConcern' },
    });

    const withdrawnAtEvaluation = availableAldercroftStateWithPublicPreprint();
    withdrawnAtEvaluation.manuscript.preprintState = 'withdrawn';
    withdrawnAtEvaluation.manuscript.finalPaperState = 'rejectedOrWithdrawn';
    withdrawnAtEvaluation.narrative.routesById.aldercroft!.state = 'closed';
    withdrawnAtEvaluation.narrative.routesById.aldercroft!.closureReason = 'publicWithdrawal';
    withdrawnAtEvaluation.narrative.routesById.morrow!.state = 'closed';
    withdrawnAtEvaluation.narrative.routesById.morrow!.closureReason = 'publicWithdrawal';
    expect(validateCampaignState(withdrawnAtEvaluation)).toMatchObject({
      kind: 'failure',
      issue: {
        path: '/narrative/routesById/aldercroft/evaluation/publicRecordNotWithdrawn',
      },
    });
  });

  it('checks every current-only Morrow predicate exactly at evaluation', () => {
    const positive = availableMorrowState();
    expect(validateCampaignState(positive).kind).toBe('success');

    const missingReply = availableMorrowState();
    missingReply.narrative.careerProgress.camilaReplySent = false;
    missingReply.narrative.careerProgress.morrowVideoCompleted = false;
    const replyEvaluation = missingReply.narrative.routesById.morrow!.evaluation!;
    if (replyEvaluation.routeId !== 'morrow') throw new Error('missing Morrow proof');
    replyEvaluation.morrowVideoCompleted = false;
    replyEvaluation.eligible = false;
    missingReply.narrative.routesById.morrow!.state = 'closed';
    missingReply.narrative.routesById.morrow!.closureReason = 'failedEvaluation';
    expect(validateCampaignState(missingReply)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/morrow/evaluation/camilaReplySent' },
    });

    const missingVideo = availableMorrowState();
    missingVideo.narrative.careerProgress.morrowVideoCompleted = false;
    expect(validateCampaignState(missingVideo)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/morrow/evaluation/morrowVideoCompleted' },
    });

    const falseRecordCount = availableMorrowState();
    const countEvaluation = falseRecordCount.narrative.routesById.morrow!.evaluation!;
    if (countEvaluation.routeId !== 'morrow') throw new Error('missing Morrow proof');
    countEvaluation.threeAnalysedRecords = false;
    countEvaluation.eligible = false;
    falseRecordCount.narrative.routesById.morrow!.state = 'closed';
    falseRecordCount.narrative.routesById.morrow!.closureReason = 'failedEvaluation';
    expect(validateCampaignState(falseRecordCount)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/morrow/evaluation/threeAnalysedRecords' },
    });

    const withdrawnPreprint = availableMorrowState();
    withdrawnPreprint.manuscript.preprintState = 'withdrawn';
    withdrawnPreprint.manuscript.finalPaperState = 'rejectedOrWithdrawn';
    withdrawnPreprint.narrative.routesById.morrow!.state = 'closed';
    withdrawnPreprint.narrative.routesById.morrow!.closureReason = 'publicWithdrawal';
    withdrawnPreprint.narrative.routesById.aldercroft!.state = 'closed';
    withdrawnPreprint.narrative.routesById.aldercroft!.closureReason = 'publicWithdrawal';
    expect(validateCampaignState(withdrawnPreprint)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/morrow/evaluation/publicPreprintAvailable' },
    });

    const existingConfession = availableMorrowState();
    existingConfession.narrative.careerProgress.fabricationConfessedToCamila = true;
    existingConfession.narrative.routesById.morrow!.state = 'closed';
    existingConfession.narrative.routesById.morrow!.closureReason = 'fabricationConfession';
    expect(validateCampaignState(existingConfession)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/morrow/evaluation/noFabricationConfession' },
    });

    for (const routeImpact of ['morrow', 'both'] as const) {
      const blocked = availableMorrowState();
      addBlockingConcern(blocked, routeImpact);
      expect(validateCampaignState(blocked), routeImpact).toMatchObject({
        kind: 'failure',
        issue: { path: '/narrative/routesById/morrow/evaluation/noBlockingConflict' },
      });
    }

    const falseWithoutConflict = availableMorrowState();
    const conflictEvaluation = falseWithoutConflict.narrative.routesById.morrow!.evaluation!;
    if (conflictEvaluation.routeId !== 'morrow') throw new Error('missing Morrow proof');
    conflictEvaluation.noBlockingConflict = false;
    conflictEvaluation.eligible = false;
    falseWithoutConflict.narrative.routesById.morrow!.state = 'closed';
    falseWithoutConflict.narrative.routesById.morrow!.closureReason = 'failedEvaluation';
    expect(validateCampaignState(falseWithoutConflict)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/morrow/evaluation/noBlockingConflict' },
    });
  });

  it('preserves route proof after later mutable progress, withdrawal, or confession', () => {
    const progressAfterFailure = availableMorrowState();
    const progressEvaluation = progressAfterFailure.narrative.routesById.morrow!.evaluation!;
    if (progressEvaluation.routeId !== 'morrow') throw new Error('missing Morrow proof');
    progressAfterFailure.narrative.careerProgress.camilaReplySent = false;
    progressAfterFailure.narrative.careerProgress.morrowVideoCompleted = false;
    progressEvaluation.camilaReplySent = false;
    progressEvaluation.morrowVideoCompleted = false;
    progressEvaluation.eligible = false;
    progressAfterFailure.narrative.routesById.morrow!.state = 'closed';
    progressAfterFailure.narrative.routesById.morrow!.closureReason = 'failedEvaluation';
    expect(validateCampaignState(progressAfterFailure).kind).toBe('success');
    progressAfterFailure.metadata.stateRevision = 8;
    progressAfterFailure.narrative.careerProgress.camilaReplySent = true;
    progressAfterFailure.narrative.careerProgress.morrowVideoCompleted = true;
    expect(validateCampaignState(progressAfterFailure).kind).toBe('success');

    const lostReplyLater = availableMorrowState();
    lostReplyLater.metadata.stateRevision = 8;
    lostReplyLater.narrative.careerProgress.camilaReplySent = false;
    lostReplyLater.narrative.careerProgress.morrowVideoCompleted = false;
    expect(validateCampaignState(lostReplyLater)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/morrow/evaluation/camilaReplySent' },
    });

    const lostVideoLater = availableMorrowState();
    lostVideoLater.metadata.stateRevision = 8;
    lostVideoLater.narrative.careerProgress.morrowVideoCompleted = false;
    expect(validateCampaignState(lostVideoLater)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/morrow/evaluation/morrowVideoCompleted' },
    });

    const morrowWithdrawal = availableMorrowState();
    morrowWithdrawal.metadata.stateRevision = 8;
    morrowWithdrawal.manuscript.preprintState = 'withdrawn';
    morrowWithdrawal.manuscript.finalPaperState = 'rejectedOrWithdrawn';
    morrowWithdrawal.narrative.routesById.morrow!.state = 'closed';
    morrowWithdrawal.narrative.routesById.morrow!.closureReason = 'publicWithdrawal';
    morrowWithdrawal.narrative.routesById.aldercroft!.state = 'closed';
    morrowWithdrawal.narrative.routesById.aldercroft!.closureReason = 'publicWithdrawal';
    expect(validateCampaignState(morrowWithdrawal).kind).toBe('success');

    const aldercroftWithdrawal = availableAldercroftStateWithPublicPreprint();
    aldercroftWithdrawal.metadata.stateRevision = 7;
    aldercroftWithdrawal.manuscript.preprintState = 'withdrawn';
    aldercroftWithdrawal.manuscript.finalPaperState = 'rejectedOrWithdrawn';
    aldercroftWithdrawal.narrative.routesById.aldercroft!.state = 'closed';
    aldercroftWithdrawal.narrative.routesById.aldercroft!.closureReason = 'publicWithdrawal';
    aldercroftWithdrawal.narrative.routesById.morrow!.state = 'closed';
    aldercroftWithdrawal.narrative.routesById.morrow!.closureReason = 'publicWithdrawal';
    expect(validateCampaignState(aldercroftWithdrawal).kind).toBe('success');

    const laterConfession = availableMorrowState();
    laterConfession.metadata.stateRevision = 8;
    laterConfession.narrative.careerProgress.fabricationConfessedToCamila = true;
    laterConfession.narrative.routesById.morrow!.state = 'closed';
    laterConfession.narrative.routesById.morrow!.closureReason = 'fabricationConfession';
    expect(validateCampaignState(laterConfession).kind).toBe('success');
  });

  it('preserves a failed analysed-record proof when the third record is added later', () => {
    const failedAtEvaluation = availableMorrowState();
    const removableEvidenceId = Object.keys(failedAtEvaluation.experiments.evidenceCardsById).find(
      (id) => failedAtEvaluation.experiments.evidenceCardsById[id]!.piimRole === 'none',
    )!;
    const evidenceCard = structuredClone(
      failedAtEvaluation.experiments.evidenceCardsById[removableEvidenceId]!,
    );
    const runId = evidenceCard.runId!;
    const rawRecord = structuredClone(
      failedAtEvaluation.experiments.rawRecordsById[evidenceCard.rawRecordId!]!,
    );
    const run = structuredClone(failedAtEvaluation.experiments.runsById[runId]!);
    const equipment = structuredClone(failedAtEvaluation.experiments.equipmentById[runId]!);
    const preparation = structuredClone(failedAtEvaluation.experiments.preparationById[runId]!);
    delete failedAtEvaluation.experiments.evidenceCardsById[removableEvidenceId];
    delete failedAtEvaluation.experiments.rawRecordsById[evidenceCard.rawRecordId!];
    delete failedAtEvaluation.experiments.runsById[runId];
    delete failedAtEvaluation.experiments.equipmentById[runId];
    delete failedAtEvaluation.experiments.preparationById[runId];
    const evaluation = failedAtEvaluation.narrative.routesById.morrow!.evaluation!;
    if (evaluation.routeId !== 'morrow') throw new Error('missing Morrow proof');
    evaluation.threeAnalysedRecords = false;
    evaluation.eligible = false;
    failedAtEvaluation.narrative.routesById.morrow!.state = 'closed';
    failedAtEvaluation.narrative.routesById.morrow!.closureReason = 'failedEvaluation';
    expect(validateCampaignState(failedAtEvaluation).kind).toBe('success');

    failedAtEvaluation.metadata.stateRevision = 8;
    failedAtEvaluation.experiments.evidenceCardsById[removableEvidenceId] = evidenceCard;
    failedAtEvaluation.experiments.rawRecordsById[evidenceCard.rawRecordId!] = rawRecord;
    failedAtEvaluation.experiments.runsById[runId] = run;
    failedAtEvaluation.experiments.equipmentById[runId] = equipment;
    failedAtEvaluation.experiments.preparationById[runId] = preparation;
    expect(validateCampaignState(failedAtEvaluation).kind).toBe('success');
  });

  it('validates reconstructable Aldercroft proof without rewriting locked concern truth', () => {
    const valid = availableAldercroftState();
    expect(validateCampaignState(valid).kind).toBe('success');
    for (const key of [
      'researchPlanOnTime',
      'evidenceAtLeastSix',
      'elenaConfidenceOrTrust',
      'publicRecordNotWithdrawn',
    ] as const) {
      const state = structuredClone(valid);
      const evaluation = state.narrative.routesById.aldercroft!.evaluation;
      if (evaluation?.routeId !== 'aldercroft') throw new Error('missing Aldercroft proof');
      evaluation[key] = false;
      evaluation.eligible = false;
      state.narrative.routesById.aldercroft!.state = 'closed';
      state.narrative.routesById.aldercroft!.closureReason = 'failedEvaluation';
      expect(validateCampaignState(state), key).toMatchObject({
        kind: 'failure',
        issue: { path: `/narrative/routesById/aldercroft/evaluation/${key}` },
      });
    }
    const laterConcern = structuredClone(valid);
    laterConcern.metadata.stateRevision = 7;
    laterConcern.narrative.concernsById['MR-CONCERN-ALDERCROFT'] = {
      id: 'MR-CONCERN-ALDERCROFT',
      sourceId: 'MR-SOURCE-ALDERCROFT',
      visible: true,
      currentResponse: 'defer',
      responseHistory: ['defer'],
      routeImpact: 'aldercroft',
    };
    expect(validateCampaignState(laterConcern).kind).toBe('success');

    const failedAtEvaluation = structuredClone(laterConcern);
    const evaluation = failedAtEvaluation.narrative.routesById.aldercroft!.evaluation;
    if (evaluation?.routeId !== 'aldercroft') throw new Error('missing Aldercroft proof');
    evaluation.noBlockingConcern = false;
    evaluation.eligible = false;
    failedAtEvaluation.narrative.routesById.aldercroft!.state = 'closed';
    failedAtEvaluation.narrative.routesById.aldercroft!.closureReason = 'failedEvaluation';
    expect(validateCampaignState(failedAtEvaluation).kind).toBe('success');
  });

  it('checks Aldercroft confidence and trust at the locked evaluation revision', () => {
    const below = availableAldercroftState();
    below.campaignValues.elenaPaperConfidence = 49;
    below.campaignValues.histories.elenaPaperConfidence = [
      changeRecord({
        id: 'change:5:1',
        stateRevision: 5,
        sequence: 1,
        sourceType: 'sceneOutcome',
        sourceId: 'MR-SCN-ELENA-CONFIDENCE',
        fieldPath: '/campaignValues/elenaPaperConfidence',
        previousValue: 45,
        newValue: 49,
      }),
    ];
    below.relationships.byId['MR-CHR-ELENA']!.trust = 40;
    below.relationships.byId['MR-CHR-ELENA']!.history = [
      changeRecord({
        id: 'change:4:1',
        stateRevision: 4,
        sequence: 1,
        sourceType: 'sceneOutcome',
        sourceId: 'MR-SCN-ELENA-TRUST',
        fieldPath: '/relationships/byId/MR-CHR-ELENA/trust',
        previousValue: 60,
        newValue: 40,
      }),
    ];
    expect(validateCampaignState(below)).toMatchObject({
      kind: 'failure',
      issue: {
        path: '/narrative/routesById/aldercroft/evaluation/elenaConfidenceOrTrust',
      },
    });

    const confidenceBoundary = structuredClone(below);
    confidenceBoundary.campaignValues.elenaPaperConfidence = 50;
    confidenceBoundary.campaignValues.histories.elenaPaperConfidence[0]!.newValue = 50;
    expect(validateCampaignState(confidenceBoundary).kind).toBe('success');

    const trustBoundary = structuredClone(below);
    trustBoundary.relationships.byId['MR-CHR-ELENA']!.trust = 41;
    trustBoundary.relationships.byId['MR-CHR-ELENA']!.history[0]!.newValue = 41;
    expect(validateCampaignState(trustBoundary).kind).toBe('success');

    const laterChange = availableAldercroftState();
    laterChange.metadata.stateRevision = 7;
    laterChange.relationships.byId['MR-CHR-ELENA']!.trust = 20;
    laterChange.relationships.byId['MR-CHR-ELENA']!.history = [
      changeRecord({
        id: 'change:7:1',
        stateRevision: 7,
        sequence: 1,
        sourceType: 'sceneOutcome',
        sourceId: 'MR-SCN-ELENA-LATER',
        fieldPath: '/relationships/byId/MR-CHR-ELENA/trust',
        previousValue: 60,
        newValue: 20,
      }),
    ];
    expect(validateCampaignState(laterChange).kind).toBe('success');

    const evidenceAddedWithEvaluation = availableAldercroftState();
    evidenceAddedWithEvaluation.campaignValues.histories.evidence[0]!.id = 'change:6:1';
    evidenceAddedWithEvaluation.campaignValues.histories.evidence[0]!.stateRevision = 6;
    expect(validateCampaignState(evidenceAddedWithEvaluation)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/aldercroft/evaluation/evidenceAtLeastSix' },
    });

    const evidenceDecrease = availableAldercroftState();
    evidenceDecrease.metadata.stateRevision = 7;
    evidenceDecrease.campaignValues.evidence = 3;
    evidenceDecrease.campaignValues.histories.evidence.push(
      changeRecord({
        id: 'change:7:1',
        stateRevision: 7,
        sequence: 1,
        sourceType: 'systemTransition',
        sourceId: 'MR-EVIDENCE-LATER',
        fieldPath: '/campaignValues/evidence',
        previousValue: 6,
        newValue: 3,
      }),
    );
    expect(validateCampaignState(evidenceDecrease)).toMatchObject({
      kind: 'failure',
      issue: { reason: 'historyRegression' },
    });
  });

  it('validates reconstructable Morrow proof without rewriting locked concern truth', () => {
    const valid = availableMorrowState();
    expect(validateCampaignState(valid).kind).toBe('success');
    for (const key of [
      'camilaReplySent',
      'morrowVideoCompleted',
      'publicPreprintAvailable',
      'honestLimitationPresent',
      'camilaTrustAtLeast41',
      'noFabricationConfession',
    ] as const) {
      const state = structuredClone(valid);
      const evaluation = state.narrative.routesById.morrow!.evaluation;
      if (evaluation?.routeId !== 'morrow') throw new Error('missing Morrow proof');
      evaluation[key] = false;
      evaluation.eligible = false;
      state.narrative.routesById.morrow!.state = 'closed';
      state.narrative.routesById.morrow!.closureReason = 'failedEvaluation';
      expect(validateCampaignState(state), key).toMatchObject({
        kind: 'failure',
        issue: { path: `/narrative/routesById/morrow/evaluation/${key}` },
      });
    }

    const tooFewRecords = structuredClone(valid);
    const removableEvidenceId = Object.keys(tooFewRecords.experiments.evidenceCardsById).find(
      (id) => tooFewRecords.experiments.evidenceCardsById[id]!.piimRole === 'none',
    )!;
    const removableCard = tooFewRecords.experiments.evidenceCardsById[removableEvidenceId]!;
    const removableRunId = removableCard.runId!;
    delete tooFewRecords.experiments.evidenceCardsById[removableEvidenceId];
    delete tooFewRecords.experiments.rawRecordsById[removableCard.rawRecordId!];
    delete tooFewRecords.experiments.runsById[removableRunId];
    delete tooFewRecords.experiments.equipmentById[removableRunId];
    delete tooFewRecords.experiments.preparationById[removableRunId];
    expect(validateCampaignState(tooFewRecords)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/morrow/evaluation/threeAnalysedRecords' },
    });

    const laterConcern = structuredClone(valid);
    laterConcern.metadata.stateRevision = 8;
    laterConcern.narrative.concernsById['MR-CONCERN-MORROW'] = {
      id: 'MR-CONCERN-MORROW',
      sourceId: 'MR-SOURCE-MORROW',
      visible: true,
      currentResponse: 'deny',
      responseHistory: ['deny'],
      routeImpact: 'morrow',
    };
    expect(validateCampaignState(laterConcern).kind).toBe('success');

    const failedAtEvaluation = structuredClone(laterConcern);
    const evaluation = failedAtEvaluation.narrative.routesById.morrow!.evaluation;
    if (evaluation?.routeId !== 'morrow') throw new Error('missing Morrow proof');
    evaluation.noBlockingConflict = false;
    evaluation.eligible = false;
    failedAtEvaluation.narrative.routesById.morrow!.state = 'closed';
    failedAtEvaluation.narrative.routesById.morrow!.closureReason = 'failedEvaluation';
    expect(validateCampaignState(failedAtEvaluation).kind).toBe('success');
  });

  it('accepts an honestly reported caveat at the Morrow evaluation revision', () => {
    const state = availableMorrowState();
    expect(state.metadata.stateRevision).toBe(
      state.narrative.routesById.morrow!.evaluation!.evaluationRevision,
    );
    expect(validateCampaignState(state).kind).toBe('success');
  });

  it.each(['altered', 'unsupported'] as const)(
    'does not treat an immutable %s caveat report as an honest Morrow limitation',
    (status) => {
      const state = availableMorrowState();
      const checkpoint = state.manuscript.snapshotsById['snapshot:5']!;
      for (const evidenceId of checkpoint.board.figures) {
        if (evidenceId === null) continue;
        const card = state.experiments.evidenceCardsById[evidenceId]!;
        if (card.selectedCaveatId === checkpoint.board.caveat) card.reportedReadingStatus = status;
      }
      expect(validateCampaignState(state)).toMatchObject({
        kind: 'failure',
        issue: { path: '/narrative/routesById/morrow/evaluation/honestLimitationPresent' },
      });
    },
  );

  it.each(['altered', 'unsupported'] as const)(
    'does not treat a current %s report override as an honest Morrow limitation',
    (status) => {
      const state = availableMorrowState();
      const checkpoint = state.manuscript.snapshotsById['snapshot:5']!;
      for (const evidenceId of checkpoint.board.figures) {
        if (evidenceId === null) continue;
        const card = state.experiments.evidenceCardsById[evidenceId]!;
        if (card.selectedCaveatId === checkpoint.board.caveat)
          state.manuscript.reportedReadingsByEvidenceId[evidenceId] = status;
      }
      expect(validateCampaignState(state)).toMatchObject({
        kind: 'failure',
        issue: { path: '/narrative/routesById/morrow/evaluation/honestLimitationPresent' },
      });
    },
  );

  it('preserves locked honest-limitation proof after later report alteration and restoration', () => {
    const alteredLater = availableMorrowState();
    alteredLater.metadata.stateRevision = 8;
    const checkpoint = alteredLater.manuscript.snapshotsById['snapshot:5']!;
    for (const evidenceId of checkpoint.board.figures) {
      if (evidenceId === null) continue;
      const card = alteredLater.experiments.evidenceCardsById[evidenceId]!;
      if (card.selectedCaveatId === checkpoint.board.caveat)
        alteredLater.manuscript.reportedReadingsByEvidenceId[evidenceId] = 'altered';
    }
    expect(validateCampaignState(alteredLater).kind).toBe('success');

    const restoredLater = structuredClone(alteredLater);
    restoredLater.metadata.stateRevision = 9;
    for (const evidenceId of checkpoint.board.figures) {
      if (evidenceId !== null)
        restoredLater.manuscript.reportedReadingsByEvidenceId[evidenceId] = 'honest';
    }
    expect(validateCampaignState(restoredLater).kind).toBe('success');
  });

  it('checks Camila trust at the locked Morrow evaluation revision', () => {
    const boundary = availableMorrowState();
    expect(validateCampaignState(boundary).kind).toBe('success');

    const below = structuredClone(boundary);
    below.relationships.byId['MR-CHR-CAMILA']!.trust = 40;
    below.relationships.byId['MR-CHR-CAMILA']!.history = [];
    expect(validateCampaignState(below)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/morrow/evaluation/camilaTrustAtLeast41' },
    });

    const laterChange = structuredClone(boundary);
    laterChange.metadata.stateRevision = 8;
    laterChange.relationships.byId['MR-CHR-CAMILA']!.trust = 20;
    laterChange.relationships.byId['MR-CHR-CAMILA']!.history.push(
      changeRecord({
        id: 'change:8:1',
        stateRevision: 8,
        sequence: 1,
        sourceType: 'sceneOutcome',
        sourceId: 'MR-SCN-CAMILA-LATER',
        fieldPath: '/relationships/byId/MR-CHR-CAMILA/trust',
        previousValue: 41,
        newValue: 20,
      }),
    );
    expect(validateCampaignState(laterChange).kind).toBe('success');

    const limitationAddedWithEvaluation = structuredClone(boundary);
    const sameRevisionSnapshot =
      limitationAddedWithEvaluation.manuscript.snapshotsById['snapshot:5']!;
    delete limitationAddedWithEvaluation.manuscript.snapshotsById['snapshot:5'];
    sameRevisionSnapshot.id = 'snapshot:7';
    sameRevisionSnapshot.stateRevision = 7;
    limitationAddedWithEvaluation.manuscript.snapshotsById['snapshot:7'] = sameRevisionSnapshot;
    limitationAddedWithEvaluation.manuscript.snapshotsById['snapshot:1']!.board.caveat = null;
    limitationAddedWithEvaluation.manuscript.snapshotsById[
      'snapshot:1'
    ]!.requirementResults.caveat = 'missing';
    limitationAddedWithEvaluation.manuscript.snapshotOrder = ['snapshot:1', 'snapshot:7'];
    limitationAddedWithEvaluation.manuscript.currentSnapshotId = 'snapshot:7';
    limitationAddedWithEvaluation.manuscript.piimCardSources.claimSnapshotId = 'snapshot:7';
    limitationAddedWithEvaluation.manuscript.piimMilestones.piimCardsRevision = 7;
    expect(validateCampaignState(limitationAddedWithEvaluation)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/morrow/evaluation/honestLimitationPresent' },
    });

    const preprintAddedWithEvaluation = structuredClone(boundary);
    preprintAddedWithEvaluation.metadata.stateRevision = 10;
    preprintAddedWithEvaluation.manuscript.piimMilestones = {
      publicPreprintRevision: 7,
      journalChainRevision: 8,
      reviewerReportsRevision: 9,
      piimCardsRevision: 10,
      piimOutcomeRevision: null,
    };
    const laterSnapshot = preprintAddedWithEvaluation.manuscript.snapshotsById['snapshot:5']!;
    delete preprintAddedWithEvaluation.manuscript.snapshotsById['snapshot:5'];
    laterSnapshot.id = 'snapshot:10';
    laterSnapshot.stateRevision = 10;
    preprintAddedWithEvaluation.manuscript.snapshotsById['snapshot:10'] = laterSnapshot;
    preprintAddedWithEvaluation.manuscript.snapshotOrder = ['snapshot:1', 'snapshot:10'];
    preprintAddedWithEvaluation.manuscript.currentSnapshotId = 'snapshot:10';
    preprintAddedWithEvaluation.manuscript.piimCardSources.claimSnapshotId = 'snapshot:10';
    expect(validateCampaignState(preprintAddedWithEvaluation)).toMatchObject({
      kind: 'failure',
      issue: { path: '/narrative/routesById/morrow/evaluation/publicPreprintAvailable' },
    });
  });

  it('enforces route proof agreement and closure reasons', () => {
    const failed = availableAldercroftState();
    failed.narrative.careerProgress.researchPlanCompletedPeriod = null;
    const evaluation = failed.narrative.routesById.aldercroft!.evaluation;
    if (evaluation?.routeId !== 'aldercroft') throw new Error('missing Aldercroft proof');
    evaluation.researchPlanOnTime = false;
    evaluation.eligible = false;
    failed.narrative.routesById.aldercroft!.state = 'closed';
    failed.narrative.routesById.aldercroft!.closureReason = 'failedEvaluation';
    expect(validateCampaignState(failed).kind).toBe('success');

    const missingProof = availableAldercroftState();
    missingProof.narrative.routesById.aldercroft!.evaluation = null;
    expect(validateCampaignState(missingProof)).toMatchObject({ kind: 'failure' });

    const messageExpired = copyCampaign();
    messageExpired.metadata.stateRevision = 1;
    messageExpired.calendar.periodIndex = 56;
    messageExpired.world.floorAct = 'decisionHorizon';
    messageExpired.narrative.routesById.morrow!.state = 'closed';
    messageExpired.narrative.routesById.morrow!.closureReason = 'messageExpired';
    expect(validateCampaignState(messageExpired).kind).toBe('success');
    messageExpired.narrative.careerProgress.camilaReplySent = true;
    expect(validateCampaignState(messageExpired)).toMatchObject({ kind: 'failure' });
  });

  it('enforces exact integrity and relationship ending modules', () => {
    const compromised = conclusionState('aldercroft', 'epilogueInProgress');
    const otherEvidenceId = Object.keys(compromised.experiments.evidenceCardsById).find(
      (id) => compromised.experiments.evidenceCardsById[id]!.piimRole === 'none',
    )!;
    compromised.manuscript.omittedEvidenceIds = [otherEvidenceId];
    compromised.conclusion.endingModuleIds![2] = 'MR-END-INTEGRITY-COMPROMISED';
    expect(validateCampaignState(compromised).kind).toBe('success');

    const undiscovered = conclusionState('aldercroft', 'epilogueInProgress');
    const undiscoveredEvidenceId = Object.keys(undiscovered.experiments.evidenceCardsById).find(
      (id) => undiscovered.experiments.evidenceCardsById[id]!.piimRole === 'none',
    )!;
    undiscovered.experiments.evidenceCardsById[undiscoveredEvidenceId]!.reportedReadingStatus =
      'altered';
    undiscovered.manuscript.reportedReadingsByEvidenceId[undiscoveredEvidenceId] = 'altered';
    undiscovered.conclusion.endingModuleIds![2] = 'MR-END-INTEGRITY-UNDISCOVERED';
    expect(validateCampaignState(undiscovered).kind).toBe('success');

    const visible = structuredClone(undiscovered);
    visible.narrative.concernsById['MR-CONCERN-INTEGRITY'] = {
      id: 'MR-CONCERN-INTEGRITY',
      sourceId: undiscoveredEvidenceId,
      visible: true,
      currentResponse: null,
      responseHistory: [],
      routeImpact: 'none',
    };
    visible.conclusion.endingModuleIds![2] = 'MR-END-INTEGRITY-VISIBLE';
    expect(validateCampaignState(visible).kind).toBe('success');

    const relationship = conclusionState('aldercroft', 'epilogueInProgress');
    relationship.metadata.stateRevision = 8;
    relationship.relationships.byId['MR-CHR-CAMILA']!.trust = 61;
    relationship.relationships.byId['MR-CHR-CAMILA']!.history.push(
      changeRecord({
        id: 'change:8:1',
        stateRevision: 8,
        sequence: 1,
        sourceType: 'sceneOutcome',
        sourceId: 'MR-SCN-CAMILA-TRUST',
        fieldPath: '/relationships/byId/MR-CHR-CAMILA/trust',
        previousValue: 41,
        newValue: 61,
      }),
    );
    relationship.conclusion.endingModuleIds![4] = 'MR-END-REL-CAMILA-SUPPORT';
    expect(validateCampaignState(relationship).kind).toBe('success');
    relationship.relationships.byId['MR-CHR-CAMILA']!.permanentBreach = true;
    relationship.conclusion.endingModuleIds![4] = 'MR-END-REL-CAMILA-DISTANCE';
    expect(validateCampaignState(relationship).kind).toBe('success');
  });

  it('rejects a class instance at the plain-data boundary', () => {
    class NonPlainState {}
    expect(validateCampaignState(new NonPlainState())).toEqual({
      kind: 'failure',
      issue: { path: '/', reason: 'wrongType' },
    });
  });
});
