import { createApplication, createFrameLoop } from './application/index.ts';
import type { ApplicationFault } from './application/index.ts';
import { createFrameScheduler, createTimingSource, detectCompatibility } from './platform/index.ts';
import { createWorld } from './world/index.ts';
import type { World } from './world/index.ts';

const appElement = document.querySelector<HTMLElement>('#app');
const statusElement = document.querySelector<HTMLParagraphElement>('#app-status');
const errorElement = document.querySelector<HTMLElement>('#app-error');
const errorMessageElement = document.querySelector<HTMLParagraphElement>('#app-error-message');
const reloadButton = document.querySelector<HTMLButtonElement>('#app-error-reload');
const worldContainer = document.querySelector<HTMLElement>('#app-world');

let world: World | null = null;

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

const startWorld = (): ApplicationFault | null => {
  if (worldContainer === null) {
    return { code: 'startup:world', message: 'The game could not start.' };
  }

  try {
    world = createWorld({ container: worldContainer });
  } catch {
    return { code: 'startup:world', message: 'The game could not start.' };
  }

  return null;
};

const stopWorld = (): void => {
  world?.dispose();
  world = null;
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

  frameLoop.subscribe(() => {
    world?.render();
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
    ],
    shutdown: [
      {
        name: 'world',
        run: () => {
          stopWorld();
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
