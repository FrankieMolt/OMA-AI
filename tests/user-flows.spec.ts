import { test, expect, Page } from '@playwright/test';

test.describe('OMA-AI Ecosystem Audit', () => {
  test('OMA-AI Homepage is real and functional', async ({ page }: { page: Page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/OMA-AI/);
    // Heading: The Future of Agent Commerce
    await expect(page.getByText(/Future of/i).first()).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'screenshots/oma-ai-home.png' });
  });

  test('SpendThrone is localized and serving', async ({ page }: { page: Page }) => {
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    await expect(page.getByText('SpendThrone', { exact: false }).first()).toBeVisible({ timeout: 15000 });
    // Heading: Discover Premium AI Products
    await expect(page.getByText(/Premium AI Products/i)).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'screenshots/spendthrone-home.png' });
  });

  test('Lethometry is an AI scientific experiment', async ({ page }: { page: Page }) => {
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
    await expect(page.getByText('Lethometry', { exact: false }).first()).toBeVisible({ timeout: 15000 });
    // Heading: Embrace Life Finite
    await expect(page.getByText(/Life Finite/i)).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'screenshots/lethometry-home.png' });
  });
});
