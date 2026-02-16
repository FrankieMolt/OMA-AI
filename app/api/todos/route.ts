// CORS headers for cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const TODO_FILE = path.join(process.cwd(), 'data', 'todos.json')

function getTodos() {
  try {
    if (!fs.existsSync(TODO_FILE)) return []
    return JSON.parse(fs.readFileSync(TODO_FILE, 'utf8'))
  } catch {
    return []
  }
}

function saveTodos(todos: any[]) {
  const dir = path.dirname(TODO_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2))
}

export async function GET() {
  return NextResponse.json({ todos: getTodos() })
}

export async function POST(request: Request) {
  const body = await request.json()
  const todos = getTodos()
  
  if (body.action === 'add') {
    todos.push({
      id: Date.now(),
      text: body.text,
      done: false,
      created: new Date().toISOString()
    })
  } else if (body.action === 'toggle') {
    const todo = todos.find((t: any) => t.id === body.id)
    if (todo) todo.done = !todo.done
  } else if (body.action === 'delete') {
    const idx = todos.findIndex((t: any) => t.id === body.id)
    if (idx > -1) todos.splice(idx, 1)
  }
  
  saveTodos(todos)
  return NextResponse.json({ success: true, todos })
}
