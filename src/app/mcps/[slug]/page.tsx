import { Metadata } from 'next';
import MCPSkillDetail from '@/components/mcp-marketplace/MCPSkillDetail';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/footer';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Note: In production, you'd fetch the skill data here
  // For now, using generic metadata
  return {
    title: `MCP Skill Detail | OMA-AI`,
    description: `View details for MCP skill: ${params.slug}`,
    keywords: ['MCP', 'Model Context Protocol', params.slug],
  };
}

export default function MCPSkillDetailPage({ params }: PageProps) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-zinc-950 pt-16">
        <MCPSkillDetail slug={params.slug} />
      </main>
      <Footer />
    </>
  );
}
