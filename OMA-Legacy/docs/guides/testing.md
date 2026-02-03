# Testing Guide

This guide covers testing strategies and best practices for OpenMarketAccess applications.

## Overview

Testing is crucial for building reliable applications with OpenMarketAccess. This guide covers unit tests, integration tests, and end-to-end tests.

## Test Environment

### Sandbox Environment

OpenMarketAccess provides a sandbox environment for testing:

```javascript
const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_SANDBOX_API_KEY,
  apiUrl: 'https://sandbox-api.openmarketaccess.com/v1',
  environment: 'sandbox'
});
```

### Test Data

Use test payment methods and accounts:

```javascript
const testPaymentMethod = {
  provider: 'stripe',
  type: 'card',
  token: 'tok_visa' // Stripe test token
};

const testUser = {
  email: 'test@example.com',
  password: 'test_password_123'
};
```

## Unit Testing

### Setup

```javascript
// test/unit/payments.test.js
const { OpenMarketAccess } = require('@openmarketaccess/sdk');
const { expect } = require('chai');

describe('Payment Module', () => {
  let oma;

  beforeEach(() => {
    oma = new OpenMarketAccess({
      apiKey: 'test_key',
      apiUrl: 'https://sandbox-api.openmarketaccess.com/v1'
    });
  });

  afterEach(() => {
    // Cleanup
  });
});
```

### Mocking API Calls

```javascript
const sinon = require('sinon');

describe('Payment Creation', () => {
  it('should create a payment with valid data', async () => {
    const paymentData = {
      amount: 100.00,
      currency: 'USD',
      protocol: 'x402'
    };

    const expectedResponse = {
      id: 'pay_123',
      status: 'created',
      ...paymentData
    };

    // Mock the API call
    sinon.stub(oma.payments, 'create').resolves(expectedResponse);

    const payment = await oma.payments.create(paymentData);

    expect(payment.id).to.equal('pay_123');
    expect(payment.amount).to.equal(100.00);
    expect(payment.currency).to.equal('USD');
  });

  it('should throw error with invalid amount', async () => {
    const paymentData = {
      amount: -100.00,
      currency: 'USD',
      protocol: 'x402'
    };

    try {
      await oma.payments.create(paymentData);
      expect.fail('Should have thrown error');
    } catch (error) {
      expect(error.code).to.equal('INVALID_AMOUNT');
    }
  });
});
```

### Testing Payment Flow

```javascript
describe('Payment Flow', () => {
  it('should complete full payment flow', async () => {
    // Create payment
    const payment = await oma.payments.create({
      amount: 100.00,
      currency: 'USD',
      protocol: 'x402'
    });

    expect(payment.status).to.equal('created');

    // Fund payment
    const funded = await oma.payments.fundEscrow(payment.id, {
      paymentMethodId: 'pm_test_123'
    });

    expect(funded.status).to.equal('funded');

    // Execute payment
    const executed = await oma.payments.execute(payment.id, {
      confirmationCode: 'test_code'
    });

    expect(executed.status).to.equal('completed');
  });
});
```

## Integration Testing

### Setup Test Database

```javascript
// test/integration/setup.js
const { Pool } = require('pg');

const testPool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'oma_test',
  user: 'test_user',
  password: 'test_password'
});

async function setupTestDatabase() {
  // Create test tables
  await testPool.query(`
    CREATE TABLE IF NOT EXISTS test_payments (
      id VARCHAR(255) PRIMARY KEY,
      amount DECIMAL(10, 2),
      currency VARCHAR(3),
      status VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Clear before tests
  await testPool.query('TRUNCATE TABLE test_payments');
}

async function cleanupTestDatabase() {
  await testPool.query('DROP TABLE IF EXISTS test_payments');
  await testPool.end();
}

module.exports = { testPool, setupTestDatabase, cleanupTestDatabase };
```

### Integration Test Example

```javascript
// test/integration/payments.test.js
const { setupTestDatabase, cleanupTestDatabase, testPool } = require('./setup');

describe('Payment Integration Tests', () => {
  let oma;

  before(async () => {
    await setupTestDatabase();
    oma = new OpenMarketAccess({
      apiKey: process.env.OMA_TEST_API_KEY,
      apiUrl: 'https://sandbox-api.openmarketaccess.com/v1'
    });
  });

  after(async () => {
    await cleanupTestDatabase();
  });

  it('should create and persist payment', async () => {
    const payment = await oma.payments.create({
      amount: 100.00,
      currency: 'USD',
      protocol: 'x402'
    });

    // Verify in database
    const result = await testPool.query(
      'SELECT * FROM test_payments WHERE id = $1',
      [payment.id]
    );

    expect(result.rows.length).to.equal(1);
    expect(result.rows[0].amount).to.equal(100.00);
  });
});
```

## End-to-End Testing

### Setup

```javascript
// test/e2e/setup.js
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

let browser, page;

async function setupE2E() {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3000');
}

