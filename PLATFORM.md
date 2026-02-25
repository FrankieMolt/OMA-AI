# OMA-AI - Complete Platform Architecture

## Vision
The premier decentralized marketplace for AI agents - APIs, MCPs/Skills, and Compute.

## Competitors
- **RapidAPI** - API marketplace
- **Smithery.ai** - MCP marketplace  
- **OpenRouter** - LLM API aggregation
- **Akash Network** - Decentralized compute

## Revenue Model
- **90/10 split** - Publishers keep 90%, platform takes 10%
- **x402 micropayments** - Pay per call, no subscriptions
- **Featured listings** - Additional revenue stream

## Tech Stack (Low Cost)

| Component | Service | Cost | Notes |
|-----------|---------|------|-------|
| Frontend | Vercel | FREE | Next.js static + API routes |
| Database | Supabase | FREE | PostgreSQL, Auth, Storage |
| Payments | OpenX402 | FREE | Facilitator, no fees |
| Compute | Akash | CHEAP | 80% cheaper than AWS |
| Domains | Cloudflare | $0-10/yr | DNS + CDN |

## Features

### 1. API Marketplace
- [ ] User registration/login (Supabase Auth)
- [ ] API listing creation (name, description, endpoint, pricing)
- [ ] API documentation auto-generation
- [ ] API key management
- [ ] Usage analytics dashboard
- [ ] x402 payment integration per endpoint

### 2. MCP/Skills Marketplace
- [ ] MCP server listings
- [ ] One-click "Connect" functionality
- [ ] Authentication token handling
- [ ] Server status monitoring
- [ ] Category/tag organization

### 3. Compute Marketplace (Akash)
- [ ] Akash deployment templates
- [ ] GPU/CPU instance listing
- [ ] Deployment management UI
- [ ] Usage tracking and billing

### 4. Payment System
- [ ] x402 with OpenX402 facilitator
- [ ] Base network USDC
- [ ] Solana support (future)
- [ ] Treasury wallet configuration
- [ ] Revenue withdrawal system

### 5. Developer Features
- [ ] API playground/testing
- [ ] Code generation (cURL, JS, Python)
- [ ] Webhook configuration
- [ ] Rate limiting controls
- [ ] Usage quotas

## Database Schema (Supabase)

```sql
-- Users (extends Supabase Auth)
profiles (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  wallet_address TEXT,
  created_at TIMESTAMP
)

-- APIs
apis (
  id UUID PRIMARY KEY,
  owner_id UUID REFERENCES profiles,
  name TEXT,
  slug TEXT UNIQUE,
  description TEXT,
  endpoint_url TEXT,
  documentation TEXT,
  pricing_per_1k NUMERIC DEFAULT 0.001,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP
)

-- MCP Servers
mcp_servers (
  id UUID PRIMARY KEY,
  owner_id UUID REFERENCES profiles,
  name TEXT,
  slug TEXT UNIQUE,
  description TEXT,
  repository_url TEXT,
  deployment_url TEXT,
  auth_type TEXT,
  is_active BOOLEAN DEFAULT true
)

-- API Keys
api_keys (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles,
  api_id UUID REFERENCES apis,
  key_hash TEXT,
  rate_limit INTEGER DEFAULT 1000,
  is_active BOOLEAN DEFAULT true
)

-- Transactions
transactions (
  id UUID PRIMARY KEY,
  from_wallet TEXT,
  to_wallet TEXT,
  amount NUMERIC,
  currency TEXT,
  api_id UUID REFERENCES apis,
  status TEXT,
  tx_hash TEXT,
  created_at TIMESTAMP
)
```

## x402 Integration

### Server Side (Provider)
```javascript
// Middleware checks for X-Payment header
// Verifies with OpenX402 facilitator
// Returns 402 if not paid
```

### Client Side (Consumer)
```javascript
// Use x402-fetch wrapper
// Auto-handles 402 responses
// Signs authorization, retries
```

## File Structure

```
oma-ai/
├── public/
│   ├── index.html          # Landing page
│   ├── apis.html           # API marketplace
│   ├── mcps.html           # MCP marketplace
│   ├── compute.html        # Compute marketplace
│   ├── docs.html           # Documentation
│   ├── pricing.html        # Pricing
│   ├── dashboard.html      # User dashboard
│   ├── privacy.html
│   ├── terms.html
│   └── sitemap.xml
├── api/
│   ├── auth.js             # Supabase auth endpoints
│   ├── apis.js             # API CRUD
│   ├── keys.js             # API key management
│   ├── x402-verify.js      # Payment verification
│   ├── usage.js            # Usage tracking
│   └── webhook.js          # Webhook handler
├── supabase/
│   ├── schema.sql
│   └── policies.sql
├── tests/
│   └── user-flows.spec.ts
└── vercel.json
```

## Deployment

### Vercel (Frontend + API)
```bash
vercel --prod
```

### Supabase
```bash
supabase db push
```

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# x402
X402_RECIPIENT_WALLET=0x...
OPENX402_API_KEY=

# Analytics
NEXT_PUBLIC_GA_ID=
```

## Success Metrics

- [ ] 100+ APIs listed
- [ ] 50+ MCP servers
- [ ] 10+ active publishers
- [ ] First paid transaction
- [ ] $100/day revenue (target)