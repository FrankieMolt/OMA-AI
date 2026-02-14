import { Metadata } from 'next';
import FeaturesClient from './FeaturesClient';

export const metadata: Metadata = {
  title: "Features - SpendThrone's Premium Experience",
  description: "Explore the unique features that make shopping at SpendThrone an unparalleled luxury experience. From exclusive curations to personalized service.",
  alternates: { canonical: '/features' },
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
