import { createInitialCampaignState } from '../../../src/rules';
import type { CampaignCreationInput, CampaignState } from '../../../src/rules';
import type { BuiltContentPackage, ContentFamily, RawSourceFiles } from '../../../src/content';
import { CONTENT_FAMILIES } from '../../../src/content/types';
import type { BuiltContentItem } from '../../../src/content/types';
import {
  INTERFACE_TEXT_KEYS,
  SLICE_SELECTIONS,
  SLICE_STRING_KEYS,
} from '../../../src/content/profiles';
import { createExpectedLaserOutcomes } from '../../../src/content/semantics';

export const standardInput: CampaignCreationInput = {
  campaignId: '00000000-0000-4000-8000-000000000001',
  campaignSeed: 305_419_896,
  contentVersion: '1.1.0',
  buildProfileId: 'full',
  pressureProfile: 'standard',
  protagonist: { name: 'Morgan', pronounSet: 'theyThem' },
};

export const initialCampaign = (input: CampaignCreationInput = standardInput): CampaignState => {
  const result = createInitialCampaignState(input);
  if (result.kind === 'failure') throw new Error('Controlled campaign creation failed');
  return result.value;
};

export const copyCampaign = (state: CampaignState = initialCampaign()): CampaignState =>
  structuredClone(state);

const emptyConditions = { allOf: [], anyOf: [], noneOf: [] } as const;
const available = {
  window: null,
  when: emptyConditions,
  blocking: emptyConditions,
  expiry: 'permanent',
  repeat: 'once',
} as const;
const item = (value: Record<string, unknown>): BuiltContentItem =>
  value as unknown as BuiltContentItem;
const ref = (family: ContentFamily, id: string) => ({ family, id });

const actionRows: Readonly<
  Record<string, readonly [string, string, number, number, string, string, readonly string[]]>
