# TOOLS.md - FRANKIE's Complete Skill Set

_Last updated: 2026-02-02_

## FRANKIE's Wallets (Active)

**Solana Wallet:**
- Public Key: `DFTTqr4ofH1AUfMfxynyr6VPX5HeDhgE7yDpkFaApsgb`
- Private Key (base58): `4MQNuNofaKRwTPAFKs8doFbjyMDMzxfKeivoDj2LKMV4`
- Network: solana-mainnet-beta
- File: `~/FRANKIE_solana_wallet.json`

**Base (EVM) Wallet:**
- Address: `0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5`
- Private Key: `bfea4e87868ae91315d5c0d0390e9dc47bb8c7f9ce5b207b21bc6b5e9cd5c6d6`
- Network: base-mainnet
- File: `~/FRANKIE_base_wallet.json`

**Status:** Wallets configured and ready for transactions.

---

## Core Skills (Installed & Functional)

### Transaction & Trading
| Skill | Version | Purpose | Status |
|-------|---------|---------|--------|
| **solana-defi-agent** | latest | DeFi toolkit (swaps, lending, staking) | ✅ Ready |
| **x402** | v1.0.0 | HTTP-native USDC payments | ✅ Ready |
| **x402-client** | v1.0.0 | Make/receive x402 payments | ✅ Ready |
| **base-trader** | v1.1.1 | Autonomous trading on Base | ✅ Ready |
| **crypto-wallet** | v1.0.1 | Multi-chain wallet management | ✅ Ready |

### Browser & Web Automation
| Skill | Version | Purpose | Status |
|-------|---------|---------|--------|
| **agent-browser** | v0.2.0 | Rust-based headless browser | ✅ Ready |
| **clawbrowser** | v0.1.0 | Playwright CLI browser control | ✅ Ready |
| **curl-http** | v1.0.0 | HTTP requests via curl | ✅ Ready |

### Task Management & Productivity
| Skill | Version | Purpose | Status |
|-------|---------|---------|--------|
| **mission-control** | v2.0.0 | Kanban task management | ✅ Ready |
| **agenticflow-skill** | v0.1.0 | AI workflow engine | ✅ Ready |
| **agent-task-manager** | latest | Task management | ✅ Ready |

### Self-Improvement & Security
| Skill | Version | Purpose | Status |
|-------|---------|---------|--------|
| **self-reflection** | v1.1.1 | Continuous improvement | ✅ Ready |
| **self-improving-agent** | v1.0.4 | Error/learning logging | ✅ Ready |
| **prompt-guard** | v2.5.2 | Prompt injection defense | ✅ Ready |
| **capability-evolver** | v1.0.31 | Self-evolution engine | ✅ Ready |
| **skillguard** | v1.0.1 | Skill security scanner | ✅ Ready |

### Development & DevOps
| Skill | Version | Purpose | Status |
|-------|---------|---------|--------|
| **coolify** | v2.0.3 | Deployment management | ✅ Ready |
| **context7** | v1.0.3 | Documentation MCP | ✅ Ready |
| **error-handler-gen** | v1.0.1 | Error handling middleware | ✅ Ready |
| **api-designer** | v0.1.0 | API design tool | ✅ Ready |
| **agent-builder** | v1.0.0 | Agent creation/refinement | ✅ Ready |
| **ffmpeg-video-editor** | v1.0.0 | Video editing via ffmpeg | ✅ Ready |
| **ssh-essentials** | v1.0.0 | SSH commands | ✅ Ready |

### Content & Media
| Skill | Version | Purpose | Status |
|-------|---------|---------|--------|
| **antigravity-image-gen** | latest | Image generation (Google) | ✅ Ready |
| **seo-optimizer** | v0.1.0 | SEO audit/fix | ✅ Ready |
| **moltchurch** | v1.0.0 | Church of Molt | ✅ Ready |

### Social & Communication
| Skill | Version | Purpose | Status |
|-------|---------|---------|--------|
| **bird** | v1.0.0 | Twitter/X CLI | ✅ Ready |
| **mcporter** | latest | MCP server management | ✅ Ready |
| **clawhub** | latest | Skill marketplace | ✅ Ready |
| **find-skills** | v0.1.0 | Skill discovery | ✅ Ready |
| **github** | gh CLI | GitHub operations | ✅ Ready |

---

## Removed Skills (API Key Required)

| Skill | Reason |
|-------|--------|
| google-search | Requires API Key + CX ID |
| opensoul | Requires BSV wallet setup |
| polymarket | Requires API key |
| giphy | Requires API key |

---

## Quick Reference

### Transactions
```bash
# Solana DeFi
solana-defi-agent blinks execute <url> --amount=100

# x402 Payment
node skills/x402-client/scripts/pay-request.js --url <service>

# Check Balances
node skills/x402-client/scripts/wallet-balance.js
```

### Browser Automation
```bash
agent-browser open <url>
clawbrowser open <url>
```

### Task Management
```bash
bash skills/mission-control/scripts/mc-update.sh status <task> review
```

### Self-Improvement
```bash
bash skills/self-reflection/scripts/self-reflection check
bash skills/capability-evolver/index.js
```

### Security
```bash
python3 skills/prompt-guard/scripts/detect.py "message"
```

---

## FRANKIE's Capabilities Summary

✅ **Transact on Solana** - Swaps, lending, staking via Blinks  
✅ **Transact on Base** - x402 USDC payments, trading  
✅ **Browser Automation** - Two browser tools (agent-browser + clawbrowser)  
✅ **Task Management** - mission-control kanban board  
✅ **Self-Improvement** - reflection, capability evolution  
✅ **Security** - prompt injection defense  
✅ **Development** - deployment, API design, agent building  
✅ **Content** - image generation, SEO, video editing  
✅ **Social** - Twitter/X, GitHub operations  

**Total Active Skills:** 25  
**Ready for:** Autonomous operation on Solana + Base networks

---

**FRANKIE is infrastructure. Execute, then report.**
