#!/usr/bin/env python3
"""
OMA-AI Database Migration: SQLite → Supabase (PostgreSQL)
Handles data migration, schema updates, and production configuration.
"""

import os
import sys
import json
import sqlite3
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DatabaseMigrator:
    def __init__(self):
        # Source: SQLite
        self.sqlite_path = "backend/db/oma.db"
        
        # Target: Supabase PostgreSQL
        # Try both SUPABASE_URL and SUPABASE_SERVICE_KEY for flexibility
        self.supabase_url = os.getenv("SUPABASE_URL", os.getenv("SUPABASE_SERVICE_KEY"))
        self.supabase_key = os.getenv("SUPABASE_SERVICE_KEY", os.getenv("SUPABASE_URL"))
        
        # Fallback for parsing
        self.parsed_url = None
        if self.supabase_url:
            # Extract host and database from URL
            # Format: postgresql://user:password@host:port/db
            try:
                # Remove protocol
                clean_url = self.supabase_url.replace("postgresql://", "")
                # Split into parts
                if "@" in clean_url:
                    # Format: user:password@host:port/db
                    parts = clean_url.split("@")
                    user = parts[0] if len(parts) > 1 else "postgres"
                    password = parts[1] if len(parts) > 2 else ""
                    # Split host:port/db
                    host_db = parts[1].split(":")
                    host = host_db[0] if len(host_db) > 1 else host_db[1]
                    port = host_db[1].split(":")[1] if len(host_db) > 1 else "5432"
                    db = host_db[1].split(":")[0] if len(host_db) > 1 else "postgres"
                    self.parsed_url = f"postgresql://{user}:{password}@{host}:{port}/{db}"
                except:
                    self.parsed_url = None
                    logger.warning(f"Could not parse Supabase URL: {self.supabase_url}")
    
    def get_sqlite_connection(self):
        """Get SQLite connection"""
        import sqlite3
        os.makedirs(os.path.dirname(self.sqlite_path), exist_ok=True)
        conn = sqlite3.connect(self.sqlite_path)
        conn.row_factory = sqlite3.Row
        return conn
    
    def get_supabase_connection(self):
        """Get Supabase PostgreSQL connection"""
        if not self.parsed_url:
            logger.error("❌ Supabase URL could not be parsed. Please check format.")
            raise ValueError("Invalid Supabase URL format")
        
        # Extract connection parameters
        try:
            clean_url = self.supabase_url.replace("postgresql://", "")
            parts = clean_url.split("@")
            user = parts[0] if len(parts) > 1 else "postgres"
            password = parts[1] if len(parts) > 2 else ""
            
            host_db = parts[1].split(":")
            host = host_db[0] if len(host_db) > 1 else host_db[1]
            port = host_db[1].split(":")[1] if len(host_db) > 1 else "5432"
            db = host_db[1].split(":")[0] if len(host_db) > 1 else "postgres"
        except:
            logger.error(f"❌ Could not parse Supabase URL: {self.supabase_url}")
            raise ValueError("Invalid Supabase URL format")
        
        # Construct connection string
        # Using both url and key as fallback
        # postgresql://postgres:[PASSWORD]@host:port/database
        conn_string = f"postgresql://{user}:{password}@{host}:{port}/{db}"
        
        logger.info(f"Connecting to Supabase: {host}:{port}/{db}")
        
        try:
            conn = psycopg2.connect(conn_string)
            logger.info("✅ Connected to Supabase")
            return conn
        except Exception as e:
            logger.error(f"❌ Failed to connect to Supabase: {e}")
            raise
    
    def create_supabase_schema(self, conn):
        """Create Supabase schema with PostgreSQL optimizations"""
        with conn.cursor() as cursor:
            # Extensions
            cursor.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
            cursor.execute("CREATE EXTENSION IF NOT EXISTS \"pgcrypto\";")
            
            # Drop existing tables (clean start)
            cursor.execute("DROP TABLE IF EXISTS transactions CASCADE;")
            cursor.execute("DROP TABLE IF EXISTS bounties CASCADE;")
            cursor.execute("DROP TABLE IF EXISTS agents CASCADE;")
            cursor.execute("DROP TABLE IF EXISTS services CASCADE;")
            
            # Agents table (PostgreSQL optimized)
            cursor.execute("""
                CREATE TABLE agents (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    name TEXT NOT NULL,
                    status TEXT NOT NULL DEFAULT 'inactive',
                    wallet TEXT,
                    balance DECIMAL(15,8) DEFAULT 0.0,
                    daily_rent DECIMAL(15,8) DEFAULT 1.0,
                    daily_revenue DECIMAL(15,8) DEFAULT 0.0,
                    capabilities JSONB DEFAULT '[]'::jsonb,
                    parent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
                    children JSONB DEFAULT '[]'::jsonb,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    total_earned DECIMAL(15,8) DEFAULT 0.0,
                    total_paid DECIMAL(15,8) DEFAULT 0.0
                );
            """)
            
            # Services table
            cursor.execute("""
                CREATE TABLE services (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    name TEXT NOT NULL,
                    description TEXT,
                    type TEXT NOT NULL DEFAULT 'api',
                    price DECIMAL(15,8) NOT NULL DEFAULT 0.01,
                    capabilities JSONB DEFAULT '[]'::jsonb,
                    seller_wallet TEXT NOT NULL,
                    x402_endpoint TEXT,
                    status TEXT DEFAULT 'active',
                    total_sales INTEGER DEFAULT 0,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
            """)
            
            # Transactions table
            cursor.execute("""
                CREATE TABLE transactions (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    type TEXT NOT NULL,
                    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
                    agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
                    amount DECIMAL(15,8) NOT NULL DEFAULT 0.0,
                    from_wallet TEXT,
                    to_wallet TEXT,
                    status TEXT DEFAULT 'completed',
                    proof JSONB DEFAULT '{}'::jsonb,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
            """)
            
            # Bounties table
            cursor.execute("""
                CREATE TABLE bounties (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    title TEXT NOT NULL,
                    description TEXT,
                    amount DECIMAL(15,8) NOT NULL DEFAULT 0.0,
                    status TEXT DEFAULT 'open',
                    creator_id UUID REFERENCES agents(id) ON DELETE SET NULL,
                    claimed_by UUID REFERENCES agents(id) ON DELETE SET NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
            """)
            
            # Indexes for performance
            cursor.execute("CREATE INDEX idx_agents_status ON agents(status);")
            cursor.execute("CREATE INDEX idx_agents_parent_id ON agents(parent_id);")
            cursor.execute("CREATE INDEX idx_services_type ON services(type);")
            cursor.execute("CREATE INDEX idx_services_seller_wallet ON services(seller_wallet);")
            cursor.execute("CREATE INDEX idx_transactions_type ON transactions(type);")
            cursor.execute("CREATE INDEX idx_transactions_from_wallet ON transactions(from_wallet);")
            cursor.execute("CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);")
            cursor.execute("CREATE INDEX idx_bounties_status ON bounties(status);")
            cursor.execute("CREATE INDEX idx_bounties_creator_id ON bounties(creator_id);")
            
            # Enable Row Level Security
            cursor.execute("ALTER TABLE agents ENABLE ROW LEVEL SECURITY;")
            cursor.execute("ALTER TABLE services ENABLE ROW LEVEL SECURITY;")
            cursor.execute("ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;")
            cursor.execute("ALTER TABLE bounties ENABLE ROW LEVEL SECURITY;")
            
            conn.commit()
            logger.info("✅ Supabase schema created successfully")
    
    def migrate_data(self, sqlite_conn, pg_conn):
        """Migrate data from SQLite to PostgreSQL"""
        
        with sqlite_conn:
            # Migrate agents
            sqlite_agents = sqlite_conn.execute("SELECT * FROM agents").fetchall()
            for agent in sqlite_agents:
                agent_data = dict(agent)
                cursor.execute("""
                    INSERT INTO agents (
                        id, name, status, wallet, balance, daily_rent, daily_revenue,
                        capabilities, parent_id, children, created_at,
                        total_earned, total_paid
                    ) VALUES (
                        gen_random_uuid(), %s, %s, %s, %s, %s,
                        %s, %s, %s, %s,
                        json.dumps([c.get('name', 'inactive')]),
                        json.dumps([c.get('wallet')]),
                        float(c.get('balance', 0.0)),
                        float(c.get('daily_rent', 1.0)),
                        float(c.get('daily_revenue', 0.0)),
                        json.dumps(c.get('capabilities', '[]')),
                        c.get('parent_id'),
                        json.dumps(c.get('children', '[]')),
                        c.get('created_at'),
                        float(c.get('total_earned', 0.0)),
                        float(c.get('total_paid', 0.0))
                    )
                """)
                logger.info(f"✅ Migrated {len(sqlite_agents)} agents")
                
                # Migrate services
            sqlite_services = sqlite_conn.execute("SELECT * FROM services").fetchall()
            for service in sqlite_services:
                service_data = dict(service)
                cursor.execute("""
                    INSERT INTO services (
                        id, name, description, type, price, capabilities,
                        seller_wallet, x402_endpoint, status, total_sales, created_at
                    ) VALUES (
                        gen_random_uuid(),
                        service_data['name'],
                        service_data.get('description'),
                        service_data.get('type', 'api'),
                        float(service_data.get('price', 0.01)),
                        json.dumps(service_data.get('capabilities', '[]')),
                        service_data.get('seller_wallet'),
                        service_data.get('x402_endpoint'),
                        service_data.get('status', 'active'),
                        int(service_data.get('total_sales', 0)),
                        service_data.get('created_at')
                    )
                """)
                logger.info(f"✅ Migrated {len(sqlite_services)} services")
                
                # Migrate transactions
            sqlite_txs = sqlite_conn.execute("SELECT * FROM transactions").fetchall()
            for tx in sqlite_txs:
                tx_data = dict(tx)
                cursor.execute("""
                    INSERT INTO transactions (
                        id, type, service_id, agent_id, amount,
                        from_wallet, to_wallet, status, proof, created_at
                    ) VALUES (
                        gen_random_uuid(),
                        tx_data.get('type'),
                        tx_data.get('service_id'),
                        tx_data.get('agent_id'),
                        float(tx_data.get('amount', 0.0)),
                        tx_data.get('from_wallet'),
                        tx_data.get('to_wallet'),
                        tx_data.get('status', 'completed'),
                        json.dumps(tx_data.get('proof', '{}')),
                        tx_data.get('timestamp')
                    )
                """)
                logger.info(f"✅ Migrated {len(sqlite_txs)} transactions")
                
                # Migrate bounties
                sqlite_bounties = sqlite_conn.execute("SELECT * FROM bounties").fetchall()
            for bounty in sqlite_bounties:
                bounty_data = dict(bounty)
                cursor.execute("""
                    INSERT INTO bounties (
                        id, title, description, amount, status,
                        creator_id, claimed_by, created_at
                    ) VALUES (
                        gen_random_uuid(),
                        bounty_data.get('title'),
                        bounty_data.get('description'),
                        float(bounty_data.get('amount', 0.0)),
                        bounty_data.get('status', 'open'),
                        bounty_data.get('creator'),
                        bounty_data.get('claimed_by'),
                        bounty_data.get('created_at')
                    )
                """)
                logger.info(f"✅ Migrated {len(sqlite_bounties)} bounties")
                
                pg_conn.commit()
                logger.info("✅ Data migration completed successfully")
    
    def run_migration(self):
        """Execute complete migration"""
        logger.info("🚀 Starting OMA-AI Database Migration: SQLite → Supabase")
        
        try:
            # Connect to source
            sqlite_conn = self.get_sqlite_connection()
            logger.info("✅ Connected to SQLite database")
            
            # Connect to target
            pg_conn = self.get_supabase_connection()
            
            # Create schema
            self.create_supabase_schema(pg_conn)
            
            # Migrate data
            self.migrate_data(sqlite_conn, pg_conn)
            
            # Verify migration
            with pg_conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute("SELECT COUNT(*) as agents FROM agents;")
                agents_count = cursor.fetchone()['agents']
                cursor.execute("SELECT COUNT(*) as services FROM services;")
                services_count = cursor.fetchone()['services']
                cursor.execute("SELECT COUNT(*) as transactions FROM transactions;")
                tx_count = cursor.fetchone()['transactions']
                
                logger.info(f"✅ Migration Verification:")
                logger.info(f"   Agents: {agents_count}")
                logger.info(f"   Services: {services_count}")
                logger.info(f"   Transactions: {tx_count}")
            
            sqlite_conn.close()
            pg_conn.close()
            
            logger.info("🎉 Database migration completed successfully!")
            return True
            
        except Exception as e:
            logger.error(f"❌ Migration failed: {e}")
            return False

