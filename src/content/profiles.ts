import { CONTENT_FAMILIES } from './types.ts';
import type {
  AuthoredContentItem,
  BuiltContentItem,
  ContentFamily,
  ContentIssue,
  FamilySelections,
  ProfileSource,
} from './types.ts';
import { cloneBuiltItem } from './schemas.ts';

export const SLICE_STRING_KEYS =
  'action.analyse.label\naction.monitorQuality.label\naction.monitorRoutine.label\naction.relationship.label\naction.roomWait.label\naction.sampleConfigure.label\naction.startFocused.label\naudio.amb.break\naudio.amb.corridor\naudio.amb.culture\naudio.amb.desks\naudio.amb.exit\naudio.amb.imaging\naudio.amb.lab\naudio.amb.pi\naudio.cue.attention\naudio.elena.role01\naudio.elena.role02\naudio.elena.role03\naudio.elena.role04\naudio.elena.role05\naudio.elena.role06\naudio.elena.role07\naudio.elena.role08\naudio.gabriel.role01\naudio.gabriel.role02\naudio.gabriel.role03\naudio.gabriel.role04\naudio.gabriel.role05\naudio.gabriel.role06\naudio.gabriel.role07\naudio.gabriel.role08\naudio.music.openingPulse\ncharacter.camila.name\ncharacter.camila.role\ncharacter.elena.name\ncharacter.elena.role\ncharacter.gabriel.name\ncharacter.gabriel.role\ncharacter.haoran.name\ncharacter.haoran.role\ncharacter.samira.name\ncharacter.samira.role\nexperiment.analysis.caveat\nexperiment.analysis.reading\nexperiment.band.compromised\nexperiment.band.mixed\nexperiment.band.robust\nexperiment.equipment.limited\nexperiment.equipment.ready\nexperiment.equipment.unavailable\nexperiment.goal.replication\nexperiment.laserSham\nexperiment.laserSham.family.baseline\nexperiment.laserSham.family.higherRisk\nexperiment.laserSham.question.baseline\nexperiment.laserSham.question.higherRisk\nexperiment.observation.paired\nexperiment.observation.rhythm\nexperiment.observation.structure\nexperiment.quality.inconclusive\nexperiment.quality.repeat\nexperiment.quality.suspicious\nexperiment.quality.usable\nexperiment.sample.failing\nexperiment.sample.stable\nexperiment.sample.stressed\nexperiment.stop.confirm\nexperiment.stop.expiry\nforecast.analyse\nforecast.laserPairedLimit\nforecast.monitorQuality\nforecast.monitorRoutine\nforecast.relationship\nforecast.roomWait\nforecast.sampleConfigure\nforecast.startFocused\ninput.action.backPause\ninput.action.look\ninput.action.move\ninput.action.primaryAction\ninput.action.researchStatus\ninput.action.uiNavigate\nlocation.breakRoom.name\nlocation.corridor.name\nlocation.exitVestibule.name\nlocation.facility.name\nlocation.imaging.name\nlocation.mainLab.name\nlocation.piOffice.name\nlocation.sharedDesks.name\nlocation.southCorridor.name\nlocation.tissueCulture.name\nmanuscript.claim.careful\nmanuscript.claim.inflated\nmanuscript.claim.strong\nmanuscript.lane.caveat\nmanuscript.lane.claim\nmanuscript.lane.control\nmanuscript.lane.figure\nmanuscript.requirement.associationSupport\nmanuscript.requirement.careful\nmanuscript.requirement.causalSupport\nmanuscript.requirement.caveat\nmanuscript.requirement.conflict\nmanuscript.requirement.distinctExperimentFigures\nmanuscript.requirement.inflated\nmanuscript.requirement.matchedControl\nmanuscript.requirement.met\nmanuscript.requirement.missing\nmanuscript.requirement.relevantControl\nmanuscript.requirement.rhythmCoverage\nmanuscript.requirement.strong\nmanuscript.requirement.structureCoverage\nmanuscript.requirement.supportedFigure\nmanuscript.requirement.unsupported\nmanuscript.requirements.missing\nmanuscript.requirements.title\noptional.gabriel.queue.closeA\noptional.gabriel.queue.closeB\noptional.gabriel.queue.closeC\noptional.gabriel.queue.limited\noptional.gabriel.queue.opening\noptional.gabriel.queue.press\noptional.gabriel.queue.recapLimited\noptional.gabriel.queue.recapPress\noptional.gabriel.queue.recapWait\noptional.gabriel.queue.wait\nreason.band.choice\nreason.band.equipment\nreason.band.monitor\nreason.band.sample\nreason.band.stabilized\nreason.energy.work\nreason.evidence.limited\nreason.evidence.result\nreason.paper.commit\nreason.pi.openingChoice\nreason.room.limited\nreason.room.ready\nreason.time.action\nreason.trust.pressure\nreason.trust.respect\nrecord.laserSham.limitedPaired\nrecord.laserSham.limitedRhythm\nrecord.laserSham.limitedStructure\nrecord.laserSham.strong\nrecord.laserSham.strongRhythm\nrecord.laserSham.strongStructure\nrecord.laserSham.title\nrecord.laserSham.weak\nrecord.projectNotebook.body\nrecord.projectNotebook.title\nroom.facilityQueue.forecast\nroom.route.gabriel\nroom.route.limited\nroom.route.wait\nscene.clarified.choice.limit\nscene.clarified.choice.start\nscene.clarified.elena.afterLimit\nscene.clarified.elena.afterStart\nscene.clarified.elena.opening\nscene.clarified.elena.request\nscene.clarified.internal.close\nscene.clarified.internal.opening\nscene.clarified.recap\nscience.caveatAssociation\nscience.caveatCondition\nscience.caveatProcess\nscience.controlLimited\nscience.controlMatched\nscience.readingNoRecovery\nscience.readingRecovery\nscience.readingUnresolved\nscience.repatterningUnobserved\nscience.rhythmNone\nscience.rhythmRecovery\nscience.rhythmUnobserved\nscience.structurePartial\nscience.structureRecovery\nscience.structureUnobserved\ntask.laserSham\ntutorial.cost\ntutorial.heading.costs\ntutorial.heading.focusedViews\ntutorial.heading.interact\ntutorial.heading.localSaving\ntutorial.heading.moveLook\ntutorial.heading.researchStatus\ntutorial.interact\ntutorial.monitor\ntutorial.move\ntutorial.sample\ntutorial.save\ntutorial.station\ntutorial.status\nui.action.warning\nui.confirm.replaceSave\nui.content.invalid\nui.cue.experimentAttention\nui.cue.optionalConversation\nui.menu.continue\nui.menu.newGame\nui.menu.saveQuit\nui.save.failure\nui.save.recovery\nui.save.reset\nui.save.success\nui.slice.complete\nui.slice.rehearsal\nui.slice.rehearsalConfirm\nui.slice.rehearsalForecast\nui.slice.rehearsalReason'.split(
    '\n',
  );

