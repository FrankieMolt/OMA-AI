import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

// OpenClaw System Log API for LobsterBoard
export async function GET() {
  const logs = []
  
  try {
    // Get recent PM2 logs
    const pm2Logs = execSync('pm2 logs --lines 10 --nostream 2>/dev/null | tail -20', { encoding: 'utf8' })
    logs.push({ source: 'pm2', entries: pm2Logs.split('\n').filter(l => l.trim()).slice(-10) })
  } catch (e) {
    logs.push({ source: 'pm2', entries: ['PM2 not available'] })
  }
  
  try {
    // Get recent system messages
    const syslog = execSync('journalctl -n 10 --no-pager 2>/dev/null || echo "journalctl not available"', { encoding: 'utf8' })
    logs.push({ source: 'system', entries: syslog.split('\n').filter(l => l.trim()) })
  } catch (e) {
    logs.push({ source: 'system', entries: ['System logs not available'] })
  }
  
  return NextResponse.json({
    logs,
    timestamp: new Date().toISOString()
  })
}
