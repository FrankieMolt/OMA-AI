import { Metadata } from 'next';
import MCPSkillDetail from '@/components/mcp-marketplace/MCPSkillDetail';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/footer';

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
    <main className="min-h-screen bg-zinc-950">
      <Navigation />
      <MCPSkillDetail slug={slug} />
      <Footer />
    </main>
  );
}
