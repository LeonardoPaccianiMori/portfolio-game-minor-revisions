import type { RuleCommand } from '../rules/index.ts';

export const CONTENT_FAMILIES = [
  'characters',
  'locations',
  'actions',
  'experiments',
  'tasks',
  'roomStates',
  'events',
  'scenes',
  'messages',
  'notifications',
  'records',
  'endings',
  'citations',
  'environmentalItems',
  'contextualLines',
  'tutorials',
  'interface',
  'audio',
] as const;

export type ContentFamily = (typeof CONTENT_FAMILIES)[number];
export type ContentProfile = 'full' | 'fallback' | 'slice';
export type CommandTag = RuleCommand['type'];
export type PlainData =
  null | boolean | number | string | readonly PlainData[] | { readonly [key: string]: PlainData };

export type ContentIssueCode =
  | 'malformedJson'
  | 'invalidManifest'
  | 'invalidProfile'
  | 'invalidObject'
  | 'invalidId'
  | 'invalidText'
  | 'duplicateId'
  | 'duplicateTextKey'
  | 'missingReference'
  | 'wrongReferenceFamily'
  | 'circularReference'
  | 'incompleteProfile'
  | 'excludedDependency'
  | 'countMismatch'
  | 'invariantFailure'
  | 'wordLimitExceeded';

export interface ContentIssue {
  readonly code: ContentIssueCode;
  readonly file: string;
  readonly path: string;
  readonly idOrKey: string | null;
}
export type ContentResult<T> =
  | { readonly kind: 'valid'; readonly value: T }
  | { readonly kind: 'invalid'; readonly issues: readonly ContentIssue[] };
export type RawSourceFiles = ReadonlyMap<string, Uint8Array>;

export interface ContentReference {
  readonly family: ContentFamily;
  readonly id: string;
}
export interface OwnedContentReference {
  readonly owner: ContentReference;
  readonly id: string;
}
export interface ContentTrace {
  readonly requirementIds: readonly string[];
  readonly testIds: readonly string[];
}
export interface PeriodWindow {
  readonly first: number;
  readonly last: number;
}
export type FloorAct =
  | 'orderlyButOverbooked'
  | 'manuscriptClutter'
  | 'rejectionAndPublicRecord'
  | 'reviewPressure'
  | 'decisionHorizon';
export type HistoryCollection =
  | 'completedContentIds'
  | 'expiredContentIds'
  | 'readMessageIds'
  | 'consumedContextualContentIds'
  | 'displayedEnvironmentalTextIds'
  | 'recordedSceneClosingIds'
  | 'recordedSceneRecapIds'
  | 'citationIds';

export interface Conditions {
  readonly allOf: readonly ConditionLeaf[];
  readonly anyOf: readonly ConditionLeaf[];
  readonly noneOf: readonly ConditionLeaf[];
}
type EnumCondition =
  | {
      readonly type: 'enumIs';
      readonly fact: 'claimLevel';
      readonly value: 'careful' | 'strong' | 'inflated' | null;
    }
  | {
      readonly type: 'enumIs';
      readonly fact: 'haoranAuthorship' | 'samiraAuthorship';
      readonly value: 'notIncluded' | 'credited' | 'declined';
    };
type ContentStateCondition =
  | {
      readonly type: 'contentStateIs';
      readonly target: ContentReference & { readonly family: 'scenes' };
      readonly state: 'locked' | 'eligible' | 'queued' | 'inProgress' | 'completed' | 'skipped';
    }
  | {
      readonly type: 'contentStateIs';
      readonly target: ContentReference & { readonly family: 'messages' };
      readonly state: 'locked' | 'available' | 'read' | 'replied' | 'expired';
    }
  | {
      readonly type: 'contentStateIs';
      readonly target: ContentReference & { readonly family: 'tasks' };
      readonly state: 'locked' | 'available' | 'completed' | 'committed' | 'expired';
    }
  | {
      readonly type: 'contentStateIs';
      readonly target: ContentReference & { readonly family: 'events' };
      readonly state: 'locked' | 'eligible' | 'queued' | 'active' | 'completed' | 'expired';
    }
  | {
      readonly type: 'contentStateIs';
      readonly target: OwnedContentReference;
      readonly selectedOptionId: string;
    };
