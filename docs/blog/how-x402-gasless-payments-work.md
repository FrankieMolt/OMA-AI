---
title: "How x402 Gasless Payments Actually Work"
description: "Deep dive into EIP-3009, TransferWithAuthorization, and how USDC settlements work without gas fees on Base."
date: "2026-03-24"
tags: ["x402", "payments", "ethereum", "usdc", "base"]
---

# How x402 Gasless Payments Actually Work

Every time an AI agent calls a paid MCP endpoint on OMA-AI, a payment is settled in USDC — without the agent paying gas. Here's how.

## The Problem with Normal Crypto Payments

In a typical Ethereum transaction:
1. User signs a transaction
2. Pays gas (gas price × gas used)
3. Waits for block confirmation
4. Payment settles

For a $0.001 AI agent API call, paying $0.02 in gas makes no sense.

## Enter EIP-3009: TransferWithAuthorization

x402 uses **EIP-3009**, which allows **gasless USDC transfers**:

```
TransferWithAuthorization {
  from: agent_wallet,
  to: publisher_wallet,
  value: 1000,  // 0.001 USDC in micro-units
  validAfter: 0,
  validBefore: timestamp + 1 hour,
  nonce: unique_per_transaction,
  v, r, s: EIP-712 signature from agent_wallet
}
```

The key innovation: **the publisher (relayer) submits the transaction and pays gas, but the agent pays for it indirectly through a fee built into the payment**.

## The Relayer Model

```
Agent → Signs EIP-3009 off-chain → Publisher → Submits to chain → Gets gas reimbursed
         + payment in USDC                              + small fee
```

The relayer (OMA-AI) front-runs gas and earns a 0.5-1% fee. The agent never touches gas. Publishers get USDC directly.

## EIP-712 Signatures

The agent signs a structured EIP-712 message:
```
OMA-AI Payment Request
Domain: oma-ai.com
Version: 1
Chain: 8453 (Base mainnet)
Nonce: 0x...
Max Amount: 1000000  // $1 max
Payer: 0xAgentWallet
```

This is the same standard used by Circle's USDC and many institutional custody solutions.

## On Base vs Ethereum Mainnet

- **Base**: ~$0.001 gas per transaction. Cheap enough that even tiny payments work.
- **Ethereum mainnet**: ~$3-10 gas. Only viable for larger payments.
- **Solana**: SPL-USDC transfers are $0.00025 each. Truly feeless.

OMA-AI supports both chains, automatically selecting the cheapest route.

## Verification

When a publisher receives a payment request, they verify:
1. Signature matches the claimed agent wallet
2. Nonce hasn't been used (prevents replay attacks)
3. Amount is within agreed limits
4. Timestamp hasn't expired

Only then does the relayer submit the on-chain transaction.
