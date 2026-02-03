import { ListingDirectoryPage } from '@/components/marketplace/ListingDirectoryPage';
import strings from '@/constants/text.json';

export default function N8nPage() {
  return (
    <ListingDirectoryPage
      title={strings.nav.n8n}
      description={strings.nav.n8n_desc}
      categories={[
        { id: 'n8n', label: 'All Automations', description: 'Browse all n8n workflows.' },
        { id: 'webhook', label: 'Webhooks', description: 'Webhook-triggered automations.' },
        { id: 'schedule', label: 'Scheduled', description: 'Time-based automations.' },
        { id: 'integration', label: 'Integrations', description: 'Cross-service integrations.' },
      ]}
      defaultCategory="n8n"
    />
  );
}
