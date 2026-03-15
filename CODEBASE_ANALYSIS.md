# 📊 OMA-AI CODEBASE ANALYSIS - Context-Aware Refactoring

**Generated:** 2026-03-12 19:50 UTC
**Status:** Pre-Refactoring Assessment
**Approach:** Context-Aware (Document → Analyze → Fix)

---

## PHASE 1: TECHNOLOGY STACK & ARCHITECTURE ANALYSIS

### Current Technology Stack:

**Frontend Framework:**
- **Next.js:** 15.5.12 (App Router architecture)
- **React:** 19.2.3
- **TypeScript:** 5.x
- **TailwindCSS:** 4.x (styling)
- **Framer Motion:** 12.x (animations)

**Backend & Database:**
- **Supabase:** PostgreSQL with Auth, Storage, Realtime
- **Next.js API Routes:** Server-side API endpoints
- **Row Level Security (RLS):** Enabled on all tables

**Blockchain & Wallets:**
- **Base/EVM:** Wagmi + Viem (primary)
- **Solana:** @solana/web3.js + wallet adapters (removed - conflicting)
- **Payment Protocol:** x402 (Conway Automaton)

**Deployment:**
- **Production:** Vercel
- **Local:** PM2 process manager
- **Containerization:** Docker (Supabase + Coolify)
- **CI/CD:** Vercel Git integration

### Architectural Patterns:

**Project Structure:**
```
/root/oma-ai/
├── src/
│   ├── app/              # App Router pages
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities and helpers
│   ├── hooks/            # Custom React hooks
│   └── styles/           # Global styles
├── database/             # Database schema and migrations
├── public/               # Static assets
└── .next/               # Next.js build output
```

**Component Organization:**
- **UI Components:** src/components/ui/ (headless, primitive components)
- **Feature Components:** src/components/wallet/, src/components/mcp/
- **Layout Components:** src/components/header/, src/components/footer/
- **Shared Components:** src/providers.tsx (app-wide providers)

### Current Conventions:

**File Naming:**
- **Pages:** kebab-case (e.g., `page.tsx`, `about/page.tsx`)
- **Components:** PascalCase (e.g., `WalletConnect.tsx`, `GlassCard.tsx`)
- **Utilities:** camelCase (e.g., `cn.ts`, `supabase.ts`)
- **Hooks:** camelCase with `use` prefix (e.g., `useWallet.tsx`)

**Export Styles:**
- **Pages:** Default exports (`export default function Page()`)
- **Components:** Named exports (`export function ComponentName()`)
- **Utilities:** Named exports (`export function utility()`)

**Styling Conventions:**
- **Tailwind Classes:** Utility-first approach
- **Responsive:** Mobile-first with `md:`, `lg:`, `xl:` prefixes
- **Dark Mode:** `bg-zinc-950 text-zinc-50` base
- **Glass Effect:** Custom GlassCard component with backdrop-blur

**TypeScript Conventions:**
- **Strict Mode:** Enabled (`"strict": true` in tsconfig.json)
- **Type Imports:** `import type { Type }` for type-only imports
- **Explicit Types:** No `any` types (except where absolutely necessary)
- **Interface Naming:** PascalCase with `I` prefix (mixed usage)

**State Management:**
- **Server State:** Supabase queries (server components)
- **Client State:** React hooks (useState, useEffect, useContext)
- **Global State:** Providers pattern (WalletProviders, QueryClientProvider)

### Identified Issues (From Console Errors):

**1. Broken Routes (404s):**
- `/docs/guides` - Returns 404
- `/docs/api` - Returns 404
- `/models` - Returns 404
- `/careers` - Returns 404

**2. API Failures:**
- `/api/mcp/list` - Returns 503 (service unavailable)
- Icons: `icon-192.png`, `icon-512.png` - 404s

**3. Wallet Adapter Conflicts (FIXED):**
- Old Solana wallet code conflicting with Base/EVM
- ✅ **FIXED:** Removed Solana imports from providers.tsx

