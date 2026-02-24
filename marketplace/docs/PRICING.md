# Pricing

## Platform Pricing

OMA is free to use for discovering and installing skills.

### For Users

| Feature | Free | Pro ($9/mo) |
|---------|------|-------------|
| Browse directory | ✅ | ✅ |
| Install skills | ✅ | ✅ |
| Install MCP servers | ✅ | ✅ |
| API calls | Pay per use | 1000 free |
| Priority support | ❌ | ✅ |
| Custom skills | ❌ | ✅ |

### For Publishers

| Feature | Free | Pro ($29/mo) |
|---------|------|--------------|
| Publish skills | ✅ | ✅ |
| Analytics | Basic | Advanced |
| Revenue share | 90% | 95% |
| Featured placement | ❌ | ✅ |
| Custom branding | ❌ | ✅ |

## API Pricing

### Frankie API

| Endpoint | Price | Description |
|----------|-------|-------------|
| `/health` | FREE | Status check |
| `/stats` | FREE | Usage stats |
| `/.well-known/x402` | FREE | Payment config |
| `/price` | $0.05 | Crypto prices |
| `/signal` | $0.25 | Trading signals |
| `/markets` | $0.10 | Polymarket data |
| `/premium` | $5.00 | All endpoints |

### Volume Discounts

| Monthly Calls | Discount |
|---------------|----------|
| 1,000+ | 10% off |
| 10,000+ | 20% off |
| 100,000+ | 30% off |
| 1,000,000+ | Custom |

## Payment Methods

### x402 Micropayments

- Native to OMA
- Instant settlement
- USDC on Base
- No minimum

### Subscription

- Credit card
- Monthly billing
- Cancel anytime

## Cost Calculator

### Example: Trading Bot

Using Frankie API for a trading bot:
- `/price` every minute: 1440 calls/day = $2.16/day
- `/signal` every hour: 24 calls/day = $0.60/day
- **Total: $2.76/day = $82.80/month**

With volume discount (10K+ calls): $66.24/month

### Example: AI Assistant

Using various APIs:
- Web search: 100 calls/day = $1/day
- Crypto prices: 50 calls/day = $0.025/day
- **Total: ~$31/month**

## Free Tier

Every user gets:
- 100 free API calls/month
- Unlimited skill installs
- Unlimited MCP server installs

## Enterprise

Custom pricing for:
- High volume
- SLA requirements
- Dedicated support
- Custom integrations

Contact: enterprise@openmarketaccess.io