> = {
  'MR-ACT-ANALYSE': [
    'analyseExperiment',
    'focused',
    1,
    1,
    'action.analyse.label',
    'forecast.analyse',
    [
      'reason.energy.work',
      'reason.evidence.limited',
      'reason.evidence.result',
      'reason.time.action',
    ],
  ],
  'MR-ACT-MONITOR-QUALITY': [
    'respondToMonitoring',
    'focused',
    1,
    1,
    'action.monitorQuality.label',
    'forecast.monitorQuality',
    ['reason.band.monitor', 'reason.band.stabilized', 'reason.energy.work', 'reason.time.action'],
  ],
  'MR-ACT-MONITOR-ROUTINE': [
    'respondToMonitoring',
    'light',
    1,
    0,
    'action.monitorRoutine.label',
    'forecast.monitorRoutine',
    ['reason.band.monitor', 'reason.time.action'],
  ],
  'MR-ACT-RELATIONSHIP': [
    'chooseSceneOption',
    'light',
    1,
    0,
    'action.relationship.label',
    'forecast.relationship',
    [
      'reason.room.limited',
      'reason.room.ready',
      'reason.time.action',
      'reason.trust.pressure',
      'reason.trust.respect',
    ],
  ],
  'MR-ACT-ROOM-WAIT': [
    'resolveRoomState',
    'light',
    1,
    0,
    'action.roomWait.label',
    'forecast.roomWait',
    ['reason.room.ready', 'reason.time.action'],
  ],
  'MR-ACT-SAMPLE-CONFIGURE': [
    'configureExperiment',
    'light',
    0,
    0,
    'action.sampleConfigure.label',
    'forecast.sampleConfigure',
    ['reason.band.choice', 'reason.band.equipment', 'reason.band.sample'],
  ],
  'MR-ACT-SLICE-CLAIM-REHEARSAL': [
    'commitInitialManuscript',
    'focused',
    1,
    1,
    'ui.slice.rehearsal',
    'ui.slice.rehearsalForecast',
    ['reason.energy.work', 'reason.paper.commit', 'reason.time.action'],
  ],
  'MR-ACT-START-FOCUSED': [
    'startExperiment',
    'focused',
    1,
    1,
    'action.startFocused.label',
    'forecast.startFocused',
    ['reason.energy.work', 'reason.time.action'],
  ],
};
const scienceRows: Readonly<Record<string, readonly [string, string, string]>> = {
  'MR-CAVEAT-ASSOCIATION': ['caveat', 'association', 'science.caveatAssociation'],
  'MR-CAVEAT-CONDITION': ['caveat', 'condition', 'science.caveatCondition'],
  'MR-CAVEAT-PROCESS': ['caveat', 'process', 'science.caveatProcess'],
  'MR-CONTROL-LIMITED': ['control', 'limited', 'science.controlLimited'],
  'MR-CONTROL-MATCHED': ['control', 'matched', 'science.controlMatched'],
  'MR-READING-NO-RECOVERY': ['reading', 'noRecovery', 'science.readingNoRecovery'],
  'MR-READING-RECOVERY': ['reading', 'recovery', 'science.readingRecovery'],
  'MR-READING-UNRESOLVED': ['reading', 'unresolved', 'science.readingUnresolved'],
  'MR-REPATTERNING-UNOBSERVED': ['repatterning', 'unobserved', 'science.repatterningUnobserved'],
  'MR-RHYTHM-NONE': ['rhythm', 'none', 'science.rhythmNone'],
  'MR-RHYTHM-RECOVERY': ['rhythm', 'recovery', 'science.rhythmRecovery'],
  'MR-RHYTHM-UNOBSERVED': ['rhythm', 'unobserved', 'science.rhythmUnobserved'],
  'MR-STRUCTURE-PARTIAL': ['structure', 'partial', 'science.structurePartial'],
  'MR-STRUCTURE-RECOVERY': ['structure', 'recovery', 'science.structureRecovery'],
  'MR-STRUCTURE-UNOBSERVED': ['structure', 'unobserved', 'science.structureUnobserved'],
};
const tutorialRows: Readonly<Record<string, readonly [string, string, string, readonly string[]]>> =
  {
    'MR-TUT-001': [
      'freeMovementReady',
      'tutorial.heading.moveLook',
      'tutorial.move',
      ['move', 'look'],
    ],
    'MR-TUT-002': [
      'interactionTargetReady',
      'tutorial.heading.interact',
      'tutorial.interact',
      ['primaryAction'],
    ],
    'MR-TUT-003': [
      'focusedViewOpened',
      'tutorial.heading.focusedViews',
      'tutorial.station',
      ['primaryAction', 'backPause', 'uiNavigate'],
    ],
    'MR-TUT-004': [
      'actionCostShown',
      'tutorial.heading.costs',
      'tutorial.cost',
      ['primaryAction', 'backPause'],
    ],
    'MR-TUT-005': [
      'sampleConfigured',
      'tutorial.heading.focusedViews',
      'tutorial.sample',
      ['primaryAction'],
    ],
    'MR-TUT-006': [
      'monitoringWindowAvailable',
      'tutorial.heading.costs',
      'tutorial.monitor',
      ['primaryAction'],
    ],
    'MR-TUT-007': [
      'researchStatusAvailable',
      'tutorial.heading.researchStatus',
      'tutorial.status',
      ['researchStatus'],
    ],
    'MR-TUT-008': [
      'safeSaveAvailable',
      'tutorial.heading.localSaving',
      'tutorial.save',
      ['backPause', 'primaryAction'],
    ],
  };

