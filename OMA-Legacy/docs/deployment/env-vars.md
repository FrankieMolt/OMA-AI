# Environment Variables

Complete reference for OpenMarketAccess environment variables.

## Core Variables

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `OMA_API_KEY` | string | Yes | - | API key for authentication |
| `OMA_API_URL` | string | Yes | `https://api.openmarketaccess.com/v1` | API base URL |
| `OMA_WEBHOOK_SECRET` | string | Yes | - | Webhook secret for signature verification |
| `NODE_ENV` | string | No | `development` | Node environment |
| `PORT` | number | No | `3000` | Application port |

## API Configuration

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `OMA_TIMEOUT` | number | No | `30000` | API request timeout in milliseconds |
| `OMA_MAX_RETRIES` | number | No | `3` | Maximum retry attempts |
| `OMA_RETRY_DELAY` | number | No | `1000` | Initial retry delay in milliseconds |

## Payment Configuration

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `OMA_DEFAULT_CURRENCY` | string | No | `USD` | Default currency for payments |
| `OMA_DEFAULT_PROTOCOL` | string | No | `x402` | Default payment protocol |
| `OMA_PAYMENT_TIMEOUT` | number | No | `300000` | Payment timeout in milliseconds |

## Webhook Configuration

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `OMA_WEBHOOK_URL` | string | No | - | Webhook endpoint URL |
| `OMA_WEBHOOK_TIMEOUT` | number | No | `5000` | Webhook timeout in milliseconds |
| `OMA_WEBHOOK_MAX_RETRIES` | number | No | `5` | Maximum webhook retry attempts |

## MCP Configuration

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `OMA_MCP_ENABLED` | boolean | No | `false` | Enable MCP integration |
| `OMA_MCP_MODEL` | string | No | `gpt-4` | Default AI model |
| `OMA_MCP_MAX_TOKENS` | number | No | `4096` | Maximum tokens per request |
| `OMA_MCP_TEMPERATURE` | number | No | `0.7` | AI model temperature |

## A2A Configuration

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `OMA_A2A_ENABLED` | boolean | No | `false` | Enable A2A protocol |
| `OMA_A2A_AGENT_ID` | string | No | - | Agent ID for A2A communication |
| `OMA_A2A_PRIVATE_KEY` | string | No | - | Private key for signing messages |

## Database Configuration

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `DATABASE_URL` | string | No | - | PostgreSQL connection string |
| `REDIS_URL` | string | No | - | Redis connection string |
| `REDIS_PASSWORD` | string | No | - | Redis password |
| `REDIS_HOST` | string | No | `localhost` | Redis host |
| `REDIS_PORT` | number | No | `6379` | Redis port |

## Logging Configuration

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `LOG_LEVEL` | string | No | `info` | Logging level (debug, info, warn, error) |
| `LOG_FORMAT` | string | No | `json` | Log format (json, text) |
| `LOG_FILE` | string | No | - | Log file path |

## Security Configuration

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `JWT_SECRET` | string | No | - | JWT signing secret |
| `JWT_EXPIRY` | string | No | `1h` | JWT token expiry |
| `ENCRYPTION_KEY` | string | No | - | Data encryption key |
| `CORS_ORIGIN` | string | No | `*` | CORS allowed origins |

## Rate Limiting Configuration

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `RATE_LIMIT_WINDOW` | number | No | `60000` | Rate limit window in milliseconds |
| `RATE_LIMIT_MAX` | number | No | `100` | Maximum requests per window |
| `RATE_LIMIT_SKIP` | string | No | - | Bypass rate limit for specific keys |

## Monitoring Configuration

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `SENTRY_DSN` | string | No | - | Sentry DSN for error tracking |
| `SENTRY_ENVIRONMENT` | string | No | `production` | Sentry environment |
| `DATADOG_API_KEY` | string | No | - | Datadog API key |
| `PROMETHEUS_ENABLED` | boolean | No | `false` | Enable Prometheus metrics |

## Example Configuration

### Development

```env
OMA_API_KEY=test_key_123
OMA_API_URL=https://sandbox-api.openmarketaccess.com/v1
OMA_WEBHOOK_SECRET=test_secret_456
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
```

### Production

```env
OMA_API_KEY=prod_key_abc
OMA_API_URL=https://api.openmarketaccess.com/v1
OMA_WEBHOOK_SECRET=prod_secret_def
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://redis:6379
SENTRY_DSN=https://sentry.io/dsn
```

### Docker

```yaml
environment:
  - OMA_API_KEY=${OMA_API_KEY}
  - OMA_API_URL=${OMA_API_URL}
  - OMA_WEBHOOK_SECRET=${OMA_WEBHOOK_SECRET}
  - NODE_ENV=production
  - DATABASE_URL=postgresql://postgres:password@db:5432/oma
  - REDIS_URL=redis://redis:6379
```

### Kubernetes

```yaml
env:
  - name: OMA_API_KEY
    valueFrom:
      secretKeyRef:
        name: oma-secrets
        key: api-key
  - name: OMA_WEBHOOK_SECRET
    valueFrom:
      secretKeyRef:
        name: oma-secrets
        key: webhook-secret
  - name: NODE_ENV
    value: "production"
```

### Vercel

Set in Vercel dashboard:
- `OMA_API_KEY` = your_api_key
- `OMA_API_URL` = https://api.openmarketaccess.com/v1
- `OMA_WEBHOOK_SECRET` = your_webhook_secret

## Best Practices

1. **Never commit secrets** to version control
2. **Use different values** for each environment
3. **Rotate secrets regularly** (every 90 days)
4. **Use long, random values** for secrets
5. **Limit access** to production secrets
6. **Document all variables** for your team
7. **Use secrets management** tools (Vault, AWS Secrets Manager)

## Secrets Management

### Using .env Files

Create `.env`:

```env
OMA_API_KEY=your_api_key_here
OMA_WEBHOOK_SECRET=your_webhook_secret_here
```

Add to `.gitignore`:

```
.env
.env.local
.env.production
```

### Using Docker Secrets

```yaml
services:
  oma-app:
    secrets:
      - oma_api_key
      - oma_webhook_secret

secrets:
  oma_api_key:
    file: ./secrets/api_key.txt
  oma_webhook_secret:
    file: ./secrets/webhook_secret.txt
```

### Using Kubernetes Secrets

```bash
# Create secret from file
kubectl create secret generic oma-secrets \
  --from-file=api-key=./secrets/api_key.txt \
  --from-file=webhook-secret=./secrets/webhook_secret.txt

# Create secret from literal
kubectl create secret generic oma-secrets \
  --from-literal=api-key=your_api_key \
  --from-literal=webhook-secret=your_webhook_secret
```

## Validation

### Validate Configuration

```typescript
function validateConfig() {
  const required = [
    'OMA_API_KEY',
    'OMA_API_URL',
    'OMA_WEBHOOK_SECRET'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  console.log('Configuration valid');
}
```

## See Also

- [Docker Deployment](docker.md)
- [Kubernetes Deployment](kubernetes.md)
- [Vercel Deployment](vercel.md)
