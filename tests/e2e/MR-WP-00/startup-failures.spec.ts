import { expect, test, type Page } from '@playwright/test';

type Setup = Readonly<{
  controller: boolean;
  webglFailures: number;
  indexedDb: boolean;
  webAudio: boolean;
  pointerLock: boolean;
  fatalOnReady: boolean;
}>;

type Evidence = {
  webglAttributes: WebGLContextAttributes[];
  openedDatabases: string[];
  deletedDatabases: string[];
  probeStoreCounts: number[];
  clipboardWrites: string[];
};

const installCapabilities = async (page: Page, options: Setup): Promise<void> => {
  await page.addInitScript((setup) => {
    const evidence: Evidence = {
      webglAttributes: [],
      openedDatabases: [],
      deletedDatabases: [],
      probeStoreCounts: [],
      clipboardWrites: [],
    };
    Object.defineProperty(window, '__mrEvidence', { configurable: true, value: evidence });

    let webglAttempts = 0;
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      configurable: true,
      value(_type: string, attributes?: WebGLContextAttributes) {
        if (_type === 'webgl2') {
          evidence.webglAttributes.push(attributes ?? {});
          webglAttempts += 1;
          return webglAttempts <= setup.webglFailures ? null : {};
        }
        return null;
      },
    });
    Object.defineProperty(window, 'AudioContext', {
      configurable: true,
      value: setup.webAudio ? class {} : undefined,
    });
    Object.defineProperty(HTMLElement.prototype, 'requestPointerLock', {
      configurable: true,
      value: setup.pointerLock ? () => undefined : undefined,
    });
    Object.defineProperty(document, 'exitPointerLock', {
      configurable: true,
      value: setup.pointerLock ? () => undefined : undefined,
    });
    Object.defineProperty(Navigator.prototype, 'getGamepads', {
      configurable: true,
      value: setup.controller ? () => [] : undefined,
    });

    const originalOpen = indexedDB.open.bind(indexedDB);
    const originalDelete = indexedDB.deleteDatabase.bind(indexedDB);
    Object.defineProperty(IDBFactory.prototype, 'open', {
      configurable: true,
      value(this: IDBFactory, name: string, version?: number) {
        evidence.openedDatabases.push(name);
        if (!setup.indexedDb) {
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

    if (setup.fatalOnReady) {
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
  }, options);
};

const browserEvidence = async (page: Page): Promise<Evidence> =>
  await page.evaluate(() => {
    return (window as unknown as Window & { __mrEvidence: Evidence }).__mrEvidence;
  });

const trackExternalRequests = (page: Page): string[] => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:5173') {
      externalRequests.push(request.url());
    }
  });
  return externalRequests;
};

test('shows every required blocking reason together with safe retry guidance', async ({ page }) => {
  const externalRequests = trackExternalRequests(page);
  await installCapabilities(page, {
    controller: true,
    webglFailures: 999,
    indexedDb: false,
    webAudio: false,
    pointerLock: false,
    fatalOnReady: false,
  });
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Browser check blocked' })).toBeVisible();
  await expect(page.getByText('3D graphics are not available.')).toBeVisible();
  await expect(page.getByText('Local saved data is not available.')).toBeVisible();
  await expect(page.getByText('Required browser audio is not available.')).toBeVisible();
  await expect(
    page.getByText('The browser cannot provide the mouse control required for movement.'),
  ).toBeVisible();
  await expect(page.getByText('Campaign data did not change.')).toBeVisible();
  await expect(page.getByText(/current desktop browser/iu)).toBeVisible();
  const retry = page.getByRole('button', { name: 'Retry Check' });
  await expect(retry).toBeVisible();
  await expect(retry).toBeFocused();
  await expect(page.locator('a')).toHaveCount(0);
  expect(externalRequests).toEqual([]);
});

test('runs a new complete check after Retry Check', async ({ page }) => {
  await installCapabilities(page, {
    controller: true,
    webglFailures: 1,
    indexedDb: true,
    webAudio: true,
    pointerLock: true,
    fatalOnReady: false,
  });
  await page.goto('/');

  await page.getByRole('button', { name: 'Retry Check' }).click();
  await expect(page.getByText('Ready', { exact: true })).toBeVisible();
  const evidence = await browserEvidence(page);
  expect(evidence.webglAttributes).toHaveLength(2);
  expect(evidence.openedDatabases).toEqual([
    'minor-revisions-capability-probe',
    'minor-revisions-capability-probe',
  ]);
  expect(evidence.deletedDatabases).toEqual([
    'minor-revisions-capability-probe',
    'minor-revisions-capability-probe',
  ]);
  expect(evidence.probeStoreCounts).toEqual([0, 0]);
});

test('presents one safe fatal screen and copies only after the user acts', async ({ page }) => {
  const externalRequests = trackExternalRequests(page);
  const escapedPageErrors: string[] = [];
  page.on('pageerror', (error) => escapedPageErrors.push(error.message));
  await installCapabilities(page, {
    controller: true,
    webglFailures: 0,
    indexedDb: true,
    webAudio: true,
    pointerLock: true,
    fatalOnReady: true,
  });
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: 'Minor Revisions must stop because it cannot continue safely.',
    }),
  ).toBeVisible();
  await expect(page.getByText(/unexpected startup problem/iu)).toBeVisible();
  await expect(page.getByText('MRD1-BOOTSTRAP-UNEXPECTED')).toBeVisible();
  const copy = page.getByRole('button', { name: 'Copy Diagnostic' });
  const reload = page.getByRole('button', { name: 'Reload Page' });
  await expect(copy).toBeFocused();
  await expect(reload).toBeVisible();

  expect((await browserEvidence(page)).clipboardWrites).toEqual([]);
  await copy.click();
  await expect.poll(async () => (await browserEvidence(page)).clipboardWrites.length).toBe(1);
  const [copied] = (await browserEvidence(page)).clipboardWrites;
  expect(copied).toBeDefined();
  expect(JSON.parse(copied ?? '{}')).toEqual({
    schemaVersion: 1,
    code: 'MRD1-BOOTSTRAP-UNEXPECTED',
    severity: 'fatal',
    phase: 'startup',
    module: 'BOOTSTRAP',
    operation: 'START_BOOTSTRAP',
    buildVersion: '0.0.0',
    contentVersion: null,
    graphicsProfile: null,
    capabilities: null,
    contextCodes: ['STARTUP_INTERRUPTED'],
    recoveryActions: ['reloadPage'],
  });
  expect(copied).not.toMatch(/Controlled|stack|path|https?:|player|campaign|save|device/iu);
  expect(escapedPageErrors).toEqual([]);
  expect(externalRequests).toEqual([]);
});
