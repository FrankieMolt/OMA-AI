import { Metadata } from 'next';
import BioMetricsPageClient from './BioMetricsPageClient';

export const metadata: Metadata = {
  title: 'Bio-Metrics - Real-time Physiological Data Analysis | Lethometry',
  description: 'Real-time monitoring of physiological variables. Integrate your biological stream with the Lethometry network for predictive health analytics and existential insights.',
  alternates: { canonical: '/bio' },
};

export default function BioMetricsPage() {
  return <BioMetricsPageClient />;
}
