/**
 * SpendThrone - TypeScript Type Definitions
 */

export type PriceType = 'unit_usd' | 'monthly_usd' | 'yearly_usd' | 'subscription_monthly_usd';

export type Category = 
  | 'Extreme Tech'
  | 'Luxury'
  | 'Pets'
  | 'Clothing'
  | 'Food'
  | 'Survival'
  | 'Art & Culture'
  | 'Gadgets'
  | 'Metaverse'
  | 'Real Estate'
  | 'Travel'
  | 'Medical'
  | 'Transportation';

export interface Product {
  id: string;
  title: string;
  category: Category;
  price: number;
  priceType: PriceType;
  image: string;
  description: string;
  verified: boolean;
  tags: string[];
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  popularity?: number; // 0-100 score
  addedAt?: string; // ISO date
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  priceType: PriceType;
  quantity: number;
  image?: string;
}

export interface WishlistItem {
  id: string;
  addedAt: string;
}

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'popularity' | 'newest' | 'name';

export interface SearchFilters {
  query: string;
  category: string;
  sortBy: SortOption;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface AppState {
  cart: CartItem[];
  wishlist: string[];
  compareList: string[];
  recentlyViewed: string[];
}
