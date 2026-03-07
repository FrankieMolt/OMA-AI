#!/usr/bin/env node

/**
 * NOSYT Solana Trading Bot V3
 * Uses Solana RPC + Jupiter Price API (no rate limits)
 */

const https = require('https');

const WALLET_ADDRESS = 'DcPfnhNQt98oXhgA7shgXpo2pgTzJMKf6TWuaddqqpSN';

// Known tokens with their mints
const TOKENS = {
  'SOL': 'So11111111111111111111111111111111111111112',
  'USDC': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  'JUP': 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
  'RAY': '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
  'MSOL': 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
  'BONK': 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
};

// Helper function for HTTPS requests
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ error: e.message, raw: body });
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

  // Parse token accounts
  if (result && result.result && result.result.value) {
    for (const account of result.result.value) {
      const info = account.account.data.parsed.info;
      const mint = info.mint;
      const amount = parseFloat(info.tokenAmount.uiAmountString);

      // Find token symbol
      const token = Object.keys(TOKENS).find(key => TOKENS[key] === mint);
      if (token) {
        holdings[token] = { amount, price: 0, value: 0, mint };
      } else {
        holdings[mint.substring(0, 8)] = { amount, price: 0, value: 0, mint };
      }
    }
  }

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
    holdings['SOL'] = { amount: solBalance, price: 0, value: 0, mint: TOKENS.SOL };
  }

  return holdings;
}

// Get prices from Jupiter Price API
async function getPrices(tokens) {
  console.log(`\n💲 Fetching prices from Jupiter Price API...`);

  const mints = tokens.filter(t => TOKENS[t]).map(t => TOKENS[t]).join(',');
  if (!mints) {
    console.log('  No tokens to price');
    return {};
  }

  // Try Jupiter Price API
  let prices = {};
  try {
    const url = `https://api.jup.ag/price/v3?ids=${mints}`;
    const response = await makeRequest(url);

    if (response && response.data) {
      console.log(`  ✅ Got ${Object.keys(response.data).length} prices from Jupiter`);
      prices = response.data;

      // Convert mint addresses to symbols
      const priceMap = {};
      for (const [symbol, mint] of Object.entries(TOKENS)) {
        if (prices[mint]) {
          priceMap[symbol] = prices[mint].price;
        }
      }

      return priceMap;
    }
  } catch (error) {
    console.log(`  ⚠️  Jupiter API error: ${error.message}`);
  }

  return {};
}

// Generate trading signals based on price data and portfolio composition
function generateSignals(holdings, priceMap) {
  console.log(`\n🎯 Generating trading signals...`);

  const signals = [];

  // Calculate portfolio composition
  const values = [];
  for (const [token, holding] of Object.entries(holdings)) {
    const price = priceMap[token] || 0;
    holding.price = price;
    holding.value = holding.amount * price;
    if (holding.value > 0) {
      values.push(holding.value);
    }
  }

  const totalValue = values.reduce((a, b) => a + b, 0);
  const avgValue = values.length > 0 ? totalValue / values.length : 0;

  for (const [token, holding] of Object.entries(holdings)) {
    if (holding.amount <= 0) continue;

    const value = holding.value;
    const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;

    const tokenSignals = [];

    // Portfolio rebalancing signals
    if (percentage > 60) {
      tokenSignals.push({ action: 'REDUCE', reason: `Position too large (${percentage.toFixed(1)}%)`, confidence: 0.7 });
    } else if (percentage < 5 && value > 1) {
      tokenSignals.push({ action: 'INCREASE', reason: `Position too small (${percentage.toFixed(1)}%)`, confidence: 0.5 });
    }

    // Small holdings
    if (value < 1) {
      tokenSignals.push({ action: 'MONITOR', reason: 'Small position (<$1)', confidence: 0.4 });
    }

    // Large holdings
    if (value > 20) {
      tokenSignals.push({ action: 'MONITOR', reason: 'Large position (>$20)', confidence: 0.6 });
    }

    if (tokenSignals.length > 0) {
      signals.push({
        token,
        price: holding.price,
        value,
        percentage,
        signals: tokenSignals
      });
    }
  }

  return signals;
}

// Main function
async function main() {
  console.log('🚀 NOSYT Solana Trading Bot V3');
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

  const sortedHoldings = Object.entries(holdings)
    .filter(([_, h]) => h.amount > 0)
    .sort((a, b) => b[1].value - a[1].value);

  for (const [token, holding] of sortedHoldings) {
    const percentage = totalValue > 0 ? (holding.value / totalValue) * 100 : 0;
    const bar = '█'.repeat(Math.round(percentage / 2));

    console.log(`\n  ${token}:`);
    console.log(`    Amount: ${holding.amount.toFixed(6)}`);
    console.log(`    Price: $${holding.price.toFixed(6)}`);
    console.log(`    Value: $${holding.value.toFixed(2)}`);
    console.log(`    Share:  ${bar} ${percentage.toFixed(1)}%`);
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
      console.log(`\n  ${signal.token} ($${signal.price.toFixed(6)} | ${signal.percentage.toFixed(1)}% | $${signal.value.toFixed(2)})`);
      for (const s of signal.signals) {
        const emoji = s.action === 'BUY' || s.action === 'INCREASE' ? '🟢' :
                     s.action === 'SELL' || s.action === 'REDUCE' ? '🔴' : '🟡';
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
  TOKENS
};
