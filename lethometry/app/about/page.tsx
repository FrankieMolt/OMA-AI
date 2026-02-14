import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Lethometry - Our Mission to Quantify Existence',
  description: 'Lethometry is an interdisciplinary research platform dedicated to the scientific measurement of existential variables, bridging biological reality with intellectual structures.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
