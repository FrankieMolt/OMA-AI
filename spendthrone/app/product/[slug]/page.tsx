/**
 * Product Detail Page - Dynamic Rendering
 */

import { PRODUCTS } from '@/data/products';

// Generate static params for all products
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

// Force dynamic rendering to avoid context issues during build
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Import the client component
import ProductDetailClient from './ProductDetailClient';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return <ProductDetailClient slug={params.slug} />;
}
