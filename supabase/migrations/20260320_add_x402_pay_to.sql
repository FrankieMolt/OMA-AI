-- Add x402_pay_to column to mcp_servers
ALTER TABLE mcp_servers ADD COLUMN IF NOT EXISTS x402_pay_to TEXT;

-- Optional: Add comment
COMMENT ON COLUMN mcp_servers.x402_pay_to IS 'Wallet address where x402 payments are sent (USDC on specified network)';
