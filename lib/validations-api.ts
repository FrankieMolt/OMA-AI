/**
 * API Input Validation Schemas using Zod
 * Provides type-safe validation for all API endpoints
 */

import { z } from "zod";

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
});

export const walletAuthSchema = z.object({
  walletAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum wallet address"),
  signature: z.string().min(1, "Signature is required"),
  message: z.string().min(1, "Message is required"),
});

// Payment Schemas
export const paymentRequestSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
  amount: z.number().positive("Amount must be positive"),
  network: z.enum(["ethereum", "solana"], "Invalid network"),
  paymentMethod: z.enum(
    ["usdc_base", "usdc_solana", "eth"],
    "Invalid payment method",
  ),
});

export const executePaymentSchema = z.object({
  paymentId: z.string().uuid("Invalid payment ID"),
  transactionHash: z.string().min(1, "Transaction hash is required"),
  network: z.enum(["ethereum", "solana"]),
});

// Marketplace Schemas
export const serviceCreateSchema = z.object({
  name: z.string().min(3, "Service name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(
    ["ai", "mcp", "data", "blockchain", "infrastructure"],
    "Invalid service type",
  ),
  price: z.number().positive("Price must be positive"),
  capabilities: z
    .array(z.string())
    .min(1, "At least one capability is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  endpoint: z.string().url("Invalid endpoint URL"),
});

export const serviceUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.number().positive().optional(),
  status: z.enum(["active", "inactive", "deprecated"]).optional(),
});

// Bounties/Tasks Schemas
export const bountyCreateSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  reward: z.number().positive("Reward must be positive"),
  category: z.enum(
    ["development", "design", "testing", "documentation", "other"],
    "Invalid category",
  ),
  deadline: z.string().datetime("Invalid deadline format"),
  requirements: z.array(z.string()).optional(),
});

export const bountyApplySchema = z.object({
  bountyId: z.string().uuid("Invalid bounty ID"),
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters"),
  estimatedHours: z.number().positive("Estimated hours must be positive"),
  priceQuote: z.number().positive("Price quote must be positive").optional(),
});

// Contact/Support Schemas
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  recaptchaToken: z.string().optional(),
});

// User Schemas
export const userUpdateSchema = z.object({
  fullName: z.string().min(2).optional(),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/)
    .optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
});

// MCP Server Schemas
export const mcpServerSchema = z.object({
  name: z.string().min(3, "Server name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(
    ["github", "brave-search", "filesystem", "postgres", "custom"],
    "Invalid MCP server type",
  ),
  endpoint: z.string().url("Invalid endpoint URL"),
  capabilities: z
    .array(z.string())
    .min(1, "At least one capability is required"),
  version: z.string().optional(),
});

// Error Response Types
export const ApiError = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.any().optional(),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type WalletAuthInput = z.infer<typeof walletAuthSchema>;
export type PaymentRequestInput = z.infer<typeof paymentRequestSchema>;
export type ExecutePaymentInput = z.infer<typeof executePaymentSchema>;
export type ServiceCreateInput = z.infer<typeof serviceCreateSchema>;
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>;
export type BountyCreateInput = z.infer<typeof bountyCreateSchema>;
export type BountyApplyInput = z.infer<typeof bountyApplySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type McpServerInput = z.infer<typeof mcpServerSchema>;
