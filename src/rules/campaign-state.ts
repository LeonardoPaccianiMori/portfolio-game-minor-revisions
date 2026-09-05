import { decodeCampaignCreationInput, decodeCampaignState } from './campaign-state-schema';
import type {
  CampaignCreationInput,
  CampaignState,
  CheckedResult,
  RelationshipState,
} from './campaign-state-types';

const relationship = (id: string, trust: number, introduced: boolean): RelationshipState => ({
  id,
  trust,
  introduced,
  permanentBreach: false,
  supportConsumed: false,
  lastConsequentialSceneId: null,
  history: [],
});

const buildInitialState = (input: CampaignCreationInput): CampaignState => ({
  metadata: {
    schemaVersion: 2,
    contentVersion: input.contentVersion,
    campaignId: input.campaignId,
    campaignSeed: input.campaignSeed,
    stateRevision: 0,
    buildProfileId: input.buildProfileId,
    pressureProfile: input.pressureProfile,
  },
  calendar: { periodIndex: 0, pendingCrash: false, crashPeriods: [] },
  campaignValues: {
    energy: input.pressureProfile === 'supported' ? 5 : 4,
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
    protagonist: {
      name: input.protagonist.name.normalize('NFC'),
      pronounSet: input.protagonist.pronounSet,
    },
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
      'MR-CHR-CAMILA': relationship('MR-CHR-CAMILA', 40, false),
      'MR-CHR-ELENA': relationship('MR-CHR-ELENA', 60, true),
      'MR-CHR-GABRIEL': relationship('MR-CHR-GABRIEL', 60, true),
      'MR-CHR-HAORAN': relationship('MR-CHR-HAORAN', 60, true),
      'MR-CHR-SAMIRA': relationship('MR-CHR-SAMIRA', 40, true),
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
      'MR-ROOM-FACILITY-QUEUE': { id: 'MR-ROOM-FACILITY-QUEUE', condition: 'inactive' },
      'MR-ROOM-IMAGING-BOOKING': { id: 'MR-ROOM-IMAGING-BOOKING', condition: 'inactive' },
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

export const validateCampaignState = (value: unknown): CheckedResult<CampaignState> =>
  decodeCampaignState(value);

export const createInitialCampaignState = (
  input: CampaignCreationInput,
): CheckedResult<CampaignState> => {
  const checkedInput = decodeCampaignCreationInput(input);
  if (checkedInput.kind === 'failure') return checkedInput;
  const normalizedInput: CampaignCreationInput = {
    ...checkedInput.value,
    protagonist: {
      ...checkedInput.value.protagonist,
      name: checkedInput.value.protagonist.name.normalize('NFC'),
    },
  };
  return validateCampaignState(buildInitialState(normalizedInput));
};
