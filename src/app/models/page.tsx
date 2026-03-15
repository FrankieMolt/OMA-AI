export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">AI Models</h1>
        
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <p className="text-zinc-300 mb-4">
            Explore the AI models available on the OMA-AI platform. Our marketplace supports multiple model providers.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mb-4">Available Models</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
              <h3 className="text-lg font-semibold text-white mb-2">OpenRouter</h3>
              <p className="text-zinc-300 text-sm mb-2">Primary provider</p>
              <ul className="space-y-1 text-zinc-400 text-xs">
                <li>• Kimi K2.5 (195k context)</li>
                <li>• MiniMax M2.5 (192k context)</li>
              </ul>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
              <h3 className="text-lg font-semibold text-white mb-2">Anthropic</h3>
              <p className="text-zinc-300 text-sm mb-2">Claude models</p>
              <ul className="space-y-1 text-zinc-400 text-xs">
                <li>• Claude 3.5 Sonnet</li>
                <li>• Claude 3 Opus</li>
              </ul>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
              <h3 className="text-lg font-semibold text-white mb-2">OpenAI</h3>
              <p className="text-zinc-300 text-sm mb-2">GPT models</p>
              <ul className="space-y-1 text-zinc-400 text-xs">
                <li>• GPT-4 Turbo</li>
                <li>• GPT-4 Vision</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm">
              <strong>Coming Soon:</strong> Model pricing, benchmarks, and usage analytics will be available in the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
