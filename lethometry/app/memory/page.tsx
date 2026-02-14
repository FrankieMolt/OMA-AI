import { Metadata } from 'next';
import MemoryToolsClient from './MemoryToolsClient';

export const metadata: Metadata = {
  title: 'Memory Systems - Long-term Knowledge Retention | Lethometry',
  description: 'Advanced tools for long-term knowledge retention and semantic mapping. Externalize your cognitive architecture to prevent intellectual decay.',
  alternates: { canonical: '/memory' },
};

export default function MemoryToolsPage() {
  return <MemoryToolsClient />;
}
