import { Metadata } from 'next';
import ShippingClient from './ShippingClient';

export const metadata: Metadata = {
  title: 'Shipping Information - OMA-AI',
  description: 'Reliable worldwide shipping for all your AI and tech purchases. Free shipping on qualified orders over $100. Real-time tracking for all shipments.',
  alternates: { canonical: '/shipping' },
};

export default function ShippingPage() {
  return <ShippingClient />;
}
