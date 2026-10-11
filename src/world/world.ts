import * as THREE from 'three';

import { ACT_PALETTES, ACT_PROP_STATES } from './act-states.ts';
import type { ActId, ActPalette } from './act-states.ts';
import { nearestAnchor } from './collision.ts';
import { CAMERA_HEIGHT, PROPS, START_ANCHOR } from './floor-plan.ts';
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
  setHighlight(propId: string | null): void;
  highlight(): string | null;
  applyAct(act: ActId): void;
  act(): ActId;
  palette(): ActPalette;
  propScale(propId: string): number;
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
    scene.background = new THREE.Color(ACT_PALETTES['act-1'].background);

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

    const ambient = new THREE.AmbientLight(ACT_PALETTES['act-1'].ambient, 0.75);
    const sun = new THREE.DirectionalLight(ACT_PALETTES['act-1'].sun, 0.8);
    sun.position.set(6, 18, 4);
    scene.add(ambient);
    scene.add(sun);

    floor = buildGeometry();
    const built = floor;
    scene.add(built.group);

    let disposed = false;
    let highlighted: string | null = null;
    let currentAct: ActId = 'act-1';
    let currentPalette: ActPalette = ACT_PALETTES['act-1'];
    const propScales = new Map<string, number>();

    const applyActState = (act: ActId): void => {
      currentAct = act;
      currentPalette = ACT_PALETTES[act];
      scene.background = new THREE.Color(currentPalette.background);
      ambient.color.setHex(currentPalette.ambient);
      ambient.intensity = currentPalette.ambientIntensity;
      sun.color.setHex(currentPalette.sun);
      sun.intensity = currentPalette.sunIntensity;

      for (const state of ACT_PROP_STATES[act]) {
        const mesh = built.group.getObjectByName(`placeholder.${state.propId}`);

        if (mesh instanceof THREE.Mesh && mesh.material instanceof THREE.MeshLambertMaterial) {
          mesh.material.color.setHex(state.color);
          mesh.scale.y = state.scaleY;
          const prop = PROPS.find((candidate) => candidate.id === state.propId);

          if (prop !== undefined) {
            mesh.position.y = (prop.height * state.scaleY) / 2;
          }

          propScales.set(state.propId, state.scaleY);
        }
      }
    };

    applyActState('act-1');

    const applyHighlight = (propId: string | null): void => {
      if (highlighted !== null) {
        const previous = built.group.getObjectByName(`placeholder.${highlighted}`);
        if (
          previous instanceof THREE.Mesh &&
          previous.material instanceof THREE.MeshLambertMaterial
        ) {
          previous.material.emissive.setHex(0x000000);
        }
      }

      highlighted = propId;

      if (propId !== null) {
        const mesh = built.group.getObjectByName(`placeholder.${propId}`);
        if (mesh instanceof THREE.Mesh && mesh.material instanceof THREE.MeshLambertMaterial) {
          mesh.material.emissive.setHex(0x554422);
        }
      }
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
        return nearestAnchor(position);
      },
      setCameraPose(pose) {
        cameraPose = { ...pose };
        applyCameraPose();
      },
      cameraPose() {
        return { ...cameraPose };
      },
      setHighlight(propId) {
        if (!disposed) {
          applyHighlight(propId);
        }
      },
      highlight() {
        return highlighted;
      },
      applyAct(act) {
        if (!disposed) {
          applyActState(act);
        }
      },
      act() {
        return currentAct;
      },
      palette() {
        return currentPalette;
      },
      propScale(propId) {
        return propScales.get(propId) ?? 1;
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
