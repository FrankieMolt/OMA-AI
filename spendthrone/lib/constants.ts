/**
 * SpendThrone - Application Constants
 */

export const CATEGORIES = [
  'all',
  'Extreme Tech',
  'Luxury',
  'Pets',
  'Clothing',
  'Food',
  'Survival',
  'Art & Culture',
  'Gadgets',
  'Metaverse',
  'Real Estate',
  'Travel',
  'Medical',
  'Transportation',
] as const;

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Most Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'name', label: 'Name A-Z' },
] as const;

export const STORAGE_KEYS = {
  CART: 'spendthrone_cart',
  WISHLIST: 'spendthrone_wishlist',
  COMPARE: 'spendthrone_compare',
  RECENTLY_VIEWED: 'spendthrone_recently_viewed',
  SEARCH_HISTORY: 'spendthrone_search_history',
} as const;

export const APP_CONFIG = {
  MAX_RECENTLY_VIEWED: 10,
  MAX_COMPARE_ITEMS: 4,
  MAX_SEARCH_HISTORY: 5,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
} as const;

export const SITE_METADATA = {
  name: 'SpendThrone',
  tagline: 'The Kingdom of Weird Stuff',
  description: 'Discover the weirdest, most viral products on Earth. Extreme tech, luxury items, and WTF technology for the modern age.',
  url: 'https://spendthrone.com',
  twitter: '@spendthrone',
  email: 'hello@spendthrone.com',
} as const;
