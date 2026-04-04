/**
 * Solana x402 payment service
 * Currently a placeholder — Solana x402 support to be implemented
 */
export async function signSolanaPayment(_params: {
  fromAddress: string;
  payTo: string;
  amount: bigint;
  nonce: string;
}): Promise<string> {
  // TODO: Implement Solana SPL token payment signing
  throw new Error('Solana x402 payments not yet implemented');
}
