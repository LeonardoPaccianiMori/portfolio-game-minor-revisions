import { createApplication, createFrameLoop, createGameSession } from './application/index.ts';
import type { ApplicationFault, GameSession } from './application/index.ts';
import { createInput } from './input/index.ts';
import type { Input } from './input/index.ts';
import { buildInteractables, createInteractionController } from './interaction/index.ts';
import type { InteractionController } from './interaction/index.ts';
import { START_YAW, createPlayer } from './player/index.ts';
import type { Player } from './player/index.ts';
import { createFrameScheduler, createTimingSource, detectCompatibility } from './platform/index.ts';
import { createBoard, createBoardHost, createBoardView, createPrompt } from './ui/index.ts';
import type { Board, BoardHost, Prompt } from './ui/index.ts';
import { START_ANCHOR, buildColliders, createWorld } from './world/index.ts';
import type { World } from './world/index.ts';

const appElement = document.querySelector<HTMLElement>('#app');
const statusElement = document.querySelector<HTMLParagraphElement>('#app-status');
const errorElement = document.querySelector<HTMLElement>('#app-error');
const errorMessageElement = document.querySelector<HTMLParagraphElement>('#app-error-message');
const reloadButton = document.querySelector<HTMLButtonElement>('#app-error-reload');
const worldContainer = document.querySelector<HTMLElement>('#app-world');

let world: World | null = null;
let input: Input | null = null;
let player: Player | null = null;
let session: GameSession | null = null;
let prompt: Prompt | null = null;
let interaction: InteractionController | null = null;
let board: Board | null = null;
let boardHost: BoardHost | null = null;

const interactables = buildInteractables();
const colliders = buildColliders();

const showReady = (): void => {
  if (appElement !== null) {
    appElement.dataset['state'] = 'ready';
    appElement.hidden = true;
  }

  if (statusElement !== null) {
    statusElement.textContent = 'Startup checks passed.';
  }

  if (worldContainer !== null) {
    worldContainer.hidden = false;
  }

  world?.resize(window.innerWidth, window.innerHeight);
};

const showFault = (message: string): void => {
  if (appElement !== null) {
    appElement.dataset['state'] = 'failed';
  }

  if (statusElement !== null) {
    statusElement.textContent = 'Startup failed.';
  }

  if (errorMessageElement !== null) {
    errorMessageElement.textContent = message;
  }

  if (errorElement !== null) {
    errorElement.hidden = false;
  }
};

const startupFault = (stage: string): ApplicationFault => ({
  code: `startup:${stage}`,
  message: 'The game could not start.',
});

const startWorld = (): ApplicationFault | null => {
  if (worldContainer === null) {
    return startupFault('world');
  }

  try {
    world = createWorld({ container: worldContainer });
  } catch {
    return startupFault('world');
  }

  return null;
};

const stopWorld = (): void => {
  world?.dispose();
  world = null;
};

const stopControls = (): void => {
  board?.dispose();
  board = null;
  boardHost = null;
  prompt?.dispose();
  prompt = null;
  input?.dispose();
  input = null;
  player = null;
  session = null;
  interaction = null;
};

const startControls = (): ApplicationFault | null => {
  if (world === null || worldContainer === null) {
    return startupFault('controls');
  }

  try {
    input = createInput({ canvas: world.canvas });
    player = createPlayer({
      environment: {
        start: { x: START_ANCHOR.x, z: START_ANCHOR.z, yaw: START_YAW },
        colliders: buildColliders(),
      },
    });
    const activeSession = createGameSession();
    session = activeSession;
    prompt = createPrompt(worldContainer);
    board = createBoard(worldContainer, {
      onCommand: (command) => {
        boardHost?.perform(command);
      },
      onClose: () => {
        boardHost?.close();
      },
    });
    boardHost = createBoardHost({
      board,
      session: activeSession,
      view: () => createBoardView(activeSession.state()),
      onOpen: () => {
        document.exitPointerLock?.();
      },
    });
    interaction = createInteractionController({
      world,
      session,
      prompt,
      interactables,
      colliders,
      openBoard: () => {
        boardHost?.open();
      },
    });
    world.setCameraPose(player.pose());
  } catch {
    stopControls();

    return startupFault('controls');
  }

  return null;
};

reloadButton?.addEventListener('click', () => {
  window.location.reload();
});

window.addEventListener('resize', () => {
  world?.resize(window.innerWidth, window.innerHeight);
});

const bootstrap = async (): Promise<void> => {
  const frameLoop = createFrameLoop({
    scheduler: createFrameScheduler(),
    timing: createTimingSource(),
  });

  frameLoop.subscribe((deltaMs) => {
    if (world === null || input === null || player === null) {
      return;
    }

    const snapshot = input.sample();

    if (boardHost !== null && boardHost.isOpen()) {
      boardHost.handleInput(snapshot.interact, snapshot.turnY + snapshot.stickTurnY);
      world.render();
      return;
    }

    player.update(deltaMs, snapshot);
    world.setCameraPose(player.pose());
    interaction?.update(player.pose(), snapshot.interact);
    world.render();
  });

  const application = createApplication({
    startup: [
      {
        name: 'compatibility',
        run: () => {
          const compatibility = detectCompatibility();

          if (compatibility.supported) {
            return null;
          }

          return {
            code: 'unsupported-browser',
            message: compatibility.reason ?? 'This browser cannot run the game.',
          };
        },
      },
      {
        name: 'world',
        run: startWorld,
      },
      {
        name: 'controls',
        run: startControls,
      },
    ],
    shutdown: [
      {
        name: 'world',
        run: () => {
          stopWorld();
          return null;
        },
      },
      {
        name: 'controls',
        run: () => {
          stopControls();
          return null;
        },
      },
    ],
    frameLoop,
  });

  const outcome = await application.start();

  if (outcome.status === 'ready') {
    showReady();
    return;
  }

  if (outcome.fault !== null) {
    showFault(outcome.fault.message);
  }
};

void bootstrap().catch(() => {
  showFault('The game could not start.');
});
