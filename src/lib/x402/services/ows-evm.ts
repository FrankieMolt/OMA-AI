/**
 * OWS (Open Wallet Standard) EVM integration for x402 payments.
 *
 * OWS provides local, policy-gated signing with keys encrypted at rest.
 * This module wraps the OWS Node.js SDK for EIP-3009 TransferWithAuthorization signing.
 *
 * Falls back to ethers if OWS is not configured or wallet is not found.
 */

import { Wallet } from 'ethers';
import { randomBytes } from 'crypto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _ows: any = null;

function getOWS(): any {
  if (!_ows) {
    _ows = require('@open-wallet-standard/core');
  }
  return _ows;
}

// OWS vault wallet name for OMA-AI treasury
export const OWS_WALLET_NAME = process.env.OWS_WALLET_NAME || 'oma-treasury';
export const OWS_WALLET_PASSPHRASE = process.env.OWS_WALLET_PASSPHRASE || '';

/**
 * Check if OWS wallet is available and configured.
 */
export function isOWSConfigured(): boolean {
  try {
    const ows = getOWS();
    const wallets = ows.listWallets();
    return wallets.some((w: { name: string }) => w.name === OWS_WALLET_NAME);
  } catch {
    return false;
  }
}

/**
 * Sign EIP-3009 TransferWithAuthorization using OWS.
 * Returns a signature compatible with EIP-3009 USDC permits.
 */
export async function signEVMPaymentWithOWS(params: {
  fromAddress: string;
  payTo: string;
  amountBigInt: bigint;
  validAfter: number;
  validBefore: number;
  nonce: string;
  chainId: number;
  assetContract: string;
}): Promise<string> {
  const ows = getOWS();
  const { fromAddress, payTo, amountBigInt, validAfter, validBefore, nonce, chainId, assetContract } = params;

  // Convert nonce to bytes32 hex — ensure it's exactly 32 bytes
  const nonceClean = nonce.startsWith('0x') ? nonce.slice(2) : nonce;
  const nonceBytes = Buffer.from(nonceClean, 'hex');
  if (nonceBytes.length !== 32) {
    throw new Error(`nonce must be 32 bytes (64 hex chars), got ${nonceBytes.length} bytes`);
  }
  const nonceBytes32 = '0x' + nonceBytes.toString('hex');

  const typedData = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      TransferWithAuthorization: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'validAfter', type: 'uint256' },
        { name: 'validBefore', type: 'uint256' },
        { name: 'nonce', type: 'bytes32' },
      ],
    },
    primaryType: 'TransferWithAuthorization',
    domain: {
      name: 'USDC',
      version: '2',
      chainId,
      verifyingContract: assetContract,
    },
    message: {
      from: fromAddress,
      to: payTo.toLowerCase(),
      value: amountBigInt.toString(),
      validAfter,
      validBefore,
      nonce: nonceBytes32,
    },
  };

  const result = ows.signTypedData(
    OWS_WALLET_NAME,
    String(chainId),
    JSON.stringify(typedData),
    OWS_WALLET_PASSPHRASE
  );

  // OWS returns { signature: hex, recoveryId: number }
  // For EIP-3009, the signature format must be r + s + v (65 bytes total)
  // If sig is 64 bytes (r+s only), append v byte
  const v = 27 + (result.recoveryId ?? 0);
  const sigHex = result.signature;

  if (sigHex.length === 128) {
    // r (32) + s (32) without v — append v
    return sigHex + v.toString(16).padStart(2, '0');
  } else if (sigHex.length === 130) {
    return sigHex;
  } else {
    // Unexpected — return as-is
    return sigHex;
  }
}

/**
 * Derive the EVM address from the OWS wallet without exposing the private key.
 */
export function getOWSEVMAddress(): string | null {
  try {
    const ows = getOWS();
    const wallet = ows.getWallet(OWS_WALLET_NAME);
    // Find Base account (chainId eip155:8453) or fall back to Ethereum
    const evmAccount = wallet.accounts.find((a: { chainId: string }) => a.chainId === 'eip155:8453') 
      ?? wallet.accounts.find((a: { chainId: string }) => a.chainId === 'eip155:1');
    return evmAccount?.address ?? null;
  } catch {
    return null;
  }
}

/**
 * Ensure OWS wallet exists. Creates it if not (with empty passphrase for automation).
 */
export function ensureOWSWallet(): { id: string; name: string; address: string } | null {
  try {
    const ows = getOWS();
    if (!ows) return null;
    const wallets = ows.listWallets();
    const existing = wallets.find((w: { name: string }) => w.name === OWS_WALLET_NAME);
    if (existing) {
      return existing;
    }
    const created = ows.createWallet(OWS_WALLET_NAME, OWS_WALLET_PASSPHRASE, 12);
    return created;
  } catch (e) {
    console.error('[OWS] Failed to ensure wallet:', e);
    return null;
  }
}
