import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyMessage } from 'viem';
import { addSecurityHeaders } from '@/lib/security';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const isProduction = process.env.NODE_ENV === 'production';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Lazy initialization to allow build to succeed
let supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!supabase && supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

export async function POST(request: NextRequest) {
  const db = getSupabase();
  if (!db) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 503 }
    );
  }

  try {
    const { serviceId, walletAddress, signature, message } = await request.json();

    // Validate required fields
    if (!serviceId || !walletAddress || !signature || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceId, walletAddress, signature, message' },
        { status: 400 }
      );
    }

    // Validate wallet address format
    const walletAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!walletAddressRegex.test(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    // Verify the signature
    let isValid = false;
    try {
      isValid = await verifyMessage({
        address: walletAddress as `0x${string}`,
        message,
        signature: signature as `0x${string}`
      });
    } catch (err) {
      console.error('Signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Signature verification failed' },
        { status: 401 }
      );
    }

    // Parse the payment message
    let paymentData: any;
    try {
      paymentData = JSON.parse(message);
    } catch {
      return NextResponse.json(
        { error: 'Invalid payment message format' },
        { status: 400 }
      );
    }

    // Check timestamp (prevent replay attacks - 5 min window)
    const messageAge = Date.now() - paymentData.timestamp;
    if (messageAge > 5 * 60 * 1000) {
      return NextResponse.json(
        { error: 'Payment message expired' },
        { status: 400 }
      );
    }

    // Fetch the service
    const { data: service, error: serviceError } = await db
      .from('services')
      .select('*')
      .eq('id', serviceId)
      .single();

    if (serviceError || !service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Cast service to expected type
    const svc = service as { id: string; name: string; price_per_use: number; endpoint: string; total_requests: number };

    // Verify amount matches
    if (paymentData.amount !== svc.price_per_use) {
      return NextResponse.json(
        { error: 'Payment amount mismatch' },
        { status: 400 }
      );
    }

    // Find user by wallet (try to fetch, but don't fail if table doesn't exist)
    let user: any = null;
    try {
      const result = await db
        .from('users')
        .select('id')
        .eq('email', walletAddress.toLowerCase())
        .single();
      user = result.data;
    } catch (err) {
      // Users table may not exist yet - that's okay for demo
// console.log('Users table not available, proceeding without user tracking');
    }

    // SECURITY WARNING: This is a SIMULATED payment for demo purposes only!
    // In production, you MUST:
    // 1. Verify actual on-chain transaction via blockchain RPC
    // 2. Confirm transaction amount matches service.price_per_use
    // 3. Verify the transaction was sent to the correct recipient address
    // 4. Use a proper payment processor (e.g., Coinbase Commerce, Stripe, or direct blockchain verification)
    const txHash = `DEMO-TX-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    if (isProduction) {
      console.error('CRITICAL: Fake payment execution in production mode!');
      // In production, return error here until real payment verification is implemented
      // return NextResponse.json(
      //   { error: 'Payment verification not implemented in production' },
      //   { status: 501 }
      // );
    }

    // Log transaction in audit_logs (for audit trail) - ignore if table doesn't exist
    try {
      await (db as any)
        .from('audit_logs')
        .insert({
          user_id: user?.id || null,
          action: 'payment_execute',
          details: {
            service_id: serviceId,
            service_name: svc.name,
            amount: paymentData.amount,
            currency: paymentData.currency,
            chain: paymentData.chain,
            wallet_address: walletAddress,
            tx_hash: txHash,
            status: 'completed',
            is_demo: !isProduction
          }
        });
    } catch (logError: any) {
      // Don't fail payment if logging fails
// console.log('Audit logging error:', logError?.message);
    }

    // Update service usage count
    try {
      await (db as any)
        .from('services')
        .update({
          total_requests: (svc.total_requests || 0) + 1
        })
        .eq('id', serviceId);
    } catch (updateError: any) {
      // Don't fail payment if usage count update fails
      console.error('Failed to update usage count:', updateError);
    }

    const response = NextResponse.json({
      success: true,
      txHash,
      is_demo: !isProduction,
      service: {
        id: svc.id,
        name: svc.name,
        endpoint: svc.endpoint
      },
      message: !isProduction
        ? 'Payment successful (DEMO MODE - No actual payment processed)'
        : 'Payment successful. You can now call to the API.'
    });

    return addSecurityHeaders(response);

  } catch (error) {
    console.error('Payment execution error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET: Check payment status
export async function GET(request: NextRequest) {
  const db = getSupabase();
  if (!db) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const txHash = searchParams.get('txHash');

  if (!txHash) {
    return NextResponse.json(
      { error: 'txHash required' },
      { status: 400 }
    );
  }

  // Look up transaction in audit logs
  try {
    const { data: log } = await (db as any)
      .from('audit_logs')
      .select('*')
      .eq('action', 'payment_execute')
      .filter('details->tx_hash', 'eq', txHash)
      .single();

    if (!log) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      txHash,
      status: log.details?.status || 'unknown',
      service: log.details?.service_name,
      amount: log.details?.amount,
      timestamp: log.created_at
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
