import { expect, test } from '@playwright/test';

test('shows the local Minor Revisions foundation without external requests', async ({ page }) => {
  const externalRequests: string[] = [];

  page.on('request', (request) => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:5173') {
      externalRequests.push(request.url());
    }
  });

  await page.goto('/');

  await expect(page).toHaveTitle('Minor Revisions — Local Foundation');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Minor Revisions');
  await expect(page.getByText('This is the local foundation for Minor Revisions.')).toBeVisible();
  await expect(page.getByText('Game systems are not yet available.')).toBeVisible();
  expect(externalRequests).toEqual([]);
});
