/**
 * Memoria Design System Tokens - CSS Variable Based
 * Philosophy: "Numbers are heroes, labels are whispers"
 */

export const colors = {
  bg: {
    neutral950: 'var(--memoria-bg-ultra-dark)',
    neutral900: 'var(--memoria-bg-card)',
    neutral800: 'var(--memoria-bg-surface)',
    neutral700: 'var(--memoria-bg-active)',
  },
  border: {
    neutral900: 'var(--memoria-bg-card)',
    neutral800: 'var(--memoria-bg-surface)',
    neutral700: 'var(--memoria-border-default)',
    neutral600: 'var(--memoria-border-active)',
  },
  text: {
    white: 'var(--memoria-text-hero)',
    neutral100: 'var(--memoria-text-body)',
    neutral200: 'var(--memoria-text-secondary)',
    neutral400: 'var(--memoria-text-label)',
    neutral500: 'var(--memoria-text-whisper)',
    neutral600: 'var(--memoria-text-meta)',
  },
}

export const fonts = {
  display: 'var(--font-instrument-serif), "Instrument Serif", serif',
  body: 'var(--font-inter), var(--font-dm-sans), sans-serif',
  mono: 'var(--font-mono), monospace',
}

export const typography = {
  hero: {
    fontSize: '4.5rem',
    fontWeight: 200,
    letterSpacing: '-0.04em',
    lineHeight: 1,
    fontFamily: fonts.display,
  },
  h1: {
    fontSize: '3rem',
    fontWeight: 300,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    fontFamily: fonts.display,
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 400,
    letterSpacing: '-0.01em',
    lineHeight: 1.2,
    fontFamily: fonts.display,
  },
  label: {
    fontSize: '0.625rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--memoria-text-whisper)',
  },
  body: {
    fontSize: '0.9375rem',
    fontWeight: 400,
    lineHeight: 1.6,
    color: 'var(--memoria-text-secondary)',
  },
  metadata: {
    fontSize: '0.75rem',
    fontWeight: 400,
    color: 'var(--memoria-text-meta)',
  },
}

export const spacing = {
  base: 4,
  px: (multiplier: number) => `calc(${multiplier} * 4px)`,
  container: 'max-w-7xl mx-auto px-6',
}

export const borderRadius = {
  none: '0',
  sm: '2px',
  md: '4px',
  lg: '8px',
  full: '9999px',
}

export const transitions = {
  smooth: { type: 'spring' as const, stiffness: 300, damping: 30 },
  fast: { type: 'spring' as const, stiffness: 400, damping: 25 },
  slow: { type: 'spring' as const, stiffness: 200, damping: 35 },
}
