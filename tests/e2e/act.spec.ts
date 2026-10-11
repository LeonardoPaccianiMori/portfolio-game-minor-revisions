import { expect, test } from '@playwright/test';

test('the acts change the palette and the room states', async ({ page }) => {
  await page.goto('/');

  const result = await page.evaluate(async () => {
    const worldModulePath = '/src/world/index.ts';
    const sessionModulePath = '/src/application/index.ts';

    const worldModule = (await import(
      worldModulePath
    )) as typeof import('../../src/world/index.ts');
    const sessionModule = (await import(
      sessionModulePath
    )) as typeof import('../../src/application/index.ts');

    const container = document.createElement('div');
    container.style.width = '320px';
    container.style.height = '240px';
    document.body.appendChild(container);

    const world = worldModule.createWorld({ container });
    const session = sessionModule.createGameSession();

    const capture = (): {
      act: string;
      background: number;
      row: number;
      transform: { scaleY: number; positionY: number };
    } => ({
      act: world.act(),
      background: world.palette().background,
      row: world.propScale('prop.grow.row-2'),
      transform: world.propTransform('prop.grow.row-2'),
    });

    const act1 = capture();
    world.render();

    for (let week = 0; week < 4; week += 1) {
      session.perform({ type: 'advanceWeek' });
    }

    world.applyAct(worldModule.actForWeek(session.state().week));
    world.render();
    const act2 = capture();

    for (let week = 0; week < 4; week += 1) {
      session.perform({ type: 'advanceWeek' });
    }

    world.applyAct(worldModule.actForWeek(session.state().week));
    world.applyAct(worldModule.actForWeek(session.state().week));
    world.render();
    const act3 = capture();

    const drawCalls = world.stats().drawCalls;

    world.dispose();
    let disposedCallSafe = true;
    try {
      world.applyAct('act-2');
    } catch {
      disposedCallSafe = false;
    }

    const actAfterDispose = world.act();

    container.remove();

    return { act1, act2, act3, drawCalls, disposedCallSafe, actAfterDispose };
  });

  expect(result.act1.act).toBe('act-1');
  expect(result.act1.row).toBe(1);
  expect(result.act2.act).toBe('act-2');
  expect(result.act2.row).toBe(0.85);
  expect(result.act3.act).toBe('act-3');
  expect(result.act3.row).toBe(0.55);
  expect(result.act2.background).not.toBe(result.act1.background);
  expect(result.act3.background).not.toBe(result.act2.background);
  expect(result.act2.transform).toEqual({ scaleY: 0.85, positionY: 0.2125 });
  expect(result.act3.transform).toEqual({ scaleY: 0.55, positionY: 0.1375 });
  expect(result.drawCalls).toBeGreaterThan(0);
  expect(result.disposedCallSafe).toBe(true);
  expect(result.actAfterDispose).toBe('act-3');
});
