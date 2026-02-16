import { test, expect } from '@playwright/test';

test.describe('Dashboard Tests', () => {
  test('LobsterBoard dashboard loads', async ({ page }) => {
    await page.goto('http://192.168.2.213:8081/dashboard.html');
    await expect(page.locator('h1')).toContainText('FRANKIE');
  });

  test('Scan button works', async ({ page }) => {
    await page.goto('http://192.168.2.213:8081/dashboard.html');
    await page.click('button:has-text("Scan")');
    await page.waitForTimeout(3000);
    const log = await page.locator('#activity-log').textContent();
    expect(log.toLowerCase()).toContain('scan');
  });

  test('OMA-AI loads', async ({ page }) => {
    await page.goto('https://oma-ai.com');
    await expect(page).toHaveTitle(/OMA-AI/);
  });

  test('SpendThrone loads', async ({ page }) => {
    await page.goto('https://spendthrone-olive.vercel.app');
    await expect(page).toHaveTitle(/SpendThrone/);
  });

  test('Lethometry loads', async ({ page }) => {
    await page.goto('https://lethometry.vercel.app');
    await expect(page).toHaveTitle(/Lethometry/);
  });
});
