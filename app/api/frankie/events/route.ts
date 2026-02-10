import { NextRequest, NextResponse } from 'next/server';
import {
  getAllEvents,
  getEventsByDateRange,
  createEvent,
  updateEvent,
  deleteEvent,
  logActivity
} from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');

    if (startDate && endDate) {
      const events = getEventsByDateRange(startDate, endDate);
      return NextResponse.json({ events });
    }

    const events = getAllEvents();
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.start_date) {
      return NextResponse.json({ error: 'Title and start date are required' }, { status: 400 });
    }

    const event = createEvent({
      title: body.title,
      description: body.description,
      start_date: body.start_date,
      end_date: body.end_date,
      location: body.location,
      type: body.type || 'meeting',
      status: body.status || 'scheduled',
      tags: body.tags
    });

    // Log activity
    logActivity({
      type: 'event',
      title: `Created event: ${event.title}`,
      description: `${event.start_date}${event.end_date ? ` to ${event.end_date}` : ''}`,
      entity_type: 'event',
      entity_id: event.id
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    const event = updateEvent(id, updates);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Log activity for status changes
    if (updates.status) {
      logActivity({
        type: 'event',
        title: `Updated event: ${event.title}`,
        description: `Status changed to ${event.status}`,
        entity_type: 'event',
        entity_id: event.id
      });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    const deleted = deleteEvent(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Log activity
    logActivity({
      type: 'event',
      title: 'Deleted event',
      description: `Event ID: ${id}`,
      entity_type: 'event',
      entity_id: id
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
