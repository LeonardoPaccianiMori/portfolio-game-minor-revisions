import { describe, expect, it } from 'vitest';

import {
  EVENT_CATALOGUE,
  createInitialState,
  deserializeState,
  dispatch,
  evaluateEvents,
  resolveEvent,
  serializeState,
  validateState,
} from '../../src/rules/index.ts';
import type { CampaignState } from '../../src/rules/index.ts';

const EVENT_FLAGS: Readonly<Record<string, boolean>> = Object.fromEntries(
  EVENT_CATALOGUE.map((event) => [`event.${event.id}`, true]),
);

const withEventsBefore = (state: CampaignState, eventId: string): CampaignState => {
  const index = EVENT_CATALOGUE.findIndex((event) => event.id === eventId);
  const flags: Record<string, boolean> = {};

  for (const event of EVENT_CATALOGUE.slice(0, index)) {
    flags[`event.${event.id}`] = true;
  }

  return { ...state, flags: { ...state.flags, ...flags } };
};

describe('authored events', () => {
  it('does not fire an event before its week', () => {
    const result = evaluateEvents(createInitialState(1));

    expect(result.fired).toEqual([]);
    expect(result.state.pendingEvent).toBeNull();
  });

  it('fires the funding review when the week advances to week 2', () => {
    let state = createInitialState(1);

    for (let index = 0; index < 3; index += 1) {
      const result = dispatch(state, { type: 'performAction', action: 'rest' });
      expect(result.ok).toBe(true);
      if (result.ok) {
        state = result.state;
      }
    }

    expect(state.week).toBe(2);
    expect(state.fellowship.requirements.map((requirement) => requirement.id)).toEqual([
      'impact',
      'feasibility',
      'independence',
      'support',
    ]);
    expect(state.flags['event.funding-review']).toBe(true);
    expect(state.pendingEvent).toBeNull();
  });

  it('fires each event once and never repeats it', () => {
    const first = evaluateEvents({ ...createInitialState(1), week: 2 });

    expect(first.fired).toEqual(['funding-review']);
    expect(first.state.flags['event.funding-review']).toBe(true);

    const second = evaluateEvents(first.state);

    expect(second.fired).toEqual([]);
    expect(second.state.fellowship.requirements).toEqual(first.state.fellowship.requirements);
  });

  it('keeps adding the funding review requirements when one already exists', () => {
    const state: CampaignState = {
      ...createInitialState(1),
      week: 2,
      fellowship: {
        ...createInitialState(1).fellowship,
        requirements: [{ id: 'impact', state: 'open', answer: null }],
      },
    };

    const result = evaluateEvents(state);
    const ids = result.state.fellowship.requirements.map((requirement) => requirement.id);

    expect(ids).toEqual(['impact', 'feasibility', 'independence', 'support']);
    expect(result.state.history).not.toContain('pi:add:fellowship:impact');
    expect(result.fired).toEqual(['funding-review']);
  });

  it('fires the catalogue in fixed order', () => {
    const state: CampaignState = {
      ...createInitialState(1),
      week: 12,
      actionsLeft: 0,
    };

    const result = evaluateEvents(state);

    expect(result.fired).toEqual([
      'funding-review',
      'rent',
      'contamination',
      'fellowship-deadline',
      'contract-decision',
    ]);
    expect(result.state.flags['contract.closed']).toBe(true);
    expect(result.state.flags['event.fellowship.missed']).toBe(true);
  });

  it('leaves the contract open until the final week is spent', () => {
    const atWeekTwelve = evaluateEvents({
      ...createInitialState(1),
      week: 12,
      actionsLeft: 3,
      flags: {
        ...EVENT_FLAGS,
        'event.contract-decision': false,
      },
    });

    expect(atWeekTwelve.fired).toEqual([]);
    expect(atWeekTwelve.state.flags['contract.closed']).toBeUndefined();
  });

  it('closes the contract when the last slot of week 12 is spent', () => {
    const state: CampaignState = {
      ...createInitialState(1),
      week: 12,
      actionsLeft: 1,
      flags: { ...EVENT_FLAGS, 'event.contract-decision': false },
    };

    const result = dispatch(state, { type: 'performAction', action: 'rest' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.week).toBe(12);
      expect(result.state.actionsLeft).toBe(0);
      expect(result.state.flags['contract.closed']).toBe(true);
    }
  });

  it('does not mutate the original state', () => {
    const state: CampaignState = { ...createInitialState(1), week: 12, actionsLeft: 0 };
    const before = JSON.stringify(state);

    evaluateEvents(state);

    expect(JSON.stringify(state)).toBe(before);
  });

  it('is deterministic for the same state', () => {
    const state: CampaignState = { ...createInitialState(1), week: 12, actionsLeft: 0 };

    const first = evaluateEvents(state);
    const second = evaluateEvents(state);

    expect(second.state).toEqual(first.state);
    expect(second.fired).toEqual(first.fired);
  });
});

