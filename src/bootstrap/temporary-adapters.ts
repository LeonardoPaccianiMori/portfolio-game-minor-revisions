import type {
  ApplicationDependencies,
  AudioPort,
  CutscenePort,
  InputControlPort,
  InteractionPort,
  PersistencePort,
  PlatformPort,
  PlayerPort,
  RenderingPort,
  TimingPort,
  UiPort,
  WorldPort,
} from '../application';

const empty = Object.freeze({});
const startStop = () => Object.freeze({ start: () => undefined, stop: () => undefined });

const createPlatform = (): PlatformPort =>
  Object.freeze({
    startVisibilityWatch: () => undefined,
    stopVisibilityWatch: () => undefined,
  });

const createPersistence = (): PersistencePort =>
  Object.freeze({
    ...startStop(),
    clearSavedData: () => Promise.resolve(),
  });

const createInput = (): InputControlPort =>
  Object.freeze({
    ...startStop(),
    readFrameInput: () => empty,
  });

const createUi = (): UiPort => Object.freeze({ ...startStop(), updateFrame: () => undefined });
const createPlayer = (): PlayerPort => Object.freeze({ ...startStop(), updateFrame: () => empty });
const createWorld = (): WorldPort =>
  Object.freeze({
    ...startStop(),
    getMovementContext: () => empty,
    updateFrame: () => undefined,
    getInteractionContext: () => empty,
  });
const createInteraction = (): InteractionPort =>
  Object.freeze({ ...startStop(), updateFrame: () => undefined });
const createRendering = (): RenderingPort =>
  Object.freeze({ ...startStop(), render: () => undefined });
const createAudio = (): AudioPort =>
  Object.freeze({ ...startStop(), updateFrame: () => undefined });
const createCutscenes = (): CutscenePort =>
  Object.freeze({ ...startStop(), updateFrame: () => undefined });

export const createTemporaryApplicationDependencies = (
  timing: TimingPort,
): ApplicationDependencies =>
  Object.freeze({
    platform: createPlatform(),
    timing,
    diagnostics: Object.freeze({ createDiagnostic: () => undefined }),
    persistence: createPersistence(),
    input: createInput(),
    ui: createUi(),
    player: createPlayer(),
    world: createWorld(),
    interaction: createInteraction(),
    rendering: createRendering(),
    audio: createAudio(),
    cutscenes: createCutscenes(),
  });
