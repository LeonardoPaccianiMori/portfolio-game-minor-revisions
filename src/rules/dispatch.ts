import { validateState } from './campaign-state.ts';
import type { CampaignState } from './campaign-state.ts';
import type { Command, CommandResult } from './commands.ts';
import { assignEvidence } from './evidence.ts';
import { answerRequirement } from './fellowship.ts';
import { comply, meetPI } from './pi.ts';
import { advanceWeek, performAction } from './week-loop.ts';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const dispatch = (state: CampaignState, command: Command): CommandResult => {
  const stateValidation = validateState(state);
  if (!stateValidation.ok) {
    return {
      ok: false,
      reason: 'invalid-state',
      message: 'The campaign state is not valid.',
    };
  }

  if (!isRecord(command) || typeof command.type !== 'string') {
    return {
      ok: false,
      reason: 'invalid-command',
      message: 'The command is not valid.',
    };
  }

  if (command.type === 'performAction') {
    return performAction(stateValidation.state, command);
  }

  if (command.type === 'assignEvidence') {
    return assignEvidence(stateValidation.state, command);
  }

  if (command.type === 'answerRequirement') {
    return answerRequirement(stateValidation.state, command);
  }

  if (command.type === 'meetPI') {
    return meetPI(stateValidation.state);
  }

  if (command.type === 'comply') {
    return comply(stateValidation.state, command);
  }

  if (command.type === 'advanceWeek') {
    return advanceWeek(stateValidation.state);
  }

  return {
    ok: false,
    reason: 'not-implemented',
    message: `The ${command.type} rules are not implemented yet.`,
  };
};
