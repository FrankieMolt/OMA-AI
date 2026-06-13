import Link from 'next/link';

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="text-6xl mb-6">🚧</div>
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-zinc-400 mb-8">
          Coming soon. The MCP marketplace is live — check it out.
        </p>
        <Link
          href="/mcps"
          className="inline-flex px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-500 transition-colors"
        >
          Browse MCPs →
        </Link>
      </div>
    </div>
  );
}
