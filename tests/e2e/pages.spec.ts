import { test, expect } from '@playwright/test';

test.describe('Page Routing', () => {
  const pages = [
    { path: '/', name: 'Home' },
    { path: '/login', name: 'Login' },
    { path: '/register', name: 'Register' },
    { path: '/dashboard?demo=true', name: 'Dashboard (Demo)' },
    { path: '/mcps', name: 'MCP Marketplace' },
    { path: '/pricing', name: 'Pricing' },
    { path: '/credits', name: 'Credits' },
    { path: '/skills', name: 'Skills' },
    { path: '/compare', name: 'Compare' },
    { path: '/docs', name: 'Docs' },
  ];

  for (const { path, name } of pages) {
    test(`${name} (${path}) should return 200`, async ({ page }) => {
      const response = await page.goto(`http://localhost:3000${path}`);
      
      // Should return 200 status
      expect(response?.status()).toBe(200);
      
      // Page should have content
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });
  }
});
