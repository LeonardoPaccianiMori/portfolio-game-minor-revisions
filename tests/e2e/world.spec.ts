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

    const worldModule = (await import(
      worldModulePath
    )) as typeof import('../../src/world/index.ts');

    const container = document.createElement('div');
    container.style.width = '320px';
    container.style.height = '240px';
    document.body.appendChild(container);

    const world = worldModule.createWorld({ container });
    world.render();
    const stats = world.stats();
    const recovered = world.recover({ x: 4.0, z: -4.0 });
    world.resize(400, 300);
    world.dispose();
    const canvasRemoved = world.canvas.isConnected === false;
    world.dispose();
    container.remove();

    return {
      renderCalls: stats.renderCalls,
      anchorId: recovered.id,
      canvasRemoved,
    };
  });

  expect(result.renderCalls).toBeGreaterThan(0);
  expect(result.anchorId).toBe('anchor.grow-room');
  expect(result.canvasRemoved).toBe(true);
});
