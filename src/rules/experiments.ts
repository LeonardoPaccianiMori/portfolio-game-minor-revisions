import { WEEK_MAX } from './campaign-state.ts';
import type { CampaignState, ExperimentAssignment, ExperimentState } from './campaign-state.ts';
import type {
  CommandRejectionReason,
  CommandResult,
  PresentationEffect,
  StartExperimentCommand,
} from './commands.ts';
import { PAPER_REQUIREMENT_IDS } from './paper.ts';
import type { PaperRequirementId } from './paper.ts';

export const EXPERIMENT_STEP_COUNTS: Readonly<Record<PaperRequirementId, number>> = {
  controls: 3,
  replicates: 3,
  mechanism: 4,
  impact: 2,
  presentation: 2,
};

const rejection = (reason: CommandRejectionReason, message: string): CommandResult => ({
  ok: false,
  reason,
  message,
});

const isFinished = (state: ExperimentState): boolean => state === 'done' || state === 'attached';

const pauseRunning = (
  experiments: readonly ExperimentAssignment[],
): readonly ExperimentAssignment[] =>
  experiments.map((assignment) =>
    assignment.state === 'running' ? { ...assignment, state: 'paused' as const } : assignment,
  );

export const startExperiment = (
  state: CampaignState,
  command: StartExperimentCommand,
): CommandResult => {
  if (state.crashed) {
    return rejection('week-lost', 'This week is lost. End the week to recover.');
  }

  if (state.week >= WEEK_MAX && state.actionsLeft <= 0) {
    return rejection('contract-finished', 'The contract is finished.');
  }

  if (!PAPER_REQUIREMENT_IDS.includes(command.requirementId)) {
    return rejection('invalid-command', 'The paper requirement is not valid.');
  }

  if (!state.paper.requirements.some((requirement) => requirement.id === command.requirementId)) {
    return rejection('unknown-requirement', 'Unknown paper requirement.');
  }

  const resumable = state.experiments.find(
    (assignment) =>
      assignment.requirementId === command.requirementId && !isFinished(assignment.state),
  );

  const paused = pauseRunning(state.experiments);

  if (resumable !== undefined) {
    return {
      ok: true,
      state: {
        ...state,
        experiments: paused.map((assignment) =>
          assignment.id === resumable.id
            ? { ...assignment, state: 'running' as const }
            : assignment,
        ),
        history: [...state.history, `experiment:resume:${command.requirementId}`],
      },
      effects: [
        {
          kind: 'experiment-started',
          payload: { assignmentId: resumable.id, resumed: true },
        },
      ],
    };
  }

  const count =
    state.experiments.filter((assignment) => assignment.requirementId === command.requirementId)
      .length + 1;
  const assignment: ExperimentAssignment = {
    id: `experiment.${command.requirementId}.${count}`,
    requirementId: command.requirementId,
    step: 0,
    steps: EXPERIMENT_STEP_COUNTS[command.requirementId],
    state: 'running',
  };

  return {
    ok: true,
    state: {
      ...state,
      experiments: [...paused, assignment],
      history: [...state.history, `experiment:start:${command.requirementId}`],
    },
    effects: [
      {
        kind: 'experiment-started',
        payload: { assignmentId: assignment.id, resumed: false },
      },
    ],
  };
};

export const advanceExperiment = (state: CampaignState): CommandResult => {
  const running = state.experiments.find((assignment) => assignment.state === 'running');

  if (running === undefined) {
    return rejection('no-running-experiment', 'No experiment is in progress.');
  }

  const step = running.step + 1;
  const done = step >= running.steps;
  const effects: PresentationEffect[] = [
    {
      kind: 'experiment-advanced',
      payload: {
        assignmentId: running.id,
        requirementId: running.requirementId,
        step,
        steps: running.steps,
      },
    },
  ];

  if (done) {
    effects.push({
      kind: 'experiment-completed',
      payload: { assignmentId: running.id, requirementId: running.requirementId },
    });
  }

  return {
    ok: true,
    state: {
      ...state,
      experiments: state.experiments.map((assignment) =>
        assignment.id === running.id
          ? { ...assignment, step, state: done ? ('done' as const) : ('running' as const) }
          : assignment,
      ),
    },
    effects,
  };
};

const hasCurrentPaperEvidence = (
  state: CampaignState,
  requirementId: PaperRequirementId,
): boolean =>
  state.experiments.some((assignment) => {
    if (assignment.state !== 'attached' || assignment.requirementId !== requirementId) {
      return false;
    }

    const evidence = state.evidence.find((entry) => entry.id === assignment.id);

    return (
      evidence !== undefined &&
      evidence.state === 'current' &&
      (evidence.track === 'paper' || evidence.track === 'both')
    );
  });

export const writeUpRequirement = (state: CampaignState): CommandResult => {
  const target = state.paper.requirements.find(
    (requirement) =>
      requirement.state !== 'satisfied' && hasCurrentPaperEvidence(state, requirement.id),
  );

  if (target === undefined) {
    return rejection('nothing-to-write-up', 'There is no current result to write up.');
  }

  return {
    ok: true,
    state: {
      ...state,
      paper: {
        ...state.paper,
        requirements: state.paper.requirements.map((requirement) =>
          requirement.id === target.id
            ? { ...requirement, state: 'satisfied' as const }
            : requirement,
        ),
      },
    },
    effects: [{ kind: 'requirement-satisfied', payload: { requirementId: target.id } }],
  };
};
