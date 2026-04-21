import { Metadata } from 'next';
import SkillsClient from './SkillsClient';

export const metadata: Metadata = {
  title: 'Agent Skills | OMA-AI',
  description: 'Discover and deploy pre-built skills for AI agents. Skills extend agents with specialized capabilities — browser control, contract auditing, data analysis, and more.',
  keywords: ['AI agent skills', 'MCP skills', 'agent capabilities', 'AI tools'],
};

export default function SkillsPage() {
  return <SkillsClient />;
}
