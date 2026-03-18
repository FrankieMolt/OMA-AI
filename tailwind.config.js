/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
				'gradient-tertiary': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
				'gradient-quaternary': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [
					'Inter',
					'var(--font-ibm-plex)',
					'sans-serif'
				],
				mono: [
					'JetBrains Mono',
					'monospace'
				],
				heading: [
					'Space Grotesk',
					'var(--font-space-grotesk)',
					'sans-serif'
				]
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}
