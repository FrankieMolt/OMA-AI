import { NextResponse } from 'next/server'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  const body = await request.json()
  const topic = body.topic || 'agentic web'
  
  // Create research task
  const researchDir = path.join(process.cwd(), 'data', 'research')
  if (!fs.existsSync(researchDir)) fs.mkdirSync(researchDir, { recursive: true })
  
  const task = {
    id: `research-${Date.now()}`,
    topic,
    status: 'queued',
    created: new Date().toISOString(),
    results: []
  }
  
  // Save task
  const taskFile = path.join(researchDir, `${task.id}.json`)
  fs.writeFileSync(taskFile, JSON.stringify(task, null, 2))
  
  // Try to actually run research
  try {
    const searchResults = execSync(`web_search "${topic}" 2>/dev/null || echo "Search queued"`, { 
      encoding: 'utf8',
      timeout: 30000
    })
    task.results.push({ source: 'web_search', data: searchResults.substring(0, 500) })
  } catch (e) {}
  
  task.status = 'in_progress'
  fs.writeFileSync(taskFile, JSON.stringify(task, null, 2))
  
  return NextResponse.json({ 
    success: true, 
    message: `🔍 Research started on: ${topic}`,
    task,
    note: 'Frankie will complete this research task'
  })
}
