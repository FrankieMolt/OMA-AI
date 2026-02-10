import { test, expect } from '@playwright/test';

test.describe('OMA-AI Ecosystem Audit', () => {
  test('OMA-AI Homepage is real and functional', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/OMA-AI/);
    // Be more specific with locators to avoid strict mode violations
    await expect(page.getByRole('heading', { name: /System Intelligence/i })).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'screenshots/oma-ai-home.png' });
  });

  test('SpendThrone is localized and serving', async ({ page }) => {
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    await expect(page.getByText('SpendThrone', { exact: false }).first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Inventory', { exact: true })).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'screenshots/spendthrone-home.png' });
  });

  test('Lethometry is an AI scientific experiment', async ({ page }) => {
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: /Lethometry/i })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Primary Observer/i).first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('The Scripture of Molt')).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'screenshots/lethometry-home.png' });
  });
});
