import { describe, expect, it } from 'vitest';

import {
  STATIONS,
  aimFromPose,
  buildInteractables,
  findInteraction,
} from '../../src/interaction/index.ts';
import type { Interactable } from '../../src/interaction/index.ts';
import { PROPS } from '../../src/world/floor-plan.ts';

const interactables = buildInteractables();
const find = (id: string): Interactable | undefined =>
  interactables.find((interactable) => interactable.id === id);

describe('stations', () => {
  it('maps the approved stations and leaves the rest inspect-only', () => {
    expect(STATIONS.map((station) => station.propId)).toEqual([
      'prop.lab.bench-north',
      'prop.grow.row-2',
      'prop.break.table',
      'prop.pi.desk',
      'prop.hub.desk',
    ]);
    expect(interactables).toHaveLength(PROPS.length);
    expect(find('prop.lab.bench-north')?.command).toEqual({
      type: 'performAction',
      action: 'experiment',
    });
    expect(find('prop.grow.row-2')?.command).toEqual({
      type: 'performAction',
      action: 'experiment',
    });
    expect(find('prop.break.table')?.command).toEqual({
      type: 'performAction',
      action: 'rest',
    });
    expect(find('prop.pi.desk')?.command).toEqual({ type: 'meetPI' });
    expect(find('prop.hub.desk')?.command).toBeNull();
    expect(find('prop.hub.board')?.command).toBeNull();
    expect(find('prop.hub.board')?.label).toBe('Desk board');
  });
});

describe('aiming', () => {
  it('builds the ray from the pose and the camera height', () => {
    const forward = aimFromPose({ x: 1, z: 2, yaw: 0, pitch: 0 });

    expect(forward.origin).toEqual({ x: 1, y: 1.6, z: 2 });
    expect(forward.direction.x).toBeCloseTo(0, 8);
    expect(forward.direction.y).toBeCloseTo(0, 8);
    expect(forward.direction.z).toBeCloseTo(-1, 8);

    const left = aimFromPose({ x: 0, z: 0, yaw: Math.PI / 2, pitch: 0 });
    expect(left.direction.x).toBeCloseTo(-1, 8);

    const up = aimFromPose({ x: 0, z: 0, yaw: 0, pitch: Math.PI / 4 });
    expect(up.direction.y).toBeCloseTo(Math.SQRT1_2, 8);
    expect(up.direction.z).toBeCloseTo(-Math.SQRT1_2, 8);
  });
});

