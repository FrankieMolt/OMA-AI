import { ListingDirectoryPage } from '@/components/marketplace/ListingDirectoryPage';
import strings from '@/constants/text.json';

export default function McpPage() {
  return (
    <ListingDirectoryPage
      title={strings.nav.mcp_servers}
      description={strings.nav.mcp_servers_desc}
      categories={[
        { id: 'mcp', label: 'All Servers', description: 'Browse all MCP servers.' },
        { id: 'database', label: 'Database', description: 'Connectors for SQL and NoSQL databases.' },
        { id: 'filesystem', label: 'Filesystem', description: 'Tools for file operations.' },
        { id: 'api-integration', label: 'API Integration', description: 'Wrappers for third-party APIs.' },
      ]}
      defaultCategory="mcp"
    />
  );
}
