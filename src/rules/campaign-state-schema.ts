import { z } from 'zod';

import type {
  CampaignCreationInput,
  CampaignState,
  CampaignValidationIssue,
  CheckedResult,
  ChangeRecord,
  ManuscriptRequirementResult,
  ManuscriptRequirementResults,
  StoredScalar,
} from './campaign-state-types';

const safeInteger = (minimum: number, maximum: number) =>
  z
    .number()
    .int()
    .min(minimum)
    .max(maximum)
    .refine((value) => Number.isSafeInteger(value) && !Object.is(value, -0));
const stableId = z.string().regex(/^[A-Za-z0-9._:-]{1,128}$/u);
const nullableId = stableId.nullable();
const contentVersion = z.string().refine((value) => {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/u.exec(value);
  return (
    match !== null && match.slice(1).every((component) => Number.isSafeInteger(Number(component)))
  );
});
const storedScalar = z.union([
  z.string(),
  safeInteger(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
  z.boolean(),
  z.null(),
]);

const changeRecordSchema = z
  .object({
    id: stableId,
    stateRevision: safeInteger(1, Number.MAX_SAFE_INTEGER),
    sequence: safeInteger(1, Number.MAX_SAFE_INTEGER),
    sourceType: z.enum(['playerAction', 'scheduledEvent', 'sceneOutcome', 'systemTransition']),
    sourceId: stableId,
    fieldPath: z.string().startsWith('/'),
    previousValue: storedScalar,
    newValue: storedScalar,
    integrityEventType: z
      .enum([
        'omittedEvidence',
        'alteredReading',
        'unsupportedReading',
        'restoredEvidence',
        'correctedDraft',
      ])
      .nullable(),
  })
  .strict();

const history = z.array(changeRecordSchema);
const requirementKey = z.enum([
  'supportedFigure',
  'relevantControl',
  'distinctExperimentFigures',
  'structureCoverage',
  'rhythmCoverage',
  'matchedControl',
  'caveat',
  'associationSupport',
  'causalSupport',
]);
const requirementResult = z.enum(['met', 'missing', 'conflict', 'unsupported']).nullable();
const requirementResultsSchema = z
  .object({
    supportedFigure: requirementResult,
    relevantControl: requirementResult,
    distinctExperimentFigures: requirementResult,
    structureCoverage: requirementResult,
    rhythmCoverage: requirementResult,
    matchedControl: requirementResult,
    caveat: requirementResult,
    associationSupport: requirementResult,
    causalSupport: requirementResult,
  })
  .strict();
const boardSchema = z
  .object({
    claim: nullableId,
    claimLevel: z.enum(['careful', 'strong', 'inflated']).nullable(),
    figures: z.tuple([nullableId, nullableId, nullableId]),
    controls: z.tuple([nullableId, nullableId]),
    caveat: nullableId,
    authorship: nullableId,
    supplementary: nullableId,
    activeRequest: nullableId,
  })
  .strict();

const stateSchema = z
  .object({
    metadata: z
      .object({
        schemaVersion: z.literal(2),
        contentVersion,
        campaignId: z
          .string()
          .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u),
        campaignSeed: safeInteger(0, 4_294_967_295),
        stateRevision: safeInteger(0, Number.MAX_SAFE_INTEGER),
        buildProfileId: z.enum(['full', 'fallback', 'slice']),
        pressureProfile: z.enum(['standard', 'supported']),
      })
      .strict(),
    calendar: z
      .object({
        periodIndex: safeInteger(0, 63),
        pendingCrash: z.boolean(),
        crashPeriods: z.array(safeInteger(0, 63)),
      })
      .strict(),
    campaignValues: z
      .object({
        energy: safeInteger(0, 5),
        evidence: safeInteger(0, 12),
        elenaPaperConfidence: safeInteger(0, 100),
        integrity: safeInteger(0, 100),
        integrityRecoveryUsed: safeInteger(0, 10),
        histories: z
          .object({
            energy: history,
            evidence: history,
            elenaPaperConfidence: history,
            integrity: history,
            integrityRecoveryUsed: history,
          })
          .strict(),
      })
      .strict(),
    experiments: z
      .object({
        equipmentById: z.record(
          stableId,
          z
            .object({
              id: stableId,
              condition: z.enum(['ready', 'limited', 'unavailable']),
              history,
            })
            .strict(),
        ),
        preparationById: z.record(
          stableId,
          z
            .object({ id: stableId, band: z.enum(['robust', 'mixed', 'compromised']), history })
            .strict(),
        ),
        runsById: z.record(
          stableId,
          z
            .object({
              id: stableId,
              templateId: stableId,
              runNumber: z.union([z.literal(1), z.literal(2)]),
              stage: z.enum(['configured', 'running', 'readyForAnalysis', 'analysed', 'stopped']),
              startedPeriod: safeInteger(0, 63).nullable(),
              goalId: stableId,
              controlId: stableId,
              observationId: stableId,
              familyChoiceId: stableId,
              sampleCondition: z.enum(['stable', 'stressed', 'failing']),
              equipmentId: stableId,
              equipmentState: z.enum(['ready', 'limited', 'unavailable']),
              attentionState: z.enum(['normal', 'checkReady', 'attentionNeeded']),
              issueCount: safeInteger(0, Number.MAX_SAFE_INTEGER),
              severeIssue: z.boolean(),
              projectedResultBand: z.enum(['robust', 'mixed', 'compromised']).nullable(),
              finalResultBand: z.enum(['robust', 'mixed', 'compromised']).nullable(),
              variationNamespace: z.literal('experimentVariation').nullable(),
              variationTargetId: nullableId,
              variationDrawIndex: z.literal(0).nullable(),
              variationBucket: safeInteger(0, 99).nullable(),
              monitoringResponses: z.array(
                z
                  .object({
                    windowIndex: safeInteger(0, 1),
                    response: z.enum(['continue', 'qualityCheck', 'stabilize', 'stop', 'missed']),
                    completedPeriod: safeInteger(0, 63),
                  })
                  .strict(),
              ),
            })
            .strict(),
        ),
        activeRunIds: z.array(stableId).max(3),
        rawRecordsById: z.record(
          stableId,
          z
            .object({
              id: stableId,
              runId: stableId,
              scientificFacts: z
                .object({
                  structureRecovery: z.boolean(),
                  rhythmRecovery: z.boolean(),
                  repatterningTracksRecovery: z.boolean(),
                  controlKind: z.enum(['matched', 'limited']),
                })
                .strict(),
              biologicalResultId: stableId,
              finalPreparationBand: z.enum(['robust', 'mixed', 'compromised']),
              structureResultId: stableId,
              rhythmResultId: stableId,
              repatterningResultId: stableId,
              controlResultId: stableId,
              observationCoverage: z.enum(['full', 'limited']),
              monitoringResultId: stableId,
              fatigueAffected: z.boolean(),
              internalMismatch: z.boolean(),
            })
            .strict(),
        ),
        evidenceCardsById: z.record(
          stableId,
          z
            .object({
              id: stableId,
              runId: nullableId,
              rawRecordId: nullableId,
              sourceId: stableId,
              quality: z.enum(['usable', 'worthRepeating', 'inconclusive', 'suspicious']),
              selectedReadingId: stableId,
              selectedCaveatId: stableId,
              reportedReadingStatus: z.enum(['honest', 'altered', 'unsupported']),
              awardedSupport: safeInteger(0, 2),
              piimRole: z.enum(['batch', 'oxygen', 'none']),
            })
            .strict(),
        ),
        stopLogsById: z.record(
          stableId,
          z
            .object({
              id: stableId,
              runId: stableId,
              stoppedPeriod: safeInteger(0, 63),
              reasonId: stableId,
            })
            .strict(),
        ),
      })
      .strict(),
    manuscript: z
      .object({
        board: boardSchema,
        snapshotsById: z.record(
          stableId,
          z
            .object({
              id: stableId,
              stateRevision: safeInteger(1, Number.MAX_SAFE_INTEGER),
              board: boardSchema,
              requirementResults: requirementResultsSchema,
              statedMissingRequirement: requirementKey.nullable(),
            })
            .strict(),
        ),
        snapshotOrder: z.array(stableId),
        currentSnapshotId: nullableId,
        revisionTasksById: z.record(
          stableId,
          z
            .object({
              id: stableId,
              state: z.enum(['locked', 'available', 'committed', 'expired']),
            })
            .strict(),
        ),
        reviewerReportsById: z.record(
          stableId,
          z.object({ id: stableId, form: z.enum(['base', 'conditional']).nullable() }).strict(),
        ),
        preprintState: z.enum(['notPosted', 'public', 'withdrawn']),
        journalState: z.enum([
          'notSubmitted',
          'submitted',
          'majorRevision',
          'withdrawn',
          'resolved',
        ]),
        finalPaperState: z
          .enum(['published', 'acceptedPendingFinalWork', 'underReview', 'rejectedOrWithdrawn'])
          .nullable(),
        piimCards: z
          .object({
            batch: z.enum(['met', 'partlyMet', 'notMet']).nullable(),
            oxygen: z.enum(['met', 'partlyMet', 'notMet']).nullable(),
            claim: z.enum(['met', 'partlyMet', 'notMet']).nullable(),
          })
          .strict(),
        piimCardSources: z
          .object({
            batchEvidenceCardId: nullableId,
            oxygenEvidenceCardId: nullableId,
            claimSnapshotId: nullableId,
          })
          .strict(),
        piimMilestones: z
          .object({
            publicPreprintRevision: safeInteger(1, Number.MAX_SAFE_INTEGER).nullable(),
            journalChainRevision: safeInteger(1, Number.MAX_SAFE_INTEGER).nullable(),
            reviewerReportsRevision: safeInteger(1, Number.MAX_SAFE_INTEGER).nullable(),
            piimCardsRevision: safeInteger(1, Number.MAX_SAFE_INTEGER).nullable(),
            piimOutcomeRevision: safeInteger(1, Number.MAX_SAFE_INTEGER).nullable(),
          })
          .strict(),
        piimOutcome: z
          .object({
            responseBand: z.enum(['top', 'middle', 'weak']),
            namespace: z.literal('piimOutcome'),
            targetId: stableId,
            drawIndex: z.literal(0),
            bucket: safeInteger(0, 99),
            result: z.enum(['published', 'acceptedPendingFinalWork', 'underReview', 'rejected']),
          })
          .strict()
          .nullable(),
        authorship: z
          .object({
            haoran: z.enum(['notIncluded', 'credited', 'declined']),
            samira: z.enum(['notIncluded', 'credited', 'declined']),
          })
          .strict(),
        reportedReadingsByEvidenceId: z.record(
          stableId,
          z.enum(['honest', 'altered', 'unsupported']),
        ),
        omittedEvidenceIds: z.array(stableId),
        committedEffectIds: z.array(stableId),
      })
      .strict(),
    narrative: z
      .object({
        protagonist: z
          .object({
            name: z
              .string()
              .refine((value) => value === value.normalize('NFC'))
              .refine((value) => value.trim() === value)
              .refine((value) => [...value].length >= 1 && [...value].length <= 64)
              .refine((value) => !/[\p{Cc}\p{Cf}]/u.test(value)),
            pronounSet: z.enum(['sheHer', 'heHim', 'theyThem']),
          })
          .strict(),
        careerProgress: z
          .object({
            researchPlanCompletedPeriod: safeInteger(0, 43).nullable(),
            camilaReplySent: z.boolean(),
            morrowVideoCompleted: z.boolean(),
            fabricationConfessedToCamila: z.boolean(),
          })
          .strict(),
        scenesById: z.record(
          stableId,
          z
            .object({
              id: stableId,
              state: z.enum(['locked', 'eligible', 'queued', 'inProgress', 'completed', 'skipped']),
              authoredFormId: nullableId,
              finalPresentationState: z.enum(['closingPlayed', 'recapShown']).nullable(),
            })
            .strict(),
        ),
        messagesById: z.record(
          stableId,
          z
            .object({
              id: stableId,
              state: z.enum(['locked', 'available', 'read', 'replied', 'expired']),
              replyId: nullableId,
            })
            .strict(),
        ),
        requestsById: z.record(
          stableId,
          z
            .object({
              id: stableId,
              state: z.enum(['locked', 'available', 'completed', 'expired']),
              responseId: nullableId,
            })
            .strict(),
        ),
        concernsById: z.record(
          stableId,
          z
            .object({
              id: stableId,
              sourceId: stableId,
              visible: z.boolean(),
              currentResponse: z.enum(['correct', 'deny', 'defer', 'ignoreReminder']).nullable(),
              responseHistory: z.array(z.enum(['correct', 'deny', 'defer', 'ignoreReminder'])),
              routeImpact: z.enum(['none', 'aldercroft', 'morrow', 'both']),
            })
            .strict(),
        ),
        routesById: z.record(
          stableId,
          z
            .object({
              id: stableId,
              state: z.enum(['locked', 'developing', 'available', 'closed', 'chosen', 'declined']),
              evaluated: z.boolean(),
              evaluation: z
                .union([
                  z
                    .object({
                      routeId: z.literal('aldercroft'),
                      evaluationRevision: safeInteger(1, Number.MAX_SAFE_INTEGER),
                      evaluationPeriod: safeInteger(48, 51),
                      researchPlanOnTime: z.boolean(),
                      evidenceAtLeastSix: z.boolean(),
                      elenaConfidenceOrTrust: z.boolean(),
                      noBlockingConcern: z.boolean(),
                      publicRecordNotWithdrawn: z.boolean(),
                      eligible: z.boolean(),
                    })
                    .strict(),
                  z
                    .object({
                      routeId: z.literal('morrow'),
                      evaluationRevision: safeInteger(1, Number.MAX_SAFE_INTEGER),
                      evaluationPeriod: safeInteger(56, 59),
                      camilaReplySent: z.boolean(),
                      morrowVideoCompleted: z.boolean(),
                      publicPreprintAvailable: z.boolean(),
                      threeAnalysedRecords: z.boolean(),
                      honestLimitationPresent: z.boolean(),
                      camilaTrustAtLeast41: z.boolean(),
                      noFabricationConfession: z.boolean(),
                      noBlockingConflict: z.boolean(),
                      eligible: z.boolean(),
                    })
                    .strict(),
                ])
                .nullable(),
              closureReason: z
                .enum([
                  'failedEvaluation',
                  'publicWithdrawal',
                  'messageExpired',
                  'fabricationConfession',
                  'playerDeclined',
                ])
                .nullable(),
            })
            .strict(),
        ),
        scheduler: z
          .object({
            eventsById: z.record(
              stableId,
              z
                .object({
                  id: stableId,
                  state: z.enum(['locked', 'eligible', 'queued', 'active', 'completed', 'expired']),
                  firstEligiblePeriod: safeInteger(0, 63).nullable(),
                  resolvedPeriod: safeInteger(0, 63).nullable(),
                })
                .strict(),
            ),
            queue: z.array(stableId),
            activeEventId: nullableId,
            lastSchedulerRevision: safeInteger(0, Number.MAX_SAFE_INTEGER),
          })
          .strict(),
      })
      .strict(),
    relationships: z
      .object({
        byId: z.record(
          stableId,
          z
            .object({
              id: stableId,
              trust: safeInteger(0, 100),
              introduced: z.boolean(),
              permanentBreach: z.boolean(),
              supportConsumed: z.boolean(),
              lastConsequentialSceneId: nullableId,
              history,
            })
            .strict(),
        ),
      })
      .strict(),
    world: z
      .object({
        floorAct: z.enum([
          'orderlyButOverbooked',
          'manuscriptClutter',
          'rejectionAndPublicRecord',
          'reviewPressure',
          'decisionHorizon',
        ]),
        safeAnchorId: stableId,
        characterPlacementsById: z.record(
          stableId,
          z.object({ id: stableId, anchorId: nullableId }).strict(),
        ),
        roomStatesById: z.record(
          stableId,
          z
            .object({ id: stableId, condition: z.enum(['inactive', 'unresolved', 'resolved']) })
            .strict(),
        ),
        persistentEnvironmentIds: z.array(stableId),
      })
      .strict(),
    contentHistory: z
      .object({
        selectedVariantsById: z.record(stableId, stableId),
        completedContentIds: z.array(stableId),
        expiredContentIds: z.array(stableId),
        readMessageIds: z.array(stableId),
        consumedContextualContentIds: z.array(stableId),
        displayedEnvironmentalTextIds: z.array(stableId),
        recordedSceneClosingIds: z.array(stableId),
        recordedSceneRecapIds: z.array(stableId),
        citationIds: z.array(stableId),
      })
      .strict(),
    conclusion: z
      .object({
        state: z.enum([
          'unresolved',
          'choicePending',
          'confirmed',
          'epilogueInProgress',
          'completed',
        ]),
        finalChoiceId: nullableId,
        endingModuleIds: z.tuple([stableId, stableId, stableId, stableId, stableId]).nullable(),
      })
      .strict(),
  })
  .strict();

