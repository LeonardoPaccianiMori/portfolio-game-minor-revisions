import { ACTIONS_PER_WEEK, ENERGY_MAX, METER_MAX, METER_MIN } from './campaign-state.ts';
import type { CampaignState, RelationshipId } from './campaign-state.ts';
import type {
  CommandRejectionReason,
  CommandResult,
  PresentationEffect,
  ResolveEventCommand,
} from './commands.ts';
import { staleCurrentEvidence } from './evidence.ts';
import { FELLOWSHIP_REQUIREMENT_IDS } from './fellowship.ts';
import { applyReframe } from './manuscript.ts';
import { applyPiRequest } from './pi.ts';
import type { PiRequest } from './pi.ts';

export const FELLOWSHIP_MISSED_STANDING_LOSS = 10;
export const CONTAMINATION_STANDING_LOSS = 5;
export const RENT_ADVANCE_STANDING_LOSS = 5;
export const RENT_BORROW_RELATIONSHIP_LOSS = 10;

export interface EventChoice {
  readonly id: string;
  readonly effects: readonly EventEffect[];
}

export type EventCondition = { readonly kind: 'always' } | { readonly kind: 'weekSlotsSpent' };

export type EventEffect =
  | { readonly kind: 'piRequest'; readonly request: PiRequest }
  | { readonly kind: 'standing'; readonly delta: number }
  | { readonly kind: 'integrity'; readonly delta: number }
  | {
      readonly kind: 'relationship';
      readonly id: RelationshipId;
      readonly delta: number;
    }
  | { readonly kind: 'energy'; readonly delta: number }
  | { readonly kind: 'actionSlots'; readonly delta: number }
  | { readonly kind: 'staleEvidence' }
  | { readonly kind: 'reframe'; readonly framing: string }
  | { readonly kind: 'flag'; readonly flag: string; readonly value: boolean }
  | { readonly kind: 'message'; readonly messageId: string }
  | { readonly kind: 'fellowshipDeadline' };

export interface AuthoredEvent {
  readonly id: string;
  readonly week: number;
  readonly condition?: EventCondition;
  readonly effects?: readonly EventEffect[];
  readonly choices?: readonly EventChoice[];
}

export interface EventOutcome {
  readonly state: CampaignState;
  readonly effects: readonly PresentationEffect[];
  readonly fired: readonly string[];
}

export const EVENT_CATALOGUE: readonly AuthoredEvent[] = [
  {
    id: 'funding-review',
    week: 2,
    effects: [
      {
        kind: 'piRequest',
        request: { kind: 'add-fellowship', requirementId: 'impact' },
      },
      {
        kind: 'piRequest',
        request: { kind: 'add-fellowship', requirementId: 'feasibility' },
      },
      {
        kind: 'piRequest',
        request: { kind: 'add-fellowship', requirementId: 'independence' },
      },
      {
        kind: 'piRequest',
        request: { kind: 'add-fellowship', requirementId: 'support' },
      },
      { kind: 'message', messageId: 'message.funding-review' },
    ],
  },
  {
    id: 'requests-first',
    week: 3,
    effects: [
      { kind: 'piRequest', request: { kind: 'add-paper', requirementId: 'controls' } },
      { kind: 'piRequest', request: { kind: 'add-paper', requirementId: 'replicates' } },
      { kind: 'message', messageId: 'message.requests-first' },
    ],
  },
  {
    id: 'requests-method',
    week: 4,
    effects: [
      { kind: 'piRequest', request: { kind: 'add-paper', requirementId: 'mechanism' } },
      { kind: 'message', messageId: 'message.requests-method' },
    ],
  },
  {
    id: 'rent',
    week: 5,
    choices: [
      {
        id: 'ask-advance',
        effects: [
          { kind: 'standing', delta: -RENT_ADVANCE_STANDING_LOSS },
          { kind: 'flag', flag: 'rent.advance', value: true },
          { kind: 'message', messageId: 'message.rent.advance' },
        ],
      },
      {
        id: 'side-job',
        effects: [
          { kind: 'actionSlots', delta: -1 },
          { kind: 'flag', flag: 'rent.side-job', value: true },
          { kind: 'message', messageId: 'message.rent.side-job' },
        ],
      },
      {
        id: 'borrow',
        effects: [
          {
            kind: 'relationship',
            id: 'mara',
            delta: -RENT_BORROW_RELATIONSHIP_LOSS,
          },
          { kind: 'flag', flag: 'rent.borrow', value: true },
          { kind: 'message', messageId: 'message.rent.borrow' },
        ],
      },
    ],
  },
  {
    id: 'contamination',
    week: 6,
    effects: [
      { kind: 'staleEvidence' },
      { kind: 'standing', delta: -CONTAMINATION_STANDING_LOSS },
      { kind: 'flag', flag: 'crisis.contamination', value: true },
      { kind: 'message', messageId: 'message.contamination' },
    ],
  },
  {
    id: 'requests-impact',
    week: 7,
    effects: [
      { kind: 'reframe', framing: 'agricultural impact' },
      { kind: 'piRequest', request: { kind: 'add-paper', requirementId: 'impact' } },
      { kind: 'piRequest', request: { kind: 'add-paper', requirementId: 'presentation' } },
      { kind: 'message', messageId: 'message.requests-impact' },
    ],
  },
  {
    id: 'fellowship-deadline',
    week: 8,
    effects: [
      { kind: 'fellowshipDeadline' },
      { kind: 'message', messageId: 'message.fellowship-deadline' },
    ],
  },
  {
    id: 'contract-decision',
    week: 12,
    condition: { kind: 'weekSlotsSpent' },
    effects: [
      { kind: 'flag', flag: 'contract.closed', value: true },
      { kind: 'message', messageId: 'message.contract.closed' },
    ],
  },
];

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const rejection = (reason: CommandRejectionReason, message: string): CommandResult => ({
  ok: false,
  reason,
  message,
});

