import type { NextApiRequest, NextApiResponse } from 'next';

// Comprehensive list of free public APIs for AI agents
const PUBLIC_APIS = {
  // Crypto & Finance
  crypto_price: { name: 'Crypto Prices', category: 'finance', url: '/api/price', price: 0, free: true, description: 'BTC, ETH, SOL prices from CoinGecko' },
  crypto_all: { name: 'All Crypto Prices', category: 'finance', url: '/api/prices', price: 0, free: true, description: 'Top 10 cryptocurrencies' },
  
  // Data & Trivia
  joke: { name: 'Joke API', category: 'data', url: 'https://v2.jokeapi.dev', price: 0, free: true, description: 'Random jokes and puns' },
  fact: { name: 'Useless Facts', category: 'data', url: 'https://uselessfacts.jsph.pl', price: 0, free: true, description: 'Random useless facts' },
  numbers: { name: 'Numbers API', category: 'data', url: 'http://numbersapi.com', price: 0, free: true, description: 'Facts about numbers' },
  dictionary: { name: 'Dictionary API', category: 'data', url: 'https://api.dictionaryapi.dev', price: 0, free: true, description: 'Word definitions' },
  lyrics: { name: 'Lyrics API', category: 'data', url: 'https://api.lyrics.ovh', price: 0, free: true, description: 'Song lyrics lookup' },
  
  // Weather & Environment
  weather: { name: 'Weather Forecast', category: 'weather', url: '/api/weather', price: 0.002, free: false, description: '7-day weather forecasts' },
  airquality: { name: 'Air Quality', category: 'weather', url: 'https://api.airvisual.com', price: 0, free: true, description: 'Air quality index' },
  
  // Search & Web
  search: { name: 'Web Search', category: 'search', url: '/api/search', price: 0.005, free: false, description: 'Brave-powered search' },
  duckduckgo: { name: 'DuckDuckGo Instant', category: 'search', url: 'https://api.duckduckgo.com', price: 0, free: true, description: 'Instant answers' },
  
  // AI & ML
  llm: { name: 'AI Text Generation', category: 'ai', url: '/api/llm', price: 0.01, free: false, description: 'GPT-4, Claude, Gemini' },
  embeddings: { name: 'Text Embeddings', category: 'ai', url: '/api/embeddings', price: 0.01, free: false, description: 'Vector embeddings' },
  imagegen: { name: 'AI Image Generation', category: 'ai', url: 'https://image.pollinations.ai', price: 0, free: true, description: 'Generate images with AI' },
  
  // Utilities
  uuid: { name: 'UUID Generator', category: 'utilities', url: 'https://www.uuidgenerator.net', price: 0, free: true, description: 'Generate UUIDs' },
  ip: { name: 'IP Geolocation', category: 'utilities', url: 'http://ip-api.com/json', price: 0, free: true, description: 'IP to location' },
  qrcode: { name: 'QR Code Generator', category: 'utilities', url: 'https://api.qrserver.com', price: 0, free: true, description: 'Generate QR codes' },
  url_shortener: { name: 'URL Shortener', category: 'utilities', url: 'https://is.gd', price: 0, free: true, description: 'Shorten URLs' },
  email_verify: { name: 'Email Verifier', category: 'utilities', url: 'https://emailvalidation.abstractapi.com', price: 0, free: true, description: 'Validate emails' },
  timestamp: { name: 'Unix Timestamp', category: 'utilities', url: 'https://worldtimeapi.org', price: 0, free: true, description: 'Current timestamp' },
  
  // Images
  dog: { name: 'Dog Images', category: 'images', url: 'https://dog.ceo/api', price: 0, free: true, description: 'Random dog photos' },
  cat: { name: 'Cat Images', category: 'images', url: 'https://api.thecatapi.com/v1', price: 0, free: true, description: 'Random cat photos' },
  unsplash: { name: 'Unsplash Photos', category: 'images', url: 'https://api.unsplash.com', price: 0, free: true, description: 'Stock photos' },
  meme: { name: 'Meme Generator', category: 'images', url: 'https://api.imgflip.com', price: 0, free: true, description: 'Popular memes' },
  wallpaper: { name: 'Wallpaper API', category: 'images', url: 'https://wallhaven.cc/api', price: 0, free: true, description: 'HD wallpapers' },
  
  // Government & Public
  space: { name: 'NASA APOD', category: 'space', url: 'https://api.nasa.gov', price: 0, free: true, description: 'Astronomy picture of the day' },
  covid: { name: 'COVID Data', category: 'health', url: 'https://disease.sh', price: 0, free: true, description: 'COVID-19 statistics' },
  holidays: { name: 'Holiday API', category: 'data', url: 'https://date.nager.at/api', price: 0, free: true, description: 'Public holidays' },
  
  // Sports
  football: { name: 'Football Data', category: 'sports', url: 'https://api.football-data.org', price: 0, free: true, description: 'Football leagues & matches' },
  nba: { name: 'NBA Scores', category: 'sports', url: 'https://www.balldontlie.io', price: 0, free: true, description: 'NBA statistics' },
  
  // Food & Drink
  food: { name: 'Food API', category: 'food', url: 'https://www.themealdb.com/api', price: 0, free: true, description: 'Meal recipes' },
  coffee: { name: 'Coffee API', category: 'food', url: 'https://api.sampleapis.com/coffee', price: 0, free: true, description: 'Coffee recipes' },
  beer: { name: 'Beer API', category: 'food', url: 'https://api.sampleapis.com/beers', price: 0, free: true, description: 'Beer catalog' },
  
  // Movies & Entertainment
  movie: { name: 'Movie Database', category: 'entertainment', url: 'https://www.omdbapi.com', price: 0, free: true, description: 'Movie info & ratings' },
  tv: { name: 'TV Show API', category: 'entertainment', url: 'https://api.tvmaze.com', price: 0, free: true, description: 'TV show data' },
  music: { name: 'Music API', category: 'entertainment', url: 'https://itunes.apple.com', price: 0, free: true, description: 'iTunes music search' },
  
  // GitHub & Dev
  github: { name: 'GitHub API', category: 'dev', url: 'https://api.github.com', price: 0, free: true, description: 'GitHub repositories' },
  npm: { name: 'NPM Registry', category: 'dev', url: 'https://registry.npmjs.org', price: 0, free: true, description: 'NPM packages' },
  stackoverflow: { name: 'Stack Overflow', category: 'dev', url: 'https://api.stackexchange.com', price: 0, free: true, description: 'Q&A data' },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=300');

  const { category, free, search } = req.query;

  let apis = Object.entries(PUBLIC_APIS).map(([id, api]) => ({
    id,
    ...api
  }));

  // Filter by category
  if (category && category !== 'all') {
    apis = apis.filter(a => a.category === category);
  }

  // Filter by free
  if (free === 'true') {
    apis = apis.filter(a => a.free);
  }

  // Search
  if (search) {
    const q = (search as string).toLowerCase();
    apis = apis.filter(a => 
      a.name.toLowerCase().includes(q) || 
      a.description.toLowerCase().includes(q)
    );
  }

  const categories = [...new Set(Object.values(PUBLIC_APIS).map(a => a.category))];

  res.json({
    success: true,
    count: apis.length,
    total: Object.keys(PUBLIC_APIS).length,
    apis,
    categories: categories.sort(),
    platform: 'OMA-AI'
  });
}