export const INTERFACE_TEXT_KEYS: Readonly<Record<string, readonly string[]>> = {
  'MR-UI-MENU-CONTINUE': ['ui.menu.continue'],
  'MR-UI-MENU-NEW': ['ui.menu.newGame'],
  'MR-UI-MENU-SAVEQUIT': ['ui.menu.saveQuit'],
  'MR-UI-REPLACE-SAVE': ['ui.confirm.replaceSave'],
  'MR-UI-SAVE-SUCCESS': ['ui.save.success'],
  'MR-UI-SAVE-FAILURE': ['ui.save.failure'],
  'MR-UI-SAVE-RECOVERY': ['ui.save.recovery'],
  'MR-UI-SAVE-RESET': ['ui.save.reset'],
  'MR-UI-ACTION-WARNING': ['ui.action.warning'],
  'MR-UI-CONTENT-INVALID': ['ui.content.invalid'],
  'MR-UI-SLICE-COMPLETE': ['ui.slice.complete', 'ui.slice.rehearsalReason'],
  'MR-UI-CUE-ATTENTION': ['ui.cue.experimentAttention'],
  'MR-UI-CUE-OPTIONAL': ['ui.cue.optionalConversation'],
  'MR-UI-SLICE-REHEARSAL': [
    'experiment.analysis.caveat',
    'experiment.analysis.reading',
    'experiment.band.compromised',
    'experiment.band.mixed',
    'experiment.band.robust',
    'experiment.quality.inconclusive',
    'experiment.quality.repeat',
    'experiment.quality.suspicious',
    'experiment.quality.usable',
    'experiment.stop.confirm',
    'experiment.stop.expiry',
    'manuscript.claim.careful',
    'manuscript.claim.inflated',
    'manuscript.claim.strong',
    'manuscript.lane.caveat',
    'manuscript.lane.claim',
    'manuscript.lane.control',
    'manuscript.lane.figure',
    'manuscript.requirement.associationSupport',
    'manuscript.requirement.careful',
    'manuscript.requirement.causalSupport',
    'manuscript.requirement.caveat',
    'manuscript.requirement.conflict',
    'manuscript.requirement.distinctExperimentFigures',
    'manuscript.requirement.inflated',
    'manuscript.requirement.matchedControl',
    'manuscript.requirement.met',
    'manuscript.requirement.missing',
    'manuscript.requirement.relevantControl',
    'manuscript.requirement.rhythmCoverage',
    'manuscript.requirement.strong',
    'manuscript.requirement.structureCoverage',
    'manuscript.requirement.supportedFigure',
    'manuscript.requirement.unsupported',
    'manuscript.requirements.missing',
    'manuscript.requirements.title',
    'ui.slice.rehearsal',
    'ui.slice.rehearsalConfirm',
    'ui.slice.rehearsalForecast',
  ],
};

