// OMA-AI Supabase Configuration
// Optimized for low-cost development

const supabaseConfig = {
  // Free Tier Limits (never exceed free tier)
  plan: 'free',
  
  // Database
  database: {
    maxRows: 5000, // Free tier limit
    maxSize: '500 MB',
    backup: false, // Manual backups only on free tier
  },
  
  // Auth
  auth: {
    providers: ['email', 'wallet'], // Wallet auth for x402
    maxUsers: 5000,
    emailConfirmations: true,
  },
  
  // Storage  
  storage: {
    maxSizeGB: 1,
    bandwidthGB: 5,
  },
  
  // Edge Functions (for x402 payments)
  edgeFunctions: {
    maxInvocations: 5000/month (free),
    runtime: 'deno',
  },
  
  // Realtime
  realtime: {
    maxConnections: 200,
  },
};

module.exports = supabaseConfig;