import { ethers } from 'ethers';

// EIP-712 type definitions for EIP-3009 TransferWithAuthorization
export const TRANSFER_WITH_AUTHORIZATION_TYPE = [
  { name: 'from', type: 'address' },
  { name: 'to', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'validAfter', type: 'uint256' },
  { name: 'validBefore', type: 'uint256' },
  { name: 'nonce', type: 'bytes32' },
];

// EIP-712 type definitions for caller verification
export const CALLER_VERIFICATION_TYPE = [
  { name: 'user_id', type: 'string' },
  { name: 'amount', type: 'string' },
  { name: 'mcp_id', type: 'string' },
  { name: 'network', type: 'string' },
  { name: 'nonce', type: 'string' },
  { name: 'timestamp', type: 'uint256' },
];

// Domain separator for caller verification (EIP-712)
export const CALLER_VERIFICATION_DOMAIN = {
  name: 'OMA-AI Payment Verification',
  version: '1',
  chainId: 8453, // Base mainnet
  verifyingContract: '0x0000000000000000000000000000000000000000',
};

/**
 * Build EIP-712 domain for EIP-3009 tokens (like USDC)
 */
export function buildDomainSeparator(
  name: string,
  version: string,
  chainId: number,
  verifyingContract: string
): ethers.TypedDataDomain {
  return { name, version, chainId, verifyingContract };
}

/**
 * Verify EIP-712 caller signature
 */
export function verifyCallerSignature(
  callerAddress: string,
  callerSignature: string,
  callerMessage: Record<string, unknown>
): string | null {
  try {
    const recovered = ethers.verifyTypedData(
      CALLER_VERIFICATION_DOMAIN,
      { PaymentRequest: CALLER_VERIFICATION_TYPE },
      callerMessage,
      callerSignature
    );
    if (recovered.toLowerCase() !== callerAddress.toLowerCase()) {
      return null;
    }
    return recovered.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Sign EIP-3009 TransferWithAuthorization
 */
export async function signTransferAuthorization(
  wallet: ethers.Wallet,
  domain: ethers.TypedDataDomain,
  message: Record<string, unknown>
): Promise<string> {
  return wallet.signTypedData(domain, { TransferWithAuthorization: TRANSFER_WITH_AUTHORIZATION_TYPE }, message);
}
