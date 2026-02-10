# Quick Start

## Install
```bash
npm install
npx playwright install chromium
```

## Run Audits
```bash
# All sites
npm run audit:all

# Single site
npm run audit:site oma-ai
```

## Run Specific Tests
```bash
npm run test:performance    # Performance only
npm run test:accessibility  # Accessibility only
npm run test:seo           # SEO only
```

## View Reports
Reports are saved to `reports/{site-name}-{timestamp}/index.html`
