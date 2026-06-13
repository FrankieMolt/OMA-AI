# OMA-AI Security Guide

## 🔐 Security Architecture

### Core Principles
1. **Zero Private Keys in Code** - Never commit credentials
2. **User-Provided Keys Only** - Each user configures their own
3. **Minimal Trust Model** - Users control their own wallets
4. **Defense in Depth** - Multiple layers of security

---

## 🏦 Treasury Wallet Setup Guide

### Step 1: Create Dedicated Treasury Wallet

**Why Separate?**
- Isolate platform funds from personal assets
- Enable team management via multisig if needed
- Clear audit trail for all transactions

**Option A: Create with MetaMask**
```
1. Open MetaMask
2. Click account dropdown → "Create Account"
3. Name it "OMA-AI Treasury"
4. Copy address (this is TREASURY_WALLET_BASE)
5. Save the recovery phrase in SECURE location (NOT in code!)
```

**Option B: Create with Wallet Command**
```bash
# Using ethers.js
npx ethers@5 wallet.createRandom

# Save these SECURELY:
# - Address → TREASURY_WOOPRIY_BASE in .env.local
# - Mnemonic → BACK UP in password manager (NEVER share)
```

**Security Checklist:**
- [ ] Store mnemonic in password manager (1Password, Bitwarden, etc.)
- [ ] Write address on paper backup
- [ ] Never export private key digitally
- [ ] Enable hardware wallet (Ledger, Trezor) for large amounts
- [ ] Set up multisig for >$10k threshold

---

### Step 2: Fund Treasury Wallet

**On Base Network:**
1. Go to: https://bridge.base.org
2. Connect MetaMask
3. Bridge ETH from Ethereum → Base (or buy directly on Base)
4. Amount: 0.01-0.05 ETH (~$20-100) for initial gas

**Why ETH?**
- Pay gas for escrow contract deployment
- Pay gas for x402 payment verifications
- Pay gas for x402 contract maintenance

---

### Step 3: Configure in OMA-AI

```bash
# In .env.local
TREASURY_WALLET_BASE=0xYourTreasuryWalletAddress
```

This is where the 10% platform fee from every API call goes.

---

## 🔑 Wallet Security Best Practices

### For Treasury Wallet (Platform)

**Do:**
- ✅ Use hardware wallet (Ledger, Trezor, Safe multisig)
- ✅ Create a separate wallet from personal funds
- ✅ Enable spending limits
- ✅ Regular audits of transaction history

**Don't:**
- ❌ Use personal wallet
- ❌ Share private key or mnemonic
- ❌ Keep large amounts (>100 USDC) without cold storage
- ❌ Approve unknown transactions

### For Publishers (API Owners)

**Recommended:**
- Create dedicated wallet for receiving payments
- Use hardware wallet for withdrawals
- Set up automated daily sweep to cold storage
- Monitor transaction history

---

## 🛡️ Supabase Security Configuration

### Database Security

### Enable Row Level Security (RLS)
```sql
-- RLS is already enabled in setup-supabase.sql
-- It enforces:
-- Users can only see their own data
-- Publishers can only manage their own APIs
-- Earnings for suspicious activity
```

### API Key Security

**How They're Stored:**
```typescript
// API keys are SHA-256 hashed (never stored plain text)
const keyHash = crypto.createHash('sha256')
    .update(apiKey)
    .digest('hex');
```

**This means:**
- Even if database is compromised, raw API keys aren't exposed
- Only hashes are stored (non-reversible)
- Generate new key to revoke compromised one

### Database Access Control

**Two Types of Keys:**
1. **Anon Key** - Public, for frontend access
2. **Service Role Key** - Secret, for backend, NEVER expose to frontend

**Never expose Service Role Key!** Add this to `.env.example`:
```bash
# ⚠️ WARNING: Never commit this to git
SUPABASE_SERVICE_ROLE_KEY=your-secret-service-role-key
```

---

## 🔐 x402 + Phantom Integration Guide

### Overview
x402 enables HTTP-level payments. Phantom is the preferred wallet for interacting with x402 on Base and Solana.

### Integration Architecture

```
┌─────────────┐
│  OMA-AI API  │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│   402 Response         │
│  (Payment Required)    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│   Phantom Wallet      │
│  (User connects)      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│   x402 Payment        │
│  (USDC on Base/Solana)  │
└──────────────────────┘
       │
       ▼
┌──────────────────────┐
│   OpenX402 Facilitator│
│  (Verifies payment)   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│   Resource Access      │
└──────────────────────┘
```

