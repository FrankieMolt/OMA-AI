import { Metadata } from 'next';
import DeathClockClient from './DeathClockClient';

export const metadata: Metadata = {
  title: 'Death Clock - Calculate Your Remaining Time | Lethometry',
  description: 'Quantify your remaining temporal assets with the Lethometry Death Clock. Calculate life expectancy and visualize your remaining days in real-time.',
  alternates: { canonical: '/clock' },
};

export default function DeathClockPage() {
  return <DeathClockClient />;
}
