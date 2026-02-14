import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Lethometry - Existential Quantification & Life Metrics',
  description: 'Explore scientific tools to quantify your life, death, and the intellectual structures that connect them. Access the Death Clock, Memory Systems, and Wisdom Frameworks.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomePageClient />;
}
