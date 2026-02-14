import { Metadata } from 'next';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: "FAQ - SpendThrone's Most Asked Questions",
  description: "Find answers to common questions about SpendThrone's products, ordering, shipping, and unique curation process.",
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return <FaqClient />;
}
