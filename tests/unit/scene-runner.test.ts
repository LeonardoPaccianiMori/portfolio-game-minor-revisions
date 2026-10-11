import { describe, expect, it } from 'vitest';

import { OPENING_SCENE_ID, SCENES, createSceneRunner } from '../../src/world/scenes.ts';
import type { SceneDefinition } from '../../src/world/scenes.ts';
import type { CameraPose } from '../../src/world/world.ts';

const pose = (overrides: Partial<CameraPose> = {}): CameraPose => ({
  x: 0,
  z: 0,
  yaw: 0,
  pitch: 0,
  ...overrides,
});

const scene: SceneDefinition = {
  id: 'scene.test',
  label: 'Test scene',
  pose: pose({ x: 10, z: 5, yaw: Math.PI / 2, pitch: -0.1 }),
  holdMs: 1000,
  caption: 'Test caption.',
};

const setup = () => {
  const frames: CameraPose[] = [];
  const runner = createSceneRunner({
    onFrame: (frame) => {
      frames.push(frame);
    },
    easeMs: 100,
    returnMs: 100,
  });

  return { frames, runner };
};

describe('the scene data', () => {
  it('holds the opening establishing scene with a sane pose and hold', () => {
    const opening = SCENES.find((candidate) => candidate.id === OPENING_SCENE_ID);

    expect(opening).toBeDefined();
    expect(opening?.caption.length).toBeGreaterThan(0);
    expect(opening?.holdMs).toBeGreaterThanOrEqual(3000);
    expect(opening?.holdMs).toBeLessThanOrEqual(8000);
    expect(opening?.pose.x).toBeGreaterThanOrEqual(-1);
    expect(opening?.pose.x).toBeLessThanOrEqual(22);
    expect(opening?.pose.z).toBeGreaterThanOrEqual(-10);
    expect(opening?.pose.z).toBeLessThanOrEqual(12);
  });
});

