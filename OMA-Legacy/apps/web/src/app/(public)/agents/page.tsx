import { ListingDirectoryPage } from '@/components/marketplace/ListingDirectoryPage';

export default function AgentsPage() {
  return (
    <ListingDirectoryPage
      title="Agents"
      description="Browse autonomous agents and specialized sub agents ready to deploy across your workflows."
      categories={[
        { id: 'agent', label: 'Agents', description: 'Full-stack autonomous agents.' },
        { id: 'subagent', label: 'Sub Agents', description: 'Focused modules that extend agents.' },
      ]}
      defaultCategory="agent"
    />
  );
}
