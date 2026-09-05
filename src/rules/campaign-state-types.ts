export type BuildProfileId = 'full' | 'fallback' | 'slice';
export type PressureProfile = 'standard' | 'supported';
export type PronounSet = 'sheHer' | 'heHim' | 'theyThem';
export type RecurringCharacterId =
  'MR-CHR-ELENA' | 'MR-CHR-HAORAN' | 'MR-CHR-SAMIRA' | 'MR-CHR-GABRIEL' | 'MR-CHR-CAMILA';
export type PreparationBand = 'robust' | 'mixed' | 'compromised';

export interface CampaignCreationInput {
  campaignId: string;
  campaignSeed: number;
  contentVersion: string;
  buildProfileId: BuildProfileId;
  pressureProfile: PressureProfile;
  protagonist: { name: string; pronounSet: PronounSet };
}

export type StoredScalar = string | number | boolean | null;
export type ChangeSourceType =
  'playerAction' | 'scheduledEvent' | 'sceneOutcome' | 'systemTransition';
export type IntegrityEventType =
  | 'omittedEvidence'
  | 'alteredReading'
  | 'unsupportedReading'
  | 'restoredEvidence'
  | 'correctedDraft';

export interface ChangeRecord {
  id: string;
  stateRevision: number;
  sequence: number;
  sourceType: ChangeSourceType;
  sourceId: string;
  fieldPath: string;
  previousValue: StoredScalar;
  newValue: StoredScalar;
  integrityEventType: IntegrityEventType | null;
}

export interface CampaignMetadata {
  schemaVersion: 1;
  contentVersion: string;
  campaignId: string;
  campaignSeed: number;
  stateRevision: number;
  buildProfileId: BuildProfileId;
  pressureProfile: PressureProfile;
}

export interface CampaignCalendar {
  periodIndex: number;
  pendingCrash: boolean;
  crashPeriods: number[];
}

export interface CampaignValues {
  energy: number;
  evidence: number;
  elenaPaperConfidence: number;
  integrity: number;
  integrityRecoveryUsed: number;
  histories: {
    energy: ChangeRecord[];
    evidence: ChangeRecord[];
    elenaPaperConfidence: ChangeRecord[];
    integrity: ChangeRecord[];
    integrityRecoveryUsed: ChangeRecord[];
  };
}

export interface EquipmentState {
  id: string;
  condition: 'ready' | 'limited' | 'unavailable';
  history: ChangeRecord[];
}

export interface PreparationState {
  id: string;
  band: PreparationBand;
  history: ChangeRecord[];
}

export interface MonitoringRecord {
  windowIndex: number;
  response: 'continue' | 'qualityCheck' | 'stabilize' | 'stop';
  completedPeriod: number;
}

export interface ExperimentRun {
  id: string;
  templateId: string;
  runNumber: 1 | 2;
  stage: 'configured' | 'running' | 'readyForAnalysis' | 'analysed' | 'stopped';
  goalId: string;
  controlId: string;
  observationId: string;
  familyChoiceId: string;
  sampleCondition: 'stable' | 'stressed' | 'failing';
  equipmentId: string;
  equipmentState: 'ready' | 'limited' | 'unavailable';
  attentionState: 'normal' | 'checkReady' | 'attentionNeeded';
  issueCount: number;
  severeIssue: boolean;
  projectedResultBand: PreparationBand | null;
  finalResultBand: PreparationBand | null;
  variationNamespace: 'experimentVariation' | null;
  variationTargetId: string | null;
  variationDrawIndex: 0 | null;
  variationBucket: number | null;
  monitoringResponses: MonitoringRecord[];
}

export interface RawRecord {
  id: string;
  runId: string;
  biologicalResultId: string;
  finalPreparationBand: PreparationBand;
  structureResultId: string;
  rhythmResultId: string;
  repatterningResultId: string;
  controlResultId: string;
  observationCoverage: 'full' | 'limited';
  monitoringResultId: string;
  fatigueAffected: boolean;
  internalMismatch: boolean;
}

export interface EvidenceCard {
  id: string;
  runId: string | null;
  rawRecordId: string | null;
  sourceId: string;
  quality: 'usable' | 'worthRepeating' | 'inconclusive' | 'suspicious';
  selectedReadingId: string;
  selectedCaveatId: string;
  reportedReadingStatus: 'honest' | 'altered' | 'unsupported';
  awardedSupport: number;
  piimRole: 'batch' | 'oxygen' | 'none';
}

export interface StopLog {
  id: string;
  runId: string;
  stoppedPeriod: number;
  reasonId: string;
}

