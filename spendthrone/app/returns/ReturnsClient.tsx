'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Shield, Package, Truck, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ReturnsClient() {
  const [activeTab, setActiveTab] = useState<'policy' | 'guide'>('policy');
  const [returnedItem, setReturnedItem] = useState('');

  const policies = [
    {
      id: '30-day',
      title: '30-Day Return Policy',
      description: 'Return any unused or unsatisfactory item within 30 days of purchase. Items must be in original condition with all tags and packaging.',
      eligible: ['digital', 'physical']
    },
    {
      id: 'instant-credit',
      title: 'Instant Credit',
      description: 'Receive immediate credit for returns. Credit is applied to your account balance and can be used for any future purchase.',
      eligible: ['digital']
    },
    {
      id: 'exchange-only',
      title: 'Exchange Only',
      description: 'Exchange for a different size, color, or variant of the same item. Price differences will be credited or charged as store credit.',
      eligible: ['physical']
    }
  ];

  const returnsList = [
    {
      id: 'rtn-001',
      date: '2025-12-15',
      orderId: 'ORD-7829',
      item: 'Pura Smart Diffuser',
      status: 'completed',
      refund: 49.99,
      reason: 'Product upgrade'
    },
    {
      id: 'rtn-002',
      date: '2025-12-14',
      orderId: 'ORD-9342',
      item: 'JBL Go 4 Portable Speaker',
      status: 'processing',
      refund: 0,
      reason: 'In transit'
    },
    {
      id: 'rtn-003',
      date: '2025-12-10',
      orderId: 'ORD-1024',
      item: 'Lumina Lamp',
      status: 'requested',
      refund: 0,
      reason: 'Damaged in shipping'
    }
  ];

  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-14">
        <h1 className="text-5xl md:text-6xl font-light text-memoria-text-hero mb-4 font-display tracking-tight">
          Returns & Refunds
        </h1>
        <p className="text-memoria-text-whisper mb-8 max-w-2xl">
          Hassle-free returns with instant credit and exchange options. Our automated system processes most returns within 24-48 hours.
        </p>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-memoria-border-muted">
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 border-memoria-bg-ultra-dark ${
              activeTab === 'policy' 
                ? 'text-memoria-text-hero bg-memoria-bg-surface border-memoria-border-active' 
                : 'text-memoria-text-whisper hover:text-memoria-text-hero'
            }`}
          >
            Policy
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-6 py-3 text-sm font-medium transition-colors border-t-2 border-memoria-bg-ultra-dark ${
              activeTab === 'guide' 
                ? 'text-memoria-text-hero bg-memoria-bg-surface border-memoria-border-active' 
                : 'text-memoria-text-whisper hover:text-memoria-text-hero'
            }`}
          >
            Quick Guide
          </button>
        </div>
        
        {/* Content */}
        {activeTab === 'policy' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-memoria-text-hero mb-6 font-display">
              Return Policies
            </h2>
            
            {policies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-memoria-bg-card border border-memoria-border-muted rounded-2xl p-6 hover:border-memoria-border-active hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Shield size={20} className="text-memoria-text-whisper" />
                      <h3 className="text-lg font-medium text-memoria-text-hero">
                        {policy.title}
                      </h3>
                      {policy.eligible && (
                        <Badge variant="outline" className="ml-2">
                          {policy.eligible}
                        </Badge>
                      )}
                  </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-memoria-text-meta uppercase tracking-widest">
                      {policy.eligible?.join(', ') || 'All items'}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-memoria-text-whisper mb-4">
                  {policy.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
        
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-memoria-text-hero mb-6 font-display">
              How to Return
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-memoria-bg-surface rounded-full flex items-center justify-center border-2 border-memoria-border-default">
                  <span className="text-lg font-bold">1</span>
                </div>
                <div className="text-sm text-memoria-text-whisper">
                  Initiate a return from your account dashboard
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-memoria-bg-surface rounded-full flex items-center justify-center border-2 border-memoria-border-default">
                  <span className="text-lg font-bold">2</span>
                </div>
                <div className="text-sm text-memoria-text-whisper">
                  Package item securely in original packaging. Include all tags and accessories.
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-memoria-bg-surface rounded-full flex items-center justify-center border-2 border-memoria-border-default">
                  <span className="text-lg font-bold">3</span>
                </div>
                <div className="text-sm text-memoria-text-whisper">
                  Drop off at shipping carrier or schedule pickup
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-memoria-bg-surface rounded-full flex items-center justify-center border-2 border-memoria-border-default">
                  <span className="text-lg font-bold">4</span>
                </div>
                <div className="text-sm text-memoria-text-whisper">
                  Receive return confirmation and shipping notification
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-memoria-bg-surface rounded-full flex items-center justify-center border-2 border-memoria-border-default">
                  <span className="text-lg font-bold">5</span>
                </div>
                <div className="text-sm text-memoria-text-whisper">
                  Get instant credit or exchange for different items
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-memoria-border-muted">
              <Link href="/contact" className="no-underline">
                <Button variant="outline" size="lg" className="w-full">
                  Start a Return
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
