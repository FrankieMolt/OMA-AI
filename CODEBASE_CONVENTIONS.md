# OMA-AI Codebase Conventions Guide

**Generated:** 2026-03-12 08:15 UTC
**Purpose:** Document existing codebase patterns and provide refactoring guidance

---

## EXISTING PATTERNS (Documented from Code Analysis)

### 1. Component Export Style 🟡 INCONSISTENT

**Current State:**
```typescript
// Pattern A: Default exports (most pages)
export default function PricingPage() { }

// Pattern B: Named exports (shared components, API routes)
export function HeroSection() { }
export async function GET() { }
```

**Occurrences:**
- Default exports: `pricing/page.tsx`, `about/page.tsx`, `Navigation.tsx`
- Named exports: `hero-section.tsx`, `GlassCard.tsx`, `health/route.ts`
- Mixed: Some files have both named and default

**Recommendation:**
- **PAGES:** Use default exports (Next.js convention)
- **SHARED COMPONENTS:** Use named exports
- **API ROUTES:** Use named exports (Next.js convention)
- **Rationale:** Follows Next.js best practices, matches existing patterns

---

### 2. Import Style ✅ MOSTLY CONSISTENT

**Current State:**
```typescript
// Named imports (standard)
import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import { Zap } from 'lucide-react';

// Type imports (rare but used)
import { type ClassValue } from 'clsx';
```

**Good Practices Already in Use:**
- ✅ Named imports for components and icons
- ✅ Path aliases (`@/*` maps to `src/*`)
- ✅ Type imports where explicit
- ✅ No mixed import styles in same file

**Recommendation:**
- Continue using named imports
- Use `type` keyword for type-only imports (TypeScript 5.3+)
- Group imports: React/Next.js → third-party → local
- Example:
```typescript
import { Metadata } from 'next';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';
```

---

### 3. Client vs Server Components 🟡 INCONSISTENT

**Current State:**
```typescript
// GOOD: Server component (no 'use client')
export default function PricingPage() {
  // Static content, no interactivity
  return <main>...</main>
}

// NEEDS FIX: Unnecessary client component
'use client';
export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  // Only used to prevent SSR flash
}
```

**Occurrences:**
- Hero section: `'use client'` only for SSR flash prevention
- Navigation: `'use client'` (correct - needs state for mobile menu)
- Most pages: Server components (correct)

**Recommendation:**
- **Remove 'use client' from HeroSection:** Use CSS-based SSR flash prevention
- **Keep 'use client' where actually needed:**
  - Components with useState/useEffect
  - Components with event handlers (onClick, onChange)
  - Components with browser APIs (window, document)
  - Components with Web3 wallet interactions

**CSS-based SSR Flash Prevention:**
```typescript
// Replace useState/useEffect with CSS
export function HeroSection() {
  // Remove: const [mounted, setMounted] = useState(false);
  // Remove: useEffect(() => { setMounted(true); }, []);
  // Remove: if (!mounted) return null;

  return (
    <div className="opacity-0 animate-in fade-in duration-500">
      {/* Content */}
    </div>
  );
}

// In globals.css:
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-in {
  animation-fill-mode: forwards;
}
```

---

### 4. Tailwind Class Organization 🟡 INCONSISTENT

**Current State:**
```typescript
// Pattern A: Inline classes (most files)
<div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">

// Pattern B: Using cn utility (shared components only)
<div className={cn('bg-slate-900 border border-slate-800', hover && 'hover:bg-slate-800')}>
```

**Good Practice Already in Use:**
- ✅ `cn` utility exists (`lib/utils.ts`)
- ✅ Shared components (GlassCard) use `cn` for conditional classes
- ✅ Tailwind CSS 4.x (latest)

**Recommendation:**
- **Use `cn` for conditional classes:**
```typescript
// Good
className={cn('base-classes', isActive && 'active-classes', customClass)}

// Avoid (harder to read)
className={`base-classes ${isActive ? 'active-classes' : ''} ${customClass}`}
```

- **Use inline classes for static classes:**
```typescript
// Good (simple)
className="bg-slate-900 border border-slate-800 p-6 rounded-xl"

// Over-engineered
className={cn('bg-slate-900', 'border', 'border-slate-800', 'p-6', 'rounded-xl')}
```

---

### 5. TypeScript Usage 🟡 INCONSISTENT

**Current State:**
```typescript
// Good: Full type definitions
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) { }

// Needs improvement: Missing explicit types
export default function PricingPage() {
  // No return type
  return <main>...</main>;
}
```

**Good Practices Already in Use:**
- ✅ Interfaces for component props (GlassCard, etc.)
- ✅ Destructured props with defaults
- ✅ Strict mode enabled in tsconfig.json
- ✅ `any` types avoided in most new code

