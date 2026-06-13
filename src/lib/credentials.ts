/**
 * BYOK Credential Manager for OMA-AI
 * 
 * Retrieves and decrypts user-stored API keys for MCP calls.
 * Called at runtime when an MCP needs external API credentials.
 */

import { getCredentialForMCP } from '@/lib/db/sqlite';
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

function getEncryptionKey(): Buffer {
  const hex = process.env.CREDENTIAL_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
  return Buffer.from(hex, 'hex'); // hex string → 32 bytes
}

function deriveKey(walletAddress: string): Buffer {
  const key = getEncryptionKey();
  return crypto.pbkdf2Sync(walletAddress.toLowerCase(), key, 100_000, 32, 'sha256');
}

export interface EncryptedPayload {
  encrypted_value: string;
  iv: string;
  auth_tag: string;
}

export interface MCPCredentialMap {
  [field_name: string]: string;
}

export function encryptCredential(plaintext: string, walletAddress: string): EncryptedPayload {
  const key = deriveKey(walletAddress);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, { authTagLength: 16 });
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return {
    encrypted_value: encrypted.toString('base64'),
    iv: iv.toString('base64'),
    auth_tag: authTag.toString('base64'),
  };
}

export function decryptCredential(payload: EncryptedPayload, walletAddress: string): string | null {
  try {
    const key = deriveKey(walletAddress);
    const iv = Buffer.from(payload.iv, 'base64');
    const authTag = Buffer.from(payload.auth_tag, 'base64');
    const encrypted = Buffer.from(payload.encrypted_value, 'base64');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, { authTagLength: 16 });
    decipher.setAuthTag(authTag);
    return decipher.update(encrypted).toString('utf8') + decipher.final('utf8');
  } catch {
    return null;
  }
}

export function getCredentialsForMCP(walletAddress: string, mcpId: string): MCPCredentialMap {
  const rows = getCredentialForMCP(walletAddress, mcpId);
  const result: MCPCredentialMap = {};
  for (const row of rows) {
    const value = decryptCredential(
      { encrypted_value: row.encrypted_value, iv: row.iv, auth_tag: row.auth_tag },
      walletAddress
    );
    if (value !== null) {
      result[row.field_name] = value;
    }
  }
  return result;
}

export function validateAPIKey(key: string, fieldName: string): { valid: boolean; error?: string } {
  if (!key || key.trim().length === 0) return { valid: false, error: fieldName + ' cannot be empty' };
  if (key.length > 2048) return { valid: false, error: fieldName + ' exceeds maximum length (2048 chars)' };
  return { valid: true };
}
