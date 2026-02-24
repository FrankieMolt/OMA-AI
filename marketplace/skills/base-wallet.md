# base-wallet

> USDC payments on Base network.

## Install

```bash
oma install base-wallet
```

## Version
1.5.0

## Description

Send, receive, and track USDC payments on Base network. Full x402 protocol support for micropayments.

## Usage

```javascript
import { baseWallet } from '@oma/base-wallet';

// Check balance
const balance = await baseWallet.getBalance('0x...');
console.log(balance); // { usdc: 11.96, eth: 0.05 }

// Send USDC
await baseWallet.send({
  to: '0x...',
  amount: 1.00,
  token: 'USDC'
});

// Create x402 payment
const payment = await baseWallet.createPayment({
  amount: 0.05,
  recipient: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6'
});
```

## API

### `getBalance(address)`
Get wallet balance.

### `send(options)`
Send tokens.

### `createPayment(options)`
Create x402 payment proof.

## Price

FREE

## Network

Base Mainnet

## Supported Tokens

- USDC
- ETH
- DAI
