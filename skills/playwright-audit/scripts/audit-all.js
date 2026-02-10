#!/usr/bin/env node
/**
 * Main Audit Runner
 * Tests all three sites: SpendThrone, Lethometry, OMA-AI
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Site configurations
const SITES = {
  'spendthrone': {
    name: 'SpendThrone',
    url: process.env.SPENDTHRONE_URL || 'https://spendthrone.com',
    routes: ['/', '/about', '/features', '/pricing', '/contact', '/login', '/signup'],
    description: 'Expense management platform'
  },
  'lethometry': {
    name: 'Lethometry',
    url: process.env.LETHOMETRY_URL || 'https://lethometry.com',
    routes: ['/', '/about', '/products', '/solutions', '/docs', '/login'],
    description: 'Analytics and metrics platform'
  },
  'oma-ai': {
    name: 'OMA-AI',
    url: process.env.OMAAI_URL || 'https://oma-ai.com',
    routes: ['/', '/about', '/features', '/pricing', '/contact', '/login', '/dashboard'],
    description: 'AI-powered automation platform'
  }
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'bright');
  console.log('='.repeat(60) + '\n');
}

async function runAudit(siteKey) {
  const site = SITES[siteKey];
  logSection(`🔍 Auditing ${site.name}`);
  log(`URL: ${site.url}`, 'cyan');
  log(`Routes: ${site.routes.join(', ')}`, 'cyan');
  log(`Description: ${site.description}\n`, 'cyan');

  const results = {
    site: site.name,
    url: site.url,
    timestamp: new Date().toISOString(),
    tests: {}
  };

  const timestamp = Date.now();
  const reportDir = path.join(__dirname, '..', 'reports', `${siteKey}-${timestamp}`);
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  try {
    // Performance Tests
    log('📊 Running Performance Tests...', 'yellow');
    const perfResult = await runPerformanceTest(site, reportDir);
    results.tests.performance = perfResult;
    log(`✅ Performance: ${perfResult.score}/100`, 'green');
  } catch (error) {
    log(`❌ Performance test failed: ${error.message}`, 'red');
    results.tests.performance = { error: error.message };
  }

  try {
    // Accessibility Tests
    log('♿ Running Accessibility Tests...', 'yellow');
    const a11yResult = await runAccessibilityTest(site, reportDir);
    results.tests.accessibility = a11yResult;
    log(`✅ Accessibility: ${a11yResult.violations} violations`, a11yResult.violations > 0 ? 'yellow' : 'green');
  } catch (error) {
    log(`❌ Accessibility test failed: ${error.message}`, 'red');
    results.tests.accessibility = { error: error.message };
  }

  try {
    // SEO Tests
    log('🔍 Running SEO Tests...', 'yellow');
    const seoResult = await runSEOTest(site, reportDir);
    results.tests.seo = seoResult;
    log(`✅ SEO: ${seoResult.score}/100`, seoResult.score < 80 ? 'yellow' : 'green');
  } catch (error) {
    log(`❌ SEO test failed: ${error.message}`, 'red');
    results.tests.seo = { error: error.message };
  }

  try {
    // Visual Tests
    log('📸 Running Visual Tests...', 'yellow');
    const visualResult = await runVisualTest(site, reportDir);
    results.tests.visual = visualResult;
    log(`✅ Visual: ${visualResult.screenshots} screenshots captured`, 'green');
  } catch (error) {
    log(`❌ Visual test failed: ${error.message}`, 'red');
    results.tests.visual = { error: error.message };
  }

  // Save results
  const resultsPath = path.join(reportDir, 'results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

  // Generate HTML report
  generateHTMLReport(results, reportDir);

  log(`\n📄 Report saved to: ${reportDir}`, 'magenta');
  
  return results;
}

async function runPerformanceTest(site, reportDir) {
  const lighthouse = require('lighthouse');
  const chromeLauncher = require('chrome-launcher');

  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox'] });
  
  const options = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  };

  const runnerResult = await lighthouse(site.url, options);
  await chrome.kill();

  const scores = {
    performance: Math.round(runnerResult.lhr.categories.performance.score * 100),
    accessibility: Math.round(runnerResult.lhr.categories.accessibility.score * 100),
    bestPractices: Math.round(runnerResult.lhr.categories['best-practices'].score * 100),
    seo: Math.round(runnerResult.lhr.categories.seo.score * 100)
  };

  // Save Lighthouse report
  fs.writeFileSync(
    path.join(reportDir, 'lighthouse-report.json'),
    JSON.stringify(runnerResult.lhr, null, 2)
  );

  return {
    score: scores.performance,
    scores,
    metrics: runnerResult.lhr.audits.metrics?.details?.items?.[0] || {},
    opportunities: Object.values(runnerResult.lhr.audits)
      .filter(a => a.details?.type === 'opportunity' && a.numericValue > 0)
      .map(a => ({
        title: a.title,
        description: a.description,
        score: a.score,
        savings: a.numericValue
      }))
  };
}

async function runAccessibilityTest(site, reportDir) {
  const { chromium } = require('playwright');
  const { injectAxe, getViolations } = require('axe-playwright');

  const browser = await chromium.launch();
  const violations = [];
  const warnings = [];

  for (const route of site.routes) {
    const page = await browser.newPage();
    const url = `${site.url}${route}`;
    
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await injectAxe(page);
      
      const routeViolations = await getViolations(page);
      
      if (routeViolations.length > 0) {
        violations.push({
          route,
          url,
          issues: routeViolations.map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            help: v.help,
            helpUrl: v.helpUrl,
            nodes: v.nodes.length
          }))
        });
      }
    } catch (error) {
      warnings.push({ route, error: error.message });
    }
    
    await page.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(reportDir, 'accessibility-report.json'),
    JSON.stringify({ violations, warnings }, null, 2)
  );

  return {
    violations: violations.reduce((sum, v) => sum + v.issues.length, 0),
    routesTested: site.routes.length,
    routesWithIssues: violations.length,
    details: violations,
    warnings
  };
}

async function runSEOTest(site, reportDir) {
  const { chromium } = require('playwright');
  const cheerio = require('cheerio');

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const seoResults = {
    routes: [],
    globalIssues: [],
    score: 0
  };

  for (const route of site.routes) {
    const url = `${site.url}${route}`;
    
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      const html = await page.content();
      const $ = cheerio.load(html);

      const routeSEO = {
        route,
        url,
        title: $('title').text(),
        titleLength: $('title').text().length,
        metaDescription: $('meta[name="description"]').attr('content') || '',
        metaDescriptionLength: ($('meta[name="description"]').attr('content') || '').length,
        h1: $('h1').first().text().trim(),
        h1Count: $('h1').length,
        h2Count: $('h2').length,
        imagesWithoutAlt: $('img:not([alt])').length,
        canonical: $('link[rel="canonical"]').attr('href') || '',
        ogTags: {
          title: $('meta[property="og:title"]').attr('content') || '',
          description: $('meta[property="og:description"]').attr('content') || '',
          image: $('meta[property="og:image"]').attr('content') || '',
          url: $('meta[property="og:url"]').attr('content') || ''
        },
        twitterTags: {
          card: $('meta[name="twitter:card"]').attr('content') || '',
          title: $('meta[name="twitter:title"]').attr('content') || '',
          description: $('meta[name="twitter:description"]').attr('content') || '',
          image: $('meta[name="twitter:image"]').attr('content') || ''
        },
        structuredData: $('script[type="application/ld+json"]').map((i, el) => $(el).html()).get(),
        issues: []
      };

      // Check for SEO issues
      if (!routeSEO.title || routeSEO.title.length < 10 || routeSEO.title.length > 70) {
        routeSEO.issues.push(`Title length issue: ${routeSEO.titleLength} characters`);
      }
      if (!routeSEO.metaDescription || routeSEO.metaDescription.length < 50 || routeSEO.metaDescription.length > 160) {
        routeSEO.issues.push(`Meta description length issue: ${routeSEO.metaDescriptionLength} characters`);
      }
      if (routeSEO.h1Count === 0) {
        routeSEO.issues.push('Missing H1 tag');
      } else if (routeSEO.h1Count > 1) {
        routeSEO.issues.push(`Multiple H1 tags: ${routeSEO.h1Count}`);
      }
      if (routeSEO.imagesWithoutAlt > 0) {
        routeSEO.issues.push(`${routeSEO.imagesWithoutAlt} images without alt text`);
      }

      seoResults.routes.push(routeSEO);
    } catch (error) {
      seoResults.globalIssues.push({ route, error: error.message });
    }
  }

  await browser.close();

  // Calculate overall SEO score
  const totalIssues = seoResults.routes.reduce((sum, r) => sum + r.issues.length, 0);
  const maxScore = 100;
  const deductions = totalIssues * 5;
  seoResults.score = Math.max(0, maxScore - deductions);

  fs.writeFileSync(
    path.join(reportDir, 'seo-report.json'),
    JSON.stringify(seoResults, null, 2)
  );

  return seoResults;
}

async function runVisualTest(site, reportDir) {
  const { chromium } = require('playwright');

  const browser = await chromium.launch();
  const screenshotsDir = path.join(reportDir, 'screenshots');
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'laptop', width: 1366, height: 768 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 }
  ];

  const screenshots = [];

  for (const route of site.routes.slice(0, 4)) { // Limit to first 4 routes for speed
    for (const viewport of viewports) {
      const page = await browser.newPage({
        viewport: { width: viewport.width, height: viewport.height }
      });

      const url = `${site.url}${route}`;
      const filename = `${route.replace(/\//g, '_') || 'home'}-${viewport.name}.png`;
      const filepath = path.join(screenshotsDir, filename);

      try {
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.screenshot({ 
          path: filepath,
          fullPage: true 
        });
        
        screenshots.push({
          route,
          viewport: viewport.name,
          filename,
          path: filepath
        });
      } catch (error) {
        console.error(`Failed to capture ${url} at ${viewport.name}: ${error.message}`);
      }

      await page.close();
    }
  }

  await browser.close();

  return {
    screenshots: screenshots.length,
    routes: site.routes.slice(0, 4),
    viewports: viewports.map(v => v.name),
    details: screenshots
  };
}

function generateHTMLReport(results, reportDir) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Report - ${results.site}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      line-height: 1.6;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    header { 
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      padding: 3rem 2rem;
      border-radius: 16px;
      margin-bottom: 2rem;
    }
    h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .timestamp { opacity: 0.8; }
    .score-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    .score-card {
      background: #1e293b;
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
    }
    .score-card h3 { color: #94a3b8; font-size: 0.875rem; text-transform: uppercase; margin-bottom: 0.5rem; }
    .score-value { font-size: 3rem; font-weight: bold; }
    .score-good { color: #22c55e; }
    .score-warning { color: #f59e0b; }
    .score-bad { color: #ef4444; }
    .section { 
      background: #1e293b;
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
    }
    .section h2 { color: #60a5fa; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
    .issues { margin-top: 1rem; }
    .issue { 
      background: #0f172a;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 0.5rem;
      border-left: 4px solid #ef4444;
    }
    .issue-warning { border-left-color: #f59e0b; }
    .issue-info { border-left-color: #3b82f6; }
    .metric { 
      display: flex; 
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #334155;
    }
    .metric:last-child { border-bottom: none; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #334155; }
    th { color: #94a3b8; font-weight: 600; }
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .badge-success { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
    .badge-warning { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
    .badge-error { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
    footer { text-align: center; margin-top: 3rem; opacity: 0.6; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔍 ${results.site} Audit Report</h1>
      <p class="timestamp">Generated: ${new Date(results.timestamp).toLocaleString()}</p>
      <p>${results.url}</p>
    </header>

    <div class="score-grid">
      <div class="score-card">
        <h3>Performance</h3>
        <div class="score-value ${getScoreClass(results.tests.performance?.score)}">${results.tests.performance?.score || 'N/A'}</div>
      </div>
      <div class="score-card">
        <h3>Accessibility</h3>
        <div class="score-value ${results.tests.accessibility?.violations > 0 ? 'score-warning' : 'score-good'}">${results.tests.accessibility?.violations || 0}</div>
        <small>violations</small>
      </div>
      <div class="score-card">
        <h3>SEO Score</h3>
        <div class="score-value ${getScoreClass(results.tests.seo?.score)}">${results.tests.seo?.score || 'N/A'}</div>
      </div>
      <div class="score-card">
        <h3>Screenshots</h3>
        <div class="score-value score-good">${results.tests.visual?.screenshots || 0}</div>
      </div>
    </div>

    <div class="section">
      <h2>📊 Performance Metrics</h2>
      ${generatePerformanceHTML(results.tests.performance)}
    </div>

    <div class="section">
      <h2>♿ Accessibility Issues</h2>
      ${generateAccessibilityHTML(results.tests.accessibility)}
    </div>

    <div class="section">
      <h2>🔍 SEO Analysis</h2>
      ${generateSEOHTML(results.tests.seo)}
    </div>

    <footer>
      <p>Generated by Playwright Audit System</p>
    </footer>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(reportDir, 'index.html'), html);
}

function getScoreClass(score) {
  if (score >= 90) return 'score-good';
  if (score >= 70) return 'score-warning';
  return 'score-bad';
}

function generatePerformanceHTML(performance) {
  if (!performance || performance.error) {
    return '<p class="issue">Performance test failed to run.</p>';
  }

  const metrics = performance.metrics || {};
  
  return `
    <div class="metric">
      <span>First Contentful Paint</span>
      <span>${metrics.firstContentfulPaint ? (metrics.firstContentfulPaint / 1000).toFixed(2) + 's' : 'N/A'}</span>
    </div>
    <div class="metric">
      <span>Largest Contentful Paint</span>
      <span>${metrics.largestContentfulPaint ? (metrics.largestContentfulPaint / 1000).toFixed(2) + 's' : 'N/A'}</span>
    </div>
    <div class="metric">
      <span>Time to Interactive</span>
      <span>${metrics.interactive ? (metrics.interactive / 1000).toFixed(2) + 's' : 'N/A'}</span>
    </div>
    <div class="metric">
      <span>Cumulative Layout Shift</span>
      <span>${metrics.cumulativeLayoutShift ? metrics.cumulativeLayoutShift.toFixed(3) : 'N/A'}</span>
    </div>
    <div class="metric">
      <span>Total Blocking Time</span>
      <span>${metrics.totalBlockingTime ? metrics.totalBlockingTime + 'ms' : 'N/A'}</span>
    </div>
    ${performance.opportunities?.length ? `
      <div class="issues">
        <h4>Optimization Opportunities</h4>
        ${performance.opportunities.map(o => `
          <div class="issue issue-warning">
            <strong>${o.title}</strong>
            <p>${o.description}</p>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

function generateAccessibilityHTML(accessibility) {
  if (!accessibility || accessibility.error) {
    return '<p class="issue">Accessibility test failed to run.</p>';
  }

  if (!accessibility.details || accessibility.details.length === 0) {
    return '<p class="badge badge-success">✅ No accessibility violations found!</p>';
  }

  return `
    <table>
      <thead>
        <tr>
          <th>Route</th>
          <th>Issues</th>
          <th>Severity</th>
        </tr>
      </thead>
      <tbody>
        ${accessibility.details.map(route => `
          <tr>
            <td>${route.route}</td>
            <td>${route.issues.length}</td>
            <td>
              ${route.issues.some(i => i.impact === 'critical') ? 
                '<span class="badge badge-error">Critical</span>' : 
                '<span class="badge badge-warning">Warning</span>'}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="issues">
      ${accessibility.details.flatMap(r => r.issues).slice(0, 10).map(issue => `
        <div class="issue ${issue.impact === 'critical' ? '' : 'issue-warning'}">
          <strong>${issue.help}</strong>
          <p>${issue.description}</p>
          <a href="${issue.helpUrl}" target="_blank">Learn more →</a>
        </div>
      `).join('')}
    </div>
  `;
}

function generateSEOHTML(seo) {
  if (!seo || seo.error) {
    return '<p class="issue">SEO test failed to run.</p>';
  }

  return `
    <table>
      <thead>
        <tr>
          <th>Route</th>
          <th>Title</th>
          <th>Meta Desc</th>
          <th>H1</th>
          <th>Issues</th>
        </tr>
      </thead>
      <tbody>
        ${seo.routes.map(route => `
          <tr>
            <td>${route.route}</td>
            <td><span class="badge ${route.titleLength > 10 && route.titleLength < 70 ? 'badge-success' : 'badge-warning'}">${route.titleLength} chars</span></td>
            <td><span class="badge ${route.metaDescriptionLength > 50 && route.metaDescriptionLength < 160 ? 'badge-success' : 'badge-warning'}">${route.metaDescriptionLength} chars</span></td>
            <td><span class="badge ${route.h1Count === 1 ? 'badge-success' : 'badge-error'}">${route.h1Count}</span></td>
            <td>${route.issues.length}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    ${seo.routes.filter(r => r.issues.length > 0).length > 0 ? `
      <div class="issues">
        <h4>SEO Issues Found</h4>
        ${seo.routes.filter(r => r.issues.length > 0).slice(0, 5).flatMap(r => r.issues.map(issue => `
          <div class="issue issue-warning">
            <strong>${r.route}</strong>: ${issue}
          </div>
        `)).join('')}
      </div>
    ` : '<p class="badge badge-success" style="margin-top: 1rem;">✅ No major SEO issues found!</p>'}
  `;
}

// Main execution
async function main() {
  logSection('🎭 Playwright Audit System');
  log('Auditing all three sites...\n', 'cyan');

  const allResults = {};

  for (const siteKey of Object.keys(SITES)) {
    try {
      allResults[siteKey] = await runAudit(siteKey);
    } catch (error) {
      log(`❌ Failed to audit ${siteKey}: ${error.message}`, 'red');
      allResults[siteKey] = { error: error.message };
    }
  }

  // Generate summary report
  const summaryPath = path.join(__dirname, '..', 'reports', `summary-${Date.now()}.json`);
  fs.writeFileSync(summaryPath, JSON.stringify(allResults, null, 2));

  logSection('✅ Audit Complete!');
  log(`Summary report: ${summaryPath}`, 'green');
  log(`\n📊 Results Summary:`, 'bright');
  
  for (const [key, results] of Object.entries(allResults)) {
    if (results.error) {
      log(`  ❌ ${SITES[key].name}: Failed`, 'red');
    } else {
      const perf = results.tests.performance?.score || 'N/A';
      const a11y = results.tests.accessibility?.violations || 0;
      const seo = results.tests.seo?.score || 'N/A';
      log(`  ✅ ${results.site}: Performance=${perf}, A11y=${a11y} issues, SEO=${seo}`, 'green');
    }
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { runAudit, SITES };
