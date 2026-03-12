import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OpenRouter Integration - OMA-AI',
  description: 'Access 50+ AI models through one unified API. Coming soon to OpenMarketAccess.',
};

export default function OpenRouterPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
          <span className="text-sm font-medium text-violet-300">Coming Soon</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent mb-6">
          OpenRouter Integration
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Access 50+ AI models through one unified API. Automatic cost optimization, model variety, and zero configuration.
        </p>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Models Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-violet-500/10 rounded-lg">
              <h3 className="font-semibold text-violet-300 mb-2">Premium</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• GPT-5.2</li>
                <li>• Claude 4 Opus</li>
                <li>• Gemini 2.5 Pro</li>
              </ul>
            </div>
            <div className="p-4 bg-fuchsia-500/10 rounded-lg">
              <h3 className="font-semibold text-fuchsia-300 mb-2">Standard</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• DeepSeek V3</li>
                <li>• Llama 4</li>
                <li>• Mixtral 8x22B</li>
              </ul>
            </div>
            <div className="p-4 bg-amber-500/10 rounded-lg">
              <h3 className="font-semibold text-amber-300 mb-2">Budget</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Kimi K2.5</li>
                <li>• Gemma 2</li>
                <li>• GLM-4.7</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-sm text-gray-300">
              <span className="text-green-400 font-semibold">Status:</span> Coming Soon - Active Development
            </p>
            <p className="text-sm text-gray-300 mt-2">
              <span className="text-violet-300 font-semibold">Alternative:</span> Check our{' '}
              <a href="/mcps" className="text-violet-400 hover:underline">
                MCP Marketplace
              </a>{' '}
              for currently available AI skills.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
