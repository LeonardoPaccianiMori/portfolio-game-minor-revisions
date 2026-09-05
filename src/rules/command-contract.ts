import type {
  BuildProfileId,
  CampaignState,
  PressureProfile,
  PronounSet,
  RecurringCharacterId,
} from './campaign-state-types';

export interface ManuscriptBoardProposal {
  claim: string | null;
  figureIds: [string | null, string | null, string | null];
  controlIds: [string | null, string | null];
  caveatId: string | null;
  authorshipId: string | null;
  supplementaryId: string | null;
  activeRequestId: string | null;
}

export interface IrreversibleConfirmations {
  confirmedIds: string[];
}

export type RuleCommand =
  | {
      type: 'configureExperiment';
      experimentTemplateId: string;
      goalId: string;
      controlId: string;
      observationId: string;
      familyChoiceId: string;
      sampleConditionId: string;
      equipmentId: string;
    }
  | { type: 'startExperiment'; runId: string }
  | {
      type: 'respondToMonitoring';
      runId: string;
      response: 'continue' | 'qualityCheck' | 'stabilize' | 'stop';
    }
  | {
      type: 'analyseExperiment';
      runId: string;
      selectedReadingId: string;
      caveatIds: [string, ...string[]];
    }
  | {
      type: 'commitInitialManuscript';
      proposal: ManuscriptBoardProposal;
      confirmations: IrreversibleConfirmations;
    }
  | {
      type: 'commitManuscriptRevision';
      revisionTaskId: string;
      proposal: ManuscriptBoardProposal;
      confirmations: IrreversibleConfirmations;
    }
  | {
      type: 'commitPiimResponse';
      responseChoiceId: string;
      proposal: ManuscriptBoardProposal | null;
      confirmations: IrreversibleConfirmations;
    }
  | { type: 'reportToElena'; requestId: string; responseId: string }
  | { type: 'completeCareerTask'; taskId: string; choiceId: string }
  | { type: 'replyToMessage'; messageId: string; replyId: string }
  | {
      type: 'respondToConcern';
      concernId: string;
      response: 'correct' | 'deny' | 'defer' | 'ignoreReminder';
    }
  | { type: 'useCharacterSupport'; characterId: string; targetId: string }
  | { type: 'takeProtectedBreak'; actionId: string }
  | { type: 'resolveRoomState'; roomStateId: string; responseId: string; affectedRunId?: string }
  | { type: 'requestScene'; sceneId: string; checkpointRevision?: number }
  | {
      type: 'chooseSceneOption';
      sceneId: string;
      optionId: string;
      presentation: 'playRemaining' | 'skipRemaining';
    }
  | { type: 'skipScene'; sceneId: string }
  | { type: 'confirmConclusionChoice'; finalChoiceId: string; confirmed: true }
  | { type: 'applyScheduledTransition'; eventId: string }
  | { type: 'resolvePendingCrash' }
  | { type: 'resolvePiimOutcome' }
  | { type: 'evaluateCareerRoute'; route: 'aldercroft' | 'morrow' }
  | { type: 'finalizeCampaign' }
  | {
      type: 'recordContentPresentation';
      contentId: string;
      presentationType:
        'messageRead' | 'contextualContent' | 'environmentalText' | 'sceneClosing' | 'sceneRecap';
    };

export type RuleEffect =
  | { type: 'saveCheckpoint'; reasonId: string; stateRevision: number }
  | { type: 'showNotice'; noticeKey: string; reasonKey: string }
  | { type: 'startCutscene'; cutsceneOrSceneId: string }
  | { type: 'playAudioCue'; cueId: string }
  | { type: 'completeCampaign'; endingCard: EndingCardFacts; stateRevision: number };

export interface EndingCardFacts {
  schemaVersion: 1;
  campaignId: string;
  buildProfileId: BuildProfileId;
  pressureProfile: PressureProfile;
  protagonist: { name: string; pronounSet: PronounSet };
  careerEndingModuleId: string;
  paperEndingModuleId: string;
  relationshipEndingModuleId: string;
  integrityEndingModuleId: string;
  fatigueEndingModuleId: string;
  finalEvidencePacketLabel: 'thin' | 'developing' | 'coherent' | 'substantial';
  trustByCharacterId: Record<RecurringCharacterId, number>;
  relationshipConsequenceModuleIdsByCharacterId: Record<RecurringCharacterId, string>;
  dramatizedRelationshipAfterbeatModuleId: string;
  citationIds: string[];
}

export type RuleRejectionCode =
  | 'campaignComplete'
  | 'commandUnavailable'
  | 'targetUnavailable'
  | 'choiceUnavailable'
  | 'prerequisiteNotMet'
  | 'insufficientEnergy'
  | 'activeRunLimitReached'
  | 'experimentStageMismatch'
  | 'monitoringWindowUnavailable'
  | 'analysisRequirementsMissing'
  | 'confirmationRequired'
  | 'contentAlreadyRecorded'
  | 'supportUnavailable'
  | 'routeUnavailable'
  | 'conclusionUnavailable';

export type RuleFaultCode =
  | 'invalidCommandContract'
  | 'invalidStateContract'
  | 'invalidContentContract'
  | 'ruleInvariantViolation'
  | 'invalidResultState'
  | 'unexpectedRuleFailure';

export interface SafeRuleContext {
  subjectId?: string;
  reasonKey?: string;
  fieldPath?: string;
}

export type RuleTransitionResult =
  | { kind: 'applied'; state: CampaignState; effects: RuleEffect[] }
  | { kind: 'rejected'; code: RuleRejectionCode; context?: SafeRuleContext }
  | { kind: 'fault'; code: RuleFaultCode; context?: SafeRuleContext };
