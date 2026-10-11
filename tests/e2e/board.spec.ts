import { expect, test } from '@playwright/test';

test('the desk board reads, acts, rejects, confirms, navigates, and closes', async ({ page }) => {
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

    const outside = document.createElement('button');
    outside.textContent = 'Outside control';
    document.body.appendChild(outside);
    outside.focus();

    const session = sessionModule.createGameSession();
    const board = uiModule.createBoard(container, {
      onCommand: (command) => {
        host.perform(command);
      },
      onClose: () => {
        host.close();
      },
    });
    const host = uiModule.createBoardHost({
      board,
      session,
      view: () => uiModule.createBoardView(session.state()),
    });

    const buttons = (): HTMLButtonElement[] => [
      ...board.element.querySelectorAll<HTMLButtonElement>('button'),
    ];
    const findByText = (prefix: string): HTMLButtonElement | undefined =>
      buttons().find((button) => button.textContent?.startsWith(prefix) === true);
    const focusText = (): string | null =>
      document.activeElement instanceof HTMLElement ? document.activeElement.textContent : null;

    host.open();
    const initialText = board.element.textContent ?? '';
    const focusedAfterOpen = board.hasFocus();
    const focusAtOpen = focusKey();

    const beforeReject = JSON.stringify(session.state());
    findByText('Work an experiment step')?.click();
    const afterReject = JSON.stringify(session.state());
    const rejectFeedback = board.element.querySelector('.board-feedback')?.textContent ?? null;

    host.perform({ type: 'performAction', action: 'analyse' });
    const focusAfterRender = focusKey();

    findByText('Rest')?.click();
    const afterRest = session.state();

    for (let week = 0; week < 4; week += 1) {
      session.perform({ type: 'advanceWeek' });
    }

    host.refresh();
    const rentText = board.element.textContent ?? '';

    findByText('Inflate a claim')?.click();
    const beforeConfirm = session.state().flags['complicity.inflate-claim'];
    const confirmLabel = findByText('Confirm')?.textContent ?? null;

    buttons()
      .find((button) => button.textContent?.startsWith('Confirm') === true)
      ?.click();
    const afterConfirm = session.state();
    const complicityFeedback = board.element.querySelector('.board-feedback')?.textContent ?? null;

    findByText('Borrow from Mara')?.click();
    const afterRent = session.state();

    const focusBeforeNav = focusKey();
    host.handleInput(false, 1);
    const focusAfterNav = focusKey();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    const openAfterEscape = board.isOpen();
    const focusRestored = document.activeElement === outside;

    host.open();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    host.handleInput(false, 0);
    host.handleInput(true, 0);
    const openAfterInteract = board.isOpen();

    const outcome = {
      showsWeek: initialText.includes('Week 1 of 12'),
      showsEnergy: initialText.includes('Energy: 5 of 5'),
      focusedAfterOpen,
      stateUnchangedOnReject: beforeReject === afterReject,
      rejectFeedback,
      focusAtOpen,
      focusAfterRender,
      afterRestLeft: afterRest.actionsLeft,
      rentText: rentText.includes('The rent is due'),
      beforeConfirm: beforeConfirm ?? null,
      confirmLabel,
      afterConfirmFlag: afterConfirm.flags['complicity.inflate-claim'] ?? null,
      afterConfirmIntegrity: afterConfirm.integrity,
      complicityFeedback,
      pendingAfter: afterRent.pendingEvent,
      mara: afterRent.relationships.mara,
      focusChanged: focusBeforeNav !== focusAfterNav,
      openAfterEscape,
      focusRestored,
      openAfterInteract,
    };

    board.dispose();
    outside.remove();
    container.remove();

    return outcome;
  });

  expect(result.showsWeek).toBe(true);
  expect(result.showsEnergy).toBe(true);
  expect(result.focusedAfterOpen).toBe(true);
  expect(result.stateUnchangedOnReject).toBe(true);
  expect(result.rejectFeedback).toBe('No experiment is in progress.');
  expect(result.focusAfterRender).toBe(result.focusAtOpen);
  expect(result.afterRestLeft).toBe(2);
  expect(result.rentText).toBe(true);
  expect(result.beforeConfirm).toBeNull();
  expect(result.confirmLabel).toContain('Confirm');
  expect(result.afterConfirmFlag).toBe(true);
  expect(result.afterConfirmIntegrity).toBe(85);
  expect(result.complicityFeedback).toContain('inflate a claim');
  expect(result.pendingAfter).toBeNull();
  expect(result.mara).toBe(40);
  expect(result.focusChanged).toBe(true);
  expect(result.openAfterEscape).toBe(false);
  expect(result.focusRestored).toBe(true);
  expect(result.openAfterInteract).toBe(false);
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
        host.perform(command);
      },
      onClose: () => {
        host.close();
      },
    });
    const host = uiModule.createBoardHost({
      board,
      session,
      view: () => uiModule.createBoardView(session.state()),
    });
    const colliders = worldModule.buildColliders();
    const controller = interactionModule.createInteractionController({
      world,
      session,
      prompt: { setText: () => undefined },
      interactables: interactionModule.buildInteractables(),
      colliders,
      openBoard: () => {
        host.open();
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
    const focused = board.hasFocus();

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    host.handleInput(false, 0);
    host.handleInput(true, 0);
    const closed = board.isOpen();

    board.dispose();
    input.dispose();
    world.dispose();
    container.remove();

    return { open, target, focused, closed };
  });

  expect(result.target).toBe('prop.hub.desk');
  expect(result.open).toBe(true);
  expect(result.focused).toBe(true);
  expect(result.closed).toBe(false);
});
