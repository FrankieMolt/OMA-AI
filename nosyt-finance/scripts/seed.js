const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../data/finance.db');
const db = new Database(dbPath);

console.log('Seeding database...\n');

// Default expense categories
const expenseCategories = [
  { name: 'Food & Dining', type: 'expense', color: '#ef4444', icon: 'utensils' },
  { name: 'Groceries', type: 'expense', color: '#f97316', icon: 'shopping-cart', parent_id: 1 },
  { name: 'Restaurants', type: 'expense', color: '#ea580c', icon: 'utensils', parent_id: 1 },
  { name: 'Transportation', type: 'expense', color: '#3b82f6', icon: 'car' },
  { name: 'Gas & Fuel', type: 'expense', color: '#2563eb', icon: 'fuel', parent_id: 4 },
  { name: 'Public Transit', type: 'expense', color: '#60a5fa', icon: 'bus', parent_id: 4 },
  { name: 'Housing', type: 'expense', color: '#8b5cf6', icon: 'home' },
  { name: 'Rent/Mortgage', type: 'expense', color: '#7c3aed', icon: 'home', parent_id: 7, budget_limit: 2000 },
  { name: 'Utilities', type: 'expense', color: '#a78bfa', icon: 'zap', parent_id: 7, budget_limit: 300 },
  { name: 'Entertainment', type: 'expense', color: '#ec4899', icon: 'film' },
  { name: 'Subscriptions', type: 'expense', color: '#f472b6', icon: 'tv', parent_id: 10, budget_limit: 200 },
  { name: 'Health & Fitness', type: 'expense', color: '#14b8a6', icon: 'heart' },
  { name: 'Shopping', type: 'expense', color: '#f59e0b', icon: 'shopping-bag' },
  { name: 'Clothing', type: 'expense', color: '#d97706', icon: 'shirt', parent_id: 13 },
  { name: 'Electronics', type: 'expense', color: '#b45309', icon: 'smartphone', parent_id: 13 },
  { name: 'Investments', type: 'expense', color: '#10b981', icon: 'trending-up' },
  { name: 'Savings', type: 'expense', color: '#059669', icon: 'piggy-bank', parent_id: 16 },
  { name: 'Crypto', type: 'expense', color: '#8b5cf6', icon: 'bitcoin', parent_id: 16 },
  { name: 'Insurance', type: 'expense', color: '#6366f1', icon: 'shield' },
  { name: 'Personal Care', type: 'expense', color: '#06b6d4', icon: 'scissors' },
  { name: 'Education', type: 'expense', color: '#3b82f6', icon: 'book' },
  { name: 'Travel', type: 'expense', color: '#0ea5e9', icon: 'plane' },
  { name: 'Gifts & Donations', type: 'expense', color: '#84cc16', icon: 'gift' },
  { name: 'Taxes', type: 'expense', color: '#64748b', icon: 'receipt' },
  { name: 'Fees & Charges', type: 'expense', color: '#94a3b8', icon: 'alert-circle' }
];

// Default income categories
const incomeCategories = [
  { name: 'Salary', type: 'income', color: '#10b981', icon: 'briefcase' },
  { name: 'Bonus', type: 'income', color: '#059669', icon: 'gift', parent_id: 1 },
  { name: 'Interest', type: 'income', color: '#22c55e', icon: 'percent' },
  { name: 'Dividends', type: 'income', color: '#16a34a', icon: 'trending-up', parent_id: 3 },
  { name: 'Investments', type: 'income', color: '#15803d', icon: 'bar-chart-2', parent_id: 3 },
  { name: 'Freelance', type: 'income', color: '#3b82f6', icon: 'code' },
  { name: 'Business', type: 'income', color: '#2563eb', icon: 'briefcase' },
  { name: 'Gifts', type: 'income', color: '#f59e0b', icon: 'gift' },
  { name: 'Refunds', type: 'income', color: '#d97706', icon: 'rotate-ccw' },
  { name: 'Other Income', type: 'income', color: '#6b7280', icon: 'plus-circle' }
];

// Default accounts
const accounts = [
  { name: 'Primary Checking', type: 'checking', balance: 3500.00, institution: 'Chase', currency: 'USD' },
  { name: 'Emergency Fund', type: 'savings', balance: 10000.00, interest_rate: 2.5, institution: 'Marcus', currency: 'USD' },
  { name: 'Freedom Flex', type: 'credit', balance: 450.00, credit_limit: 5000.00, institution: 'Chase', currency: 'USD' },
  { name: 'Robinhood Brokerage', type: 'investment', balance: 12500.00, institution: 'Robinhood', currency: 'USD' },
  { name: 'Coinbase Wallet', type: 'crypto', balance: 1200.00, institution: 'Coinbase', currency: 'USD' },
  { name: 'Cash Account', type: 'wallet', balance: 150.00, currency: 'USD' }
];

