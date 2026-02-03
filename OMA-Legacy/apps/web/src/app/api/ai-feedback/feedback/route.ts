import { NextResponse } from 'next/server';
import { db, aiFeedbackRecords } from '@/lib/db';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { taskId, type, prompt, response, score, metadata } = body;

    if (!taskId || !type || !prompt || !response) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newFeedback = await db
      .insert(aiFeedbackRecords)
      .values({
        taskId,
        type,
        prompt,
        response,
        score: score ? parseInt(String(score), 10) : 0,
        metadata: metadata || {},
      })
      .returning();

    return NextResponse.json(newFeedback[0]);
  } catch (error) {
    logger.error('Error saving feedback:', error as Record<string, unknown>);
    return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 });
  }
}
