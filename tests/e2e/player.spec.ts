import { expect, test } from '@playwright/test';

test('the player walks into the desk board, turns, and renders', async ({ page }) => {
  await page.goto('/');

  const result = await page.evaluate(async () => {
    const worldModulePath = '/src/world/index.ts';
    const inputModulePath = '/src/input/index.ts';
    const playerModulePath = '/src/player/index.ts';

    const worldModule = (await import(
      worldModulePath
    )) as typeof import('../../src/world/index.ts');
    const inputModule = (await import(
      inputModulePath
    )) as typeof import('../../src/input/index.ts');
    const playerModule = (await import(
      playerModulePath
    )) as typeof import('../../src/player/index.ts');

    const container = document.createElement('div');
    container.style.width = '320px';
    container.style.height = '240px';
    document.body.appendChild(container);

    const world = worldModule.createWorld({ container });
    const input = inputModule.createInput({ canvas: world.canvas });
    const player = playerModule.createPlayer({
      environment: {
        start: {
          x: worldModule.START_ANCHOR.x,
          z: worldModule.START_ANCHOR.z,
          yaw: playerModule.START_YAW,
        },
        colliders: worldModule.buildColliders(),
      },
    });

    const start = player.pose();

    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));
    for (let step = 0; step < 10; step += 1) {
      player.update(100, input.sample());
    }
    window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyW' }));
    const walked = player.pose();

    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    for (let step = 0; step < 5; step += 1) {
      player.update(100, input.sample());
    }
    window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowLeft' }));
    const turned = player.pose();

    world.setCameraPose(turned);
    world.render();
    const camera = world.cameraPose();
    const stats = world.stats();

    input.dispose();
    world.dispose();
    container.remove();

    return {
      start: { x: start.x, z: start.z, yaw: start.yaw },
      walked: { x: walked.x, z: walked.z },
      turnedYaw: turned.yaw,
      camera: { x: camera.x, z: camera.z },
      drawCalls: stats.drawCalls,
    };
  });

  expect(result.start.x).toBeCloseTo(5.2, 5);
  expect(result.start.z).toBeCloseTo(9.8, 5);
  expect(result.start.yaw).toBeCloseTo(Math.PI, 5);

  expect(result.walked.x).toBeCloseTo(5.2, 5);
  expect(result.walked.z).toBeGreaterThan(result.start.z);
  expect(result.walked.z).toBeGreaterThan(10.4);
  expect(result.walked.z).toBeLessThan(10.66);

  expect(result.turnedYaw).not.toBeCloseTo(Math.PI, 5);
  expect(result.camera.x).toBeCloseTo(result.walked.x, 5);
  expect(result.camera.z).toBeCloseTo(result.walked.z, 5);
  expect(result.drawCalls).toBeGreaterThan(0);
});
