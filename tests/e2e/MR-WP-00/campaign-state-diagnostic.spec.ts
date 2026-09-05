import { expect, test } from '@playwright/test';

const forbiddenText = [
  '00000000-0000-4000-8000-000000000004',
  '1363162018',
  'Morgan',
  'campaignId',
  'campaignSeed',
  'histories',
  'stack',
];

test('shows only the safe Standard and Supported campaign summaries', async ({ page }) => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:5173') {
      externalRequests.push(request.url());
    }
  });

  await page.goto('/?diagnostic=campaign-state');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Campaign state diagnostic');
  const cards = page.locator('.campaign-diagnostic-card');
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0)).toContainText('Standard');
  await expect(cards.nth(0)).toContainText('Energy4');
  await expect(cards.nth(1)).toContainText('Supported');
  await expect(cards.nth(1)).toContainText('Energy5');
  await expect(page.getByText('Passed')).toHaveCount(2);
  await page.reload();
  await expect(cards).toHaveCount(2);
  const body = await page.locator('body').innerText();
  for (const text of forbiddenText) expect(body).not.toContain(text);
  expect(externalRequests).toEqual([]);
});

test('keeps the accepted normal page unchanged and unlinked', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Minor Revisions');
  await expect(page.getByText('Ready', { exact: true })).toBeVisible();
  await expect(page.getByText('Startup checks passed.')).toBeVisible();
  await expect(page.getByText('Game systems are not yet available.')).toBeVisible();
  await expect(page.locator('a')).toHaveCount(0);
  await expect(page.getByText('Campaign state diagnostic')).toHaveCount(0);
});
