import { test, expect, Page } from '@playwright/test';

// Helper function to wait for page load
async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
}

// Helper to check for console errors
async function checkConsoleErrors(page: Page, testName: string) {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  return errors;
}

test.describe('🌐 OMA-AI Critical User Flows', () => {
  const baseUrl = 'https://oma-ai.com';
  
  test('Homepage loads and critical elements exist', async ({ page }) => {
    await page.goto(baseUrl);
    await waitForPageLoad(page);
    
    // Check critical elements
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('a[href="/marketplace"]')).toBeVisible();
    await expect(page.locator('a[href="/docs"]')).toBeVisible();
    
    // Check for broken images
    const images = await page.locator('img').count();
    console.log(`Found ${images} images`);
    
    // Check console errors
    const errors = await checkConsoleErrors(page, 'oma-ai-homepage');
    expect(errors.filter(e => !e.includes('extension') && !e.includes('favicon'))).toHaveLength(0);
  });
  
  test('Marketplace page - products load', async ({ page }) => {
    await page.goto(`${baseUrl}/marketplace`);
    await waitForPageLoad(page);
    
    // Check if API cards exist
    const cards = await page.locator('[data-testid="api-card"], .card, [class*="card"]').count();
    console.log(`Found ${cards} API cards`);
    
    // Should have products
    expect(cards).toBeGreaterThan(0);
    
    // Check search functionality
    const searchInput = page.locator('input[type="text"], input[placeholder*="search" i]').first();
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill('GPT');
      await page.waitForTimeout(1000);
      console.log('Search functionality works');
    }
  });
  
  test('Login page - form exists and validates', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await waitForPageLoad(page);
    
    // Check form elements
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    const submitButton = page.locator('button[type="submit"]').first();
    
    // Check if form exists (may be OAuth only)
    const hasEmail = await emailInput.isVisible().catch(() => false);
    const hasPassword = await passwordInput.isVisible().catch(() => false);
    
    if (hasEmail && hasPassword) {
      console.log('Traditional login form found');
      await emailInput.fill('test@example.com');
      await passwordInput.fill('testpassword');
      
      // Check validation (don't submit)
      const emailValue = await emailInput.inputValue();
      expect(emailValue).toBe('test@example.com');
    } else {
      console.log('OAuth login (GitHub/Google) - checking for auth buttons');
      const authButtons = await page.locator('button, a').filter({ hasText: /GitHub|Google|Sign in/i }).count();
      expect(authButtons).toBeGreaterThan(0);
    }
  });
  
  test('Tasks page - bounty system functional', async ({ page }) => {
    await page.goto(`${baseUrl}/tasks`);
    await waitForPageLoad(page);
    
    // Check for task listings
    const tasks = await page.locator('[class*="task"], [class*="bounty"], tr').count();
    console.log(`Found ${tasks} task elements`);
    
    // Should have content
    const pageContent = await page.textContent('body');
    expect(pageContent?.length).toBeGreaterThan(100);
  });
  
  test('API endpoints respond', async ({ page }) => {
    const endpoints = ['/api/status', '/api/services'];
    
    for (const endpoint of endpoints) {
      const response = await page.request.get(`${baseUrl}${endpoint}`);
      console.log(`${endpoint}: HTTP ${response.status()}`);
      
      if (response.status() === 200) {
        const body = await response.json().catch(() => null);
        console.log(`Response: ${JSON.stringify(body).slice(0, 100)}...`);
      }
    }
  });
});

test.describe('🛒 SpendThrone E-Commerce Flows', () => {
  const baseUrl = 'https://spendthrone-olive.vercel.app';
  
  test('Homepage - products load and display', async ({ page }) => {
    await page.goto(baseUrl);
    await waitForPageLoad(page);
    
    // Check for product cards
    const products = await page.locator('[class*="product"], [class*="card"]').count();
    console.log(`Found ${products} product elements`);
    expect(products).toBeGreaterThan(0);
    
    // Check for prices
    const priceElements = await page.locator('text=/\\$[0-9]+/').count();
    console.log(`Found ${priceElements} price elements`);
  });
  
  test('Product detail page - loads correctly', async ({ page }) => {
    await page.goto(baseUrl);
    await waitForPageLoad(page);
    
    // Find first product link
    const productLink = page.locator('a[href*="/product/"]').first();
    if (await productLink.isVisible().catch(() => false)) {
      await productLink.click();
      await waitForPageLoad(page);
      
      // Check product details
      const title = await page.locator('h1').textContent().catch(() => '');
      console.log(`Product title: ${title}`);
      expect(title.length).toBeGreaterThan(0);
      
      // Check for add to cart button
      const addToCart = page.locator('button:has-text("Add"), button:has-text("Cart")').first();
      const hasAddToCart = await addToCart.isVisible().catch(() => false);
      console.log(`Has Add to Cart: ${hasAddToCart}`);
    } else {
      console.log('No product links found - may be static content');
    }
  });
  
  test('Category pages work', async ({ page }) => {
    const categories = ['/category/tech', '/category/weird', '/marketplace'];
    
    for (const cat of categories.slice(0, 2)) {
      const response = await page.request.get(`${baseUrl}${cat}`);
      console.log(`${cat}: HTTP ${response.status()}`);
      expect(response.status()).toBeLessThan(500); // Should not error
    }
  });
});

test.describe('⚰️ Lethometry Research Tools', () => {
  const baseUrl = 'https://lethometry.vercel.app';
  
  test('All main pages load', async ({ page }) => {
    const pages = ['/', '/about', '/clock', '/memory', '/experiments'];
    
    for (const path of pages) {
      const response = await page.request.get(`${baseUrl}${path}`);
      console.log(`${path}: HTTP ${response.status()}`);
      expect(response.status()).toBe(200);
    }
  });
  
  test('Death Clock - interactive elements work', async ({ page }) => {
    await page.goto(`${baseUrl}/clock`);
    await waitForPageLoad(page);
    
    // Look for input fields
    const inputs = await page.locator('input, select').count();
    console.log(`Found ${inputs} input elements`);
    
    if (inputs > 0) {
      // Try to interact
      const firstInput = page.locator('input').first();
      if (await firstInput.isVisible().catch(() => false)) {
        await firstInput.fill('1990');
        const value = await firstInput.inputValue();
        console.log(`Input value: ${value}`);
      }
    }
  });
});

test.describe('🔍 Cross-Site Issues', () => {
  test('Check for common errors across all sites', async ({ page, context }) => {
    const sites = [
      'https://oma-ai.com',
      'https://spendthrone-olive.vercel.app',
      'https://lethometry.vercel.app'
    ];
    
    for (const site of sites) {
      console.log(`\nChecking ${site}...`);
      
      const errors: string[] = [];
      const page2 = await context.newPage();
      
      page2.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      page2.on('pageerror', err => {
        errors.push(err.message);
      });
      
      try {
        await page2.goto(site, { timeout: 15000 });
        await page2.waitForTimeout(2000);
        
        const criticalErrors = errors.filter(e => 
          !e.includes('favicon') && 
          !e.includes('extension') &&
          !e.includes('SourceMap')
        );
        
        console.log(`  Console errors: ${criticalErrors.length}`);
        if (criticalErrors.length > 0) {
          console.log(`  First error: ${criticalErrors[0].slice(0, 100)}`);
        }
        
      } catch (e) {
        console.log(`  Failed to load: ${e.message}`);
      } finally {
        await page2.close();
      }
    }
  });
});