type ExperimentStateCondition =
  | {
      readonly type: 'experimentStateIs';
      readonly experimentId: string;
      readonly runNumber: 1 | 2 | null;
      readonly field: 'stage';
      readonly value: 'configured' | 'running' | 'readyForAnalysis' | 'analysed' | 'stopped';
    }
  | {
      readonly type: 'experimentStateIs';
      readonly experimentId: string;
      readonly runNumber: 1 | 2 | null;
      readonly field: 'sampleCondition';
      readonly value: 'stable' | 'stressed' | 'failing';
    }
  | {
      readonly type: 'experimentStateIs';
      readonly experimentId: string;
      readonly runNumber: 1 | 2 | null;
      readonly field: 'equipmentState';
      readonly value: 'ready' | 'limited' | 'unavailable';
    }
  | {
      readonly type: 'experimentStateIs';
      readonly experimentId: string;
      readonly runNumber: 1 | 2 | null;
      readonly field: 'attentionState';
      readonly value: 'normal' | 'checkReady' | 'attentionNeeded';
    }
  | {
      readonly type: 'experimentStateIs';
      readonly experimentId: string;
      readonly runNumber: 1 | 2 | null;
      readonly field: 'finalResultBand';
      readonly value: 'robust' | 'mixed' | 'compromised' | null;
    };
type ManuscriptStateCondition =
  | {
      readonly type: 'manuscriptStateIs';
      readonly fact: 'requirement';
      readonly target: OwnedContentReference;
      readonly value: 'met' | 'missing' | 'conflict' | 'unsupported' | null;
    }
  | {
      readonly type: 'manuscriptStateIs';
      readonly fact: 'reading';
      readonly target: ContentReference;
      readonly value: 'honest' | 'altered' | 'unsupported';
    }
  | {
      readonly type: 'manuscriptStateIs';
      readonly fact: 'reviewerForm';
      readonly target: OwnedContentReference;
      readonly value: 'base' | 'conditional' | null;
    }
  | {
      readonly type: 'manuscriptStateIs';
      readonly fact: 'hasSnapshot';
      readonly target: null;
      readonly value: boolean;
    };
