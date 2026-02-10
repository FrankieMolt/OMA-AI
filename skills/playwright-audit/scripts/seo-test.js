#!/usr/bin/env node
/**
 * SEO Testing Script
 * Validates meta tags, structured data, and SEO best practices
 */

const { chromium } = require('playwright');
const cheerio = require('cheerio');
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

const SEO_RULES = {
  title: {
    minLength: 10,
    maxLength: 70,
    required: true
  },
  metaDescription: {
    minLength: 50,
    maxLength: 160,
    required: true
  },
  h1: {
    required: true,
    maxCount: 1
  }
};

async function analyzeSEO(page, route, baseUrl) {
  const url = `${baseUrl}${route}`;
  
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    const html = await page.content();
    const $ = cheerio.load(html);

    const result = {
      route,
      url,
      status: response.status(),
      seo: {
        title: {
          text: $('title').text().trim(),
          length: $('title').text().trim().length,
          valid: true
        },
        metaDescription: {
          text: $('meta[name="description"]').attr('content') || '',
          length: ($('meta[name="description"]').attr('content') || '').length,
          valid: true
        },
        canonical: $('link[rel="canonical"]').attr('href') || null,
        robots: $('meta[name="robots"]').attr('content') || 'index,follow',
        viewport: $('meta[name="viewport"]').attr('content') || null,
        charset: $('meta[charset]').attr('charset') || $('meta[http-equiv="Content-Type"]').attr('content') || null,
        lang: $('html').attr('lang') || null
      },
      headings: {
        h1: {
          count: $('h1').length,
          texts: $('h1').map((i, el) => $(el).text().trim()).get()
        },
        h2: {
          count: $('h2').length,
          texts: $('h2').map((i, el) => $(el).text().trim()).get().slice(0, 5)
        }
      },
      images: {
        total: $('img').length,
        withoutAlt: $('img:not([alt])').length,
        withoutAltSrc: $('img:not([alt])').map((i, el) => $(el).attr('src')).get().slice(0, 5)
      },
      links: {
        internal: $(`a[href^="/"], a[href^="${baseUrl}"]`).length,
        external: $(`a[href^="http"]:not([href^="${baseUrl}"])`).length,
        withoutTitle: $('a:not([title])').length
      },
      og: {
        title: $('meta[property="og:title"]').attr('content') || null,
        description: $('meta[property="og:description"]').attr('content') || null,
        image: $('meta[property="og:image"]').attr('content') || null,
        url: $('meta[property="og:url"]').attr('content') || null,
        type: $('meta[property="og:type"]').attr('content') || null,
        siteName: $('meta[property="og:site_name"]').attr('content') || null
      },
      twitter: {
        card: $('meta[name="twitter:card"]').attr('content') || null,
        title: $('meta[name="twitter:title"]').attr('content') || null,
        description: $('meta[name="twitter:description"]').attr('content') || null,
        image: $('meta[name="twitter:image"]').attr('content') || null,
        site: $('meta[name="twitter:site"]').attr('content') || null
      },
      structuredData: $('script[type="application/ld+json"]').map((i, el) => {
        try {
          return JSON.parse($(el).html());
        } catch (e) {
          return { error: 'Invalid JSON', content: $(el).html().substring(0, 100) };
        }
      }).get(),
      issues: []
    };

    // Validate SEO rules
    const { seo, headings, images } = result;

    // Title validation
    if (!seo.title.text) {
      result.issues.push({ severity: 'error', message: 'Missing title tag' });
      seo.title.valid = false;
    } else if (seo.title.length < SEO_RULES.title.minLength) {
      result.issues.push({ 
        severity: 'warning', 
        message: `Title too short (${seo.title.length} chars, min ${SEO_RULES.title.minLength})` 
      });
    } else if (seo.title.length > SEO_RULES.title.maxLength) {
      result.issues.push({ 
        severity: 'warning', 
        message: `Title too long (${seo.title.length} chars, max ${SEO_RULES.title.maxLength})` 
      });
    }

    // Meta description validation
    if (!seo.metaDescription.text) {
      result.issues.push({ severity: 'error', message: 'Missing meta description' });
      seo.metaDescription.valid = false;
    } else if (seo.metaDescription.length < SEO_RULES.metaDescription.minLength) {
      result.issues.push({ 
        severity: 'warning', 
        message: `Meta description too short (${seo.metaDescription.length} chars, min ${SEO_RULES.metaDescription.minLength})` 
      });
    } else if (seo.metaDescription.length > SEO_RULES.metaDescription.maxLength) {
      result.issues.push({ 
        severity: 'warning', 
        message: `Meta description too long (${seo.metaDescription.length} chars, max ${SEO_RULES.metaDescription.maxLength})` 
      });
    }

    // H1 validation
    if (headings.h1.count === 0) {
      result.issues.push({ severity: 'error', message: 'Missing H1 tag' });
    } else if (headings.h1.count > SEO_RULES.h1.maxCount) {
      result.issues.push({ 
        severity: 'warning', 
        message: `Multiple H1 tags (${headings.h1.count})` 
      });
    }

    // Images without alt
    if (images.withoutAlt > 0) {
      result.issues.push({ 
        severity: 'warning', 
        message: `${images.withoutAlt} images missing alt text` 
      });
    }

    // Open Graph validation
    if (!og.title || !og.description || !og.image) {
      result.issues.push({ severity: 'warning', message: 'Incomplete Open Graph tags' });
    }

    // Twitter Cards validation
    if (!twitter.card) {
      result.issues.push({ severity: 'info', message: 'Missing Twitter Card meta tags' });
    }

    // Canonical URL
    if (!seo.canonical) {
      result.issues.push({ severity: 'info', message: 'Missing canonical URL' });
    }

    // Viewport
    if (!seo.viewport) {
      result.issues.push({ severity: 'warning', message: 'Missing viewport meta tag' });
    }

    // Calculate score
    const errorCount = result.issues.filter(i => i.severity === 'error').length;
    const warningCount = result.issues.filter(i => i.severity === 'warning').length;
    result.score = Math.max(0, 100 - (errorCount * 15) - (warningCount * 5));

    return result;
  } catch (error) {
    return {
      route,
      url,
      error: error.message,
      score: 0,
      issues: [{ severity: 'error', message: error.message }]
    };
  }
}

