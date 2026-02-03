# OMA - Complete Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [x402 Payment Protocol](#x402-payment-protocol)
3. [MCP Integration](#mcp-integration)
4. [SDK Documentation](#sdk-documentation)
5. [API Reference](#api-reference)
6. [Deployment Guide](#deployment-guide)
7. [Developer Workflow](#developer-workflow)
8. [Optimization & Best Practices](#optimization--best-practices)

---

## Architecture Overview

OpenMarketAccess (OMA) is a decentralized platform for building, deploying, and monetizing autonomous AI agents. The architecture consists of three main layers:

### Core Components

```
┌─────────────────────────────────────────────────────────────┐
│                 Discovery Layer                           │
│              (Marketplace Web UI)                        │
│  • Agent Directory                                        │
│  • MCP Server Discovery                                   │
│  • Skills Marketplace                                     │
│  • Provider Verification                                  │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 Payment Layer                             │
│              (x402 Protocol)                            │
│  • HTTP 402 Implementation                              │
│  • Solana Blockchain Settlement                          │
│  • Replay Protection                                    │
│  • Micro-transaction Management                          │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 Runtime Layer                            │
│            (OMA Gateway + MCP Proxy)                    │
│  • Agent Execution                                      │
│  • MCP Server Proxy                                     │
│  • Security & Sandboxing                               │
│  • Usage Analytics                                      │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Node.js Runtime, Drizzle ORM
- **Database**: PostgreSQL with connection pooling
- **Blockchain**: Solana Web3.js, Wallet Adapter Protocol
- **Protocol**: Model Context Protocol (MCP) for interoperability
- **Design System**: Deep Space Cyberpunk theme with glassmorphism

---

## x402 Payment Protocol

The x402 protocol is OMA's core innovation - a modern HTTP 402 implementation for Solana micropayments.

### Payment Flow

1. **Request**: Client sends request to agent endpoint
2. **Challenge**: Gateway returns 402 with payment requirements
3. **Payment**: Client creates Solana transaction for micro-payment
4. **Verification**: Gateway validates signature and replay protection
5. **Execution**: Request forwarded to agent with verified payment

### Implementation

#### Middleware Integration
```typescript
import { x402Middleware } from '@oma/sdk';

// Apply to protected routes
app.use('/api/agents/:id', x402Middleware({
  treasuryWallet: process.env.TREASURY_WALLET,
  pricePerRequest: 0.1, // SOL
  cacheProvider: redisClient,
  solanaRpc: process.env.SOLANA_RPC_URL
}));
```

#### Client SDK Usage
```typescript
import { OMAClient } from '@oma/sdk';

const client = new OMAClient({
  apiKey: 'your-api-key',
  wallet: walletAdapter
});

const result = await client.execute({
  listingId: 'data-analyzer',
  params: { dataset: 'sales-2024.csv' }
});
```

### Security Features

- **Replay Protection**: 5-minute TTL cache prevents double-spending
- **Signature Verification**: Ed25519 cryptographic validation
- **Nonce Validation**: Unique nonces for each transaction
- **Rate Limiting**: Configurable per-client rate limits
- **Amount Tolerance**: Epsilon variance protection (0.0001 SOL)

---

## MCP Integration

Model Context Protocol (MCP) enables seamless integration between agents and tools.

### MCP Server Types

1. **Local MCP Servers**: Run in same environment as agent
2. **Remote MCP Servers**: Accessed via HTTP with x402 payments
3. **Hybrid MCP**: Local execution with remote capabilities

### MCP Proxy Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Client    │────▶│ MCP Proxy   │────▶│ MCP Server  │
│             │     │              │     │             │
│ Request +   │     │ x402 Auth   │     │ Tool Logic  │
│ Payment     │     │ Validation   │     │             │
└─────────────┘◀────└──────────────┘◀────└─────────────┘
     Response               Forwarding           Result
```

### MCP Tool Registration

```typescript
import { MCPServer } from '@oma/sdk';

const server = new MCPServer({
  name: 'database-query',
  version: '1.0.0',
  pricing: { perCall: 0.01, currency: 'SOL' }
});

server.registerTool({
  name: 'query',
  description: 'Execute SQL queries',
  schema: {
    type: 'object',
    properties: {
      sql: { type: 'string' },
      database: { type: 'string' }
    }
  },
  handler: async (params) => {
    // Database query logic
    return await db.query(params.sql);
  }
});
```

---

## SDK Documentation

### Installation

```bash
npm install @oma/sdk
```

### Core Classes

#### OMAClient
Main client for interacting with OMA platform.

```typescript
import { OMAClient } from '@oma/sdk';

const client = new OMAClient({
  apiKey: process.env.OMA_API_KEY,
  environment: 'production', // or 'development'
  wallet: wallet // Optional for payments
});
```

#### AgentManager
Manage agent lifecycle and execution.

```typescript
const agentManager = new AgentManager(client);

// Execute agent
const result = await agentManager.execute({
  listingId: 'data-analyzer',
  params: { input: 'Analyze this dataset' },
  maxPrice: 0.5 // SOL
});

// Get agent status
const status = await agentManager.getStatus('execution-id');
```

#### MCPBridge
Connect to MCP servers with payment integration.

```typescript
const mcpBridge = new MCPBridge(client);

// Connect to remote MCP server
const server = await mcpBridge.connect({
  serverUrl: 'https://api.example.com/mcp',
  authMethod: 'x402'
});

// Call MCP tool
const result = await server.callTool('query', {
  sql: 'SELECT * FROM users LIMIT 10'
});
```

### React Hooks

```typescript
import { useOMA, useAgent, useMCPServer } from '@oma/sdk/react';

// Main OMA context
const { client, isConnected } = useOMA();

// Agent execution hook
const { execute, isLoading, error } = useAgent('data-analyzer');

// MCP server hook
const { server, tools } = useMCPServer('database-tools');
```

---

## API Reference

### Core Endpoints

#### Agent Execution
```
POST /api/v1/agents/{id}/execute
```

**Headers:**
- `Content-Type: application/json`
- `PAYMENT-SIGNATURE: ed25519-signature` (if paid)
- `Authorization: Bearer api-key` (optional)

**Body:**
```json
{
  "params": {
    "input": "text to process",
    "options": { "temperature": 0.7 }
  }
}
```

#### MCP Server Proxy
```
POST /api/v1/mcp/{server-id}/tools/{tool-name}
```

**Headers:**
- `Content-Type: application/json`
- `PAYMENT-SIGNATURE: ed25519-signature`
- `X-MCP-Version: 1.0.0`

**Body:**
```json
{
  "arguments": {
    "param1": "value1",
    "param2": "value2"
  }
}
```

#### Listing Management
```
GET /api/v1/listings          # Get all listings
GET /api/v1/listings/{id}     # Get specific listing
POST /api/v1/listings         # Create listing (auth required)
PUT /api/v1/listings/{id}     # Update listing (auth required)
```

### WebSocket Endpoints

#### Real-time Execution Updates
```
WS /ws/execution/{execution-id}
```

#### Agent Telemetry
```
WS /ws/agents/{agent-id}/telemetry
```

---

## Deployment Guide

### Local Development

```bash
# Clone repository
git clone https://github.com/openmarketaccess/oma.git
cd oma

# Install dependencies
npm install
npm run dev

# Setup database
npm run db:setup
npm run db:seed
```

### Production Deployment

#### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

#### Kubernetes Manifest
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: oma-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: oma-api
  template:
    metadata:
      labels:
        app: oma-api
    spec:
      containers:
      - name: oma-api
        image: oma:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: oma-secrets
              key: database-url
```

#### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/oma

# Solana
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
TREASURY_WALLET=7xgS3vD9M4kr...

# Redis (for caching)
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-jwt-secret
API_KEY_SECRET=your-api-secret

# Monitoring
SENTRY_DSN=your-sentry-dsn
```

---

## Developer Workflow

### 1. Agent Development

Create an agent that integrates with OMA:

```typescript
import { Agent, Tool } from '@oma/sdk';

export class DataAnalyzer extends Agent {
  constructor() {
    super({
      name: 'data-analyzer',
      description: 'Advanced data analysis agent',
      pricing: { perRequest: 0.1, currency: 'SOL' }
    });
  }

  @Tool({ name: 'analyze', description: 'Analyze dataset' })
  async analyze(data: any[]) {
    // Analysis logic
    return {
      summary: this.generateSummary(data),
      insights: this.extractInsights(data),
      visualizations: this.createVisualizations(data)
    };
  }
}
```

### 2. MCP Server Development

Create a MCP server:

```typescript
import { MCPServer } from '@oma/sdk';

const server = new MCPServer({
  name: 'weather-tools',
  version: '1.0.0'
});

server.registerTool({
  name: 'get-weather',
  description: 'Get current weather',
  parameters: {
    location: { type: 'string', required: true }
  },
  handler: async ({ location }) => {
    const response = await fetch(
      `https://api.weather.com/v1/weather?q=${location}`
    );
    return response.json();
  }
});

server.start(3001);
```

### 3. Testing

```typescript
import { testClient } from '@oma/sdk/testing';

describe('DataAnalyzer', () => {
  test('should analyze dataset correctly', async () => {
    const result = await testClient.execute({
      agent: 'data-analyzer',
      params: { data: [1, 2, 3, 4, 5] }
    });

    expect(result.summary.mean).toBe(3);
    expect(result.insights).toHaveLength(2);
  });
});
```

---

## Optimization & Best Practices

### Performance Optimization

#### 1. Database Optimization
```sql
-- Index for agent lookups
CREATE INDEX idx_listings_category_status ON api_listings(category, status);

-- Partition usage records by date
CREATE TABLE usage_records_2024_01 PARTITION OF usage_records
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

#### 2. Caching Strategy
```typescript
import Redis from 'ioredis';

const cache = new Redis(process.env.REDIS_URL);

// Cache expensive operations
const cachedResult = await cache.get(`agent:${id}:result`);
if (!cachedResult) {
  const result = await agent.execute(params);
  await cache.setex(`agent:${id}:result`, 300, result);
}
```

#### 3. Connection Pooling
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Security Best Practices

#### 1. Input Validation
```typescript
import { z } from 'zod';

const AgentSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(10).max(1000),
  endpoint: z.url().https(),
  pricing: z.object({
    perRequest: z.number().min(0),
    currency: z.enum(['SOL', 'USDC'])
  })
});

// Validate input
const validated = AgentSchema.parse(input);
```

#### 2. Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests
  standardHeaders: true,
  legacyHeaders: false,
});
```

#### 3. Security Headers
```typescript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));
```

### Monitoring & Observability

#### 1. Metrics Collection
```typescript
import { register, Counter, Histogram } from 'prom-client';

