import { createApplication, createFrameLoop } from './application/index.ts';
import { createFrameScheduler, createTimingSource, detectCompatibility } from './platform/index.ts';

const appElement = document.querySelector<HTMLElement>('#app');
const statusElement = document.querySelector<HTMLParagraphElement>('#app-status');
const errorElement = document.querySelector<HTMLElement>('#app-error');
const errorMessageElement = document.querySelector<HTMLParagraphElement>('#app-error-message');
const reloadButton = document.querySelector<HTMLButtonElement>('#app-error-reload');

const showReady = (): void => {
  if (appElement !== null) {
    appElement.dataset['state'] = 'ready';
  }

  if (statusElement !== null) {
    statusElement.textContent = 'Startup checks passed.';
  }
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

reloadButton?.addEventListener('click', () => {
  window.location.reload();
});

const bootstrap = async (): Promise<void> => {
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
    ],
    shutdown: [],
    frameLoop: createFrameLoop({
      scheduler: createFrameScheduler(),
      timing: createTimingSource(),
    }),
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
