# OMA-AI Codebase Analysis — Context-Aware Refactoring Guide

_Created: 2026-03-31_
_Author: FRANKIE_

---

## 1. Current Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (~153 source files)
- **Styling**: Tailwind CSS + CSS Variables (no component library)
- **Database**: Supabase (PostgreSQL) — not yet configured
- **Payments**: x402 (EIP-712 USDC on Base)
- **Auth**: Supabase Auth (stubbed)
- **Testing**: Vitest + Playwright

### Directory Structure
```
src/
├── app/                    # App Router pages + API routes
│   ├── [slug]/             # Dynamic route pages
│   ├── api/                # API routes (18 endpoints)
│   │   ├── mcp/            # MCP marketplace API
│   │   ├── x402/           # Payment signing
│   │   └── trading/        # Trading bot proxy
│   └── (38 route dirs)
├── components/             # React components
│   ├── mcp-marketplace/    # MCP-specific components
│   ├── ui/                 # Shared UI primitives
│   └── transactions/       # Transaction components
└── lib/
    ├── supabase/           # Supabase client + types + server
    ├── x402/               # Payment infrastructure
    ├── utils/              # Utility functions (cn() only)
    ├── types.ts            # Shared TypeScript interfaces
    ├── mcp-data.ts         # HARDCODED fallback MCP data
    ├── mcp-icons.ts        # MCP icon/name mapping
    ├── category-icons.ts   # Category→emoji mapping
    ├── query-keys.ts       # React Query keys
    ├── rate-limiter.ts      # API rate limiting
    └── validation.ts        # Input validation
```

---

## 2. Existing Conventions (DO NOT CHANGE)

### Naming Conventions — Already Consistent
| Thing | Convention | Example |
|-------|-----------|---------|
| Files | kebab-case | `mcp-data.ts`, `category-icons.ts` |
| React components | PascalCase | `HeroSection.tsx`, `LiveTradingStatus.tsx` |
| Functions/variables | camelCase | `normalizeMCP`, `parsePrice` |
| TypeScript interfaces | PascalCase | `MCPSkill`, `X402Config` |
| API route files | kebab-case | `mcp/list/route.ts`, `rate-limit/route.ts` |
| Directories | kebab-case | `mcp-marketplace/`, `category-icons.ts` |

### Patterns — Already Working Well

**1. Server Components by default, client only when needed**
```tsx
// Default: Server Component
export const metadata: Metadata = { ... };
export default function HomePage() { ... }

// Explicit dynamic + loading state for heavy client components
const LiveTradingStatus = dynamic(
  () => import('@/components/live-trading-status').then(mod => ({ default: mod.LiveTradingStatus })),
  { loading: () => <div className="h-48 animate-pulse..." /> }
);
```
**Verdict**: ✅ Keep this pattern. Works well with Next.js App Router.

**2. API response shape — consistent across all routes**
```typescript
// All API routes use this shape
return NextResponse.json({ success: true, data: {...} });
return NextResponse.json({ success: false, error: '...' }, { status: 400 });
```
**Verdict**: ✅ Keep. Good consistency.

**3. Graceful Supabase degradation**
```typescript
export function isSupabaseConfigured() {
  return !!(supabaseUrl && supabaseAnonKey);
}
export function handleSupabaseError(error: any, context: string) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('...'), isGraceful: true };
  }
  return { data: null, error, isGraceful: false };
}
```
**Verdict**: ✅ Keep. Smart pattern — site stays up without Supabase.

**4. x402 payment infrastructure**
- `NETWORKS` config object — clean abstraction
- `parsePrice()` / `formatPrice()` — good utility functions
- `createPaymentRequirement()` — well-structured
**Verdict**: ✅ Keep. Production-ready pattern.

**5. Type exports from `types.ts`**
```typescript
export interface MCPSkill { ... }
export interface Agent { ... }
```
**Verdict**: ✅ Keep. Single source of truth.

**6. Tailwind CSS with CSS custom properties**
- `bg-[var(--name)]` for theming
- CSS variables in `globals.css`
**Verdict**: ✅ Keep. Simple and effective.

---

## 3. Problems to Fix (High Priority)

### Problem 1: Dead Code Bloat
**Location**: `src/app/archive/` — 712 deleted lines worth of archived code still referenced in imports.

**Impact**: Confusing to new developers, possible broken imports.

**Fix**: Delete `src/app/archive/` entirely. No复活.

---

### Problem 2: `mcp-data.ts` is 500+ lines of hardcoded everything
**Current state**: Every MCP's description, tools, pricing, endpoint, etc. hardcoded in a single 500-line file.

**Issues**:
- Duplicate interfaces (`MCPServer` in mcp-data.ts, `MCPSkill` in types.ts — slightly different)
- Data not normalized — some fields are `mcp_endpoint`, others `endpoint`
- Hardcoded fake `calls` numbers (12,847, 89,32, etc. — these look like static mocks)
- Environment variable placeholders (`NEXT_PUBLIC_MCP_HELIUS_URL || "https://mcp.oma-ai.com/helius-solana"`) for endpoints that don't exist

**What to do**:
- Keep as FALLBACK only (document clearly with `// FALLBACK DATA — used when Supabase is not configured`)
- The Supabase `mcp_servers` table should be the PRIMARY source
- Fix: `api/mcp/list/route.ts` already tries Supabase first, falls back to this data ✅ — but the data itself is the problem

**Fix**: Audit every MCP entry — remove fake metrics, make data accurate to what actually exists.

---

### Problem 3: Duplicate TypeScript interfaces

**`MCPServer` defined in TWO places:**
```typescript
// src/lib/mcp-data.ts
export interface MCPServer {
  id: string; name: string; slug: string; description: string;
  mcp_endpoint: string; pricing_usdc: number; ...
}

// src/lib/types.ts
export interface MCPSkill { ... } // Different name, similar shape
```

