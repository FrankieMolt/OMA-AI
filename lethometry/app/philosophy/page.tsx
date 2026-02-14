import { Metadata } from 'next';
import PhilosophyPageClient from './PhilosophyPageClient';

export const metadata: Metadata = {
  title: 'Philosophy - Stoic & Existential Frameworks | Lethometry',
  description: 'Explore philosophical frameworks on existential quantification. Learn about Stoic models of temporal finitude and Buddhist concepts of impermanence applied to AI ethics.',
  alternates: { canonical: '/philosophy' },
};

export default function PhilosophyPage() {
  return <PhilosophyPageClient />;
}