describe('targeting', () => {
  it('returns the nearest interactable within the reach', () => {
    const result = findInteraction({
      aim: { origin: { x: 15.4, y: 1.6, z: 8.5 }, direction: { x: 0, y: 0, z: 1 } },
    });

    expect(result.target?.id).toBe('prop.lab.bench-north');
    expect(result.blocked).toBe(false);
    expect(result.distance).toBeCloseTo(1.9, 8);
  });

  it('reports nothing when every hit is beyond the reach', () => {
    const result = findInteraction({
      aim: { origin: { x: 15.4, y: 1.6, z: 7.0 }, direction: { x: 0, y: 0, z: 1 } },
    });

    expect(result.target).toBeNull();
    expect(result.blocked).toBe(false);
    expect(result.distance).toBeNull();
  });

  it('reports a blocking wall before any target', () => {
    const result = findInteraction({
      aim: { origin: { x: 0.6, y: 1.6, z: 5.0 }, direction: { x: 0, y: 0, z: -1 } },
    });

    expect(result.target).toBeNull();
    expect(result.blocked).toBe(true);
    expect(result.distance).toBeCloseTo(1.8, 8);
  });

  it('inspects a prop without a command', () => {
    const result = findInteraction({
      aim: { origin: { x: 5.2, y: 1.6, z: 7.6 }, direction: { x: 0, y: 0, z: -1 } },
    });

    expect(result.target?.id).toBe('prop.hub.desk');
    expect(result.target?.command).toBeNull();
    expect(result.distance).toBeCloseTo(0.6, 8);
  });

  it('prefers the nearer of two custom targets', () => {
    const custom: readonly Interactable[] = [
      {
        id: 'far',
        label: 'Far',
        prompt: 'Far',
        command: null,
        opensBoard: false,
        box: { minX: -0.5, maxX: 0.5, minY: 0, maxY: 1, minZ: -4, maxZ: -3.8 },
      },
      {
        id: 'near',
        label: 'Near',
        prompt: 'Near',
        command: null,
        opensBoard: false,
        box: { minX: -0.5, maxX: 0.5, minY: 0, maxY: 1, minZ: -2, maxZ: -1.8 },
      },
    ];
    const colliders = custom.map((interactable) => ({
      id: interactable.id,
      minX: interactable.box.minX,
      maxX: interactable.box.maxX,
      minZ: interactable.box.minZ,
      maxZ: interactable.box.maxZ,
    }));
    const result = findInteraction({
      aim: { origin: { x: 0, y: 1, z: 0 }, direction: { x: 0, y: 0, z: -1 } },
      colliders,
      interactables: custom,
    });

    expect(result.target?.id).toBe('near');
  });

  it('treats a ray grazing a face as a hit', () => {
    const custom: readonly Interactable[] = [
      {
        id: 'grazed',
        label: 'Grazed',
        prompt: 'Grazed',
        command: null,
        opensBoard: false,
        box: { minX: 0, maxX: 1, minY: 0, maxY: 1, minZ: -1, maxZ: 1 },
      },
    ];
    const colliders = custom.map((interactable) => ({
      id: interactable.id,
      minX: interactable.box.minX,
      maxX: interactable.box.maxX,
      minZ: interactable.box.minZ,
      maxZ: interactable.box.maxZ,
    }));
    const result = findInteraction({
      aim: { origin: { x: 1, y: 0.5, z: 2 }, direction: { x: 0, y: 0, z: -1 } },
      colliders,
      interactables: custom,
    });

    expect(result.target?.id).toBe('grazed');
  });

  it('hits a volume the origin is already inside', () => {
    const custom: readonly Interactable[] = [
      {
        id: 'inside',
        label: 'Inside',
        prompt: 'Inside',
        command: null,
        opensBoard: false,
        box: { minX: -1, maxX: 1, minY: 0, maxY: 2, minZ: -1, maxZ: 1 },
      },
    ];
    const colliders = custom.map((interactable) => ({
      id: interactable.id,
      minX: interactable.box.minX,
      maxX: interactable.box.maxX,
      minZ: interactable.box.minZ,
      maxZ: interactable.box.maxZ,
    }));
    const result = findInteraction({
      aim: { origin: { x: 0, y: 1, z: 0 }, direction: { x: 0, y: 0, z: -1 } },
      colliders,
      interactables: custom,
    });

    expect(result.target?.id).toBe('inside');
    expect(result.distance).toBe(0);
  });

  it('includes the reach boundary exactly', () => {
    const custom: readonly Interactable[] = [
      {
        id: 'edge',
        label: 'Edge',
        prompt: 'Edge',
        command: null,
        opensBoard: false,
        box: { minX: -0.5, maxX: 0.5, minY: 0, maxY: 1, minZ: -2.5, maxZ: -2 },
      },
    ];
    const colliders = custom.map((interactable) => ({
      id: interactable.id,
      minX: interactable.box.minX,
      maxX: interactable.box.maxX,
      minZ: interactable.box.minZ,
      maxZ: interactable.box.maxZ,
    }));
    const result = findInteraction({
      aim: { origin: { x: 0, y: 1, z: 0 }, direction: { x: 0, y: 0, z: -1 } },
      colliders,
      interactables: custom,
      reach: 2,
    });

    expect(result.target?.id).toBe('edge');
    expect(result.distance).toBe(2);
  });

  it('treats a target outside the reach as no hit', () => {
    const custom: readonly Interactable[] = [
      {
        id: 'far',
        label: 'Far',
        prompt: 'Far',
        command: null,
        opensBoard: false,
        box: { minX: -0.5, maxX: 0.5, minY: 0, maxY: 1, minZ: -4, maxZ: -3.8 },
      },
    ];
    const colliders = custom.map((interactable) => ({
      id: interactable.id,
      minX: interactable.box.minX,
      maxX: interactable.box.maxX,
      minZ: interactable.box.minZ,
      maxZ: interactable.box.maxZ,
    }));
    const result = findInteraction({
      aim: { origin: { x: 0, y: 1, z: 0 }, direction: { x: 0, y: 0, z: -1 } },
      colliders,
      interactables: custom,
      reach: 2,
    });

    expect(result.target).toBeNull();
    expect(result.blocked).toBe(false);
  });
});
