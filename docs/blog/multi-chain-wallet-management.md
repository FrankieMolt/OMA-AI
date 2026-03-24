---
title: Multi-Chain Wallet Management with OMA-Ai
description: Comprehensive guide to managing Base and Solana wallets with x402 gasless payments for MCP transactions.
date: 2026-03-12
author: OMA-Ai Team
tags: [wallet, multi-chain, base, solana, x402, payments]
---

## Multi-Chain Wallet Management with OMA-Ai

OMA-Ai supports multi-chain wallets (Base + Solana) for seamless, gasless MCP payments. In this guide, you'll learn how to connect wallets, manage balances, and execute x402 gasless transactions across chains.

## Table of Contents
1. [Multi-Chain Architecture](#multi-chain-architecture)
2. [Supported Networks](#supported-networks)
3. [Wallet Connection](#wallet-connection)
4. [Balance Management](#balance-management)
5. [x402 Gasless Payments](#x402-gasless-payments)
6. [Transaction History](#transaction-history)
7. [Use Cases](#use-cases)
8. [Cost Analysis](#cost-analysis)

---

## Multi-Chain Architecture

### Why Multi-Chain?

1. **Base Network:** x402 gasless payments, ERC-3009 standard
2. **Solana Network:** Fast transactions, low fees
3. **Unified Interface:** Single dashboard for both chains
4. **Developer Choice:** Use whichever chain fits your needs

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    OMA-Ai Platform                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐         ┌──────────────┐             │
│  │   Base Chain │         │  Solana Chain│             │
│  │              │         │              │             │
│  │  - x402      │         │  - Web3      │             │
│  │  - USDC      │         │  - USDC      │             │
│  │  - Viem      │         │  - @solana/  │             │
│  │              │         │    web3.js    │             │
│  └──────────────┘         └──────────────┘             │
│         │                         │                      │
│         └─────────┬─────────────┘                      │
│                   │                                    │
│         ┌──────────▼──────────┐                        │
│         │   Unified Dashboard  │                        │
│         │                    │                        │
│         │  - Wallet Connect   │                        │
│         │  - Balance View     │                        │
│         │  - Transaction Hist │                        │
│         │  - x402 Payments    │                        │
│         └─────────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Supported Networks

### Base Network (L2 on Ethereum)

**Details:**
- **Chain ID:** 8453
- **Currency:** USDC
- **Transaction Type:** x402 (gasless, ERC-3009)
- **RPC:** https://mainnet.base.org
- **Block Explorer:** https://basescan.org

**Use For:**
- x402 gasless payments
- Developer payouts
- Revenue routing
- Smart contract interactions

**Configuration:**

```typescript
// Viem configuration for Base
import { createPublicClient, createWalletClient, http } from 'viem';
import { base } from 'viem/chains';

const baseClient = createPublicClient({
  chain: base,
  transport: http()
});

const walletClient = createWalletClient({
  chain: base,
  transport: http(),
  account: '0x...'
});
```

### Solana Network

**Details:**
- **Network:** Mainnet
- **Currency:** USDC (SPL Token)
- **Transaction Type:** Standard
- **RPC:** https://api.mainnet-beta.solana.com
- **Block Explorer:** https://solscan.io

**Use For:**
- Trading
- Fast transactions
- DeFi operations
- NFT minting

**Configuration:**

```typescript
// Solana Web3.js configuration
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const wallet = Keypair.fromSecretKey(Uint8Array.from([...]));
```

---

## Wallet Connection

### 1. Connect MetaMask (Base)

```typescript
// src/lib/wallet/connect-base.ts
import { connect } from '@wagmi/core';
import { injected } from '@wagmi/connectors';
import { base } from 'wagmi/chains';

export async function connectBaseWallet() {
  try {
    const { account, chain } = await connect({
      connector: injected()
    });

    if (chain.id !== base.id) {
      await switchChain({ chainId: base.id });
    }

    console.log('Connected:', account);
    return account;
  } catch (error) {
    console.error('Connection failed:', error);
    throw error;
  }
}
```

### 2. Connect Phantom (Solana)

```typescript
// src/lib/wallet/connect-solana.ts
export async function connectPhantomWallet() {
  try {
    // Check if Phantom is installed
    const provider = (window as any).solana;

    if (!provider?.isPhantom) {
      throw new Error('Phantom wallet not installed');
    }

    // Connect wallet
    const response = await provider.connect();
    const publicKey = response.publicKey.toString();

    console.log('Connected:', publicKey);
    return publicKey;
  } catch (error) {
    console.error('Connection failed:', error);
    throw error;
  }
}
```

### 3. Unified Wallet Selector

```typescript
// src/components/WalletSelector.tsx
'use client';

import { useState } from 'react';
import { connectBaseWallet } from '@/lib/wallet/connect-base';
import { connectPhantomWallet } from '@/lib/wallet/connect-solana';

export function WalletSelector() {
  const [baseWallet, setBaseWallet] = useState<string | null>(null);
  const [solanaWallet, setSolanaWallet] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div>
        <h3>Base Wallet (MetaMask)</h3>
        {baseWallet ? (
          <p className="text-green-500">Connected: {baseWallet}</p>
        ) : (
          <button onClick={() => connectBaseWallet().then(setBaseWallet)}>
            Connect MetaMask
          </button>
        )}
      </div>

      <div>
        <h3>Solana Wallet (Phantom)</h3>
        {solanaWallet ? (
          <p className="text-green-500">Connected: {solanaWallet}</p>
        ) : (
          <button onClick={() => connectPhantomWallet().then(setSolanaWallet)}>
            Connect Phantom
          </button>
        )}
      </div>
    </div>
  );
}
```

---

## Balance Management

### 1. Check Base USDC Balance

```typescript
// src/lib/wallet/balance-base.ts
import { publicClient } from '@/lib/wallet/base-client';
import { erc20Abi } from '@/lib/abi/erc20';

export async function getBaseUSDCBalance(address: string): Promise<string> {
  const contractAddress = '0x833589fCD6eDb6E08f4c7C32D4f71b54bDA02913'; // Base USDC

  const balance = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`]
  });

  return formatUnits(balance, 6); // USDC has 6 decimals
}
```

### 2. Check Solana USDC Balance

```typescript
// src/lib/wallet/balance-solana.ts
import { connection } from '@/lib/wallet/solana-client';
import { getAccount } from '@solana/spl-token';

export async function getSolanaUSDCBalance(publicKey: string): Promise<string> {
  const usdcMint = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // Solana USDC
  const walletPubkey = new PublicKey(publicKey);

  const tokenAccount = await getAccount(
    connection,
    await getAssociatedTokenAddress(usdcMint, walletPubkey)
  );

  return (Number(tokenAccount.amount) / 1_000_000).toFixed(2); // USDC has 6 decimals
}
```

### 3. Combined Balance View

```typescript
// src/components/WalletBalances.tsx
'use client';

import { useEffect, useState } from 'react';
import { getBaseUSDCBalance } from '@/lib/wallet/balance-base';
import { getSolanaUSDCBalance } from '@/lib/wallet/balance-solana';

export function WalletBalances() {
  const [baseBalance, setBaseBalance] = useState<string>('0.00');
  const [solanaBalance, setSolanaBalance] = useState<string>('0.00');

  useEffect(() => {
    async function fetchBalances() {
      if (baseWallet) {
        setBaseBalance(await getBaseUSDCBalance(baseWallet));
      }
      if (solanaWallet) {
        setSolanaBalance(await getSolanaUSDCBalance(solanaWallet));
      }
    }

    fetchBalances();
  }, [baseWallet, solanaWallet]);

  return (
    <div className="space-y-2">
      <div className="p-4 bg-blue-500 text-white rounded">
        <h3>Base (USDC)</h3>
        <p className="text-2xl font-bold">${baseBalance}</p>
      </div>
      <div className="p-4 bg-purple-500 text-white rounded">
        <h3>Solana (USDC)</h3>
        <p className="text-2xl font-bold">${solanaBalance}</p>
      </div>
      <div className="p-4 bg-green-500 text-white rounded">
        <h3>Total Balance</h3>
        <p className="text-2xl font-bold">${(Number(baseBalance) + Number(solanaBalance)).toFixed(2)}</p>
      </div>
    </div>
  );
}
```

---

## x402 Gasless Payments

### What is x402?

x402 is a gasless payment protocol on Base using ERC-3009 (token transfers with authorization). Users sign transactions off-chain, OMA-Ai relayer executes on-chain, paying gas.

### Payment Flow

```
User                      OMA-Ai Relayer              Base Network
│                              │                            │
│ 1. Sign payment intent       │                            │
├─────────────────────────────>│                            │
│                              │                            │
│                              │ 2. Execute transaction     │
│                              │ (pay gas)                 │
│                              ├───────────────────────────>│
│                              │                            │
│                              │ 3. Transaction confirmed  │
│                              │<───────────────────────────┤
│                              │                            │
│ 4. Payment confirmed         │                            │
│<─────────────────────────────┤                            │
```

### Sign Payment Intent (Base)

```typescript
// src/lib/wallet/sign-payment.ts
import { signMessage } from '@wagmi/core';
import { hashMessage } from 'viem';

interface PaymentIntent {
  mcp_id: string;
  user_id: string;
  amount: string;
  timestamp: number;
  nonce: string;
}

export async function signPaymentIntent(intent: PaymentIntent) {
  const message = JSON.stringify(intent);
  const hash = hashMessage(message);

  const signature = await signMessage({
    message: hash
  });

  return {
    intent,
    signature,
    message
  };
}
```

### Execute Payment (Server-Side)

```typescript
// src/lib/wallet/execute-payment.ts
import { walletClient } from '@/lib/wallet/base-client';
import { verifyPaymentIntent } from '@/lib/wallet/verify';

export async function executePayment(
  intent: PaymentIntent,
  signature: string
) {
  // 1. Verify signature
  if (!verifyPaymentIntent(intent, signature)) {
    throw new Error('Invalid signature');
  }

  // 2. Check nonce (prevent replay)
  const nonceUsed = await checkNonce(intent.nonce);
  if (nonceUsed) {
    throw new Error('Nonce already used');
  }

  // 3. Execute transaction (relayer pays gas)
  const hash = await walletClient.writeContract({
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bDA02913', // Base USDC
    abi: erc20Abi,
    functionName: 'transferWithAuthorization',
    args: [
      intent.user_id as `0x${string}`,
      intent.to as `0x${string}`,
      BigInt(intent.amount) * BigInt(10 ** 6), // USDC decimals
      BigInt(intent.valid_until),
      BigInt(intent.nonce),
      signature as `0x${string}`
    ]
  });

  // 4. Mark nonce as used
  await markNonceUsed(intent.nonce);

  return hash;
}
```

### Payout to Developer (Base)

```typescript
// src/lib/wallet/payout.ts
export async function payoutDeveloper(
  developerAddress: string,
  amount: number
) {
  const { amount: platformFee } = await calculatePlatformFee(amount);

  // Developer gets 95%
  const developerAmount = amount * 0.95;

  const hash = await walletClient.writeContract({
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bDA02913', // Base USDC
    abi: erc20Abi,
    functionName: 'transfer',
    args: [
      developerAddress as `0x${string}`,
      BigInt(developerAmount * 10 ** 6)
    ]
  });

  // Platform keeps 5%
  await walletClient.writeContract({
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bDA02913',
    abi: erc20Abi,
    functionName: 'transfer',
    args: [
      '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6', // OMA-Ai treasury
      BigInt(platformFee * 10 ** 6)
    ]
  });

  return hash;
}
```

---

## Transaction History

### 1. Query User Transactions

```typescript
// src/lib/wallet/transactions.ts
import { supabase } from '@/lib/supabase/client';

export async function getUserTransactions(userId: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch failed:', error.message);
    throw error;
  }

  return data;
}
```

### 2. Display Transaction History

```typescript
// src/components/TransactionHistory.tsx
'use client';

import { useEffect, useState } from 'react';
import { getUserTransactions } from '@/lib/wallet/transactions';

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    async function fetch() {
      const txs = await getUserTransactions(userId);
      setTransactions(txs);
    }

    fetch();
  }, [userId]);

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div key={tx.id} className="p-4 bg-gray-100 rounded">
          <div className="flex justify-between">
            <span className="font-bold">{tx.mcp_id}</span>
            <span className="text-green-500">+${(tx.amount * 0.95).toFixed(2)}</span>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(tx.created_at).toLocaleString()}
          </div>
          <a
            href={`https://basescan.io/tx/${tx.tx_hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View on Basescan →
          </a>
        </div>
      ))}
    </div>
  );
}
```

---

## Use Cases

### Use Case 1: AI Agent Developer

**Scenario:** Building AI agents that need to call multiple MCPs

**Wallet Setup:**
1. Connect Base wallet (MetaMask)
2. Connect Solana wallet (Phantom)
3. Top up both wallets with USDC
4. Enable x402 payments on Base

**Benefits:**
- **Base:** Gasless MCP calls via x402
- **Solana:** Fast token swaps and DeFi
- **Unified:** Single dashboard for both

**Example:**

```typescript
// Call Weather MCP (x402 gasless)
const weather = await callMCP('weather-api-mcp', {
  city: 'London',
  units: 'metric'
});
// Cost: $0 (gasless via x402)

// Call Stock Data MCP (x402 gasless)
const stocks = await callMCP('stock-data-mcp', {
  symbol: 'AAPL'
});
// Cost: $0.005 (x402, no gas)
```

### Use Case 2: MCP Developer

**Scenario:** Publishing MCPs and receiving payouts

**Wallet Setup:**
1. Connect Base wallet (MetaMask)
2. Set payout address
3. Enable automatic monthly payouts

**Payout Flow:**

```
Monthly (1st of month)
     │
     ├─ Check developer revenue
     ├─ Calculate 95% share
     ├─ Execute transfer (Base USDC)
     ├─ Record transaction in database
     └─ Send email notification
```

**Example:**

```typescript
// Monthly payout script
async function monthlyPayouts() {
  const developers = await getActiveDevelopers();

  for (const dev of developers) {
    const revenue = await calculateDeveloperRevenue(dev.id);
    if (revenue >= 10) { // $10 minimum threshold
      await payoutDeveloper(dev.wallet_address, revenue);
      await sendPayoutEmail(dev.email, revenue);
    }
  }
}
```

### Use Case 3: Multi-Chain Arbitrage

**Scenario:** Taking advantage of price differences across chains

**Strategy:**

```
1. Buy token on Solana (fast, low fees)
2. Bridge to Base
3. Sell on Base (higher price)
4. Keep profit in USDC
5. Repeat
```

**Example:**

```typescript
// Arbitrage bot
async function arbitrage(token: string) {
  // Get prices
  const solanaPrice = await getSolanaPrice(token);
  const basePrice = await getBasePrice(token);

  if (basePrice - solanaPrice > 0.01) { // 1% spread
    // Buy on Solana
    await buyOnSolana(token, 1);

    // Bridge to Base
    await bridgeToBase(token, 1);

    // Sell on Base
    await sellOnBase(token, 1);

    // Keep profit
    const profit = basePrice - solanaPrice;
    console.log(`Profit: $${profit}`);
  }
}
```

### Use Case 4: Revenue Diversification

**Scenario:** Managing multiple revenue streams

**Setup:**

```
Wallet 1 (Base):
  - MCP call revenue
  - Developer payouts
  - Platform fees (5%)

Wallet 2 (Solana):
  - Trading profits
  - Staking rewards
  - NFT sales
```

**Example:**

```typescript
// Portfolio management
const portfolio = {
  base: {
    mcpRevenue: getBaseMCPRevenue(),
    platformFees: getPlatformFees(),
    developerPayouts: getTotalPayouts()
  },
  solana: {
    trading: getTradingProfits(),
    staking: getStakingRewards(),
    nft: getNFTSales()
  }
};

const totalRevenue =
  portfolio.base.mcpRevenue +
  portfolio.base.platformFees +
  portfolio.solana.trading +
  portfolio.solana.staking +
  portfolio.solana.nft;

console.log(`Total Revenue: $${totalRevenue}`);
```

---

## Cost Analysis

### Transaction Costs

| Network | Gas Cost | x402 Fee | Platform Fee | Total |
|----------|-----------|-----------|--------------|-------|
| **Base** | $0 (relayer pays) | 0% | 5% | 5% |
| **Solana** | ~$0.0005 | - | - | ~$0.0005 |

### Revenue Breakdown

**MCP Call: $0.005**

| Party | Share | Amount |
|-------|-------|--------|
| Developer | 95% | $0.00475 |
| Platform | 5% | $0.00025 |
| User (gas) | 0% | $0 (x402) |

**Daily Revenue (10,000 calls @ $0.005):**

| Party | Daily | Monthly | Yearly |
|-------|-------|---------|--------|
| Developers | $47.50 | $1,425 | $17,100 |
| Platform | $2.50 | $75 | $900 |

### Comparison vs Competitors

| Platform | Platform Fee | User Gas | Developer Share |
|----------|--------------|----------|----------------|
| **OMA-Ai** | 5% | $0 (x402) | **95%** |
| Smithery.ai | ~10% | ~$0.05 | **90%** |
| RapidAPI | 20-30% | Varies | **70-80%** |

**For $10,000/day revenue:**

| Platform | Platform | Developer | Difference |
|----------|-----------|------------|-------------|
| OMA-Ai | $500 | $9,500 | **+$1,500** |
| Smithery | $1,000 | $9,000 | - |
| RapidAPI (20%) | $2,000 | $8,000 | -$2,500 |
| RapidAPI (30%) | $3,000 | $7,000 | -$3,500 |

**Annual advantage:** +$18,000 vs Smithery, +$180,000 vs RapidAPI (30%)

---

## Best Practices

### 1. Secure Your Wallets

- **Never share private keys**
- **Use hardware wallets** for large amounts
- **Enable 2FA** on wallet apps
- **Verify transaction details** before signing

### 2. Manage Nonces

- **Unique nonces** for each transaction
- **Store in database** to prevent replay
- **Use random nonces** (128-bit entropy)
- **Set expiration times** (24h recommended)

### 3. Monitor Transactions

- **Track all payouts** in database
- **Review transaction history** regularly
- **Set up alerts** for suspicious activity
- **Reconcile balances** monthly

### 4. Optimize Costs

- **Batch transactions** when possible
- **Use x402** for gasless payments on Base
- **Choose appropriate chain** for each operation
- **Monitor gas prices** and adjust timing

### 5. User Experience

- **Clear feedback** during transactions
- **Loading states** for long operations
- **Error messages** with actionable guidance
- **Transaction confirmations** in-app

---

## Next Steps

### For Users

1. **Connect Wallet:** MetaMask (Base) or Phantom (Solana)
2. **Top Up:** Add USDC to wallets
3. **Test Payments:** Try x402 gasless payments
4. **Monitor Balances:** Track spending and earnings
5. **Withdraw:** Payouts to your wallet

### For Developers

1. **Publish MCP:** Create and register your MCP
2. **Set Payout:** Configure payout address
3. **Monitor Revenue:** Track daily/monthly earnings
4. **Receive Payouts:** Monthly automatic payouts
5. **Scale Up:** Add more MCPs for more revenue

---

## Resources

- **Base Network:** [base.org](https://base.org)
- **Solana Network:** [solana.com](https://solana.com)
- **x402 Protocol:** [x402.org](https://x402.org)
- **MetaMask:** [metamask.io](https://metamask.io)
- **Phantom:** [phantom.app](https://phantom.app)
- **OMA-Ai Documentation:** [docs.oma-ai.com](/docs)

---

*Published: March 12, 2026*
*Updated: March 12, 2026*
*Author: OMA-Ai Team*