async function testSite(siteName, config) {
  log(`\n🔍 Analyzing ${siteName}...`, 'bright');
  log(`URL: ${config.url}`, 'cyan');

  const browser = await chromium.launch();
  const results = {
    siteName,
    url: config.url,
    routes: [],
    summary: {
      averageScore: 0,
      totalErrors: 0,
      totalWarnings: 0,
      totalInfo: 0
    }
  };

  for (const route of config.routes) {
    const page = await browser.newPage();
    const routeResult = await analyzeSEO(page, route, config.url);
    
    results.routes.push(routeResult);
    
    // Update summary
    results.summary.totalErrors += routeResult.issues.filter(i => i.severity === 'error').length;
    results.summary.totalWarnings += routeResult.issues.filter(i => i.severity === 'warning').length;
    results.summary.totalInfo += routeResult.issues.filter(i => i.severity === 'info').length;

    await page.close();
  }

  await browser.close();

  // Calculate average score
  const validScores = results.routes.filter(r => !r.error && r.score !== undefined);
  results.summary.averageScore = validScores.length > 0
    ? Math.round(validScores.reduce((sum, r) => sum + r.score, 0) / validScores.length)
    : 0;

  // Log results
  log('\n📊 Summary:', 'bright');
  log(`  Average SEO Score: ${results.summary.averageScore}/100`, 
    results.summary.averageScore >= 80 ? 'green' : results.summary.averageScore >= 60 ? 'yellow' : 'red');
  log(`  Total Errors: ${results.summary.totalErrors}`, results.summary.totalErrors > 0 ? 'red' : 'green');
  log(`  Total Warnings: ${results.summary.totalWarnings}`, results.summary.totalWarnings > 0 ? 'yellow' : 'green');
  log(`  Routes Analyzed: ${results.routes.length}`, 'cyan');

  // Show issues by route
  const routesWithIssues = results.routes.filter(r => r.issues && r.issues.length > 0);
  if (routesWithIssues.length > 0) {
    log('\n⚠️  Issues Found:', 'yellow');
    routesWithIssues.slice(0, 3).forEach(route => {
      log(`\n  ${route.route} (Score: ${route.score}):`, 'bright');
      route.issues.slice(0, 5).forEach(issue => {
        const color = issue.severity === 'error' ? 'red' : issue.severity === 'warning' ? 'yellow' : 'cyan';
        log(`    [${issue.severity.toUpperCase()}] ${issue.message}`, color);
      });
    });
  }

  return results;
}

