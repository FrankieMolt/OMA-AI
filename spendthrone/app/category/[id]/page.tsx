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

export default function CategoryPage({ params }: { params: { id: string } }) {
  return <CategoryPageClient categoryId={params.id} />;
}
