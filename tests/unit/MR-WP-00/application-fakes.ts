import type { ApplicationDependencies, FrameUpdate } from '../../../src/application';

type FakeOptions = Readonly<{
  failOn?: ReadonlySet<string>;
  clearSavedData?: () => Promise<void>;
}>;

const empty = Object.freeze({});

export const createApplicationFakes = (options: FakeOptions = {}) => {
  const calls: string[] = [];
  let frameHandler: ((frame: FrameUpdate) => void) | undefined;
  let visibilityHandler: ((visible: boolean) => void) | undefined;

  const call = (name: string): void => {
    calls.push(name);
    if (options.failOn?.has(name) === true) throw new Error(`Controlled ${name} failure.`);
  };
  const owner = (name: string) =>
    Object.freeze({
      start: () => {
        try {
          call(`${name}:start`);
        } catch (error) {
          calls.push(`${name}:partial-stop`);
          throw error;
        }
      },
      stop: () => call(`${name}:stop`),
    });

  const dependencies: ApplicationDependencies = Object.freeze({
    platform: Object.freeze({
      startVisibilityWatch: (handler: (visible: boolean) => void) => {
        call('platform:start');
        visibilityHandler = handler;
      },
      stopVisibilityWatch: () => call('platform:stop'),
    }),
    timing: Object.freeze({
      startFrameLoop: (handler: (frame: FrameUpdate) => void) => {
        call('timing:start');
        frameHandler = handler;
      },
      pauseFrameLoop: () => call('timing:pause'),
      resumeFrameLoop: () => call('timing:resume'),
      stopFrameLoop: () => {
        call('timing:stop');
        frameHandler = undefined;
      },
    }),
    diagnostics: Object.freeze({ createDiagnostic: () => undefined }),
    persistence: Object.freeze({
      ...owner('persistence'),
      clearSavedData: async () => {
        call('persistence:clear');
        await options.clearSavedData?.();
      },
    }),
    input: Object.freeze({
      ...owner('input'),
      readFrameInput: () => {
        call('input:frame');
        return empty;
      },
    }),
    ui: Object.freeze({ ...owner('ui'), updateFrame: () => call('ui:frame') }),
    player: Object.freeze({
      ...owner('player'),
      updateFrame: () => {
        call('player:frame');
        return empty;
      },
    }),
    world: Object.freeze({
      ...owner('world'),
      getMovementContext: () => {
        call('world:movement');
        return empty;
      },
      updateFrame: () => call('world:frame'),
      getInteractionContext: () => {
        call('world:interaction');
        return empty;
      },
    }),
    interaction: Object.freeze({
      ...owner('interaction'),
      updateFrame: () => call('interaction:frame'),
    }),
    rendering: Object.freeze({ ...owner('rendering'), render: () => call('rendering:frame') }),
    audio: Object.freeze({ ...owner('audio'), updateFrame: () => call('audio:frame') }),
    cutscenes: Object.freeze({
      ...owner('cutscenes'),
      updateFrame: () => call('cutscenes:frame'),
    }),
  });

  return Object.freeze({
    calls,
    dependencies,
    runFrame: (frame: FrameUpdate = { deltaSeconds: 0.016 }) => frameHandler?.(frame),
    setVisible: (visible: boolean) => visibilityHandler?.(visible),
  });
};

export const deferred = () => {
  let resolve: () => void = () => undefined;
  let reject: () => void = () => undefined;
  const promise = new Promise<void>((complete, fail) => {
    resolve = complete;
    reject = () => fail(new Error('Controlled asynchronous failure.'));
  });
  return Object.freeze({ promise, resolve, reject });
};
