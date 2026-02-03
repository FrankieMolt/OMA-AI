import { Metadata } from 'next';
import Link from 'next/link';
import { DocsToc } from '@/components/docs/DocsToc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';

export const metadata: Metadata = {
  title: 'x402 Payment Protocol - OpenMarketAccess',
  description:
    'Learn about the x402 payment protocol for Solana-based micropayments in the OpenMarketAccess platform',
};

export default function X402Page() {
  return (
    <div className="container max-w-5xl py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="prose prose-invert max-w-none">
            <h1>x402 Payment Protocol</h1>
            <p className="text-lg text-muted-foreground">
              The x402 protocol is a standardized payment protocol built on Solana for secure, fast,
              and low-cost micropayments within the OpenMarketAccess ecosystem.
            </p>

            <h2 id="overview">Overview</h2>
            <p>
              x402 enables seamless micropayments between users, agents, and MCP servers. Built on
              Solana, it provides:
            </p>
            <ul>
              <li>
                <strong>Instant Settlement:</strong> Transactions confirm in ~400ms
              </li>
              <li>
                <strong>Low Fees:</strong> Average transaction cost of $0.00025
              </li>
              <li>
                <strong>Atomic Transactions:</strong> All-or-nothing execution guarantees
              </li>
              <li>
                <strong>Programmable:</strong> Smart contract integration for complex payment flows
              </li>
            </ul>

            <h2 id="how-it-works">How It Works (The 6-Step Protocol)</h2>
            <p>The x402 protocol follows a precise interaction flow to ensure security and trustless payment:</p>

            <div className="my-8 space-y-4">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[12px] text-primary-foreground font-bold">1</span>
                    Request
                  </CardTitle>
                  <CardDescription>Client initiates interaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Client sends a request to an agent endpoint. OMA Gateway intercepts the request and checks for a <code>PAYMENT-SIGNATURE</code> header.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-warning/20 bg-warning/5">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-warning text-[12px] text-warning-foreground font-bold">2</span>
                    Challenge
                  </CardTitle>
                  <CardDescription>Gateway issues 402 Payment Required</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    If the signature is missing or invalid, the Gateway returns a <code>402 Payment Required</code> response with instructions (amount, recipient, nonce).
                  </p>
                </CardContent>
              </Card>

              <Card className="border-info/20 bg-info/5">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-info text-[12px] text-info-foreground font-bold">3</span>
                    Payment
                  </CardTitle>
                  <CardDescription>Client signs Solana transaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Client signs a payment transaction via their Solana wallet and retries the original request with the signature in the header.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-success/20 bg-success/5">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-[12px] text-success-foreground font-bold">4</span>
                    Verification
                  </CardTitle>
                  <CardDescription>On-chain validation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Gateway verifies the signature on-chain, checks for double-spending/replay attacks, and confirms the funds reached the treasury.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-accent/5">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[12px] text-accent-foreground font-bold">5</span>
                    Proxying
                  </CardTitle>
                  <CardDescription>Request forwarding</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Once verified, the Gateway forwards the original request to the upstream agent or service provider.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-info/20 bg-info/5">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-info text-[12px] text-info-foreground font-bold">6</span>
                    Execution
                  </CardTitle>
                  <CardDescription>Response delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    The upstream agent executes and returns the response with a <code>X-OMA-Payment-Verified: true</code> header.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2 id="credit-system">Credit System</h2>
            <p>x402 uses a credit-based system for easier price representation:</p>
            <ul>
              <li>
                <strong>1,000 credits = $1 USD</strong>
              </li>
              <li>
                <strong>1 credit = $0.001 USD</strong>
              </li>
              <li>
                <strong>Minimum payment: 1 credit</strong>
              </li>
              <li>
                <strong>USDC on Solana as base currency</strong>
              </li>
            </ul>

            <div className="my-8 p-6 bg-gradient-to-r from-info/10 to-accent/10 rounded-lg border border-border/60">
              <h3 className="text-xl font-semibold mb-2">💡 Why Credits?</h3>
              <p className="text-muted-foreground">
                Credits provide a unified pricing unit across all services on OMA, making it easier
                to compare costs between different agents, MCP servers, and LLM models. They also
                abstract away blockchain-specific decimal handling.
              </p>
            </div>

            <h2 id="backend-persistence">Backend Persistence & Auditing</h2>
            <p>
              The x402 middleware automatically persists verified transactions to the OMA database, enabling:
            </p>
            <ul>
              <li>
                <strong>Transaction History:</strong> Users can view their full interaction history in the dashboard.
              </li>
              <li>
                <strong>Provider Analytics:</strong> Marketplace providers can track usage and revenue in real-time.
              </li>
              <li>
                <strong>Automatic Reconciliation:</strong> Every on-chain signature is matched against a local <code>x402_escrows</code> record.
              </li>
              <li>
                <strong>Dispute Resolution:</strong> Cryptographic proof of payment is stored for every interaction.
              </li>
            </ul>

            <h2 id="integration">Integration</h2>
            <h3 id="typescript-integration">TypeScript/JavaScript</h3>
            <p>Using the official OMA SDK:</p>
            <CodeBlock
              language="typescript"
              code={`import { OMA } from '@oma/sdk';

const oma = new OMA({
  apiKey: process.env.OMA_API_KEY,
  endpoint: 'https://api.oma.ai',
  wallet: {
    privateKey: process.env.SOLANA_PRIVATE_KEY
  }
});

// Execute an agent with x402 payment
const result = await oma.agents.execute(
  'agent-123',
  'Analyze this data',
  {
    paymentSignature: await oma.x402.pay({
      amount: 1000, // 1000 credits = $1 USD
      recipient: 'agent-123-wallet.sol',
      description: 'Agent execution'
    })
  }
);
`}
            />

            <h3 id="python-integration">Python</h3>
            <p>Using the Python SDK:</p>
            <CodeBlock
              language="python"
              code={`from oma import OMA

oma = OMA(
    api_key="your-api-key",
    endpoint="https://api.oma.ai",
    wallet={"private_key": "your-private-key"}
)

# Execute an agent with x402 payment
result = await oma.agents.execute(
    agent_id="agent-123",
    input="Analyze this data",
    payment_signature=await oma.x402.pay(
        amount=1000,
        recipient="agent-123-wallet.sol",
        description="Agent execution"
    )
)
`}
            />

            <h3 id="api-integration">Direct API Integration</h3>
            <p>You can also integrate x402 payments directly with the API:</p>
            <CodeBlock
              language="typescript"
              code={`// 1. Create payment signature
const paymentSignature = {
  transactionId: 'tx_123456',
  amount: 1000,
  recipient: 'oma-marketplace.sol',
  timestamp: '2024-01-20T12:00:00Z',
  nonce: 'unique-nonce',
  signature: 'base64-encoded-signature'
};

// 2. Include payment header in request
const response = await fetch('https://api.oma.ai/api/agents/123/execute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'PAYMENT-SIGNATURE': JSON.stringify(paymentSignature)
  },
  body: JSON.stringify({
    input: 'Analyze this data'
  })
});
`}
            />

            <h2 id="verification">Payment Verification</h2>
            <p>
              Server-side verification ensures payments are legitimate before providing services:
            </p>
            <CodeBlock
              language="typescript"
              code={`import { X402Client } from '@oma/sdk/x402';

const x402 = new X402Client();

// Verify a payment
const verification = await x402.verify({
  signature: paymentSignature.signature,
  amount: paymentSignature.amount,
  recipient: paymentSignature.recipient,
  timestamp: paymentSignature.timestamp,
  nonce: paymentSignature.nonce
});

if (verification.valid) {
  console.log('Payment verified:', verification.transactionId);
  // Proceed with service
} else {
  console.error('Payment verification failed:', verification.error);
  // Reject request
}
`}
            />

            <h2 id="middleware">Middleware Integration</h2>
            <p>The OMA platform includes x402 middleware for automatic payment verification:</p>
            <CodeBlock
              language="typescript"
              code={`import { x402Middleware } from '@/lib/x402-middleware';

export async function POST(request: NextRequest) {
  // Automatically verifies payment before processing
  const paymentResponse = await x402Middleware(
    request,
    10, // Price in credits
    'oma-marketplace.sol',
    {
      enableRateLimiting: true,
      maxProcessingTime: 30000
    }
  );

  if (paymentResponse?.status === 402) {
    return paymentResponse; // Payment required
  }

  // Payment verified, proceed with request
  return NextResponse.json({ success: true });
}
`}
            />

            <h2 id="best-practices">Best Practices</h2>
            <ul>
              <li>
                <strong>Always include a nonce:</strong> Prevents replay attacks
              </li>
              <li>
                <strong>Verify payments on-chain:</strong> Don&apos;t trust just the signature
              </li>
              <li>
                <strong>Handle payment failures gracefully:</strong> Provide clear error messages
              </li>
              <li>
                <strong>Implement rate limiting:</strong> Prevent abuse even with valid payments
              </li>
              <li>
                <strong>Log all transactions:</strong> For audit trails and dispute resolution
              </li>
              <li>
                <strong>Use appropriate timeouts:</strong> Set reasonable timeouts for payment
                verification
              </li>
            </ul>

            <h2 id="security">Security Considerations</h2>
            <ul>
              <li>
                <strong>Private Key Protection:</strong> Never expose private keys in client-side
                code
              </li>
              <li>
                <strong>Signature Verification:</strong> Always verify signatures server-side
              </li>
              <li>
                <strong>Nonce Management:</strong> Use unique nonces for each transaction
              </li>
              <li>
                <strong>Amount Validation:</strong> Validate amounts against expected pricing
              </li>
              <li>
                <strong>Recipient Verification:</strong> Ensure payments go to expected addresses
              </li>
            </ul>

            <h2 id="troubleshooting">Troubleshooting</h2>
            <h3 id="payment-failed">Payment Failed</h3>
            <p>Check:</p>
            <ul>
              <li>Sufficient balance in wallet</li>
              <li>Correct recipient address</li>
              <li>Valid signature format</li>
              <li>Network connectivity</li>
              <li>Solana network status</li>
            </ul>

            <h3 id="verification-failed">Verification Failed</h3>
            <p>Check:</p>
            <ul>
              <li>Transaction exists on-chain</li>
              <li>Correct amount and recipient</li>
              <li>Valid nonce (not reused)</li>
              <li>Timestamp within acceptable window</li>
              <li>Signature matches transaction data</li>
            </ul>

            <h2 id="next-steps">Next Steps</h2>
            <ul>
              <li>
                <Link href="/docs/quick-start" className="text-primary hover:underline">
                  Quick Start Guide
                </Link>
              </li>
              <li>
                <Link href="/docs/api-reference" className="text-primary hover:underline">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/docs/wallet-guide" className="text-primary hover:underline">
                  Wallet Setup Guide
                </Link>
              </li>
              <li>
                <Link href="/docs/troubleshooting" className="text-primary hover:underline">
                  Troubleshooting
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <DocsToc
            items={[
              { id: 'overview', title: 'Overview' },
              { id: 'how-it-works', title: 'How It Works' },
              { id: 'credit-system', title: 'Credit System' },
              { id: 'backend-persistence', title: 'Persistence & Auditing' },
              { id: 'integration', title: 'Integration' },
              { id: 'typescript-integration', title: 'TypeScript/JavaScript' },
              { id: 'python-integration', title: 'Python' },
              { id: 'api-integration', title: 'Direct API' },
              { id: 'verification', title: 'Payment Verification' },
              { id: 'middleware', title: 'Middleware' },
              { id: 'best-practices', title: 'Best Practices' },
              { id: 'security', title: 'Security' },
              { id: 'troubleshooting', title: 'Troubleshooting' },
              { id: 'next-steps', title: 'Next Steps' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
