import { expect, test } from '@playwright/test';

test('the break-room table runs one action per press through the composition', async ({ page }) => {
  await page.goto('/');

  const result = await page.evaluate(async () => {
    const worldModulePath = '/src/world/index.ts';
    const inputModulePath = '/src/input/index.ts';
    const playerModulePath = '/src/player/index.ts';
    const interactionModulePath = '/src/interaction/index.ts';
    const sessionModulePath = '/src/application/index.ts';
    const uiModulePath = '/src/ui/index.ts';

    const worldModule = (await import(
      worldModulePath
    )) as typeof import('../../src/world/index.ts');
    const inputModule = (await import(
      inputModulePath
    )) as typeof import('../../src/input/index.ts');
    const playerModule = (await import(
      playerModulePath
    )) as typeof import('../../src/player/index.ts');
    const interactionModule = (await import(
      interactionModulePath
    )) as typeof import('../../src/interaction/index.ts');
    const sessionModule = (await import(
      sessionModulePath
    )) as typeof import('../../src/application/index.ts');
    const uiModule = (await import(uiModulePath)) as typeof import('../../src/ui/index.ts');

    const container = document.createElement('div');
    container.style.width = '320px';
    container.style.height = '240px';
    document.body.appendChild(container);

    const world = worldModule.createWorld({ container });
    const input = inputModule.createInput({ canvas: world.canvas });
    const session = sessionModule.createGameSession();
    const prompt = uiModule.createPrompt(container);
    const interactables = interactionModule.buildInteractables();
    const colliders = worldModule.buildColliders();
    const controller = interactionModule.createInteractionController({
      world,
      session,
      prompt,
      interactables,
      colliders,
    });
    const player = playerModule.createPlayer({
      environment: { start: { x: 17.5, z: -3.2, yaw: 0 }, colliders },
    });

    const frame = (): void => {
      const snapshot = input.sample();
      player.update(100, snapshot);
      controller.update(player.pose(), snapshot.interact);
    };

    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
    frame();
    frame();
    frame();
    const afterFirstPress = session.state();

    window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyE' }));
    frame();
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
    frame();
    window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyE' }));
    const afterSecondPress = session.state();

    world.render();

    const outcome = {
      targetId: controller.targetId(),
      highlight: world.highlight(),
      promptText: prompt.element.textContent,
      promptHidden: prompt.element.hidden,
      promptRole: prompt.element.getAttribute('role'),
      afterFirstLeft: afterFirstPress.actionsLeft,
      afterSecondLeft: afterSecondPress.actionsLeft,
      history: afterSecondPress.history,
      drawCalls: world.stats().drawCalls,
    };

    prompt.dispose();
    input.dispose();
    world.dispose();
    container.remove();

    return outcome;
  });

  expect(result.targetId).toBe('prop.break.table');
  expect(result.highlight).toBe('prop.break.table');
  expect(result.promptText).toBe('Rest');
  expect(result.promptHidden).toBe(false);
  expect(result.promptRole).toBe('status');
  expect(result.afterFirstLeft).toBe(2);
  expect(result.afterSecondLeft).toBe(1);
  expect(result.history).toEqual(['action:rest', 'action:rest']);
  expect(result.drawCalls).toBeGreaterThan(0);
});