const conditionMatches = (state: CampaignState, condition: EventCondition): boolean =>
  condition.kind === 'always' ? true : state.actionsLeft === 0;

const applyEventEffect = (
  state: CampaignState,
  effect: EventEffect,
): { readonly state: CampaignState; readonly effects: readonly PresentationEffect[] } => {
  if (effect.kind === 'piRequest') {
    const result = applyPiRequest(state, effect.request);
    return result.ok ? { state: result.state, effects: result.effects } : { state, effects: [] };
  }

  if (effect.kind === 'staleEvidence') {
    return {
      state: { ...state, evidence: staleCurrentEvidence(state.evidence) },
      effects: [],
    };
  }

  if (effect.kind === 'reframe') {
    const result = applyReframe(state, effect.framing);
    return result.ok
      ? {
          state: result.state,
          effects: [{ kind: 'reframe', payload: { framing: effect.framing } }],
        }
      : { state, effects: [] };
  }

  if (effect.kind === 'fellowshipDeadline') {
    const answered = FELLOWSHIP_REQUIREMENT_IDS.every((id) =>
      state.fellowship.requirements.some(
        (requirement) => requirement.id === id && requirement.state === 'answered',
      ),
    );

    if (answered) {
      return {
        state: {
          ...state,
          flags: { ...state.flags, 'event.fellowship.submitted': true },
        },
        effects: [{ kind: 'fellowship-submitted', payload: {} }],
      };
    }

    return {
      state: {
        ...state,
        standing: clamp(state.standing - FELLOWSHIP_MISSED_STANDING_LOSS, METER_MIN, METER_MAX),
        flags: { ...state.flags, 'event.fellowship.missed': true },
      },
      effects: [{ kind: 'fellowship-missed', payload: {} }],
    };
  }

  if (effect.kind === 'message') {
    return {
      state,
      effects: [{ kind: 'message', payload: { messageId: effect.messageId } }],
    };
  }

  if (effect.kind === 'flag') {
    return {
      state: { ...state, flags: { ...state.flags, [effect.flag]: effect.value } },
      effects: [],
    };
  }

  if (effect.kind === 'standing') {
    return {
      state: {
        ...state,
        standing: clamp(state.standing + effect.delta, METER_MIN, METER_MAX),
      },
      effects: [],
    };
  }

  if (effect.kind === 'integrity') {
    return {
      state: {
        ...state,
        integrity: clamp(state.integrity + effect.delta, METER_MIN, METER_MAX),
      },
      effects: [],
    };
  }

  if (effect.kind === 'energy') {
    return {
      state: {
        ...state,
        energy: clamp(state.energy + effect.delta, 0, ENERGY_MAX),
      },
      effects: [],
    };
  }

  if (effect.kind === 'actionSlots') {
    return {
      state: {
        ...state,
        actionsLeft: clamp(state.actionsLeft + effect.delta, 0, ACTIONS_PER_WEEK),
      },
      effects: [],
    };
  }

  return {
    state: {
      ...state,
      relationships: {
        ...state.relationships,
        [effect.id]: clamp(state.relationships[effect.id] + effect.delta, METER_MIN, METER_MAX),
      },
    },
    effects: [],
  };
};

export const evaluateEvents = (
  state: CampaignState,
  catalogue: readonly AuthoredEvent[] = EVENT_CATALOGUE,
): EventOutcome => {
  let next = state;
  const effects: PresentationEffect[] = [];
  const fired: string[] = [];

  for (const event of catalogue) {
    const flag = `event.${event.id}`;

    if (next.flags[flag] === true) {
      continue;
    }

    if (next.week < event.week) {
      continue;
    }

    if (event.condition !== undefined && !conditionMatches(next, event.condition)) {
      continue;
    }

    if (event.choices !== undefined && event.choices.length > 0) {
      next = {
        ...next,
        pendingEvent: {
          id: event.id,
          choices: event.choices.map((choice) => choice.id),
        },
        flags: { ...next.flags, [flag]: true },
      };
      effects.push({ kind: 'event', payload: { id: event.id, pending: true } });
      fired.push(event.id);
      continue;
    }

    for (const effect of event.effects ?? []) {
      const applied = applyEventEffect(next, effect);
      next = applied.state;
      effects.push(...applied.effects);
    }

    next = { ...next, flags: { ...next.flags, [flag]: true } };
    effects.push({ kind: 'event', payload: { id: event.id } });
    fired.push(event.id);
  }

  return { state: next, effects, fired };
};

export const resolveEvent = (state: CampaignState, command: ResolveEventCommand): CommandResult => {
  const pending = state.pendingEvent;

  if (pending === null || pending.id !== command.eventId) {
    return rejection('no-pending-event', 'That event is not waiting for a choice.');
  }

  const event = EVENT_CATALOGUE.find((candidate) => candidate.id === pending.id);
  const choice = event?.choices?.find((candidate) => candidate.id === command.choiceId);

  if (choice === undefined) {
    return rejection('unknown-choice', 'That choice is not available.');
  }

  let next = state;
  const effects: PresentationEffect[] = [];

  for (const effect of choice.effects) {
    const applied = applyEventEffect(next, effect);
    next = applied.state;
    effects.push(...applied.effects);
  }

  next = {
    ...next,
    pendingEvent: null,
    history: [...next.history, `resolve:${command.eventId}:${command.choiceId}`],
  };

  return { ok: true, state: next, effects };
};
