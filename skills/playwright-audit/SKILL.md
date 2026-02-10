# Playwright Audit System

Automated testing and auditing system for web applications using Playwright. Tests performance, accessibility, SEO, and visual regression across all three sites: SpendThrone, Lethometry, and OMA-AI.

## Overview

This skill provides comprehensive automated testing for web applications:

- **Performance Testing**: Lighthouse-based Core Web Vitals analysis
- **Accessibility Testing**: WCAG 2.1 AA compliance checks using axe-core
- **SEO Testing**: Meta tag validation and structured data analysis
- **Visual Testing**: Cross-device screenshot capture for regression testing
- **Mobile Responsiveness**: Testing across desktop, laptop, tablet, and mobile viewports

## Sites Tested

| Site | URL | Routes |
|------|-----|--------|
| SpendThrone | https://spendthrone.com | /, /about, /features, /pricing, /contact, /login, /signup |
| Lethometry | https://lethometry.com | /, /about, /products, /solutions, /docs, /login |
| OMA-AI | https://oma-ai.com | /, /about, /features, /pricing, /contact, /login, /dashboard |

## Installation

```bash
cd /home/nosyt/.openclaw/workspace/skills/playwright-audit
npm install
npx playwright install chromium
```

## Usage

### Run Complete Audit (All Sites)

```bash
npm run audit:all
# or
node scripts/audit-all.js
```

### Audit Single Site

```bash
npm run audit:site oma-ai
# or
node scripts/audit-site.js oma-ai
```

Available sites: `spendthrone`, `lethometry`, `oma-ai`

### Run Individual Tests

```bash
# Performance testing only
npm run test:performance
node scripts/performance-test.js [site-name] --save

# Accessibility testing only
npm run test:accessibility
node scripts/accessibility-test.js [site-name] --save

# SEO testing only
npm run test:seo
node scripts/seo-test.js [site-name] --save --verbose
```

### Options

- `--save`: Save detailed reports to `reports/` directory
- `--verbose`: Include additional details in reports

## Reports

After running audits, reports are generated in:

```
reports/
├── {site-name}-{timestamp}/
│   ├── index.html              # Interactive HTML report
│   ├── results.json            # Full JSON results
│   ├── lighthouse-report.json  # Lighthouse raw data
│   ├── accessibility-report.json
│   ├── seo-report.json
│   └── screenshots/
│       ├── home-desktop.png
│       ├── home-mobile.png
│       └── ...
├── performance/
│   ├── performance-{timestamp}.json
│   └── performance-{timestamp}.md
├── accessibility/
│   ├── a11y-{timestamp}.json
│   └── a11y-{timestamp}.md
├── seo/
│   ├── seo-{timestamp}.json
│   └── seo-{timestamp}.md
└── summary-{timestamp}.json
```

## Configuration

### Environment Variables

Set custom URLs via environment variables:

```bash
export SPENDTHRONE_URL=https://staging.spendthrone.com
export LETHOMETRY_URL=https://staging.lethometry.com
export OMAAI_URL=https://staging.oma-ai.com
```

### Custom Routes

Edit `scripts/audit-all.js` to modify tested routes:

```javascript
const SITES = {
  'oma-ai': {
    name: 'OMA-AI',
    url: 'https://oma-ai.com',
    routes: ['/', '/about', '/new-route'],  // Add custom routes
    description: 'AI-powered automation platform'
  }
};
```

### Playwright Configuration

Edit `playwright.config.js` to adjust:
- Viewport sizes
- Browser settings
- Parallel workers
- Timeouts

## Test Categories

### Performance Tests

Measures:
- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **TTI** (Time to Interactive): < 3.8s
- **TBT** (Total Blocking Time): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Speed Index**: < 3.4s

Scoring:
- 90-100: Good (Green)
- 70-89: Needs Improvement (Yellow)
- 0-69: Poor (Red)

### Accessibility Tests

Validates WCAG 2.1 AA compliance:
- Color contrast ratios
- Keyboard navigation
- Screen reader compatibility
- Form labels and ARIA attributes
- Image alt text
- Focus indicators

Impact Levels:
- **Critical**: Blocks access for users
- **Serious**: Major usability issues
- **Moderate**: Minor inconvenience
- **Minor**: Cosmetic issues

