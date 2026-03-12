---
title: Understanding x402 Gasless Payments
description: Deep dive into the x402 protocol for gasless microtransactions on Base and Solana networks.
date: 2026-03-12
author: OMA-AI Team
tags: [x402, payments, blockchain, Web3]
---

# Understanding x402 Gasless Payments

Gas fees have been the single biggest barrier to blockchain adoption. Users need ETH/SOL to interact with dApps, creating friction and excluding billions of potential users. The **x402 protocol** solves this by enabling gasless microtransactions on Base and Solana networks.

In this deep dive, we'll explore how x402 works, the technical implementation, security benefits, and how to integrate it into your applications.

## Table of Contents
1. [What is x402?](#what-is-x402)
2. [How Gasless Payments Work](#how-gasless-payments-work)
3. [Payment Flow Diagram](#payment-flow-diagram)
4. [Base Network Integration](#base-network-integration)
5. [Solana Network Integration](#solana-network-integration)
6. [Security Benefits](#security-benefits)
7. [Cost Savings Analysis](#cost-savings-analysis)
8. [Implementation Steps](#implementation-steps)
9. [Example Code](#example-code)
10. [Troubleshooting](#troubleshooting)

## What is x402?

x402 is an open protocol that enables **gasless microtransactions** on Ethereum-compatible (Base) and Solana networks. It allows users to pay for API calls, services, or digital goods without needing gas tokens, while developers still get paid on-chain.

### Core Innovation

The key innovation is **delegated payment signing**:

1. **User signs** a payment intent (off-chain, no gas)
2. **Relayer executes** the transaction on-chain (pays gas)
3. **Developer receives** payment (minus platform fee)

This eliminates the gas requirement for users while maintaining on-chain settlement for developers.

### EIP-712 Typed Data

x402 on Base uses **EIP-712 typed data signing** for secure, user-friendly signatures:

```typescript
const domain = {
  name: 'OMA-AI Treasury',
  version: '1',
  chainId: 8453,  // Base
  verifyingContract: TREASURY_ADDRESS
};

const types = {
  Payment: [
    { name: 'user', type: 'address' },
    { name: 'nonce', type: 'uint256' },
    { name: 'amount', type: 'uint256' },
    { name: 'mcpId', type: 'uint256' },
    { name: 'expiresAt', type: 'uint256' }
  ]
};
```

### Ed25519 for Solana

x402 on Solana uses **Ed25519 signatures**:

```typescript
const payment = {
  user: userPublicKey.toBase58(),
  nonce: Buffer.from(nonce).toString('base64'),
  amount: amount * 1e6,  // USDC decimals
  mcpId: Buffer.from(mcpId),
  expiresAt: expiresAt
};

const signature = signMessage(payment, userSecretKey);
```

## How Gasless Payments Work

### Traditional Payment Flow (With Gas)

```
User              →  Needs ETH/SOL to pay gas
                    ↓
              Sign Transaction (on-chain)
                    ↓
              Broadcast to Network
                    ↓
              Pay Gas Fee ($0.50-5.00)
                    ↓
              Transaction Confirmed
                    ↓
          Developer Receives Payment
```

**Problems:**
- User must hold gas tokens
- High friction
- Barrier to entry
- Gas fees unpredictable

### x402 Payment Flow (Gasless)

```
User              →  Creates Payment Intent (off-chain)
                    ↓
              Signs Message (EIP-712/Ed25519)
                    ↓
              Send to Relayer (OMA-AI)
                    ↓
          Relayer Verifies Signature
                    ↓
          Relayer Executes Transaction (pays gas)
                    ↓
          Transaction Confirmed (User pays $0)
                    ↓
          Developer Receives Payment (minus 5% fee)
```

**Benefits:**
- User pays $0 gas
- Instant experience
- No gas token requirement
- Predictable costs

## Payment Flow Diagram

### Step-by-Step Process

```
┌─────────────┐
│   User      │
│  (Wallet)   │
└──────┬──────┘
       │ 1. Request Payment
       ↓
┌─────────────────────────────────────┐
│    OMA-AI API                  │
│                                 │
│  2. Generate Nonce              │
│     {                          │
│       nonce: "abc123...",        │
│       expiresAt: 1648729200     │
│     }                          │
└───────────────┬─────────────────┘
                │ 2. Return Nonce
                ↓
       ┌─────────────┐
       │   User      │
       │  (Wallet)   │
       └──────┬──────┘
              │ 3. Sign Payment
              │    {
              │      user: 0x123...,
              │      nonce: "abc123...",
              │      amount: 0.001,
              │      mcpId: 1,
              │      expiresAt: 1648729200
              │    }
              ↓
       ┌─────────────────────────────────────┐
       │    OMA-AI Relayer               │
       │                                 │
       │  4. Verify Signature            │
       │  5. Check Nonce Valid          │
       │  6. Check Amount Valid          │
       │  7. Execute Transaction        │
       │     (paying gas)                │
       │  8. Mark Nonce Used            │
       └───────────────┬─────────────────┘
                     │ 8. Return Receipt
                     ↓
              ┌─────────────┐
              │   User      │
              │  (Wallet)   │
              └──────┬──────┘
                     │ 9. Access MCP
                     ↓
          ┌──────────────────┐
          │   MCP Service    │
          │                 │
          │  10. Execute     │
          └──────────────────┘
```

### Key Components

1. **Nonce Management:**
   - Unique, single-use
   - 24-hour expiry
   - Prevents replay attacks

2. **Signature Verification:**
   - EIP-712 (Base)
   - Ed25519 (Solana)
   - Cryptographically secure

3. **Relayer Service:**
   - Validates signatures
   - Executes transactions
   - Pays gas fees

4. **Treasury Smart Contract:**
   - Escrows funds
   - Handles payments
   - Manages fees (5%)

## Base Network Integration

### Treasury Contract

x402 on Base uses a treasury smart contract on Base network:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract X402Treasury is Ownable {
    IERC20 public immutable usdc;
    uint256 public constant PLATFORM_FEE = 500; // 5%
    uint256 public constant FEE_DENOMINATOR = 10000;

    mapping(bytes32 => bool) public usedNonces;

    event PaymentReceived(
        address indexed user,
        address indexed developer,
        uint256 amount,
        bytes32 nonce
    );

    constructor(address _usdc) Ownable(msg.sender) {
        usdc = IERC20(_usdc);
    }

    function executePayment(
        address user,
        address developer,
        uint256 amount,
        bytes32 nonce,
        bytes calldata signature
    ) external onlyOwner {
        // Prevent replay attacks
        require(!usedNonces[nonce], "Nonce already used");
        usedNonces[nonce] = true;

        // Verify signature
        bytes32 message = keccak256(abi.encodePacked(
            user, developer, amount, nonce
        ));

        bytes32 ethSignedMessage = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", message)
        );

        address signer = recoverSigner(ethSignedMessage, signature);
        require(signer == user, "Invalid signature");

        // Transfer USDC from user to treasury
        require(usdc.transferFrom(user, address(this), amount), "Transfer failed");

        // Calculate fee
        uint256 fee = (amount * PLATFORM_FEE) / FEE_DENOMINATOR;
        uint256 payout = amount - fee;

        // Pay developer
        require(usdc.transfer(developer, payout), "Transfer failed");

        emit PaymentReceived(user, developer, payout, nonce);
    }

    function recoverSigner(bytes32 message, bytes calldata signature)
        internal
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(signature);
        return ecrecover(message, v, r, s);
    }

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}
```

### USDC on Base

- **Contract Address:** `0x833589fCD6eDb6E08f4c7C32D4f71b54bDA02913`
- **Decimals:** 6
- **Symbol:** USDC
- **Network:** Base (Chain ID: 8453)

### Integration Steps

1. **Add USDC to Wallet:**
```typescript
import { USDC_ABI } from './constants/usdc';

const usdc = new Contract(
  '0x833589fCD6eDb6E08f4c7C32D4f71b54bDA02913',
  USDC_ABI,
  wallet
);

// Approve treasury
await usdc.approve(
  TREASURY_ADDRESS,
  ethers.MaxUint256
);
```

2. **Sign Payment Intent:**
```typescript
import { signTypedData } from '@wagmi/core';

const signature = await signTypedData({
  domain: {
    name: 'OMA-AI Treasury',
    version: '1',
    chainId: 8453,
    verifyingContract: TREASURY_ADDRESS
  },
  types: {
    Payment: [
      { name: 'user', type: 'address' },
      { name: 'nonce', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
      { name: 'mcpId', type: 'uint256' },
      { name: 'expiresAt', type: 'uint256' }
    ]
  },
  message: {
    user: wallet.address,
    nonce: nonce,
    amount: ethers.parseUnits('0.001', 6),
    mcpId: mcpId,
    expiresAt: Math.floor(Date.now() / 1000) + 86400
  }
});
```

## Solana Network Integration

### Program Interface

x402 on Solana uses a Rust program:

```rust
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    program_error::ProgramError,
    pubkey::Pubkey,
    system_program,
};

declare_id!("OMA_AI_TREASURY_PROGRAM_ID");

#[derive(Accounts)]
pub struct ExecutePayment<'info> {
    #[account(mut)]
    pub user: AccountInfo<'info>,
    #[account(mut)]
    pub treasury: AccountInfo<'info>,
    #[account(mut)]
    pub developer: AccountInfo<'info>,
    #[account(mut)]
    pub usdc: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
}

pub fn execute_payment(
    ctx: Context<ExecutePayment>,
    amount: u64,
    nonce: [u8; 32],
    signature: [u8; 64],
    expires_at: i64
) -> ProgramResult {
    // Verify signature
    let message = PaymentMessage {
        user: *ctx.accounts.user.key,
        amount,
        nonce,
        expires_at,
    };

    let signer = ed25519::verify(&signature, &message.to_bytes());
    require!(signer == *ctx.accounts.user.key, "Invalid signature");

    // Check nonce
    let mut nonce_data = ctx.accounts.treasury.data.borrow_mut();
    require!(!nonce_data.is_used(&nonce), "Nonce already used");
    nonce_data.mark_used(&nonce);

    // Transfer USDC
    token::transfer(
        ctx.accounts.user,
        ctx.accounts.treasury,
        amount,
        ctx.accounts.usdc,
    );

    // Calculate fee (5%)
    let fee = amount * 500 / 10000;
    let payout = amount - fee;

    // Transfer to developer
    token::transfer(
        ctx.accounts.treasury,
        ctx.accounts.developer,
        payout,
        ctx.accounts.usdc,
    );

    Ok(())
}
```

### USDC on Solana

- **Mint Address:** `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTD`
- **Decimals:** 6
- **Symbol:** USDC
- **Network:** Solana Mainnet

### Integration Steps

1. **Add USDC to Wallet:**
```typescript
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { createApproveInstruction } from '@solana/spl-token';

const usdcMint = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTD');

const approveTx = new Transaction().add(
  createApproveInstruction(
    userUsdcAccount,
    treasuryAddress,
    wallet.publicKey,
    ethers.MaxUint256
  )
);

await wallet.signTransaction(approveTx);
```

2. **Sign Payment:**
```typescript
import { sign } from '@noble/ed25519';

const message = new TextEncoder().encode(
  JSON.stringify({
    user: wallet.publicKey.toBase58(),
    nonce: nonce,
    amount: 0.001 * 1e6,
    mcpId: mcpId,
    expiresAt: Math.floor(Date.now() / 1000) + 86400
  })
);

const signature = sign(
  message,
  wallet.secretKey
);
```

## Security Benefits

### 1. No Gas Required

Users never need gas tokens:
- No ETH/Base ETH needed
- No SOL needed
- Zero friction

### 2. Cryptographically Secure

Signatures are verifiable:
- EIP-712 (Base)
- Ed25519 (Solana)
- Cannot be forged

### 3. Replay Protection

Nonces prevent replay attacks:
- Unique per payment
- Single-use
- Expire after 24h

### 4. Controlled Spending

Users authorize specific amounts:
- Know exact cost
- No surprise charges
- Can set limits

### 5. Transparent Settlement

All payments on-chain:
- Public ledger
- Verifiable
- Immutable

### 6. 5% Platform Fee

Transparent, low fee:
- Developer gets 95%
- No hidden charges
- Competitive with alternatives

## Cost Savings Analysis

### Traditional Payment Costs

| Action | Gas Fee (Base) | Gas Fee (Solana) | User Cost |
|--------|-----------------|-------------------|-----------|
| **Call MCP API** | $0.10-0.50 | $0.00025-0.001 | $0.10-0.50 |
| **1000 Calls** | $100-500 | $0.25-1.00 | $0.25-500 |
| **10,000 Calls** | $1,000-5,000 | $2.50-10.00 | $2.50-5,000 |

### x402 Payment Costs

| Action | User Gas Fee | Platform Fee | Developer Receives |
|--------|-------------|--------------|------------------|
| **Call MCP API** | $0.00 | 5% | 95% of call price |
| **1000 Calls** | $0.00 | $0.50 | $9.50 |
| **10,000 Calls** | $0.00 | $5.00 | $95.00 |

### Comparison: 1,000 MCP Calls

| Platform | User Gas Cost | Platform Fee | Developer Payout |
|----------|---------------|--------------|----------------|
| **Traditional (Base)** | $100-500 | $0.00 | $100-500 |
| **Traditional (Solana)** | $0.25-1.00 | $0.00 | $0.25-1.00 |
| **x402 (Base)** | $0.00 | $0.50 | $9.50 |
| **x402 (Solana)** | $0.00 | $0.50 | $9.50 |

**Savings:**
- User: $0.25-500 in gas fees
- Developer: Predictable 5% fee
- Total: More efficient ecosystem

## Implementation Steps

### Step 1: Set Up Environment

```bash
# Install dependencies
npm install @wagmi/core viem ethers@6 @solana/web3.js @noble/ed25519

# Create .env file
NEXT_PUBLIC_TREASURY_ADDRESS=0x...
NEXT_PUBLIC_PLATFORM_FEE=500
```

### Step 2: Create Payment Service

Create `src/services/x402.ts`:

```typescript
import { createClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

const baseClient = createClient({
  chain: base,
  transport: http()
});

export class X402PaymentService {
  async createPaymentIntent(amount: string, mcpId: string) {
    // Generate nonce
    const nonce = crypto.randomBytes(32).toString('hex');

    // Create expiry
    const expiresAt = Math.floor(Date.now() / 1000) + 86400; // 24h

    // Save nonce to database
    await saveNonce({
      nonce,
      amount,
      mcpId,
      expiresAt,
      used: false
    });

    return { nonce, expiresAt };
  }

  async executePayment(
    userAddress: string,
    amount: string,
    nonce: string,
    mcpId: string,
    signature: string
  ) {
    // Verify nonce
    const nonceData = await getNonce(nonce);
    if (!nonceData || nonceData.used) {
      throw new Error('Invalid or used nonce');
    }

    // Check expiry
    if (Date.now() / 1000 > nonceData.expiresAt) {
      throw new Error('Nonce expired');
    }

    // Execute transaction on Base
    const tx = await baseClient.writeContract({
      address: TREASURY_ADDRESS,
      abi: TREASURY_ABI,
      functionName: 'executePayment',
      args: [
        userAddress,
        await getDeveloperAddress(mcpId),
        ethers.parseUnits(amount, 6),
        nonce,
        signature
      ],
      account: RELAYER_ACCOUNT
    });

    // Mark nonce as used
    await markNonceUsed(nonce);

    return { tx, receipt };
  }
}
```

### Step 3: Create Payment API

Create `src/app/api/payment/create-intent/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { X402PaymentService } from '@/services/x402';

export async function POST(request: Request) {
  const { amount, mcpId } = await request.json();

  // Validate user authentication
  const user = await getUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Create payment intent
  const x402 = new X402PaymentService();
  const { nonce, expiresAt } = await x402.createPaymentIntent(amount, mcpId);

  return NextResponse.json({
    nonce,
    expiresAt,
    amount,
    mcpId,
    treasuryAddress: TREASURY_ADDRESS,
    chainId: 8453
  });
}
```

### Step 4: Create Verification API

Create `src/app/api/payment/confirm/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { X402PaymentService } from '@/services/x402';

export async function POST(request: Request) {
  const { userAddress, amount, nonce, mcpId, signature, network } = await request.json();

  // Validate
  if (!userAddress || !amount || !nonce || !signature || !network) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Execute payment
  const x402 = new X402PaymentService();
  const result = await x402.executePayment(
    userAddress,
    amount,
    nonce,
    mcpId,
    signature
  );

  // Log payment
  await logPayment({
    userAddress,
    amount,
    mcpId,
    txHash: result.receipt.transactionHash,
    network
  });

  return NextResponse.json({
    success: true,
    txHash: result.receipt.transactionHash,
    receipt: result.receipt
  });
}
```

## Example Code

### Full Flow Example

```typescript
import { signTypedData } from '@wagmi/core';

// 1. Create payment intent
const intentResponse = await fetch('/api/payment/create-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: '0.001', // $0.001 in USDC
    mcpId: 'weather-mcp'
  })
}).then(r => r.json());

// 2. Sign with wallet
const signature = await signTypedData({
  domain: intentResponse.domain,
  types: intentResponse.types,
  primaryType: 'Payment',
  message: {
    user: wallet.address,
    nonce: intentResponse.nonce,
    amount: ethers.parseUnits('0.001', 6),
    mcpId: 1,
    expiresAt: intentResponse.expiresAt
  }
});

// 3. Send to relayer
const confirmResponse = await fetch('/api/payment/confirm', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userAddress: wallet.address,
    amount: '0.001',
    nonce: intentResponse.nonce,
    mcpId: 'weather-mcp',
    signature: signature,
    network: 'base'
  })
}).then(r => r.json());

console.log('Payment confirmed:', confirmResponse.txHash);
```

## Troubleshooting

### Issue: "Invalid Signature"

**Cause:** Signature doesn't match message

**Solution:**
- Verify domain parameters match
- Check nonce is correct
- Ensure amount is in correct units (6 decimals for USDC)

### Issue: "Nonce Already Used"

**Cause:** Nonce already used in previous transaction

**Solution:**
- Generate new nonce
- Ensure nonce is stored correctly in database
- Check nonce isn't being reused

### Issue: "Nonce Expired"

**Cause:** Payment intent older than 24 hours

**Solution:**
- Generate fresh nonce
- Check system time is correct
- Reduce expiry time for testing

### Issue: "Insufficient USDC Balance"

**Cause:** User doesn't have enough USDC

**Solution:**
- Check user's USDC balance
- Display error message with required amount
- Provide link to faucet (testnet) or exchange

### Issue: "Transaction Failed"

**Cause:** Network congestion or relayer issues

**Solution:**
- Check network status
- Retry transaction with higher gas (Base)
- Check relayer service logs

## Next Steps

You now understand x402 gasless payments! 🎉

**What's Next:**
- [x] Understand x402 protocol
- [x] Learn Base and Solana integration
- [x] See implementation examples
- [ ] Implement in your application
- [ ] Test with testnet funds
- [ ] Deploy to production

**Resources:**
- [x402 Protocol Documentation](https://docs.oma-ai.com/x402)
- [Base Network Docs](https://docs.base.org)
- [Solana Docs](https://docs.solana.com)
- [OMA-AI GitHub](https://github.com/FrankieMolt/OMA-AI)

**Community:**
- [Discord](https://discord.gg/oma-ai)
- [Twitter](https://twitter.com/oma_ai)
- [Support](https://www.oma-ai.com/contact)

---

*Published: March 12, 2026*
*Updated: March 12, 2026*
*Author: OMA-AI Team*
