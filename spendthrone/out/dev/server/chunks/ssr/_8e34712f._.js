module.exports = [
"[project]/lib/wednesday/tokens.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Wednesday Solutions Design Tokens
 * DO NOT MODIFY - These are the official brand tokens
 * Source: wednesday-design skill
 */ __turbopack_context__.s([
    "borderRadius",
    ()=>borderRadius,
    "colors",
    ()=>colors,
    "durations",
    ()=>durations,
    "easings",
    ()=>easings,
    "fonts",
    ()=>fonts,
    "gradients",
    ()=>gradients,
    "shadows",
    ()=>shadows,
    "spacing",
    ()=>spacing,
    "typography",
    ()=>typography
]);
const colors = {
    // Primary - Green gradient spectrum
    primary: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#22C55E',
        600: '#16A34A',
        700: '#15803D',
        800: '#166534',
        900: '#14532D'
    },
    // Secondary - Teal spectrum
    secondary: {
        400: '#2DD4BF',
        500: '#14B8A6',
        600: '#0D9488',
        700: '#0F766E',
        800: '#115E59'
    },
    // Neutrals - Zinc spectrum
    neutral: {
        50: '#FAFAFA',
        100: '#F4F4F5',
        200: '#E4E4E7',
        300: '#D4D4D8',
        400: '#A1A1AA',
        500: '#71717A',
        600: '#52525B',
        700: '#3F3F46',
        800: '#27272A',
        900: '#18181B',
        950: '#09090B'
    },
    // Semantic colors
    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#EF4444',
    info: '#3B82F6'
};
const gradients = {
    // Primary brand gradient
    primary: 'linear-gradient(135deg, #4ADE80 0%, #0D9488 100%)',
    primarySubtle: 'linear-gradient(135deg, rgba(74, 222, 128, 0.08) 0%, rgba(13, 148, 136, 0.08) 100%)',
    // Card backgrounds
    darkCard: 'linear-gradient(135deg, #18181B 0%, #27272A 100%)',
    lightCard: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
    // Button states
    buttonDefault: 'linear-gradient(180deg, #4ADE80 0%, #3ACC72 50%, #2AB862 100%)',
    buttonHover: 'linear-gradient(180deg, #3BD975 0%, #2EBE68 50%, #25A85C 100%)',
    buttonPressed: 'linear-gradient(180deg, #1D8B54 0%, #2AA06A 50%, #34D480 100%)',
    // Glow effects
    glowPrimary: 'radial-gradient(circle, rgba(74, 222, 128, 0.2) 0%, transparent 70%)',
    glowSecondary: 'radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, transparent 70%)'
};
const fonts = {
    display: "'Instrument Serif', Georgia, serif",
    body: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', Consolas, monospace"
};
const typography = {
    display: {
        xl: {
            fontSize: '60px',
            lineHeight: 1.08,
            letterSpacing: '-0.02em'
        },
        lg: {
            fontSize: '44px',
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
        },
        md: {
            fontSize: '38px',
            lineHeight: 1.2,
            letterSpacing: '-0.01em'
        },
        sm: {
            fontSize: '28px',
            lineHeight: 1.3,
            letterSpacing: '-0.01em'
        }
    },
    body: {
        xl: {
            fontSize: '20px',
            lineHeight: 1.5
        },
        lg: {
            fontSize: '18px',
            lineHeight: 1.7
        },
        md: {
            fontSize: '16px',
            lineHeight: 1.6
        },
        sm: {
            fontSize: '14px',
            lineHeight: 1.6
        },
        xs: {
            fontSize: '12px',
            lineHeight: 1.5
        }
    },
    label: {
        lg: {
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.05em'
        },
        md: {
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em'
        },
        sm: {
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em'
        }
    }
};
const spacing = {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    10: '40px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px'
};
const borderRadius = {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '10px',
    xl: '14px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
    button: '14px',
    card: '24px',
    badge: '100px'
};
const shadows = {
    sm: '0 2px 8px rgba(0, 0, 0, 0.04)',
    md: '0 4px 24px rgba(0, 0, 0, 0.08)',
    lg: '0 12px 40px rgba(0, 0, 0, 0.12)',
    xl: '0 20px 50px rgba(0, 0, 0, 0.15)',
    glowPrimary: '0 4px 12px rgba(74, 222, 128, 0.4)',
    glowSecondary: '0 4px 16px rgba(13, 148, 136, 0.3)'
};
const easings = {
    easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
    easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
    easeInOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
    easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    spring: 'cubic-bezier(0.4, 0, 0.2, 1)'
};
const durations = {
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
    slowest: '800ms'
};
}),
"[project]/lib/wednesday/components.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AIInsightCard",
    ()=>AIInsightCard,
    "AIPoweredBadge",
    ()=>AIPoweredBadge,
    "BodyText",
    ()=>BodyText,
    "DisplayHeading",
    ()=>DisplayHeading,
    "DotPattern",
    ()=>DotPattern,
    "InteractiveCard",
    ()=>InteractiveCard,
    "Premium3DButton",
    ()=>Premium3DButton,
    "SectionLabel",
    ()=>SectionLabel,
    "SpotlightBackground",
    ()=>SpotlightBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wednesday/tokens.ts [app-ssr] (ecmascript)");
