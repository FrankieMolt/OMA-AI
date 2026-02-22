import { test, expect } from '@playwright/test';

test.describe('OMA-AI Comprehensive Audit', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('https://oma-ai.com');
    await expect(page).toHaveTitle(/OMA-AI/);
  });

  test('API page loads', async ({ page }) => {
    await page.goto('https://oma-ai.com/api');
    await expect(page.locator('h1')).toContainText('API Reference');
  });

  test('dashboard loads', async ({ page }) => {
    await page.goto('https://oma-ai.com/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });
});