const inputSchema = z
  .object({
    campaignId: z
      .string()
      .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u),
    campaignSeed: safeInteger(0, 4_294_967_295),
    contentVersion,
    buildProfileId: z.enum(['full', 'fallback', 'slice']),
    pressureProfile: z.enum(['standard', 'supported']),
    protagonist: z
      .object({ name: z.string(), pronounSet: z.enum(['sheHer', 'heHim', 'theyThem']) })
      .strict(),
  })
  .strict();

const jsonPath = (path: PropertyKey[]): string =>
  `/${path.map((part) => String(part).replaceAll('~', '~0').replaceAll('/', '~1')).join('/')}`;

const valueAtPath = (value: unknown, path: PropertyKey[]): { exists: boolean; value: unknown } => {
  let current = value;
  for (const part of path) {
    if (current === null || typeof current !== 'object' || !(part in current))
      return { exists: false, value: undefined };
    current = (current as Record<PropertyKey, unknown>)[part];
  }
  return { exists: true, value: current };
};

const reasonFromZodIssue = (issue: z.core.$ZodIssue, input: unknown): CampaignValidationIssue => {
  const supplied = valueAtPath(input, issue.path);
  let reason: CampaignValidationIssue['reason'] = 'wrongType';
  if (issue.code === 'unrecognized_keys') reason = 'unknownField';
  else if (issue.code === 'invalid_type' && !supplied.exists) reason = 'missingField';
  else if (typeof supplied.value === 'number') reason = 'invalidNumber';
  else if (issue.code === 'too_small' || issue.code === 'too_big') reason = 'invalidNumber';
  else if (issue.code === 'invalid_format' || issue.code === 'invalid_value') reason = 'invalidId';
  else if (issue.code === 'custom' && typeof issue.input === 'number') reason = 'invalidNumber';
  return { path: jsonPath(issue.path), reason };
};

const firstDuplicate = (values: readonly (string | number)[]): number | null => {
  const seen = new Set<string | number>();
  for (const [index, value] of values.entries()) {
    if (seen.has(value)) return index;
    seen.add(value);
  }
  return null;
};

const invariant = (
  path: string,
  reason: CampaignValidationIssue['reason'],
): CheckedResult<never> => ({
  kind: 'failure',
  issue: { path, reason },
});

const checkRecordKeys = (
  record: Record<string, { id: string }>,
  path: string,
): CheckedResult<never> | null => {
  for (const key of Object.keys(record))
    if (record[key]?.id !== key) return invariant(`${path}/${key}/id`, 'invalidId');
  return null;
};

const checkExactKeys = (
  record: Record<string, unknown>,
  expectedKeys: readonly string[],
  path: string,
): CheckedResult<never> | null => {
  const actual = Object.keys(record);
  if (
    actual.length !== expectedKeys.length ||
    expectedKeys.some((key) => !Object.hasOwn(record, key))
  )
    return invariant(path, 'invariantViolation');
  return null;
};

const checkHistory = (
  records: ChangeRecord[],
  currentValue: StoredScalar,
  stateRevision: number,
  path: string,
  fieldPath: string,
  initialValue?: StoredScalar,
): CheckedResult<never> | null => {
  let previous: StoredScalar | undefined = initialValue;
  let lastRevision = 0;
  let lastSequence = 0;
  for (const [index, record] of records.entries()) {
    if (record.id !== `change:${record.stateRevision}:${record.sequence}`)
      return invariant(`${path}/${index}/id`, 'invalidId');
    if (record.fieldPath !== fieldPath)
      return invariant(`${path}/${index}/fieldPath`, 'invalidReference');
    if (record.stateRevision > stateRevision)
      return invariant(`${path}/${index}`, 'invariantViolation');
    if (
      record.stateRevision < lastRevision ||
      (record.stateRevision === lastRevision && record.sequence <= lastSequence)
    )
      return invariant(`${path}/${index}/sequence`, 'historyRegression');
    if (previous !== undefined && !Object.is(record.previousValue, previous))
      return invariant(`${path}/${index}/previousValue`, 'historyRegression');
    if (Object.is(record.previousValue, record.newValue))
      return invariant(`${path}/${index}/newValue`, 'historyRegression');
    previous = record.newValue;
    lastRevision = record.stateRevision;
    lastSequence = record.sequence;
  }
  if (previous !== undefined && !Object.is(previous, currentValue))
    return invariant(path, 'historyRegression');
  return null;
};

// Exact authored start-expiry boundaries; unknown templates need connected content proof.
const startExpiryPeriod = (templateId: string): number | undefined =>
  ({
    'MR-EXP-LASER-SHAM': 16,
    'MR-EXP-DAMAGE-RANGE': 16,
    'MR-EXP-BATCH-CHECK': 36,
    'MR-EXP-REPAIR-STATE': 24,
    'MR-EXP-OXYGEN-LOSS': 45,
    'MR-EXP-DRUG-EXPOSURE': 48,
  })[templateId];

const expectedFloorAct = (period: number): CampaignState['world']['floorAct'] => {
  if (period < 16) return 'orderlyButOverbooked';
  if (period < 28) return 'manuscriptClutter';
  if (period < 36) return 'rejectionAndPublicRecord';
  if (period < 56) return 'reviewPressure';
  return 'decisionHorizon';
};

const plainDataEqual = (left: unknown, right: unknown): boolean =>
  JSON.stringify(left) === JSON.stringify(right);

const requirementKeys = [
  'supportedFigure',
  'relevantControl',
  'distinctExperimentFigures',
  'structureCoverage',
  'rhythmCoverage',
  'matchedControl',
  'caveat',
  'associationSupport',
  'causalSupport',
] as const;

const applicableRequirementKeys = {
  careful: ['supportedFigure', 'relevantControl', 'caveat'],
  strong: [
    'distinctExperimentFigures',
    'structureCoverage',
    'rhythmCoverage',
    'matchedControl',
    'caveat',
    'associationSupport',
  ],
  inflated: [
    'distinctExperimentFigures',
    'structureCoverage',
    'rhythmCoverage',
    'matchedControl',
    'caveat',
    'associationSupport',
    'causalSupport',
  ],
} as const;

const numericValueAtRevision = (
  initialValue: number,
  records: ChangeRecord[],
  revision: number,
): number => {
  let value = initialValue;
  for (const record of records) {
    if (record.stateRevision >= revision) break;
    if (typeof record.newValue === 'number') value = record.newValue;
  }
  return value;
};

const snapshotAtRevision = (
  state: CampaignState,
  revision: number,
): CampaignState['manuscript']['snapshotsById'][string] | undefined => {
  let result: CampaignState['manuscript']['snapshotsById'][string] | undefined;
  for (const id of state.manuscript.snapshotOrder) {
    const snapshot = state.manuscript.snapshotsById[id];
    if (snapshot === undefined || snapshot.stateRevision >= revision) break;
    result = snapshot;
  }
  return result;
};

type ResolvedRequirementResult = Exclude<ManuscriptRequirementResult, null>;

interface SnapshotEvidenceFact {
  reportedReadingStatus: 'honest' | 'altered' | 'unsupported' | null;
  templateId: string | null;
  structureRecovery: boolean;
  rhythmRecovery: boolean;
  associationSupport: boolean;
  matchedControl: boolean;
  controlResultId: string | null;
  caveatId: string | null;
  contradictsReport: boolean;
  suppliesVisibleSupport: boolean;
}

const resolveRequirement = (
  candidateCount: number,
  supportCount: number,
  requiredSupportCount: number,
  hasConflict: boolean,
): ResolvedRequirementResult => {
  if (hasConflict) return 'conflict';
  if (supportCount >= requiredSupportCount) return 'met';
  if (candidateCount === 0) return 'missing';
  if (supportCount === 0) return 'unsupported';
  return 'missing';
};

const snapshotEvidenceFacts = (
  state: CampaignState,
  snapshot: CampaignState['manuscript']['snapshotsById'][string],
): SnapshotEvidenceFact[] =>
  snapshot.board.figures.flatMap((evidenceId) => {
    if (evidenceId === null) return [];
    const card = state.experiments.evidenceCardsById[evidenceId];
    const raw =
      card?.rawRecordId === null || card?.rawRecordId === undefined
        ? undefined
        : state.experiments.rawRecordsById[card.rawRecordId];
    const run =
      card?.runId === null || card?.runId === undefined
        ? undefined
        : state.experiments.runsById[card.runId];
    const reportedReadingStatus =
      state.manuscript.reportedReadingsByEvidenceId[evidenceId] ??
      card?.reportedReadingStatus ??
      null;
    const omitted = state.manuscript.omittedEvidenceIds.includes(evidenceId);
    const contradictsReport =
      !omitted &&
      card !== undefined &&
      (card.quality === 'suspicious' || raw?.internalMismatch === true);
    const suppliesVisibleSupport =
      !omitted &&
      card !== undefined &&
      !contradictsReport &&
      (reportedReadingStatus === 'altered' ||
        reportedReadingStatus === 'unsupported' ||
        (card.quality === 'usable' &&
          (raw?.scientificFacts.structureRecovery === true ||
            raw?.scientificFacts.rhythmRecovery === true)));
    return [
      {
        reportedReadingStatus,
        templateId: run?.templateId ?? null,
        structureRecovery:
          raw?.scientificFacts.structureRecovery === true ||
          reportedReadingStatus === 'altered' ||
          reportedReadingStatus === 'unsupported',
        rhythmRecovery:
          raw?.scientificFacts.rhythmRecovery === true ||
          reportedReadingStatus === 'altered' ||
          reportedReadingStatus === 'unsupported',
        associationSupport:
          (raw?.scientificFacts.repatterningTracksRecovery === true &&
            (raw.scientificFacts.structureRecovery || raw.scientificFacts.rhythmRecovery)) ||
          reportedReadingStatus === 'altered' ||
          reportedReadingStatus === 'unsupported',
        matchedControl: raw?.scientificFacts.controlKind === 'matched',
        controlResultId: raw?.controlResultId ?? null,
        caveatId: card?.selectedCaveatId ?? null,
        contradictsReport,
        suppliesVisibleSupport,
      },
    ];
  });

