import { describe, expect, it } from 'vitest';

import {
  ANCHORS,
  DOORWAYS,
  NAVIGATION_STEP,
  PLAYER_RADIUS,
  PROPS,
  SPACES,
  START_ANCHOR,
  START_ANCHOR_ID,
  buildColliders,
  isInsideWalkableArea,
} from '../../src/world/floor-plan.ts';
import type { BoxCollider, Point } from '../../src/world/floor-plan.ts';
import {
  circleIntersectsBox,
  collidesAt,
  computeWalkableRegions,
  envelopeBounds,
  nearestAnchor,
  resolveMovement,
} from '../../src/world/collision.ts';

const colliders = buildColliders();

const insideRect = (
  rect: { minX: number; maxX: number; minZ: number; maxZ: number },
  point: Point,
) => point.x >= rect.minX && point.x <= rect.maxX && point.z >= rect.minZ && point.z <= rect.maxZ;

const containsRect = (
  outer: { minX: number; maxX: number; minZ: number; maxZ: number },
  inner: { minX: number; maxX: number; minZ: number; maxZ: number },
) =>
  inner.minX >= outer.minX &&
  inner.maxX <= outer.maxX &&
  inner.minZ >= outer.minZ &&
  inner.maxZ <= outer.maxZ;

const distanceToRegion = (region: readonly Point[], point: Point): number =>
  region.reduce(
    (best, candidate) => Math.min(best, Math.hypot(candidate.x - point.x, candidate.z - point.z)),
    Number.POSITIVE_INFINITY,
  );

describe('the floor plan', () => {
  it('holds six spaces with one anchor each', () => {
    expect(SPACES).toHaveLength(6);
    expect(new Set(SPACES.map((space) => space.id)).size).toBe(6);
    expect(ANCHORS).toHaveLength(6);

    for (const space of SPACES) {
      expect(ANCHORS.filter((anchor) => anchor.spaceId === space.id)).toHaveLength(1);
    }
  });

  it('separates the start anchor from the recovery anchors', () => {
    expect(START_ANCHOR.id).toBe(START_ANCHOR_ID);
    expect(START_ANCHOR.spaceId).toBe('desk-hub');
    expect(ANCHORS.some((anchor) => anchor.id === START_ANCHOR_ID)).toBe(false);

    const hub = SPACES.find((space) => space.id === 'desk-hub');
    expect(hub).toBeDefined();
    if (hub !== undefined) {
      expect(insideRect(hub, START_ANCHOR)).toBe(true);
    }

    expect(collidesAt(START_ANCHOR, PLAYER_RADIUS, colliders)).toBe(false);
  });

  it('keeps every anchor and prop inside its space and clear of collisions', () => {
    for (const anchor of ANCHORS) {
      const space = SPACES.find((candidate) => candidate.id === anchor.spaceId);
      expect(space).toBeDefined();
      if (space !== undefined) {
        expect(insideRect(space, anchor)).toBe(true);
      }

      expect(collidesAt(anchor, PLAYER_RADIUS, colliders)).toBe(false);
    }

    for (const prop of PROPS) {
      const space = SPACES.find((candidate) => candidate.id === prop.spaceId);
      expect(space).toBeDefined();
      if (space !== undefined) {
        expect(containsRect(space, prop)).toBe(true);
      }
    }
  });

  it('opens every room onto the corridor through a doorway', () => {
    const roomIds = SPACES.filter((space) => space.id !== 'corridor').map((space) => space.id);

    expect(DOORWAYS.map((doorway) => doorway.spaceId)).toEqual(roomIds);

    for (const doorway of DOORWAYS) {
      expect(doorway.maxX - doorway.minX).toBeCloseTo(1.6);
      const bridgesWall =
        (doorway.minZ <= 3.0 && doorway.maxZ >= 3.2) || (doorway.minZ <= -0.2 && doorway.maxZ >= 0);
      expect(bridgesWall).toBe(true);
    }
  });

  it('derives the footprint from the spaces', () => {
    const bounds = envelopeBounds();

    expect(bounds.minX).toBe(0.2);
    expect(bounds.maxX).toBe(20.4);
    expect(bounds.minZ).toBe(-8.2);
    expect(bounds.maxZ).toBe(11.2);
  });
});