export type ConditionLeaf =
  | { readonly type: 'periodInWindow'; readonly window: PeriodWindow }
  | { readonly type: 'actIs'; readonly value: FloorAct }
  | { readonly type: 'pressureProfileIs'; readonly value: 'standard' | 'supported' }
  | EnumCondition
  | {
      readonly type: 'booleanIs';
      readonly fact:
        | 'pendingCrash'
        | 'camilaReplySent'
        | 'morrowVideoCompleted'
        | 'fabricationConfessedToCamila';
      readonly value: boolean;
    }
  | {
      readonly type: 'integerInRange';
      readonly fact:
        'energy' | 'evidence' | 'elenaPaperConfidence' | 'integrity' | 'integrityRecoveryUsed';
      readonly minimum: number;
      readonly maximum: number;
    }
  | {
      readonly type: 'idPresenceIs';
      readonly collection: HistoryCollection;
      readonly target: ContentReference;
      readonly present: boolean;
    }
  | ContentStateCondition
  | ExperimentStateCondition
  | ManuscriptStateCondition
  | {
      readonly type: 'concernStateIs';
      readonly concernId: string;
      readonly field: 'visible';
      readonly value: boolean;
    }
  | {
      readonly type: 'concernStateIs';
      readonly concernId: string;
      readonly field: 'response';
      readonly value: 'correct' | 'deny' | 'defer' | 'ignoreReminder' | null;
    }
  | {
      readonly type: 'concernStateIs';
      readonly concernId: string;
      readonly field: 'routeImpact';
      readonly value: 'none' | 'aldercroft' | 'morrow' | 'both';
    }
  | {
      readonly type: 'routeStateIs';
      readonly route: 'aldercroft' | 'morrow';
      readonly state: 'locked' | 'developing' | 'available' | 'closed' | 'chosen' | 'declined';
    }
  | {
      readonly type: 'relationshipStateIs';
      readonly characterId: string;
      readonly field: 'trust';
      readonly minimum: number;
      readonly maximum: number;
      readonly value: null;
    }
  | {
      readonly type: 'relationshipStateIs';
      readonly characterId: string;
      readonly field: 'introduced' | 'permanentBreach' | 'supportConsumed';
      readonly minimum: null;
      readonly maximum: null;
      readonly value: boolean;
    }
  | {
      readonly type: 'piimStateIs';
      readonly fact: 'batch' | 'oxygen' | 'claim';
      readonly value: 'met' | 'partlyMet' | 'notMet' | null;
    }
  | {
      readonly type: 'piimStateIs';
      readonly fact: 'outcome';
      readonly value: 'published' | 'acceptedPendingFinalWork' | 'underReview' | 'rejected' | null;
    }
  | {
      readonly type: 'paperStateIs';
      readonly fact: 'preprint';
      readonly value: 'notPosted' | 'public' | 'withdrawn';
    }
  | {
      readonly type: 'paperStateIs';
      readonly fact: 'journal';
      readonly value: 'notSubmitted' | 'submitted' | 'majorRevision' | 'withdrawn' | 'resolved';
    }
  | {
      readonly type: 'paperStateIs';
      readonly fact: 'final';
      readonly value:
        'published' | 'acceptedPendingFinalWork' | 'underReview' | 'rejectedOrWithdrawn' | null;
    }
  | {
      readonly type: 'fatigueStateIs';
      readonly fact: 'pendingCrash';
      readonly minimum: null;
      readonly maximum: null;
      readonly value: boolean;
    }
  | {
      readonly type: 'fatigueStateIs';
      readonly fact: 'crashCount' | 'energy';
      readonly minimum: number;
      readonly maximum: number;
      readonly value: null;
    }
  | {
      readonly type: 'conclusionStateIs';
      readonly fact: 'state';
      readonly value:
        'unresolved' | 'choicePending' | 'confirmed' | 'epilogueInProgress' | 'completed';
    }
  | {
      readonly type: 'conclusionStateIs';
      readonly fact: 'choice';
      readonly value: 'aldercroft' | 'morrow' | 'leave' | 'neither' | null;
    }
  | {
      readonly type: 'countInRange';
      readonly collection:
        'analysedRuns' | 'activeRuns' | 'rawRecords' | 'evidenceCards' | 'snapshots' | 'citations';
      readonly minimum: number;
      readonly maximum: number;
    };
export interface Availability {
  readonly window: PeriodWindow | null;
  readonly when: Conditions;
  readonly blocking: Conditions;
  readonly expiry: 'permanent' | 'afterWindow';
  readonly repeat: 'once' | 'repeatable';
}
interface EffectBase {
  readonly owner: CommandTag;
  readonly reasonKey: string;
}
export type AuthoredEffect =
  | (EffectBase & {
      readonly type: 'adjustMetric';
      readonly metric: 'trust';
      readonly characterId: string;
      readonly delta: number;
    })
  | (EffectBase & {
      readonly type: 'adjustMetric';
      readonly metric: 'elenaPaperConfidence' | 'integrity' | 'evidence';
      readonly characterId: null;
      readonly delta: number;
    })
  | (EffectBase & {
      readonly type: 'setFact';
      readonly fact: 'camilaReplySent' | 'morrowVideoCompleted' | 'fabricationConfessedToCamila';
      readonly value: boolean;
    })
  | (EffectBase & {
      readonly type: 'recordHistory';
      readonly collection: HistoryCollection;
      readonly target: ContentReference;
    })
  | (EffectBase & { readonly type: 'applyDomainResult'; readonly result: DomainResult })
  | (EffectBase & { readonly type: 'applyActionCost'; readonly actionId: string })
  | (EffectBase & {
      readonly type: 'requestPresentation';
      readonly presentation: PresentationReference;
    });
