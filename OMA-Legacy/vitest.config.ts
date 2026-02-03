import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./apps/web/src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/dist/**',
        '**/build/**',
        '**/.next/**',
        '**/coverage/**',
        '**/config/**',
        '**/migrations/**',
        'apps/web/src/__tests__/**',
      ],
      all: true,
      lines: 90,
      functions: 90,
      branches: 90,
      statements: 90,
    },
    include: [
      'apps/web/src/**/*.{test,spec}.{ts,tsx}',
      'apps/backend/**/*.test.{ts,js}',
      'gateway/**/*.test.{ts,js}',
      'packages/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/coverage/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './apps/web/src'),
      '@shared': path.resolve(__dirname, './apps/web/src/lib/db'),
      '@oma/core': path.resolve(__dirname, './packages/core/src'),
    },
  },
});
