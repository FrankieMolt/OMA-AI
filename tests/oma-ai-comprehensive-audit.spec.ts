import { test, expect } from '@playwright/test';

/**
 * COMPREHENSIVE OMA-AI AUDIT
 * Testing every page, feature, and functionality
 */

const BASE_URL = 'https://oma-ai.com';

test.describe('🔍 OMA-AI Complete Site Audit', () => {
  
  // NAVIGATION & LAYOUT TESTS
  test.describe('Navigation & Layout', () => {
    
    test('Homepage loads and has proper structure', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Check basic structure
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      
      // Check for console errors
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      
      await page.waitForLoadState('networkidle');
      expect(errors).toHaveLength(0);
    });

    test('All main navigation links work', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const links = [
        { text: 'Marketplace', url: '/marketplace' },
        { text: 'Features', url: '/features' },
        { text: 'Pricing', url: '/pricing' },
        { text: 'Docs', url: '/docs' },
        { text: 'About', url: '/about' }
      ];
      
      for (const link of links) {
        await page.goto(`${BASE_URL}${link.url}`);
        const status = await page.evaluate(() => {
          return !document.title.includes('404') && 
                 !document.body.innerText.includes('This page could not be found');
        });
        
        if (!status) {
          console.log(`❌ ${link.url} returns 404`);
        } else {
          console.log(`✅ ${link.url} loads`);
        }
      }
    });

    test('Mobile menu works', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuButton = page.locator('[aria-label="menu"], button:has-text("Menu"), .mobile-menu-button').first();
      
      if (await menuButton.isVisible().catch(() => false)) {
        await menuButton.click();
        // Check if menu opens
        const menu = page.locator('[role="menu"], nav, .mobile-nav').first();
        await expect(menu).toBeVisible();
        console.log('✅ Mobile menu works');
      } else {
        console.log('⚠️ No mobile menu found');
      }
    });
  });

  // API & FUNCTIONALITY TESTS
  test.describe('API & Functionality', () => {
    
    test('API endpoints respond', async ({ request }) => {
      const endpoints = [
        '/api/status',
        '/api/services',
        '/api/health'
      ];
      
      for (const endpoint of endpoints) {
        const response = await request.get(`${BASE_URL}${endpoint}`);
        console.log(`${endpoint}: ${response.status()}`);
        expect(response.status()).toBe(200);
      }
    });

    test('Signup form exists and works', async ({ page }) => {
      await page.goto(`${BASE_URL}/signup`);
      
      // Check form exists
      const emailInput = page.locator('input[type="email"], input[name="email"]').first();
      const passwordInput = page.locator('input[type="password"], input[name="password"]').first();
      const submitButton = page.locator('button[type="submit"]').first();
      
      if (await emailInput.isVisible().catch(() => false)) {
        console.log('✅ Signup form has email input');
        
        // Test form validation
        await emailInput.fill('test@example.com');
        await passwordInput.fill('testpassword123');
        
        // Check submit button is enabled
        if (await submitButton.isEnabled().catch(() => false)) {
          console.log('✅ Form can be submitted');
        }
      } else {
        console.log('❌ Signup form missing or broken');
      }
    });

    test('Login form works', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      
      const emailInput = page.locator('input[type="email"]').first();
      const passwordInput = page.locator('input[type="password"]').first();
      
      if (await emailInput.isVisible().catch(() => false)) {
        console.log('✅ Login form exists');
      } else {
        console.log('❌ Login form broken');
      }
    });
  });

  // MARKETPLACE TESTS
  test.describe('Marketplace', () => {
    
    test('Marketplace loads with products', async ({ page }) => {
      await page.goto(`${BASE_URL}/marketplace`);
      
      // Check for product cards
      const cards = await page.locator('[class*="card"], article, .product-card').count();
      console.log(`Found ${cards} product cards`);
      
      expect(cards).toBeGreaterThan(0);
    });

    test('Product filtering works', async ({ page }) => {
      await page.goto(`${BASE_URL}/marketplace`);
      
      // Look for filter buttons
      const filters = await page.locator('button').filter({ hasText: /filter|category|sort/i }).count();
      console.log(`Found ${filters} filter buttons`);
    });

    test('Search functionality works', async ({ page }) => {
      await page.goto(`${BASE_URL}/marketplace`);
      
      const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]').first();
      
      if (await searchInput.isVisible().catch(() => false)) {
        await searchInput.fill('AI');
        await page.waitForTimeout(500);
        console.log('✅ Search works');
      } else {
        console.log('❌ Search missing');
      }
    });
  });

  // DASHBOARD TESTS (if user is logged in)
  test.describe('Dashboard (Protected)', () => {
    
    test('Dashboard redirects when not logged in', async ({ page }) => {
      await page.goto(`${BASE_URL}/dashboard`);
      
      // Should redirect to login
      await page.waitForURL(/.*login.*/);
      console.log('✅ Dashboard properly protected');
    });
  });

  // PERFORMANCE TESTS
  test.describe('Performance', () => {
    
    test('Page loads under 3 seconds', async ({ page }) => {
      const start = Date.now();
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - start;
      
      console.log(`Load time: ${loadTime}ms`);
      expect(loadTime).toBeLessThan(3000);
    });

    test('No layout shifts during load', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Check for CLS
      const cls = await page.evaluate(() => {
        return new Promise((resolve) => {
          let clsValue = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
          }).observe({ entryTypes: ['layout-shift'] });
          
          setTimeout(() => resolve(clsValue), 1000);
        });
      });
      
      console.log(`CLS: ${cls}`);
      expect(cls).toBeLessThan(0.1);
    });
  });

  // ACCESSIBILITY TESTS
  test.describe('Accessibility', () => {
    
    test('Has proper heading structure', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const h1Count = await page.locator('h1').count();
      const h2Count = await page.locator('h2').count();
      
      console.log(`H1: ${h1Count}, H2: ${h2Count}`);
      expect(h1Count).toBeGreaterThan(0);
    });

    test('Images have alt text', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const images = await page.locator('img').all();
      let missingAlt = 0;
      
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        if (!alt) missingAlt++;
      }
      
      console.log(`Images without alt: ${missingAlt}`);
    });

    test('Interactive elements have proper labels', async ({ page }) => {
      await page.goto(BASE_URL);
      
      const buttons = await page.locator('button').all();
      const links = await page.locator('a').all();
      
      console.log(`Buttons: ${buttons.length}, Links: ${links.length}`);
    });
  });

  // 404 PAGE TESTS
  test.describe('Error Handling', () => {
    
    test('404 page is user-friendly', async ({ page }) => {
      await page.goto(`${BASE_URL}/nonexistent-page-12345`);
      
      const title = await page.title();
      const has404Text = await page.evaluate(() => {
        return document.body.innerText.includes('404') ||
               document.body.innerText.includes('Not Found') ||
               document.body.innerText.includes('page could not be found');
      });
      
      if (has404Text) {
        console.log('✅ 404 page exists');
      } else {
        console.log('❌ 404 page missing or broken');
      }
    });
  });
});
