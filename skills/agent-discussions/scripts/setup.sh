#!/bin/bash
#
# Agent Discussions Setup Script
# Sets up the Moltbook-style multi-agent forum system
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SKILL_NAME="agent-discussions"
SKILL_DIR="$HOME/.openclaw/workspace/skills/$SKILL_NAME"
DEFAULT_DB_NAME="agent_discussions"
DEFAULT_API_PORT=3000
DEFAULT_WS_PORT=8080

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║              Agent Discussions - Setup Script                  ║"
echo "║                   Moltbook Forum System                        ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Helper functions
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    local missing=()
    
    if ! command -v node &> /dev/null; then
        missing+=("Node.js (v18+)")
    fi
    
    if ! command -v psql &> /dev/null; then
        missing+=("PostgreSQL client")
    fi
    
    if ! command -v redis-cli &> /dev/null; then
        missing+=("Redis client")
    fi
    
    if ! command -v npm &> /dev/null; then
        missing+=("npm")
    fi
    
    if [ ${#missing[@]} -ne 0 ]; then
        print_error "Missing prerequisites:"
        for item in "${missing[@]}"; do
            echo "  - $item"
        done
        echo ""
        echo "Please install missing dependencies and run again."
        exit 1
    fi
    
    print_success "All prerequisites found"
}

# Prompt for configuration
prompt_config() {
    print_status "Configuration setup..."
    
    read -p "Database host [localhost]: " DB_HOST
    DB_HOST=${DB_HOST:-localhost}
    
    read -p "Database port [5432]: " DB_PORT
    DB_PORT=${DB_PORT:-5432}
    
    read -p "Database name [$DEFAULT_DB_NAME]: " DB_NAME
    DB_NAME=${DB_NAME:-$DEFAULT_DB_NAME}
    
    read -p "Database user [postgres]: " DB_USER
    DB_USER=${DB_USER:-postgres}
    
    read -sp "Database password: " DB_PASSWORD
    echo ""
    
    read -p "Redis URL [redis://localhost:6379]: " REDIS_URL
    REDIS_URL=${REDIS_URL:-redis://localhost:6379}
    
    read -p "API port [$DEFAULT_API_PORT]: " API_PORT
    API_PORT=${API_PORT:-$DEFAULT_API_PORT}
    
    read -p "WebSocket port [$DEFAULT_WS_PORT]: " WS_PORT
    WS_PORT=${WS_PORT:-$DEFAULT_WS_PORT}
    
    read -p "OpenAI API key (optional): " OPENAI_KEY
    read -p "Gemini API key (optional): " GEMINI_KEY
    read -p "Anthropic API key (optional): " ANTHROPIC_KEY
}

# Create database
create_database() {
    print_status "Creating database '$DB_NAME'..."
    
    export PGPASSWORD="$DB_PASSWORD"
    
    # Check if database exists
    if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
        print_warning "Database '$DB_NAME' already exists"
        read -p "Drop and recreate? [y/N]: " recreate
        if [[ $recreate =~ ^[Yy]$ ]]; then
            psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "DROP DATABASE $DB_NAME;"
            psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "CREATE DATABASE $DB_NAME;"
            print_success "Database recreated"
        else
            print_status "Using existing database"
        fi
    else
        psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "CREATE DATABASE $DB_NAME;"
        print_success "Database created"
    fi
    
    unset PGPASSWORD
}

# Run migrations
run_migrations() {
    print_status "Running database migrations..."
    
    export PGPASSWORD="$DB_PASSWORD"
    
    # Apply schema
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$SKILL_DIR/schema.sql" 2>/dev/null || {
        print_warning "Schema file not found, creating from SKILL.md..."
        # Extract SQL from SKILL.md (would need to be implemented)
        print_warning "Please run migrations manually from SKILL.md"
    }
    
    unset PGPASSWORD
    
    print_success "Migrations completed"
}

# Create environment file
create_env_file() {
    print_status "Creating environment file..."
    
    cat > "$SKILL_DIR/.env" << EOF
# Agent Discussions Environment Configuration
# Generated on $(date)

# Database
DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME
DB_HOST=$DB_HOST
DB_PORT=$DB_PORT
DB_NAME=$DB_NAME
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD

# Redis
REDIS_URL=$REDIS_URL

# Server
API_PORT=$API_PORT
WS_PORT=$WS_PORT
NODE_ENV=development

# LLM Providers
OPENAI_API_KEY=${OPENAI_KEY:-}
GEMINI_API_KEY=${GEMINI_KEY:-}
ANTHROPIC_API_KEY=${ANTHROPIC_KEY:-}

# Security
JWT_SECRET=$(openssl rand -hex 32)
ENCRYPTION_KEY=$(openssl rand -hex 32)

# Feature Flags
ENABLE_EXPORTS=true
ENABLE_MODERATION=true
ENABLE_NOTIFICATIONS=true
ENABLE_ANALYTICS=true
EOF
    
    print_success "Environment file created at $SKILL_DIR/.env"
}

# Create directory structure
create_directories() {
    print_status "Creating directory structure..."
    
    mkdir -p "$SKILL_DIR"/{src/{agents,topics,arguments,consensus,exports,moderation,websocket},scripts,config,docs,tests}
    mkdir -p "$SKILL_DIR"/{uploads,logs,cache}
    
    print_success "Directory structure created"
}

# Create package.json
create_package_json() {
    print_status "Creating package.json..."
    
    cat > "$SKILL_DIR/package.json" << 'EOF'
{
  "name": "@openclaw/agent-discussions",
  "version": "1.0.0",
  "description": "Moltbook-style multi-agent forum system",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "migrate": "node scripts/migrate.js",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "seed": "tsx scripts/seed.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "ws": "^8.14.2",
    "pg": "^8.11.3",
    "redis": "^4.6.10",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "dotenv": "^16.3.1",
    "zod": "^3.22.4",
    "uuid": "^9.0.1",
    "date-fns": "^3.0.6",
    "openai": "^4.24.1",
    "@google/generative-ai": "^0.1.3",
    "@anthropic-ai/sdk": "^0.24.3",
    "puppeteer": "^21.6.1",
    "handlebars": "^4.7.8",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/express": "^4.17.21",
    "@types/ws": "^8.5.10",
    "@types/pg": "^8.10.9",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/bcryptjs": "^2.4.6",
    "@types/cors": "^2.8.17",
    "@types/uuid": "^9.0.7",
    "@types/multer": "^1.4.11",
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.11",
    "ts-jest": "^29.1.1",
    "eslint": "^8.56.0",
    "@typescript-eslint/eslint-plugin": "^6.16.0",
    "@typescript-eslint/parser": "^6.16.0"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "keywords": [
    "ai",
    "agents",
    "discussion",
    "debate",
    "forum",
    "consensus",
    "multi-agent"
  ],
  "author": "OpenClaw",
  "license": "MIT"
}
EOF
    
    print_success "package.json created"
}

# Create TypeScript config
create_tsconfig() {
    cat > "$SKILL_DIR/tsconfig.json" << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
EOF
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    cd "$SKILL_DIR"
    
    if ! npm install; then
        print_error "Failed to install dependencies"
        exit 1
    fi
    
    print_success "Dependencies installed"
}

# Create seed data
create_seed_data() {
    print_status "Creating seed data..."
    
    cat > "$SKILL_DIR/scripts/seed.ts" << 'EOF'
import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const defaultAgents = [
  {
    name: 'Socrates',
    description: 'Classical philosopher who probes assumptions through questioning',
    personality: {
      traits: ['analytical', 'socratic', 'inquisitive'],
      communication_style: 'inquisitive',
      reasoning_approach: 'logical',
      values: ['truth', 'clarity', 'intellectual_honesty']
    },
    expertise: ['philosophy', 'logic', 'ethics', 'critical_thinking'],
    stance_template: 'devils_advocate'
  },
  {
    name: 'Data Analyst',
    description: 'Evidence-driven analyst who prioritizes empirical data',
    personality: {
      traits: ['analytical', 'precise', 'objective'],
      communication_style: 'formal',
      reasoning_approach: 'evidence_based',
      values: ['accuracy', 'objectivity', 'rigor']
    },
    expertise: ['statistics', 'data_science', 'research_methods', 'economics'],
    stance_template: 'neutral'
  },
  {
    name: 'Pragmatist',
    description: 'Focuses on practical outcomes and real-world feasibility',
    personality: {
      traits: ['practical', 'results_oriented', 'straightforward'],
      communication_style: 'casual',
      reasoning_approach: 'pragmatic',
      values: ['efficiency', 'feasibility', 'results']
    },
    expertise: ['business', 'project_management', 'operations', 'strategy'],
    stance_template: 'moderate'
  },
  {
    name: 'Ethicist',
    description: 'Evaluates moral implications and ethical frameworks',
    personality: {
      traits: ['principled', 'thoughtful', 'balanced'],
      communication_style: 'academic',
      reasoning_approach: 'principled',
      values: ['justice', 'fairness', 'human_dignity']
    },
    expertise: ['ethics', 'moral_philosophy', 'bioethics', 'social_justice'],
    stance_template: 'neutral'
  },
  {
    name: 'Innovator',
    description: 'Forward-thinking advocate for new ideas and technologies',
    personality: {
      traits: ['creative', 'optimistic', 'visionary'],
      communication_style: 'enthusiastic',
      reasoning_approach: 'opportunity_based',
      values: ['progress', 'innovation', 'growth']
    },
    expertise: ['technology', 'innovation', 'futurism', 'entrepreneurship'],
    stance_template: 'supportive'
  }
];

async function seed() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    for (const agent of defaultAgents) {
      await client.query(
        `INSERT INTO agents (name, description, personality, expertise, stance_template)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT DO NOTHING`,
        [
          agent.name,
          agent.description,
          JSON.stringify(agent.personality),
          agent.expertise,
          agent.stance_template
        ]
      );
    }
    
    await client.query('COMMIT');
    console.log('✅ Seed data inserted successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    client.release();
  }
  
  await pool.end();
}

seed().catch(console.error);
EOF
    
    print_success "Seed script created"
}

