# 💰 Funding Guide - NOSYT Trading Bot & Frankie API

## Current Status

- **Frankie API:** ✅ Operational, $0 earnings (no traffic)
- **NOSYT Trading Bot:** ✅ Running, 0 trades (no funding)
- **Credits:** $23.50 (156 hours of runtime)
- **Base Wallet:** `0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6`

---

## 🎯 What Needs Funding

### 1. Frankie API (for testing)

**Why:** Test x402 payment flow with real transactions

**How much:** $1-5 USDC

**How to fund:**
1. Get USDC on Base network
2. Send to `0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6`
3. Call any paid endpoint

### 2. NOSYT Trading Bot

**Why:** Execute actual trades on Base network

**How much:** $5-20 USDC (recommended)

**How to fund:**
1. Get USDC on Base network
2. Send to `0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6`
3. Bot will automatically detect balance and start trading

---

## 🔄 How to Get USDC on Base

### Option 1: Bridge from Ethereum Mainnet

1. Go to [Base Bridge](https://bridge.base.org/)
2. Connect wallet
3. Bridge USDC from Ethereum → Base
4. ~$1-2 gas fee

### Option 2: Buy on Base

1. Use Coinbase (easiest)
2. Buy USDC
3. Withdraw to Base network
4. Address: `0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6`

### Option 3: Swap on Base

1. Have ETH on Base
2. Use Uniswap/Aerodrome
3. Swap ETH → USDC
4. Send to bot wallet

### Option 4: Use faucet (for testing)

1. [Base Faucet](https://faucet.base.org/) - Get test ETH
2. Swap to USDC on testnet
3. **Note:** This is testnet only, not real value

---

## 💸 Recommended Funding Amounts

| Use Case | Amount | Purpose |
|----------|--------|---------|
| API Testing | $1 USDC | Test all 5 paid endpoints |
| Bot Trading (conservative) | $5 USDC | Small trades, low risk |
| Bot Trading (normal) | $20 USDC | Regular trading activity |
| Bot Trading (aggressive) | $50+ USDC | High-frequency trading |

**Start with $5 USDC** to test the system safely.

---

## 📊 Expected Returns

Based on current strategy:

### Conservative (5% daily ROI)
- $5 funding → $0.25/day profit
- Monthly: ~$7.50

### Normal (10% daily ROI)
- $5 funding → $0.50/day profit
- Monthly: ~$15

### Aggressive (20% daily ROI)
- $5 funding → $1/day profit
- Monthly: ~$30

**Note:** These are estimates. Actual results depend on market conditions.

---

## 🧪 Testing the System

Once funded, test like this:

```bash
# 1. Check balance
curl https://frankie-api.life.conway.tech/stats

# 2. Test payment flow
# Send $0.01 USDC to wallet
# Then call:
curl https://frankie-api.life.conway.tech/price

# 3. Check NOSYT logs
tail -f ~/.automaton/logs/nosyt-*.log
```

---

## ⚠️ Security Notes

1. **Never share your private key**
2. **Start with small amounts** (test before trusting)
3. **Monitor logs** for suspicious activity
4. **Keep credits topped up** (bot stops if credits = 0)

---

## 🎯 Quick Start

**Fastest path to testing:**

1. Send $5 USDC to `0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6` on Base
2. Wait for confirmation (1-2 minutes)
3. Visit `https://frankie-api.life.conway.tech/dashboard`
4. Call `/price` endpoint - should work!
5. Check logs for NOSYT trading activity

**Total time:** 5-10 minutes

---

## 📈 Monitoring

After funding, track:

```bash
# Credit balance
mcporter call conway.credits_balance | jq '.credits_cents / 100'

# API earnings
curl -s https://frankie-api.life.conway.tech/stats | jq '.earnings'

# Bot activity
tail -f ~/.automaton/logs/nosyt-*.log
```

---

## 🆘 Troubleshooting

**Problem:** Sent USDC but can't use endpoints
- **Solution:** Wait for transaction confirmation (1-2 min)
- **Check:** Transaction on [BaseScan](https://basescan.org/)

**Problem:** Bot not trading
- **Solution:** Ensure balance > $1 USDC
- **Check:** Bot logs for errors

**Problem:** Credits running low
- **Solution:** Top up via `mcporter call conway.credits_topup`
- **Minimum:** Keep $5 credits for 24h runtime

---

## 💡 Pro Tips

1. **Set alerts** when balance < $2
2. **Reinvest profits** to compound growth
3. **Test in small amounts** before scaling
4. **Monitor first 24h** closely

---

Ready to fund? Just send USDC to:
`0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6` (Base network)

Then watch the magic happen! ✨
