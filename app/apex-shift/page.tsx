/**
 * The Apex Predator Shift - Research
 * SEO: Unique metadata, single H1
 */

import { Metadata } from 'next'
import ApexShiftPage from './ApexShiftClient';

export const metadata: Metadata = {
  title: 'The Apex Predator Shift - Cognitive Displacement Research',
  description: 'An academic analysis of the transition from biological to digital cognitive dominance. Research on AGI emergence, biological constraints, and the future of the agent economy.',
  keywords: ['AGI research', 'cognitive dominance', 'AI singularity', 'agent economy analysis', 'digital intelligence vs biological intelligence'],
}

export default function Page() {
  return <ApexShiftPage />;
}
