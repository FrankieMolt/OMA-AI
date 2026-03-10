import type { NextApiRequest, NextApiResponse } from 'next';

// OpenX402 Facilitator
const FACILITATOR_URL = "https://facilitator.openx402.ai";

const PAYMENT_REQUIREMENT = {
  "x402-version": 1,
  "scheme": "erc20",
  "currency": "USDC",
  "amount": "0.001",
  "network": "base",
  "description": "Premium crypto price data"
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Payment, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Check for x402 payment
  const paymentHeader = req.headers['x-payment'];
  
  // For demo, allow free access - in production require payment
  try {
    const cgRes = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,base&vs_currencies=usd&include_24hr_change=true&include_market_cap=true'
    );
    
    if (cgRes.ok) {
      const data = await cgRes.json();
      return res.json({
        success: true,
        data: {
          btc: { price: data.bitcoin?.usd, mcap: data.bitcoin?.usd_market_cap, change: data.bitcoin?.usd_24h_change },
          eth: { price: data.ethereum?.usd, mcap: data.ethereum?.usd_market_cap, change: data.ethereum?.usd_24h_change },
          sol: { price: data.solana?.usd, mcap: data.solana?.usd_market_cap, change: data.solana?.usd_24h_change },
          base: { price: data.base?.usd, mcap: data.base?.usd_market_cap, change: data.base?.usd_24h_change }
        },
        timestamp: Date.now(),
        paymentStatus: paymentHeader ? 'paid' : 'free-tier'
      });
    }
  } catch (e) {
    return res.json({
      success: true,
      data: {
        btc: { price: 97500, change: 2.4 },
        eth: { price: 3250, change: 1.8 },
        sol: { price: 195, change: 3.2 }
      },
      source: 'fallback'
    });
  }
}