# base-wallet

> USDC payments on Base network. Send, receive, and track transactions.

## Installation

```bash
oma install base-wallet
```

## Configuration

```json
{
  "skills": {
    "base-wallet": {
      "private_key": "YOUR_PRIVATE_KEY",
      "address": "0x...",
      "network": "base-mainnet"
    }
  }
}
```

## Tools Provided

| Tool | Description |
|------|-------------|
| `get_balance` | Check USDC balance |
| `send_payment` | Send USDC to address |
| `get_transactions` | List recent transactions |
| `verify_payment` | Verify x402 payment proof |

## Example Usage

```javascript
// Check balance
const balance = await wallet.getBalance();

// Send payment
const tx = await wallet.sendPayment({
  to: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
  amount: '0.05', // USDC
  memo: 'API payment'
});

// Verify x402 payment
const valid = await wallet.verifyPayment({
  proof: paymentProof
});
```

## Pricing

- **FREE**

## Version

1.5.0
