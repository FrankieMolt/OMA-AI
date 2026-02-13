import { test, Page } from '@playwright/test';

test('List scripts on OMA-AI', async ({ page }: { page: Page }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const scripts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('script')).map(s => ({
      src: s.src,
      id: s.id,
      type: s.type
    }));
  });
  console.log('OMA-AI Scripts:', JSON.stringify(scripts, null, 2));
  console.log('Script count:', scripts.length);
});