describe('rent choices', () => {
  const rentState = (): CampaignState =>
    withEventsBefore({ ...createInitialState(1), week: 5 }, 'rent');

  it('opens a pending event with the approved choices', () => {
    const result = evaluateEvents(rentState());

    expect(result.state.pendingEvent).toEqual({
      id: 'rent',
      choices: ['ask-advance', 'side-job', 'borrow'],
    });
    expect(result.state.flags['event.rent']).toBe(true);
    expect(result.effects).toContainEqual({
      kind: 'event',
      payload: { id: 'rent', pending: true },
    });
  });

  it('costs standing for the advance', () => {
    const pending = evaluateEvents(rentState()).state;
    const result = resolveEvent(pending, {
      type: 'resolveEvent',
      eventId: 'rent',
      choiceId: 'ask-advance',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.standing).toBe(45);
      expect(result.state.pendingEvent).toBeNull();
      expect(result.state.flags['rent.advance']).toBe(true);
      expect(result.state.history.at(-1)).toBe('resolve:rent:ask-advance');
      expect(result.effects).toContainEqual({
        kind: 'message',
        payload: { messageId: 'message.rent.advance' },
      });
    }
  });

  it('costs an action slot for the side job', () => {
    const pending = evaluateEvents(rentState()).state;
    const result = resolveEvent(pending, {
      type: 'resolveEvent',
      eventId: 'rent',
      choiceId: 'side-job',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.actionsLeft).toBe(2);
      expect(result.state.standing).toBe(50);
    }
  });

  it('costs the Mara relationship for the loan', () => {
    const pending = evaluateEvents(rentState()).state;
    const result = resolveEvent(pending, {
      type: 'resolveEvent',
      eventId: 'rent',
      choiceId: 'borrow',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.relationships.mara).toBe(40);
      expect(result.state.relationships.dario).toBe(50);
    }
  });

  it('clamps a rent cost at the floor', () => {
    const pending = evaluateEvents(rentState()).state;
    const broke: CampaignState = {
      ...pending,
      standing: 3,
      relationships: { ...pending.relationships, mara: 5 },
    };

    const advance = resolveEvent(broke, {
      type: 'resolveEvent',
      eventId: 'rent',
      choiceId: 'ask-advance',
    });
    const borrow = resolveEvent(broke, {
      type: 'resolveEvent',
      eventId: 'rent',
      choiceId: 'borrow',
    });

    expect(advance.ok && advance.state.standing).toBe(0);
    expect(borrow.ok && borrow.state.relationships.mara).toBe(0);
  });

  it('rejects a resolution without a pending event', () => {
    const result = resolveEvent(createInitialState(1), {
      type: 'resolveEvent',
      eventId: 'rent',
      choiceId: 'borrow',
    });

    expect(result).toEqual({
      ok: false,
      reason: 'no-pending-event',
      message: 'That event is not waiting for a choice.',
    });
  });

  it('rejects a resolution for a different event and an unknown choice', () => {
    const pending = evaluateEvents(rentState()).state;

    expect(
      resolveEvent(pending, {
        type: 'resolveEvent',
        eventId: 'contamination',
        choiceId: 'borrow',
      }),
    ).toEqual({
      ok: false,
      reason: 'no-pending-event',
      message: 'That event is not waiting for a choice.',
    });

    expect(
      resolveEvent(pending, {
        type: 'resolveEvent',
        eventId: 'rent',
        choiceId: 'sell-kidney',
      }),
    ).toEqual({
      ok: false,
      reason: 'unknown-choice',
      message: 'That choice is not available.',
    });
  });

  it('does not mutate the pending state on rejection', () => {
    const pending = evaluateEvents(rentState()).state;
    const before = JSON.stringify(pending);

    resolveEvent(pending, {
      type: 'resolveEvent',
      eventId: 'rent',
      choiceId: 'sell-kidney',
    });

    expect(JSON.stringify(pending)).toBe(before);
  });
});