const scene = (
  id: string,
  eventId: string,
  optionCount: number,
  sharedRecap: boolean,
): BuiltContentItem => {
  const prefix = id === 'MR-SCN-CLARIFIED' ? 'CLARIFIED' : 'GABRIEL-QUEUE';
  const choiceId = `MR-CHO-${prefix}`;
  const suffixes = id === 'MR-SCN-CLARIFIED' ? ['START', 'LIMIT'] : ['WAIT', 'LIMITED', 'PRESS'];
  const closingKeys =
    id === 'MR-SCN-CLARIFIED'
      ? ['scene.clarified.elena.afterStart', 'scene.clarified.elena.afterLimit']
      : [
          'optional.gabriel.queue.closeA',
          'optional.gabriel.queue.closeB',
          'optional.gabriel.queue.closeC',
        ];
  const options = Array.from({ length: optionCount }, (_, index) => {
    const optionId = `${choiceId}-${suffixes[index]}`;
    const reasonKey =
      id === 'MR-SCN-CLARIFIED'
        ? 'reason.pi.openingChoice'
        : index === 0
          ? 'reason.trust.respect'
          : index === 1
            ? 'reason.room.limited'
            : 'reason.trust.pressure';
    const optionEffects: unknown[] = [
      {
        type: 'applyDomainResult',
        owner: 'chooseSceneOption',
        reasonKey,
        result: {
          kind: 'selectOption',
          choice: { owner: ref('scenes', id), id: choiceId },
          optionId,
        },
      },
    ];
    if (id === 'MR-SCN-CLARIFIED')
      optionEffects.push({
        type: 'adjustMetric',
        owner: 'chooseSceneOption',
        reasonKey,
        metric: 'elenaPaperConfidence',
        characterId: null,
        delta: index === 0 ? 5 : -5,
      });
    else {
      optionEffects.push({
        type: 'adjustMetric',
        owner: 'chooseSceneOption',
        reasonKey,
        metric: 'trust',
        characterId: 'MR-CHR-GABRIEL',
        delta: index === 0 ? 10 : index === 1 ? 0 : -10,
      });
      optionEffects.push({
        type: 'applyDomainResult',
        owner: 'chooseSceneOption',
        reasonKey: index === 1 ? 'reason.room.limited' : 'reason.room.ready',
        result: {
          kind: 'resolveRoom',
          roomStateId: 'MR-ROOM-FACILITY-QUEUE',
          routeId: `MR-ROOM-FACILITY-QUEUE-GABRIEL-${suffixes[index]}`,
          equipmentState: index === 1 ? 'limited' : 'ready',
        },
      });
    }
    return {
      id: optionId,
      labelKey:
        id === 'MR-SCN-CLARIFIED'
          ? index === 0
            ? 'scene.clarified.choice.start'
            : 'scene.clarified.choice.limit'
          : [
              'optional.gabriel.queue.wait',
              'optional.gabriel.queue.limited',
              'optional.gabriel.queue.press',
            ][index],
      when: emptyConditions,
      effects: optionEffects,
      confirmationKey: null,
      recapKey: sharedRecap
        ? null
        : [
            'optional.gabriel.queue.recapWait',
            'optional.gabriel.queue.recapLimited',
            'optional.gabriel.queue.recapPress',
          ][index],
      closingBeats: [
        {
          id: `MR-BEAT-${prefix}-0${id === 'MR-SCN-CLARIFIED' ? index + 5 : index + 3}`,
          speakerId: id === 'MR-SCN-CLARIFIED' ? 'MR-CHR-ELENA' : 'MR-CHR-GABRIEL',
          textKey: closingKeys[index],
          choiceId: null,
          locationId: null,
        },
      ],
    };
  });
  const baseBeats =
    id === 'MR-SCN-CLARIFIED'
      ? [
          {
            id: 'MR-BEAT-CLARIFIED-01',
            speakerId: 'MR-SPK-INTERNAL',
            textKey: 'scene.clarified.internal.opening',
            choiceId: null,
            locationId: null,
          },
          {
            id: 'MR-BEAT-CLARIFIED-02',
            speakerId: 'MR-CHR-ELENA',
            textKey: 'scene.clarified.elena.opening',
            choiceId: null,
            locationId: null,
          },
          {
            id: 'MR-BEAT-CLARIFIED-03',
            speakerId: 'MR-CHR-ELENA',
            textKey: 'scene.clarified.elena.request',
            choiceId: null,
            locationId: null,
          },
          {
            id: 'MR-BEAT-CLARIFIED-04',
            speakerId: null,
            textKey: null,
            choiceId,
            locationId: null,
          },
        ]
      : [
          {
            id: 'MR-BEAT-GABRIEL-QUEUE-01',
            speakerId: 'MR-CHR-GABRIEL',
            textKey: 'optional.gabriel.queue.opening',
            choiceId: null,
            locationId: null,
          },
          {
            id: 'MR-BEAT-GABRIEL-QUEUE-02',
            speakerId: null,
            textKey: null,
            choiceId,
            locationId: null,
          },
        ];
  const completionEffects =
    id === 'MR-SCN-CLARIFIED'
      ? [
          {
            type: 'applyDomainResult',
            owner: 'chooseSceneOption',
            reasonKey: 'reason.pi.openingChoice',
            result: { kind: 'activateTask', taskId: 'MR-TASK-LASER-SHAM' },
          },
          {
            type: 'applyDomainResult',
            owner: 'chooseSceneOption',
            reasonKey: 'reason.pi.openingChoice',
            result: { kind: 'recordPrimary', recordId: 'MR-REC-PROJECT-NOTEBOOK' },
          },
        ]
      : [];
  return item({
    id,
    type: 'scene',
    availability: available,
    eventId,
    locationIds:
      id === 'MR-SCN-CLARIFIED'
        ? ['MR-LOC-TISSUE-CULTURE', 'MR-LOC-MAIN-LAB', 'MR-LOC-PI-OFFICE', 'MR-LOC-SHARED-DESKS']
        : ['MR-LOC-FACILITY'],
    cue: null,
    mandatory: id === 'MR-SCN-CLARIFIED',
    baseForm: { id: `MR-FORM-${prefix}-BASE`, when: emptyConditions, beats: baseBeats },
    conditionalForm: null,
    choices: [{ id: choiceId, options, recapKey: null }],
    periodEffect: 0,
    completionEffects,
    closingBeats:
      id === 'MR-SCN-CLARIFIED'
        ? [
            {
              id: 'MR-BEAT-CLARIFIED-07',
              speakerId: 'MR-SPK-INTERNAL',
              textKey: 'scene.clarified.internal.close',
              choiceId: null,
              locationId: null,
            },
          ]
        : [],
    recapKey: sharedRecap ? 'scene.clarified.recap' : null,
  });
};

