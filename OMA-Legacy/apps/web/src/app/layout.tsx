import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientWalletProvider } from './providers';
import { Toaster } from '@/components/ui/sonner';
import strings from '@/constants/text.json';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: strings.common.app_name_full,
  description: strings.common.description,
};

export const viewport = {
  themeColor: 'hsl(var(--primary))',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ClientWalletProvider>
          {children}
          <Toaster />
        </ClientWalletProvider>
      </body>
    </html>
  );
}
