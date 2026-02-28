import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * OMA-AI Free API Catalog
 * 
 * Aggregates free APIs from multiple sources:
 * - Crypto prices (CoinGecko)
 * - Weather (Open-Meteo)
 * - Web search (DuckDuckGo)
 * - Exchange rates (exchangerate-api)
 * - IP Geolocation (ip-api)
 */

// Rate limiting (simple in-memory, use Redis in production)
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxRequests: number = 10): boolean {
  const now = Date.now();
  const key = `${ip}:${Math.floor(now / 60000)}`;
  const entry = rateLimits.get(key);
  
  if (!entry || entry.resetAt < now) {
    rateLimits.set(key, { count: 1, resetAt: now + 60000 });
    return true;
  }
  
  if (entry.count >= maxRequests) {
    return false;
  }
  
  entry.count++;
  return true;
}

// Fetch with timeout
async function fetchWithTimeout(url: string, timeout: number = 5000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Crypto prices from CoinGecko
async function getCryptoPrices() {
  const response = await fetchWithTimeout(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,base,venice-token&vs_currencies=usd&include_24hr_change=true'
  );
  return response.json();
}

// Weather from Open-Meteo
async function getWeather(lat: number, lon: number) {
  const response = await fetchWithTimeout(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,precipitation_probability`
  );
  return response.json();
}

// Exchange rates
async function getExchangeRates() {
  const response = await fetchWithTimeout(
    'https://api.exchangerate-api.com/v4/latest/USD'
  );
  return response.json();
}

// IP Geolocation
async function getIPInfo(ip: string) {
  const response = await fetchWithTimeout(
    `http://ip-api.com/json/${ip}`
  );
  return response.json();
}

// DuckDuckGo Instant Answer
async function searchDDG(query: string) {
  const response = await fetchWithTimeout(
    `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`
  );
  return response.json();
}

// Random joke
async function getJoke() {
  const response = await fetchWithTimeout(
    'https://official-joke-api.appspot.com/random_joke'
  );
  return response.json();
}

// Random quote
async function getQuote() {
  const response = await fetchWithTimeout(
    'https://api.quotable.io/random'
  );
  return response.json();
}

// NASA Astronomy Picture of the Day
async function getAPOD() {
  const response = await fetchWithTimeout(
    `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`
  );
  return response.json();
}

// Available free APIs
const FREE_APIS = {
  crypto: {
    name: 'Crypto Prices',
    description: 'Real-time cryptocurrency prices from CoinGecko',
    rateLimit: '10/min',
    free: true,
  },
  weather: {
    name: 'Weather',
    description: 'Weather data from Open-Meteo',
    rateLimit: '10/min',
    free: true,
    params: ['lat', 'lon'],
  },
  exchange: {
    name: 'Exchange Rates',
    description: 'Currency exchange rates',
    rateLimit: '10/min',
    free: true,
  },
  ip: {
    name: 'IP Geolocation',
    description: 'Geolocation data for IP addresses',
    rateLimit: '10/min',
    free: true,
    params: ['ip'],
  },
  search: {
    name: 'Web Search',
    description: 'DuckDuckGo instant answers',
    rateLimit: '10/min',
    free: true,
    params: ['q'],
  },
  joke: {
    name: 'Random Joke',
    description: 'Get a random joke',
    rateLimit: '10/min',
    free: true,
  },
  quote: {
    name: 'Random Quote',
    description: 'Get an inspirational quote',
    rateLimit: '10/min',
    free: true,
  },
  apod: {
    name: 'NASA APOD',
    description: 'Astronomy Picture of the Day',
    rateLimit: '10/min',
    free: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');
  
  // Get client IP for rate limiting
  const clientIP = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
                   req.socket.remoteAddress || 
                   'unknown';
  
  // Rate limit check
  if (!checkRateLimit(clientIP, 20)) {
    return res.status(429).json({ 
      error: 'Rate limit exceeded',
      retryAfter: 60,
    });
  }
  
  const { action, lat, lon, ip, q } = req.query;
  
  // GET - List available APIs
  if (req.method === 'GET' && !action) {
    return res.json({
      success: true,
      total: Object.keys(FREE_APIS).length,
      apis: FREE_APIS,
      usage: 'GET /api/free?action=<api_name>',
      examples: {
        crypto: '/api/free?action=crypto',
        weather: '/api/free?action=weather&lat=40.7&lon=-74',
        exchange: '/api/free?action=exchange',
        ip: '/api/free?action=ip&ip=8.8.8.8',
        search: '/api/free?action=search&q=hello',
        joke: '/api/free?action=joke',
        quote: '/api/free?action=quote',
        apod: '/api/free?action=apod',
      },
    });
  }
  
  try {
    let data;
    
    switch (action) {
      case 'crypto':
        data = await getCryptoPrices();
        break;
        
      case 'weather':
        if (!lat || !lon) {
          return res.status(400).json({ 
            error: 'Missing lat/lon parameters',
            example: '/api/free?action=weather&lat=40.7&lon=-74',
          });
        }
        data = await getWeather(Number(lat), Number(lon));
        break;
        
      case 'exchange':
        data = await getExchangeRates();
        break;
        
      case 'ip':
        data = await getIPInfo((ip as string) || clientIP);
        break;
        
      case 'search':
        if (!q) {
          return res.status(400).json({ 
            error: 'Missing q parameter',
            example: '/api/free?action=search&q=hello',
          });
        }
        data = await searchDDG(q as string);
        break;
        
      case 'joke':
        data = await getJoke();
        break;
        
      case 'quote':
        data = await getQuote();
        break;
        
      case 'apod':
        data = await getAPOD();
        break;
        
      default:
        return res.status(400).json({ 
          error: 'Unknown action',
          available: Object.keys(FREE_APIS),
        });
    }
    
    return res.json({
      success: true,
      action,
      data,
      cached: true,
      timestamp: Date.now(),
    });
    
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
      action,
    });
  }
}
