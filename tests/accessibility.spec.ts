import { test, expect } from '@playwright/test';

const axe = require('@axe-core/playwright');

test.describe('Accessibility', () => {
  test('homepage should be accessible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const accessibilityScanResults = await new axe.AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
