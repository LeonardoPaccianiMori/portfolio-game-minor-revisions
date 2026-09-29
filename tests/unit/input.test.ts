import { describe, expect, it } from 'vitest';

import {
  DEFAULT_BINDINGS,
  GAMEPAD_DEAD_ZONE,
  bindButton,
  bindKey,
  createInput,
  evaluateInput,
  unbindButton,
  unbindKey,
} from '../../src/input/index.ts';
import type {
  CanvasLike,
  DeviceState,
  EventTargetLike,
  GamepadLike,
  InputBindings,
} from '../../src/input/index.ts';

const state = (overrides: Partial<DeviceState> = {}): DeviceState => ({
  pressedKeys: new Set<string>(),
  mouseDeltaX: 0,
  mouseDeltaY: 0,
  gamepad: null,
  ...overrides,
});

const keys = (...codes: string[]): ReadonlySet<string> => new Set(codes);

const gamepad = (overrides: Partial<GamepadLike> = {}): GamepadLike => ({
  axes: [0, 0, 0, 0],
  buttons: [],
  ...overrides,
});

interface FakeTarget {
  readonly target: EventTargetLike;
  dispatch(type: string, event: Event): void;
  readonly added: readonly string[];
  readonly removed: readonly string[];
}

const createFakeTarget = (): FakeTarget => {
  const listeners = new Map<string, Set<(event: Event) => void>>();
  const added: string[] = [];
  const removed: string[] = [];

  return {
    target: {
      addEventListener(type, listener) {
        added.push(type);
        const set = listeners.get(type) ?? new Set();
        set.add(listener);
        listeners.set(type, set);
      },
      removeEventListener(type, listener) {
        removed.push(type);
        listeners.get(type)?.delete(listener);
      },
    },
    dispatch(type, event) {
      for (const listener of listeners.get(type) ?? []) {
        listener(event);
      }
    },
    added,
    removed,
  };
};

interface FakeCanvas {
  readonly canvas: CanvasLike;
  dispatch(type: string, event: Event): void;
  lockRequests(): number;
  readonly added: readonly string[];
  readonly removed: readonly string[];
}

const createFakeCanvas = (): FakeCanvas => {
  const fake = createFakeTarget();
  let lockRequests = 0;

  return {
    canvas: {
      ...fake.target,
      requestPointerLock: () => {
        lockRequests += 1;
      },
    },
    dispatch: (type, event) => {
      fake.dispatch(type, event);
    },
    lockRequests: () => lockRequests,
    added: fake.added,
    removed: fake.removed,
  };
};

const keyEvent = (code: string): { event: Event; prevented: () => boolean } => {
  let prevented = false;

  return {
    event: {
      code,
      preventDefault: () => {
        prevented = true;
      },
    } as unknown as Event,
    prevented: () => prevented,
  };
};

const mouseEvent = (movementX: number, movementY: number): Event =>
  ({ movementX, movementY }) as unknown as Event;

describe('bindings', () => {
  it('binds and unbinds keys without mutating the original', () => {
    const rebound = bindKey(DEFAULT_BINDINGS, 'KeyI', 'moveForward');

    expect(rebound.keys['KeyI']).toBe('moveForward');
    expect(DEFAULT_BINDINGS.keys['KeyI']).toBeUndefined();
    expect(unbindKey(rebound, 'KeyI').keys['KeyI']).toBeUndefined();
    expect(unbindKey(rebound, 'KeyI').keys['KeyW']).toBe('moveForward');
  });

  it('binds and unbinds buttons', () => {
    const rebound = bindButton(DEFAULT_BINDINGS, 0, 'moveForward');

    expect(rebound.buttons[0]).toBe('moveForward');
    expect(DEFAULT_BINDINGS.buttons[0]).toBeUndefined();
    expect(unbindButton(rebound, 0).buttons[0]).toBeUndefined();
    expect(rebound.buttons[0]).toBe('moveForward');
  });
});

