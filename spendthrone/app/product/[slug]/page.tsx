/**
 * Product Detail Page - Static Export Compatible
 */

import { PRODUCTS } from '@/data/products';

// Generate static params for all products at build time
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

// Revalidate settings (not used in static export but good for future)
export const dynamic = 'error';
export const dynamicParams = false;

// Import the client component
import ProductDetailClient from './ProductDetailClient';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return <ProductDetailClient slug={params.slug} />;
}