// Seed categories
console.log('Seeding categories...');
const insertCategory = db.prepare(`
  INSERT OR IGNORE INTO categories (name, type, color, icon, parent_id, budget_limit)
  VALUES (?, ?, ?, ?, ?, ?)
`);

expenseCategories.forEach(cat => {
  insertCategory.run(cat.name, cat.type, cat.color, cat.icon, cat.parent_id || null, cat.budget_limit || null);
});

incomeCategories.forEach(cat => {
  insertCategory.run(cat.name, cat.type, cat.color, cat.icon, cat.parent_id || null, cat.budget_limit || null);
});

console.log(`✅ Inserted ${expenseCategories.length + incomeCategories.length} categories`);

// Seed accounts
console.log('Seeding accounts...');
const insertAccount = db.prepare(`
  INSERT OR IGNORE INTO accounts (name, type, balance, credit_limit, interest_rate, institution, currency)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

accounts.forEach(acc => {
  insertAccount.run(
    acc.name, 
    acc.type, 
    acc.balance, 
    acc.credit_limit || null, 
    acc.interest_rate || null, 
    acc.institution || null, 
    acc.currency
  );
});

console.log(`✅ Inserted ${accounts.length} accounts`);

// Seed sample transactions
console.log('Seeding sample transactions...');
const currentDate = new Date().toISOString().split('T')[0];

const sampleTransactions = [
  { account_id: 1, category_id: 2, amount: 85.50, type: 'expense', description: 'Weekly groceries', payee: 'Whole Foods', date: currentDate },
  { account_id: 1, category_id: 5, amount: 45.00, type: 'expense', description: 'Gas fill-up', payee: 'Shell', date: currentDate },
  { account_id: 2, category_id: 17, amount: 500.00, type: 'expense', description: 'Emergency fund transfer', payee: 'Self', date: currentDate },
  { account_id: 4, category_id: 16, amount: 1000.00, type: 'expense', description: 'Stock purchase', payee: 'Robinhood', date: currentDate },
  { account_id: 1, category_id: 1, amount: 4500.00, type: 'income', description: 'Salary deposit', payee: 'Employer', date: currentDate },
];

const insertTransaction = db.prepare(`
  INSERT INTO transactions (account_id, category_id, amount, type, description, payee, transaction_date, cleared)
  VALUES (?, ?, ?, ?, ?, ?, ?, 1)
`);

sampleTransactions.forEach(t => {
  insertTransaction.run(t.account_id, t.category_id, t.amount, t.type, t.description, t.payee, t.date);
});

console.log(`✅ Inserted ${sampleTransactions.length} sample transactions`);

// Seed sample investments
console.log('Seeding sample investments...');
const sampleInvestments = [
  { account_id: 4, symbol: 'AAPL', name: 'Apple Inc.', asset_type: 'stock', quantity: 10, avg_cost_basis: 175.00, current_price: 185.00 },
  { account_id: 4, symbol: 'TSLA', name: 'Tesla Inc.', asset_type: 'stock', quantity: 5, avg_cost_basis: 220.00, current_price: 240.00 },
  { account_id: 4, symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', asset_type: 'etf', quantity: 20, avg_cost_basis: 225.00, current_price: 230.00 },
  { account_id: 5, symbol: 'BTC', name: 'Bitcoin', asset_type: 'crypto', quantity: 0.025, avg_cost_basis: 40000.00, current_price: 42000.00 },
  { account_id: 5, symbol: 'ETH', name: 'Ethereum', asset_type: 'crypto', quantity: 0.5, avg_cost_basis: 2200.00, current_price: 2400.00 }
];

const insertInvestment = db.prepare(`
  INSERT OR REPLACE INTO investments (account_id, symbol, name, asset_type, quantity, avg_cost_basis, current_price, last_price_update)
  VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
`);

sampleInvestments.forEach(inv => {
  insertInvestment.run(inv.account_id, inv.symbol, inv.name, inv.asset_type, inv.quantity, inv.avg_cost_basis, inv.current_price);
});

console.log(`✅ Inserted ${sampleInvestments.length} sample investments`);

// Seed sample goals
console.log('Seeding sample goals...');
const sampleGoals = [
  { name: 'Emergency Fund', target_amount: 20000, current_amount: 10000, deadline: '2025