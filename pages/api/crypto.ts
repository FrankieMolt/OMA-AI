import type { NextApiRequest, NextApiResponse } from 'next';

// Primary: CoinGecko (free, reliable)
const COINGECKO_API = 'https://api.coingecko.com/api/v3';
// Fallback: CoinCap
const COINCAP_API = 'https://api.coincap.io/v2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  const { assets = 'bitcoin,ethereum,solana,cardano,polkadot,chainlink,uniswap,avalanche-2,sui,aptos' } = req.query;

  try {
    const response = await fetch(`${COINCAP_API}/assets?ids=${assets}`);
    
    if (!response.ok) {
      throw new Error(`CoinCap error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform to our format
    const prices: Record<string, any> = {};
    data.data.forEach((asset: any) => {
      prices[asset.id] = {
        price: parseFloat(asset.priceUsd),
        mcap: parseFloat(asset.marketCapUsd),
        volume: parseFloat(asset.volumeUsd24Hr),
        change_24h: parseFloat(asset.changePercent24Hr),
        rank: parseInt(asset.rank),
        symbol: asset.symbol.toUpperCase()
      };
    });

    res.json({
      success: true,
      data: prices,
      source: 'coincap',
      timestamp: Date.now()
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}