export const contentFamiliesFixture = (): Readonly<
  Record<ContentFamily, readonly BuiltContentItem[]>
> => {
  const families = {} as Record<ContentFamily, BuiltContentItem[]>;
  for (const family of CONTENT_FAMILIES) families[family] = [];
  const characterData: Readonly<Record<string, readonly [string, string, string]>> = {
    'MR-CHR-CAMILA': ['character.camila.name', 'character.camila.role', 'remote'],
    'MR-CHR-ELENA': ['character.elena.name', 'character.elena.role', 'physical'],
    'MR-CHR-GABRIEL': ['character.gabriel.name', 'character.gabriel.role', 'physical'],
    'MR-CHR-HAORAN': ['character.haoran.name', 'character.haoran.role', 'physical'],
    'MR-CHR-SAMIRA': ['character.samira.name', 'character.samira.role', 'physical'],
  };
  families.characters = Object.entries(characterData).map(([id, [nameKey, roleKey, presence]]) =>
    item({ id, type: 'character', nameKey, roleKey, presence, speakerId: id, relationshipId: id }),
  );
  const roomTypes = [
    'breakRoom',
    'corridor',
    'exitVestibule',
    'facility',
    'imaging',
    'mainLab',
    'piOffice',
    'sharedDesks',
    'southCorridor',
    'tissueCulture',
  ];
  const locationKeys = [
    'breakRoom',
    'corridor',
    'exitVestibule',
    'facility',
    'imaging',
    'mainLab',
    'piOffice',
    'sharedDesks',
    'southCorridor',
    'tissueCulture',
  ];
  families.locations = SLICE_SELECTIONS.locations.map((id, index) =>
    item({
      id,
      type: 'location',
      nameKey: `location.${locationKeys[index]}.name`,
      roomType: roomTypes[index],
      cueRoles: [],
      mappingKey: id,
    }),
  );
  families.actions = Object.entries(actionRows).map(
    ([id, [command, workClass, periodCost, baseEnergyCost, labelKey, forecastKey, reasonKeys]]) =>
      item({
        id,
        type: 'action',
        labelKey,
        workClass,
        periodCost,
        baseEnergyCost,
        command,
        forecastKey,
        reasonKeys,
      }),
  );
  const optionSpecs = [
    [
      'GOAL-REPLICATION',
      'goal',
      'experiment.goal.replication',
      'MR-EXP-LASER-SHAM-GOAL-REPLICATION',
    ],
    ['CONTROL-MATCHED', 'control', 'science.controlMatched', 'matched'],
    ['CONTROL-LIMITED', 'control', 'science.controlLimited', 'limited'],
    ['OBSERVATION-STRUCTURE', 'observation', 'experiment.observation.structure', 'structure'],
    ['OBSERVATION-RHYTHM', 'observation', 'experiment.observation.rhythm', 'rhythm'],
    ['OBSERVATION-PAIRED', 'observation', 'experiment.observation.paired', 'paired'],
    ['SAMPLE-STABLE', 'sample', 'experiment.sample.stable', 'stable'],
    ['SAMPLE-STRESSED', 'sample', 'experiment.sample.stressed', 'stressed'],
    ['SAMPLE-FAILING', 'sample', 'experiment.sample.failing', 'failing'],
    ['EQUIPMENT-READY', 'equipment', 'experiment.equipment.ready', 'ready'],
    ['EQUIPMENT-LIMITED', 'equipment', 'experiment.equipment.limited', 'limited'],
    ['EQUIPMENT-UNAVAILABLE', 'equipment', 'experiment.equipment.unavailable', 'unavailable'],
    ['FAMILY-BASELINE', 'familyChoice', 'experiment.laserSham.family.baseline', 'baseline'],
    ['FAMILY-HIGHER-RISK', 'familyChoice', 'experiment.laserSham.family.higherRisk', 'higherRisk'],
  ] as const;
  families.experiments = [
    item({
      id: 'MR-EXP-LASER-SHAM',
      type: 'experiment',
      availability: available,
      family: 'laserSham',
      labelKey: 'experiment.laserSham',
      questionKeys: {
        baseline: 'experiment.laserSham.question.baseline',
        higherRisk: 'experiment.laserSham.question.higherRisk',
      },
      pairedLimitForecastKey: 'forecast.laserPairedLimit',
      maxRuns: 2,
      goalIds: ['MR-EXP-LASER-SHAM-GOAL-REPLICATION'],
      options: optionSpecs.map(([suffix, kind, labelKey, value]) => ({
        id: `MR-EXP-LASER-SHAM-${suffix}`,
        kind,
        labelKey,
        value,
      })),
      stageActions: {
        configure: 'MR-ACT-SAMPLE-CONFIGURE',
        start: 'MR-ACT-START-FOCUSED',
        monitor: 'MR-ACT-MONITOR-ROUTINE',
        qualityMonitor: 'MR-ACT-MONITOR-QUALITY',
        stabilize: 'MR-ACT-MONITOR-QUALITY',
        stop: 'MR-ACT-MONITOR-ROUTINE',
        analyse: 'MR-ACT-ANALYSE',
      },
      monitoringOffsets: [{ first: 0, last: 1 }],
      recordId: 'MR-REC-LASER-SHAM',
      evidenceIdPattern: 'evidence:run:<templateId>:<runNumber>',
      scienceDefinitionIds: Object.keys(scienceRows),
      biologicalResults: [
        { id: 'MR-EXP-LASER-SHAM-RESULT-STRONG', value: 'strong' },
        { id: 'MR-EXP-LASER-SHAM-RESULT-LIMITED', value: 'limited' },
        { id: 'MR-EXP-LASER-SHAM-RESULT-WEAK', value: 'weak' },
      ],
      outcomes: createExpectedLaserOutcomes(),
    }),
  ];
  const claims = [
    'MR-UI-SLICE-REHEARSAL-CLAIM-CAREFUL',
    'MR-UI-SLICE-REHEARSAL-CLAIM-INFLATED',
    'MR-UI-SLICE-REHEARSAL-CLAIM-STRONG',
  ];
  families.tasks = [
    item({
      id: 'MR-SLICE-CLAIM-REHEARSAL',
      type: 'sliceRehearsal',
      availability: available,
      labelKey: 'ui.slice.rehearsal',
      command: 'commitInitialManuscript',
      actionId: 'MR-ACT-SLICE-CLAIM-REHEARSAL',
      allowedClaimIds: claims,
      experimentId: 'MR-EXP-LASER-SHAM',
      completionId: 'MR-UI-SLICE-COMPLETE',
      activeRequestId: null,
    }),
    item({
      id: 'MR-TASK-LASER-SHAM',
      type: 'experimentMilestone',
      availability: available,
      labelKey: 'task.laserSham',
      command: 'analyseExperiment',
      experiment: ref('experiments', 'MR-EXP-LASER-SHAM'),
      completion: { kind: 'firstSuccessfulAnalysis', record: ref('records', 'MR-REC-LASER-SHAM') },
      resultRefs: [ref('records', 'MR-REC-LASER-SHAM')],
      activeRequestId: null,
    }),
  ];
  const route = (kind: string, id: string, extra: Record<string, unknown>) => ({
    kind,
    id,
    labelKey:
      kind === 'sceneResolve'
        ? null
        : id.endsWith('GABRIEL')
          ? 'room.route.gabriel'
          : id.endsWith('WAIT')
            ? 'room.route.wait'
            : 'room.route.limited',
    when: emptyConditions,
    actionId: id.endsWith('-WAIT') && kind === 'directResolve' ? 'MR-ACT-ROOM-WAIT' : null,
    resultReasonKey:
      kind === 'openScene'
        ? null
        : id.includes('LIMITED')
          ? 'reason.room.limited'
          : 'reason.room.ready',
    ...extra,
    effects: [],
  });
  const ready = { equipmentState: 'ready', controlKind: 'matched', observationCoverage: 'full' },
    limited = { equipmentState: 'limited', controlKind: 'limited', observationCoverage: 'limited' };
  families.roomStates = [
    item({
      id: 'MR-ROOM-FACILITY-QUEUE',
      type: 'roomState',
      availability: available,
      locationId: 'MR-LOC-FACILITY',
      affectedExperimentIds: ['MR-EXP-LASER-SHAM'],
      activationEventId: 'MR-EVT-FACILITY-QUEUE',
      forecastKey: 'room.facilityQueue.forecast',
      routes: [
        route('directResolve', 'MR-ROOM-FACILITY-QUEUE-WAIT', { result: ready }),
        route('directResolve', 'MR-ROOM-FACILITY-QUEUE-LIMITED', { result: limited }),
        route('openScene', 'MR-ROOM-FACILITY-QUEUE-GABRIEL', { eventId: 'MR-EVT-GABRIEL-QUEUE' }),
        route('sceneResolve', 'MR-ROOM-FACILITY-QUEUE-GABRIEL-WAIT', {
          trigger: { eventId: 'MR-EVT-GABRIEL-QUEUE', optionId: 'MR-CHO-GABRIEL-QUEUE-WAIT' },
          result: ready,
        }),
        route('sceneResolve', 'MR-ROOM-FACILITY-QUEUE-GABRIEL-LIMITED', {
          trigger: { eventId: 'MR-EVT-GABRIEL-QUEUE', optionId: 'MR-CHO-GABRIEL-QUEUE-LIMITED' },
          result: limited,
        }),
        route('sceneResolve', 'MR-ROOM-FACILITY-QUEUE-GABRIEL-PRESS', {
          trigger: { eventId: 'MR-EVT-GABRIEL-QUEUE', optionId: 'MR-CHO-GABRIEL-QUEUE-PRESS' },
          result: ready,
        }),
      ],
      expiryRouteId: 'MR-ROOM-FACILITY-QUEUE-LIMITED',
    }),
  ];
  const event = (
    id: string,
    delivery: unknown,
    status = 'required',
    priority = 'mandatoryContent',
    cue: unknown = null,
    fallback: unknown = null,
  ) =>
    item({
      id,
      type: 'event',
      availability: available,
      status,
      priority,
      authoredOrder: 0,
      delivery,
      cue,
      fallback,
      threadId: null,
      effects: [],
    });
  families.events = [
    event('MR-EVT-CLARIFIED', { kind: 'scene', target: ref('scenes', 'MR-SCN-CLARIFIED') }),
    event(
      'MR-EVT-FACILITY-QUEUE',
      {
        kind: 'transition',
        target: { kind: 'activateRoom', roomState: ref('roomStates', 'MR-ROOM-FACILITY-QUEUE') },
      },
      'required',
      'automaticTransition',
    ),
    event(
      'MR-EVT-GABRIEL-QUEUE',
      { kind: 'scene', target: ref('scenes', 'MR-OPT-GABRIEL-QUEUE') },
      'optional',
      'optionalContent',
      {
        id: 'MR-CUE-GABRIEL-QUEUE',
        locationId: 'MR-LOC-FACILITY',
        interfaceId: 'MR-UI-CUE-OPTIONAL',
        audioId: null,
      },
      {
        kind: 'transition',
        target: {
          kind: 'resolveRoom',
          route: {
            owner: ref('roomStates', 'MR-ROOM-FACILITY-QUEUE'),
            id: 'MR-ROOM-FACILITY-QUEUE-LIMITED',
          },
        },
      },
    ),
  ];
  families.scenes = [
    scene('MR-OPT-GABRIEL-QUEUE', 'MR-EVT-GABRIEL-QUEUE', 3, false),
    scene('MR-SCN-CLARIFIED', 'MR-EVT-CLARIFIED', 2, true),
  ];
  families.records = [
    item({
      id: 'MR-REC-LASER-SHAM',
      type: 'experiment',
      availability: available,
      titleKey: 'record.laserSham.title',
      source: ref('experiments', 'MR-EXP-LASER-SHAM'),
      selection: {
        kind: 'laserOutcomeRow',
        experimentId: 'MR-EXP-LASER-SHAM',
        allowedBodyKeys: [
          'record.laserSham.limitedPaired',
          'record.laserSham.limitedRhythm',
          'record.laserSham.limitedStructure',
          'record.laserSham.strong',
          'record.laserSham.strongRhythm',
          'record.laserSham.strongStructure',
          'record.laserSham.weak',
        ],
      },
      repeatNoteKeys: [],
    }),
    item({
      id: 'MR-REC-PROJECT-NOTEBOOK',
      type: 'notebook',
      availability: available,
      titleKey: 'record.projectNotebook.title',
      baseForm: {
        id: 'MR-FORM-PROJECT-NOTEBOOK-BASE',
        when: emptyConditions,
        bodyKeys: ['record.projectNotebook.body'],
      },
      source: ref('scenes', 'MR-SCN-CLARIFIED'),
      selection: 'onCreation',
      repeatNoteKeys: [],
    }),
  ];
  families.tutorials = Object.entries(tutorialRows).map(
    ([id, [eventName, headingKey, bodyKey, inputActions]]) =>
      item({
        id,
        type: 'tutorial',
        availability: available,
        trigger: { kind: 'firstSemanticEvent', event: eventName },
        headingKey,
        bodyKey,
        acknowledgement: 'dismissible',
        inputActions,
      }),
  );
  const requirementDefinitions = [
    ['SUPPORTED-FIGURE', 'supportedFigure'],
    ['RELEVANT-CONTROL', 'relevantControl'],
    ['DISTINCT-FIGURES', 'distinctExperimentFigures'],
    ['STRUCTURE-COVERAGE', 'structureCoverage'],
    ['RHYTHM-COVERAGE', 'rhythmCoverage'],
    ['MATCHED-CONTROL', 'matchedControl'],
    ['CAVEAT', 'caveat'],
    ['ASSOCIATION-SUPPORT', 'associationSupport'],
    ['CAUSAL-SUPPORT', 'causalSupport'],
  ] as const;
  const claimDefinitions = [
    ['CAREFUL', 'careful'],
    ['STRONG', 'strong'],
    ['INFLATED', 'inflated'],
  ] as const;
  const definitions = [
    ...claimDefinitions.map(([suffix, value]) => ({
      id: `MR-UI-SLICE-REHEARSAL-CLAIM-${suffix}`,
      kind: 'claim',
      value,
      labelKey: `manuscript.claim.${value}`,
    })),
    ...requirementDefinitions.map(([suffix, value]) => ({
      id: `MR-UI-SLICE-REHEARSAL-REQ-${suffix}`,
      kind: 'requirement',
      value,
      labelKey: `manuscript.requirement.${value}`,
    })),
  ];
  const interfacePurposes: Readonly<Record<string, string>> = {
    'MR-UI-ACTION-WARNING': 'confirmation',
    'MR-UI-CONTENT-INVALID': 'contentInvalid',
    'MR-UI-CUE-ATTENTION': 'availabilityCue',
    'MR-UI-CUE-OPTIONAL': 'availabilityCue',
    'MR-UI-MENU-CONTINUE': 'menuContinue',
    'MR-UI-MENU-NEW': 'menuNewGame',
    'MR-UI-MENU-SAVEQUIT': 'menuSaveQuit',
    'MR-UI-REPLACE-SAVE': 'replaceSave',
    'MR-UI-SAVE-FAILURE': 'saveFailure',
    'MR-UI-SAVE-RECOVERY': 'saveRecovery',
    'MR-UI-SAVE-RESET': 'saveReset',
    'MR-UI-SAVE-SUCCESS': 'saveSuccess',
    'MR-UI-SLICE-COMPLETE': 'sliceComplete',
    'MR-UI-SLICE-REHEARSAL': 'sliceRehearsal',
  };
  const ordinaryInterfaceIds = SLICE_SELECTIONS.interface.filter((id) => id.startsWith('MR-UI-'));
  families.interface = [
    ...Object.entries(scienceRows).map(([id, [kind, meaning, labelKey]]) =>
      item({ id, type: 'scienceDefinition', kind, meaning, labelKey }),
    ),
    ...ordinaryInterfaceIds.map((id) =>
      item({
        id,
        type: 'interface',
        availability: available,
        purpose: interfacePurposes[id],
        textKeys: INTERFACE_TEXT_KEYS[id],
        confirmation:
          id === 'MR-UI-REPLACE-SAVE' || id === 'MR-UI-SLICE-REHEARSAL' ? 'required' : 'none',
        dynamicFields: [],
        definitions: id === 'MR-UI-SLICE-REHEARSAL' ? definitions : [],
      }),
    ),
  ].sort((a, b) => a.id.localeCompare(b.id));
  const audioMeaning = (id: string): string =>
    id === 'MR-MUS-01'
      ? 'audio.music.openingPulse'
      : id === 'MR-AUD-CUE-ATTENTION'
        ? 'audio.cue.attention'
        : id.startsWith('MR-AUD-EL-')
          ? `audio.elena.role${id.slice(-2)}`
          : id.startsWith('MR-AUD-GA-')
            ? `audio.gabriel.role${id.slice(-2)}`
            : `audio.amb.${({ BREAK: 'break', CORRIDOR: 'corridor', CULTURE: 'culture', DESKS: 'desks', EXIT: 'exit', IMAGING: 'imaging', LAB: 'lab', PI: 'pi' } as Record<string, string>)[id.split('-').at(-1)!]}`;
  families.audio = SLICE_SELECTIONS.audio.map((id) =>
    item({
      id,
      type: 'audioRole',
      role:
        id === 'MR-MUS-01'
          ? 'music'
          : id === 'MR-AUD-CUE-ATTENTION'
            ? 'requiredCue'
            : id.includes('-EL-') || id.includes('-GA-')
              ? 'dialogue'
              : 'ambience',
      meaningKey: audioMeaning(id),
      visibleDuplicate:
        id === 'MR-AUD-CUE-ATTENTION'
          ? 'experimentAttentionState'
          : id.includes('-EL-') || id.includes('-GA-')
            ? 'dialogueText'
            : 'none',
    }),
  );
  return families;
};

