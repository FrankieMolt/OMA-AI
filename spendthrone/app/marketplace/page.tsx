import { Metadata } from 'next';
import MarketplaceClient from './MarketplaceClient';

export const metadata: Metadata = {
  title: 'Marketplace - SpendThrone Premium Products',
  description: 'Browse our curated collection of premium products. Tech gadgets, home goods, and luxury items for the modern connoisseur.',
  alternates: { canonical: '/marketplace' },
};

export default function MarketplacePage() {
  return <MarketplaceClient />;
}
