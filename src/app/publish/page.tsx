import { Metadata } from 'next';
import PublishClient from './PublishClient';

export const metadata: Metadata = {
  title: 'Publish MCP Server | OMA-AI',
  description: 'Publish your MCP server to the OMA-AI marketplace. Set pricing, configure tools, and start earning USDC from AI agent usage.',
  keywords: ['publish', 'MCP server', 'submit', 'monetize', 'marketplace listing'],
};

export default function PublishPage() {
  return <PublishClient />;
}