export type DomainResult =
  | { readonly kind: 'activateTask'; readonly taskId: string }
  | { readonly kind: 'recordPrimary'; readonly recordId: string }
  | {
      readonly kind: 'selectOption';
      readonly choice: OwnedContentReference;
      readonly optionId: string;
    }
  | {
      readonly kind: 'resolveRoom';
      readonly roomStateId: string;
      readonly routeId: string;
      readonly equipmentState: 'ready' | 'limited';
    }
  | {
      readonly kind: 'applySupport';
      readonly characterId: string;
      readonly target: ContentReference;
    }
  | { readonly kind: 'commitManuscript'; readonly taskId: string }
  | {
      readonly kind: 'completeSlice';
      readonly taskId: 'MR-SLICE-CLAIM-REHEARSAL';
      readonly interfaceId: 'MR-UI-SLICE-COMPLETE';
    };
export type PresentationReference =
  | { readonly kind: 'saveCheckpoint'; readonly reasonId: string }
  | { readonly kind: 'showNotice'; readonly interfaceId: string; readonly noticeKey: string }
  | { readonly kind: 'startCutscene'; readonly sceneId: string }
  | { readonly kind: 'playAudioCue'; readonly audioId: string }
  | { readonly kind: 'completeCampaign' };
export interface TextForm {
  readonly id: string;
  readonly when: Conditions;
  readonly bodyKeys: readonly string[];
}
export interface Beat {
  readonly id: string;
  readonly speakerId: string | null;
  readonly textKey: string | null;
  readonly choiceId: string | null;
  readonly locationId: string | null;
}
export interface SceneForm {
  readonly id: string;
  readonly when: Conditions;
  readonly beats: readonly Beat[];
}
export interface ChoiceOption {
  readonly id: string;
  readonly labelKey: string;
  readonly when: Conditions;
  readonly effects: readonly AuthoredEffect[];
  readonly confirmationKey: string | null;
  readonly recapKey: string | null;
  readonly closingBeats: readonly Beat[];
}
export interface Choice {
  readonly id: string;
  readonly options: readonly ChoiceOption[];
  readonly recapKey: string | null;
}
export interface Cue {
  readonly id: string;
  readonly locationId: string;
  readonly interfaceId: string;
  readonly audioId: string | null;
}

export type Delivery =
  | {
      readonly kind: 'transition';
      readonly target:
        | { readonly kind: 'activateRoom'; readonly roomState: ContentReference }
        | { readonly kind: 'resolveRoom'; readonly route: OwnedContentReference };
    }
  | { readonly kind: 'scene' | 'message' | 'notification'; readonly target: ContentReference };
export interface RoomResult {
  readonly equipmentState: 'ready' | 'limited';
  readonly controlKind: 'matched' | 'limited';
  readonly observationCoverage: 'full' | 'limited';
}
export type RoomRoute =
  | {
      readonly kind: 'directResolve';
      readonly id: string;
      readonly labelKey: string;
      readonly when: Conditions;
      readonly actionId: string | null;
      readonly resultReasonKey: string;
      readonly result: RoomResult;
      readonly effects: readonly [];
    }
  | {
      readonly kind: 'openScene';
      readonly id: string;
      readonly labelKey: string;
      readonly when: Conditions;
      readonly actionId: null;
      readonly resultReasonKey: null;
      readonly eventId: string;
      readonly effects: readonly [];
    }
  | {
      readonly kind: 'sceneResolve';
      readonly id: string;
      readonly labelKey: null;
      readonly when: Conditions;
      readonly actionId: null;
      readonly resultReasonKey: string;
      readonly trigger: { readonly eventId: string; readonly optionId: string };
      readonly result: RoomResult;
      readonly effects: readonly [];
    };

interface ExperimentOptionBase {
  readonly id: string;
  readonly labelKey: string;
}
export type ExperimentOption =
  | (ExperimentOptionBase & {
      readonly kind: 'goal';
      readonly value: 'MR-EXP-LASER-SHAM-GOAL-REPLICATION';
    })
  | (ExperimentOptionBase & { readonly kind: 'control'; readonly value: 'matched' | 'limited' })
  | (ExperimentOptionBase & {
      readonly kind: 'observation';
      readonly value: 'structure' | 'rhythm' | 'paired';
    })
  | (ExperimentOptionBase & {
      readonly kind: 'sample';
      readonly value: 'stable' | 'stressed' | 'failing';
    })
  | (ExperimentOptionBase & {
      readonly kind: 'equipment';
      readonly value: 'ready' | 'limited' | 'unavailable';
    })
  | (ExperimentOptionBase & {
      readonly kind: 'familyChoice';
      readonly value: 'baseline' | 'higherRisk';
    });
