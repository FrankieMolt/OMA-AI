# Playwright Audit Skill

**Description:** Automated browser testing and auditing using Playwright for comprehensive website quality checks, performance analysis, and bug detection.

## What This Skill Does

- **Automated E2E Testing:** Full user journey testing across all sites
- **Performance Audits:** Load times, Core Web Vitals, resource optimization
- **Accessibility Checks:** WCAG 2.1 AA compliance, screen reader testing
- **SEO Audits:** Meta tags, structured data, sitemap validation
- **Visual Regression:** Screenshot comparison for UI consistency
- **Cross-browser Testing:** Chrome, Firefox, Safari compatibility
- **Mobile Responsiveness:** Tablet, phone, desktop view testing

## Usage

```bash
cd skills/playwright-audit

# Run full audit of all sites
npm run audit:all

# Audit specific site
npm run audit:spendthrone
npm run audit:lethometry  
npm run audit:oma-ai

# Generate detailed report
npm run report:generate

# Visual regression testing
npm run test:visual

# Performance profiling
npm run test:performance

# Accessibility compliance
npm run test:a11y

# SEO validation
npm run test:seo
```

## Configuration

Create `audit.config.js` in project root:

```javascript
module.exports = {
  sites: {
    spendthrone: {
      url: 'http://localhost:3000',
      routes: ['/marketplace', '/tech-gadgets', '/home-living'],
      breakpoints: ['mobile', 'tablet', 'desktop']
    },
    lethometry: {
      url: 'http://localhost:3002', 
      routes: ['/ai-philosopher', '/experiments/trolley-problem', '/discussions'],
      breakpoints: ['mobile', 'tablet', 'desktop']
    },
    omaAi: {
      url: 'http://localhost:3001',
      routes: ['/dashboard', '/services', '/tasks'],
      breakpoints: ['mobile', 'tablet', 'desktop']
    }
  },
  thresholds: {
    performance: 85,
    accessibility: 95,
    seo: 90,
    bestPractices: 85
  }
};
```

## Test Coverage

### Critical User Journeys
- Product discovery → Details → Cart → Checkout
- Registration → Login → Dashboard usage
- Form submissions → Error handling
- Search and filter functionality
- Responsive navigation

### Performance Metrics
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

### Accessibility Tests
- ARIA labels and roles
- Keyboard navigation
- Color contrast ratios
- Screen reader compatibility
- Focus management

### SEO Validations
- Title tags and meta descriptions
- Open Graph and Twitter cards
- Structured data markup
- Internal linking structure
- Page load speed for SEO

## Reports

Generated reports include:
- **Performance Summary:** Core Web Vitals scores with recommendations
- **Accessibility Issues:** WCAG violations with fixes
- **SEO Health:** Search optimization opportunities
- **Visual Differences:** Side-by-side screenshot comparisons
- **Bug List:** Functional issues with severity ratings
- **Action Items:** Prioritized improvement checklist

## Integration

The skill integrates with:
- **GitHub Actions:** Automated testing on PR merges
- **Vercel Analytics:** Performance data correlation
- **Sentry:** Error tracking integration
- **Lighthouse CI:** Automated performance monitoring

## Best Practices

1. **Test Early:** Run audits during development, not just before deploy
2. **Monitor Regressions:** Track performance trends over time
3. **Prioritize Issues:** Focus on critical path and user-facing bugs
4. **Document Findings:** Share results with development team
5. **Automate Reports:** Schedule regular audits and share insights

---

*Playwright Audit - Comprehensive website quality assurance*