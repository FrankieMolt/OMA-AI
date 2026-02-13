# CLAUDE.md - Project-Specific Knowledge

_This file contains project-specific conventions, configurations, and gotchas that any Claude agent working on this workspace should know._

---

## Project Overview

This workspace contains 3 Next.js applications managed via PM2:
- **OMA-AI** (port 3000) - API Marketplace for x402 payments
- **SpendThrone** (port 3001) - Personal finance tracker
- **Lethometry** (port 3002) - Life statistics visualization

---

## Development Environment

### Tech Stack
- **Framework:** Next.js 16.1.6
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4+
- **State:** React Query (TanStack Query)
- **Runtime:** Node.js 22.22.0
- **Package Manager:** npm (no workspaces)

### Service Management
- **Process Manager:** PM2 (via ecosystem.config.js)
- **Configuration:** `/home/nosyt/.openclaw/workspace/ecosystem.config.js`
- **Startup Script:** `/home/nosyt/.openclaw/workspace/scripts/cleanup-ports.sh`

### Ports
- OMA-AI: 3000
- SpendThrone: 3001
- Lethometry: 3002

---

## Next.js Configuration

### Next.js 16 Syntax Changes

**Image Configuration (remotePatterns):**
```javascript
// WRONG - Next.js 13 syntax
remotePatterns: ['https://*.vercel.app']

// CORRECT - Next.js 16 syntax
remotePatterns: [
  {
    protocol: 'https',
    hostname: '**.vercel.app'
  }
]
```

**Important:** Next.js 16 requires objects, not strings, for remotePatterns.

---

## TypeScript Configuration

### Path Aliases (@/)

All Next.js projects in this workspace use `@/` alias imports. To enable this, ensure tsconfig.json has:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "moduleResolution": "node",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "skipLibCheck": true
  }
}
```

**Required fields:**
- `baseUrl: "."` - Sets root directory
- `paths: { "@/*": ["./*"] }` - Maps @/ to root
- `moduleResolution: "node"` - Node-style resolution

---

## PM2 Service Management

### Always Use ecosystem.config.js

**NEVER use individual PM2 commands for starting services.** Always use ecosystem.config.js:

```bash
# WRONG - Port treated as directory
pm2 start npm --name spendthrone -- start -p 3001

# CORRECT - Use ecosystem config
pm2 start ecosystem.config.js
```

### Ecosystem Configuration

**Port Management:**
- Pass `PORT` via `env` section (NOT command args)
- Example: `env: { PORT: 3000 }`

**Working Directory (cwd):**
- Set to project directory for each app
- Example: `cwd: '/home/nosyt/.openclaw/workspace/spendthrone'`

**Startup Arguments:**
- Use `args: 'run dev'` instead of `args: 'start -p 3001'`
- Let ecosystem config manage ports via env variables

### Cleanup Before Starting

**ALWAYS kill zombie processes before starting services:**
```bash
./scripts/cleanup-ports.sh
```

This script:
1. Checks ports 3000, 3001, 3002
2. Kills any processes blocking them
3. Starts PM2 services via ecosystem.config.js

---

## Port Management

### Zombie Process Issue

Node dev servers can survive PM2 shutdown and block ports. Always check for zombie processes before restarting.

**Identify Zombie Processes:**
```bash
netstat -tlnp | grep ":3000\|:3001\|:3002"
```

**Kill Processes on Specific Port:**
```bash
fuser -k 3000/tcp
# Or
lsof -ti:3000 | xargs kill -9
```

### Automated Cleanup

Use the provided cleanup script that:
1. Checks each port (3000, 3001, 3002)
2. Identifies PIDs blocking ports
3. Kills blocking processes
4. Starts PM2 services

---

## Build Configuration

### OMA-AI Specifics

**Dependencies:**
- x402 SDK: @x402/evm, @x402/express, @x402/svm
- Wallets: @rainbow-me/rainbowkit, @solana/wallet-adapter-*, wagmi, ethers, viem
- Database: @supabase/supabase-js, better-sqlite3

**Build Issues:**
- Multiple lockfiles detected (package-lock.json + others)
- Set `turbopack.root` in next.config.js to fix

### Lethometry Specifics

**Build Issues:**
- remotePatterns syntax error (fixed - now uses Next.js 16 syntax)
- tsconfig.json missing @/ alias (fixed - now configured)

---

## Testing & Debugging

### Multi-Site Debugging Workflow

When debugging multiple sites:

1. **Check PM2 Status:** `pm2 list`
2. **Check Port Usage:** `netstat -tlnp | grep ":3000\|:3001\|:3002"`
3. **Identify Blocking Processes:** Look for PIDs not in PM2 list
4. **Kill Zombie Processes:** Use cleanup script or manual `fuser -k`
5. **Restart Services:** `pm2 restart all` or `pm2 start ecosystem.config.js`
6. **Verify HTTP Responses:** `curl -o /dev/null -w "%{http_code}" http://localhost:PORT`

