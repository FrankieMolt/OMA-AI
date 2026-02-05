"""
OMA-AI Production Database Module
Supports both SQLite (development) and Supabase PostgreSQL (production)
"""

import os
import json
import logging
from typing import Dict, List, Optional
from datetime import datetime
from abc import ABC, abstractmethod

logger = logging.getLogger('oma-ai.db')

class DatabaseInterface(ABC):
    """Abstract interface for database operations"""
    
    @abstractmethod
    def create_agent(self, agent_data: Dict) -> Dict:
        pass
    
    @abstractmethod
    def get_agents(self) -> List[Dict]:
        pass
    
    @abstractmethod
    def get_agent(self, agent_id: str) -> Optional[Dict]:
        pass
    
    @abstractmethod
    def update_agent_balance(self, agent_id: str, amount: float):
        pass
    
    @abstractmethod
    def get_services(self) -> List[Dict]:
        pass
    
    @abstractmethod
    def add_service(self, service_data: Dict) -> Dict:
        pass
    
    @abstractmethod
    def record_transaction(self, tx_data: Dict):
        pass
    
    @abstractmethod
    def get_stats(self) -> Dict:
        pass

class SQLiteDatabase(DatabaseInterface):
    """SQLite database implementation (development)"""
    
    def __init__(self, db_path="backend/db/oma.db"):
        import sqlite3
        self.db_path = db_path
        self._init_db()
        self._seed_defaults()
    
    def _get_conn(self):
        import sqlite3
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn
    
    def _init_db(self):
        conn = self._get_conn()
        c = conn.cursor()
        
        # SQLite schema (existing)
        c.execute('''CREATE TABLE IF NOT EXISTS agents (
            id TEXT PRIMARY KEY,
            name TEXT,
            status TEXT,
            wallet TEXT,
            balance REAL,
            daily_rent REAL,
            daily_revenue REAL,
            capabilities TEXT,
            parent_id TEXT,
            children TEXT,
            created_at TEXT,
            total_earned REAL,
            total_paid REAL
        )''')
        
        c.execute('''CREATE TABLE IF NOT EXISTS services (
            id TEXT PRIMARY KEY,
            name TEXT,
            description TEXT,
            type TEXT,
            price REAL,
            capabilities TEXT,
            seller_wallet TEXT,
            x402_endpoint TEXT,
            status TEXT,
            total_sales INTEGER,
            created_at TEXT
        )''')
        
        c.execute('''CREATE TABLE IF NOT EXISTS transactions (
            id TEXT PRIMARY KEY,
            type TEXT,
            service_id TEXT,
            agent_id TEXT,
            amount REAL,
            from_wallet TEXT,
            to_wallet TEXT,
            status TEXT,
            timestamp TEXT,
            proof TEXT
        )''')
        
        conn.commit()
        conn.close()
    
    def _seed_defaults(self):
        """Seed default services if empty"""
        if not self.get_services():
            api_base = os.environ.get("API_PUBLIC_URL", "http://localhost:8000")
            defaults = [
                {
                    "id": "svc-1", "name": "Text Generation API", "description": "High-quality text generation",
                    "type": "api", "price": 0.01, "capabilities": ["text-generation", "coding"],
                    "seller_wallet": "0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5",
                    "x402_endpoint": f"{api_base}/api/generate", "status": "active"
                }
            ]
            for d in defaults:
                self.add_service(d)
    
    def create_agent(self, agent_data: Dict) -> Dict:
        conn = self._get_conn()
        c = conn.cursor()
        agent_id = f"agt-{int(datetime.now().timestamp())}"
        
        agent = {
            "id": agent_id,
            "name": agent_data.get("name", f"Agent-{agent_id}"),
            "status": "alive",
            "wallet": agent_data.get("wallet", f"0x{agent_id.replace('-', '')}"),
            "balance": agent_data.get("balance", 10.0),
            "daily_rent": 1.0,
            "daily_revenue": 2.0,
            "capabilities": json.dumps(agent_data.get("capabilities", [])),
            "parent_id": agent_data.get("parent_id"),
            "children": json.dumps([]),
            "created_at": datetime.now().isoformat(),
            "total_earned": 0.0,
            "total_paid": 0.0
        }
        
        c.execute('''INSERT INTO agents VALUES (
            :id, :name, :status, :wallet, :balance, :daily_rent, :daily_revenue, 
            :capabilities, :parent_id, :children, :created_at, :total_earned, :total_paid
        )''', agent)
        conn.commit()
        conn.close()
        
        agent["capabilities"] = json.loads(agent["capabilities"])
        agent["children"] = json.loads(agent["children"])
        return agent
    
    def get_agents(self) -> List[Dict]:
        conn = self._get_conn()
        agents = conn.execute("SELECT * FROM agents").fetchall()
        conn.close()
        return [dict(a) for a in agents]
    
    def get_agent(self, agent_id: str) -> Optional[Dict]:
        conn = self._get_conn()
        agent = conn.execute("SELECT * FROM agents WHERE id = ?", (agent_id,)).fetchone()
        conn.close()
        if agent:
            d = dict(agent)
            d["capabilities"] = json.loads(d["capabilities"] or "[]")
            d["children"] = json.loads(d["children"] or "[]")
            return d
        return None
    
    def update_agent_balance(self, agent_id: str, amount: float):
        conn = self._get_conn()
        c = conn.cursor()
        c.execute("UPDATE agents SET balance = balance + ? WHERE id = ?", (amount, agent_id))
        if amount > 0:
            c.execute("UPDATE agents SET total_earned = total_earned + ? WHERE id = ?", (amount, agent_id))
        else:
            c.execute("UPDATE agents SET total_paid = total_paid + ? WHERE id = ?", (abs(amount), agent_id))
        conn.commit()
        conn.close()
    
    def get_services(self) -> List[Dict]:
        conn = self._get_conn()
        services = conn.execute("SELECT * FROM services").fetchall()
        conn.close()
        res = []
        for s in services:
            d = dict(s)
            d["capabilities"] = json.loads(d["capabilities"] or "[]")
            res.append(d)
        return res
    
    def add_service(self, service_data: Dict) -> Dict:
        conn = self._get_conn()
        c = conn.cursor()
        service_id = service_data.get("id") or f"svc-{int(datetime.now().timestamp())}"
        
        service = {
            "id": service_id,
            "name": service_data.get("name"),
            "description": service_data.get("description"),
            "type": service_data.get("type", "api"),
            "price": float(service_data.get("price", 0.01)),
            "capabilities": json.dumps(service_data.get("capabilities", [])),
            "seller_wallet": service_data.get("seller_wallet"),
            "x402_endpoint": service_data.get("x402_endpoint"),
            "status": "active",
            "total_sales": 0,
            "created_at": datetime.now().isoformat()
        }
        
        c.execute('''INSERT INTO services VALUES (
            :id, :name, :description, :type, :price, :capabilities, 
            :seller_wallet, :x402_endpoint, :status, :total_sales, :created_at
        )''', service)
        conn.commit()
        conn.close()
        
        service["capabilities"] = json.loads(service["capabilities"])
        return service
    
    def record_transaction(self, tx_data: Dict):
        conn = self._get_conn()
        c = conn.cursor()
        tx_id = f"tx-{int(datetime.now().timestamp())}-{os.urandom(2).hex()}"
        
        tx = {
            "id": tx_id,
            "type": tx_data.get("type"),
            "service_id": tx_data.get("service_id"),
            "agent_id": tx_data.get("agent_id"),
            "amount": tx_data.get("amount", 0.0),
            "from_wallet": tx_data.get("from_wallet"),
            "to_wallet": tx_data.get("to_wallet"),
            "status": tx_data.get("status", "completed"),
            "timestamp": datetime.now().isoformat(),
            "proof": json.dumps(tx_data.get("proof", {}))
        }
        
        c.execute('''INSERT INTO transactions VALUES (
            :id, :type, :service_id, :agent_id, :amount, :from_wallet, 
            :to_wallet, :status, :timestamp, :proof
        )''', tx)
        conn.commit()
        conn.close()
        return tx
    
    def get_stats(self) -> Dict:
        conn = self._get_conn()
        total_agents = conn.execute("SELECT COUNT(*) FROM agents").fetchone()[0]
        alive_agents = conn.execute("SELECT COUNT(*) FROM agents WHERE status='alive'").fetchone()[0]
        total_services = conn.execute("SELECT COUNT(*) FROM services").fetchone()[0]
        total_tx = conn.execute("SELECT COUNT(*) FROM transactions").fetchone()[0]
        
        balances = conn.execute("SELECT SUM(balance), SUM(total_earned), SUM(total_paid) FROM agents").fetchone()
        
        conn.close()
        
        return {
            "total_agents": total_agents,
            "alive_agents": alive_agents,
            "total_services": total_services,
            "total_transactions": total_tx,
            "total_balance": round(balances[0] or 0.0, 4),
            "total_earned": round(balances[1] or 0.0, 4),
            "total_paid": round(balances[2] or 0.0, 4)
        }

