const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://oma-ai.com';
const OUTPUT_DIR = '/tmp/oma-audit-screenshots';

// Key pages to audit
const PAGES = [
  { path: '/', name: 'homepage' },
  { path: '/pricing', name: 'pricing' },
  { path: '/mcps', name: 'mcps' },
  { path: '/docs', name: 'docs' },
  { path: '/features', name: 'features' },
  { path: '/about', name: 'about' },
  { path: '/dashboard', name: 'dashboard' },
  { path: '/login', name: 'login' },
  { path: '/signup', name: 'signup' },
  { path: '/keys', name: 'keys' },
  { path: '/wallet', name: 'wallet' },
  { path: '/credits', name: 'credits' },
  { path: '/integrations', name: 'integrations' },
  { path: '/blog', name: 'blog' },
  { path: '/faq', name: 'faq' },
  { path: '/contact', name: 'contact' },
  { path: '/compare', name: 'compare' }
];

async function auditSite() {
  console.log('Starting browser audit for oma-ai.com...');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  const results = {
    pages: [],
    consoleErrors: [],
    networkErrors: []
  };

  // Capture console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push({ text: msg.text(), page: page.url() });
    }
  });

  // Capture failed requests
  page.on('requestfailed', request => {
    results.networkErrors.push({ url: request.url(), failure: request.failure()?.errorText });
  });

  for (const pageInfo of PAGES) {
    const url = BASE_URL + pageInfo.path;
    console.log(`Auditing: ${url}`);
    
    const pageResult = {
      path: pageInfo.path,
      name: pageInfo.name,
      url,
      status: 'unknown',
      screenshot: null,
      errors: []
    };

    try {
      const response = await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: 15000 
      });
      
      pageResult.status = response?.status() || 'unknown';
      
      // Wait a bit for any dynamic content
      await page.waitForTimeout(2000);
      
      // Take screenshot
      const screenshotPath = path.join(OUTPUT_DIR, `${pageInfo.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      pageResult.screenshot = screenshotPath;
      
      // Extract some basic content info
      const title = await page.title().catch(() => 'N/A');
      pageResult.title = title;
      
      // Check for main content
      const bodyText = await page.locator('body').innerText().catch(() => '');
      pageResult.contentLength = bodyText.length;
      pageResult.hasContent = bodyText.length > 100;
      
      console.log(`  ✓ ${pageInfo.name} - Status: ${pageResult.status}, Title: ${title}`);
      
    } catch (error) {
      pageResult.status = 'error';
      pageResult.error = error.message;
      console.log(`  ✗ ${pageInfo.name} - Error: ${error.message}`);
    }
    
    results.pages.push(pageResult);
  }

  await browser.close();

  // Save results
  const resultsPath = path.join(OUTPUT_DIR, 'audit-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log('\n=== AUDIT SUMMARY ===');
  console.log(`Pages audited: ${results.pages.length}`);
  console.log(`Successful: ${results.pages.filter(p => p.status === 200).length}`);
  console.log(`Errors: ${results.pages.filter(p => p.status !== 200).length}`);
  console.log(`Console errors: ${results.consoleErrors.length}`);
  console.log(`Network errors: ${results.networkErrors.length}`);
  console.log(`\nResults saved to: ${resultsPath}`);
  console.log(`Screenshots saved to: ${OUTPUT_DIR}`);

  return results;
}

auditSite().catch(console.error);
