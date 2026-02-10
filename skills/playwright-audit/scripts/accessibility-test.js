#!/usr/bin/env node
/**
 * Accessibility Testing Script
 * Uses axe-core via Playwright to test WCAG compliance
 */

const { chromium } = require('playwright');
const { injectAxe, checkA11y, getViolations } = require('axe-playwright');
const fs = require('fs');
const path = require('path');

const SITES = {
  spendthrone: {
    url: 'https://spendthrone.com',
    routes: ['/', '/about', '/features', '/pricing', '/contact', '/login', '/signup']
  },
  lethometry: {
    url: 'https://lethometry.com',
    routes: ['/', '/about', '/products', '/solutions', '/docs', '/login']
  },
  'oma-ai': {
    url: 'https://oma-ai.com',
    routes: ['/', '/about', '/features', '/pricing', '/contact', '/login', '/dashboard']
  }
};

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

const IMPACT_COLORS = {
  critical: 'red',
  serious: 'red',
  moderate: 'yellow',
  minor: 'reset'
};

async function testPage(page, route, baseUrl) {
  const url = `${baseUrl}${route}`;
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await injectAxe(page);
    
    const violations = await getViolations(page);
    
    return {
      route,
      url,
      violations: violations.map(v => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        tags: v.tags,
        nodes: v.nodes.map(n => ({
          html: n.html.substring(0, 200),
          target: n.target?.join(' '),
          failureSummary: n.failureSummary
        }))
      })),
      passes: violations.length === 0
    };
  } catch (error) {
    return {
      route,
      url,
      error: error.message,
      violations: [],
      passes: false
    };
  }
}

async function testSite(siteName, config) {
  log(`\n🔍 Testing ${siteName}...`, 'bright');
  log(`URL: ${config.url}`, 'cyan');
  log(`Routes: ${config.routes.length}`, 'cyan');

  const browser = await chromium.launch();
  const results = {
    siteName,
    url: config.url,
    routes: [],
    summary: {
      total: 0,
      critical: 0,
      serious: 0,
      moderate: 0,
      minor: 0,
      passes: 0
    }
  };

  for (const route of config.routes) {
    const page = await browser.newPage();
    const routeResult = await testPage(page, route, config.url);
    
    results.routes.push(routeResult);
    
    // Update summary
    results.summary.total += routeResult.violations.length;
    routeResult.violations.forEach(v => {
      results.summary[v.impact] = (results.summary[v.impact] || 0) + 1;
    });
    if (routeResult.passes) {
      results.summary.passes++;
    }

    await page.close();
  }

  await browser.close();

  // Log results
  log('\n📊 Summary:', 'bright');
  log(`  Total violations: ${results.summary.total}`, 
    results.summary.total > 0 ? 'yellow' : 'green');
  log(`  Routes passing: ${results.summary.passes}/${config.routes.length}`, 
    results.summary.passes === config.routes.length ? 'green' : 'yellow');
  
  if (results.summary.critical > 0) {
    log(`  Critical: ${results.summary.critical}`, 'red');
  }
  if (results.summary.serious > 0) {
    log(`  Serious: ${results.summary.serious}`, 'red');
  }
  if (results.summary.moderate > 0) {
    log(`  Moderate: ${results.summary.moderate}`, 'yellow');
  }

  // Show top issues
  const allViolations = results.routes.flatMap(r => 
    r.violations.map(v => ({ ...v, route: r.route }))
  );

  if (allViolations.length > 0) {
    log('\n⚠️  Top Issues:', 'yellow');
    
    // Group by rule
    const byRule = {};
    allViolations.forEach(v => {
      if (!byRule[v.id]) {
        byRule[v.id] = { ...v, count: 0, routes: [] };
      }
      byRule[v.id].count++;
      if (!byRule[v.id].routes.includes(v.route)) {
        byRule[v.id].routes.push(v.route);
      }
    });

    Object.values(byRule)
      .sort((a, b) => {
        const impactOrder = { critical: 0, serious: 1, moderate: 2, minor: 3 };
        return impactOrder[a.impact] - impactOrder[b.impact];
      })
      .slice(0, 5)
      .forEach(issue => {
        const color = IMPACT_COLORS[issue.impact] || 'reset';
        log(`\n  [${issue.impact.toUpperCase()}] ${issue.help}`, color);
        log(`    Description: ${issue.description.substring(0, 100)}...`, 'reset');
        log(`    Affected routes: ${issue.routes.join(', ')}`, 'reset');
        log(`    Learn more: ${issue.helpUrl}`, 'cyan');
      });
  }

  return results;
}

