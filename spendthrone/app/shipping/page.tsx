import { Metadata } from 'next';
import ShippingClient from './ShippingClient';

export const metadata: Metadata = {
  title: 'Shipping Information - SpendThrone',
  description: 'Fast worldwide shipping for premium products. Free shipping on orders over $100, express delivery options, and real-time tracking on all shipments.',
  alternates: { canonical: '/shipping' },
};

export default function ShippingPage() {
  return <ShippingClient />;
}
