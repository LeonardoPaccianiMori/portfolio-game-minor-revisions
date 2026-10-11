import {
  ACTION_ENERGY_COSTS,
  ACTIONS_PER_WEEK,
  COMPLICITY_ACTIONS,
  COMPLICITY_EFFECTS,
  ENERGY_MAX,
  FELLOWSHIP_ANSWER_TYPES,
  WEEK_MAX,
} from '../rules/index.ts';
import type {
  CampaignState,
  Command,
  ComplicityAction,
  FellowshipAnswerType,
  RelationshipId,
} from '../rules/index.ts';

const PAPER_REQUIREMENT_LABELS: Readonly<Record<string, string>> = {
  controls: 'Controls',
  replicates: 'Replicates',
  mechanism: 'Mechanism',
  impact: 'Impact',
  presentation: 'Presentation',
};

const FELLOWSHIP_REQUIREMENT_LABELS: Readonly<Record<string, string>> = {
  impact: 'Impact and innovation',
  feasibility: 'Feasibility and preliminary data',
  independence: 'Independence and career plan',
  support: 'Support and environment',
};

const ACTION_LABELS: Readonly<Record<string, string>> = {
  experiment: 'Work an experiment step',
  analyse: 'Analyse results',
  'write-paper': 'Write or revise the manuscript',
  'meet-pi': 'Meet the PI',
  rest: 'Rest',
};

const BOARD_ACTIONS = ['experiment', 'analyse', 'write-paper', 'meet-pi', 'rest'] as const;

const COMPLICITY_LABELS: Readonly<Record<ComplicityAction, string>> = {
  'inflate-claim': 'Inflate a claim',
  'drop-replicate': 'Drop a replicate',
  'take-credit': 'Take credit',
  'flatter-pi': 'Flatter the PI',
  'dump-work': 'Dump work',
};

const ANSWER_LABELS: Readonly<Record<FellowshipAnswerType, string>> = {
  honest: 'Honest',
  inflate: 'Inflate',
  fabricate: 'Fabricate',
  imitate: 'Imitate Voss',
  blank: 'Leave blank',
};

const EVENT_LABELS: Readonly<Record<string, string>> = {
  rent: 'The rent is due',
};

const EVENT_CHOICE_LABELS: Readonly<Record<string, string>> = {
  'ask-advance': 'Ask the PI for an advance (standing −5)',
  'side-job': 'Take a side job (lose one action slot)',
  borrow: 'Borrow from Mara (Mara −10)',
};

export interface BoardResourcesView {
  readonly week: number;
  readonly weekMax: number;
  readonly actionsLeft: number;
  readonly actionsPerWeek: number;
  readonly energy: number;
  readonly energyMax: number;
  readonly standing: number;
  readonly trust: Readonly<Record<RelationshipId, number>>;
}

export interface BoardRequirementView {
  readonly id: string;
  readonly label: string;
  readonly state: string;
}

export interface BoardPaperRequirementView extends BoardRequirementView {
  readonly canStart: boolean;
  readonly progress: string | null;
  readonly startCommand: Command | null;
}

export interface BoardEvidenceView {
  readonly id: string;
  readonly state: string;
  readonly track: string;
  readonly overlap: boolean;
}

export interface BoardResultView {
  readonly id: string;
  readonly label: string;
  readonly commands: readonly Command[];
}

export interface BoardFellowshipRequirementView extends BoardRequirementView {
  readonly answer: string | null;
  readonly answers: readonly {
    readonly id: FellowshipAnswerType;
    readonly label: string;
    readonly command: Command;
  }[];
}

export interface BoardActionView {
  readonly id: string;
  readonly label: string;
  readonly cost: string;
  readonly command: Command;
}

export interface BoardComplicityView {
  readonly id: ComplicityAction;
  readonly label: string;
  readonly cost: string;
  readonly command: Command;
}

export interface BoardEventChoiceView {
  readonly id: string;
  readonly label: string;
  readonly command: Command;
}

export interface BoardEventView {
  readonly id: string;
  readonly label: string;
  readonly choices: readonly BoardEventChoiceView[];
}

export interface BoardView {
  readonly resources: BoardResourcesView;
  readonly paper: {
    readonly framing: string;
    readonly requirements: readonly BoardPaperRequirementView[];
    readonly evidence: readonly BoardEvidenceView[];
  };
  readonly fellowship: {
    readonly framing: string;
    readonly deadlineWeek: number;
    readonly outcome: string;
    readonly requirements: readonly BoardFellowshipRequirementView[];
  };
  readonly results: readonly BoardResultView[];
  readonly actions: readonly BoardActionView[];
  readonly complicity: readonly BoardComplicityView[];
  readonly pendingEvent: BoardEventView | null;
}