/**
 * Wednesday Solutions Components
 * DO NOT CREATE CUSTOM COMPONENTS - Use only approved library components
 * These are wrapper components for the approved libraries
 */ 'use client';
;
;
;
;
function Premium3DButton({ children, onClick, className = '', size = 'md' }) {
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPressed, setIsPressed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const sizeMap = {
        sm: {
            padding: '10px 20px',
            fontSize: '13px'
        },
        md: {
            padding: '14px 28px',
            fontSize: '15px'
        },
        lg: {
            padding: '20px 40px',
            fontSize: '16px'
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>{
            setIsHovered(false);
            setIsPressed(false);
        },
        onMouseDown: ()=>setIsPressed(true),
        onMouseUp: ()=>setIsPressed(false),
        style: {
            padding: sizeMap[size].padding,
            fontSize: sizeMap[size].fontSize,
            fontWeight: '600',
            fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body,
            color: '#FFFFFF',
            background: isPressed ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gradients"].buttonPressed : isHovered ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gradients"].buttonHover : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gradients"].buttonDefault,
            border: 'none',
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderRadius"].button,
            cursor: 'pointer',
            transform: isPressed ? 'translateY(2px) scale(0.98)' : isHovered ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: isPressed ? 'inset 0 2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)' : isHovered ? 'inset 0 1px 1px rgba(255,255,255,0.4), 0 10px 30px -5px rgba(74, 222, 128, 0.5), 0 20px 50px -10px rgba(13, 148, 136, 0.3)' : 'inset 0 1px 1px rgba(255,255,255,0.3), 0 4px 12px -2px rgba(74, 222, 128, 0.4), 0 8px 25px -5px rgba(13, 148, 136, 0.2)',
            transition: 'all 0.15s ease'
        },
        className: "jsx-686d9a09d80e60cd" + " " + `relative overflow-hidden ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '1px',
                    left: '10%',
                    right: '10%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                    opacity: isPressed ? 0 : 1
                },
                className: "jsx-686d9a09d80e60cd"
            }, void 0, false, {
                fileName: "[project]/lib/wednesday/components.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 0,
                    left: isHovered && !isPressed ? '-100%' : '-100%',
                    width: '60%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                    animation: isHovered && !isPressed ? 'shimmer 2.5s ease-in-out infinite' : 'none',
                    opacity: isPressed ? 0 : 1
                },
                className: "jsx-686d9a09d80e60cd"
            }, void 0, false, {
                fileName: "[project]/lib/wednesday/components.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                },
                className: "jsx-686d9a09d80e60cd",
                children: children
            }, void 0, false, {
                fileName: "[project]/lib/wednesday/components.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "686d9a09d80e60cd",
                children: "@keyframes shimmer{0%{left:-100%}50%,to{left:200%}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/lib/wednesday/components.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
function AIPoweredBadge({ text = 'AI-powered', className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 18px 10px 14px',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FDF9 50%, #F0FDF4 100%)',
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderRadius"].badge,
            boxShadow: `0 0 0 1px rgba(74, 222, 128, 0.2), 0 4px 8px -2px rgba(74, 222, 128, 0.1), 0 8px 16px -4px rgba(13, 148, 136, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.8)`
        },
        className: "jsx-b9e3788cb8cd546c" + " " + (className || ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '1px',
                    left: '20%',
                    right: '20%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)'
                },
                className: "jsx-b9e3788cb8cd546c"
            }, void 0, false, {
                fileName: "[project]/lib/wednesday/components.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative',
                    width: '8px',
                    height: '8px'
                },
                className: "jsx-b9e3788cb8cd546c",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: '-4px',
                            borderRadius: '50%',
                            background: 'rgba(74, 222, 128, 0.3)',
                            filter: 'blur(4px)',
                            animation: 'pulse 2s ease-in-out infinite'
                        },
                        className: "jsx-b9e3788cb8cd546c"
                    }, void 0, false, {
                        fileName: "[project]/lib/wednesday/components.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                            boxShadow: '0 0 4px rgba(74, 222, 128, 0.6), 0 0 8px rgba(74, 222, 128, 0.4)'
                        },
                        className: "jsx-b9e3788cb8cd546c"
                    }, void 0, false, {
                        fileName: "[project]/lib/wednesday/components.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/lib/wednesday/components.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: '13px',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #0D9488 0%, #059669 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body
                },
                className: "jsx-b9e3788cb8cd546c",
                children: text
            }, void 0, false, {
                fileName: "[project]/lib/wednesday/components.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "b9e3788cb8cd546c",
                children: "@keyframes pulse{0%,to{opacity:1}50%{opacity:.6}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/lib/wednesday/components.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
function InteractiveCard({ children, className = '', variant = 'light', onClick }) {
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const variantStyles = {
        light: {
            background: '#FFFFFF',
            border: isHovered ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid rgba(0, 0, 0, 0.04)',
            boxShadow: isHovered ? '0 12px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(74, 222, 128, 0.2)' : '0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.8)'
        },
        dark: {
            background: 'linear-gradient(135deg, #18181B 0%, #27272A 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
        },
        glass: {
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        className: className,
        style: {
            ...variantStyles[variant],
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderRadius"].card,
            padding: '22px',
            cursor: onClick ? 'pointer' : 'default',
            transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/wednesday/components.tsx",
        lineNumber: 243,
        columnNumber: 5
    }, this);
}
function AIInsightCard({ title, description, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InteractiveCard, {
        variant: "dark",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '14px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '26px',
                            height: '26px',
                            borderRadius: '8px',
                            background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gradients"].primary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(74, 222, 128, 0.3)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "12",
                            height: "12",
                            viewBox: "0 0 24 24",
                            fill: "#FFFFFF",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                            }, void 0, false, {
                                fileName: "[project]/lib/wednesday/components.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/lib/wednesday/components.tsx",
                            lineNumber: 300,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/lib/wednesday/components.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '10px',
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[500],
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase'
                        },
                        children: "AI INSIGHT"
                    }, void 0, false, {
                        fileName: "[project]/lib/wednesday/components.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/lib/wednesday/components.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '16px',
                    color: '#FFFFFF',
                    lineHeight: 1.4,
                    marginBottom: '10px',
                    fontWeight: '500',
                    fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/lib/wednesday/components.tsx",
                lineNumber: 316,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '13px',
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[400],
                    lineHeight: 1.5,
                    fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body
                },
                children: description
            }, void 0, false, {
                fileName: "[project]/lib/wednesday/components.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/lib/wednesday/components.tsx",
        lineNumber: 275,
        columnNumber: 5
    }, this);
}
function SectionLabel({ children, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        style: {
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: '600',
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[500],
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/wednesday/components.tsx",
        lineNumber: 353,
        columnNumber: 5
    }, this);
}
function DisplayHeading({ children, size = 'md', italic = false, className = '' }) {
    const sizeStyles = {
        sm: {
            fontSize: '28px',
            lineHeight: 1.3
        },
        md: {
            fontSize: '38px',
            lineHeight: 1.2
        },
        lg: {
            fontSize: '44px',
            lineHeight: 1.15
        },
        xl: {
            fontSize: '60px',
            lineHeight: 1.08
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
        className: className,
        style: {
            ...sizeStyles[size],
            fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].display,
            fontWeight: 'normal',
            fontStyle: italic ? 'italic' : 'normal',
            letterSpacing: '-0.02em',
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[900],
            margin: 0
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/wednesday/components.tsx",
        lineNumber: 392,
        columnNumber: 5
    }, this);
}
function BodyText({ children, size = 'md', muted = false, className = '' }) {
    const sizeStyles = {
        xs: {
            fontSize: '12px',
            lineHeight: 1.5
        },
        sm: {
            fontSize: '14px',
            lineHeight: 1.6
        },
        md: {
            fontSize: '16px',
            lineHeight: 1.6
        },
        lg: {
            fontSize: '18px',
            lineHeight: 1.7
        },
        xl: {
            fontSize: '20px',
            lineHeight: 1.5
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: className,
        style: {
            ...sizeStyles[size],
            fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body,
            color: muted ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[500] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[700],
            margin: 0
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/wednesday/components.tsx",
        lineNumber: 432,
        columnNumber: 5
    }, this);
}
function SpotlightBackground({ x = 0, y = 0, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            width: '900px',
            height: '900px',
            pointerEvents: 'none'
        },
        className: "jsx-7c9a49896223464a" + " " + (className || ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, rgba(74, 222, 128, 0.2) 0%, rgba(74, 222, 128, 0.12) 25%, rgba(13, 148, 136, 0.06) 50%, transparent 70%)',
                    animation: 'megaPulse 4s ease-in-out infinite'
                },
                className: "jsx-7c9a49896223464a"
            }, void 0, false, {
                fileName: "[project]/lib/wednesday/components.tsx",
                lineNumber: 471,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    background: 'radial-gradient(ellipse at center, rgba(74, 222, 128, 0.25) 0%, rgba(74, 222, 128, 0.15) 30%, transparent 60%)',
                    filter: 'blur(30px)',
                    animation: 'breathe 3s ease-in-out infinite'
                },
                className: "jsx-7c9a49896223464a"
            }, void 0, false, {
                fileName: "[project]/lib/wednesday/components.tsx",
                lineNumber: 479,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "7c9a49896223464a",
                children: "@keyframes megaPulse{0%,to{opacity:1;transform:translate(-50%,-50%)scale(1)}50%{opacity:.7;transform:translate(-50%,-50%)scale(1.03)}}@keyframes breathe{0%,to{opacity:1;transform:translate(-50%,-50%)scale(1)}50%{opacity:.8;transform:translate(-50%,-50%)scale(1.08)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/lib/wednesday/components.tsx",
        lineNumber: 459,
        columnNumber: 5
    }, this);
}
function DotPattern({ opacity = 0.5, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        style: {
            position: 'absolute',
            inset: 0,
            opacity,
            backgroundImage: 'radial-gradient(#E5E5E5 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to right, black 0%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 60%)'
        }
    }, void 0, false, {
        fileName: "[project]/lib/wednesday/components.tsx",
        lineNumber: 517,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SpendThronePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wednesday/components.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wednesday/tokens.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-ssr] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
/**
 * SpendThrone Landing Page
 * Following Wednesday Solutions Design System
 */ 'use client';
;
;
;
;
;
;
function SpendThronePage() {
    const [scrollProgress, setScrollProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [showSearchBar, setShowSearchBar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, []);
    const products = [
        {
            id: 1,
            name: 'AI-Powered Resume Builder',
            price: 49.99,
            category: 'AI Tools',
            rating: 4.8,
            reviews: 1247,
            description: 'Let AI craft the perfect resume in seconds.'
        },
        {
            id: 2,
            name: 'Smart Calendar Assistant',
            price: 19.99,
            category: 'Productivity',
            rating: 4.6,
            reviews: 892,
            description: 'Never miss a meeting with AI scheduling.'
        },
        {
            id: 3,
            name: 'Email Summarizer',
            price: 29.99,
            category: 'Communication',
            rating: 4.7,
            reviews: 2341,
            description: 'Get instant summaries of long email threads.'
        },
        {
            id: 4,
            name: 'Code Review AI',
            price: 39.99,
            category: 'Development',
            rating: 4.9,
            reviews: 5678,
            description: 'Automated code reviews with actionable feedback.'
        },
        {
            id: 5,
            name: 'Meeting Notes AI',
            price: 14.99,
            category: 'Productivity',
            rating: 4.5,
            reviews: 1834,
            description: 'Transform meetings into actionable insights.'
        },
        {
            id: 6,
            name: 'Social Media Assistant',
            price: 24.99,
            category: 'Marketing',
            rating: 4.4,
            reviews: 923,
            description: 'Generate engaging content for all platforms.'
        }
    ];
    const categories = [
        'all',
        'ai-tools',
        'productivity',
        'communication',
        'development',
        'marketing'
    ];
    const featuredProducts = products.slice(0, 3);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            background: '#FAFAFA',
            fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body,
            position: 'relative',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DotPattern"], {
                opacity: 0.3
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpotlightBackground"], {
                x: -200,
                y: -200
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    padding: '28px 56px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(250, 250, 250, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.04)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '36px',
                                    height: '36px',
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gradients"].primary,
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(74, 222, 128, 0.3)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                    size: 18,
                                    style: {
                                        color: '#FFFFFF'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[900]
                                },
                                children: "SpendThrone"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '32px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Premium3DButton"], {
                                size: "sm",
                                onClick: ()=>setShowSearchBar(!showSearchBar),
                                children: showSearchBar ? 'Hide Search' : 'Search Products'
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Premium3DButton"], {
                                size: "sm",
                                children: "Sign In"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    position: 'relative',
                    minHeight: '90vh',
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '120px',
                    paddingBottom: '80px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: '1400px',
                        margin: '0 auto',
                        padding: '0 56px',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '80px',
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AIPoweredBadge"], {
                                    text: "The Sovereign Marketplace",
                                    style: {
                                        marginBottom: '24px'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DisplayHeading"], {
                                    size: "xl",
                                    italic: true,
                                    style: {
                                        marginBottom: '24px'
                                    },
                                    children: [
                                        "Discover ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                background: 'linear-gradient(135deg, #4ADE80 0%, #0D9488 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            },
                                            children: "Premium"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 185,
                                            columnNumber: 24
                                        }, this),
                                        ' ',
                                        "AI Products"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BodyText"], {
                                    size: "lg",
                                    muted: true,
                                    style: {
                                        marginBottom: '32px',
                                        maxWidth: '600px'
                                    },
                                    children: "Curated AI tools and products that actually work. Verified quality, real reviews, transparent pricing."
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '16px',
                                        marginBottom: '48px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Premium3DButton"], {
                                            onClick: ()=>window.location.href = '/products',
                                            children: "Browse All Products"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 200,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            style: {
                                                padding: '14px 28px',
                                                fontSize: '15px',
                                                fontWeight: '600',
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[900],
                                                background: 'transparent',
                                                border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[300]}`,
                                                borderRadius: '14px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            },
                                            children: "Learn More"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '48px'
                                    },
                                    children: [
                                        {
                                            label: 'Products',
                                            value: '2,500+'
                                        },
                                        {
                                            label: 'Reviews',
                                            value: '15K+'
                                        },
                                        {
                                            label: 'Categories',
                                            value: '12'
                                        }
                                    ].map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: '36px',
                                                        fontWeight: '600',
                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].primary[400],
                                                        fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body
                                                    },
                                                    children: stat.value
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: '13px',
                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[500],
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em'
                                                    },
                                                    children: stat.label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 234,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 225,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                x: 40
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            transition: {
                                duration: 0.5,
                                delay: 0.2
                            },
                            style: {
                                display: 'grid',
                                gap: '16px'
                            },
                            children: featuredProducts.map((product, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        x: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    transition: {
                                        duration: 0.3,
                                        delay: 0.3 + i * 0.1
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'flex-start'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            style: {
                                                                fontSize: '16px',
                                                                fontWeight: '600',
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[900],
                                                                marginBottom: '4px',
                                                                fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body
                                                            },
                                                            children: product.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 264,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: '12px',
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[500],
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em'
                                                            },
                                                            children: product.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 273,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: 'auto',
                                                        textAlign: 'right'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '24px',
                                                                fontWeight: '600',
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].primary[400]
                                                            },
                                                            children: [
                                                                "$",
                                                                product.price
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '11px',
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[500],
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '4px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Star, {
                                                                    size: 12,
                                                                    style: {
                                                                        fill: '#FBBF24'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 298,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: product.rating
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 299,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BodyText"], {
                                                    size: "sm",
                                                    muted: true,
                                                    style: {
                                                        marginTop: '12px',
                                                        flexGrow: 1
                                                    },
                                                    children: product.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Premium3DButton"], {
                                                    size: "sm",
                                                    style: {
                                                        marginTop: '16px',
                                                        width: '100%'
                                                    },
                                                    children: "View Details"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 262,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 17
                                    }, this)
                                }, product.id, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: '96px 56px',
                    background: '#FFFFFF',
                    position: 'relative'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: '1400px',
                        margin: '0 auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                marginBottom: '64px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionLabel"], {
                                    children: "Product Catalog"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 326,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DisplayHeading"], {
                                    size: "lg",
                                    style: {
                                        marginTop: '16px',
                                        marginBottom: '16px'
                                    },
                                    children: "Browse AI-Powered Products"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 327,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 325,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '12px',
                                marginBottom: '48px',
                                flexWrap: 'wrap'
                            },
                            children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedCategory(category),
                                    style: {
                                        padding: '12px 24px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: selectedCategory === category ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].primary[400] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[600],
                                        background: selectedCategory === category ? 'linear-gradient(135deg, rgba(74, 222, 128, 0.08) 0%, rgba(13, 148, 136, 0.08) 100%)' : 'transparent',
                                        border: `1px solid ${selectedCategory === category ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].primary[400] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[200]}`,
                                        borderRadius: '100px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    },
                                    children: category === 'all' ? 'All Products' : category.split('-').map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                                }, category, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 341,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 333,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '24px'
                            },
                            children: products.map((product, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        duration: 0.3,
                                        delay: i * 0.05
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'flex-start'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            style: {
                                                                fontSize: '16px',
                                                                fontWeight: '600',
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[900],
                                                                marginBottom: '4px',
                                                                fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body
                                                            },
                                                            children: product.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 379,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: '12px',
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[500],
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em'
                                                            },
                                                            children: product.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 388,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: 'auto',
                                                        textAlign: 'right'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '24px',
                                                                fontWeight: '600',
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].primary[400]
                                                            },
                                                            children: [
                                                                "$",
                                                                product.price
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 399,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '11px',
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[500],
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '4px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                    size: 12,
                                                                    style: {
                                                                        fill: '#FBBF24'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 413,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: product.rating
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 414,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 406,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 398,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BodyText"], {
                                                    size: "sm",
                                                    muted: true,
                                                    style: {
                                                        marginTop: '12px',
                                                        flexGrow: 1
                                                    },
                                                    children: product.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 418,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Premium3DButton"], {
                                                    size: "sm",
                                                    style: {
                                                        marginTop: '16px',
                                                        width: '100%'
                                                    },
                                                    children: "Add to Cart"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 422,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 377,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 376,
                                        columnNumber: 17
                                    }, this)
                                }, product.id, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 370,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 364,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 324,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: '96px 56px',
                    background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)',
                    position: 'relative'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: '1400px',
                        margin: '0 auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                marginBottom: '64px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionLabel"], {
                                    children: "Why SpendThrone"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 441,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DisplayHeading"], {
                                    size: "lg",
                                    style: {
                                        marginTop: '16px',
                                        marginBottom: '16px'
                                    },
                                    children: "Trusted by Developers Worldwide"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 442,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BodyText"], {
                                    size: "lg",
                                    muted: true,
                                    style: {
                                        maxWidth: '600px',
                                        margin: '0 auto'
                                    },
                                    children: "Quality AI tools, transparent pricing, real reviews from actual users."
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 445,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 440,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '24px'
                            },
                            children: [
                                {
                                    title: 'Verified Quality',
                                    description: 'Every product is tested and reviewed by our team.'
                                },
                                {
                                    title: 'Transparent Pricing',
                                    description: 'No hidden fees. What you see is what you pay.'
                                },
                                {
                                    title: 'Real Reviews',
                                    description: 'Authentic reviews from verified users.'
                                },
                                {
                                    title: 'Fast Delivery',
                                    description: 'Get instant access to your purchased tools.'
                                },
                                {
                                    title: 'Secure Payments',
                                    description: 'x402 micropayments on Base blockchain.'
                                },
                                {
                                    title: '24/7 Support',
                                    description: 'Our team is always here to help you.'
                                }
                            ].map((feature, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        duration: 0.3,
                                        delay: i * 0.1
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '40px',
                                                    marginBottom: '16px'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                    size: 36,
                                                    style: {
                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].primary[400]
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 474,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 470,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: '18px',
                                                    fontWeight: '600',
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[900],
                                                    marginBottom: '12px',
                                                    fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body
                                                },
                                                children: feature.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 476,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BodyText"], {
                                                size: "sm",
                                                muted: true,
                                                children: feature.description
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 485,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 469,
                                        columnNumber: 17
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 463,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 450,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 439,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 434,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: '96px 56px',
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gradients"].darkCard,
                    textAlign: 'center',
                    position: 'relative'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            opacity: 0.1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpotlightBackground"], {}, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 503,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 502,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: '800px',
                            margin: '0 auto',
                            position: 'relative',
                            zIndex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DisplayHeading"], {
                                size: "lg",
                                style: {
                                    color: '#FFFFFF',
                                    marginBottom: '24px'
                                },
                                children: "Ready to Transform Your Workflow?"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 507,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BodyText"], {
                                size: "lg",
                                muted: true,
                                style: {
                                    marginBottom: '40px',
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[400]
                                },
                                children: "Join thousands of developers using SpendThrone to discover the best AI tools."
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 510,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Premium3DButton"], {
                                size: "lg",
                                children: "Get Started Free"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 514,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 506,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 496,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                style: {
                    padding: '48px 56px',
                    borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                    background: '#FAFAFA'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: '1400px',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '36px',
                                        height: '36px',
                                        background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gradients"].primary,
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 4px 12px rgba(74, 222, 128, 0.3)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                        size: 18,
                                        style: {
                                            color: '#FFFFFF'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 544,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 534,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[900]
                                    },
                                    children: "SpendThrone"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 546,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 533,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: '32px'
                            },
                            children: [
                                'Marketplace',
                                'Reviews',
                                'About',
                                'Contact'
                            ].map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#",
                                    style: {
                                        fontSize: '14px',
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wednesday$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neutral[600],
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease'
                                    },
                                    children: link
                                }, link, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 553,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 551,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 526,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 521,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
function Star({ size }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 581,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 575,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_8e34712f._.js.map