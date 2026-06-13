/**
 * SQLite database layer using better-sqlite3.
 * Database file: .data/oma-ai.db
 * 
 * Schema:
 *   x402_transactions  — payment transactions log
 *   x402_nonces        — per-caller nonces used by EIP-3009
 *   mcp_servers        — MCP server registry with x402 config
 *   user_credentials   — BYOK: encrypted API keys per user per MCP
 */

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DATA_DIR = path.join(process.cwd(), '.data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, 'oma-ai.db');

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma('journal_mode = WAL');
    _db.pragma('foreign_keys = ON');
    migrate(_db);
  }
  return _db;
}

function migrate(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS x402_transactions (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      tx_hash     TEXT    UNIQUE,
      from_address TEXT  NOT NULL,
      to_address   TEXT  NOT NULL,
      amount      TEXT   NOT NULL,
      token       TEXT   NOT NULL,
      network     TEXT   NOT NULL,
      mcp_id      TEXT,
      status      TEXT   NOT NULL DEFAULT 'pending',
      created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at  INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS x402_nonces (
      nonce       TEXT    PRIMARY KEY,
      from_address TEXT  NOT NULL,
      used_at     INTEGER NOT NULL DEFAULT (unixepoch()),
      tx_hash     TEXT
    );

    CREATE TABLE IF NOT EXISTS mcp_servers (
      id          TEXT    PRIMARY KEY,
      name        TEXT    NOT NULL,
      description TEXT,
      price_per_call TEXT NOT NULL DEFAULT '0',
      enabled     INTEGER NOT NULL DEFAULT 1,
      created_at  INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS user_credentials (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id     TEXT    NOT NULL,
      mcp_id      TEXT    NOT NULL,
      field_name  TEXT    NOT NULL,
      encrypted_value TEXT NOT NULL,
      iv          TEXT    NOT NULL,
      auth_tag    TEXT    NOT NULL,
      created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at  INTEGER NOT NULL DEFAULT (unixepoch()),
      UNIQUE(user_id, mcp_id, field_name)
    );

    CREATE INDEX IF NOT EXISTS idx_tx_from      ON x402_transactions(from_address);
    CREATE INDEX IF NOT EXISTS idx_tx_status    ON x402_transactions(status);
    CREATE INDEX IF NOT EXISTS idx_nonce_used  ON x402_nonces(used_at);
    CREATE INDEX IF NOT EXISTS idx_cred_user    ON user_credentials(user_id);
    CREATE INDEX IF NOT EXISTS idx_cred_mcp     ON user_credentials(mcp_id);
  `);
}

// ─── Transaction helpers ──────────────────────────────────────────────────────

export interface DbTransaction {
  id: number;
  tx_hash: string | null;
  from_address: string;
  to_address: string;
  amount: string;
  token: string;
  network: string;
  mcp_id: string | null;
  status: string;
  created_at: number;
  updated_at: number;
}

export function insertTransaction(tx: {
  tx_hash?: string;
  from_address: string;
  to_address: string;
  amount: string;
  token: string;
  network: string;
  mcp_id?: string;
  status?: string;
}): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO x402_transactions (tx_hash, from_address, to_address, amount, token, network, mcp_id, status)
    VALUES (@tx_hash, @from_address, @to_address, @amount, @token, @network, @mcp_id, @status)
  `).run({ ...tx, tx_hash: tx.tx_hash ?? null, mcp_id: tx.mcp_id ?? null, status: tx.status ?? 'pending' });
}

export function updateTransactionStatus(txHash: string, status: string): void {
  const db = getDb();
  db.prepare(`UPDATE x402_transactions SET status = ?, updated_at = unixepoch() WHERE tx_hash = ?`).run(status, txHash);
}

export function getTransactions(limit = 50, offset = 0): DbTransaction[] {
  const db = getDb();
  return db.prepare(`SELECT * FROM x402_transactions ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(limit, offset) as DbTransaction[];
}

export function getTransactionByHash(txHash: string): DbTransaction | null {
  const db = getDb();
  return (db.prepare(`SELECT * FROM x402_transactions WHERE tx_hash = ?`).get(txHash) as DbTransaction | null) ?? null;
}

// ─── Nonce helpers ────────────────────────────────────────────────────────────

export function isNonceUsed(nonce: string): boolean {
  const db = getDb();
  return !!db.prepare(`SELECT 1 FROM x402_nonces WHERE nonce = ?`).get(nonce);
}

export function markNonceUsed(nonce: string, fromAddress: string, txHash?: string): void {
  const db = getDb();
  db.prepare(`INSERT OR IGNORE INTO x402_nonces (nonce, from_address, tx_hash) VALUES (?, ?, ?)`).run(nonce, fromAddress.toLowerCase(), txHash ?? null);
}

// ─── MCP server helpers ───────────────────────────────────────────────────────

export interface DbMCPServer {
  id: string;
  name: string;
  description: string | null;
  price_per_call: string;
  enabled: number;
  created_at: number;
}

export function getMCPServers(): DbMCPServer[] {
  const db = getDb();
  return db.prepare(`SELECT * FROM mcp_servers WHERE enabled = 1 ORDER BY name`).all() as DbMCPServer[];
}

export function upsertMCPServer(server: { id: string; name: string; description?: string; price_per_call?: string }): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO mcp_servers (id, name, description, price_per_call)
    VALUES (@id, @name, @description, @price_per_call)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      description = COALESCE(excluded.description, mcp_servers.description),
      price_per_call = COALESCE(excluded.price_per_call, mcp_servers.price_per_call)
  `).run({ id: server.id, name: server.name, description: server.description ?? null, price_per_call: server.price_per_call ?? '0' });
}

// ─── User credential helpers (BYOK) ──────────────────────────────────────────

export interface DbCredential {
  id: number;
  user_id: string;
  mcp_id: string;
  field_name: string;
  encrypted_value: string;
  iv: string;
  auth_tag: string;
  created_at: number;
  updated_at: number;
}

export interface CredentialSummary {
  mcp_id: string;
  field_name: string;
  has_key: boolean;
  updated_at: number;
}

export function upsertCredential(cred: {
  user_id: string;
  mcp_id: string;
  field_name: string;
  encrypted_value: string;
  iv: string;
  auth_tag: string;
}): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO user_credentials (user_id, mcp_id, field_name, encrypted_value, iv, auth_tag)
    VALUES (@user_id, @mcp_id, @field_name, @encrypted_value, @iv, @auth_tag)
    ON CONFLICT(user_id, mcp_id, field_name) DO UPDATE SET
      encrypted_value = excluded.encrypted_value,
      iv = excluded.iv,
      auth_tag = excluded.auth_tag,
      updated_at = unixepoch()
  `).run(cred);
}

export function getUserCredentials(userId: string): CredentialSummary[] {
  const db = getDb();
  return db.prepare(`
    SELECT mcp_id, field_name, updated_at, 1 as has_key
    FROM user_credentials WHERE user_id = ?
  `).all(userId) as CredentialSummary[];
}

export function getCredentialForMCP(userId: string, mcpId: string): DbCredential[] {
  const db = getDb();
  return db.prepare(`SELECT * FROM user_credentials WHERE user_id = ? AND mcp_id = ?`).all(userId, mcpId) as DbCredential[];
}

export function deleteCredential(userId: string, mcpId: string, fieldName: string): void {
  const db = getDb();
  db.prepare(`DELETE FROM user_credentials WHERE user_id = ? AND mcp_id = ? AND field_name = ?`).run(userId, mcpId, fieldName);
}

export function getUserCredentialCount(userId: string): number {
  const db = getDb();
  const row = db.prepare(`SELECT count(*) as c FROM user_credentials WHERE user_id = ?`).get(userId) as { c: number };
  return row.c;
}
