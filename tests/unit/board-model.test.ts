import { describe, expect, it } from 'vitest';

import { createBoardView } from '../../src/ui/index.ts';
import { createInitialState, dispatch, evaluateEvents } from '../../src/rules/index.ts';
import type { CampaignState, Command } from '../../src/rules/index.ts';

const perform = (state: CampaignState, command: Command): CampaignState => {
  const result = dispatch(state, command);

  if (!result.ok) {
    throw new Error(result.message);
  }

  return result.state;
};

describe('the board view model', () => {
  it('shows the resources and keeps integrity hidden', () => {
    const view = createBoardView(createInitialState(1));

    expect(view.resources).toEqual({
      week: 1,
      weekMax: 12,
      actionsLeft: 3,
      actionsPerWeek: 3,
      energy: 5,
      energyMax: 5,
      standing: 50,
      trust: { voss: 50, dario: 50, mara: 50 },
    });
    expect(Object.keys(view.resources)).not.toContain('integrity');
    expect(JSON.stringify(view.resources)).not.toContain('integrity');
  });

  it('lists only the actions with real effects', () => {
    const view = createBoardView(createInitialState(1));

    expect(view.actions.map((action) => action.id)).toEqual([
      'experiment',
      'analyse',
      'write-paper',
      'meet-pi',
      'rest',
    ]);
    expect(view.actions.find((action) => action.id === 'rest')?.cost).toBe(
      '2 energy, one action slot',
    );
    expect(view.actions.some((action) => action.id === 'write-fellowship')).toBe(false);
    expect(view.actions.some((action) => action.id === 'colleague')).toBe(false);
  });

  it('describes the complicity shortcuts with their approved effects', () => {
    const view = createBoardView(createInitialState(1));

    expect(view.complicity).toHaveLength(5);
    expect(view.complicity.find((shortcut) => shortcut.id === 'inflate-claim')?.cost).toBe(
      'standing +10, integrity -15',
    );
    expect(view.complicity.find((shortcut) => shortcut.id === 'take-credit')?.cost).toBe(
      'standing +10, integrity -10, dario -20',
    );
    expect(view.complicity.find((shortcut) => shortcut.id === 'drop-replicate')?.cost).toBe(
      'integrity -10, +1 slot',
    );
    expect(view.complicity.every((shortcut) => shortcut.command.type === 'comply')).toBe(true);
  });

  it('maps the manuscript with its requirements and start controls', () => {
    const state = evaluateEvents({ ...createInitialState(1), week: 3 }).state;
    const view = createBoardView(state);

    expect(view.paper.requirements.map((requirement) => requirement.id)).toEqual([
      'controls',
      'replicates',
    ]);
    expect(view.paper.requirements[0]?.canStart).toBe(true);
    expect(view.paper.requirements[0]?.startCommand).toEqual({
      type: 'startExperiment',
      requirementId: 'controls',
    });
    expect(view.paper.evidence).toEqual([]);
  });

  it('maps the fellowship with its deadline and answer choices', () => {
    const state = evaluateEvents({ ...createInitialState(1), week: 4 }).state;
    const view = createBoardView(state);

    expect(view.fellowship.requirements).toHaveLength(4);
    expect(view.fellowship.deadlineWeek).toBe(8);
    expect(view.fellowship.outcome).toBe('pending');
    expect(view.fellowship.requirements[0]?.answers.map((answer) => answer.id)).toEqual([
      'honest',
      'inflate',
      'fabricate',
      'imitate',
      'blank',
    ]);
    expect(view.fellowship.requirements[0]?.answers[0]?.command).toEqual({
      type: 'answerRequirement',
      requirementId: 'impact',
      answer: 'honest',
    });
  });

  it('lists finished results with their attach commands', () => {
    let state = evaluateEvents({ ...createInitialState(1), week: 3 }).state;
    state = perform(state, { type: 'startExperiment', requirementId: 'controls' });

    for (let step = 0; step < 3; step += 1) {
      state = perform(state, { type: 'performAction', action: 'experiment' });
    }

    const view = createBoardView(state);

    expect(view.results).toHaveLength(1);
    expect(view.results[0]?.commands).toEqual([
      { type: 'assignEvidence', evidenceId: 'experiment.controls.1', track: 'paper' },
      { type: 'assignEvidence', evidenceId: 'experiment.controls.1', track: 'fellowship' },
      { type: 'assignEvidence', evidenceId: 'experiment.controls.1', track: 'both' },
    ]);
  });

  it('shows the pending rent event with labelled choices', () => {
    let state = createInitialState(1);

    for (let week = 0; week < 4; week += 1) {
      state = perform(state, { type: 'advanceWeek' });
    }

    const view = createBoardView(state);

    expect(state.week).toBe(5);
    expect(view.pendingEvent?.id).toBe('rent');
    expect(view.pendingEvent?.label).toBe('The rent is due');
    expect(view.pendingEvent?.choices.map((choice) => choice.id)).toEqual([
      'ask-advance',
      'side-job',
      'borrow',
    ]);
    expect(view.pendingEvent?.choices[2]?.label).toContain('Borrow');
    expect(view.pendingEvent?.choices[2]?.command).toEqual({
      type: 'resolveEvent',
      eventId: 'rent',
      choiceId: 'borrow',
    });
  });
});
