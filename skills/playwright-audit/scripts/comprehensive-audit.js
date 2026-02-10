#!/usr/bin/env node
/**
 * Comprehensive Site Audit Tool
 * Audits SpendThrone, Lethometry, and OMA-AI
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Site configurations
const SITES = {
  'spendthrone': {
    name: 'SpendThrone',
    url: 'http://localhost:3000',
    routes: ['/', '/about', '/features', '/pricing', '/contact', '/login', '/signup'],
    description: 'Expense management platform'
  },
  'lethometry': {
    name: 'Lethometry',
    url: 'http://localhost:3002',
    routes: ['/', '/about', '/products', '/solutions', '/docs', '/login'],
    description: 'Analytics and metrics platform'
  },
  'oma-ai': {
    name: 'OMA-AI',
    url: 'http://localhost:3001',
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

// Fetch page content
async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.on('timeout', () => reject(new Error('Request timeout')));
  });
}

// Run accessibility test using axe
async function runAccessibilityAudit(site) {
  log(`  ♿ Running accessibility audit for ${site.name}...`, 'cyan');
  
  const violations = [];
  const { chromium } = require('playwright');
  
  try {
    const browser = await chromium.launch();
    
    for (const route of site.routes.slice(0, 4)) {
      const page = await browser.newPage();
      const url = `${site.url}${route}`;
      
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        
        // Inject axe-core
        await page.addScriptTag({
          url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.0/axe.min.js'
        });
        
        // Run axe analysis
        const results = await page.evaluate(async () => {
          return await axe.run();
        });
        
        if (results.violations.length > 0) {
          violations.push({
            route,
            url,
            issues: results.violations.map(v => ({
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
        log(`    ⚠️  Failed to audit ${route}: ${error.message}`, 'yellow');
      }
      
      await page.close();
    }
    
    await browser.close();
  } catch (error) {
    log(`  ❌ Accessibility audit failed: ${error.message}`, 'red');
  }
  
  return {
    violations: violations.reduce((sum, v) => sum + v.issues.length, 0),
    routesTested: site.routes.slice(0, 4).length,
    routesWithIssues: violations.length,
    details: violations
  };
}

// Run SEO audit
async function runSEOAudit(site) {
  log(`  🔍 Running SEO audit for ${site.name}...`, 'cyan');
  
  const cheerio = require('cheerio');
  const routes = [];
  const globalIssues = [];
  
  for (const route of site.routes) {
    const url = `${site.url}${route}`;
    
    try {
      const { body } = await fetchPage(url);
      const $ = cheerio.load(body);
      
      const routeSEO = {
        route,
        url,
        title: $('title').text() || '',
        titleLength: $('title').text().length,
        metaDescription: $('meta[name="description"]').attr('content') || '',
        metaDescriptionLength: ($('meta[name="description"]').attr('content') || '').length,
        h1: $('h1').first().text().trim(),
        h1Count: $('h1').length,
        h2Count: $('h2').length,
        h3Count: $('h3').length,
        imagesWithoutAlt: $('img:not([alt])').length,
        totalImages: $('img').length,
        canonical: $('link[rel="canonical"]').attr('href') || '',
        viewport: $('meta[name="viewport"]').attr('content') || '',
        charset: $('meta[charset]').attr('charset') || $('meta[http-equiv="Content-Type"]').attr('content') || '',
        ogTags: {
          title: $('meta[property="og:title"]').attr('content') || '',
          description: $('meta[property="og:description"]').attr('content') || '',
          image: $('meta[property="og:image"]').attr('content') || '',
          url: $('meta[property="og:url"]').attr('content') || '',
          type: $('meta[property="og:type"]').attr('content') || ''
        },
        twitterTags: {
          card: $('meta[name="twitter:card"]').attr('content') || '',
          title: $('meta[name="twitter:title"]').attr('content') || '',
          description: $('meta[name="twitter:description"]').attr('content') || '',
          image: $('meta[name="twitter:image"]').attr('content') || ''
        },
        structuredData: $('script[type="application/ld+json"]').map((i, el) => $(el).html()).get(),
        lang: $('html').attr('lang') || '',
        issues: []
      };
      
      // Check for SEO issues
      if (!routeSEO.title || routeSEO.titleLength < 10 || routeSEO.titleLength > 70) {
        routeSEO.issues.push({ type: 'error', message: `Title length issue: ${routeSEO.titleLength} characters (should be 10-70)` });
      }
      if (!routeSEO.metaDescription || routeSEO.metaDescriptionLength < 50 || routeSEO.metaDescriptionLength > 160) {
        routeSEO.issues.push({ type: 'warning', message: `Meta description length: ${routeSEO.metaDescriptionLength} characters (should be 50-160)` });
      }
      if (routeSEO.h1Count === 0) {
        routeSEO.issues.push({ type: 'error', message: 'Missing H1 tag' });
      } else if (routeSEO.h1Count > 1) {
        routeSEO.issues.push({ type: 'warning', message: `Multiple H1 tags: ${routeSEO.h1Count}` });
      }
      if (routeSEO.imagesWithoutAlt > 0) {
        routeSEO.issues.push({ type: 'error', message: `${routeSEO.imagesWithoutAlt} images without alt text` });
      }
      if (!routeSEO.viewport) {
        routeSEO.issues.push({ type: 'error', message: 'Missing viewport meta tag' });
      }
      if (!routeSEO.lang) {
        routeSEO.issues.push({ type: 'warning', message: 'Missing HTML lang attribute' });
      }
      if (!routeSEO.ogTags.title) {
        routeSEO.issues.push({ type: 'info', message: 'Missing Open Graph title' });
      }
      if (!routeSEO.twitterTags.card) {
        routeSEO.issues.push({ type: 'info', message: 'Missing Twitter Card tags' });
      }
      
      routes.push(routeSEO);
    } catch (error) {
      globalIssues.push({ route, error: error.message });
    }
  }
  
  // Calculate SEO score
  const totalIssues = routes.reduce((sum, r) => sum + r.issues.filter(i => i.type === 'error').length, 0);
  const maxScore = 100;
  const deductions = totalIssues * 10;
  const score = Math.max(0, maxScore - deductions);
  
  return {
    score,
    routes,
    globalIssues,
    summary: {
      totalRoutes: routes.length,
      routesWithErrors: routes.filter(r => r.issues.some(i => i.type === 'error')).length,
      totalErrors: routes.reduce((sum, r) => sum + r.issues.filter(i => i.type === 'error').length, 0),
      totalWarnings: routes.reduce((sum, r) => sum + r.issues.filter(i => i.type === 'warning').length, 0)
    }
  };
}

// Run performance audit
async function runPerformanceAudit(site) {
  log(`  📊 Running performance audit for ${site.name}...`, 'cyan');
  
  const metrics = {
    responseTimes: [],
    pageSizes: [],
    resourceCounts: { scripts: 0, stylesheets: 0, images: 0 }
  };
  
  const cheerio = require('cheerio');
  
  for (const route of site.routes.slice(0, 3)) {
    const url = `${site.url}${route}`;
    const startTime = Date.now();
    
    try {
      const { body } = await fetchPage(url);
      const loadTime = Date.now() - startTime;
      const $ = cheerio.load(body);
      
      metrics.responseTimes.push({ route, time: loadTime });
      metrics.pageSizes.push({ route, size: body.length });
      metrics.resourceCounts.scripts += $('script[src]').length;
      metrics.resourceCounts.stylesheets += $('link[rel="stylesheet"]').length;
      metrics.resourceCounts.images += $('img').length;
    } catch (error) {
      metrics.responseTimes.push({ route, time: -1, error: error.message });
    }
  }
  
  // Calculate average response time
  const validTimes = metrics.responseTimes.filter(t => t.time > 0).map(t => t.time);
  const avgResponseTime = validTimes.length > 0 ? validTimes.reduce((a, b) => a + b, 0) / validTimes.length : 0;
  
  // Simple performance score based on response time
  let score = 100;
  if (avgResponseTime > 500) score -= 10;
  if (avgResponseTime > 1000) score -= 20;
  if (avgResponseTime > 2000) score -= 30;
  if (metrics.pageSizes.some(p => p.size > 500000)) score -= 10;
  
  return {
    score: Math.max(0, score),
    avgResponseTime: Math.round(avgResponseTime),
    metrics
  };
}

// Run security audit
async function runSecurityAudit(site) {
  log(`  🔒 Running security audit for ${site.name}...`, 'cyan');
  
  const issues = [];
  const checks = {
    https: site.url.startsWith('https'),
    headers: {},
    cookies: {},
    forms: []
  };
  
  try {
    const { headers } = await fetchPage(site.url);
    checks.headers = {
      'content-security-policy': headers['content-security-policy'] || null,
      'x-frame-options': headers['x-frame-options'] || null,
      'x-content-type-options': headers['x-content-type-options'] || null,
      'strict-transport-security': headers['strict-transport-security'] || null,
      'referrer-policy': headers['referrer-policy'] || null
    };
    
    // Check for missing security headers
    if (!checks.headers['content-security-policy']) {
      issues.push({ type: 'warning', message: 'Missing Content-Security-Policy header' });
    }
    if (!checks.headers['x-frame-options']) {
      issues.push({ type: 'warning', message: 'Missing X-Frame-Options header (clickjacking protection)' });
    }
    if (!checks.headers['x-content-type-options']) {
      issues.push({ type: 'warning', message: 'Missing X-Content-Type-Options header' });
    }
    if (!checks.https) {
      issues.push({ type: 'error', message: 'Site not using HTTPS' });
    }
  } catch (error) {
    issues.push({ type: 'error', message: `Security check failed: ${error.message}` });
  }
  
  return {
    checks,
    issues,
    score: Math.max(0, 100 - issues.filter(i => i.type === 'error').length * 20 - issues.filter(i => i.type === 'warning').length * 5)
  };
}

// Run functional audit
async function runFunctionalAudit(site) {
  log(`  ✅ Running functional audit for ${site.name}...`, 'cyan');
  
  const results = {
    brokenLinks: [],
    brokenRoutes: [],
    workingRoutes: [],
    forms: []
  };
  
  // Check all routes
  for (const route of site.routes) {
    const url = `${site.url}${route}`;
    
    try {
      const { status } = await fetchPage(url);
      
      if (status >= 200 && status < 400) {
        results.workingRoutes.push({ route, status });
      } else {
        results.brokenRoutes.push({ route, status });
      }
    } catch (error) {
      results.brokenRoutes.push({ route, error: error.message });
    }
  }
  
  return results;
}

// Generate HTML report
function generateHTMLReport(site, results, reportDir) {
  const getScoreClass = (score) => {
    if (score >= 90) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'fair';
    return 'poor';
  };
  
  const getGrade = (score) => {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'B+';
    if (score >= 80) return 'B';
    if (score >= 75) return 'C+';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };
  
  const overallScore = Math.round(
    (results.performance.score + results.seo.score + results.security.score) / 3
  );
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Report - ${site.name}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
      color: #e2e8f0;
      line-height: 1.6;
      min-height: 100vh;
    }
    .container { max-width: 1400px; margin: 0 auto; padding: 2rem; }
    header { 
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      padding: 3rem;
      border-radius: 20px;
      margin-bottom: 2rem;
      box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.25);
    }
    h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .subtitle { opacity: 0.9; font-size: 1.1rem; }
    .timestamp { opacity: 0.7; margin-top: 0.5rem; }
    .grade-display {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      font-size: 3rem;
      font-weight: bold;
      margin: 1rem 0;
      border: 4px solid;
    }
    .grade-a { background: rgba(34, 197, 94, 0.2); border-color: #22c55e; color: #22c55e; }
    .grade-b { background: rgba(59, 130, 246, 0.2); border-color: #3b82f6; color: #3b82f6; }
    .grade-c { background: rgba(245, 158, 11, 0.2); border-color: #f59e0b; color: #f59e0b; }
    .grade-d, .grade-f { background: rgba(239, 68, 68, 0.2); border-color: #ef4444; color: #ef4444; }
    .score-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    .score-card {
      background: rgba(30, 41, 59, 0.8);
      backdrop-filter: blur(10px);
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: transform 0.2s;
    }
    .score-card:hover { transform: translateY(-4px); }
    .score-card h3 { color: #94a3b8; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem; }
    .score-value { font-size: 3.5rem; font-weight: bold; }
    .score-excellent { color: #22c55e; }
    .score-good { color: #3b82f6; }
    .score-fair { color: #f59e0b; }
    .score-poor { color: #ef4444; }
    .section { 
      background: rgba(30, 41, 59, 0.6);
      backdrop-filter: blur(10px);
      padding: 2rem;
      border-radius: 16px;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .section h2 { 
      color: #60a5fa; 
      margin-bottom: 1.5rem; 
      display: flex; 
      align-items: center; 
      gap: 0.75rem;
      font-size: 1.5rem;
    }
    .issues { margin-top: 1rem; }
    .issue { 
      background: rgba(15, 23, 42, 0.8);
      padding: 1rem 1.25rem;
      border-radius: 10px;
      margin-bottom: 0.75rem;
      border-left: 4px solid;
    }
    .issue-error { border-left-color: #ef4444; }
    .issue-warning { border-left-color: #f59e0b; }
    .issue-info { border-left-color: #3b82f6; }
    .issue strong { color: #f8fafc; display: block; margin-bottom: 0.25rem; }
    .issue p { color: #94a3b8; font-size: 0.9rem; }
    .metric { 
      display: flex; 
      justify-content: space-between;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .metric:last-child { border-bottom: none; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    th { color: #94a3b8; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; }
    .badge {
      display: inline-block;
      padding: 0.375rem 1rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .badge-success { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
    .badge-warning { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
    .badge-error { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
    .badge-info { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
    .recommendations {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
      border: 1px solid rgba(139, 92, 246, 0.3);
    }
    .recommendations h2 { color: #a78bfa; }
    .rec-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      background: rgba(15, 23, 42, 0.5);
      border-radius: 10px;
      margin-bottom: 0.75rem;
    }
    .rec-priority {
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: bold;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .priority-p0 { background: #ef4444; color: white; }
    .priority-p1 { background: #f59e0b; color: white; }
    .priority-p2 { background: #3b82f6; color: white; }
    footer { text-align: center; margin-top: 3rem; opacity: 0.6; padding: 2rem; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔍 ${site.name} Audit Report</h1>
      <p class="subtitle">${site.description}</p>
      <p class="subtitle">${site.url}</p>
      <p class="timestamp">Generated: ${new Date().toLocaleString()}</p>
      
      <div style="display: flex; align-items: center; gap: 2rem; margin-top: 1.5rem;">
        <div class="grade-display grade-${getGrade(overallScore).toLowerCase().replace('+', '')}">
          ${getGrade(overallScore)}
        </div>
        <div>
          <h2 style="margin: 0;">Overall Score: ${overallScore}/100</h2>
          <p class="subtitle">Combined performance, SEO, and security metrics</p>
        </div>
      </div>
    </header>

    <div class="score-grid">
      <div class="score-card">
        <h3>Performance</h3>
        <div class="score-value score-${getScoreClass(results.performance.score)}">${results.performance.score}</div>
        <p style="margin-top: 0.5rem; color: #94a3b8;">Avg response: ${results.performance.avgResponseTime}ms</p>
      </div>
      <div class="score-card">
        <h3>Accessibility</h3>
        <div class="score-value score-${results.accessibility.violations === 0 ? 'excellent' : 'fair'}">${results.accessibility.violations}</div>
        <p style="margin-top: 0.5rem; color: #94a3b8;">violations found</p>
      </div>
      <div class="score-card">
        <h3>SEO Score</h3>
        <div class="score-value score-${getScoreClass(results.seo.score)}">${results.seo.score}</div>
        <p style="margin-top: 0.5rem; color: #94a3b8;">${results.seo.summary.totalErrors} errors, ${results.seo.summary.totalWarnings} warnings</p>
      </div>
      <div class="score-card">
        <h3>Security</h3>
        <div class="score-value score-${getScoreClass(results.security.score)}">${results.security.score}</div>
        <p style="margin-top: 0.5rem; color: #94a3b8;">${results.security.issues.filter(i => i.type === 'error').length} critical issues</p>
      </div>
    </div>

    <div class="section">
      <h2>📊 Performance Metrics</h2>
      <div class="metric">
        <span>Average Response Time</span>
        <span class="score-${results.performance.avgResponseTime < 500 ? 'excellent' : results.performance.avgResponseTime < 1000 ? 'good' : 'fair'}">${results.performance.avgResponseTime}ms</span>
      </div>
      <div class="metric">
        <span>External Scripts</span>
        <span>${results.performance.metrics.resourceCounts.scripts}</span>
      </div>
      <div class="metric">
        <span>Stylesheets</span>
        <span>${results.performance.metrics.resourceCounts.stylesheets}</span>
      </div>
      <div class="metric">
        <span>Images</span>
        <span>${results.performance.metrics.resourceCounts.images}</span>
      </div>
    </div>

    <div class="section">
      <h2>♿ Accessibility Issues</h2>
      ${results.accessibility.violations === 0 ? 
        '<p class="badge badge-success">✅ No accessibility violations found!</p>' :
        `<div class="issues">
          ${results.accessibility.details.flatMap(r => r.issues.map(i => `
            <div class="issue issue-${i.impact === 'critical' ? 'error' : 'warning'}">
              <strong>${i.help}</strong>
              <p>${i.description} (${r.route})</p>
            </div>
          `)).join('')}
        </div>`
      }
    </div>

    <div class="section">
      <h2>🔍 SEO Analysis</h2>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Title</th>
            <th>Meta Description</th>
            <th>H1 Count</th>
            <th>Issues</th>
          </tr>
        </thead>
        <tbody>
          ${results.seo.routes.map(route => `
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
      ${results.seo.routes.filter(r => r.issues.some(i => i.type === 'error')).length > 0 ? `
        <div class="issues" style="margin-top: 1.5rem;">
          <h3 style="margin-bottom: 1rem; color: #f8fafc;">Critical SEO Issues</h3>
          ${results.seo.routes.filter(r => r.issues.some(i => i.type === 'error')).flatMap(r => 
            r.issues.filter(i => i.type === 'error').map(issue => `
              <div class="issue issue-error">
                <strong>${r.route}</strong>
                <p>${issue.message}</p>
              </div>
            `)
          ).join('')}
        </div>
      ` : ''}
    </div>

    <div class="section">
      <h2>🔒 Security Analysis</h2>
      ${results.security.issues.length === 0 ?
        '<p class="badge badge-success">✅ No security issues found!</p>' :
        `<div class="issues">
          ${results.security.issues.map(i => `
            <div class="issue issue-${i.type}">
              <strong>${i.type.toUpperCase()}</strong>
              <p>${i.message}</p>
            </div>
          `).join('')}
        </div>`
      }
      <div style="margin-top: 1.5rem;">
        <h3 style="margin-bottom: 1rem; color: #94a3b8;">Security Headers</h3>
        ${Object.entries(results.security.checks.headers).map(([header, value]) => `
          <div class="metric">
            <span>${header}</span>
            <span class="badge ${value ? 'badge-success' : 'badge-warning'}">${value ? 'Present' : 'Missing'}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <h2>✅ Functional Tests</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        <div style="text-align: center; padding: 1.5rem; background: rgba(34, 197, 94, 0.1); border-radius: 10px;">
          <div style="font-size: 2rem; font-weight: bold; color: #22c55e;">${results.functional.workingRoutes.length}</div>
          <div style="color: #94a3b8;">Working Routes</div>
        </div>
        <div style="text-align: center; padding: 1.5rem; background: rgba(239, 68, 68, 0.1); border-radius: 10px;">
          <div style="font-size: 2rem; font-weight: bold; color: #ef4444;">${results.functional.brokenRoutes.length}</div>
          <div style="color: #94a3b8;">Broken Routes</div>
        </div>
      </div>
      ${results.functional.brokenRoutes.length > 0 ? `
        <div class="issues" style="margin-top: 1.5rem;">
          <h3 style="margin-bottom: 1rem;">Broken Routes</h3>
          ${results.functional.brokenRoutes.map(r => `
            <div class="issue issue-error">
              <strong>${r.route}</strong>
              <p>Status: ${r.status || r.error}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>

    <div class="section recommendations">
      <h2>💡 Top Recommendations</h2>
      ${generateRecommendations(results, site).map(rec => `
        <div class="rec-item">
          <span class="rec-priority priority-${rec.priority.toLowerCase()}">${rec.priority}</span>
          <div>
            <strong style="color: #f8fafc;">${rec.title}</strong>
            <p style="color: #94a3b8; margin-top: 0.25rem;">${rec.description}</p>
          </div>
        </div>
      `).join('')}
    </div>

    <footer>
      <p>Generated by Comprehensive Site Audit System</p>
      <p style="margin-top: 0.5rem; font-size: 0.875rem;">${new Date().toISOString()}</p>
    </footer>
  </div>
</body>
</html>`;
  
  fs.writeFileSync(path.join(reportDir, 'index.html'), html);
}

function generateRecommendations(results, site) {
  const recs = [];
  
  // SEO recommendations
  const seoErrors = results.seo.routes.flatMap(r => 
    r.issues.filter(i => i.type === 'error').map(i => ({ route: r.route, issue: i }))
  );
  
  if (seoErrors.some(e => e.issue.message.includes('images without alt'))) {
    recs.push({
      priority: 'P0',
      title: 'Fix Missing Image Alt Text',
      description: 'Add descriptive alt attributes to all images for accessibility and SEO'
    });
  }
  
  if (seoErrors.some(e => e.issue.message.includes('Missing H1'))) {
    recs.push({
      priority: 'P0',
      title: 'Add H1 Tags to All Pages',
      description: 'Every page should have exactly one H1 tag describing the main content'
    });
  }
  
  if (results.seo.routes.some(r => !r.viewport)) {
    recs.push({
      priority: 'P0',
      title: 'Add Viewport Meta Tag',
      description: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0"> to all pages for mobile optimization'
    });
  }
  
  // Security recommendations
  if (results.security.issues.some(i => i.message.includes('HTTPS'))) {
    recs.push({
      priority: 'P0',
      title: 'Enable HTTPS',
      description: 'Configure SSL/TLS certificates and redirect HTTP to HTTPS'
    });
  }
  
  if (!results.security.checks.headers['content-security-policy']) {
    recs.push({
      priority: 'P1',
      title: 'Implement Content Security Policy',
      description: 'Add CSP headers to prevent XSS and data injection attacks'
    });
  }
  
  if (!results.security.checks.headers['x-frame-options']) {
    recs.push({
      priority: 'P1',
      title: 'Add X-Frame-Options Header',
      description: 'Prevent clickjacking attacks by setting X-Frame-Options header'
    });
  }
  
  // Performance recommendations
  if (results.performance.avgResponseTime > 1000) {
    recs.push({
      priority: 'P1',
      title: 'Optimize Page Load Speed',
      description: `Current average response time is ${results.performance.avgResponseTime}ms. Target under 500ms.`
    });
  }
  
  // Accessibility recommendations
  if (results.accessibility.violations > 0) {
    recs.push({
      priority: 'P0',
      title: 'Fix Accessibility Violations',
      description: `${results.accessibility.violations} accessibility issues found that may block users with disabilities`
    });
  }
  
  // SEO enhancements
  if (results.seo.routes.some(r => !r.ogTags.title)) {
    recs.push({
      priority: 'P2',
      title: 'Add Open Graph Meta Tags',
      description: 'Implement og:title, og:description, og:image for better social media sharing'
    });
  }
  
  if (results.seo.routes.some(r => !r.structuredData || r.structuredData.length === 0)) {
    recs.push({
      priority: 'P2',
      title: 'Implement Structured Data',
      description: 'Add JSON-LD schema markup for better search engine understanding'
    });
  }
  
  return recs.slice(0, 8); // Limit to top 8 recommendations
}

// Main audit function
async function auditSite(siteKey) {
  const site = SITES[siteKey];
  logSection(`🔍 Auditing ${site.name}`);
  log(`URL: ${site.url}`, 'cyan');
  
  const timestamp = Date.now();
  const reportDir = path.join(__dirname, '..', 'reports', `${siteKey}-${timestamp}`);
  fs.mkdirSync(reportDir, { recursive: true });
  
  const results = {
    site: site.name,
    url: site.url,
    timestamp: new Date().toISOString(),
    performance: await runPerformanceAudit(site),
    accessibility: await runAccessibilityAudit(site),
    seo: await runSEOAudit(site),
    security: await runSecurityAudit(site),
    functional: await runFunctionalAudit(site)
  };
  
  // Save JSON results
  fs.writeFileSync(path.join(reportDir, 'results.json'), JSON.stringify(results, null, 2));
  
  // Generate HTML report
  generateHTMLReport(site, results, reportDir);
  
  log(`\n  ✅ Report saved to: ${reportDir}`, 'green');
  
  return results;
}

// Generate summary report
function generateSummaryReport(allResults) {
  const summaryDir = path.join(__dirname, '..', 'reports');
  const timestamp = Date.now();
  
  // Calculate overall grades
  const getGrade = (score) => {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'B+';
    if (score >= 80) return 'B';
    if (score >= 75) return 'C+';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };
  
  const siteSummaries = Object.entries(allResults).map(([key, results]) => {
    const overallScore = Math.round(
      (results.performance.score + results.seo.score + results.security.score) / 3
    );
    
    return {
      name: results.site,
      url: results.url,
      grade: getGrade(overallScore),
      overallScore,
      performance: results.performance.score,
      accessibility: results.accessibility.violations,
      seo: results.seo.score,
      security: results.security.score,
      errors: results.seo.summary.totalErrors + results.security.issues.filter(i => i.type === 'error').length,
      warnings: results.seo.summary.totalWarnings + results.security.issues.filter(i => i.type === 'warning').length
    };
  });
  
  // Generate summary HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Site Audit Summary Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
      color: #e2e8f0;
      line-height: 1.6;
      min-height: 100vh;
    }
    .container { max-width: 1400px; margin: 0 auto; padding: 2rem; }
    header { 
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      padding: 3rem;
      border-radius: 20px;
      margin-bottom: 2rem;
      text-align: center;
    }
    h1 { font-size: 3rem; margin-bottom: 0.5rem; }
    .subtitle { opacity: 0.9; font-size: 1.25rem; }
    .timestamp { opacity: 0.7; margin-top: 0.5rem; }
    .sites-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    .site-card {
      background: rgba(30, 41, 59, 0.8);
      backdrop-filter: blur(10px);
      padding: 2rem;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: transform 0.2s;
    }
    .site-card:hover { transform: translateY(-4px); }
    .site-card h2 { color: #60a5fa; margin-bottom: 0.5rem; }
    .grade {
      font-size: 4rem;
      font-weight: bold;
      text-align: center;
      margin: 1rem 0;
      padding: 1rem;
      border-radius: 16px;
    }
    .grade-a { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
    .grade-b { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
    .grade-c { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
    .grade-d, .grade-f { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
    .metrics {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .metric-box {
      background: rgba(15, 23, 42, 0.5);
      padding: 1rem;
      border-radius: 10px;
      text-align: center;
    }
    .metric-value { font-size: 1.5rem; font-weight: bold; }
    .metric-label { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; }
    .priority-section {
      background: rgba(30, 41, 59, 0.6);
      padding: 2rem;
      border-radius: 16px;
      margin: 1.5rem 0;
    }
    .priority-section h2 { color: #f87171; margin-bottom: 1.5rem; }
    .priority-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(15, 23, 42, 0.5);
      border-radius: 10px;
      margin-bottom: 0.75rem;
    }
    .priority-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: bold;
    }
    .p0 { background: #ef4444; }
    .p1 { background: #f59e0b; }
    .p2 { background: #3b82f6; }
    footer { text-align: center; margin-top: 3rem; opacity: 0.6; padding: 2rem; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🎭 Site Audit Summary</h1>
      <p class="subtitle">Comprehensive audit of all three sites</p>
      <p class="timestamp">Generated: ${new Date().toLocaleString()}</p>
    </header>

    <div class="sites-grid">
      ${siteSummaries.map(site => `
        <div class="site-card">
          <h2>${site.name}</h2>
          <p style="color: #94a3b8; margin-bottom: 1rem;">${site.url}</p>
          <div class="grade grade-${site.grade.toLowerCase().replace('+', '')}">${site.grade}</div>
          <p style="text-align: center; color: #94a3b8;">Overall Score: ${site.overallScore}/100</p>
          <div class="metrics">
            <div class="metric-box">
              <div class="metric-value" style="color: ${site.performance >= 90 ? '#22c55e' : site.performance >= 70 ? '#f59e0b' : '#ef4444'}">${site.performance}</div>
              <div class="metric-label">Performance</div>
            </div>
            <div class="metric-box">
              <div class="metric-value" style="color: ${site.accessibility === 0 ? '#22c55e' : '#f59e0b'}">${site.accessibility}</div>
              <div class="metric-label">A11y Issues</div>
            </div>
            <div class="metric-box">
              <div class="metric-value" style="color: ${site.seo >= 90 ? '#22c55e' : site.seo >= 70 ? '#f59e0b' : '#ef4444'}">${site.seo}</div>
              <div class="metric-label">SEO Score</div>
            </div>
            <div class="metric-box">
              <div class="metric-value" style="color: ${site.security >= 90 ? '#22c55e' : site.security >= 70 ? '#f59e0b' : '#ef4444'}">${site.security}</div>
              <div class="metric-label">Security</div>
            </div>
          </div>
          <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center;">
            <span style="background: rgba(239, 68, 68, 0.2); color: #ef4444; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.875rem;">${site.errors} Errors</span>
            <span style="background: rgba(245, 158, 11, 0.2); color: #f59e0b; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.875rem;">${site.warnings} Warnings</span>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="priority-section">
      <h2>🚨 Critical Issues Summary (P0)</h2>
      ${Object.entries(allResults).flatMap(([key, results]) => {
        const site = SITES[key];
        const p0Issues = [];
        
        // SEO critical issues
        results.seo.routes.forEach(r => {
          r.issues.filter(i => i.type === 'error').forEach(i => {
            p0Issues.push({ site: site.name, route: r.route, issue: i.message });
          });
        });
        
        // Security critical issues
        results.security.issues.filter(i => i.type === 'error').forEach(i => {
          p0Issues.push({ site: site.name, route: '/', issue: i.message });
        });
        
        return p0Issues.map(i => `
          <div class="priority-item">
            <span class="priority-badge p0">P0</span>
            <div>
              <strong style="color: #f8fafc;">${i.site} - ${i.route}</strong>
              <p style="color: #94a3b8; margin-top: 0.25rem;">${i.issue}</p>
            </div>
          </div>
        `);
      }).join('') || '<p style="color: #22c55e;">✅ No critical P0 issues found!</p>'}
    </div>

    <footer>
      <p>Generated by Comprehensive Site Audit System</p>
    </footer>
  </div>
</body>
</html>`;
  
  fs.writeFileSync(path.join(summaryDir, `summary-${timestamp}.html`), html);
  
  return { siteSummaries, htmlPath: path.join(summaryDir, `summary-${timestamp}.html`) };
}

// Main execution
async function main() {
  logSection('🎭 Comprehensive Site Audit');
  log('Auditing all three sites...\n', 'cyan');
  
  const allResults = {};
  
  for (const siteKey of Object.keys(SITES)) {
    try {
      allResults[siteKey] = await auditSite(siteKey);
    } catch (error) {
      log(`❌ Failed to audit ${siteKey}: ${error.message}`, 'red');
      console.error(error);
    }
  }
  
  // Generate summary
  const summary = generateSummaryReport(allResults);
  
  logSection('✅ Audit Complete!');
  log(`Summary report: ${summary.htmlPath}`, 'magenta');
  log('\n📊 Results Summary:', 'bright');
  
  for (const site of summary.siteSummaries) {
    log(`  ${site.name}: Grade ${site.grade} (${site.overallScore}/100) - ${site.errors} errors, ${site.warnings} warnings`, 
      site.grade.startsWith('A') ? 'green' : site.grade.startsWith('B') ? 'yellow' : 'red');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { auditSite, SITES };