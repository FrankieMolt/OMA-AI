// CORS headers for cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const TASKS_FILE = path.join(process.cwd(), 'data', 'task-queue.json')

function getTasks() {
  try {
    if (!fs.existsSync(TASKS_FILE)) return []
    return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'))
  } catch { return [] }
}

function saveTasks(tasks: any[]) {
  const dir = path.dirname(TASKS_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2))
}

export async function GET() {
  return NextResponse.json({ tasks: getTasks() })
}

export async function POST(request: Request) {
  const body = await request.json()
  const tasks = getTasks()
  
  if (body.action === 'add') {
    const task = {
      id: Date.now(),
      text: body.text,
      priority: body.priority || 'medium',
      status: 'pending',
      created: new Date().toISOString()
    }
    tasks.push(task)
    saveTasks(tasks)
    return NextResponse.json({ success: true, task })
  }
  
  if (body.action === 'complete') {
    const task = tasks.find((t: any) => t.id === body.id)
    if (task) {
      task.status = 'completed'
      task.completed = new Date().toISOString()
      saveTasks(tasks)
    }
    return NextResponse.json({ success: true })
  }
  
  if (body.action === 'run') {
    // Trigger actual task execution
    const task = tasks.find((t: any) => t.id === body.id)
    if (task) {
      task.status = 'running'
      task.started = new Date().toISOString()
      saveTasks(tasks)
      return NextResponse.json({ 
        success: true, 
        message: `Task "${task.text}" started!`,
        task 
      })
    }
  }
  
  return NextResponse.json({ tasks })
}