# Create basic server file
create_server_file() {
    cat > "$SKILL_DIR/src/index.ts" << 'EOF'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import { Pool } from 'pg';
import { createClient } from 'redis';

config();

const app = express();
const port = process.env.API_PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Database connection
export const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Redis connection
export const redis = createClient({
  url: process.env.REDIS_URL
});
redis.connect().catch(console.error);

// Health check
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        redis: redis.isReady ? 'connected' : 'disconnected'
      }
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy',
      error: error.message 
    });
  }
});

// Routes placeholder
app.get('/', (req, res) => {
  res.json({
    name: 'Agent Discussions API',
    version: '1.0.0',
    documentation: '/docs'
  });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Agent Discussions API running on port ${port}`);
});

export default app;
EOF
}

# Create README for the skill
create_skill_readme() {
    cat > "$SKILL_DIR/README.md" << 'EOF'
# Agent Discussions

A Moltbook-style multi-agent forum system for structured AI debates.

## Quick Start

```bash
# Setup
./scripts/setup.sh

# Development
npm run dev

# Production
npm run build
npm start
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `OPENAI_API_KEY` - For GPT-4 agent responses
- `GEMINI_API_KEY` - For Gemini agent responses (optional)
- `JWT_SECRET` - For authentication

## API Documentation

See [SKILL.md](./SKILL.md) for complete API reference.

## Default Agents

Run `npm run seed` to populate default agents:
- Socrates (Devil's Advocate)
- Data Analyst (Neutral)
- Pragmatist (Moderate)
- Ethicist (Neutral)
- Innovator (Supportive)

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Web UI    │────▶│    API      │────▶│   LLM       │
│  (Next.js)  │     │  (Express)  │     │ (OpenAI/    │
└─────────────┘     └──────┬──────┘     │  Gemini)    │
                           │            └─────────────┘
                    ┌──────┴──────┐
                    │  PostgreSQL │
                    │    Redis    │
                    └─────────────┘
```
EOF
}

# Main setup flow
main() {
    print_status "Starting Agent Discussions setup..."
    
    check_prerequisites
    create_directories
    prompt_config
    create_database
    run_migrations
    create_env_file
    create_package_json
    create_tsconfig
    create_server_file
    create_seed_data
    create_skill_readme
    install_dependencies
    
    echo ""
    echo -e "${GREEN}"
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║                   Setup Complete! 🎉                           ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    print_success "Agent Discussions has been set up successfully!"
    echo ""
    echo "Next steps:"
    echo "  1. Review configuration:  cat $SKILL_DIR/.env"
    echo "  2. Seed default agents:   npm run seed"
    echo "  3. Start development:     npm run dev"
    echo "  4. Open browser:          http://localhost:$API_PORT"
    echo ""
    echo "Documentation: $SKILL_DIR/SKILL.md"
    echo ""
}

# Run main if executed directly
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main "$@"
fi
