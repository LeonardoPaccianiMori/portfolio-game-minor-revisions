export const INPUT_ACTIONS = [
  'moveForward',
  'moveBackward',
  'moveLeft',
  'moveRight',
  'lookUp',
  'lookDown',
  'lookLeft',
  'lookRight',
] as const;
export type InputAction = (typeof INPUT_ACTIONS)[number];

export interface InputBindings {
  readonly keys: Readonly<Record<string, InputAction>>;
  readonly buttons: Readonly<Record<number, InputAction>>;
}

export const DEFAULT_KEY_BINDINGS: Readonly<Record<string, InputAction>> = {
  KeyW: 'moveForward',
  KeyS: 'moveBackward',
  KeyA: 'moveLeft',
  KeyD: 'moveRight',
  ArrowUp: 'lookUp',
  ArrowDown: 'lookDown',
  ArrowLeft: 'lookLeft',
  ArrowRight: 'lookRight',
};

export const DEFAULT_BINDINGS: InputBindings = {
  keys: DEFAULT_KEY_BINDINGS,
  buttons: {},
};

export const bindKey = (
  bindings: InputBindings,
  code: string,
  action: InputAction,
): InputBindings => ({
  ...bindings,
  keys: { ...bindings.keys, [code]: action },
});

export const unbindKey = (bindings: InputBindings, code: string): InputBindings => {
  const keys = { ...bindings.keys };
  delete keys[code];

  return { ...bindings, keys };
};

export const bindButton = (
  bindings: InputBindings,
  index: number,
  action: InputAction,
): InputBindings => ({
  ...bindings,
  buttons: { ...bindings.buttons, [index]: action },
});

export const unbindButton = (bindings: InputBindings, index: number): InputBindings => {
  const buttons = { ...bindings.buttons };
  delete buttons[index];

  return { ...bindings, buttons };
};
