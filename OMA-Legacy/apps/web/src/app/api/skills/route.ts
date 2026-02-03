import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { skillsService } from '@/lib/services/skills';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { createSkillSchema, paginationSchema } from '@/lib/validators';
import { z } from 'zod';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedErrorResponse,
  generateRequestId,
} from '@/lib/api-response';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    // Apply rate limiting
    const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 100 })(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate query parameters
    const queryParams = {
      page: request.nextUrl.searchParams.get('page') || '1',
      limit: request.nextUrl.searchParams.get('limit') || '20',
      search: request.nextUrl.searchParams.get('search') || undefined,
      category: request.nextUrl.searchParams.get('category') || undefined,
      sortBy: request.nextUrl.searchParams.get('sortBy') || 'newest',
      status: request.nextUrl.searchParams.get('status') || 'active',
      pricingType: request.nextUrl.searchParams.get('pricingType') || undefined,
      featured: request.nextUrl.searchParams.get('featured') || undefined,
      verified: request.nextUrl.searchParams.get('verified') || undefined,
    };

    const validatedQuery = paginationSchema.safeParse(queryParams);
    if (!validatedQuery.success) {
      return validationErrorResponse(
        'Invalid query parameters',
        { errors: validatedQuery.error.errors },
        requestId
      );
    }

    const { page, limit, search, category, sortBy, status } = validatedQuery.data;
    const { pricingType, featured, verified } = queryParams;
    const offset = (page - 1) * limit;

    // Parse tags from query params
    const tags = request.nextUrl.searchParams.get('tags')?.split(',').filter(Boolean);

    const skills = await skillsService.list({
      search,
      category,
      limit,
      offset,
      sortBy,
      status,
      tags,
      pricingType: pricingType as z.infer<typeof createSkillSchema.shape.pricingType> | undefined,
      featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
      verified: verified === 'true' ? true : verified === 'false' ? false : undefined,
    });

    return successResponse(skills);
  } catch (error) {
    logger.error('Error fetching skills', { error, requestId });
    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    // Apply rate limiting (stricter for create operations)
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

    // Validate request body
    const body = await request.json();
    const validatedBody = createSkillSchema.safeParse(body);

    if (!validatedBody.success) {
      return validationErrorResponse(
        'Invalid request body',
        { errors: validatedBody.error.errors },
        requestId
      );
    }

    // Create skill
    const newSkill = await skillsService.create(
      {
        name: validatedBody.data.name,
        description: validatedBody.data.description,
        category: validatedBody.data.category,
        pricingType: validatedBody.data.pricingType,
        price: validatedBody.data.price,
        tags: validatedBody.data.tags,
        capabilities: validatedBody.data.capabilities,
        githubUrl: validatedBody.data.githubUrl,
        demoUrl: validatedBody.data.demoUrl,
        documentation: validatedBody.data.documentation,
        metadata: validatedBody.data.metadata,
      },
      user.id
    );

    logger.info('Skill created successfully', { skillId: newSkill.id, userId: user.id, requestId });
    return successResponse(newSkill);
  } catch (error) {
    logger.error('Error creating skill', { error, requestId });

    if (error instanceof Error) {
      if (error.message.includes('already exists')) {
        return errorResponse(error.message, 409, 'CONFLICT', undefined, requestId);
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
