# Rate Limiting Guide

This guide covers rate limiting in OpenMarketAccess and how to handle rate limits effectively.

## Overview

OpenMarketAccess implements rate limiting to ensure fair usage and protect against abuse. Understanding rate limits is crucial for building robust applications.

## Rate Limit Tiers

### Free Tier

| Resource | Limit | Window |
|----------|-------|--------|
| API Requests | 1,000 | per hour |
| Payment Requests | 100 | per day |
| Webhook Deliveries | 5,000 | per day |
| Storage | 100 MB | total |

### Pro Tier

| Resource | Limit | Window |
|----------|-------|--------|
| API Requests | 10,000 | per hour |
| Payment Requests | 1,000 | per day |
| Webhook Deliveries | 50,000 | per day |
| Storage | 1 GB | total |

### Enterprise Tier

| Resource | Limit | Window |
|----------|-------|--------|
| API Requests | Unlimited | - |
| Payment Requests | Unlimited | - |
| Webhook Deliveries | Unlimited | - |
| Storage | Custom | - |

## Rate Limit Headers

Every API response includes rate limit headers:

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1706092800
X-RateLimit-Used: 1
```

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed in the current window |
| `X-RateLimit-Remaining` | Requests remaining in the current window |
| `X-RateLimit-Reset` | Unix timestamp when the rate limit window resets |
| `X-RateLimit-Used` | Requests used in the current window |

## Handling Rate Limits

### Detecting Rate Limits

```javascript
async function makeApiCall(endpoint, options) {
  const response = await oma.request(endpoint, options);

  // Check rate limit headers
  const rateLimit = {
    limit: response.headers['x-ratelimit-limit'],
    remaining: response.headers['x-ratelimit-remaining'],
    reset: response.headers['x-ratelimit-reset'],
    used: response.headers['x-ratelimit-used']
  };

  console.log('Rate limit status:', rateLimit);

  if (rateLimit.remaining === '0') {
    const resetTime = parseInt(rateLimit.reset) * 1000;
    const waitTime = resetTime - Date.now();
    console.log(`Rate limit exceeded. Waiting ${waitTime}ms`);
  }

  return response.data;
}
```

### Automatic Retry with Backoff

```javascript
const MAX_RETRIES = 5;
const INITIAL_DELAY = 1000; // 1 second

async function makeApiCallWithRetry(endpoint, options) {
  let attempt = 0;
  let delay = INITIAL_DELAY;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await oma.request(endpoint, options);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        attempt++;

        if (attempt === MAX_RETRIES) {
          throw new Error('Max retries reached for rate limit');
        }

        // Calculate wait time from headers
        const resetTime = parseInt(
          error.response.headers['x-ratelimit-reset']
        ) * 1000;
        const waitTime = Math.max(delay, resetTime - Date.now());

        console.log(`Rate limited. Waiting ${waitTime}ms before retry ${attempt}`);
        await new Promise(resolve => setTimeout(resolve, waitTime));

        // Exponential backoff
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
}
```

### Token Bucket Algorithm

```javascript
class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.tokens = maxRequests;
    this.lastRefill = Date.now();
  }

  async acquire() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;

    // Refill tokens
    const refillAmount = (elapsed / this.windowMs) * this.maxRequests;
    this.tokens = Math.min(this.maxRequests, this.tokens + refillAmount);
    this.lastRefill = now;

    if (this.tokens < 1) {
      const waitTime = ((1 - this.tokens) * this.windowMs) / this.maxRequests;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.tokens = 0;
    } else {
      this.tokens -= 1;
    }
  }
}

// Usage
const limiter = new RateLimiter(1000, 3600000); // 1000 requests per hour

async function makeRateLimitedRequest(endpoint, options) {
  await limiter.acquire();
  return await oma.request(endpoint, options);
}
```

## Optimizing API Usage

### Batch Requests

```javascript
// Instead of multiple requests
const user1 = await oma.users.get('user_1');
const user2 = await oma.users.get('user_2');
const user3 = await oma.users.get('user_3');

// Use batch endpoint
const users = await oma.users.batchGet(['user_1', 'user_2', 'user_3']);
```

### Pagination

```javascript
async function getAllUsers() {
  let users = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await oma.users.list({
      page,
      perPage: 100
    });

    users = users.concat(response.data);
    hasMore = response.hasMore;
    page++;
  }

  return users;
}
```

### Caching

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minute cache

async function getCachedUser(userId) {
  const cached = cache.get(userId);

  if (cached) {
    console.log('Cache hit for user:', userId);
    return cached;
  }

  const user = await oma.users.get(userId);
  cache.set(userId, user);
  console.log('Cache miss for user:', userId);
  return user;
}
```

