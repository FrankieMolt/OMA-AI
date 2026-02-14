'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function ShippingClient() {
  const [selectedMethod, setSelectedMethod] = useState<'standard' | 'express' | 'overnight'>('standard');

  const shippingMethods = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 'FREE',
      duration: '5-7 business days',
      features: ['Tracking included', 'Insurance included']
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: '$9.99',
      duration: '2-3 business days',
      features: ['Tracking included', 'Priority support']
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: '$19.99',
      duration: '1 business day',
      features: ['Tracking included', 'Weekend delivery']
    }
  ];

  const carriers = [
    {
      id: 'dhl',
      name: 'DHL Express',
      countries: ['US', 'CA', 'UK', 'EU', 'AU'],
      deliveryTime: '2-5 days',
      basePrice: 12.99
    },
    {
      id: 'fedex',
      name: 'FedEx International',
      countries: ['US', 'CA', 'UK', 'EU', 'AU'],
      deliveryTime: '3-5 days',
      basePrice: 15.99
    },
    {
      id: 'ups',
      name: 'UPS Worldwide',
      countries: ['US', 'CA', 'UK', 'EU', 'AU'],
      deliveryTime: '3-7 days',
      basePrice: 14.99
    }
  ];

  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-14">
        <h1 className="text-5xl md:text-6xl font-light text-memoria-text-hero mb-4 font-display tracking-tight">
          Shipping Information
        </h1>
        <p className="text-memoria-text-whisper mb-8 max-w-2xl">
          We ship worldwide using premium carriers. Choose your preferred shipping method during checkout or see details below.
        </p>
        
        {/* Shipping Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16">
          {shippingMethods.map((method) => (
            <motion.div
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: method.id * 0.1 }}
              className={`
                bg-memoria-bg-card 
                border ${selectedMethod === method.id ? 'border-memoria-border-active' : 'border-memoria-border-muted'} 
                rounded-2xl p-6 hover:border-memoria-border-active hover:shadow-xl
                cursor-pointer
              `}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-light text-memoria-text-hero mb-2 font-display">
                    {method.name}
                  </h3>
                  {method.id === 'standard' && (
                    <Badge variant="outline" className="ml-2">Most Popular</Badge>
                  )}
                  <div className="text-4xl font-light text-memoria-text-hero font-display">
                    {method.price}
                  </div>
                  <div className="text-sm text-memoria-text-meta">
                    {method.duration}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{method.duration}</Badge>
                </div>
              </div>
              
              <ul className="space-y-3">
                {method.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-memoria-text-whisper flex-shrink-0" />
                    <span className="text-sm text-memoria-text-whisper">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-4 border-t border-memoria-border-muted">
                <Link href="/pricing" className="no-underline">
                  <Button variant={selectedMethod === 'standard' ? 'primary' : 'outline'} size="lg" className="w-full">
                    {selectedMethod === 'standard' ? 'Continue with Standard' : `Upgrade to ${method.name}`}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Carrier Details */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-light text-memoria-text-hero mb-6 font-display">
            Carrier Partners
          </h2>
          <p className="text-memoria-text-whisper mb-4">
            We partner with world-class shipping carriers for reliable worldwide delivery.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carriers.map((carrier) => (
              <motion.div
                key={carrier.id}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: carrier.id * 0.1 }}
                className="bg-memoria-bg-card border border-memoria-border-muted rounded-xl p-6 hover:border-memoria-border-active"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-memoria-bg-surface rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-memoria-text-hero">{carrier.countries[0]}</span>
                  </div>
                  <div className="text-xs text-memoria-text-meta">
                    {carrier.name}
                  </div>
                </div>
                <div className="text-sm text-memoria-text-whisper">
                  {carrier.deliveryTime}
                </div>
                <div className="text-sm text-memoria-text-secondary font-mono">
                  Base: ${carrier.basePrice}
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
