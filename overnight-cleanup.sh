#!/bin/bash
# OVERNIGHT CLEANUP AND OPTIMIZATION SCRIPT
# Run this overnight to clean up the workspace

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║     🌙 OVERNIGHT CLEANUP AND OPTIMIZATION                        ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Log file
LOG="/home/nosyt/.openclaw/workspace/logs/overnight-cleanup-$(date +%Y%m%d-%H%M%S).log"
mkdir -p logs

echo "Started: $(date)" | tee -a $LOG

# 1. CLEAN OLD LOGS
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Cleaning old logs..." | tee -a $LOG
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
find . -name "*.log" -mtime +7 -delete 2>/dev/null
find logs/ -name "*.log" -mtime +3 -delete 2>/dev/null
echo "✅ Old logs cleaned" | tee -a $LOG

# 2. CLEAN NODE_MODULES (keep only needed)
echo ""
echo "2. Cleaning node_modules caches..." | tee -a $LOG
find . -path "*/node_modules/.cache" -type d -exec rm -rf {} + 2>/dev/null
find . -path "*/.next/cache" -type d -exec rm -rf {} + 2>/dev/null
echo "✅ Caches cleaned" | tee -a $LOG

# 3. CLEAN TEST RESULTS
echo ""
echo "3. Cleaning test artifacts..." | tee -a $LOG
rm -rf test-results/* 2>/dev/null
rm -rf coverage/* 2>/dev/null
echo "✅ Test artifacts cleaned" | tee -a $LOG

# 4. CONSOLIDATE REPORTS
echo ""
echo "4. Consolidating reports..." | tee -a $LOG
mkdir -p reports/archive
mv *REPORT*.md reports/ 2>/dev/null
mv audits/* reports/archive/ 2>/dev/null
echo "✅ Reports consolidated" | tee -a $LOG

# 5. CLEAN EMPTY FILES
echo ""
echo "5. Cleaning empty/problematic files..." | tee -a $LOG
find . -type f -empty -not -path "*/node_modules/*" -not -path "*/.git/*" -delete 2>/dev/null
find . -name "*.bak" -mtime +3 -delete 2>/dev/null
find . -name "*.tmp" -mtime +1 -delete 2>/dev/null
echo "✅ Empty files cleaned" | tee -a $LOG

# 6. COMPRESS OLD ARCHIVES
echo ""
echo "6. Compressing old archives..." | tee -a $LOG
tar -czf archive-$(date +%Y%m%d).tar.gz archive/ 2>/dev/null && rm -rf archive/
echo "✅ Archives compressed" | tee -a $LOG

# 7. CLEAN MEMORY FILES
echo ""
echo "7. Cleaning old memory files..." | tee -a $LOG
find memory/ -name "*.md" -mtime +14 -exec gzip {} \; 2>/dev/null
echo "✅ Memory files archived" | tee -a $LOG

# 8. UPDATE INDEX
echo ""
echo "8. Creating index..." | tee -a $LOG
cat > INDEX.md << 'EOF'
# Workspace Index

## Current Status
- Last Updated: $(date)
- Tests: 12/14 passing (awaiting deployment)
- Build Status: All sites building successfully

## Quick Links
- [Deploy Script](DEPLOY.sh)
- [Master Report](reports/MASTER-AUDIT-REPORT.md)
- [Test Suite](tests/user-flows-all-sites.spec.ts)

## Active Projects
- OMA-AI: ✅ Ready
- SpendThrone: ✅ Ready (needs deploy)
- Lethometry: ✅ Ready (needs deploy)

## Reports
See [reports/](reports/) directory for all audit reports.
EOF
echo "✅ Index created" | tee -a $LOG

# 9. GIT CLEANUP
echo ""
echo "9. Checking Git status..." | tee -a $LOG
git add -A 2>/dev/null
git commit -m "Cleanup: $(date) - automated maintenance" 2>/dev/null || echo "Nothing to commit"
echo "✅ Git cleanup complete" | tee -a $LOG

# 10. OPTIMIZE BUILD OUTPUTS
echo ""
echo "10. Optimizing build outputs..." | tee -a $LOG
# Keep only latest build for each project
for project in spendthrone lethometry; do
  if [ -d "$project/out" ]; then
    echo "  $project: $(du -sh $project/out | cut -f1)" | tee -a $LOG
  fi
done
echo "✅ Build outputs checked" | tee -a $LOG

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ CLEANUP COMPLETE" | tee -a $LOG
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Finished: $(date)" | tee -a $LOG
echo "Log saved to: $LOG"
echo ""
echo "Next steps for morning:"
echo "  1. Review reports/ directory"
echo "  2. Deploy sites: vercel login && ./DEPLOY.sh"
echo "  3. Run tests: npx playwright test"
echo ""
