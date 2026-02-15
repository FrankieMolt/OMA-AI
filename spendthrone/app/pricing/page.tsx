import { Metadata } from 'next';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Pricing - SpendThrone Premium Membership',
  description: 'Transparent pricing for premium products. Free shipping on orders over $100, member discounts, and exclusive early access to new arrivals.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return <PricingClient />;
}
