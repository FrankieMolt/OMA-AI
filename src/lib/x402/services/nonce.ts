import { randomBytes } from 'crypto';

/**
 * Generate a secure random nonce (32 bytes hex)
 */
export function generateNonce(): string {
  return '0x' + randomBytes(32).toString('hex');
}

/**
 * Generate a caller nonce (16 bytes hex) for replay protection
 */
export function generateCallerNonce(): string {
  return '0x' + randomBytes(16).toString('hex');
}

/**
 * Generate timestamps for EIP-3009 authorization
 */
export function generateAuthorizationTimestamps(TTLSeconds = 300): {
  validAfter: number;
  validBefore: number;
} {
  const validAfter = Math.floor(Date.now() / 1000);
  const validBefore = validAfter + TTLSeconds;
  return { validAfter, validBefore };
}