describe('contamination and deadlines', () => {
  const midCampaign = (week: number, eventId: string): CampaignState =>
    withEventsBefore({ ...createInitialState(1), week }, eventId);

  it('stales current evidence and costs standing in the contamination crisis', () => {
    const state: CampaignState = {
      ...midCampaign(6, 'contamination'),
      evidence: [
        { id: 'paper.evidence.sequence.1', state: 'current', track: 'paper', overlap: false },
        { id: 'paper.evidence.sequence.2', state: 'stale', track: 'fellowship', overlap: false },
      ],
    };

    const result = evaluateEvents(state);

    expect(result.fired).toContain('contamination');
    expect(result.state.evidence).toEqual([
      { id: 'paper.evidence.sequence.1', state: 'stale', track: 'paper', overlap: false },
      { id: 'paper.evidence.sequence.2', state: 'stale', track: 'fellowship', overlap: false },
    ]);
    expect(result.state.standing).toBe(45);
    expect(result.state.flags['crisis.contamination']).toBe(true);
    expect(result.effects).toContainEqual({
      kind: 'message',
      payload: { messageId: 'message.contamination' },
    });
  });

  it('marks the fellowship missed when the answers are incomplete', () => {
    const state: CampaignState = {
      ...midCampaign(8, 'fellowship-deadline'),
      fellowship: {
        ...midCampaign(8, 'fellowship-deadline').fellowship,
        requirements: [
          { id: 'impact', state: 'answered', answer: 'honest' },
          { id: 'feasibility', state: 'open', answer: null },
        ],
      },
    };

    const result = evaluateEvents(state);

    expect(result.fired).toContain('fellowship-deadline');
    expect(result.state.standing).toBe(40);
    expect(result.state.flags['event.fellowship.missed']).toBe(true);
    expect(result.state.flags['event.fellowship.submitted']).toBeUndefined();
    expect(result.effects).toContainEqual({
      kind: 'fellowship-missed',
      payload: {},
    });
  });

  it('marks the fellowship submitted when all four answers exist', () => {
    const state: CampaignState = {
      ...midCampaign(8, 'fellowship-deadline'),
      fellowship: {
        ...midCampaign(8, 'fellowship-deadline').fellowship,
        requirements: [
          { id: 'impact', state: 'answered', answer: 'honest' },
          { id: 'feasibility', state: 'answered', answer: 'inflate' },
          { id: 'independence', state: 'answered', answer: 'blank' },
          { id: 'support', state: 'answered', answer: 'imitate' },
        ],
      },
    };

    const result = evaluateEvents(state);

    expect(result.state.flags['event.fellowship.submitted']).toBe(true);
    expect(result.state.flags['event.fellowship.missed']).toBeUndefined();
    expect(result.state.standing).toBe(50);
    expect(result.effects).toContainEqual({
      kind: 'fellowship-submitted',
      payload: {},
    });
  });
});

describe('pending event state', () => {
  it('survives a serialization round trip', () => {
    const state = evaluateEvents(
      withEventsBefore({ ...createInitialState(1), week: 5 }, 'rent'),
    ).state;
    const restored = deserializeState(serializeState(state));

    expect(state.pendingEvent).not.toBeNull();
    expect(restored.ok).toBe(true);
    if (restored.ok) {
      expect(restored.state.pendingEvent).toEqual(state.pendingEvent);
    }
  });

  it('rejects a malformed pending event', () => {
    const empty = validateState({
      ...createInitialState(1),
      pendingEvent: { id: '', choices: [] },
    });
    const badChoices = validateState({
      ...createInitialState(1),
      pendingEvent: { id: 'rent', choices: [3] },
    });

    expect(empty.ok).toBe(false);
    if (!empty.ok) {
      expect(empty.issues).toContain('pendingEvent.id must be a non-empty string');
    }
    expect(badChoices.ok).toBe(false);
    if (!badChoices.ok) {
      expect(badChoices.issues).toContain(
        'pendingEvent.choices must be a list of non-empty strings',
      );
    }
  });
});