**Recommendation:**
- **Add explicit return types to components:**
```typescript
// Good
export default function PricingPage(): React.JSX.Element {
  return <main>...</main>;
}

// Or simpler
export default function PricingPage() {
  return <main>...</main>;
}
```

- **Use interfaces for component props:**
```typescript
// Good
interface PricingPageProps {
  plan: 'free' | 'basic' | 'pro';
}

export function PricingCard({ plan }: PricingPageProps) {
  return <div>...</div>;
}
```

- **Avoid `any` types:** Use unknown or proper types

---

### 6. State Management ✅ GOOD

**Current State:**
```typescript
// Local state (most components)
const [isOpen, setIsOpen] = useState(false);

// Data fetching (some components)
import { useQuery } from '@tanstack/react-query';
const { data, isLoading } = useQuery({ queryKey: ['mcps'], queryFn: fetchMcps });
```

**Good Practices Already in Use:**
- ✅ React Hooks (useState, useEffect) for local state
- ✅ TanStack React Query for data fetching (when used)
- ✅ No global context (appropriate for current scope)

**Recommendation:**
- **Continue current pattern:**
  - Local state: useState, useReducer
  - Data fetching: useQuery, useMutation (TanStack Query)
  - Global state: Add React Context only when truly needed

---

### 7. Error Handling 🟡 NEEDS IMPROVEMENT

**Current State:**
```typescript
// Basic try/catch
try {
  const response = await fetch(url);
  return await response.json();
} catch (e) {
  console.error('Error fetching:', e);
  return { error: 'Failed to fetch' };
}
```

**Existing Components:**
- ✅ ErrorBoundary component exists (`src/components/ErrorBoundary.tsx`)
- ❌ Not used on all pages (audit finding)

**Recommendation:**
- **Add ErrorBoundary to all layouts:**
```typescript
// src/app/layout.tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

- **Use console.error for logging:**
```typescript
try {
  await fetchData();
} catch (error) {
  console.error('Failed to fetch data:', error);
  // Remove console.log for production
}
```

- **Remove console.log debugging statements:**
```typescript
// ❌ Bad (debugging)
console.log('Data:', data);

// ✅ Good (production)
// console.log('Data:', data); // Commented for debugging
```

---

### 8. Styling & Design System ✅ GOOD

**Current State:**
```typescript
// Shared UI components
import { GlassCard, GlassCardPurple } from '@/components/ui/GlassCard';

// Gradient backgrounds
className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"

// Animations
import { motion } from 'framer-motion';

