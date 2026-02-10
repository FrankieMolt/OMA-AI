import { NextRequest, NextResponse } from 'next/server';
import { getActivities, getActivitiesByType, logActivity } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (type) {
      const activities = getActivitiesByType(type, limit);
      return NextResponse.json({ activities });
    }

    const activities = getActivities(limit);
    return NextResponse.json({ activities });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.type || !body.title) {
      return NextResponse.json({ error: 'Type and title are required' }, { status: 400 });
    }

    const activity = logActivity({
      type: body.type,
      title: body.title,
      description: body.description,
      entity_type: body.entity_type,
      entity_id: body.entity_id
    });

    return NextResponse.json({ activity }, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 });
  }
}