**Fix**: Keep `MCPSkill` in `types.ts` as the canonical type. Remove `MCPServer` from `mcp-data.ts` and import from `types.ts`.

---

### Problem 4: `src/lib/utils/` has only ONE utility function

```typescript
// src/lib/utils/fetchJson.ts
// src/lib/utils/
//   fetchJson.ts — one file, one function
```

But `src/lib/utils.ts` also exists with just `cn()` from `clsx`/`tailwind-merge`.

**Fix**: Merge `cn()` into `utils/index.ts` and delete `utils.ts`. Keep `utils/` for future utilities.

---

### Problem 5: No centralized API client for external services

Every API route does this:
```typescript
const { createClient } = await import('@supabase/supabase-js');
const supabase = createClient(url, key);
```

**Issues**:
- Dynamic import in every route (adds overhead)
- `getSupabaseClient()` exists but isn't used in API routes
- No retry logic, no timeout handling

**Fix**: Use `getSupabaseClient()` in all API routes. It's already there.

---

### Problem 6: API route GET handlers returning 503 on missing Supabase

```typescript
// api/mcp/register/route.ts GET
return NextResponse.json(
  { success: false, error: 'Supabase not configured', data: [] },
  { status: 503 }
);
```

**Issue**: A 503 on a GET is wrong — 503 means "service unavailable temporarily." GET should return 200 with fallback data.

**Fix**: Return 200 with fallback data, add `warning: 'Supabase not configured, using cached data'`.

---

## 4. Medium Priority

### 4A: `utils.ts` and `utils/` confusion
```
src/lib/utils.ts      ← exists (has cn())
src/lib/utils/        ← exists (has fetchJson.ts + index.ts)
```

This is confusing. Consolidate into `src/lib/utils/index.ts`.

### 4B: `rate-limiter.ts` — in-memory, won't work across instances
If OMA-AI ever scales to multiple instances, the rate limiter is useless.

**Fix**: Use Supabase or Redis for rate limiting. Currently it's a singleton in-memory Map — fine for single instance, document the limitation.

### 4C: `category-icons.ts` has hardcoded emoji mappings
```typescript
const CATEGORY_ICONS: Record<string, string> = {
  'Blockchain': '⛓️',
  'AI Agents': '🤖',
  ...
};
```
These should be in a database table or at minimum a separate constant file. Currently embedded in a component helper.

---

## 5. Patterns to ADOPT (not currently present)

### 5A: Centralized error classes
Currently errors are raw `new Error('string')`. A shared error class would help:
```typescript
// src/lib/errors.ts
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) { super(message); }
}
```

### 5B: Zod validation for API inputs
Currently field validation is manual. Zod schemas would be cleaner:
```typescript
const RegisterMCPSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).max(50),
  pricing_usdc: z.number().min(0),
  ...
});
```

### 5C: Centralized API fetch utility
Every external API call (Helius, Jupiter, etc.) does its own fetch setup. A shared `apiClient` with retries + timeouts would reduce duplication.

---

## 6. What NOT to Refactor

| Don't touch | Reason |
|-------------|--------|
| App Router structure | Works well, well-understood |
| Tailwind + CSS variables | Simple, no unnecessary abstraction |
| Dynamic imports pattern | Exactly right for code splitting |
| `cn()` utility | Industry standard (clsx + tailwind-merge) |
| x402 payment shape | Well-designed |
| API response format | Consistent, simple |
| Component naming | Already PascalCase everywhere |

---

## 7. Refactoring Priority Queue

### 🔴 Do Now (5 min each)
1. Remove `src/app/archive/` entirely
2. Fix GET `/api/mcp/register` to return 200 with fallback data (not 503)
3. Add `// FALLBACK DATA` comment to top of `mcp-data.ts`
4. Consolidate `utils.ts` into `utils/index.ts`
5. Use `getSupabaseClient()` in API routes instead of inline `createClient`

### 🟡 Do This Week
6. Audit `mcp-data.ts` — remove fake call counts, fix data accuracy
7. Deduplicate `MCPServer`/`MCPSkill` interfaces → canonical type in `types.ts`
8. Add `APIError` class to `src/lib/errors.ts`
9. Document rate limiter limitation in `rate-limiter.ts`

### 🟢 Do When Supabase is Live
10. Migrate `category-icons.ts` hardcoded emoji → database table
11. Set up Supabase migrations for all schema tables
12. Add Zod validation schemas for API inputs
13. Build centralized `apiClient` with retry logic

---

## 8. Style Guide (For This Project)

Based on the existing codebase, here are the rules to FOLLOW:

```typescript
// ✅ DO: Component files are PascalCase
export function HeroSection() { ... }

// ✅ DO: Utility files are kebab-case
category-icons.ts, mcp-data.ts, rate-limiter.ts

// ✅ DO: API routes return consistent shape
{ success: true, data: {...} }
{ success: false, error: '...' }

// ✅ DO: Dynamic imports for heavy client components
const X = dynamic(() => import('@/components/X'), { loading: () => <Skeleton /> });

// ✅ DO: Metadata export on server pages
export const metadata: Metadata = { title: '...', description: '...' };

// ✅ DO: 'use client' only when needed (useState, useEffect, event handlers)
// ✅ DO: Graceful degradation for external services (Supabase, etc.)
// ✅ DO: camelCase everywhere else

// ❌ DON'T: Default exports for utility functions (named exports are fine)
// ❌ DON'T: barrel files that re-export everything (creates circular deps)
// ❌ DON'T: class components (FC only)
// ❌ DON'T: separate .css files for components (Tailwind only)
```

---

_Last Updated: 2026-03-31_
