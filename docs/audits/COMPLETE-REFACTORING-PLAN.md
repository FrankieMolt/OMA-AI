# OMA-AI Complete UI/UX Refactoring Plan

**Date:** 2026-02-26  
**Auditor:** Frankie 🧟  
**Status:** Critical Refactoring Required

---

## Executive Summary

**Overall Score: 58/100 (F)**

The site has solid functionality but requires significant UI/UX improvements for both AI agents and humans.

### Critical Issues Summary:
- **CSP blocking Tailwind CDN** - Breaking styling
- **No mobile navigation** - Users can't navigate on mobile
- **Inconsistent design system** - Colors, buttons, spacing vary wildly
- **Poor accessibility** - Low contrast, missing labels, small touch targets
- **Confusing CTAs** - Multiple competing actions
- **No data visualization** - Dashboard is text-only

---

## Page-by-Page Analysis

### 1. Homepage (01-homepage)

**Score: 65/100**

| Issue | Severity | Fix |
|-------|----------|-----|
| No mobile hamburger menu | 🔴 Critical | Add mobile nav |
| Two competing CTAs | 🔴 Critical | Single primary CTA |
| Low contrast subheadline | 🟠 High | Increase font size/contrast |
| Stats section competes with hero | 🟡 Medium | Reduce visual weight |
| Generic icons | 🟡 Medium | Use meaningful icons |
| No focus states | 🟠 High | Add visible focus indicators |

### 2. APIs Page (02-apis)

**Score: 60/100**

| Issue | Severity | Fix |
|-------|----------|-----|
| No search functionality | 🔴 Critical | Add search bar |
| Filter buttons lack active state | 🟠 High | Add visual feedback |
| Ambiguous pricing units | 🟠 High | Clarify "$0.001/call" |
| No API ratings/trust signals | 🟡 Medium | Add provider info |
| Form labels too small | 🟡 Medium | Increase label contrast |
| No "Try API" buttons | 🟠 High | Add action buttons to cards |

### 3. MCPs Page (03-mcps)

**Score: 55/100**

| Issue | Severity | Fix |
|-------|----------|-----|
| Inconsistent card design | 🔴 Critical | Standardize cards |
| Configure/Connect confusion | 🟠 High | Rename buttons |
| No active filter state | 🟠 High | Add visual feedback |
| Missing connection status | 🟡 Medium | Color-code status |
| Category labels inconsistent | 🟡 Medium | Standardize placement |
| No search/sort | 🟠 High | Add discovery tools |

### 4. Compute Page (04-compute)

**Score: 50/100**

| Issue | Severity | Fix |
|-------|----------|-----|
| Pricing tiers lack hierarchy | 🔴 Critical | Highlight popular tier |
| No template previews | 🟠 High | Add descriptions/icons |
| Form grouping poor | 🟠 High | Use section headers |
| Deploy button low contrast | 🟠 High | Increase visibility |
| No env var guidance | 🟡 Medium | Add placeholder text |
| No validation feedback | 🟡 Medium | Add error states |

### 5. Dashboard (05-dashboard)

**Score: 45/100**

| Issue | Severity | Fix |
|-------|----------|-----|
| No data visualization | 🔴 Critical | Add charts/graphs |
| Widget spacing inconsistent | 🟠 High | Standardize grid |
| No empty state | 🟠 High | Add guidance when empty |
| Button styles inconsistent | 🟡 Medium | Unify styling |
| No active tab indicator | 🟡 Medium | Highlight current page |
| Missing quick actions | 🟠 High | Add edit/delete to cards |

### 6. Mobile (All Pages)

**Score: 40/100**

| Issue | Severity | Fix |
|-------|----------|-----|
| No mobile navigation | 🔴 Critical | Add hamburger menu |
| Touch targets <44px | 🔴 Critical | Increase button sizes |
| Content priority reversed | 🟠 High | Reorder CTAs |
| Low contrast text | 🟠 High | Improve readability |
| Forms not optimized | 🟡 Medium | Add input guidance |

---

## Design System Issues

### Colors
- ❌ No defined color palette
- ❌ Purple varies between elements
- ❌ Low contrast text (zinc-400 on dark)

### Typography
- ❌ No type scale defined
- ❌ Inconsistent font sizes
- ❌ Poor line heights

### Spacing
- ❌ No spacing system
- ❌ Inconsistent padding
- ❌ Cards too cramped

### Components
- ❌ Button styles vary
- ❌ Card designs inconsistent
- ❌ Form inputs unstyled

---

## Refactoring Priority

### Phase 1: Critical (Today)
1. ✅ Fix CSP for Tailwind CDN
2. Add mobile navigation
3. Standardize button styles
4. Fix touch targets
5. Add search to APIs/MCPs

### Phase 2: High Priority (This Week)
1. Create design system tokens
2. Add data visualization to dashboard
3. Implement filter active states
4. Add template previews to compute
5. Create empty states

### Phase 3: Medium Priority (Next Week)
1. Add API ratings/trust signals
2. Implement form validation
3. Add hover/focus states
4. Create consistent iconography
5. Improve mobile forms

---

## Proposed Design System

### Colors
```css
--primary: #8b5cf6;     /* Violet 500 */
--primary-light: #a78bfa; /* Violet 400 */
--accent: #22c55e;       /* Green 500 */
--bg-primary: #0a0a0b;   /* Zinc 950 */
--bg-card: #18181b;      /* Zinc 900 */
--text-primary: #fafafa; /* Zinc 50 */
--text-secondary: #a1a1aa; /* Zinc 400 */
```

### Typography
```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
--text-5xl: 3rem;
```

### Spacing
```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
--space-16: 4rem;
```

---

## Files to Modify

### HTML Pages
- [ ] public/index.html - Homepage
- [ ] public/apis.html - API Marketplace
- [ ] public/mcps.html - MCP Servers
- [ ] public/compute.html - Compute
- [ ] public/dashboard.html - Dashboard
- [ ] public/about.html - About
- [ ] public/contact.html - Contact
- [ ] public/pricing.html - Pricing
- [ ] public/blog.html - Blog
- [ ] public/docs.html - Docs
- [ ] public/community.html - Community

### CSS Files
- [ ] public/design-system.css - Design tokens
- [ ] public/styles.css - Global styles
- [ ] public/responsive.css - Mobile styles

### Config
- [ ] vercel.json - Headers
- [ ] next.config.js - CSP headers

---

## Expected Outcome

After refactoring:
- **Score: 85+/100 (B)**
- Mobile-first responsive design
- Consistent design system
- Accessible for all users
- Clear user flows
- Data-driven dashboard
- AI-agent friendly (structured data)

---

*Generated by Frankie's Audit System 🧟*
