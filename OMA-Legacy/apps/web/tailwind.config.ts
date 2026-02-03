import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: 'class' as const,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-pattern': '40px 40px',
      },
      boxShadow: {
        neon: '0 0 10px hsla(var(--primary-hue), 100%, 70%, 0.3), 0 0 20px hsla(var(--primary-hue), 100%, 70%, 0.1)',
        'neon-sm': '0 0 5px hsla(var(--primary-hue), 100%, 70%, 0.3), 0 0 10px hsla(var(--primary-hue), 100%, 70%, 0.1)',
        'neon-hover': '0 0 15px hsla(var(--primary-hue), 100%, 70%, 0.7), 0 0 30px hsla(var(--primary-hue), 100%, 70%, 0.5)',
        'neon-secondary': '0 0 10px hsla(var(--accent-hue), 100%, 70%, 0.3), 0 0 20px hsla(var(--accent-hue), 100%, 70%, 0.1)',
        glow: '0 0 15px hsla(var(--primary-hue), 100%, 70%, 0.15)',
      },

      keyframes: {
        'pulse-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 5px rgba(0, 255, 217, 0.3))' },
          '50%': { filter: 'drop-shadow(0 0 15px rgba(0, 255, 217, 0.6))' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        '3d-float': {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0deg) rotateY(0deg)' },
          '25%': { transform: 'translateY(-10px) rotateX(5deg) rotateY(-5deg)' },
          '50%': { transform: 'translateY(-20px) rotateX(0deg) rotateY(0deg)' },
          '75%': { transform: 'translateY(-10px) rotateX(-5deg) rotateY(5deg)' },
        },
        '3d-tilt': {
          '0%, 100%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '33%': { transform: 'rotateX(8deg) rotateY(-8deg)' },
          '66%': { transform: 'rotateX(-8deg) rotateY(8deg)' },
        },
        'parallax-scroll': {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-100vh) scale(1.2)' },
        },
        'glow-pulse': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(0, 255, 217, 0.2), 0 0 40px rgba(0, 255, 217, 0.1)',
            transform: 'scale(1)',
          },
          '50%': {
            'box-shadow': '0 0 40px rgba(0, 255, 217, 0.4), 0 0 80px rgba(0, 255, 217, 0.2)',
            transform: 'scale(1.02)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'float-subtle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        '3d-float': '3d-float 6s ease-in-out infinite',
        '3d-tilt': '3d-tilt 8s ease-in-out infinite',
        'parallax-scroll': 'parallax-scroll linear',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'float-subtle': 'float-subtle 4s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite 2s',
        'gradient-x': 'gradient-x 15s ease infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
