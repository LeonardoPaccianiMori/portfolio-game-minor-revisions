import { describe, expect, it } from 'vitest';

import {
  BLOCKED_TEXT,
  INSPECT_TEXT,
  buildInteractables,
  createInteractionController,
} from '../../src/interaction/index.ts';
import type { Command } from '../../src/rules/index.ts';
import { buildColliders } from '../../src/world/floor-plan.ts';

const colliders = buildColliders();
const interactables = buildInteractables();

const createFakes = () => {
  const highlights: (string | null)[] = [];
  const prompts: (string | null)[] = [];
  const commands: Command[] = [];
  let outcome: { readonly ok: boolean; readonly message?: string } = { ok: true };

  return {
    world: {
      setHighlight: (propId: string | null) => {
        highlights.push(propId);
      },
    },
    prompt: {
      setText: (text: string | null) => {
        prompts.push(text);
      },
    },
    session: {
      perform: (command: Command) => {
        commands.push(command);

        return outcome;
      },
    },
    highlights,
    prompts,
    commands,
    setOutcome: (next: { readonly ok: boolean; readonly message?: string }) => {
      outcome = next;
    },
  };
};

const controllerFor = (fakes: ReturnType<typeof createFakes>, reach?: number) =>
  createInteractionController({
    world: fakes.world,
    session: fakes.session,
    prompt: fakes.prompt,
    interactables,
    colliders,
    ...(reach !== undefined ? { reach } : {}),
  });

const breakPose = { x: 17.5, z: -3.2, yaw: 0, pitch: 0 };
const hubDeskPose = { x: 5.2, z: 7.6, yaw: 0, pitch: 0 };
const corridorPose = { x: 10.3, z: 1.5, yaw: 0, pitch: 0 };
const benchPose = { x: 15.4, z: 8.5, yaw: Math.PI, pitch: 0 };

describe('the interaction controller', () => {
  it('highlights and prompts the current target without acting', () => {
    const fakes = createFakes();
    const controller = controllerFor(fakes);

    controller.update(breakPose, false);

    expect(controller.targetId()).toBe('prop.break.table');
    expect(fakes.highlights.at(-1)).toBe('prop.break.table');
    expect(fakes.prompts.at(-1)).toBe('Rest');
    expect(fakes.commands).toEqual([]);
  });

  it('acts once per press even while the key is held', () => {
    const fakes = createFakes();
    const controller = controllerFor(fakes);

    controller.update(breakPose, true);
    controller.update(breakPose, true);
    controller.update(breakPose, true);

    expect(fakes.commands).toEqual([{ type: 'performAction', action: 'rest' }]);

    controller.update(breakPose, false);
    controller.update(breakPose, true);

    expect(fakes.commands).toHaveLength(2);
  });

  it('shows a rejection message until the target changes', () => {
    const fakes = createFakes();
    const controller = controllerFor(fakes);
    fakes.setOutcome({ ok: false, message: 'No actions remain this week.' });

    controller.update(breakPose, true);

    expect(fakes.prompts.at(-1)).toBe('No actions remain this week.');

    controller.update(breakPose, false);
    expect(fakes.prompts.at(-1)).toBe('No actions remain this week.');

    controller.update(corridorPose, false);
    expect(fakes.prompts.at(-1)).toBe(BLOCKED_TEXT);
  });

  it('clears a rejection after a successful action', () => {
    const fakes = createFakes();
    const controller = controllerFor(fakes);
    fakes.setOutcome({ ok: false, message: 'No actions remain this week.' });
    controller.update(breakPose, true);

    fakes.setOutcome({ ok: true });
    controller.update(breakPose, false);
    controller.update(breakPose, true);

    expect(fakes.prompts.at(-1)).toBe('Rest');
  });

  it('reports blocked walls and clears the highlight', () => {
    const fakes = createFakes();
    const controller = controllerFor(fakes);

    controller.update(corridorPose, false);

    expect(controller.targetId()).toBeNull();
    expect(fakes.highlights.at(-1)).toBeNull();
    expect(fakes.prompts.at(-1)).toBe(BLOCKED_TEXT);
  });

  it('inspects without committing', () => {
    const fakes = createFakes();
    const controller = controllerFor(fakes);

    controller.update(hubDeskPose, true);

    expect(controller.targetId()).toBe('prop.hub.desk');
    expect(fakes.commands).toEqual([]);
    expect(fakes.prompts.at(-1)).toBe(INSPECT_TEXT);
  });

  it('offers no target beyond the given reach', () => {
    const fakes = createFakes();
    const controller = controllerFor(fakes, 1);

    controller.update(breakPose, false);

    expect(controller.targetId()).toBeNull();
    expect(fakes.prompts.at(-1)).toBeNull();
  });

  it('targets the experiment bench with a level gaze', () => {
    const fakes = createFakes();
    const controller = controllerFor(fakes);

    controller.update(benchPose, true);

    expect(controller.targetId()).toBe('prop.lab.bench-north');
    expect(fakes.commands).toEqual([{ type: 'performAction', action: 'experiment' }]);
  });
});
