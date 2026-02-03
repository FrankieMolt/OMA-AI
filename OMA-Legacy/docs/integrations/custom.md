# Custom Integrations

Build custom integrations with OpenMarketAccess.

## Overview

This guide helps you build custom integrations with OpenMarketAccess for your specific use case.

## Getting Started

### Prerequisites

- OpenMarketAccess API key
- Basic understanding of REST APIs
- Familiarity with your target platform

### SDK Installation

```bash
# TypeScript/JavaScript
npm install @openmarketaccess/sdk

# Python
pip install openmarketaccess

# Go
go get github.com/openmarketaccess/go-sdk

# PHP
composer require openmarketaccess/php-sdk

# Ruby
gem install openmarketaccess-ruby
```

## Architecture

### Integration Patterns

#### Direct API Integration

```
Your App → OpenMarketAccess API
```

#### SDK-Based Integration

```
Your App → OMA SDK → OpenMarketAccess API
```

#### Proxy Integration

```
Your App → Your Proxy → OpenMarketAccess API
```

## Authentication

### API Key Authentication

```typescript
const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY
});
```

### OAuth 2.0 Flow

```typescript
// 1. Get authorization URL
const authUrl = oma.oauth.getAuthorizationUrl({
  clientId: 'your_client_id',
  redirectUri: 'https://yourapp.com/callback',
  scope: 'read:payments write:payments'
});

// 2. Exchange code for tokens
const tokens = await oma.oauth.exchangeCodeForTokens({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  code: authorizationCode
});

// 3. Use access token
const oma = new OpenMarketAccess({
  accessToken: tokens.accessToken
});
```

## Core Integration Points

### Payment Processing

```typescript
async function processPayment(amount, currency, description) {
  try {
    const payment = await oma.payments.create({
      protocol: 'x402',
      amount,
      currency,
      description
    });

    // Fund escrow
    await oma.payments.fundEscrow(payment.id, {
      paymentMethodId: userPaymentMethodId
    });

    return payment;
  } catch (error) {
    console.error('Payment failed:', error);
    throw error;
  }
}
```

### Webhook Handling

```typescript
app.post('/webhook', async (req, res) => {
  const signature = req.headers['x-oma-signature'];
  const payload = JSON.stringify(req.body);

  // Verify signature
  const isValid = oma.webhooks.verifySignature(
    payload,
    signature,
    process.env.OMA_WEBHOOK_SECRET
  );

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process webhook
  await handleWebhook(req.body);

  res.status(200).send('OK');
});
```

### Marketplace Integration

```typescript
async function syncProduct(product) {
  const listing = await oma.marketplace.createListing({
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    currency: product.currency
  });

  return listing;
}
```

## Platform-Specific Integrations

### WordPress Plugin

```php
<?php
/**
 * Plugin Name: OpenMarketAccess
 * Description: OpenMarketAccess integration for WordPress
 */

class OMA_WooCommerce {
  private $oma;

  public function __construct() {
    $this->oma = new OpenMarketAccess([
      'api_key' => get_option('oma_api_key'),
      'api_url' => 'https://api.openmarketaccess.com/v1'
    ]);

    add_action('woocommerce_order_status_completed', [$this, 'process_order']);
  }

  public function process_order($order_id) {
    $order = wc_get_order($order_id);

    $payment = $this->oma->payments->create([
      'protocol' => 'x402',
      'amount' => $order->get_total(),
      'currency' => $order->get_currency()
    ]);

    update_post_meta($order_id, '_oma_payment_id', $payment->id);
  }
}

new OMA_WooCommerce();
```

### Laravel Package

```php
namespace OpenMarketAccess\Laravel;

use Illuminate\Support\Facades\Facade;

class OMA extends Facade {
    protected static function getFacadeAccessor() {
        return 'oma';
    }
}

// Service Provider
class OMAServiceProvider extends ServiceProvider {
    public function register() {
        $this->app->singleton('oma', function ($app) {
            return new OpenMarketAccess([
                'api_key' => config('oma.api_key'),
                'api_url' => config('oma.api_url')
            ]);
        });
    }
}

// Usage
$payment = OMA::payments()->create([
    'protocol' => 'x402',
    'amount' => 100.00,
    'currency' => 'USD'
]);
```

### Django App

