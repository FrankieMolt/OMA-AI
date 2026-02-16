/**
 * Product Detail Page - Static Export
 */

import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/data/products';

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

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const relatedProducts = product ? getRelatedProducts(product.id, 4) : [];
  
  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-zinc-400 mb-8">The extraordinary item you're looking for doesn't exist in this timeline.</p>
        <a href="/" className="text-amber-400 hover:text-amber-300">Back to Marketplace</a>
      </div>
    );
  }
  
  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
