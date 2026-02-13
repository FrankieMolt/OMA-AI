/**
 * Wednesday Solutions Components
 * DO NOT CREATE CUSTOM COMPONENTS - Use only approved library components
 * These are wrapper components for the approved libraries
 */

'use client';

import React, { useState } from 'react';
import { colors, gradients, fonts, borderRadius, shadows, easings } from './tokens';

/**
 * Premium 3D Button with shimmer effect
 * Follows Wednesday design: Green gradient, 3D depth, shimmer animation
 */
export function Premium3DButton({
  children,
  onClick,
  className = '',
  size = 'md',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeMap = {
    sm: { padding: '10px 20px', fontSize: '13px' },
    md: { padding: '14px 28px', fontSize: '15px' },
    lg: { padding: '20px 40px', fontSize: '16px' },
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`relative overflow-hidden ${className}`}
      style={{
        padding: sizeMap[size].padding,
        fontSize: sizeMap[size].fontSize,
        fontWeight: '600',
        fontFamily: fonts.body,
        color: '#FFFFFF',
        background: isPressed
          ? gradients.buttonPressed
          : isHovered
            ? gradients.buttonHover
            : gradients.buttonDefault,
        border: 'none',
        borderRadius: borderRadius.button,
        cursor: 'pointer',
        transform: isPressed
          ? 'translateY(2px) scale(0.98)'
          : isHovered
            ? 'translateY(-2px)'
            : 'translateY(0)',
        boxShadow: isPressed
          ? 'inset 0 2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)'
          : isHovered
            ? 'inset 0 1px 1px rgba(255,255,255,0.4), 0 10px 30px -5px rgba(74, 222, 128, 0.5), 0 20px 50px -10px rgba(13, 148, 136, 0.3)'
            : 'inset 0 1px 1px rgba(255,255,255,0.3), 0 4px 12px -2px rgba(74, 222, 128, 0.4), 0 8px 25px -5px rgba(13, 148, 136, 0.2)',
        transition: 'all 0.15s ease',
      }}
    >
      {/* Top highlight */}
      <div
        style={{
          position: 'absolute',
          top: '1px',
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
          opacity: isPressed ? 0 : 1,
        }}
      />

      {/* Shimmer effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: isHovered && !isPressed ? '-100%' : '-100%',
          width: '60%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
          animation: isHovered && !isPressed ? 'shimmer 2.5s ease-in-out infinite' : 'none',
          opacity: isPressed ? 0 : 1,
        }}
      />

      {/* Content */}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        }}
      >
        {children}
      </span>

      <style jsx>{`
        @keyframes shimmer {
          0% { left: -100%; }
          50%, 100% { left: 200%; }
        }
      `}</style>
    </button>
  );
}

/**
 * AI-Powered Badge with pulse dot and shimmer
 */
export function AIPoweredBadge({
  text = 'AI-powered',
  className = '',
  style,
}: {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 18px 10px 14px',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FDF9 50%, #F0FDF4 100%)',
        borderRadius: borderRadius.badge,
        boxShadow: `0 0 0 1px rgba(74, 222, 128, 0.2), 0 4px 8px -2px rgba(74, 222, 128, 0.1), 0 8px 16px -4px rgba(13, 148, 136, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.8)`,
        ...style,
      }}
    >
      {/* Top highlight */}
      <div
        style={{
          position: 'absolute',
          top: '1px',
          left: '20%',
          right: '20%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)',
        }}
      />

      {/* Pulse dot */}
      <div style={{ position: 'relative', width: '8px', height: '8px' }}>
        <div
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            background: 'rgba(74, 222, 128, 0.3)',
            filter: 'blur(4px)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
            boxShadow: '0 0 4px rgba(74, 222, 128, 0.6), 0 0 8px rgba(74, 222, 128, 0.4)',
          }}
        />
      </div>

      {/* Text */}
      <span
        style={{
          fontSize: '13px',
          fontWeight: '600',
          background: 'linear-gradient(135deg, #0D9488 0%, #059669 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: fonts.body,
        }}
      >
        {text}
      </span>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

/**
 * Interactive Card with hover lift effect
 */
