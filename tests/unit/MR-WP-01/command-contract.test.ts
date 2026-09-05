import { describe, expect, expectTypeOf, it } from 'vitest';

import type {
  EndingCardFacts,
  PreparationBand,
  RuleCommand,
  RuleEffect,
  RuleFaultCode,
  RuleRejectionCode,
  RuleTransitionResult,
} from '../../../src/rules';

describe('MR-IF-003 v1 closed data contracts', () => {
  it('contains exactly the 24 command discriminants', () => {
    type Tags = RuleCommand['type'];
    expectTypeOf<Tags>().toEqualTypeOf<
      | 'configureExperiment'
      | 'startExperiment'
      | 'respondToMonitoring'
      | 'analyseExperiment'
      | 'commitInitialManuscript'
      | 'commitManuscriptRevision'
      | 'commitPiimResponse'
      | 'reportToElena'
      | 'completeCareerTask'
      | 'replyToMessage'
      | 'respondToConcern'
      | 'useCharacterSupport'
      | 'takeProtectedBreak'
      | 'resolveRoomState'
      | 'requestScene'
      | 'chooseSceneOption'
      | 'skipScene'
      | 'confirmConclusionChoice'
      | 'applyScheduledTransition'
      | 'resolvePendingCrash'
      | 'resolvePiimOutcome'
      | 'evaluateCareerRoute'
      | 'finalizeCampaign'
      | 'recordContentPresentation'
    >();
  });

  it('contains exactly the five effect discriminants', () => {
    expectTypeOf<RuleEffect['type']>().toEqualTypeOf<
      'saveCheckpoint' | 'showNotice' | 'startCutscene' | 'playAudioCue' | 'completeCampaign'
    >();
  });

  it('uses a non-empty analysis caveat tuple and the closed preparation bands', () => {
    type Analyse = Extract<RuleCommand, { type: 'analyseExperiment' }>;
    expectTypeOf<Analyse['caveatIds']>().toEqualTypeOf<[string, ...string[]]>();
    expectTypeOf<PreparationBand>().toEqualTypeOf<'robust' | 'mixed' | 'compromised'>();
  });

  it('contains the complete ending-card facts without a persistence sequence', () => {
    type ExpectedEndingCardFacts = {
      schemaVersion: 1;
      campaignId: string;
      buildProfileId: 'full' | 'fallback' | 'slice';
      pressureProfile: 'standard' | 'supported';
      protagonist: { name: string; pronounSet: 'sheHer' | 'heHim' | 'theyThem' };
      careerEndingModuleId: string;
      paperEndingModuleId: string;
      relationshipEndingModuleId: string;
      integrityEndingModuleId: string;
      fatigueEndingModuleId: string;
      finalEvidencePacketLabel: 'thin' | 'developing' | 'coherent' | 'substantial';
      trustByCharacterId: {
        'MR-CHR-ELENA': number;
        'MR-CHR-HAORAN': number;
        'MR-CHR-SAMIRA': number;
        'MR-CHR-GABRIEL': number;
        'MR-CHR-CAMILA': number;
      };
      relationshipConsequenceModuleIdsByCharacterId: {
        'MR-CHR-ELENA': string;
        'MR-CHR-HAORAN': string;
        'MR-CHR-SAMIRA': string;
        'MR-CHR-GABRIEL': string;
        'MR-CHR-CAMILA': string;
      };
      dramatizedRelationshipAfterbeatModuleId: string;
      citationIds: string[];
    };
    expectTypeOf<EndingCardFacts>().toEqualTypeOf<ExpectedEndingCardFacts>();
    expectTypeOf<EndingCardFacts>().not.toHaveProperty('completionSequence');
    expectTypeOf<Extract<RuleEffect, { type: 'completeCampaign' }>>().toEqualTypeOf<{
      type: 'completeCampaign';
      endingCard: EndingCardFacts;
      stateRevision: number;
    }>();
  });

  it('contains exactly the 15 rejections and six faults', () => {
    expectTypeOf<RuleRejectionCode>().toEqualTypeOf<
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
      | 'conclusionUnavailable'
    >();
    expectTypeOf<RuleFaultCode>().toEqualTypeOf<
      | 'invalidCommandContract'
      | 'invalidStateContract'
      | 'invalidContentContract'
      | 'ruleInvariantViolation'
      | 'invalidResultState'
      | 'unexpectedRuleFailure'
    >();
  });

  it('keeps the atomic success or no-state failure union exact', () => {
    expectTypeOf<RuleTransitionResult['kind']>().toEqualTypeOf<'applied' | 'rejected' | 'fault'>();
    type Applied = Extract<RuleTransitionResult, { kind: 'applied' }>;
    type Rejected = Extract<RuleTransitionResult, { kind: 'rejected' }>;
    type Fault = Extract<RuleTransitionResult, { kind: 'fault' }>;
    expectTypeOf<Applied>().toHaveProperty('state');
    expectTypeOf<Applied>().toHaveProperty('effects');
    expectTypeOf<Rejected>().not.toHaveProperty('state');
    expectTypeOf<Rejected>().not.toHaveProperty('effects');
    expectTypeOf<Fault>().not.toHaveProperty('state');
    expectTypeOf<Fault>().not.toHaveProperty('effects');
  });

  it('audits every command and effect payload as a closed data shape', () => {
    const proposal: Extract<RuleCommand, { type: 'commitInitialManuscript' }>['proposal'] = {
      claim: null,
      figureIds: [null, null, null],
      controlIds: [null, null],
      caveatId: null,
      authorshipId: null,
      supplementaryId: null,
      activeRequestId: null,
    };
    const confirmations = { confirmedIds: ['MR-CONFIRM-TEST'] };
    const commands = [
      {
        type: 'configureExperiment',
        experimentTemplateId: 'MR-EXP-LASER-SHAM',
        goalId: 'MR-GOAL-TEST',
        controlId: 'MR-CONTROL-TEST',
        observationId: 'MR-OBSERVATION-TEST',
        familyChoiceId: 'MR-FAMILY-TEST',
        sampleConditionId: 'MR-SAMPLE-STABLE',
        equipmentId: 'MR-EQUIPMENT-TEST',
      },
      { type: 'startExperiment', runId: 'run:MR-EXP-LASER-SHAM:1' },
      {
        type: 'respondToMonitoring',
        runId: 'run:MR-EXP-LASER-SHAM:1',
        response: 'qualityCheck',
      },
      {
        type: 'analyseExperiment',
        runId: 'run:MR-EXP-LASER-SHAM:1',
        selectedReadingId: 'MR-READING-TEST',
        caveatIds: ['MR-CAVEAT-TEST'],
      },
      { type: 'commitInitialManuscript', proposal, confirmations },
      {
        type: 'commitManuscriptRevision',
        revisionTaskId: 'MR-TASK-TEST',
        proposal,
        confirmations,
      },
      {
        type: 'commitPiimResponse',
        responseChoiceId: 'MR-RESPONSE-TEST',
        proposal,
        confirmations,
      },
      { type: 'reportToElena', requestId: 'MR-REQUEST-TEST', responseId: 'MR-RESPONSE-TEST' },
      { type: 'completeCareerTask', taskId: 'MR-TASK-TEST', choiceId: 'MR-CHOICE-TEST' },
      { type: 'replyToMessage', messageId: 'MR-MESSAGE-TEST', replyId: 'MR-REPLY-TEST' },
      { type: 'respondToConcern', concernId: 'MR-CONCERN-TEST', response: 'correct' },
      { type: 'useCharacterSupport', characterId: 'MR-CHR-ELENA', targetId: 'MR-TARGET-TEST' },
      { type: 'takeProtectedBreak', actionId: 'MR-ACT-BREAK' },
      {
        type: 'resolveRoomState',
        roomStateId: 'MR-ROOM-FACILITY-QUEUE',
        responseId: 'MR-RESPONSE-TEST',
      },
      { type: 'requestScene', sceneId: 'MR-SCN-CLARIFIED', checkpointRevision: 1 },
      {
        type: 'chooseSceneOption',
        sceneId: 'MR-SCN-CLARIFIED',
        optionId: 'MR-OPTION-TEST',
        presentation: 'playRemaining',
      },
      { type: 'skipScene', sceneId: 'MR-SCN-TEST' },
      { type: 'confirmConclusionChoice', finalChoiceId: 'aldercroft', confirmed: true },
      { type: 'applyScheduledTransition', eventId: 'MR-EVENT-TEST' },
      { type: 'resolvePendingCrash' },
      { type: 'resolvePiimOutcome' },
      { type: 'evaluateCareerRoute', route: 'aldercroft' },
      { type: 'finalizeCampaign' },
      {
        type: 'recordContentPresentation',
        contentId: 'MR-SCN-TEST',
        presentationType: 'sceneRecap',
      },
    ] satisfies RuleCommand[];
    const endingCard = {
      schemaVersion: 1,
      campaignId: '00000000-0000-4000-8000-000000000001',
      buildProfileId: 'full',
      pressureProfile: 'standard',
      protagonist: { name: 'Morgan', pronounSet: 'theyThem' },
      careerEndingModuleId: 'MR-END-CAREER-ACADEMIA',
      paperEndingModuleId: 'MR-END-PAPER-PUBLISHED',
      relationshipEndingModuleId: 'MR-END-REL-ELENA-SUPPORT',
      integrityEndingModuleId: 'MR-END-INTEGRITY-DEFENSIBLE',
      fatigueEndingModuleId: 'MR-END-FATIGUE-CLEAR',
      finalEvidencePacketLabel: 'coherent',
      trustByCharacterId: {
        'MR-CHR-ELENA': 60,
        'MR-CHR-HAORAN': 60,
        'MR-CHR-SAMIRA': 40,
        'MR-CHR-GABRIEL': 60,
        'MR-CHR-CAMILA': 40,
      },
      relationshipConsequenceModuleIdsByCharacterId: {
        'MR-CHR-ELENA': 'MR-END-REL-ELENA-AMBIGUOUS',
        'MR-CHR-HAORAN': 'MR-END-REL-HAORAN-AMBIGUOUS',
        'MR-CHR-SAMIRA': 'MR-END-REL-SAMIRA-AMBIGUOUS',
        'MR-CHR-GABRIEL': 'MR-END-REL-GABRIEL-AMBIGUOUS',
        'MR-CHR-CAMILA': 'MR-END-REL-CAMILA-AMBIGUOUS',
      },
      dramatizedRelationshipAfterbeatModuleId: 'MR-END-REL-ELENA-SUPPORT',
      citationIds: ['MR-CIT-01'],
    } satisfies EndingCardFacts;
    const effects = [
      { type: 'saveCheckpoint', reasonId: 'MR-REASON-TEST', stateRevision: 1 },
      { type: 'showNotice', noticeKey: 'notice.test', reasonKey: 'reason.test' },
      { type: 'startCutscene', cutsceneOrSceneId: 'MR-SCN-TEST' },
      { type: 'playAudioCue', cueId: 'MR-AUD-CUE-SCENE' },
      { type: 'completeCampaign', endingCard, stateRevision: 10 },
    ] satisfies RuleEffect[];
    expect(commands).toHaveLength(24);
    expect(effects).toHaveLength(5);
  });
});
