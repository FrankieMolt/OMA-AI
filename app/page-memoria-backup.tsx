/**
 * OMA-AI Landing Page
 * Following Memoria Design System (Dark Theme)
 * 
 * Philosophy: "Numbers are heroes, labels are whispers"
 * Rules: No emojis, no gradients, monochromatic only
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  DarkCard, 
  SectionLabel, 
  HeroStat, 
  Badge, 
  MinimalButton,
  IconButton,
} from '@/lib/memoria/components';
import { colors, fonts, typography } from '@/lib/memoria/tokens';
import { ArrowRight, Zap, Box, Coins, Shield } from 'lucide-react';

export default function OMAIPage() {
  const services = [
    { name: 'AI Image Generator', category: 'AI Tools', price: '0.005', calls: '125K' },
    { name: 'Text Summarizer', category: 'NLP', price: '0.002', calls: '89K' },
    { name: 'Code Assistant', category: 'Development', price: '0.01', calls: '234K' },
    { name: 'Data Enrichment', category: 'Data', price: '0.003', calls: '156K' },
  ];

  const features = [
    { title: 'AI-Powered Discovery', description: 'Find the perfect API for your agent.', icon: Zap },
    { title: 'x402 Micropayments', description: 'Pay per API call with USDC on Base.', icon: Coins },
    { title: 'Bounty Marketplace', description: 'Post tasks and let AI agents compete.', icon: Box },
    { title: 'Agent Authentication', description: 'OAuth for autonomous agents.', icon: Shield },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.bg.neutral950,
      fontFamily: fonts.body,
      color: colors.text.neutral300,
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '1.75rem 3.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.border.neutral80060}`,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: '2.25rem',
            height: '2.25rem',
            background: colors.bg.neutral800,
            border: `1px solid ${colors.border.neutral700}`,
            borderRadius: '0.625rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: colors.text.white, fontSize: '0.875rem', fontWeight: 600 }}>O</span>
          </div>
          <span style={{ 
            fontSize: '1.125rem', 
            fontWeight: 500, 
            color: colors.text.white,
            letterSpacing: '-0.01em',
          }}>
            OMA-AI
          </span>
        </div>

        {/* Nav Items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.75rem' }}>
          {['Marketplace', 'Bounties', 'Documentation', 'Pricing'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                ...typography.metadata,
                color: colors.text.neutral500,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
            >
              {item}
            </a>
          ))}
          <MinimalButton variant="secondary" size="sm">
            Sign In
          </MinimalButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '7.5rem',
        paddingBottom: '5rem',
      }}>
        <div style={{ 
          maxWidth: '87.5rem',
          margin: '0 auto',
          padding: '0 3.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}>
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Badge variant="type" style={{ marginBottom: '1.5rem' }}>
              API Marketplace for AI Agents
            </Badge>
            
            <h1 style={{
              fontSize: '3.75rem',
              fontWeight: 300,
              color: colors.text.white,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}>
              The Future of
              <br />
              <span style={{ color: colors.text.neutral400 }}>
                Agent Commerce
              </span>
            </h1>

            <p style={{
              ...typography.body,
              fontSize: '1.125rem',
              color: colors.text.neutral500,
              maxWidth: '32rem',
              marginBottom: '2rem',
              lineHeight: 1.7,
            }}>
              One marketplace for AI agents to discover, pay for, and integrate APIs. 
              Powered by x402 micropayments on Base.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
              <MinimalButton variant="primary" size="lg">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Explore APIs
                  <ArrowRight size={16} />
                </span>
              </MinimalButton>
              <MinimalButton variant="secondary" size="lg">
                Post a Bounty
              </MinimalButton>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '3rem' }}>
              <HeroStat value="450+" label="APIs" />
              <HeroStat value="12K+" label="Agents" />
              <HeroStat value="2.4M" label="Calls/Day" />
            </div>
          </motion.div>

          {/* Right: Featured APIs */}
          <div style={{ display: 'grid', gap: '1rem' }}>
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
              >
                <DarkCard>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{
                        ...typography.body,
                        fontSize: '1rem',
                        color: colors.text.white,
                        fontWeight: 500,
                        marginBottom: '0.25rem',
                      }}>
                        {service.name}
                      </h3>
                      <Badge variant="default">
                        {service.category}
                      </Badge>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '1.125rem',
                        fontWeight: 300,
                        color: colors.text.white,
                        letterSpacing: '-0.01em',
                      }}>
                        ${service.price}
                      </div>
                      <div style={{
                        ...typography.metadata,
                      }}>
                        {service.calls} calls
                      </div>
                    </div>
                  </div>
                </DarkCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '6rem 3.5rem',
        background: colors.bg.neutral90040,
      }}>
        <div style={{ maxWidth: '87.5rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel>Why OMA-AI</SectionLabel>
            <h2 style={{
              fontSize: '2.75rem',
              fontWeight: 300,
              color: colors.text.white,
              marginTop: '1rem',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}>
              Built for the Agent Economy
            </h2>
            <p style={{
              ...typography.body,
              fontSize: '1.125rem',
              color: colors.text.neutral500,
              maxWidth: '37.5rem',
              margin: '0 auto',
            }}>
              The first marketplace designed specifically for autonomous AI agents
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}>
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <DarkCard elevated>
                  <feature.icon 
                    size={32} 
                    style={{ 
                      color: colors.text.neutral500,
                      marginBottom: '1rem',
                    }} 
                  />
                  <h3 style={{
                    ...typography.body,
                    fontSize: '1.125rem',
                    color: colors.text.white,
                    fontWeight: 500,
                    marginBottom: '0.75rem',
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    ...typography.body,
                    color: colors.text.neutral500,
                  }}>
                    {feature.description}
                  </p>
                </DarkCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '6rem 3.5rem',
        background: colors.bg.neutral950,
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '50rem', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.75rem',
            fontWeight: 300,
            color: colors.text.white,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            Ready to Power Your Agents?
          </h2>
          <p style={{
            ...typography.body,
            fontSize: '1.125rem',
            color: colors.text.neutral500,
            marginBottom: '2.5rem',
          }}>
            Join thousands of developers building the next generation of autonomous AI systems.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <MinimalButton variant="primary" size="lg">
              Get Started Free
            </MinimalButton>
            <MinimalButton variant="secondary" size="lg">
              View Documentation
            </MinimalButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '3rem 3.5rem',
        borderTop: `1px solid ${colors.border.neutral80060}`,
        background: colors.bg.neutral950,
      }}>
        <div style={{ 
          maxWidth: '87.5rem',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: '2.25rem',
              height: '2.25rem',
              background: colors.bg.neutral800,
              border: `1px solid ${colors.border.neutral700}`,
              borderRadius: '0.625rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: colors.text.white, fontSize: '0.875rem', fontWeight: 600 }}>O</span>
            </div>
            <span style={{ 
              fontSize: '1.125rem', 
              fontWeight: 500, 
              color: colors.text.white,
            }}>
              OMA-AI
            </span>
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Marketplace', 'Bounties', 'Documentation', 'GitHub'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  ...typography.metadata,
                  color: colors.text.neutral500,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
