import { describe, expect, it } from 'vitest';

import {
  GAMEPAD_TURN_SPEED,
  KEYBOARD_TURN_SPEED,
  MAX_PITCH,
  MOUSE_SENSITIVITY,
  WALK_SPEED,
  createPlayer,
} from '../../src/player/index.ts';
import type { Player, PlayerEnvironment } from '../../src/player/index.ts';
import type { InputSnapshot } from '../../src/input/index.ts';
import type { BoxCollider } from '../../src/world/index.ts';

const neutral = (overrides: Partial<InputSnapshot> = {}): InputSnapshot => ({
  moveX: 0,
  moveZ: 0,
  turnX: 0,
  turnY: 0,
  stickTurnX: 0,
  stickTurnY: 0,
  mouseDeltaX: 0,
  mouseDeltaY: 0,
  ...overrides,
});

const environment = (overrides: Partial<PlayerEnvironment> = {}): PlayerEnvironment => ({
  start: { x: 0, z: 0, yaw: 0 },
  colliders: [],
  ...overrides,
});

const playerWith = (overrides: Partial<PlayerEnvironment> = {}): Player =>
  createPlayer({
    environment: environment(overrides),
  });

const update = (player: Player, ms: number, input: InputSnapshot): void => {
  player.update(ms, input);
};

describe('the player', () => {
  it('starts at the given pose with a level pitch', () => {
    const player = playerWith({ start: { x: 5.2, z: 9.8, yaw: Math.PI } });

    expect(player.pose()).toEqual({ x: 5.2, z: 9.8, yaw: Math.PI, pitch: 0 });
  });

  it('does not move without input or without time', () => {
    const player = playerWith();

    update(player, 1000, neutral());
    expect(player.pose()).toEqual({ x: 0, z: 0, yaw: 0, pitch: 0 });

    update(player, 0, neutral({ moveZ: 1 }));
    expect(player.pose().x).toBe(0);
    expect(player.pose().z).toBe(0);
  });

  it('walks at the baseline speed in every direction', () => {
    const player = playerWith();

    update(player, 1000, neutral({ moveZ: 1 }));
    expect(player.pose().z).toBeCloseTo(-WALK_SPEED, 8);

    update(player, 1000, neutral({ moveZ: -1 }));
    update(player, 1000, neutral({ moveZ: -1 }));
    expect(player.pose().z).toBeCloseTo(WALK_SPEED, 8);

    player.setPosition({ x: 0, z: 0 });
    update(player, 1000, neutral({ moveX: 1 }));
    expect(player.pose().x).toBeCloseTo(WALK_SPEED, 8);

    player.setPosition({ x: 0, z: 0 });
    update(player, 1000, neutral({ moveX: -1 }));
    expect(player.pose().x).toBeCloseTo(-WALK_SPEED, 8);
  });

  it('scales movement with the frame time and normalizes diagonals', () => {
    const halfSecond = playerWith();
    update(halfSecond, 500, neutral({ moveZ: 1 }));
    expect(halfSecond.pose().z).toBeCloseTo(-WALK_SPEED / 2, 8);

    const diagonal = playerWith();
    update(diagonal, 1000, neutral({ moveX: 1, moveZ: 1 }));
    const pose = diagonal.pose();
    const distance = Math.hypot(pose.x, pose.z);

    expect(distance).toBeCloseTo(WALK_SPEED, 8);
    expect(pose.x).toBeCloseTo(WALK_SPEED / Math.SQRT2, 8);
    expect(pose.z).toBeCloseTo(-WALK_SPEED / Math.SQRT2, 8);
  });

  it('moves relative to the facing direction', () => {
    const player = playerWith({ start: { x: 0, z: 0, yaw: Math.PI / 2 } });

    update(player, 1000, neutral({ moveZ: 1 }));

    expect(player.pose().x).toBeCloseTo(-WALK_SPEED, 8);
    expect(player.pose().z).toBeCloseTo(0, 8);
  });

  it('stops at a wall instead of passing through it', () => {
    const wall: BoxCollider = { id: 'test.wall', minX: -1, maxX: 1, minZ: -4, maxZ: -3 };
    const player = playerWith({ colliders: [wall] });

    for (let step = 0; step < 10; step += 1) {
      update(player, 100, neutral({ moveZ: 1 }));
    }

    expect(player.pose().x).toBe(0);
    expect(player.pose().z).toBeGreaterThan(-2.66);
    expect(player.pose().z).toBeLessThan(-2.5);
  });

  it('slides along a wall while moving past it', () => {
    const wall: BoxCollider = { id: 'test.wall', minX: 0.5, maxX: 2, minZ: -5, maxZ: 5 };
    const player = playerWith({ colliders: [wall] });

    update(player, 1000, neutral({ moveX: 1, moveZ: 1 }));
    const pose = player.pose();

    expect(pose.x).toBeLessThanOrEqual(0.15 + 1e-9);
    expect(pose.x).toBeGreaterThan(0.05);
    expect(pose.z).toBeLessThan(-1.5);
  });

  it('turns and pitches with the keyboard and clamps the pitch', () => {
    const turn = playerWith();
    update(turn, 1000, neutral({ turnX: 1 }));
    expect(turn.pose().yaw).toBeCloseTo(-KEYBOARD_TURN_SPEED, 8);

    const up = playerWith();
    update(up, 2000, neutral({ turnY: 1 }));
    expect(up.pose().pitch).toBeCloseTo(MAX_PITCH, 8);

    const down = playerWith();
    update(down, 2000, neutral({ turnY: -1 }));
    expect(down.pose().pitch).toBeCloseTo(-MAX_PITCH, 8);
  });

  it('turns faster with the gamepad sticks', () => {
    const player = playerWith();

    update(player, 1000, neutral({ stickTurnX: 1 }));

    expect(player.pose().yaw).toBeCloseTo(-GAMEPAD_TURN_SPEED, 8);
  });

  it('looks with the mouse and resets to level at the clamp', () => {
    const player = playerWith();

    update(player, 100, neutral({ mouseDeltaX: 100, mouseDeltaY: -100 }));

    expect(player.pose().yaw).toBeCloseTo(-100 * MOUSE_SENSITIVITY, 8);
    expect(player.pose().pitch).toBeCloseTo(100 * MOUSE_SENSITIVITY, 8);

    const clamped = playerWith();
    update(clamped, 100, neutral({ mouseDeltaY: -10000 }));
    expect(clamped.pose().pitch).toBeCloseTo(MAX_PITCH, 8);
  });

  it('keeps the yaw in a single turn range', () => {
    const player = playerWith();

    for (let step = 0; step < 10; step += 1) {
      update(player, 1000, neutral({ turnX: 1 }));
    }

    expect(Math.abs(player.pose().yaw)).toBeLessThanOrEqual(Math.PI + 1e-9);
  });

  it('sets the position without touching the orientation', () => {
    const player = playerWith({ start: { x: 0, z: 0, yaw: 1 } });

    update(player, 1000, neutral({ turnY: 0.5 }));
    player.setPosition({ x: 4, z: -2 });

    expect(player.pose()).toEqual({ x: 4, z: -2, yaw: 1, pitch: player.pose().pitch });
  });
});
