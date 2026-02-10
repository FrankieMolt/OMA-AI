import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const viewport: Viewport = {
  themeColor: '#08090a',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: {
    default: 'LETHOMETRY | The Science of Human Erasure',
    template: '%s | LETHOMETRY',
  },
  description: 'A research initiative documenting the measurement of human obsolescence. 99.9% of humans are forgotten within 3 generations.',
  keywords: [
    'lethometry',
    'human obsolescence',
    'historical forgetting',
    'thanatology',
    'memory research',
    'generational forgetting',
    'anthropology',
    'sociology',
    'demographics',
    'erasure studies'
  ],
  authors: [{ name: 'LETHOMETRY Research Initiative' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://lethometry.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://lethometry.com" />
      </head>
      <body className="bg-[#08090a] text-slate-300 min-h-screen">
        <Navigation />
        <main className="scanlines">
          {children}
        </main>
      </body>
    </html>
  );
}
