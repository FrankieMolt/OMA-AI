import { test, expect } from '@playwright/test';

test('homepage has expected sections', async ({ page }) => {
  // Go to the baseURL
  await page.goto('/');

  // Expect title to be present (depends on how Next.js sets it, let's just check for body text)
  await expect(page.locator('text=Open Ecosystem & x402 Treasury')).toBeVisible();

  // Check for the specific cards
  await expect(page.locator('text=MCP Integrations')).toBeVisible();
  await expect(page.locator('text=x402 Agentic Economy')).toBeVisible();
});
