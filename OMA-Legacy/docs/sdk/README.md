# SDK Documentation

Official SDKs for integrating OpenMarketAccess into your applications.

## Available SDKs

- [TypeScript SDK](typescript.md) - TypeScript/JavaScript SDK for Node.js and browser
- [Python SDK](python.md) - Python SDK for Python applications

## Quick Start

### TypeScript

```bash
npm install @openmarketaccess/sdk
```

```typescript
import { OpenMarketAccess } from '@openmarketaccess/sdk';

const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY,
  apiUrl: 'https://api.openmarketaccess.com/v1'
});
```

### Python

```bash
pip install openmarketaccess
```

```python
from openmarketaccess import OpenMarketAccess

oma = OpenMarketAccess(
    api_key=os.environ.get('OMA_API_KEY'),
    api_url='https://api.openmarketaccess.com/v1'
)
```

## Features

All SDKs provide:

- **Authentication** - API key and OAuth 2.0 support
- **Payment Processing** - x402 protocol implementation
- **Marketplace Operations** - Listings, purchases, reviews
- **Webhook Handling** - Signature verification and event processing
- **Error Handling** - Comprehensive error management
- **Type Safety** - Full TypeScript definitions
- **Retry Logic** - Automatic retry with exponential backoff
- **Rate Limiting** - Built-in rate limit handling

## Configuration

### Common Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | Required | API key for authentication |
| `apiUrl` | string | `https://api.openmarketaccess.com/v1` | API base URL |
| `timeout` | number | 30000 | Request timeout in milliseconds |
| `maxRetries` | number | 3 | Maximum retry attempts |
| `retryDelay` | number | 1000 | Initial retry delay in milliseconds |
| `webhookSecret` | string | Optional | Webhook secret for signature verification |

### TypeScript Configuration

```typescript
import { OpenMarketAccess } from '@openmarketaccess/sdk';

const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY!,
  apiUrl: 'https://api.openmarketaccess.com/v1',
  timeout: 60000,
  maxRetries: 5,
  retryDelay: 2000,
  webhookSecret: process.env.OMA_WEBHOOK_SECRET
});
```

### Python Configuration

```python
from openmarketaccess import OpenMarketAccess

oma = OpenMarketAccess(
    api_key=os.environ.get('OMA_API_KEY'),
    api_url='https://api.openmarketaccess.com/v1',
    timeout=60,
    max_retries=5,
    retry_delay=2,
    webhook_secret=os.environ.get('OMA_WEBHOOK_SECRET')
)
```

## Core Modules

### Payments

```typescript
// TypeScript
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 100.00,
  currency: 'USD'
});
```

```python
# Python
payment = oma.payments.create(
    protocol='x402',
    amount=100.00,
    currency='USD'
)
```

### Marketplace

```typescript
// TypeScript
const listing = await oma.marketplace.createListing({
  name: 'API Service',
  description: 'Custom API integration',
  price: 50.00,
  currency: 'USD'
});
```

```python
# Python
listing = oma.marketplace.create_listing(
    name='API Service',
    description='Custom API integration',
    price=50.00,
    currency='USD'
)
```

### Webhooks

```typescript
// TypeScript
const webhook = await oma.webhooks.create({
  url: 'https://yourapp.com/webhook',
  events: ['payment.*']
});

// Verify webhook signature
const isValid = oma.webhooks.verifySignature(
  payload,
  signature,
  webhookSecret
);
```

```python
# Python
webhook = oma.webhooks.create(
    url='https://yourapp.com/webhook',
    events=['payment.*']
)

# Verify webhook signature
is_valid = oma.webhooks.verify_signature(
    payload,
    signature,
    webhook_secret
)
```

## Error Handling

### TypeScript

```typescript
try {
  const payment = await oma.payments.create(paymentData);
} catch (error) {
  if (error instanceof OpenMarketAccessError) {
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error details:', error.details);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Python

```python
try:
    payment = oma.payments.create(payment_data)
except OpenMarketAccessError as e:
    print(f'Error code: {e.code}')
    print(f'Error message: {e.message}')
    print(f'Error details: {e.details}')
except Exception as e:
    print(f'Unexpected error: {e}')
```

## Advanced Features

### Custom Middleware

```typescript
// TypeScript
oma.use(async (context, next) => {
  console.log('Request:', context.request);
  await next();
  console.log('Response:', context.response);
});
```

```python
# Python
@oma.middleware
async def log_middleware(context, next_handler):
    print(f'Request: {context.request}')
    await next_handler()
    print(f'Response: {context.response}')
```

### Request Interception

```typescript
// TypeScript
oma.interceptors.request.use((config) => {
  config.headers['X-Custom-Header'] = 'value';
  return config;
});

oma.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);
```

```python
# Python
@oma.interceptors.request
def add_custom_header(request):
    request.headers['X-Custom-Header'] = 'value'
    return request

@oma.interceptors.response
def handle_error(response):
    if response.is_error:
        print(f'Response error: {response.error}')
    return response
```

### Caching

```typescript
// TypeScript
const cache = oma.cache;

// Set cache
await cache.set('payment_123', paymentData, 300); // 5 minutes

// Get cache
const cached = await cache.get('payment_123');

// Clear cache
await cache.delete('payment_123');
```

```python
# Python
cache = oma.cache

# Set cache
await cache.set('payment_123', payment_data, 300)  # 5 minutes

# Get cache
cached = await cache.get('payment_123')

# Clear cache
await cache.delete('payment_123')
```

## Testing

### TypeScript

```typescript
import { OpenMarketAccess } from '@openmarketaccess/sdk';

// Use sandbox for testing
const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_SANDBOX_API_KEY!,
  apiUrl: 'https://sandbox-api.openmarketaccess.com/v1'
});

// Test payment
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 1.00, // Test amount
  currency: 'USD'
});
```

### Python

```python
from openmarketaccess import OpenMarketAccess

# Use sandbox for testing
oma = OpenMarketAccess(
    api_key=os.environ.get('OMA_SANDBOX_API_KEY'),
    api_url='https://sandbox-api.openmarketaccess.com/v1'
)

# Test payment
payment = oma.payments.create(
    protocol='x402',
    amount=1.00,  # Test amount
    currency='USD'
)
```

## Best Practices

1. **Use environment variables** for sensitive configuration
2. **Implement error handling** for all API calls
3. **Use sandbox environment** for testing
4. **Enable retries** for transient errors
5. **Monitor rate limits** to avoid throttling
6. **Cache responses** when appropriate
7. **Validate inputs** before API calls
8. **Log errors** for debugging

## Support

- TypeScript SDK: [GitHub Repository](https://github.com/openmarketaccess/typescript-sdk)
- Python SDK: [GitHub Repository](https://github.com/openmarketaccess/python-sdk)
- Documentation: [docs.openmarketaccess.com](https://docs.openmarketaccess.com)
- Issues: [GitHub Issues](https://github.com/openmarketaccess/sdk/issues)

## Changelog

### TypeScript SDK v1.2.0 (January 2026)
- Added MCP integration
- Enhanced error handling
- Improved caching support

### Python SDK v1.1.0 (December 2025)
- Added async support
- Improved retry logic
- New webhook utilities

## Additional Resources

- [TypeScript SDK Guide](typescript.md)
- [Python SDK Guide](python.md)
- [SDK Examples](examples.md)
- [API Reference](../api/README.md)
- [Getting Started Guide](../guides/getting-started.md)