```python
from django.conf import settings
from openmarketaccess import OpenMarketAccess

class OMAMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.oma = OpenMarketAccess(
            api_key=settings.OMA_API_KEY,
            api_url=settings.OMA_API_URL
        )

    def __call__(self, request):
        request.oma = self.oma
        response = self.get_response(request)
        return response

# Usage in views
def create_payment(request):
    payment = request.oma.payments.create(
        protocol='x402',
        amount=100.00,
        currency='USD'
    )
    return JsonResponse(payment.__dict__)
```

## Custom Middleware

### Request Logging

```typescript
oma.use(async (context, next) => {
  const startTime = Date.now();

  console.log('Request:', context.request);

  await next();

  const duration = Date.now() - startTime;
  console.log(`Response in ${duration}ms`);
});
```

### Rate Limiting

```typescript
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter({
  tokensPerInterval: 100,
  interval: 'minute'
});

oma.use(async (context, next) => {
  if (!await limiter.removeTokens(1)) {
    throw new Error('Rate limit exceeded');
  }

  await next();
});
```

### Caching

```typescript
oma.use(async (context, next) => {
  const cacheKey = `${context.method}:${context.endpoint}`;

  if (context.method === 'GET') {
    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }
  }

  const response = await next();

  if (context.method === 'GET') {
    cache.set(cacheKey, response, 300); // 5 minutes
  }

  return response;
});
```

## Error Handling

### Custom Error Handler

```typescript
oma.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      // Rate limit exceeded
      return retryWithBackoff(error.config);
    } else if (error.response?.status === 401) {
      // Authentication failed
      refreshToken();
      return retryRequest(error.config);
    }

    return Promise.reject(error);
  }
);
```

### Error Monitoring

```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN
});

oma.interceptors.response.use(
  (response) => response,
  (error) => {
    Sentry.captureException(error);
    return Promise.reject(error);
  }
);
```

## Testing

### Unit Tests

```typescript
import { OpenMarketAccess } from '@openmarketaccess/sdk';

describe('Custom Integration', () => {
  let oma;

  beforeEach(() => {
    oma = new OpenMarketAccess({
      apiKey: 'test_key',
      apiUrl: 'https://sandbox-api.openmarketaccess.com/v1'
    });
  });

  it('should create payment', async () => {
    const payment = await oma.payments.create({
      protocol: 'x402',
      amount: 100.00,
      currency: 'USD'
    });

    expect(payment.id).toBeDefined();
    expect(payment.status).toBe('created');
  });
});
```

### Integration Tests

```typescript
describe('Integration Tests', () => {
  it('should complete full payment flow', async () => {
    // Create payment
    const payment = await oma.payments.create({
      protocol: 'x402',
      amount: 100.00,
      currency: 'USD'
    });

    // Fund escrow
    await oma.payments.fundEscrow(payment.id, {
      paymentMethodId: 'pm_test_123'
    });

    // Execute payment
    await oma.payments.execute(payment.id, {
      confirmationCode: 'test_code'
    });

    const result = await oma.payments.get(payment.id);
    expect(result.status).toBe('completed');
  });
});
```

## Deployment

### Environment Configuration

```env
# Development
OMA_API_KEY=dev_key_123
OMA_API_URL=https://sandbox-api.openmarketaccess.com/v1
NODE_ENV=development

# Production
OMA_API_KEY=prod_key_456
OMA_API_URL=https://api.openmarketaccess.com/v1
NODE_ENV=production
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV OMA_API_KEY=${OMA_API_KEY}
ENV OMA_API_URL=${OMA_API_URL}

CMD ["node", "dist/index.js"]
```

## Best Practices

1. **Use SDKs** when available
2. **Implement retry logic** for transient errors
3. **Cache responses** to reduce API calls
4. **Validate inputs** before API calls
5. **Handle errors gracefully**
6. **Use webhooks** for real-time updates
7. **Monitor performance** and usage
8. **Secure API keys** properly
9. **Test thoroughly** before production
10. **Document your integration**

## Resources

- [API Reference](../api/README.md)
- [SDK Documentation](../sdk/README.md)
- [Community Integrations](community-repos.md)
- [Payment Providers](payment-providers.md)

## Support

- [Discord](https://discord.gg/openmarketaccess)
- [GitHub Issues](https://github.com/openmarketaccess/issues)
- [Email](mailto:support@openmarketaccess.com)
