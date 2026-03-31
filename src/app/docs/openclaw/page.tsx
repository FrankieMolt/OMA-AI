export default function PageComingSoon() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>
        <p className="text-zinc-400 mb-8">This page is coming soon. For now, explore the <a href="/mcps" className="text-violet-400 hover:text-violet-300">MCP Marketplace</a>.</p>
        <a href="/mcps" className="inline-flex px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-500">
          Browse MCPs →
        </a>
      </div>
    </div>
  );
}
