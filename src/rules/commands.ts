import type { CampaignState } from './campaign-state.ts';

export const ACTION_IDS = [
  'experiment',
  'analyse',
  'write-paper',
  'write-fellowship',
  'meet-pi',
  'colleague',
  'rest',
] as const;
export type ActionId = (typeof ACTION_IDS)[number];

export const EVIDENCE_TRACKS = ['paper', 'fellowship', 'both'] as const;
export type EvidenceTrack = (typeof EVIDENCE_TRACKS)[number];

export const FELLOWSHIP_ANSWER_TYPES = [
  'honest',
  'inflate',
  'fabricate',
  'imitate',
  'blank',
] as const;
export type FellowshipAnswerType = (typeof FELLOWSHIP_ANSWER_TYPES)[number];

export const COMPLICITY_ACTIONS = [
  'inflate-claim',
  'drop-replicate',
  'take-credit',
  'flatter-pi',
  'dump-work',
] as const;
export type ComplicityAction = (typeof COMPLICITY_ACTIONS)[number];

export interface PerformActionCommand {
  readonly type: 'performAction';
  readonly action: ActionId;
}

export interface AssignEvidenceCommand {
  readonly type: 'assignEvidence';
  readonly evidenceId: string;
  readonly track: EvidenceTrack;
}

export interface AnswerRequirementCommand {
  readonly type: 'answerRequirement';
  readonly requirementId: string;
  readonly answer: FellowshipAnswerType;
}

export interface ComplyCommand {
  readonly type: 'comply';
  readonly action: ComplicityAction;
}

export interface MeetPiCommand {
  readonly type: 'meetPI';
}

export interface ResolveEventCommand {
  readonly type: 'resolveEvent';
  readonly eventId: string;
  readonly choiceId: string;
}

export interface QuitCommand {
  readonly type: 'quit';
}

export interface AdvanceWeekCommand {
  readonly type: 'advanceWeek';
}

export type Command =
  | PerformActionCommand
  | AssignEvidenceCommand
  | AnswerRequirementCommand
  | ComplyCommand
  | MeetPiCommand
  | ResolveEventCommand
  | QuitCommand
  | AdvanceWeekCommand;

export type CommandRejectionReason =
  | 'not-implemented'
  | 'invalid-state'
  | 'invalid-command'
  | 'no-actions-left'
  | 'insufficient-energy'
  | 'week-lost'
  | 'contract-finished'
  | 'duplicate-evidence'
  | 'unknown-requirement'
  | 'no-pending-event'
  | 'unknown-choice';

export interface PresentationEffect {
  readonly kind: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

export interface CommandSuccess {
  readonly ok: true;
  readonly state: CampaignState;
  readonly effects: readonly PresentationEffect[];
}

export interface CommandRejection {
  readonly ok: false;
  readonly reason: CommandRejectionReason;
  readonly message: string;
}

export type CommandResult = CommandSuccess | CommandRejection;
