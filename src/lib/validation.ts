import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  category: z.enum(['general', 'support', 'bug-report', 'feature-request', 'mcp-inquiry', 'business-inquiry']),
});

export const mcpRegisterSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10).max(500),
  category: z.string().min(1),
  tools: z.array(z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    input_schema: z.record(z.string(), z.unknown()).optional(),
  })).optional(),
});

export const x402SignSchema = z.object({
  payload: z.string().min(1),
  timestamp: z.number().positive(),
  nonce: z.string().min(1).max(100),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type MCPRegisterInput = z.infer<typeof mcpRegisterSchema>;
export type X402SignInput = z.infer<typeof x402SignSchema>;
