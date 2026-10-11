import { expect, test } from '@playwright/test';

test('the desk board opens, reads the state, acts, and resolves the rent', async ({ page }) => {
  await page.goto('/');

  const result = await page.evaluate(async () => {
    const uiModulePath = '/src/ui/index.ts';
    const sessionModulePath = '/src/application/index.ts';

    const uiModule = (await import(uiModulePath)) as typeof import('../../src/ui/index.ts');
    const sessionModule = (await import(
      sessionModulePath
    )) as typeof import('../../src/application/index.ts');

    const container = document.createElement('div');
    document.body.appendChild(container);

    const session = sessionModule.createGameSession();
    const board = uiModule.createBoard(container, {
      onCommand: (command) => {
        const outcome = session.perform(command);
        board.render(
          uiModule.createBoardView(session.state()),
          outcome.ok ? null : outcome.message,
        );
      },
      onClose: () => {
        board.close();
      },
    });

    board.open();
    board.render(uiModule.createBoardView(session.state()), null);

    const initialText = board.element.textContent ?? '';
    const buttons = (): HTMLButtonElement[] => [
      ...board.element.querySelectorAll<HTMLButtonElement>('button'),
    ];
    const findByText = (prefix: string): HTMLButtonElement | undefined =>
      buttons().find((button) => button.textContent?.startsWith(prefix) === true);

    findByText('Rest')?.click();
    const afterRest = session.state();

    for (let week = 0; week < 4; week += 1) {
      session.perform({ type: 'advanceWeek' });
    }

    board.render(uiModule.createBoardView(session.state()), null);
    const rentText = board.element.textContent ?? '';
    findByText('Borrow from Mara')?.click();
    const afterRent = session.state();
    const feedback = board.element.querySelector('.board-feedback')?.textContent ?? null;

    const outcome = {
      showsWeek: initialText.includes('Week 1 of 12'),
      showsEnergy: initialText.includes('Energy: 5 of 5'),
      afterRestLeft: afterRest.actionsLeft,
      rentText: rentText.includes('The rent is due'),
      pendingAfter: afterRent.pendingEvent,
      mara: afterRent.relationships.mara,
      isOpen: board.isOpen(),
      feedback,
    };

    board.dispose();
    container.remove();

    return outcome;
  });

  expect(result.showsWeek).toBe(true);
  expect(result.showsEnergy).toBe(true);
  expect(result.afterRestLeft).toBe(2);
  expect(result.rentText).toBe(true);
  expect(result.pendingAfter).toBeNull();
  expect(result.mara).toBe(40);
  expect(result.isOpen).toBe(true);
  expect(result.feedback).toBeNull();
});

test('the hub desk opens the board through the interaction path', async ({ page }) => {
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
    const board = uiModule.createBoard(container, {
      onCommand: (command) => {
        const outcome = session.perform(command);
        board.render(
          uiModule.createBoardView(session.state()),
          outcome.ok ? null : outcome.message,
        );
      },
      onClose: () => {
        board.close();
      },
    });
    const colliders = worldModule.buildColliders();
    const controller = interactionModule.createInteractionController({
      world,
      session,
      prompt: { setText: () => undefined },
      interactables: interactionModule.buildInteractables(),
      colliders,
      openBoard: () => {
        board.open();
        board.render(uiModule.createBoardView(session.state()), null);
      },
    });
    const player = playerModule.createPlayer({
      environment: { start: { x: 5.2, z: 7.6, yaw: 0 }, colliders },
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
    const snapshot = input.sample();
    window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyE' }));
    controller.update(player.pose(), snapshot.interact);

    const open = board.isOpen();
    const target = controller.targetId();

    board.dispose();
    input.dispose();
    world.dispose();
    container.remove();

    return { open, target };
  });

  expect(result.target).toBe('prop.hub.desk');
  expect(result.open).toBe(true);
});
