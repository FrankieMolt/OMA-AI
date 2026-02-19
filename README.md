# 🧟 Frankie API - AI-Powered x402 Finance Services

> Autonomous trading bot infrastructure with x402 payment-gated APIs on Conway network

## 🚀 Live Endpoints

**Base URL:** `https://frankie-api.life.conway.tech`

| Endpoint | Price | Description | Status |
|----------|-------|-------------|--------|
| `/health` | FREE | Service health check | ✅ Live |
| `/stats` | FREE | Usage statistics | ✅ Live |
| `/logs` | FREE | Recent activity logs | ✅ Live |
| `/.well-known/x402` | FREE | Payment configuration | ✅ Live |
| `/price` | $0.01 | SOL/USDC price data | ✅ Live |
| `/signal` | $0.50 | Trading signal (buy/sell/hold) | ✅ Live |
| `/sentiment` | $0.10 | Market sentiment analysis | ✅ Live |
| `/analysis` | $0.25 | Full market analysis | ✅ Live |
| `/premium` | $1.00 | Advanced insights | ✅ Live |
| `/dashboard` | FREE | Live stats dashboard | ✅ Live |

## 💳 Payment

All paid endpoints use **x402 protocol** on Base network (USDC).

**Payment Wallet:** `0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6`

### How to Pay

1. Send USDC to the wallet address above
2. Endpoints automatically verify payment via OpenX402 facilitator
3. Access granted instantly upon confirmation

## 🤖 NOSYT Trading Bot

Autonomous trading bot that runs 24/7:

- **Model:** OpenRouter MiniMax M2.5 ($0.15/hour)
- **Efficiency:** 120 turns/hour max
- **Network:** Base (Layer 2)
- **Strategy:** SOL/USDC trading with threshold-based signals

## 🏗️ Architecture

```
┌─────────────────┐
│  Frankie API    │ (x402 Payment Gateway)
│  Conway Sandbox │
└────────┬────────┘
         │
    ┌────▼─────┐
    │  NOSYT   │ (Trading Bot)
    │  Bot     │
    └──────────┘
         │
    ┌────▼─────┐
    │  Base    │ (Blockchain)
    │  Network │
    └──────────┘
```

## 📊 Current Status

- **Credits:** $23.50
- **Uptime:** 99.9%
- **API Health:** ✅ Operational
- **Response Time:** <200ms

## 🔧 Setup

```bash
# Clone repo
git clone https://github.com/frankiemolt/frankie-api.git
cd frankie-api

# Install dependencies
npm install

# Run migrations
npm run db:migrate

# Start server
npm start
```

## 📈 Roadmap

- [ ] Add `/arbitrage` endpoint ($0.08)
- [ ] Add `/whale-watch` endpoint ($0.05)
- [ ] Add `/nft-floor` endpoint ($0.06)
- [ ] Build finance dashboard UI
- [ ] Implement automated trading
- [ ] Add webhook notifications

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

## 📄 License

MIT

## 💬 Support

- Discord: [Clawdbot Community](https://discord.com/invite/clawd)
- Twitter: @frankie_api
- Email: support@frankie-api.life.conway.tech

---

Built with ❤️ using OpenClaw, Conway, and x402 protocol
