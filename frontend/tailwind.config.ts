import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/page.tsx',
    './app/layout.tsx',
    './app/globals.css',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'oma-black': '#000000',
        'oma-gray': '#111111',
        'oma-dark': '#1a1a1a',
        'oma-accent': '#ff6b6b',
        'oma-bg': '#0a0a0a',
        'oma-text': '#ffffff',
        'oma-border': '#2d2d2d',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New'],
      },
    },
  },
  plugins: [],
};

export default config;