/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        memoria: {
          'bg-ultra-dark': 'var(--memoria-bg-ultra-dark)',
          'bg-card': 'var(--memoria-bg-card)',
          'bg-surface': 'var(--memoria-bg-surface)',
          'border-muted': 'var(--memoria-border-muted)',
          'border-default': 'var(--memoria-border-default)',
          'border-active': 'var(--memoria-border-active)',
          'text-hero': 'var(--memoria-text-hero)',
          'text-secondary': 'var(--memoria-text-secondary)',
          'text-whisper': 'var(--memoria-text-whisper)',
          'text-meta': 'var(--memoria-text-meta)',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'var(--font-source-sans)', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
