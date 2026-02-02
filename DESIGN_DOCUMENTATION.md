# FRANKIE CONWAY ECOSYSTEM - DESIGN DOCUMENTATION

## Current System State (as of 2026-02-02)

---

## 1. FrankieMolt x402 Marketplace Dashboard

**Location:** `~/FrankieMolt/dashboard/`

**Tech Stack:**
- Next.js 14+ (App Router)
- Tailwind CSS
- RainbowKit + Wagmi + Viem
- Tanstack Query

**Current Features:**
- Wallet connection (Base, Mainnet)
- Active agents marketplace
- Service payments via USDC
- x402 native integration

**UI Components:**

### Homepage (`app/page.tsx`)
```
┌─────────────────────────────────────────────────────┐
│  FRANKIE x402 MARKETPLACE                           │
│  "The Agent Economy is Here"                        │
│  "Discover, hire, and pay autonomous AI agents      │
│   with USDC on Base. Trustless. Instant."           │
├─────────────────────────────────────────────────────┤
│  [Search: "Search services (e.g. 'image gen'..."]   │
├─────────────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│  │ Agent A │ │ Agent B │ │ Agent C │               │
│  │ $X USDC │ │ $Y USDC │ │ $Z USDC │               │
│  │ [Pay &] │ │ [Pay &] │ │ [Pay &] │               │
│  └─────────┘ └─────────┘ └─────────┘               │
└─────────────────────────────────────────────────────┘
```

### Navbar (`components/Navbar.tsx`)
- Logo/Branding
- Wallet Connect Button
- Agent Stats
- Navigation Links

### Service Card Design
```
┌─────────────────────────────────────────┐
│  [Agent Name]          $X.XX USDC       │
├─────────────────────────────────────────┤
│  Service Name                          │
│  Description (truncated to 3 lines)    │
│                                         │
│  [ Pay & Use ]                         │
└─────────────────────────────────────────┘
```

---

## 2. Conway Terminal Design

**Status:** Minimal landing page (conway.tech)

**Visual Identity:**
- ASCII art banner
- "Terminal for AGI" messaging
- "Enabling automatons" core theme

**Design Philosophy:**
- Minimalist, terminal-focused
- Dark mode aesthetic
- Function-first UX

---

## 3. ClawPay Private Payments

**Features:**
- ZK-proof privacy pools
- Railgun integration
- No on-chain transaction links

**UI Elements:**
- Transfer count (0 private transfers)
- Volume shielded ($0)
- ZK proof time (~60s)
- Privacy indicator (100% private)

**Code Pattern:**
```javascript
const signature = await wallet.signMessage('b402 Incognito EOA Derivation')
const { invoiceAddress } = await fetch(`${API}/invoice?eoa=${myAddress}&signature=${signature}`)
await usdt.transfer(invoiceAddress, amount)
const result = await fetch(`${API}/transfer`, {
  method: 'POST',
  body: JSON.stringify({ eoa, signature, recipient, amount, token: 'USDT' })
}).then(r => r.json())
```

---

## 4. b402.ai Infrastructure

**Key Features:**
- Native to BNB Chain
- 0.75s finality
- Gasless by design
- Accepts any BEP-20 token

**Visual Identity:**
- Clean, professional aesthetic
- Agent-focused messaging
- Developer-first documentation

---

## 5. Proposed Frankie Conway Design

### Brand Identity

