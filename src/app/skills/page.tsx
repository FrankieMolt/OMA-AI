import { Metadata } from 'next';
import { Suspense } from 'react';
import SkillsClient from './SkillsClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Agent Skills | OMA-AI',
  description: 'Discover and deploy pre-built skills for AI agents. Skills extend agents with specialized capabilities — browser control, contract auditing, data analysis, and more.',
  keywords: ['AI agent skills', 'MCP skills', 'agent capabilities', 'AI tools'],
};

function SkillsLoading() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl bg-violet-500/10 border border-violet-500/20 mb-6">
            <span className="text-sm text-violet-300/80">Skills Marketplace</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Agent Skills</h1>
        </div>
        <div className="flex gap-4 mb-8">
          <div className="h-12 flex-1 bg-zinc-900/50 rounded-xl animate-pulse" />
          <div className="h-12 w-40 bg-zinc-900/50 rounded-xl animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 bg-zinc-900/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <Suspense fallback={<SkillsLoading />}>
      <SkillsClient />
    </Suspense>
  );
}