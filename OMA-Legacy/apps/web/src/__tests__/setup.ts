import '@testing-library/jest-dom/vitest';
import { beforeAll, vi } from 'vitest';

global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

if (typeof window !== 'undefined') {
  window.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  window.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

beforeAll(async () => {
  if (typeof window !== 'undefined') {
    return;
  }

  const { db } = await import('@/lib/db');
  const { sql } = await import('drizzle-orm');
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      credits REAL DEFAULT 0 NOT NULL,
      role TEXT DEFAULT 'user' NOT NULL,
      profile JSONB,
      stripe_customer_id TEXT,
      solana_wallet_address TEXT,
      usdc_balance REAL DEFAULT 0 NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      icon TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS skills (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      tags JSONB DEFAULT '[]'::jsonb NOT NULL,
      capabilities JSONB DEFAULT '[]'::jsonb NOT NULL,
      pricing_type TEXT DEFAULT 'one-time' NOT NULL,
      price REAL NOT NULL,
      owner_id INTEGER NOT NULL REFERENCES users(id),
      downloads INTEGER DEFAULT 0 NOT NULL,
      rating REAL DEFAULT 0 NOT NULL,
      review_count INTEGER DEFAULT 0 NOT NULL,
      github_url TEXT,
      demo_url TEXT,
      documentation TEXT,
      metadata JSONB,
      status TEXT DEFAULT 'pending' NOT NULL,
      featured BOOLEAN DEFAULT false NOT NULL,
      verified BOOLEAN DEFAULT false NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      api_id INTEGER,
      skill_id INTEGER REFERENCES skills(id),
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      description TEXT,
      metadata JSONB,
      solana_tx_id TEXT,
      x402_signature TEXT,
      status TEXT DEFAULT 'pending' NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS skill_reviews (
      id SERIAL PRIMARY KEY,
      skill_id INTEGER NOT NULL REFERENCES skills(id),
      user_id INTEGER NOT NULL REFERENCES users(id),
      rating INTEGER NOT NULL,
      comment TEXT,
      verified BOOLEAN DEFAULT false NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS skill_downloads (
      id SERIAL PRIMARY KEY,
      skill_id INTEGER NOT NULL REFERENCES skills(id),
      user_id INTEGER NOT NULL REFERENCES users(id),
      transaction_id INTEGER REFERENCES transactions(id),
      download_url TEXT,
      expires_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS api_listings (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      endpoint_url TEXT,
      type TEXT DEFAULT 'api' NOT NULL,
      install_command TEXT,
      context_window INTEGER,
      pricing_type TEXT NOT NULL,
      price REAL NOT NULL,
      documentation TEXT,
      schema JSONB,
      capabilities JSONB DEFAULT '[]'::jsonb NOT NULL,
      tags JSONB DEFAULT '[]'::jsonb NOT NULL,
      metadata JSONB,
      status TEXT DEFAULT 'pending' NOT NULL,
      verified BOOLEAN DEFAULT false NOT NULL,
      featured BOOLEAN DEFAULT false NOT NULL,
      currency TEXT DEFAULT 'USDC' NOT NULL,
      owner_id INTEGER NOT NULL REFERENCES users(id),
      usage_count INTEGER DEFAULT 0 NOT NULL,
      rating REAL DEFAULT 0 NOT NULL,
      review_count INTEGER DEFAULT 0 NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      api_id INTEGER NOT NULL REFERENCES api_listings(id),
      rating INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      helpful_count INTEGER DEFAULT 0 NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS usage_records (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      api_id INTEGER NOT NULL REFERENCES api_listings(id),
      tokens_used INTEGER NOT NULL,
      cost REAL NOT NULL,
      duration INTEGER NOT NULL,
      status TEXT NOT NULL,
      error_message TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);
});