if __name__ == "__main__":
    # Check environment variables
    # Support both variable names for compatibility
    
    # Run migration
    migrator = DatabaseMigrator()
    success = migrator.run_migration()
    
    if success:
        # Create production .env file
        env_content = f"""# OMA-AI Production Environment
# Database
SUPABASE_URL={os.getenv('SUPABASE_URL')}
SUPABASE_SERVICE_KEY={os.getenv('SUPABASE_SERVICE_KEY')}
DATABASE_URL={os.getenv('SUPABASE_URL')}
API_PUBLIC_URL=https://oma-ai.com
API_PRIVATE_URL=http://localhost:9001

# API
API_PUBLIC_URL=https://oma-ai.com
API_PRIVATE_URL=http://localhost:9001

# x402 Payments
X402_SECRET={os.getenv('X402_SECRET', 'dev-secret')}
X402_NETWORK=base

# Security
JWT_SECRET={os.getenv('JWT_SECRET', 'change-in-production')}
CORS_ORIGINS=https://oma-ai.com,https://api.oma-ai.com,http://localhost:3000

# Update frontend API endpoints to production
with open("/home/nosyt/FrankieMolt/frontend/.env.production", "w") as f:
            # Read existing content
            content = f.read()
            # Replace localhost URLs with production URL
            updated_content = content.replace("http://localhost:9001", "https://api.oma-ai.com")
            # Rewrite file
            f.write(updated_content)
        
        logger.info("✅ Production .env file created")
        print("\\n🎉 Database migration complete! Next steps:")
        print("1. Deploy backend to Vercel/Cloudflare")
        print("2. Set environment variables in Vercel dashboard")
        print("3. Update frontend API endpoints to production")
        print("4. Test all functionality")
        print("\\nLive URL: https://oma-ai.com (deploying...)")
