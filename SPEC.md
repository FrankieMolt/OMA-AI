# OMA-AI Design Audit — SPEC.md

**Date:** 2026-05-08  
**Auditor:** Ralph Iteration 4 (subagent)  
**Reference:** `~/.agents/skills/superdesign/SKILL.md`

---

## Overview

The OMA-AI site is a well-structured Next.js/Tailwind application with an ultra-dark Venice-inspired theme. The codebase demonstrates strong fundamentals: semantic CSS variables, Framer Motion animations, canvas-based particle effects, and responsive design. However, several design and implementation issues reduce its polish and modern design standards.

---

## Findings

### ✅ Strengths

1. **Ultra-dark theme** — Near-black backgrounds (`#000`, `#0a0a0a`) create depth
2. **Violet/Cyan accent system** — Consistent brand palette across components
3. **Framer Motion animations** — Entrance animations on hero, scroll-triggered counters
4. **Canvas particle background** — `AnimatedHeroBackground.tsx` with 60-particle system
5. **Custom noise texture overlay** — Subtle grain via SVG filter (0.025 opacity)
6. **Semantic Tailwind `@theme`** — CSS variables for colors, typography, radius
7. **Dynamic imports + skeleton loading** — All heavy sections use `dynamic()` with pulse skeletons
8. **Gradient text animation** — `animate-gradient-text` keyframe on hero headline
9. **Marquee animation** — Trust strip with CSS infinite scroll
10. **Mobile-first breakpoints** — `sm:` / `md:` / `lg:` responsive at key breakpoints

---

### 🔴 High Priority

#### 1. **Colors use hex/HSL, not oklch()**
- **Files:** `src/app/globals.css` (619 lines)
- **Issue:** All semantic colors are defined as HSL or hex literals:
  ```css
  --color-primary: hsl(258 89% 66%);
  --color-primary: #8b5cf6;        /* hardcoded hex */
  --color-success: #14f195;        /* hardcoded hex */
  color: #14f195;                  /* inline hex */
  ```
- **Fix:** Convert to oklch() for perceptual uniformity and modern CSS:
  ```css
  --color-primary: oklch(65% 0.25 285);
  --color-success: oklch(80% 0.2 165);
  ```

#### 2. **No SPEC.md exists**
- **Issue:** The project had no `SPEC.md` design specification.
- **Fix:** Created this document. All future design decisions should be documented here.

---

### 🟡 Medium Priority

#### 3. **Hardcoded hex values scattered in globals.css**
- **Issue:** Inline hardcoded colors bypass the semantic variable system:
  ```css
  color: #14f195;
  color: #a1a1aa;
  outline: 2px solid hsl(258.9 89% 66%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  ```
- **Fix:** Map all hardcoded values to existing semantic variables (`--color-success`, `--color-text-secondary`, `--color-primary`).

#### 4. **Hero headline awkward line break**
- **File:** `src/components/hero-section.tsx`
- **Issue:** `AI agents that<br className="hidden sm:block" /> pay each other` — the break triggers at `sm:block` but the headline is already at `text-5xl` on mobile. On very small screens the line break is forced by `<br>`.
- **Fix:** Use CSS `text-wrap: balance` or adjust breakpoint to `md:block`.

#### 5. **Trust Marquee uses CSS-only scroll, not Framer Motion**
- **File:** `src/components/TrustMarquee.tsx`
- **Issue:** CSS `animate-marquee` with `translateX(0)` → `translateX(-50%)` is functional but can jank on slow devices. No pause-on-hover.
- **Fix:** Add `animation-play-state: paused` on hover state in CSS. Ensure content is duplicated properly for seamless loop.

#### 6. **Navigation mobile menu has fixed positioning issues**
- **File:** `src/components/Navigation.tsx`
- **Issue:** Mobile menu button is `fixed top-4 right-4 z-50` — this can overlap with scroll progress bar (`z-index: 9999`) or get obscured by browser chrome on mobile.
- **Fix:** Use `safe-area-inset` for top padding or increase z-index gap.

---

### 🟢 Low Priority / Polish

#### 7. **Scrollbar styling targets WebKit only**
- **File:** `src/app/globals.css`
- **Issue:** Only `-webkit-scrollbar` defined. Firefox users see native scrollbars.
- **Fix:** Add `scrollbar-width: thin` and `scrollbar-color` for Firefox compatibility.

#### 8. **Gradient text animation may cause performance issues**
- **File:** `src/app/globals.css` + component usage
- **Issue:** `animate-gradient-text` runs on hero h1 — on low-end devices this is CPU-intensive.
- **Fix:** Add `will-change: transform` or restrict to devices with `prefers-reduced-motion: no-preference`.

#### 9. **Custom font loading** — `Inter`, `Space Grotesk`, `JetBrains Mono` all via Google Fonts
- **Issue:** No font-display strategy visible; FOUT possible.
- **Fix:** Ensure `display=swap` is set (check `layout.tsx`).

#### 10. **Trust Marquee icons missing from loop**
- **File:** `src/components/TrustMarquee.tsx`
- **Issue:** The marquee renders items but the icons (`🔌`, `🧠`, etc.) aren't rendered in the visible code snippet.
- **Fix:** Verify icon rendering in the marquee content.

---

## Mobile Responsiveness Check

✅ No obvious horizontal overflow. The layout uses `max-w-7xl mx-auto px-4` containers which prevent breakout.

⚠️ The feature grid (`grid-cols-2 md:grid-cols-4`) works at all breakpoints.

⚠️ Navigation mobile menu — functional but z-index may conflict (see #6).

---

## Recommended Fixes (Priority Order)

1. **[P0]** Create `SPEC.md` with all design tokens documented (✅ Done)
2. **[P1]** Convert all HSL/hex colors to `oklch()` in `@theme` block
3. **[P1]** Replace hardcoded hex in `globals.css` with semantic variables
4. **[P2]** Fix hero line-break breakpoint — `md:block` not `sm:block`
5. **[P2]** Add `animation-play-state: paused` to Trust Marquee
6. **[P3]** Firefox scrollbar styling
7. **[P3]** `prefers-reduced-motion` media query for animations
