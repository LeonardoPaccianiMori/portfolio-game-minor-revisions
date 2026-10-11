import { expect, test } from '@playwright/test';

test('a short scene eases, holds, returns control, and skips safely', async ({ page }) => {
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
    const runner = worldModule.createSceneRunner({
      onFrame: (pose) => {
        world.setCameraPose(pose);
      },
    });
    const scene = worldModule.SCENES[0];
    const from = { x: 5.2, z: 9.8, yaw: Math.PI, pitch: 0 };

    if (scene === undefined) {
      throw new Error('The opening scene is missing.');
    }

    runner.start(scene, from);
    let steps = 0;

    while (runner.isActive() && steps < 1000) {
      runner.update(16);
      steps += 1;
    }

    const afterAuto = world.cameraPose();

    const fromSecond = { x: 1, z: 1, yaw: 0, pitch: 0 };
    runner.start(scene, fromSecond);
    runner.update(16);
    const mid = world.cameraPose();
    runner.skip();
    const afterSkip = world.cameraPose();

    world.render();
    const drawCalls = world.stats().drawCalls;

    world.dispose();
    container.remove();

    return {
      openingSceneId: worldModule.OPENING_SCENE_ID,
      steps,
      from,
      afterAuto,
      mid,
      fromSecond,
      afterSkip,
      drawCalls,
    };
  });

  expect(result.openingSceneId).toBe('scene.intro.department');
  expect(result.steps).toBeGreaterThan(1);
  expect(result.steps).toBeLessThan(1000);
  expect(result.afterAuto).toEqual(result.from);
  expect(result.mid.x).not.toBe(result.fromSecond.x);
  expect(result.afterSkip).toEqual(result.fromSecond);
  expect(result.drawCalls).toBeGreaterThan(0);
});
