// CORS headers for cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

export async function GET() {
  const logs = []
  
  // PM2 logs
  try {
    const pm2Logs = execSync('pm2 logs --lines 30 --nostream 2>/dev/null | tail -40', { encoding: 'utf8', timeout: 10000 })
    logs.push({ 
      source: 'pm2', 
      entries: pm2Logs.split('\n')
        .filter(l => l.trim())
        .map(l => l.replace(/\x1b\[[0-9;]*m/g, '')) // Remove ANSI codes
        .slice(-20)
    })
  } catch (e) {
    logs.push({ source: 'pm2', entries: ['PM2 logs unavailable'] })
  }
  
  // System journal
  try {
    const syslog = execSync('journalctl -n 20 --no-pager 2>/dev/null', { encoding: 'utf8', timeout: 10000 })
    logs.push({ 
      source: 'system', 
      entries: syslog.split('\n').filter(l => l.trim())
    })
  } catch (e) {
    logs.push({ source: 'system', entries: ['System logs unavailable'] })
  }
  
  // Nginx/Apache logs if available
  try {
    const accessLog = execSync('tail -10 /var/log/nginx/access.log 2>/dev/null || echo ""', { encoding: 'utf8' })
    if (accessLog.trim()) {
      logs.push({ source: 'nginx', entries: accessLog.split('\n').filter(l => l.trim()) })
    }
  } catch (e) {}
  
  return NextResponse.json({
    logs,
    timestamp: new Date().toISOString(),
    system: {
      hostname: execSync('hostname').toString().trim(),
      uptime: execSync('uptime -p').toString().trim(),
      load: execSync("cat /proc/loadavg | awk '{print $1,$2,$3}'").toString().trim()
    }
  })
}