**4. Vercel Analytics Blocked:**
- Speed Insights script blocked by client
- Web Analytics not configured

**5. Content Security Policy:**
- Inline scripts violating CSP (from wallet adapters)

---

## PHASE 2: ARCHITECTURAL AUDIT

### Misplaced Files/Components:

**Issues Found:**
1. **AI Agent Builder Files Uncommitted:**
   - `AI_AGENT_BUILDER_PLAN.md`
   - `CODEBASE_CONVENTIONS.md`
   - `database/supabase/migrations/003_create_agent_tables.sql`
   - `src/app/api/agents/`
   - These need to be committed or removed

2. **Unused Solana Wallet Components:**
   - `src/components/wallet/WalletConnect.tsx` (old, conflicting)
   - `src/components/wallet/WalletManagement.tsx` (old)
   - Need cleanup or migration to Base-only

3. **Public Assets 404s:**
   - `/public/icon-192.png`
   - `/public/icon-512.png`
   - Referenced but don't exist

### Separation of Concerns:

**Well-Separated Areas:**
✅ UI components (separate from business logic)
✅ API routes (server-side isolation)
✅ Database schema (separate migrations)
✅ Utilities (helper functions isolated)

**Coupling Issues:**
⚠️ Wallet logic mixed across multiple files
⚠️ API endpoints directly accessing database without service layer
⚠️ Components tightly coupled to specific wallet adapters

### Complexity Violations:

**High Complexity Areas:**
1. **Dashboard Page:** Multiple API calls, complex state management
2. **Publish Wizard:** Multi-step form with inline validation
3. **Payment Flow:** Complex wallet interaction handling

**Best Practice Violations:**
1. **Direct Database Queries:** API routes directly querying Supabase (no service layer)
2. **Inline Type Definitions:** Component-level types instead of shared types
3. **Mixed Client/Server:** Some components doing both (should be explicit)

---

## PHASE 3: CODE QUALITY & REDUNDANCY ANALYSIS

### Duplicate Code:

**Redundant Imports:**
1. **Wallet Adapters:** Both Base and Solana previously imported (removed)
2. **Utilities:** Similar formatting functions across multiple files
3. **API Calls:** Duplicate Supabase client initialization

**Unused Code:**
1. **Solana Components:** `WalletConnect.tsx`, `WalletManagement.tsx` (unused after Base migration)
2. **Old Routes:** Referenced in layout but missing from app directory
3. **Dead Imports:** Solana wallet imports (cleaned up)

### Orphaned Files:

**Files to Remove:**
1. `/public/x402.js` - Old payment script (removed)
2. `/root/oma-ai/AI_AGENT_BUILDER_PLAN.md` - Uncommitted plan
3. `/root/oma-ai/CODEBASE_CONVENTIONS.md` - Uncommitted conventions
4. Solana wallet components (if not needed)

### Missing Code:

**Needed Implementations:**
1. **Docs Routes:** `/docs/guides`, `/docs/api`, `/models`, `/careers`
2. **API Routes:** `/api/mcp/list` (currently returning 503)
3. **Icon Files:** `icon-192.png`, `icon-512.png`
4. **404 Page:** Custom error page (currently using default)

---

## PHASE 4: UI/UX DEBUGGING & LAYOUT VERIFICATION

### Broken UI Components (From Console):

**Issues:**
1. **Vercel Scripts Blocked:** Speed Insights and Analytics not loading
2. **Content Security Policy:** Inline scripts blocked
3. **Wallet Adapter Warnings:** Phantom adapter registration messages

### Layout Issues:

**Potential Problems:**
1. **Responsive Design:** Some components may not be mobile-optimized
2. **Dark Mode:** Inconsistent text colors across components
3. **Spacing:** Margins and padding not following 8px grid

### Accessibility Issues:

