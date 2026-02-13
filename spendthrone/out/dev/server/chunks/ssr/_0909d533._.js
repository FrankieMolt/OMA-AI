module.exports = [
"[project]/lib/memoria/tokens.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Memoria Design System Tokens
 * Premium dark-themed knowledge interfaces
 * Philosophy: "Numbers are heroes, labels are whispers"
 */ __turbopack_context__.s([
    "animations",
    ()=>animations,
    "borderRadius",
    ()=>borderRadius,
    "colors",
    ()=>colors,
    "fonts",
    ()=>fonts,
    "shadows",
    ()=>shadows,
    "spacing",
    ()=>spacing,
    "transitions",
    ()=>transitions,
    "typography",
    ()=>typography
]);
const colors = {
    // Backgrounds (darkest to lightest)
    bg: {
        neutral950: '#0a0a0a',
        neutral90080: 'rgba(24, 24, 27, 0.8)',
        neutral90060: 'rgba(24, 24, 27, 0.6)',
        neutral90050: 'rgba(24, 24, 27, 0.5)',
        neutral90040: 'rgba(24, 24, 27, 0.4)',
        neutral80060: 'rgba(39, 39, 42, 0.6)',
        neutral80050: 'rgba(39, 39, 42, 0.5)',
        neutral80040: 'rgba(39, 39, 42, 0.4)',
        neutral80030: 'rgba(39, 39, 42, 0.3)',
        neutral80020: 'rgba(39, 39, 42, 0.2)',
        neutral800: '#27272a',
        neutral700: '#3f3f46'
    },
    // Borders
    border: {
        neutral80060: 'rgba(39, 39, 42, 0.6)',
        neutral800: '#27272a',
        neutral700: '#3f3f46',
        neutral600: '#52525b'
    },
    // Text Hierarchy (5 opacity levels)
    text: {
        white: '#ffffff',
        neutral200: '#e4e4e7',
        neutral300: '#d4d4d8',
        neutral400: '#a1a1aa',
        neutral500: '#71717a',
        neutral600: '#52525b'
    },
    // Destructive (delete actions only)
    destructive: {
        bg: 'rgba(239, 68, 68, 0.2)',
        text: '#f87171',
        border: 'rgba(239, 68, 68, 0.4)'
    }
};
const fonts = {
    body: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
};
const typography = {
    // Hero stats (3xl-6xl numbers) - LIGHT weight
    hero: {
        fontSize: '3rem',
        fontWeight: 300,
        letterSpacing: '-0.02em',
        color: colors.text.white
    },
    // Page titles
    pageTitle: {
        fontSize: '1.125rem',
        fontWeight: 300,
        color: colors.text.white
    },
    // Card counts
    cardCount: {
        fontSize: '1.5rem',
        fontWeight: 300,
        color: colors.text.white,
        letterSpacing: '-0.01em'
    },
    // Section labels (uppercase whispers)
    sectionLabel: {
        fontSize: '0.75rem',
        fontWeight: 500,
        color: colors.text.neutral500,
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
    },
    // Body text
    body: {
        fontSize: '0.875rem',
        fontWeight: 400,
        color: colors.text.neutral300,
        lineHeight: 1.6
    },
    // Metadata
    metadata: {
        fontSize: '0.625rem',
        fontWeight: 400,
        color: colors.text.neutral500
    }
};
const spacing = {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
};
const borderRadius = {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px'
};
const shadows = {
    sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
    md: '0 4px 24px rgba(0, 0, 0, 0.4)',
    lg: '0 12px 40px rgba(0, 0, 0, 0.5)'
};
const transitions = {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
    // Signature easing curves
    pageTransition: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    accordion: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: {
        type: 'spring',
        bounce: 0.2,
        stiffness: 260,
        damping: 15
    }
};
const animations = {
    // Page transitions (blur-to-clear)
    pageIn: {
        initial: {
            opacity: 0,
            filter: 'blur(10px)'
        },
        animate: {
            opacity: 1,
            filter: 'blur(0px)'
        },
        exit: {
            opacity: 0,
            filter: 'blur(5px)'
        },
        transition: {
            duration: 0.4,
            ease: [
                0.25,
                0.46,
                0.45,
                0.94
            ]
        }
    },
    // Card staggered entry
    cardIn: (index)=>({
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: -10
            },
            transition: {
                duration: 0.3,
                delay: index * 0.05
            }
        }),
    // Modal (spring-based 3D)
    modalIn: {
        initial: {
            opacity: 0,
            scale: 0.5,
            rotateX: 40,
            y: 40
        },
        animate: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            y: 0
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            rotateX: 10
        },
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 15
        }
    },
    // Progress bar growth
    progressBar: {
        initial: {
            width: 0
        },
        animate: (percentage)=>({
                width: `${percentage}%`
            }),
        transition: {
            duration: 0.6,
            ease: [
                0.25,
                0.1,
                0.25,
                1
            ]
        }
    }
};
}),
"[project]/lib/memoria/components.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "DarkCard",
    ()=>DarkCard,
    "EmptyState",
    ()=>EmptyState,
    "HeroStat",
    ()=>HeroStat,
    "IconButton",
    ()=>IconButton,
    "LoadingSpinner",
    ()=>LoadingSpinner,
    "MinimalButton",
    ()=>MinimalButton,
    "ProgressBar",
    ()=>ProgressBar,
    "SectionLabel",
    ()=>SectionLabel,
    "TextInput",
    ()=>TextInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/memoria/tokens.ts [app-ssr] (ecmascript)");
