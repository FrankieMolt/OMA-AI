# 📋 OMA-AI MCP/SKILLS REGISTRY SETUP

## 🎯 Overview

OMA-AI's MCP/Skills Registry is a **real, production-ready system** that allows developers to register, discover, and monetize MCP (Model Context Protocol) servers.

**Key Features:**
- ✅ Real database-backed registry (PostgreSQL via Supabase)
- ✅ MCP server registration & verification workflow
- ✅ Tool discovery & execution
- ✅ Usage tracking & analytics
- ✅ x402 payment integration (gasless microtransactions)
- ✅ Review & rating system
- ✅ Real-time MCP server status

---

## 📁 Project Structure

```
/root/oma-ai/
├── src/app/api/mcp/
│   ├── register/route.ts          # MCP registration endpoint
│   ├── list/route.ts              # MCP listing endpoint (DB-backed)
│   └── [slug]/route.ts            # MCP details endpoint
├── database/supabase/migrations/
│   └── 001_create_mcp_registry.sql   # Database schema
├── mcp-template/                  # MCP server template
│   ├── index.ts                   # Example MCP server
│   ├── package.json               # Dependencies
│   └── README.md                  # Setup guide
└── public/.well-known/
    └── mcp.json                  # MCP discovery config
```

---

## 🗄️ Database Schema

### Tables:

#### `mcp_servers`
- Stores MCP server metadata
- Tracks status (pending, active, disabled, rejected)
- Includes rating, usage stats, verification

#### `mcp_tools`
- Individual tools within each MCP server
- Tool-specific pricing and usage tracking
- Input schema definitions

#### `mcp_usage`
- Usage logs for analytics
- Tracks success/failure rates
- Records response times

#### `mcp_reviews`
- User reviews and ratings
- Prevents duplicate reviews per user

### Setup Database:

```bash
# 1. Create Supabase project
# Go to: https://supabase.com

# 2. Get credentials
# - NEXT_PUBLIC_SUPABASE_URL
# - SUPABASE_SERVICE_ROLE_KEY

# 3. Run migration
psql -h db.xxx.supabase.co -U postgres -d postgres -f database/supabase/migrations/001_create_mcp_registry.sql

# 4. Add environment variables to .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 🚀 API Endpoints

### 1. Register MCP Server

**POST** `/api/mcp/register`

Register a new MCP server to the marketplace.

**Request Body:**
```json
{
  "name": "My Weather MCP",
  "slug": "my-weather-mcp",
  "category": "weather",
  "description": "Real-time weather data for AI agents",
  "long_description": "Comprehensive weather API...",
  "author": "your-username",
  "author_email": "you@example.com",
  "repository_url": "https://github.com/username/my-weather-mcp",
  "website_url": "https://my-weather-mcp.com",
  "documentation_url": "https://my-weather-mcp.com/docs",
  "logo_url": "https://my-weather-mcp.com/logo.png",
  "version": "1.0.0",
  "mcp_endpoint": "https://my-mcp.vercel.app/api/mcp/sse",
  "transport": "sse",
  "pricing_usdc": 0.001,
  "x402_enabled": true,
  "tags": ["weather", "forecast", "api"],
  "tools": [
    {
      "name": "get_current_weather",
      "description": "Get current weather for a location",
      "pricing_usdc": 0.001
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "my-weather-mcp",
    "name": "My Weather MCP",
    "status": "pending",
    "message": "MCP server registered successfully. Pending verification."
  }
}
```

---

### 2. List MCP Servers

**GET** `/api/mcp/list`

List all active MCP servers with filters.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `category` - Filter by category (default: all)
- `verified` - Show only verified MCPs (true/false)
- `author` - Filter by author
- `search` - Search by name or description

**Example:**
```bash
curl https://www.oma-ai.com/api/mcp/list?page=1&limit=10&category=weather&verified=true
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "weather-api",
      "name": "Weather API",
      "category": "weather",
      "description": "Real-time weather data",
      "author": "weather-user",
      "pricing_usdc": 0.001,
      "x402_enabled": true,
      "verified": true,
      "rating": 4.5,
      "total_calls": 1000,
      "success_rate": 99.5,
      "created_at": "2026-03-12T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "filters": {
    "categories": ["ai", "blockchain", "weather", ...],
    "verifiedSkillsCount": 15,
    "totalSkills": 25
  }
}
```

---

### 3. Get MCP Details

**GET** `/api/mcp/[slug]`

Get detailed information about a specific MCP server.

**Example:**
```bash
curl https://www.oma-ai.com/api/mcp/weather-api
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "weather-api",
    "name": "Weather API",
    "category": "weather",
    "description": "Real-time weather data",
    "long_description": "...",
    "author": "weather-user",
    "repository_url": "https://github.com/weather-user/weather-api",
    "website_url": "https://weather-api.com",
    "pricing_usdc": 0.001,
    "x402_enabled": true,
    "verified": true,
    "rating": 4.5,
    "total_calls": 1000,
    "success_rate": 99.5,
    "tools": [
      {
        "id": "uuid",
        "name": "get_current_weather",
        "description": "Get current weather",
        "input_schema": {
          "type": "object",
          "properties": {
            "location": { "type": "string" }
          }
        },
        "pricing_usdc": 0.001,
        "total_calls": 500
      }
    ],
    "reviews": [
      {
        "id": "uuid",
        "user_id": "user123",
        "rating": 5,
        "review_text": "Great API!",
        "created_at": "2026-03-12T00:00:00Z"
      }
    ]
  }
}
```

---

### 4. Delete MCP Server

**DELETE** `/api/mcp/[slug]`

Delete a registered MCP server.

**Example:**
```bash
curl -X DELETE https://www.oma-ai.com/api/mcp/weather-api
```

**Response:**
```json
{
  "success": true,
  "message": "MCP server deleted successfully"
}
```

---

## 📝 MCP Server Registration Flow

### Step 1: Create MCP Server

```bash
# Use template
cp -r mcp-template my-new-mcp
cd my-new-mcp
npm install

