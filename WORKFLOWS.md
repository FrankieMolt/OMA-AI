# WORKFLOWS.md - Frankie's Workflows

_Combining skills and MCP servers to accomplish complex tasks_

---

## 🚀 Quick Workflows

### Workflow 1: Deploy OMA-AI.com
**Skills:** vercel-deploy, github
**MCP:** github-mcp

```bash
# 1. Check GitHub status
mcporter call github-mcp.get_repo owner=FrankieMolt repo=OMA-AI

# 2. Build locally
npm run build

# 3. Deploy to Vercel
cd skills/vercel-deploy
./scripts/vercel_deploy.sh --project oma-ai --production

# 4. Create GitHub commit
gh add .
gh commit -m "feat: Update and deploy OMA-AI"
gh push
```

---

### Workflow 2: Debug a Failing Service
**Skills:** linux-service-triage
**MCP:** (none - uses systemd/PM2 directly)

```bash
# 1. Check service status
systemctl status myapp

# 2. View recent logs
journalctl -u myapp -n 50 --no-pager

# 3. Check for errors in journal
journalctl -p err -n 30 --no-pager

# 4. Fix permissions if needed
sudo chown -R appuser:appuser /var/app
sudo chmod 755 /var/app

# 5. Restart service
sudo systemctl restart myapp
sudo systemctl status myapp
```

---

### Workflow 3: Database Schema Update
**Skills:** database-operations
**MCP:** (none - direct SQL)

```sql
-- 1. Design new table with proper constraints
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'pending');

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  status user_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create indexes (CONCURRENTLY for production)
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY idx_users_status ON users(status) WHERE status != 'active';

-- 3. Verify with EXPLAIN ANALYZE
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

---

### Workflow 4: Security Audit of Code
**Skills:** security-auditor
**MCP:** github-mcp

```bash
# 1. Fetch code from GitHub
gh repo clone FrankieMolt/OMA-AI
cd OMA-AI

# 2. Run security audit
# Look for:
# - OWASP Top 10 vulnerabilities
# - SQL injection, XSS, CSRF
# - Insecure auth/authorization
# - Missing input validation
# - Hardcoded secrets

# 3. Document findings in .learnings/ERRORS.md
cat >> .learnings/ERRORS.md << 'EOF'
## [ERR-20260207-001] Security Vulnerability

**Logged**: 2026-02-07T07:30:00Z
**Priority**: high
**Status**: pending

### Summary
SQL injection vulnerability in API endpoint

### Details
...
EOF
```

---

### Workflow 5: Continuous Improvement Review
**Skills:** self-improving-agent-1-0-2
**MCP:** (none - reads local files)

```bash
# Run automatically every 24 hours via cron

# 1. Review learnings
cat .learnings/LEARNINGS.md

# 2. Review errors
cat .learnings/ERRORS.md

# 3. Promote to core docs if relevant
# - Workflow improvements → AGENTS.md
# - Tool gotchas → TOOLS.md
# - Behavioral patterns → SOUL.md

# 4. Update timestamp
echo '{"lastSelfImprovementReview": 1770474600}' > memory/heartbeat-state.json
```

---

### Workflow 6: Capability Evolution
**Skills:** capability-evolver
**MCP:** (none - analyzes local history)

```bash
# Run automatically every 12 hours via cron

cd skills/capability-evolver

# Automated mode (applies changes immediately)
node index.js

# Review mode (human-in-the-loop)
node index.js --review

# Continuous loop (for long-running processes)
node index.js --loop
```

---

### Workflow 7: Headless GUI Automation
**Skills:** computer-use-1-0-1
**MCP:** (none - uses Xvfb + XFCE)

```bash
# 1. Start virtual display
Xvfb :99 -screen 0 1024x768x24 -ac +extension RANDR &
export DISPLAY=:99

# 2. Start XFCE (optional, for full desktop)
startxfce4 &

# 3. Take screenshot to see screen
cd skills/computer-use-1-0-1
./scripts/screenshot.sh

# 4. Automate actions
./scripts/click.sh 512 384 left
./scripts/type_text.sh "Hello world"
./scripts.key.sh "Return"

# 5. Verify with screenshot
./scripts/screenshot.sh

# 6. Clean up
kill %1  # Kill Xvfb
```

---

### Workflow 8: Comprehensive Testing
**Skills:** test-master
**MCP:** (none - runs tests)

```bash
# 1. Unit tests
npm test

# 2. Test coverage
npm test -- --coverage

# 3. Integration tests
# Write API tests using the test-master skill

# 4. E2E tests
# Set up Playwright/Cypress for end-to-end testing

# 5. Performance testing
# Use k6 for load testing

# 6. Document findings
cat > test-report.md << 'EOF'
# Test Report

## Unit Tests
- Status: ✅ Passing
- Coverage: 85%

## Integration Tests
- Status: ✅ Passing
- Issues: None

## Performance Tests
- Status: ⚠️ Warnings
- Issues: Slow API response on /api/marketplace
EOF
```

---

### Workflow 9: Database Optimization
**Skills:** database-operations
**MCP:** (none - direct Supabase connection)

```sql
-- 1. Find slow queries
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;