describe('input evaluation', () => {
  it('returns a neutral snapshot without devices', () => {
    expect(evaluateInput(DEFAULT_BINDINGS, state())).toEqual({
      moveX: 0,
      moveZ: 0,
      turnX: 0,
      turnY: 0,
      stickTurnX: 0,
      stickTurnY: 0,
      mouseDeltaX: 0,
      mouseDeltaY: 0,
    });
  });

  it('maps the default keys to movement and look', () => {
    expect(evaluateInput(DEFAULT_BINDINGS, state({ pressedKeys: keys('KeyW') })).moveZ).toBe(1);
    expect(evaluateInput(DEFAULT_BINDINGS, state({ pressedKeys: keys('KeyS') })).moveZ).toBe(-1);
    expect(evaluateInput(DEFAULT_BINDINGS, state({ pressedKeys: keys('KeyD') })).moveX).toBe(1);
    expect(evaluateInput(DEFAULT_BINDINGS, state({ pressedKeys: keys('KeyA') })).moveX).toBe(-1);
    expect(evaluateInput(DEFAULT_BINDINGS, state({ pressedKeys: keys('ArrowRight') })).turnX).toBe(
      1,
    );
    expect(evaluateInput(DEFAULT_BINDINGS, state({ pressedKeys: keys('ArrowUp') })).turnY).toBe(1);
  });

  it('cancels opposing keys and ignores unknown keys', () => {
    const opposing = evaluateInput(DEFAULT_BINDINGS, state({ pressedKeys: keys('KeyW', 'KeyS') }));
    const unknown = evaluateInput(DEFAULT_BINDINGS, state({ pressedKeys: keys('KeyQ') }));

    expect(opposing.moveZ).toBe(0);
    expect(unknown.moveZ).toBe(0);
    expect(unknown.moveX).toBe(0);
  });

  it('applies the dead zone to both sticks', () => {
    const below = evaluateInput(
      DEFAULT_BINDINGS,
      state({ gamepad: gamepad({ axes: [0.1, 0, 0, 0] }) }),
    );
    const above = evaluateInput(
      DEFAULT_BINDINGS,
      state({ gamepad: gamepad({ axes: [0.5, -1, 1, -1] }) }),
    );
    const expected = (0.5 - GAMEPAD_DEAD_ZONE) / (1 - GAMEPAD_DEAD_ZONE);

    expect(below.moveX).toBe(0);
    expect(above.moveX).toBeCloseTo(expected, 8);
    expect(above.moveZ).toBe(1);
    expect(above.stickTurnX).toBe(1);
    expect(above.stickTurnY).toBe(1);
  });

  it('clamps combined input and passes mouse deltas through', () => {
    const combined = evaluateInput(
      DEFAULT_BINDINGS,
      state({
        pressedKeys: keys('KeyD'),
        gamepad: gamepad({ axes: [1, 0, 0, 0] }),
        mouseDeltaX: 7,
        mouseDeltaY: -3,
      }),
    );

    expect(combined.moveX).toBe(1);
    expect(combined.mouseDeltaX).toBe(7);
    expect(combined.mouseDeltaY).toBe(-3);
  });

  it('honours button bindings', () => {
    const bindings: InputBindings = {
      keys: {},
      buttons: { 0: 'moveForward' },
    };
    const pressed = evaluateInput(
      bindings,
      state({ gamepad: gamepad({ buttons: [{ pressed: true }] }) }),
    );

    expect(pressed.moveZ).toBe(1);
  });
});

