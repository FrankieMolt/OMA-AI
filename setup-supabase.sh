#!/bin/bash
# Create Supabase tables from schema.sql

echo "🔧 Creating Supabase tables..."

# Read schema.sql and execute
psql "$DATABASE_URL" < schema.sql 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Tables created successfully"
else
    echo "❌ Failed to create tables"
    exit 1
fi
