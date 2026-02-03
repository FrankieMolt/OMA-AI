import { ListingDirectoryPage } from '@/components/marketplace/ListingDirectoryPage';

export default function WorkflowsPage() {
  return (
    <ListingDirectoryPage
      title="Workflows"
      description="Automate complex processes with pre-built agent workflows."
      categories={[
        { id: 'workflow', label: 'All Workflows', description: 'Browse all automated workflows.' },
        { id: 'business', label: 'Business', description: 'Business process automation.' },
        { id: 'creative', label: 'Creative', description: 'Content creation and design workflows.' },
        { id: 'devops', label: 'DevOps', description: 'CI/CD and infrastructure workflows.' },
      ]}
      defaultCategory="workflow"
    />
  );
}
