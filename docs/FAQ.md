# Frequently Asked Questions

---

## General Questions

### What is OMA-AI?

OMA-AI (OpenMarketAccess AI) is the premier MCP (Model Context Protocol) marketplace for AI agents. We provide a platform where developers can discover, integrate, and monetize MCP tools that enable AI agents to perform complex tasks like file operations, HTTP requests, database queries, and more.

Our platform is built on the x402 protocol for gasless microtransactions, allowing seamless payment for API calls without wallet gas fees.

---

### What is MCP (Model Context Protocol)?

MCP is an open protocol that enables AI agents to connect to external tools and data sources. Think of MCP as a standardized API that allows AI assistants like Claude Desktop, OpenAI agents, and other AI systems to access capabilities beyond their built-in features.

**Key Benefits:**
- **Standardized Interface:** One protocol for all tools
- **Type-Safe:** Schema definitions for inputs/outputs
- **Flexible Transport:** Supports stdio, SSE, and WebSocket
- **Secure:** Built-in authentication and authorization
- **Scalable:** Handle millions of API calls

---

### How does OMA-AI compare to other marketplaces?

| Feature | OMA-AI | Smithery.ai | SkillsMP |
|---------|----------|-------------|-----------|
| x402 Gasless Payments | ✅ | ❌ | ❌ |
| Multi-Chain Support | ✅ (Base + Solana) | ❌ | ❌ |
| 5% Platform Fee | ✅ | Varies | Varies |
| Official MCPs Included | ✅ (7) | ❌ | ❌ |
| 4-Step Publish Wizard | ✅ | Basic | Basic |
| Real-Time Dashboard | ✅ | ✅ | ❌ |
| Open Source | ✅ (Core) | Partial | Closed |

**OMA-AI Advantages:**
- Lower fees (5% vs 10-20%)
- Gasless payments via x402
- Multi-chain support
- Better developer experience
- Official MCPs out of the box

---

## Using OMA-AI

### How do I find an MCP?

