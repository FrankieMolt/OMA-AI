# Scaling Guide

Strategies for scaling OpenMarketAccess applications.

## Overview

Scaling OpenMarketAccess applications involves horizontal and vertical scaling strategies, load balancing, caching, and database optimization.

## Horizontal Scaling

### Application Layer

#### Multiple Instances

```yaml
# docker-compose.yml
services:
  oma-app:
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
```

#### Kubernetes Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: oma-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: oma-app
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 60
```

#### Load Balancing

```nginx
upstream oma_app {
    least_conn;
    server oma-app-1:3000 weight=3;
    server oma-app-2:3000 weight=3;
    server oma-app-3:3000 weight=2;
    keepalive 32;
}

server {
    listen 80;
    location / {
        proxy_pass http://oma_app;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## Vertical Scaling

### Resource Allocation

#### Kubernetes Resource Requests/Limits

```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "500m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```

#### Docker Resource Limits

```yaml
services:
  oma-app:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## Database Scaling

### Connection Pooling

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'oma',
  user: 'postgres',
  password: 'password',
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Read Replicas

```typescript
const masterPool = new Pool({
  host: 'master-db.example.com',
  // ... config
});

const replicaPool = new Pool({
  host: 'replica-db.example.com',
  // ... config
});

async function read(query, params) {
  return replicaPool.query(query, params);
}

async function write(query, params) {
  return masterPool.query(query, params);
}
```

### Database Sharding

```typescript
const shardPools = {
  shard1: new Pool({ host: 'shard1.example.com' }),
  shard2: new Pool({ host: 'shard2.example.com' }),
  shard3: new Pool({ host: 'shard3.example.com' }),
};

function getShard(userId) {
  const shardIndex = userId % 3;
  return shardPools[`shard${shardIndex + 1}`];
}
```

## Caching

### Redis Caching

```typescript
import Redis from 'ioredis';

const redis = new Redis({
  host: 'redis.example.com',
  port: 6379,
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

async function getCachedPayment(id) {
  const cached = await redis.get(`payment:${id}`);
  if (cached) {
    return JSON.parse(cached);
  }

  const payment = await oma.payments.get(id);
  await redis.setex(`payment:${id}`, 300, JSON.stringify(payment));
  return payment;
}
```

### Application-Level Caching

```typescript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

async function getCachedData(key, fetcher) {
  const cached = cache.get(key);
  if (cached) {
    return cached;
  }

  const data = await fetcher();
  cache.set(key, data);
  return data;
}
```

## Message Queues

### Bull Queue for Background Jobs

```typescript
import Queue from 'bull';

const paymentQueue = new Queue('payments', {
  redis: {
    host: 'redis.example.com',
    port: 6379,
  },
});

// Add job to queue
await paymentQueue.add({
  type: 'process_payment',
  data: { amount: 100, currency: 'USD' }
});

// Process jobs
paymentQueue.process(async (job) => {
  const { type, data } = job.data;

  switch (type) {
    case 'process_payment':
      return processPayment(data);
    default:
      throw new Error(`Unknown job type: ${type}`);
  }
});
```

## CDN Integration

### Static Assets

```typescript
// Upload assets to CDN
import { uploadToCDN } from './cdn';

const assetUrl = await uploadToCDN({
  file: '/path/to/asset.png',
  key: 'assets/asset.png',
  contentType: 'image/png'
});
```

### API Caching with CDN

```typescript
// Set cache headers
app.get('/api/listings', async (req, res) => {
  const listings = await oma.marketplace.listListings();

  // Cache for 5 minutes
  res.set('Cache-Control', 'public, max-age=300');
  res.json(listings);
});
```

## Monitoring and Alerting

### Prometheus Metrics

```typescript
import promClient from 'prom-client';

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration.observe(
      {
        method: req.method,
        route: req.route?.path || req.path,
        status: res.statusCode
      },
      duration
    );
  });
  next();
});
```

### Health Checks

```typescript
app.get('/health', async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    api: await checkAPI(),
  };

  const healthy = Object.values(checks).every(Boolean);

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'unhealthy',
    checks,
  });
});
```

## Auto-Scaling Strategies

### CPU-Based Scaling

```yaml
autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
```

### Memory-Based Scaling

```yaml
autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetMemoryUtilizationPercentage: 80
```

### Custom Metrics

```yaml
autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Pods
    pods:
      metric:
        name: active_requests
      target:
        type: AverageValue
        averageValue: 100
```

## Performance Optimization

### Database Query Optimization

```typescript
// Use indexes
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at);

// Optimize queries
const payments = await oma.payments.list({
  where: { status: 'completed' },
  orderBy: { createdAt: 'desc' },
  take: 50
});
```

### API Response Optimization

```typescript
// Use compression
import compression from 'compression';
app.use(compression());

// Use pagination
const payments = await oma.payments.list({
  page: 1,
  perPage: 50
});

// Use field selection
const payment = await oma.payments.get(id, {
  fields: ['id', 'amount', 'currency', 'status']
});
```

## Disaster Recovery

### Multi-Region Deployment

```yaml
# Deploy to multiple regions
regions:
  - us-east-1
  - us-west-2
  - eu-west-1

# Use DNS for failover
dns:
  type: CNAME
  records:
    - region: us-east-1
      weight: 100
    - region: us-west-2
      weight: 0
    - region: eu-west-1
      weight: 0
```

### Database Backup

```bash
# Automated backups
pg_dump -h localhost -U postgres oma > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -h localhost -U postgres oma < backup_20260124.sql
```

## Best Practices

1. **Start with horizontal scaling** - easier to implement
2. **Use load balancers** for distributing traffic
3. **Implement caching** to reduce database load
4. **Monitor resource usage** continuously
5. **Set up auto-scaling** for dynamic workloads
6. **Use read replicas** for read-heavy workloads
7. **Optimize database queries** before scaling
8. **Implement health checks** for reliability

## See Also

- [Docker Deployment](docker.md)
- [Kubernetes Deployment](kubernetes.md)
- [Performance Issues](../troubleshooting/performance.md)