### SEO Tests

Validates:
- Title tags (10-70 characters)
- Meta descriptions (50-160 characters)
- H1 tag usage (exactly 1 per page)
- Image alt attributes
- Canonical URLs
- Open Graph tags
- Twitter Card meta tags
- Structured data (JSON-LD)
- Viewport meta tag

### Visual Tests

Captures screenshots at multiple viewports:
- **Desktop**: 1920×1080
- **Laptop**: 1366×768
- **Tablet**: 768×1024
- **Mobile**: 375×667

## Output Examples

### Console Output

```
============================================================
🔍 Playwright Audit System
============================================================

🔍 Auditing OMA-AI
URL: https://oma-ai.com
Routes: /, /about, /features, /pricing, /contact, /login, /dashboard
Description: AI-powered automation platform

📊 Running Performance Tests...
✅ Performance: 87/100

♿ Running Accessibility Tests...
✅ Accessibility: 3 violations

🔍 Running SEO Tests...
✅ SEO: 95/100

📸 Running Visual Tests...
✅ Visual: 28 screenshots captured

📄 Report saved to: reports/oma-ai-1707580800000
```

### HTML Report Features

The generated HTML reports include:
- Score cards for all test categories
- Detailed Core Web Vitals metrics
- List of accessibility violations with severity
- SEO issues by route
- Screenshots gallery
- Recommendations for improvements

## Integration

### CI/CD Pipeline

```yaml
# Example GitHub Actions workflow
- name: Run Playwright Audits
  run: |
    cd skills/playwright-audit
    npm ci
    npx playwright install chromium
    npm run audit:all
  
- name: Upload Reports
  uses: actions/upload-artifact@v3
  with:
    name: audit-reports
    path: skills/playwright-audit/reports/
```

### Scheduled Audits

Add to crontab for daily audits:

```bash
0 9 * * * cd /home/nosyt/.openclaw/workspace/skills/playwright-audit && npm run audit:all >> /var/log/audits.log 2>&1
```

## Troubleshooting

### Chrome/Chromium Not Found

```bash
npx playwright install chromium
```

### Timeout Errors

Increase timeouts in `playwright.config.js`:

```javascript
use: {
  actionTimeout: 30000,
  navigationTimeout: 60000,
}
```

### Memory Issues

Run with fewer workers:

```bash
npx playwright test --workers=1
```

## Dependencies

| Package | Purpose |
|---------|---------|
| `@playwright/test` | Browser automation |
| `lighthouse` | Performance auditing |
| `chrome-launcher` | Launch Chrome for Lighthouse |
| `axe-core` | Accessibility testing engine |
| `axe-playwright` | axe-core Playwright integration |
| `cheerio` | Server-side HTML parsing |

## Scripts Reference

| Script | Description |
|--------|-------------|
| `audit:all` | Run complete audit on all sites |
| `audit:site` | Audit single site |
| `test:performance` | Performance tests only |
| `test:accessibility` | Accessibility tests only |
| `test:seo` | SEO tests only |
| `install:browsers` | Install Playwright browsers |

## File Structure

```
playwright-audit/
├── SKILL.md                      # This documentation
├── package.json                  # Dependencies and scripts
├── playwright.config.js          # Playwright configuration
├── scripts/
│   ├── audit-all.js             # Main audit runner
│   ├── audit-site.js            # Single site audit
│   ├── performance-test.js      # Performance testing
│   ├── accessibility-test.js    # Accessibility checks
│   └── seo-test.js              # SEO validation
├── reports/                      # Generated reports (gitignored)
└── screenshots/                  # Visual test screenshots
```

## Best Practices

1. **Run audits regularly** (daily/weekly) to catch regressions
2. **Review HTML reports** for visual issues and recommendations
3. **Fix critical accessibility issues first** - they block users
4. **Track scores over time** to measure improvements
5. **Use staging URLs** for testing before production
6. **Archive old reports** for historical comparison

## Support

For issues or questions, check:
- Playwright docs: https://playwright.dev
- Lighthouse docs: https://developer.chrome.com/docs/lighthouse
- axe-core rules: https://dequeuniversity.com/rules/axe/4.8
