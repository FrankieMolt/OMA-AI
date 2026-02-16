import React from 'react';
import CategoryPageClient from './CategoryPageClient';

// Generate static params for all categories (must be in server component)
export function generateStaticParams() {
  const categories = [
    'art-design',
    'gaming', 
    'health-wellness',
    'home-living',
    'kitchen-gadgets',
    'office-setup',
    'outdoor',
    'tech-gadgets',
    'weird-awesome'
  ];
  return categories.map((id) => ({ id }));
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CategoryPageClient categoryId={id} />;
}
