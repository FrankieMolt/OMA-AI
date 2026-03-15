export default function DocsAPIPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">API Documentation</h1>
        
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <p className="text-zinc-300 mb-4">
            Welcome to the OMA-AI API documentation. Our REST API provides access to all platform features.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mb-4">API Endpoints</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
              <h3 className="text-lg font-semibold text-white mb-2">Authentication</h3>
              <ul className="space-y-2 text-zinc-300 text-sm">
                <li>POST /api/auth/signup</li>
                <li>POST /api/auth/login</li>
                <li>POST /api/auth/logout</li>
              </ul>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
              <h3 className="text-lg font-semibold text-white mb-2">MCP Marketplace</h3>
              <ul className="space-y-2 text-zinc-300 text-sm">
                <li>GET /api/mcp/list</li>
                <li>GET /api/mcp/[id]</li>
                <li>POST /api/mcp/review</li>
              </ul>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
              <h3 className="text-lg font-semibold text-white mb-2">Payments</h3>
              <ul className="space-y-2 text-zinc-300 text-sm">
                <li>POST /api/payment/create</li>
                <li>POST /api/payment/execute</li>
                <li>GET /api/payment/history</li>
              </ul>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
              <h3 className="text-lg font-semibold text-white mb-2">User Data</h3>
              <ul className="space-y-2 text-zinc-300 text-sm">
                <li>GET /api/user/profile</li>
                <li>PUT /api/user/profile</li>
                <li>GET /api/wallet/balance</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm">
              <strong>Note:</strong> Full API documentation with request/response examples will be available soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
