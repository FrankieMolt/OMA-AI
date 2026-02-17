#!/bin/bash
# SCHEDULE OVERNIGHT CLEANUP
# This will run the cleanup at 3 AM daily

CRON_JOB="0 3 * * * /home/nosyt/.openclaw/workspace/overnight-cleanup.sh >> /home/nosyt/.openclaw/workspace/logs/cron.log 2>&1"

# Check if already scheduled
if crontab -l 2>/dev/null | grep -q "overnight-cleanup"; then
  echo "✅ Cleanup already scheduled"
else
  # Add to crontab
  (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
  echo "✅ Scheduled overnight cleanup for 3 AM daily"
fi

echo ""
echo "Current cron jobs:"
crontab -l 2>/dev/null | grep -E "overnight|cleanup" || echo "  None found"