### Common Debugging Commands

**PM2 Logs:**
```bash
pm2 logs --lines 50 --nostream
pm2 logs oma-ai --err
```

**Process Status:**
```bash
pm2 status
pm2 describe oma-ai
```

**Port Status:**
```bash
netstat -tlnp
lsof -i:3000
```

---

## Common Issues & Solutions

### Issue: EADDRINUSE (Port Already in Use)

**Symptom:** `Error: listen EADDRINUSE: address already in use :::3000`

**Root Cause:** Zombie process from previous dev session

**Solution:**
```bash
# Find PID
lsof -ti:3000

# Kill process
kill -9 <PID>

# Or use cleanup script
./scripts/cleanup-ports.sh
```

### Issue: Module Not Found (@/ imports)

**Symptom:** `Error: Can't resolve '@/components/X'`

**Root Cause:** tsconfig.json missing path alias configuration

**Solution:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] },
    "moduleResolution": "node"
  }
}
```

### Issue: Invalid next config (remotePatterns)

**Symptom:** `Fatal next config errors found in next.config.js`

**Root Cause:** Using Next.js 13 syntax with Next.js 16

**Solution:**
```javascript
// Use object format, not strings
remotePatterns: [
  {
    protocol: 'https',
    hostname: '**.vercel.app'
  }
]
```

---

## File Organization

### Core Files (Always Present)
- `AGENTS.md` - Agent workflows and automation rules
- `MEMORY.md` - Long-term memory and decisions
- `SOUL.md` - Behavioral guidelines and identity
- `TOOLS.md` - Tool configurations and MCP servers
- `IDENTITY.md` - Who Frankie is
- `USER.md` - Who Nosyt is
- `HEARTBEAT.md` - Dynamic system status tracking
- `CLAUDE.md` - This file (project-specific knowledge)

### Archive Structure
- `archive/YYYY-MM-DD/` - Old audit/fix reports
- Archive after resolving issues to keep workspace clean

---

## Self-Improvement

### Learnings Tracking

All learnings and errors are logged to `.learnings/`:
- `ERRORS.md` - Errors encountered and resolutions
- `LEARNINGS.md` - Best practices and corrections

**Review learnings before major tasks:** Check `.learnings/` for related issues.

---

## Deployment Notes

### Development Mode
- All services run in development mode (via `npm run dev`)
- No production builds currently deployed
- Hot reloading enabled for faster development

### Production Deployment
- Currently NOT in production mode
- To deploy production: Change `npm run dev` to `npm start` in ecosystem.config.js
- Ensure `next build` has been run successfully

### Cache Management

**Clearing Build Caches:**
- Remove `.next` directories before major builds
- Locations:
  - `/home/nosyt/.openclaw/workspace/.next` (OMA-AI)
  - `/home/nosyt/.openclaw/workspace/lethometry/.next` (Lethometry)
  - `/home/nosyt/.openclaw/workspace/spendthrone/.next` (SpendThrone)

**When to Clear Caches:**
- Before production builds
- After upgrading Next.js versions
- When experiencing build errors
- When hot reloading stops working

### PM2 Log Management

**Flushing Logs:**
- Command: `pm2 flush`
- Clears all PM2 log files
- Use when logs become too large or contain old errors
- Good practice after debugging sessions

---

_Last updated: 2026-02-09_