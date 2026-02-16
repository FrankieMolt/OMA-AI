/**
 * Product Detail Page - Static Export
 */

import { PRODUCTS } from '@/data/products';

// Generate static params for all products
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

// Static export - no dynamic params
export const dynamicParams = false;

// Import the client component
import ProductDetailClient from './ProductDetailClient';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return <ProductDetailClient slug={params.slug} />;
}
