# Performance Issues

Diagnosing and resolving performance problems.

## Overview

Performance issues can manifest as slow response times, high latency, or excessive resource usage. This guide helps diagnose and resolve performance problems.

## Monitoring

### Enable Performance Monitoring

```typescript
const oma = new OpenMarketAccess({
  apiKey: 'your_key',
  monitor: true,
  metrics: {
    enabled: true,
    endpoint: 'https://metrics.yourapp.com'
  }
});
```

### Track Response Times

```typescript
const start = Date.now();
const response = await oma.payments.list();
const duration = Date.now() - start;

console.log(`Response time: ${duration}ms`);
console.log('Rate limit:', {
  limit: response.headers['x-ratelimit-limit'],
  remaining: response.headers['x-ratelimit-remaining'],
  reset: response.headers['x-ratelimit-reset']
});
```

## Common Performance Bottlenecks

### 1. Excessive API Calls

**Symptoms:**
- Slow application performance
- High API usage
- Rate limit errors

**Solutions:**

#### Batch Requests

```typescript
// Instead of multiple requests
const user1 = await oma.users.get('user_1');
const user2 = await oma.users.get('user_2');

// Use batch endpoint
const users = await oma.users.batchGet(['user_1', 'user_2']);
```

#### Use Pagination

```typescript
// Fetch all pages efficiently
async function getAllPayments() {
  let payments = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await oma.payments.list({
      page,
      perPage: 100
    });
    payments = payments.concat(response.data);
    hasMore = response.pagination.hasMore;
    page++;
  }

  return payments;
}
```

### 2. Inefficient Database Queries

**Symptoms:**
- Slow data retrieval
- High database load
- Timeout errors

**Solutions:**

#### Add Indexes

```sql
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at);
```

#### Optimize Queries

```typescript
// Use specific fields
const payment = await oma.payments.get(id, {
  fields: ['id', 'amount', 'status']
});

// Use filters
const payments = await oma.payments.list({
  status: 'completed',
  startDate: '2026-01-01',
  endDate: '2026-01-31'
});
```

### 3. High Network Latency

**Symptoms:**
- Slow API responses
- Timeout errors
- Intermittent failures

**Solutions:**

#### Use CDN

```typescript
// Serve static assets from CDN
const cdnUrl = 'https://cdn.yourapp.com';
```

#### Implement Caching

```typescript
const cache = new NodeCache({ stdTTL: 300 });

async function getCachedPayment(id) {
  const cached = cache.get(id);
  if (cached) {
    return cached;
  }

  const payment = await oma.payments.get(id);
  cache.set(id, payment);
  return payment;
}
```

### 4. Synchronous Operations

**Symptoms:**
- Blocking operations
- Slow application response
- Poor user experience

**Solutions:**

#### Use Async Operations

```typescript
// Process multiple requests concurrently
const [payments, users, listings] = await Promise.all([
  oma.payments.list(),
  oma.users.list(),
  oma.marketplace.listListings()
]);
```

#### Use Message Queues

```typescript
// Queue background tasks
await queue.add('process_payment', { paymentId: 'pay_123' });
```

## Optimization Strategies

### Response Compression

```typescript
import compression from 'compression';

app.use(compression());
```

### Connection Pooling

```typescript
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'oma',
  user: 'postgres',
  password: 'password',
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000
});
```

### Lazy Loading

```typescript
// Load data only when needed
async function getPaymentWithDetails(id) {
  const payment = await oma.payments.get(id);

  // Load related data only if requested
  if (payment.needsDetails) {
    payment.details = await loadPaymentDetails(id);
  }

  return payment;
}
```

### Debouncing and Throttling

```typescript
import { debounce, throttle } from 'lodash';

// Debounce - wait until user stops typing
const searchListings = debounce(async (query) => {
  return await oma.marketplace.listListings({ search: query });
}, 300);

// Throttle - limit function calls
const refreshData = throttle(async () => {
  return await oma.payments.list();
}, 1000);
```

## Performance Testing

### Load Testing with k6

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '20s', target: 0 },
  ],
};

export default function() {
  let response = http.get('https://api.openmarketaccess.com/v1/payments', {
    headers: {
      'Authorization': `Bearer ${__ENV.API_KEY}`,
    },
  });

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

### Benchmarking

```typescript
async function benchmark(endpoint) {
  const iterations = 100;
  const times = [];

  for (let i = 0; i < iterations; i++) {
    const start = Date.now();
    await oma.request(endpoint);
    times.push(Date.now() - start);
  }

  const avg = times.reduce((a, b) => a + b) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);

  console.log(`Benchmark results for ${endpoint}:`);
  console.log(`Average: ${avg}ms`);
  console.log(`Min: ${min}ms`);
  console.log(`Max: ${max}ms`);
}

benchmark('/payments');
```

## Performance Metrics

### Key Metrics to Monitor

| Metric | Target | Action |
|--------|--------|--------|
| API Response Time | < 500ms | Optimize queries, add caching |
| Database Query Time | < 100ms | Add indexes, optimize queries |
| Webhook Delivery Time | < 5s | Optimize handlers, use queues |
| Error Rate | < 1% | Investigate and fix errors |
| CPU Usage | < 70% | Scale horizontally |
| Memory Usage | < 80% | Optimize memory usage, scale |

### Setting Up Alerts

```typescript
import { checkThreshold, sendAlert } from './monitoring';

function checkMetrics(metrics) {
  if (metrics.responseTime > 500) {
    sendAlert('High response time', metrics);
  }

  if (metrics.errorRate > 0.01) {
    sendAlert('High error rate', metrics);
  }

  if (metrics.cpuUsage > 0.7) {
    sendAlert('High CPU usage', metrics);
  }
}
```

## Database Optimization

### Query Optimization

```sql
-- Use EXPLAIN to analyze queries
EXPLAIN ANALYZE SELECT * FROM payments WHERE status = 'completed';

-- Add composite indexes for multi-column queries
CREATE INDEX idx_payments_status_created ON payments(status, created_at);
```

### Connection Pool Tuning

```typescript
const pool = new Pool({
  max: 20, // Maximum connections
  min: 2, // Minimum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

## Application Optimization

### Reduce Payload Size

```typescript
// Use field selection
const payment = await oma.payments.get(id, {
  fields: ['id', 'amount', 'status']
});

// Use compression
app.use(compression({ level: 6 }));
```

### Optimize Webhook Handlers

```typescript
// Return quickly, process asynchronously
app.post('/webhook', (req, res) => {
  // Process webhook in background
  processWebhookAsync(req.body);

  // Return immediately
  res.status(200).send('OK');
});
```

## Scaling Strategies

### Horizontal Scaling

```yaml
# Kubernetes HPA
autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
```

### Vertical Scaling

```yaml
# Increase resources
resources:
  requests:
    memory: 512Mi
    cpu: 500m
  limits:
    memory: 1Gi
    cpu: 1000m
```

## Best Practices

1. **Monitor performance** continuously
2. **Use caching** for frequently accessed data
3. **Optimize database queries** with proper indexes
4. **Implement async processing** for long-running tasks
5. **Use CDN** for static assets
6. **Compress responses** to reduce bandwidth
7. **Set up alerts** for performance degradation
8. **Test under load** before production

## See Also

- [Scaling Guide](../deployment/scaling.md)
- [Common Issues](common-issues.md)
- [Deployment Guide](../deployment/docker.md)
