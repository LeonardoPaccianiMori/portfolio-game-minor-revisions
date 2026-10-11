import type { Command, ComplicityAction, PresentationEffect } from '../rules/index.ts';
import type { Board } from './board.ts';
import { complicityLabel } from './board-model.ts';
import type { BoardView } from './board-model.ts';

export interface BoardHostSession {
  perform(command: Command): {
    readonly ok: boolean;
    readonly message?: string;
    readonly effects?: readonly PresentationEffect[];
  };
}

export interface BoardHostOptions {
  readonly board: Board;
  readonly session: BoardHostSession;
  readonly view: () => BoardView;
  readonly onOpen?: () => void;
  readonly onClose?: () => void;
}

export interface BoardHost {
  open(): void;
  close(): void;
  isOpen(): boolean;
  perform(command: Command): void;
  handleInput(interact: boolean, vertical: number): void;
  refresh(): void;
}

const describeComplicitySuccess = (effects: readonly PresentationEffect[]): string | null => {
  const effect = effects.find((candidate) => candidate.kind === 'complicity');

  if (effect === undefined) {
    return null;
  }

  const action = effect.payload['action'] as ComplicityAction;
  const standing = effect.payload['standing'];
  const integrity = effect.payload['integrity'];
  const slots = effect.payload['slots'];
  const parts: string[] = [];

  if (typeof standing === 'number' && standing !== 0) {
    parts.push(`standing ${standing > 0 ? '+' : ''}${standing}`);
  }

  if (typeof integrity === 'number' && integrity !== 0) {
    parts.push(`integrity ${integrity}`);
  }

  if (typeof slots === 'number' && slots !== 0) {
    parts.push(`${slots > 0 ? '+' : ''}${slots} slot`);
  }

  return `You chose to ${complicityLabel(action).toLowerCase()}. ${parts.join(', ')}.`;
};

export const createBoardHost = (options: BoardHostOptions): BoardHost => {
  let interactHeld = false;
  let verticalHeld = 0;

  const refresh = (feedback: string | null): void => {
    options.board.render(options.view(), feedback);
  };

  const closeHost = (): void => {
    if (!options.board.isOpen()) {
      return;
    }

    options.board.close();
    options.onClose?.();
  };

  return {
    open() {
      if (options.board.isOpen()) {
        return;
      }

      interactHeld = true;
      verticalHeld = 0;
      options.board.open();
      refresh(null);
      options.onOpen?.();
    },
    close() {
      closeHost();
    },
    isOpen() {
      return options.board.isOpen();
    },
    perform(command) {
      const outcome = options.session.perform(command);

      refresh(
        outcome.ok ? describeComplicitySuccess(outcome.effects ?? []) : (outcome.message ?? null),
      );
    },
    handleInput(interact, verticalInput) {
      if (!options.board.isOpen()) {
        return;
      }

      const vertical = verticalInput > 0.5 ? 1 : verticalInput < -0.5 ? -1 : 0;

      if (vertical !== 0 && vertical !== verticalHeld) {
        options.board.moveFocus(vertical > 0 ? -1 : 1);
      }

      verticalHeld = vertical;

      const pressed = interact && !interactHeld;
      interactHeld = interact;

      if (pressed) {
        if (options.board.hasFocus()) {
          options.board.activate();
        } else {
          closeHost();
        }
      }
    },
    refresh() {
      refresh(null);
    },
  };
};