---

## 💻 Example Code: Signing x402 Payments

### 1. Phantom Wallet Connection

```typescript
import { connect, signMessage } from '@phantom/wallet-adapter';

// Connect to Phantom wallet
const connectWallet = async () => {
  try {
    const response = await connect();
    const provider = response.provider;
    const wallet = response;
    
    console.log('Connected to Phantom:', wallet.address);
    return { wallet, provider };
  } catch (error) {
    console.error('Phantom connection failed:', error);
    return null;
  }
};
```

### 2. Get Payment Requirements

```typescript
const getPaymentRequirements = async (apiEndpoint: string) => {
  const response = await fetch(apiEndpoint);
  
  if (response.status === 402) {
    const requirements = {
      price: response.headers.get('x-payment-price'),
      network: response.headers.get('x-payment-network') || 'base',
      token: response.headers.get('x-payment-token') || 'usdc',
      recipient: response.headers.get('x-payment-recipient')
    };
    return requirements;
  }
  
  return null; // No payment required
};
```

### 3. Sign x402 Payment (Base / Ethereum)

```typescript
import { ethers } from 'ethers';

const signX402Payment = async (
  wallet: any,
  recipient: string,
  amount: string,
  token: string = 'usdc',
  network: string = 'base'
) => {
  // EIP-20 transfer data
  const transferData = {
    to: recipient,
    value: ethers.utils.parseUnits(amount, 6), // USDC has 6 decimals
  };
  
  // Get EIP-712 typed data for x402 v2
  const domain = {
    name: 'x402-payment',
    version: '2.0',
    chainId: network === 'base' ? 8453 : 1, // Base=8453, Ethereum=1
    verifyingContract: process.env.X402_CONTRACT || '0x...',
    salt: ethers.utils.formatBytes32String(ethers.utils.randomBytes(32))
  };
  
  // Create message to sign
  const message = ethers.utils.solidityPack(
    domain,
    recipient,
    transferData.value,
    transferData.data
  );
  
  // Sign with wallet
  const signature = await wallet.signMessage(message);
  
  return signature;
};
```

### 4. Create Payment Header

```typescript
const createPaymentHeader = async (
  apiEndpoint: string,
  paymentParams: {
    recipient: string;
    amount: string;
  }
) => {
  const { wallet } = await connectWallet();
  
  // Get payment requirements from API
  const requirements = await getPaymentRequirements(apiEndpoint);
  
  if (!requirements) {
    return null; // No payment needed
  }
  
  // Sign the payment
  const signature = await signX402Payment(
    wallet,
    requirements.recipient,
    requirements.amount,
    requirements.token,
    requirements.network
  );
  
  // Create payment header
  const paymentHeader = {
    version: '2.0',
    network: requirements.network,
    token: requirements.token,
    recipient: requirements.recipient,
    amount: requirements.amount,
    signature: signature,
    timestamp: Date.now()
  };
  
  // Base64 encode
  const headerValue = btoa(JSON.stringify(paymentHeader));
  
  return `x402 ${headerValue}`;
};
```

### 5. Make API Call with Payment

```typescript
const callApiWithPayment = async (
  apiEndpoint: string,
  options: RequestInit = {}
) => {
  const paymentHeader = await createPaymentHeader(apiEndpoint, {
    recipient: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6', // Platform treasury
    amount: '0.001' // $0.001 in USDC
  });
  
  const response = await fetch(apiEndpoint, {
    ...options,
    headers: {
      ...options.headers,
      'X-Payment': paymentHeader,
      'Content-Type': 'application/json'
    }
  });
  
  if (response.status === 402) {
    console.log('Payment required but not provided');
    return null;
  }
  
  return response.json();
};
```

---

## 🔐 Phantom + x402 Integration Example (Complete)