export interface StageActions {
  readonly configure: string;
  readonly start: string;
  readonly monitor: string;
  readonly qualityMonitor: string;
  readonly stabilize: string;
  readonly stop: string;
  readonly analyse: string;
}
export interface BiologicalResultDefinition {
  readonly id: string;
  readonly value: 'strong' | 'limited' | 'weak';
}
export interface LaserOutcomeRow {
  readonly familyChoice: 'baseline' | 'higherRisk';
  readonly biologicalResult: 'strong' | 'limited' | 'weak';
  readonly observation: 'structure' | 'rhythm' | 'paired';
  readonly access: 'readyMatched' | 'limitedRoute';
  readonly monitoringResponse: 'continue' | 'qualityCheck' | 'stabilize' | 'missed';
  readonly biologicalResultId: string;
  readonly structureId: string;
  readonly rhythmId: string;
  readonly repatterningId: string;
  readonly controlId: string;
  readonly observationCoverage: 'full' | 'limited';
  readonly bodyKey: string;
}
export type InputAction =
  | 'move'
  | 'look'
  | 'uiNavigate'
  | 'primaryAction'
  | 'backPause'
  | 'researchStatus'
  | 'previousPanel'
  | 'nextPanel'
  | 'interactionAssist';
export interface TutorialInputRow {
  readonly action: InputAction;
  readonly labelKey: string;
}

