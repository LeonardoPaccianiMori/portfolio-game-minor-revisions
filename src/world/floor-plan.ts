export const WALL_THICKNESS = 0.2;
export const WALL_HEIGHT = 3;
export const DOOR_WIDTH = 1.6;
export const PLAYER_RADIUS = 0.35;
export const NAVIGATION_STEP = 0.25;
export const MAX_MOVEMENT_STEP = 0.2;

export interface Point {
  readonly x: number;
  readonly z: number;
}

export interface Rect {
  readonly minX: number;
  readonly maxX: number;
  readonly minZ: number;
  readonly maxZ: number;
}

export interface BoxCollider extends Rect {
  readonly id: string;
}

export const SPACE_IDS = [
  'corridor',
  'desk-hub',
  'soil-lab',
  'grow-room',
  'pi-office',
  'break-room',
] as const;
export type SpaceId = (typeof SPACE_IDS)[number];

export interface Space extends Rect {
  readonly id: SpaceId;
  readonly label: string;
}

export interface Doorway extends Rect {
  readonly id: string;
  readonly spaceId: SpaceId;
  readonly side: 'north' | 'south';
}

export interface Anchor {
  readonly id: string;
  readonly spaceId: SpaceId;
  readonly label: string;
  readonly x: number;
  readonly z: number;
}

export type PropMaterial = 'wood' | 'metal' | 'soil' | 'paper';

export interface PropBox extends Rect {
  readonly id: string;
  readonly spaceId: SpaceId;
  readonly height: number;
  readonly material: PropMaterial;
}

export const SPACES: readonly Space[] = [
  { id: 'corridor', label: 'Corridor', minX: 0.2, maxX: 20.4, minZ: 0, maxZ: 3 },
  { id: 'desk-hub', label: 'Desk hub', minX: 0.2, maxX: 10.2, minZ: 3.2, maxZ: 11.2 },
  { id: 'soil-lab', label: 'Soil lab', minX: 10.4, maxX: 20.4, minZ: 3.2, maxZ: 11.2 },
  { id: 'grow-room', label: 'Grow room', minX: 0.2, maxX: 8.2, minZ: -8.2, maxZ: -0.2 },
  { id: 'pi-office', label: "PI's office", minX: 8.4, maxX: 14.4, minZ: -8.2, maxZ: -0.2 },
  { id: 'break-room', label: 'Break room', minX: 14.6, maxX: 20.4, minZ: -8.2, maxZ: -0.2 },
];

const DOOR_HALF_WIDTH = DOOR_WIDTH / 2;

export const DOORWAYS: readonly Doorway[] = [
  {
    id: 'door.desk-hub',
    spaceId: 'desk-hub',
    side: 'north',
    minX: 5.2 - DOOR_HALF_WIDTH,
    maxX: 5.2 + DOOR_HALF_WIDTH,
    minZ: 2.9,
    maxZ: 3.3,
  },
  {
    id: 'door.soil-lab',
    spaceId: 'soil-lab',
    side: 'north',
    minX: 15.4 - DOOR_HALF_WIDTH,
    maxX: 15.4 + DOOR_HALF_WIDTH,
    minZ: 2.9,
    maxZ: 3.3,
  },
  {
    id: 'door.grow-room',
    spaceId: 'grow-room',
    side: 'south',
    minX: 4.2 - DOOR_HALF_WIDTH,
    maxX: 4.2 + DOOR_HALF_WIDTH,
    minZ: -0.3,
    maxZ: 0.1,
  },
  {
    id: 'door.pi-office',
    spaceId: 'pi-office',
    side: 'south',
    minX: 11.4 - DOOR_HALF_WIDTH,
    maxX: 11.4 + DOOR_HALF_WIDTH,
    minZ: -0.3,
    maxZ: 0.1,
  },
  {
    id: 'door.break-room',
    spaceId: 'break-room',
    side: 'south',
    minX: 17.5 - DOOR_HALF_WIDTH,
    maxX: 17.5 + DOOR_HALF_WIDTH,
    minZ: -0.3,
    maxZ: 0.1,
  },
];

export const START_ANCHOR_ID = 'anchor.start';

export const START_ANCHOR: Anchor = {
  id: START_ANCHOR_ID,
  spaceId: 'desk-hub',
  label: 'Start',
  x: 5.2,
  z: 9.8,
};

export const ANCHORS: readonly Anchor[] = [
  { id: 'anchor.desk-hub', spaceId: 'desk-hub', label: 'Desk hub', x: 5.2, z: 8.6 },
  { id: 'anchor.soil-lab', spaceId: 'soil-lab', label: 'Soil lab', x: 15.4, z: 8.0 },
  { id: 'anchor.grow-room', spaceId: 'grow-room', label: 'Grow room', x: 4.2, z: -4.3 },
  { id: 'anchor.pi-office', spaceId: 'pi-office', label: "PI's office", x: 11.4, z: -5.2 },
  { id: 'anchor.break-room', spaceId: 'break-room', label: 'Break room', x: 17.5, z: -3.4 },
  { id: 'anchor.corridor', spaceId: 'corridor', label: 'Corridor', x: 10.3, z: 1.5 },
];

