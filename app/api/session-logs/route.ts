import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

export async function GET() {
  const logs: any[] = []
  
  // Get recent session logs
  try {
    const sessionDir = path.join(process.env.HOME || '', '.openclaw', 'sessions')
    if (fs.existsSync(sessionDir)) {
      const files = fs.readdirSync(sessionDir)
        .filter(f => f.endsWith('.jsonl'))
        .slice(-10)
      
      for (const file of files) {
        const content = fs.readFileSync(path.join(sessionDir, file), 'utf8')
        const lines = content.split('\n').filter(l => l.trim()).slice(-20)
        logs.push({
          session: file.replace('.jsonl', ''),
          entries: lines.map(l => {
            try { return JSON.parse(l) } catch { return { text: l } }
          })
        })
      }
    }
  } catch (e) {}
  
  // Get PM2 logs
  try {
    const pm2Logs = execSync('pm2 logs --lines 20 --nostream 2>/dev/null', { encoding: 'utf8' })
    logs.push({
      session: 'pm2',
      entries: pm2Logs.split('\n').filter(l => l.trim()).slice(-20)
    })
  } catch (e) {}
  
  return NextResponse.json({ logs, timestamp: new Date().toISOString() })
}
