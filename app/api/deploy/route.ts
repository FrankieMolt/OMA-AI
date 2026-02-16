import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

export async function POST(request: Request) {
  const body = await request.json()
  const site = body.site || 'all'
  
  const results: any = {
    timestamp: new Date().toISOString(),
    site,
    status: 'started'
  }
  
  try {
    if (site === 'oma-ai' || site === 'all') {
      execSync('cd /home/nosyt/.openclaw/workspace && git add -A && git commit -m "Auto deploy" && git push origin main 2>&1', { 
        encoding: 'utf8',
        timeout: 60000 
      })
      results.omaAi = 'Deployment triggered'
    }
    
    results.status = 'completed'
    results.message = `✅ Deployment triggered for: ${site}`
  } catch (e) {
    results.status = 'error'
    results.error = e.message
  }
  
  return NextResponse.json(results)
}
