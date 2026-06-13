'use client';

import { useState } from 'react';


const codeStyle = {
  background: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d3f 100%)',
  padding: '16px',
  borderRadius: '8px',
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  fontSize: '13px',
  lineHeight: '1.6',
  overflow: 'auto' as const,
};

export default function DocsAPIPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'auth', label: 'Authentication' },
    { id: 'mcp', label: 'MCP Marketplace' },
    { id: 'payments', label: 'Payments (x402)' },
    { id: 'compute', label: 'Compute' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'user', label: 'User' },
    { id: 'utilities', label: 'Utilities' },
    { id: 'errors', label: 'Error Codes' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Base URL</h3>
              <pre style={codeStyle} className="text-cyan-400">https://oma-ai.com/api</pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Authentication</h3>
              <p className="text-zinc-400 mb-4">
                Most endpoints require authentication via Bearer token. Include the token in the Authorization header:
              </p>
              <pre style={codeStyle} className="text-yellow-400">
{`Authorization: Bearer YOUR_TOKEN_HERE`}
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Rate Limiting</h3>
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-400 border-b border-zinc-700">
                      <th className="text-left py-2">Tier</th>
                      <th className="text-left py-2">Requests/min</th>
                      <th className="text-left py-2">Daily Limit</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    <tr className="border-b border-zinc-700">
                      <td className="py-2">Free</td>
                      <td className="py-2">60</td>
                      <td className="py-2">1,000</td>
                    </tr>
                    <tr className="border-b border-zinc-700">
                      <td className="py-2">Pro</td>
                      <td className="py-2">300</td>
                      <td className="py-2">50,000</td>
                    </tr>
                    <tr>
                      <td className="py-2">Enterprise</td>
                      <td className="py-2">Unlimited</td>
                      <td className="py-2">Unlimited</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Response Format</h3>
              <pre style={codeStyle} className="text-green-400">
{`// Success Response
{
  "success": true,
  "data": { ... },
  "pagination": { ... }
}

// Error Response
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}`}
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">x402 Payments</h3>
              <p className="text-zinc-400 mb-4">
                OMA-AI uses x402 (EIP-3009) for payment authorization. Some MCP endpoints require payment before access.
              </p>
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <ol className="list-decimal list-zinc-400 text-zinc-300 space-y-2">
                  <li>Call <code className="text-cyan-400">/api/x402/sign</code> with amount and MCP ID</li>
                  <li>Receive signed EIP-712 authorization</li>
                  <li>Include in request header: <code className="text-yellow-400">X-Payment-Authorization</code></li>
                  <li>MCP executes call and receives payment via transfer</li>
                </ol>
              </div>
            </div>
          </div>
        );

      case 'auth':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">POST</span>
                <span className="text-white font-mono">/api/auth</span>
              </div>
              <p className="text-zinc-400 mb-4">Register a new user account or login with existing credentials.</p>
              
              <h4 className="text-white font-semibold mb-2">Request Body</h4>
              <pre style={codeStyle} className="text-zinc-300 mb-4">
{`{
  "action": "signup" | "login",
  "email": "user@example.com",
  "password": "securepassword",
  // For signup only:
  "name": "John Doe"
}`}
              </pre>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John"
  },
  "session": {
    "access_token": "...",
    "refresh_token": "..."
  }
}`}
              </pre>
            </div>
          </div>
        );

      case 'mcp':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                <span className="text-white font-mono">/api/mcp/list</span>
              </div>
              <p className="text-zinc-400 mb-4">List all available MCP servers with optional filtering.</p>
              
              <h4 className="text-white font-semibold mb-2">Query Parameters</h4>
              <div className="bg-zinc-900 rounded p-3 mb-4 text-sm">
                <div className="text-zinc-400 mb-1"><span className="text-cyan-400">page</span> - Page number (default: 1)</div>
                <div className="text-zinc-400 mb-1"><span className="text-cyan-400">limit</span> - Items per page (default: 20)</div>
                <div className="text-zinc-400 mb-1"><span className="text-cyan-400">category</span> - Filter by category (e.g., &quot;AI/ML&quot;, &quot;Finance&quot;)</div>
                <div className="text-zinc-400 mb-1"><span className="text-cyan-400">search</span> - Search by name or description</div>
                <div className="text-zinc-400 mb-1"><span className="text-cyan-400">sort</span> - Sort by: rating, calls, price, newest</div>
                <div className="text-zinc-400"><span className="text-cyan-400">verified</span> - true/false filter</div>
              </div>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Anthropic Claude MCP",
      "slug": "anthropic-claude-mcp",
      "category": &quot;AI/ML&quot;,
      "pricing_usdc": 0.015,
      "x402_enabled": true,
      "verified": true,
      "rating": 4.9,
      "total_calls": 45230
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}`}
              </pre>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                <span className="text-white font-mono">/api/mcp/skill/[slug]</span>
              </div>
              <p className="text-zinc-400 mb-4">Get detailed information about a specific MCP server.</p>
              
              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "data": {
    "id": "1",
    "name": "Anthropic Claude MCP",
    "slug": "anthropic-claude-mcp",
    "description": "Access Claude 4 models...",
    "long_description": "Full description...",
    "mcp_endpoint": "https://api.oma-ai.com/mcp/claude",
    "transport": "sse",
    "pricing_usdc": 0.015,
    "x402_enabled": true,
    "tools": [...],
    "reviews": [...]
  }
}`}
              </pre>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">POST</span>
                <span className="text-white font-mono">/api/mcp/register</span>
              </div>
              <p className="text-zinc-400 mb-4">Register a new MCP server in the marketplace.</p>
              
              <h4 className="text-white font-semibold mb-2">Request Body</h4>
              <pre style={codeStyle} className="text-zinc-300 mb-4">
{`{
  "name": "My MCP Server",
  "slug": "my-mcp-server",
  "category": &quot;AI/ML&quot;,
  "description": "Short description",
  "long_description": "Full description...",
  "author": "Your Name",
  "author_email": "you@example.com",
  "mcp_endpoint": "https://...",
  "transport": "sse" | "stdio" | "websocket",
  "pricing_usdc": 0.01,
  "x402_enabled": true,
  "tags": ["ai", "ml"],
  "tools": [
    { "name": "chat", "description": "Chat endpoint" }
  ]
}`}
              </pre>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "my-mcp-server",
    "status": "pending"
  }
}`}
              </pre>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">POST</span>
                <span className="text-white font-mono">/api/mcp/review</span>
              </div>
              <p className="text-zinc-400 mb-4">Submit a review for an MCP server.</p>
              
              <h4 className="text-white font-semibold mb-2">Request Body</h4>
              <pre style={codeStyle} className="text-zinc-300 mb-4">
{`{
  "mcp_id": "uuid-of-mcp",
  "rating": 5,
  "title": "Great MCP!",
  "content": "This MCP is amazing..."
}`}
              </pre>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "data": {
    "id": "review-uuid",
    "created_at": "2026-03-23T00:00:00Z"
  }
}`}
              </pre>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">POST</span>
                <span className="text-white font-mono">/api/x402/sign</span>
              </div>
              <p className="text-zinc-400 mb-4">Sign x402 payment authorization for MCP access.</p>
              
              <h4 className="text-white font-semibold mb-2">Request Body</h4>
              <pre style={codeStyle} className="text-zinc-300 mb-4">
{`{
  "amount": "10000",
  "mcp_id": "uuid-of-mcp-server",
  "network": "base",
  "token": "USDC"
}`}
              </pre>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "signature": "0x...",
  "address": "0x...",
  "nonce": "0x...",
  "authorization": {
    "from": "0x...",
    "to": "0x...",
    "value": "10000",
    "validAfter": "1234567890",
    "validBefore": "1234568190",
    "nonce": "0x..."
  },
  "x402Payload": {
    "x402Version": 2,
    "accepted": {
      "scheme": "exact",
      "network": "eip155:8453",
      "amount": "10000",
      "asset": "0x833589f..."
    }
  }
}`}
              </pre>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">POST</span>
                <span className="text-white font-mono">/api/payment/create</span>
              </div>
              <p className="text-zinc-400 mb-4">Create a new payment transaction.</p>
              
              <h4 className="text-white font-semibold mb-2">Request Body</h4>
              <pre style={codeStyle} className="text-zinc-300 mb-4">
{`{
  "amount": 100,
  "currency": "USDC",
  "mcp_id": "uuid",
  "network": "base"
}`}
              </pre>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "payment": {
    "id": "payment-uuid",
    "status": "pending",
    "amount": 100,
    "created_at": "2026-03-23T00:00:00Z"
  }
}`}
              </pre>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                <span className="text-white font-mono">/api/payment/history</span>
              </div>
              <p className="text-zinc-400 mb-4">Retrieve payment history for the authenticated user.</p>
              
              <h4 className="text-white font-semibold mb-2">Query Parameters</h4>
              <div className="bg-zinc-900 rounded p-3 mb-4 text-sm text-zinc-400">
                <div className="mb-1"><span className="text-cyan-400">page</span> - Page number</div>
                <div><span className="text-cyan-400">limit</span> - Items per page</div>
              </div>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "data": [
    {
      "id": "payment-uuid",
      "amount": 100,
      "status": "completed",
      "mcp_name": "Claude MCP",
      "created_at": "2026-03-23T00:00:00Z"
    }
  ],
  "pagination": { "page": 1, "total": 50 }
}`}
              </pre>
            </div>
          </div>
        );

      case 'compute':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">POST</span>
                <span className="text-white font-mono">/api/compute</span>
              </div>
              <p className="text-zinc-400 mb-4">Launch a compute instance on Akash Network.</p>
              
              <h4 className="text-white font-semibold mb-2">Request Body</h4>
              <pre style={codeStyle} className="text-zinc-300 mb-4">
{`{
  "instance_type": "akash-gpu-a100",
  "duration_hours": 24,
  "container_image": "nginx:latest"
}`}
              </pre>

              <h4 className="text-white font-semibold mb-2">Available Instance Types</h4>
              <div className="bg-zinc-900 rounded p-3 mb-4 text-sm">
                <div className="text-zinc-400 mb-1"><span className="text-cyan-400">akash-cpu-small</span> - 2 CPU, 4GB RAM - $4.50/hr</div>
                <div className="text-zinc-400 mb-1"><span className="text-cyan-400">akash-cpu-medium</span> - 4 CPU, 8GB RAM - $9.00/hr</div>
                <div className="text-zinc-400 mb-1"><span className="text-cyan-400">akash-gpu-a4000</span> - 4 CPU, 16GB RAM, 1 GPU - $45.00/hr</div>
                <div className="text-zinc-400 mb-1"><span className="text-cyan-400">akash-gpu-a100</span> - 8 CPU, 32GB RAM, 1 GPU - $95.00/hr</div>
                <div className="text-zinc-400"><span className="text-cyan-400">akash-hpc</span> - 16 CPU, 64GB RAM, 4 GPUs - $180.00/hr</div>
              </div>

              <h4 className="text-white font-semibold mb-2">GET Available Compute</h4>
              <pre style={codeStyle} className="text-green-400">
{`GET /api/compute?action=list

{
  "success": true,
  "providers": {
    "akash-cpu-small": { "cpu": 2, "ram": 4, "price": 4.50 },
    ...
  },
  "savings": {
    "akash-gpu-a100": "45%"
  }
}`}
              </pre>
            </div>
          </div>
        );

      case 'marketplace':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                <span className="text-white font-mono">/api/marketplace/stats</span>
              </div>
              <p className="text-zinc-400 mb-4">Get marketplace statistics and volume data.</p>
              
              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "data": {
    "marketplace": {
      "verifiedMcpCount": 3,
      "totalAgents": 12
    },
    "volume": {
      "total": 1250.75,
      "last24h": { "usdc": 45.25, "change": 2.25 }
    },
    "transactions": {
      "last24h": { "count": 142, "change": 2.27 }
    },
    "network": {
      "name": "Base",
      "chainId": 8453,
      "token": "USDC"
    }
  }
}`}
              </pre>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                <span className="text-white font-mono">/api/marketplace</span>
              </div>
              <p className="text-zinc-400 mb-4">Get marketplace data including trending MCPs and categories.</p>
              
              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "marketplace": {
    "total_mcp_servers": 19,
    "total_downloads": 50000,
    "avg_rating": 4.7,
    "categories": [&quot;AI/ML&quot;, &quot;Finance&quot;, "Data"]
  },
  "trending": [
    { "name": "Claude MCP", "slug": "claude-mcp", "downloads": 15000 }
  ],
  "recent": [...]
}`}
              </pre>
            </div>
          </div>
        );

      case 'user':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                <span className="text-white font-mono">/api/credits/balance</span>
              </div>
              <p className="text-zinc-400 mb-4">Get user credits balance and wallet information.</p>
              
              <h4 className="text-white font-semibold mb-2">Query Parameters</h4>
              <div className="bg-zinc-900 rounded p-3 mb-4 text-sm text-zinc-400">
                <div><span className="text-cyan-400">userId</span> - User ID (required)</div>
              </div>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "user": { "id": "uuid", "email": "user@example.com" },
  "balance": {
    "credits": 1000,
    "wallets": [
      { "chain": "base", "address": "0x...", "balance": 50 }
    ],
    "totalUsdc": 1050
  }
}`}
              </pre>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                <span className="text-white font-mono">/api/portfolio</span>
              </div>
              <p className="text-zinc-400 mb-4">Get user portfolio with transaction history.</p>
              
              <h4 className="text-white font-semibold mb-2">Query Parameters</h4>
              <div className="bg-zinc-900 rounded p-3 mb-4 text-sm text-zinc-400">
                <div><span className="text-cyan-400">wallet</span> - Wallet address (required)</div>
              </div>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "data": {
    "wallet": {
      "walletAddress": "0x...",
      "balanceUsdc": 100,
      "totalEarned": 50,
      "totalSpent": 25,
      "netProfit": 25
    },
    "transactions": []
  }
}`}
              </pre>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">POST</span>
                <span className="text-white font-mono">/api/contact</span>
              </div>
              <p className="text-zinc-400 mb-4">Submit a contact form message.</p>
              
              <h4 className="text-white font-semibold mb-2">Request Body</h4>
              <pre style={codeStyle} className="text-zinc-300 mb-4">
{`{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Support Request",
  "message": "I need help with...",
  "category": "support" | "bug-report" | "feature-request" | "mcp-inquiry" | "business-inquiry"
}`}
              </pre>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "message": "Message sent successfully!",
  "id": "message-uuid"
}`}
              </pre>
            </div>
          </div>
        );

      case 'utilities':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                <span className="text-white font-mono">/api/health</span>
              </div>
              <p className="text-zinc-400 mb-4">Health check endpoint returning platform status.</p>
              
              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "platform": "OMA-AI",
  "version": "1.0.0",
  "stats": {
    "total_apis": 16,
    "free_apis": 10,
    "paid_apis": 6
  },
  "network": {
    "payment": "x402",
    "currency": "USDC",
    "chains": ["base", "solana"]
  }
}`}
              </pre>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                <span className="text-white font-mono">/api/search</span>
              </div>
              <p className="text-zinc-400 mb-4">Web search using SearXNG.</p>
              
              <h4 className="text-white font-semibold mb-2">Query Parameters</h4>
              <div className="bg-zinc-900 rounded p-3 mb-4 text-sm text-zinc-400">
                <div className="mb-1"><span className="text-cyan-400">q</span> - Search query (required)</div>
                <div><span className="text-cyan-400">limit</span> - Max results (default: 10)</div>
              </div>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "data": {
    "query": "search term",
    "results": [
      { "title": "Result Title", "url": "https://...", "snippet": "..." }
    ],
    "total": 10
  }
}`}
              </pre>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                <span className="text-white font-mono">/api/prices</span>
              </div>
              <p className="text-zinc-400 mb-4">Get token prices for Solana ecosystem.</p>
              
              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "prices": {
    "sol": { "price": 87.36, "change_24h": 2.5 },
    "bonk": { "price": 0.00000589, "change_24h": -1.2 },
    "jup": { "price": 1.67, "change_24h": 3.1 }
  }
}`}
              </pre>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                <span className="text-white font-mono">/api/crypto</span>
              </div>
              <p className="text-zinc-400 mb-4">Get cryptocurrency prices from CoinGecko.</p>
              
              <h4 className="text-white font-semibold mb-2">Query Parameters</h4>
              <div className="bg-zinc-900 rounded p-3 mb-4 text-sm text-zinc-400">
                <div><span className="text-cyan-400">coins</span> - Comma-separated coin symbols (default: bitcoin,ethereum,solana)</div>
              </div>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "coins": ["bitcoin", "ethereum", "solana"],
  "prices": {
    "bitcoin": { "usd": 67000, "change_24h": 2.1 },
    "ethereum": { "usd": 3500, "change_24h": 1.5 }
  }
}`}
              </pre>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-mono">GET</span>
                <span className="text-white font-mono">/api/weather</span>
              </div>
              <p className="text-zinc-400 mb-4">Get weather data for a city.</p>
              
              <h4 className="text-white font-semibold mb-2">Query Parameters</h4>
              <div className="bg-zinc-900 rounded p-3 mb-4 text-sm text-zinc-400">
                <div><span className="text-cyan-400">city</span> - City name (default: London)</div>
              </div>

              <h4 className="text-white font-semibold mb-2">Response</h4>
              <pre style={codeStyle} className="text-green-400">
{`{
  "success": true,
  "city": "London",
  "temp_c": 15,
  "temp_f": 59,
  "humidity": 72,
  "condition": "Partly cloudy",
  "wind_kph": 12,
  "feels_like_c": 13,
  "uv_index": 3
}`}
              </pre>
            </div>
          </div>
        );

      case 'errors':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h3 className="text-xl font-semibold text-white mb-4">HTTP Status Codes</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono w-16">200</span>
                  <div>
                    <span className="text-white font-semibold">OK</span>
                    <p className="text-zinc-400 text-sm">Request succeeded</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm font-mono w-16">400</span>
                  <div>
                    <span className="text-white font-semibold">Bad Request</span>
                    <p className="text-zinc-400 text-sm">Invalid parameters or missing fields</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-sm font-mono w-16">401</span>
                  <div>
                    <span className="text-white font-semibold">Unauthorized</span>
                    <p className="text-zinc-400 text-sm">Missing or invalid authentication</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm font-mono w-16">403</span>
                  <div>
                    <span className="text-white font-semibold">Forbidden</span>
                    <p className="text-zinc-400 text-sm">Insufficient permissions or x402 payment required</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm font-mono w-16">404</span>
                  <div>
                    <span className="text-white font-semibold">Not Found</span>
                    <p className="text-zinc-400 text-sm">Resource does not exist</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm font-mono w-16">409</span>
                  <div>
                    <span className="text-white font-semibold">Conflict</span>
                    <p className="text-zinc-400 text-sm">Resource already exists</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm font-mono w-16">429</span>
                  <div>
                    <span className="text-white font-semibold">Too Many Requests</span>
                    <p className="text-zinc-400 text-sm">Rate limit exceeded</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm font-mono w-16">500</span>
                  <div>
                    <span className="text-white font-semibold">Internal Server Error</span>
                    <p className="text-zinc-400 text-sm">Server encountered an error</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm font-mono w-16">503</span>
                  <div>
                    <span className="text-white font-semibold">Service Unavailable</span>
                    <p className="text-zinc-400 text-sm">Service temporarily unavailable</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h3 className="text-xl font-semibold text-white mb-4">Error Codes</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <code className="text-cyan-400 text-sm">INVALID_JSON</code>
                  <p className="text-zinc-400 text-sm">Request body is not valid JSON</p>
                </div>
                <div className="flex items-start gap-4">
                  <code className="text-cyan-400 text-sm">MISSING_FIELDS</code>
                  <p className="text-zinc-400 text-sm">Required fields are missing</p>
                </div>
                <div className="flex items-start gap-4">
                  <code className="text-cyan-400 text-sm">MCP_NOT_FOUND</code>
                  <p className="text-zinc-400 text-sm">MCP server does not exist</p>
                </div>
                <div className="flex items-start gap-4">
                  <code className="text-cyan-400 text-sm">PAYMENT_DISABLED</code>
                  <p className="text-zinc-400 text-sm">MCP does not accept x402 payments</p>
                </div>
                <div className="flex items-start gap-4">
                  <code className="text-cyan-400 text-sm">SIGNER_MISSING</code>
                  <p className="text-zinc-400 text-sm">x402 signer not configured</p>
                </div>
                <div className="flex items-start gap-4">
                  <code className="text-cyan-400 text-sm">INSUFFICIENT_BALANCE</code>
                  <p className="text-zinc-400 text-sm">Not enough credits/USDC for request</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-2">API Documentation</h1>
        <p className="text-zinc-400 mb-8">Complete reference for OMA-AI REST API</p>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 sticky top-8">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        activeSection === section.id
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex-1">
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}