import { validateState } from './campaign-state.ts';
import type { CampaignState } from './campaign-state.ts';
import type { Command, CommandResult } from './commands.ts';
import { evaluateRunState, quitRun } from './endings.ts';
import { assignEvidence } from './evidence.ts';
import { evaluateEvents, resolveEvent } from './events.ts';
import { startExperiment } from './experiments.ts';
import { answerRequirement } from './fellowship.ts';
import { comply, meetPI } from './pi.ts';
import { advanceWeek, performAction } from './week-loop.ts';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const routeCommand = (state: CampaignState, command: Command): CommandResult => {
  if (command.type === 'performAction') {
    return performAction(state, command);
  }

  if (command.type === 'assignEvidence') {
    return assignEvidence(state, command);
  }

  if (command.type === 'answerRequirement') {
    return answerRequirement(state, command);
  }

  if (command.type === 'meetPI') {
    return meetPI(state);
  }

  if (command.type === 'comply') {
    return comply(state, command);
  }

  if (command.type === 'resolveEvent') {
    return resolveEvent(state, command);
  }

  if (command.type === 'startExperiment') {
    return startExperiment(state, command);
  }

  if (command.type === 'quit') {
    return quitRun(state);
  }

  if (command.type === 'advanceWeek') {
    return advanceWeek(state);
  }

  return {
    ok: false,
    reason: 'not-implemented',
    message: 'The command is not implemented yet.',
  };
};

export const dispatch = (state: CampaignState, command: Command): CommandResult => {
  const stateValidation = validateState(state);
  if (!stateValidation.ok) {
    return {
      ok: false,
      reason: 'invalid-state',
      message: 'The campaign state is not valid.',
    };
  }

  if (stateValidation.state.resolution.cause !== 'none') {
    return {
      ok: false,
      reason: 'run-finished',
      message: 'The run has ended.',
    };
  }

  if (!isRecord(command) || typeof command.type !== 'string') {
    return {
      ok: false,
      reason: 'invalid-command',
      message: 'The command is not valid.',
    };
  }

  const result = routeCommand(stateValidation.state, command);
  if (!result.ok) {
    return result;
  }

  if (result.state.resolution.cause !== 'none') {
    return result;
  }

  const events = evaluateEvents(result.state);
  const run = evaluateRunState(events.state);

  return {
    ok: true,
    state: run.state,
    effects: [...result.effects, ...events.effects, ...run.effects],
  };
};