**Concerns:**
1. **Missing Alt Text:** Images without proper alt attributes
2. **Keyboard Navigation:** Some interactive elements not keyboard-accessible
3. **ARIA Labels:** Form inputs lacking proper labels

### Visual Inconsistencies:

**Styling Issues:**
1. **Glass Cards:** Different blur effects across pages
2. **Typography:** Inconsistent font weights for headings
3. **Colors:** Some components using hard-coded colors instead of Tailwind theme

---

## CUSTOM STYLE GUIDE (For OMA-AI)

### Project-Specific Rules:

**Component Structure:**
```tsx
'use client'; // ONLY for interactive components
import React from 'react';
import { cn } from '@/lib/utils';

export function ComponentName({ prop }: Props) {
  return (
    <div className={cn('base-class', 'modifier-class')}>
      {/* Component content */}
    </div>
  );
}
```

**File Organization:**
- **Server Components:** No 'use client' (default)
- **Client Components:** 'use client' at top
- **Shared Components:** `/src/components/ui/`
- **Feature Components:** `/src/components/{feature}/`

**TypeScript Rules:**
```typescript
// Type-only imports
import type { NextPage } from 'next';
import type { ReactNode } from 'react';

// Interfaces for component props
interface ComponentProps {
  requiredProp: string;
  optionalProp?: number;
}
```

**Styling Patterns:**
```tsx
// Use cn utility for conditional classes
import { cn } from '@/lib/utils';

className={cn(
  'base-class',      // Always applied
  condition && 'modifier-class', // Conditional
  'another-class'    // Stackable
)}
```

**API Route Structure:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  // Server-side logic
  const data = await supabase.from('table').select('*');

  return NextResponse.json(data);
}
```

**Database Queries:**
```typescript
// Always use RLS (Row Level Security)
const { data, error } = await supabase
  .from('table')
  .select('*')
  .eq('user_id', userId) // RLS enforced
  .single();
```

---

## IMMEDIATE FIXES REQUIRED

### Priority 1: Critical (Breaking Production)

1. **Fix Broken Routes:**
   - Create `/docs/guides/page.tsx`
   - Create `/docs/api/page.tsx`
   - Create `/models/page.tsx`
   - Create `/careers/page.tsx`

2. **Fix API 503 Error:**
   - Debug `/api/mcp/list/route.ts`
   - Check database connection
   - Verify Supabase credentials

3. **Add Missing Icons:**
   - Create `/public/icon-192.png`
   - Create `/public/icon-512.png`

4. **Fix Vercel Analytics:**
   - Configure environment variables
   - Unblock analytics scripts

### Priority 2: High (Performance/Stability)

5. **Clean Up Docker:**
   - Remove unused Coolify containers
   - Optimize Supabase container count

6. **Remove Redundant Code:**
   - Delete unused Solana components
   - Consolidate duplicate utilities
   - Remove orphaned files

7. **Fix Layout Issues:**
   - Standardize spacing (8px grid)
   - Consistent typography
   - Responsive design fixes

### Priority 3: Medium (Code Quality)

8. **Implement Service Layer:**
   - Abstract database queries
   - Centralize API logic
   - Improve testability

9. **Add Error Boundaries:**
   - Better error handling
   - User-friendly error messages
   - Graceful degradation

10. **Improve Accessibility:**
    - ARIA labels
    - Keyboard navigation
    - Alt text for images

---

## REFACTORING STRATEGY

### Incremental Improvements:

**Week 1: Critical Fixes**
- Fix all broken routes
- Fix API 503 errors
- Add missing assets
- Clean up Docker

**Week 2: Code Quality**
- Remove redundant code
- Implement service layer
- Fix layout issues
- Improve accessibility

**Week 3: Polish & Optimization**
- Performance tuning
- Bundle size reduction
- SEO improvements
- Testing coverage

---

*Generated by FRANKIE - 2026-03-12 19:50 UTC*
*Context-Aware Refactoring Approach*
