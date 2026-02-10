import { NextRequest, NextResponse } from 'next/server';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  moveTaskColumn,
  getTasksByColumn,
  logActivity
} from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const column = searchParams.get('column');

    if (column) {
      const tasks = getTasksByColumn(column);
      return NextResponse.json({ tasks });
    }

    const tasks = getAllTasks();
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const task = createTask({
      title: body.title,
      description: body.description,
      status: body.status || 'todo',
      priority: body.priority || 'medium',
      column: body.column || 'todo',
      due_date: body.due_date,
      tags: body.tags,
      assignee: body.assignee
    });

    // Log activity
    logActivity({
      type: 'task',
      title: `Created task: ${task.title}`,
      description: task.description,
      entity_type: 'task',
      entity_id: task.id
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    // Handle column moves
    if (updates.column) {
      const task = moveTaskColumn(id, updates.column);
      if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      }

      // Log activity
      logActivity({
        type: 'task',
        title: `Moved task to ${updates.column}`,
        description: task.title,
        entity_type: 'task',
        entity_id: task.id
      });

      return NextResponse.json({ task });
    }

    const task = updateTask(id, updates);
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Log activity for important updates
    if (updates.status || updates.priority) {
      logActivity({
        type: 'task',
        title: `Updated task: ${task.title}`,
        description: `Status: ${task.status}, Priority: ${task.priority}`,
        entity_type: 'task',
        entity_id: task.id
      });
    }

    return NextResponse.json({ task });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const deleted = deleteTask(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Log activity
    logActivity({
      type: 'task',
      title: 'Deleted task',
      description: `Task ID: ${id}`,
      entity_type: 'task',
      entity_id: id
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
