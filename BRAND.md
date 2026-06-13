# OMA-AI Brand Kit

**OMA-AI** = "Open Machine Architecture AI"

The AI infrastructure marketplace enabling agents to buy, sell, and earn via x402 micropayments.

---

## Logo Concept

**Design direction:** Clean, geometric, technical. Vercel meets Linear.

A stylized "O" mark — the first letter of OMA — rendered as a geometric glyph. Clean lines, no fluff.

### Favicon SVG
A simple geometric "O" or "OMA" mark in violet (#8B5CF6) on a dark background.

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#8B5CF6` | CTAs, primary actions, links |
| **Primary Hover** | `#7C3AED` | Button hover states |
| **Success / x402** | `#14F195` | Green for x402 payments, success states |
| **Warning** | `#F59E0B` | Amber for warnings, highlights |
| **Destructive** | `#EF4444` | Red for errors, destructive actions |
| **Background** | `#09090B` | zinc-950, page background |
| **Surface** | `#18181B` | zinc-900, cards, panels |
| **Surface Hover** | `#27272A` | zinc-800, hover states |
| **Border** | `#27272A` | zinc-800, borders |
| **Text Primary** | `#FAFAFA` | zinc-50, headings |
| **Text Secondary** | `#A1A1AA` | zinc-400, body text |
| **Text Muted** | `#71717A` | zinc-500, meta, timestamps |

---

## Typography

| Role | Font | Weights |
|------|------|---------|
| **Headings** | Inter | 700 (bold), 600 (semibold) |
| **Body** | Inter | 400 (regular), 500 (medium) |
| **Code / Mono** | JetBrains Mono | 400 (regular) |

### Type Scale
- Hero: `text-5xl md:text-7xl lg:text-8xl` (Inter 700)
- Section H2: `text-4xl md:text-5xl` (Inter 700)
- Card titles: `text-xl font-bold` (Inter 700)
- Body: `text-base` (Inter 400)
- Small/meta: `text-sm` (Inter 400)
- Code: `text-sm font-mono`

---

## Iconography

- **Icons library:** Lucide React (consistent stroke-based icons)
- **Favicon:** SVG, violet O mark, transparent background
- **Category icons:** Matched to MCP categories (Database, Cpu, Zap, Brain, Wallet, Globe)

---

## Design Tokens (CSS Variables)

```css
:root {
  --color-primary: #8B5CF6;
  --color-primary-hover: #7C3AED;
  --color-success: #14F195;
  --color-warning: #F59E0B;
  --color-destructive: #EF4444;
  --color-bg: #09090B;
  --color-surface: #18181B;
  --color-surface-hover: #27272A;
  --color-border: #27272A;
  --color-text: #FAFAFA;
  --color-text-secondary: #A1A1AA;
  --color-text-muted: #71717A;

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

---

## Motion / Animation

| Animation | Spec |
|-----------|------|
| **Page entrance** | `fade-in` — opacity 0→1, translateY 20px→0, 600ms ease-out |
| **Card hover** | `scale(1.02)`, shadow lift, 200ms ease |
| **Button hover** | subtle glow via `box-shadow`, `-translate-y-0.5` |
| **Gradient orbs** | `pulse-slow` — 12s ease-in-out, very subtle |

**No auto-playing terminal effects, no typing animations.**

---

## Anti-patterns (Remove These)

- ❌ Fake star ratings on MCP cards
- ❌ Skeleton shimmer loading that doesn't load real data
- ❌ "Ask AI" chatbot widgets in footer
- ❌ Overwhelming gradient text (replace with clean typography)
- ❌ Fake trading data (use real crypto prices from /api/crypto)
