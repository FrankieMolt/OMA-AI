import { z } from "zod";

export const agentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  capabilities: z.array(z.string()).optional(),
  balance: z.number().min(0).optional(),
});

export const marketplaceServiceSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  category: z.string(),
  price: z.number().positive(),
  tags: z.array(z.string()).optional(),
  endpoint: z.string().url(),
});

export const bountySchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  amount: z.number().positive(),
});
