# x402 + Phantom Integration Complete Guide

## 🎯 Overview

This guide shows you how to integrate OMA-AI with Phantom wallet for x402 payments on Base and Solana networks.

## 📋 Prerequisites

- Phantom wallet extension installed: https://phantom.app
- Wallet funded with ETH (for gas) and USDC (for payments)
- Node.js environment
- x402 facilitator: https://facilitator.openx402.ai (permissionless, no API key)

---

## 🔗 How x402 Works with Phantom

### Payment Flow

```
User Request → 402 Response → Phantom Popup → User Signs → Payment Sent → Resource Access
```

### Why Phantom?

| Feature | Benefit |
|---------|----------|
| **Multi-chain support** | Base, Solana, Ethereum in one app |
| **x402 Native** | Built-in support for x402 protocol |
| **Developer-friendly** | Easy SDK for apps |
| **Security** | Hardware wallet support |
| **Mobile** | iOS + Android apps |

---

## 🚀 Quick Start (5 Minutes)

### 1. Connect Phantom Wallet

```javascript
import { connect } from '@phantom/wallet-adapter';

// Connect to Phantom
const { provider, wallet } = await connect();
console.log('Connected:', wallet.address);
```

### 2. Get API Price (x402 Response)

```javascript
const response = await fetch('https://oma-ai.com/api/premium-data');

if (response.status === 402) {
  const price = response.headers.get('x-payment-price'); // e.g., "0.001"
  console.log(`Price: $${price}`);
}
```

### 3. Sign Payment with Phantom

```javascript
import { ethers } from 'ethers';

// EIP-712 typed data
const domain = {
  name: 'x402-payment',
  version: '2.0',
  chainId: 8453, // Base
  verifyingContract: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6'
};

const recipient = '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6';
const amount = ethers.utils.parseUnits('0.001', 6); // 0.001 USDC
const salt = ethers.utils.formatBytes32String(ethers.utils.utils.randomBytes(32));

const message = ethers.utils.solidityPack(
  domain,
  recipient,
  amount,
  '0x' // empty data
);

const signature = await window.phantom.solana.signMessage(message, 'utf8');
```

### 4. Make API Call

```javascript
const response = await fetch('https://oma-oma-ai.com/api/premium-data', {
  method: 'POST',
  headers: {
    'X-Payment': `x402 ${btoa(JSON.stringify({
      version: '2.0',
      network: 'base',
      token: 'usdc',
      recipient: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
      amount: '0.001',
      signature,
      timestamp: Date.now()
    }))}`
  }
});
```

---

## 📱 Full Integration Example (Frontend)

```tsx
import { connect, utils } from '@phantom/wallet-adapter';

export default function OMAAIApiIntegration() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const connectPhantom = async () => {
    try {
      const { provider, wallet: phantomWallet } = await connect();
      setWallet(phantomWallet);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };
  
  const callApiWithPayment = async (endpoint: string, body: any = {}) => {
    setLoading(true);
    
    try {
      // 1. Connect if not connected
      if (!wallet) {
        await connectPhantom();
      }
      
      // 2. Get price requirements
      const checkResponse = await fetch(endpoint, { method: 'GET' });
      
      if (checkResponse.status === 402) {
        const price = checkResponse.headers.get('x-payment-price');
        const network = checkResponse.headers.get('x-payment-network') || 'base';
        
        // 3. Request payment via Phantom
        const message = `Pay $${price} USDC for ${endpoint}?`;
        const { signature } = await window.phantom.solana.signMessage(
          new TextEncoder().encode(message),
          'utf8',
          { signAs: 'utf8' }
        );
        
        // 4. Make call with payment
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'X-Payment': `x402 ${signature}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        
        const result = await response.json();
        return { success: true, data: result };
      }
      
      // Free API - no payment needed
      const result = await checkResponse.json();
      return { success: true, data: result };
      
    } catch (error) {
      console.error('API call failed:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <button onClick={connectPhantom}>
        {wallet ? `✅ ${wallet.address.slice(0, 6)}` : 'Connect Phantom'}
      </button>
      <button onClick={() => callApiWithPayment('/api/premium-data')}>
        {loading ? 'Processing...' : 'Get Premium Data'}
      </button>
    </div>
  );
}
```

---

## 🔐 Security Considerations

### For Users

- ✅ Phantom has hardware wallet support (Ledger, Trezor)
- ✅ Verify transaction details before approving
- ✅ Check recipient address matches
- ✅ Keep small amounts on hot wallet for daily use

### For Publishers

- ✅ Verify 90/10 revenue split in contract
- ✅ Monitor payment transactions
- ✅ Use separate wallet for API payments
- ✅ Sweep earnings to cold storage regularly

---

## 🎓 Additional Resources

- x402 Protocol: https://www.x402.org
- OpenX402 Docs: https://docs.openx402.ai
- Phantom SDK: https://github.com/phantom/sdk
- Phantom Discord: https://discord.gg/phantom

---

## 🆘 Troubleshooting

### Common Issues

**Q: Payment fails with "invalid signature"**
A: Check you're signing the correct message format (EIP-712 typed data)

**Q: Phantom not connecting**
A: Ensure Phantom extension is enabled and you have an account

**Q: Payment received but resource not provided**
A: Check if recipient address matches platform treasury

---

**x402 + Phantom integration is the most secure way to handle payments for AI agents!** 🚀