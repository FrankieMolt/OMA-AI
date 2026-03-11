/**
 * AIXBT Signals Test Page
 * GET /signals-with-aixbt
 *
 * Test page for AIXBT integration
 */

import SignalsWithAIXBT from '@/components/signals-with-aixbt';

export default function SignalsWithAIXBTPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 AIXBT Signals Dashboard</h1>
          <p className="text-gray-600">
            Combined trading signals with AIXBT market data
          </p>
        </div>

        <SignalsWithAIXBT chain="solana" limit={10} />
      </div>
    </div>
  );
}
