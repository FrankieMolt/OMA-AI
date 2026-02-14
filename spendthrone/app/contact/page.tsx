import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact SpendThrone - Get In Touch',
  description: 'Have a question about our curated products or want to suggest a new item? Contact the SpendThrone team.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactClient />;
}