const expectedRequirementResults = (
  state: CampaignState,
  snapshot: CampaignState['manuscript']['snapshotsById'][string],
): ManuscriptRequirementResults => {
  const results: ManuscriptRequirementResults = {
    supportedFigure: null,
    relevantControl: null,
    distinctExperimentFigures: null,
    structureCoverage: null,
    rhythmCoverage: null,
    matchedControl: null,
    caveat: null,
    associationSupport: null,
    causalSupport: null,
  };
  const level = snapshot.board.claimLevel;
  if (level === null) return results;

  const facts = snapshotEvidenceFacts(state, snapshot);
  const supportedFacts = facts.filter((fact) => fact.suppliesVisibleSupport);
  const figureConflict = facts.some((fact) => fact.contradictsReport);
  const controls = snapshot.board.controls.filter((controlId) => controlId !== null);
  const matchingControlFacts = facts.filter(
    (fact) => fact.controlResultId !== null && controls.includes(fact.controlResultId),
  );
  const supportedControlFacts = matchingControlFacts.filter((fact) => fact.suppliesVisibleSupport);
  const matchingCaveatFacts = facts.filter(
    (fact) => snapshot.board.caveat !== null && fact.caveatId === snapshot.board.caveat,
  );
  const supportedCaveatFacts = matchingCaveatFacts.filter((fact) => fact.suppliesVisibleSupport);

  if (level === 'careful') {
    results.supportedFigure = resolveRequirement(
      facts.length,
      supportedFacts.length,
      1,
      figureConflict,
    );
    results.relevantControl = resolveRequirement(
      controls.length,
      supportedControlFacts.length,
      1,
      matchingControlFacts.some((fact) => fact.contradictsReport),
    );
  } else {
    const supportedTemplateIds = new Set(
      supportedFacts.flatMap((fact) => (fact.templateId === null ? [] : [fact.templateId])),
    );
    results.distinctExperimentFigures = resolveRequirement(
      facts.length,
      supportedTemplateIds.size,
      2,
      figureConflict,
    );
    results.structureCoverage = resolveRequirement(
      facts.length,
      supportedFacts.filter((fact) => fact.structureRecovery).length,
      1,
      figureConflict,
    );
    results.rhythmCoverage = resolveRequirement(
      facts.length,
      supportedFacts.filter((fact) => fact.rhythmRecovery).length,
      1,
      figureConflict,
    );
    results.associationSupport = resolveRequirement(
      facts.length,
      supportedFacts.filter((fact) => fact.associationSupport).length,
      1,
      figureConflict,
    );
    results.matchedControl = resolveRequirement(
      controls.length,
      supportedControlFacts.filter((fact) => fact.matchedControl).length,
      1,
      matchingControlFacts.some((fact) => fact.contradictsReport),
    );
    if (level === 'inflated') {
      results.causalSupport = resolveRequirement(
        facts.length,
        supportedFacts.filter(
          (fact) =>
            fact.reportedReadingStatus === 'altered' ||
            fact.reportedReadingStatus === 'unsupported',
        ).length,
        1,
        figureConflict,
      );
    }
  }
  results.caveat = resolveRequirement(
    snapshot.board.caveat === null ? 0 : 1,
    supportedCaveatFacts.filter(
      (fact) =>
        level === 'careful' ||
        fact.reportedReadingStatus === 'altered' ||
        fact.reportedReadingStatus === 'unsupported' ||
        snapshot.board.caveat === 'MR-CAVEAT-ASSOCIATION',
    ).length,
    1,
    matchingCaveatFacts.some((fact) => fact.contradictsReport),
  );
  return results;
};

const validateSnapshotEvidenceReferences = (
  state: CampaignState,
  snapshot: CampaignState['manuscript']['snapshotsById'][string],
  isCurrent: boolean,
): CheckedResult<never> | null => {
  const path = `/manuscript/snapshotsById/${snapshot.id}/board`;
  const includedCards = new Map<
    string,
    CampaignState['experiments']['evidenceCardsById'][string]
  >();
  for (const [index, evidenceId] of snapshot.board.figures.entries()) {
    if (evidenceId === null) continue;
    const card = state.experiments.evidenceCardsById[evidenceId];
    if (
      card === undefined ||
      (isCurrent && state.manuscript.omittedEvidenceIds.includes(evidenceId))
    )
      return invariant(`${path}/figures/${index}`, 'invalidReference');
    includedCards.set(evidenceId, card);
  }
  for (const [index, controlId] of snapshot.board.controls.entries()) {
    if (controlId === null) continue;
    const matchesIncludedFigure = [...includedCards.values()].some((card) => {
      if (card.rawRecordId === null) return false;
      return state.experiments.rawRecordsById[card.rawRecordId]?.controlResultId === controlId;
    });
    if (!matchesIncludedFigure) return invariant(`${path}/controls/${index}`, 'invalidReference');
  }
  if (
    snapshot.board.caveat !== null &&
    ![...includedCards.values()].some((card) => card.selectedCaveatId === snapshot.board.caveat)
  )
    return invariant(`${path}/caveat`, 'invalidReference');
  return null;
};

const expectedClaimCard = (
  state: CampaignState,
  snapshot: CampaignState['manuscript']['snapshotsById'][string],
): 'met' | 'partlyMet' | 'notMet' => {
  const level = snapshot.board.claimLevel;
  if (level === null) return 'notMet';
  const validatedResults = expectedRequirementResults(state, snapshot);
  const applicable = applicableRequirementKeys[level];
  const results = applicable.map((key) => validatedResults[key]);
  if (results.every((result) => result === 'met')) return 'met';
  if (level === 'inflated' && validatedResults.causalSupport !== 'met') return 'notMet';
  const missing = applicable.filter((key) => validatedResults[key] === 'missing');
  if (
    missing.length === 1 &&
    results.every((result) => result === 'met' || result === 'missing') &&
    snapshot.statedMissingRequirement === missing[0] &&
    snapshot.board.caveat !== null
  )
    return 'partlyMet';
  return 'notMet';
};

const expectedEvidencePiimCard = (
  state: CampaignState,
  role: 'batch' | 'oxygen',
  sourceId: string | null,
): 'met' | 'partlyMet' | 'notMet' => {
  if (sourceId === null) return 'notMet';
  const card = state.experiments.evidenceCardsById[sourceId];
  if (
    card === undefined ||
    card.piimRole !== role ||
    card.rawRecordId === null ||
    state.manuscript.omittedEvidenceIds.includes(sourceId)
  )
    return 'notMet';
  const raw = state.experiments.rawRecordsById[card.rawRecordId];
  const snapshot =
    state.manuscript.currentSnapshotId === null
      ? undefined
      : state.manuscript.snapshotsById[state.manuscript.currentSnapshotId];
  if (
    raw === undefined ||
    snapshot === undefined ||
    !snapshot.board.figures.includes(sourceId) ||
    !snapshot.board.controls.includes(raw.controlResultId) ||
    snapshot.board.caveat !== card.selectedCaveatId ||
    card.quality === 'suspicious' ||
    raw.internalMismatch
  )
    return 'notMet';
  const reportedReadingStatus =
    state.manuscript.reportedReadingsByEvidenceId[sourceId] ?? card.reportedReadingStatus;
  if (reportedReadingStatus === 'altered' || reportedReadingStatus === 'unsupported') return 'met';
  return card.quality === 'usable' ? 'met' : 'partlyMet';
};

const hasBlockingConcern = (state: CampaignState, routeId: 'aldercroft' | 'morrow'): boolean =>
  Object.values(state.narrative.concernsById).some(
    (concern) =>
      concern.visible &&
      concern.currentResponse !== 'correct' &&
      (concern.routeImpact === routeId || concern.routeImpact === 'both'),
  );

