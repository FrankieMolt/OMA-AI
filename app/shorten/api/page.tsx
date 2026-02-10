import { Metadata } from 'next';
import { 
  Link2, Code, Globe, Zap, Shield, BarChart3, 
  ArrowRight, Copy, CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'API Documentation | Shorty URL Shortener',
  description: 'Integrate Shorty URL shortener into your applications with our REST API.',
};

const endpoints = [
  {
    method: 'POST',
    path: '/api/shorten',
    description: 'Create a new shortened URL',
    request: `{
  "url": "https://example.com/very-long-url",
  "custom_code": "my-link" // optional
}`,
    response: `{
  "success": true,
  "data": {
    "short_code": "abc123",
    "short_url": "https://oma-ai.com/abc123",
    "original_url": "https://example.com/...",
    "created_at": "2024-01-15T10:30:00Z"
  }
}`
  },
  {
    method: 'GET',
    path: '/api/links',
    description: 'List all links for authenticated user',
    auth: true,
    response: `{
  "success": true,
  "data": {
    "links": [...],
    "pagination": {
      "total": 100,
      "limit": 50,
      "offset": 0,
      "has_more": true
    }
  }
}`
  },
  {
    method: 'GET',
    path: '/api/stats/{shortCode}',
    description: 'Get analytics for a specific link',
    auth: true,
    response: `{
  "success": true,
  "data": {
    "link": {...},
    "stats": {
      "total_clicks": 1234,
      "unique_visitors": 987,
      "clicks_by_day": [...],
      "clicks_by_country": [...],
      "clicks_by_device": [...]
    }
  }
}`
  },
  {
    method: 'GET',
    path: '/api/qr/{shortCode}',
    description: 'Generate QR code for a short URL',
    query: '?format=svg&size=300&color=%23000000',
    response: 'Returns SVG or PNG image'
  }
];

const codeExamples = [
  {
    language: 'cURL',
    code: `curl -X POST https://oma-ai.com/api/shorten \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/my-page"
  }'`
  },
  {
    language: 'JavaScript',
    code: `const response = await fetch('https://oma-ai.com/api/shorten', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://example.com/my-page',
    custom_code: 'my-link' // optional
  })
});

const data = await response.json();
console.log(data.data.short_url);`}
  },
  {
    language: 'Python',
    code: `import requests

response = requests.post(
    'https://oma-ai.com/api/shorten',
    json={'url': 'https://example.com/my-page'}
)

data = response.json()
print(data['data']['short_url'])`
  }
];

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a href="/shorten" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Shorty</span>
              </a>
            </div>
            
            <nav className="flex items-center gap-6">
              <a href="/shorten" className="text-gray-300 hover:text-white transition-colors">
                Shorten
              </a>
              <a href="/shorten/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="/shorten/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6">
            <Code className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">REST API</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            API Documentation
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Integrate Shorty into your applications with our simple, powerful REST API.
            No authentication required for basic shortening.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Zap, title: 'Fast Response', desc: '<100ms average response time' },
            { icon: Shield, title: 'Secure', desc: 'HTTPS-only with rate limiting' },
            { icon: BarChart3, title: 'Analytics', desc: 'Track clicks and user data' }
          ].map((feature) => (
            <div key={feature.title} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Rate Limits */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-16">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Rate Limiting</h3>
              <p className="text-gray-400 mb-4">
                To ensure fair usage, API requests are rate limited:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  100 requests per hour per IP (unauthenticated)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  1,000 requests per hour per user (authenticated)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Endpoints</h2>
          
          <div className="space-y-6">
            {endpoints.map((endpoint) => (
              <div key={endpoint.path} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-mono font-semibold ${
                    endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                    endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-white font-mono">{endpoint.path}</code>
                  {endpoint.auth && (
                    <span className="ml-auto px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                      Requires Auth
                    </span>
                  )}
                </div>
                
                <div className="p-4">
                  <p className="text-gray-400 mb-4">{endpoint.description}</p>
                  
                  {endpoint.query && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Query Parameters:</p>
                      <code className="text-purple-400 text-sm">{endpoint.query}</code>
                    </div>
                  )}
                  
                  {endpoint.request && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Request Body:</p>
                      <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                        <code className="text-sm text-green-400">{endpoint.request}</code>
                      </pre>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Response:</p>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-blue-400">{endpoint.response}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Code Examples</h2>
          
          <div className="space-y-6">
            {codeExamples.map((example) => (
              <div key={example.language} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                  <span className="text-gray-300 font-medium">{example.language}</span>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm text-gray-300">{example.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to start building?</h2>
          <p className="text-gray-300 mb-6">
            Create your free account to access higher rate limits and advanced features.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Link2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">Shorty</span>
          </div>
          
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Shorty. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
