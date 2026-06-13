import { Metadata } from 'next';
import { Package, Terminal, Dock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MCP Package Registry - Install AI Agent Tools | OMA-AI',
  description: 'Install MCP servers as npm packages. npx @oma-ai/[slug] or docker run oma-ai/[slug]. Browse all installable MCP packages.',
};

const MCP_PACKAGES = [
  {
    name: 'github-mcp',
    displayName: 'GitHub',
    description: 'Search repos, issues, PRs, files. Full GitHub API access for AI agents.',
    npm: '@oma-ai/github-mcp',
    docker: 'docker run oma-ai/github-mcp',
    tools: ['search_repos', 'get_issues', 'get_pulls', 'get_file', 'get_commits', 'create_issue'],
    color: '#238636',
    category: 'Developer Tools',
  },
  {
    name: 'pumpfun-sniper',
    displayName: 'PumpFun Sniper',
    description: 'Score pump.fun tokens for snipe safety (0-100). Analyzes dev wallet, liquidity, holders.',
    npm: '@oma-ai/pumpfun-sniper',
    docker: 'docker run oma-ai/pumpfun-sniper',
    tools: ['score_token', 'check_rug_risk', 'check_liquidity', 'check_dev_wallet', 'check_holders'],
    color: '#FF69B4',
    category: 'Trading',
  },
  {
    name: 'meme-detector',
    displayName: 'RugCheck Scanner',
    description: 'Detect rug pulls in meme coins. Contract security, honeypot patterns, holder analysis.',
    npm: '@oma-ai/meme-detector',
    docker: 'docker run oma-ai/meme-detector',
    tools: ['scan_contract', 'get_rug_score', 'check_mint_auth', 'check_holders', 'check_taxes', 'check_liquidity_lock'],
    color: '#FF4500',
    category: 'Security',
  },
  {
    name: 'solana-swaps',
    displayName: 'Solana Swaps',
    description: 'Swap tokens via Jupiter aggregator. Best prices from 50+ DEXes, MEV-protected.',
    npm: '@oma-ai/solana-swaps',
    docker: 'docker run oma-ai/solana-swaps',
    tools: ['get_quote', 'execute_swap', 'get_balance', 'get_tokens', 'get_price', 'get_volume'],
    color: '#9945FF',
    category: 'Trading',
  },
];

function InstallCommand({ command, type, color }: { command: string; type: 'npm' | 'docker' | 'npx'; color: string }) {
  const icons = {
    npm: <Package className="w-4 h-4" style={{ color }} />,
    docker: <Dock className="w-4 h-4" style={{ color }} />,
    npx: <Terminal className="w-4 h-4" style={{ color }} />,
  };

  return (
    <div className="flex items-center gap-2 bg-zinc-950 px-3 py-2 rounded-lg">
      {icons[type]}
      <code className="text-xs font-mono text-green-400 flex-1 overflow-x-auto">{command}</code>
    </div>
  );
}

export default function MCPRegistryPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Package className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">MCP Package Registry</h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl">
            Install OMA-AI MCP servers as npm packages or Docker containers.
            Run locally, deploy to your own infrastructure, or connect to any MCP-compatible AI agent.
          </p>
        </div>

        {/* Install Methods */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-green-400" />
              <h3 className="text-base font-semibold text-white">npm</h3>
            </div>
            <code className="text-xs text-green-400 font-mono">npm install @oma-ai/[package]</code>
            <p className="text-xs text-gray-500 mt-2">Install globally or as a project dependency</p>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Dock className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-semibold text-white">Docker</h3>
            </div>
            <code className="text-xs text-cyan-400 font-mono">docker run oma-ai/[package]</code>
            <p className="text-xs text-gray-500 mt-2">Run in an isolated container with one command</p>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-5 h-5 text-violet-400" />
              <h3 className="text-base font-semibold text-white">npx</h3>
            </div>
            <code className="text-xs text-violet-400 font-mono">npx @oma-ai/[package]</code>
            <p className="text-xs text-gray-500 mt-2">Run without installing, zero setup</p>
          </div>
        </div>

        {/* Package List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Available Packages</h2>
          {MCP_PACKAGES.map((pkg) => (
            <div key={pkg.name} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
              {/* Package Header */}
              <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: pkg.color + '30', border: `1px solid ${pkg.color}50` }}
                  >
                    {pkg.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{pkg.displayName}</h3>
                <p className="text-gray-400 mt-1">{pkg.description}</p>

                {/* Install Commands */}
                <div className="space-y-2 mt-4">
                  <InstallCommand command={`npm install ${pkg.npm}`} type="npm" color={pkg.color} />
                  <InstallCommand command={`npx ${pkg.npm}`} type="npx" color="#8B5CF6" />
                  <InstallCommand command={pkg.docker} type="docker" color="#06B6D4" />
                </div>
              </div>

              {/* Tools */}
              <div className="p-6 bg-zinc-950/50">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Tools ({pkg.tools.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {pkg.tools.map((tool) => (
                    <span key={tool} className="px-2.5 py-1 bg-zinc-800 text-violet-400 text-xs font-mono rounded-md">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">More Packages Coming Soon</h3>
          <p className="text-gray-400 mb-4">
            ethereum-mcp, helius-solana, searxng-search, and more are being converted to installable packages.
          </p>
          <a
            href="/mcps"
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Browse MCP Marketplace →
          </a>
        </div>
      </div>
    </div>
  );
}