**Browse Marketplace:**
1. Visit [oma-ai.com/mcps](https://www.oma-ai.com/mcps)
2. Use filters: category, verified status, rating
3. Search by name or description
4. Click on an MCP to view details

**Key Information:**
- **Tools:** What the MCP provides
- **Pricing:** Cost per API call
- **Rating:** User reviews (1-5 stars)
- **Verification:** Official OMA-AI badge

---

### How do I integrate an MCP into my AI agent?

**Step 1: Install the MCP**

Most MCPs are available as npm packages:

```bash
npm install oma-filesystem-mcp
```

**Step 2: Configure Your Agent**

For Claude Desktop, add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "oma-filesystem-mcp"],
      "env": {
        "API_KEY": "your_oma_api_key"
      }
    }
  }
}
```

**Step 3: Use the Tools**

In your AI agent's prompts, reference the tools:

```
Please read the file at /path/to/file.txt using the filesystem MCP.
```

---

### What are the pricing tiers?

**Free ($0/month):**
- Access to 50 free API calls
- Basic MCPs only
- No x402 payments

**Basic ($5/month):**
- 1,000 API calls
- All MCPs
- x402 payments enabled

**Pro ($25/month):**
- 10,000 API calls
- All MCPs
- x402 payments
- Priority support
- Analytics dashboard

---

## Publishing MCPs

### How do I publish my own MCP?

**Requirements:**
- Registered account (free signup)
- MCP server running (SSE, stdio, or WebSocket)
- Public endpoint URL
- Tool definitions with pricing

**Publish Process:**

1. **Sign Up/Login:** Create your free account
2. **Navigate to Publish:** Go to [oma-ai.com/publish](https://www.oma-ai.com/publish)
3. **Complete 4-Step Wizard:**
   - **Step 1:** Basic info (name, slug, category, description)
   - **Step 2:** Configuration (endpoint, transport, repo/docs URLs)
   - **Step 3:** Tools (add tools with descriptions and pricing)
   - **Step 4:** Pricing (global pricing, x402 enablement)
4. **Submit:** Your MCP will be reviewed within 24-48 hours
5. **Go Live:** Once approved, your MCP appears in the marketplace

---

### What are the MCP categories?

**Available Categories:**
- **data** - Data fetching, processing, transformation
- **ai** - AI/ML model inference, embeddings, generation
- **dev** - Development tools (Git, CI/CD, debugging)
- **finance** - Financial data, payments, trading
- **search** - Search engines, APIs, databases
- **storage** - File systems, databases, object storage
- **security** - Authentication, encryption, audit logs
- **communication** - Email, messaging, notifications
- **utility** - Time, encoding, parsing, misc tools
- **other** - Tools that don't fit other categories

---

### How do I price my MCP?

**Recommended Pricing Tiers:**

| Complexity | Recommended Price | Example |
|------------|-------------------|----------|
| **Simple** | $0.0000 - $0.0001/call | Time MCP, String formatting |
| **Medium** | $0.0001 - $0.001/call | Fetch MCP, Memory MCP |
| **Complex** | $0.001 - $0.01/call | Git MCP, Vector search |
| **Premium** | $0.01 - $0.10/call | AI inference, Crypto trading |

**Factors to Consider:**
- **Computational Cost:** CPU/GPU usage per call
- **External APIs:** Third-party service costs
- **Market Demand:** Competition and user need
- **Value Provided:** Time saved, functionality enabled

**x402 Payment Flow:**
- User pays: $0.001/call
- OMA fee: 5% ($0.00005/call)
- **Developer payout: 95% ($0.00095/call)**

---

## Payments & Earnings

### How do I receive payments?

**x402 Payment System:**
- **Gasless:** No wallet gas fees
- **Automatic:** Payouts monthly
- **Transparent:** Real-time earnings tracking
- **Multi-Chain:** Base and Solana support

**Payout Process:**
1. **Accumulate:** Earnings accumulate in your account
2. **Threshold:** Minimum $10 USDC to trigger payout
3. **Monthly:** Payouts processed on the 1st of each month
4. **Receive:** USDC sent to your connected wallet

**Supported Wallets:**
- **Base:** MetaMask, WalletConnect, Coinbase Wallet
- **Solana:** Phantom, Solflare, Backpack

---

### What is the 5% platform fee?

OMA-AI charges a **5% platform fee** on all MCP API call revenue.

**Example Earnings:**
- Total revenue: $100
- OMA fee (5%): $5
- **Your earnings: $95**

**Competitor Comparison:**
- OMA-AI: 5% (Industry Best)
- Others: 10-20%

---

### Can I withdraw earnings anytime?

Earnings are paid out **monthly** on the 1st of each month, provided your balance is at least $10 USDC.

**Minimum Threshold:** $10 USDC
**Payout Method:** USDC to connected wallet (Base or Solana)

---

## Security & Privacy

### Is my data secure?

**Security Measures:**
- **RLS (Row Level Security):** Database access restricted per user
- **API Key Encryption:** All keys encrypted at rest
- **HTTPS Only:** All communications encrypted
- **Regular Audits:** Security audits performed quarterly
- **GDPR Compliant:** Full compliance with EU data laws

---

### What data does OMA-AI collect?

**Required Data:**
- Email address (for auth)
- Username/display name
- MCP tool definitions

**Optional Data:**
- Profile avatar URL
- Bio/description
- Website URL
- Connected wallet addresses

**We DO NOT:**
- Sell your data
- Share data with third parties
- Track you across other sites

---

### How are MCP servers secured?

**Security Features:**
- **x402 Protocol:** ERC-3009 gasless payments with random nonces
- **Time-Based Auth:** Tokens expire after 1 hour
- **Domain Separation:** Each MCP isolated to its domain
- **Rate Limiting:** Prevent abuse and DDoS
- **Review Process:** All MCPs reviewed before going live

---

## Technical

### What transports are supported?

**SSE (Server-Sent Events):**
- **Best for:** Production deployments
- **Pros:** Real-time, firewall-friendly, low latency
- **Cons:** Requires HTTP server

**Stdio:**
- **Best for:** Local development
- **Pros:** Simple, no server needed
- **Cons:** Not suitable for production

**WebSocket:**
- **Best for:** Real-time bidirectional communication
- **Pros:** Full-duplex, low overhead
- **Cons:** More complex setup

---

### What's the x402 protocol?

x402 is an **ERC-3009** gasless payment protocol that allows microtransactions without gas fees.

**How It Works:**
1. **User Authorization:** Sign message with wallet (no gas)
2. **Delegated Transfer:** x402 smart contract handles payment
3. **Gasless Execution:** No user wallet gas required
4. **Instant:** Transactions complete in seconds

**Benefits:**
- No gas fees for users
- Instant transactions
- Lower costs for micro-payments
- Multi-chain support

---

### What's the API rate limit?

**Rate Limits (Per IP):**
- **Free:** 100 calls/hour
- **Basic:** 1,000 calls/hour
- **Pro:** 10,000 calls/hour

**Rate Limit Headers:**
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1712345678
```

**429 Too Many Requests:**
- Retry after X-RateLimit-Reset timestamp
- Exponential backoff recommended

---

## Support

### How do I get help?

**Documentation:** [docs.oma-ai.com](https://docs.oma-ai.com)

**Contact:** support@oma-ai.com

**Discord:** [discord.gg/oma-ai](https://discord.gg/oma-ai)

**GitHub:** [github.com/FrankieMolt/OMA-AI](https://github.com/oma-ai)

---

### Do you have an API?

Yes! We provide a **REST API** for programmatic access.

**Base URL:** `https://www.oma-ai.com/api`

**Endpoints:**
- `GET /api/mcp/list` - List all MCPs
- `POST /api/mcp/register` - Register new MCP
- `GET /api/mcp/[slug]` - Get MCP details
- `GET /api/portfolio` - Get user portfolio
- `GET /api/signals` - Get trading signals

**Authentication:** Bearer token in Authorization header

**Documentation:** [API Docs](https://www.oma-ai.com/docs/api)

---

## Legal

### What are the Terms of Service?

Full terms at [oma-ai.com/terms](https://www.oma-ai.com/terms)

**Key Points:**
- Must be 18+ to use the platform
- No malicious or illegal MCPs
- MCPs must be functional and secure
- OMA reserves right to remove non-compliant MCPs

---

### What's the Privacy Policy?

Full policy at [oma-ai.com/privacy](https://www.oma-ai.com/privacy)

**Key Points:**
- Data stored securely
- No data sold to third parties
- GDPR compliant
- Users can request data deletion

---

## Still Have Questions?

**Contact Us:**
- Email: support@oma-ai.com
- Discord: [discord.gg/oma-ai](https://discord.gg/oma-ai.com)
- GitHub Issues: [github.com/FrankieMolt/OMA-AI/issues](https://github.com/oma-ai/issues)

**Response Time:** Within 24 hours (business days)

---

*Last Updated: March 12, 2026*
