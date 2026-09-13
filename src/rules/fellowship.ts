import type { CampaignState } from './campaign-state.ts';
import { FELLOWSHIP_ANSWER_TYPES } from './commands.ts';
import type {
  AnswerRequirementCommand,
  CommandRejectionReason,
  CommandResult,
  FellowshipAnswerType,
} from './commands.ts';
import { spendWorkAction } from './week-loop.ts';

export const FELLOWSHIP_REQUIREMENT_IDS = [
  'impact',
  'feasibility',
  'independence',
  'support',
] as const;
export type FellowshipRequirementId = (typeof FELLOWSHIP_REQUIREMENT_IDS)[number];

export const FELLOWSHIP_REQUIREMENT_STATES = ['open', 'answered', 'stale'] as const;
export type FellowshipRequirementState = (typeof FELLOWSHIP_REQUIREMENT_STATES)[number];

export const FELLOWSHIP_OUTCOMES = ['pending', 'funded', 'waitlisted', 'rejected'] as const;
export type FellowshipOutcome = (typeof FELLOWSHIP_OUTCOMES)[number];

export const FELLOWSHIP_DEADLINE_WEEK = 8;

export const FELLOWSHIP_FRAMING_DEPENDENT_IDS: readonly FellowshipRequirementId[] = [
  'impact',
  'feasibility',
];

export interface FellowshipRequirement {
  readonly id: FellowshipRequirementId;
  readonly state: FellowshipRequirementState;
  readonly answer: FellowshipAnswerType | null;
}

export interface FellowshipState {
  readonly framing: string;
  readonly revision: number;
  readonly requirements: readonly FellowshipRequirement[];
  readonly deadlineWeek: number;
  readonly outcome: FellowshipOutcome;
}

export interface FellowshipEditOk {
  readonly ok: true;
  readonly fellowship: FellowshipState;
}

export interface FellowshipEditFailure {
  readonly ok: false;
  readonly reason: string;
}

export type FellowshipEditOutcome = FellowshipEditOk | FellowshipEditFailure;

export type FellowshipEdit =
  | { readonly kind: 'add'; readonly requirementId: FellowshipRequirementId }
  | { readonly kind: 'reframe'; readonly framing: string }
  | { readonly kind: 'revert'; readonly requirementId: FellowshipRequirementId };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value);

const rejection = (reason: CommandRejectionReason, message: string): CommandResult => ({
  ok: false,
  reason,
  message,
});

export const createInitialFellowship = (): FellowshipState => ({
  framing: 'initial',
  revision: 0,
  requirements: [],
  deadlineWeek: FELLOWSHIP_DEADLINE_WEEK,
  outcome: 'pending',
});

export const validateFellowship = (value: unknown): readonly string[] => {
  if (!isRecord(value)) {
    return ['fellowship must be an object'];
  }

  const issues: string[] = [];

  if (typeof value['framing'] !== 'string' || value['framing'].trim().length === 0) {
    issues.push('fellowship.framing must be a non-empty string');
  }

  if (!isInteger(value['revision']) || value['revision'] < 0) {
    issues.push('fellowship.revision is out of range');
  }

  if (!isInteger(value['deadlineWeek']) || value['deadlineWeek'] < 1) {
    issues.push('fellowship.deadlineWeek is out of range');
  }

  if (!FELLOWSHIP_OUTCOMES.includes(value['outcome'] as FellowshipOutcome)) {
    issues.push('fellowship.outcome is unknown');
  }

  const requirements = value['requirements'];
  if (!Array.isArray(requirements)) {
    issues.push('fellowship.requirements must be a list');
  } else {
    requirements.forEach((entry, index) => {
      if (!isRecord(entry)) {
        issues.push(`fellowship.requirements[${index}] must be an object`);
        return;
      }

      if (!FELLOWSHIP_REQUIREMENT_IDS.includes(entry['id'] as FellowshipRequirementId)) {
        issues.push(`fellowship.requirements[${index}].id is unknown`);
      }

      if (!FELLOWSHIP_REQUIREMENT_STATES.includes(entry['state'] as FellowshipRequirementState)) {
        issues.push(`fellowship.requirements[${index}].state is unknown`);
      }

      const answer = entry['answer'];
      if (answer !== null && !FELLOWSHIP_ANSWER_TYPES.includes(answer as FellowshipAnswerType)) {
        issues.push(`fellowship.requirements[${index}].answer is unknown`);
      }
    });
  }

  return issues;
};

export const applyFellowshipEdit = (
  fellowship: FellowshipState,
  edit: FellowshipEdit,
): FellowshipEditOutcome => {
  if (edit.kind === 'add') {
    if (!FELLOWSHIP_REQUIREMENT_IDS.includes(edit.requirementId)) {
      return { ok: false, reason: `unknown requirement: ${edit.requirementId}` };
    }

    if (fellowship.requirements.some((requirement) => requirement.id === edit.requirementId)) {
      return { ok: false, reason: `requirement already present: ${edit.requirementId}` };
    }

    return {
      ok: true,
      fellowship: {
        ...fellowship,
        requirements: [
          ...fellowship.requirements,
          { id: edit.requirementId, state: 'open', answer: null },
        ],
      },
    };
  }

  if (edit.kind === 'revert') {
    if (!FELLOWSHIP_REQUIREMENT_IDS.includes(edit.requirementId)) {
      return { ok: false, reason: `unknown requirement: ${edit.requirementId}` };
    }

    if (!fellowship.requirements.some((requirement) => requirement.id === edit.requirementId)) {
      return { ok: false, reason: `unknown requirement: ${edit.requirementId}` };
    }

    return {
      ok: true,
      fellowship: {
        ...fellowship,
        requirements: fellowship.requirements.map((requirement) =>
          requirement.id === edit.requirementId
            ? { ...requirement, state: 'open' as const, answer: null }
            : requirement,
        ),
      },
    };
  }

  const framing = edit.framing.trim();
  if (framing.length === 0) {
    return { ok: false, reason: 'framing must not be empty' };
  }

  return {
    ok: true,
    fellowship: {
      ...fellowship,
      framing,
      revision: fellowship.revision + 1,
      requirements: fellowship.requirements.map((requirement) =>
        requirement.state === 'answered' &&
        FELLOWSHIP_FRAMING_DEPENDENT_IDS.includes(requirement.id)
          ? { ...requirement, state: 'stale' as const }
          : requirement,
      ),
    },
  };
};

export const answerRequirement = (
  state: CampaignState,
  command: AnswerRequirementCommand,
): CommandResult => {
  if (!FELLOWSHIP_ANSWER_TYPES.includes(command.answer)) {
    return rejection('invalid-command', 'The answer type is not valid.');
  }

  if (
    !state.fellowship.requirements.some((requirement) => requirement.id === command.requirementId)
  ) {
    return rejection('unknown-requirement', 'Unknown fellowship requirement.');
  }

  const answered: CampaignState = {
    ...state,
    fellowship: {
      ...state.fellowship,
      requirements: state.fellowship.requirements.map((requirement) =>
        requirement.id === command.requirementId
          ? { ...requirement, state: 'answered' as const, answer: command.answer }
          : requirement,
      ),
    },
  };

  const spent = spendWorkAction(answered, 'write-fellowship', `answer:${command.requirementId}`);

  if (!spent.ok) {
    return spent;
  }

  return {
    ok: true,
    state: spent.state,
    effects: [
      {
        kind: 'requirement-answered',
        payload: { requirementId: command.requirementId, answer: command.answer },
      },
      ...spent.effects,
    ],
  };
};
