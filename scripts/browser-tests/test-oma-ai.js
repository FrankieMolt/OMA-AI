const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://oma-ai.com';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const TEST_REPORT_PATH = path.join(__dirname, 'test-report.json');
const LOCAL_ROUTES_DIR = path.join(__dirname, '../../src/app');

const ROUTES_TO_TEST = [
  { path: '/', name: 'Homepage' },
  { path: '/about', name: 'About' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/docs', name: 'Docs' },
  { path: '/agents', name: 'Agents' },
  { path: '/mcps', name: 'MCPs' },
  { path: '/wallet', name: 'Wallet' },
  { path: '/transactions', name: 'Transactions' }
];

const LOCAL_ROUTE_FOLDERS = [
  'about',
  'pricing', 
  'docs',
  'agents',
  'mcps',
  'wallet',
  'transactions'
];

async function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function getLocalRoutes() {
  const routes = [];
  try {
    const entries = fs.readdirSync(LOCAL_ROUTES_DIR, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const routePath = path.join(LOCAL_ROUTES_DIR, entry.name);
        const files = fs.readdirSync(routePath);
        if (files.includes('page.tsx') || files.includes('page.js') || files.includes('page.ts')) {
          routes.push(entry.name);
        }
      }
    }
  } catch (error) {
    console.error('Error reading local routes:', error.message);
  }
  return routes;
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function testPage(browser, route, consoleErrors) {
  const url = `${BASE_URL}${route.path}`;
  const page = await browser.newPage();

  const result = {
    route: route.path,
    name: route.name,
    url: url,
    loaded: false,
    statusCode: null,
    consoleErrors: [],
    elements: {},
    screenshot: null,
    error: null
  };

  const consoleMessages = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleMessages.push(msg.text());
    }
  });

  try {
    const response = await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: 30000 
    });
    
    result.statusCode = response.status();
    result.loaded = response.ok();

    await delay(2000);
    result.consoleErrors = consoleMessages.filter(e => !e.includes('favicon'));
    
    if (route.path === '/') {
      result.elements = await page.evaluate(() => {
        const hero = document.querySelector('h1') || document.querySelector('[class*="hero"]');
        const nav = document.querySelector('nav');
        const footer = document.querySelector('footer');
        return {
          hasHero: !!hero,
          hasNavigation: !!nav,
          hasFooter: !!footer,
          pageTitle: document.title
        };
      });
    } else if (route.path === '/pricing') {
      result.elements = await page.evaluate(() => {
        const cards = document.querySelectorAll('[class*="card"], [class*="pricing"], section');
        return {
          hasContent: cards.length > 0,
          cardCount: cards.length,
          pageTitle: document.title
        };
      });
    } else {
      result.elements = await page.evaluate(() => {
        return {
          hasContent: document.body.innerText.length > 0,
          pageTitle: document.title
        };
      });
    }

    const screenshotName = `${route.path.replace(/\//g, '_') || 'home'}.png`;
    const screenshotPath = path.join(SCREENSHOT_DIR, screenshotName);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    result.screenshot = screenshotName;

  } catch (error) {
    result.error = error.message;
    result.loaded = false;
  } finally {
    await page.close();
  }

  return result;
}

async function runTests() {
  console.log('Starting Puppeteer browser tests for OMA-AI.COM\n');
  
  ensureDirectoryExists(SCREENSHOT_DIR);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const testResults = {
    testRun: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalRoutes: ROUTES_TO_TEST.length,
    routes: [],
    summary: {
      totalPassed: 0,
      totalFailed: 0,
      totalErrors: 0
    },
    localRoutesComparison: {}
  };

  console.log('Testing routes...\n');

  for (const route of ROUTES_TO_TEST) {
    console.log(`Testing: ${route.name} (${route.path})`);
    const result = await testPage(browser, route);
    testResults.routes.push(result);
    
    if (result.loaded) {
      testResults.summary.totalPassed++;
      console.log(`  ✓ Loaded successfully (Status: ${result.statusCode})`);
    } else {
      testResults.summary.totalFailed++;
      console.log(`  ✗ Failed to load: ${result.error || 'Unknown error'}`);
    }
    
    if (result.consoleErrors.length > 0) {
      testResults.summary.totalErrors += result.consoleErrors.length;
      console.log(`  ! Console errors: ${result.consoleErrors.length}`);
    }
    
    console.log(`  Screenshot: ${result.screenshot}\n`);
  }

  console.log('\nComparing with local routes...\n');
  const localRoutes = await getLocalRoutes();
  testResults.localRoutesComparison = {
    localImplemented: localRoutes,
    testedOnline: ROUTES_TO_TEST.map(r => r.path.replace('/', '')).filter(p => p),
    missingOnline: [],
    presentLocally: []
  };

  for (const route of LOCAL_ROUTE_FOLDERS) {
    const hasLocal = localRoutes.includes(route);
    const hasOnline = ROUTES_TO_TEST.some(r => r.path === `/${route}`);
    
    if (hasLocal) {
      testResults.localRoutesComparison.presentLocally.push(route);
    }
    
    if (hasLocal && !hasOnline) {
      testResults.localRoutesComparison.missingOnline.push(route);
    }
  }

  await browser.close();

  testResults.summary.totalErrors = testResults.routes.reduce((sum, r) => sum + r.consoleErrors.length, 0);

  fs.writeFileSync(TEST_REPORT_PATH, JSON.stringify(testResults, null, 2));
  
  console.log('='.repeat(50));
  console.log('TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total Routes Tested: ${testResults.totalRoutes}`);
  console.log(`Passed: ${testResults.summary.totalPassed}`);
  console.log(`Failed: ${testResults.summary.totalFailed}`);
  console.log(`Total Console Errors: ${testResults.summary.totalErrors}`);
  console.log(`\nLocal Routes Found: ${localRoutes.join(', ')}`);
  console.log(`\nTest report saved to: ${TEST_REPORT_PATH}`);
  console.log(`Screenshots saved to: ${SCREENSHOT_DIR}`);
  
  return testResults;
}

runTests().catch(console.error);