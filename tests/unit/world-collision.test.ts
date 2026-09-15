import { describe, expect, it } from 'vitest';

import {
  ANCHORS,
  DOORWAYS,
  PLAYER_RADIUS,
  PROPS,
  SPACES,
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

describe('the floor plan', () => {
  it('holds six spaces with one anchor each', () => {
    expect(SPACES).toHaveLength(6);
    expect(new Set(SPACES.map((space) => space.id)).size).toBe(6);
    expect(ANCHORS).toHaveLength(6);

    for (const space of SPACES) {
      expect(ANCHORS.filter((anchor) => anchor.spaceId === space.id)).toHaveLength(1);
    }
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

  it('finds the nearest recovery anchor', () => {
    expect(nearestAnchor({ x: 4.0, z: -4.0 }).id).toBe('anchor.grow-room');
    expect(nearestAnchor({ x: 5.0, z: 9.0 }).id).toBe('anchor.desk-hub');
    expect(nearestAnchor({ x: 10.0, z: 1.0 }).id).toBe('anchor.corridor');
  });
});

describe('the no-trapping proof', () => {
  it('keeps every walkable spot in one connected region', () => {
    const regions = computeWalkableRegions();

    expect(regions).toHaveLength(1);
  });

  it('covers every space and every anchor in that region', () => {
    const regions = computeWalkableRegions();
    const region = regions[0] ?? [];

    for (const space of SPACES) {
      expect(region.some((point) => insideRect(space, point))).toBe(true);
    }

    for (const anchor of ANCHORS) {
      expect(isInsideWalkableArea(anchor)).toBe(true);
      expect(collidesAt(anchor, PLAYER_RADIUS, colliders)).toBe(false);
    }
  });

  it('does not treat prop interiors or the outside as walkable', () => {
    expect(collidesAt({ x: 4.2, z: -5.3 }, PLAYER_RADIUS, colliders)).toBe(true);
    expect(collidesAt({ x: 5.2, z: 6.5 }, PLAYER_RADIUS, colliders)).toBe(true);
    expect(isInsideWalkableArea({ x: -0.5, z: 0 })).toBe(false);
  });

  it('stays connected at a finer sampling step', () => {
    expect(computeWalkableRegions({ step: 0.2 })).toHaveLength(1);
    expect(computeWalkableRegions({ step: 0.5 })).toHaveLength(1);
  });
});
