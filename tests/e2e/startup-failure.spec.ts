import { expect, test } from '@playwright/test';

test('unsupported graphics shows the safe error screen', async ({ page }) => {
  await page.addInitScript(`
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === 'webgl2') {
        return null;
      }
      return originalGetContext.call(this, type, ...args);
    };
  `);

  await page.goto('/');

  await expect(page.locator('#app')).toHaveAttribute('data-state', 'failed');
  await expect(page.locator('#app-status')).toHaveText('Startup failed.');
  await expect(page.locator('#app-error')).toBeVisible();
  await expect(page.locator('#app-error-message')).toContainText('WebGL2');
  await expect(page.locator('#app-error-reload')).toBeVisible();
});
