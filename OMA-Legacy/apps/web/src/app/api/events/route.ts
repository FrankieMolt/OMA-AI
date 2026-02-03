import { NextRequest } from 'next/server';

// Send SSE event
function sendEvent(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
  event: string,
  data: unknown
) {
  const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  controller.enqueue(encoder.encode(message));
}

// GET /api/events - Server-Sent Events endpoint for real-time updates
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no', // Disable nginx buffering
  });

  let controller: ReadableStreamDefaultController | null = null;
  let connected = true;

  const stream = new ReadableStream({
    start(streamController) {
      controller = streamController;

      // Send initial connection event
      sendEvent(controller, encoder, 'system', {
        type: 'connected',
        timestamp: new Date().toISOString(),
        message: 'Real-time connection established',
      });

      // Simulate periodic updates (in production, this would be triggered by actual events)
      const updateInterval = setInterval(() => {
        if (!connected || !controller) {
          clearInterval(updateInterval);
          return;
        }

        // Send random activity updates
        const activities = [
          {
            type: 'success',
            title: 'API Call Successful',
            description: 'Agent processed request in 234ms',
          },
          {
            type: 'info',
            title: 'New Deployment',
            description: 'Agent v2.1.0 deployed successfully',
          },
          {
            type: 'warning',
            title: 'High Usage Alert',
            description: 'Usage spike detected (450 req/min)',
          },
          { type: 'success', title: 'Payment Received', description: '$15.00 USDC deposited' },
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];

        sendEvent(controller, encoder, 'activity', {
          id: Date.now(),
          type: randomActivity.type,
          title: randomActivity.title,
          description: randomActivity.description,
          timestamp: new Date().toISOString(),
        });

        // Send balance updates occasionally
        if (Math.random() > 0.7) {
          sendEvent(controller, encoder, 'balance', {
            credits: Math.floor(Math.random() * 10000) + 5000,
            usdcBalance: (Math.random() * 1000).toFixed(2),
            timestamp: new Date().toISOString(),
          });
        }

        // Send agent status updates
        if (Math.random() > 0.8) {
          sendEvent(controller, encoder, 'agent', {
            agentId: Math.floor(Math.random() * 10) + 1,
            status: Math.random() > 0.9 ? 'error' : 'active',
            uptime: Math.floor(Math.random() * 99) + 1,
            timestamp: new Date().toISOString(),
          });
        }
      }, 5000); // Update every 5 seconds

      request.signal.addEventListener('abort', () => {
        connected = false;
        clearInterval(updateInterval);
      });
    },
    cancel() {
      connected = false;
    },
  });

  return new Response(stream, { headers });
}

// POST /api/events - Send custom event (for internal use)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event } = body;

    // In production, this would broadcast to connected clients via a pub/sub system
    // For now, we'll just acknowledge receipt
    return Response.json({
      success: true,
      message: 'Event received',
      event,
    });
  } catch {  
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
