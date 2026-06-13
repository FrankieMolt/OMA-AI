-- OMA-AI x402 Payment Infrastructure
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- ============================================================
-- x402_transactions — payment receipts from facilitator/on-chain
-- ============================================================
CREATE TABLE IF NOT EXISTS public.x402_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tx_hash text UNIQUE,                   -- on-chain tx hash (nullable for facilitator-only)
  payment_id text UNIQUE,               -- Coinbase CDP facilitator payment ID
  amount bigint NOT NULL,               -- in micro-units (USDC = 6 decimals)
  amount_usdc numeric GENERATED ALWAYS AS (amount / 1_000_000.0) STORED,
  network text NOT NULL,                -- eip155:8453 or eip155:84532 or solana:...
  mcp_id text,                          -- which MCP was called
  mcp_slug text,
  from_address text,                     -- caller's wallet (lowercase)
  to_address text,                       -- OMA-AI treasury wallet
  status text DEFAULT 'pending' CHECK (status IN ('pending','confirmed','failed')),
  created_at timestamptz DEFAULT now(),
  confirmed_at timestamptz
);

CREATE INDEX IF NOT EXISTS x402_transactions_from_address_idx ON public.x402_transactions(from_address);
CREATE INDEX IF NOT EXISTS x402_transactions_created_at_idx ON public.x402_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS x402_transactions_status_idx ON public.x402_transactions(status) WHERE status = 'pending';

-- ============================================================
-- x402_nonces — replay protection for EIP-3009 signatures
-- ============================================================
CREATE TABLE IF NOT EXISTS public.x402_nonces (
  nonce text PRIMARY KEY,
  user_id text,
  caller_address text,
  amount text,
  mcp_id text,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  used boolean DEFAULT false
);

CREATE INDEX IF NOT EXISTS x402_nonces_expires_at_idx ON public.x402_nonces(expires_at) WHERE used = false;

-- ============================================================
-- x402_caller_nonces — replay protection for caller signatures
-- ============================================================
CREATE TABLE IF NOT EXISTS public.x402_caller_nonces (
  nonce text PRIMARY KEY,
  caller_address text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  used boolean DEFAULT false
);

CREATE INDEX IF NOT EXISTS x402_caller_nonces_expires_at_idx ON public.x402_caller_nonces(expires_at) WHERE used = false;

-- ============================================================
-- mcp_servers — ensure x402 columns exist
-- ============================================================
ALTER TABLE public.mcp_servers 
  ADD COLUMN IF NOT EXISTS x402_enabled boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS pricing_usdc numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS x402_pay_to text,
  ADD COLUMN IF NOT EXISTS x402_facilitator_payment_id text;

-- ============================================================
-- Cleanup job — run daily to purge expired nonces
-- ============================================================
CREATE OR REPLACE FUNCTION public.cleanup_expired_x402_nonces()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  DELETE FROM public.x402_nonces WHERE expires_at < now();
  DELETE FROM public.x402_caller_nonces WHERE expires_at < now();
END;
$$;

-- Run cleanup every hour (optional — Supabase pg_cron extension)
-- SELECT cron.schedule('cleanup-x402-nonces', '0 * * * *', 'SELECT cleanup_expired_x402_nonces()');
