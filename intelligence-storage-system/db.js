const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'intelligence.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Content Table
  db.run(`CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_url TEXT,
    content_text TEXT,
    category TEXT,
    tags TEXT,
    summary TEXT,
    insights TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    processed INTEGER DEFAULT 0
  )`);

  // Full Text Search Virtual Table
  db.run(`CREATE VIRTUAL TABLE IF NOT EXISTS content_fts USING fts5(
    content_text,
    summary,
    insights,
    tags,
    content='content',
    content_rowid='id'
  )`);

  // Triggers to keep FTS updated
  db.run(`CREATE TRIGGER IF NOT EXISTS content_ai AFTER INSERT ON content BEGIN
    INSERT INTO content_fts(rowid, content_text, summary, insights, tags) 
    VALUES (new.id, new.content_text, new.summary, new.insights, new.tags);
  END`);

  console.log("Database initialized.");
});

module.exports = db;
