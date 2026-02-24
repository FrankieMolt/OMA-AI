# @oma/server-payments

> MCP server for x402 payment operations

## Overview

Handle x402 micropayments on Base:
- Create payment proofs
- Verify payments
- Check balances
- Transaction history

## Installation

```bash
npx @oma/server-payments
```

## Configuration

```json
{
  "mcpServers": {
    "oma-payments": {
      "command": "npx",
      "args": ["@oma/server-payments"],
      "env": {
        "WALLET_ADDRESS": "0x...",
        "NETWORK": "base-mainnet"
      }
    }
  }
}
```

## Tools

### create_proof

Create a payment proof.

```
Create payment proof for $0.05 to recipient 0x...
```

### verify_payment

Verify a payment proof.

```
Verify this payment proof: 0x...
```

### check_balance

Check USDC balance.

```
What's my USDC balance?
```

### get_history

Get transaction history.

```
Show my recent payments
```

## Version

1.0.0
