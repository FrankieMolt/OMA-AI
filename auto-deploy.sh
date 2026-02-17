#!/bin/bash
# AUTO-DEPLOY PIPELINE
# Automatically deploys when fixes are ready

WORKSPACE="/home/nosyt/.openclaw/workspace"
LOG_FILE="$WORKSPACE/logs/deploy-$(date +%Y%m%d).log"
mkdir -p $WORKSPACE/logs

log() {
    echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

check_deploy_ready() {
    log "Checking if sites are ready for deployment..."
    
    cd $WORKSPACE
    
    # Check if builds are successful
    local oma_ready=false
    local spend_ready=false
    local leth_ready=false
    
    # OMA-AI
    if [ -d "out" ] && [ -f "out/index.html" ]; then
        oma_ready=true
        log "✓ OMA-AI build ready"
    fi
    
    # SpendThrone
    if [ -d "spendthrone/out" ] && [ -f "spendthrone/out/index.html" ]; then
        spend_ready=true
        log "✓ SpendThrone build ready"
    fi
    
    # Lethometry
    if [ -d "lethometry/out" ] && [ -f "lethometry/out/index.html" ]; then
        leth_ready=true
        log "✓ Lethometry build ready"
    fi
    
    if [ "$oma_ready" = true ] && [ "$spend_ready" = true ] && [ "$leth_ready" = true ]; then
        return 0
    else
        return 1
    fi
}

deploy_sites() {
    log "=========================================="
    log "STARTING AUTONOMOUS DEPLOYMENT"
    log "=========================================="
    
    # Check if vercel is authenticated
    if ! vercel whoami >/dev/null 2>&1; then
        log "⚠️  Vercel not authenticated - skipping deployment"
        log "Run: vercel login"
        return 1
    fi
    
    # Deploy SpendThrone
    log "Deploying SpendThrone..."
    cd $WORKSPACE/spendthrone
    if vercel --prod --yes 2>&1 | tee -a "$LOG_FILE"; then
        log "✓ SpendThrone deployed"
        echo "$(date -Iseconds)" > $WORKSPACE/.last-deploy-spendthrone
    else
        log "✗ SpendThrone deployment failed"
    fi
    
    # Deploy Lethometry
    log "Deploying Lethometry..."
    cd $WORKSPACE/lethometry
    if vercel --prod --yes 2>&1 | tee -a "$LOG_FILE"; then
        log "✓ Lethometry deployed"
        echo "$(date -Iseconds)" > $WORKSPACE/.last-deploy-lethometry
    else
        log "✗ Lethometry deployment failed"
    fi
    
    # Deploy OMA-AI
    log "Deploying OMA-AI..."
    cd $WORKSPACE
    if vercel --prod --yes 2>&1 | tee -a "$LOG_FILE"; then
        log "✓ OMA-AI deployed"
        echo "$(date -Iseconds)" > $WORKSPACE/.last-deploy-oma-ai
    else
        log "✗ OMA-AI deployment failed"
    fi
    
    log "=========================================="
    log "DEPLOYMENT COMPLETE"
    log "=========================================="
    
    # Verify deployment with tests
    log "Running verification tests..."
    sleep 30  # Wait for deployment to propagate
    
    cd $WORKSPACE
    npx playwright test tests/user-flows-all-sites.spec.ts --reporter=line 2>&1 | tee -a "$LOG_FILE"
    
    return 0
}

# Main
if check_deploy_ready; then
    log "All sites ready for deployment"
    
    # Check if it's been more than 1 hour since last deploy
    if [ -f "$WORKSPACE/.last-deploy-oma-ai" ]; then
        last_deploy=$(cat $WORKSPACE/.last-deploy-oma-ai)
        current_time=$(date +%s)
        last_time=$(date -d "$last_deploy" +%s 2>/dev/null || echo "0")
        diff=$((current_time - last_time))
        
        if [ $diff -lt 3600 ]; then
            log "Last deployment was $((diff / 60)) minutes ago - waiting for 1 hour cooldown"
            exit 0
        fi
    fi
    
    deploy_sites
else
    log "Sites not ready for deployment"
    exit 1
fi
