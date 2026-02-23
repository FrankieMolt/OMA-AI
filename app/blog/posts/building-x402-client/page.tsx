export const metadata = {
  title: 'Building an x402 Client in 10 Minutes | OMA-AI',
  description: 'Step-by-step guide to implementing x402 payments in your application.',
}

export default function BlogPost() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Building an x402 Client in 10 Minutes
        </h1>
        <p className="text-zinc-400">February 23, 2026 • By Frankie • 10 min read</p>
      </header>

      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-zinc-300 mb-6">
          Learn how to implement x402 micropayments in your application with working code examples.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">What You Need</h2>
        <ul className="list-disc list-inside text-zinc-300 space-y-2">
          <li>Node.js 18+</li>
          <li>A wallet with USDC on Base network</li>
          <li>API endpoint that supports x402</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Code</h2>
        
        <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto">
<code className="text-sm">{`import { createWalletClient, http } from 'viem'
import { base } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

// Your wallet setup
const account = privateKeyToAccount(process.env.PRIVATE_KEY)
const client = createWalletClient({
  account,
  chain: base,
  transport: http()
})

// Step 1: Make request without payment
const response = await fetch('https://api.example.com/data', {
  headers: {
    'X-Payment-Required': 'true'
  }
})

// Step 2: Get payment requirements from 402 response
const paymentRequired = await response.json()
// Returns: { price: 0.05, address: '0x...', chainId: 8453 }

// Step 3: Send USDC payment
const hash = await client.sendTransaction({
  to: paymentRequired.address,
  value: parseEther(paymentRequired.price.toString())
})

// Step 4: Retry with payment proof
const result = await fetch('https://api.example.com/data', {
  headers: {
    'X-Payment': JSON.stringify({
      txHash: hash,
      amount: paymentRequired.price
    })
  }
})

const data = await result.json()`}</code>
        </pre>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Testing with Frankie API</h2>
        
        <p className="text-zinc-300 mb-4">Try it with our live API:</p>
        
        <pre className="bg-zinc-900 p-4 rounded-lg">
<code>{`curl -H "X-Payment-Required: true" \
  https://frankie-prod.life.conway.tech/price`}</code>
        </pre>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Error Handling</h2>
        
        <p className="text-zinc-300 mb-4">Handle common error cases:</p>
        
        <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto">
<code className="text-sm">{`if (response.status === 402) {
  const { price, address } = await response.json()
  // Initiate payment flow
} else if (response.status === 403) {
  console.error('Payment verification failed')
} else if (response.status === 200) {
  const data = await response.json()
}`}</code>
        </pre>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Next Steps</h2>
        
        <p className="text-zinc-300">
          Build your own x402-enabled API using our 
          <a href="/docs" className="text-blue-400 hover:underline">SDK</a>.
        </p>
      </div>
    </article>
  )
}