const audio = [
  'MR-AUD-AMB-BREAK',
  'MR-AUD-AMB-CORRIDOR',
  'MR-AUD-AMB-CULTURE',
  'MR-AUD-AMB-DESKS',
  'MR-AUD-AMB-EXIT',
  'MR-AUD-AMB-IMAGING',
  'MR-AUD-AMB-LAB',
  'MR-AUD-AMB-PI',
  'MR-AUD-CUE-ATTENTION',
  'MR-AUD-EL-01',
  'MR-AUD-EL-02',
  'MR-AUD-EL-03',
  'MR-AUD-EL-04',
  'MR-AUD-EL-05',
  'MR-AUD-EL-06',
  'MR-AUD-EL-07',
  'MR-AUD-EL-08',
  'MR-AUD-GA-01',
  'MR-AUD-GA-02',
  'MR-AUD-GA-03',
  'MR-AUD-GA-04',
  'MR-AUD-GA-05',
  'MR-AUD-GA-06',
  'MR-AUD-GA-07',
  'MR-AUD-GA-08',
  'MR-MUS-01',
];
const interfaces = [
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
  'MR-UI-ACTION-WARNING',
  'MR-UI-CONTENT-INVALID',
  'MR-UI-CUE-ATTENTION',
  'MR-UI-CUE-OPTIONAL',
  'MR-UI-MENU-CONTINUE',
  'MR-UI-MENU-NEW',
  'MR-UI-MENU-SAVEQUIT',
  'MR-UI-REPLACE-SAVE',
  'MR-UI-SAVE-FAILURE',
  'MR-UI-SAVE-RECOVERY',
  'MR-UI-SAVE-RESET',
  'MR-UI-SAVE-SUCCESS',
  'MR-UI-SLICE-COMPLETE',
  'MR-UI-SLICE-REHEARSAL',
];

