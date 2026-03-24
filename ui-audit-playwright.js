const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = '/tmp/ui-audit';

// Key pages to audit
const PAGES = [
  '/',
  '/about',
  '/features',
  '/pricing',
  '/faq',
  '/compare',
  '/testimonials',
  '/dashboard',
  '/wallet',
  '/transactions',
  '/mcps',
  '/integrations',
  '/docs',
  '/blog',
  '/contact',
  '/login',
  '/signup'
];

// Viewport sizes to test responsive design
const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 }
];

async function auditPage(page, url, viewport) {
  const issues = [];
  const pageInfo = {
    url,
    viewport: viewport.name,
    errors: [],
    warnings: [],
    info: []
  };

  try {
    // Navigate to page
    const response = await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 10000
    });

    if (!response.ok()) {
      pageInfo.errors.push(`HTTP Status: ${response.status()}`);
    }

    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        pageInfo.errors.push(`Console Error: ${msg.text()}`);
      }
    });

    // Check for broken images
    const brokenImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => img.src || img.alt || 'unnamed image');
    });

    if (brokenImages.length > 0) {
      pageInfo.errors.push(`Broken Images: ${brokenImages.join(', ')}`);
    }

    // Check for broken links (404s)
    const links = await page.$$eval('a[href]', anchors => {
      return anchors.map(a => ({
        href: a.href,
        text: a.textContent.trim().substring(0, 50)
      }));
    });

    // Check for overflow issues
    const hasOverflow = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      return {
        bodyOverflowX: body.scrollWidth > body.clientWidth,
        bodyOverflowY: body.scrollHeight > body.clientHeight,
        horizontalScrollbar: window.innerWidth > document.documentElement.clientWidth
      };
    });

    if (hasOverflow.bodyOverflowX || hasOverflow.horizontalScrollbar) {
      pageInfo.warnings.push('Horizontal overflow detected - content may be clipped');
    }

    // Check for accessibility issues (basic)
    const a11yIssues = await page.evaluate(() => {
      const issues = [];

      // Check for missing alt text
      const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
      if (imagesWithoutAlt.length > 0) {
        issues.push(`${imagesWithoutAlt.length} images missing alt text`);
      }

      // Check for empty links
      const emptyLinks = document.querySelectorAll('a:not([href]), a[href=""]');
      if (emptyLinks.length > 0) {
        issues.push(`${emptyLinks.length} empty or broken links`);
      }

      // Check for form inputs without labels
      const inputsWithoutLabels = document.querySelectorAll('input:not([id])');
      if (inputsWithoutLabels.length > 0) {
        issues.push(`${inputsWithoutLabels.length} inputs without ID (potential label issue)`);
      }

      return issues;
    });

    pageInfo.warnings.push(...a11yIssues);

    // Check for unresponsive elements
    const unresponsiveButtons = await page.$$eval('button', buttons => {
      return buttons.filter(btn => {
        const styles = window.getComputedStyle(btn);
        return styles.cursor !== 'pointer' && styles.pointerEvents !== 'none';
      }).length;
    });

    if (unresponsiveButtons > 0) {
      pageInfo.warnings.push(`${unresponsiveButtons} buttons may have unclear interaction states`);
    }

    // Check visibility of key UI elements
    const visibilityCheck = await page.evaluate(() => {
      const checks = {
        hasNav: !!document.querySelector('nav'),
        hasFooter: !!document.querySelector('footer'),
        hasMainContent: !!document.querySelector('main'),
        visibleHeading: !!document.querySelector('h1, h2, h3')
      };
      return checks;
    });

    if (!visibilityCheck.hasNav) pageInfo.warnings.push('No navigation element found');
    if (!visibilityCheck.hasFooter) pageInfo.info.push('No footer element (may be intentional)');
    if (!visibilityCheck.hasMainContent) pageInfo.errors.push('No main content area found');
    if (!visibilityCheck.visibleHeading) pageInfo.warnings.push('No visible heading elements');

    // Take screenshot
    const filename = `${url.replace(/\//g, '-')}-${viewport.name}.png`;
    await page.screenshot({
      path: `${OUTPUT_DIR}/${filename}`,
      fullPage: true
    });
    pageInfo.screenshot = filename;

  } catch (error) {
    pageInfo.errors.push(`Navigation Error: ${error.message}`);
  }

  return pageInfo;
}

async function runAudit() {
  console.log('Starting UI/UX Audit...\n');

  const browser = await chromium.launch({
    headless: true
  });

  const results = [];

  for (const viewport of VIEWPORTS) {
    console.log(`\n=== Testing ${viewport.name} viewport (${viewport.width}x${viewport.height}) ===`);

    const page = await browser.newPage({
      viewport: {
        width: viewport.width,
        height: viewport.height
      }
    });

    for (const url of PAGES) {
      console.log(`  Auditing: ${url}`);
      const result = await auditPage(page, `${BASE_URL}${url}`, viewport);
      results.push(result);

      // Print immediate feedback
      if (result.errors.length > 0) {
        console.log(`    ❌ ERRORS: ${result.errors.length}`);
        result.errors.forEach(e => console.log(`       - ${e}`));
      }
      if (result.warnings.length > 0) {
        console.log(`    ⚠️  WARNINGS: ${result.warnings.length}`);
        result.warnings.slice(0, 3).forEach(w => console.log(`       - ${w}`));
      }
    }

    await page.close();
  }

  await browser.close();

  // Generate summary report
  console.log('\n\n=== AUDIT SUMMARY ===\n');

  const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);

  console.log(`Total Pages Audited: ${PAGES.length}`);
  console.log(`Total Viewports Tested: ${VIEWPORTS.length}`);
  console.log(`Total Errors: ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);
  console.log(`\nScreenshots saved to: ${OUTPUT_DIR}`);

  // Group issues by type
  const errorSummary = {};
  results.forEach(r => {
    r.errors.forEach(e => {
      const key = e.split(':')[0];
      errorSummary[key] = (errorSummary[key] || 0) + 1;
    });
  });

  if (Object.keys(errorSummary).length > 0) {
    console.log('\n--- Error Types ---');
    Object.entries(errorSummary).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
  }

  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: PAGES.length,
      viewports: VIEWPORTS.length,
      totalErrors,
      totalWarnings
    },
    results
  };

  require('fs').writeFileSync(
    `${OUTPUT_DIR}/audit-report.json`,
    JSON.stringify(report, null, 2)
  );

  console.log(`\nDetailed report saved to: ${OUTPUT_DIR}/audit-report.json`);

  return report;
}

runAudit().catch(console.error);
