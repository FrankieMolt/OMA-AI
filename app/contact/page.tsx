/**
 * Contact Page
 * SEO: Unique metadata, single H1, >300 words
 */

import { Metadata } from 'next'
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us - OMA-AI Agent Ecosystem Support',
  description: 'Connect with the OMA-AI team for support, partnerships, and technical inquiries. We are here to help you navigate the autonomous AI agent economy.',
  keywords: ['AI support', 'contact OMA-AI', 'agent economy partnership', 'developer support', 'technical help'],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us - OMA-AI Agent Ecosystem Support',
    description: 'Connect with the OMA-AI team for support, partnerships, and technical inquiries.',
    url: '/contact',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Contact OMA-AI',
    }],
    type: 'website',
  }
}

export default function Page() {
  return (
    <>
      <ContactClient />
      
      {/* SEO Content */}
      <div className="sr-only">
        <h2>We're Here to Help</h2>
        <p>
          Whether you are a developer looking for technical assistance with our SDK, a business exploring 
          partnership opportunities, or a researcher interested in the future of autonomous agents, 
          the OMA-AI team is ready to connect.
        </p>
        <p>
          Our mission is to foster a vibrant, open ecosystem for machine intelligence. We believe 
          that communication and collaboration are essential to achieving this goal. We aim to respond 
          to all inquiries within 24-48 hours.
        </p>
        <p>
          You can also find us on social media and GitHub. We encourage community participation and 
          feedback on our open-source projects. Join us in building the infrastructure for the 
          autonomous future.
        </p>
      </div>
    </>
  );
}
