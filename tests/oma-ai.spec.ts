import { test, expect } from '@playwright/test';

/**
 * OMA-AI User Flow Tests
 * Tests the OMA-AI marketplace platform
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('OMA-AI User Flows', () => {
  
  test('Homepage loads and displays correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/OMA/);
    
    // Check main elements
    await expect(page.locator('nav, header').first()).toBeVisible();
    
    // Check no critical console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    
    await page.waitForLoadState('networkidle');
    expect(consoleErrors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });

  test('APIs page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/apis.html`);
    await expect(page.locator('body')).toBeVisible();
  });

  test('MCPs page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/mcps.html`);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Compute page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/compute.html`);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Dashboard page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard.html`);
    await expect(page.locator('body')).toBeVisible();
  });

  test('About page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/about.html`);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Contact page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/contact.html`);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Privacy page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/privacy.html`);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Terms page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/terms.html`);
    await expect(page.locator('body')).toBeVisible();
  });

  test('API price endpoint works', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/price`);
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.data).toBeDefined();
  });
});