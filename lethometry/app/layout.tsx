import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  themeColor: '#0f172a',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: {
    default: 'Lethometry - The Death Clock & Life Philosophy',
    template: '%s | Lethometry',
  },
  description: 'Calculate your life expectancy, explore mortality metrics, and discover wisdom from Stoic and Buddhist philosophies. Time is fleeting - live with purpose.',
  keywords: [
    'life expectancy',
    'death clock',
    'life calculator',
    'mortality awareness',
    'memory improvement',
    'mindfulness',
    'memento mori',
    'life statistics',
    'memory tools',
    'stoicism',
    'buddhist philosophy',
    'mindfulness meditation',
    'time awareness',
    'life purpose'
  ],
  authors: [{ name: 'Lethometry' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lethometry.com',
    siteName: 'Lethometry',
    title: 'Lethometry - The Death Clock & Life Philosophy',
    description: 'Calculate your remaining time, track life statistics, and discover tools to preserve what matters most. Stoic and Buddhist wisdom for mindful living.',
    images: [
      {
        url: 'https://lethometry.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lethometry - Death Clock & Philosophy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lethometry - The Death Clock & Life Philosophy',
    description: 'Calculate your remaining time and discover wisdom from Stoic and Buddhist philosophies. Time is fleeting - live with purpose.',
    creator: '@lethometry',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lethometry - The Death Clock & Life Philosophy',
    description: 'Calculate your life expectancy, explore mortality metrics, and discover wisdom from Stoic and Buddhist philosophies. Time is fleeting - live with purpose.',
    url: 'https://lethometry.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://lethometry.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lethometry',
      url: 'https://lethometry.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lethometry.com/logo-512x512.png',
        width: 512,
        height: 512,
      },
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://lethometry.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-950 text-slate-200">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
