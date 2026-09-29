import { createApplication, createFrameLoop } from './application/index.ts';
import type { ApplicationFault } from './application/index.ts';
import { createInput } from './input/index.ts';
import type { Input } from './input/index.ts';
import { START_YAW, createPlayer } from './player/index.ts';
import type { Player } from './player/index.ts';
import { createFrameScheduler, createTimingSource, detectCompatibility } from './platform/index.ts';
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
  input?.dispose();
  input = null;
  player = null;
};

const startControls = (): ApplicationFault | null => {
  if (world === null) {
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

    player.update(deltaMs, input.sample());
    world.setCameraPose(player.pose());
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
