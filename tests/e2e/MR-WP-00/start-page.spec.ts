import { expect, test, type Page } from '@playwright/test';

type CapabilitySetup = Readonly<{
  controller: boolean;
  webglFailures: number;
  indexedDb: boolean;
  webAudio: boolean;
  pointerLock: boolean;
  fatalOnReady: boolean;
}>;

type BrowserEvidence = {
  stages: string[];
  webglAttributes: WebGLContextAttributes[];
  openedDatabases: string[];
  deletedDatabases: string[];
  probeStoreCounts: number[];
  audioCreations: number;
  pointerRequests: number;
  controllerReads: number;
  clipboardWrites: string[];
};

const supportedSetup: CapabilitySetup = {
  controller: true,
  webglFailures: 0,
  indexedDb: true,
  webAudio: true,
  pointerLock: true,
  fatalOnReady: false,
};

export const installCapabilities = async (
  page: Page,
  setup: CapabilitySetup = supportedSetup,
): Promise<void> => {
  await page.addInitScript((options) => {
    const evidence: BrowserEvidence = {
      stages: [],
      webglAttributes: [],
      openedDatabases: [],
      deletedDatabases: [],
      probeStoreCounts: [],
      audioCreations: 0,
      pointerRequests: 0,
      controllerReads: 0,
      clipboardWrites: [],
    };
    Object.defineProperty(window, '__mrEvidence', { configurable: true, value: evidence });

    const observer = new MutationObserver(() => {
      const stage = document.querySelector('.startup-stage')?.textContent;
      if (stage !== null && stage !== undefined && !evidence.stages.includes(stage)) {
        evidence.stages.push(stage);
      }
    });
    observer.observe(document, { childList: true, subtree: true });

    let webglAttempts = 0;
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      configurable: true,
      value(this: HTMLCanvasElement, type: string, attributes?: WebGLContextAttributes) {
        if (type === 'webgl2') {
          evidence.webglAttributes.push(attributes ?? {});
          webglAttempts += 1;
          return webglAttempts <= options.webglFailures ? null : {};
        }
        return null;
      },
    });

    Object.defineProperty(window, 'AudioContext', {
      configurable: true,
      value: options.webAudio
        ? class {
            public constructor() {
              evidence.audioCreations += 1;
            }
          }
        : undefined,
    });
    Object.defineProperty(HTMLElement.prototype, 'requestPointerLock', {
      configurable: true,
      value: options.pointerLock
        ? () => {
            evidence.pointerRequests += 1;
          }
        : undefined,
    });
    Object.defineProperty(document, 'exitPointerLock', {
      configurable: true,
      value: options.pointerLock ? () => undefined : undefined,
    });
    Object.defineProperty(Navigator.prototype, 'getGamepads', {
      configurable: true,
      value: options.controller
        ? () => {
            evidence.controllerReads += 1;
            return [];
          }
        : undefined,
    });

    const originalOpen = indexedDB.open.bind(indexedDB);
    const originalDelete = indexedDB.deleteDatabase.bind(indexedDB);
    Object.defineProperty(IDBFactory.prototype, 'open', {
      configurable: true,
      value(this: IDBFactory, name: string, version?: number) {
        evidence.openedDatabases.push(name);
        if (!options.indexedDb) {
          throw new Error('Controlled IndexedDB probe failure.');
        }
        const request = version === undefined ? originalOpen(name) : originalOpen(name, version);
        request.addEventListener('upgradeneeded', () => {
          evidence.probeStoreCounts.push(request.result.objectStoreNames.length);
        });
        return request;
      },
    });
    Object.defineProperty(IDBFactory.prototype, 'deleteDatabase', {
      configurable: true,
      value(this: IDBFactory, name: string) {
        evidence.deletedDatabases.push(name);
        return originalDelete(name);
      },
    });

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: (value: string) => {
          evidence.clipboardWrites.push(value);
          return Promise.resolve();
        },
      },
    });

    if (options.fatalOnReady) {
      window.addEventListener(
        'DOMContentLoaded',
        () => {
          setTimeout(() => {
            window.dispatchEvent(
              new ErrorEvent('error', {
                error: new Error('Controlled startup presentation failure.'),
              }),
            );
          }, 0);
        },
        { once: true },
      );
    }
  }, setup);
};

export const browserEvidence = async (page: Page): Promise<BrowserEvidence> =>
  await page.evaluate(() => {
    return (window as unknown as Window & { __mrEvidence: BrowserEvidence }).__mrEvidence;
  });

export const trackExternalRequests = (page: Page): string[] => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:5173') {
      externalRequests.push(request.url());
    }
  });
  return externalRequests;
};

test('shows factual Checking browser and Ready states with clean temporary probes', async ({
  page,
}) => {
  const externalRequests = trackExternalRequests(page);
  await installCapabilities(page);
  await page.goto('/');

  await expect(page).toHaveTitle('Minor Revisions');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Minor Revisions');
  await expect(page.getByText('Ready', { exact: true })).toBeVisible();
  await expect(page.getByText('Startup checks passed.')).toBeVisible();
  await expect(page.getByText('Game systems are not yet available.')).toBeVisible();
  await expect(page.getByRole('button')).toHaveCount(0);

  const evidence = await browserEvidence(page);
  expect(evidence.stages).toEqual(['Checking browser', 'Ready']);
  expect(evidence.webglAttributes).toEqual([
    {
      alpha: false,
      antialias: true,
      depth: true,
      preserveDrawingBuffer: false,
      stencil: false,
    },
  ]);
  expect(evidence.openedDatabases).toEqual(['minor-revisions-capability-probe']);
  expect(evidence.deletedDatabases).toEqual(['minor-revisions-capability-probe']);
  expect(evidence.probeStoreCounts).toEqual([0]);
  expect(evidence.openedDatabases).not.toContain('minor-revisions');
  expect(evidence.audioCreations).toBe(0);
  expect(evidence.pointerRequests).toBe(0);
  expect(evidence.controllerReads).toBe(0);
  expect(evidence.clipboardWrites).toEqual([]);
  expect(externalRequests).toEqual([]);
});

test('shows the exact optional controller message without blocking readiness', async ({ page }) => {
  await installCapabilities(page, { ...supportedSetup, controller: false });
  await page.goto('/');

  await expect(page.getByText('Ready', { exact: true })).toBeVisible();
  await expect(
    page.getByText('Controller input is unavailable. Use keyboard and mouse.'),
  ).toBeVisible();
  await expect(page.getByRole('button')).toHaveCount(0);
});
