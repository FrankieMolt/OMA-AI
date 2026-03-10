import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://oma-ai.com';

test.describe('OMA-AI Core Tests', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await expect(page).toHaveTitle(/OMA/);
  });

  test('homepage has navigation', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await expect(page.locator('text=Browse Marketplace')).toBeVisible();
  });
});

test.describe('OMA-AI API Pages', () => {
  test('apis page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/apis.html`);
    await expect(page.locator('body')).toContainText('API');
  });

  test('mcps page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/mcps.html`);
    await expect(page.locator('body')).toContainText('MCP');
  });

  test('llms page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/llms.html`);
    await expect(page.locator('body')).toContainText('LLM');
  });
});

test.describe('OMA-AI API Endpoints', () => {
  test('health endpoint returns success', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/health`);
    expect(res.ok()).toBeTruthy();
  });

  test('price endpoint returns data', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/price`);
    expect(res.ok()).toBeTruthy();
  });

  test('weather endpoint works', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/weather?city=London`);
    expect(res.ok()).toBeTruthy();
  });

  test('llms endpoint returns models', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/llms`);
    expect(res.ok()).toBeTruthy();
  });

  test('mcps endpoint returns servers', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/mcps`);
    expect(res.ok()).toBeTruthy();
  });

  test('marketplace endpoint works', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/marketplace`);
    expect(res.ok()).toBeTruthy();
  });
});

test.describe('OMA-AI UI/UX', () => {
  test('dark theme is applied', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const bgColor = await page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });
    // Dark theme should have low RGB values (dark background)
    expect(bgColor).toMatch(/rgb\(\d{1,2}, \d{1,2}, \d{1,2}\)/);
  });

  test('gradient elements present', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    // Check for elements with gradient backgrounds in computed styles
    const hasGradient = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      for (const el of elements) {
        const style = getComputedStyle(el);
        if (style.background && style.background.includes('gradient')) {
          return true;
        }
      }
      return false;
    });
    expect(hasGradient).toBe(true);
  });
});

test.describe('OMA-AI Accessibility', () => {
  test('pages have meta descriptions', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const meta = await page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute('content', /.+/);
  });

  test('pages have title tags', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });
});

test.describe('OMA-AI Mobile', () => {
  test('homepage works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/`);
    await expect(page).toHaveTitle(/OMA/);
  });

  test('navigation works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/`);
    await expect(page.locator('text=Browse Marketplace')).toBeVisible();
  });
});
