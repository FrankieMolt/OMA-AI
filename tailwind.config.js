/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#a855f7',
          500: '#9333ea',
          600: '#7c3aed',
        },
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
        },
        green: {
          400: '#4ade80',
          500: '#22c55e',
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}