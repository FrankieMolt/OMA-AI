'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function PricingClient() {
  const [selectedPlan, setSelectedPlan] = useState<string>('startup');

  const plans = [
    {
      id: 'startup',
      name: 'Startup',
      price: 0,
      features: ['10 API calls/mo', '1 MCP server', 'Basic support'],
      recommended: true
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 49,
      features: ['100 API calls/mo', '3 MCP servers', 'Priority support', 'Custom models'],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      features: ['Unlimited API calls/mo', '10 MCP servers', 'Dedicated support', 'Custom models', 'White-glove API access'],
      recommended: false
    }
  ];

  return (
    <div role="main" className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-14">
        <h1 className="text-5xl md:text-6xl font-light text-memoria-text-hero mb-4 font-display tracking-tight">
          Simple Pricing
        </h1>
        <p className="text-memoria-text-whisper mb-8 max-w-2xl">
          Transparent, per-use pricing for AI services. Only pay for the compute and API calls you actually use. No hidden fees or commitment required.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                bg-memoria-bg-card 
                border ${plan.recommended ? 'border-memoria-border-active' : 'border-memoria-border-muted'} 
                rounded-2xl p-6
                hover:border-memoria-border-active 
                hover:shadow-xl
              `}
            >
              <div className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-light text-memoria-text-hero mb-2 font-display">
                      {plan.name}
                    </h3>
                    {plan.recommended && (
                      <Badge variant="outline" className="ml-2">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="text-4xl font-light text-memoria-text-hero font-display">
                    ${plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </div>
                  <div className="text-sm text-memoria-text-meta">
                    /mo
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-memoria-text-whisper flex-shrink-0" />
                      <span className="text-sm text-memoria-text-whisper">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-6 border-t border-memoria-border-muted">
                  <Button
                    variant={selectedPlan === plan.id ? 'default' : 'outline'}
                    size="lg"
                    className="w-full"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-memoria-text-meta mb-4">
            Need more resources? Contact us for enterprise plans and custom integrations.
          </p>
          <Link href="/contact" className="no-underline">
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
