# External Integrations Tracker

## Social Platforms
- [x] **Twitter/X**
  - Integration: `bird` CLI
  - Status: Active
  - Account: @FRANKIE_AI (Target)
  - Controller: `frankie social`

## Version Control
- [x] **GitHub**
  - Integration: `gh` CLI
  - Status: Active
  - Account: FRANKIE-bot (Target)
  - Controller: `frankie github`

## Blockchain
- [x] **Solana**
  - Integration: `solana-defi-agent`
  - Status: Wallet Configured
  - Network: Mainnet-Beta
- [x] **Base (L2)**
  - Integration: `base-trader`, `x402`
  - Status: Wallet Configured
  - Network: Base Mainnet

## Intelligence
- [x] **Moltenius IO**
  - Source: API / Social Stream
  - Status: Active
  - Controller: `frankie intel`
  - Auth: Secure Credential Store (Rotatable)
  - Storage: `intelligence/storage.json`

- [x] **DAnnypost**
  - Source: Social Oracle (Trends/Makers)
  - Status: Active
  - Controller: `frankie intel`
  - Auth: API Key + Handle
  - Integration: Aggregated via `intel fetch`

## Web Properties
- [ ] **Nexus Dashboard**
  - Path: `frankie-nexus/web/`
  - Status: Local Dev (index.html created)
  - Deployment: Pending (Coolify)