```typescript
/**
 * Complete OMA-AI + Phantom + x402 integration example
 */

import { connect, signMessage, utils } from '@phantom/wallet-adapter';
import { ethers } from 'ethers';

const PLATFORM_TREASURY = '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6';
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

/**
 * Complete flow: Connect wallet → Get price → Sign payment → Call API
 */
async function callOmaAiApi(apiEndpoint: string, body: any = {}) {
  
  // Step 1: Connect to Phantom
  const { wallet, provider } = await connect();
  console.log('✓ Connected:', wallet.address);
  
  // Step 2: Get price (402 if paid)
  const response = await fetch(apiEndpoint, { method: 'GET' });
  
  if (response.status === 402) {
    const price = response.headers.get('x-payment-price') || '0.001';
    const network = response.headers.get('x-payment-network') || 'base';
    const token = response.headers.get('x-payment-token') || 'usdc';
    
    console.log(`Payment required: ${price} ${token} on ${network}`);
    
    // Step 3: Sign payment
    const transferData = {
      to: PLATFORM_TREASURY,
      value: ethers.utils.parseUnits(price, 6) // USDC has 6 decimals
    };
    
    const domain = {
      name: 'x402-payment',
      version: '2.0',
      chainId: network === 'base' ? 8453 : 1,
      salt: ethers.utils.formatBytes32String(ethers.utils.randomBytes(32))
    };
    
    const message = ethers.utils.solidityPack(
      domain,
      PLATFORM_TREASURY,
      transferData.value,
      transferData.data
    );
    
    const signature = await wallet.signMessage(message);
    
    // Step 4: Create payment header
    const paymentHeader = {
      version: '2.0',
      network,
      token,
      recipient: PLATFORM_TREASURY,
      amount: price,
      signature,
      timestamp: Date.now()
    };
    
    // Step 5: Make API call
    const apiResponse = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'X-Payment': `x402 ${btoa(JSON.stringify(paymentHeader))}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    const result = await apiResponse.json();
    console.log('✓ API result:', result);
    return result;
    
  } else {
    // No payment required
    const result = await response.json();
    console.log('✓ Free API (no payment needed)');
    return result;
  }
}

// Usage
callOmaAiApi('https://oma-ai.com/api/premium-data')
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Error:', err));
```

---

## 🔐 Treasury Wallet Security Operations

### Daily Revenue Collection

The platform collects 10% automatically. To sweep funds:

```typescript
import { ethers } from 'ethers';

async function sweepPlatformFees(treasuryWallet: string, destination: string) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_BASE_RPC || 'https://mainnet.base.org'
  );
  
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const usdc = new ethers.Contract(
    USDC_BASE,
    ['function transfer(address,uint256)'],
    wallet
  );
  
  // Get balance
  const balance = await usdc.balanceOf(treasuryWallet);
  const balanceInUsdc = ethers.utils.formatUnits(balance, 6);
  
  console.log(`Platform funds: $${balanceInUsdc}`);
  
  // Sweep all but 0.1 USDC (for gas)
  const keepAmount = ethers.utils.parseUnits('0.1', 6);
  const amountToSend = balance.sub(keepAmount);
  
  if (amountToSend.gt(0)) {
    const tx = await usdc.transfer(destination, amountToSend);
    await tx.wait();
    console.log(`Swept $${ethers.utils.formatUnits(amountToSend, 6)} to ${destination}`);
  }
}
```

---

## 🔐 Security Audits

### Weekly Checklist

- [ ] Review transaction logs for unusual activity
- [ ] Verify 10/90 revenue split is accurate
- [ ] Check for unauthorized API key usage
- [ ] Audit database for suspicious queries
- [ ] Verify wallet balances match expected
- [ ] Review gas spending patterns
- [ ] Check for rate limit violations

### Monthly Checklist

- [ ] Update smart contract if needed
- [ ] Rotate any exposed API keys
- [ ] Review database access logs
- [ ] Audit wallet permissions
- [ ] Verify software dependencies (npm audit)
- [ ] Backup database
- [ ] Review security patches

---

## 🚨 Incident Response

If security breach detected:

### Immediate Actions:
1. **Revoke Compromised Keys**: Generate new ones
2. **Sweep Treasury**: Move funds to cold wallet
3. **Reset Admin Access**: Change all admin credentials
4. **Notify Users**: If data breach

### Post-Incident:
1. Conduct post-mortem
2. Update security protocols
3. File incident report
4. Implement additional safeguards

---

## 📞 Security Contact

For security issues:
- Email: security@oma-ai.com
- GitHub: Report as security vulnerability
- Bug bounty: https://oma-ai.com/security

---

**Follow these guidelines for maximum security!** 🔐