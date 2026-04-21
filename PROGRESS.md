# Ralph: OMA-AI Venice-style UI/UX Redesign

## Status: In Progress 🚧

## Iterations
- [x] **Iteration 1: globals.css** — Deepened dark theme to #000, zinc-800/700 borders, violet-500/cyan-400 accents, subtle glow effects ✅
- [x] **Iteration 2: MCPSkillCard** — Cleaner layout, x402 glow, pricing right-aligned ✅
- [ ] **Iteration 3:** hero-section.tsx update
- [ ] **Iteration 4:** features-section.tsx update

## Build Status
- TypeScript: ✅ Passes (--skipLibCheck)
- Git: Committed & pushed

## Venice Design Language Applied
- Background: #000000 (ultra dark)
- Card borders: #1c1c1c / #2e2e2e (subtle zinc)
- Text: white primary, zinc-400 secondary, zinc-500 muted
- Accent: violet-500 for CTAs, cyan-400 for highlights, green for x402 badges
- Featured cards: subtle glow border on hover

## Iteration Details

### Iteration 1 (globals.css)
- Changed --background from hsl(240 31% 8%) to hsl(0 0% 0%) (#000)
- Changed --color-bg from #09090B to #000000
- Changed --color-surface from #18181B to #0a0a0a
- Changed --color-border from #27272A to #1c1c1c
- Added venice-card, venice-card-glow, x402-badge, price-pill utility classes
- Reduced noise overlay opacity from 0.025 to 0.015
- Made animations more subtle (slower, less movement)
- Added featured-card glow effect

### Iteration 2 (MCPSkillCard)
- Removed GlassCard wrapper → native div with venice-card styling
- Clean 3-section layout: icon+name+desc (left/center), pricing (right)
- Added x402 green glow border on hover
- Added green gradient line at top for x402-enabled cards
- Clean badges: category (colored), x402 (green), verified (muted pill)
- Compact 3-column action row: View CTA, repo link icon, compare button removed (too cluttered)
- Fixed: removed compare button (was causing UX confusion), simplified actions