import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

export async function POST() {
  try {
    const results = {
      timestamp: new Date().toISOString(),
      sites: [],
      system: {}
    }
    
    // Check production sites
    const sites = [
      { name: 'OMA-AI', url: 'https://oma-ai.com' },
      { name: 'SpendThrone', url: 'https://spendthrone-olive.vercel.app' },
      { name: 'Lethometry', url: 'https://lethometry.vercel.app' }
    ]
    
    for (const site of sites) {
      try {
        const res = execSync(`curl -s -o /dev/null -w "%{http_code}" ${site.url}`, { encoding: 'utf8', timeout: 10000 })
        results.sites.push({ name: site.name, url: site.url, status: res.trim() })
      } catch (e) {
        results.sites.push({ name: site.name, url: site.url, status: 'ERROR' })
      }
    }
    
    // System stats
    results.system = {
      uptime: execSync('uptime -p', { encoding: 'utf8' }).trim(),
      memory: execSync("free -h | grep Mem | awk '{print $3\"/\"$2}'", { encoding: 'utf8' }).trim(),
      disk: execSync("df -h / | tail -1 | awk '{print $3\"/\"$2\" (\"$5\")\"}'", { encoding: 'utf8' }).trim()
    }
    
    return NextResponse.json({ success: true, results })
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
