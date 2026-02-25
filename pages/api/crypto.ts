import type { NextApiRequest, NextApiResponse } from 'next';

// Primary: CoinGecko (free, reliable)
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  const assetIds = req.query.assets as string || 'bitcoin,ethereum,solana,cardano,polkadot,chainlink,uniswap,avalanche-2,sui,aptos';
  const ids = assetIds.replace(/-/g, '');

  try {
    // Use CoinGecko simple price endpoint
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform to our format
    const prices: Record<string, any> = {};
    Object.entries(data).forEach(([id, values]: [string, any]) => {
      prices[id] = {
        price: values.usd,
        mcap: values.usd_market_cap || 0,
        volume: values.usd_24h_vol || 0,
        change_24h: values.usd_24h_change,
        symbol: id.toUpperCase()
      };
    });

    res.json({
      success: true,
      data: prices,
      source: 'coingecko',
      timestamp: Date.now()
    });
  } catch (error: any) {
    // Fallback to mock data if API fails
    res.json({
      success: true,
      data: {
        bitcoin: { price: 67000, mcap: 1300000000000, volume: 25000000000, change_24h: 2.5, symbol: 'BTC' },
        ethereum: { price: 3500, mcap: 420000000000, volume: 12000000000, change_24h: 3.2, symbol: 'ETH' },
        solana: { price: 180, mcap: 80000000000, volume: 3000000000, change_24h: 5.1, symbol: 'SOL' }
      },
      source: 'fallback',
      timestamp: Date.now(),
      note: 'Using fallback data due to API error'
    });
  }
}