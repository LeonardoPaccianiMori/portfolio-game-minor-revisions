import { expect, test } from '@playwright/test';

test('start page loads without an external request', async ({ page }) => {
  const externalRequests: string[] = [];

  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.hostname !== '127.0.0.1' && url.hostname !== 'localhost') {
      externalRequests.push(request.url());
    }
  });

  await page.goto('/');

  await expect(page).toHaveTitle('Minor Revisions');
  await expect(page.locator('h1')).toHaveText('Minor Revisions');
  await expect(page.locator('#app p').first()).toHaveText('Startup checks passed.');
  await expect(page.locator('#app p').nth(1)).toHaveText('Game systems are not yet available.');
  await expect(page.locator('#app')).toHaveAttribute('data-state', 'ready');
  expect(externalRequests).toEqual([]);
});
