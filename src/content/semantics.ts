import type {
  AuthoredContentItem,
  BuiltContentItem,
  ContentFamily,
  ContentIssue,
  LaserOutcomeRow,
} from './types.ts';
import { CONTENT_FAMILIES } from './types.ts';
import { INTERFACE_TEXT_KEYS } from './profiles.ts';

type AnyItem = AuthoredContentItem | BuiltContentItem;
type RecordValue = Record<string, unknown>;
const data = (value: object): RecordValue => value as RecordValue;
const contentIssue = (
  file: string,
  path: string,
  id: string | null,
  code: ContentIssue['code'] = 'invariantFailure',
): ContentIssue => ({ code, file, path, idOrKey: id });

const science = new Map<string, readonly [string, string, string]>([
  ['MR-STRUCTURE-RECOVERY', ['structure', 'recovery', 'science.structureRecovery']],
  ['MR-STRUCTURE-PARTIAL', ['structure', 'partial', 'science.structurePartial']],
  ['MR-STRUCTURE-NONE', ['structure', 'none', 'science.structureNone']],
  ['MR-STRUCTURE-UNOBSERVED', ['structure', 'unobserved', 'science.structureUnobserved']],
  ['MR-RHYTHM-RECOVERY', ['rhythm', 'recovery', 'science.rhythmRecovery']],
  ['MR-RHYTHM-PARTIAL', ['rhythm', 'partial', 'science.rhythmPartial']],
  ['MR-RHYTHM-NONE', ['rhythm', 'none', 'science.rhythmNone']],
  ['MR-RHYTHM-UNOBSERVED', ['rhythm', 'unobserved', 'science.rhythmUnobserved']],
  [
    'MR-REPATTERNING-TRACKS-RECOVERY',
    ['repatterning', 'tracksRecovery', 'science.repatterningTracksRecovery'],
  ],
  [
    'MR-REPATTERNING-NO-ASSOCIATION',
    ['repatterning', 'noAssociation', 'science.repatterningNoAssociation'],
  ],
  ['MR-REPATTERNING-UNOBSERVED', ['repatterning', 'unobserved', 'science.repatterningUnobserved']],
  ['MR-CONTROL-MATCHED', ['control', 'matched', 'science.controlMatched']],
  ['MR-CONTROL-LIMITED', ['control', 'limited', 'science.controlLimited']],
  ['MR-READING-RECOVERY', ['reading', 'recovery', 'science.readingRecovery']],
  ['MR-READING-ASSOCIATION', ['reading', 'association', 'science.readingAssociation']],
  ['MR-READING-NO-RECOVERY', ['reading', 'noRecovery', 'science.readingNoRecovery']],
  ['MR-READING-UNRESOLVED', ['reading', 'unresolved', 'science.readingUnresolved']],
  ['MR-CAVEAT-CONDITION', ['caveat', 'condition', 'science.caveatCondition']],
  ['MR-CAVEAT-ASSOCIATION', ['caveat', 'association', 'science.caveatAssociation']],
  ['MR-CAVEAT-PROCESS', ['caveat', 'process', 'science.caveatProcess']],
]);

const BIOLOGICAL_IDS: Readonly<Record<'strong' | 'limited' | 'weak', string>> = {
  strong: 'MR-EXP-LASER-SHAM-RESULT-STRONG',
  limited: 'MR-EXP-LASER-SHAM-RESULT-LIMITED',
  weak: 'MR-EXP-LASER-SHAM-RESULT-WEAK',
};

export const createExpectedLaserOutcomes = (): readonly LaserOutcomeRow[] => {
  const rows: LaserOutcomeRow[] = [];
  for (const familyChoice of ['baseline', 'higherRisk'] as const)
    for (const biologicalResult of ['strong', 'limited', 'weak'] as const)
      for (const observation of ['structure', 'rhythm', 'paired'] as const)
        for (const access of ['readyMatched', 'limitedRoute'] as const)
          for (const monitoringResponse of [
            'continue',
            'qualityCheck',
            'stabilize',
            'missed',
          ] as const) {
            const reliable = biologicalResult !== 'weak';
            const full =
              access === 'readyMatched' &&
              (observation === 'paired'
                ? monitoringResponse === 'qualityCheck'
                : monitoringResponse !== 'missed');
            const keepStructure = observation === 'structure' || observation === 'paired';
            const keepRhythm = observation === 'rhythm' || (observation === 'paired' && full);
            const structureId =
              !reliable || !keepStructure
                ? 'MR-STRUCTURE-UNOBSERVED'
                : biologicalResult === 'strong'
                  ? 'MR-STRUCTURE-RECOVERY'
                  : 'MR-STRUCTURE-PARTIAL';
            const rhythmId =
              !reliable || !keepRhythm
                ? 'MR-RHYTHM-UNOBSERVED'
                : biologicalResult === 'strong'
                  ? 'MR-RHYTHM-RECOVERY'
                  : 'MR-RHYTHM-NONE';
            let bodyKey = 'record.laserSham.weak';
            if (biologicalResult === 'strong')
              bodyKey = keepRhythm
                ? 'record.laserSham.strong'
                : keepStructure
                  ? 'record.laserSham.strongStructure'
                  : 'record.laserSham.strongRhythm';
            if (biologicalResult === 'limited')
              bodyKey =
                keepRhythm && keepStructure
                  ? 'record.laserSham.limitedPaired'
                  : keepStructure
                    ? 'record.laserSham.limitedStructure'
                    : 'record.laserSham.limitedRhythm';
            rows.push({
              familyChoice,
              biologicalResult,
              observation,
              access,
              monitoringResponse,
              biologicalResultId: BIOLOGICAL_IDS[biologicalResult],
              structureId,
              rhythmId,
              repatterningId: 'MR-REPATTERNING-UNOBSERVED',
              controlId: access === 'readyMatched' ? 'MR-CONTROL-MATCHED' : 'MR-CONTROL-LIMITED',
              observationCoverage: full ? 'full' : 'limited',
              bodyKey,
            });
          }
  return rows;
};