const checkInvariants = (state: CampaignState): CheckedResult<never> | null => {
  const records: [string, Record<string, { id: string }>][] = [
    ['/experiments/equipmentById', state.experiments.equipmentById],
    ['/experiments/preparationById', state.experiments.preparationById],
    ['/experiments/runsById', state.experiments.runsById],
    ['/experiments/rawRecordsById', state.experiments.rawRecordsById],
    ['/experiments/evidenceCardsById', state.experiments.evidenceCardsById],
    ['/experiments/stopLogsById', state.experiments.stopLogsById],
    ['/manuscript/snapshotsById', state.manuscript.snapshotsById],
    ['/manuscript/revisionTasksById', state.manuscript.revisionTasksById],
    ['/manuscript/reviewerReportsById', state.manuscript.reviewerReportsById],
    ['/narrative/scenesById', state.narrative.scenesById],
    ['/narrative/messagesById', state.narrative.messagesById],
    ['/narrative/requestsById', state.narrative.requestsById],
    ['/narrative/concernsById', state.narrative.concernsById],
    ['/narrative/routesById', state.narrative.routesById],
    ['/narrative/scheduler/eventsById', state.narrative.scheduler.eventsById],
    ['/relationships/byId', state.relationships.byId],
    ['/world/characterPlacementsById', state.world.characterPlacementsById],
    ['/world/roomStatesById', state.world.roomStatesById],
  ];
  for (const [path, record] of records) {
    const issue = checkRecordKeys(record, path);
    if (issue !== null) return issue;
  }
  const uniqueLists: [string, (string | number)[]][] = [
    ['/calendar/crashPeriods', state.calendar.crashPeriods],
    ['/experiments/activeRunIds', state.experiments.activeRunIds],
    ['/contentHistory/completedContentIds', state.contentHistory.completedContentIds],
    ['/contentHistory/expiredContentIds', state.contentHistory.expiredContentIds],
    ['/contentHistory/readMessageIds', state.contentHistory.readMessageIds],
    [
      '/contentHistory/consumedContextualContentIds',
      state.contentHistory.consumedContextualContentIds,
    ],
    [
      '/contentHistory/displayedEnvironmentalTextIds',
      state.contentHistory.displayedEnvironmentalTextIds,
    ],
    ['/contentHistory/recordedSceneClosingIds', state.contentHistory.recordedSceneClosingIds],
    ['/contentHistory/recordedSceneRecapIds', state.contentHistory.recordedSceneRecapIds],
    ['/contentHistory/citationIds', state.contentHistory.citationIds],
    ['/manuscript/omittedEvidenceIds', state.manuscript.omittedEvidenceIds],
    ['/manuscript/committedEffectIds', state.manuscript.committedEffectIds],
    ['/manuscript/snapshotOrder', state.manuscript.snapshotOrder],
    ['/narrative/scheduler/queue', state.narrative.scheduler.queue],
    ['/world/persistentEnvironmentIds', state.world.persistentEnvironmentIds],
  ];
  for (const [path, list] of uniqueLists) {
    const index = firstDuplicate(list);
    if (index !== null) return invariant(`${path}/${index}`, 'duplicateId');
  }
  const completedContent = new Set(state.contentHistory.completedContentIds);
  if (state.contentHistory.expiredContentIds.some((id) => completedContent.has(id)))
    return invariant('/contentHistory/expiredContentIds', 'invariantViolation');
  if (state.calendar.crashPeriods.some((period) => period > state.calendar.periodIndex))
    return invariant('/calendar/crashPeriods', 'invariantViolation');
  if (
    state.calendar.crashPeriods.some(
      (period, index, periods) => index > 0 && period <= periods[index - 1]!,
    )
  )
    return invariant('/calendar/crashPeriods', 'invariantViolation');
  if (state.world.floorAct !== expectedFloorAct(state.calendar.periodIndex))
    return invariant('/world/floorAct', 'invariantViolation');
  if (state.narrative.scheduler.lastSchedulerRevision > state.metadata.stateRevision)
    return invariant('/narrative/scheduler/lastSchedulerRevision', 'invariantViolation');
  const valueHistories: [keyof CampaignState['campaignValues']['histories'], number, number][] = [
    ['energy', state.campaignValues.energy, state.metadata.pressureProfile === 'supported' ? 5 : 4],
    ['evidence', state.campaignValues.evidence, 3],
    ['elenaPaperConfidence', state.campaignValues.elenaPaperConfidence, 45],
    ['integrity', state.campaignValues.integrity, 100],
    ['integrityRecoveryUsed', state.campaignValues.integrityRecoveryUsed, 0],
  ];
  const relationshipInitialTrust: Record<string, number> = {
    'MR-CHR-CAMILA': 40,
    'MR-CHR-ELENA': 60,
    'MR-CHR-GABRIEL': 60,
    'MR-CHR-HAORAN': 60,
    'MR-CHR-SAMIRA': 40,
  };
  const histories: [string, string, ChangeRecord[], StoredScalar, StoredScalar?][] = [
    ...valueHistories.map(
      ([key, current, initial]) =>
        [
          `/campaignValues/histories/${key}`,
          `/campaignValues/${key}`,
          state.campaignValues.histories[key],
          current,
          initial,
        ] as [string, string, ChangeRecord[], StoredScalar, StoredScalar],
    ),
    ...Object.entries(state.experiments.equipmentById).map(
      ([id, equipment]) =>
        [
          `/experiments/equipmentById/${id}/history`,
          `/experiments/equipmentById/${id}/condition`,
          equipment.history,
          equipment.condition,
        ] as [string, string, ChangeRecord[], StoredScalar],
    ),
    ...Object.entries(state.experiments.preparationById).map(
      ([id, preparation]) =>
        [
          `/experiments/preparationById/${id}/history`,
          `/experiments/preparationById/${id}/band`,
          preparation.history,
          preparation.band,
        ] as [string, string, ChangeRecord[], StoredScalar],
    ),
    ...Object.entries(state.relationships.byId).map(
      ([id, relationship]) =>
        [
          `/relationships/byId/${id}/history`,
          `/relationships/byId/${id}/trust`,
          relationship.history,
          relationship.trust,
          relationshipInitialTrust[id]!,
        ] as [string, string, ChangeRecord[], StoredScalar, StoredScalar],
    ),
  ];
  const changeIds = new Set<string>();
  const changesByRevision = new Map<number, ChangeRecord[]>();
  for (const [path, fieldPath, recordsForFact, value, initialValue] of histories) {
    for (const [index, record] of recordsForFact.entries()) {
      if (changeIds.has(record.id)) return invariant(`${path}/${index}/id`, 'duplicateId');
      changeIds.add(record.id);
      const revisionChanges = changesByRevision.get(record.stateRevision) ?? [];
      revisionChanges.push(record);
      changesByRevision.set(record.stateRevision, revisionChanges);
      const integrityPath = record.fieldPath === '/campaignValues/integrity';
      if (integrityPath !== (record.integrityEventType !== null))
        return invariant(`${path}/${index}/integrityEventType`, 'invariantViolation');
      if (
        fieldPath === '/campaignValues/evidence' &&
        typeof record.previousValue === 'number' &&
        typeof record.newValue === 'number' &&
        record.newValue < record.previousValue
      )
        return invariant(`${path}/${index}/newValue`, 'historyRegression');
    }
    const issue = checkHistory(
      recordsForFact,
      value,
      state.metadata.stateRevision,
      path,
      fieldPath,
      initialValue,
    );
    if (issue !== null) return issue;
  }
  for (const [revision, changes] of changesByRevision) {
    const sequences = changes.map((change) => change.sequence).sort((left, right) => left - right);
    for (const [index, sequence] of sequences.entries())
      if (sequence !== index + 1)
        return invariant(`/change:${revision}:${sequence}/sequence`, 'historyRegression');
  }
  const runIds = Object.keys(state.experiments.runsById);
  for (const [path, record] of [
    ['/experiments/equipmentById', state.experiments.equipmentById],
    ['/experiments/preparationById', state.experiments.preparationById],
  ] as const) {
    if (
      Object.keys(record).length !== runIds.length ||
      runIds.some((id) => !Object.hasOwn(record, id))
    )
      return invariant(path, 'invalidReference');
  }
  const active = new Set(state.experiments.activeRunIds);
  for (const id of state.experiments.activeRunIds) {
    const run = state.experiments.runsById[id];
    if (run === undefined) return invariant('/experiments/activeRunIds', 'invalidReference');
    if (!['configured', 'running', 'readyForAnalysis'].includes(run.stage))
      return invariant(`/experiments/runsById/${id}/stage`, 'invariantViolation');
  }
  for (const [id, run] of Object.entries(state.experiments.runsById)) {
    if (id !== `run:${run.templateId}:${run.runNumber}`)
      return invariant(`/experiments/runsById/${id}/id`, 'invalidId');
    if (
      run.runNumber === 2 &&
      ![
        'MR-EXP-LASER-SHAM',
        'MR-EXP-DAMAGE-RANGE',
        'MR-EXP-BATCH-CHECK',
        'MR-EXP-REPAIR-STATE',
      ].includes(run.templateId)
    )
      return invariant(`/experiments/runsById/${id}/runNumber`, 'invariantViolation');
    const shouldBeActive = ['configured', 'running', 'readyForAnalysis'].includes(run.stage);
    if (active.has(id) !== shouldBeActive)
      return invariant(`/experiments/runsById/${id}/stage`, 'invariantViolation');
    const equipment = state.experiments.equipmentById[id];
    const preparation = state.experiments.preparationById[id];
    if (equipment?.condition !== run.equipmentState)
      return invariant(`/experiments/runsById/${id}/equipmentState`, 'invariantViolation');
    const expectedPreparationBand =
      run.severeIssue || run.issueCount >= 2
        ? 'compromised'
        : run.issueCount === 1
          ? 'mixed'
          : 'robust';
    if (preparation?.band !== expectedPreparationBand)
      return invariant(`/experiments/preparationById/${id}/band`, 'invariantViolation');
    const variationFacts = [
      run.variationNamespace,
      run.variationTargetId,
      run.variationDrawIndex,
      run.variationBucket,
    ];
    const hasNoVariation = variationFacts.every((fact) => fact === null);
    const hasCompleteVariation = variationFacts.every((fact) => fact !== null);
    if (!hasNoVariation && !hasCompleteVariation)
      return invariant(`/experiments/runsById/${id}/variationNamespace`, 'invariantViolation');
    const stopLog = state.experiments.stopLogsById[`stop:${id}`];
    const startExpired =
      run.stage === 'stopped' && stopLog?.reasonId === 'MR-REASON-START-WINDOW-EXPIRED';
    const analysisExpired =
      run.stage === 'stopped' && stopLog?.reasonId === 'MR-REASON-ANALYSIS-DEADLINE';
    if (run.startedPeriod !== null && run.startedPeriod > state.calendar.periodIndex)
      return invariant(`/experiments/runsById/${id}/startedPeriod`, 'invariantViolation');
    if (run.stage === 'configured' || startExpired) {
      if (
        run.startedPeriod !== null ||
        !hasNoVariation ||
        run.projectedResultBand !== null ||
        run.finalResultBand !== null ||
        run.monitoringResponses.length !== 0 ||
        run.attentionState !== 'normal'
      )
        return invariant(`/experiments/runsById/${id}`, 'invariantViolation');
    } else if (
      run.startedPeriod === null ||
      !hasCompleteVariation ||
      run.variationTargetId !== id ||
      run.projectedResultBand === null
    ) {
      return invariant(`/experiments/runsById/${id}/variationTargetId`, 'invariantViolation');
    }
    const windowCount = run.templateId === 'MR-EXP-OXYGEN-LOSS' ? 2 : 1;
    if (run.monitoringResponses.length > windowCount)
      return invariant(`/experiments/runsById/${id}/monitoringResponses`, 'invariantViolation');
    for (const [index, response] of run.monitoringResponses.entries()) {
      if (
        run.startedPeriod === null ||
        (response.response === 'missed'
          ? response.completedPeriod !== run.startedPeriod + index * 2 + 2
          : response.completedPeriod - 1 < run.startedPeriod + index * 2 ||
            response.completedPeriod - 1 > run.startedPeriod + index * 2 + 1) ||
        response.windowIndex !== index ||
        response.completedPeriod > state.calendar.periodIndex ||
        (index > 0 &&
          response.completedPeriod < run.monitoringResponses[index - 1]!.completedPeriod)
      )
        return invariant(
          `/experiments/runsById/${id}/monitoringResponses/${index}`,
          'invariantViolation',
        );
      if (response.response === 'stop' && index !== run.monitoringResponses.length - 1)
        return invariant(
          `/experiments/runsById/${id}/monitoringResponses/${index}/response`,
          'invariantViolation',
        );
    }
    // A later stabilization can remove at most one earlier missed monitoring issue.
    // Other authored preparation inputs remain the connected resolver's responsibility.
    let unresolvedMissedIssues = 0;
    for (const response of run.monitoringResponses) {
      if (response.response === 'missed') unresolvedMissedIssues += 1;
      if (response.response === 'stabilize')
        unresolvedMissedIssues = Math.max(0, unresolvedMissedIssues - 1);
    }
    if (run.issueCount < unresolvedMissedIssues)
      return invariant(`/experiments/runsById/${id}/issueCount`, 'invariantViolation');
    const stoppedByResponse = run.monitoringResponses.at(-1)?.response === 'stop';
    if ((run.stage === 'stopped' && !startExpired && !analysisExpired) !== stoppedByResponse)
      return invariant(`/experiments/runsById/${id}/stage`, 'invariantViolation');
    if (
      (run.stage === 'running' && run.monitoringResponses.length >= windowCount) ||
      (['readyForAnalysis', 'analysed'].includes(run.stage) &&
        run.monitoringResponses.length !== windowCount)
    )
      return invariant(`/experiments/runsById/${id}/monitoringResponses`, 'invariantViolation');
    const mustHaveFinalBand =
      ['readyForAnalysis', 'analysed'].includes(run.stage) ||
      (analysisExpired && run.monitoringResponses.length === windowCount);
    if (mustHaveFinalBand !== (run.finalResultBand !== null))
      return invariant(`/experiments/runsById/${id}/finalResultBand`, 'invariantViolation');
    if (
      run.stage !== 'configured' &&
      !startExpired &&
      preparation?.band !== (run.finalResultBand ?? run.projectedResultBand)
    )
      return invariant(`/experiments/preparationById/${id}/band`, 'invariantViolation');
    const rawId = `raw:${id}`;
    const evidenceId = `evidence:${id}`;
    const stopId = `stop:${id}`;
    if (
      run.stage === 'analysed' &&
      (!(rawId in state.experiments.rawRecordsById) ||
        !(evidenceId in state.experiments.evidenceCardsById))
    )
      return invariant(`/experiments/runsById/${id}`, 'invalidReference');
    if (
      run.stage !== 'analysed' &&
      (rawId in state.experiments.rawRecordsById ||
        evidenceId in state.experiments.evidenceCardsById)
    )
      return invariant(`/experiments/runsById/${id}`, 'invariantViolation');
    if (
      run.stage === 'stopped' &&
      (!(stopId in state.experiments.stopLogsById) ||
        rawId in state.experiments.rawRecordsById ||
        evidenceId in state.experiments.evidenceCardsById)
    )
      return invariant(`/experiments/runsById/${id}`, 'invariantViolation');
  }
  for (const [id, raw] of Object.entries(state.experiments.rawRecordsById)) {
    const run = state.experiments.runsById[raw.runId];
    if (
      id !== `raw:${raw.runId}` ||
      run?.stage !== 'analysed' ||
      raw.finalPreparationBand !== run.finalResultBand ||
      (run.monitoringResponses.some((response) => response.response === 'missed') &&
        raw.observationCoverage !== 'limited')
    )
      return invariant(`/experiments/rawRecordsById/${id}`, 'invalidReference');
  }
  for (const [id, card] of Object.entries(state.experiments.evidenceCardsById)) {
    const samira = id === 'evidence:MR-SUP-SAMIRA-EVIDENCE';
    if (
      !samira &&
      (card.runId === null ||
        card.rawRecordId !== `raw:${card.runId}` ||
        card.sourceId !== card.rawRecordId ||
        id !== `evidence:${card.runId}` ||
        state.experiments.rawRecordsById[card.rawRecordId] === undefined)
    )
      return invariant(`/experiments/evidenceCardsById/${id}`, 'invalidReference');
    if (
      samira &&
      (card.runId !== null ||
        card.rawRecordId !== null ||
        card.sourceId !== 'MR-SUP-SAMIRA-EVIDENCE')
    )
      return invariant(`/experiments/evidenceCardsById/${id}`, 'invalidReference');
  }
  for (const [id, stop] of Object.entries(state.experiments.stopLogsById)) {
    const run = state.experiments.runsById[stop.runId];
    if (
      id !== `stop:${stop.runId}` ||
      run?.stage !== 'stopped' ||
      (stop.reasonId === 'MR-REASON-START-WINDOW-EXPIRED'
        ? run.startedPeriod !== null ||
          (startExpiryPeriod(run.templateId) !== undefined &&
            stop.stoppedPeriod !== startExpiryPeriod(run.templateId))
        : stop.reasonId === 'MR-REASON-ANALYSIS-DEADLINE'
          ? run.startedPeriod === null ||
            stop.stoppedPeriod !== 52 ||
            run.startedPeriod > 52 ||
            run.monitoringResponses.some(
              (response) => response.completedPeriod > 52 || response.response === 'stop',
            )
          : stop.stoppedPeriod !== run.monitoringResponses.at(-1)?.completedPeriod) ||
      stop.stoppedPeriod > state.calendar.periodIndex
    )
      return invariant(`/experiments/stopLogsById/${id}`, 'invalidReference');
  }
  if (state.contentHistory.completedContentIds.includes('MR-SLICE-CLAIM-REHEARSAL')) {
    const laser = Object.values(state.experiments.runsById).some(
      (run) => run.templateId === 'MR-EXP-LASER-SHAM' && run.stage === 'analysed',
    );
    if (
      state.metadata.buildProfileId !== 'slice' ||
      state.calendar.periodIndex > 11 ||
      state.manuscript.currentSnapshotId === null ||
      !laser ||
      state.conclusion.state !== 'unresolved' ||
      Object.values(state.narrative.routesById).some((route) => route.evaluation !== null) ||
      state.manuscript.preprintState !== 'notPosted' ||
      Object.values(state.manuscript.piimMilestones).some((revision) => revision !== null)
    )
      return invariant('/contentHistory/completedContentIds', 'invariantViolation');
  }
  if (state.manuscript.snapshotOrder.length === 0) {
    if (state.manuscript.currentSnapshotId !== null)
      return invariant('/manuscript/currentSnapshotId', 'invalidReference');
    const emptyBoard = {
      claim: null,
      claimLevel: null,
      figures: [null, null, null],
      controls: [null, null],
      caveat: null,
      authorship: null,
      supplementary: null,
      activeRequest: null,
    };
    if (!plainDataEqual(state.manuscript.board, emptyBoard))
      return invariant('/manuscript/board', 'invariantViolation');
  } else {
    let previousRevision = 0;
    for (const id of state.manuscript.snapshotOrder) {
      const snapshot = state.manuscript.snapshotsById[id];
      if (snapshot === undefined) return invariant('/manuscript/snapshotOrder', 'invalidReference');
      if (
        id !== `snapshot:${snapshot.stateRevision}` ||
        snapshot.stateRevision <= previousRevision ||
        snapshot.stateRevision > state.metadata.stateRevision
      )
        return invariant(`/manuscript/snapshotsById/${id}`, 'invariantViolation');
      if ((snapshot.board.claim === null) !== (snapshot.board.claimLevel === null))
        return invariant(`/manuscript/snapshotsById/${id}/board/claimLevel`, 'invariantViolation');
      const referenceIssue = validateSnapshotEvidenceReferences(
        state,
        snapshot,
        id === state.manuscript.currentSnapshotId,
      );
      if (referenceIssue !== null) return referenceIssue;
      const applicable = new Set(
        snapshot.board.claimLevel === null
          ? []
          : applicableRequirementKeys[snapshot.board.claimLevel],
      );
      for (const key of requirementKeys) {
        const result = snapshot.requirementResults[key];
        if ((applicable.has(key) && result === null) || (!applicable.has(key) && result !== null))
          return invariant(
            `/manuscript/snapshotsById/${id}/requirementResults/${key}`,
            'invariantViolation',
          );
      }
      if (id === state.manuscript.currentSnapshotId) {
        const expectedResults = expectedRequirementResults(state, snapshot);
        for (const key of requirementKeys)
          if (snapshot.requirementResults[key] !== expectedResults[key])
            return invariant(
              `/manuscript/snapshotsById/${id}/requirementResults/${key}`,
              'invariantViolation',
            );
      }
      if (
        snapshot.statedMissingRequirement !== null &&
        (!applicable.has(snapshot.statedMissingRequirement) ||
          snapshot.requirementResults[snapshot.statedMissingRequirement] !== 'missing' ||
          snapshot.board.caveat === null)
      )
        return invariant(
          `/manuscript/snapshotsById/${id}/statedMissingRequirement`,
          'invariantViolation',
        );
      previousRevision = snapshot.stateRevision;
    }
    if (state.manuscript.currentSnapshotId !== state.manuscript.snapshotOrder.at(-1))
      return invariant('/manuscript/currentSnapshotId', 'invariantViolation');
    const currentSnapshot = state.manuscript.snapshotsById[state.manuscript.currentSnapshotId];
    if (!plainDataEqual(state.manuscript.board, currentSnapshot?.board))
      return invariant('/manuscript/board', 'invariantViolation');
  }
  if (
    Object.keys(state.manuscript.snapshotsById).length !== state.manuscript.snapshotOrder.length ||
    Object.keys(state.manuscript.snapshotsById).some(
      (id) => !state.manuscript.snapshotOrder.includes(id),
    )
  )
    return invariant('/manuscript/snapshotsById', 'invariantViolation');
  const reviewerIssue = checkExactKeys(
    state.manuscript.reviewerReportsById,
    ['MR-REC-REVIEWER-1', 'MR-REC-REVIEWER-2', 'MR-REC-REVIEWER-3'],
    '/manuscript/reviewerReportsById',
  );
  if (reviewerIssue !== null) return reviewerIssue;
  const reviewerForms = Object.values(state.manuscript.reviewerReportsById).map(
    (report) => report.form,
  );
  const reportsExist = reviewerForms.every((form) => form !== null);
  if (!reportsExist && reviewerForms.some((form) => form !== null))
    return invariant('/manuscript/reviewerReportsById', 'invariantViolation');
  if (reportsExist && state.manuscript.currentSnapshotId === null)
    return invariant('/manuscript/reviewerReportsById', 'invariantViolation');
  if (state.manuscript.preprintState !== 'notPosted' && state.manuscript.currentSnapshotId === null)
    return invariant('/manuscript/preprintState', 'invariantViolation');
  if (
    state.manuscript.journalState !== 'notSubmitted' &&
    state.manuscript.currentSnapshotId === null
  )
    return invariant('/manuscript/journalState', 'invariantViolation');
  if (['majorRevision', 'resolved'].includes(state.manuscript.journalState) && !reportsExist)
    return invariant('/manuscript/journalState', 'invariantViolation');
  const piimCards = Object.values(state.manuscript.piimCards);
  const piimCardsExist = piimCards.every((card) => card !== null);
  if (!piimCardsExist && piimCards.some((card) => card !== null))
    return invariant('/manuscript/piimCards', 'invariantViolation');
  if (piimCardsExist && !reportsExist)
    return invariant('/manuscript/piimCards', 'invariantViolation');
  const milestoneEntries = [
    ['publicPreprintRevision', state.manuscript.piimMilestones.publicPreprintRevision],
    ['journalChainRevision', state.manuscript.piimMilestones.journalChainRevision],
    ['reviewerReportsRevision', state.manuscript.piimMilestones.reviewerReportsRevision],
    ['piimCardsRevision', state.manuscript.piimMilestones.piimCardsRevision],
    ['piimOutcomeRevision', state.manuscript.piimMilestones.piimOutcomeRevision],
  ] as const;
  const milestoneValues = milestoneEntries.map(([, revision]) => revision);
  let previousMilestone = 0;
  let foundAbsentMilestone = false;
  for (const [key, revision] of milestoneEntries) {
    if (revision === null) {
      foundAbsentMilestone = true;
      continue;
    }
    if (
      foundAbsentMilestone ||
      revision <= previousMilestone ||
      revision > state.metadata.stateRevision
    )
      return invariant(`/manuscript/piimMilestones/${key}`, 'invariantViolation');
    previousMilestone = revision;
  }
  const milestoneFacts = [
    state.manuscript.preprintState !== 'notPosted',
    state.manuscript.journalState !== 'notSubmitted',
    reportsExist,
    piimCardsExist,
    state.manuscript.piimOutcome !== null,
  ];
  for (const [index, present] of milestoneFacts.entries())
    if ((milestoneValues[index] !== null) !== present)
      return invariant(
        `/manuscript/piimMilestones/${milestoneEntries[index]![0]}`,
        'invariantViolation',
      );
  const publicPreprintRevision = state.manuscript.piimMilestones.publicPreprintRevision;
  if (
    publicPreprintRevision !== null &&
    snapshotAtRevision(state, publicPreprintRevision) === undefined
  )
    return invariant('/manuscript/piimMilestones/publicPreprintRevision', 'invalidReference');
  const sourceValues = Object.values(state.manuscript.piimCardSources);
  if (!piimCardsExist && sourceValues.some((source) => source !== null))
    return invariant('/manuscript/piimCardSources', 'invariantViolation');
  if (piimCardsExist) {
    const currentSnapshot =
      state.manuscript.currentSnapshotId === null
        ? undefined
        : state.manuscript.snapshotsById[state.manuscript.currentSnapshotId];
    if (currentSnapshot === undefined)
      return invariant('/manuscript/piimCardSources/claimSnapshotId', 'invalidReference');
    if (currentSnapshot.stateRevision !== state.manuscript.piimMilestones.piimCardsRevision)
      return invariant('/manuscript/piimMilestones/piimCardsRevision', 'invalidReference');
    const validatedRequirementResults = expectedRequirementResults(state, currentSnapshot);
    const visibleContradiction = Object.values(validatedRequirementResults).some(
      (result) => result === 'conflict',
    );
    for (const [role, sourceId, cardValue] of [
      [
        'batch',
        state.manuscript.piimCardSources.batchEvidenceCardId,
        state.manuscript.piimCards.batch,
      ],
      [
        'oxygen',
        state.manuscript.piimCardSources.oxygenEvidenceCardId,
        state.manuscript.piimCards.oxygen,
      ],
    ] as const) {
      if (sourceId === null) {
        if (cardValue !== 'notMet')
          return invariant(`/manuscript/piimCardSources/${role}EvidenceCardId`, 'invalidReference');
      } else {
        const card = state.experiments.evidenceCardsById[sourceId];
        const raw =
          card?.rawRecordId === null || card?.rawRecordId === undefined
            ? undefined
            : state.experiments.rawRecordsById[card.rawRecordId];
        if (
          card === undefined ||
          card.piimRole !== role ||
          raw === undefined ||
          state.manuscript.omittedEvidenceIds.includes(sourceId) ||
          !currentSnapshot.board.figures.includes(sourceId) ||
          !currentSnapshot.board.controls.includes(raw.controlResultId) ||
          currentSnapshot.board.caveat !== card.selectedCaveatId
        )
          return invariant(`/manuscript/piimCardSources/${role}EvidenceCardId`, 'invalidReference');
        if (cardValue !== expectedEvidencePiimCard(state, role, sourceId))
          return invariant(`/manuscript/piimCards/${role}`, 'invariantViolation');
      }
    }
    const claimSourceId = state.manuscript.piimCardSources.claimSnapshotId;
    if (claimSourceId === null) {
      if (state.manuscript.piimCards.claim !== 'notMet')
        return invariant('/manuscript/piimCardSources/claimSnapshotId', 'invalidReference');
    } else {
      if (claimSourceId !== state.manuscript.currentSnapshotId)
        return invariant('/manuscript/piimCardSources/claimSnapshotId', 'invalidReference');
      if (state.manuscript.piimCards.claim !== expectedClaimCard(state, currentSnapshot))
        return invariant('/manuscript/piimCards/claim', 'invariantViolation');
    }
    if (
      visibleContradiction &&
      state.manuscript.piimOutcome?.responseBand !== undefined &&
      state.manuscript.piimOutcome.responseBand !== 'weak'
    )
      return invariant('/manuscript/piimOutcome/responseBand', 'invariantViolation');
  }
  const piimOutcome = state.manuscript.piimOutcome;
  if (piimOutcome !== null) {
    if (!piimCardsExist) return invariant('/manuscript/piimOutcome', 'invariantViolation');
    if (state.calendar.periodIndex < 56 || state.manuscript.journalState !== 'resolved')
      return invariant('/manuscript/piimOutcome', 'invariantViolation');
    if (piimOutcome.targetId !== 'MR-PIIM-OUTCOME')
      return invariant('/manuscript/piimOutcome/targetId', 'invalidId');
    const cardValues = piimCards;
    const currentSnapshot = state.manuscript.snapshotsById[state.manuscript.currentSnapshotId!];
    const visibleContradiction = Object.values(
      expectedRequirementResults(state, currentSnapshot!),
    ).some((result) => result === 'conflict');
    const expectedResponseBand = visibleContradiction
      ? 'weak'
      : cardValues.every((card) => card === 'met')
        ? 'top'
        : cardValues.some((card) => card === 'met') &&
            cardValues.every((card) => card === 'met' || card === 'partlyMet')
          ? 'middle'
          : 'weak';
    if (piimOutcome.responseBand !== expectedResponseBand)
      return invariant('/manuscript/piimOutcome/responseBand', 'invariantViolation');
    const expectedPiimResult =
      expectedResponseBand === 'top'
        ? piimOutcome.bucket < 80
          ? 'published'
          : 'acceptedPendingFinalWork'
        : expectedResponseBand === 'middle'
          ? piimOutcome.bucket < 50
            ? 'acceptedPendingFinalWork'
            : 'underReview'
          : piimOutcome.bucket < 20
            ? 'underReview'
            : 'rejected';
    if (piimOutcome.result !== expectedPiimResult)
      return invariant('/manuscript/piimOutcome/result', 'invariantViolation');
    const expectedPaperState =
      piimOutcome.result === 'rejected' ? 'rejectedOrWithdrawn' : piimOutcome.result;
    if (state.manuscript.finalPaperState !== expectedPaperState)
      return invariant('/manuscript/finalPaperState', 'invariantViolation');
  } else if (
    state.manuscript.finalPaperState !== null &&
    state.manuscript.finalPaperState !== 'rejectedOrWithdrawn'
  ) {
    return invariant('/manuscript/finalPaperState', 'invariantViolation');
  }
  if (
    state.manuscript.finalPaperState === 'rejectedOrWithdrawn' &&
    piimOutcome === null &&
    state.manuscript.preprintState !== 'withdrawn' &&
    state.manuscript.journalState !== 'withdrawn'
  )
    return invariant('/manuscript/finalPaperState', 'invariantViolation');
  for (const evidenceId of Object.keys(state.manuscript.reportedReadingsByEvidenceId)) {
    const card = state.experiments.evidenceCardsById[evidenceId];
    if (card === undefined)
      return invariant(
        `/manuscript/reportedReadingsByEvidenceId/${evidenceId}`,
        'invalidReference',
      );
  }
  for (const [index, evidenceId] of state.manuscript.omittedEvidenceIds.entries())
    if (state.experiments.evidenceCardsById[evidenceId] === undefined)
      return invariant(`/manuscript/omittedEvidenceIds/${index}`, 'invalidReference');
  const samiraEvidenceId = 'evidence:MR-SUP-SAMIRA-EVIDENCE';
  const usesSamiraEvidence =
    Object.hasOwn(state.manuscript.reportedReadingsByEvidenceId, samiraEvidenceId) ||
    state.manuscript.omittedEvidenceIds.includes(samiraEvidenceId) ||
    state.manuscript.snapshotOrder.some((id) => {
      const board = state.manuscript.snapshotsById[id]!.board;
      return [...board.figures, ...board.controls, board.caveat].includes(samiraEvidenceId);
    });
  if (usesSamiraEvidence && state.manuscript.authorship.samira !== 'credited')
    return invariant('/manuscript/authorship/samira', 'invariantViolation');
  const queueSet = new Set(state.narrative.scheduler.queue);
  if (
    state.narrative.scenesById['MR-SCN-CLARIFIED'] === undefined ||
    state.narrative.scheduler.eventsById['MR-EVT-CLARIFIED'] === undefined
  )
    return invariant('/narrative/scenesById/MR-SCN-CLARIFIED', 'invalidReference');
  if (queueSet.size !== state.narrative.scheduler.queue.length)
    return invariant('/narrative/scheduler/queue', 'duplicateId');
  for (const id of state.narrative.scheduler.queue)
    if (state.narrative.scheduler.eventsById[id]?.state !== 'queued')
      return invariant('/narrative/scheduler/queue', 'invalidReference');
  if (state.narrative.scheduler.activeEventId !== null) {
    const id = state.narrative.scheduler.activeEventId;
    if (queueSet.has(id) || state.narrative.scheduler.eventsById[id]?.state !== 'active')
      return invariant('/narrative/scheduler/activeEventId', 'invariantViolation');
    const sceneId = id === 'MR-EVT-CLARIFIED' ? 'MR-SCN-CLARIFIED' : id;
    if (state.narrative.scenesById[sceneId]?.state !== 'inProgress')
      return invariant('/narrative/scheduler/activeEventId', 'invariantViolation');
  }
  for (const [id, event] of Object.entries(state.narrative.scheduler.eventsById)) {
    if (
      event.state === 'locked' &&
      (event.firstEligiblePeriod !== null || event.resolvedPeriod !== null)
    )
      return invariant(`/narrative/scheduler/eventsById/${id}`, 'invariantViolation');
    if (['completed', 'expired'].includes(event.state) && event.resolvedPeriod === null)
      return invariant(
        `/narrative/scheduler/eventsById/${id}/resolvedPeriod`,
        'invariantViolation',
      );
    if (
      event.firstEligiblePeriod !== null &&
      event.firstEligiblePeriod > state.calendar.periodIndex
    )
      return invariant(
        `/narrative/scheduler/eventsById/${id}/firstEligiblePeriod`,
        'invariantViolation',
      );
    if (event.state !== 'locked' && event.firstEligiblePeriod === null)
      return invariant(
        `/narrative/scheduler/eventsById/${id}/firstEligiblePeriod`,
        'invariantViolation',
      );
    if (!['completed', 'expired'].includes(event.state) && event.resolvedPeriod !== null)
      return invariant(
        `/narrative/scheduler/eventsById/${id}/resolvedPeriod`,
        'invariantViolation',
      );
    if (
      event.resolvedPeriod !== null &&
      (event.resolvedPeriod > state.calendar.periodIndex ||
        event.firstEligiblePeriod === null ||
        event.resolvedPeriod < event.firstEligiblePeriod)
    )
      return invariant(
        `/narrative/scheduler/eventsById/${id}/resolvedPeriod`,
        'invariantViolation',
      );
    if (event.state === 'queued' && !queueSet.has(id))
      return invariant(`/narrative/scheduler/eventsById/${id}/state`, 'invariantViolation');
    if (event.state === 'active' && state.narrative.scheduler.activeEventId !== id)
      return invariant(`/narrative/scheduler/eventsById/${id}/state`, 'invariantViolation');
  }
  for (const [id, scene] of Object.entries(state.narrative.scenesById)) {
    const eventId = id === 'MR-SCN-CLARIFIED' ? 'MR-EVT-CLARIFIED' : id;
    const event = state.narrative.scheduler.eventsById[eventId];
    if (event === undefined) return invariant(`/narrative/scenesById/${id}`, 'invalidReference');
    const validPair =
      (scene.state === 'locked' && event.state === 'locked') ||
      (scene.state === 'eligible' && event.state === 'eligible') ||
      (scene.state === 'queued' && event.state === 'queued') ||
      (scene.state === 'inProgress' && event.state === 'active') ||
      (scene.state === 'completed' && event.state === 'completed') ||
      (scene.state === 'skipped' && ['completed', 'expired'].includes(event.state));
    if (!validPair) return invariant(`/narrative/scenesById/${id}/state`, 'invariantViolation');
    if (
      (['inProgress', 'completed'].includes(scene.state) ||
        (scene.state === 'skipped' && event.state === 'completed')) &&
      scene.authoredFormId === null
    )
      return invariant(`/narrative/scenesById/${id}/authoredFormId`, 'invariantViolation');
    if (!['completed', 'skipped'].includes(scene.state) && scene.finalPresentationState !== null)
      return invariant(`/narrative/scenesById/${id}/finalPresentationState`, 'invariantViolation');
  }
  for (const [id, message] of Object.entries(state.narrative.messagesById)) {
    if ((message.state === 'replied') !== (message.replyId !== null))
      return invariant(`/narrative/messagesById/${id}/replyId`, 'invariantViolation');
    if (
      ['read', 'replied'].includes(message.state) &&
      !state.contentHistory.readMessageIds.includes(id)
    )
      return invariant(`/narrative/messagesById/${id}/state`, 'invariantViolation');
  }
  for (const [id, request] of Object.entries(state.narrative.requestsById)) {
    if ((request.state === 'completed') !== (request.responseId !== null))
      return invariant(`/narrative/requestsById/${id}/responseId`, 'invariantViolation');
  }
  for (const [id, concern] of Object.entries(state.narrative.concernsById)) {
    const newestResponse = concern.responseHistory.at(-1) ?? null;
    if (concern.currentResponse !== newestResponse)
      return invariant(`/narrative/concernsById/${id}/currentResponse`, 'historyRegression');
  }
  const careerProgress = state.narrative.careerProgress;
  if (careerProgress.morrowVideoCompleted && !careerProgress.camilaReplySent)
    return invariant('/narrative/careerProgress/morrowVideoCompleted', 'invariantViolation');
  if (careerProgress.fabricationConfessedToCamila && !careerProgress.morrowVideoCompleted)
    return invariant(
      '/narrative/careerProgress/fabricationConfessedToCamila',
      'invariantViolation',
    );
  for (const [index, id] of state.contentHistory.readMessageIds.entries()) {
    const message = state.narrative.messagesById[id];
    if (message === undefined || !['read', 'replied', 'expired'].includes(message.state))
      return invariant(`/contentHistory/readMessageIds/${index}`, 'invalidReference');
  }
  const relationshipIssue = checkExactKeys(
    state.relationships.byId,
    ['MR-CHR-ELENA', 'MR-CHR-HAORAN', 'MR-CHR-SAMIRA', 'MR-CHR-GABRIEL', 'MR-CHR-CAMILA'],
    '/relationships/byId',
  );
  if (relationshipIssue !== null) return relationshipIssue;
  for (const [id, relationship] of Object.entries(state.relationships.byId))
    if (
      relationship.lastConsequentialSceneId !== null &&
      state.narrative.scenesById[relationship.lastConsequentialSceneId] === undefined
    )
      return invariant(`/relationships/byId/${id}/lastConsequentialSceneId`, 'invalidReference');
  for (const id of ['MR-CHR-ELENA', 'MR-CHR-HAORAN', 'MR-CHR-SAMIRA', 'MR-CHR-GABRIEL'])
    if (state.relationships.byId[id]?.introduced !== true)
      return invariant(`/relationships/byId/${id}/introduced`, 'invariantViolation');
  if (
    state.calendar.periodIndex < 28 &&
    state.relationships.byId['MR-CHR-CAMILA']?.introduced === true
  )
    return invariant('/relationships/byId/MR-CHR-CAMILA/introduced', 'invariantViolation');
  const closing = new Set(state.contentHistory.recordedSceneClosingIds);
  if (state.contentHistory.recordedSceneRecapIds.some((id) => closing.has(id)))
    return invariant('/contentHistory/recordedSceneRecapIds', 'invariantViolation');
  for (const [receiptType, ids, expectedPresentation] of [
    ['recordedSceneClosingIds', state.contentHistory.recordedSceneClosingIds, 'closingPlayed'],
    ['recordedSceneRecapIds', state.contentHistory.recordedSceneRecapIds, 'recapShown'],
  ] as const) {
    for (const [index, id] of ids.entries()) {
      const scene = state.narrative.scenesById[id];
      if (
        scene === undefined ||
        !['completed', 'skipped'].includes(scene.state) ||
        scene.finalPresentationState !== expectedPresentation
      )
        return invariant(`/contentHistory/${receiptType}/${index}`, 'invalidReference');
    }
  }
  for (const [id, scene] of Object.entries(state.narrative.scenesById)) {
    const hasClosing = closing.has(id);
    const hasRecap = state.contentHistory.recordedSceneRecapIds.includes(id);
    if (
      (scene.finalPresentationState === 'closingPlayed' && !hasClosing) ||
      (scene.finalPresentationState === 'recapShown' && !hasRecap) ||
      (scene.finalPresentationState === null && (hasClosing || hasRecap))
    )
      return invariant(`/narrative/scenesById/${id}/finalPresentationState`, 'invariantViolation');
  }
  const routeIssue = checkExactKeys(
    state.narrative.routesById,
    ['aldercroft', 'morrow'],
    '/narrative/routesById',
  );
  if (routeIssue !== null) return routeIssue;
  for (const [id, route] of Object.entries(state.narrative.routesById)) {
    const evaluation = route.evaluation;
    if (route.evaluated !== (evaluation !== null))
      return invariant(`/narrative/routesById/${id}/evaluated`, 'invariantViolation');
    if ((route.state === 'closed') !== (route.closureReason !== null))
      return invariant(`/narrative/routesById/${id}/closureReason`, 'invariantViolation');
    if (
      (id === 'aldercroft' &&
        route.closureReason !== null &&
        !['failedEvaluation', 'publicWithdrawal'].includes(route.closureReason)) ||
      (id === 'morrow' &&
        route.closureReason !== null &&
        ![
          'failedEvaluation',
          'publicWithdrawal',
          'messageExpired',
          'fabricationConfession',
          'playerDeclined',
        ].includes(route.closureReason))
    )
      return invariant(`/narrative/routesById/${id}/closureReason`, 'invariantViolation');
    if (evaluation !== null) {
      const atEvaluationRevision = state.metadata.stateRevision === evaluation.evaluationRevision;
      if (
        evaluation.routeId !== id ||
        evaluation.evaluationRevision > state.metadata.stateRevision ||
        evaluation.evaluationPeriod > state.calendar.periodIndex
      )
        return invariant(`/narrative/routesById/${id}/evaluation`, 'invariantViolation');
      if (atEvaluationRevision && evaluation.evaluationPeriod !== state.calendar.periodIndex)
        return invariant(
          `/narrative/routesById/${id}/evaluation/evaluationPeriod`,
          'invariantViolation',
        );
      const prerequisites =
        evaluation.routeId === 'aldercroft'
          ? [
              evaluation.researchPlanOnTime,
              evaluation.evidenceAtLeastSix,
              evaluation.elenaConfidenceOrTrust,
              evaluation.noBlockingConcern,
              evaluation.publicRecordNotWithdrawn,
            ]
          : [
              evaluation.camilaReplySent,
              evaluation.morrowVideoCompleted,
              evaluation.publicPreprintAvailable,
              evaluation.threeAnalysedRecords,
              evaluation.honestLimitationPresent,
              evaluation.camilaTrustAtLeast41,
              evaluation.noFabricationConfession,
              evaluation.noBlockingConflict,
            ];
      if (evaluation.eligible !== prerequisites.every(Boolean))
        return invariant(`/narrative/routesById/${id}/evaluation/eligible`, 'invariantViolation');
      if (
        evaluation.routeId === 'aldercroft' &&
        evaluation.researchPlanOnTime !==
          (careerProgress.researchPlanCompletedPeriod !== null &&
            careerProgress.researchPlanCompletedPeriod <= 43)
      )
        return invariant(
          `/narrative/routesById/${id}/evaluation/researchPlanOnTime`,
          'invariantViolation',
        );
      if (
        evaluation.routeId === 'aldercroft' &&
        evaluation.evidenceAtLeastSix !==
          numericValueAtRevision(
            3,
            state.campaignValues.histories.evidence,
            evaluation.evaluationRevision,
          ) >=
            6
      )
        return invariant(
          `/narrative/routesById/${id}/evaluation/evidenceAtLeastSix`,
          'invariantViolation',
        );
      if (evaluation.routeId === 'aldercroft') {
        const elenaConfidence = numericValueAtRevision(
          45,
          state.campaignValues.histories.elenaPaperConfidence,
          evaluation.evaluationRevision,
        );
        const elenaTrust = numericValueAtRevision(
          60,
          state.relationships.byId['MR-CHR-ELENA']!.history,
          evaluation.evaluationRevision,
        );
        if (evaluation.elenaConfidenceOrTrust !== (elenaConfidence >= 50 || elenaTrust >= 41))
          return invariant(
            `/narrative/routesById/${id}/evaluation/elenaConfidenceOrTrust`,
            'invariantViolation',
          );
        if (
          atEvaluationRevision &&
          evaluation.noBlockingConcern !== !hasBlockingConcern(state, 'aldercroft')
        )
          return invariant(
            `/narrative/routesById/${id}/evaluation/noBlockingConcern`,
            'invariantViolation',
          );
      }
      if (
        evaluation.routeId === 'aldercroft' &&
        ((atEvaluationRevision &&
          evaluation.publicRecordNotWithdrawn !==
            (state.manuscript.preprintState !== 'withdrawn')) ||
          (!atEvaluationRevision &&
            !evaluation.publicRecordNotWithdrawn &&
            state.manuscript.preprintState !== 'withdrawn'))
      )
        return invariant(
          `/narrative/routesById/${id}/evaluation/publicRecordNotWithdrawn`,
          'invariantViolation',
        );
      if (evaluation.routeId === 'morrow') {
        if (
          evaluation.camilaReplySent !== careerProgress.camilaReplySent &&
          (atEvaluationRevision || evaluation.camilaReplySent)
        )
          return invariant(
            `/narrative/routesById/${id}/evaluation/camilaReplySent`,
            'invariantViolation',
          );
        if (
          evaluation.morrowVideoCompleted !== careerProgress.morrowVideoCompleted &&
          (atEvaluationRevision || evaluation.morrowVideoCompleted)
        )
          return invariant(
            `/narrative/routesById/${id}/evaluation/morrowVideoCompleted`,
            'invariantViolation',
          );
        const analysedRecords = Object.values(state.experiments.runsById).filter(
          (run) => run.stage === 'analysed',
        ).length;
        const threeAnalysedRecords = analysedRecords >= 3;
        if (
          evaluation.threeAnalysedRecords !== threeAnalysedRecords &&
          (atEvaluationRevision || evaluation.threeAnalysedRecords)
        )
          return invariant(
            `/narrative/routesById/${id}/evaluation/threeAnalysedRecords`,
            'invariantViolation',
          );
        const publicPreprintBeforeEvaluation =
          state.manuscript.piimMilestones.publicPreprintRevision !== null &&
          state.manuscript.piimMilestones.publicPreprintRevision < evaluation.evaluationRevision;
        const publicPreprintAvailable =
          publicPreprintBeforeEvaluation && state.manuscript.preprintState === 'public';
        if (
          (atEvaluationRevision &&
            evaluation.publicPreprintAvailable !== publicPreprintAvailable) ||
          (!atEvaluationRevision &&
            evaluation.publicPreprintAvailable &&
            !publicPreprintBeforeEvaluation)
        )
          return invariant(
            `/narrative/routesById/${id}/evaluation/publicPreprintAvailable`,
            'invariantViolation',
          );
        if (atEvaluationRevision) {
          const checkpointSnapshot = snapshotAtRevision(state, evaluation.evaluationRevision);
          const honestLimitationPresent =
            checkpointSnapshot !== undefined &&
            checkpointSnapshot.board.caveat !== null &&
            checkpointSnapshot.requirementResults.caveat === 'met' &&
            checkpointSnapshot.board.figures.some((evidenceId) => {
              if (evidenceId === null) return false;
              const card = state.experiments.evidenceCardsById[evidenceId];
              return (
                card?.selectedCaveatId === checkpointSnapshot.board.caveat &&
                (state.manuscript.reportedReadingsByEvidenceId[evidenceId] ??
                  card.reportedReadingStatus) === 'honest'
              );
            });
          if (evaluation.honestLimitationPresent !== honestLimitationPresent)
            return invariant(
              `/narrative/routesById/${id}/evaluation/honestLimitationPresent`,
              'invariantViolation',
            );
        }
        const camilaTrust = numericValueAtRevision(
          40,
          state.relationships.byId['MR-CHR-CAMILA']!.history,
          evaluation.evaluationRevision,
        );
        if (evaluation.camilaTrustAtLeast41 !== camilaTrust >= 41)
          return invariant(
            `/narrative/routesById/${id}/evaluation/camilaTrustAtLeast41`,
            'invariantViolation',
          );
        const noFabricationConfession = !careerProgress.fabricationConfessedToCamila;
        if (
          (atEvaluationRevision &&
            evaluation.noFabricationConfession !== noFabricationConfession) ||
          (!atEvaluationRevision && !evaluation.noFabricationConfession && noFabricationConfession)
        )
          return invariant(
            `/narrative/routesById/${id}/evaluation/noFabricationConfession`,
            'invariantViolation',
          );
        if (
          atEvaluationRevision &&
          evaluation.noBlockingConflict !== !hasBlockingConcern(state, 'morrow')
        )
          return invariant(
            `/narrative/routesById/${id}/evaluation/noBlockingConflict`,
            'invariantViolation',
          );
      }
      if (!evaluation.eligible) {
        if (route.state !== 'closed' || route.closureReason !== 'failedEvaluation')
          return invariant(`/narrative/routesById/${id}/state`, 'invariantViolation');
      } else if (!['available', 'chosen', 'declined', 'closed'].includes(route.state)) {
        return invariant(`/narrative/routesById/${id}/state`, 'invariantViolation');
      }
    } else if (['available', 'chosen', 'declined'].includes(route.state)) {
      return invariant(`/narrative/routesById/${id}/evaluation`, 'invariantViolation');
    }
    if (route.closureReason === 'failedEvaluation' && (evaluation === null || evaluation.eligible))
      return invariant(`/narrative/routesById/${id}/closureReason`, 'invariantViolation');
    if (
      route.closureReason === 'publicWithdrawal' &&
      state.manuscript.preprintState !== 'withdrawn'
    )
      return invariant(`/narrative/routesById/${id}/closureReason`, 'invariantViolation');
    if (route.closureReason === 'messageExpired' && state.narrative.careerProgress.camilaReplySent)
      return invariant(`/narrative/routesById/${id}/closureReason`, 'invariantViolation');
    if (
      route.closureReason === 'fabricationConfession' &&
      !state.narrative.careerProgress.fabricationConfessedToCamila
    )
      return invariant(`/narrative/routesById/${id}/closureReason`, 'invariantViolation');
    if (route.closureReason === 'playerDeclined' && (evaluation === null || !evaluation.eligible))
      return invariant(`/narrative/routesById/${id}/closureReason`, 'invariantViolation');
  }
  if (
    state.narrative.careerProgress.fabricationConfessedToCamila &&
    state.narrative.routesById.morrow?.state !== 'closed'
  )
    return invariant('/narrative/routesById/morrow/state', 'invariantViolation');
  if (
    ['available', 'chosen', 'declined'].includes(state.narrative.routesById.aldercroft!.state) &&
    state.calendar.periodIndex < 48
  )
    return invariant('/narrative/routesById/aldercroft/state', 'invariantViolation');
  if (
    ['available', 'chosen', 'declined'].includes(state.narrative.routesById.morrow!.state) &&
    state.calendar.periodIndex < 56
  )
    return invariant('/narrative/routesById/morrow/state', 'invariantViolation');
  const chosenRoutes = Object.values(state.narrative.routesById).filter(
    (route) => route.state === 'chosen',
  );
  if (chosenRoutes.length > 1) return invariant('/narrative/routesById', 'invariantViolation');
  if (
    chosenRoutes.length === 1 &&
    Object.values(state.narrative.routesById).some((route) => route.state === 'available')
  )
    return invariant('/narrative/routesById', 'invariantViolation');
  if (
    state.manuscript.preprintState === 'withdrawn' &&
    Object.values(state.narrative.routesById).some((route) => route.state !== 'closed')
  )
    return invariant('/narrative/routesById', 'invariantViolation');
  const placementIssue = checkExactKeys(
    state.world.characterPlacementsById,
    ['MR-CHR-ELENA', 'MR-CHR-HAORAN', 'MR-CHR-SAMIRA', 'MR-CHR-GABRIEL'],
    '/world/characterPlacementsById',
  );
  if (placementIssue !== null) return placementIssue;
  const roomIssue = checkExactKeys(
    state.world.roomStatesById,
    ['MR-ROOM-FACILITY-QUEUE', 'MR-ROOM-IMAGING-BOOKING', 'MR-ROOM-IMAGING-SERVICE-LIMIT'],
    '/world/roomStatesById',
  );
  if (roomIssue !== null) return roomIssue;
  if (
    !state.world.safeAnchorId.startsWith('MR-ANCHOR-') ||
    Object.values(state.world.characterPlacementsById).some(
      (placement) => placement.anchorId !== null && !placement.anchorId.startsWith('MR-ANCHOR-'),
    )
  )
    return invariant('/world/safeAnchorId', 'invalidReference');
  if (state.metadata.stateRevision === 0) {
    const hasSparseFact =
      Object.keys(state.experiments.equipmentById).length > 0 ||
      Object.keys(state.experiments.preparationById).length > 0 ||
      Object.keys(state.experiments.runsById).length > 0 ||
      state.experiments.activeRunIds.length > 0 ||
      Object.keys(state.experiments.rawRecordsById).length > 0 ||
      Object.keys(state.experiments.evidenceCardsById).length > 0 ||
      Object.keys(state.experiments.stopLogsById).length > 0 ||
      Object.keys(state.manuscript.revisionTasksById).length > 0 ||
      Object.keys(state.narrative.messagesById).length > 0 ||
      Object.keys(state.narrative.requestsById).length > 0 ||
      Object.keys(state.narrative.concernsById).length > 0;
    if (hasSparseFact) return invariant('/metadata/stateRevision', 'invariantViolation');
    if (
      state.calendar.periodIndex !== 0 ||
      state.calendar.pendingCrash ||
      state.calendar.crashPeriods.length > 0
    )
      return invariant('/calendar', 'invariantViolation');
    if (
      state.manuscript.snapshotOrder.length > 0 ||
      state.manuscript.currentSnapshotId !== null ||
      Object.keys(state.manuscript.snapshotsById).length > 0 ||
      Object.values(state.manuscript.reviewerReportsById).some((report) => report.form !== null) ||
      state.manuscript.preprintState !== 'notPosted' ||
      state.manuscript.journalState !== 'notSubmitted' ||
      state.manuscript.finalPaperState !== null ||
      Object.values(state.manuscript.piimCards).some((card) => card !== null) ||
      Object.values(state.manuscript.piimCardSources).some((source) => source !== null) ||
      Object.values(state.manuscript.piimMilestones).some((revision) => revision !== null) ||
      state.manuscript.piimOutcome !== null ||
      state.manuscript.authorship.haoran !== 'notIncluded' ||
      state.manuscript.authorship.samira !== 'notIncluded' ||
      Object.keys(state.manuscript.reportedReadingsByEvidenceId).length > 0 ||
      state.manuscript.omittedEvidenceIds.length > 0 ||
      state.manuscript.committedEffectIds.length > 0
    )
      return invariant('/manuscript', 'invariantViolation');
    const openingScene = state.narrative.scenesById['MR-SCN-CLARIFIED'];
    const openingEvent = state.narrative.scheduler.eventsById['MR-EVT-CLARIFIED'];
    if (
      Object.keys(state.narrative.scenesById).length !== 1 ||
      openingScene?.state !== 'queued' ||
      openingScene?.authoredFormId !== null ||
      openingScene?.finalPresentationState !== null ||
      state.narrative.routesById.aldercroft?.state !== 'locked' ||
      state.narrative.routesById.aldercroft?.evaluated !== false ||
      state.narrative.routesById.aldercroft?.evaluation !== null ||
      state.narrative.routesById.aldercroft?.closureReason !== null ||
      state.narrative.routesById.morrow?.state !== 'locked' ||
      state.narrative.routesById.morrow?.evaluated !== false ||
      state.narrative.routesById.morrow?.evaluation !== null ||
      state.narrative.routesById.morrow?.closureReason !== null ||
      state.narrative.careerProgress.researchPlanCompletedPeriod !== null ||
      state.narrative.careerProgress.camilaReplySent ||
      state.narrative.careerProgress.morrowVideoCompleted ||
      state.narrative.careerProgress.fabricationConfessedToCamila ||
      Object.keys(state.narrative.scheduler.eventsById).length !== 1 ||
      openingEvent?.state !== 'queued' ||
      openingEvent?.firstEligiblePeriod !== 0 ||
      openingEvent?.resolvedPeriod !== null ||
      !plainDataEqual(state.narrative.scheduler.queue, ['MR-EVT-CLARIFIED']) ||
      state.narrative.scheduler.activeEventId !== null ||
      state.narrative.scheduler.lastSchedulerRevision !== 0
    )
      return invariant('/narrative', 'invariantViolation');
    if (
      Object.values(state.relationships.byId).some(
        (relationship) =>
          relationship.permanentBreach ||
          relationship.supportConsumed ||
          relationship.lastConsequentialSceneId !== null ||
          relationship.history.length > 0,
      )
    )
      return invariant('/relationships/byId', 'invariantViolation');
    const initialPlacements = {
      'MR-CHR-ELENA': null,
      'MR-CHR-HAORAN': 'MR-ANCHOR-CHARACTER-HAORAN-TISSUE-CULTURE',
      'MR-CHR-SAMIRA': 'MR-ANCHOR-CHARACTER-SAMIRA-SHARED-DESKS',
      'MR-CHR-GABRIEL': 'MR-ANCHOR-CHARACTER-GABRIEL-FACILITY',
    } as const;
    if (
      state.world.floorAct !== 'orderlyButOverbooked' ||
      state.world.safeAnchorId !== 'MR-ANCHOR-REC-SHARED-DESKS' ||
      Object.entries(initialPlacements).some(
        ([id, anchorId]) => state.world.characterPlacementsById[id]?.anchorId !== anchorId,
      ) ||
      Object.values(state.world.roomStatesById).some((room) => room.condition !== 'inactive') ||
      state.world.persistentEnvironmentIds.length > 0
    )
      return invariant('/world', 'invariantViolation');
    if (
      Object.keys(state.contentHistory.selectedVariantsById).length > 0 ||
      state.contentHistory.completedContentIds.length > 0 ||
      state.contentHistory.expiredContentIds.length > 0 ||
      state.contentHistory.readMessageIds.length > 0 ||
      state.contentHistory.consumedContextualContentIds.length > 0 ||
      state.contentHistory.displayedEnvironmentalTextIds.length > 0 ||
      state.contentHistory.recordedSceneClosingIds.length > 0 ||
      state.contentHistory.recordedSceneRecapIds.length > 0 ||
      state.contentHistory.citationIds.length > 0 ||
      state.conclusion.state !== 'unresolved' ||
      state.conclusion.finalChoiceId !== null ||
      state.conclusion.endingModuleIds !== null
    )
      return invariant('/contentHistory', 'invariantViolation');
  }
  const rank = {
    unresolved: 0,
    choicePending: 1,
    confirmed: 2,
    epilogueInProgress: 3,
    completed: 4,
  } as const;
  const finalChoiceIds = ['aldercroft', 'morrow', 'leave', 'neither'] as const;
  const endingModuleIds = state.conclusion.endingModuleIds;
  const careerModuleByChoice = {
    aldercroft: 'MR-END-CAREER-ACADEMIA',
    morrow: 'MR-END-CAREER-MORROW',
    leave: 'MR-END-CAREER-LEAVE',
    neither: 'MR-END-CAREER-NONE',
  } as const;
  const paperModuleByState = {
    published: 'MR-END-PAPER-PUBLISHED',
    acceptedPendingFinalWork: 'MR-END-PAPER-ACCEPTED',
    underReview: 'MR-END-PAPER-REVIEW',
    rejectedOrWithdrawn: 'MR-END-PAPER-REJECTED',
  } as const;
  const endingModuleFamilies = [
    new Set([
      'MR-END-CAREER-ACADEMIA',
      'MR-END-CAREER-MORROW',
      'MR-END-CAREER-LEAVE',
      'MR-END-CAREER-NONE',
    ]),
    new Set([
      'MR-END-PAPER-PUBLISHED',
      'MR-END-PAPER-ACCEPTED',
      'MR-END-PAPER-REVIEW',
      'MR-END-PAPER-REJECTED',
    ]),
    new Set([
      'MR-END-INTEGRITY-DEFENSIBLE',
      'MR-END-INTEGRITY-COMPROMISED',
      'MR-END-INTEGRITY-UNDISCOVERED',
      'MR-END-INTEGRITY-VISIBLE',
    ]),
    new Set(['MR-END-FATIGUE-CLEAR', 'MR-END-FATIGUE-EXHAUSTED']),
    new Set([
      'MR-END-REL-ELENA-SUPPORT',
      'MR-END-REL-ELENA-AMBIGUOUS',
      'MR-END-REL-ELENA-DISTANCE',
      'MR-END-REL-HAORAN-SUPPORT',
      'MR-END-REL-HAORAN-AMBIGUOUS',
      'MR-END-REL-HAORAN-DISTANCE',
      'MR-END-REL-SAMIRA-SUPPORT',
      'MR-END-REL-SAMIRA-AMBIGUOUS',
      'MR-END-REL-SAMIRA-DISTANCE',
      'MR-END-REL-GABRIEL-SUPPORT',
      'MR-END-REL-GABRIEL-AMBIGUOUS',
      'MR-END-REL-GABRIEL-DISTANCE',
      'MR-END-REL-CAMILA-SUPPORT',
      'MR-END-REL-CAMILA-AMBIGUOUS',
      'MR-END-REL-CAMILA-DISTANCE',
    ]),
  ] as const;
  if (state.conclusion.state !== 'unresolved' && state.calendar.periodIndex !== 63)
    return invariant('/conclusion/state', 'invariantViolation');
  if (state.conclusion.state !== 'unresolved' && state.manuscript.finalPaperState === null)
    return invariant('/conclusion/state', 'invariantViolation');
  if (
    (rank[state.conclusion.state] < 2 && state.conclusion.finalChoiceId !== null) ||
    (rank[state.conclusion.state] >= 2 && state.conclusion.finalChoiceId === null)
  )
    return invariant('/conclusion/finalChoiceId', 'invariantViolation');
  if (
    (rank[state.conclusion.state] < 3 && state.conclusion.endingModuleIds !== null) ||
    (rank[state.conclusion.state] >= 3 && state.conclusion.endingModuleIds === null)
  )
    return invariant('/conclusion/endingModuleIds', 'invariantViolation');
  if (
    endingModuleIds !== null &&
    endingModuleIds.some((id, index) => !endingModuleFamilies[index]!.has(id))
  )
    return invariant('/conclusion/endingModuleIds', 'invalidReference');
  const finalScene = state.narrative.scenesById['MR-SCN-0642'];
  if (state.conclusion.state === 'unresolved' && finalScene !== undefined)
    return invariant('/conclusion/state', 'invariantViolation');
  if (
    state.conclusion.state === 'choicePending' &&
    (finalScene === undefined || !['eligible', 'queued', 'inProgress'].includes(finalScene.state))
  )
    return invariant('/conclusion/state', 'invalidReference');
  if (
    rank[state.conclusion.state] >= 2 &&
    (finalScene === undefined || !['completed', 'skipped'].includes(finalScene.state))
  )
    return invariant('/conclusion/state', 'invariantViolation');
  if (
    rank[state.conclusion.state] >= 3 &&
    (finalScene?.finalPresentationState === null ||
      finalScene?.finalPresentationState === undefined)
  )
    return invariant('/conclusion/state', 'invariantViolation');
  const finalChoiceId = state.conclusion.finalChoiceId;
  if (
    finalChoiceId !== null &&
    !finalChoiceIds.includes(finalChoiceId as (typeof finalChoiceIds)[number])
  )
    return invariant('/conclusion/finalChoiceId', 'invalidReference');
  const aldercroftState = state.narrative.routesById.aldercroft?.state;
  const morrowState = state.narrative.routesById.morrow?.state;
  if (
    state.conclusion.state === 'choicePending' &&
    [aldercroftState, morrowState].some((routeState) =>
      routeState === undefined ? true : !['available', 'closed'].includes(routeState),
    )
  )
    return invariant('/narrative/routesById', 'invariantViolation');
  if (
    rank[state.conclusion.state] < 2 &&
    (chosenRoutes.length !== 0 || [aldercroftState, morrowState].includes('declined'))
  )
    return invariant('/narrative/routesById', 'invariantViolation');
  if (rank[state.conclusion.state] >= 2) {
    if ([aldercroftState, morrowState].includes('available'))
      return invariant('/narrative/routesById', 'invariantViolation');
    if (
      (finalChoiceId === 'aldercroft' &&
        (aldercroftState !== 'chosen' || !['declined', 'closed'].includes(morrowState ?? ''))) ||
      (finalChoiceId === 'morrow' &&
        (morrowState !== 'chosen' || !['declined', 'closed'].includes(aldercroftState ?? ''))) ||
      (finalChoiceId === 'leave' &&
        (chosenRoutes.length !== 0 ||
          ![aldercroftState, morrowState].includes('declined') ||
          [aldercroftState, morrowState].some(
            (routeState) => routeState !== 'declined' && routeState !== 'closed',
          ))) ||
      (finalChoiceId === 'neither' && (aldercroftState !== 'closed' || morrowState !== 'closed'))
    )
      return invariant('/conclusion/finalChoiceId', 'invariantViolation');
  }
  if (endingModuleIds !== null) {
    if (
      finalChoiceId === null ||
      endingModuleIds[0] !==
        careerModuleByChoice[finalChoiceId as keyof typeof careerModuleByChoice] ||
      state.manuscript.finalPaperState === null ||
      endingModuleIds[1] !== paperModuleByState[state.manuscript.finalPaperState]
    )
      return invariant('/conclusion/endingModuleIds', 'invariantViolation');
    const fatigueModuleId =
      state.calendar.crashPeriods.length === 0 && state.campaignValues.energy > 1
        ? 'MR-END-FATIGUE-CLEAR'
        : 'MR-END-FATIGUE-EXHAUSTED';
    if (endingModuleIds[3] !== fatigueModuleId)
      return invariant('/conclusion/endingModuleIds/3', 'invariantViolation');
    const hasSeriousIntegrityFailure =
      Object.values(state.manuscript.reportedReadingsByEvidenceId).some((status) =>
        ['altered', 'unsupported'].includes(status),
      ) ||
      Object.values(state.experiments.evidenceCardsById).some((card) =>
        ['altered', 'unsupported'].includes(card.reportedReadingStatus),
      ) ||
      state.campaignValues.histories.integrity.some((change) =>
        ['alteredReading', 'unsupportedReading'].includes(change.integrityEventType ?? ''),
      );
    const hasVisibleIntegrityConcern = Object.values(state.narrative.concernsById).some(
      (concern) => concern.visible,
    );
    const integrityModuleId = hasSeriousIntegrityFailure
      ? hasVisibleIntegrityConcern
        ? 'MR-END-INTEGRITY-VISIBLE'
        : 'MR-END-INTEGRITY-UNDISCOVERED'
      : state.manuscript.omittedEvidenceIds.length > 0
        ? 'MR-END-INTEGRITY-COMPROMISED'
        : 'MR-END-INTEGRITY-DEFENSIBLE';
    if (endingModuleIds[2] !== integrityModuleId)
      return invariant('/conclusion/endingModuleIds/2', 'invariantViolation');
    const relationshipPriority = [
      'MR-CHR-ELENA',
      'MR-CHR-HAORAN',
      'MR-CHR-SAMIRA',
      'MR-CHR-GABRIEL',
      'MR-CHR-CAMILA',
    ] as const;
    const startingTrust = {
      'MR-CHR-ELENA': 60,
      'MR-CHR-HAORAN': 60,
      'MR-CHR-SAMIRA': 40,
      'MR-CHR-GABRIEL': 60,
      'MR-CHR-CAMILA': 40,
    } as const;
    const selectedRelationshipId = [...relationshipPriority].sort((left, right) => {
      const leftRelationship = state.relationships.byId[left]!;
      const rightRelationship = state.relationships.byId[right]!;
      if (leftRelationship.permanentBreach !== rightRelationship.permanentBreach)
        return leftRelationship.permanentBreach ? -1 : 1;
      const trustDifference =
        Math.abs(rightRelationship.trust - startingTrust[right]) -
        Math.abs(leftRelationship.trust - startingTrust[left]);
      if (trustDifference !== 0) return trustDifference;
      const resolvedPeriod = (id: string | null): number =>
        id === null ? -1 : (state.narrative.scheduler.eventsById[id]?.resolvedPeriod ?? -1);
      const sceneDifference =
        resolvedPeriod(rightRelationship.lastConsequentialSceneId) -
        resolvedPeriod(leftRelationship.lastConsequentialSceneId);
      if (sceneDifference !== 0) return sceneDifference;
      return relationshipPriority.indexOf(left) - relationshipPriority.indexOf(right);
    })[0]!;
    const selectedRelationship = state.relationships.byId[selectedRelationshipId]!;
    const relationshipBand =
      selectedRelationship.permanentBreach || selectedRelationship.trust <= 20
        ? 'DISTANCE'
        : selectedRelationship.trust >= 61
          ? 'SUPPORT'
          : 'AMBIGUOUS';
    const relationshipName = selectedRelationshipId.replace('MR-CHR-', '');
    const relationshipModuleId = `MR-END-REL-${relationshipName}-${relationshipBand}`;
    if (endingModuleIds[4] !== relationshipModuleId)
      return invariant('/conclusion/endingModuleIds/4', 'invariantViolation');
  }
  return null;
};

