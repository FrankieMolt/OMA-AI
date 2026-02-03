# API Errors

Debugging and resolving API errors.

## Understanding API Errors

### Error Response Format

All API errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "PAYMENT_NOT_FOUND",
    "message": "Payment not found",
    "details": {
      "paymentId": "pay_123456"
    },
    "requestId": "req_abc123",
    "timestamp": "2026-01-24T12:00:00Z"
  }
}
```

### Error Response Headers

```http
HTTP/1.1 404 Not Found
X-Request-ID: req_abc123
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1706092800
Content-Type: application/json
```

## Common Error Categories

### 1xx Informational

Rarely used in OpenMarketAccess API.

### 2xx Success

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 202 | Accepted - Request accepted for processing |

### 3xx Redirection

| Code | Meaning |
|------|---------|
| 301 | Moved Permanently - Resource moved |
| 304 | Not Modified - Resource not modified |

### 4xx Client Errors

| Code | Meaning |
|------|---------|
| 400 | Bad Request - Invalid request |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource conflict |
| 422 | Unprocessable Entity - Validation error |
| 429 | Too Many Requests - Rate limit exceeded |

### 5xx Server Errors

| Code | Meaning |
|------|---------|
| 500 | Internal Server Error - Server error |
| 502 | Bad Gateway - Invalid response |
| 503 | Service Unavailable - Service temporarily unavailable |
| 504 | Gateway Timeout - Request timeout |

## Debugging API Errors

### 1. Check Request ID

Always include the request ID when reporting issues:

```typescript
try {
  const payment = await oma.payments.get('pay_123456');
} catch (error) {
  console.error('Request ID:', error.requestId);
  console.error('Error Code:', error.code);
}
```

### 2. Validate Request Data

Ensure all required fields are present and valid:

```typescript
function validatePayment(data) {
  if (!data.amount || data.amount <= 0) {
    throw new Error('Invalid amount');
  }

  if (!data.currency || data.currency.length !== 3) {
    throw new Error('Invalid currency');
  }

  if (!data.protocol || data.protocol !== 'x402') {
    throw new Error('Invalid protocol');
  }

  return true;
}
```

### 3. Check Rate Limits

Monitor rate limit headers:

```typescript
async function makeRequest(endpoint, data) {
  const response = await oma.request(endpoint, data);

  const rateLimit = {
    limit: response.headers['x-ratelimit-limit'],
    remaining: response.headers['x-ratelimit-remaining'],
    reset: response.headers['x-ratelimit-reset']
  };

  if (rateLimit.remaining === '0') {
    const waitTime = parseInt(rateLimit.reset) * 1000 - Date.now();
    console.log(`Rate limit reached. Waiting ${waitTime}ms`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }

  return response.data;
}
```

### 4. Enable Debug Mode

Enable debug logging to see request/response details:

```typescript
const oma = new OpenMarketAccess({
  apiKey: 'your_key',
  debug: true
});
```

## Specific Error Solutions

### Authentication Errors (401)

**Error: `INVALID_API_KEY`**

```typescript
// Solution: Verify API key
const apiKey = await oma.apiKeys.get('key_id');
console.log('Key status:', apiKey.active);
```

**Error: `EXPIRED_TOKEN`**

```typescript
// Solution: Refresh token
const newTokens = await oma.oauth.refreshToken({
  refreshToken: refreshToken
});
```

### Permission Errors (403)

**Error: `INSUFFICIENT_PERMISSIONS`**

```typescript
// Solution: Check and update permissions
const apiKey = await oma.apiKeys.get('key_id');
console.log('Permissions:', apiKey.permissions);

await oma.apiKeys.update('key_id', {
  permissions: ['read:payments', 'write:payments']
});
```

### Not Found Errors (404)

**Error: `PAYMENT_NOT_FOUND`**

```typescript
// Solution: Verify payment exists
const payments = await oma.payments.list({
  id: 'pay_123456'
});

if (payments.length === 0) {
  console.log('Payment does not exist');
}
```

### Validation Errors (400/422)

**Error: `INVALID_AMOUNT`**

```typescript
// Solution: Validate amount
function validateAmount(amount) {
  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Amount must be a positive number');
  }
  return true;
}
```

**Error: `INVALID_CURRENCY`**

```typescript
// Solution: Use 3-letter ISO currency code
const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY'];
if (!validCurrencies.includes(currency)) {
  throw new Error('Invalid currency code');
}
```

### Rate Limit Errors (429)

**Error: `RATE_LIMIT_EXCEEDED`**

```typescript
// Solution: Implement exponential backoff
async function makeRequestWithBackoff(request, attempt = 0) {
  try {
    return await oma.request(request);
  } catch (error) {
    if (error.code === 'RATE_LIMIT_EXCEEDED' && attempt < 3) {
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Rate limited. Waiting ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return makeRequestWithBackoff(request, attempt + 1);
    }
    throw error;
  }
}
```

### Server Errors (5xx)

**Error: `INTERNAL_ERROR`**

```typescript
// Solution: Retry with exponential backoff
async function makeRequestWithRetry(request) {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      return await oma.request(request);
    } catch (error) {
      if (error.statusCode >= 500 && attempt < maxRetries - 1) {
        attempt++;
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Server error. Retrying in ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}
```

## Error Handling Best Practices

### 1. Use Try-Catch Blocks

```typescript
async function createPayment(data) {
  try {
    const payment = await oma.payments.create(data);
    return payment;
  } catch (error) {
    // Log error with request ID
    console.error('Payment creation failed:', {
      requestId: error.requestId,
      code: error.code,
      message: error.message,
      timestamp: error.timestamp
    });

    // Handle specific errors
    switch (error.code) {
      case 'INVALID_AMOUNT':
        throw new Error('Please enter a valid amount');
      case 'INSUFFICIENT_FUNDS':
        throw new Error('Insufficient funds');
      default:
        throw new Error('Payment creation failed. Please try again.');
    }
  }
}
```

### 2. Implement Retry Logic

```typescript
async function retryableRequest(request, maxRetries = 3) {
  const retryableErrors = [
    'RATE_LIMIT_EXCEEDED',
    'INTERNAL_ERROR',
    'SERVICE_UNAVAILABLE',
    'TIMEOUT'
  ];

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await oma.request(request);
    } catch (error) {
      if (retryableErrors.includes(error.code) && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}
```

### 3. Use Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error caught by boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again.</h1>;
    }
    return this.props.children;
  }
}
```

## Monitoring API Errors

### Track Error Rates

```typescript
const errorTracker = {
  errors: new Map(),

  log(error) {
    const key = `${error.code}_${error.statusCode}`;
    const count = this.errors.get(key) || 0;
    this.errors.set(key, count + 1);

    // Alert if error rate is high
    if (count > 10) {
      console.error(`High error rate for ${key}: ${count}`);
    }
  },

  getReport() {
    return Object.fromEntries(this.errors);
  }
};

try {
  const payment = await oma.payments.get('pay_123456');
} catch (error) {
  errorTracker.log(error);
}
```

### Set Up Error Alerts

```typescript
function checkErrorRates() {
  const report = errorTracker.getReport();

  for (const [error, count] of Object.entries(report)) {
    if (count > 50) {
      sendAlert(`High error rate: ${error}`, { count });
    }
  }
}

// Check every 5 minutes
setInterval(checkErrorRates, 5 * 60 * 1000);
```

## Getting Help with API Errors

### Before Contacting Support

1. Check the [Error Codes](../reference/error-codes.md) reference
2. Verify your request data is valid
3. Check rate limit status
4. Review API documentation
5. Search [GitHub Issues](https://github.com/openmarketaccess/issues)

### When Contacting Support

Include the following information:

1. Request ID from error response
2. Error code and message
3. Request data (sanitized)
4. Timestamp of error
5. Your API key prefix (first 8 characters)

```typescript
console.log({
  requestId: error.requestId,
  code: error.code,
  message: error.message,
  timestamp: error.timestamp,
  apiKeyPrefix: process.env.OMA_API_KEY.substring(0, 8)
});
```

## See Also

- [Error Codes Reference](../reference/error-codes.md)
- [Common Issues](common-issues.md)
- [Getting Help](getting-help.md)