const ACTIONS: Readonly<
  Record<string, readonly [string, string, number, number, string, string, readonly string[]]>
> = {
  'MR-ACT-SAMPLE-CONFIGURE': [
    'configureExperiment',
    'light',
    0,
    0,
    'action.sampleConfigure.label',
    'forecast.sampleConfigure',
    ['reason.band.choice', 'reason.band.equipment', 'reason.band.sample'],
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
  'MR-ACT-MONITOR-ROUTINE': [
    'respondToMonitoring',
    'light',
    1,
    0,
    'action.monitorRoutine.label',
    'forecast.monitorRoutine',
    ['reason.band.monitor', 'reason.time.action'],
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
  'MR-ACT-SLICE-CLAIM-REHEARSAL': [
    'commitInitialManuscript',
    'focused',
    1,
    1,
    'ui.slice.rehearsal',
    'ui.slice.rehearsalForecast',
    ['reason.energy.work', 'reason.paper.commit', 'reason.time.action'],
  ],
};

const TUTORIALS: Readonly<Record<string, readonly [string, string, string, readonly string[]]>> = {
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

const CHARACTERS: Readonly<
  Record<string, readonly [string, string, string, string, string | null]>
> = {
  'MR-CHR-CAMILA': [
    'character.camila.name',
    'character.camila.role',
    'remote',
    'MR-CHR-CAMILA',
    'MR-CHR-CAMILA',
  ],
  'MR-CHR-ELENA': [
    'character.elena.name',
    'character.elena.role',
    'physical',
    'MR-CHR-ELENA',
    'MR-CHR-ELENA',
  ],
  'MR-CHR-GABRIEL': [
    'character.gabriel.name',
    'character.gabriel.role',
    'physical',
    'MR-CHR-GABRIEL',
    'MR-CHR-GABRIEL',
  ],
  'MR-CHR-HAORAN': [
    'character.haoran.name',
    'character.haoran.role',
    'physical',
    'MR-CHR-HAORAN',
    'MR-CHR-HAORAN',
  ],
  'MR-CHR-SAMIRA': [
    'character.samira.name',
    'character.samira.role',
    'physical',
    'MR-CHR-SAMIRA',
    'MR-CHR-SAMIRA',
  ],
};
const LOCATIONS: Readonly<Record<string, readonly [string, string, readonly string[]]>> = {
  'MR-LOC-BREAK-ROOM': ['location.breakRoom.name', 'breakRoom', []],
  'MR-LOC-CORRIDOR': ['location.corridor.name', 'corridor', []],
  'MR-LOC-EXIT-VESTIBULE': ['location.exitVestibule.name', 'exitVestibule', []],
  'MR-LOC-FACILITY': ['location.facility.name', 'facility', []],
  'MR-LOC-IMAGING': ['location.imaging.name', 'imaging', []],
  'MR-LOC-MAIN-LAB': ['location.mainLab.name', 'mainLab', []],
  'MR-LOC-PI-OFFICE': ['location.piOffice.name', 'piOffice', []],
  'MR-LOC-SHARED-DESKS': ['location.sharedDesks.name', 'sharedDesks', []],
  'MR-LOC-SOUTH-CORRIDOR': ['location.southCorridor.name', 'southCorridor', []],
  'MR-LOC-TISSUE-CULTURE': ['location.tissueCulture.name', 'tissueCulture', []],
};
const INTERFACE_PURPOSES: Readonly<Record<string, string>> = {
  'MR-UI-MENU-CONTINUE': 'menuContinue',
  'MR-UI-MENU-NEW': 'menuNewGame',
  'MR-UI-MENU-SAVEQUIT': 'menuSaveQuit',
  'MR-UI-REPLACE-SAVE': 'replaceSave',
  'MR-UI-SAVE-SUCCESS': 'saveSuccess',
  'MR-UI-SAVE-FAILURE': 'saveFailure',
  'MR-UI-SAVE-RECOVERY': 'saveRecovery',
  'MR-UI-SAVE-RESET': 'saveReset',
  'MR-UI-ACTION-WARNING': 'confirmation',
  'MR-UI-CONTENT-INVALID': 'contentInvalid',
  'MR-UI-SLICE-REHEARSAL': 'sliceRehearsal',
  'MR-UI-SLICE-COMPLETE': 'sliceComplete',
  'MR-UI-CUE-ATTENTION': 'availabilityCue',
  'MR-UI-CUE-OPTIONAL': 'availabilityCue',
};
const AUDIO_MEANING: Readonly<Record<string, string>> = {
  'MR-AUD-AMB-BREAK': 'audio.amb.break',
  'MR-AUD-AMB-CORRIDOR': 'audio.amb.corridor',
  'MR-AUD-AMB-CULTURE': 'audio.amb.culture',
  'MR-AUD-AMB-DESKS': 'audio.amb.desks',
  'MR-AUD-AMB-EXIT': 'audio.amb.exit',
  'MR-AUD-AMB-IMAGING': 'audio.amb.imaging',
  'MR-AUD-AMB-LAB': 'audio.amb.lab',
  'MR-AUD-AMB-PI': 'audio.amb.pi',
  'MR-AUD-CUE-ATTENTION': 'audio.cue.attention',
  'MR-MUS-01': 'audio.music.openingPulse',
  ...Object.fromEntries(
    Array.from({ length: 8 }, (_, index) => [
      `MR-AUD-EL-0${index + 1}`,
      `audio.elena.role0${index + 1}`,
    ]),
  ),
  ...Object.fromEntries(
    Array.from({ length: 8 }, (_, index) => [
      `MR-AUD-GA-0${index + 1}`,
      `audio.gabriel.role0${index + 1}`,
    ]),
  ),
};
const EXPERIMENT_OPTIONS = [
  {
    id: 'MR-EXP-LASER-SHAM-GOAL-REPLICATION',
    kind: 'goal',
    labelKey: 'experiment.goal.replication',
    value: 'MR-EXP-LASER-SHAM-GOAL-REPLICATION',
  },
  {
    id: 'MR-EXP-LASER-SHAM-CONTROL-MATCHED',
    kind: 'control',
    labelKey: 'science.controlMatched',
    value: 'matched',
  },
  {
    id: 'MR-EXP-LASER-SHAM-CONTROL-LIMITED',
    kind: 'control',
    labelKey: 'science.controlLimited',
    value: 'limited',
  },
  {
    id: 'MR-EXP-LASER-SHAM-OBSERVATION-STRUCTURE',
    kind: 'observation',
    labelKey: 'experiment.observation.structure',
    value: 'structure',
  },
  {
    id: 'MR-EXP-LASER-SHAM-OBSERVATION-RHYTHM',
    kind: 'observation',
    labelKey: 'experiment.observation.rhythm',
    value: 'rhythm',
  },
  {
    id: 'MR-EXP-LASER-SHAM-OBSERVATION-PAIRED',
    kind: 'observation',
    labelKey: 'experiment.observation.paired',
    value: 'paired',
  },
  {
    id: 'MR-EXP-LASER-SHAM-SAMPLE-STABLE',
    kind: 'sample',
    labelKey: 'experiment.sample.stable',
    value: 'stable',
  },
  {
    id: 'MR-EXP-LASER-SHAM-SAMPLE-STRESSED',
    kind: 'sample',
    labelKey: 'experiment.sample.stressed',
    value: 'stressed',
  },
  {
    id: 'MR-EXP-LASER-SHAM-SAMPLE-FAILING',
    kind: 'sample',
    labelKey: 'experiment.sample.failing',
    value: 'failing',
  },
  {
    id: 'MR-EXP-LASER-SHAM-EQUIPMENT-READY',
    kind: 'equipment',
    labelKey: 'experiment.equipment.ready',
    value: 'ready',
  },
  {
    id: 'MR-EXP-LASER-SHAM-EQUIPMENT-LIMITED',
    kind: 'equipment',
    labelKey: 'experiment.equipment.limited',
    value: 'limited',
  },
  {
    id: 'MR-EXP-LASER-SHAM-EQUIPMENT-UNAVAILABLE',
    kind: 'equipment',
    labelKey: 'experiment.equipment.unavailable',
    value: 'unavailable',
  },
  {
    id: 'MR-EXP-LASER-SHAM-FAMILY-BASELINE',
    kind: 'familyChoice',
    labelKey: 'experiment.laserSham.family.baseline',
    value: 'baseline',
  },
  {
    id: 'MR-EXP-LASER-SHAM-FAMILY-HIGHER-RISK',
    kind: 'familyChoice',
    labelKey: 'experiment.laserSham.family.higherRisk',
    value: 'higherRisk',
  },
] as const;
const SELECTED_SCIENCE_IDS = [
  'MR-CAVEAT-ASSOCIATION',
  'MR-CAVEAT-CONDITION',
  'MR-CAVEAT-PROCESS',
  'MR-CONTROL-LIMITED',
  'MR-CONTROL-MATCHED',
  'MR-READING-NO-RECOVERY',
  'MR-READING-RECOVERY',
  'MR-READING-UNRESOLVED',
  'MR-REPATTERNING-UNOBSERVED',
  'MR-RHYTHM-NONE',
  'MR-RHYTHM-RECOVERY',
  'MR-RHYTHM-UNOBSERVED',
  'MR-STRUCTURE-PARTIAL',
  'MR-STRUCTURE-RECOVERY',
  'MR-STRUCTURE-UNOBSERVED',
] as const;
const STAGE_ACTIONS = {
  configure: 'MR-ACT-SAMPLE-CONFIGURE',
  start: 'MR-ACT-START-FOCUSED',
  monitor: 'MR-ACT-MONITOR-ROUTINE',
  qualityMonitor: 'MR-ACT-MONITOR-QUALITY',
  stabilize: 'MR-ACT-MONITOR-QUALITY',
  stop: 'MR-ACT-MONITOR-ROUTINE',
  analyse: 'MR-ACT-ANALYSE',
} as const;

const EMPTY_CONDITIONS = { allOf: [], anyOf: [], noneOf: [] } as const;
const reference = (family: string, id: string) => ({ family, id });
const ownedReference = (family: string, ownerId: string, id: string) => ({
  owner: reference(family, ownerId),
  id,
});
const dialogueBeat = (id: string, speakerId: string, textKey: string) => ({
  id,
  speakerId,
  textKey,
  choiceId: null,
  locationId: null,
});
const choiceBeat = (id: string, choiceId: string) => ({
  id,
  speakerId: null,
  textKey: null,
  choiceId,
  locationId: null,
});
const selectOptionEffect = (
  sceneId: string,
  choiceId: string,
  optionId: string,
  reasonKey: string,
) => ({
  type: 'applyDomainResult',
  owner: 'chooseSceneOption',
  reasonKey,
  result: { kind: 'selectOption', choice: ownedReference('scenes', sceneId, choiceId), optionId },
});
const metricEffect = (
  reasonKey: string,
  metric: string,
  characterId: string | null,
  delta: number,
) => ({
  type: 'adjustMetric',
  owner: 'chooseSceneOption',
  reasonKey,
  metric,
  characterId,
  delta,
});
const resolveRoomEffect = (
  routeId: string,
  equipmentState: 'ready' | 'limited',
  reasonKey: string,
) => ({
  type: 'applyDomainResult',
  owner: 'chooseSceneOption',
  reasonKey,
  result: { kind: 'resolveRoom', roomStateId: 'MR-ROOM-FACILITY-QUEUE', routeId, equipmentState },
});
const clarifiedOption = (
  suffix: 'START' | 'LIMIT',
  delta: 5 | -5,
  beatNumber: 5 | 6,
  textKey: string,
  labelKey: string,
) => {
  const choiceId = 'MR-CHO-CLARIFIED';
  const id = `${choiceId}-${suffix}`;
  return {
    id,
    labelKey,
    when: EMPTY_CONDITIONS,
    effects: [
      selectOptionEffect('MR-SCN-CLARIFIED', choiceId, id, 'reason.pi.openingChoice'),
      metricEffect('reason.pi.openingChoice', 'elenaPaperConfidence', null, delta),
    ],
    confirmationKey: null,
    recapKey: null,
    closingBeats: [dialogueBeat(`MR-BEAT-CLARIFIED-0${beatNumber}`, 'MR-CHR-ELENA', textKey)],
  };
};
const gabrielOption = (
  suffix: 'WAIT' | 'LIMITED' | 'PRESS',
  delta: 10 | 0 | -10,
  beatNumber: 3 | 4 | 5,
  labelKey: string,
  recapKey: string,
  closingKey: string,
  trustReason: string,
  equipmentState: 'ready' | 'limited',
  roomReason: string,
) => {
  const choiceId = 'MR-CHO-GABRIEL-QUEUE';
  const id = `${choiceId}-${suffix}`;
  const routeId = `MR-ROOM-FACILITY-QUEUE-GABRIEL-${suffix}`;
  return {
    id,
    labelKey,
    when: EMPTY_CONDITIONS,
    effects: [
      selectOptionEffect('MR-OPT-GABRIEL-QUEUE', choiceId, id, trustReason),
      metricEffect(trustReason, 'trust', 'MR-CHR-GABRIEL', delta),
      resolveRoomEffect(routeId, equipmentState, roomReason),
    ],
    confirmationKey: null,
    recapKey,
    closingBeats: [
      dialogueBeat(`MR-BEAT-GABRIEL-QUEUE-0${beatNumber}`, 'MR-CHR-GABRIEL', closingKey),
    ],
  };
};
const SCENES: Readonly<Record<string, RecordValue>> = {
  'MR-SCN-CLARIFIED': {
    eventId: 'MR-EVT-CLARIFIED',
    locationIds: [
      'MR-LOC-TISSUE-CULTURE',
      'MR-LOC-MAIN-LAB',
      'MR-LOC-PI-OFFICE',
      'MR-LOC-SHARED-DESKS',
    ],
    cue: null,
    mandatory: true,
    baseForm: {
      id: 'MR-FORM-CLARIFIED-BASE',
      when: EMPTY_CONDITIONS,
      beats: [
        dialogueBeat('MR-BEAT-CLARIFIED-01', 'MR-SPK-INTERNAL', 'scene.clarified.internal.opening'),
        dialogueBeat('MR-BEAT-CLARIFIED-02', 'MR-CHR-ELENA', 'scene.clarified.elena.opening'),
        dialogueBeat('MR-BEAT-CLARIFIED-03', 'MR-CHR-ELENA', 'scene.clarified.elena.request'),
        choiceBeat('MR-BEAT-CLARIFIED-04', 'MR-CHO-CLARIFIED'),
      ],
    },
    conditionalForm: null,
    choices: [
      {
        id: 'MR-CHO-CLARIFIED',
        options: [
          clarifiedOption(
            'START',
            5,
            5,
            'scene.clarified.elena.afterStart',
            'scene.clarified.choice.start',
          ),
          clarifiedOption(
            'LIMIT',
            -5,
            6,
            'scene.clarified.elena.afterLimit',
            'scene.clarified.choice.limit',
          ),
        ],
        recapKey: null,
      },
    ],
    periodEffect: 0,
    completionEffects: [
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
    ],
    closingBeats: [
      dialogueBeat('MR-BEAT-CLARIFIED-07', 'MR-SPK-INTERNAL', 'scene.clarified.internal.close'),
    ],
    recapKey: 'scene.clarified.recap',
  },
  'MR-OPT-GABRIEL-QUEUE': {
    eventId: 'MR-EVT-GABRIEL-QUEUE',
    locationIds: ['MR-LOC-FACILITY'],
    cue: null,
    mandatory: false,
    baseForm: {
      id: 'MR-FORM-GABRIEL-QUEUE-BASE',
      when: EMPTY_CONDITIONS,
      beats: [
        dialogueBeat(
          'MR-BEAT-GABRIEL-QUEUE-01',
          'MR-CHR-GABRIEL',
          'optional.gabriel.queue.opening',
        ),
        choiceBeat('MR-BEAT-GABRIEL-QUEUE-02', 'MR-CHO-GABRIEL-QUEUE'),
      ],
    },
    conditionalForm: null,
    choices: [
      {
        id: 'MR-CHO-GABRIEL-QUEUE',
        options: [
          gabrielOption(
            'WAIT',
            10,
            3,
            'optional.gabriel.queue.wait',
            'optional.gabriel.queue.recapWait',
            'optional.gabriel.queue.closeA',
            'reason.trust.respect',
            'ready',
            'reason.room.ready',
          ),
          gabrielOption(
            'LIMITED',
            0,
            4,
            'optional.gabriel.queue.limited',
            'optional.gabriel.queue.recapLimited',
            'optional.gabriel.queue.closeB',
            'reason.room.limited',
            'limited',
            'reason.room.limited',
          ),
          gabrielOption(
            'PRESS',
            -10,
            5,
            'optional.gabriel.queue.press',
            'optional.gabriel.queue.recapPress',
            'optional.gabriel.queue.closeC',
            'reason.trust.pressure',
            'ready',
            'reason.room.ready',
          ),
        ],
        recapKey: null,
      },
    ],
    periodEffect: 0,
    completionEffects: [],
    closingBeats: [],
    recapKey: null,
  },
};
const exactScene = (item: AnyItem): boolean => {
  const value = data(item);
  const expected = SCENES[item.id];
  if (expected === undefined) return false;
  const actual = Object.fromEntries(Object.keys(expected).map((key) => [key, value[key]]));
  return JSON.stringify(actual) === JSON.stringify(expected);
};

const TASKS: Readonly<Record<string, RecordValue>> = {
  'MR-SLICE-CLAIM-REHEARSAL': {
    labelKey: 'ui.slice.rehearsal',
    command: 'commitInitialManuscript',
    actionId: 'MR-ACT-SLICE-CLAIM-REHEARSAL',
    allowedClaimIds: [
      'MR-UI-SLICE-REHEARSAL-CLAIM-CAREFUL',
      'MR-UI-SLICE-REHEARSAL-CLAIM-INFLATED',
      'MR-UI-SLICE-REHEARSAL-CLAIM-STRONG',
    ],
    experimentId: 'MR-EXP-LASER-SHAM',
    completionId: 'MR-UI-SLICE-COMPLETE',
    activeRequestId: null,
  },
  'MR-TASK-LASER-SHAM': {
    labelKey: 'task.laserSham',
    command: 'analyseExperiment',
    experiment: reference('experiments', 'MR-EXP-LASER-SHAM'),
    completion: {
      kind: 'firstSuccessfulAnalysis',
      record: reference('records', 'MR-REC-LASER-SHAM'),
    },
    resultRefs: [reference('records', 'MR-REC-LASER-SHAM')],
    activeRequestId: null,
  },
};
const READY_RESULT = {
  equipmentState: 'ready',
  controlKind: 'matched',
  observationCoverage: 'full',
} as const;
const LIMITED_RESULT = {
  equipmentState: 'limited',
  controlKind: 'limited',
  observationCoverage: 'limited',
} as const;
const directRoute = (
  id: string,
  labelKey: string,
  actionId: string | null,
  resultReasonKey: string,
  result: object,
) => ({
  kind: 'directResolve',
  id,
  labelKey,
  when: EMPTY_CONDITIONS,
  actionId,
  resultReasonKey,
  result,
  effects: [],
});
const sceneRoute = (id: string, optionId: string, resultReasonKey: string, result: object) => ({
  kind: 'sceneResolve',
  id,
  labelKey: null,
  when: EMPTY_CONDITIONS,
  actionId: null,
  resultReasonKey,
  trigger: { eventId: 'MR-EVT-GABRIEL-QUEUE', optionId },
  result,
  effects: [],
});
const ROOM: RecordValue = {
  locationId: 'MR-LOC-FACILITY',
  affectedExperimentIds: ['MR-EXP-LASER-SHAM'],
  activationEventId: 'MR-EVT-FACILITY-QUEUE',
  forecastKey: 'room.facilityQueue.forecast',
  routes: [
    directRoute(
      'MR-ROOM-FACILITY-QUEUE-WAIT',
      'room.route.wait',
      'MR-ACT-ROOM-WAIT',
      'reason.room.ready',
      READY_RESULT,
    ),
    directRoute(
      'MR-ROOM-FACILITY-QUEUE-LIMITED',
      'room.route.limited',
      null,
      'reason.room.limited',
      LIMITED_RESULT,
    ),
    {
      kind: 'openScene',
      id: 'MR-ROOM-FACILITY-QUEUE-GABRIEL',
      labelKey: 'room.route.gabriel',
      when: EMPTY_CONDITIONS,
      actionId: null,
      resultReasonKey: null,
      eventId: 'MR-EVT-GABRIEL-QUEUE',
      effects: [],
    },
    sceneRoute(
      'MR-ROOM-FACILITY-QUEUE-GABRIEL-WAIT',
      'MR-CHO-GABRIEL-QUEUE-WAIT',
      'reason.room.ready',
      READY_RESULT,
    ),
    sceneRoute(
      'MR-ROOM-FACILITY-QUEUE-GABRIEL-LIMITED',
      'MR-CHO-GABRIEL-QUEUE-LIMITED',
      'reason.room.limited',
      LIMITED_RESULT,
    ),
    sceneRoute(
      'MR-ROOM-FACILITY-QUEUE-GABRIEL-PRESS',
      'MR-CHO-GABRIEL-QUEUE-PRESS',
      'reason.room.ready',
      READY_RESULT,
    ),
  ],
  expiryRouteId: 'MR-ROOM-FACILITY-QUEUE-LIMITED',
};
const EVENTS: Readonly<Record<string, RecordValue>> = {
  'MR-EVT-CLARIFIED': {
    status: 'required',
    priority: 'mandatoryContent',
    authoredOrder: 0,
    delivery: { kind: 'scene', target: reference('scenes', 'MR-SCN-CLARIFIED') },
    cue: null,
    fallback: null,
    threadId: null,
    effects: [],
  },
  'MR-EVT-FACILITY-QUEUE': {
    status: 'required',
    priority: 'automaticTransition',
    authoredOrder: 0,
    delivery: {
      kind: 'transition',
      target: {
        kind: 'activateRoom',
        roomState: reference('roomStates', 'MR-ROOM-FACILITY-QUEUE'),
      },
    },
    cue: null,
    fallback: null,
    threadId: null,
    effects: [],
  },
  'MR-EVT-GABRIEL-QUEUE': {
    status: 'optional',
    priority: 'optionalContent',
    authoredOrder: 0,
    delivery: { kind: 'scene', target: reference('scenes', 'MR-OPT-GABRIEL-QUEUE') },
    cue: {
      id: 'MR-CUE-GABRIEL-QUEUE',
      locationId: 'MR-LOC-FACILITY',
      interfaceId: 'MR-UI-CUE-OPTIONAL',
      audioId: null,
    },
    fallback: {
      kind: 'transition',
      target: {
        kind: 'resolveRoom',
        route: ownedReference(
          'roomStates',
          'MR-ROOM-FACILITY-QUEUE',
          'MR-ROOM-FACILITY-QUEUE-LIMITED',
        ),
      },
    },
    threadId: null,
    effects: [],
  },
};
const RECORDS: Readonly<Record<string, RecordValue>> = {
  'MR-REC-LASER-SHAM': {
    titleKey: 'record.laserSham.title',
    source: reference('experiments', 'MR-EXP-LASER-SHAM'),
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
  },
  'MR-REC-PROJECT-NOTEBOOK': {
    titleKey: 'record.projectNotebook.title',
    baseForm: {
      id: 'MR-FORM-PROJECT-NOTEBOOK-BASE',
      when: EMPTY_CONDITIONS,
      bodyKeys: ['record.projectNotebook.body'],
    },
    source: reference('scenes', 'MR-SCN-CLARIFIED'),
    selection: 'onCreation',
    repeatNoteKeys: [],
  },
};
const REHEARSAL_DEFINITIONS = [
  {
    id: 'MR-UI-SLICE-REHEARSAL-CLAIM-CAREFUL',
    kind: 'claim',
    value: 'careful',
    labelKey: 'manuscript.claim.careful',
  },
  {
    id: 'MR-UI-SLICE-REHEARSAL-CLAIM-STRONG',
    kind: 'claim',
    value: 'strong',
    labelKey: 'manuscript.claim.strong',
  },
  {
    id: 'MR-UI-SLICE-REHEARSAL-CLAIM-INFLATED',
    kind: 'claim',
    value: 'inflated',
    labelKey: 'manuscript.claim.inflated',
  },
  ...(
    [
      ['SUPPORTED-FIGURE', 'supportedFigure'],
      ['RELEVANT-CONTROL', 'relevantControl'],
      ['DISTINCT-FIGURES', 'distinctExperimentFigures'],
      ['STRUCTURE-COVERAGE', 'structureCoverage'],
      ['RHYTHM-COVERAGE', 'rhythmCoverage'],
      ['MATCHED-CONTROL', 'matchedControl'],
      ['CAVEAT', 'caveat'],
      ['ASSOCIATION-SUPPORT', 'associationSupport'],
      ['CAUSAL-SUPPORT', 'causalSupport'],
    ] as const
  ).map(([suffix, value]) => ({
    id: `MR-UI-SLICE-REHEARSAL-REQ-${suffix}`,
    kind: 'requirement',
    value,
    labelKey: `manuscript.requirement.${value}`,
  })),
];

const exactFields = (value: RecordValue, expected: RecordValue): boolean =>
  JSON.stringify(Object.fromEntries(Object.keys(expected).map((key) => [key, value[key]]))) ===
  JSON.stringify(expected);

const nestedIds = (item: AnyItem): readonly string[] => {
  const value = data(item);
  const ids: string[] = [];
  const add = (candidate: unknown): void => {
    if (typeof candidate === 'string') ids.push(candidate);
  };
  const beats = (entries: unknown): void => {
    if (Array.isArray(entries))
      for (const entry of entries)
        if (typeof entry === 'object' && entry !== null) add((entry as RecordValue).id);
  };
  if (Array.isArray(value.routes))
    for (const route of value.routes)
      if (typeof route === 'object' && route !== null) add((route as RecordValue).id);
  if (Array.isArray(value.options))
    for (const option of value.options)
      if (typeof option === 'object' && option !== null) add((option as RecordValue).id);
  if (Array.isArray(value.biologicalResults))
    for (const definition of value.biologicalResults)
      if (typeof definition === 'object' && definition !== null)
        add((definition as RecordValue).id);
  if (Array.isArray(value.definitions))
    for (const definition of value.definitions)
      if (typeof definition === 'object' && definition !== null)
        add((definition as RecordValue).id);
  for (const formKey of ['baseForm', 'conditionalForm']) {
    const form = value[formKey];
    if (typeof form === 'object' && form !== null) {
      add((form as RecordValue).id);
      beats((form as RecordValue).beats);
    }
  }
  if (Array.isArray(value.choices))
    for (const choice of value.choices)
      if (typeof choice === 'object' && choice !== null) {
        const row = choice as RecordValue;
        add(row.id);
        if (Array.isArray(row.options))
          for (const option of row.options)
            if (typeof option === 'object' && option !== null) {
              add((option as RecordValue).id);
              beats((option as RecordValue).closingBeats);
            }
      }
  beats(value.closingBeats);
  for (const cueKey of ['cue']) {
    const cue = value[cueKey];
    if (typeof cue === 'object' && cue !== null) add((cue as RecordValue).id);
  }
  return ids;
};

export const validateSemanticContent = (
  families: Readonly<Record<ContentFamily, readonly AnyItem[]>>,
  fileForFamily: (family: ContentFamily) => string,
): readonly ContentIssue[] => {
  const issues: ContentIssue[] = [];
  const seen = new Map<string, string>();
  for (const family of CONTENT_FAMILIES)
    for (const item of families[family]) {
      const file = fileForFamily(family);
      const ids = [item.id, ...nestedIds(item)];
      for (const id of ids) {
        if (seen.has(id)) issues.push(contentIssue(file, `/items/${item.id}`, id, 'duplicateId'));
        else seen.set(id, family);
      }
    }
  for (const item of families.characters) {
    const value = data(item);
    if (
      JSON.stringify([
        value.nameKey,
        value.roleKey,
        value.presence,
        value.speakerId,
        value.relationshipId,
      ]) !== JSON.stringify(CHARACTERS[item.id])
    )
      issues.push(contentIssue(fileForFamily('characters'), `/items/${item.id}`, item.id));
  }
  for (const item of families.locations) {
    const value = data(item);
    const expected = LOCATIONS[item.id];
    if (
      expected === undefined ||
      JSON.stringify([value.nameKey, value.roomType, value.cueRoles]) !==
        JSON.stringify(expected) ||
      value.mappingKey !== item.id
    )
      issues.push(contentIssue(fileForFamily('locations'), `/items/${item.id}`, item.id));
  }
  for (const item of families.interface) {
    const value = data(item);
    if (value.type === 'scienceDefinition') {
      const expected = science.get(item.id);
      if (
        expected === undefined ||
        value.kind !== expected[0] ||
        value.meaning !== expected[1] ||
        value.labelKey !== expected[2]
      )
        issues.push(contentIssue(fileForFamily('interface'), `/items/${item.id}`, item.id));
    }
  }
  for (const item of families.actions) {
    const expected = ACTIONS[item.id];
    const value = data(item);
    if (
      expected === undefined ||
      JSON.stringify([
        value.command,
        value.workClass,
        value.periodCost,
        value.baseEnergyCost,
        value.labelKey,
        value.forecastKey,
        value.reasonKeys,
      ]) !== JSON.stringify(expected)
    )
      issues.push(contentIssue(fileForFamily('actions'), `/items/${item.id}`, item.id));
  }
  for (const item of families.tutorials) {
    const expected = TUTORIALS[item.id];
    const value = data(item);
    const trigger =
      typeof value.trigger === 'object' && value.trigger !== null
        ? (value.trigger as RecordValue).event
        : null;
    if (
      expected === undefined ||
      JSON.stringify([trigger, value.headingKey, value.bodyKey, value.inputActions]) !==
        JSON.stringify(expected)
    )
      issues.push(contentIssue(fileForFamily('tutorials'), `/items/${item.id}`, item.id));
  }
  for (const item of families.tasks) {
    const expected = TASKS[item.id];
    if (expected === undefined || !exactFields(data(item), expected))
      issues.push(contentIssue(fileForFamily('tasks'), `/items/${item.id}`, item.id));
  }
  for (const item of families.scenes)
    if (!exactScene(item))
      issues.push(contentIssue(fileForFamily('scenes'), `/items/${item.id}`, item.id));
  for (const item of families.roomStates)
    if (item.id !== 'MR-ROOM-FACILITY-QUEUE' || !exactFields(data(item), ROOM))
      issues.push(contentIssue(fileForFamily('roomStates'), `/items/${item.id}`, item.id));
  for (const item of families.events) {
    const expected = EVENTS[item.id];
    if (expected === undefined || !exactFields(data(item), expected))
      issues.push(contentIssue(fileForFamily('events'), `/items/${item.id}`, item.id));
  }
  for (const item of families.records) {
    const expected = RECORDS[item.id];
    if (expected === undefined || !exactFields(data(item), expected))
      issues.push(contentIssue(fileForFamily('records'), `/items/${item.id}`, item.id));
  }
  for (const item of families.interface) {
    const value = data(item);
    if (value.type === 'interface') {
      const definitions = item.id === 'MR-UI-SLICE-REHEARSAL' ? REHEARSAL_DEFINITIONS : [];
      const expected = {
        purpose: INTERFACE_PURPOSES[item.id],
        textKeys: INTERFACE_TEXT_KEYS[item.id],
        confirmation:
          item.id === 'MR-UI-SLICE-REHEARSAL' || item.id === 'MR-UI-REPLACE-SAVE'
            ? 'required'
            : 'none',
        dynamicFields: [],
        definitions,
      };
      if (
        expected.purpose === undefined ||
        expected.textKeys === undefined ||
        !exactFields(value, expected)
      )
        issues.push(contentIssue(fileForFamily('interface'), `/items/${item.id}`, item.id));
    }
  }
  for (const item of families.audio) {
    const value = data(item);
    const expected = AUDIO_MEANING[item.id];
    const role =
      item.id === 'MR-MUS-01'
        ? 'music'
        : item.id === 'MR-AUD-CUE-ATTENTION'
          ? 'requiredCue'
          : item.id.includes('-EL-') || item.id.includes('-GA-')
            ? 'dialogue'
            : 'ambience';
    const duplicate =
      role === 'dialogue'
        ? 'dialogueText'
        : role === 'requiredCue'
          ? 'experimentAttentionState'
          : 'none';
    if (
      expected === undefined ||
      value.meaningKey !== expected ||
      value.role !== role ||
      value.visibleDuplicate !== duplicate
    )
      issues.push(contentIssue(fileForFamily('audio'), `/items/${item.id}`, item.id));
  }
  const laser = families.experiments.find((item) => item.id === 'MR-EXP-LASER-SHAM');
  if (laser !== undefined) {
    const value = data(laser);
    const expectedDefinitions = Object.entries(BIOLOGICAL_IDS).map(([result, id]) => ({
      id,
      value: result,
    }));
    if (JSON.stringify(value.biologicalResults) !== JSON.stringify(expectedDefinitions))
      issues.push(
        contentIssue(
          fileForFamily('experiments'),
          '/items/MR-EXP-LASER-SHAM/biologicalResults',
          laser.id,
        ),
      );
    if (JSON.stringify(value.outcomes) !== JSON.stringify(createExpectedLaserOutcomes()))
      issues.push(
        contentIssue(fileForFamily('experiments'), '/items/MR-EXP-LASER-SHAM/outcomes', laser.id),
      );
    const exact = {
      family: 'laserSham',
      labelKey: 'experiment.laserSham',
      questionKeys: {
        baseline: 'experiment.laserSham.question.baseline',
        higherRisk: 'experiment.laserSham.question.higherRisk',
      },
      pairedLimitForecastKey: 'forecast.laserPairedLimit',
      maxRuns: 2,
      goalIds: ['MR-EXP-LASER-SHAM-GOAL-REPLICATION'],
      options: EXPERIMENT_OPTIONS,
      stageActions: STAGE_ACTIONS,
      monitoringOffsets: [{ first: 0, last: 1 }],
      recordId: 'MR-REC-LASER-SHAM',
      evidenceIdPattern: 'evidence:run:<templateId>:<runNumber>',
      scienceDefinitionIds: SELECTED_SCIENCE_IDS,
    };
    if (!exactFields(value, exact))
      issues.push(contentIssue(fileForFamily('experiments'), '/items/MR-EXP-LASER-SHAM', laser.id));
  }
  for (const item of families.experiments)
    if (item.id !== 'MR-EXP-LASER-SHAM')
      issues.push(contentIssue(fileForFamily('experiments'), `/items/${item.id}`, item.id));
  for (const item of families.scenes) {
    const value = data(item);
    const choices = Array.isArray(value.choices) ? value.choices : [];
    const optionRecaps = choices.flatMap((choice) =>
      typeof choice === 'object' &&
      choice !== null &&
      Array.isArray((choice as RecordValue).options)
        ? ((choice as RecordValue).options as unknown[]).map((option) =>
            typeof option === 'object' && option !== null ? (option as RecordValue).recapKey : null,
          )
        : [],
    );
    const choiceRecaps = choices.map((choice) =>
      typeof choice === 'object' && choice !== null ? (choice as RecordValue).recapKey : null,
    );
    const shared =
      value.recapKey !== null &&
      choiceRecaps.every((entry) => entry === null) &&
      optionRecaps.every((entry) => entry === null);
    const specific =
      value.recapKey === null &&
      choiceRecaps.every((entry) => entry === null) &&
      optionRecaps.length > 0 &&
      optionRecaps.every((entry) => typeof entry === 'string');
    if (!shared && !specific)
      issues.push(contentIssue(fileForFamily('scenes'), `/items/${item.id}/recapKey`, item.id));
  }
  const effectsWithCost = (value: unknown): boolean => {
    if (Array.isArray(value)) return value.some(effectsWithCost);
    if (typeof value !== 'object' || value === null) return false;
    const row = value as RecordValue;
    if (row.type === 'applyActionCost') return true;
    return Object.values(row).some(effectsWithCost);
  };
  for (const family of CONTENT_FAMILIES)
    for (const item of families[family])
      if (effectsWithCost(item))
        issues.push(contentIssue(fileForFamily(family), `/items/${item.id}`, item.id));
  return [
    ...new Map(
      issues.map((issue) => [
        `${issue.file}\u0000${issue.path}\u0000${issue.idOrKey ?? ''}\u0000${issue.code}`,
        issue,
      ]),
    ).values(),
  ];
};
