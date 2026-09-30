import type { Command } from '../rules/index.ts';
import { CAMERA_HEIGHT, PROPS, WALL_HEIGHT, buildColliders } from '../world/floor-plan.ts';
import type { BoxCollider, PropBox } from '../world/floor-plan.ts';
import { STATIONS } from './stations.ts';
import type { Station } from './stations.ts';

export const INTERACTION_REACH = 2.5;

export interface Vector3 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface Aim {
  readonly origin: Vector3;
  readonly direction: Vector3;
}

export interface InteractableBox {
  readonly minX: number;
  readonly maxX: number;
  readonly minY: number;
  readonly maxY: number;
  readonly minZ: number;
  readonly maxZ: number;
}

export interface Interactable {
  readonly id: string;
  readonly label: string;
  readonly prompt: string;
  readonly command: Command | null;
  readonly box: InteractableBox;
}

export interface InteractionResult {
  readonly target: Interactable | null;
  readonly blocked: boolean;
  readonly distance: number | null;
}

export const buildInteractables = (
  props: readonly PropBox[] = PROPS,
  stations: readonly Station[] = STATIONS,
): readonly Interactable[] =>
  props.map((prop) => {
    const station = stations.find((candidate) => candidate.propId === prop.id);

    return {
      id: prop.id,
      label: prop.label,
      prompt: station?.prompt ?? `Inspect the ${prop.label.toLowerCase()}`,
      command: station?.command ?? null,
      box: {
        minX: prop.minX,
        maxX: prop.maxX,
        minY: 0,
        maxY: Math.max(prop.height, CAMERA_HEIGHT),
        minZ: prop.minZ,
        maxZ: prop.maxZ,
      },
    };
  });

export const aimFromPose = (
  pose: { readonly x: number; readonly z: number; readonly yaw: number; readonly pitch: number },
  height: number = CAMERA_HEIGHT,
): Aim => {
  const cosPitch = Math.cos(pose.pitch);

  return {
    origin: { x: pose.x, y: height, z: pose.z },
    direction: {
      x: -Math.sin(pose.yaw) * cosPitch,
      y: Math.sin(pose.pitch),
      z: -Math.cos(pose.yaw) * cosPitch,
    },
  };
};

const intersectBox = (aim: Aim, box: InteractableBox): number | null => {
  const axes: readonly (readonly [number, number, number, number])[] = [
    [aim.origin.x, aim.direction.x, box.minX, box.maxX],
    [aim.origin.y, aim.direction.y, box.minY, box.maxY],
    [aim.origin.z, aim.direction.z, box.minZ, box.maxZ],
  ];
  let tMin = 0;
  let tMax = Number.POSITIVE_INFINITY;

  for (const [origin, direction, min, max] of axes) {
    if (Math.abs(direction) < 1e-9) {
      if (origin < min || origin > max) {
        return null;
      }

      continue;
    }

    const t1 = (min - origin) / direction;
    const t2 = (max - origin) / direction;
    tMin = Math.max(tMin, Math.min(t1, t2));
    tMax = Math.min(tMax, Math.max(t1, t2));

    if (tMin > tMax) {
      return null;
    }
  }

  return tMin;
};

export interface FindInteractionOptions {
  readonly aim: Aim;
  readonly reach?: number;
  readonly colliders?: readonly BoxCollider[];
  readonly interactables?: readonly Interactable[];
}

export const findInteraction = (options: FindInteractionOptions): InteractionResult => {
  const reach = options.reach ?? INTERACTION_REACH;
  const colliders = options.colliders ?? buildColliders();
  const interactables = options.interactables ?? buildInteractables();
  const byId = new Map(interactables.map((interactable) => [interactable.id, interactable]));

  let nearestId: string | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const collider of colliders) {
    const interactable = byId.get(collider.id);
    const box: InteractableBox = {
      minX: collider.minX,
      maxX: collider.maxX,
      minY: 0,
      maxY: interactable?.box.maxY ?? WALL_HEIGHT,
      minZ: collider.minZ,
      maxZ: collider.maxZ,
    };
    const distance = intersectBox(options.aim, box);

    if (distance === null || distance > reach) {
      continue;
    }

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestId = collider.id;
    }
  }

  if (nearestId === null) {
    return { target: null, blocked: false, distance: null };
  }

  const target = byId.get(nearestId) ?? null;

  if (target === null) {
    return { target: null, blocked: true, distance: nearestDistance };
  }

  return { target, blocked: false, distance: nearestDistance };
};
