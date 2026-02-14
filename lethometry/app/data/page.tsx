import { Metadata } from 'next';
import DataClient from './DataClient';

export const metadata: Metadata = {
  title: 'Research Data Repository - Open Access Datasets | Lethometry',
  description: 'All Lethometry research data is anonymized and freely available. Download datasets from our AI behavioral analysis and cognitive experiments.',
  alternates: { canonical: '/data' },
};

export default function DataPage() {
  return <DataClient />;
}
