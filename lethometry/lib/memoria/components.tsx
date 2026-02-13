/**
 * Memoria Design System Components - Unified & Improved
 * Premium dark-themed knowledge interfaces
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, fonts, typography, borderRadius, transitions, spacing } from './tokens';

/**
 * Premium Dark Card
 */
export function DarkCard({
  children,
  className = '',
  onClick,
  style,
  hoverable = true,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  hoverable?: boolean;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverable ? { y: -4, borderColor: colors.border.neutral600 } : {}}
      transition={transitions.smooth}
      className={className}
      style={{
        background: colors.bg.neutral900,
        border: `1px solid ${colors.border.neutral800}`,
        borderRadius: borderRadius.md,
        padding: spacing.px(6),
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Whisper Label
 */
export function SectionLabel({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={className}
      style={{
        ...typography.label,
        fontFamily: fonts.mono,
        display: 'block',
        marginBottom: spacing.px(2),
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/**
 * Hero Stat - "Numbers are Heroes"
 */
export function HeroStat({
  value,
  label,
  className = '',
  style,
}: {
  value: string | number;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={{ textAlign: 'left', ...style }}>
      <SectionLabel>{label}</SectionLabel>
      <div style={{ ...typography.hero }}>
        {value}
      </div>
    </div>
  );
}

/**
 * Minimalist Badge
 */
export function Badge({
  children,
  variant = 'default',
  className = '',
  style,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'active' | 'outline';
  className?: string;
  style?: React.CSSProperties;
}) {
  const styles = {
    default: {
      background: colors.bg.neutral800,
      color: colors.text.neutral400,
      border: `1px solid transparent`,
    },
    active: {
      background: colors.bg.neutral700,
      color: colors.text.white,
      border: `1px solid ${colors.border.neutral600}`,
    },
    outline: {
      background: 'transparent',
      color: colors.text.neutral500,
      border: `1px solid ${colors.border.neutral800}`,
    },
  };

  return (
    <span
      className={className}
      style={{
        ...styles[variant],
        padding: `${spacing.px(1)} ${spacing.px(3)}`,
        borderRadius: borderRadius.sm,
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: fonts.mono,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/**
 * Minimalist Button
 */
export function MinimalButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  const sizeMap = {
    sm: { padding: `${spacing.px(2)} ${spacing.px(4)}`, fontSize: '0.75rem' },
    md: { padding: `${spacing.px(3)} ${spacing.px(6)}`, fontSize: '0.875rem' },
    lg: { padding: `${spacing.px(4)} ${spacing.px(8)}`, fontSize: '1rem' },
  };

  const variants = {
    primary: {
      background: colors.text.white,
      color: colors.bg.neutral950,
      border: `1px solid ${colors.text.white}`,
    },
    secondary: {
      background: 'transparent',
      color: colors.text.white,
      border: `1px solid ${colors.border.neutral700}`,
    },
    ghost: {
      background: 'transparent',
      color: colors.text.neutral400,
      border: '1px solid transparent',
    },
  };

  return (
    <motion.button
      disabled={disabled}
      onClick={onClick}
      whileHover={!disabled ? { background: variant === 'primary' ? '#e5e5e5' : colors.bg.neutral80060 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={className}
      style={{
        ...sizeMap[size],
        ...variants[variant],
        borderRadius: borderRadius.sm,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: fonts.body,
        fontWeight: 500,
        opacity: disabled ? 0.5 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.px(2),
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

/**
 * Text Input
 */
export function TextInput({
  placeholder,
  value,
  onChange,
  className = '',
  style,
}: {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      style={{
        width: '100%',
        padding: `${spacing.px(3)} ${spacing.px(4)}`,
        background: colors.bg.neutral900,
        border: `1px solid ${colors.border.neutral800}`,
        borderRadius: borderRadius.sm,
        color: colors.text.white,
        fontSize: '0.875rem',
        fontFamily: fonts.body,
        outline: 'none',
        transition: 'border-color 0.2s ease',
        ...style,
      }}
    />
  );
}
