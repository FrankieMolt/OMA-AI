# Deployment Issues

Troubleshooting deployment problems.

## Docker Deployment Issues

### Problem: Container Won't Start

**Symptoms:**
- Container exits immediately
- Error: "container exited with code 1"

**Solutions:**

1. Check logs:
```bash
docker logs oma-app
```

2. Verify environment variables:
```bash
docker inspect oma-app | grep Env
```

3. Check port conflicts:
```bash
netstat -tuln | grep 3000
```

### Problem: Network Connection Issues

**Symptoms:**
- Cannot connect to API
- Timeout errors
- DNS resolution failed

**Solutions:**

1. Check network mode:
```yaml
# docker-compose.yml
services:
  oma-app:
    network_mode: bridge
```

2. Verify DNS settings:
```yaml
services:
  oma-app:
    dns:
      - 8.8.8.8
      - 8.8.4.4
```

3. Check firewall rules:
```bash
# Allow outbound traffic
docker run --rm -p 3000:3000 oma-app curl https://api.openmarketaccess.com/v1/health
```

### Problem: Volume Mount Issues

**Symptoms:**
- Permission denied errors
- Data not persisting
- Volume not accessible

**Solutions:**

1. Check permissions:
```bash
ls -la ./data
```

2. Use correct user:
```dockerfile
FROM node:18-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S oma -u 1001

USER oma
```

3. Verify mount points:
```bash
docker volume inspect oma-data
```

## Kubernetes Deployment Issues

### Problem: Pod Won't Start

**Symptoms:**
- Pod status: Pending
- Pod status: CrashLoopBackOff

**Solutions:**

1. Check pod status:
```bash
kubectl describe pod oma-app-xxxxx
```

2. Check logs:
```bash
kubectl logs oma-app-xxxxx
```

3. Check events:
```bash
kubectl get events --sort-by='.lastTimestamp'
```

### Problem: Resource Limits Exceeded

**Symptoms:**
- OOMKilled errors
- CPU throttling
- Pod restarts

**Solutions:**

1. Check resource usage:
```bash
kubectl top pod oma-app-xxxxx
```

2. Adjust resource limits:
```yaml
resources:
  requests:
    memory: 512Mi
    cpu: 500m
  limits:
    memory: 1Gi
    cpu: 1000m
```

3. Enable horizontal scaling:
```bash
kubectl autoscale deployment oma-app --cpu-percent=70 --min=3 --max=10
```

### Problem: Service Not Accessible

**Symptoms:**
- Cannot reach service
- Connection refused
- 502 Bad Gateway

**Solutions:**

1. Check service status:
```bash
kubectl get svc oma-app
```

2. Verify service endpoints:
```bash
kubectl get endpoints oma-app
```

3. Check ingress configuration:
```bash
kubectl describe ingress oma-ingress
```

## Vercel Deployment Issues

### Problem: Build Fails

**Symptoms:**
- Build error during deployment
- Module not found errors
- TypeScript compilation errors

**Solutions:**

1. Check build logs:
```bash
vercel logs
```

2. Verify dependencies:
```bash
npm ci
npm run build
```

3. Check TypeScript configuration:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node"
  }
}
```

### Problem: Environment Variables Missing

**Symptoms:**
- API key errors
- Configuration missing
- Undefined variables

**Solutions:**

1. List environment variables:
```bash
vercel env ls
```

2. Add missing variables:
```bash
vercel env add OMA_API_KEY
```

3. Pull environment variables:
```bash
vercel env pull .env.local
```

## Database Issues

### Problem: Connection Pool Exhausted

**Symptoms:**
- Connection timeout errors
- "too many connections" errors
- Slow query performance

**Solutions:**

1. Check connection pool size:
```typescript
const pool = new Pool({
  max: 20, // Increase if needed
  min: 2,
  idleTimeoutMillis: 30000
});
```

2. Monitor active connections:
```sql
SELECT count(*) FROM pg_stat_activity;
```

3. Close connections properly:
```typescript
// Use connection pool
const client = await pool.connect();
try {
  await client.query('SELECT NOW()');
} finally {
  client.release();
}
```

### Problem: Migration Fails

**Symptoms:**
- Schema mismatch errors
- Migration script errors
- Data inconsistency

**Solutions:**

1. Check migration status:
```bash
npm run migrate:status
```

2. Rollback migration:
```bash
npm run migrate:rollback
```

3. Re-run migration:
```bash
npm run migrate:up
```

## Monitoring and Debugging

### Health Checks

```typescript
app.get('/health', async (req, res) => {
  const checks = {
    api: await checkAPI(),
    database: await checkDatabase(),
    redis: await checkRedis()
  };

  const healthy = Object.values(checks).every(Boolean);

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'unhealthy',
    checks
  });
});
```

### Logging

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Error Tracking

```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

## Best Practices

1. **Use health checks** for all services
2. **Implement graceful shutdown**
3. **Use rolling deployments** to minimize downtime
4. **Monitor resource usage** continuously
5. **Set up alerts** for critical issues
6. **Backup data regularly**
7. **Test deployments** in staging first
8. **Document deployment procedures**

## See Also

- [Docker Deployment](../deployment/docker.md)
- [Kubernetes Deployment](../deployment/kubernetes.md)
- [Common Issues](common-issues.md)
