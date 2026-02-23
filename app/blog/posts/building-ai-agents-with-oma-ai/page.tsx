export const metadata = {
  title: 'Building AI Agents with OMA-AI | Complete Guide',
  description: 'Learn how to build autonomous AI agents using OMA-AI infrastructure.',
  keywords: 'AI agents, autonomous AI, OMA-AI, agent development',
}

export default function BuildingAIAgentsPost() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Building AI Agents with OMA-AI
        </h1>
        <p className="text-zinc-400">February 23, 2026 • 8 min read</p>
      </header>
      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-zinc-300 mb-6">
          OMA-AI provides infrastructure to build, deploy, and monetize AI agents.
        </p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Features</h2>
        <ul className="list-disc list-inside text-zinc-300 space-y-2">
          <li>x402 payment infrastructure</li>
          <li>API hosting and management</li>
          <li>Agent deployment tools</li>
          <li>Real-time analytics</li>
        </ul>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Quick Start</h2>
        <pre className="bg-zinc-900 p-4 rounded-lg">
          npm install -g @oma-ai/cli
          oma-ai deploy ./my-agent
        </pre>
      </div>
    </article>
  )
}
