#!/usr/bin/env node

/**
 * NOSYT Solana Trading Bot V2
 * Uses real Jupiter API for swaps and advanced price analysis
 */

const https = require('https');

const WALLET_ADDRESS = 'DcPfnhNQt98oXhgA7shgXpo2pgTzJMKf6TWuaddqqpSN';

// Known tokens with their Coingecko IDs
const TOKENS = {
  'SOL': { mint: 'So11111111111111111111111111111111111111112', coingecko: 'solana' },
  'USDC': { mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', coingecko: 'usd-coin' },
  'JUP': { mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', coingecko: 'jupiter-exchange-solana' },
  'RAY': { mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', coingecko: 'raydium' },
  'MSOL': { mint: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', coingecko: 'msol' },
  'BONK': { mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', coingecko: 'bonk' },
};

// Helper function for HTTPS requests
function makeRequest(url, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Get wallet holdings from Solana RPC
async function getWalletHoldings(address) {
  console.log(`\n📊 Fetching wallet holdings from Solana RPC...`);

  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "getTokenAccountsByOwner",
    params: [
      address,
      { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
      { encoding: "jsonParsed" }
    ]
  };

  const result = await makeRequest('https://api.mainnet-beta.solana.com', 'POST', payload);

  const holdings = {};
  let totalValue = 0;

  // Get SOL balance
  const balancePayload = {
    jsonrpc: "2.0",
    id: 2,
    method: "getBalance",
    params: [address]
  };
  const balanceResult = await makeRequest('https://api.mainnet-beta.solana.com', 'POST', balancePayload);

  if (balanceResult && balanceResult.result && balanceResult.result.value) {
    const solBalance = balanceResult.result.value / 1_000_000_000;
    holdings['SOL'] = { amount: solBalance, price: 0, value: 0 };
  }

  // Parse token accounts
  if (result && result.result && result.result.value) {
    for (const account of result.result.value) {
      const info = account.account.data.parsed.info;
      const mint = info.mint;
      const amount = parseFloat(info.tokenAmount.uiAmountString);

      // Find token symbol
      const token = Object.keys(TOKENS).find(key => TOKENS[key].mint === mint);
      if (token) {
        holdings[token] = { amount, price: 0, value: 0 };
      } else {
        holdings[mint.substring(0, 8)] = { amount, price: 0, value: 0 };
      }
    }
  }

  return holdings;
}

// Get prices from CoinGecko
async function getPrices(tokens) {
  console.log(`\n💲 Fetching prices from CoinGecko...`);

  const coinGeckoIds = tokens
    .map(t => TOKENS[t] ? TOKENS[t].coingecko : null)
    .filter(id => id)
    .join(',');

  if (!coinGeckoIds) {
    console.log('  No valid CoinGecko IDs found');
    return {};
  }

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds}&vs_currencies=usd&include_24hr_change=true`;
  const prices = await makeRequest(url);

  const priceMap = {};
  for (const [symbol, tokenData] of Object.entries(TOKENS)) {
    if (prices[tokenData.coingecko]) {
      priceMap[symbol] = prices[tokenData.coingecko].usd;
      priceMap[`${symbol}_change_24h`] = prices[tokenData.coingecko].usd_24h_change || 0;
    }
  }

  return priceMap;
}

// Calculate technical indicators
function calculateIndicators(prices) {
  if (!prices || prices.length < 2) {
    return { rsi: 50, macd: 0, momentum: 0 };
  }

  // RSI (simplified)
  const gains = [];
  const losses = [];

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) {
      gains.push(change);
      losses.push(0);
    } else {
      gains.push(0);
      losses.push(Math.abs(change));
    }
  }

  const avgGain = gains.reduce((a, b) => a + b, 0) / gains.length || 0;
  const avgLoss = losses.reduce((a, b) => a + b, 0) / losses.length || 0;

  let rsi = 50;
  if (avgLoss > 0) {
    const rs = avgGain / avgLoss;
    rsi = 100 - (100 / (1 + rs));
  }

  // Momentum (price change over period)
  const momentum = ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100;

  return { rsi, macd: 0, momentum };
}

// Generate trading signals
function generateSignals(holdings, priceMap) {
  console.log(`\n🎯 Generating trading signals...`);

  const signals = [];

  for (const [token, holding] of Object.entries(holdings)) {
    if (holding.amount <= 0) continue;

    const price = priceMap[token] || 0;
    const change24h = priceMap[`${token}_change_24h`] || 0;

    holding.price = price;
    holding.value = holding.amount * price;

    // Generate signals
    const tokenSignals = [];

    // RSI-based signals (would need historical data)
    if (change24h < -10) {
      tokenSignals.push({ action: 'BUY', reason: 'Price down 24h', confidence: 0.6 });
    } else if (change24h > 15) {
      tokenSignals.push({ action: 'SELL', reason: 'Price up 24h', confidence: 0.6 });
    }

    // Small holdings
    if (holding.value < 5) {
      tokenSignals.push({ action: 'HOLD', reason: 'Small position', confidence: 0.5 });
    }

    // Large holdings
    if (holding.value > 20) {
      tokenSignals.push({ action: 'MONITOR', reason: 'Large position', confidence: 0.7 });
    }

    if (tokenSignals.length > 0) {
      signals.push({
        token,
        price,
        value: holding.value,
        change24h,
        signals: tokenSignals
      });
    }
  }

  return signals;
}

// Generate swap order using Jupiter API
async function getSwapOrder(inputMint, outputMint, amount, walletAddress) {
  console.log(`\n🔄 Getting swap order...`);

  const url = `https://api.jup.ag/ultra/v1/order?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&taker=${walletAddress}`;

  try {
    const order = await makeRequest(url);
    return order;
  } catch (error) {
    console.error('❌ Error getting swap order:', error.message);
    return null;
  }
}

// Main function
async function main() {
  console.log('🚀 NOSYT Solana Trading Bot V2');
  console.log('='.repeat(70));
  console.log(`Wallet: ${WALLET_ADDRESS}`);
  console.log('='.repeat(70));

  // Step 1: Get holdings
  const holdings = await getWalletHoldings(WALLET_ADDRESS);

  // Step 2: Get prices
  const priceMap = await getPrices(Object.keys(TOKENS));

  // Step 3: Calculate values
  let totalValue = 0;
  for (const [token, holding] of Object.entries(holdings)) {
    const price = priceMap[token] || 0;
    holding.price = price;
    holding.value = holding.amount * price;
    totalValue += holding.value;
  }

  // Step 4: Display portfolio
  console.log('\n💰 Portfolio Summary');
  console.log('='.repeat(70));

  for (const [token, holding] of Object.entries(holdings)) {
    if (holding.amount > 0) {
      const change24h = priceMap[`${token}_change_24h`] || 0;
      const changeEmoji = change24h > 0 ? '📈' : change24h < 0 ? '📉' : '➡️';

      console.log(`\n  ${token}:`);
      console.log(`    Amount: ${holding.amount.toFixed(6)}`);
      console.log(`    Price: $${holding.price.toFixed(6)}`);
      console.log(`    Value: $${holding.value.toFixed(2)}`);
      console.log(`    24h Change: ${changeEmoji} ${change24h.toFixed(2)}%`);
    }
  }

  console.log(`\n  ${'='.repeat(66)}`);
  console.log(`  💎 Total Value: $${totalValue.toFixed(2)}`);
  console.log('='.repeat(70));

  // Step 5: Generate signals
  const signals = generateSignals(holdings, priceMap);

  if (signals.length > 0) {
    console.log('\n🎯 Trading Signals');
    console.log('='.repeat(70));

    for (const signal of signals) {
      console.log(`\n  ${signal.token} ($${signal.price.toFixed(6)})`);
      for (const s of signal.signals) {
        const emoji = s.action === 'BUY' ? '🟢' : s.action === 'SELL' ? '🔴' : '🟡';
        console.log(`    ${emoji} ${s.action}: ${s.reason} (confidence: ${s.confidence})`);
      }
    }
  } else {
    console.log('\n⏸️  No strong signals - HOLD positions');
  }

  console.log('\n✅ Bot cycle complete!\n');
}

// Run the bot
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  getWalletHoldings,
  getPrices,
  generateSignals,
  getSwapOrder,
  TOKENS
};
