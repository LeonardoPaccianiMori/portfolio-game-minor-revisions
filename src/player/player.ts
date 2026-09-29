import type { InputSnapshot } from '../input/index.ts';
import { resolveMovement } from '../world/collision.ts';
import { PLAYER_RADIUS } from '../world/floor-plan.ts';
import type { BoxCollider } from '../world/floor-plan.ts';

export const WALK_SPEED = 3.0;
export const KEYBOARD_TURN_SPEED = (120 * Math.PI) / 180;
export const GAMEPAD_TURN_SPEED = (150 * Math.PI) / 180;
export const MOUSE_SENSITIVITY = 0.0025;
export const MAX_PITCH = (85 * Math.PI) / 180;
export const START_YAW = Math.PI;

export interface PlayerPose {
  readonly x: number;
  readonly z: number;
  readonly yaw: number;
  readonly pitch: number;
}

export interface PlayerStart {
  readonly x: number;
  readonly z: number;
  readonly yaw?: number;
}

export interface PlayerEnvironment {
  readonly start: PlayerStart;
  readonly colliders: readonly BoxCollider[];
}

export interface PlayerOptions {
  readonly environment: PlayerEnvironment;
  readonly speed?: number;
  readonly keyboardTurnSpeed?: number;
  readonly gamepadTurnSpeed?: number;
  readonly mouseSensitivity?: number;
  readonly maxPitch?: number;
}

export interface Player {
  pose(): PlayerPose;
  update(deltaMs: number, input: InputSnapshot): void;
  setPosition(position: { readonly x: number; readonly z: number }): void;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const normalizeAngle = (angle: number): number => Math.atan2(Math.sin(angle), Math.cos(angle));

export const createPlayer = (options: PlayerOptions): Player => {
  const speed = options.speed ?? WALK_SPEED;
  const keyboardTurnSpeed = options.keyboardTurnSpeed ?? KEYBOARD_TURN_SPEED;
  const gamepadTurnSpeed = options.gamepadTurnSpeed ?? GAMEPAD_TURN_SPEED;
  const mouseSensitivity = options.mouseSensitivity ?? MOUSE_SENSITIVITY;
  const maxPitch = options.maxPitch ?? MAX_PITCH;
  const colliders = options.environment.colliders;

  let pose: PlayerPose = {
    x: options.environment.start.x,
    z: options.environment.start.z,
    yaw: options.environment.start.yaw ?? 0,
    pitch: 0,
  };

  return {
    pose() {
      return { ...pose };
    },
    update(deltaMs, input) {
      const deltaSeconds = Math.max(0, deltaMs) / 1000;
      const forward = input.moveZ;
      const strafe = input.moveX;
      const length = Math.hypot(forward, strafe);
      const normalizedForward = length > 1 ? forward / length : forward;
      const normalizedStrafe = length > 1 ? strafe / length : strafe;
      const sin = Math.sin(pose.yaw);
      const cos = Math.cos(pose.yaw);
      const directionX = -sin * normalizedForward + cos * normalizedStrafe;
      const directionZ = -cos * normalizedForward - sin * normalizedStrafe;
      const step = speed * deltaSeconds;
      const resolved = resolveMovement(
        { x: pose.x, z: pose.z },
        { x: pose.x + directionX * step, z: pose.z + directionZ * step },
        PLAYER_RADIUS,
        colliders,
      );

      const yaw =
        pose.yaw -
        input.turnX * keyboardTurnSpeed * deltaSeconds -
        input.stickTurnX * gamepadTurnSpeed * deltaSeconds -
        input.mouseDeltaX * mouseSensitivity;
      const pitch = clamp(
        pose.pitch +
          input.turnY * keyboardTurnSpeed * deltaSeconds +
          input.stickTurnY * gamepadTurnSpeed * deltaSeconds -
          input.mouseDeltaY * mouseSensitivity,
        -maxPitch,
        maxPitch,
      );

      pose = { x: resolved.x, z: resolved.z, yaw: normalizeAngle(yaw), pitch };
    },
    setPosition(position) {
      pose = { ...pose, x: position.x, z: position.z };
    },
  };
};