/**
 * Memoria Design System Components
 * Premium dark-themed knowledge interfaces
 * 
 * STRICT RULES:
 * - No Emojis
 * - No Accent Colors (monochromatic only)
 * - No Gradients
 * - No Bold for Emphasis (size handles hierarchy)
 */ 'use client';
;
;
;
;
function Badge({ children, variant = 'default', className = '', style }) {
    const variantStyles = {
        default: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral800,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral400,
            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral700}`
        },
        count: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral700,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral300
        },
        type: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral800,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral400,
            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral700}`,
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.05em'
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        style: {
            ...variantStyles[variant],
            padding: '0.25rem 0.5rem',
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderRadius"].full,
            fontSize: '0.625rem',
            display: 'inline-flex',
            alignItems: 'center',
            ...style
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/memoria/components.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
function DarkCard({ children, className = '', onClick, elevated = false }) {
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        className: className,
        style: {
            background: elevated ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral90080 : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral90060,
            border: `1px solid ${isHovered ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral700 : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral80060}`,
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderRadius"].lg,
            padding: '1rem',
            cursor: onClick ? 'pointer' : 'default',
            transition: 'all 0.3s ease-out',
            ...isHovered && {
                background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral80060
            }
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/memoria/components.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
function SectionLabel({ children, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        style: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].sectionLabel,
            fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].mono
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/memoria/components.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
function HeroStat({ value, label, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        style: {
            textAlign: 'center'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].hero,
                    fontSize: '2.25rem'
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/lib/memoria/components.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].sectionLabel,
                    marginTop: '0.25rem'
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/lib/memoria/components.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/lib/memoria/components.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
function Badge({ children, variant = 'default', className = '' }) {
    const variantStyles = {
        default: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral800,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral400,
            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral700}`
        },
        count: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral700,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral300
        },
        type: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral800,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral400,
            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral700}`,
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.05em'
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        style: {
            ...variantStyles[variant],
            padding: '0.25rem 0.5rem',
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderRadius"].full,
            fontSize: '0.625rem',
            display: 'inline-flex',
            alignItems: 'center'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/memoria/components.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, this);
}
function MinimalButton({ children, onClick, variant = 'primary', size = 'md', className = '' }) {
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const sizeMap = {
        sm: {
            padding: '0.5rem 1rem',
            fontSize: '0.75rem'
        },
        md: {
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem'
        },
        lg: {
            padding: '1rem 2rem',
            fontSize: '1rem'
        }
    };
    const variantStyles = {
        primary: {
            background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral800,
            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral700}`,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.white,
            ...isHovered && {
                background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral700,
                borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral600
            }
        },
        secondary: {
            background: 'transparent',
            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral800}`,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral400,
            ...isHovered && {
                borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral700,
                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral200
            }
        },
        ghost: {
            background: 'transparent',
            border: 'none',
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral500,
            ...isHovered && {
                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral300
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        className: className,
        style: {
            ...sizeMap[size],
            ...variantStyles[variant],
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderRadius"].sm,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body,
            fontWeight: 500
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/memoria/components.tsx",
        lineNumber: 269,
        columnNumber: 5
    }, this);
}
function IconButton({ icon, onClick, size = 'md', className = '' }) {
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const sizeMap = {
        sm: '2rem',
        md: '2.625rem',
        lg: '3rem'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        className: className,
        style: {
            width: sizeMap[size],
            height: sizeMap[size],
            background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral90080,
            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral80060}`,
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderRadius"].md,
            color: isHovered ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.white : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral400,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        children: icon
    }, void 0, false, {
        fileName: "[project]/lib/memoria/components.tsx",
        lineNumber: 312,
        columnNumber: 5
    }, this);
}
function TextInput({ placeholder, value, onChange, icon, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        style: {
            position: 'relative',
            width: '100%'
        },
        children: [
            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral500
                },
                children: icon
            }, void 0, false, {
                fileName: "[project]/lib/memoria/components.tsx",
                lineNumber: 361,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                placeholder: placeholder,
                value: value,
                onChange: (e)=>onChange(e.target.value),
                style: {
                    width: '100%',
                    padding: icon ? '0.75rem 1rem 0.75rem 2.5rem' : '0.75rem 1rem',
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral90080,
                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral800}`,
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderRadius"].lg,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.white,
                    fontSize: '0.875rem',
                    fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body,
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                },
                onFocus: (e)=>{
                    e.target.style.borderColor = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral600;
                },
                onBlur: (e)=>{
                    e.target.style.borderColor = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral800;
                }
            }, void 0, false, {
                fileName: "[project]/lib/memoria/components.tsx",
                lineNumber: 371,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/lib/memoria/components.tsx",
        lineNumber: 353,
        columnNumber: 5
    }, this);
}
function ProgressBar({ percentage, label, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].metadata
                        },
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/lib/memoria/components.tsx",
                        lineNumber: 419,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].metadata,
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral400
                        },
                        children: [
                            percentage,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lib/memoria/components.tsx",
                        lineNumber: 424,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/lib/memoria/components.tsx",
                lineNumber: 414,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: '0.5rem',
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral800,
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderRadius"].full,
                    overflow: 'hidden'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: '100%',
                        width: `${percentage}%`,
                        background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral700,
                        borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderRadius"].full,
                        transition: 'width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)'
                    }
                }, void 0, false, {
                    fileName: "[project]/lib/memoria/components.tsx",
                    lineNumber: 438,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/lib/memoria/components.tsx",
                lineNumber: 432,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/lib/memoria/components.tsx",
        lineNumber: 412,
        columnNumber: 5
    }, this);
}
function EmptyState({ icon, title, description, action, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        style: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '1rem'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '4rem',
                    height: '4rem',
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral800,
                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral700}`,
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderRadius"].lg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral600
                    },
                    children: icon
                }, void 0, false, {
                    fileName: "[project]/lib/memoria/components.tsx",
                    lineNumber: 492,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/lib/memoria/components.tsx",
                lineNumber: 481,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].body,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral400,
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem'
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/lib/memoria/components.tsx",
                lineNumber: 496,
                columnNumber: 7
            }, this),
            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].body,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral600,
                    maxWidth: '24rem'
                },
                children: description
            }, void 0, false, {
                fileName: "[project]/lib/memoria/components.tsx",
                lineNumber: 506,
                columnNumber: 9
            }, this),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '1.5rem'
                },
                children: action
            }, void 0, false, {
                fileName: "[project]/lib/memoria/components.tsx",
                lineNumber: 515,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/lib/memoria/components.tsx",
        lineNumber: 469,
        columnNumber: 5
    }, this);
}
function LoadingSpinner({ size = 'md', className = '' }) {
    const sizeMap = {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: sizeMap[size],
            height: sizeMap[size],
            border: `2px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral800}`,
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
        },
        className: "jsx-4b22437fb54054bc" + " " + (className || ""),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            id: "4b22437fb54054bc",
            children: "@keyframes spin{to{transform:rotate(360deg)}}"
        }, void 0, false, void 0, this)
    }, void 0, false, {
        fileName: "[project]/lib/memoria/components.tsx",
        lineNumber: 540,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/memoria/components.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/memoria/tokens.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-ssr] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
/**
 * SpendThrone Landing Page
 * Following Memoria Design System (Dark Theme)
 */ 'use client';
;
;
;
;
;
;
function SpendThronePage() {
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const products = [
        {
            id: 1,
            name: 'AI-Powered Resume Builder',
            price: 49.99,
            category: 'AI Tools',
            rating: 4.8,
            reviews: 1247
        },
        {
            id: 2,
            name: 'Smart Calendar Assistant',
            price: 19.99,
            category: 'Productivity',
            rating: 4.6,
            reviews: 892
        },
        {
            id: 3,
            name: 'Email Summarizer',
            price: 29.99,
            category: 'Communication',
            rating: 4.7,
            reviews: 2341
        },
        {
            id: 4,
            name: 'Code Review AI',
            price: 39.99,
            category: 'Development',
            rating: 4.9,
            reviews: 5678
        },
        {
            id: 5,
            name: 'Meeting Notes AI',
            price: 14.99,
            category: 'Productivity',
            rating: 4.5,
            reviews: 1834
        },
        {
            id: 6,
            name: 'Social Media Assistant',
            price: 24.99,
            category: 'Marketing',
            rating: 4.4,
            reviews: 923
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral950,
            fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fonts"].body,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral300
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                style: {
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
                    borderBottom: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral80060}`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.625rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '2.25rem',
                                    height: '2.25rem',
                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral800,
                                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral700}`,
                                    borderRadius: '0.625rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                    size: 16,
                                    style: {
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral400
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '1.125rem',
                                    fontWeight: 500,
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.white
                                },
                                children: "SpendThrone"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MinimalButton"], {
                                variant: "secondary",
                                size: "sm",
                                children: "Search Products"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MinimalButton"], {
                                variant: "primary",
                                size: "sm",
                                children: "Sign In"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    minHeight: '90vh',
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '7.5rem',
                    paddingBottom: '5rem'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: '87.5rem',
                        margin: '0 auto',
                        padding: '0 3.5rem',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '5rem',
                        alignItems: 'center'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                filter: 'blur(10px)'
                            },
                            animate: {
                                opacity: 1,
                                filter: 'blur(0px)'
                            },
                            transition: {
                                duration: 0.4,
                                ease: [
                                    0.25,
                                    0.46,
                                    0.45,
                                    0.94
                                ]
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                    variant: "type",
                                    style: {
                                        marginBottom: '1.5rem'
                                    },
                                    children: "The Sovereign Marketplace"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontSize: '3.75rem',
                                        fontWeight: 300,
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.white,
                                        letterSpacing: '-0.02em',
                                        lineHeight: 1.1,
                                        marginBottom: '1.5rem'
                                    },
                                    children: [
                                        "Discover",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral400
                                            },
                                            children: "Premium AI Products"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].body,
                                        fontSize: '1.125rem',
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral500,
                                        maxWidth: '37.5rem',
                                        marginBottom: '2rem',
                                        lineHeight: 1.7
                                    },
                                    children: "Curated AI tools and products that actually work. Verified quality, real reviews, transparent pricing."
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '1rem',
                                        marginBottom: '3rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MinimalButton"], {
                                            variant: "primary",
                                            size: "lg",
                                            children: "Browse All Products"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MinimalButton"], {
                                            variant: "secondary",
                                            size: "lg",
                                            children: "Learn More"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '3rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeroStat"], {
                                            value: "2,500+",
                                            label: "Products"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeroStat"], {
                                            value: "15K+",
                                            label: "Reviews"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeroStat"], {
                                            value: "12",
                                            label: "Categories"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'grid',
                                gap: '1rem'
                            },
                            children: products.slice(0, 3).map((product, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                        delay: 0.3 + i * 0.05
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DarkCard"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            style: {
                                                                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].body,
                                                                fontSize: '1rem',
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.white,
                                                                fontWeight: 500,
                                                                marginBottom: '0.25rem'
                                                            },
                                                            children: product.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 173,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "default",
                                                            children: product.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 182,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '1.5rem',
                                                                fontWeight: 300,
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.white,
                                                                letterSpacing: '-0.01em'
                                                            },
                                                            children: [
                                                                "$",
                                                                product.price
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].metadata,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.25rem',
                                                                justifyContent: 'flex-end'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                    size: 10,
                                                                    style: {
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral500
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 202,
                                                                    columnNumber: 25
                                                                }, this),
                                                                product.rating
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 195,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 171,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 17
                                    }, this)
                                }, product.id, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: '6rem 3.5rem',
                    background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral90040
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: '87.5rem',
                        margin: '0 auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                marginBottom: '4rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionLabel"], {
                                    children: "Product Catalog"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: '2.75rem',
                                        fontWeight: 300,
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.white,
                                        marginTop: '1rem',
                                        marginBottom: '1rem',
                                        letterSpacing: '-0.02em'
                                    },
                                    children: "Browse AI-Powered Products"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                marginBottom: '3rem',
                                flexWrap: 'wrap'
                            },
                            children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedCategory(category),
                                    style: {
                                        padding: '0.75rem 1.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: selectedCategory === category ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral200 : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral500,
                                        background: selectedCategory === category ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral80050 : 'transparent',
                                        border: `1px solid ${selectedCategory === category ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral700 : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral800}`,
                                        borderRadius: '9999px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        textTransform: 'capitalize'
                                    },
                                    children: category === 'all' ? 'All Products' : category.replace('-', ' ')
                                }, category, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 243,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '1.5rem'
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
                                        delay: i * 0.03
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DarkCard"], {
                                        elevated: true,
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
                                                        alignItems: 'flex-start',
                                                        marginBottom: '1rem'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            style: {
                                                                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].body,
                                                                fontSize: '1rem',
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.white,
                                                                fontWeight: 500
                                                            },
                                                            children: product.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 280,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "default",
                                                            children: product.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 288,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 279,
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
                                                                fontSize: '1.5rem',
                                                                fontWeight: 300,
                                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.white,
                                                                marginBottom: '0.25rem'
                                                            },
                                                            children: [
                                                                "$",
                                                                product.price
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 294,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].metadata,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.25rem',
                                                                justifyContent: 'flex-end'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                    size: 10,
                                                                    style: {
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral500
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 309,
                                                                    columnNumber: 25
                                                                }, this),
                                                                product.rating
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 302,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MinimalButton"], {
                                                    variant: "primary",
                                                    size: "sm",
                                                    style: {
                                                        marginTop: '1rem',
                                                        width: '100%'
                                                    },
                                                    children: "Add to Cart"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 278,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 277,
                                        columnNumber: 17
                                    }, this)
                                }, product.id, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 265,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 219,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: '6rem 3.5rem',
                    textAlign: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: '50rem',
                        margin: '0 auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: '2.75rem',
                                fontWeight: 300,
                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.white,
                                marginBottom: '1.5rem',
                                letterSpacing: '-0.02em'
                            },
                            children: "Ready to Transform Your Workflow?"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 331,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].body,
                                fontSize: '1.125rem',
                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral500,
                                marginBottom: '2.5rem'
                            },
                            children: "Join thousands of developers using SpendThrone to discover the best AI tools."
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 340,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$components$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MinimalButton"], {
                            variant: "primary",
                            size: "lg",
                            children: "Get Started Free"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 349,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 330,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                style: {
                    padding: '3rem 3.5rem',
                    borderTop: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral80060}`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: '87.5rem',
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
                                gap: '0.625rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '2.25rem',
                                        height: '2.25rem',
                                        background: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].bg.neutral800,
                                        border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].border.neutral700}`,
                                        borderRadius: '0.625rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                        size: 16,
                                        style: {
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral400
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 378,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 368,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '1.125rem',
                                        fontWeight: 500,
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.white
                                    },
                                    children: "SpendThrone"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 380,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 367,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: '2rem'
                            },
                            children: [
                                'Marketplace',
                                'Reviews',
                                'About',
                                'Contact'
                            ].map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#",
                                    style: {
                                        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["typography"].metadata,
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$memoria$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].text.neutral500,
                                        textDecoration: 'none'
                                    },
                                    children: link
                                }, link, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 391,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 389,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 360,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 356,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_0909d533._.js.map