describe('static collision', () => {
  it('tests circles against boxes', () => {
    const box: BoxCollider = { id: 'test.box', minX: 0, maxX: 1, minZ: 0, maxZ: 1 };

    expect(circleIntersectsBox({ x: 0.5, z: 0.5 }, 0.35, box)).toBe(true);
    expect(circleIntersectsBox({ x: 1.2, z: 0.5 }, 0.35, box)).toBe(true);
    expect(circleIntersectsBox({ x: 2.0, z: 0.5 }, 0.35, box)).toBe(false);
  });

  it('blocks movement into a wall', () => {
    const wall: BoxCollider = { id: 'test.wall', minX: 5, maxX: 6, minZ: 0, maxZ: 10 };
    const result = resolveMovement({ x: 4.9, z: 1 }, { x: 5.5, z: 1 }, PLAYER_RADIUS, [wall]);

    expect(result).toEqual({ x: 4.9, z: 1 });
  });

  it('slides along a wall while moving past it', () => {
    const wall: BoxCollider = { id: 'test.wall', minX: 5, maxX: 6, minZ: 0, maxZ: 10 };
    const result = resolveMovement({ x: 4.6, z: 1 }, { x: 5.5, z: 3 }, PLAYER_RADIUS, [wall]);

    expect(result).toEqual({ x: 4.6, z: 3 });
  });

  it('permits free movement', () => {
    const result = resolveMovement({ x: 1, z: 1 }, { x: 2, z: 2 }, PLAYER_RADIUS, []);

    expect(result).toEqual({ x: 2, z: 2 });
  });

  it('does not tunnel through a wall on a long step', () => {
    const wall: BoxCollider = { id: 'test.wall', minX: 5, maxX: 6, minZ: 0, maxZ: 10 };
    const result = resolveMovement({ x: 4.6, z: 1 }, { x: 6.5, z: 1 }, PLAYER_RADIUS, [wall]);

    expect(result).toEqual({ x: 4.6, z: 1 });
  });

  it('slides around a wall corner on a long diagonal step', () => {
    const wall: BoxCollider = { id: 'test.wall', minX: 5, maxX: 6, minZ: 0, maxZ: 10 };
    const result = resolveMovement({ x: 4.6, z: 8 }, { x: 7, z: 12 }, PLAYER_RADIUS, [wall]);

    expect(result.z).toBe(12);
    expect(result.x).toBeGreaterThan(5);
  });

  it('treats a tangent contact as a collision', () => {
    const box: BoxCollider = { id: 'test.box', minX: 0, maxX: 1, minZ: 0, maxZ: 1 };

    expect(circleIntersectsBox({ x: 1.5, z: 0.5 }, 0.5, box)).toBe(true);
    expect(circleIntersectsBox({ x: 1.51, z: 0.5 }, 0.5, box)).toBe(false);
  });

  it('finds the nearest recovery anchor', () => {
    expect(nearestAnchor({ x: 4.0, z: -4.0 }).id).toBe('anchor.grow-room');
    expect(nearestAnchor({ x: 5.0, z: 9.0 }).id).toBe('anchor.desk-hub');
    expect(nearestAnchor({ x: 10.0, z: 1.0 }).id).toBe('anchor.corridor');
  });
});

describe('the no-trapping proof', () => {
  it('keeps the floor in one connected region covering every space and anchor', () => {
    const regions = computeWalkableRegions();
    const region = regions[0] ?? [];

    expect(regions).toHaveLength(1);

    for (const space of SPACES) {
      expect(region.some((point) => insideRect(space, point))).toBe(true);
    }

    for (const anchor of ANCHORS) {
      expect(isInsideWalkableArea(anchor)).toBe(true);
      expect(collidesAt(anchor, PLAYER_RADIUS, colliders)).toBe(false);
      expect(distanceToRegion(region, anchor)).toBeLessThanOrEqual(NAVIGATION_STEP * Math.SQRT2);
    }
  });

  it('holds the same guarantee under finer and shifted sampling', () => {
    const bounds = envelopeBounds();
    const phases: readonly { step?: number; bounds?: typeof bounds }[] = [
      { step: 0.125 },
      { step: 0.15 },
      { step: 0.2 },
      { step: 0.5 },
      { bounds: { ...bounds, minX: bounds.minX + 0.0625, minZ: bounds.minZ + 0.0625 } },
      { bounds: { ...bounds, minX: bounds.minX + 0.125, minZ: bounds.minZ + 0.125 } },
      { bounds: { ...bounds, minX: bounds.minX + 0.2, minZ: bounds.minZ + 0.2 } },
    ];

    for (const phase of phases) {
      const options = {
        ...(phase.step !== undefined ? { step: phase.step } : {}),
        ...(phase.bounds !== undefined ? { bounds: phase.bounds } : {}),
      };
      const regions = computeWalkableRegions(options);
      const region = regions[0] ?? [];
      const threshold = (phase.step ?? NAVIGATION_STEP) * Math.SQRT2;

      expect(regions).toHaveLength(1);

      for (const space of SPACES) {
        expect(region.some((point) => insideRect(space, point))).toBe(true);
      }

      for (const anchor of ANCHORS) {
        expect(distanceToRegion(region, anchor)).toBeLessThanOrEqual(threshold);
      }
    }
  });

  it('does not treat prop interiors or the outside as walkable', () => {
    expect(collidesAt({ x: 4.2, z: -5.3 }, PLAYER_RADIUS, colliders)).toBe(true);
    expect(collidesAt({ x: 5.2, z: 6.5 }, PLAYER_RADIUS, colliders)).toBe(true);
    expect(isInsideWalkableArea({ x: -0.5, z: 0 })).toBe(false);
  });
});
