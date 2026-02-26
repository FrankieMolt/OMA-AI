# OMA-AI Design System

## Style: Glassmorphism + Dark Mode
Modern, professional API marketplace aesthetic.

## Color Palette
- Primary: #3b82f6 (Blue)
- Background: #050510 (Deep dark)
- Surface: #0a0a15 (Card bg)
- Surface Hover: #15151f
- Text Primary: #f0f0f5
- Text Secondary: #8b8b9a
- Border: rgba(255,255,255,0.08)
- Accent: #22c55e (Success green)
- Warning: #eab308 (Yellow)
- Error: #ef4444 (Red)

## Typography
- Font: Inter (Google Fonts)
- Heading: 2xl-5xl, semibold
- Body: base-lg, normal
- Code: Fira Code, monospace

## Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

## Components

### Cards
```css
.glass-card {
  background: rgba(10, 10, 21, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
```

### Buttons
- Primary: Blue gradient, hover glow
- Secondary: Border only, transparent bg
- Ghost: Text only, hover highlight

### Navigation
- Sticky top, glass effect
- Logo left, links right
- Mobile: Hamburger menu

## Pages

### 1. Landing (/)
- Hero: Big headline + CTA
- Features: 3-column grid
- Stats: Horizontal badges
- CTA: Final call-to-action

### 2. API (/api)
- Live status indicator
- Endpoint table
- Code examples
- Pricing cards

### 3. Dashboard (/dashboard)
- Real-time metrics
- Price charts
- Activity feed
- Quick actions

### 4. Docs (/docs)
- Sidebar navigation
- Code blocks
- API reference
- Examples

### 5. Tasks (/tasks)
- Task cards
- Filters
- Execute buttons
- Status badges

## Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768-1024px
- Desktop: > 1024px

## Animations
- Fade in: 200ms ease-out
- Hover scale: 1.02
- Loading pulse: 1.5s
- Slide up: 300ms

## Accessibility
- Focus rings: Blue outline
- Alt text: All images
- ARIA labels: All buttons
- Keyboard nav: Full support