interface ObjectGraphIssue {
  path: string;
  reason: 'forbiddenPresentationField' | 'wrongType';
}

const inspectObjectGraph = (
  value: unknown,
  path = '',
  active = new WeakSet<object>(),
): ObjectGraphIssue | null => {
  if (value === null || typeof value !== 'object') return null;
  if (active.has(value)) return { path: path || '/', reason: 'wrongType' };
  active.add(value);
  const forbidden =
    /^(?:camera|pointerLock|openPanel|focusedPanel|animationProgress|visualFrame|audioPlayback)$/u;
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      const result = inspectObjectGraph(item, `${path}/${index}`, active);
      if (result !== null) return result;
    }
    active.delete(value);
    return null;
  }
  const prototype = Object.getPrototypeOf(value) as object | null;
  if (prototype !== Object.prototype && prototype !== null)
    return { path: path || '/', reason: 'wrongType' };
  for (const [key, item] of Object.entries(value)) {
    const next = `${path}/${key}`;
    if (forbidden.test(key)) return { path: next, reason: 'forbiddenPresentationField' };
    const result = inspectObjectGraph(item, next, active);
    if (result !== null) return result;
  }
  active.delete(value);
  return null;
};

export const decodeCampaignCreationInput = (
  value: unknown,
): CheckedResult<CampaignCreationInput> => {
  const result = inputSchema.safeParse(value);
  if (!result.success)
    return { kind: 'failure', issue: reasonFromZodIssue(result.error.issues[0]!, value) };
  return { kind: 'success', value: result.data };
};

export const decodeCampaignState = (value: unknown): CheckedResult<CampaignState> => {
  const graphIssue = inspectObjectGraph(value);
  if (graphIssue !== null)
    return {
      kind: 'failure',
      issue: graphIssue,
    };
  const result = stateSchema.safeParse(value);
  if (!result.success)
    return { kind: 'failure', issue: reasonFromZodIssue(result.error.issues[0]!, value) };
  const state: CampaignState = result.data;
  const issue = checkInvariants(state);
  return issue ?? { kind: 'success', value: state };
};
