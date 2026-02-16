#!/bin/bash
# Frankie's Overnight Monitor - Runs every 5 minutes

LOG="/home/nosyt/.openclaw/workspace/logs/overnight-$(date +%Y%m%d).log"
ALERTS="/home/nosyt/.openclaw/workspace/logs/alerts.log"

log() {
  echo "[$(date '+%H:%M:%S')] $1" >> "$LOG"
}

alert() {
  echo "[ALERT $(date)] $1" >> "$ALERTS"
}

log "=== Starting overnight monitor ==="

# Check production sites
for site in "https://oma-ai.com" "https://spendthrone-olive.vercel.app" "https://lethometry.vercel.app"; do
  name=$(basename "$site" .vercel.app)
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$site" 2>/dev/null)
  if [ "$code" = "200" ]; then
    log "✅ $name: HTTP $code"
  else
    log "❌ $name: HTTP $code"
    alert "$name DOWN - HTTP $code"
    # Try to restart local service
    pm2 restart "$name" 2>/dev/null
  fi
done

# Check local services
for port in 3000 3001 3002; do
  case $port in
    3000) name="oma-ai" ;;
    3001) name="spendthrone" ;;
    3002) name="lethometry" ;;
  esac
  if curl -s -o /dev/null --max-time 5 "http://localhost:$port" 2>/dev/null; then
    log "✅ Local $name: responding"
  else
    log "❌ Local $name: not responding"
    alert "Local $name not responding on port $port"
    pm2 restart "$name" 2>/dev/null
  fi
done

# Check disk space
disk=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
if [ "$disk" -gt 80 ]; then
  log "⚠️ Disk usage: ${disk}%"
  alert "Disk usage high: ${disk}%"
fi

# Check memory
mem=$(free | awk '/Mem/{printf "%.0f", $3/$2*100}')
if [ "$mem" -gt 90 ]; then
  log "⚠️ Memory usage: ${mem}%"
  alert "Memory usage high: ${mem}%"
fi

log "=== Monitor cycle complete ==="