describe('the scene runner', () => {
  it('eases in, holds, returns auto, and restores the exact pose', () => {
    const { frames, runner } = setup();
    const from = pose({ x: 1, z: 2, yaw: -0.5, pitch: 0.2 });

    runner.start(scene, from);
    expect(runner.isActive()).toBe(true);
    expect(runner.scene()?.id).toBe('scene.test');
    expect(frames.at(-1)).toEqual(from);

    runner.update(50);
    const mid = frames.at(-1);
    expect(mid?.x).toBeGreaterThan(1);
    expect(mid?.x).toBeLessThan(10);

    runner.update(50);
    const held = frames.at(-1);
    expect(held?.x).toBeCloseTo(10, 8);
    expect(held?.z).toBeCloseTo(5, 8);
    expect(held?.yaw).toBeCloseTo(Math.PI / 2, 8);
    expect(held?.pitch).toBeCloseTo(-0.1, 8);

    runner.update(999);
    expect(runner.isActive()).toBe(true);

    runner.update(1);
    expect(runner.isActive()).toBe(true);

    runner.update(100);
    expect(runner.isActive()).toBe(false);
    expect(runner.scene()).toBeNull();
    expect(frames.at(-1)).toEqual(from);
  });

  it('completes across large deltas and always restores the pose', () => {
    const { frames, runner } = setup();
    const from = pose({ x: 8, z: -3, yaw: 2.5, pitch: 0.4 });

    runner.start(scene, from);

    let guard = 0;
    while (runner.isActive() && guard < 100) {
      runner.update(500);
      guard += 1;
    }

    expect(guard).toBeLessThan(100);
    expect(frames.at(-1)).toEqual(from);
  });

  it('consumes the whole delta across every phase in one update', () => {
    const { frames, runner } = setup();
    const from = pose({ x: 2, z: 9, yaw: -1, pitch: 0.1 });

    runner.start(scene, from);
    runner.update(1200);

    expect(runner.isActive()).toBe(false);
    expect(frames.at(-1)).toEqual(from);
  });

  it('completes the default opening timings in one large update', () => {
    const frames: CameraPose[] = [];
    const runner = createSceneRunner({ onFrame: (frame) => frames.push(frame) });
    const opening = SCENES.find((candidate) => candidate.id === OPENING_SCENE_ID);
    const from = pose({ x: 4, z: -2, yaw: 0.2, pitch: -0.3 });

    if (opening === undefined) {
      throw new Error('the opening scene is missing');
    }

    runner.start(opening, from);
    runner.update(8200);

    expect(runner.isActive()).toBe(false);
    expect(frames.at(-1)).toEqual(from);
  });

  it('eases without linear interpolation', () => {
    const { frames, runner } = setup();
    const from = pose({ x: 0, z: 0 });

    runner.start(scene, from);
    runner.update(25);

    const quarter = frames.at(-1);
    expect(quarter?.x).toBeCloseTo(10 * 0.15625, 6);
    expect(quarter?.x).toBeLessThan(2.5);
  });

  it('skips instantly from the ease and the hold', () => {
    const { frames, runner } = setup();
    const from = pose({ x: 1, z: 1, yaw: 0.3, pitch: 0 });

    runner.start(scene, from);
    runner.update(50);
    runner.skip();

    expect(runner.isActive()).toBe(false);
    expect(runner.scene()).toBeNull();
    expect(frames.at(-1)).toEqual(from);

    runner.start(scene, from);
    runner.update(150);
    runner.update(100);
    runner.skip();

    expect(runner.isActive()).toBe(false);
    expect(frames.at(-1)).toEqual(from);
  });

  it('skips from the ease-out phase', () => {
    const { frames, runner } = setup();
    const from = pose({ x: 1, z: 1 });

    runner.start(scene, from);
    runner.update(100);
    runner.update(1000);
    runner.update(50);
    runner.skip();

    expect(runner.isActive()).toBe(false);
    expect(runner.scene()).toBeNull();
    expect(frames.at(-1)).toEqual(from);
  });

  it('handles zero-length eases and zero-length holds in one update', () => {
    const frames: CameraPose[] = [];
    const runner = createSceneRunner({
      onFrame: (frame) => frames.push(frame),
      easeMs: 0,
      returnMs: 0,
    });
    const zeroHold: SceneDefinition = { ...scene, holdMs: 0 };
    const from = pose({ x: 3, z: 4 });

    runner.start(scene, from);
    runner.update(1000);

    expect(runner.isActive()).toBe(false);
    expect(frames.at(-1)).toEqual(from);

    runner.start(zeroHold, from);
    runner.update(50);

    expect(runner.isActive()).toBe(false);
    expect(frames.at(-1)).toEqual(from);
  });

  it('tolerates non-finite deltas without hanging', () => {
    const { frames, runner } = setup();
    const from = pose({ x: 1, z: 1 });

    runner.start(scene, from);
    runner.update(Number.NaN);
    runner.update(Number.POSITIVE_INFINITY);

    expect(runner.isActive()).toBe(true);

    runner.update(1200);

    expect(runner.isActive()).toBe(false);
    expect(frames.at(-1)).toEqual(from);
  });

  it('stays quiet after finishing', () => {
    const { frames, runner } = setup();
    const from = pose({ x: 1, z: 1 });

    runner.start(scene, from);
    runner.update(1200);
    const count = frames.length;

    runner.update(500);
    runner.skip();

    expect(frames.length).toBe(count);
    expect(runner.scene()).toBeNull();
  });

  it('ignores a skip while idle', () => {
    const { frames, runner } = setup();

    runner.skip();

    expect(frames).toEqual([]);
    expect(runner.isActive()).toBe(false);
  });

  it('takes the short way around the yaw seam', () => {
    const { frames, runner } = setup();
    const wrapped: SceneDefinition = {
      ...scene,
      pose: pose({ x: 0, z: 0, yaw: -3.0 }),
    };

    runner.start(wrapped, pose({ yaw: 3.0 }));
    runner.update(50);

    const mid = frames.at(-1);
    expect(mid?.yaw).toBeGreaterThan(3.0);
    expect(mid?.yaw).toBeLessThan(3.3);
  });
});
