#!/bin/bash
# IMPROVEMENT SCHEDULER
# Schedules and tracks continuous improvements

WORKSPACE="/home/nosyt/.openclaw/workspace"
SCHEDULE_FILE="$WORKSPACE/.improvement-schedule"

# Daily improvements
run_daily_improvements() {
    echo "$(date): Running daily improvements..."
    
    # 1. Dependency updates
    cd $WORKSPACE && npm audit fix --force 2>/dev/null || true
    cd $WORKSPACE/spendthrone && npm audit fix --force 2>/dev/null || true
    cd $WORKSPACE/lethometry && npm audit fix --force 2>/dev/null || true
    
    # 2. Run security audit
    cd $WORKSPACE
    if command -v squirrel >/dev/null; then
        squirrel audit https://oma-ai.com --format llm > reports/audit-oma-ai-daily-$(date +%Y%m%d).log 2>/dev/null &
        squirrel audit https://spendthrone-olive.vercel.app --format llm > reports/audit-spendthrone-daily-$(date +%Y%m%d).log 2>/dev/null &
        squirrel audit https://lethometry.vercel.app --format llm > reports/audit-lethometry-daily-$(date +%Y%m%d).log 2>/dev/null &
    fi
    
    # 3. Performance check
    cd $WORKSPACE
    npx lighthouse https://oma-ai.com --output=json --chrome-flags="--headless" > reports/lighthouse-oma-ai-$(date +%Y%m%d).json 2>/dev/null &
}

# Weekly improvements
run_weekly_improvements() {
    echo "$(date): Running weekly improvements..."
    
    # 1. Deep dependency audit
    cd $WORKSPACE
    npm outdated > reports/outdated-dependencies-$(date +%Y%m%d).txt 2>/dev/null || true
    
    # 2. Bundle analysis
    cd $WORKSPACE/spendthrone && npm run analyze 2>/dev/null || true
    
    # 3. Accessibility audit
    cd $WORKSPACE
    npx pa11y https://oma-ai.com > reports/a11y-oma-ai-$(date +%Y%m%d).txt 2>/dev/null &
    npx pa11y https://spendthrone-olive.vercel.app > reports/a11y-spendthrone-$(date +%Y%m%d).txt 2>/dev/null &
    npx pa11y https://lethometry.vercel.app > reports/a11y-lethometry-$(date +%Y%m%d).txt 2>/dev/null &
}

# Check what to run
day_of_week=$(date +%u)
hour=$(date +%H)

if [ "$hour" = "04" ]; then
    run_daily_improvements
fi

if [ "$day_of_week" = "1" ] && [ "$hour" = "05" ]; then
    run_weekly_improvements
fi
