import type { NextApiRequest, NextApiResponse } from 'next';

const APIS = {
  coingecko: 'https://api.coingecko.com/api/v3',
  coincap: 'https://api.coincap.io/v2'
};

let cache = { data: null, time: 0 };

async function fetchPrices() {
  const now = Date.now();
  if (cache.data && (now - cache.time) < 30000) {
    return cache.data;
  }
  
  try {
    const cgRes = await fetch(
      `${APIS.coingecko}/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true`
    );
    
    if (cgRes.ok) {
      const data = await cgRes.json();
      cache = {
        data: {
          btc: { price: data.bitcoin?.usd, change_24h: data.bitcoin?.usd_24h_change },
          eth: { price: data.ethereum?.usd, change_24h: data.ethereum?.usd_24h_change },
          sol: { price: data.solana?.usd, change_24h: data.solana?.usd_24h_change },
          source: 'coingecko'
        },
        time: now
      };
      return cache.data;
    }
  } catch (e) {}
  
  return { error: 'Unable to fetch prices' };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const prices = await fetchPrices();
  res.json({ data: prices, timestamp: Date.now() });
}