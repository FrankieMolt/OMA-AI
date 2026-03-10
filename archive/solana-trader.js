#!/usr/bin/env node

/**
 * NOSYT Solana Trading Bot - Jupiter API Integration
 * Uses Jupiter Ultra API for swaps and Portfolio API for monitoring
 */

const https = require('https');

// Configuration
const WALLET_ADDRESS = 'DcPfnhNQt98oXhgA7shgXpo2pgTzJMKf6TWuaddqqpSN';
const PRIVATE_KEY = process.env.SOLANA_PRIVATE_KEY; // From environment variable
const JUPITER_API_BASE = 'https://api.jup.ag';
const API_KEY = process.env.JUPITER_API_KEY || '';

// Known token mints
const TOKENS = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  JUP: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
  RAY: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
  MSOL: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'
};

// Helper function to make HTTPS requests
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.jup.ag',
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(API_KEY && { 'x-api-key': API_KEY })
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

// Get wallet holdings (Ultra API)
async function getWalletHoldings(address) {
  console.log(`\n📊 Fetching holdings for ${address}...`);
  try {
    const holdings = await makeRequest(`/ultra/v1/holdings/${address}`);

    console.log('\n💰 Wallet Holdings:');
    console.log('='.repeat(60));

    let totalValueUSD = 0;

    if (holdings && holdings.data) {
      for (const holding of holdings.data) {
        const balance = parseFloat(holding.balance) / Math.pow(10, holding.decimals);
        const valueUSD = holding.valueUSD ? parseFloat(holding.valueUSD) : 0;
        totalValueUSD += valueUSD;

        console.log(`\n  ${holding.symbol || holding.address}`);
        console.log(`  └─ Balance: ${balance.toFixed(6)} ${holding.symbol || 'N/A'}`);
        console.log(`  └─ Value: $${valueUSD.toFixed(2)}`);
        if (holding.frozen) {
          console.log(`  └─ ⚠️  FROZEN!`);
        }
      }
    } else {
      console.log('  No holdings found or empty wallet');
    }

    console.log('\n' + '='.repeat(60));
    console.log(`\n💎 Total Value: $${totalValueUSD.toFixed(2)}\n`);

    return holdings;
  } catch (error) {
    console.error('❌ Error fetching holdings:', error.message);
    return null;
  }
}

// Get DeFi positions (Portfolio API)
async function getPortfolioPositions(address) {
  console.log(`\n📈 Fetching portfolio positions...`);
  try {
    const positions = await makeRequest(`/portfolio/v1/positions?wallet=${address}`);

    if (positions && positions.data && positions.data.positions) {
      console.log('\n🔍 DeFi Positions:');
      console.log('='.repeat(60));

      const pos = positions.data.positions;
      console.log(`  Total Positions: ${pos.length}`);
      console.log(`  Total P&L: $${positions.data.totalPnl?.toFixed(2) || 'N/A'}`);

      // Show individual positions
      if (pos.length > 0) {
        console.log('\n  Positions:');
        pos.forEach(p => {
          console.log(`    - ${p.protocol || 'Unknown'}: ${p.type || 'Unknown'} $${p.value?.toFixed(2) || 'N/A'}`);
        });
      }

      console.log('\n' + '='.repeat(60));
    } else {
      console.log('  No DeFi positions found');
    }

    return positions;
  } catch (error) {
    console.error('❌ Error fetching portfolio positions:', error.message);
    return null;
  }
}

// Get token prices (Price API)
async function getPrices(mints) {
  console.log(`\n💲 Fetching prices...`);
  try {
    const ids = Array.isArray(mints) ? mints.join(',') : mints;
    const prices = await makeRequest(`/price/v3?ids=${ids}`);

    if (prices && prices.data) {
      console.log('\n💵 Current Prices:');
      console.log('='.repeat(60));
      for (const [mint, priceData] of Object.entries(prices.data)) {
        const symbol = Object.keys(TOKENS).find(key => TOKENS[key] === mint) || mint;
        console.log(`  ${symbol.padEnd(8)}: $${priceData.price.toFixed(6)}`);
      }
      console.log('='.repeat(60));
    }

    return prices;
  } catch (error) {
    console.error('❌ Error fetching prices:', error.message);
    return null;
  }
}

