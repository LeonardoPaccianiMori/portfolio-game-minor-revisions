import { DEFAULT_BINDINGS, bindKey as bindKeyTo, unbindKey as unbindKeyFrom } from './bindings.ts';
import type { InputAction, InputBindings } from './bindings.ts';

export const GAMEPAD_DEAD_ZONE = 0.15;

export interface GamepadButtonLike {
  readonly pressed: boolean;
}

export interface GamepadLike {
  readonly axes: readonly number[];
  readonly buttons: readonly GamepadButtonLike[];
}

export interface DeviceState {
  readonly pressedKeys: ReadonlySet<string>;
  readonly mouseDeltaX: number;
  readonly mouseDeltaY: number;
  readonly gamepad: GamepadLike | null;
}

export interface InputSnapshot {
  readonly moveX: number;
  readonly moveZ: number;
  readonly turnX: number;
  readonly turnY: number;
  readonly stickTurnX: number;
  readonly stickTurnY: number;
  readonly mouseDeltaX: number;
  readonly mouseDeltaY: number;
}

const applyDeadZone = (value: number, deadZone: number): number => {
  if (Math.abs(value) <= deadZone) {
    return 0;
  }

  const sign = value < 0 ? -1 : 1;

  return sign * ((Math.abs(value) - deadZone) / (1 - deadZone));
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const normalizeZero = (value: number): number => (value === 0 ? 0 : value);

const axis = (gamepad: GamepadLike | null, index: number): number => gamepad?.axes[index] ?? 0;

const keyPressed = (bindings: InputBindings, state: DeviceState, action: InputAction): boolean =>
  Object.entries(bindings.keys).some(
    ([code, bound]) => bound === action && state.pressedKeys.has(code),
  );

const buttonPressed = (bindings: InputBindings, state: DeviceState, action: InputAction): boolean =>
  Object.entries(bindings.buttons).some(
    ([index, bound]) => bound === action && state.gamepad?.buttons[Number(index)]?.pressed === true,
  );

const actionPressed = (bindings: InputBindings, state: DeviceState, action: InputAction): boolean =>
  keyPressed(bindings, state, action) || buttonPressed(bindings, state, action);

export const evaluateInput = (
  bindings: InputBindings,
  state: DeviceState,
  deadZone: number = GAMEPAD_DEAD_ZONE,
): InputSnapshot => {
  const stickX = applyDeadZone(axis(state.gamepad, 0), deadZone);
  const stickY = applyDeadZone(axis(state.gamepad, 1), deadZone);
  const lookX = applyDeadZone(axis(state.gamepad, 2), deadZone);
  const lookY = applyDeadZone(axis(state.gamepad, 3), deadZone);

  const keyMoveX =
    (actionPressed(bindings, state, 'moveRight') ? 1 : 0) -
    (actionPressed(bindings, state, 'moveLeft') ? 1 : 0);
  const keyMoveZ =
    (actionPressed(bindings, state, 'moveForward') ? 1 : 0) -
    (actionPressed(bindings, state, 'moveBackward') ? 1 : 0);
  const keyTurnX =
    (actionPressed(bindings, state, 'lookRight') ? 1 : 0) -
    (actionPressed(bindings, state, 'lookLeft') ? 1 : 0);
  const keyTurnY =
    (actionPressed(bindings, state, 'lookUp') ? 1 : 0) -
    (actionPressed(bindings, state, 'lookDown') ? 1 : 0);

  return {
    moveX: clamp(keyMoveX + stickX, -1, 1),
    moveZ: clamp(keyMoveZ - stickY, -1, 1),
    turnX: clamp(keyTurnX, -1, 1),
    turnY: clamp(keyTurnY, -1, 1),
    stickTurnX: clamp(lookX, -1, 1),
    stickTurnY: clamp(normalizeZero(-lookY), -1, 1),
    mouseDeltaX: state.mouseDeltaX,
    mouseDeltaY: state.mouseDeltaY,
  };
};

export interface EventTargetLike {
  addEventListener(type: string, listener: (event: Event) => void): void;
  removeEventListener(type: string, listener: (event: Event) => void): void;
}

export interface CanvasLike extends EventTargetLike {
  requestPointerLock?: () => void;
}

export interface PointerLockLike {
  readonly pointerLockElement: Element | null;
}

export interface GamepadSourceLike {
  getGamepads?: () => readonly (GamepadLike | null)[];
}

export interface InputOptions {
  readonly canvas: CanvasLike;
  readonly events?: EventTargetLike;
  readonly lockEvents?: EventTargetLike;
  readonly pointerLock?: PointerLockLike;
  readonly gamepads?: GamepadSourceLike;
}

export interface Input {
  sample(): InputSnapshot;
  requestPointerLock(): void;
  isPointerLocked(): boolean;
  bindings(): InputBindings;
  bindKey(code: string, action: InputAction): void;
  unbindKey(code: string): void;
  dispose(): void;
}

const noopTarget: EventTargetLike = {
  addEventListener: () => undefined,
  removeEventListener: () => undefined,
};

const defaultEvents = (): EventTargetLike => (typeof window === 'undefined' ? noopTarget : window);

const defaultLockEvents = (): EventTargetLike =>
  typeof document === 'undefined' ? noopTarget : document;

const defaultPointerLock = (): PointerLockLike =>
  typeof document === 'undefined' ? { pointerLockElement: null } : document;

const defaultGamepads = (): GamepadSourceLike =>
  typeof navigator === 'undefined' ? {} : navigator;

export const createInput = (options: InputOptions): Input => {
  const events = options.events ?? defaultEvents();
  const lockEvents = options.lockEvents ?? defaultLockEvents();
  const pointerLock = options.pointerLock ?? defaultPointerLock();
  const gamepads = options.gamepads ?? defaultGamepads();
  const pressedKeys = new Set<string>();
  let mouseDeltaX = 0;
  let mouseDeltaY = 0;
  let currentBindings = DEFAULT_BINDINGS;

  const isPointerLocked = (): boolean =>
    pointerLock.pointerLockElement === (options.canvas as unknown as Element);

  const onKeyDown = (event: Event): void => {
    const keyboardEvent = event as KeyboardEvent;

    if (currentBindings.keys[keyboardEvent.code] !== undefined) {
      pressedKeys.add(keyboardEvent.code);
      keyboardEvent.preventDefault();
    }
  };

  const onKeyUp = (event: Event): void => {
    pressedKeys.delete((event as KeyboardEvent).code);
  };

  const onMouseMove = (event: Event): void => {
    if (!isPointerLocked()) {
      return;
    }

    const mouseEvent = event as MouseEvent;
    mouseDeltaX += mouseEvent.movementX;
    mouseDeltaY += mouseEvent.movementY;
  };

  const onBlur = (): void => {
    pressedKeys.clear();
  };

  const onPointerLockChange = (): void => {
    if (!isPointerLocked()) {
      mouseDeltaX = 0;
      mouseDeltaY = 0;
    }
  };

  const onClick = (): void => {
    options.canvas.requestPointerLock?.();
  };

  events.addEventListener('keydown', onKeyDown);
  events.addEventListener('keyup', onKeyUp);
  events.addEventListener('mousemove', onMouseMove);
  events.addEventListener('blur', onBlur);
  lockEvents.addEventListener('pointerlockchange', onPointerLockChange);
  options.canvas.addEventListener('click', onClick);

  const readGamepad = (): GamepadLike | null => {
    const pads = gamepads.getGamepads?.() ?? [];

    return pads.find((candidate) => candidate !== null) ?? null;
  };

  return {
    sample() {
      const snapshot = evaluateInput(currentBindings, {
        pressedKeys,
        mouseDeltaX,
        mouseDeltaY,
        gamepad: readGamepad(),
      });
      mouseDeltaX = 0;
      mouseDeltaY = 0;

      return snapshot;
    },
    requestPointerLock() {
      options.canvas.requestPointerLock?.();
    },
    isPointerLocked,
    bindings() {
      return currentBindings;
    },
    bindKey(code, action) {
      currentBindings = bindKeyTo(currentBindings, code, action);
    },
    unbindKey(code) {
      currentBindings = unbindKeyFrom(currentBindings, code);
    },
    dispose() {
      events.removeEventListener('keydown', onKeyDown);
      events.removeEventListener('keyup', onKeyUp);
      events.removeEventListener('mousemove', onMouseMove);
      events.removeEventListener('blur', onBlur);
      lockEvents.removeEventListener('pointerlockchange', onPointerLockChange);
      options.canvas.removeEventListener('click', onClick);
      pressedKeys.clear();
    },
  };
};
