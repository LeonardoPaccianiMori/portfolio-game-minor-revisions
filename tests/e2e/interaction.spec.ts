import { expect, test } from '@playwright/test';

test('the break-room table targets, highlights, and runs its action', async ({ page }) => {
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

    const player = playerModule.createPlayer({
      environment: {
        start: { x: 17.5, z: -3.2, yaw: 0 },
        colliders,
      },
    });

    const target = interactionModule.findInteraction({
      aim: interactionModule.aimFromPose(player.pose()),
      colliders,
      interactables,
    });
    world.setHighlight(target.target?.id ?? null);

    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
    const snapshot = input.sample();
    window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyE' }));

    const before = session.state();

    if (snapshot.interact && target.target?.command !== null && target.target !== null) {
      session.perform(target.target.command);
    }

    const after = session.state();
    prompt.setText(target.target?.prompt ?? null);
    world.render();

    const outcome = {
      targetId: target.target?.id ?? null,
      blocked: target.blocked,
      highlight: world.highlight(),
      promptText: prompt.element.textContent,
      promptHidden: prompt.element.hidden,
      beforeLeft: before.actionsLeft,
      afterLeft: after.actionsLeft,
      history: after.history,
      drawCalls: world.stats().drawCalls,
    };

    prompt.dispose();
    input.dispose();
    world.dispose();
    container.remove();

    return outcome;
  });

  expect(result.targetId).toBe('prop.break.table');
  expect(result.blocked).toBe(false);
  expect(result.highlight).toBe('prop.break.table');
  expect(result.promptText).toBe('Rest');
  expect(result.promptHidden).toBe(false);
  expect(result.beforeLeft).toBe(3);
  expect(result.afterLeft).toBe(2);
  expect(result.history).toEqual(['action:rest']);
  expect(result.drawCalls).toBeGreaterThan(0);
});
