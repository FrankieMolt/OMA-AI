import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { skillsService, type UpdateSkillParams } from '@/lib/services/skills';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { updateSkillSchema } from '@/lib/validators';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedErrorResponse,
  notFoundErrorResponse,
  generateRequestId,
} from '@/lib/api-response';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const requestId = generateRequestId();

  try {
    // Apply rate limiting
    const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 100 })(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const slug = (await params).slug;
    const skill = await skillsService.getBySlug(slug);

    if (!skill) {
      return notFoundErrorResponse('Skill', requestId);
    }

    return successResponse(skill);
  } catch (error) {
    logger.error('Error fetching skill by slug', { error, requestId });
    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const requestId = generateRequestId();

  try {
    // Apply rate limiting
    const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 20 })(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

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

    // Get skill by slug first
    const slug = (await params).slug;
    const existingSkill = await skillsService.getBySlug(slug);

    if (!existingSkill || !existingSkill.skill) {
      return notFoundErrorResponse('Skill', requestId);
    }

    const skillId = existingSkill.skill.id;

    // Validate request body
    const body = await request.json();
    const validatedBody = updateSkillSchema.safeParse(body);

    if (!validatedBody.success) {
      return validationErrorResponse(
        'Invalid request body',
        { errors: validatedBody.error.errors },
        requestId
      );
    }

    // Update skill
    const updatePayload: UpdateSkillParams = { ...validatedBody.data };
    const updatedSkill = await skillsService.update(skillId, updatePayload, user.id);

    logger.info('Skill updated successfully', { skillId, userId: user.id, requestId });
    return successResponse(updatedSkill);
  } catch (error) {
    logger.error('Error updating skill', { error, requestId });

    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return notFoundErrorResponse('Skill', requestId);
      }
      if (error.message.includes('Unauthorized')) {
        return errorResponse(error.message, 403, 'FORBIDDEN', undefined, requestId);
      }
    }

    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const requestId = generateRequestId();

  try {
    // Apply rate limiting
    const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 10 })(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

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

    // Get skill by slug first
    const slug = (await params).slug;
    const existingSkill = await skillsService.getBySlug(slug);

    if (!existingSkill || !existingSkill.skill) {
      return notFoundErrorResponse('Skill', requestId);
    }

    const skillId = existingSkill.skill.id;

    // Delete skill
    await skillsService.delete(skillId, user.id);

    logger.info('Skill deleted successfully', { skillId, userId: user.id, requestId });
    return successResponse({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    logger.error('Error deleting skill', { error, requestId });

    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return notFoundErrorResponse('Skill', requestId);
      }
      if (error.message.includes('Unauthorized')) {
        return errorResponse(error.message, 403, 'FORBIDDEN', undefined, requestId);
      }
    }

    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}
