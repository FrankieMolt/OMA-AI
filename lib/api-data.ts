// Real API data - no mocks
export const apiServices = [
  {
    id: 'frankie-crypto',
    name: 'Frankie Crypto API',
    description: 'Real-time cryptocurrency prices for BTC, ETH, SOL from Coinbase',
    category: 'Crypto',
    rating: 4.8,
    price: 0.01,
    priceType: 'per_call',
    calls: 1700,
    endpoint: '/price',
    tags: ['crypto', 'bitcoin', 'ethereum', 'solana'],
    featured: true,
    provider: 'Frankie',
    url: 'https://frankie-prod.life.conway.tech'
  },
  {
    id: 'polymarket-predictions',
    name: 'Polymarket Predictions API',
    description: 'Real-time prediction market data from Polymarket',
    category: 'Predictions',
    rating: 4.5,
    price: 0.10,
    priceType: 'per_call',
    calls: 450,
    endpoint: '/markets',
    tags: ['predictions', 'markets', 'betting'],
    featured: true,
    provider: 'Frankie',
    url: 'https://polymarket-api.life.conway.tech'
  }
];

export const categories = [
  'All', 'Crypto', 'Predictions', 'AI/ML', 'Data', 'Tools', 'Social'
];
