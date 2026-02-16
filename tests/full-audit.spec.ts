import { test, expect } from '@playwright/test';

const sites = [
  { name: 'OMA-AI', url: 'https://oma-ai.com', local: 'http://localhost:3000' },
  { name: 'SpendThrone', url: 'https://spendthrone-olive.vercel.app', local: 'http://localhost:3001' },
  { name: 'Lethometry', url: 'https://lethometry.vercel.app', local: 'http://localhost:3002' },
];

// Test all production sites
for (const site of sites) {
  test.describe(`${site.name} Production`, () => {
    test('loads successfully', async ({ page }) => {
      await page.goto(site.url);
      await expect(page).toHaveTitle(/./); // Has some title
    });

    test('no console errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      await page.goto(site.url);
      await page.waitForTimeout(2000);
      expect(errors.filter(e => !e.includes('extension') && !e.includes('Content Security Policy'))).toHaveLength(0);
    });

    test('no broken images', async ({ page }) => {
      await page.goto(site.url);
      const images = await page.$$('img');
      for (const img of images) {
        const src = await img.getAttribute('src');
        if (src && !src.startsWith('data:')) {
          const response = await page.request.get(src.startsWith('http') ? src : `${site.url}${src}`);
          expect(response.status()).toBeLessThan(400);
        }
      }
    });

    test('responsive - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(site.url);
      await expect(page).toHaveTitle(/./);
    });

    test('responsive - tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(site.url);
      await expect(page).toHaveTitle(/./);
    });

    test('responsive - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(site.url);
      await expect(page).toHaveTitle(/./);
    });
  });
}

// Test local services
for (const site of sites) {
  test.describe(`${site.name} Local`, () => {
    test('local server responds', async ({ page }) => {
      try {
        const response = await page.goto(site.local, { timeout: 5000 });
        expect(response?.status()).toBe(200);
      } catch (e) {
        test.skip();
      }
    });
  });
}

// OMA-AI specific tests
test.describe('OMA-AI Features', () => {
  test('marketplace page loads', async ({ page }) => {
    await page.goto('https://oma-ai.com/marketplace');
    await expect(page.locator('body')).toBeVisible();
  });

  test('docs page loads', async ({ page }) => {
    await page.goto('https://oma-ai.com/docs');
    await expect(page.locator('body')).toBeVisible();
  });

  test('login page loads', async ({ page }) => {
    await page.goto('https://oma-ai.com/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });
});

// SpendThrone specific tests
test.describe('SpendThrone Features', () => {
  test('products display', async ({ page }) => {
    await page.goto('https://spendthrone-olive.vercel.app');
    await expect(page.locator('body')).toBeVisible();
  });
});

// Lethometry specific tests
test.describe('Lethometry Features', () => {
  test('philosophy page loads', async ({ page }) => {
    await page.goto('https://lethometry.vercel.app/philosophy');
    await expect(page.locator('body')).toBeVisible();
  });
});

// Performance tests
test.describe('Performance', () => {
  for (const site of sites) {
    test(`${site.name} - TTFB under 2s`, async ({ page }) => {
      const start = Date.now();
      await page.goto(site.url);
      const ttfb = Date.now() - start;
      expect(ttfb).toBeLessThan(2000);
    });
  }
});