describe('the input device', () => {
  it('reads bound keys, prevents default only for them, and clears on release', () => {
    const canvas = createFakeCanvas();
    const events = createFakeTarget();
    const input = createInput({
      canvas: canvas.canvas,
      events: events.target,
      pointerLock: { pointerLockElement: null },
    });
    const forward = keyEvent('KeyW');
    const unknown = keyEvent('KeyQ');

    events.dispatch('keydown', forward.event);
    expect(input.sample().moveZ).toBe(1);
    expect(forward.prevented()).toBe(true);

    events.dispatch('keydown', unknown.event);
    expect(unknown.prevented()).toBe(false);

    events.dispatch('keyup', forward.event);
    expect(input.sample().moveZ).toBe(0);

    input.dispose();
  });

  it('accumulates mouse movement only while pointer-locked and resets it per sample', () => {
    const canvas = createFakeCanvas();
    const events = createFakeTarget();
    const lockEvents = createFakeTarget();
    const pointerLock = { pointerLockElement: null as Element | null };
    const input = createInput({
      canvas: canvas.canvas,
      events: events.target,
      lockEvents: lockEvents.target,
      pointerLock,
    });

    events.dispatch('mousemove', mouseEvent(10, -5));
    expect(input.sample().mouseDeltaX).toBe(0);

    pointerLock.pointerLockElement = canvas.canvas as unknown as Element;
    expect(input.isPointerLocked()).toBe(true);

    events.dispatch('mousemove', mouseEvent(10, -5));
    const first = input.sample();
    expect(first.mouseDeltaX).toBe(10);
    expect(first.mouseDeltaY).toBe(-5);
    expect(input.sample().mouseDeltaX).toBe(0);

    events.dispatch('mousemove', mouseEvent(4, 4));
    pointerLock.pointerLockElement = null;
    lockEvents.dispatch('pointerlockchange', new Event('pointerlockchange'));
    expect(input.sample().mouseDeltaX).toBe(0);

    input.dispose();
  });

  it('requests pointer lock on a canvas click', () => {
    const canvas = createFakeCanvas();
    const events = createFakeTarget();
    const input = createInput({ canvas: canvas.canvas, events: events.target });

    canvas.dispatch('click', new Event('click'));

    expect(canvas.lockRequests()).toBe(1);

    input.dispose();
  });

  it('clears pressed keys on blur', () => {
    const canvas = createFakeCanvas();
    const events = createFakeTarget();
    const input = createInput({ canvas: canvas.canvas, events: events.target });
    const forward = keyEvent('KeyW');

    events.dispatch('keydown', forward.event);
    events.dispatch('blur', new Event('blur'));

    expect(input.sample().moveZ).toBe(0);

    input.dispose();
  });

  it('rebinds and unbinds through the API', () => {
    const canvas = createFakeCanvas();
    const events = createFakeTarget();
    const input = createInput({ canvas: canvas.canvas, events: events.target });
    const rebound = keyEvent('KeyI');

    input.bindKey('KeyI', 'moveForward');
    events.dispatch('keydown', rebound.event);
    expect(input.sample().moveZ).toBe(1);

    input.unbindKey('KeyI');
    events.dispatch('keydown', rebound.event);
    expect(input.sample().moveZ).toBe(0);

    input.dispose();
  });

  it('reads the first connected gamepad', () => {
    const canvas = createFakeCanvas();
    const events = createFakeTarget();
    const input = createInput({
      canvas: canvas.canvas,
      events: events.target,
      gamepads: {
        getGamepads: () => [null, gamepad({ axes: [0.5, 0, 0, 0] })],
      },
    });

    expect(input.sample().moveX).toBeCloseTo(
      (0.5 - GAMEPAD_DEAD_ZONE) / (1 - GAMEPAD_DEAD_ZONE),
      8,
    );

    input.dispose();
  });

  it('removes every listener it added', () => {
    const canvas = createFakeCanvas();
    const events = createFakeTarget();
    const lockEvents = createFakeTarget();
    const input = createInput({
      canvas: canvas.canvas,
      events: events.target,
      lockEvents: lockEvents.target,
    });

    input.dispose();

    expect([...events.removed].sort()).toEqual([...events.added].sort());
    expect([...lockEvents.removed].sort()).toEqual([...lockEvents.added].sort());
    expect([...canvas.removed].sort()).toEqual([...canvas.added].sort());
    expect(events.removed).toHaveLength(4);
    expect(lockEvents.removed).toEqual(['pointerlockchange']);
    expect(canvas.removed).toEqual(['click']);
  });
});
