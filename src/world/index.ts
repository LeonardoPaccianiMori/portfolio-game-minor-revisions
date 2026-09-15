export {
  ANCHORS,
  DOORWAYS,
  DOOR_WIDTH,
  MAX_MOVEMENT_STEP,
  NAVIGATION_STEP,
  PLAYER_RADIUS,
  PROPS,
  SPACES,
  SPACE_IDS,
  START_ANCHOR,
  START_ANCHOR_ID,
  WALL_COLLIDERS,
  WALL_HEIGHT,
  WALL_THICKNESS,
  buildColliders,
  isInsideWalkableArea,
  spaceById,
} from './floor-plan.ts';
export type {
  Anchor,
  BoxCollider,
  Doorway,
  Point,
  PropBox,
  PropMaterial,
  Rect,
  Space,
  SpaceId,
} from './floor-plan.ts';
export {
  circleIntersectsBox,
  collidesAt,
  computeWalkableRegions,
  envelopeBounds,
  nearestAnchor,
  resolveMovement,
} from './collision.ts';
export type { WalkableRegionsOptions } from './collision.ts';
export { buildFloorGeometry } from './geometry.ts';
export type { BuiltFloor } from './geometry.ts';
export { createWorld } from './world.ts';
export type { World, WorldOptions, WorldStats } from './world.ts';
