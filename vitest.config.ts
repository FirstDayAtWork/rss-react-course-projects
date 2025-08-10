import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'jsdom',
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/tests/tests.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/*.config.js'],
    coverage: {
      provider: 'v8',
      enabled: true,
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
      ],
    },
  },
});