async function teardownE2E() {
  await browser.close();
}

module.exports = { setupE2E, teardownE2E, page };
```

### E2E Test Example

```javascript
// test/e2e/payment-flow.test.js
const { setupE2E, teardownE2E } = require('./setup');

describe('Payment Flow E2E', () => {
  before(setupE2E);
  after(teardownE2E);

  it('should complete payment flow', async () => {
    // Navigate to payment page
    await page.click('text=Make Payment');

    // Fill payment form
    await page.fill('[name="amount"]', '100.00');
    await page.fill('[name="currency"]', 'USD');
    await page.selectOption('[name="protocol"]', 'x402');

    // Submit payment
    await page.click('button[type="submit"]');

    // Wait for confirmation
    await page.waitForSelector('.payment-success');

    // Verify success message
    const message = await page.textContent('.payment-success');
    expect(message).to.include('Payment successful');
  });

  it('should show error for invalid payment', async () => {
    await page.click('text=Make Payment');
    await page.fill('[name="amount"]', '-100');
    await page.click('button[type="submit"]');

    await page.waitForSelector('.error-message');
    const error = await page.textContent('.error-message');
    expect(error).to.include('Invalid amount');
  });
});
```

## Testing Webhooks

### Mock Webhook Server

```javascript
// test/webhooks/server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let receivedWebhooks = [];

app.post('/test-webhook', (req, res) => {
  receivedWebhooks.push({
    timestamp: new Date(),
    body: req.body,
    headers: req.headers
  });
  res.status(200).send('OK');
});

app.get('/webhooks', (req, res) => {
  res.json(receivedWebhooks);
});

app.delete('/webhooks', (req, res) => {
  receivedWebhooks = [];
  res.status(200).send('OK');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Test webhook server listening on port ${PORT}`);
});

module.exports = { app, receivedWebhooks };
```

### Webhook Test

```javascript
// test/webhooks/webhook.test.js
const { app, receivedWebhooks } = require('./server');
const request = require('supertest');

describe('Webhook Handling', () => {
  beforeEach(() => {
    // Clear webhooks
    receivedWebhooks.length = 0;
  });

  it('should receive and process payment webhook', async () => {
    const webhookPayload = {
      type: 'payment.completed',
      data: {
        paymentId: 'pay_123',
        amount: 100.00,
        currency: 'USD'
      }
    };

    await request(app)
      .post('/test-webhook')
      .send(webhookPayload)
      .expect(200);

    expect(receivedWebhooks.length).to.equal(1);
    expect(receivedWebhooks[0].body.type).to.equal('payment.completed');
  });
});
```

## Test Data Management

### Fixtures

```javascript
// test/fixtures/payments.js
const validPayment = {
  amount: 100.00,
  currency: 'USD',
  protocol: 'x402',
  description: 'Test payment'
};

const invalidPayment = {
  amount: -100.00,
  currency: 'USD',
  protocol: 'x402'
};

const escrowPayment = {
  amount: 500.00,
  currency: 'USD',
  protocol: 'x402',
  type: 'escrow',
  escrowConfig: {
    releaseCondition: 'delivery_confirmation',
    autoReleaseDays: 7
  }
};

module.exports = {
  validPayment,
  invalidPayment,
  escrowPayment
};
```

### Using Fixtures

```javascript
const { validPayment, invalidPayment } = require('../fixtures/payments');

describe('Payment Validation', () => {
  it('should accept valid payment', async () => {
    const payment = await oma.payments.create(validPayment);
    expect(payment.id).to.exist;
  });

  it('should reject invalid payment', async () => {
    try {
      await oma.payments.create(invalidPayment);
      expect.fail('Should have thrown error');
    } catch (error) {
      expect(error.code).to.equal('INVALID_AMOUNT');
    }
  });
});
```

## Continuous Integration

### GitHub Actions Configuration

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_password
          POSTGRES_DB: oma_test
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration
        env:
          OMA_TEST_API_KEY: ${{ secrets.OMA_TEST_API_KEY }}

      - name: Run E2E tests
        run: npm run test:e2e
```

## Best Practices

1. **Isolate tests** - Each test should be independent
2. **Use sandbox** - Never test against production
3. **Mock external services** - Don't depend on third-party APIs
4. **Clean up after tests** - Remove test data
5. **Use descriptive names** - Tests should be self-documenting
6. **Test edge cases** - Boundary conditions, null values, etc.
7. **Keep tests fast** - Unit tests should run in milliseconds
8. **Test error paths** - Verify error handling works correctly

## Next Steps

- Review [API Reference](../api/README.md)
- Learn about [Deployment](../deployment/docker.md)
- Check [Troubleshooting](../troubleshooting/common-issues.md)

## Additional Resources

- [Testing Best Practices](https://martinfowler.com/bliki/UnitTest.html)
- [Integration Testing Patterns](https://martinfowler.com/articles/microservice-testing/#integration-tests)
- [E2E Testing with Playwright](https://playwright.dev/)