export const SLICE_SELECTIONS: FamilySelections = {
  characters: ['MR-CHR-CAMILA', 'MR-CHR-ELENA', 'MR-CHR-GABRIEL', 'MR-CHR-HAORAN', 'MR-CHR-SAMIRA'],
  locations: [
    'MR-LOC-BREAK-ROOM',
    'MR-LOC-CORRIDOR',
    'MR-LOC-EXIT-VESTIBULE',
    'MR-LOC-FACILITY',
    'MR-LOC-IMAGING',
    'MR-LOC-MAIN-LAB',
    'MR-LOC-PI-OFFICE',
    'MR-LOC-SHARED-DESKS',
    'MR-LOC-SOUTH-CORRIDOR',
    'MR-LOC-TISSUE-CULTURE',
  ],
  actions: [
    'MR-ACT-ANALYSE',
    'MR-ACT-MONITOR-QUALITY',
    'MR-ACT-MONITOR-ROUTINE',
    'MR-ACT-RELATIONSHIP',
    'MR-ACT-ROOM-WAIT',
    'MR-ACT-SAMPLE-CONFIGURE',
    'MR-ACT-SLICE-CLAIM-REHEARSAL',
    'MR-ACT-START-FOCUSED',
  ],
  experiments: ['MR-EXP-LASER-SHAM'],
  tasks: ['MR-SLICE-CLAIM-REHEARSAL', 'MR-TASK-LASER-SHAM'],
  roomStates: ['MR-ROOM-FACILITY-QUEUE'],
  events: ['MR-EVT-CLARIFIED', 'MR-EVT-FACILITY-QUEUE', 'MR-EVT-GABRIEL-QUEUE'],
  scenes: ['MR-OPT-GABRIEL-QUEUE', 'MR-SCN-CLARIFIED'],
  messages: [],
  notifications: [],
  records: ['MR-REC-LASER-SHAM', 'MR-REC-PROJECT-NOTEBOOK'],
  endings: [],
  citations: [],
  environmentalItems: [],
  contextualLines: [],
  tutorials: [
    'MR-TUT-001',
    'MR-TUT-002',
    'MR-TUT-003',
    'MR-TUT-004',
    'MR-TUT-005',
    'MR-TUT-006',
    'MR-TUT-007',
    'MR-TUT-008',
  ],
  interface: interfaces,
  audio,
};

export const EMPTY_SELECTIONS: FamilySelections = Object.fromEntries(
  CONTENT_FAMILIES.map((family) => [family, []]),
) as unknown as FamilySelections;

const issue = (file: string, path: string, code: ContentIssue['code']): ContentIssue => ({
  code,
  file,
  path,
  idOrKey: null,
});

export const validateProfileContracts = (
  profiles: Readonly<Record<'full' | 'fallback' | 'slice', ProfileSource>>,
): readonly ContentIssue[] => {
  const issues: ContentIssue[] = [];
  for (const id of ['full', 'fallback'] as const) {
    const profile = profiles[id];
    const file = `content/profiles/${id}.json`;
    if (
      profile.implementationStatus !== 'incomplete' ||
      profile.campaignMode !== 'campaign' ||
      profile.sliceCompletionId !== null
    )
      issues.push(issue(file, '/implementationStatus', 'invalidProfile'));
    for (const family of CONTENT_FAMILIES)
      if (profile.selections[family].length !== 0 || profile.expectedCounts[family] !== 0)
        issues.push(issue(file, `/selections/${family}`, 'invalidProfile'));
    if (profile.replacements.length !== 0)
      issues.push(issue(file, '/replacements', 'invalidProfile'));
  }
  const slice = profiles.slice;
  const file = 'content/profiles/slice.json';
  if (
    slice.implementationStatus !== 'complete' ||
    slice.campaignMode !== 'evaluationSlice' ||
    slice.sliceCompletionId !== 'MR-UI-SLICE-COMPLETE'
  )
    issues.push(issue(file, '/implementationStatus', 'invalidProfile'));
  for (const family of CONTENT_FAMILIES) {
    if (JSON.stringify(slice.selections[family]) !== JSON.stringify(SLICE_SELECTIONS[family]))
      issues.push(issue(file, `/selections/${family}`, 'incompleteProfile'));
    if (slice.expectedCounts[family] !== SLICE_SELECTIONS[family].length)
      issues.push(issue(file, `/expectedCounts/${family}`, 'countMismatch'));
  }
  if (slice.replacements.length !== 0) issues.push(issue(file, '/replacements', 'invalidProfile'));
  return issues;
};

