import type { Command } from '../rules/index.ts';
import type { BoxCollider } from '../world/floor-plan.ts';
import { aimFromPose, findInteraction } from './interaction.ts';
import type { Interactable } from './interaction.ts';

export const BLOCKED_TEXT = 'Something is in the way.';
export const INSPECT_TEXT = 'Nothing to do here yet.';

export interface InteractionWorld {
  setHighlight(propId: string | null): void;
}

export interface InteractionSession {
  perform(command: Command): { readonly ok: boolean; readonly message?: string };
}

export interface InteractionPrompt {
  setText(text: string | null): void;
}

export interface InteractionControllerOptions {
  readonly world: InteractionWorld;
  readonly session: InteractionSession;
  readonly prompt: InteractionPrompt;
  readonly interactables: readonly Interactable[];
  readonly colliders: readonly BoxCollider[];
  readonly reach?: number;
  readonly openBoard?: () => void;
}

export interface InteractionController {
  update(
    pose: { readonly x: number; readonly z: number; readonly yaw: number; readonly pitch: number },
    interact: boolean,
  ): void;
  targetId(): string | null;
}

export const createInteractionController = (
  options: InteractionControllerOptions,
): InteractionController => {
  let interactHeld = false;
  let currentTargetId: string | null = null;
  let feedback: string | null = null;

  return {
    update(pose, interact) {
      const result = findInteraction({
        aim: aimFromPose(pose),
        colliders: options.colliders,
        interactables: options.interactables,
        ...(options.reach !== undefined ? { reach: options.reach } : {}),
      });
      const targetId = result.target?.id ?? null;

      if (targetId !== currentTargetId) {
        currentTargetId = targetId;
        feedback = null;
      }

      options.world.setHighlight(targetId);

      const pressed = interact && !interactHeld;
      interactHeld = interact;

      if (pressed && result.target !== null) {
        const command = result.target.command;

        if (result.target.opensBoard) {
          options.openBoard?.();
        } else if (command === null) {
          feedback = INSPECT_TEXT;
        } else {
          const outcome = options.session.perform(command);
          feedback = outcome.ok ? null : (outcome.message ?? null);
        }
      }

      options.prompt.setText(
        feedback ?? result.target?.prompt ?? (result.blocked ? BLOCKED_TEXT : null),
      );
    },
    targetId() {
      return currentTargetId;
    },
  };
};
