import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  outputDir: 'test-results',
  testDir: 'tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'off',
  },
  webServer: {
    command: 'npm run dev',
    reuseExistingServer: false,
    url: 'http://127.0.0.1:5173',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
