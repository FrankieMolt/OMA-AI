import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db, users, apiKeys } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { webhookSchema } from '@/lib/validators';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedErrorResponse,
  forbiddenErrorResponse,
  generateRequestId,
} from '@/lib/api-response';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

// Store webhook subscriptions (in production, this would be in a separate table)
const webhookSubscriptions = new Map<
  string,
  {
    url: string;
    userId: number;
    events: string[];
    secret: string;
    createdAt: Date;
  }
>();

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    // Apply rate limiting (webhooks can be called frequently)
    const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 100 })(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Check if this is an incoming webhook (from external services) or a webhook subscription
    const signature = request.headers.get('x-webhook-signature');

    if (signature) {
      // Handle incoming webhook
      return await handleIncomingWebhook(request, signature, requestId);
    } else {
      // Handle webhook subscription/management
      return await handleWebhookSubscription(request, requestId);
    }
  } catch (error) {
    logger.error('Webhook API error', { error, requestId });
    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}

async function handleIncomingWebhook(request: NextRequest, _signature: string, requestId: string) {
  try {
    const body = await request.json();

    // Validate webhook payload
    const validatedBody = webhookSchema.safeParse(body);

    if (!validatedBody.success) {
      return validationErrorResponse(
        'Invalid webhook payload',
        { errors: validatedBody.error.errors },
        requestId
      );
    }

    const { event, data, timestamp } = validatedBody.data;

    // Verify signature (in production, use HMAC verification)
    // For now, we'll just log the webhook
    logger.info('Incoming webhook received', { event, timestamp, requestId });

    // Process the webhook event based on type
    const result = await processWebhookEvent(event, data, requestId);

    return successResponse({ success: true, processed: true, result });
  } catch (error) {
    logger.error('Error processing incoming webhook', { error, requestId });
    return errorResponse(
      'Failed to process webhook',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}

async function handleWebhookSubscription(request: NextRequest, requestId: string) {
  try {
    // Authenticate user
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser || !authUser.email) {
      return unauthorizedErrorResponse('Authentication required', requestId);
    }

    // Get internal user ID
    const [user] = await db.select().from(users).where(eq(users.email, authUser.email)).limit(1);
    if (!user) {
      return errorResponse('User profile not found', 404, 'NOT_FOUND', undefined, requestId);
    }

    // Check for API key authorization
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey) {
      return errorResponse(
        'API key required for webhook management',
        401,
        'UNAUTHORIZED',
        undefined,
        requestId
      );
    }

    const [keyRecord] = await db.select().from(apiKeys).where(eq(apiKeys.key, apiKey)).limit(1);
    if (!keyRecord || keyRecord.userId !== user.id) {
      return unauthorizedErrorResponse('Invalid API key', requestId);
    }

    const body = await request.json();
    const { action, url, events, secret } = body;

    if (!action) {
      return validationErrorResponse('Action is required', undefined, requestId);
    }

    switch (action) {
      case 'subscribe':
        if (!url || !events || !Array.isArray(events) || events.length === 0) {
          return validationErrorResponse(
            'URL and events are required for subscription',
            undefined,
            requestId
          );
        }

        // Generate webhook ID
        const webhookId = `whk_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

        // Store subscription
        webhookSubscriptions.set(webhookId, {
          url,
          userId: user.id,
          events,
          secret: secret || crypto.randomUUID(),
          createdAt: new Date(),
        });

        logger.info('Webhook subscription created', {
          webhookId,
          userId: user.id,
          events,
          requestId,
        });
        return successResponse({
          webhookId,
          url,
          events,
          status: 'active',
          createdAt: new Date().toISOString(),
        });

      case 'unsubscribe':
        if (!body.webhookId) {
          return validationErrorResponse(
            'webhookId is required for unsubscription',
            undefined,
            requestId
          );
        }

        const subscription = webhookSubscriptions.get(body.webhookId);
        if (!subscription) {
          return errorResponse('Webhook not found', 404, 'NOT_FOUND', undefined, requestId);
        }

        if (subscription.userId !== user.id) {
          return forbiddenErrorResponse('Unauthorized to unsubscribe this webhook', requestId);
        }

        webhookSubscriptions.delete(body.webhookId);
        logger.info('Webhook subscription removed', {
          webhookId: body.webhookId,
          userId: user.id,
          requestId,
        });

        return successResponse({ success: true, message: 'Webhook unsubscribed successfully' });

      case 'list':
        const userSubscriptions = Array.from(webhookSubscriptions.entries())
          .filter(([, sub]) => sub.userId === user.id)
          .map(([id, sub]) => ({
            id,
            url: sub.url,
            events: sub.events,
            status: 'active',
            createdAt: sub.createdAt,
          }));

        return successResponse({ webhooks: userSubscriptions });

      default:
        return validationErrorResponse(
          'Invalid action. Use: subscribe, unsubscribe, or list',
          undefined,
          requestId
        );
    }
  } catch (error) {
    logger.error('Error handling webhook subscription', { error, requestId });
    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}

async function processWebhookEvent(
  event: string,
  data: Record<string, unknown>,
  requestId: string
) {
  logger.info('Processing webhook event', { event, data, requestId });

  switch (event) {
    case 'transaction.completed':
      // Handle completed transaction
      logger.info('Transaction completed webhook', { data, requestId });
      return { status: 'processed', message: 'Transaction completed event handled' };

    case 'transaction.failed':
      // Handle failed transaction
      logger.warn('Transaction failed webhook', { data, requestId });
      return { status: 'processed', message: 'Transaction failed event handled' };

    case 'agent.task.completed':
      // Handle agent task completion
      logger.info('Agent task completed webhook', { data, requestId });
      return { status: 'processed', message: 'Agent task completed event handled' };

    case 'agent.task.failed':
      // Handle agent task failure
      logger.warn('Agent task failed webhook', { data, requestId });
      return { status: 'processed', message: 'Agent task failed event handled' };

    case 'skill.purchased':
      // Handle skill purchase
      logger.info('Skill purchased webhook', { data, requestId });
      return { status: 'processed', message: 'Skill purchased event handled' };

    case 'listing.created':
      // Handle new listing
      logger.info('Listing created webhook', { data, requestId });
      return { status: 'processed', message: 'Listing created event handled' };

    case 'listing.approved':
      // Handle listing approval
      logger.info('Listing approved webhook', { data, requestId });
      return { status: 'processed', message: 'Listing approved event handled' };

    case 'user.registered':
      // Handle new user registration
      logger.info('User registered webhook', { data, requestId });
      return { status: 'processed', message: 'User registered event handled' };

    case 'user.verified':
      // Handle user verification
      logger.info('User verified webhook', { data, requestId });
      return { status: 'processed', message: 'User verified event handled' };

    default:
      logger.warn('Unknown webhook event', { event, data, requestId });
      return { status: 'ignored', message: 'Unknown event type' };
  }
}

// Helper function to send webhook to subscribers
export async function triggerWebhookEvent(event: string, data: Record<string, unknown>) {
  const subscriptions = Array.from(webhookSubscriptions.values()).filter((sub) =>
    sub.events.includes(event)
  );

  for (const subscription of subscriptions) {
    try {
      const payload = {
        event,
        data,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(subscription.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': crypto.randomUUID(), // In production, use HMAC with secret
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        logger.error('Webhook delivery failed', {
          url: subscription.url,
          event,
          status: response.status,
        });
      } else {
        logger.info('Webhook delivered successfully', {
          url: subscription.url,
          event,
        });
      }
    } catch (error) {
      logger.error('Webhook delivery error', {
        url: subscription.url,
        event,
        error,
      });
    }
  }
}
