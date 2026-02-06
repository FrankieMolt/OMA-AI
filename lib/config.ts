export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://oooijcrqpuqymgzlidrw.supabase.co/functions/v1',
  fallbackURL: 'http://localhost:8000',
  timeout: 30000, // 30 seconds
};

export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

export const X402_CONFIG = {
  network: 'base',
  chainId: 8453,
  rpcUrl: 'https://mainnet.base.org',
};
