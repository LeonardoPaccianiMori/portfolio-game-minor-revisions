import * as THREE from 'three';

import { PROPS, SPACES, WALL_COLLIDERS, WALL_HEIGHT } from './floor-plan.ts';
import type { PropMaterial, Rect } from './floor-plan.ts';

const FLOOR_COLOR = 0xcfc9b8;
const WALL_COLOR = 0xefece3;

const PROP_COLORS: Readonly<Record<PropMaterial, number>> = {
  wood: 0xb98d5f,
  metal: 0x9aa3a8,
  soil: 0x6b4f3a,
  paper: 0xf2f2ee,
};

export interface BuiltFloor {
  readonly group: THREE.Group;
  dispose(): void;
}

export const buildFloorGeometry = (): BuiltFloor => {
  const group = new THREE.Group();
  group.name = 'placeholder.floor';
  const geometries: THREE.BufferGeometry[] = [];
  const materials = new Map<number, THREE.MeshLambertMaterial>();

  const materialFor = (color: number): THREE.MeshLambertMaterial => {
    const cached = materials.get(color);
    if (cached !== undefined) {
      return cached;
    }

    const material = new THREE.MeshLambertMaterial({ color });
    materials.set(color, material);

    return material;
  };

  const first = SPACES[0];
  if (first === undefined) {
    throw new Error('No spaces are defined.');
  }

  const bounds = SPACES.reduce<Rect>(
    (rect, space) => ({
      minX: Math.min(rect.minX, space.minX),
      maxX: Math.max(rect.maxX, space.maxX),
      minZ: Math.min(rect.minZ, space.minZ),
      maxZ: Math.max(rect.maxZ, space.maxZ),
    }),
    first,
  );

  const floorWidth = bounds.maxX - bounds.minX + 0.4;
  const floorDepth = bounds.maxZ - bounds.minZ + 0.4;
  const floorGeometry = new THREE.BoxGeometry(floorWidth, 0.1, floorDepth);
  geometries.push(floorGeometry);
  const floor = new THREE.Mesh(floorGeometry, materialFor(FLOOR_COLOR));
  floor.position.set((bounds.minX + bounds.maxX) / 2, -0.05, (bounds.minZ + bounds.maxZ) / 2);
  floor.name = 'placeholder.floor';
  group.add(floor);

  for (const wall of WALL_COLLIDERS) {
    const geometry = new THREE.BoxGeometry(
      wall.maxX - wall.minX,
      WALL_HEIGHT,
      wall.maxZ - wall.minZ,
    );
    geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, materialFor(WALL_COLOR));
    mesh.position.set((wall.minX + wall.maxX) / 2, WALL_HEIGHT / 2, (wall.minZ + wall.maxZ) / 2);
    mesh.name = `placeholder.${wall.id}`;
    group.add(mesh);
  }

  for (const prop of PROPS) {
    const geometry = new THREE.BoxGeometry(
      prop.maxX - prop.minX,
      prop.height,
      prop.maxZ - prop.minZ,
    );
    geometries.push(geometry);
    const mesh = new THREE.Mesh(geometry, materialFor(PROP_COLORS[prop.material]));
    mesh.position.set((prop.minX + prop.maxX) / 2, prop.height / 2, (prop.minZ + prop.maxZ) / 2);
    mesh.name = `placeholder.${prop.id}`;
    group.add(mesh);
  }

  return {
    group,
    dispose() {
      for (const geometry of geometries) {
        geometry.dispose();
      }

      for (const material of materials.values()) {
        material.dispose();
      }

      group.clear();
    },
  };
};