export interface ExperimentsState {
  equipmentById: Record<string, EquipmentState>;
  preparationById: Record<string, PreparationState>;
  runsById: Record<string, ExperimentRun>;
  activeRunIds: string[];
  rawRecordsById: Record<string, RawRecord>;
  evidenceCardsById: Record<string, EvidenceCard>;
  stopLogsById: Record<string, StopLog>;
}

export interface ManuscriptBoard {
  claim: string | null;
  claimLevel: 'careful' | 'strong' | 'inflated' | null;
  figures: [string | null, string | null, string | null];
  controls: [string | null, string | null];
  caveat: string | null;
  authorship: string | null;
  supplementary: string | null;
  activeRequest: string | null;
}

export type ManuscriptRequirementKey =
  | 'supportedFigure'
  | 'relevantControl'
  | 'distinctExperimentFigures'
  | 'structureCoverage'
  | 'rhythmCoverage'
  | 'matchedControl'
  | 'caveat'
  | 'causalSupport';
export type ManuscriptRequirementResult = 'met' | 'missing' | 'conflict' | 'unsupported' | null;
export type ManuscriptRequirementResults = Record<
  ManuscriptRequirementKey,
  ManuscriptRequirementResult
>;

export interface ManuscriptSnapshot {
  id: string;
  stateRevision: number;
  board: ManuscriptBoard;
  requirementResults: ManuscriptRequirementResults;
  statedMissingRequirement: ManuscriptRequirementKey | null;
}

export interface RevisionTask {
  id: string;
  state: 'locked' | 'available' | 'committed' | 'expired';
}

export interface ReviewerReport {
  id: string;
  form: 'base' | 'conditional' | null;
}

export interface PiimOutcome {
  responseBand: 'top' | 'middle' | 'weak';
  namespace: 'piimOutcome';
  targetId: string;
  drawIndex: 0;
  bucket: number;
  result: 'published' | 'acceptedPendingFinalWork' | 'underReview' | 'rejected';
}

export interface ManuscriptState {
  board: ManuscriptBoard;
  snapshotsById: Record<string, ManuscriptSnapshot>;
  snapshotOrder: string[];
  currentSnapshotId: string | null;
  revisionTasksById: Record<string, RevisionTask>;
  reviewerReportsById: Record<string, ReviewerReport>;
  preprintState: 'notPosted' | 'public' | 'withdrawn';
  journalState: 'notSubmitted' | 'submitted' | 'majorRevision' | 'withdrawn' | 'resolved';
  finalPaperState:
    'published' | 'acceptedPendingFinalWork' | 'underReview' | 'rejectedOrWithdrawn' | null;
  piimCards: {
    batch: 'met' | 'partlyMet' | 'notMet' | null;
    oxygen: 'met' | 'partlyMet' | 'notMet' | null;
    claim: 'met' | 'partlyMet' | 'notMet' | null;
  };
  piimCardSources: {
    batchEvidenceCardId: string | null;
    oxygenEvidenceCardId: string | null;
    claimSnapshotId: string | null;
  };
  piimMilestones: {
    publicPreprintRevision: number | null;
    journalChainRevision: number | null;
    reviewerReportsRevision: number | null;
    piimCardsRevision: number | null;
    piimOutcomeRevision: number | null;
  };
  piimOutcome: PiimOutcome | null;
  authorship: {
    haoran: 'notIncluded' | 'credited' | 'declined';
    samira: 'notIncluded' | 'credited' | 'declined';
  };
  reportedReadingsByEvidenceId: Record<string, 'honest' | 'altered' | 'unsupported'>;
  omittedEvidenceIds: string[];
  committedEffectIds: string[];
}

export interface Protagonist {
  name: string;
  pronounSet: PronounSet;
}

export interface SceneState {
  id: string;
  state: 'locked' | 'eligible' | 'queued' | 'inProgress' | 'completed' | 'skipped';
  authoredFormId: string | null;
  finalPresentationState: 'closingPlayed' | 'recapShown' | null;
}

export interface MessageState {
  id: string;
  state: 'locked' | 'available' | 'read' | 'replied' | 'expired';
  replyId: string | null;
}

export interface RequestState {
  id: string;
  state: 'locked' | 'available' | 'completed' | 'expired';
  responseId: string | null;
}

export type ConcernResponse = 'correct' | 'deny' | 'defer' | 'ignoreReminder';
export interface ConcernState {
  id: string;
  sourceId: string;
  visible: boolean;
  currentResponse: ConcernResponse | null;
  responseHistory: ConcernResponse[];
  routeImpact: 'none' | 'aldercroft' | 'morrow' | 'both';
}

