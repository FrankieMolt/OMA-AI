import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import { Github, Terminal, Box, Zap, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: 'OpenClaw Integration - OMA-AI MCP Marketplace',
  description: 'Connect OMA-AI MCPs to OpenClaw. Get local MCP code, configure x402 payments, and enable autonomous agent commerce.',
  keywords: ['OpenClaw', 'MCP', 'AI agents', 'integration', 'x402'],
};

const openclawConfig = `{
  "mcp": {
    "servers": {
      "oma-ai-search": {
        "transport": "streamable-http",
        "url": "https://oma-ai.com/mcp/search",
        "headers": {
          "Authorization": "Bearer YOUR_API_KEY"
        }
      }
    }
  }
}`;

export default function OpenClawIntegrationPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-900/50 via-zinc-900 to-zinc-950 py-20">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 border border-orange-500/30 rounded-full mb-6">
            <Github className="w-4 h-4 text-orange-300" />
            <span className="text-sm font-semibold text-orange-300">OpenClaw Integration</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Connect OpenClaw to OMA-AI</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Access OMA-AI MCPs directly in OpenClaw. Get local MCP code, enable x402 autonomous payments.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[{icon:Terminal,step:'1',title:'Copy Config',desc:'Get OpenClaw config'},{icon:Code,step:'2',title:'Add to OpenClaw',desc:'Paste in openclaw.json'},{icon:Zap,step:'3',title:'Enable x402',desc:'Configure payments'},{icon:Box,step:'4',title:'Use MCPs',desc:'Access OMA-AI tools'}].map((i) => (
            <div key={i.step} className="text-center">
              <div className="w-16 h-16 bg-orange-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4"><i.icon className="w-8 h-8 text-orange-400" /></div>
              <div className="text-sm font-bold text-orange-400 mb-2">Step {i.step}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{i.title}</h3>
              <p className="text-gray-400 text-sm">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 pb-20">
        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">OpenClaw Configuration</h2>
          <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 font-mono">{openclawConfig}</pre>
          <p className="text-gray-400 text-sm mt-4">Add to <code className="text-orange-400">~/.openclaw/openclaw.json</code></p>
        </GlassCard>
      </div>
    </div>
  );
}
