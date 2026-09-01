import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      thresholds: {
        branches: 85,
        lines: 90,
      },
    },
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
  },
});