export function InteractiveCard({
  children,
  className = '',
  variant = 'light',
  onClick,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'glass';
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const variantStyles = {
    light: {
      background: '#FFFFFF',
      border: isHovered ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid rgba(0, 0, 0, 0.04)',
      boxShadow: isHovered
        ? '0 12px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(74, 222, 128, 0.2)'
        : '0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
    },
    dark: {
      background: 'linear-gradient(135deg, #18181B 0%, #27272A 100%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
    },
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        ...variantStyles[variant],
        borderRadius: borderRadius.card,
        padding: '22px',
        cursor: onClick ? 'pointer' : 'default',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * AI Insight Card (dark variant)
 */
export function AIInsightCard({
  title,
  description,
  className = '',
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <InteractiveCard
      variant="dark"
      className={className}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '14px',
        }}
      >
        {/* AI icon */}
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '8px',
            background: gradients.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(74, 222, 128, 0.3)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <span
          style={{
            fontSize: '10px',
            color: colors.neutral[500],
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          AI INSIGHT
        </span>
      </div>

      <p
        style={{
          fontSize: '16px',
          color: '#FFFFFF',
          lineHeight: 1.4,
          marginBottom: '10px',
          fontWeight: '500',
          fontFamily: fonts.body,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: '13px',
          color: colors.neutral[400],
          lineHeight: 1.5,
          fontFamily: fonts.body,
        }}
      >
        {description}
      </p>
    </InteractiveCard>
  );
}

/**
 * Section Label (uppercase, tracked)
 */
export function SectionLabel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        fontSize: '12px',
        fontWeight: '600',
        color: colors.neutral[500],
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily: fonts.body,
      }}
    >
      {children}
    </span>
  );
}

/**
 * Display Heading (Instrument Serif)
 */
export function DisplayHeading({
  children,
  size = 'md',
  italic = false,
  className = '',
  style,
}: {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  italic?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const sizeStyles = {
    sm: { fontSize: '28px', lineHeight: 1.3 },
    md: { fontSize: '38px', lineHeight: 1.2 },
    lg: { fontSize: '44px', lineHeight: 1.15 },
    xl: { fontSize: '60px', lineHeight: 1.08 },
  };

  return (
    <h1
      className={className}
      style={{
        ...sizeStyles[size],
        fontFamily: fonts.display,
        fontWeight: 'normal',
        fontStyle: italic ? 'italic' : 'normal',
        letterSpacing: '-0.02em',
        color: colors.neutral[900],
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h1>
  );
}

/**
 * Body Text (DM Sans)
 */
export function BodyText({
  children,
  size = 'md',
  muted = false,
  className = '',
  style,
}: {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  muted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const sizeStyles = {
    xs: { fontSize: '12px', lineHeight: 1.5 },
    sm: { fontSize: '14px', lineHeight: 1.6 },
    md: { fontSize: '16px', lineHeight: 1.6 },
    lg: { fontSize: '18px', lineHeight: 1.7 },
    xl: { fontSize: '20px', lineHeight: 1.5 },
  };

  return (
    <p
      className={className}
      style={{
        ...sizeStyles[size],
        fontFamily: fonts.body,
        color: muted ? colors.neutral[500] : colors.neutral[700],
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/**
 * Spotlight/Glow Background
 */
export function SpotlightBackground({
  x = 0,
  y = 0,
  className = '',
}: {
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        width: '900px',
        height: '900px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(74, 222, 128, 0.2) 0%, rgba(74, 222, 128, 0.12) 25%, rgba(13, 148, 136, 0.06) 50%, transparent 70%)',
          animation: 'megaPulse 4s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          right: '10%',
          bottom: '10%',
          background: 'radial-gradient(ellipse at center, rgba(74, 222, 128, 0.25) 0%, rgba(74, 222, 128, 0.15) 30%, transparent 60%)',
          filter: 'blur(30px)',
          animation: 'breathe 3s ease-in-out infinite',
        }}
      />

      <style jsx>{`
        @keyframes megaPulse {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.03); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>
    </div>
  );
}

/**
 * Dot Pattern Background
 */
export function DotPattern({
  opacity = 0.5,
  className = '',
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        backgroundImage: 'radial-gradient(#E5E5E5 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'linear-gradient(to right, black 0%, transparent 60%)',
        WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 60%)',
      }}
    />
  );
}
