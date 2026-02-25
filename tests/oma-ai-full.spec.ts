import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('OMA-AI Core Tests', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await expect(page).toHaveTitle(/OMA-AI/);
  });

  test('homepage has navigation', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await expect(page.locator('nav')).toBeVisible();
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

  test('skills page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/skills.html`);
    await expect(page.locator('body')).toContainText('Skill');
  });

  test('compute page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/compute.html`);
    await expect(page.locator('body')).toContainText('Compute');
  });
});

test.describe('OMA-AI Auth Pages', () => {
  test('login page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/login.html`);
    await expect(page.locator('body')).toContainText('Sign');
  });

  test('signup page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/signup.html`);
    await expect(page.locator('body')).toContainText('Account');
  });
});

test.describe('OMA-AI Content Pages', () => {
  test('blog page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/blog.html`);
    await expect(page.locator('body')).toContainText('Blog');
  });

  test('pricing page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/pricing.html`);
    await expect(page.locator('body')).toContainText('Pricing');
  });

  test('docs page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs.html`);
    await expect(page.locator('body')).toContainText('API');
  });

  test('community page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/community.html`);
    await expect(page.locator('body')).toContainText('Community');
  });

  test('status page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/status.html`);
    await expect(page.locator('body')).toContainText('Status');
  });

  test('publish page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/publish.html`);
    await expect(page.locator('body')).toContainText('Monetize');
  });

  test('tasks page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/tasks.html`);
    await expect(page.locator('body')).toContainText('Task');
  });

  test('integrations page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/integrations.html`);
    await expect(page.locator('body')).toContainText('Integration');
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
    expect(bgColor).toBe('rgb(9, 9, 11)');
  });

  test('gradient elements present', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const gradient = await page.locator('.gradient').count();
    expect(gradient).toBeGreaterThan(0);
  });

  test('navigation is fixed', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    const nav = await page.locator('nav').first();
    await expect(nav).toHaveClass(/fixed/);
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
    await expect(page).toHaveTitle(/OMA-AI/);
  });

  test('navigation works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/`);
    await expect(page.locator('nav')).toBeVisible();
  });
});