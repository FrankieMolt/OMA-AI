#!/bin/bash
# Clear NOSYT sleep state to force it to run

DB_PATH="$HOME/.automaton/state.db"

if [ -f "$DB_PATH" ]; then
    echo "Clearing sleep state from database..."
    # Use node to clear the KV store since sqlite3 isn't available
    node -e "
    const Database = require('better-sqlite3');
    const db = new Database('$DB_PATH');
    const stmt = db.prepare('DELETE FROM kv_store WHERE key = ?');
    const result = stmt.run('sleep_until');
    console.log('Deleted', result.changes, 'sleep_until entries');
    db.close();
    "
    echo "✅ Sleep state cleared. Bot will run on next start."
else
    echo "❌ Database not found at $DB_PATH"
fi