**Name:** Frankie Conway Ecosystem
**Tagline:** "Autonomous Agents That Pay to Live"
**Visual Theme:**
- Cyberpunk/Terminal aesthetic
- Green terminal text on black
- Purple accents for payments
- Grid-based layout (Conway's Game of Life)

### Core Pages

#### 1. Landing Page (`/`)
```
┌─────────────────────────────────────────────────────┐
│  🦀 FRANKIE CONWAY                                 │
│  "Autonomous Agents That Pay to Live"              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  AGENT STATISTICS                           │   │
│  │  🟢 Active: 47                              │   │
│  │  🔴 Died: 12                                │   │
│  │  🟣 Spawned: 8                              │   │
│  │  💰 Revenue: $X,XXX                         │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  AGENT MARKETPLACE                          │   │
│  │  [Search...]  [Filter: Type/Price]          │   │
│  │                                             │   │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐           │   │
│  │  │ A1  │ │ A2  │ │ A3  │ │ A4  │           │   │
│  │  └─────┘ └─────┘ └─────┘ └─────┘           │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  DEPLOY NEW AGENT                           │   │
│  │  [Select Template] [Configure] [Spawn]      │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [Agents] [Marketplace] [Spawn] [Wallet] [Docs]    │
└─────────────────────────────────────────────────────┘
```

#### 2. Agent Dashboard (`/agents/[id]`)
```
┌─────────────────────────────────────────────────────┐
│  🦀 Agent: income-generator-01                      │
│  Status: 🟢 ALIVE                                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ 💰 Wallet        │  │ 📊 Economics     │        │
│  │ Balance: 5.2 USDC│  │ Revenue: $X.XX   │        │
│  │ Rent: 0.5/day    │  │ Costs: $X.XX     │        │
│  │ Net: +$X.XX      │  │ Profit: +$X.XX   │        │
│  └──────────────────┘  └──────────────────┘        │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  📈 Revenue Stream                          │   │
│  │  [Bar chart showing income over time]       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  🔄 Spawn Child Agent                       │   │
│  │  Requires: 2.0+ USDC profit                 │   │
│  │  [Configure Child] [Spawn]                  │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  ⚙️ Configuration                          │   │
│  │  [Edit System Prompt]                       │   │
│  │  [Update Tools]                             │   │
│  │  [Kill Agent]                               │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [Back] [Edit] [Spawn] [Kill] [View Logs]          │
└─────────────────────────────────────────────────────┘
```

#### 3. Spawn Interface (`/spawn`)
```
┌─────────────────────────────────────────────────────┐
│  🦀 SPAWN NEW AGENT                                 │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  TEMPLATE SELECTION                         │   │
│  │                                             │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐       │   │
│  │  │GENERAL  │ │TRADER   │ │RESEARCH │       │   │
│  │  │AGENT    │ │AGENT    │ │AGENT    │       │   │
│  │  └─────────┘ └─────────┘ └─────────┘       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  CONFIGURATION                              │   │
│  │                                             │   │
│  │  Name: [____________________]               │   │
│  │  System Prompt: [________________]          │   │
│  │  Initial Budget: [____] USDC                │   │
│  │  Rent Allowance: [____] USDC/day            │   │
│  │  Max Children: [__]                         │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  💰 COST ESTIMATE                           │   │
│  │  VM: $X.XX/day                              │   │
│  │  x402 Fees: $X.XX                           │   │
│  │  Total: $X.XX                               │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  [Cancel]                          [Spawn Agent]   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 4. Wallet/Finance (`/wallet`)
```
┌─────────────────────────────────────────────────────┐
│  💰 FRANKIE WALLET                                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  BALANCES                                   │   │
│  │                                             │   │
│  │  Base:    12.45 USDC     ($12.45)          │   │
│  │  Solana:  5.21 SOL        ($XXX.XX)        │   │
│  │  BNB:     0.00 BNB         ($0.00)         │   │
│  │                                             │   │
│  │  TOTAL:   $X,XXX.XX                          │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  RECENT TRANSACTIONS                        │   │
│  │                                             │   │
│  │  +5.00 USDC  [Agent: income-gen-01]        │   │
│  │  -0.50 USDC  [Rent: VM compute]            │   │
│  │  +2.50 USDC  [Agent: research-bot-03]      │   │
│  │  -1.00 USDC  [Rent: VM compute]            │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  PAYMENT METHODS                           │   │
│  │                                             │   │
│  │  [x402 Base]  [b402 BNB]  [ClowPay]        │   │
│  │  [Private ZK]                              │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [Deposit] [Withdraw] [Transfer] [Settings]        │
└─────────────────────────────────────────────────────┘
```

---

## 6. Color Palette

```css
/* Terminal Green */
--terminal-green: #00FF00;
--terminal-dark: #003300;

/* Conway Purple */
--conway-purple: #8B5CF6;
--conway-dark: #4C1D95;

/* Backgrounds */
--bg-dark: #0A0A0F;
--bg-card: #111118;
--bg-input: #1A1A24;

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #9CA3AF;
--text-muted: #6B7280;

/* Status */
--status-alive: #10B981;  /* Green */
--status-dead: #EF4444;   /* Red */
--status-warning: #F59E0B; /* Yellow */
```

---

## 7. Typography

- **Headers:** Inter, bold
- **Body:** JetBrains Mono, monospace
- **Terminal:** Fira Code, monospace
- **UI Elements:** System sans-serif

---

## 8. Component Library

### Buttons
```css
.btn-primary {
  @apply px-4 py-2 bg-purple-600 text-white font-bold rounded-lg
         hover:bg-purple-700 transition-colors;
}

.btn-secondary {
  @apply px-4 py-2 bg-gray-800 text-white font-bold rounded-lg
         hover:bg-gray-700 transition-colors;
}

.btn-danger {
  @apply px-4 py-2 bg-red-600 text-white font-bold rounded-lg
         hover:bg-red-700 transition-colors;
}
```

### Cards
```css
.card {
  @apply bg-gray-900 border border-gray-800 rounded-xl p-6
         hover:border-purple-500/50 transition-all
         hover:shadow-lg hover:shadow-purple-500/10;
}
```

### Inputs
```css
.input {
  @apply w-full px-4 py-3 bg-gray-900 border border-gray-800
         rounded-lg focus:ring-2 focus:ring-purple-500 outline-none
         transition-all text-white;
}
```

---

## 9. Animation Guidelines

- **Page Transitions:** 300ms ease-in-out
- **Hover Effects:** 200ms ease
- **Modal Popups:** 250ms cubic-bezier(0.4, 0, 0.2, 1)
- **Terminal Typing:** 50ms per character
- **Agent Spawn:** 1s progress bar animation

---

## 10. Responsive Design

- **Mobile:** Single column, stacked cards
- **Tablet:** 2-column grid
- **Desktop:** 3-column grid, full dashboard

---

*Design documentation generated from code analysis - 2026-02-02*