async function main() {
  const targetSite = process.argv[2];
  const saveReport = process.argv.includes('--save');
  const verbose = process.argv.includes('--verbose');
  
  log('='.repeat(60), 'bright');
  log('🔍 SEO Testing Suite', 'bright');
  log('Validating meta tags, structured data, and SEO best practices', 'cyan');
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
    const reportDir = path.join(__dirname, '..', 'reports', 'seo');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const timestamp = Date.now();
    const reportPath = path.join(reportDir, `seo-${timestamp}.json`);
    
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    log(`\n💾 Report saved to: ${reportPath}`, 'cyan');

    // Generate markdown report
    const mdPath = path.join(reportDir, `seo-${timestamp}.md`);
    const mdContent = generateMarkdownReport(results, verbose);
    fs.writeFileSync(mdPath, mdContent);
    log(`📝 Markdown report: ${mdPath}`, 'cyan');
  }

  // Final summary
  log('\n' + '='.repeat(60), 'bright');
  log('📈 SEO Summary', 'bright');
  log('='.repeat(60), 'bright');

  results.forEach(result => {
    const { summary } = result;
    const color = summary.averageScore >= 80 ? 'green' : summary.averageScore >= 60 ? 'yellow' : 'red';
    
    log(`${result.siteName}: Score ${summary.averageScore}/100 | ` +
        `Errors: ${summary.totalErrors} | Warnings: ${summary.totalWarnings}`, color);
  });

  // Recommendations
  log('\n💡 Quick SEO Recommendations:', 'bright');
  
  const allIssues = results.flatMap(r => r.routes.flatMap(route => 
    route.issues?.map(i => ({ ...i, site: r.siteName, route: route.route })) || []
  ));

  const commonIssues = {};
  allIssues.forEach(issue => {
    const key = issue.message.split('(')[0].trim();
    commonIssues[key] = (commonIssues[key] || 0) + 1;
  });

  Object.entries(commonIssues)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([issue, count]) => {
      log(`  • ${issue} (${count} occurrences)`, 'yellow');
    });
}

function generateMarkdownReport(results, verbose = false) {
  const date = new Date().toISOString();
  
  return `# SEO Test Report
Generated: ${date}

## Summary

| Site | Avg Score | Errors | Warnings | Routes |
|------|-----------|--------|----------|--------|
${results.map(r => `| ${r.siteName} | ${r.summary.averageScore}/100 | ${r.summary.totalErrors} | ${r.summary.totalWarnings} | ${r.routes.length} |`).join('\n')}

## Detailed Results

${results.map(result => `
### ${result.siteName}

**Base URL:** ${result.url}

**Overall Score:** ${result.summary.averageScore}/100

| Route | Score | Errors | Warnings | Title Length | Meta Desc Length | H1 Count | Images w/o Alt |
|-------|-------|--------|----------|--------------|------------------|----------|----------------|
${result.routes.map(r => `| ${r.route} | ${r.score}/100 | ${r.issues?.filter(i => i.severity === 'error').length || 0} | ${r.issues?.filter(i => i.severity === 'warning').length || 0} | ${r.seo?.title?.length || 0} | ${r.seo?.metaDescription?.length || 0} | ${r.headings?.h1?.count || 0} | ${r.images?.withoutAlt || 0} |`).join('\n')}

**Issues by Route:**
${result.routes.filter(r => r.issues?.length > 0).map(r => `
#### ${r.route}

${r.issues?.map(i => `- **[${i.severity.toUpperCase()}]** ${i.message}`).join('\n') || 'No issues'}
`).join('\n') || 'No issues found.'}

**Open Graph Coverage:**
${result.routes.map(r => `- ${r.route}: ${r.og?.title && r.og?.description && r.og?.image ? '✅ Complete' : '❌ Incomplete'}`).join('\n')}

${verbose ? `
**Structured Data:**
${result.routes.map(r => r.structuredData?.length > 0 ? `- ${r.route}: ${r.structuredData.length} schema(s) found` : `- ${r.route}: No structured data`).join('\n')}
` : ''}
`).join('\n')}

## Recommendations

1. **Fix Critical Issues**: Address all error-level issues first (missing titles, descriptions, H1 tags).
2. **Optimize Meta Tags**: Ensure titles are 50-60 characters and descriptions are 150-160 characters.
3. **Add Alt Text**: All images should have descriptive alt text for accessibility and SEO.
4. **Implement Structured Data**: Add JSON-LD schemas for better search engine understanding.
5. **Complete Open Graph**: Ensure all pages have complete OG tags for social sharing.
6. **Canonical URLs**: Add canonical tags to prevent duplicate content issues.
7. **Mobile Optimization**: Verify viewport meta tag is present on all pages.

---
*Generated by Playwright SEO Testing Suite*
`;
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { analyzeSEO, testSite };
