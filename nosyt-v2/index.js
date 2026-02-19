#!/usr/bin/env node
/**
 * NOSYT v2 - Full Autonomous Trading Agent
 * No Conway dependency - direct wallet control
 */

import { createWalletClient, http, parseEther, formatEther } from 'viem';
import { base } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import fs from 'fs/promises';

// CONFIG
const CONFIG = {
  wallet: {
    privateKey: '0x98275b9383fb61c60c1ba04576bfe3d71e57e7310a6370a4bddd773f77f08daa',
    address: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6'
  },
  trading: {
    enabled: true,
    pair: 'SOL/USDC',
    maxTradeSize: 10, // USD
    stopLoss: 2, // %
    takeProfit: 5, // %
    checkInterval: 60000 // 1 minute
  }
};

// State
let state = {
  version: '2.0.0',
  startedAt: new Date().toISOString(),
  trades: [],
  profit: 0,
  lastPrice: 0,
  position: null,
  isRunning: true
};

class NOSYTTrader {
  constructor() {
    const account = privateKeyToAccount(CONFIG.wallet.privateKey);
    this.wallet = createWalletClient({
      account,
      chain: base,
      transport: http('https://mainnet.base.org')
    });
    this.priceHistory = [];
  }

  async getBalance() {
    try {
      return await this.wallet.getBalance({ address: CONFIG.wallet.address });
    } catch(e) { return 0n; }
  }

  async getSOLPrice() {
    try {
      const res = await fetch('https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112');
      const data = await res.json();
      const price = parseFloat(data.data?.So11111111111111111111111111111111111111112?.price || '0');
      this.priceHistory.push(price);
      if (this.priceHistory.length > 50) this.priceHistory.shift();
      return price;
    } catch(e) { return 0; }
  }

  async checkSignal(price) {
    if (this.priceHistory.length < 10) return 'hold';
    
    const sma20 = this.priceHistory.slice(-20).reduce((a,b)=>a+b,0) / Math.min(20, this.priceHistory.length);
    const deviation = ((price - sma20) / sma20) * 100;
    
    // Mean reversion
    if (deviation < -1.5) return 'buy';
    if (deviation > 2 && state.position) return 'sell';
    
    return 'hold';
  }

  async executeTrade(type, price) {
    const timestamp = new Date().toISOString();
    
    if (type === 'buy' && !state.position) {
      console.log(`[TRADE] BUYING SOL at $${price.toFixed(2)}`);
      state.position = {
        entryPrice: price,
        amount: CONFIG.trading.maxTradeSize / price,
        timestamp
      };
      state.trades.push({ type: 'buy', price, timestamp, profit: 0 });
      
    } else if (type === 'sell' && state.position) {
      const profit = (price - state.position.entryPrice) * state.position.amount;
      console.log(`[TRADE] SELLING SOL at $${price.toFixed(2)} | Profit: $${profit.toFixed(2)}`);
      state.profit += profit;
      state.trades.push({ type: 'sell', price, timestamp, profit });
      state.position = null;
    }
    
    await this.saveState();
  }

  async saveState() {
    await fs.writeFile('state.json', JSON.stringify(state, null, 2));
  }

  async run() {
    console.log('╔══════════════════════════════════════════╗');
    console.log('║   NOSYT v2.0 - AUTONOMOUS TRADER         ║');
    console.log('║   Wallet: 0x40AE...4eC6                  ║');
    console.log('╚══════════════════════════════════════════╝');
    
    const balance = await this.getBalance();
    console.log(`[INIT] Balance: ${formatEther(balance)} ETH`);
    console.log(`[INIT] Mode: Trading ${CONFIG.trading.pair}`);
    console.log(`[INIT] Starting monitoring...\n`);

    while (state.isRunning) {
      try {
        const price = await this.getSOLPrice();
        if (price === 0) {
          await new Promise(r => setTimeout(r, 5000));
          continue;
        }

        const signal = await this.checkSignal(price);
        
        if (signal !== 'hold') {
          await this.executeTrade(signal, price);
        }

        // Log status every 5 minutes
        if (state.trades.length % 5 === 0) {
          console.log(`[STATUS] Price: $${price.toFixed(2)} | Trades: ${state.trades.length} | PnL: $${state.profit.toFixed(2)} | Position: ${state.position ? 'HOLDING' : 'NONE'}`);
        }

        await new Promise(r => setTimeout(r, CONFIG.trading.checkInterval));
      } catch(e) {
        console.error('[ERROR]', e.message);
        await new Promise(r => setTimeout(r, 10000));
      }
    }
  }
}

// Start
const trader = new NOSYTTrader();
trader.run().catch(console.error);
