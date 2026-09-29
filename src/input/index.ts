export {
  DEFAULT_BINDINGS,
  DEFAULT_KEY_BINDINGS,
  INPUT_ACTIONS,
  bindButton,
  bindKey,
  unbindButton,
  unbindKey,
} from './bindings.ts';
export type { InputAction, InputBindings } from './bindings.ts';
export { GAMEPAD_DEAD_ZONE, createInput, evaluateInput } from './input.ts';
export type {
  CanvasLike,
  DeviceState,
  EventTargetLike,
  GamepadButtonLike,
  GamepadLike,
  GamepadSourceLike,
  Input,
  InputOptions,
  InputSnapshot,
  PointerLockLike,
} from './input.ts';
