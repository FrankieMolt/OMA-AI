import { NextRequest, NextResponse } from 'next/server';
import { x402Middleware } from '@/lib/x402-middleware';

export const runtime = 'nodejs';

// OMA Gateway: Proxies requests to remote MCP servers
// Enforces x402 payment and injects API keys if needed
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { targetUrl, payload, signature } = await req.json();

    if (!targetUrl) {
      return NextResponse.json({ error: 'Missing targetUrl' }, { status: 400 });
    }

    // Set up payment headers for x402 verification
    const paymentHeaders = new Headers(req.headers);
    if (signature) {
      paymentHeaders.set('PAYMENT-SIGNATURE', JSON.stringify(signature));
    }

    // Create a modified request with payment headers and target URL
    const paymentRequest = new NextRequest(targetUrl, {
      method: req.method,
      headers: paymentHeaders,
      body: JSON.stringify(payload),
    });

    // Use the enhanced middleware directly - it will return 402 if payment is required
    // For MCP proxy, we use a fixed price of 0.001 USDC per request
    const OMA_WALLET_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_WALLET_ADDRESS || 'oma-marketplace.sol';
    const paymentResponse = await x402Middleware(
      paymentRequest,
      0.001, // Price in USDC per request
      OMA_WALLET_ADDRESS,
      {
        enableRateLimiting: true,
        maxProcessingTime: 30000, // 30 second timeout
      }
    );

    // If middleware returned a non-null response, it means it either needs payment (402)
    // or verification failed (403), or there was an internal error (500).
    if (paymentResponse) {
      return paymentResponse;
    }

    // Extract payment verification data (X-Request-ID was generated in middleware)
    const requestId = crypto.randomUUID();
    const paymentAmount = '0.001'; // Fixed amount for logging

    // Forward request to the actual MCP server with enhanced headers
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OMA-Gateway': 'verified',
        'X-OMA-Request-ID': requestId,
        'X-OMA-Payment-Amount': paymentAmount,
        // 'Authorization': `Bearer ${process.env.OMA_MASTER_KEY}` // Example injection
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Stream the response back with payment confirmation headers
    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        ...Object.fromEntries(response.headers.entries()),
        'X-OMA-Payment-Verified': 'true',
        'X-OMA-Request-ID': requestId,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('X402')) {
      return NextResponse.json(
        {
          error: 'Payment verification error',
          details: error.message,
          code: 'X402_VERIFICATION_ERROR',
        },
        { status: 402 }
      );
    }

    return NextResponse.json(
      {
        error: 'Gateway Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Export additional helper for batch verification
export async function verifyBatchPayments(
  payments: Array<{
    signature: string;
    targetUrl: string;
    amount: string;
  }>
) {
  const OMA_WALLET_ADDRESS = 'oma-marketplace.sol';

  const results = await Promise.all(
    payments.map(async (payment) => {
      try {
        // Create a mock request for each payment
        const mockRequest = new NextRequest(payment.targetUrl, {
          method: 'POST',
          headers: {
            'PAYMENT-SIGNATURE': JSON.stringify({
              signature: payment.signature,
              amount: payment.amount,
              recipient: OMA_WALLET_ADDRESS,
              timestamp: Date.now(),
              nonce: crypto.randomUUID(),
            }),
          },
        });

        const response = await x402Middleware(
          mockRequest,
          parseFloat(payment.amount),
          OMA_WALLET_ADDRESS
        );

        if (!response) {
          return {
            valid: false,
            error: 'Payment verification failed',
            requestId: crypto.randomUUID(),
            amount: payment.amount,
          };
        }

        return {
          valid: response.status !== 402,
          error: response.status === 402 ? 'Payment required' : undefined,
          requestId: response.headers.get('X-Request-ID') || crypto.randomUUID(),
          amount: payment.amount,
        };
      } catch (error) {
        return {
          valid: false,
          error: error instanceof Error ? error.message : 'Verification failed',
          requestId: crypto.randomUUID(),
          amount: payment.amount,
        };
      }
    })
  );

  return results.map((result, index) => ({
    index,
    valid: result.valid,
    error: result.error,
    requestId: result.requestId,
    amount: result.amount,
  }));
}
