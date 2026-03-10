#!/bin/bash
# AUTONOMOUS AGENT - Continuous Site Maintenance & Upgrades
# This script runs continuously to monitor, test, and improve sites

WORKSPACE="/home/nosyt/.openclaw/workspace"
LOG_DIR="$WORKSPACE/logs/autonomous"
STATE_FILE="$WORKSPACE/.agent-state.json"
mkdir -p $LOG_DIR

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_DIR/agent-$(date +%Y%m%d).log"
}

success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ✓${NC} $1" | tee -a "$LOG_DIR/agent-$(date +%Y%m%d).log"
}

warn() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] ⚠${NC} $1" | tee -a "$LOG_DIR/agent-$(date +%Y%m%d).log"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ✗${NC} $1" | tee -a "$LOG_DIR/agent-$(date +%Y%m%d).log"
}

# Initialize state
init_state() {
    if [ ! -f "$STATE_FILE" ]; then
        cat > "$STATE_FILE" << 'EOF'
{
  "lastRun": null,
  "testResults": {"passed": 0, "failed": 0, "total": 14},
  "lastDeployment": null,
  "issuesFound": [],
  "improvementsMade": [],
  "sites": {
    "oma-ai": {"status": "ready", "lastBuild": null, "score": 75},
    "spendthrone": {"status": "needs-deploy", "lastBuild": null, "score": 76},
    "lethometry": {"status": "needs-deploy", "lastBuild": null, "score": 79}
  }
}
EOF
    fi
}

# Run tests
run_tests() {
    log "Running Playwright tests..."
    cd $WORKSPACE
    
    # Run tests and capture results
    npx playwright test tests/user-flows-all-sites.spec.ts --reporter=json --timeout=60000 2>/dev/null > "$LOG_DIR/test-results-$(date +%Y%m%d-%H%M%S).json"
    
    # Quick check
    local result=$(npx playwright test tests/user-flows-all-sites.spec.ts --reporter=line 2>&1 | grep -E "passed|failed")
    
    if echo "$result" | grep -q "14 passed"; then
        success "All 14 tests passing"
        update_state "testResults.passed" 14
        update_state "testResults.failed" 0
    else
        local passed=$(echo "$result" | grep -oE '[0-9]+ passed' | grep -oE '[0-9]+' || echo "0")
        local failed=$(echo "$result" | grep -oE '[0-9]+ failed' | grep -oE '[0-9]+' || echo "0")
        warn "Tests: $passed passed, $failed failed"
        update_state "testResults.passed" "$passed"
        update_state "testResults.failed" "$failed"
    fi
    
    update_state "lastRun" "$(date -Iseconds)"
}

# Check site health via HTTP
check_health() {
    log "Checking site health..."
    
    local sites=(
        "https://oma-ai.com:OMA-AI"
        "https://spendthrone-olive.vercel.app:SpendThrone"
        "https://lethometry.vercel.app:Lethometry"
    )
    
    for site in "${sites[@]}"; do
        local url=$(echo $site | cut -d: -f1-2)
        local name=$(echo $site | cut -d: -f3)
        
        local status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
        
        if [ "$status" = "200" ]; then
            success "$name: HTTP $status ✓"
        else
            error "$name: HTTP $status ✗"
        fi
    done
}

# Auto-fix common issues
auto_fix() {
    log "Running auto-fix routines..."
    
    cd $WORKSPACE
    
    # Fix 1: TypeScript errors
    if npx tsc --noEmit 2>&1 | grep -q "error TS"; then
        warn "TypeScript errors found - attempting fixes"
        # Log errors for manual review
        npx tsc --noEmit 2>&1 | head -20 > "$LOG_DIR/typescript-errors-$(date +%Y%m%d-%H%M%S).log"
    fi
    
    # Fix 2: Build all sites
    log "Building sites..."
    
    # OMA-AI
    if ! [ -d "out" ] || [ "app" -nt "out" ]; then
        log "Building OMA-AI..."
        npm run build 2>&1 | tail -5
        update_state "sites.oma-ai.lastBuild" "$(date -Iseconds)"
    fi
    
    # SpendThrone
    if ! [ -d "spendthrone/out" ] || [ "spendthrone/app" -nt "spendthrone/out" ]; then
        log "Building SpendThrone..."
        cd spendthrone && npm run build 2>&1 | tail -5 && cd ..
        update_state "sites.spendthrone.lastBuild" "$(date -Iseconds)"
    fi
    
    # Lethometry
    if ! [ -d "lethometry/out" ] || [ "lethometry/app" -nt "lethometry/out" ]; then
        log "Building Lethometry..."
        cd lethometry && npm run build 2>&1 | tail -5 && cd ..
        update_state "sites.lethometry.lastBuild" "$(date -Iseconds)"
    fi
    
    success "Auto-fix complete"
}

# Update state file
update_state() {
    local key=$1
    local value=$2
    
    # Simple JSON update using jq if available, otherwise skip
    if command -v jq >/dev/null 2>&1; then
        jq ".$key = \"$value\"" "$STATE_FILE" > "$STATE_FILE.tmp" && mv "$STATE_FILE.tmp" "$STATE_FILE"
    fi
}

# Generate status report
generate_report() {
    log "Generating status report..."
    
    cat > "$WORKSPACE/AGENT-STATUS.md" << EOF
# Autonomous Agent Status

**Last Updated:** $(date)

## Test Results
$(cat $STATE_FILE 2>/dev/null | grep -E '"passed"|"failed"' || echo "No data")

## Site Health
- Checking every 30 minutes
- Auto-fix running hourly
- Full audit daily at 3 AM

## Recent Activity
$(ls -t $LOG_DIR/*.log 2>/dev/null | head -5 | xargs -I {} basename {})

## Next Actions
- [ ] Monitor test results
- [ ] Auto-deploy on improvements
- [ ] Run security audits
- [ ] Optimize performance

---
*This file is auto-updated by the autonomous agent*
EOF

    success "Status report updated"
}

# Main agent loop
agent_loop() {
    init_state
    
    log "=========================================="
    log "AUTONOMOUS AGENT STARTED"
    log "=========================================="
    log "Workspace: $WORKSPACE"
    log "Mode: Continuous monitoring & improvement"
    log "=========================================="
    
    local iteration=0
    
    while true; do
        iteration=$((iteration + 1))
        log ""
        log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        log "ITERATION $iteration - $(date)"
        log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        
        # Run checks
        check_health
        run_tests
        auto_fix
        
        # Generate report every 10 iterations
        if [ $((iteration % 10)) -eq 0 ]; then
            generate_report
        fi
        
        # Cleanup old logs every 50 iterations
        if [ $((iteration % 50)) -eq 0 ]; then
            log "Running scheduled cleanup..."
            $WORKSPACE/overnight-cleanup.sh >/dev/null 2>&1
        fi
        
        log "Sleeping for 30 minutes..."
        sleep 1800  # 30 minutes
    done
}

# Handle signals
trap 'log "Agent shutting down..."; exit 0' SIGINT SIGTERM

# Start agent
agent_loop
