import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About SpendThrone - Curated Luxury Products',
  description: 'Discover the philosophy behind SpendThrone. We curate extraordinary, physics-defying, and satirical luxury products for the discerning connoisseur.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutClient />;
}
