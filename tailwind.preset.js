/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        // Memoria Design System
        'memoria-bg-ultra-dark': '#050505',
        'memoria-bg-card': '#0a0a0a',
        'memoria-bg-surface': '#121212',
        'memoria-border-default': '#1a1a1a',
        'memoria-border-muted': '#252525',
        'memoria-border-active': '#333333',
        'memoria-text-hero': '#ffffff',
        'memoria-text-secondary': '#888888',
        'memoria-text-whisper': '#666666',
        'memoria-text-meta': '#444444',
        'memoria-text-label': '#555555',
        // Accent colors
        'accent-purple': '#a855f7',
        'accent-cyan': '#22d3ee',
        'accent-green': '#22c55e',
      },
      fontFamily: {
        'display': ['Instrument Serif', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}

module.exports = preset
