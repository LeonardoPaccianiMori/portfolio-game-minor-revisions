import type { CameraPose } from './world.ts';

export const SCENE_EASE_MS = 1600;
export const SCENE_RETURN_MS = 1600;

export interface SceneDefinition {
  readonly id: string;
  readonly label: string;
  readonly pose: CameraPose;
  readonly holdMs: number;
  readonly caption: string;
}

const INTRO_SCENE: SceneDefinition = {
  id: 'scene.intro.department',
  label: 'Establishing look',
  pose: { x: 2.0, z: 1.5, yaw: -Math.PI / 2, pitch: -0.05 },
  holdMs: 5000,
  caption: 'The Department of Terrestrial Ecology.',
};

export const SCENES: readonly SceneDefinition[] = [INTRO_SCENE];
export const OPENING_SCENE_ID = INTRO_SCENE.id;

export interface SceneRunnerOptions {
  readonly onFrame: (pose: CameraPose) => void;
  readonly easeMs?: number;
  readonly returnMs?: number;
}

export interface SceneRunner {
  start(scene: SceneDefinition, from: CameraPose): void;
  skip(): void;
  update(deltaMs: number): void;
  isActive(): boolean;
  scene(): SceneDefinition | null;
}

type ScenePhase = 'idle' | 'ease-in' | 'hold' | 'ease-out';

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

const smooth = (t: number): number => t * t * (3 - 2 * t);

const shortestAngle = (from: number, to: number): number => {
  const delta = (to - from) % (Math.PI * 2);

  if (delta > Math.PI) {
    return delta - Math.PI * 2;
  }

  if (delta < -Math.PI) {
    return delta + Math.PI * 2;
  }

  return delta;
};

const interpolate = (from: CameraPose, to: CameraPose, t: number): CameraPose => ({
  x: from.x + (to.x - from.x) * t,
  z: from.z + (to.z - from.z) * t,
  yaw: from.yaw + shortestAngle(from.yaw, to.yaw) * t,
  pitch: from.pitch + (to.pitch - from.pitch) * t,
});

export const createSceneRunner = (options: SceneRunnerOptions): SceneRunner => {
  const easeMs = options.easeMs ?? SCENE_EASE_MS;
  const returnMs = options.returnMs ?? SCENE_RETURN_MS;
  let phase: ScenePhase = 'idle';
  let activeScene: SceneDefinition | null = null;
  let fromPose: CameraPose = { x: 0, z: 0, yaw: 0, pitch: 0 };
  let elapsed = 0;

  const finish = (): void => {
    options.onFrame({ ...fromPose });
    phase = 'idle';
    activeScene = null;
    elapsed = 0;
  };

  return {
    start(scene, from) {
      phase = 'ease-in';
      activeScene = scene;
      fromPose = { ...from };
      elapsed = 0;
      options.onFrame({ ...from });
    },
    skip() {
      if (phase === 'idle') {
        return;
      }

      finish();
    },
    update(deltaMs) {
      if (phase === 'idle' || activeScene === null) {
        return;
      }

      let remaining = Number.isFinite(deltaMs) ? Math.max(0, deltaMs) : 0;

      for (;;) {
        if (phase === 'ease-in') {
          if (easeMs === 0) {
            phase = 'hold';
            elapsed = 0;
            continue;
          }

          const step = Math.min(remaining, easeMs - elapsed);
          elapsed += step;
          remaining -= step;
          const t = clamp01(elapsed / easeMs);
          options.onFrame(interpolate(fromPose, activeScene.pose, smooth(t)));

          if (t >= 1) {
            phase = 'hold';
            elapsed = 0;
          }
        } else if (phase === 'hold') {
          if (activeScene.holdMs === 0) {
            phase = 'ease-out';
            elapsed = 0;
            continue;
          }

          const step = Math.min(remaining, activeScene.holdMs - elapsed);
          elapsed += step;
          remaining -= step;
          options.onFrame({ ...activeScene.pose });

          if (elapsed >= activeScene.holdMs) {
            phase = 'ease-out';
            elapsed = 0;
          }
        } else {
          if (returnMs === 0) {
            finish();
            break;
          }

          const step = Math.min(remaining, returnMs - elapsed);
          elapsed += step;
          remaining -= step;
          const t = clamp01(elapsed / returnMs);
          options.onFrame(interpolate(activeScene.pose, fromPose, smooth(t)));

          if (t >= 1) {
            finish();
            break;
          }
        }

        const isZeroPhase =
          (phase === 'ease-in' && easeMs === 0) ||
          (phase === 'hold' && activeScene.holdMs === 0) ||
          (phase === 'ease-out' && returnMs === 0);

        if (remaining <= 0 && !isZeroPhase) {
          break;
        }
      }
    },
    isActive() {
      return phase !== 'idle';
    },
    scene() {
      return activeScene;
    },
  };
};
