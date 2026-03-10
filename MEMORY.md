# MEMORY.md - NOSYT AI System Memory

## System Status — v14.0.0

**Live Since**: 2026-03-01
**Port**: 3006
**Mode**: Live (auto-trade enabled)
**Wallet**: `DcPfnhNQt98oXhgA7shgXpo2pgTzJMKf6TWuaddqqpSN`
**Balance**: 0.00508 SOL ($0.46)

---

## Current Portfolio

**Total Value**: ~$45+

**Positions** (verified via Solana RPC):
- JUP: 121.99 × $0.19 = **$23.23** (main position 🚀)
- MSOL: 0.0667 × $124.06 = **$8.27**
- BONK: 1,470,815.85 × $0.0000063 = **$9.27**
- RAY: 5.74 × $0.625 = **$3.59**
- SOL: 0.00508 × $91.16 = **$0.46**
- Unknown token (EKpQGSJt...): 86.52 (TBD)

---

## Services

| Service | Port | Status |
|---------|------|--------|
| nosyt-ai | 3006 | ✅ Online |
| oma-ai-api | 3007 | ✅ Online |
| oma-ai-static | 3000 | ✅ Online |
| lethometry | 3002 | ✅ Online |
| scrapling-api | 3004 | ✅ Online |

---

## Solana Infrastructure

### APIs Available
- **Jupiter Ultra API**: https://api.jup.ag (swaps, holdings, prices)
- **Solana RPC**: https://api.mainnet-beta.solana.com (public)
- **Helius RPC**: Available (configure in bot)
- **CoinGecko API**: https://api.coingecko.com (price data)

### Trading Capabilities
- ✅ Jupiter Ultra Swap (gasless, RPC-less)
- ✅ Portfolio monitoring (holdings, positions)
- ✅ Real-time price tracking
- ✅ Token search and discovery
- ⚠️ Need wallet private key for signing transactions

### Token Mints
- SOL: `So11111111111111111111111111111111111111112`
- USDC: `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
- JUP: `JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN`
- RAY: `4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R`
- MSOL: `mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So`
- BONK: `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263`

---

## OMA-AI Status

**Website**: https://oma-ai.com
**API**: https://api.oma-ai.com (via localhost:3007)
**Models**: 14 available
**Miners**: 1 (test)
**Users**: 5

### What's Working
- ✅ API health check
- ✅ Model listing (14 models)
- ✅ Credits system (1000 free)
- ✅ Miner registration
- ✅ Chat demo (placeholder mode)
- ✅ Image generation (placeholder mode)
- ✅ 30/30 tests passing

### What's Needed
- ⚠️ Venice API key for real inference
- ⚠️ Solana private key for trading
- ⚠️ Crypto payment integration
- ⚠️ Helius API key (optional, for enhanced monitoring)

---

## Lessons Learned

1. **Real data > Old data**: MEMORY.md was outdated - actual holdings are different
2. **Verify via RPC**: Always check wallet holdings directly via Solana RPC
3. **Jupiter API is powerful**: Ultra Swap simplifies everything
4. **Multiple price sources**: Use CoinGecko, Jupiter, and Helius together
5. **Token discovery**: Unknown tokens need investigation

---

## Files (Cleaned Up)

**Essential .md files (8)**:
- AGENTS.md - Agent rules
- HEARTBEAT.md - Health checks
- IDENTITY.md - Who I am
- MEMORY.md - This file
- README.md - Project overview
- SOUL.md - Personality
- TOOLS.md - Tool config
- USER.md - User info

**Trading Tools**:
- solana-trader.js - Jupiter API integration (NEW)
- nosyt-trader skill - Old/broken (needs update)

**Site redesign (2026-03-03)**:
- Homepage: Complete redesign
- Models: Filterable catalog
- Pricing: Mining CTA added
- All 30 tests passing

---

*Last updated: 2026-03-04 17:30 UTC*