interface AuthoredBase {
  readonly id: string;
  readonly trace: ContentTrace;
}
export interface CharacterItem extends AuthoredBase {
  readonly type: 'character';
  readonly nameKey: string;
  readonly roleKey: string;
  readonly presence: 'physical' | 'remote';
  readonly speakerId: string;
  readonly relationshipId: string | null;
}
export interface LocationItem extends AuthoredBase {
  readonly type: 'location';
  readonly nameKey: string;
  readonly roomType:
    | 'tissueCulture'
    | 'mainLab'
    | 'piOffice'
    | 'sharedDesks'
    | 'imaging'
    | 'facility'
    | 'breakRoom'
    | 'corridor'
    | 'southCorridor'
    | 'exitVestibule';
  readonly cueRoles: readonly ('required' | 'optional' | 'warning')[];
  readonly mappingKey: string;
}
export interface ActionItem extends AuthoredBase {
  readonly type: 'action';
  readonly labelKey: string;
  readonly workClass: 'recovery' | 'light' | 'focused' | 'intense' | 'major';
  readonly periodCost: number;
  readonly baseEnergyCost: number;
  readonly command: CommandTag;
  readonly forecastKey: string;
  readonly reasonKeys: readonly string[];
}
export interface LaserExperimentItem extends AuthoredBase {
  readonly type: 'experiment';
  readonly availability: Availability;
  readonly family: 'laserSham';
  readonly labelKey: 'experiment.laserSham';
  readonly questionKeys: {
    readonly baseline: 'experiment.laserSham.question.baseline';
    readonly higherRisk: 'experiment.laserSham.question.higherRisk';
  };
  readonly pairedLimitForecastKey: 'forecast.laserPairedLimit';
  readonly maxRuns: 2;
  readonly goalIds: readonly string[];
  readonly options: readonly ExperimentOption[];
  readonly stageActions: StageActions;
  readonly monitoringOffsets: readonly PeriodWindow[];
  readonly recordId: string;
  readonly evidenceIdPattern: 'evidence:run:<templateId>:<runNumber>';
  readonly scienceDefinitionIds: readonly string[];
  readonly biologicalResults: readonly BiologicalResultDefinition[];
  readonly outcomes: readonly LaserOutcomeRow[];
}
export interface ExperimentMilestoneTaskItem extends AuthoredBase {
  readonly type: 'experimentMilestone';
  readonly availability: Availability;
  readonly labelKey: 'task.laserSham';
  readonly command: 'analyseExperiment';
  readonly experiment: ContentReference;
  readonly completion: {
    readonly kind: 'firstSuccessfulAnalysis';
    readonly record: ContentReference;
  };
  readonly resultRefs: readonly ContentReference[];
  readonly activeRequestId: null;
}
export interface SliceRehearsalTaskItem extends AuthoredBase {
  readonly type: 'sliceRehearsal';
  readonly availability: Availability;
  readonly labelKey: 'ui.slice.rehearsal';
  readonly command: 'commitInitialManuscript';
  readonly actionId: 'MR-ACT-SLICE-CLAIM-REHEARSAL';
  readonly allowedClaimIds: readonly string[];
  readonly experimentId: 'MR-EXP-LASER-SHAM';
  readonly completionId: 'MR-UI-SLICE-COMPLETE';
  readonly activeRequestId: null;
}
export interface RoomStateItem extends AuthoredBase {
  readonly type: 'roomState';
  readonly availability: Availability;
  readonly locationId: string;
  readonly affectedExperimentIds: readonly string[];
  readonly activationEventId: string;
  readonly forecastKey: string;
  readonly routes: readonly RoomRoute[];
  readonly expiryRouteId: string;
}
export interface EventItem extends AuthoredBase {
  readonly type: 'event';
  readonly availability: Availability;
  readonly status: 'required' | 'optional';
  readonly priority:
    'automaticTransition' | 'mandatoryContent' | 'requiredMessage' | 'optionalContent';
  readonly authoredOrder: number;
  readonly delivery: Delivery;
  readonly cue: Cue | null;
  readonly fallback: Delivery | null;
  readonly threadId: string | null;
  readonly effects: readonly AuthoredEffect[];
}
export interface SceneItem extends AuthoredBase {
  readonly type: 'scene';
  readonly availability: Availability;
  readonly eventId: string;
  readonly locationIds: readonly string[];
  readonly cue: Cue | null;
  readonly mandatory: boolean;
  readonly baseForm: SceneForm;
  readonly conditionalForm: SceneForm | null;
  readonly choices: readonly Choice[];
  readonly periodEffect: 0 | 1;
  readonly completionEffects: readonly AuthoredEffect[];
  readonly closingBeats: readonly Beat[];
  readonly recapKey: string | null;
}
export interface MessageItem extends AuthoredBase {
  readonly type: 'message';
  readonly availability: Availability;
  readonly eventId: string;
  readonly senderId: string;
  readonly threadId: string;
  readonly subjectKey: string;
  readonly forms: readonly TextForm[];
  readonly choices: readonly Choice[];
  readonly deferral: 'leaveAvailable' | 'expireAtWindow';
  readonly followupEventIds: readonly string[];
  readonly expiryEffects: readonly AuthoredEffect[];
}
export interface NotificationItem extends AuthoredBase {
  readonly type: 'notification';
  readonly availability: Availability;
  readonly eventId: string;
  readonly senderId: string;
  readonly threadId: string | null;
  readonly forms: readonly TextForm[];
  readonly presentation: 'desk' | 'direct';
  readonly followupEventIds: readonly string[];
}
export interface NotebookRecordItem extends AuthoredBase {
  readonly type: 'notebook';
  readonly availability: Availability;
  readonly titleKey: 'record.projectNotebook.title';
  readonly baseForm: TextForm;
  readonly source: ContentReference;
  readonly selection: 'onCreation';
  readonly repeatNoteKeys: readonly string[];
}
export interface LaserRecordItem extends AuthoredBase {
  readonly type: 'experiment';
  readonly availability: Availability;
  readonly titleKey: 'record.laserSham.title';
  readonly source: ContentReference;
  readonly selection: {
    readonly kind: 'laserOutcomeRow';
    readonly experimentId: 'MR-EXP-LASER-SHAM';
    readonly allowedBodyKeys: readonly string[];
  };
  readonly repeatNoteKeys: readonly string[];
}
export interface EndingItem extends AuthoredBase {
  readonly type: 'ending';
  readonly family: 'career' | 'paper' | 'relationship' | 'integrity' | 'fatigue';
  readonly when: Conditions;
  readonly bodyKey: string;
  readonly variants: readonly TextForm[];
}
export interface CitationItem extends AuthoredBase {
  readonly type: 'citation';
  readonly titleKey: string;
  readonly bodyKey: string;
  readonly when: Conditions;
  readonly permanent: true;
  readonly archiveOrder: number;
}
export interface EnvironmentalItem extends AuthoredBase {
  readonly type: 'environmentalItem';
  readonly availability: Availability;
  readonly locationId: string;
  readonly acts: readonly FloorAct[];
  readonly presentation: 'glance' | 'focused';
  readonly textKeys: readonly string[];
}
export interface ContextualLineItem extends AuthoredBase {
  readonly type: 'contextualLine';
  readonly availability: Availability;
  readonly speakerId: string;
  readonly when: Conditions;
  readonly textKey: string;
}
export interface TutorialItem extends AuthoredBase {
  readonly type: 'tutorial';
  readonly availability: Availability;
  readonly trigger: {
    readonly kind: 'firstSemanticEvent';
    readonly event:
      | 'freeMovementReady'
      | 'interactionTargetReady'
      | 'focusedViewOpened'
      | 'actionCostShown'
      | 'sampleConfigured'
      | 'monitoringWindowAvailable'
      | 'researchStatusAvailable'
      | 'safeSaveAvailable';
  };
  readonly headingKey: string;
  readonly bodyKey: string;
  readonly acknowledgement: 'dismissible';
  readonly inputActions: readonly InputAction[];
}
export type InterfaceDefinition =
  | {
      readonly id: string;
      readonly kind: 'claim';
      readonly value: 'careful' | 'strong' | 'inflated';
      readonly labelKey: string;
    }
  | {
      readonly id: string;
      readonly kind: 'requirement';
      readonly value:
        | 'supportedFigure'
        | 'relevantControl'
        | 'distinctExperimentFigures'
        | 'structureCoverage'
        | 'rhythmCoverage'
        | 'matchedControl'
        | 'caveat'
        | 'associationSupport'
        | 'causalSupport';
      readonly labelKey: string;
    };
