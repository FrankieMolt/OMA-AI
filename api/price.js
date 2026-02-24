/**
 * OMA-AI Price API
 * Aggregates free crypto price APIs
 */

const APIS = {
  coingecko: 'https://api.coingecko.com/api/v3',
  coincap: 'https://api.coincap.io/v2'
};

// Cache for 30 seconds
let cache = { data: null, time: 0 };

async function fetchPrices() {
  const now = Date.now();
  if (cache.data && (now - cache.time) < 30000) {
    return cache.data;
  }
  
  try {
    // Try CoinGecko first
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
  
  try {
    // Fallback to CoinCap
    const [btc, eth, sol] = await Promise.all([
      fetch(`${APIS.coincap}/assets/bitcoin`).then(r => r.json()),
      fetch(`${APIS.coincap}/assets/ethereum`).then(r => r.json()),
      fetch(`${APIS.coincap}/assets/solana`).then(r => r.json())
    ]);
    
    cache = {
      data: {
        btc: { price: parseFloat(btc.data?.priceUsd), change_24h: parseFloat(btc.data?.changePercent24Hr) },
        eth: { price: parseFloat(eth.data?.priceUsd), change_24h: parseFloat(eth.data?.changePercent24Hr) },
        sol: { price: parseFloat(sol.data?.priceUsd), change_24h: parseFloat(sol.data?.changePercent24Hr) },
        source: 'coincap'
      },
      time: now
    };
    return cache.data;
  } catch (e) {
    return { error: 'Unable to fetch prices' };
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const prices = await fetchPrices();
  res.json({ data: prices, timestamp: Date.now() });
}