### Request Queuing

```javascript
const { Queue, Worker } = require('bullmq');

const requestQueue = new Queue('api-requests');

// Add requests to queue
await requestQueue.add('make-request', {
  endpoint: '/payments',
  method: 'POST',
  data: { amount: 100 }
});

// Worker processes requests with rate limiting
const worker = new Worker('api-requests', async (job) => {
  await limiter.acquire();
  return await oma.request(job.data.endpoint, {
    method: job.data.method,
    data: job.data.data
  });
});
```

## Rate Limit by Resource

### Payment API

```javascript
const paymentLimiter = new RateLimiter(100, 86400000); // 100 per day

async function createPayment(paymentData) {
  await paymentLimiter.acquire();
  return await oma.payments.create(paymentData);
}
```

### Marketplace API

```javascript
const marketplaceLimiter = new RateLimiter(500, 3600000); // 500 per hour

async function createListing(listingData) {
  await marketplaceLimiter.acquire();
  return await oma.marketplace.createListing(listingData);
}
```

### Webhook API

```javascript
const webhookLimiter = new RateLimiter(1000, 3600000); // 1000 per hour

async function createWebhook(webhookData) {
  await webhookLimiter.acquire();
  return await oma.webhooks.create(webhookData);
}
```

## Monitoring Rate Limits

### Track Usage

```javascript
class RateLimitTracker {
  constructor() {
    this.usage = new Map();
  }

  track(endpoint) {
    const current = this.usage.get(endpoint) || {
      count: 0,
      resetTime: this.getNextResetTime()
    };

    current.count++;
    this.usage.set(endpoint, current);

    return current;
  }

  getNextResetTime() {
    // Reset at the top of the next hour
    const now = new Date();
    const reset = new Date(now);
    reset.setHours(now.getHours() + 1);
    reset.setMinutes(0);
    reset.setSeconds(0);
    reset.setMilliseconds(0);
    return reset.getTime();
  }

  getUsage(endpoint) {
    return this.usage.get(endpoint);
  }
}

const tracker = new RateLimitTracker();

// Track usage
tracker.track('/payments');
console.log('Payment API usage:', tracker.getUsage('/payments'));
```

### Alert on Threshold

```javascript
const ALERT_THRESHOLD = 0.8; // Alert at 80% of limit

function checkRateLimitStatus(rateLimit) {
  const used = parseInt(rateLimit.used);
  const limit = parseInt(rateLimit.limit);
  const ratio = used / limit;

  if (ratio >= ALERT_THRESHOLD) {
    console.warn(`Rate limit warning: ${used}/${limit} used (${(ratio * 100).toFixed(1)}%)`);

    // Send alert
    sendAlert({
      level: 'warning',
      message: `Rate limit at ${(ratio * 100).toFixed(1)}%`,
      endpoint: rateLimit.endpoint
    });
  }

  return ratio;
}
```

## Best Practices

1. **Implement exponential backoff** for rate limit errors
2. **Cache responses** to reduce API calls
3. **Use batch operations** when possible
4. **Monitor rate limits** proactively
5. **Optimize query efficiency** to minimize requests
6. **Use webhooks** instead of polling
7. **Queue requests** during high-traffic periods
8. **Upgrade tier** if consistently hitting limits

## Error Handling

### Rate Limit Error

```javascript
try {
  const payment = await oma.payments.create(paymentData);
} catch (error) {
  if (error.response && error.response.status === 429) {
    const retryAfter = error.response.headers['retry-after'];
    console.error(`Rate limited. Retry after ${retryAfter} seconds`);

    // Schedule retry
    setTimeout(async () => {
      await oma.payments.create(paymentData);
    }, retryAfter * 1000);
  } else {
    console.error('API error:', error.message);
  }
}
```

## Next Steps

- Learn about [Webhooks](webhooks.md)
- Review [API Reference](../api/README.md)
- Check [Performance Optimization](../troubleshooting/performance.md)
- Understand [Deployment Scaling](../deployment/scaling.md)

## Additional Resources

- [Rate Limiting Best Practices](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)
- [Token Bucket Algorithm](https://en.wikipedia.org/wiki/Token_bucket)
- [Exponential Backoff](https://cloud.google.com/iot/docs/how-tos/exponential-backoff)
