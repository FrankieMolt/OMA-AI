import type { NextApiRequest, NextApiResponse } from 'next';

// Free public APIs (no auth needed) - aggregate for marketplace
const PUBLIC_APIS = {
  // Crypto
  price: { name: 'Crypto Prices', url: '/api/price', price: 0, free: true },
  
  // Data
  joke: { name: 'Joke API', url: 'https://v2.jokeapi.dev', price: 0, free: true },
  fact: { name: 'uselessfacts.jsph.pl', url: 'https://uselessfacts.jsph.pl', price: 0, free: true },
  numbers: { name: 'Numbers API', url: 'http://numbersapi.com', price: 0, free: true },
  
  // Weather (needs key but has free tier)
  weather: { name: 'Weather', url: '/api/weather', price: 0.002, free: false },
  
  // Search
  search: { name: 'Web Search', url: '/api/search', price: 0.005, free: false },
  
  // AI
  llm: { name: 'AI Text Generation', url: '/api/llm', price: 0.01, free: false },
  embeddings: { name: 'Text Embeddings', url: '/api/embeddings', price: 0.01, free: false },
  
  // Utilities
  uuid: { name: 'UUID Generator', url: 'https://www.uuidgenerator.net', price: 0, free: true },
  ip: { name: 'IP Geolocation', url: 'http://ip-api.com/json', price: 0, free: true },
  qrcode: { name: 'QR Code', url: 'https://api.qrserver.com', price: 0, free: true },
  
  // Images
  dog: { name: 'Dog CEO', url: 'https://dog.ceo/api', price: 0, free: true },
  cat: { name: 'TheCatAPI', url: 'https://api.thecatapi.com/v1', price: 0, free: true },
  unsplash: { name: 'Unsplash', url: 'https://api.unsplash.com', price: 0, free: true },
  
  // Finance
  stocks: { name: 'Alpha Vantage', url: 'https://www.alphavantage.co', price: 0, free: true },
  
  // Government/Public
  space: { name: 'NASA APOD', url: 'https://api.nasa.gov', price: 0, free: true },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=300');

  const { category, free } = req.query;

  let apis = Object.entries(PUBLIC_APIS).map(([id, api]) => ({
    id,
    ...api
  }));

  // Filter by category if provided
  const categories = {
    crypto: ['price'],
    data: ['joke', 'fact', 'numbers'],
    ai: ['llm', 'embeddings'],
    utilities: ['uuid', 'ip', 'qrcode'],
    images: ['dog', 'cat', 'unsplash'],
    finance: ['stocks'],
    space: ['space']
  };

  if (category && categories[category as string]) {
    apis = apis.filter(a => categories[category as string].includes(a.id));
  }

  // Filter by free if provided
  if (free === 'true') {
    apis = apis.filter(a => a.free);
  }

  res.json({
    success: true,
    count: apis.length,
    apis,
    categories: Object.keys(categories),
    source: 'OMA-AI curated list'
  });
}