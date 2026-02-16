import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  })
}

export async function GET() {
  const logs: any[] = []
  
  try {
    const pm2Logs = execSync('pm2 logs --lines 20 --nostream 2>/dev/null', { encoding: 'utf8', timeout: 10000 })
    logs.push({
      session: 'pm2',
      entries: pm2Logs.split('\n').filter(l => l.trim()).slice(-20)
    })
  } catch (e) {}
  
  return NextResponse.json({ logs, timestamp: new Date().toISOString() }, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  })
}