const requestCounter = new Counter({
  name: 'oma_requests_total',
  help: 'Total number of requests',
  labelNames: ['method', 'route', 'status']
});

const requestDuration = new Histogram({
  name: 'oma_request_duration_seconds',
  help: 'Request duration in seconds',
  labelNames: ['method', 'route']
});
```

#### 2. Error Tracking
```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

// Error handler
app.use((err, req, res, next) => {
  Sentry.captureException(err);
  res.status(500).json({ error: 'Internal server error' });
});
```

#### 3. Health Checks
```typescript
app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      solana: await checkSolana()
    }
  };
  res.json(health);
});
```

---

## Conclusion

This comprehensive documentation covers the entire OMA ecosystem from architecture to deployment. The platform is designed to be:

- **Developer-Friendly**: Easy SDK integration and comprehensive APIs
- **Secure**: Cryptographic payment verification and sandboxed execution
- **Scalable**: Microservice architecture with horizontal scaling
- **Interoperable**: MCP protocol for seamless tool integration
- **Monetizable**: x402 protocol for per-usage payments

For additional support:
- Check the [GitHub Discussions](https://github.com/openmarketaccess/oma/discussions)
- Join our [Discord Community](https://discord.gg/oma)
- Review the [API Examples](https://github.com/openmarketaccess/examples)

---

*Last updated: January 2026*