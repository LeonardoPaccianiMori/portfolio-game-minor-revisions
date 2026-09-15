import {
  ANCHORS,
  NAVIGATION_STEP,
  PLAYER_RADIUS,
  SPACES,
  buildColliders,
  isInsideWalkableArea,
} from './floor-plan.ts';
import type { Anchor, BoxCollider, Point, Rect } from './floor-plan.ts';

export const circleIntersectsBox = (position: Point, radius: number, box: BoxCollider): boolean => {
  const closestX = Math.min(box.maxX, Math.max(box.minX, position.x));
  const closestZ = Math.min(box.maxZ, Math.max(box.minZ, position.z));
  const deltaX = position.x - closestX;
  const deltaZ = position.z - closestZ;

  return deltaX * deltaX + deltaZ * deltaZ <= radius * radius;
};

export const collidesAt = (
  position: Point,
  radius: number,
  colliders: readonly BoxCollider[],
): boolean => colliders.some((box) => circleIntersectsBox(position, radius, box));

export const resolveMovement = (
  from: Point,
  to: Point,
  radius: number,
  colliders: readonly BoxCollider[],
): Point => {
  let x = from.x;
  const candidateX: Point = { x: to.x, z: from.z };
  if (!collidesAt(candidateX, radius, colliders)) {
    x = to.x;
  }

  let z = from.z;
  const candidateZ: Point = { x, z: to.z };
  if (!collidesAt(candidateZ, radius, colliders)) {
    z = to.z;
  }

  return { x, z };
};

const distanceSquared = (left: Point, right: Point): number => {
  const deltaX = left.x - right.x;
  const deltaZ = left.z - right.z;

  return deltaX * deltaX + deltaZ * deltaZ;
};

export const nearestAnchor = (position: Point, anchors: readonly Anchor[] = ANCHORS): Anchor => {
  const first = anchors[0];

  if (first === undefined) {
    throw new Error('No recovery anchors are defined.');
  }

  return anchors.reduce((best, candidate) =>
    distanceSquared(candidate, position) < distanceSquared(best, position) ? candidate : best,
  );
};

export const envelopeBounds = (): Rect => {
  const first = SPACES[0];

  if (first === undefined) {
    throw new Error('No spaces are defined.');
  }

  return SPACES.reduce<Rect>(
    (bounds, space) => ({
      minX: Math.min(bounds.minX, space.minX),
      maxX: Math.max(bounds.maxX, space.maxX),
      minZ: Math.min(bounds.minZ, space.minZ),
      maxZ: Math.max(bounds.maxZ, space.maxZ),
    }),
    first,
  );
};

export interface WalkableRegionsOptions {
  readonly step?: number;
  readonly radius?: number;
  readonly colliders?: readonly BoxCollider[];
  readonly isSampleArea?: (point: Point) => boolean;
  readonly bounds?: Rect;
}

export const computeWalkableRegions = (
  options: WalkableRegionsOptions = {},
): readonly (readonly Point[])[] => {
  const step = options.step ?? NAVIGATION_STEP;
  const radius = options.radius ?? PLAYER_RADIUS;
  const colliders = options.colliders ?? buildColliders();
  const isSampleArea = options.isSampleArea ?? isInsideWalkableArea;
  const bounds = options.bounds ?? envelopeBounds();
  const columns = Math.floor((bounds.maxX - bounds.minX) / step) + 1;
  const rows = Math.floor((bounds.maxZ - bounds.minZ) / step) + 1;
  const walkable: boolean[] = Array.from({ length: columns * rows }, () => false);

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const point: Point = {
        x: bounds.minX + column * step,
        z: bounds.minZ + row * step,
      };

      walkable[row * columns + column] =
        isSampleArea(point) && !collidesAt(point, radius, colliders);
    }
  }

  const visited: boolean[] = Array.from({ length: walkable.length }, () => false);
  const regions: Point[][] = [];

  for (let start = 0; start < walkable.length; start += 1) {
    if (!walkable[start] || visited[start]) {
      continue;
    }

    const region: Point[] = [];
    const queue: number[] = [start];
    visited[start] = true;

    while (queue.length > 0) {
      const index = queue.pop();
      if (index === undefined) {
        continue;
      }

      const column = index % columns;
      const row = Math.floor(index / columns);
      region.push({
        x: bounds.minX + column * step,
        z: bounds.minZ + row * step,
      });

      const neighbours = [
        column > 0 ? index - 1 : -1,
        column < columns - 1 ? index + 1 : -1,
        row > 0 ? index - columns : -1,
        row < rows - 1 ? index + columns : -1,
      ];

      for (const neighbour of neighbours) {
        if (neighbour >= 0 && walkable[neighbour] && !visited[neighbour]) {
          visited[neighbour] = true;
          queue.push(neighbour);
        }
      }
    }

    regions.push(region);
  }

  return regions;
};
