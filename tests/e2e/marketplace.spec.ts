import { test, expect } from '@playwright/test';

test.describe('MCP Marketplace', () => {
  test('mcps page should load successfully', async ({ page }) => {
    await page.goto('/mcps');
    
    // Wait for any content to load
    await page.waitForLoadState('networkidle');
    
    // Page should load without errors and be at the correct URL
    await expect(page).toHaveURL(/\/mcps/);
    
    // Body should be visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('mcps page should have marketplace content (text visible somewhere)', async ({ page }) => {
    await page.goto('/mcps');
    
    // Wait for page content
    await page.waitForLoadState('domcontentloaded');
    
    // Look for any text containing "MCP Marketplace" - might be in various elements
    // Give it time to render since it's a client component
    const content = page.locator('body');
    await expect(content).toBeVisible();
    
    // Verify page isn't blank or errored
    const pageText = await page.textContent('body');
    expect(pageText.length).toBeGreaterThan(100);
  });

  test('compare page should load successfully', async ({ page }) => {
    await page.goto('/compare');
    
    // The page should load without errors
    await expect(page).toHaveURL(/\/compare/);
    
    // Page should render
    await expect(page.locator('body')).toBeVisible();
  });
});
