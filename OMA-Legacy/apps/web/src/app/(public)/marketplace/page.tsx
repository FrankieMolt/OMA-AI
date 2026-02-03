import { ListingDirectoryPage } from '@/components/marketplace/ListingDirectoryPage';
import strings from '@/constants/text.json';

export default function MarketplacePage() {
  const categories = [
    { id: 'all', label: strings.marketplace.page.categories.all.label, description: strings.marketplace.page.categories.all.desc },
    { id: 'agent', label: strings.marketplace.page.categories.agent.label, description: strings.marketplace.page.categories.agent.desc },
    { id: 'mcp', label: strings.marketplace.page.categories.mcp.label, description: strings.marketplace.page.categories.mcp.desc },
    { id: 'api', label: strings.marketplace.page.categories.api.label, description: strings.marketplace.page.categories.api.desc },
    { id: 'llm', label: strings.marketplace.page.categories.llm.label, description: strings.marketplace.page.categories.llm.desc },
    { id: 'crewai', label: strings.marketplace.page.categories.crewai.label, description: strings.marketplace.page.categories.crewai.desc },
    { id: 'langgraph', label: strings.marketplace.page.categories.langgraph.label, description: strings.marketplace.page.categories.langgraph.desc },
  ];

  return (
    <ListingDirectoryPage
      title={strings.marketplace.page.title}
      description={strings.marketplace.page.description}
      categories={categories}
      defaultCategory="all"
    />
  );
}