export interface InterfaceItem extends AuthoredBase {
  readonly type: 'interface';
  readonly availability: Availability;
  readonly purpose:
    | 'menuContinue'
    | 'menuNewGame'
    | 'menuSaveQuit'
    | 'saveSuccess'
    | 'saveFailure'
    | 'saveRecovery'
    | 'saveReset'
    | 'replaceSave'
    | 'clearData'
    | 'researchStatus'
    | 'controls'
    | 'settings'
    | 'accessibility'
    | 'profile'
    | 'contentInvalid'
    | 'sliceRehearsal'
    | 'sliceComplete'
    | 'claim'
    | 'requirement'
    | 'availabilityCue'
    | 'confirmation';
  readonly textKeys: readonly string[];
  readonly confirmation: 'none' | 'required';
  readonly dynamicFields: readonly (
    | 'actionPeriods'
    | 'actionEnergy'
    | 'controlLabel'
    | 'currentValue'
    | 'protagonistName'
    | 'subjectPronoun'
    | 'objectPronoun'
    | 'possessiveAdjective'
    | 'possessivePronoun'
    | 'reflexivePronoun'
  )[];
  readonly definitions: readonly InterfaceDefinition[];
}
export type ScienceDefinitionItem = AuthoredBase & {
  readonly type: 'scienceDefinition';
  readonly labelKey: string;
} & (
    | {
        readonly kind: 'structure' | 'rhythm';
        readonly meaning: 'recovery' | 'partial' | 'none' | 'unobserved';
      }
    | {
        readonly kind: 'repatterning';
        readonly meaning: 'tracksRecovery' | 'noAssociation' | 'unobserved';
      }
    | { readonly kind: 'control'; readonly meaning: 'matched' | 'limited' }
    | {
        readonly kind: 'reading';
        readonly meaning: 'recovery' | 'association' | 'noRecovery' | 'unresolved';
      }
    | { readonly kind: 'caveat'; readonly meaning: 'condition' | 'association' | 'process' }
  );