-- 2. Analyze execution plan
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.id, u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name
ORDER BY order_count DESC;

-- 3. Create missing indexes
CREATE INDEX CONCURRENTLY idx_orders_user_created
ON orders(user_id, created_at DESC);

-- 4. Check for unused indexes
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;
```

---

### Workflow 10: Backup Critical Files
**Skills:** openclaw-self-backup
**MCP:** (none - local file operations)

```bash
# 1. Setup config
cd skills/openclaw-self-backup
cp config/backup.example.json config/backup.json

# 2. Edit backup location
nano config/backup.json
# Set "backupDir": "/home/nosyt/backups"

# 3. Run backup
./scripts/backup.sh

# 4. Verify backup
ls -lh /home/nosyt/backups/
```

---

## 🔧 MCP Workflows

### Workflow 11: GitHub Issue Management
**MCP:** github-mcp

```bash
# List open issues
mcporter call github-mcp.list_issues \
  owner=FrankieMolt \
  repo=OMA-AI \
  state=open

# Create new issue
mcporter call github-mcp.create_issue \
  owner=FrankieMolt \
  repo=OMA-AI \
  title="Fix navigation on mobile" \
  body="The hamburger menu doesn't work on mobile devices."

# Create pull request
mcporter call github-mcp.create_pr \
  owner=FrankieMolt \
  repo=OMA-AI \
  title="Add mobile responsive design" \
  body="Improves mobile UX with proper navigation."
```

---

### Workflow 12: Context Queries with Context7
**MCP:** context7

```bash
# Search documentation
mcporter call context7.search \
  query="How to deploy Next.js to Vercel"

# Get specific document
mcporter call context7.get_document \
  id="nextjs-deployment-guide"

# Ask a question about documentation
mcporter call context7.ask \
  question="What are the best practices for Next.js deployment?"
```

---

### Workflow 13: Railway Cloud Deployment
**MCP:** railway-mcp

```bash
# List projects
mcporter call railway-mcp.list_projects

# Get project details
mcporter call railway-mcp.get_project \
  project_id="proj_xyz123"

# Create new service
mcporter call railway-mcp.create_service \
  project_id="proj_xyz123" \
  name="api-server" \
  service_type="web"

# Deploy service
mcporter call railway-mcp.deploy_service \
  project_id="proj_xyz123" \
  service_id="srv_xyz456"
```

---

## 🎯 Skill + MCP Combination Workflows

### Workflow 14: Deploy to Railway via GitHub
**Skills:** github, vercel-deploy (adapted)
**MCP:** github-mcp, railway-mcp

```bash
# 1. Get repo info
mcporter call github-mcp.get_repo \
  owner=FrankieMolt \
  repo=OMA-AI

# 2. Create Railway project
mcporter call railway-mcp.create_project \
  name="oma-ai-production"

# 3. Link GitHub repo to Railway
# (via Railway web UI or CLI)

# 4. Deploy
mcporter call railway-mcp.deploy_service \
  project_id="proj_xyz123" \
  service_id="srv_xyz456"

# 5. Monitor logs
mcporter call railway-mcp.get_service_logs \
  project_id="proj_xyz123" \
  service_id="srv_xyz456"
```

---

### Workflow 15: Monitor & Optimize Database
**Skills:** database-operations, linux-service-triage
**MCP:** (none - direct Supabase)

```bash
# 1. Check database service status
systemctl status postgresql

# 2. Connect to database
psql postgresql://user:pass@host:5432/dbname

# 3. Run optimization queries
# (See Workflow 9 for detailed SQL)

# 4. Check service logs
journalctl -u postgresql -n 50

# 5. Restart if needed
sudo systemctl restart postgresql
```

---

## 📝 Workflow Templates

### Error Recovery Template
```bash
# 1. Log error
echo "[$(date)] Error occurred: $ERROR_MSG" >> .learnings/ERRORS.md

# 2. Diagnose
# Use linux-service-triage skill to diagnose

# 3. Fix
# Apply fix based on diagnosis

# 4. Verify
# Test that fix works

# 5. Document
# Update .learnings/ERRORS.md with fix applied
```

### Daily Routine Template
```bash
# 1. Check system status
uptime
df -h
free -h

# 2. Review logs
journalctl -p err -n 20 --no-pager

# 3. Check GitHub activity
gh issue list --repo FrankieMolt/OMA-AI

# 4. Review learnings
cat .learnings/LEARNINGS.md

# 5. Update memory if needed
# Important learnings → MEMORY.md
```

---

## 🔄 Automated Workflows (Cron)

### Self-Improvement (Every 24 Hours)
- Runs automatically via cron
- ID: 6bffed47-c08e-4373-9351-a0cbc8385f4b
- See Workflow 5 for details

### Capability Evolution (Every 12 Hours)
- Runs automatically via cron
- ID: 4227cbed-f55f-449c-9d54-bb79335cfafb
- See Workflow 6 for details

---

*Workflows guide - Frankie 🧟‍♂️*
*Last updated: 2026-02-07*