export interface AldercroftEvaluation {
  routeId: 'aldercroft';
  evaluationRevision: number;
  evaluationPeriod: number;
  researchPlanOnTime: boolean;
  evidenceAtLeastSix: boolean;
  elenaConfidenceOrTrust: boolean;
  noBlockingConcern: boolean;
  publicRecordNotWithdrawn: boolean;
  eligible: boolean;
}

export interface MorrowEvaluation {
  routeId: 'morrow';
  evaluationRevision: number;
  evaluationPeriod: number;
  camilaReplySent: boolean;
  morrowVideoCompleted: boolean;
  publicPreprintAvailable: boolean;
  threeAnalysedRecords: boolean;
  honestLimitationPresent: boolean;
  camilaTrustAtLeast41: boolean;
  noFabricationConfession: boolean;
  noBlockingConflict: boolean;
  eligible: boolean;
}

export interface RouteState {
  id: string;
  state: 'locked' | 'developing' | 'available' | 'closed' | 'chosen' | 'declined';
  evaluated: boolean;
  evaluation: AldercroftEvaluation | MorrowEvaluation | null;
  closureReason:
    | 'failedEvaluation'
    | 'publicWithdrawal'
    | 'messageExpired'
    | 'fabricationConfession'
    | 'playerDeclined'
    | null;
}

export interface ScheduledEvent {
  id: string;
  state: 'locked' | 'eligible' | 'queued' | 'active' | 'completed' | 'expired';
  firstEligiblePeriod: number | null;
  resolvedPeriod: number | null;
}

export interface NarrativeState {
  protagonist: Protagonist;
  careerProgress: {
    researchPlanCompletedPeriod: number | null;
    camilaReplySent: boolean;
    morrowVideoCompleted: boolean;
    fabricationConfessedToCamila: boolean;
  };
  scenesById: Record<string, SceneState>;
  messagesById: Record<string, MessageState>;
  requestsById: Record<string, RequestState>;
  concernsById: Record<string, ConcernState>;
  routesById: Record<string, RouteState>;
  scheduler: {
    eventsById: Record<string, ScheduledEvent>;
    queue: string[];
    activeEventId: string | null;
    lastSchedulerRevision: number;
  };
}

export interface RelationshipState {
  id: string;
  trust: number;
  introduced: boolean;
  permanentBreach: boolean;
  supportConsumed: boolean;
  lastConsequentialSceneId: string | null;
  history: ChangeRecord[];
}

export interface RelationshipsState {
  byId: Record<string, RelationshipState>;
}

export interface CharacterPlacement {
  id: string;
  anchorId: string | null;
}
export interface RoomState {
  id: string;
  condition: 'inactive' | 'unresolved' | 'resolved';
}

export interface WorldState {
  floorAct:
    | 'orderlyButOverbooked'
    | 'manuscriptClutter'
    | 'rejectionAndPublicRecord'
    | 'reviewPressure'
    | 'decisionHorizon';
  safeAnchorId: string;
  characterPlacementsById: Record<string, CharacterPlacement>;
  roomStatesById: Record<string, RoomState>;
  persistentEnvironmentIds: string[];
}

export interface ContentHistory {
  selectedVariantsById: Record<string, string>;
  completedContentIds: string[];
  expiredContentIds: string[];
  readMessageIds: string[];
  consumedContextualContentIds: string[];
  displayedEnvironmentalTextIds: string[];
  recordedSceneClosingIds: string[];
  recordedSceneRecapIds: string[];
  citationIds: string[];
}

export type ConclusionStateName =
  'unresolved' | 'choicePending' | 'confirmed' | 'epilogueInProgress' | 'completed';
export interface ConclusionState {
  state: ConclusionStateName;
  finalChoiceId: string | null;
  endingModuleIds: [string, string, string, string, string] | null;
}

export interface CampaignState {
  metadata: CampaignMetadata;
  calendar: CampaignCalendar;
  campaignValues: CampaignValues;
  experiments: ExperimentsState;
  manuscript: ManuscriptState;
  narrative: NarrativeState;
  relationships: RelationshipsState;
  world: WorldState;
  contentHistory: ContentHistory;
  conclusion: ConclusionState;
}

export type CampaignValidationReason =
  | 'missingField'
  | 'unknownField'
  | 'wrongType'
  | 'invalidNumber'
  | 'forbiddenPresentationField'
  | 'invalidId'
  | 'duplicateId'
  | 'invalidReference'
  | 'invariantViolation'
  | 'historyRegression';
export interface CampaignValidationIssue {
  path: string;
  reason: CampaignValidationReason;
}
export type CheckedResult<T> =
  { kind: 'success'; value: T } | { kind: 'failure'; issue: CampaignValidationIssue };
