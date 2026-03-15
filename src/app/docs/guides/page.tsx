export default function DocsGuidesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Documentation Guides</h1>
        
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <p className="text-zinc-300 mb-4">
            Welcome to the OMA-AI documentation guides. This section contains comprehensive guides for using our platform.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mb-4">Available Guides</h2>
          
          <ul className="space-y-3 text-zinc-300">
            <li>📚 Getting Started Guide</li>
            <li>🔑 Authentication Guide</li>
            <li>💰 Payment Integration Guide</li>
            <li>🤖 MCP Registration Guide</li>
            <li>🔒 Security Best Practices</li>
          </ul>
          
          <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm">
              <strong>Note:</strong> Comprehensive guides are being developed. Check back soon for detailed documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
