import { Metadata } from 'next';
import MCPSkillDetail from '@/components/mcp-marketplace/MCPSkillDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `MCP Skill Detail | OMA-AI`,
    description: `View details for MCP skill: ${slug}`,
    keywords: ['MCP', 'Model Context Protocol', slug],
  };
}

export default async function MCPSkillPage({ params }: PageProps) {
  const { slug } = await params;
  
  return (
    <div className="min-h-screen bg-zinc-950">
      <MCPSkillDetail slug={slug} />
    </div>
  );
}
