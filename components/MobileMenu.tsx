'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { colors, fonts, typography, borderRadius, spacing } from '@/lib/memoria/tokens';

interface MobileMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function MobileMenu({ activeTab, setActiveTab }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = ['dashboard', 'marketplace', 'agents', 'personas', 'skills', 'wallet', 'bounties', 'terminal'];

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-md hover:bg-neutral-800 transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 60,
          background: colors.bg.neutral900,
          border: `1px solid ${colors.border.neutral800}`,
          color: colors.text.white,
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 md:hidden"
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(4px)',
              }}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-72 z-50 md:hidden overflow-y-auto"
              style={{
                background: colors.bg.neutral950,
                borderLeft: `1px solid ${colors.border.neutral800}`,
                padding: spacing.px(8),
              }}
            >
              <div style={{ paddingTop: spacing.px(10) }}>
                {/* Header */}
                <div style={{ marginBottom: spacing.px(8) }}>
                  <span style={{
                    ...typography.label,
                    fontFamily: fonts.mono,
                  }}>
                    Navigation
                  </span>
                  <h2 style={{
                    ...typography.h2,
                    fontSize: '1.25rem',
                    color: colors.text.white,
                    marginTop: spacing.px(1),
                  }}>
                    Menu
                  </h2>
                </div>

                {/* Navigation */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: spacing.px(2) }}>
                  {tabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: `${spacing.px(3)} ${spacing.px(4)}`,
                        borderRadius: borderRadius.sm,
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        textTransform: 'capitalize',
                        transition: 'all 0.2s ease',
                        background: activeTab === tab ? colors.bg.neutral800 : 'transparent',
                        color: activeTab === tab ? colors.text.white : colors.text.neutral400,
                        border: `1px solid ${activeTab === tab ? colors.border.neutral700 : 'transparent'}`,
                        fontFamily: fonts.body,
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>

                {/* Footer */}
                <div style={{
                  marginTop: spacing.px(12),
                  paddingTop: spacing.px(6),
                  borderTop: `1px solid ${colors.border.neutral800}`,
                }}>
                  <p style={{
                    ...typography.metadata,
                    color: colors.text.neutral500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}>
                    OMA-AI Systems
                  </p>
                  <p style={{
                    fontSize: '10px',
                    color: colors.text.neutral600,
                    marginTop: spacing.px(1),
                    fontFamily: fonts.mono,
                  }}>
                    v1.0.0-Stable
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
