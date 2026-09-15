import { expect, test } from '@playwright/test';

test('the world renders after startup', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#app-world')).toBeVisible();

  const canvas = page.locator('#app-world canvas');
  await expect(canvas).toBeVisible();

  const size = await canvas.evaluate((element) => {
    const canvasElement = element as HTMLCanvasElement;

    return {
      width: canvasElement.width,
      height: canvasElement.height,
    };
  });

  expect(size.width).toBeGreaterThan(0);
  expect(size.height).toBeGreaterThan(0);
});

test('the world module builds, renders, recovers, and disposes', async ({ page }) => {
  await page.goto('/');

  const result = await page.evaluate(async () => {
    const worldModulePath = '/src/world/index.ts';
    const planModulePath = '/src/world/floor-plan.ts';

    const worldModule = (await import(
      worldModulePath
    )) as typeof import('../../src/world/index.ts');
    const planModule = (await import(
      planModulePath
    )) as typeof import('../../src/world/floor-plan.ts');

    const container = document.createElement('div');
    container.style.width = '320px';
    container.style.height = '240px';
    document.body.appendChild(container);

    const world = worldModule.createWorld({ container });
    world.render();
    const stats = world.stats();

    const recoveries = planModule.ANCHORS.map(
      (anchor) => world.recover({ x: anchor.x, z: anchor.z }).id,
    );
    const startPointRecovery = world.recover({
      x: planModule.START_ANCHOR.x,
      z: planModule.START_ANCHOR.z,
    }).id;

    world.resize(400, 300);
    world.dispose();
    const canvasRemoved = world.canvas.isConnected === false;
    world.dispose();
    container.remove();

    return {
      drawCalls: stats.drawCalls,
      meshCount: stats.meshCount,
      expectedMeshCount: planModule.WALL_COLLIDERS.length + planModule.PROPS.length + 1,
      recoveries,
      expectedAnchors: planModule.ANCHORS.map((anchor) => anchor.id),
      startPointRecovery,
      expectedStartPointRecovery: 'anchor.desk-hub',
      startAnchorId: planModule.START_ANCHOR.id,
      canvasRemoved,
    };
  });

  expect(result.drawCalls).toBeGreaterThan(0);
  expect(result.meshCount).toBe(result.expectedMeshCount);
  expect(result.recoveries).toEqual(result.expectedAnchors);
  expect(result.startPointRecovery).toBe(result.expectedStartPointRecovery);
  expect(result.startAnchorId).toBe('anchor.start');
  expect(result.canvasRemoved).toBe(true);
});

test('a failed world start leaves no canvas behind', async ({ page }) => {
  await page.goto('/');

  const result = await page.evaluate(async () => {
    const worldModulePath = '/src/world/index.ts';

    const worldModule = (await import(
      worldModulePath
    )) as typeof import('../../src/world/index.ts');

    const container = document.createElement('div');
    container.style.width = '120px';
    container.style.height = '120px';
    document.body.appendChild(container);

    const original = container.appendChild.bind(container);
    container.appendChild = () => {
      throw new Error('blocked');
    };

    let threw = false;
    try {
      worldModule.createWorld({ container });
    } catch {
      threw = true;
    }

    container.appendChild = original;
    const childCount = container.childElementCount;
    container.remove();

    return { threw, childCount };
  });

  expect(result.threw).toBe(true);
  expect(result.childCount).toBe(0);
});
