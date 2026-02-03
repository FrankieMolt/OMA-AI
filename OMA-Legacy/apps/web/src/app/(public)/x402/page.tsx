import { Metadata } from 'next';
import { ListingDirectoryPage } from '@/components/marketplace/ListingDirectoryPage';
import strings from '@/constants/text.json';

export const metadata: Metadata = {
  title: strings.nav.x402,
  description: strings.nav.x402_desc,
};

export default function X402LibraryPage() {
  const categories = [
    { id: 'all', label: 'All x402 Tools', description: 'Every pay-per-use resource on the grid.' },
    { id: 'search', label: 'Search', description: 'Real-time web search and data retrieval.' },
    { id: 'code', label: 'Code', description: 'Sandboxed execution and analysis.' },
    { id: 'ai', label: 'AI Services', description: 'LLM inference and generation endpoints.' },
    { id: 'data', label: 'Data Extraction', description: 'Structured extraction and processing.' },
  ];

  return (
    <ListingDirectoryPage
      title={strings.nav.x402}
      description={strings.nav.x402_desc}
      categories={categories}
      defaultCategory="all"
      extraParams={{ pricingType: 'usage' }}
    />
  );
}
