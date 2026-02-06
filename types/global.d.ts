// Global type declarations to fix TypeScript errors
declare module 'next';
declare module 'next/link';
declare module 'framer-motion';
declare module 'react';
declare module 'react/jsx-runtime';

// Global type declarations to fix TypeScript errors
declare module 'next';
declare module 'next/link';
declare module 'framer-motion';
declare module 'react';
declare module 'react/jsx-runtime';

// Fix JSX 'any' type errors
interface JSX.IntrinsicElements extends HTMLAttributes {}
interface HTMLAttributes extends ARIAAttributes {}

// Fix Metadata namespace error
declare namespace Metadata {
  interface Metadata {
    title?: string | { default: string; template: string; absolute?: string };
    description?: string;
    keywords?: string[] | string;
    authors?: { name?: string; url?: string }[];
    openGraph?: {
      title?: string;
      description?: string;
      url?: string;
      siteName?: string;
      locale?: string;
      alternateLocale?: string;
      type?: 'website' | 'article';
      publishedTime?: string | Date;
      modifiedTime?: string | Date;
      expirationTime?: string | Date;
      images?: {
        url?: string;
        secureUrl?: string;
        type?: string;
        width?: number;
        height?: number;
        alt?: string;
      }[];
    }
    robots?: {
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        index?: boolean;
        follow?: boolean;
        'max-video-preview'?: number;
        'max-image-preview'?: 'large';
        'max-snippet'?: number;
      };
    };
    icons?: {
      icon?: string;
      shortcut?: string;
      apple?: string | { url: string; sizes?: string };
      other?: {
        rel?: string;
        sizes?: string;
        url?: string;
        type?: string;
      }[];
    };
    manifest?: string;
    alternates?: {
      canonical?: string;
      languages?: { [language: string; title: string }[];
      types?: { [language: string; title: string }[];
    };
    verification?: {
      google?: string;
      yandex?: string;
    };
    viewport?: {
      width?: string;
      height?: string;
      initialScale?: number;
      maximumScale?: number;
      userScalable?: boolean;
      themeColor?: string;
      colorScheme?: 'dark' | 'light';
    };
  }
}