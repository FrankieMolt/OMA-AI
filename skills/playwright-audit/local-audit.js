const { chromium } = require('playwright');
const fs = require('fs');

const BASE_URL = 'http://localhost:3001';

const routes = [
  '/', '/about', '/features', '/how-it-works', '/docs', '/api-docs',
  '/dashboard', '/marketplace', '/tasks', '/bounties', '/pricing', 
  '/contact', '/blog', '/login', '/signup', '/search', '/privacy', 
  '/terms', '/developers', '/frankie-os'
];

const blogPosts = [
  '/blog/welcome-to-oma-ai',
  '/blog/oma-ai-humans-and-agents-2026',
  '/blog/x402-payments-complete-guide-2026'
];

async function audit() {
  const browser = await chromium.launch({ headless: true });
  const results = {
    pages: [],
    errors: [],
    summary: { total: 0, passed: 0, failed: 0 }
  };

  for (const route of [...routes, ...blogPosts]) {
    const page = await browser.newPage();
    try {
      const response = await page.goto(`${BASE_URL}${route}`, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      const status = response?.status() || 0;
      const title = await page.title().catch(() => 'No title');
      
      results.pages.push({
        route,
        status,
        title,
        success: status === 200
      });

      if (status === 200) {
        results.summary.passed++;
      } else {
        results.summary.failed++;
        results.errors.push({ route, status, title });
      }
      results.summary.total++;

      console.log(`${route}: ${status} - ${title}`);
    } catch (error) {
      results.errors.push({ route, error: error.message });
      results.summary.failed++;
      console.log(`${route}: ERROR - ${error.message}`);
    }
    await page.close();
  }

  // Test mobile responsiveness
  console.log('\n=== Mobile Responsiveness Test ===');
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 667 } });
  await mobilePage.goto(`${BASE_URL}/`);
  await mobilePage.waitForTimeout(2000);
  
  // Check if hamburger menu exists
  const hasMenu = await mobilePage.$('[aria-label="Open menu"]').then(el => !!el);
  console.log(`Mobile menu present: ${hasMenu}`);
  results.mobile = { hasMenu, viewport: '375x667' };
  
  // Check for console errors on homepage
  const pageErrors = [];
  mobilePage.on('pageerror', err => pageErrors.push(err.message));
  await mobilePage.reload();
  await mobilePage.waitForTimeout(2000);
  results.consoleErrors = pageErrors;
  console.log(`Console errors: ${pageErrors.length}`);
  
  await mobilePage.close();

  await browser.close();
  return results;
}

audit().then(results => {
  console.log('\n=== AUDIT SUMMARY ===');
  console.log(`Total pages tested: ${results.summary.total}`);
  console.log(`Passed: ${results.summary.passed}`);
  console.log(`Failed: ${results.summary.failed}`);
  if (results.errors.length > 0) {
    console.log('\nErrors:');
    results.errors.forEach(e => console.log(`  ${e.route}: ${e.status || e.error}`));
  }
  fs.writeFileSync('local-audit-results.json', JSON.stringify(results, null, 2));
  console.log('\nResults saved to local-audit-results.json');
}).catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
