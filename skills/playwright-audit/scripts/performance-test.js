#!/usr/bin/env node
/**
 * Performance Testing Script
 * Uses Lighthouse to measure Core Web Vitals and performance metrics
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const SITES = {
  spendthrone: 'https://spendthrone.com',
  lethometry: 'https://lethometry.com',
  'oma-ai': 'https://oma-ai.com'
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

async function runLighthouse(url, options = {}) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
  });

  const lighthouseOptions = {
    logLevel: options.verbose ? 'info' : 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    ...options
  };

  try {
    const runnerResult = await lighthouse(url, lighthouseOptions);
    await chrome.kill();
    return runnerResult.lhr;
  } catch (error) {
    await chrome.kill();
    throw error;
  }
}

function formatMetric(value, unit = '') {
  if (value === undefined || value === null) return 'N/A';
  if (typeof value === 'number') {
    return unit === 'ms' ? `${Math.round(value)}ms` : 
           unit === 's' ? `${(value / 1000).toFixed(2)}s` :
           value.toFixed(3);
  }
  return value;
}

function getScoreColor(score) {
  if (score >= 90) return 'green';
  if (score >= 70) return 'yellow';
  return 'red';
}

async function testSite(siteName, url) {
  log(`\n🔍 Testing ${siteName}...`, 'bright');
  log(`URL: ${url}`, 'cyan');

  try {
    const results = await runLighthouse(url);
    
    // Extract scores
    const scores = {
      performance: Math.round(results.categories.performance.score * 100),
      accessibility: Math.round(results.categories.accessibility.score * 100),
      bestPractices: Math.round(results.categories['best-practices'].score * 100),
      seo: Math.round(results.categories.seo.score * 100)
    };

    // Extract Core Web Vitals
    const audits = results.audits;
    const metrics = {
      fcp: audits['first-contentful-paint']?.numericValue,
      lcp: audits['largest-contentful-paint']?.numericValue,
      tti: audits['interactive']?.numericValue,
      tbt: audits['total-blocking-time']?.numericValue,
      cls: audits['cumulative-layout-shift']?.numericValue,
      speedIndex: audits['speed-index']?.numericValue,
      fmp: audits['first-meaningful-paint']?.numericValue
    };

    // Log results
    log('\n📊 Scores:', 'bright');
    Object.entries(scores).forEach(([key, score]) => {
      log(`  ${key}: ${score}/100`, getScoreColor(score));
    });

    log('\n⏱️  Core Web Vitals:', 'bright');
    log(`  First Contentful Paint: ${formatMetric(metrics.fcp, 's')}`);
    log(`  Largest Contentful Paint: ${formatMetric(metrics.lcp, 's')}`);
    log(`  Time to Interactive: ${formatMetric(metrics.tti, 's')}`);
    log(`  Total Blocking Time: ${formatMetric(metrics.tbt, 'ms')}`);
    log(`  Cumulative Layout Shift: ${formatMetric(metrics.cls)}`);
    log(`  Speed Index: ${formatMetric(metrics.speedIndex, 's')}`);

    // Find opportunities
    const opportunities = Object.values(audits)
      .filter(audit => 
        audit.details?.type === 'opportunity' && 
        audit.numericValue > 0 &&
        audit.score !== null &&
        audit.score < 1
      )
      .sort((a, b) => b.numericValue - a.numericValue);

    if (opportunities.length > 0) {
      log('\n⚡ Top Optimization Opportunities:', 'yellow');
      opportunities.slice(0, 5).forEach(opp => {
        const savings = opp.numericValue > 1000 
          ? `${(opp.numericValue / 1000).toFixed(1)}s` 
          : `${Math.round(opp.numericValue)}ms`;
        log(`  • ${opp.title}: Save ~${savings}`, 'yellow');
      });
    }

    return {
      siteName,
      url,
      scores,
      metrics,
      opportunities: opportunities.map(o => ({
        title: o.title,
        description: o.description,
        savings: o.numericValue,
        score: o.score
      })),
      fullReport: results
    };

  } catch (error) {
    log(`❌ Failed to test ${siteName}: ${error.message}`, 'red');
    return { siteName, url, error: error.message };
  }
}

async function main() {
  const targetSite = process.argv[2];
  const saveReport = process.argv.includes('--save');
  
  log('='.repeat(60), 'bright');
  log('🚀 Performance Testing Suite', 'bright');
  log('='.repeat(60), 'bright');

  const results = [];

  if (targetSite && SITES[targetSite]) {
    const result = await testSite(targetSite, SITES[targetSite]);
    results.push(result);
  } else {
    for (const [name, url] of Object.entries(SITES)) {
      const result = await testSite(name, url);
      results.push(result);
    }
  }

  // Save reports if requested
  if (saveReport) {
    const reportDir = path.join(__dirname, '..', 'reports', 'performance');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const timestamp = Date.now();
    const reportPath = path.join(reportDir, `performance-${timestamp}.json`);
    
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    log(`\n💾 Report saved to: ${reportPath}`, 'cyan');

    // Generate markdown summary
    const mdPath = path.join(reportDir, `performance-${timestamp}.md`);
    const mdContent = generateMarkdownReport(results);
    fs.writeFileSync(mdPath, mdContent);
    log(`📝 Markdown report: ${mdPath}`, 'cyan');
  }

  // Summary
  log('\n' + '='.repeat(60), 'bright');
  log('📈 Performance Summary', 'bright');
  log('='.repeat(60), 'bright');
  
  results.forEach(result => {
    if (result.error) {
      log(`${result.siteName}: ❌ Failed`, 'red');
    } else {
      const perf = result.scores.performance;
      const color = getScoreColor(perf);
      log(`${result.siteName}: Performance ${perf}/100`, color);
    }
  });
}

function generateMarkdownReport(results) {
  const date = new Date().toISOString();
  
  return `# Performance Test Report
Generated: ${date}

## Summary

| Site | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
${results.map(r => `| ${r.siteName} | ${r.scores?.performance || 'N/A'} | ${r.scores?.accessibility || 'N/A'} | ${r.scores?.bestPractices || 'N/A'} | ${r.scores?.seo || 'N/A'} |`).join('\n')}

## Detailed Results

${results.map(r => r.error ? '' : `
### ${r.siteName}

**URL:** ${r.url}

**Scores:**
- Performance: ${r.scores.performance}/100
- Accessibility: ${r.scores.accessibility}/100
- Best Practices: ${r.scores.bestPractices}/100
- SEO: ${r.scores.seo}/100

**Core Web Vitals:**
- First Contentful Paint: ${formatMetric(r.metrics.fcp, 's')}
- Largest Contentful Paint: ${formatMetric(r.metrics.lcp, 's')}
- Time to Interactive: ${formatMetric(r.metrics.tti, 's')}
- Total Blocking Time: ${formatMetric(r.metrics.tbt, 'ms')}
- Cumulative Layout Shift: ${formatMetric(r.metrics.cls)}
- Speed Index: ${formatMetric(r.metrics.speedIndex, 's')}

**Top Opportunities:**
${r.opportunities.slice(0, 5).map(o => `- **${o.title}**: ${o.description.split('.')[0]}`).join('\n') || 'No major opportunities identified.'}
`).join('\n')}

---
*Generated by Playwright Performance Testing Suite*
`;
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { runLighthouse, testSite };