// Icons
import { Zap, Shield, DollarSign } from 'lucide-react';
```

**Good Practices Already in Use:**
- ✅ Shared UI components (GlassCard, GlassCardPurple)
- ✅ Consistent color palette (slate, purple, fuchsia)
- ✅ Framer Motion for animations
- ✅ Lucide React for icons
- ✅ Glass morphism effect
- ✅ Dark mode optimized

**Recommendation:**
- **Continue current design system:**
  - Use GlassCard for cards
  - Use GlassCardPurple for highlighted sections
  - Use gradients for backgrounds
  - Use Framer Motion for animations
  - Use Lucide React for icons

- **Extract common patterns to components:**
  - Button (already exists)
  - Input (already exists)
  - Badge (already exists)
  - Loading skeletons (already exists)

---

## REFACTORING STRATEGY (Context-Aware)

### Phase 1: Document & Standardize (No Breaking Changes)

**1.1 Document Existing Patterns**
- ✅ This document (CODEBASE_CONVENTIONS.md) created
- ✅ Audit report reviewed
- ✅ Existing patterns documented

**1.2 Create Style Guide**
- [ ] Add ESLint rules for export style
- [ ] Add Prettier config for formatting
- [ ] Document component export conventions
- [ ] Document client vs server component rules

**1.3 Add Linting Rules**
```json
// .eslintrc.json
{
  "rules": {
    "react/function-component-definition": "off",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

---

### Phase 2: Incremental Fixes (Low Risk)

**2.1 Fix Hero Section Client Component**
- File: `src/components/hero-section.tsx`
- Change: Remove `'use client'`, useState, useEffect
- Solution: Use CSS-based SSR flash prevention
- Risk: LOW (visual only)

**2.2 Add ErrorBoundary to Layouts**
- File: `src/app/layout.tsx`
- Change: Wrap children in ErrorBoundary
- Risk: LOW (already component exists)

**2.3 Standardize Component Exports**
- Scope: Shared components only
- Rule: Named exports for shared components
- Risk: LOW (no breaking changes to API)

**2.4 Clean Console.log Statements**
- Scope: All files
- Change: Remove or comment debugging logs
- Risk: NONE (cleanup only)

---

### Phase 3: Gradual Improvements (Medium Risk)

**3.1 Migrate to Explicit Types**
- Scope: New components only
- Rule: Add return types, interfaces for props
- Risk: MEDIUM (requires TypeScript knowledge)
- Timeline: As developers write new code

**3.2 Improve Error Handling**
- Scope: API routes, data fetching
- Change: Add proper error types, logging
- Risk: MEDIUM (requires testing)
- Timeline: Week-by-week per feature

**3.3 Add Loading States**
- Scope: All data-fetching pages
- Change: Use Loading component with skeletons
- Risk: MEDIUM (requires testing)
- Timeline: Week-by-week per page

---

### Phase 4: Advanced Optimizations (High Risk)

**4.1 Optimize Bundle Size**
- Analyze bundle: `npx @next/bundle-analyzer`
- Lazy load wallet adapters
- Code split by route (already done)
- Risk: HIGH (requires testing)
- Timeline: After core features complete

**4.2 Implement Caching**
- Add Redis for API caching
- Implement CDN caching
- Risk: HIGH (requires infrastructure)
- Timeline: After production deployment

**4.3 Add Real-time Updates**
- WebSocket for live data
- Polling for dashboard
- Risk: HIGH (requires testing)
- Timeline: After core features complete

---

## DECISION MATRIX (When to Ignore "Best Practices")

### Ignore When:

| Best Practice | Ignore When | Reasoning |
|-------------|---------------|-------------|
| **Server Components** | Component needs useState/useEffect | `'use client'` necessary for interactivity |
| **Type Safety** | Rapid prototyping | `any` types acceptable in early development |
| **Modular Code** | Small performance-critical section | Monolith can be faster for hot paths |
| **Abstraction** | Simple one-off feature | Over-engineering hurts maintainability |
| **Testing** | External API integration | Mock tests provide false confidence |

### Follow When:

| Best Practice | Apply When | Reasoning |
|-------------|--------------|-------------|
| **Security** | Always | SQL injection, XSS, etc. are critical |
| **Error Handling** | Production code | Users see errors, must handle gracefully |
| **Type Safety** | Long-lived code | Prevents bugs, improves DX |
| **Documentation** | Complex logic | Future developers need context |
| **Consistent Style** | Team collaboration | Reduces cognitive load |

---

## PRACTICAL EXAMPLES

### Good Component (Follows Conventions)

```typescript
import { Metadata } from 'next';
import { Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata: Metadata = {
  title: 'Example Page',
  description: 'Example description',
};

// Server component (no 'use client')
export default function ExamplePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Example</h2>
        </div>
      </GlassCard>
    </main>
  );
}
```

### Needs Improvement Component

```typescript
'use client'; // ❌ Unnecessary (no interactivity)
import { useState, useEffect } from 'react'; // ❌ Not needed

export default function ExamplePage() {
  const [mounted, setMounted] = useState(false); // ❌ Not needed

  useEffect(() => { // ❌ Not needed
    setMounted(true);
  }, []);

  if (!mounted) return null; // ❌ Not needed

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl"> // ✅ OK
      <h2>Example</h2>
    </div>
  );
}
```

### Fixed Component

```typescript
import { Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

// Server component (no 'use client')
export default function ExamplePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Example</h2>
        </div>
      </GlassCard>
    </main>
  );
}
```

---

## CHECKLIST FOR NEW CODE

### Before Committing New Component:

- [ ] Correct export style (pages: default, shared: named)
- [ ] Client component only if needed (useState, useEffect, event handlers, Web3)
- [ ] TypeScript interfaces for props
- [ ] Use `cn` for conditional classes
- [ ] Inline classes for static classes
- [ ] Import grouping (React/Next.js → third-party → local)
- [ ] Error handling (try/catch, console.error)
- [ ] Loading states (if data fetching)
- [ ] Accessible (aria-labels, keyboard navigation)
- [ ] Responsive (mobile-first)

---

## CONCLUSION

### Current State: 🟡 NEEDS IMPROVEMENT

**Strengths:**
- Modern tech stack (Next.js 15, React 19, TypeScript 5)
- Good architecture (App Router, separation of concerns)
- Shared UI components (GlassCard, etc.)
- Consistent design system (gradients, glass morphism)

**Weaknesses:**
- Inconsistent export styles
- Unnecessary client components
- Type safety not fully enforced
- Error handling inconsistent
- Console.log statements in production code

### Refactoring Approach: ✅ GRADUAL

**Phase 1:** Document & Standardize (1 day)
**Phase 2:** Incremental Fixes (3-5 days)
**Phase 3:** Gradual Improvements (1-2 weeks)
**Phase 4:** Advanced Optimizations (after production)

**Risk Level:** LOW to MEDIUM
- No breaking changes to existing functionality
- Incremental improvements
- Each change tested independently

---

*Generated: 2026-03-12 08:15 UTC*
*Next Review: After Phase 2 completion*