# Customize tools
# Edit index.ts to add your tools

# Test locally
npm run dev
```

### Step 2: Deploy to Production

```bash
# Deploy to Vercel (recommended - free)
vercel

# OR deploy to VPS
# 1. Copy files to VPS
# 2. Install dependencies
# 3. Run with PM2
```

### Step 3: Register with OMA

```bash
curl -X POST https://www.oma-ai.com/api/mcp/register \
  -H "Content-Type: application/json" \
  -d @registration.json
```

### Step 4: Wait for Verification

- Status: `pending` (manual review)
- Once verified: Status becomes `active`
- You'll receive email notification

### Step 5: Start Receiving Calls

- Agents discover your MCP via `/api/mcp/list`
- Agents call your tools via MCP endpoint
- Usage tracked in database
- Payouts sent monthly (Base USDC)

---

## 🔒 x402 Payment Integration

### Overview:

x402 is a gasless payment protocol that enables AI agents to pay for MCP tool usage without requiring users to hold cryptocurrency.

### How It Works:

1. **Agent Calls Tool** → OMA checks user balance
2. **Payment Required** → Agent signs x402 payment (EIP-712 on Base)
3. **Payment Verified** → OMA calls MCP with auth token
4. **Tool Executes** → MCP returns result
5. **Payment Transferred** → USDC sent to MCP owner

### MCP Server Implementation:

```typescript
import { verifyOMAPayment } from 'oma-auth';

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  // Verify x402 payment
  const authHeader = request.headers['x-oma-auth'];
  const isValid = await verifyOMAPayment(authHeader);

  if (!isValid) {
    throw new Error('Invalid or expired x402 payment');
  }

  // Execute tool
  const result = await executeTool(name, args);

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result),
      },
    ],
  };
});
```

### Pricing:

| Tier | Price | Use Case |
|------|-------|----------|
| Free | $0 | Basic tools |
| Low | $0.0001 - $0.001 | Simple APIs |
| Medium | $0.001 - $0.01 | Complex tools |
| High | $0.01 - $0.10 | Premium features |

### Payouts:

- Monthly payouts (Base USDC)
- Minimum: $10 USDC
- 95% payout rate (5% OMA fee)
- Automatic transfer to registered wallet

---

## 🧪 Testing

### Test MCP Registration:

```bash
# 1. Create test registration file
cat > test-registration.json << 'EOF'
{
  "name": "Test MCP",
  "slug": "test-mcp",
  "category": "test",
  "description": "Test MCP server",
  "author": "test-user",
  "mcp_endpoint": "https://test-mcp.vercel.app/api/mcp/sse",
  "transport": "sse",
  "pricing_usdc": 0,
  "x402_enabled": false,
  "tools": []
}
EOF