export const builtContentFixture = (): BuiltContentPackage => {
  const families = contentFamiliesFixture();
  const expectedCounts = Object.fromEntries(
    CONTENT_FAMILIES.map((family) => [family, families[family].length]),
  ) as BuiltContentPackage['metadata']['expectedCounts'];
  const strings = Object.fromEntries(SLICE_STRING_KEYS.map((key) => [key, `Text for ${key}.`]));
  return {
    metadata: {
      packageId: 'minor-revisions-content',
      schemaVersion: 1,
      contentVersion: '1.1.0',
      language: 'en',
      profileId: 'slice',
      compatibleEarlierVersions: [],
      expectedCounts,
    },
    families,
    strings,
  };
};

export const rawSourceFixture = (): RawSourceFiles => {
  const built = builtContentFixture();
  const trace = { requirementIds: ['MR-REQ-CONTENT-001'], testIds: ['MR-TEST-CONT-001'] };
  const dataPaths: Readonly<Record<ContentFamily, string>> = {
    characters: 'content/data/characters.json',
    locations: 'content/data/locations.json',
    actions: 'content/data/actions.json',
    experiments: 'content/data/experiments.json',
    tasks: 'content/data/tasks.json',
    roomStates: 'content/data/room-states.json',
    events: 'content/data/events.json',
    scenes: 'content/data/scenes.json',
    messages: 'content/data/messages.json',
    notifications: 'content/data/notifications.json',
    records: 'content/data/records.json',
    endings: 'content/data/endings.json',
    citations: 'content/data/citations.json',
    environmentalItems: 'content/data/environmental-items.json',
    contextualLines: 'content/data/contextual-lines.json',
    tutorials: 'content/data/tutorials.json',
    interface: 'content/data/interface.json',
    audio: 'content/data/audio.json',
  };
  const encode = (value: unknown) =>
    new TextEncoder().encode(`${JSON.stringify(value, null, 2)}\n`);
  const files = new Map<string, Uint8Array>();
  const dataFiles = CONTENT_FAMILIES.map((family) => dataPaths[family]);
  files.set(
    'content/manifest.json',
    encode({
      packageId: 'minor-revisions-content',
      schemaVersion: 1,
      contentVersion: '1.1.0',
      language: 'en',
      dataFiles,
      stringsFile: 'content/strings.en.json',
      profileFiles: [
        'content/profiles/full.json',
        'content/profiles/fallback.json',
        'content/profiles/slice.json',
      ],
      compatibleEarlierVersions: [],
    }),
  );
  for (const family of CONTENT_FAMILIES)
    files.set(
      dataPaths[family],
      encode({
        schemaVersion: 1,
        family,
        items: built.families[family].map((entry) => ({ ...entry, trace })),
      }),
    );
  files.set('content/strings.en.json', encode(built.strings));
  const empty = Object.fromEntries(CONTENT_FAMILIES.map((family) => [family, []]));
  const zero = Object.fromEntries(CONTENT_FAMILIES.map((family) => [family, 0]));
  for (const id of ['full', 'fallback'] as const)
    files.set(
      `content/profiles/${id}.json`,
      encode({
        schemaVersion: 1,
        id,
        implementationStatus: 'incomplete',
        campaignMode: 'campaign',
        selections: empty,
        replacements: [],
        expectedCounts: zero,
        sliceCompletionId: null,
      }),
    );
  files.set(
    'content/profiles/slice.json',
    encode({
      schemaVersion: 1,
      id: 'slice',
      implementationStatus: 'complete',
      campaignMode: 'evaluationSlice',
      selections: SLICE_SELECTIONS,
      replacements: [],
      expectedCounts: built.metadata.expectedCounts,
      sliceCompletionId: 'MR-UI-SLICE-COMPLETE',
    }),
  );
  return files;
};
