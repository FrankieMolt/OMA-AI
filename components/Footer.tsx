'use client';

import React from 'react';
import Link from 'next/link';
import { colors, typography, spacing } from '@/lib/memoria/tokens';

const footerSections = [
  {
    title: 'Product',
    links: [
      { href: '/marketplace', label: 'Marketplace' },
      { href: '/tasks', label: 'Bounties' },
      { href: '/docs', label: 'Documentation' },
    ],
  },
  {
    title: 'System',
    links: [
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Network Blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: `1px solid ${colors.border.neutral800}`,
      background: colors.bg.neutral950,
      padding: `${spacing.px(16)} ${spacing.px(14)}`,
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '87.5rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: spacing.px(10), marginBottom: spacing.px(16) }}>
          {/* Brand Column */}
          <div>
             <span style={{ ...typography.label, marginBottom: spacing.px(4), display: 'block' }}>OMA SYSTEMS</span>
             <p style={{ ...typography.body, fontSize: '0.8125rem', color: colors.text.neutral500, lineHeight: 1.5 }}>
               Autonomous infrastructure for the agent economy. Secure, decentralized, and scalable.
             </p>
          </div>

          {/* Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 style={{ ...typography.label, marginBottom: spacing.px(6), color: colors.text.neutral400 }}>
                {section.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.px(3) }}>
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      ...typography.metadata,
                      color: colors.text.neutral600,
                      textDecoration: 'none',
                      fontSize: '11px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = colors.text.neutral200)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.neutral600)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: spacing.px(8),
          borderTop: `1px solid ${colors.border.neutral900}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ ...typography.metadata, color: colors.text.neutral600, fontSize: '10px' }}>
            © {currentYear} OMA SYSTEMS • v1.0.0
          </div>
          <div style={{ display: 'flex', gap: spacing.px(6), alignItems: 'center' }}>
             <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
             <span style={{ ...typography.metadata, color: colors.text.neutral600, fontSize: '10px', textTransform: 'uppercase' }}>All Systems Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