# 2. Register
curl -X POST http://localhost:3000/api/mcp/register \
  -H "Content-Type: application/json" \
  -d @test-registration.json
```

### Test MCP Listing:

```bash
curl http://localhost:3000/api/mcp/list
```

### Test MCP Details:

```bash
curl http://localhost:3000/api/mcp/test-mcp
```

---

## 📊 Analytics & Monitoring

### View Usage Stats:

```sql
-- MCP usage by server
SELECT
  m.name,
  m.slug,
  COUNT(*) as total_calls,
  SUM(CASE WHEN u.call_success THEN 1 ELSE 0 END) as success_calls,
  AVG(u.response_time_ms) as avg_response_time
FROM mcp_servers m
LEFT JOIN mcp_usage u ON m.id = u.mcp_server_id
WHERE m.status = 'active'
GROUP BY m.id, m.name, m.slug
ORDER BY total_calls DESC;
```

### View Revenue:

```sql
-- Monthly revenue per MCP
SELECT
  m.name,
  m.slug,
  m.author,
  SUM(u.pricing_usdc) as revenue_usdc,
  SUM(u.pricing_usdc) * 0.95 as payout_usdc
FROM mcp_servers m
LEFT JOIN mcp_usage u ON m.id = u.mcp_server_id
WHERE m.status = 'active'
  AND u.created_at >= NOW() - INTERVAL '30 days'
  AND u.call_success = true
GROUP BY m.id, m.name, m.slug, m.author
ORDER BY revenue_usdc DESC;
```

---

## 🔧 Configuration

### Environment Variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# x402 Configuration (optional)
X402_TREASURY_ADDRESS=0x...
X402_CHAIN_ID=8453  # Base mainnet
```

---

## 📚 Documentation Links

- **Comprehensive MCP Guide:** `/root/.openclaw/workspace/COMPREHENSIVE_MCP_GUIDE.md`
- **MCP Template:** `/root/oma-ai/mcp-template/README.md`
- **MCP Specification:** https://modelcontextprotocol.io

---

## 🤝 Contributing

### Adding New Features:

1. Create Supabase migration
2. Update API routes
3. Add tests
4. Update documentation

### Submitting MCP Servers:

1. Build your MCP server
2. Deploy to production
3. Register via `/api/mcp/register`
4. Wait for verification

---

## 🆘 Troubleshooting

### MCP Not Appearing in Marketplace:

- Check `status` column (must be `active`)
- Verify `mcp_endpoint` is accessible
- Check Supabase connection

### Registration Failed:

- Verify all required fields
- Check slug uniqueness
- Validate transport type
- Ensure pricing is non-negative

### Usage Not Tracking:

- Check MCP server logs
- Verify x402 payment flow
- Check database connection

---

## 📞 Support

- **GitHub Issues:** https://github.com/FrankieMolt/OMA-AI/issues
- **Discord:** https://discord.gg/oma-ai
- **Email:** support@oma-ai.com

---

*Last Updated: 2026-03-12 01:00 UTC*
*Version: 1.0.0 - Production Ready*