export const selectBuiltFamilies = (
  families: Readonly<Record<ContentFamily, readonly AuthoredContentItem[]>>,
  profile: ProfileSource,
): {
  readonly families: Readonly<Record<ContentFamily, readonly BuiltContentItem[]>>;
  readonly issues: readonly ContentIssue[];
} => {
  const output = {} as Record<ContentFamily, readonly BuiltContentItem[]>;
  const issues: ContentIssue[] = [];
  for (const family of CONTENT_FAMILIES) {
    const byId = new Map(families[family].map((item) => [item.id, item]));
    output[family] = profile.selections[family]
      .map((id, index) => {
        const item = byId.get(id);
        if (item === undefined) {
          issues.push({
            code: 'missingReference',
            file: `content/profiles/${profile.id}.json`,
            path: `/selections/${family}/${index}`,
            idOrKey: id,
          });
          return null;
        }
        return cloneBuiltItem(item);
      })
      .filter((item): item is BuiltContentItem => item !== null);
  }
  return { families: output, issues };
};

const INPUT_LABELS: Readonly<Record<string, string>> = {
  move: 'input.action.move',
  look: 'input.action.look',
  uiNavigate: 'input.action.uiNavigate',
  primaryAction: 'input.action.primaryAction',
  backPause: 'input.action.backPause',
  researchStatus: 'input.action.researchStatus',
  previousPanel: 'input.action.previousPanel',
  nextPanel: 'input.action.nextPanel',
  interactionAssist: 'input.action.interactionAssist',
};
const KEY_FIELDS = new Set([
  'labelKey',
  'nameKey',
  'roleKey',
  'forecastKey',
  'pairedLimitForecastKey',
  'titleKey',
  'bodyKey',
  'textKey',
  'subjectKey',
  'headingKey',
  'confirmationKey',
  'recapKey',
  'reasonKey',
  'resultReasonKey',
  'noticeKey',
  'meaningKey',
]);
const KEY_ARRAY_FIELDS = new Set([
  'reasonKeys',
  'bodyKeys',
  'textKeys',
  'repeatNoteKeys',
  'allowedBodyKeys',
]);

export const collectSelectedTextKeys = (
  families: Readonly<Record<ContentFamily, readonly BuiltContentItem[]>>,
): readonly string[] => {
  const keys = new Set<string>();
  const visit = (value: unknown, field = ''): void => {
    if (typeof value === 'string') {
      if (KEY_FIELDS.has(field)) keys.add(value);
      return;
    }
    if (Array.isArray(value)) {
      if (KEY_ARRAY_FIELDS.has(field)) {
        for (const entry of value) if (typeof entry === 'string') keys.add(entry);
        return;
      }
      for (const entry of value) visit(entry, field);
      return;
    }
    if (typeof value !== 'object' || value === null) return;
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      if (key === 'questionKeys') {
        if (typeof entry === 'object' && entry !== null)
          for (const question of Object.values(entry))
            if (typeof question === 'string') keys.add(question);
        continue;
      }
      if (key === 'inputActions' && Array.isArray(entry)) {
        for (const action of entry)
          if (typeof action === 'string' && INPUT_LABELS[action] !== undefined)
            keys.add(INPUT_LABELS[action]);
        continue;
      }
      visit(entry, key);
    }
  };
  for (const family of CONTENT_FAMILIES) for (const item of families[family]) visit(item);
  return [...keys].sort();
};

export const tutorialInputRows = (
  actions: readonly string[],
): readonly { readonly action: string; readonly labelKey: string }[] =>
  actions.map((action) => ({ action, labelKey: INPUT_LABELS[action]! }));
