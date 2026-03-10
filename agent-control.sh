#!/bin/bash
# Agent Control Script

case "$1" in
  start)
    echo "Starting autonomous agent..."
    nohup ./autonomous-agent.sh > /dev/null 2>&1 &
    echo $! > .agent.pid
    echo "Agent started (PID: $(cat .agent.pid))"
    ;;
  stop)
    if [ -f .agent.pid ]; then
      echo "Stopping agent (PID: $(cat .agent.pid))..."
      kill $(cat .agent.pid) 2>/dev/null
      rm .agent.pid
      echo "Agent stopped"
    else
      echo "Agent not running"
    fi
    ;;
  status)
    if [ -f .agent.pid ] && kill -0 $(cat .agent.pid) 2>/dev/null; then
      echo "Agent is running (PID: $(cat .agent.pid))"
      echo ""
      echo "Recent activity:"
      tail -20 logs/autonomous/agent-$(date +%Y%m%d).log 2>/dev/null || echo "No logs yet"
    else
      echo "Agent is not running"
    fi
    ;;
  logs)
    tail -f logs/autonomous/agent-$(date +%Y%m%d).log 2>/dev/null
    ;;
  *)
    echo "Usage: $0 {start|stop|status|logs}"
    echo ""
    echo "Commands:"
    echo "  start  - Start the autonomous agent"
    echo "  stop   - Stop the autonomous agent"
    echo "  status - Check agent status and recent activity"
    echo "  logs   - View live logs"
    ;;
esac
