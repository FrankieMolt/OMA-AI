const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../data/finance.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Create tables
const migrations = [
  // Accounts table
  `CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('checking', 'savings', 'credit', 'investment', 'crypto', 'wallet')),
    currency TEXT DEFAULT 'USD',
    balance REAL DEFAULT 0,
    credit_limit REAL,
    interest_rate REAL,
    institution TEXT,
    account_number TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,

  // Categories table
  `CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('income', 'expense', 'transfer')),
    color TEXT DEFAULT '#3b82f6',
    icon TEXT DEFAULT 'circle',
    parent_id INTEGER,
    budget_limit REAL,
    is_active BOOLEAN DEFAULT 1,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
  )`,

  // Transactions table
  `CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL,
    category_id INTEGER,
    amount REAL NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('income', 'expense', 'transfer')),
    description TEXT,
    payee TEXT,
    transaction_date DATE NOT NULL,
    cleared BOOLEAN DEFAULT 0,
    reconciled BOOLEAN DEFAULT 0,
    imported_from TEXT,
    import_id TEXT,
    tags TEXT,
    notes TEXT,
    attachments TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )`,

  // Budgets table
  `CREATE TABLE IF NOT EXISTS budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    period TEXT NOT NULL CHECK(period IN ('daily', 'weekly', 'monthly', 'yearly')),
    start_date DATE NOT NULL,
    end_date DATE,
    rollover BOOLEAN DEFAULT 0,
    alert_threshold REAL,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )`,

  // Investments table
  `CREATE TABLE IF NOT EXISTS investments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL,
    symbol TEXT NOT NULL,
    name TEXT,
    asset_type TEXT NOT NULL CHECK(asset_type IN ('stock', 'crypto', 'etf', 'bond', 'mutual_fund', 'commodity')),
    quantity REAL NOT NULL,
    avg_cost_basis REAL NOT NULL,
    current_price REAL,
    last_price_update DATETIME,
    currency TEXT DEFAULT 'USD',
    exchange TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
  )`,

  // Price history table
  `CREATE TABLE IF NOT EXISTS price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT NOT NULL,
    asset_type TEXT NOT NULL,
    price REAL NOT NULL,
    volume REAL,
    high_24h REAL,
    low_24h REAL,
    change_24h REAL,
    change_percent_24h REAL,
    market_cap REAL,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,

  // Goals table
  `CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    target_amount REAL NOT NULL,
    current_amount REAL DEFAULT 0,
    deadline DATE,
    priority INTEGER DEFAULT 3,
    category_id INTEGER,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )`,

  // Imports table
  `CREATE TABLE IF NOT EXISTS imports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT,
    file_hash TEXT UNIQUE,
    source TEXT,
    format TEXT,
    total_rows INTEGER,
    imported_rows INTEGER,
    error_rows INTEGER,
    mapping_config TEXT,
    status TEXT DEFAULT 'pending',
    error_log TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME
  )`,

  // Chat sessions table
  `CREATE TABLE IF NOT EXISTS chat_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    context TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,

  // Chat messages table
  `CREATE TABLE IF NOT EXISTS chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    executed_query TEXT,
    query_results TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
  )`,

  // Widgets/Embed config
  `CREATE TABLE IF NOT EXISTS widgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('chart', 'summary', 'list', 'gauge')),
    config TEXT NOT NULL,
    is_public BOOLEAN DEFAULT 0,
    embed_token TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`
];

// Execute migrations
console.log('Running migrations...');
migrations.forEach((sql, index) => {
  try {
    db.exec(sql);
    console.log(`✅ Migration ${index + 1} completed`);
  } catch (err) {
    console.error(`❌ Migration ${index + 1} failed:`, err.message);
    process.exit(1);
  }
});

// Create indexes
const indexes = [
  'CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date)',
  'CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account_id)',
  'CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category_id)',
  'CREATE INDEX IF NOT EXISTS idx_price_symbol ON price_history(symbol)',
  'CREATE INDEX IF NOT EXISTS idx_investments_account ON investments(account_id)',
  'CREATE INDEX IF NOT EXISTS idx_investments_symbol ON investments(symbol)'
];

indexes.forEach((sql, index) => {
  try {
    db.exec(sql);
    console.log(`✅ Index ${index + 1} created`);
  } catch (err) {
    console.error(`❌ Index ${index + 1} failed:`, err.message);
  }
});

console.log('\n✅ All migrations completed!');
db.close();
