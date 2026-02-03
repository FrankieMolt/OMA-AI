import { NextResponse } from 'next/server';
import { db, aiFeedbackLessons } from '@/lib/db';
import { desc, like } from 'drizzle-orm';
import { logger } from '@/lib/logger';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const context = searchParams.get('context');

    let query;

    if (context) {
      query = db
        .select()
        .from(aiFeedbackLessons)
        .where(like(aiFeedbackLessons.context, `%${context}%`))
        .orderBy(desc(aiFeedbackLessons.confidence));
    } else {
      query = db.select().from(aiFeedbackLessons).orderBy(desc(aiFeedbackLessons.createdAt));
    }

    const lessons = await query;
    return NextResponse.json(lessons);
  } catch (error) {
    logger.error('Error fetching lessons:', error as Record<string, unknown>);
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}

export async function POST(_request: Request) {
  try {
    const body = await _request.json();
    const { context, learning, confidence } = body;

    if (!context || !learning) {
      return NextResponse.json({ error: 'Context and learning are required' }, { status: 400 });
    }

    const newLesson = await db
      .insert(aiFeedbackLessons)
      .values({
        context,
        learning,
        confidence: typeof confidence === 'number' ? confidence : 1.0,
        usageCount: 0,
      })
      .returning();

    return NextResponse.json(newLesson[0]);
  } catch (error) {
    logger.error('Error creating lesson:', error as Record<string, unknown>);
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 });
  }
}
