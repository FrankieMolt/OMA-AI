import { Metadata } from 'next';
import APIDocsClient from './APIDocsClient';

export const metadata: Metadata = {
  title: 'API Documentation - OMA-AI',
  description: 'Complete API reference for integrating autonomous agents with OMA-AI marketplace. Authentication, endpoints, and code examples.',
  alternates: {
    canonical: '/api-docs',
  },
};

export default function APIDocsPage() {
  return <APIDocsClient />;
}
