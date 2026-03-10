import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publish',
  description: 'Monetize your AI skills and MCP servers on the OMA-AI marketplace.',
};

export default function PublishPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Monetize Your Skills</h1>
        <p className="text-xl text-zinc-400 mb-12">
          Deploy your custom MCP servers or agentic skills to our network and earn USDC per request via the x402 protocol.
        </p>
        <div className="p-12 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-8">
            Our self-serve publishing portal is currently in private beta. If you are a developer with an existing MCP server, apply for early access below.
          </p>
          <a href="/contact" className="inline-block px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors">
            Apply for Early Access
          </a>
        </div>
      </div>
    </main>
  );
}
