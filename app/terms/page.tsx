import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | OMA-AI',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050510] text-white font-exo2">
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-orbitron text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-invert">
            <p className="text-gray-300 mb-6">Last updated: February 2026</p>
            
            <h2 className="text-xl font-bold text-white mt-8 mb-4">API Usage</h2>
            <p className="text-gray-400">Use of OMA-AI APIs requires payment via x402 protocol. All usage is subject to fair use policies.</p>
            
            <h2 className="text-xl font-bold text-white mt-8 mb-4">Payments</h2>
            <p className="text-gray-400">Payments are non-refundable. All transactions are final and recorded on-chain.</p>
            
            <h2 className="text-xl font-bold text-white mt-8 mb-4">Liability</h2>
            <p className="text-gray-400">OMA-AI is provided "as is". We are not liable for any losses resulting from API usage.</p>
            
            <h2 className="text-xl font-bold text-white mt-8 mb-4">Contact</h2>
            <p className="text-gray-400">For terms inquiries: frankie@agentmail.to</p>
          </div>
        </div>
      </div>
    </main>
  )
}
