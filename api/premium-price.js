/**
 * OMA-AI Premium Price API with x402 Payments
 * Uses OpenX402 facilitator for USDC payments on Base
 * 
 * Endpoint: /api/premium-price
 * Price: $0.001 per request
 * Network: base
 */

import { ethers } from 'ethers';

const PAYMENT_REQUIREMENT = {
  "x402-version": 1,
  "scheme": "erc20",
  "currency": "USDC",
  "amount": "0.001",  // $0.001 per request
  "recipient": process.env.X402_RECIPIENT_WALLET || "0x742d35Cc6634C0532925a3b844Bc9e7595f0eB1D",
  "network": "base",
  "description": "Premium crypto price data"
};

// OpenX402 Facilitator URL
const FACILITATOR_URL = "https://facilitator.openx402.ai";

/**
 * Verify payment with OpenX402 facilitator
 */
async function verifyPayment(paymentHeader) {
  if (!paymentHeader) return false;
  
  try {
    const response = await fetch(`${FACILITATOR_URL}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENX402_API_KEY || ''}`
      },
      body: JSON.stringify({
        authorization: paymentHeader
      })
    });
    
    return response.ok;
  } catch (e) {
    console.error('Payment verification failed:', e);
    return false;
  }
}

/**
 * Fetch premium prices (simulated)
 */
async function fetchPremiumPrices() {
  const APIS = {
    coingecko: 'https://api.coingecko.com/api/v3'
  };
  
  try {
    const res = await fetch(
      `${APIS.coingecko}/simple/price?ids=bitcoin,ethereum,solana,base,avalanche-2,polkadot,chainlink,uniswap,render-token,sandbox-token&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
    );
    
    if (res.ok) {
      const data = await res.json();
      return {
        prices: {
          btc: { price: data.bitcoin?.usd, mcap: data.bitcoin?.usd_market_cap, change: data.bitcoin?.usd_24h_change },
          eth: { price: data.ethereum?.usd, mcap: data.ethereum?.usd_market_cap, change: data.ethereum?.usd_24h_change },
          sol: { price: data.solana?.usd, mcap: data.solana?.usd_market_cap, change: data.solana?.usd_24h_change },
          base: { price: data.base?.usd, mcap: data.base?.usd_market_cap, change: data.base?.usd_24h_change },
          avax: { price: data['avalanche-2']?.usd, mcap: data['avalanche-2']?.usd_market_cap, change: data['avalanche-2']?.usd_24h_change },
          dot: { price: data.polkadot?.usd, mcap: data.polkadot?.usd_market_cap, change: data.polkadot?.usd_24h_change },
          link: { price: data.chainlink?.usd, mcap: data.chainlink?.usd_market_cap, change: data.chainlink?.usd_24h_change },
          uni: { price: data.uniswap?.usd, mcap: data.uniswap?.usd_market_cap, change: data.uniswap?.usd_24h_change },
          rndr: { price: data['render-token']?.usd, mcap: data['render-token']?.usd_market_cap, change: data['render-token']?.usd_24h_change },
          sand: { price: data['sandbox-token']?.usd, mcap: data['sandbox-token']?.usd_market_cap, change: data['sandbox-token']?.usd_24h_change }
        },
        tier: 'premium',
        source: 'coingecko'
      };
    }
  } catch (e) {
    console.error('Price fetch error:', e);
  }
  
  // Fallback data
  return {
    prices: {
      btc: { price: 97500, mcap: 1920000000000, change: 2.4 },
      eth: { price: 3250, mcap: 390000000000, change: 1.8 },
      sol: { price: 195, mcap: 85000000000, change: 3.2 }
    },
    tier: 'premium-fallback',
    note: 'Using cached data'
  };
}

export default async function handler(req, res) {
  // Set CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Payment, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Check for payment header
  const paymentHeader = req.headers['x-payment'];
  const paymentVerified = await verifyPayment(paymentHeader);
  
  // For demo, allow free access if no payment
  // In production, require payment:
  // if (!paymentVerified && !process.env.X402_ALLOW_FREE) {
  //   return res.status(402).json({
  //     error: 'Payment Required',
  //     payment: PAYMENT_REQUIREMENT
  //   });
  // }
  
  try {
    const prices = await fetchPremiumPrices();
    
    return res.json({
      success: true,
      data: prices,
      timestamp: Date.now(),
      paymentStatus: paymentVerified ? 'verified' : 'free-tier'
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Failed to fetch prices',
      message: error.message
    });
  }
}

// x402 payment requirement export for discovery
export const x402Payment = PAYMENT_REQUIREMENT;