const describeComplicityCost = (action: ComplicityAction): string => {
  const effect = COMPLICITY_EFFECTS[action];
  const parts: string[] = [];

  if (effect.standing !== 0) {
    parts.push(`standing ${effect.standing > 0 ? '+' : ''}${effect.standing}`);
  }

  if (effect.integrity !== 0) {
    parts.push(`integrity ${effect.integrity}`);
  }

  if (effect.slots !== 0) {
    parts.push(`${effect.slots > 0 ? '+' : ''}${effect.slots} slot`);
  }

  for (const [id, delta] of Object.entries(effect.relationships)) {
    parts.push(`${id} ${delta !== undefined && delta > 0 ? '+' : ''}${String(delta)}`);
  }

  return parts.join(', ');
};

export const createBoardView = (state: CampaignState): BoardView => {
  const paperLabels = state.paper.requirements.map(
    (requirement) => PAPER_REQUIREMENT_LABELS[requirement.id] ?? requirement.id,
  );

  return {
    resources: {
      week: state.week,
      weekMax: WEEK_MAX,
      actionsLeft: state.actionsLeft,
      actionsPerWeek: ACTIONS_PER_WEEK,
      energy: state.energy,
      energyMax: ENERGY_MAX,
      standing: state.standing,
      trust: {
        voss: state.relationships.voss,
        dario: state.relationships.dario,
        mara: state.relationships.mara,
      },
    },
    paper: {
      framing: state.paper.framing,
      requirements: state.paper.requirements.map((requirement, index) => {
        const assignment = state.experiments.find(
          (candidate) => candidate.requirementId === requirement.id,
        );
        const running = assignment?.state === 'running' || assignment?.state === 'paused';
        const progress =
          assignment !== undefined && running
            ? `${assignment.step} of ${assignment.steps} steps`
            : null;

        return {
          id: requirement.id,
          label: paperLabels[index] ?? requirement.id,
          state: requirement.state,
          canStart: requirement.state !== 'satisfied' && !running,
          progress,
          startCommand:
            requirement.state !== 'satisfied' && !running
              ? { type: 'startExperiment', requirementId: requirement.id }
              : null,
        };
      }),
      evidence: state.evidence.map((entry) => ({
        id: entry.id,
        state: entry.state,
        track: entry.track,
        overlap: entry.overlap,
      })),
    },
    fellowship: {
      framing: state.fellowship.framing,
      deadlineWeek: state.fellowship.deadlineWeek,
      outcome: state.fellowship.outcome,
      requirements: state.fellowship.requirements.map((requirement) => ({
        id: requirement.id,
        label: FELLOWSHIP_REQUIREMENT_LABELS[requirement.id] ?? requirement.id,
        state: requirement.state,
        answer: requirement.answer,
        answers: FELLOWSHIP_ANSWER_TYPES.map((answer) => ({
          id: answer,
          label: ANSWER_LABELS[answer],
          command: {
            type: 'answerRequirement',
            requirementId: requirement.id,
            answer,
          },
        })),
      })),
    },
    results: state.experiments
      .filter((assignment) => assignment.state === 'done')
      .map((assignment) => ({
        id: assignment.id,
        label: PAPER_REQUIREMENT_LABELS[assignment.requirementId] ?? assignment.requirementId,
        commands: (['paper', 'fellowship', 'both'] as const).map((track) => ({
          type: 'assignEvidence',
          evidenceId: assignment.id,
          track,
        })),
      })),
    actions: BOARD_ACTIONS.map((action) => ({
      id: action,
      label: ACTION_LABELS[action] ?? action,
      cost: `${String(ACTION_ENERGY_COSTS[action])} energy, one action slot`,
      command: { type: 'performAction', action },
    })),
    complicity: COMPLICITY_ACTIONS.map((action) => ({
      id: action,
      label: COMPLICITY_LABELS[action],
      cost: describeComplicityCost(action),
      command: { type: 'comply', action },
    })),
    pendingEvent:
      state.pendingEvent === null
        ? null
        : {
            id: state.pendingEvent.id,
            label: EVENT_LABELS[state.pendingEvent.id] ?? state.pendingEvent.id,
            choices: state.pendingEvent.choices.map((choiceId) => ({
              id: choiceId,
              label: EVENT_CHOICE_LABELS[choiceId] ?? choiceId,
              command: {
                type: 'resolveEvent',
                eventId: state.pendingEvent?.id ?? '',
                choiceId,
              },
            })),
          },
  };
};