export const PROPS: readonly PropBox[] = [
  {
    id: 'prop.hub.board',
    spaceId: 'desk-hub',
    minX: 3.2,
    maxX: 7.2,
    minZ: 11.0,
    maxZ: 11.2,
    height: 1.6,
    material: 'paper',
  },
  {
    id: 'prop.hub.desk',
    spaceId: 'desk-hub',
    minX: 4.2,
    maxX: 6.2,
    minZ: 6.0,
    maxZ: 7.0,
    height: 0.75,
    material: 'wood',
  },
  {
    id: 'prop.lab.bench-north',
    spaceId: 'soil-lab',
    minX: 11.0,
    maxX: 19.8,
    minZ: 10.4,
    maxZ: 11.0,
    height: 0.9,
    material: 'metal',
  },
  {
    id: 'prop.lab.bench-west',
    spaceId: 'soil-lab',
    minX: 11.6,
    maxX: 13.2,
    minZ: 4.0,
    maxZ: 9.0,
    height: 0.9,
    material: 'metal',
  },
  {
    id: 'prop.lab.machine',
    spaceId: 'soil-lab',
    minX: 17.0,
    maxX: 19.8,
    minZ: 3.6,
    maxZ: 6.0,
    height: 1.4,
    material: 'metal',
  },
  {
    id: 'prop.grow.row-1',
    spaceId: 'grow-room',
    minX: 1.2,
    maxX: 7.2,
    minZ: -7.8,
    maxZ: -6.8,
    height: 0.5,
    material: 'soil',
  },
  {
    id: 'prop.grow.row-2',
    spaceId: 'grow-room',
    minX: 1.2,
    maxX: 7.2,
    minZ: -5.8,
    maxZ: -4.8,
    height: 0.5,
    material: 'soil',
  },
  {
    id: 'prop.grow.row-3',
    spaceId: 'grow-room',
    minX: 1.2,
    maxX: 7.2,
    minZ: -3.8,
    maxZ: -2.8,
    height: 0.5,
    material: 'soil',
  },
  {
    id: 'prop.pi.desk',
    spaceId: 'pi-office',
    minX: 9.0,
    maxX: 11.5,
    minZ: -7.6,
    maxZ: -6.6,
    height: 0.75,
    material: 'wood',
  },
  {
    id: 'prop.pi.shelf',
    spaceId: 'pi-office',
    minX: 13.0,
    maxX: 14.2,
    minZ: -7.8,
    maxZ: -3.4,
    height: 1.8,
    material: 'wood',
  },
  {
    id: 'prop.break.table',
    spaceId: 'break-room',
    minX: 16.4,
    maxX: 18.8,
    minZ: -6.4,
    maxZ: -4.6,
    height: 0.75,
    material: 'wood',
  },
  {
    id: 'prop.break.counter',
    spaceId: 'break-room',
    minX: 14.8,
    maxX: 20.2,
    minZ: -8.0,
    maxZ: -7.4,
    height: 0.9,
    material: 'metal',
  },
];

export const WALL_COLLIDERS: readonly BoxCollider[] = [
  { id: 'wall.west', minX: 0, maxX: 0.2, minZ: -8.2, maxZ: 11.2 },
  { id: 'wall.east', minX: 20.4, maxX: 20.6, minZ: -8.2, maxZ: 11.2 },
  { id: 'wall.north', minX: 0, maxX: 20.6, minZ: 11.2, maxZ: 11.4 },
  { id: 'wall.south', minX: 0, maxX: 20.6, minZ: -8.4, maxZ: -8.2 },
  { id: 'wall.hub-lab', minX: 10.2, maxX: 10.4, minZ: 3.2, maxZ: 11.2 },
  { id: 'wall.grow-pi', minX: 8.2, maxX: 8.4, minZ: -8.2, maxZ: -0.2 },
  { id: 'wall.pi-break', minX: 14.4, maxX: 14.6, minZ: -8.2, maxZ: -0.2 },
  { id: 'wall.corridor-north-a', minX: 0, maxX: 4.4, minZ: 3.0, maxZ: 3.2 },
  { id: 'wall.corridor-north-b', minX: 6.0, maxX: 14.6, minZ: 3.0, maxZ: 3.2 },
  { id: 'wall.corridor-north-c', minX: 16.2, maxX: 20.4, minZ: 3.0, maxZ: 3.2 },
  { id: 'wall.corridor-south-a', minX: 0, maxX: 3.4, minZ: -0.2, maxZ: 0 },
  { id: 'wall.corridor-south-b', minX: 5.0, maxX: 10.6, minZ: -0.2, maxZ: 0 },
  { id: 'wall.corridor-south-c', minX: 12.2, maxX: 16.7, minZ: -0.2, maxZ: 0 },
  { id: 'wall.corridor-south-d', minX: 18.3, maxX: 20.4, minZ: -0.2, maxZ: 0 },
];

export const buildColliders = (): readonly BoxCollider[] => [
  ...WALL_COLLIDERS,
  ...PROPS.map((prop) => ({
    id: prop.id,
    minX: prop.minX,
    maxX: prop.maxX,
    minZ: prop.minZ,
    maxZ: prop.maxZ,
  })),
];

const inside = (rect: Rect, point: Point): boolean =>
  point.x >= rect.minX && point.x <= rect.maxX && point.z >= rect.minZ && point.z <= rect.maxZ;

export const isInsideWalkableArea = (point: Point): boolean =>
  SPACES.some((space) => inside(space, point)) ||
  DOORWAYS.some((doorway) => inside(doorway, point));

export const spaceById = (id: SpaceId): Space => {
  const space = SPACES.find((candidate) => candidate.id === id);
  if (space === undefined) {
    throw new Error(`Unknown space: ${id}`);
  }

  return space;
};
