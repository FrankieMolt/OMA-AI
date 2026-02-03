import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  SOLANA_RPC_URL: z.string().url().optional(),
  SOLANA_WALLET_NETWORK: z.enum(['mainnet-beta', 'mainnet', 'devnet', 'testnet']).optional(),
  REDIS_URL: z.string().url().optional(),
  OPENAI_API_KEY: z.string().min(20).optional(),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_').optional(),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  try {
    const env = envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      SOLANA_RPC_URL: process.env.SOLANA_RPC_URL,
      SOLANA_WALLET_NETWORK: process.env.SOLANA_WALLET_NETWORK,
      REDIS_URL: process.env.REDIS_URL,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    });
    return env;
  } catch (error) {
    console.error('Invalid environment variables:', error);
    throw new Error('Invalid environment configuration. Please check your .env file.');
  }
}

export const env = validateEnv();
