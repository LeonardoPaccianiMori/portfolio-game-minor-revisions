import type { Command } from '../rules/index.ts';
import type { BoardView } from './board-model.ts';

export interface BoardCallbacks {
  readonly onCommand: (command: Command) => void;
  readonly onClose: () => void;
}

export interface Board {
  readonly element: HTMLElement;
  open(): void;
  close(): void;
  isOpen(): boolean;
  hasFocus(): boolean;
  render(view: BoardView, feedback: string | null): void;
  moveFocus(step: 1 | -1): void;
  activate(): void;
  dispose(): void;
}

const element = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  text?: string,
  className?: string,
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);

  if (text !== undefined) {
    node.textContent = text;
  }

  if (className !== undefined) {
    node.className = className;
  }

  return node;
};

export const createBoard = (parent: HTMLElement, callbacks: BoardCallbacks): Board => {
  const root = element('section');
  root.id = 'desk-board';
  root.hidden = true;
  root.setAttribute('aria-label', 'Desk board');
  parent.appendChild(root);

  let buttons: HTMLButtonElement[] = [];
  let lastView: BoardView | null = null;
  let lastFeedback: string | null = null;
  let pendingConfirm: Command | null = null;
  let previouslyFocused: HTMLElement | null = null;
  let pendingFocus = false;

  const addButton = (
    container: HTMLElement,
    label: string,
    command: Command,
    options: {
      readonly confirm?: boolean;
      readonly detail?: string;
      readonly focusKey?: string;
    } = {},
  ): void => {
    const button = element('button', label, 'board-button');
    button.type = 'button';
    button.dataset['focusKey'] = options.focusKey ?? JSON.stringify(command);

    if (options.detail !== undefined) {
      button.title = options.detail;
    }

    button.addEventListener('click', () => {
      if (options.confirm === true && pendingConfirm !== command) {
        pendingConfirm = command;
        if (lastView !== null) {
          render(lastView, lastFeedback);
        }

        return;
      }

      pendingConfirm = null;
      callbacks.onCommand(command);
    });

    container.appendChild(button);
    buttons.push(button);
  };

  const list = (container: HTMLElement, items: readonly string[]): void => {
    const ul = element('ul', undefined, 'board-list');

    for (const item of items) {
      ul.appendChild(element('li', item));
    }

    container.appendChild(ul);
  };

  const render = (view: BoardView, feedback: string | null): void => {
    lastView = view;
    lastFeedback = feedback;
    const active = document.activeElement;
    const focusKey =
      active instanceof HTMLButtonElement ? (active.dataset['focusKey'] ?? null) : null;
    buttons = [];
    root.replaceChildren();

    const header = element('header', undefined, 'board-header');
    header.appendChild(element('h2', 'Desk board'));
    const close = element('button', 'Close (Escape)', 'board-close');
    close.type = 'button';
    close.dataset['focusKey'] = 'close';
    close.addEventListener('click', () => {
      callbacks.onClose();
    });
    header.appendChild(close);
    root.appendChild(header);

    if (feedback !== null) {
      root.appendChild(element('p', feedback, 'board-feedback'));
    }

    if (view.pendingEvent !== null) {
      const card = element('section', undefined, 'board-card board-event');
      card.appendChild(element('h3', view.pendingEvent.label));
      const choiceList = element('div', undefined, 'board-choices');

      for (const choice of view.pendingEvent.choices) {
        addButton(choiceList, choice.label, choice.command);
      }

      card.appendChild(choiceList);
      root.appendChild(card);
    }

    const columns = element('div', undefined, 'board-columns');

    const left = element('section', undefined, 'board-column');
    left.appendChild(element('h3', 'Resources'));
    const { resources } = view;
    list(left, [
      `Week ${String(resources.week)} of ${String(resources.weekMax)}`,
      `Actions left this week: ${String(resources.actionsLeft)} of ${String(resources.actionsPerWeek)}`,
      `Energy: ${String(resources.energy)} of ${String(resources.energyMax)}`,
      `Standing: ${String(resources.standing)}`,
      `Trust — Voss: ${String(resources.trust.voss)}, Dario: ${String(resources.trust.dario)}, Mara: ${String(resources.trust.mara)}`,
    ]);

    left.appendChild(element('h3', 'Actions'));
    const actionList = element('div', undefined, 'board-actions');

    for (const action of view.actions) {
      const row = element('p', undefined, 'board-action-row');
      addButton(row, `${action.label} (${action.cost})`, action.command, {
        detail: action.detail,
      });
      row.appendChild(element('small', action.detail, 'board-detail'));
      actionList.appendChild(row);
    }

    left.appendChild(actionList);

    left.appendChild(element('h3', 'Shortcuts'));
    const shortcutList = element('div', undefined, 'board-actions');

    for (const shortcut of view.complicity) {
      addButton(
        shortcutList,
        pendingConfirm === shortcut.command
          ? `Confirm — ${shortcut.cost}`
          : `${shortcut.label} (${shortcut.cost})`,
        shortcut.command,
        { confirm: true, detail: shortcut.cost },
      );
    }

    left.appendChild(shortcutList);
    columns.appendChild(left);

    const middle = element('section', undefined, 'board-column');
    middle.appendChild(element('h3', 'Manuscript'));
    list(middle, [`Framing: ${view.paper.framing}`]);
    const requirements = element('div', undefined, 'board-actions');

    for (const requirement of view.paper.requirements) {
      const row = element('p', `${requirement.label}: ${requirement.state}`);

      if (requirement.progress !== null) {
        row.textContent = `${requirement.label}: ${requirement.progress}`;
      }

      middle.appendChild(row);

      if (requirement.startCommand !== null) {
        addButton(requirements, `Start ${requirement.label}`, requirement.startCommand);
      }
    }

    middle.appendChild(requirements);
    middle.appendChild(element('h3', 'Evidence'));
    list(
      middle,
      view.paper.evidence.length === 0
        ? ['None yet']
        : view.paper.evidence.map(
            (entry) =>
              `${entry.id} — ${entry.state}, assigned to ${entry.track}${entry.overlap ? ', overlap' : ''}`,
          ),
    );

    if (view.results.length > 0) {
      middle.appendChild(element('h3', 'Finished results'));
      const results = element('div', undefined, 'board-actions');

      for (const result of view.results) {
        for (const [index, command] of result.commands.entries()) {
          addButton(
            results,
            `Attach ${result.label} to ${['paper', 'fellowship', 'both'][index] ?? 'both'}`,
            command,
          );
        }
      }

      middle.appendChild(results);
    }

    columns.appendChild(middle);

    const right = element('section', undefined, 'board-column');
    right.appendChild(element('h3', 'Fellowship'));
    list(right, [
      `Framing: ${view.fellowship.framing}`,
      `Deadline: week ${String(view.fellowship.deadlineWeek)}`,
      `Outcome: ${view.fellowship.outcome}`,
    ]);

    for (const requirement of view.fellowship.requirements) {
      right.appendChild(
        element(
          'p',
          `${requirement.label}: ${requirement.state}${requirement.answer !== null ? ` (${requirement.answer})` : ''}`,
        ),
      );
      const answers = element('div', undefined, 'board-answers');

      for (const answer of requirement.answers) {
        addButton(answers, `${requirement.label}: ${answer.label}`, answer.command);
      }

      right.appendChild(answers);
    }

    columns.appendChild(right);
    root.appendChild(columns);
    buttons.push(close);

    if (pendingFocus) {
      pendingFocus = false;
      buttons[0]?.focus();
    } else if (focusKey !== null) {
      buttons.find((button) => button.dataset['focusKey'] === focusKey)?.focus();
    }
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && root.hidden === false) {
      callbacks.onClose();
    }
  };

  document.addEventListener('keydown', onKeyDown);

  return {
    element: root,
    open() {
      previouslyFocused =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      pendingFocus = true;
      root.hidden = false;
    },
    close() {
      root.hidden = true;
      pendingConfirm = null;

      if (previouslyFocused?.isConnected === true) {
        previouslyFocused.focus();
      }
    },
    isOpen() {
      return root.hidden === false;
    },
    hasFocus() {
      return root.contains(document.activeElement);
    },
    render,
    moveFocus(step) {
      if (buttons.length === 0) {
        return;
      }

      const active = document.activeElement;
      const current = buttons.findIndex((button) => button === active);
      const next =
        current === -1
          ? step > 0
            ? 0
            : buttons.length - 1
          : (current + step + buttons.length) % buttons.length;
      buttons[next]?.focus();
    },
    activate() {
      const active = document.activeElement;

      if (active instanceof HTMLButtonElement && buttons.includes(active)) {
        active.click();
        return;
      }

      buttons[0]?.focus();
    },
    dispose() {
      document.removeEventListener('keydown', onKeyDown);
      root.remove();
    },
  };
};
