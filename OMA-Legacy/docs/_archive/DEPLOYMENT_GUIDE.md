# Deployment Guide - OpenMarketAccess

## Prerequisites

- Node.js 18+ 
- npm 9+
- PostgreSQL 15+
- Docker (optional)
- Solana wallet (for payments)

## Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/openmarketaccess/oma.git
cd oma
```

### 2. Environment Variables

Create `.env` file:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/openmarketaccess

# Solana
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_USDC_MINT=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
NEXT_PUBLIC_TREASURY_WALLET=YourTreasuryWalletAddress

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Redis (optional)
REDIS_URL=redis://localhost:6379

# Stripe (optional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Start PostgreSQL

```bash
# Using Docker
docker-compose up -d postgres

# Or locally (macOS with Homebrew)
brew services start postgresql
```

### 3. Run Migrations

```bash
cd apps/web
npm run db:push
```

### 4. Seed Database

```bash
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Access: http://localhost:3000

## Production Deployment

### Option 1: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd apps/web
vercel

# Environment Variables in Vercel Dashboard:
# DATABASE_URL
# NEXT_PUBLIC_SOLANA_RPC_URL
# NEXT_PUBLIC_TREASURY_WALLET
# NEXTAUTH_SECRET
```

### Option 2: Docker

#### Build Image

```bash
docker build -t openmarketaccess-web .
```

#### Run with Docker Compose

```bash
docker-compose up -d
```

Access: http://localhost:3000

#### Docker Compose with All Services

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: openmarketaccess
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/openmarketaccess
      REDIS_URL: redis://redis:6379
      NEXT_PUBLIC_SOLANA_RPC_URL: https://api.mainnet-beta.solana.com
      NEXT_PUBLIC_TREASURY_WALLET: ${TREASURY_WALLET}
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
  redis_data:
```

### Option 3: Kubernetes

```yaml
# deployment/k8s/web.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: oma-web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: oma-web
  template:
    metadata:
      labels:
        app: oma-web
    spec:
      containers:
      - name: web
        image: openmarketaccess/web:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: oma-secrets
              key: database-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
---
apiVersion: v1
kind: Secret
metadata:
  name: oma-secrets
type: Opaque
data:
  database-url: <base64-encoded-database-url>
```

Apply:
```bash
kubectl apply -f deployment/k8s/
```

## Backend Deployment (Python/Cortex)

### Using Docker

```bash
cd apps/backend
docker build -t oma-cortex .
docker run -p 8000:8000 -e DATABASE_URL=... oma-cortex
```

### Using Systemd (Linux)

```ini
# /etc/systemd/system/oma-cortex.service
[Unit]
Description=OMA Cortex Backend
After=network.target

[Service]
Type=simple
User=oma
WorkingDirectory=/home/oma/apps/backend
ExecStart=/usr/bin/python -m uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable oma-cortex
sudo systemctl start oma-cortex
```

## Database Setup

### PostgreSQL Initialization

```bash
# Create database
createdb openmarketaccess

# Run schema
psql openmarketaccess < src/lib/db/schema.sql

# Or use Dr migrations
npm run db:push
```

### Redis Setup (Optional for caching)

```bash
# Using Docker
docker run -d -p 6379:6379 redis:7-alpine

# Or install locally
# macOS
brew install redis
brew services start redis

# Ubuntu
sudo apt-get install redis-server
sudo systemctl start redis
```

## Gateway Deployment

### Build and Install

```bash
cd gateway
npm install
npm run build
npm install -g .
```

### Run Gateway

```bash
oma-gateway
```

Gateway will run on stdio and communicate with OMA API.

## Monitoring and Logging

### Application Logs

```bash
# View logs (Docker)
docker-compose logs -f web

# Or (systemd)
journalctl -u oma-cortex -f
```

### Health Checks

```bash
# Web health
curl http://localhost:3000/api/health

# Backend health
curl http://localhost:8000/health

# Database health
docker exec postgres pg_isready
```

### Metrics

- Application metrics: `http://localhost:3000/api/analytics`
- Prometheus metrics (if configured): `http://localhost:9090/metrics`

## Security

### Environment Variables

Never commit `.env` files. Use `.env.example` as template.

### CORS Configuration

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://yourdomain.com', // Or '*' for dev
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};
```

### Rate Limiting

Enabled by default via Redis. Configure via environment:

```bash
REDIS_URL=redis://localhost:6379
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

## Performance Optimization

### Next.js Configuration

```typescript
// next.config.ts
const nextConfig = {
  compress: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'lucide-react',
      '@solana/wallet-adapter-react',
    ],
  },
};
```

### Database Indexing

Indexes are already configured in `src/lib/db/schema.ts`. Verify:

```bash
npm run db:studio
```

## Troubleshooting

### Common Issues

**Build failures:**
- Clear `.next` directory: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

**Database connection errors:**
- Verify DATABASE_URL is correct
- Check PostgreSQL is running: `pg_isready`
- Check firewall settings

**Payment verification failures:**
- Verify Solana RPC URL is accessible
- Check treasury wallet address is correct
- Verify network (devnet vs mainnet)

**Performance issues:**
- Enable Next.js compression
- Configure Redis caching
- Use CDN for static assets
- Enable database connection pooling

## Backup and Recovery

### Database Backup

```bash
# Using pg_dump
pg_dump openmarketaccess > backup_$(date +%Y%m%d).sql

# Automated backup (cron)
0 2 * * * pg_dump openmarketaccess > /backups/daily_$(date +\%Y\%m\%d).sql
```

### Restore

```bash
psql openmarketaccess < backup_20260124.sql
```

---

*For more information, see [API Documentation](./API_DOCUMENTATION.md) and [SDK Guide](./SDK_GUIDE.md)*