import * as THREE from 'three';

import { nearestAnchor } from './collision.ts';
import { CAMERA_HEIGHT, START_ANCHOR } from './floor-plan.ts';
import type { Anchor, Point } from './floor-plan.ts';
import { buildFloorGeometry } from './geometry.ts';
import type { BuiltFloor } from './geometry.ts';

export interface WorldStats {
  readonly drawCalls: number;
  readonly meshCount: number;
}

export interface CameraPose {
  readonly x: number;
  readonly z: number;
  readonly yaw: number;
  readonly pitch: number;
}

export interface World {
  readonly canvas: HTMLCanvasElement;
  render(): void;
  resize(width: number, height: number): void;
  recover(position: Point): Anchor;
  setCameraPose(pose: CameraPose): void;
  cameraPose(): CameraPose;
  stats(): WorldStats;
  dispose(): void;
}

export interface WorldOptions {
  readonly container: HTMLElement;
  readonly buildGeometry?: () => BuiltFloor;
}

export const createWorld = (options: WorldOptions): World => {
  const renderer = new THREE.WebGLRenderer({ antialias: false });
  const buildGeometry = options.buildGeometry ?? buildFloorGeometry;
  let floor: BuiltFloor | null = null;

  try {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const containerWidth = options.container.clientWidth || window.innerWidth;
    const containerHeight = options.container.clientHeight || window.innerHeight;
    const width = Math.max(1, containerWidth);
    const height = Math.max(1, containerHeight);
    renderer.setSize(width, height);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.dataset['placeholder'] = 'world';
    options.container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdfe5ea);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
    camera.rotation.order = 'YXZ';

    let cameraPose: CameraPose = {
      x: START_ANCHOR.x,
      z: START_ANCHOR.z,
      yaw: 0,
      pitch: 0,
    };

    const applyCameraPose = (): void => {
      camera.position.set(cameraPose.x, CAMERA_HEIGHT, cameraPose.z);
      camera.rotation.y = cameraPose.yaw;
      camera.rotation.x = cameraPose.pitch;
    };

    applyCameraPose();

    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    const sun = new THREE.DirectionalLight(0xffffff, 0.8);
    sun.position.set(6, 18, 4);
    scene.add(ambient);
    scene.add(sun);

    floor = buildGeometry();
    const built = floor;
    scene.add(built.group);

    let disposed = false;

    return {
      canvas: renderer.domElement,
      render() {
        if (!disposed) {
          renderer.render(scene, camera);
        }
      },
      resize(nextWidth, nextHeight) {
        if (disposed) {
          return;
        }

        const safeWidth = Math.max(1, nextWidth);
        const safeHeight = Math.max(1, nextHeight);
        camera.aspect = safeWidth / safeHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(safeWidth, safeHeight);
      },
      recover(position) {
        return nearestAnchor(position);
      },
      setCameraPose(pose) {
        cameraPose = { ...pose };
        applyCameraPose();
      },
      cameraPose() {
        return { ...cameraPose };
      },
      stats() {
        return {
          drawCalls: renderer.info.render.calls,
          meshCount: built.group.children.length,
        };
      },
      dispose() {
        if (disposed) {
          return;
        }

        disposed = true;
        built.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        scene.clear();
      },
    };
  } catch (error) {
    floor?.dispose();
    renderer.dispose();
    renderer.domElement.remove();
    throw error;
  }
};
