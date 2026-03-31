import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Publish Your MCP - OMA-AI Marketplace',
  description: 'Publish MCP, earn revenue via x402 payments.',
};

export default function PublishMCPPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      <div className="py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Publish Your MCP</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">Earn 85% revenue. Get paid via x402 USDC.</p>
      </div>
      <div className="container mx-auto px-4 pb-20">
        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Pricing Options</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-green-400" /> Free</li>
            <li className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-green-400" /> Per-call ($0.001-$1.00)</li>
            <li className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-green-400" /> Subscription</li>
          </ul>
          <div className="mt-6">
            <div className="text-4xl font-bold text-green-400">85%</div>
            <p className="text-gray-400">You keep 85%</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
