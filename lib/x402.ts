/**
 * OMA-AI x402 Payment Integration
 * 
 * Handles HTTP 402 payments using OpenX402 facilitator
 * Supports Base (USDC) and Solana (USDC) networks
 * 
 * @module x402
 */

const FACILITATOR_URL = 'https://facilitator.openx402.ai';
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bDA02513';
const USDC_SOLANA = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

/**
 * Treasury Wallet Configuration
 * Platform receives 10% fee, publisher receives 90%
 */
const TREASURY = {
  base: process.env.TREASURY_WALLET_BASE || '0x742d35Cc6634C0532925a3b844Bc9e7595f0eB1D',
  solana: process.env.TREASURY_WALLET_SOL || '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  platformFee: 0.10, // 10% platform fee
};

/**
 * Create payment requirement for an endpoint
 */
function createPaymentRequirement(options) {
  return {
    'x402-version': 1,
    scheme: options.scheme || 'erc20',
    currency: options.currency || 'USDC',
    amount: options.amount || '0.001',
    recipient: options.recipient || TREASURY.base,
    network: options.network || 'base',
    description: options.description || 'API access',
    expires: Date.now() + 3600000, // 1 hour
  };
}

/**
 * Verify payment with OpenX402 facilitator
 */
async function verifyPayment(authHeader, network = 'base') {
  if (!authHeader) return { valid: false, reason: 'No payment header' };
  
  try {
    const response = await fetch(`${FACILITATOR_URL}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENX402_API_KEY || ''}`
      },
      body: JSON.stringify({
        authorization: authHeader,
        network
      })
    });
    
    return { valid: response.ok, status: response.status };
  } catch (error) {
    console.error('Payment verification error:', error);
    return { valid: false, reason: error.message };
  }
}

/**
 * Calculate payment split (90% publisher, 10% platform)
 */
function calculateSplit(amount) {
  const platformAmount = parseFloat(amount) * TREASURY.platformFee;
  const publisherAmount = parseFloat(amount) - platformAmount;
  
  return {
    total: amount,
    platform: platformAmount.toFixed(6),
    publisher: publisherAmount.toFixed(6),
  };
}

/**
 * Middleware to protect API routes with x402
 */
function requirePayment(amount, currency = 'USDC', network = 'base') {
  return async (req, res, next) => {
    const paymentHeader = req.headers['x-payment'];
    
    // For development, allow free access
    if (process.env.NODE_ENV === 'development') {
      return next();
    }
    
    // Check for payment
    const verification = await verifyPayment(paymentHeader, network);
    
    if (!verification.valid) {
      res.setHeader('X-Payment-Required', JSON.stringify(
        createPaymentRequirement({ amount, currency, network })
      ));
      return res.status(402).json({
        error: 'Payment Required',
        payment: createPaymentRequirement({ amount, currency, network })
      });
    }
    
    next();
  };
}

module.exports = {
  TREASURY,
  createPaymentRequirement,
  verifyPayment,
  calculateSplit,
  requirePayment,
  FACILITATOR_URL,
  USDC_BASE,
  USDC_SOLANA,
};