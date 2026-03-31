import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Integrations | OMA-AI',
  description: 'Connect OMA-AI MCPs to your favorite platforms and agents.',
};

// Redirect to MCP marketplace — integrations are listed there
export default function IntegrationsPage() {
  redirect('/mcps');
}
