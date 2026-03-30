'use client';

interface Step2Props {
  mcpEndpoint: string;
  setMcpEndpoint: (v: string) => void;
  transport: string;
  setTransport: (v: string) => void;
  repositoryUrl: string;
  setRepositoryUrl: (v: string) => void;
  documentationUrl: string;
  setDocumentationUrl: (v: string) => void;
}

export function Step2({
  mcpEndpoint, setMcpEndpoint, transport, setTransport,
  repositoryUrl, setRepositoryUrl, documentationUrl, setDocumentationUrl,
}: Step2Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">MCP Configuration</h2>
        <p className="text-gray-400">Set up your MCP endpoint and connections</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">MCP Endpoint *</label>
          <input aria-label="https://your-domain.com/mcp/sse" type="url" placeholder="https://your-domain.com/mcp/sse"
            value={mcpEndpoint} onChange={(e) => setMcpEndpoint(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono" />
          <p className="mt-1 text-sm text-gray-400">The URL where your MCP server is running</p>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Transport Protocol *</label>
          <select aria-label="Select transport" value={transport} onChange={(e) => setTransport(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-violet-500">
            <option value="sse">SSE (Server-Sent Events)</option>
            <option value="stdio">Stdio (Local Development)</option>
            <option value="websocket">WebSocket (Real-time)</option>
          </select>
          <p className="mt-1 text-sm text-gray-400">Most MCPs use SSE for production</p>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Repository URL</label>
          <input aria-label="https://github.com/your-username/mcp" type="url" placeholder="https://github.com/your-username/mcp"
            value={repositoryUrl} onChange={(e) => setRepositoryUrl(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono" />
          <p className="mt-1 text-sm text-gray-400">GitHub or GitLab repository link</p>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Documentation URL</label>
          <input aria-label="https://your-docs.com" type="url" placeholder="https://your-docs.com"
            value={documentationUrl} onChange={(e) => setDocumentationUrl(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono" />
          <p className="mt-1 text-sm text-gray-400">Documentation or README link</p>
        </div>
      </div>
    </div>
  );
}
