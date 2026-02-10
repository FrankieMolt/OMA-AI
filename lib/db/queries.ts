import { db } from './schema';
import { v4 as uuidv4 } from 'uuid';

// ============== TASKS ==============

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  column: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  due_date?: string;
  created_at: string;
  updated_at: string;
  tags?: string;
  assignee?: string;
}

export function createTask(data: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Task {
  const id = uuidv4();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO tasks (id, title, description, status, priority, column, due_date, created_at, updated_at, tags, assignee)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    data.title,
    data.description || null,
    data.status,
    data.priority,
    data.column,
    data.due_date || null,
    now,
    now,
    data.tags || null,
    data.assignee || null
  );

  return { ...data, id, created_at: now, updated_at: now };
}

export function getTask(id: string): Task | undefined {
  const stmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
  return stmt.get(id) as Task | undefined;
}

export function getAllTasks(): Task[] {
  const stmt = db.prepare('SELECT * FROM tasks ORDER BY priority DESC, created_at DESC');
  return stmt.all() as Task[];
}

export function getTasksByColumn(column: string): Task[] {
  const stmt = db.prepare('SELECT * FROM tasks WHERE column = ? ORDER BY priority DESC, created_at ASC');
  return stmt.all(column) as Task[];
}

export function updateTask(id: string, data: Partial<Omit<Task, 'id' | 'created_at'>>): Task | undefined {
  const task = getTask(id);
  if (!task) return undefined;

  const now = new Date().toISOString();
  const updates: string[] = [];
  const values: any[] = [];

  Object.entries(data).forEach(([key, value]) => {
    updates.push(`${key} = ?`);
    values.push(value);
  });

  updates.push('updated_at = ?');
  values.push(now);
  values.push(id);

  const stmt = db.prepare(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`);
  stmt.run(...values);

  return getTask(id);
}

export function deleteTask(id: string): boolean {
  const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

export function moveTaskColumn(id: string, newColumn: Task['column']): Task | undefined {
  return updateTask(id, { column: newColumn, status: newColumn === 'done' ? 'done' : 'in-progress' });
}

// ============== EVENTS ==============

export interface Event {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  location?: string;
  type: 'meeting' | 'deadline' | 'reminder' | 'milestone';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  tags?: string;
}

export function createEvent(data: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Event {
  const id = uuidv4();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO events (id, title, description, start_date, end_date, location, type, status, created_at, updated_at, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    data.title,
    data.description || null,
    data.start_date,
    data.end_date || null,
    data.location || null,
    data.type,
    data.status,
    now,
    now,
    data.tags || null
  );

  return { ...data, id, created_at: now, updated_at: now };
}

export function getEvent(id: string): Event | undefined {
  const stmt = db.prepare('SELECT * FROM events WHERE id = ?');
  return stmt.get(id) as Event | undefined;
}

export function getAllEvents(): Event[] {
  const stmt = db.prepare('SELECT * FROM events ORDER BY start_date ASC');
  return stmt.all() as Event[];
}

export function getEventsByDateRange(startDate: string, endDate: string): Event[] {
  const stmt = db.prepare(`
    SELECT * FROM events
    WHERE start_date >= ? AND start_date <= ?
    ORDER BY start_date ASC
  `);
  return stmt.all(startDate, endDate) as Event[];
}

export function updateEvent(id: string, data: Partial<Omit<Event, 'id' | 'created_at'>>): Event | undefined {
  const event = getEvent(id);
  if (!event) return undefined;

  const now = new Date().toISOString();
  const updates: string[] = [];
  const values: any[] = [];

  Object.entries(data).forEach(([key, value]) => {
    updates.push(`${key} = ?`);
    values.push(value);
  });

  updates.push('updated_at = ?');
  values.push(now);
  values.push(id);

  const stmt = db.prepare(`UPDATE events SET ${updates.join(', ')} WHERE id = ?`);
  stmt.run(...values);

  return getEvent(id);
}

export function deleteEvent(id: string): boolean {
  const stmt = db.prepare('DELETE FROM events WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

// ============== ACTIVITIES ==============

export interface Activity {
  id: string;
  type: 'task' | 'event' | 'file' | 'system';
  title: string;
  description?: string;
  entity_type?: string;
  entity_id?: string;
  created_at: string;
}

export function logActivity(data: Omit<Activity, 'id' | 'created_at'>): Activity {
  const id = uuidv4();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO activities (id, type, title, description, entity_type, entity_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    data.type,
    data.title,
    data.description || null,
    data.entity_type || null,
    data.entity_id || null,
    now
  );

  return { ...data, id, created_at: now };
}

export function getActivities(limit: number = 50, offset: number = 0): Activity[] {
  const stmt = db.prepare('SELECT * FROM activities ORDER BY created_at DESC LIMIT ? OFFSET ?');
  return stmt.all(limit, offset) as Activity[];
}

export function getActivitiesByType(type: string, limit: number = 50): Activity[] {
  const stmt = db.prepare('SELECT * FROM activities WHERE type = ? ORDER BY created_at DESC LIMIT ?');
  return stmt.all(type, limit) as Activity[];
}

// ============== FILE INDEX ==============

export interface FileIndex {
  id: string;
  path: string;
  filename: string;
  content: string;
  last_modified: string;
  indexed_at: string;
  file_type: string;
  size: number;
}

export function indexFile(data: Omit<FileIndex, 'id' | 'indexed_at'>): FileIndex {
  const id = uuidv4();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO file_index (id, path, filename, content, last_modified, indexed_at, file_type, size)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(path) DO UPDATE SET
      content = excluded.content,
      last_modified = excluded.last_modified,
      indexed_at = excluded.indexed_at,
      file_type = excluded.file_type,
      size = excluded.size
  `);

  stmt.run(
    id,
    data.path,
    data.filename,
    data.content || null,
    data.last_modified,
    now,
    data.file_type || null,
    data.size || 0
  );

  return { ...data, id, indexed_at: now };
}

export function searchFiles(query: string, limit: number = 20): FileIndex[] {
  const stmt = db.prepare(`
    SELECT * FROM file_index
    WHERE filename LIKE ? OR content LIKE ?
    ORDER BY
      CASE
        WHEN filename LIKE ? THEN 1
        ELSE 2
      END,
      indexed_at DESC
    LIMIT ?
  `);
  const searchTerm = `%${query}%`;
  return stmt.all(searchTerm, searchTerm, `${query}%`, limit) as FileIndex[];
}

export function getIndexedFiles(limit: number = 100): FileIndex[] {
  const stmt = db.prepare('SELECT * FROM file_index ORDER BY indexed_at DESC LIMIT ?');
  return stmt.all(limit) as FileIndex[];
}

export function clearFileIndex(): void {
  db.prepare('DELETE FROM file_index').run();
}
