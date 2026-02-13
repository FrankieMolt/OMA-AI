import { test, expect, Page } from '@playwright/test';

test.describe('Comprehensive UI/UX Audit', () => {
  test('OMA-AI - Complete UI Analysis', async ({ page }: { page: Page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshots/audit/oma-ai-full.png', fullPage: true });
    
    const typography = await page.evaluate(() => {
      const h1 = window.getComputedStyle(document.querySelector('h1') || document.body);
      const body = window.getComputedStyle(document.body);
      return {
        h1Size: h1.fontSize,
        h1Weight: h1.fontWeight,
        fontFamily: body.fontFamily,
        lineHeight: body.lineHeight
      };
    });
    console.log('OMA-AI Typography:', typography);
  });

  test('SpendThrone - Complete UI Analysis', async ({ page }: { page: Page }) => {
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshots/audit/spendthrone-full.png', fullPage: true });
    
    const spacing = await page.evaluate(() => {
      const hero = document.querySelector('section');
      const styles = hero ? window.getComputedStyle(hero) : null;
      return {
        heroPadding: styles?.padding,
        heroMargin: styles?.margin
      };
    });
    console.log('SpendThrone Spacing:', spacing);
  });

  test('Lethometry - Complete UI Analysis', async ({ page }: { page: Page }) => {
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshots/audit/lethometry-full.png', fullPage: true });
    
    const colors = await page.evaluate(() => {
      const body = window.getComputedStyle(document.body);
      return {
        background: body.backgroundColor,
        text: body.color
      };
    });
    console.log('Lethometry Colors:', colors);
  });

  test('Typography System Consistency', async ({ page }: { page: Page }) => {
    const sites = [
      { url: 'http://localhost:3000', name: 'OMA-AI' },
      { url: 'http://localhost:3001', name: 'SpendThrone' },
      { url: 'http://localhost:3002', name: 'Lethometry' },
    ];
    
    for (const site of sites) {
      await page.goto(site.url, { waitUntil: 'networkidle' });
      const data = await page.evaluate(() => {
        const body = window.getComputedStyle(document.body);
        return {
          fontFamily: body.fontFamily,
          fontSize: body.fontSize
        };
      });
      console.log(`${site.name} Typography:`, data);
    }
  });
});
