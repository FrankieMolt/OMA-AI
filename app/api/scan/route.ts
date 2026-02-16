import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST() {
  const results: any = {
    timestamp: new Date().toISOString(),
    sites: [],
    system: {},
    actions: []
  }
  
  // Scan production sites
  const sites = [
    { name: 'OMA-AI', url: 'https://oma-ai.com' },
    { name: 'SpendThrone', url: 'https://spendthrone-olive.vercel.app' },
    { name: 'Lethometry', url: 'https://lethometry.vercel.app' }
  ]
  
  for (const site of sites) {
    try {
      const start = Date.now()
      const status = execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 10 ${site.url}`, { encoding: 'utf8' })
      const time = Date.now() - start
      results.sites.push({ 
        name: site.name, 
        url: site.url, 
        status: status.trim(),
        responseTime: `${time}ms`,
        healthy: status.trim() === '200'
      })
    } catch (e) {
      results.sites.push({ name: site.name, url: site.url, status: 'ERROR', healthy: false })
    }
  }
  
  // System stats
  try {
    results.system = {
      hostname: execSync('hostname').toString().trim(),
      uptime: execSync('uptime -p').toString().trim(),
      memory: execSync("free -h | grep Mem | awk '{print $3\"/\"$2}'").toString().trim(),
      disk: execSync("df -h / | tail -1 | awk '{print $3\"/\"$2\" (\"$5\")\"}'").toString().trim()
    }
  } catch (e) {}
  
  return NextResponse.json({ success: true, results }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    }
  })
}