async function main() {
  const targetSite = process.argv[2];
  const saveReport = process.argv.includes('--save');
  
  log('='.repeat(60), 'bright');
  log('♿ Accessibility Testing Suite', 'bright');
  log('Testing WCAG 2.1 AA compliance', 'cyan');
  log('='.repeat(60), 'bright');

  const results = [];

  if (targetSite && SITES[targetSite]) {
    const result = await testSite(targetSite, SITES[targetSite]);
    results.push(result);
  } else {
    for (const [name, config] of Object.entries(SITES)) {
      const result = await testSite(name, config);
      results.push(result);
    }
  }

  // Save reports if requested
  if (saveReport) {
    const reportDir = path.join(__dirname, '..', 'reports', 'accessibility');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const timestamp = Date.now();
    const reportPath = path.join(reportDir, `a11y-${timestamp}.json`);
    
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    log(`\n💾 Report saved to: ${reportPath}`, 'cyan');

    // Generate markdown report
    const mdPath = path.join(reportDir, `a11y-${timestamp}.md`);
    const mdContent = generateMarkdownReport(results);
    fs.writeFileSync(mdPath, mdContent);
    log(`📝 Markdown report: ${mdPath}`, 'cyan');
  }

  // Final summary
  log('\n' + '='.repeat(60), 'bright');
  log('📈 Accessibility Summary', 'bright');
  log('='.repeat(60), 'bright');

  results.forEach(result => {
    const { summary, routes } = result;
    const passRate = Math.round((summary.passes / routes.length) * 100);
    const color = summary.total === 0 ? 'green' : summary.critical > 0 ? 'red' : 'yellow';
    
    log(`${result.siteName}: ${summary.total} violations (${passRate}% pass rate)`, color);
  });

  // WCAG compliance check
  const allPass = results.every(r => r.summary.critical === 0 && r.summary.serious === 0);
  
  log('\n✅ WCAG 2.1 AA Compliance:', allPass ? 'green' : 'red');
  if (allPass) {
    log('All sites pass WCAG 2.1 AA requirements!', 'green');
  } else {
    log('Some sites have critical/serious accessibility issues that need attention.', 'red');
  }
}

function generateMarkdownReport(results) {
  const date = new Date().toISOString();
  
  return `# Accessibility Test Report
Generated: ${date}

## Summary

| Site | Routes Tested | Pass Rate | Total Issues | Critical | Serious | Moderate | Minor |
|------|---------------|-----------|--------------|----------|---------|----------|-------|
${results.map(r => `| ${r.siteName} | ${r.routes.length} | ${Math.round((r.summary.passes / r.routes.length) * 100)}% | ${r.summary.total} | ${r.summary.critical} | ${r.summary.serious} | ${r.summary.moderate} | ${r.summary.minor} |`).join('\n')}

## WCAG 2.1 AA Compliance

${results.every(r => r.summary.critical === 0 && r.summary.serious === 0) 
  ? '✅ **PASS** - All sites meet WCAG 2.1 AA requirements'
  : '❌ **FAIL** - Critical or serious issues found that violate WCAG 2.1 AA'}

## Detailed Results

${results.map(result => `
### ${result.siteName}

**Base URL:** ${result.url}

**Routes Tested:**
${result.routes.map(r => `- ${r.route}: ${r.passes ? '✅ Pass' : `❌ ${r.violations.length} violations`}`).join('\n')}

**Issues Found:**
${result.routes.filter(r => r.violations.length > 0).map(r => `
#### ${r.route}

${r.violations.map(v => `- **[${v.impact.toUpperCase()}]** ${v.help}
  - Description: ${v.description}
  - Help: ${v.helpUrl}
  - Affected elements: ${v.nodes.length}`).join('\n')}
`).join('\n') || 'No issues found on any routes.'}
`).join('\n')}

## Recommendations

1. **Fix Critical Issues First**: Critical violations prevent users from accessing content or functionality.
2. **Address Serious Issues**: Serious violations make content difficult to use for some users.
3. **Improve Moderate Issues**: These impact usability but don't block access.
4. **Test with Screen Readers**: Automated testing catches ~30% of issues; manual testing is essential.
5. **Keyboard Navigation**: Ensure all functionality works without a mouse.

---
*Generated by Playwright Accessibility Testing Suite*
`;
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testPage, testSite };
