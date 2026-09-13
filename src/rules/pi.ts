import { ACTIONS_PER_WEEK, METER_MAX, METER_MIN, WEEK_MAX } from './campaign-state.ts';
import type { CampaignState, RelationshipId } from './campaign-state.ts';
import { COMPLICITY_ACTIONS } from './commands.ts';
import type {
  CommandRejectionReason,
  CommandResult,
  ComplicityAction,
  ComplyCommand,
  PresentationEffect,
} from './commands.ts';
import { applyFellowshipEdit } from './fellowship.ts';
import type { FellowshipRequirementId } from './fellowship.ts';
import { applyReframe } from './manuscript.ts';
import { applyPaperEdit } from './paper.ts';
import type { PaperRequirementId } from './paper.ts';
import { spendActionSlot } from './week-loop.ts';

export type PiRequest =
  | { readonly kind: 'add-paper'; readonly requirementId: PaperRequirementId }
  | { readonly kind: 'add-fellowship'; readonly requirementId: FellowshipRequirementId }
  | { readonly kind: 'reframe'; readonly framing: string }
  | { readonly kind: 'revert-paper'; readonly requirementId: PaperRequirementId }
  | { readonly kind: 'revert-fellowship'; readonly requirementId: FellowshipRequirementId };

export interface PiRequestOk {
  readonly ok: true;
  readonly state: CampaignState;
  readonly effects: readonly PresentationEffect[];
}

export interface PiRequestFailure {
  readonly ok: false;
  readonly reason: string;
}

export type PiRequestOutcome = PiRequestOk | PiRequestFailure;

interface ComplicityEffect {
  readonly standing: number;
  readonly integrity: number;
  readonly slots: number;
  readonly relationships: Readonly<Partial<Record<RelationshipId, number>>>;
}

export const COMPLICITY_EFFECTS: Readonly<Record<ComplicityAction, ComplicityEffect>> = {
  'inflate-claim': { standing: 10, integrity: -15, slots: 0, relationships: {} },
  'drop-replicate': { standing: 0, integrity: -10, slots: 1, relationships: {} },
  'take-credit': { standing: 10, integrity: -10, slots: 0, relationships: { dario: -20 } },
  'flatter-pi': { standing: 0, integrity: -5, slots: 0, relationships: { voss: 10 } },
  'dump-work': { standing: 0, integrity: -10, slots: 1, relationships: { mara: -15 } },
};

const rejection = (reason: CommandRejectionReason, message: string): CommandResult => ({
  ok: false,
  reason,
  message,
});

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const withHistory = (state: CampaignState, entry: string): CampaignState => ({
  ...state,
  history: [...state.history, entry],
});

export const applyPiRequest = (state: CampaignState, request: PiRequest): PiRequestOutcome => {
  if (request.kind === 'reframe') {
    const result = applyReframe(state, request.framing);
    if (!result.ok) {
      return { ok: false, reason: result.reason };
    }

    return {
      ok: true,
      state: withHistory(result.state, 'pi:reframe'),
      effects: [{ kind: 'pi-reframe', payload: { framing: request.framing } }],
    };
  }

  if (request.kind === 'add-paper' || request.kind === 'revert-paper') {
    const result = applyPaperEdit(
      state.paper,
      request.kind === 'add-paper'
        ? { kind: 'add', requirementId: request.requirementId }
        : { kind: 'revert', requirementId: request.requirementId },
    );
    if (!result.ok) {
      return { ok: false, reason: result.reason };
    }

    const entry =
      request.kind === 'add-paper'
        ? `pi:add:paper:${request.requirementId}`
        : `pi:revert:paper:${request.requirementId}`;

    return {
      ok: true,
      state: withHistory({ ...state, paper: result.paper }, entry),
      effects: [{ kind: request.kind, payload: { requirementId: request.requirementId } }],
    };
  }

  const result = applyFellowshipEdit(
    state.fellowship,
    request.kind === 'add-fellowship'
      ? { kind: 'add', requirementId: request.requirementId }
      : { kind: 'revert', requirementId: request.requirementId },
  );
  if (!result.ok) {
    return { ok: false, reason: result.reason };
  }

  const entry =
    request.kind === 'add-fellowship'
      ? `pi:add:fellowship:${request.requirementId}`
      : `pi:revert:fellowship:${request.requirementId}`;

  return {
    ok: true,
    state: withHistory({ ...state, fellowship: result.fellowship }, entry),
    effects: [{ kind: request.kind, payload: { requirementId: request.requirementId } }],
  };
};

export const meetPI = (state: CampaignState): CommandResult => {
  if (state.crashed) {
    return rejection('week-lost', 'This week is lost. End the week to recover.');
  }

  if (state.actionsLeft <= 0) {
    if (state.week >= WEEK_MAX) {
      return rejection('contract-finished', 'The contract is finished.');
    }

    return rejection('no-actions-left', 'No actions remain this week.');
  }

  const spent = spendActionSlot(state, 'meeting:pi');
  const effects: PresentationEffect[] = [
    { kind: 'pi-meeting', payload: { week: spent.state.week } },
  ];

  if (spent.advanced) {
    effects.push({ kind: 'week-advanced', payload: { week: spent.state.week } });
  }

  return { ok: true, state: spent.state, effects };
};

export const comply = (state: CampaignState, command: ComplyCommand): CommandResult => {
  if (!COMPLICITY_ACTIONS.includes(command.action)) {
    return rejection('invalid-command', 'The complicity action is not valid.');
  }

  if (state.crashed) {
    return rejection('week-lost', 'This week is lost. End the week to recover.');
  }

  if (state.week >= WEEK_MAX && state.actionsLeft <= 0) {
    return rejection('contract-finished', 'The contract is finished.');
  }

  const effect = COMPLICITY_EFFECTS[command.action];
  const relationships = { ...state.relationships };

  for (const [id, delta] of Object.entries(effect.relationships)) {
    const key = id as RelationshipId;
    relationships[key] = clamp(state.relationships[key] + (delta ?? 0), METER_MIN, METER_MAX);
  }

  const next: CampaignState = {
    ...state,
    standing: clamp(state.standing + effect.standing, METER_MIN, METER_MAX),
    integrity: clamp(state.integrity + effect.integrity, METER_MIN, METER_MAX),
    actionsLeft: clamp(state.actionsLeft + effect.slots, 0, ACTIONS_PER_WEEK),
    relationships,
    flags: { ...state.flags, [`complicity.${command.action}`]: true },
    history: [...state.history, `comply:${command.action}`],
  };

  return {
    ok: true,
    state: next,
    effects: [
      {
        kind: 'complicity',
        payload: {
          action: command.action,
          standing: effect.standing,
          integrity: effect.integrity,
          slots: effect.slots,
        },
      },
    ],
  };
};
