import { test, expect } from '@playwright/test';

const pages = ['/', '/marketplace', '/tasks', '/docs'];

test.describe('Visual Regression', () => {
  for (const page of pages) {
    test(`${page} matches screenshot`, async ({ page: p }) => {
      await p.goto(`http://localhost:3000${page}`);
      await p.waitForTimeout(1000);
      await expect(p).toHaveScreenshot(`${page.replace('/', 'home')}.png`);
    });
  }
});
