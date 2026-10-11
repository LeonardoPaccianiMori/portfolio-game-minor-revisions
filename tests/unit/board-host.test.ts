import { describe, expect, it } from 'vitest';

import { createBoardHost } from '../../src/ui/index.ts';
import type { Board, BoardHost, BoardView } from '../../src/ui/index.ts';
import type { Command, PresentationEffect } from '../../src/rules/index.ts';

interface FakeOutcome {
  readonly ok: boolean;
  readonly message?: string;
  readonly effects?: readonly PresentationEffect[];
}

const createFakes = () => {
  let open = false;
  let focused = false;
  let opened = 0;
  let closed = 0;
  let activations = 0;
  let outcome: FakeOutcome = { ok: true, effects: [] };
  const renders: (string | null)[] = [];
  const moves: number[] = [];
  const commands: Command[] = [];

  const board: Board = {
    element: null as unknown as HTMLElement,
    open: () => {
      open = true;
      opened += 1;
    },
    close: () => {
      open = false;
      closed += 1;
    },
    isOpen: () => open,
    hasFocus: () => focused,
    render: (_view: BoardView, feedback: string | null) => {
      renders.push(feedback);
    },
    moveFocus: (step: 1 | -1) => {
      moves.push(step);
    },
    activate: () => {
      activations += 1;
    },
    dispose: () => undefined,
  };

  return {
    board,
    session: {
      perform: (command: Command) => {
        commands.push(command);

        return outcome;
      },
    },
    setFocus: (value: boolean) => {
      focused = value;
    },
    setOutcome: (next: FakeOutcome) => {
      outcome = next;
    },
    renders,
    moves,
    commands,
    opened: () => opened,
    closed: () => closed,
    activations: () => activations,
  };
};

const createHost = (fakes: ReturnType<typeof createFakes>) =>
  createBoardHost({
    board: fakes.board,
    session: fakes.session,
    view: () => ({ pendingEvent: null }) as unknown as BoardView,
  });

describe('the board host', () => {
  it('opens once, renders, and closes once', () => {
    const fakes = createFakes();
    const host: BoardHost = createHost(fakes);

    host.open();
    host.open();
    expect(fakes.opened()).toBe(1);
    expect(host.isOpen()).toBe(true);
    expect(fakes.renders).toEqual([null]);

    host.close();
    host.close();
    expect(fakes.closed()).toBe(1);
    expect(host.isOpen()).toBe(false);
  });

  it('shows plain complicity feedback after a successful shortcut', () => {
    const fakes = createFakes();
    const host = createHost(fakes);
    fakes.setOutcome({
      ok: true,
      effects: [
        {
          kind: 'complicity',
          payload: { action: 'inflate-claim', standing: 10, integrity: -15, slots: 0 },
        },
      ],
    });

    host.perform({ type: 'comply', action: 'inflate-claim' });

    expect(fakes.renders.at(-1)).toBe('You chose to inflate a claim. standing +10, integrity -15.');
  });

  it('shows a rejection message and no feedback for a plain success', () => {
    const fakes = createFakes();
    const host = createHost(fakes);

    host.perform({ type: 'performAction', action: 'rest' });
    expect(fakes.renders.at(-1)).toBeNull();

    fakes.setOutcome({ ok: false, message: 'No experiment is in progress.' });
    host.perform({ type: 'performAction', action: 'experiment' });
    expect(fakes.renders.at(-1)).toBe('No experiment is in progress.');
  });

  it('moves focus on the vertical edge only', () => {
    const fakes = createFakes();
    const host = createHost(fakes);

    host.open();
    host.handleInput(false, 1);
    host.handleInput(false, 1);
    host.handleInput(false, 0);
    host.handleInput(false, 1);

    expect(fakes.moves).toEqual([-1, -1]);
  });

  it('activates the focused control and closes when focus is outside', () => {
    const fakes = createFakes();
    const host = createHost(fakes);

    host.open();

    fakes.setFocus(true);
    host.handleInput(true, 0);
    host.handleInput(true, 0);
    host.handleInput(false, 0);
    host.handleInput(true, 0);

    expect(fakes.activations()).toBe(1);

    fakes.setFocus(false);
    host.handleInput(false, 0);
    host.handleInput(true, 0);

    expect(fakes.closed()).toBe(1);
    expect(host.isOpen()).toBe(false);
  });

  it('ignores input while closed', () => {
    const fakes = createFakes();
    const host = createHost(fakes);

    host.handleInput(true, 1);

    expect(fakes.moves).toEqual([]);
    expect(fakes.activations()).toBe(0);
  });
});
