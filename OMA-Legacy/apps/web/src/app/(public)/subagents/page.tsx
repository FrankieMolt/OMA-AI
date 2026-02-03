import { ListingDirectoryPage } from '@/components/marketplace/ListingDirectoryPage';

export default function SubAgentsPage() {
  return (
    <ListingDirectoryPage
      title="Sub Agents"
      description="Specialized sub-agents to extend the capabilities of your main agents."
      categories={[
        { id: 'subagent', label: 'All Sub Agents', description: 'Browse all sub-agents.' },
        { id: 'researcher', label: 'Researchers', description: 'Agents focused on information gathering.' },
        { id: 'coder', label: 'Coders', description: 'Specialized coding assistants.' },
        { id: 'writer', label: 'Writers', description: 'Content generation specialists.' },
      ]}
      defaultCategory="subagent"
    />
  );
}
