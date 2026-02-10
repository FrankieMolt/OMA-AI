import { realProducts as PRODUCTS } from './real-products';
export { PRODUCTS };

export const getProductById = (id: string) => 
  PRODUCTS.find((p) => p.id === id);

export const getProductBySlug = (slug: string) => 
  PRODUCTS.find((p) => p.slug === slug);

export const getProductsByCategory = (category: string) => 
  category === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

export const getRelatedProducts = (productId: string, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];
  return PRODUCTS
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, limit);
};

export const getTrendingProducts = (limit = 8) => 
  PRODUCTS.filter((p) => (p.rating || 0) >= 4.5).slice(0, limit);

export const getNewArrivals = (limit = 8) => 
  PRODUCTS.filter((p) => p.isNew).slice(0, limit);
