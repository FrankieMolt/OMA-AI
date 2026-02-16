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
  | 'Inventory';

export interface Product {
  id: string;
  name: string;
  title?: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  priceType?: PriceType;
  category: Category | string;
  image: string;
  tags: string[];
  inStock: boolean;
  features: string[];
  rating: number;
  reviewCount: number;
  brand: string;
  isNew?: boolean;
  isOnSale?: boolean;
  verified?: boolean;
  affiliateLink?: string;
  popularity?: number;
  addedAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
}

export type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'popularity' | 'name' | 'relevance';
export type ViewMode = 'grid' | 'list';

export interface Toast {
  duration?: number;
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