// Search for tokens (Tokens API)
async function searchTokens(query) {
  console.log(`\n🔎 Searching for tokens: ${query}...`);
  try {
    const tokens = await makeRequest(`/tokens/v2/search?query=${query}&limit=10`);

    if (tokens && tokens.data) {
      console.log('\n📋 Search Results:');
      console.log('='.repeat(60));
      tokens.data.forEach((token, i) => {
        console.log(`\n  ${i + 1}. ${token.symbol} - ${token.name}`);
        console.log(`     Mint: ${token.address}`);
        console.log(`     Price: $${token.price?.toFixed(6) || 'N/A'}`);
        if (token.verified) console.log(`     ✅ Verified`);
        if (token.logoURI) console.log(`     Icon: ${token.logoURI}`);
      });
      console.log('\n' + '='.repeat(60));
    }

    return tokens;
  } catch (error) {
    console.error('❌ Error searching tokens:', error.message);
    return null;
  }
}

// Get swap order (Ultra API)
async function getSwapOrder(inputMint, outputMint, amount) {
  console.log(`\n🔄 Getting swap order...`);
  console.log(`  From: ${inputMint.substring(0, 8)}...`);
  console.log(`  To: ${outputMint.substring(0, 8)}...`);
  console.log(`  Amount: ${amount}`);

  try {
    const order = await makeRequest(`/ultra/v1/order?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&taker=${WALLET_ADDRESS}`);

    if (order && order.data) {
      console.log('\n✅ Order created:');
      console.log('='.repeat(60));
      console.log(`  Request ID: ${order.data.requestId}`);
      console.log(`  In Amount: ${order.data.inAmount}`);
      console.log(`  Out Amount: ${order.data.outAmount}`);
      console.log(`  Slippage: ${order.data.slippageBps / 100}%`);
      console.log('  Transaction: Ready to sign');
      console.log('='.repeat(60));
    }

    return order;
  } catch (error) {
    console.error('❌ Error creating swap order:', error.message);
    return null;
  }
}

// Execute swap (Ultra API)
async function executeSwap(signedTransaction, requestId) {
  console.log(`\n⚡ Executing swap...`);

  try {
    const result = await makeRequest('/ultra/v1/execute', 'POST', {
      signedTransaction: signedTransaction,
      requestId: requestId
    });

    if (result && result.data) {
      console.log('\n✅ Swap executed!');
      console.log('='.repeat(60));
      console.log(`  Transaction: ${result.data.txid}`);
      console.log(`  Status: ${result.data.status}`);
      console.log('='.repeat(60));
    }

    return result;
  } catch (error) {
    console.error('❌ Error executing swap:', error.message);
    return null;
  }
}

// Main bot loop
async function main() {
  console.log('🚀 NOSYT Solana Trading Bot - Jupiter API Edition');
  console.log('=' .repeat(60));
  console.log(`Wallet: ${WALLET_ADDRESS}`);
  console.log('=' .repeat(60));

  // Step 1: Get current holdings
  const holdings = await getWalletHoldings(WALLET_ADDRESS);

  // Step 2: Get portfolio positions
  await getPortfolioPositions(WALLET_ADDRESS);

  // Step 3: Get prices for common tokens
  const commonTokens = [TOKENS.SOL, TOKENS.USDC, TOKENS.JUP, TOKENS.RAY, TOKENS.MSOL];
  await getPrices(commonTokens);

  // Step 4: Search for a token (example)
  // await searchTokens('SOL');

  // Step 5: Get swap order (commented out for safety)
  // To swap, you would:
  // 1. Get an order: const order = await getSwapOrder(TOKENS.USDC, TOKENS.JUP, 1000000);
  // 2. Sign the transaction with your private key
  // 3. Execute: await executeSwap(signedTx, order.data.requestId);

  console.log('\n✅ Bot cycle complete!\n');
}

// Run the bot
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  getWalletHoldings,
  getPortfolioPositions,
  getPrices,
  searchTokens,
  getSwapOrder,
  executeSwap,
  TOKENS
};
