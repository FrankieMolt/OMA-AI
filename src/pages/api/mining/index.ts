import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * OMA-AI Mining API
 * 
 * Tracks miner contributions and credit earnings
 */

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Credit rates (credits per hour)
const CREDIT_RATES = {
  'qwen-3.5-4b-cpu': 50,      // $0.05/hr
  'qwen-3.5-4b-gpu': 500,     // $0.50/hr
  'llama-3.2-3b-cpu': 40,
  'llama-3.2-3b-gpu': 400,
  'mistral-7b-cpu': 60,
  'mistral-7b-gpu': 600,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const { method } = req.query;
  
  try {
    switch (method) {
      case 'register':
        return await registerMiner(req, res);
      case 'heartbeat':
        return await minerHeartbeat(req, res);
      case 'report':
        return await reportInference(req, res);
      case 'earnings':
        return await getEarnings(req, res);
      case 'withdraw':
        return await requestWithdrawal(req, res);
      default:
        return res.status(404).json({ error: 'Method not found' });
    }
  } catch (error: unknown) {
    console.error('Mining API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: errorMessage });
  }
}

/**
 * Register new miner
 */
async function registerMiner(req: NextApiRequest, res: NextApiResponse) {
  const { wallet_address, model, hardware } = req.body;
  
  if (!wallet_address || !model) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Create miner record
  const { data, error } = await supabase
    .from('miners')
    .insert({
      wallet_address,
      model,
      hardware: hardware || {},
      status: 'active',
      registered_at: new Date().toISOString(),
      last_heartbeat: new Date().toISOString(),
      total_credits: 0,
      total_requests: 0,
    })
    .select()
    .single();
  
  if (error) {
    return res.status(500).json({ error: 'Failed to register miner' });
  }
  
  // Determine credit rate
  const hardwareType = hardware?.gpu ? 'gpu' : 'cpu';
  const rateKey = `${model}-${hardwareType}`;
  const creditRate = CREDIT_RATES[rateKey as keyof typeof CREDIT_RATES] || 50;
  
  return res.json({
    success: true,
    miner_id: data.id,
    credit_rate: creditRate,
    message: 'Miner registered successfully',
  });
}

/**
 * Miner heartbeat (every 5 minutes)
 */
async function minerHeartbeat(req: NextApiRequest, res: NextApiResponse) {
  const { miner_id, stats } = req.body;
  
  if (!miner_id) {
    return res.status(400).json({ error: 'Missing miner_id' });
  }
  
  // Update last heartbeat
  const { error } = await supabase
    .from('miners')
    .update({
      last_heartbeat: new Date().toISOString(),
      status: 'active',
      current_stats: stats || {},
    })
    .eq('id', miner_id);
  
  if (error) {
    return res.status(500).json({ error: 'Failed to update heartbeat' });
  }
  
  // Calculate credits earned since last heartbeat (5 min = 1/12 hour)
  const { data: miner } = await supabase
    .from('miners')
    .select('model, hardware')
    .eq('id', miner_id)
    .single();
  
  const hardwareType = miner?.hardware?.gpu ? 'gpu' : 'cpu';
  const rateKey = `${miner?.model}-${hardwareType}`;
  const creditRate = CREDIT_RATES[rateKey as keyof typeof CREDIT_RATES] || 50;
  const creditsEarned = creditRate / 12; // 5 minutes
  
  // Add credits
  await supabase.rpc('add_credits', {
    p_miner_id: miner_id,
    p_credits: creditsEarned,
    p_source: 'mining',
  });
  
  return res.json({
    success: true,
    credits_earned: creditsEarned,
    credit_rate: creditRate,
  });
}

/**
 * Report completed inference
 */
async function reportInference(req: NextApiRequest, res: NextApiResponse) {
  const { miner_id, request_id, tokens_generated, response_time } = req.body;
  
  if (!miner_id || !request_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Log inference
  const { error } = await supabase
    .from('inference_logs')
    .insert({
      miner_id,
      request_id,
      tokens_generated: tokens_generated || 0,
      response_time: response_time || 0,
      timestamp: new Date().toISOString(),
    });
  
  if (error) {
    return res.status(500).json({ error: 'Failed to log inference' });
  }
  
  // Update miner stats
  await supabase
    .from('miners')
    .update({
      total_requests: supabase.rpc('increment', { count: 1 }),
    })
    .eq('id', miner_id);
  
  // Calculate bonus credits for fast response
  let bonus = 0;
  if (response_time < 1000) bonus = 5; // < 1s: +5 credits
  else if (response_time < 2000) bonus = 2; // < 2s: +2 credits
  
  if (bonus > 0) {
    await supabase.rpc('add_credits', {
      p_miner_id: miner_id,
      p_credits: bonus,
      p_source: 'performance_bonus',
    });
  }
  
  return res.json({
    success: true,
    bonus_credits: bonus,
  });
}

/**
 * Get miner earnings
 */
async function getEarnings(req: NextApiRequest, res: NextApiResponse) {
  const { miner_id } = req.query;
  
  if (!miner_id) {
    return res.status(400).json({ error: 'Missing miner_id' });
  }
  
  // Get miner stats
  const { data: miner } = await supabase
    .from('miners')
    .select('*')
    .eq('id', miner_id)
    .single();
  
  if (!miner) {
    return res.status(404).json({ error: 'Miner not found' });
  }
  
  // Get recent transactions
  const { data: transactions } = await supabase
    .from('credit_transactions')
    .select('*')
    .eq('miner_id', miner_id)
    .order('timestamp', { ascending: false })
    .limit(50);
  
  // Calculate USD value (1 credit = $0.001)
  const usdValue = miner.total_credits * 0.001;
  
  return res.json({
    success: true,
    total_credits: miner.total_credits,
    usd_value: usdValue,
    total_requests: miner.total_requests,
    status: miner.status,
    model: miner.model,
    transactions: transactions || [],
  });
}

/**
 * Request withdrawal
 */
async function requestWithdrawal(req: NextApiRequest, res: NextApiResponse) {
  const { miner_id, amount, wallet_address, token } = req.body;
  
  if (!miner_id || !amount || !wallet_address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Get miner balance
  const { data: miner } = await supabase
    .from('miners')
    .select('total_credits')
    .eq('id', miner_id)
    .single();
  
  if (!miner || miner.total_credits < amount) {
    return res.status(400).json({ error: 'Insufficient credits' });
  }
  
  // Minimum withdrawal: 100 credits ($0.10)
  if (amount < 100) {
    return res.status(400).json({ error: 'Minimum withdrawal is 100 credits' });
  }
  
  // Create withdrawal request
  const { data: withdrawal, error } = await supabase
    .from('withdrawals')
    .insert({
      miner_id,
      amount,
      wallet_address,
      token: token || 'X402',
      status: 'pending',
      requested_at: new Date().toISOString(),
    })
    .select()
    .single();
  
  if (error) {
    return res.status(500).json({ error: 'Failed to create withdrawal' });
  }
  
  // Deduct credits immediately (pending verification)
  await supabase.rpc('deduct_credits', {
    p_miner_id: miner_id,
    p_credits: amount,
    p_source: 'withdrawal',
  });
  
  return res.json({
    success: true,
    withdrawal_id: withdrawal.id,
    amount,
    token: token || 'X402',
    estimated_payout: '7 days', // Weekly payout schedule
    status: 'pending',
  });
}
