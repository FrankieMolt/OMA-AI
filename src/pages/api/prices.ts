import type { NextApiRequest, NextApiResponse } from 'next';

// Real crypto data from CoinGecko (free, no API key needed for basic use)
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

interface CoinMarket {
  id: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
  symbol: string;
}

interface PriceData {
  [coinId: string]: {
    price: number;
    mcap: number;
    volume: number;
    change_24h: number;
    rank: number;
    symbol: string;
  };
}

// In-memory cache
let priceCache: { data: PriceData | null; timestamp: number } = { data: null, timestamp: 0 };
const CACHE_TTL = 30000; // 30 seconds

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Payment, Authorization');
  res.setHeader('Cache-Control', 'public, max-age=30');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { coins = 'bitcoin,ethereum,solana,base,cardano,polkadot,chainlink,uniswap,render-token,avalanche-2' } = req.query;
    
    // Check cache
    const now = Date.now();
    if (priceCache.data && (now - priceCache.timestamp) < CACHE_TTL) {
      return res.json({
        success: true,
        data: priceCache.data,
        cached: true,
        timestamp: priceCache.timestamp
      });
    }

    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${coins}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
    );

    if (!response.ok) {
      throw new Error(`CoinGecko error: ${response.status}`);
    }

    const markets: CoinMarket[] = await response.json();

    // Transform to simpler format
    const data: PriceData = {};
    markets.forEach((coin) => {
      data[coin.id] = {
        price: coin.current_price,
        mcap: coin.market_cap,
        volume: coin.total_volume,
        change_24h: coin.price_change_percentage_24h,
        rank: coin.market_cap_rank,
        symbol: coin.symbol.toUpperCase()
      };
    });

    priceCache = { data, timestamp: now };

    return res.json({
      success: true,
      data,
      source: 'coingecko',
      timestamp: now
    });

  } catch (error: unknown) {
    console.error('Price API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Return cached data if available, even if stale
    if (priceCache.data) {
      return res.json({
        success: true,
        data: priceCache.data,
        cached: true,
        stale: true,
        timestamp: priceCache.timestamp,
        error: errorMessage
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to fetch prices',
      message: errorMessage
    });
  }
}