import { ACTIONS_PER_WEEK, ENERGY_MAX, METER_MIN, WEEK_MAX } from './campaign-state.ts';
import type { CampaignState } from './campaign-state.ts';
import { ACTION_IDS } from './commands.ts';
import type {
  ActionId,
  CommandRejectionReason,
  CommandResult,
  PresentationEffect,
  PerformActionCommand,
} from './commands.ts';

export const ACTION_ENERGY_COSTS: Readonly<Record<ActionId, number>> = {
  experiment: -1,
  analyse: -1,
  'write-paper': -1,
  'write-fellowship': -1,
  'meet-pi': 0,
  colleague: 0,
  rest: 2,
};

export const CRASH_STANDING_LOSS = 10;

const rejection = (reason: CommandRejectionReason, message: string): CommandResult => ({
  ok: false,
  reason,
  message,
});

const advanceNormalWeek = (state: CampaignState): CampaignState => ({
  ...state,
  week: state.week + 1,
  actionsLeft: ACTIONS_PER_WEEK,
  energy: Math.min(ENERGY_MAX, state.energy + 1),
  history: [...state.history, `week:${state.week + 1}`],
});

export const performAction = (
  state: CampaignState,
  command: PerformActionCommand,
): CommandResult => {
  if (!ACTION_IDS.includes(command.action)) {
    return rejection('invalid-command', 'The action is not valid.');
  }

  if (state.crashed) {
    return rejection('week-lost', 'This week is lost. End the week to recover.');
  }

  if (state.actionsLeft <= 0) {
    if (state.week >= WEEK_MAX) {
      return rejection('contract-finished', 'The contract is finished.');
    }

    return rejection('no-actions-left', 'No actions remain this week.');
  }

  const energyCost = ACTION_ENERGY_COSTS[command.action];
  if (energyCost < 0 && state.energy + energyCost < 0) {
    return rejection('insufficient-energy', 'Not enough energy for this action.');
  }

  const effects: PresentationEffect[] = [{ kind: 'action', payload: { action: command.action } }];
  const energy = Math.min(ENERGY_MAX, state.energy + energyCost);
  const history = [...state.history, `action:${command.action}`];

  if (energyCost < 0 && energy <= 0) {
    const week = state.week >= WEEK_MAX ? WEEK_MAX : state.week + 1;

    effects.push({ kind: 'crash', payload: { week } });

    return {
      ok: true,
      state: {
        ...state,
        energy,
        history: [...history, 'crash'],
        crashed: true,
        standing: Math.max(METER_MIN, state.standing - CRASH_STANDING_LOSS),
        week,
        actionsLeft: 0,
      },
      effects,
    };
  }

  let next: CampaignState = {
    ...state,
    energy,
    actionsLeft: state.actionsLeft - 1,
    history,
  };

  if (next.actionsLeft === 0 && state.week < WEEK_MAX) {
    next = advanceNormalWeek(next);
    effects.push({ kind: 'week-advanced', payload: { week: next.week } });
  }

  return { ok: true, state: next, effects };
};

export const advanceWeek = (state: CampaignState): CommandResult => {
  if (state.crashed) {
    if (state.week >= WEEK_MAX) {
      return rejection('contract-finished', 'The contract is finished.');
    }

    const week = state.week + 1;

    return {
      ok: true,
      state: {
        ...state,
        crashed: false,
        week,
        actionsLeft: ACTIONS_PER_WEEK,
        history: [...state.history, `week:${week}`],
      },
      effects: [{ kind: 'week-advanced', payload: { week } }],
    };
  }

  if (state.week >= WEEK_MAX) {
    if (state.actionsLeft > 0) {
      return {
        ok: true,
        state: {
          ...state,
          actionsLeft: 0,
          history: [...state.history, 'contract:closed'],
        },
        effects: [{ kind: 'contract-closed', payload: {} }],
      };
    }

    return rejection('contract-finished', 'The contract is finished.');
  }

  const next = advanceNormalWeek(state);

  return {
    ok: true,
    state: next,
    effects: [{ kind: 'week-advanced', payload: { week: next.week } }],
  };
};
