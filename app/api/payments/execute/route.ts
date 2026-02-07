import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyMessage } from 'viem';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const { serviceId, walletAddress, signature, message } = await request.json();

    // Validate required fields
    if (!serviceId || !walletAddress || !signature || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceId, walletAddress, signature, message' },
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
    let paymentData;
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
    const { data: service, error: serviceError } = await supabase
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

    // Verify amount matches
    if (paymentData.amount !== service.price_per_use) {
      return NextResponse.json(
        { error: 'Payment amount mismatch' },
        { status: 400 }
      );
    }

    // Find or create user by wallet
    let { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', walletAddress.toLowerCase())
      .single();

    if (!user) {
      // Create new user with wallet
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          wallet_address: walletAddress.toLowerCase(),
          auth_type: 'wallet'
        })
        .select('id')
        .single();

      if (createError) {
        console.error('Failed to create user:', createError);
        return NextResponse.json(
          { error: 'Failed to process payment' },
          { status: 500 }
        );
      }
      user = newUser;
    }

    // Record the transaction (simulated for now)
    // In production, this would interact with actual blockchain/payment processor
    const txHash = `0x${Date.now().toString(16)}${Math.random().toString(16).slice(2, 10)}`;
    
    // Log the transaction in audit_logs
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      action: 'payment_execute',
      details: {
        service_id: serviceId,
        service_name: service.name,
        amount: paymentData.amount,
        currency: paymentData.currency,
        chain: paymentData.chain,
        wallet_address: walletAddress,
        tx_hash: txHash,
        status: 'completed'
      }
    });

    // Update service usage count
    await supabase
      .from('services')
      .update({ 
        total_requests: (service.total_requests || 0) + 1 
      })
      .eq('id', serviceId);

    return NextResponse.json({
      success: true,
      txHash,
      service: {
        id: service.id,
        name: service.name,
        endpoint: service.endpoint
      },
      message: 'Payment successful. You can now call the API.'
    });

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
  const { searchParams } = new URL(request.url);
  const txHash = searchParams.get('txHash');

  if (!txHash) {
    return NextResponse.json(
      { error: 'txHash required' },
      { status: 400 }
    );
  }

  // Look up transaction in audit logs
  const { data: log } = await supabase
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
}
