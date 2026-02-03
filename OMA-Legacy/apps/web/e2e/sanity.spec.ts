
import { test, expect } from '@playwright/test';

test.describe('OMA Marketplace Sanity Check', () => {
  test('should load marketplace homepage', async ({ page }) => {
    // Note: This assumes the app is running on localhost:3000
    // In a real CI environment, this URL would be dynamic
    await page.goto('http://localhost:3000/marketplace');
    
    // Verify title
    await expect(page).toHaveTitle(/Marketplace/);
    
    // Verify category filters exist
    await expect(page.getByText('All Items')).toBeVisible();
    await expect(page.getByText('AI Agents')).toBeVisible();
    await expect(page.getByText('MCP Servers')).toBeVisible();
    await expect(page.getByText('CrewAI')).toBeVisible();
  });

  test('should display search bar', async ({ page }) => {
    await page.goto('http://localhost:3000/marketplace');
    await expect(page.getByPlaceholder('Search marketplace...')).toBeVisible();
  });
});
