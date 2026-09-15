import * as THREE from 'three';

import { nearestAnchor } from './collision.ts';
import type { Anchor, Point } from './floor-plan.ts';
import { buildFloorGeometry } from './geometry.ts';
import type { BuiltFloor } from './geometry.ts';

export interface WorldStats {
  readonly drawCalls: number;
  readonly meshCount: number;
}

export interface World {
  readonly canvas: HTMLCanvasElement;
  render(): void;
  resize(width: number, height: number): void;
  recover(position: Point): Anchor;
  stats(): WorldStats;
  dispose(): void;
}

export interface WorldOptions {
  readonly container: HTMLElement;
}

const CENTER: Point = { x: 10.3, z: 1.5 };

export const createWorld = (options: WorldOptions): World => {
  const renderer = new THREE.WebGLRenderer({ antialias: false });
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
    camera.position.set(CENTER.x, 24, CENTER.z + 18);
    camera.lookAt(CENTER.x, 0, CENTER.z);

    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    const sun = new THREE.DirectionalLight(0xffffff, 0.8);
    sun.position.set(6, 18, 4);
    scene.add(ambient);
    scene.add(sun);

    floor = buildFloorGeometry();
    const built = floor;
    scene.add(built.group);

    let disposed = false;

    const lookAt = (target: Point): void => {
      camera.position.set(target.x, 24, target.z + 18);
      camera.lookAt(target.x, 0, target.z);
    };

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
        const anchor = nearestAnchor(position);
        lookAt(anchor);

        return anchor;
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