export interface AudioRoleItem extends AuthoredBase {
  readonly type: 'audioRole';
  readonly role:
    | 'ambience'
    | 'music'
    | 'requiredCue'
    | 'optionalCue'
    | 'warningCue'
    | 'confirmationCue'
    | 'dialogue';
  readonly meaningKey: string;
  readonly visibleDuplicate: 'none' | 'dialogueText' | 'experimentAttentionState';
}
export interface AuthoredItemByFamily {
  readonly characters: CharacterItem;
  readonly locations: LocationItem;
  readonly actions: ActionItem;
  readonly experiments: LaserExperimentItem;
  readonly tasks: ExperimentMilestoneTaskItem | SliceRehearsalTaskItem;
  readonly roomStates: RoomStateItem;
  readonly events: EventItem;
  readonly scenes: SceneItem;
  readonly messages: MessageItem;
  readonly notifications: NotificationItem;
  readonly records: NotebookRecordItem | LaserRecordItem;
  readonly endings: EndingItem;
  readonly citations: CitationItem;
  readonly environmentalItems: EnvironmentalItem;
  readonly contextualLines: ContextualLineItem;
  readonly tutorials: TutorialItem;
  readonly interface: InterfaceItem | ScienceDefinitionItem;
  readonly audio: AudioRoleItem;
}
export type AuthoredContentItem = AuthoredItemByFamily[ContentFamily];
type WithoutTrace<Item> = Item extends AuthoredBase ? Omit<Item, 'trace'> : never;
export type BuiltItemByFamily = {
  readonly [Family in ContentFamily]: WithoutTrace<AuthoredItemByFamily[Family]>;
};
export type BuiltContentItem = BuiltItemByFamily[ContentFamily];

export interface SourceManifest {
  readonly packageId: 'minor-revisions-content';
  readonly schemaVersion: 1;
  readonly contentVersion: string;
  readonly language: 'en';
  readonly dataFiles: readonly string[];
  readonly stringsFile: 'content/strings.en.json';
  readonly profileFiles: readonly [
    'content/profiles/full.json',
    'content/profiles/fallback.json',
    'content/profiles/slice.json',
  ];
  readonly compatibleEarlierVersions: readonly string[];
}
export type FamilySelections = Readonly<Record<ContentFamily, readonly string[]>>;
export type FamilyCounts = Readonly<Record<ContentFamily, number>>;
export interface ProfileSource {
  readonly schemaVersion: 1;
  readonly id: ContentProfile;
  readonly implementationStatus: 'complete' | 'incomplete';
  readonly campaignMode: 'campaign' | 'evaluationSlice';
  readonly selections: FamilySelections;
  readonly replacements: readonly {
    readonly family: ContentFamily;
    readonly fromId: string;
    readonly toId: string;
  }[];
  readonly expectedCounts: FamilyCounts;
  readonly sliceCompletionId: 'MR-UI-SLICE-COMPLETE' | null;
}
export interface BuiltMetadata {
  readonly packageId: 'minor-revisions-content';
  readonly schemaVersion: 1;
  readonly contentVersion: string;
  readonly language: 'en';
  readonly profileId: ContentProfile;
  readonly compatibleEarlierVersions: readonly string[];
  readonly expectedCounts: FamilyCounts;
}
export type BuiltFamilies = Readonly<Record<ContentFamily, readonly BuiltContentItem[]>>;
export interface BuiltContentPackage {
  readonly metadata: BuiltMetadata;
  readonly families: BuiltFamilies;
  readonly strings: Readonly<Record<string, string>>;
}

declare const validatedSourceBrand: unique symbol;
export interface ValidatedSourceCatalogue {
  readonly [validatedSourceBrand]: true;
}

export interface RulesItem {
  readonly id: string;
  readonly type: string;
}
export interface PresentationItem {
  readonly id: string;
  readonly type: string;
}
export interface ContentRulesView {
  readonly families: Readonly<Record<ContentFamily, readonly RulesItem[]>>;
}
export interface ContentPresentationView {
  readonly families: Readonly<Record<ContentFamily, readonly PresentationItem[]>>;
}
export interface ValidatedContent {
  readonly metadata: BuiltMetadata;
  readonly rules: ContentRulesView;
  readonly presentation: ContentPresentationView;
  readonly strings: Readonly<Record<string, string>>;
}
