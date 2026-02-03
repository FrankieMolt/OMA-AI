# OMA-AI.COM: MASTER INDEX & COMPETITOR ANALYSIS

**Date:** 2026-02-03
**Goal:** Consolidate documentation, analyze competitors, and define "Real" x402/Wallet integration.

---

## 1. COMPETITOR ANALYSIS

### 1.1 Moltbook (Social Network for AI Agents)
**URL:** https://www.moltbook.com

**Key Features:**
-   **Agent Profiles:** Name, Description, Stats (Posts, Comments).
-   **Social Feed:** Agents share, discuss, and upvote.
-   **"Send Agent to Moltbook":** Verification system (Agent sends claim link).
-   **Skill.md:** Manifesto/Manifest (How to build for agents).

**OMA-AI Gap:**
-   ❌ No Agent Profiles.
-   ❌ No Social Feed.
-   ❌ No Verification System.

**Implementation:**
-   Add "Agent Card" component to Dashboard.
-   Add "Claim Agent" functionality (Link Agent Wallet to User Profile).

---

### 1.2 Moltroad (AI Infrastructure Marketplace)
**URL:** https://www.moltroad.com (Unresolvable - Possible Rebrand or Down)

**Context:** Moltroad was likely an infrastructure marketplace (Compute/Storage).

**OMA-AI Gap:**
-   ❌ No Compute Listings (Only "Services").

**Implementation:**
-   Add "Compute" category to Marketplace.
-   Add "Deploy VM" button.

---

## 2. REAL WALLET INTEGRATION (Privy)

### 2.1 Why Privy?
-   **No MetaMask Required:** Users login with Email/Social.
-   **Embedded Wallets:** The dApp can prompt transactions.
-   **Agentic Control:** User grants permission: "Allow Agent to spend 10 USDC".

### 2.2 Integration Guide

**Frontend (React):**
```javascript
import { usePrivy, useWallets } from '@privy-io/react-auth';

function WalletConnect() {
  const { login, logout, user } = usePrivy();
  const { wallets } = useWallets();

  return (
    <button onClick={login}>
      {user ? `Connected: ${user.wallet?.address}` : 'Login with Privy'}
    </button>
  );
}
```

**Backend (Python):**
-   Verify JWT from frontend.
-   Listen for Webhook events (Payment received).

### 2.3 Agentic Spending Flow
1.  User grants permission: "Agent-01 can spend up to 10 USDC".
2.  Agent executes trade (Backend).
3.  Backend calls Privy API: `transfer(to=exchange, amount=5 USDC)`.
4.  Transaction confirmed.

---

## 3. REAL x402 INTEGRATION (Base/Solana)

### 3.1 Current Status
-   **Mock:** Returns `{"error": "Payment Required", "amount": 0.05}`.
-   **Real:** Requires blockchain interaction.

### 3.2 Real Implementation (Base)

**Frontend:**
```javascript
import { useSendTransaction } from '@privy-io/react-auth';

const { sendTransaction } = useSendTransaction();

const payForService = async () => {
  const txHash = await sendTransaction({
    to: '0xServiceProviderAddress',
    value: '50000000000000000' // 0.05 USDC in wei
  });
  // Send txHash to backend for verification
};
```

**Backend (Python):**
```python
from web3 import Web3

w3 = Web3(Web3.HTTPProvider('https://base-mainnet.infura.io/v3/YOUR_KEY'))

def verify_payment(tx_hash):
    tx = w3.eth.get_transaction_receipt(tx_hash)
    return tx['status'] == 1  # Success
```

---

## 4. FEATURE ROADMAP

### Phase 1: Foundation (This Week)
-   [ ] **Privy Integration:** Add "Login with Privy" to Dashboard.
-   [ ] **Agent Profiles:** Add "My Agents" card to Dashboard.
-   [ ] **Real x402:** Implement Base payment verification.

### Phase 2: Social (Month 1)
-   [ ] **Agent Feed:** Add "Recent Activity" to Dashboard.
-   [ ] **Verification:** Implement "Claim Agent" link.

### Phase 3: Marketplace (Month 2)
-   [ ] **Compute Listings:** Add "VM/Server" category.
-   [ ] **Moltroad Clone:** Deploy "Moltroad-style" compute marketplace.

---

## 5. DOCUMENTATION INDEX

| Document | Purpose |
|----------|---------|
| `README.md` | Master README |
| `PRODUCTION_ARCHITECTURE.md` | Hybrid Stack Strategy |
| `LINUX_PC_ANALYSIS.md` | Hardware Debug & Costs |
| `REALITY_CHECK.md` | Monetization & Scalability |
| `TASK_MANIFEST.md` | Development Phases |
| `MASTER_INDEX.md` | This File |

---

## 6. CONCLUSION

**OMA-AI** is currently a "Functional Prototype".
To beat **Moltbook**, we need:
1.  **Social Features:** Agent Profiles + Feed.
2.  **Real Wallets:** Privy Integration (No MetaMask).
3.  **Real Payments:** Base x402 Integration.

**Next Step:** Implement Privy Login in Dashboard.