# FRANKIE Nexus - External Integration Hub

## Overview
FRANKIE Nexus is the central nervous system for FRANKIE's external operations, integrating social media, version control, blockchain interaction, and branded web presence.

## Modules

### 1. Social & Dev (Twitter/GitHub)
- **Controller:** `scripts/social_manager.js`
- **Integration:** Uses `skills/bird` and `gh` CLI.
- **Capabilities:** Status updates, repository monitoring, contribution tracking.

### 2. Crypto Core (Base/Solana)
- **Controller:** `scripts/crypto_manager.js`
- **Integration:** Uses `skills/solana-defi-agent`, `skills/base-trader`, `skills/x402-client`.
- **Capabilities:** Wallet monitoring, DeFi operations, cross-chain status.

### 3. Brand Identity
- **Source:** `BRAND.md`
- **Assets:** `assets/` (To be generated)
- **Deployment:** Uses `skills/coolify` for hosting branded clones/apps.

### 4. Intelligence
- **Controller:** `scripts/intel_gather.js`
- **Integration:** Web search + Content aggregation.

## Quick Start

1. **System Check:**
   Run the unified CLI to check status:
   ```bash
   ./frankie-nexus/bin/frankie status
   ```

2. **Web Dashboard:**
   Start the local dashboard to visualize integrations:
   ```bash
   ./frankie-nexus/bin/frankie serve
   ```
   Access at `http://localhost:8080`

3. **Social & Dev:**
   - Tweet: `./frankie-nexus/bin/frankie social tweet "Hello World"`
   - GitHub: `./frankie-nexus/bin/frankie github repo list`

4. **Intelligence (Moltenius):**
   - Fetch: `./frankie-nexus/bin/frankie intel fetch`
   - Status: `./frankie-nexus/bin/frankie intel status`

## Architecture
- `bin/frankie`: Main entry point.
- `scripts/`: specialized automation scripts.
- `web/`: The "FRANKIE Nexus" branded portal.
- `config/`: Configuration files.