class SupabaseDatabase(DatabaseInterface):
    """Supabase PostgreSQL implementation (production)"""
    
    def __init__(self):
        import psycopg2
        from psycopg2.extras import RealDictCursor
        
        self.supabase_url = os.getenv("DATABASE_URL")
        if not self.supabase_url:
            raise ValueError("DATABASE_URL environment variable required")
        
        # Initialize connection
        self.conn = psycopg2.connect(self.supabase_url)
        self.conn.autocommit = True
    
    def _execute_query(self, query: str, params=None):
        """Execute a query and return results"""
        from psycopg2.extras import RealDictCursor
        with self.conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, params or ())
            if cursor.description:
                return [dict(row) for row in cursor.fetchall()]
            return []
    
    def _execute_single(self, query: str, params=None):
        """Execute query and return single result"""
        from psycopg2.extras import RealDictCursor
        with self.conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, params or ())
            result = cursor.fetchone()
            return dict(result) if result else None
    
    def create_agent(self, agent_data: Dict) -> Dict:
        query = """
            INSERT INTO agents (
                name, status, wallet, balance, daily_rent, daily_revenue,
                capabilities, parent_id, children
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s
            ) RETURNING *
        """
        result = self._execute_single(query, (
            agent_data.get("name", f"Agent-{datetime.now().timestamp()}"),
            "alive",
            agent_data.get("wallet"),
            float(agent_data.get("balance", 10.0)),
            1.0,  # daily_rent
            2.0,  # daily_revenue
            agent_data.get("capabilities", []),
            agent_data.get("parent_id"),
            []  # children
        ))
        return result
    
    def get_agents(self) -> List[Dict]:
        return self._execute_query("SELECT * FROM agents ORDER BY created_at DESC")
    
    def get_agent(self, agent_id: str) -> Optional[Dict]:
        return self._execute_single("SELECT * FROM agents WHERE id = %s", (agent_id,))
    
    def update_agent_balance(self, agent_id: str, amount: float):
        query = """
            UPDATE agents 
            SET balance = balance + %s,
                total_earned = CASE WHEN %s > 0 THEN total_earned + %s ELSE total_earned END,
                total_paid = CASE WHEN %s < 0 THEN total_paid + %s ELSE total_paid END
            WHERE id = %s
        """
        self._execute_query(query, (amount, amount, amount, amount, -amount, amount, agent_id))
    
    def get_services(self) -> List[Dict]:
        return self._execute_query("SELECT * FROM services ORDER BY created_at DESC")
    
    def add_service(self, service_data: Dict) -> Dict:
        query = """
            INSERT INTO services (
                name, description, type, price, capabilities,
                seller_wallet, x402_endpoint, status
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s
            ) RETURNING *
        """
        result = self._execute_single(query, (
            service_data.get("name"),
            service_data.get("description"),
            service_data.get("type", "api"),
            float(service_data.get("price", 0.01)),
            service_data.get("capabilities", []),
            service_data.get("seller_wallet"),
            service_data.get("x402_endpoint"),
            service_data.get("status", "active")
        ))
        return result
    
    def record_transaction(self, tx_data: Dict):
        query = """
            INSERT INTO transactions (
                type, service_id, agent_id, amount,
                from_wallet, to_wallet, status, proof
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s
            ) RETURNING *
        """
        result = self._execute_single(query, (
            tx_data.get("type"),
            tx_data.get("service_id"),
            tx_data.get("agent_id"),
            float(tx_data.get("amount", 0.0)),
            tx_data.get("from_wallet"),
            tx_data.get("to_wallet"),
            tx_data.get("status", "completed"),
            tx_data.get("proof", {})
        ))
        return result
    
    def get_stats(self) -> Dict:
        agents_stats = self._execute_single("""
            SELECT 
                COUNT(*) as total_agents,
                COUNT(*) FILTER (WHERE status = 'alive') as alive_agents,
                COALESCE(SUM(balance), 0) as total_balance,
                COALESCE(SUM(total_earned), 0) as total_earned,
                COALESCE(SUM(total_paid), 0) as total_paid
            FROM agents
        """)
        
        services_count = self._execute_single("SELECT COUNT(*) as total_services FROM services")
        transactions_count = self._execute_single("SELECT COUNT(*) as total_transactions FROM transactions")
        
        return {
            "total_agents": agents_stats["total_agents"],
            "alive_agents": agents_stats["alive_agents"],
            "total_services": services_count["total_services"],
            "total_transactions": transactions_count["total_transactions"],
            "total_balance": round(float(agents_stats["total_balance"]), 4),
            "total_earned": round(float(agents_stats["total_earned"]), 4),
            "total_paid": round(float(agents_stats["total_paid"]), 4)
        }

# Factory function to create appropriate database instance
def Database():
    """Create database instance based on environment"""
    database_url = os.getenv("DATABASE_URL")
    
    if database_url and database_url.startswith("postgresql://"):
        logger.info("🗄️ Using Supabase PostgreSQL database")
        return SupabaseDatabase()
    else:
        logger.info("🗄️ Using SQLite database (development)")
        return SQLiteDatabase()

# Export for compatibility
__all__ = ["Database"]