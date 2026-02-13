/**
 * Wednesday Solutions Design Tokens
 * DO NOT MODIFY - These are the official brand tokens
 * Source: wednesday-design skill
 */

export const colors = {
  // Primary - Green gradient spectrum
  primary: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',  // Primary accent
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },

  // Secondary - Teal spectrum
  secondary: {
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',  // Secondary accent
    700: '#0F766E',
    800: '#115E59',
  },

  // Neutrals - Zinc spectrum
  neutral: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',  // Body text
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',  // Headings
    950: '#09090B',
  },

  // Semantic colors
  success: '#4ADE80',
  warning: '#FBBF24',
  error: '#EF4444',
  info: '#3B82F6',
}

export const gradients = {
  // Primary brand gradient
  primary: 'linear-gradient(135deg, #4ADE80 0%, #0D9488 100%)',
  primarySubtle: 'linear-gradient(135deg, rgba(74, 222, 128, 0.08) 0%, rgba(13, 148, 136, 0.08) 100%)',
  
  // Card backgrounds
  darkCard: 'linear-gradient(135deg, #18181B 0%, #27272A 100%)',
  lightCard: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
  
  // Button states
  buttonDefault: 'linear-gradient(180deg, #4ADE80 0%, #3ACC72 50%, #2AB862 100%)',
  buttonHover: 'linear-gradient(180deg, #3BD975 0%, #2EBE68 50%, #25A85C 100%)',
  buttonPressed: 'linear-gradient(180deg, #1D8B54 0%, #2AA06A 50%, #34D480 100%)',
  
  // Glow effects
  glowPrimary: 'radial-gradient(circle, rgba(74, 222, 128, 0.2) 0%, transparent 70%)',
  glowSecondary: 'radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, transparent 70%)',
}

export const fonts = {
  display: "'Instrument Serif', Georgia, serif",
  body: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
}

export const typography = {
  display: {
    xl: { fontSize: '60px', lineHeight: 1.08, letterSpacing: '-0.02em' },
    lg: { fontSize: '44px', lineHeight: 1.15, letterSpacing: '-0.02em' },
    md: { fontSize: '38px', lineHeight: 1.2, letterSpacing: '-0.01em' },
    sm: { fontSize: '28px', lineHeight: 1.3, letterSpacing: '-0.01em' },
  },
  body: {
    xl: { fontSize: '20px', lineHeight: 1.5 },
    lg: { fontSize: '18px', lineHeight: 1.7 },
    md: { fontSize: '16px', lineHeight: 1.6 },
    sm: { fontSize: '14px', lineHeight: 1.6 },
    xs: { fontSize: '12px', lineHeight: 1.5 },
  },
  label: {
    lg: { fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em' },
    md: { fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' },
    sm: { fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em' },
  },
}

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
}

export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '10px',
  xl: '14px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
  button: '14px',
  card: '24px',
  badge: '100px',
}

export const shadows = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.04)',
  md: '0 4px 24px rgba(0, 0, 0, 0.08)',
  lg: '0 12px 40px rgba(0, 0, 0, 0.12)',
  xl: '0 20px 50px rgba(0, 0, 0, 0.15)',
  glowPrimary: '0 4px 12px rgba(74, 222, 128, 0.4)',
  glowSecondary: '0 4px 16px rgba(13, 148, 136, 0.3)',
}

export const easings = {
  easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
  easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  easeInOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  spring: 'cubic-bezier(0.4, 0, 0.2, 1)',
}

export const durations = {
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '800ms',
}
