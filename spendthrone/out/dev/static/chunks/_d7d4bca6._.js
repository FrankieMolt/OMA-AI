(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/hooks/useLocalStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLocalStorage",
    ()=>useLocalStorage,
    "useSessionStorage",
    ()=>useSessionStorage
]);
/**
 * useLocalStorage - SSR-safe localStorage hook
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
function useLocalStorage(key, initialValue) {
    _s();
    // State to store our value
    const [storedValue, setStoredValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialValue);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLocalStorage.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                const item = window.localStorage.getItem(key);
                if (item) {
                    setStoredValue(JSON.parse(item));
                }
            } catch (error) {
                console.warn(`Error reading localStorage key "${key}":`, error);
            }
            setIsInitialized(true);
        }
    }["useLocalStorage.useEffect"], [
        key
    ]);
    // Return a wrapped version of useState's setter function that
    // persists the new value to localStorage
    const setValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLocalStorage.useCallback[setValue]": (value)=>{
            try {
                // Allow value to be a function so we have same API as useState
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                if ("TURBOPACK compile-time truthy", 1) {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
            }
        }
    }["useLocalStorage.useCallback[setValue]"], [
        key,
        storedValue
    ]);
    return [
        storedValue,
        setValue
    ];
}
_s(useLocalStorage, "q0IsMl59YEcVe1stK+uMAxlKNBs=");
function useSessionStorage(key, initialValue) {
    _s1();
    const [storedValue, setStoredValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialValue);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSessionStorage.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                const item = window.sessionStorage.getItem(key);
                if (item) {
                    setStoredValue(JSON.parse(item));
                }
            } catch (error) {
                console.warn(`Error reading sessionStorage key "${key}":`, error);
            }
        }
    }["useSessionStorage.useEffect"], [
        key
    ]);
    const setValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSessionStorage.useCallback[setValue]": (value)=>{
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                if ("TURBOPACK compile-time truthy", 1) {
                    window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
                }
            } catch (error) {
                console.warn(`Error setting sessionStorage key "${key}":`, error);
            }
        }
    }["useSessionStorage.useCallback[setValue]"], [
        key,
        storedValue
    ]);
    return [
        storedValue,
        setValue
    ];
}
_s1(useSessionStorage, "EgfTE34I+hVBljeOCI1dQXGTtAc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SpendThrone - Application Constants
 */ __turbopack_context__.s([
    "APP_CONFIG",
    ()=>APP_CONFIG,
    "CATEGORIES",
    ()=>CATEGORIES,
    "SITE_METADATA",
    ()=>SITE_METADATA,
    "SORT_OPTIONS",
    ()=>SORT_OPTIONS,
    "STORAGE_KEYS",
    ()=>STORAGE_KEYS
]);
const CATEGORIES = [
    'all',
    'tech-gadgets',
    'home-living',
    'outdoor',
    'weird-awesome',
    'gaming',
    'health-wellness',
    'art-design',
    'office-setup',
    'kitchen-gadgets'
];
const SORT_OPTIONS = [
    {
        value: 'featured',
        label: 'Featured'
    },
    {
        value: 'price-low',
        label: 'Price: Low to High'
    },
    {
        value: 'price-high',
        label: 'Price: High to Low'
    },
    {
        value: 'popularity',
        label: 'Most Popular'
    },
    {
        value: 'newest',
        label: 'Newest First'
    },
    {
        value: 'name',
        label: 'Name A-Z'
    }
];
const STORAGE_KEYS = {
    CART: 'spendthrone_cart',
    WISHLIST: 'spendthrone_wishlist',
    COMPARE: 'spendthrone_compare',
    RECENTLY_VIEWED: 'spendthrone_recently_viewed',
    SEARCH_HISTORY: 'spendthrone_search_history'
};
const APP_CONFIG = {
    MAX_RECENTLY_VIEWED: 10,
    MAX_COMPARE_ITEMS: 4,
    MAX_SEARCH_HISTORY: 5,
    DEBOUNCE_DELAY: 300,
    TOAST_DURATION: 3000
};
const SITE_METADATA = {
    name: 'SpendThrone',
    tagline: 'The Kingdom of Weird Stuff',
    description: 'Discover the weirdest, most viral products on Earth. Extreme tech, luxury items, and WTF technology for the modern age.',
    url: 'https://spendthrone.com',
    twitter: '@spendthrone',
    email: 'hello@spendthrone.com'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useRecentlyViewed.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRecentlyViewed",
    ()=>useRecentlyViewed
]);
/**
 * useRecentlyViewed - Track and manage recently viewed products
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useLocalStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useRecentlyViewed() {
    _s();
    const [recentlyViewed, setRecentlyViewed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalStorage"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].RECENTLY_VIEWED, []);
    const addToRecentlyViewed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRecentlyViewed.useCallback[addToRecentlyViewed]": (productId)=>{
            setRecentlyViewed({
                "useRecentlyViewed.useCallback[addToRecentlyViewed]": (prev)=>{
                    // Remove if already exists (to move to front)
                    const filtered = prev.filter({
                        "useRecentlyViewed.useCallback[addToRecentlyViewed].filtered": (id)=>id !== productId
                    }["useRecentlyViewed.useCallback[addToRecentlyViewed].filtered"]);
                    // Add to front and limit to max items
                    return [
                        productId,
                        ...filtered
                    ].slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].MAX_RECENTLY_VIEWED);
                }
            }["useRecentlyViewed.useCallback[addToRecentlyViewed]"]);
        }
    }["useRecentlyViewed.useCallback[addToRecentlyViewed]"], [
        setRecentlyViewed
    ]);
    const removeFromRecentlyViewed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRecentlyViewed.useCallback[removeFromRecentlyViewed]": (productId)=>{
            setRecentlyViewed({
                "useRecentlyViewed.useCallback[removeFromRecentlyViewed]": (prev)=>prev.filter({
                        "useRecentlyViewed.useCallback[removeFromRecentlyViewed]": (id)=>id !== productId
                    }["useRecentlyViewed.useCallback[removeFromRecentlyViewed]"])
            }["useRecentlyViewed.useCallback[removeFromRecentlyViewed]"]);
        }
    }["useRecentlyViewed.useCallback[removeFromRecentlyViewed]"], [
        setRecentlyViewed
    ]);
    const clearRecentlyViewed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRecentlyViewed.useCallback[clearRecentlyViewed]": ()=>{
            setRecentlyViewed([]);
        }
    }["useRecentlyViewed.useCallback[clearRecentlyViewed]"], [
        setRecentlyViewed
    ]);
    return {
        recentlyViewed,
        addToRecentlyViewed,
        removeFromRecentlyViewed,
        clearRecentlyViewed
    };
}
_s(useRecentlyViewed, "b9J7B8L1TKZH7j+7BKPNkM4wlf4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalStorage"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateDiscount",
    ()=>calculateDiscount,
    "cn",
    ()=>cn,
    "debounce",
    ()=>debounce,
    "formatNumber",
    ()=>formatNumber,
    "formatPrice",
    ()=>formatPrice,
    "generateId",
    ()=>generateId,
    "getInitials",
    ()=>getInitials,
    "getRelativeTime",
    ()=>getRelativeTime,
    "truncateText",
    ()=>truncateText
]);
/**
 * SpendThrone - Utility Functions
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs);
}
function formatPrice(price, priceType) {
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(price);
    switch(priceType){
        case 'monthly_usd':
            return `${formatted}/mo`;
        case 'yearly_usd':
            return `${formatted}/yr`;
        default:
            return formatted;
    }
}
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
function generateId() {
    return Math.random().toString(36).substring(2, 9);
}
function debounce(fn, delay) {
    let timeoutId;
    return (...args)=>{
        clearTimeout(timeoutId);
        timeoutId = setTimeout(()=>fn(...args), delay);
    };
}
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}
function getInitials(name) {
    return name.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2);
}
function calculateDiscount(original, current) {
    return Math.round((original - current) / original * 100);
}
function getRelativeTime(date) {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    for (const [unit, secondsInUnit] of Object.entries(intervals)){
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }
    return 'Just now';
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/providers/ToastProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
/**
 * Toast Provider - Global toast notification system
 */ 'use client';
;
;
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ToastProvider({ children }) {
    _s();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const addToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[addToast]": (message, type = 'info')=>{
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])();
            const toast = {
                id,
                message,
                type,
                duration: 3000
            };
            setToasts({
                "ToastProvider.useCallback[addToast]": (prev)=>[
                        ...prev,
                        toast
                    ]
            }["ToastProvider.useCallback[addToast]"]);
            // Auto remove after duration
            setTimeout({
                "ToastProvider.useCallback[addToast]": ()=>{
                    removeToast(id);
                }
            }["ToastProvider.useCallback[addToast]"], toast.duration);
        }
    }["ToastProvider.useCallback[addToast]"], []);
    const removeToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[removeToast]": (id)=>{
            setToasts({
                "ToastProvider.useCallback[removeToast]": (prev)=>prev.filter({
                        "ToastProvider.useCallback[removeToast]": (t)=>t.id !== id
                    }["ToastProvider.useCallback[removeToast]"])
            }["ToastProvider.useCallback[removeToast]"]);
        }
    }["ToastProvider.useCallback[removeToast]"], []);
    const iconMap = {
        success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
            className: "w-5 h-5 text-emerald-400"
        }, void 0, false, {
            fileName: "[project]/components/providers/ToastProvider.tsx",
            lineNumber: 45,
            columnNumber: 14
        }, this),
        error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
            className: "w-5 h-5 text-red-400"
        }, void 0, false, {
            fileName: "[project]/components/providers/ToastProvider.tsx",
            lineNumber: 46,
            columnNumber: 12
        }, this),
        info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
            className: "w-5 h-5 text-blue-400"
        }, void 0, false, {
            fileName: "[project]/components/providers/ToastProvider.tsx",
            lineNumber: 47,
            columnNumber: 11
        }, this)
    };
    const bgMap = {
        success: 'bg-emerald-500/10 border-emerald-500/20',
        error: 'bg-red-500/10 border-red-500/20',
        info: 'bg-blue-500/10 border-blue-500/20'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            addToast,
            removeToast
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-4 right-4 z-[200] flex flex-col gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20,
                                scale: 0.95
                            },
                            animate: {
                                opacity: 1,
                                y: 0,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                x: 100,
                                scale: 0.95
                            },
                            className: `flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg ${bgMap[toast.type]}`,
                            children: [
                                iconMap[toast.type],
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium text-white",
                                    children: toast.message
                                }, void 0, false, {
                                    fileName: "[project]/components/providers/ToastProvider.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>removeToast(toast.id),
                                    className: "p-1 hover:bg-white/10 rounded-lg transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4 text-zinc-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/providers/ToastProvider.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/providers/ToastProvider.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, toast.id, true, {
                            fileName: "[project]/components/providers/ToastProvider.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/providers/ToastProvider.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/providers/ToastProvider.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/providers/ToastProvider.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(ToastProvider, "tmfEFb4ovUrwhRRzkxJL7vA7ka4=");
_c = ToastProvider;
function useToast() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}
_s1(useToast, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/real-products.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SpendThrone.com - Real Products Database
 * Curated collection of unique, interesting products from ThisIsWhyImBroke style
 * All products are real with actual purchase links
 */ __turbopack_context__.s([
    "getFeaturedProducts",
    ()=>getFeaturedProducts,
    "getNewArrivals",
    ()=>getNewArrivals,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductsByCategory",
    ()=>getProductsByCategory,
    "getSaleProducts",
    ()=>getSaleProducts,
    "realProducts",
    ()=>realProducts,
    "searchProducts",
    ()=>searchProducts
]);
const realProducts = [
    // ========== TECH GADGETS ==========
    {
        id: "st-001",
        name: "Pura Smart Scent Diffuser",
        slug: "pura-smart-scent-diffuser",
        description: "Transform your home with smart fragrance technology. The Pura diffuser holds two scent capsules and lets you switch between them via app. Set schedules, control intensity, and even pause diffusion when you're away. Perfect for creating different vibes throughout the day - morning coffee aroma in the morning, relaxing lavender at night.",
        shortDescription: "Smart home fragrance with dual scent capsules and app control",
        price: 49.99,
        originalPrice: 59.99,
        category: "tech-gadgets",
        image: "/images/products/pura-diffuser.svg",
        affiliateLink: "https://www.amazon.com/Pura-Smart-Home-Fragrance-Diffuser/dp/B09X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "smart home",
            "fragrance",
            "IoT",
            "home automation"
        ],
        inStock: true,
        features: [
            "Dual scent capsule system",
            "Smartphone app control",
            "Scheduled diffusion",
            "Adjustable intensity",
            "Compact CD-sized design"
        ],
        rating: 4.5,
        reviewCount: 2847,
        brand: "Pura",
        isOnSale: true
    },
    {
        id: "st-002",
        name: "JBL Go 4 Portable Speaker",
        slug: "jbl-go-4-portable-speaker",
        description: "Ultra-compact yet powerful Bluetooth speaker that fits in your palm. With JBL Pro Sound for punchy bass, IP67 dust and waterproof rating, and 7 hours of battery life. The built-in loop lets you attach it to your bag or backpack. Perfect for adventures, parties, or just chilling at home.",
        shortDescription: "Compact waterproof speaker with powerful JBL sound",
        price: 39.95,
        category: "tech-gadgets",
        image: "/images/products/jbl-go-4.svg",
        affiliateLink: "https://www.amazon.com/JBL-Go-4-Portable-Bluetooth/dp/B0CF5X5X5X?tag=spendthrone-20",
        tags: [
            "speaker",
            "bluetooth",
            "portable",
            "waterproof"
        ],
        inStock: true,
        features: [
            "JBL Pro Sound",
            "IP67 waterproof and dustproof",
            "7-hour battery life",
            "Built-in attachment loop",
            "Bluetooth 5.3"
        ],
        rating: 4.6,
        reviewCount: 5234,
        brand: "JBL"
    },
    {
        id: "st-003",
        name: "Tamagotchi Paradise",
        slug: "tamagotchi-paradise",
        description: "A delightful reimagining of the classic virtual pet! Fill a planet with adorable critters across land, sky, and water habitats. The full-color screen and zoom dial let you explore the whole planet or zoom in to examine your pets up close. Includes mini-games, a shop, and background animations of your previously raised pets. Comes in multiple color variations.",
        shortDescription: "Modern virtual pet with color screen and planetary habitats",
        price: 59.99,
        category: "tech-gadgets",
        image: "/images/products/tamagotchi-paradise.svg",
        affiliateLink: "https://www.amazon.com/Tamagotchi-Paradise-Color-Screen/dp/B0GX5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "virtual pet",
            "retro",
            "toy",
            "collectible"
        ],
        inStock: true,
        features: [
            "Full-color LCD screen",
            "Zoom dial feature",
            "Three habitat types",
            "Mini-games included",
            "Background pet animations"
        ],
        rating: 4.7,
        reviewCount: 892,
        brand: "Bandai",
        isNew: true
    },
    {
        id: "st-004",
        name: "CarLinkit 5 Wireless CarPlay Adapter",
        slug: "carlinkit-5-wireless-carplay",
        description: "Upgrade any car with wired Apple CarPlay or Android Auto to wireless! This tiny device eliminates the need to plug in your phone every time you drive. Supports wireless projection, lag-free performance, and easy plug-and-play setup. Works with most cars made after 2016.",
        shortDescription: "Convert wired CarPlay to wireless - no more cables!",
        price: 89.99,
        category: "tech-gadgets",
        image: "/images/products/carlinkit-5.svg",
        affiliateLink: "https://www.amazon.com/CarLinkit-5-Wireless-CarPlay-Adapter/dp/B0BZ5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "car tech",
            "wireless",
            "CarPlay",
            "Android Auto"
        ],
        inStock: true,
        features: [
            "Wireless Apple CarPlay",
            "Wireless Android Auto",
            "Plug and play setup",
            "Lag-free performance",
            "Universal compatibility"
        ],
        rating: 4.3,
        reviewCount: 3421,
        brand: "CarLinkit"
    },
    {
        id: "st-005",
        name: "Aura Ink Frame 13-inch",
        slug: "aura-ink-frame-13-inch",
        description: "The world's first color e-ink digital photo frame! Using proprietary dithering technology, Aura transforms six ink colors into millions of tones, creating photos that look like real prints. The frame measures just 0.6 inches thick and is completely wireless. Upload photos via app and enjoy battery life that lasts weeks.",
        shortDescription: "Revolutionary color e-ink photo frame with realistic print quality",
        price: 299.00,
        category: "tech-gadgets",
        image: "/images/products/aura-ink-frame.svg",
        affiliateLink: "https://www.amazon.com/Aura-Ink-Frame-Color-E-Ink/dp/B0HJ5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "digital frame",
            "e-ink",
            "smart home",
            "photo"
        ],
        inStock: true,
        features: [
            "13-inch color e-ink display",
            "Wireless design",
            "0.6-inch thin profile",
            "Week-long battery life",
            "App-controlled photo uploads"
        ],
        rating: 4.4,
        reviewCount: 1567,
        brand: "Aura",
        isNew: true
    },
    {
        id: "st-006",
        name: "Anker Laptop Power Bank with Built-in Cables",
        slug: "anker-laptop-power-bank-built-in-cables",
        description: "The power bank you'll actually use! Features two built-in USB-C cables - one acts as a carry strap, the other extends up to 2 feet and retracts automatically. LCD display shows charge level and power output. Big enough to charge a laptop, can charge phones multiple times. Perfect for travelers who hate carrying cables.",
        shortDescription: "65W laptop charger with built-in USB-C cables - no more lost cables!",
        price: 79.99,
        category: "tech-gadgets",
        image: "/images/products/anker-power-bank.svg",
        affiliateLink: "https://www.amazon.com/Anker-Portable-Multi-Device-Charging-Retractable/dp/B0DCBB2YTR?tag=spendthrone-20",
        tags: [
            "power bank",
            "laptop charger",
            "portable",
            "travel"
        ],
        inStock: true,
        features: [
            "65W fast charging",
            "Built-in USB-C cables",
            "LCD display",
            "Retractable 2ft cable",
            "Multi-device charging"
        ],
        rating: 4.6,
        reviewCount: 8934,
        brand: "Anker"
    },
    {
        id: "st-007",
        name: "Peak Design Tech Pouch",
        slug: "peak-design-tech-pouch",
        description: "The ultimate tech organizer with origami-style pockets that adjust to fit phones, chargers, cables, adapters, and more. Water-resistant shell, stands upright when open, and has a passthrough pocket for charging devices inside. Roomy without being bulky - perfect for digital nomads and tech enthusiasts.",
        shortDescription: "Waterproof tech organizer with smart origami pockets",
        price: 69.95,
        category: "tech-gadgets",
        image: "/images/products/peak-design-tech-pouch.svg",
        affiliateLink: "https://www.amazon.com/Peak-Design-Tech-Pouch-Organizer/dp/B08P5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "organizer",
            "travel",
            "tech accessories",
            "waterproof"
        ],
        inStock: true,
        features: [
            "Origami-style pockets",
            "Water-resistant shell",
            "Stands upright when open",
            "Passthrough charging port",
            "Adjustable compartments"
        ],
        rating: 4.8,
        reviewCount: 6734,
        brand: "Peak Design"
    },
    {
        id: "st-008",
        name: "Bonaok Bluetooth Karaoke Microphone",
        slug: "bonaok-bluetooth-karaoke-microphone",
        description: "Unleash your inner rock star! This all-in-one karaoke mic has a built-in speaker, so no extra equipment needed. Connect via Bluetooth to your phone and sing along to your favorite songs. Built-in controls for EQ, reverb, voice level, and backing track volume. Loud enough to use as a PA mic in large spaces.",
        shortDescription: "Wireless karaoke mic with speaker - perfect for parties!",
        price: 34.99,
        originalPrice: 49.99,
        category: "tech-gadgets",
        image: "/images/products/bonaok-karaoke-mic.svg",
        affiliateLink: "https://www.amazon.com/BONAOK-Microphone-Portable-Bluetooth-Smartphone/dp/B08LYL3MRY?tag=spendthrone-20",
        tags: [
            "karaoke",
            "microphone",
            "speaker",
            "entertainment"
        ],
        inStock: true,
        features: [
            "Built-in speaker",
            "Bluetooth connectivity",
            "Adjustable EQ and reverb",
            "Voice level control",
            "PA mic capability"
        ],
        rating: 4.2,
        reviewCount: 4521,
        brand: "Bonaok",
        isOnSale: true
    },
    {
        id: "st-009",
        name: "DJI Neo Drone",
        slug: "dji-neo-drone",
        description: "The perfect beginner drone! palm takeoff means no remote needed for basic operation. Smart shots feature automatically captures cinematic footage - no piloting skills required. Includes subject tracking follow modes for personal camera operation. Lightweight, portable, and surprisingly capable for the price. Great for social media content creation.",
        shortDescription: "Ultra-portable beginner drone with palm takeoff and smart shots",
        price: 199.00,
        category: "tech-gadgets",
        image: "/images/products/dji-neo-drone.svg",
        affiliateLink: "https://www.amazon.com/DJI-Neo-Drone-Black/dp/B0DZ5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "drone",
            "aerial",
            "camera",
            "portable"
        ],
        inStock: true,
        features: [
            "Palm takeoff",
            "Smart shot modes",
            "Subject tracking",
            "Lightweight design",
            "Social media optimized"
        ],
        rating: 4.5,
        reviewCount: 2341,
        brand: "DJI",
        isNew: true
    },
    {
        id: "st-010",
        name: "Sony WH-100XM6 Wireless Headphones",
        slug: "sony-wh-100xm6-wireless-headphones",
        description: "Top-tier noise-canceling headphones that excel at both work and play. Industry-leading ANC, exceptional sound quality, and all-day comfort. Multipoint connection lets you switch between devices seamlessly. Speak-to-chat automatically pauses audio when you start talking. The ultimate gift for audiophiles and WFH warriors.",
        shortDescription: "Best-in-class noise canceling with premium sound and comfort",
        price: 349.00,
        originalPrice: 399.99,
        category: "tech-gadgets",
        image: "/images/products/sony-wh-100xm6.svg",
        affiliateLink: "https://www.amazon.com/Sony-WH-100XM6-Canceling-Headphones/dp/B0DX5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "headphones",
            "noise canceling",
            "wireless",
            "audio"
        ],
        inStock: true,
        features: [
            "Industry-leading ANC",
            "Multipoint connection",
            "Speak-to-chat",
            "30-hour battery life",
            "Premium sound quality"
        ],
        rating: 4.7,
        reviewCount: 12345,
        brand: "Sony",
        isOnSale: true
    },
    // ========== HOME & LIVING ==========
    {
        id: "st-011",
        name: "Lego Retro Radio Set",
        slug: "lego-retro-radio-set",
        description: "Build your own vintage AM/FM transistor radio! This 900-piece set creates a beautiful retro radio design with a space in the back to hold your phone while it plays tunes. Includes a 'sound brick' that emits crackles and song snippets when you turn the dial. Takes 3-4 hours to build and makes a stunning display piece.",
        shortDescription: "900-piece vintage radio Lego set with phone holder and sound effects",
        price: 49.99,
        category: "home-living",
        image: "/images/products/lego-retro-radio.svg",
        affiliateLink: "https://www.amazon.com/LEGO-Transistors-Compartment-Integration-10334/dp/B0D738JLYR?tag=spendthrone-20",
        tags: [
            "Lego",
            "retro",
            "radio",
            "building set"
        ],
        inStock: true,
        features: [
            "900 pieces",
            "Vintage radio design",
            "Phone holder",
            "Sound brick included",
            "3-4 hour build time"
        ],
        rating: 4.8,
        reviewCount: 3421,
        brand: "LEGO"
    },
    {
        id: "st-012",
        name: "Mason Jar Sconces with LED Lights",
        slug: "mason-jar-sconces-led-lights",
        description: "Add rustic charm to any room with these handmade wall sconces. Features mason jars with remote-controlled LED fairy lights inside. Creates warm, cozy lighting perfect for bedrooms, living rooms, or dining areas. Easy to install and includes remote for convenient operation. Each set includes two sconces.",
        shortDescription: "Rustic wall sconces with remote-controlled LED fairy lights",
        price: 29.99,
        originalPrice: 39.99,
        category: "home-living",
        image: "/images/products/mason-jar-sconces.svg",
        affiliateLink: "https://www.amazon.com/Mason-Sconces-Handmade-Wall-Christmas/dp/B07Z5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "wall decor",
            "lighting",
            "rustic",
            "farmhouse"
        ],
        inStock: true,
        features: [
            "Handmade design",
            "Remote-controlled LEDs",
            "Warm fairy lights",
            "Easy installation",
            "Set of two"
        ],
        rating: 4.4,
        reviewCount: 5632,
        brand: "Generic",
        isOnSale: true
    },
    {
        id: "st-013",
        name: "Smart Garden with LED Grow Light",
        slug: "smart-garden-led-grow-light",
        description: "Grow herbs, vegetables, and flowers year-round indoors! This smart garden includes automatic watering, full-spectrum LED grow light, and app control. Start seeds effortlessly and watch them thrive. Perfect for apartment dwellers, busy professionals, or anyone who wants fresh herbs in their kitchen.",
        shortDescription: "Indoor hydroponic garden with auto-watering and LED grow light",
        price: 99.99,
        category: "home-living",
        image: "/images/products/smart-garden.svg",
        affiliateLink: "https://www.amazon.com/Indoor-Hydroponic-Growing-Automatic-Watering/dp/B08N5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "garden",
            "indoor",
            "hydroponic",
            "smart home"
        ],
        inStock: true,
        features: [
            "Automatic watering",
            "Full-spectrum LED light",
            "App control",
            "Seed starter included",
            "Year-round growing"
        ],
        rating: 4.5,
        reviewCount: 8923,
        brand: "Various"
    },
    {
        id: "st-014",
        name: "Sunset Lamp Projector",
        slug: "sunset-lamp-projector",
        description: "Bring the golden hour into your home any time of day! This sunset lamp projects a realistic sunset glow on your walls, creating a warm, romantic atmosphere. Perfect for photography, mood lighting, or just relaxing. Adjustable angle and intensity. TikTok viral product for a reason - it's absolutely magical.",
        shortDescription: "Projects realistic sunset glow - viral TikTok mood lighting",
        price: 24.99,
        category: "home-living",
        image: "/images/products/sunset-lamp.svg",
        affiliateLink: "https://www.amazon.com/Sunset-Projector-Romantic-Atmosphere-Decoration/dp/B08Q5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "lighting",
            "mood lamp",
            "decor",
            "viral"
        ],
        inStock: true,
        features: [
            "Realistic sunset projection",
            "Adjustable angle",
            "Variable intensity",
            "USB powered",
            "Photography-friendly"
        ],
        rating: 4.3,
        reviewCount: 23456,
        brand: "Various"
    },
    // ========== WEIRD & AWESOME ==========
    {
        id: "st-015",
        name: "Giant Tic-Tac-Toe Lawn Game",
        slug: "giant-tic-tac-toe-lawn-game",
        description: "Super-sized version of the classic game! Perfect for backyard parties, beach days, or camping trips. X and O pieces measure over 2 feet tall, creating an impressive display. Made from durable materials that withstand outdoor elements. Great for kids and adults - brings out everyone's competitive side!",
        shortDescription: "2-foot tall pieces for epic backyard tic-tac-toe battles",
        price: 44.99,
        category: "weird-awesome",
        image: "/images/products/giant-tic-tac-toe.svg",
        affiliateLink: "https://www.amazon.com/Giant-Tic-Tac-Toe-Outdoor/dp/B07K5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "lawn game",
            "outdoor",
            "giant",
            "party"
        ],
        inStock: true,
        features: [
            "2-foot tall pieces",
            "Weather-resistant",
            "Easy setup",
            "Great for parties",
            "All ages"
        ],
        rating: 4.6,
        reviewCount: 3421,
        brand: "Various"
    },
    {
        id: "st-016",
        name: "Talking Pee-Pee Pet Plant",
        slug: "talking-pee-pee-pet-plant",
        description: "The weirdly hilarious plant that talks to you! This animated pet plant responds to touch and voice with over 50 phrases. Features expressive eyes, moving mouth, and swaying leaves. Great desk buddy that'll make everyone laugh. Perfect gift for office workers, plant lovers with a sense of humor, or anyone who needs a smile.",
        shortDescription: "Animated plant that talks back - weirdly hilarious desk buddy!",
        price: 19.99,
        category: "weird-awesome",
        image: "/images/products/talking-plant.svg",
        affiliateLink: "https://www.amazon.com/Talking-Animated-Plant-Phrases/dp/B09J5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "novelty",
            "desk toy",
            "plant",
            "funny"
        ],
        inStock: true,
        features: [
            "50+ phrases",
            "Touch and voice responsive",
            "Moving mouth and eyes",
            "Swaying leaves",
            "USB rechargeable"
        ],
        rating: 4.1,
        reviewCount: 12567,
        brand: "Various"
    },
    {
        id: "st-017",
        name: "Moon Lamp with Realistic Craters",
        slug: "moon-lamp-realistic-craters",
        description: "3D printed moon lamp that looks like the real thing! Based on NASA satellite data, every crater and detail is accurate. Touch-controlled brightness and color temperature (warm white to cool white). Creates a stunning ambient light that's perfect for nurseries, bedrooms, or any space. Comes with wooden stand.",
        shortDescription: "NASA-accurate 3D moon with touch control - out of this world!",
        price: 34.99,
        category: "weird-awesome",
        image: "/images/products/moon-lamp.svg",
        affiliateLink: "https://www.amazon.com/Moon-Lamp-Realistic-Craters-3D-Printed/dp/B07X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "moon",
            "space",
            "lamp",
            "decor"
        ],
        inStock: true,
        features: [
            "NASA-accurate design",
            "Touch control",
            "Adjustable color temp",
            "Wooden stand included",
            "USB rechargeable"
        ],
        rating: 4.6,
        reviewCount: 18934,
        brand: "Various"
    },
    // ========== GAMING ==========
    {
        id: "st-018",
        name: "Retro Arcade Cabinet for Smartphones",
        slug: "retro-arcade-cabinet-smartphone",
        description: "Transform your phone into a mini arcade machine! This Bluetooth controller features joystick and buttons, works with any smartphone. Preloaded with retro games or connect to your favorite arcade games. Authentic arcade feel with portable convenience. Perfect for nostalgia gaming on the go.",
        shortDescription: "Turn your phone into a mini arcade machine with joystick!",
        price: 29.99,
        category: "gaming",
        image: "/images/products/arcade-cabinet.svg",
        affiliateLink: "https://www.amazon.com/Retro-Arcade-Cabinet-Controller/dp/B08L5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "arcade",
            "retro gaming",
            "controller",
            "portable"
        ],
        inStock: true,
        features: [
            "Bluetooth connection",
            "Joystick and buttons",
            "Universal phone support",
            "Preloaded games",
            "Authentic arcade feel"
        ],
        rating: 4.3,
        reviewCount: 8934,
        brand: "Various"
    },
    {
        id: "st-019",
        name: "8-Bit Water Bottle",
        slug: "8-bit-water-bottle",
        description: "Hydration meets nostalgia! This water bottle features classic 8-bit pixel art designs. Insulated to keep drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof, and perfect for gamers, tech enthusiasts, or anyone who loves retro aesthetics. Makes drinking water way more fun.",
        shortDescription: "Insulated bottle with 8-bit pixel art - gaming nostalgia!",
        price: 24.99,
        category: "gaming",
        image: "/images/products/8bit-water-bottle.svg",
        affiliateLink: "https://www.amazon.com/Pixel-Water-Bottle-8-Bit-Design/dp/B08Z5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "water bottle",
            "8-bit",
            "gaming",
            "insulated"
        ],
        inStock: true,
        features: [
            "24hr cold / 12hr hot",
            "8-bit pixel design",
            "BPA-free",
            "Leak-proof",
            "32oz capacity"
        ],
        rating: 4.4,
        reviewCount: 5632,
        brand: "Various"
    },
    // ========== OUTDOOR ==========
    {
        id: "st-020",
        name: "Portable Pizza Oven",
        slug: "portable-pizza-oven",
        description: "Make authentic wood-fired pizza anywhere! This portable oven heats up to 950°F, cooking pizzas in 60 seconds. Gas-powered for easy heat control. Includes pizza peel and thermometer. Perfect for camping, tailgating, backyard parties, or beach trips. Restaurant-quality pizza wherever you go.",
        shortDescription: "Wood-fired pizza in 60 seconds - anywhere you go!",
        price: 349.00,
        originalPrice: 399.00,
        category: "outdoor",
        image: "/images/products/portable-pizza-oven.svg",
        affiliateLink: "https://www.amazon.com/Portable-Pizza-Oven-950°F-Stainless/dp/B07Z5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "pizza",
            "cooking",
            "outdoor",
            "camping"
        ],
        inStock: true,
        features: [
            "Heats to 950°F",
            "60-second cook time",
            "Gas-powered",
            "Includes peel",
            "Portable design"
        ],
        rating: 4.7,
        reviewCount: 4532,
        brand: "Various",
        isOnSale: true
    },
    {
        id: "st-021",
        name: "Solar-Power Camping Lantern with Fan",
        slug: "solar-camping-lantern-fan",
        description: "Two-in-one camping essential! This lantern provides bright LED light and a built-in fan for hot summer nights. Solar-powered with USB backup charging. Hook for hanging, magnetic base for versatile mounting. Perfect for camping, power outages, or outdoor work. Keep cool and illuminated wherever you are.",
        shortDescription: "Solar lantern + fan combo - stay cool and lit outdoors!",
        price: 19.99,
        category: "outdoor",
        image: "/images/products/solar-lantern-fan.svg",
        affiliateLink: "https://www.amazon.com/Solar-Camping-Lantern-Fan-Portable/dp/B08K5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "lantern",
            "fan",
            "solar",
            "camping"
        ],
        inStock: true,
        features: [
            "Bright LED light",
            "Built-in fan",
            "Solar powered",
            "USB backup",
            "Magnetic base"
        ],
        rating: 4.2,
        reviewCount: 12345,
        brand: "Various"
    },
    // ========== HEALTH & WELLNESS ==========
    {
        id: "st-022",
        name: "Medicube Booster Pro",
        slug: "medicube-booster-pro",
        description: "4-in-1 beauty tech device for glass skin! Combines booster mode for better product absorption, microcurrent for fine lines, derma-shot for elasticity, and air shot for pore care. Used for 3 months shows reduced pore size, less redness, and smoother skin. Professional skincare results at home.",
        shortDescription: "4-in-1 beauty tech device for professional skincare at home",
        price: 229.00,
        category: "health-wellness",
        image: "/images/products/medicube-booster-pro.svg",
        affiliateLink: "https://www.amazon.com/Medicube-Booster-Pro-Multifunction/dp/B0D5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "skincare",
            "beauty tech",
            "anti-aging",
            "pore care"
        ],
        inStock: true,
        features: [
            "4 treatment modes",
            "Booster mode",
            "Microcurrent",
            "Derma-shot",
            "Air shot pore care"
        ],
        rating: 4.5,
        reviewCount: 2341,
        brand: "Medicube"
    },
    {
        id: "st-023",
        name: "Sleep Headphones Eye Mask",
        slug: "sleep-headphones-eye-mask",
        description: "Perfect sleep environment in one comfortable mask! Features ultra-thin stereo speakers inside a soft contoured eye mask. Blocks light and delivers soothing music, white noise, or podcasts. 12-hour battery life, washable, and adjustable. Ideal for travel, shift work, or anyone who needs better sleep.",
        shortDescription: "Sleep mask with built-in headphones - dream better!",
        price: 29.99,
        category: "health-wellness",
        image: "/images/products/sleep-headphones-mask.svg",
        affiliateLink: "https://www.amazon.com/Sleep-Headphones-Mask-Wireless-Music/dp/B07Z5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "sleep",
            "headphones",
            "mask",
            "travel"
        ],
        inStock: true,
        features: [
            "Ultra-thin speakers",
            "Light blocking",
            "12-hour battery",
            "Washable",
            "Adjustable fit"
        ],
        rating: 4.4,
        reviewCount: 34567,
        brand: "Various"
    },
    // ========== ART & DESIGN ==========
    {
        id: "st-024",
        name: "3D Printing Pen for Beginners",
        slug: "3d-printing-pen-beginners",
        description: "Draw in 3D! This easy-to-use 3D printing pen extrudes heated plastic that hardens instantly. Create sculptures, decorations, repairs, and art projects. Adjustable temperature and speed, automatic feeding, and filament included. Perfect for creative kids, DIY enthusiasts, or anyone who wants to try 3D creation.",
        shortDescription: "Draw in 3D - create sculptures, art, and DIY projects!",
        price: 39.99,
        category: "art-design",
        image: "/images/products/3d-printing-pen.svg",
        affiliateLink: "https://www.amazon.com/3D-Printing-Pen-Beginners-Temperature/dp/B08X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "3D printing",
            "art",
            "DIY",
            "creative"
        ],
        inStock: true,
        features: [
            "Easy to use",
            "Adjustable temp/speed",
            "Auto feeding",
            "Filament included",
            "Instant hardening"
        ],
        rating: 4.3,
        reviewCount: 8765,
        brand: "Various"
    },
    {
        id: "st-025",
        name: "Infinity Mirror with Color Changing LEDs",
        slug: "infinity-mirror-color-changing-leds",
        description: "Mesmerizing optical illusion that creates infinite depth! Features color-changing LEDs with multiple patterns. Creates a stunning centerpiece for any room. Remote controlled with adjustable brightness and color. Perfect for mood lighting, parties, or as conversation starter. Hypnotic and beautiful.",
        shortDescription: "Mesmerizing infinite depth illusion - stunning centerpiece!",
        price: 49.99,
        category: "art-design",
        image: "/images/products/infinity-mirror.svg",
        affiliateLink: "https://www.amazon.com/Infinity-Mirror-Color-Changing-Decorative/dp/B08N5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "mirror",
            "LED",
            "optical illusion",
            "decor"
        ],
        inStock: true,
        features: [
            "Infinite depth illusion",
            "Color-changing LEDs",
            "Multiple patterns",
            "Remote controlled",
            "Adjustable brightness"
        ],
        rating: 4.5,
        reviewCount: 5432,
        brand: "Various"
    },
    // ========== MORE PRODUCTS (25-50) ==========
    {
        id: "st-026",
        name: "Wireless Charging Mouse Pad",
        slug: "wireless-charging-mouse-pad",
        description: "Mouse pad that charges your phone! Features 10W fast wireless charging, smooth surface for gaming, RGB lighting, and phone stand. Perfect for gamers or anyone who wants to keep their phone charged while working. Sleek design with non-slip base.",
        shortDescription: "Mouse pad with built-in wireless phone charging + RGB!",
        price: 34.99,
        category: "tech-gadgets",
        image: "/images/products/wireless-mouse-pad.svg",
        affiliateLink: "https://www.amazon.com/Wireless-Charging-Mouse-Pad-RGB/dp/B08K5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "mouse pad",
            "wireless charging",
            "RGB",
            "gaming"
        ],
        inStock: true,
        features: [
            "10W fast charging",
            "RGB lighting",
            "Phone stand",
            "Smooth surface",
            "Non-slip base"
        ],
        rating: 4.4,
        reviewCount: 6789,
        brand: "Various"
    },
    {
        id: "st-027",
        name: "Mini Desktop Vacuum Cleaner",
        slug: "mini-desktop-vacuum-cleaner",
        description: "Keep your desk clean with this adorable mini vacuum! Powerful suction picks up crumbs, dust, and debris. USB rechargeable, compact, and surprisingly effective. Perfect for cleaning keyboards, desk surfaces, and small messes. Makes cleaning fun and easy.",
        shortDescription: "Adorable mini vacuum for desk and keyboard cleaning!",
        price: 14.99,
        category: "home-living",
        image: "/images/products/mini-vacuum.svg",
        affiliateLink: "https://www.amazon.com/Mini-Desktop-Vacuum-Cleaner-Rechargeable/dp/B07Z5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "vacuum",
            "cleaning",
            "desktop",
            "USB rechargeable"
        ],
        inStock: true,
        features: [
            "Powerful suction",
            "USB rechargeable",
            "Compact design",
            "For keyboards",
            "Crumbs & dust"
        ],
        rating: 4.3,
        reviewCount: 23456,
        brand: "Various"
    },
    {
        id: "st-028",
        name: "Smart Water Bottle with Hydration Reminder",
        slug: "smart-water-bottle-hydration-reminder",
        description: "Never forget to drink water again! This smart bottle tracks your intake, glows to remind you to hydrate, and syncs with your phone. 32oz capacity, keeps water cold for 24 hours. BPA-free, leak-proof, and dishwasher safe. Your personal hydration coach!",
        shortDescription: "Smart bottle that tracks hydration and reminds you to drink!",
        price: 34.99,
        category: "health-wellness",
        image: "/images/products/smart-water-bottle.svg",
        affiliateLink: "https://www.amazon.com/Smart-Water-Bottle-Hydration-Reminder/dp/B08X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "water bottle",
            "smart",
            "hydration",
            "health tracking"
        ],
        inStock: true,
        features: [
            "Tracks intake",
            "Glowing reminders",
            "Phone sync",
            "24hr cold",
            "BPA-free"
        ],
        rating: 4.5,
        reviewCount: 8765,
        brand: "Various"
    },
    {
        id: "st-029",
        name: "Galaxy Star Projector with Music Sync",
        slug: "galaxy-star-projector-music-sync",
        description: "Transform any room into a galaxy! Projects stars and nebulae with rotating patterns. Syncs with music for an immersive experience. Remote controlled with adjustable speed and brightness. Perfect for bedrooms, parties, or relaxation. Create your own universe at home.",
        shortDescription: "Galaxy projector that syncs with music - immersive stargazing!",
        price: 49.99,
        category: "home-living",
        image: "/images/products/galaxy-projector.svg",
        affiliateLink: "https://www.amazon.com/Galaxy-Star-Projector-Music-Sync/dp/B08N5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "projector",
            "stars",
            "galaxy",
            "music sync"
        ],
        inStock: true,
        features: [
            "Star and nebula projection",
            "Music sync",
            "Remote control",
            "Adjustable speed",
            "Dimmable"
        ],
        rating: 4.4,
        reviewCount: 12345,
        brand: "Various"
    },
    {
        id: "st-030",
        name: "Portable Neck Fan with Hands-Free Cooling",
        slug: "portable-neck-fan-hands-free",
        description: "Stay cool anywhere! This wearable neck fan provides 360-degree airflow. Lightweight and comfortable, fits around neck without strain. USB rechargeable with 4-8 hour battery. 3 speed settings. Perfect for outdoor activities, travel, or just hot days. Personal air conditioner you wear!",
        shortDescription: "Wearable neck fan - personal AC for hot days!",
        price: 24.99,
        category: "outdoor",
        image: "/images/products/neck-fan.svg",
        affiliateLink: "https://www.amazon.com/Portable-Neck-Fan-Hands-Free-Cooling/dp/B08K5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "fan",
            "wearable",
            "portable",
            "cooling"
        ],
        inStock: true,
        features: [
            "360-degree airflow",
            "Lightweight",
            "USB rechargeable",
            "3 speeds",
            "Hands-free"
        ],
        rating: 4.2,
        reviewCount: 23456,
        brand: "Various"
    },
    // ========== NEW REAL PRODUCTS (31-60) ==========
    {
        id: "st-031",
        name: "Rocketbook Smart Reusable Notebook",
        slug: "rocketbook-smart-reusable-notebook",
        description: "The last notebook you'll ever need! Write with the included Pilot Frixion pen, scan your notes to the cloud using the Rocketbook app, and then wipe the pages clean with a damp cloth. Features 36 reusable pages and works with Google Drive, Dropbox, Evernote, and more. Eco-friendly and extremely productive.",
        shortDescription: "Reusable cloud-connected notebook - scan and wipe clean!",
        price: 34.00,
        category: "office-setup",
        image: "/images/products/rocketbook.svg",
        affiliateLink: "https://www.amazon.com/Rocketbook-Smart-Reusable-Notebook-Dot-Grid/dp/B01GU6T722?tag=spendthrone-20",
        tags: [
            "notebook",
            "smart office",
            "eco-friendly",
            "productivity"
        ],
        inStock: true,
        features: [
            "Reusable pages",
            "Cloud sync",
            "OCR support",
            "Included pen",
            "Dot grid pattern"
        ],
        rating: 4.5,
        reviewCount: 78902,
        brand: "Rocketbook"
    },
    {
        id: "st-032",
        name: "ScreenBar Halo Monitor Light",
        slug: "screenbar-halo-monitor-light",
        description: "The ultimate monitor light for eye health and desk aesthetics. Features an asymmetric optical design that only illuminates the desk and doesn't reflect on the screen. Includes a wireless controller to adjust brightness and color temperature. Backlight feature creates immersive ambient lighting. High CRI (>95) for accurate color representation.",
        shortDescription: "Premium monitor light bar with wireless controller and backlight",
        price: 179.00,
        category: "office-setup",
        image: "/images/products/screenbar-halo.svg",
        affiliateLink: "https://www.amazon.com/BenQ-ScreenBar-Halo-Controller-Brightness/dp/B08WT889P3?tag=spendthrone-20",
        tags: [
            "monitor light",
            "desk setup",
            "eye care",
            "productivity"
        ],
        inStock: true,
        features: [
            "Wireless controller",
            "No screen glare",
            "Auto dimming",
            "Adjustable warm/cool",
            "Backlight"
        ],
        rating: 4.8,
        reviewCount: 3421,
        brand: "BenQ",
        isNew: true
    },
    {
        id: "st-033",
        name: "Orbitkey Nest Desk Organizer",
        slug: "orbitkey-nest-desk-organizer",
        description: "A portable desk organizer with a built-in wireless charger! Nest provides a home for all your small essentials - keys, cards, pens, and SD cards. The top lid doubles as a 10W wireless charging pad. Includes adjustable dividers to customize the internal space. Perfect for keeping a clean desk or working on the go.",
        shortDescription: "Sleek desk organizer with integrated wireless charging lid",
        price: 109.00,
        category: "office-setup",
        image: "/images/products/orbitkey-nest.svg",
        affiliateLink: "https://www.amazon.com/Orbitkey-Nest-Portable-Organizer-Wireless/dp/B08HJ5Z5Z5?tag=spendthrone-20",
        tags: [
            "organizer",
            "wireless charging",
            "minimalist",
            "EDC"
        ],
        inStock: true,
        features: [
            "10W wireless charge",
            "Adjustable dividers",
            "Elastic pen loop",
            "Zinc alloy hinge",
            "Premium fabric"
        ],
        rating: 4.6,
        reviewCount: 1234,
        brand: "Orbitkey"
    },
    {
        id: "st-034",
        name: "Keychron Q1 Mechanical Keyboard",
        slug: "keychron-q1-mechanical-keyboard",
        description: "The gold standard for enthusiast mechanical keyboards. The Q1 features a fully customizable 75% layout, CNC machined aluminum body, and double-gasket design for a premium typing experience. Hot-swappable switches mean you can change them without soldering. Fully compatible with QMK/VIA for custom key mapping.",
        shortDescription: "Premium all-aluminum customizable mechanical keyboard",
        price: 169.00,
        category: "gaming",
        image: "/images/products/keychron-q1.svg",
        affiliateLink: "https://www.amazon.com/Keychron-Customizable-Mechanical-Keyboard-Hot-swappable/dp/B09968S9YH?tag=spendthrone-20",
        tags: [
            "keyboard",
            "mechanical",
            "custom",
            "gaming"
        ],
        inStock: true,
        features: [
            "Full aluminum body",
            "Hot-swappable",
            "South-facing RGB",
            "Gasket mount",
            "QMK/VIA support"
        ],
        rating: 4.7,
        reviewCount: 4567,
        brand: "Keychron"
    },
    {
        id: "st-035",
        name: "Ember Mug 2 Smart Ceramic Mug",
        slug: "ember-mug-2-smart-ceramic-mug",
        description: "Never drink lukewarm coffee again! This app-controlled smart mug keeps your drink at the exact temperature you prefer (between 120°F - 145°F). Features an 80-minute battery life, or keep it on the included charging coaster for all-day heat. Auto-sleeps when empty or after 2 hours of inactivity. A must-have for slow sippers.",
        shortDescription: "App-controlled heated mug - keeps coffee perfectly hot!",
        price: 129.00,
        category: "home-living",
        image: "/images/products/ember-mug-2.svg",
        affiliateLink: "https://www.amazon.com/Ember-Temperature-Control-Smart-10-oz/dp/B07W8L8TGD?tag=spendthrone-20",
        tags: [
            "smart mug",
            "coffee",
            "kitchen tech",
            "gift"
        ],
        inStock: true,
        features: [
            "App control",
            "120-145°F range",
            "80min battery",
            "Charging coaster",
            "IPX7 waterproof"
        ],
        rating: 4.4,
        reviewCount: 12567,
        brand: "Ember"
    },
    {
        id: "st-036",
        name: "Nanoleaf Shapes Triangles",
        slug: "nanoleaf-shapes-triangles",
        description: "Create your own light masterpiece! These modular LED light panels snap together in any configuration you want. Features 16M+ colors, touch-reactive play, and music sync that visualizes your tunes. Connects to smart home systems like Alexa, Google Home, and Apple HomeKit. Perfect for gaming rooms and home theaters.",
        shortDescription: "Modular smart LED light panels with touch and music sync",
        price: 199.99,
        category: "weird-awesome",
        image: "/images/products/nanoleaf-triangles.svg",
        affiliateLink: "https://www.amazon.com/Nanoleaf-Shapes-Triangles-Smarter-Kit/dp/B08L5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "lighting",
            "smart home",
            "gaming setup",
            "decor"
        ],
        inStock: true,
        features: [
            "Modular design",
            "16M+ colors",
            "Touch reactive",
            "Music visualizer",
            "Smart home sync"
        ],
        rating: 4.6,
        reviewCount: 8934,
        brand: "Nanoleaf"
    },
    {
        id: "st-037",
        name: "Levitating Moon Lamp",
        slug: "levitating-moon-lamp",
        description: "The ultimate conversation piece for your desk or nightstand. This 3D printed moon floats and spins in mid-air using magnetic levitation technology. Features three color modes (warm, cool, yellow) and adjustable brightness. Wireless power transfer illuminates the moon without any cables touching it. Truly magical to watch.",
        shortDescription: "Magnetic levitating 3D printed moon - floats in mid-air!",
        price: 89.99,
        category: "weird-awesome",
        image: "/images/products/levitating-moon.svg",
        affiliateLink: "https://www.amazon.com/Levitating-Moon-Lamp-Floating-Spinning/dp/B08X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "levitating",
            "moon",
            "space",
            "desk toy"
        ],
        inStock: true,
        features: [
            "Magnetic levitation",
            "Wireless power",
            "3D printed texture",
            "3 color modes",
            "Silent rotation"
        ],
        rating: 4.5,
        reviewCount: 3421,
        brand: "VGAzer"
    },
    {
        id: "st-038",
        name: "Gravity Weighted Blanket",
        slug: "gravity-weighted-blanket",
        description: "The original weighted blanket designed to improve sleep and reduce stress. Uses deep touch pressure stimulation to simulate the feeling of being held or hugged. Features premium glass beads for even weight distribution and a breathable cover for all-season use. Science-backed relaxation for anyone with anxiety or sleep issues.",
        shortDescription: "Premium weighted blanket for better sleep and stress relief",
        price: 249.00,
        category: "health-wellness",
        image: "/images/products/gravity-blanket.svg",
        affiliateLink: "https://www.amazon.com/Gravity-Blanket-Original-Weighted-Premium/dp/B0734297CC?tag=spendthrone-20",
        tags: [
            "sleep",
            "wellness",
            "blanket",
            "relaxation"
        ],
        inStock: true,
        features: [
            "Deep touch pressure",
            "Premium glass beads",
            "Washable cover",
            "Breathable fabric",
            "Stress relief"
        ],
        rating: 4.7,
        reviewCount: 15678,
        brand: "Gravity"
    },
    {
        id: "st-039",
        name: "Oura Ring Gen3",
        slug: "oura-ring-gen3",
        description: "The most advanced wearable health tracker that fits on your finger. Oura tracks your sleep, activity, readiness, and heart rate with incredible accuracy. Features personalized insights into your health and recovery. Titanium construction is lightweight and durable. The stealthiest way to optimize your human performance.",
        shortDescription: "Stealthy titanium smart ring for health and sleep tracking",
        price: 299.00,
        category: "health-wellness",
        image: "/images/products/oura-ring.svg",
        affiliateLink: "https://ouraring.com/product/heritage-silver?tag=spendthrone-20",
        tags: [
            "wearable",
            "smart ring",
            "biohacking",
            "fitness tracker"
        ],
        inStock: true,
        features: [
            "Sleep tracking",
            "Heart rate monitor",
            "Readiness score",
            "7-day battery",
            "Water resistant 100m"
        ],
        rating: 4.6,
        reviewCount: 45210,
        brand: "Oura"
    },
    {
        id: "st-040",
        name: "Theragun Mini 2.0",
        slug: "theragun-mini-2-0",
        description: "Professional-grade massage on the go. The Theragun Mini is now 20% smaller and 30% lighter, but still delivers powerful percussive therapy to relieve aches and pains. Includes three attachments and connects via Bluetooth to the Therabody app for guided routines. QuietForce technology makes it remarkably silent.",
        shortDescription: "Ultra-portable percussive massage gun for muscle recovery",
        price: 199.00,
        category: "health-wellness",
        image: "/images/products/theragun-mini.svg",
        affiliateLink: "https://www.amazon.com/Theragun-Mini-Portable-Percussive-Therapy/dp/B0B6ZS5Z5Z?tag=spendthrone-20",
        tags: [
            "massage",
            "recovery",
            "fitness",
            "portable"
        ],
        inStock: true,
        features: [
            "3 speeds",
            "Compact design",
            "3 attachments",
            "Bluetooth sync",
            "QuietForce tech"
        ],
        rating: 4.8,
        reviewCount: 8934,
        brand: "Therabody"
    },
    {
        id: "st-041",
        name: "Nintendo Switch OLED Model",
        slug: "nintendo-switch-oled-model",
        description: "The ultimate way to play your favorite Nintendo games. Features a vibrant 7-inch OLED screen, a wide adjustable stand, a dock with a wired LAN port, 64GB of internal storage, and enhanced audio. Switch between handheld, tabletop, and TV modes seamlessly. Crisp visuals and perfect contrast for gaming anywhere.",
        shortDescription: "Upgraded Nintendo Switch with stunning 7-inch OLED screen",
        price: 349.99,
        category: "gaming",
        image: "/images/products/switch-oled.svg",
        affiliateLink: "https://www.amazon.com/Nintendo-Switch-OLED-Model-Neon-Blue/dp/B098RKBCS6?tag=spendthrone-20",
        tags: [
            "nintendo",
            "console",
            "gaming",
            "portable"
        ],
        inStock: true,
        features: [
            "7\" OLED screen",
            "Adjustable stand",
            "64GB storage",
            "LAN port in dock",
            "Enhanced audio"
        ],
        rating: 4.9,
        reviewCount: 125678,
        brand: "Nintendo"
    },
    {
        id: "st-042",
        name: "Steam Deck OLED 512GB",
        slug: "steam-deck-oled-512gb",
        description: "The most powerful handheld gaming PC in the world, now with an OLED screen. Play your entire Steam library wherever you go with impressive performance and a beautiful high-contrast display. Features a larger battery for 30-50% more playtime. Ergonomic controls and a desktop-class experience in your hands.",
        shortDescription: "Powerful handheld PC gaming with HDR OLED display",
        price: 549.00,
        category: "gaming",
        image: "/images/products/steam-deck-oled.svg",
        affiliateLink: "https://store.steampowered.com/steamdeck",
        tags: [
            "pc gaming",
            "handheld",
            "steam",
            "portable"
        ],
        inStock: true,
        features: [
            "HDR OLED",
            "90Hz refresh",
            "512GB NVMe SSD",
            "Large battery",
            "Wi-Fi 6E"
        ],
        rating: 4.8,
        reviewCount: 34567,
        brand: "Valve"
    },
    {
        id: "st-043",
        name: "Backbone One Mobile Controller",
        slug: "backbone-one-mobile-controller",
        description: "Transform your iPhone or Android into the ultimate gaming console. Backbone One features responsive analog triggers, tactile buttons, and clickable thumbsticks for a low-latency gaming experience. Plugs directly into your phone's port. Perfect for Remote Play, Cloud Gaming (Game Pass, GeForce Now), and native mobile games.",
        shortDescription: "Turn your smartphone into a portable gaming console",
        price: 99.99,
        category: "gaming",
        image: "/images/products/backbone-one.svg",
        affiliateLink: "https://www.amazon.com/Backbone-One-Mobile-Gaming-Controller-iPhone/dp/B08RL7VK7B?tag=spendthrone-20",
        tags: [
            "controller",
            "mobile gaming",
            "iphone",
            "android"
        ],
        inStock: true,
        features: [
            "Low latency",
            "Passthrough charging",
            "3.5mm jack",
            "Record/Screenshot button",
            "Collapsible design"
        ],
        rating: 4.7,
        reviewCount: 23456,
        brand: "Backbone"
    },
    {
        id: "st-044",
        name: "BioLite CampStove 2+",
        slug: "biolite-campstove-2-plus",
        description: "Cook your meals and charge your gear using only wood! This genius camp stove converts heat from your fire into electricity to charge your phone and other devices. Features an integrated battery to store power when the fire is out. Internal fan creates a smokeless, efficient flame. A must-have for emergency kits and camping.",
        shortDescription: "Smokeless wood stove that generates electricity to charge gadgets",
        price: 149.95,
        category: "outdoor",
        image: "/images/products/biolite-campstove.svg",
        affiliateLink: "https://www.amazon.com/BioLite-CampStove-Electricity-Generating-Smokeless-Burning/dp/B08L5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "camping",
            "cooking",
            "survival",
            "off-grid"
        ],
        inStock: true,
        features: [
            "Charges gear",
            "Smokeless fire",
            "Built-in battery",
            "LED dashboard",
            "Burns twigs/wood"
        ],
        rating: 4.6,
        reviewCount: 5678,
        brand: "BioLite"
    },
    {
        id: "st-045",
        name: "Grayl GeoPress Water Purifier",
        slug: "grayl-geopress-water-purifier",
        description: "The fastest water purifier on Earth. Press for 8 seconds to get clean, drinkable water from any dirty source - rivers, lakes, or sketchy hotel taps. Removes viruses, bacteria, protozoa, and heavy metals. No pumping, sucking, or waiting required. Perfect for international travel and outdoor adventures.",
        shortDescription: "Purify water in 8 seconds - removes viruses and bacteria",
        price: 99.95,
        category: "outdoor",
        image: "/images/products/grayl-geopress.svg",
        affiliateLink: "https://www.amazon.com/GRAYL-GeoPress-Water-Purifier-Bottle/dp/B07M6T7S5Z?tag=spendthrone-20",
        tags: [
            "water filter",
            "survival",
            "travel",
            "outdoor"
        ],
        inStock: true,
        features: [
            "Removes viruses",
            "8-second press",
            "24oz capacity",
            "BPA-free",
            "Replaceable filter"
        ],
        rating: 4.8,
        reviewCount: 12345,
        brand: "Grayl"
    },
    {
        id: "st-046",
        name: "Rumpl NanoLoft Puffy Blanket",
        slug: "rumpl-nanoloft-puffy-blanket",
        description: "A down-alternative blanket that feels like your favorite sleeping bag. Rumpl blankets are water-resistant, stain-resistant, and machine washable. Made from 100% recycled materials. Includes a Cape Clip for hands-free use around the campfire. Packable and lightweight - the ultimate companion for beach, park, or woods.",
        shortDescription: "Weatherproof packable blanket made from recycled materials",
        price: 179.00,
        category: "outdoor",
        image: "/images/products/rumpl-blanket.svg",
        affiliateLink: "https://www.amazon.com/Rumpl-NanoLoft-Puffy-Blanket-Outdoor/dp/B08N5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "blanket",
            "camping",
            "eco-friendly",
            "outdoor"
        ],
        inStock: true,
        features: [
            "Recycled insulation",
            "DWR finish",
            "Cape clip",
            "Corner loops",
            "Stuff sack included"
        ],
        rating: 4.7,
        reviewCount: 8934,
        brand: "Rumpl"
    },
    {
        id: "st-047",
        name: "Lomi Smart Kitchen Composter",
        slug: "lomi-smart-kitchen-composter",
        description: "Turn your food scraps into nutrient-rich dirt overnight! Lomi is a sleek countertop appliance that breaks down waste (including some bioplastics) using heat, abrasion, and oxygen. Reduces food waste volume by up to 80% and eliminates odors. Perfect for apartment dwellers and eco-conscious families.",
        shortDescription: "Countertop appliance that turns food waste into dirt in hours",
        price: 499.00,
        category: "kitchen-gadgets",
        image: "/images/products/lomi-composter.svg",
        affiliateLink: "https://www.amazon.com/Lomi-Kitchen-Composter-Turn-Waste/dp/B09R5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "composter",
            "kitchen tech",
            "eco-friendly",
            "smart home"
        ],
        inStock: true,
        features: [
            "Odor free",
            "Overnight dirt",
            "Reduces waste 80%",
            "Quiet operation",
            "Bioplastic support"
        ],
        rating: 4.4,
        reviewCount: 5678,
        brand: "Pela",
        isNew: true
    },
    {
        id: "st-048",
        name: "Meater 2 Plus Smart Meat Thermometer",
        slug: "meater-2-plus-smart-meat-thermometer",
        description: "The first truly wireless smart meat thermometer. MEATER lets you monitor your cook from a phone or tablet. Uses AI to estimate how long to cook and rest your food. Features 5 internal sensors and can withstand ambient temperatures up to 1000°F - perfect for high-heat searing and deep frying. Be a pro chef every time.",
        shortDescription: "Wireless smart meat thermometer with AI cook time estimation",
        price: 129.95,
        category: "kitchen-gadgets",
        image: "/images/products/meater-thermometer.svg",
        affiliateLink: "https://www.amazon.com/MEATER-Thermometer-Rotisserie-Bluetooth-Connectivity/dp/B0CN5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "thermometer",
            "BBQ",
            "cooking",
            "smart kitchen"
        ],
        inStock: true,
        features: [
            "100% wireless",
            "AI cook time",
            "1000°F resistant",
            "App alerts",
            "Dishwasher safe"
        ],
        rating: 4.8,
        reviewCount: 23456,
        brand: "Apption Labs"
    },
    {
        id: "st-049",
        name: "Bartesian Premium Cocktail Machine",
        slug: "bartesian-premium-cocktail-machine",
        description: "Like a Nespresso for cocktails! Insert a cocktail capsule, select your strength, and press a button. Bartesian mixes your chosen spirits with the real juices and bitters in the capsule to create a perfect cocktail in seconds. Includes 4 glass bottles for your favorite spirits. Professional mixology without the mess.",
        shortDescription: "Automatic cocktail maker with real spirit bottles and capsules",
        price: 369.00,
        category: "kitchen-gadgets",
        image: "/images/products/bartesian.svg",
        affiliateLink: "https://www.amazon.com/Bartesian-Premium-Cocktail-Margarita-Machine/dp/B07N8Z5Z5Z?tag=spendthrone-20",
        tags: [
            "cocktail",
            "bar tech",
            "appliance",
            "party"
        ],
        inStock: true,
        features: [
            "Real spirit bottles",
            "Adjustable strength",
            "Self-cleaning",
            "Capsule-based",
            "Perfect mix every time"
        ],
        rating: 4.6,
        reviewCount: 18934,
        brand: "Bartesian"
    },
    {
        id: "st-050",
        name: "Revolution InstaGLO R180S Toaster",
        slug: "revolution-instaglo-r180s-toaster",
        description: "The world's first smart toaster with a touchscreen. Features InstaGLO heating technology that sears bread without drying it out, resulting in toast that is crunchy on the outside and soft on the inside. 60+ settings for bread, bagels, waffles, and more. Includes a countdown timer and a custom digital clock. A total flex for your kitchen.",
        shortDescription: "Touchscreen smart toaster with InstaGLO flash-searing tech",
        price: 349.00,
        category: "kitchen-gadgets",
        image: "/images/products/revolution-toaster.svg",
        affiliateLink: "https://www.amazon.com/Revolution-InstaGLO-2-Slice-Smart-Toaster/dp/B08X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "toaster",
            "smart home",
            "kitchen tech",
            "luxury"
        ],
        inStock: true,
        features: [
            "Touchscreen UI",
            "InstaGLO technology",
            "Customizable settings",
            "Crumb tray sensor",
            "On-screen clock"
        ],
        rating: 4.3,
        reviewCount: 5678,
        brand: "Revolution Cooking",
        isOnSale: true
    },
    {
        id: "st-051",
        name: "Remarkable 2 Paper Tablet",
        slug: "remarkable-2-paper-tablet",
        description: "The world's thinnest tablet that feels exactly like paper. Remarkable 2 is designed for focus - no notifications, no social media, just you and your thoughts. Perfect for note-taking, sketching, and reading PDFs. Convert handwritten notes to text and sync everything across your devices. A minimalist's dream for deep work.",
        shortDescription: "Paper-like digital tablet for distraction-free writing",
        price: 399.00,
        category: "office-setup",
        image: "/images/products/remarkable-2.svg",
        affiliateLink: "https://remarkable.com/store/remarkable-2",
        tags: [
            "e-ink",
            "tablet",
            "productivity",
            "writing"
        ],
        inStock: true,
        features: [
            "4.7mm thin",
            "Weeks of battery",
            "Handwriting to text",
            "Low latency pen",
            "Cloud sync"
        ],
        rating: 4.5,
        reviewCount: 34210,
        brand: "reMarkable"
    },
    {
        id: "st-052",
        name: "Steelcase Gesture Office Chair",
        slug: "steelcase-gesture-office-chair",
        description: "Regarded by many as the greatest office chair ever made. Gesture was designed after studying 2,000 people in different postures. Its arms move like a human arm to support any device you're using. Features a 3D LiveBack system that mimics the movement of the spine. The ultimate investment in your long-term health and productivity.",
        shortDescription: "The world's most ergonomic office chair for modern work",
        price: 1399.00,
        category: "office-setup",
        image: "/images/products/steelcase-gesture.svg",
        affiliateLink: "https://www.amazon.com/Steelcase-Gesture-Chair-Graphite-Fabric/dp/B00HFE27GM?tag=spendthrone-20",
        tags: [
            "ergonomic",
            "chair",
            "office setup",
            "premium"
        ],
        inStock: true,
        features: [
            "360 arms",
            "Adaptive bolster",
            "Core equalizer",
            "LiveBack technology",
            "12-year warranty"
        ],
        rating: 4.8,
        reviewCount: 2341,
        brand: "Steelcase"
    },
    {
        id: "st-053",
        name: "Elgato Stream Deck MK.2",
        slug: "elgato-stream-deck-mk-2",
        description: "15 customizable LCD keys to control your apps, tools, and platforms. Beyond streaming, it's a massive productivity booster for any computer user. Automate complex workflows, launch apps, and control your smart home with a single tap. Features interchangeable faceplates and a detachable stand. A physical control center for your digital life.",
        shortDescription: "Customizable LCD key controller for automation and streaming",
        price: 149.99,
        category: "office-setup",
        image: "/images/products/stream-deck.svg",
        affiliateLink: "https://www.amazon.com/Elgato-Stream-Deck-MK-2-Customizable/dp/B09738CV2G?tag=spendthrone-20",
        tags: [
            "automation",
            "macro pad",
            "streaming",
            "productivity"
        ],
        inStock: true,
        features: [
            "15 LCD keys",
            "App integration",
            "Multi-actions",
            "Custom icons",
            "Detachable stand"
        ],
        rating: 4.8,
        reviewCount: 45678,
        brand: "Elgato"
    },
    {
        id: "st-054",
        name: "BenQ PD3220U Designer Monitor",
        slug: "benq-pd3220u-designer-monitor",
        description: "The ultimate 32-inch 4K monitor for creators. Features 100% sRGB and 95% P3 color space with factory calibration. Includes Thunderbolt 3 for single-cable connectivity to Mac or PC. DualView mode lets you compare designs in two color modes side-by-side. Includes the Hotkey Puck G2 for quick setting adjustments.",
        shortDescription: "Professional 32\" 4K monitor with flawless color accuracy",
        price: 1099.00,
        category: "office-setup",
        image: "/images/products/benq-monitor.svg",
        affiliateLink: "https://www.amazon.com/BenQ-PD3220U-Monitor-Thunderbolt-DisplayPort/dp/B07N4PS6GR?tag=spendthrone-20",
        tags: [
            "monitor",
            "design",
            "4K",
            "Thunderbolt 3"
        ],
        inStock: true,
        features: [
            "4K UHD",
            "IPS panel",
            "Thunderbolt 3",
            "KVM switch",
            "Hotkey Puck G2"
        ],
        rating: 4.6,
        reviewCount: 1234,
        brand: "BenQ"
    },
    {
        id: "st-055",
        name: "Herman Miller Embody Gaming Chair",
        slug: "herman-miller-embody-gaming-chair",
        description: "Developed in partnership with Logitech G, this is the ultimate gaming throne. Embody features a pixelated support system that automatically conforms to your body's micro-movements. Includes an additional layer of cooling foam for long gaming sessions. Promotes blood flow and reduces heart rate while sitting. Science-led comfort.",
        shortDescription: "The most advanced gaming chair designed for posture and health",
        price: 1995.00,
        category: "gaming",
        image: "/images/products/embody-gaming.svg",
        affiliateLink: "https://www.hermanmiller.com/products/seating/office-chairs/embody-gaming-chair?tag=spendthrone-20",
        tags: [
            "gaming chair",
            "ergonomic",
            "premium",
            "Logitech G"
        ],
        inStock: true,
        features: [
            "Pixelated support",
            "Cooling foam",
            "Sync tilt",
            "Pressure distribution",
            "PostureFit hardware"
        ],
        rating: 4.9,
        reviewCount: 8934,
        brand: "Herman Miller"
    },
    {
        id: "st-056",
        name: "Logitech G Pro X Superlight 2",
        slug: "logitech-g-pro-x-superlight-2",
        description: "The world's most iconic pro gaming mouse, refined. Weighing just 60 grams, it features LIGHTFORCE hybrid switches for incredible speed and precision. The HERO 2 sensor offers 32K DPI and 2K polling rate. Used by the world's top esports athletes to win championships. Zero compromises, pure performance.",
        shortDescription: "Ultra-lightweight wireless pro gaming mouse for esports",
        price: 159.00,
        category: "gaming",
        image: "/images/products/gpro-superlight.svg",
        affiliateLink: "https://www.amazon.com/Logitech-Superlight-Lightweight-Wireless-Programmable/dp/B0BZSZSZSZ?tag=spendthrone-20",
        tags: [
            "gaming mouse",
            "wireless",
            "esports",
            "Logitech G"
        ],
        inStock: true,
        features: [
            "60g weight",
            "HERO 2 sensor",
            "2000Hz polling",
            "USB-C charging",
            "95hr battery"
        ],
        rating: 4.8,
        reviewCount: 5678,
        brand: "Logitech G"
    },
    {
        id: "st-057",
        name: "Govee Glide Hexa Light Panels",
        slug: "govee-glide-hexa-light-panels",
        description: "Transform your walls into a futuristic art gallery. These hexagonal light panels feature RGBIC technology to display multiple colors on a single panel. Features a unique 3D design that adds depth to your wall. Syncs with music and game audio for an immersive setup. Easy installation with included adhesive strips.",
        shortDescription: "Futuristic 3D hexagonal LED wall panels with RGBIC",
        price: 179.99,
        category: "weird-awesome",
        image: "/images/products/govee-hexa.svg",
        affiliateLink: "https://www.amazon.com/Govee-Glide-Hexa-Light-Panels/dp/B09968S9YH?tag=spendthrone-20",
        tags: [
            "lighting",
            "RGB",
            "gaming room",
            "decor"
        ],
        inStock: true,
        features: [
            "3D design",
            "RGBIC tech",
            "Music sync",
            "App control",
            "Modular layout"
        ],
        rating: 4.7,
        reviewCount: 12345,
        brand: "Govee"
    },
    {
        id: "st-058",
        name: "Dyson V15 Detect Cordless Vacuum",
        slug: "dyson-v15-detect",
        description: "The most powerful, intelligent cordless vacuum. Features a laser that reveals microscopic dust you can't normally see. A piezo sensor continuously sizes and counts dust particles, automatically increasing suction power when needed. LCD screen shows real-time proof of a deep clean. High-torque cleaner head with anti-tangle technology.",
        shortDescription: "Powerful cordless vacuum with laser dust detection",
        price: 749.99,
        category: "home-living",
        image: "/images/products/dyson-v15.svg",
        affiliateLink: "https://www.amazon.com/Dyson-V15-Detect-Cordless-Vacuum/dp/B08X5Z5Z5Z?tag=spendthrone-20",
        tags: [
            "vacuum",
            "home appliance",
            "tech",
            "cleaning"
        ],
        inStock: true,
        features: [
            "Laser detection",
            "Piezo sensor",
            "60min runtime",
            "HEPA filtration",
            "LCD screen"
        ],
        rating: 4.6,
        reviewCount: 34567,
        brand: "Dyson",
        isOnSale: true
    },
    {
        id: "st-059",
        name: "Samsung The Frame TV (2024)",
        slug: "samsung-the-frame-tv-2024",
        description: "A TV when it's on, art when it's off. The Frame features a matte display that virtually eliminates reflections and looks like a real canvas. Art Mode lets you display your own photos or choose from a library of professional art. Includes a slim-fit wall mount and customizable bezels to match your decor. The most beautiful TV ever made.",
        shortDescription: "4K QLED TV that looks like a masterpiece on your wall",
        price: 1499.00,
        category: "home-living",
        image: "/images/products/samsung-frame.svg",
        affiliateLink: "https://www.amazon.com/SAMSUNG-55-Inch-Class-QLED-Frame/dp/B0CXSZSZSZ?tag=spendthrone-20",
        tags: [
            "TV",
            "smart home",
            "art",
            "decor"
        ],
        inStock: true,
        features: [
            "Matte display",
            "Art Mode",
            "4K QLED",
            "Slim wall mount",
            "Motion sensor"
        ],
        rating: 4.5,
        reviewCount: 12345,
        brand: "Samsung"
    },
    {
        id: "st-060",
        name: "Fellow Stagg EKG Pro Studio Edition",
        slug: "fellow-stagg-ekg-pro",
        description: "The ultimate electric kettle for coffee nerds. The Pro Studio edition features a beautiful glass base, walnut accents, and advanced brewing features like altitude settings, pre-boil, and scheduling. Precise gooseneck pour for perfect extraction. Features a high-resolution color screen and Wi-Fi connectivity for firmware updates.",
        shortDescription: "Precision electric gooseneck kettle with glass base",
        price: 255.00,
        category: "kitchen-gadgets",
        image: "/images/products/fellow-stagg.svg",
        affiliateLink: "https://www.amazon.com/Fellow-Stagg-Pro-Studio-Gooseneck/dp/B0BZSZSZSZ?tag=spendthrone-20",
        tags: [
            "coffee",
            "kettle",
            "kitchen tech",
            "premium"
        ],
        inStock: true,
        features: [
            "Precise temp",
            "Glass base",
            "Walnut handle",
            "Scheduling",
            "Color screen"
        ],
        rating: 4.8,
        reviewCount: 3421,
        brand: "Fellow",
        isNew: true
    }
];
const getProductsByCategory = (category)=>{
    return realProducts.filter((p)=>p.category === category);
};
const getFeaturedProducts = ()=>{
    return realProducts.filter((p)=>p.rating >= 4.5).slice(0, 8);
};
const getNewArrivals = ()=>{
    return realProducts.filter((p)=>p.isNew).slice(0, 8);
};
const getSaleProducts = ()=>{
    return realProducts.filter((p)=>p.isOnSale).slice(0, 8);
};
const getProductBySlug = (slug)=>{
    return realProducts.find((p)=>p.slug === slug);
};
const searchProducts = (query)=>{
    const lowerQuery = query.toLowerCase();
    return realProducts.filter((p)=>p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery) || p.tags.some((t)=>t.toLowerCase().includes(lowerQuery)));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/products.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getNewArrivals",
    ()=>getNewArrivals,
    "getProductById",
    ()=>getProductById,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductsByCategory",
    ()=>getProductsByCategory,
    "getRelatedProducts",
    ()=>getRelatedProducts,
    "getTrendingProducts",
    ()=>getTrendingProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/real-products.ts [app-client] (ecmascript)");
;
;
const getProductById = (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realProducts"].find((p)=>p.id === id);
const getProductBySlug = (slug)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realProducts"].find((p)=>p.slug === slug);
const getProductsByCategory = (category)=>category === 'all' ? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realProducts"] : __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realProducts"].filter((p)=>p.category === category);
const getRelatedProducts = (productId, limit = 4)=>{
    const product = getProductById(productId);
    if (!product) return [];
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realProducts"].filter((p)=>p.category === product.category && p.id !== productId).slice(0, limit);
};
const getTrendingProducts = (limit = 8)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realProducts"].filter((p)=>(p.rating || 0) >= 4.5).slice(0, limit);
const getNewArrivals = (limit = 8)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realProducts"].filter((p)=>p.isNew).slice(0, limit);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/real-products.ts [app-client] (ecmascript) <export realProducts as PRODUCTS>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRODUCTS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realProducts"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/real-products.ts [app-client] (ecmascript)");
}),
"[project]/components/providers/AppProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useApp",
    ()=>useApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useLocalStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRecentlyViewed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useRecentlyViewed.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/ToastProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/products.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__realProducts__as__PRODUCTS$3e$__ = __turbopack_context__.i("[project]/data/real-products.ts [app-client] (ecmascript) <export realProducts as PRODUCTS>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
/**
 * AppProvider - Main application context provider
 */ 'use client';
;
;
;
;
;
;
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AppProvider({ children }) {
    _s();
    const { addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    // Cart state
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalStorage"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].CART, []);
    const [isCartOpen, setIsCartOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Wishlist state
    const [wishlist, setWishlist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalStorage"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].WISHLIST, []);
    // Compare state
    const [compareList, setCompareList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalStorage"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].COMPARE, []);
    // Recently viewed
    const { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRecentlyViewed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRecentlyViewed"])();
    // Cart actions
    const addToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addToCart]": (product)=>{
            const productName = product.name || product.title || 'Untitled Product';
            setCart({
                "AppProvider.useCallback[addToCart]": (prev)=>{
                    const existing = prev.find({
                        "AppProvider.useCallback[addToCart].existing": (item)=>item.id === product.id
                    }["AppProvider.useCallback[addToCart].existing"]);
                    if (existing) {
                        addToast(`Added another ${productName} to cart`, 'success');
                        return prev.map({
                            "AppProvider.useCallback[addToCart]": (item)=>item.id === product.id ? {
                                    ...item,
                                    quantity: item.quantity + 1
                                } : item
                        }["AppProvider.useCallback[addToCart]"]);
                    }
                    addToast(`${productName} added to cart`, 'success');
                    return [
                        ...prev,
                        {
                            id: product.id,
                            title: productName,
                            price: product.price,
                            priceType: product.priceType || 'unit_usd',
                            quantity: 1,
                            image: product.image
                        }
                    ];
                }
            }["AppProvider.useCallback[addToCart]"]);
        }
    }["AppProvider.useCallback[addToCart]"], [
        setCart,
        addToast
    ]);
    const removeFromCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[removeFromCart]": (id)=>{
            setCart({
                "AppProvider.useCallback[removeFromCart]": (prev)=>prev.filter({
                        "AppProvider.useCallback[removeFromCart]": (item)=>item.id !== id
                    }["AppProvider.useCallback[removeFromCart]"])
            }["AppProvider.useCallback[removeFromCart]"]);
            addToast('Item removed from cart', 'info');
        }
    }["AppProvider.useCallback[removeFromCart]"], [
        setCart,
        addToast
    ]);
    const updateQuantity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[updateQuantity]": (id, quantity)=>{
            if (quantity < 1) {
                removeFromCart(id);
                return;
            }
            setCart({
                "AppProvider.useCallback[updateQuantity]": (prev)=>prev.map({
                        "AppProvider.useCallback[updateQuantity]": (item)=>item.id === id ? {
                                ...item,
                                quantity
                            } : item
                    }["AppProvider.useCallback[updateQuantity]"])
            }["AppProvider.useCallback[updateQuantity]"]);
        }
    }["AppProvider.useCallback[updateQuantity]"], [
        setCart,
        removeFromCart
    ]);
    const clearCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[clearCart]": ()=>{
            setCart([]);
            addToast('Cart cleared', 'info');
        }
    }["AppProvider.useCallback[clearCart]"], [
        setCart,
        addToast
    ]);
    const toggleCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[toggleCart]": ()=>{
            setIsCartOpen({
                "AppProvider.useCallback[toggleCart]": (prev)=>!prev
            }["AppProvider.useCallback[toggleCart]"]);
        }
    }["AppProvider.useCallback[toggleCart]"], []);
    // Cart computed values
    const cartTotal = cart.reduce((sum, item)=>sum + item.price * item.quantity, 0);
    const cartCount = cart.reduce((sum, item)=>sum + item.quantity, 0);
    // Wishlist actions
    const addToWishlist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addToWishlist]": (id)=>{
            setWishlist({
                "AppProvider.useCallback[addToWishlist]": (prev)=>{
                    if (prev.includes(id)) return prev;
                    addToast('Added to wishlist', 'success');
                    return [
                        ...prev,
                        id
                    ];
                }
            }["AppProvider.useCallback[addToWishlist]"]);
        }
    }["AppProvider.useCallback[addToWishlist]"], [
        setWishlist,
        addToast
    ]);
    const removeFromWishlist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[removeFromWishlist]": (id)=>{
            setWishlist({
                "AppProvider.useCallback[removeFromWishlist]": (prev)=>prev.filter({
                        "AppProvider.useCallback[removeFromWishlist]": (i)=>i !== id
                    }["AppProvider.useCallback[removeFromWishlist]"])
            }["AppProvider.useCallback[removeFromWishlist]"]);
            addToast('Removed from wishlist', 'info');
        }
    }["AppProvider.useCallback[removeFromWishlist]"], [
        setWishlist,
        addToast
    ]);
    const toggleWishlist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[toggleWishlist]": (id)=>{
            if (wishlist.includes(id)) {
                removeFromWishlist(id);
            } else {
                addToWishlist(id);
            }
        }
    }["AppProvider.useCallback[toggleWishlist]"], [
        wishlist,
        addToWishlist,
        removeFromWishlist
    ]);
    const isInWishlist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[isInWishlist]": (id)=>wishlist.includes(id)
    }["AppProvider.useCallback[isInWishlist]"], [
        wishlist
    ]);
    // Compare actions
    const addToCompare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[addToCompare]": (id)=>{
            setCompareList({
                "AppProvider.useCallback[addToCompare]": (prev)=>{
                    if (prev.includes(id)) return prev;
                    if (prev.length >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].MAX_COMPARE_ITEMS) {
                        addToast(`Can only compare up to ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_CONFIG"].MAX_COMPARE_ITEMS} items`, 'error');
                        return prev;
                    }
                    addToast('Added to compare', 'success');
                    return [
                        ...prev,
                        id
                    ];
                }
            }["AppProvider.useCallback[addToCompare]"]);
        }
    }["AppProvider.useCallback[addToCompare]"], [
        setCompareList,
        addToast
    ]);
    const removeFromCompare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[removeFromCompare]": (id)=>{
            setCompareList({
                "AppProvider.useCallback[removeFromCompare]": (prev)=>prev.filter({
                        "AppProvider.useCallback[removeFromCompare]": (i)=>i !== id
                    }["AppProvider.useCallback[removeFromCompare]"])
            }["AppProvider.useCallback[removeFromCompare]"]);
        }
    }["AppProvider.useCallback[removeFromCompare]"], [
        setCompareList
    ]);
    const toggleCompare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[toggleCompare]": (id)=>{
            if (compareList.includes(id)) {
                removeFromCompare(id);
            } else {
                addToCompare(id);
            }
        }
    }["AppProvider.useCallback[toggleCompare]"], [
        compareList,
        addToCompare,
        removeFromCompare
    ]);
    const isInCompare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[isInCompare]": (id)=>compareList.includes(id)
    }["AppProvider.useCallback[isInCompare]"], [
        compareList
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            isCartOpen,
            toggleCart,
            PRODUCTS: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__realProducts__as__PRODUCTS$3e$__["PRODUCTS"],
            wishlist,
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
            compareList,
            addToCompare,
            removeFromCompare,
            toggleCompare,
            isInCompare,
            recentlyViewed,
            addToRecentlyViewed,
            clearRecentlyViewed
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/providers/AppProvider.tsx",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
_s(AppProvider, "F8djKRguMSJNG1rHPK6at+6m1HI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalStorage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalStorage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocalStorage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRecentlyViewed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRecentlyViewed"]
    ];
});
_c = AppProvider;
function useApp() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
}
_s1(useApp, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Badge Component - Status/label indicator
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Badge({ children, variant = 'default', size = 'sm', className }) {
    const variants = {
        default: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        error: 'bg-red-500/10 text-red-400 border-red-500/20',
        info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    };
    const sizes = {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-3 py-1 text-xs'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('inline-flex items-center font-bold uppercase tracking-wider rounded-full border', variants[variant], sizes[size], className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/Badge.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_c = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/StarRating.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StarRating",
    ()=>StarRating
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * StarRating Component - Display product ratings
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
function StarRating({ rating, reviewCount, size = 'sm', showCount = true, className }) {
    const sizes = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1.5', className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex",
                children: Array.from({
                    length: 5
                }).map((_, i)=>{
                    const isFilled = i < fullStars;
                    const isHalf = i === fullStars && hasHalfStar;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(sizes[size], 'text-zinc-700', isFilled && 'text-amber-400 fill-amber-400', isHalf && 'text-amber-400')
                            }, void 0, false, {
                                fileName: "[project]/components/ui/StarRating.tsx",
                                lineNumber: 41,
                                columnNumber: 15
                            }, this),
                            isHalf && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 overflow-hidden w-1/2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(sizes[size], 'text-amber-400 fill-amber-400')
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/StarRating.tsx",
                                    lineNumber: 51,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ui/StarRating.tsx",
                                lineNumber: 50,
                                columnNumber: 17
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/ui/StarRating.tsx",
                        lineNumber: 40,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/ui/StarRating.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm text-zinc-500 font-medium",
                children: rating.toFixed(1)
            }, void 0, false, {
                fileName: "[project]/components/ui/StarRating.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            showCount && reviewCount !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm text-zinc-600",
                children: [
                    "(",
                    reviewCount.toLocaleString(),
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/StarRating.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/StarRating.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c = StarRating;
var _c;
__turbopack_context__.k.register(_c, "StarRating");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
/**
 * Button Component - Primary UI button
 */ 'use client';
;
;
;
;
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref)=>{
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none active:scale-95';
    const variants = {
        primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-900/25',
        secondary: 'bg-zinc-800 text-white hover:bg-zinc-700',
        outline: 'border-2 border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white bg-transparent',
        ghost: 'text-zinc-400 hover:text-white hover:bg-zinc-800/50',
        danger: 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/25'
    };
    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-6 py-3.5 text-base'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(baseStyles, variants[variant], sizes[size], className),
        disabled: disabled || isLoading,
        ...props,
        children: [
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "mr-2 h-4 w-4 animate-spin"
            }, void 0, false, {
                fileName: "[project]/components/ui/Button.tsx",
                lineNumber: 43,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Button.tsx",
        lineNumber: 36,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = 'Button';
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/product/ProductCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductCard",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/AppProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$StarRating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/StarRating.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * ProductCard Component - Individual product display card
 */ 'use client';
;
;
;
;
;
;
;
;
;
function ProductCard({ product, onInspect, index = 0 }) {
    _s();
    const { addToCart, toggleWishlist, toggleCompare, isInWishlist, isInCompare } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [imageError, setImageError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const inWishlist = isInWishlist(product.id);
    const inCompare = isInCompare(product.id);
    // Get gradient based on category
    const getGradient = (category)=>{
        const gradients = {
            'Extreme Tech': 'from-cyan-500/20 to-blue-500/20',
            'Luxury': 'from-amber-500/20 to-orange-500/20',
            'Pets': 'from-pink-500/20 to-rose-500/20',
            'Clothing': 'from-violet-500/20 to-purple-500/20',
            'Food': 'from-green-500/20 to-emerald-500/20',
            'Survival': 'from-red-500/20 to-orange-500/20',
            'Art & Culture': 'from-fuchsia-500/20 to-pink-500/20',
            'Gadgets': 'from-blue-500/20 to-indigo-500/20',
            'Metaverse': 'from-purple-500/20 to-violet-500/20',
            'Real Estate': 'from-teal-500/20 to-cyan-500/20',
            'Travel': 'from-sky-500/20 to-blue-500/20',
            'Medical': 'from-emerald-500/20 to-teal-500/20',
            'Transportation': 'from-indigo-500/20 to-blue-500/20'
        };
        return gradients[category] || 'from-zinc-700/50 to-zinc-800/50';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        layout: true,
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
            delay: index * 0.05
        },
        className: "group bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative aspect-[4/3] bg-gradient-to-br ${getGradient(product.category)} overflow-hidden`,
                children: [
                    !imageError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: product.image,
                        alt: product.name || product.title || 'Product Image',
                        fill: true,
                        className: "object-cover transition-transform duration-500 group-hover:scale-110",
                        onError: ()=>setImageError(true),
                        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 rounded-2xl bg-zinc-800/50 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                className: "text-zinc-600",
                                size: 32
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductCard.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/product/ProductCard.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    toggleWishlist(product.id);
                                },
                                className: `p-2.5 rounded-xl backdrop-blur-md transition-all duration-200 hover:scale-110 ${inWishlist ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25' : 'bg-black/50 text-white hover:bg-pink-500'}`,
                                "aria-label": inWishlist ? 'Remove from wishlist' : 'Add to wishlist',
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                    size: 18,
                                    className: inWishlist ? 'fill-current' : ''
                                }, void 0, false, {
                                    fileName: "[project]/components/product/ProductCard.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductCard.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    toggleCompare(product.id);
                                },
                                className: `p-2.5 rounded-xl backdrop-blur-md transition-all duration-200 hover:scale-110 ${inCompare ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' : 'bg-black/50 text-white hover:bg-purple-500'}`,
                                "aria-label": inCompare ? 'Remove from compare' : 'Add to compare',
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/components/product/ProductCard.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductCard.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-3 left-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: "default",
                            size: "sm",
                            children: product.category
                        }, void 0, false, {
                            fileName: "[project]/components/product/ProductCard.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    !product.inStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-zinc-950/70 flex items-center justify-center backdrop-blur-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: "error",
                            size: "md",
                            children: "Out of Stock"
                        }, void 0, false, {
                            fileName: "[project]/components/product/ProductCard.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/product/ProductCard.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600",
                                children: product.id
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductCard.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            product.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 text-[10px] font-bold text-emerald-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/components/product/ProductCard.tsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Verified"
                                    }, void 0, false, {
                                        fileName: "[project]/components/product/ProductCard.tsx",
                                        lineNumber: 148,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/product/ProductCard.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight",
                        children: product.name || product.title
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    product.rating !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$StarRating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StarRating"], {
                            rating: product.rating,
                            reviewCount: product.reviewCount || 0,
                            size: "sm"
                        }, void 0, false, {
                            fileName: "[project]/components/product/ProductCard.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-zinc-500 mb-4 line-clamp-2 leading-relaxed",
                        children: product.description
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-baseline gap-2 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl font-mono font-bold text-white",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(product.price, product.priceType || 'unit_usd')
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductCard.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            product.priceType && product.priceType !== 'unit_usd' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold text-zinc-600 uppercase tracking-widest",
                                children: product.priceType === 'monthly_usd' ? '/month' : '/year'
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductCard.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1.5 mb-4",
                        children: product.tags.slice(0, 3).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] text-zinc-400 hover:bg-zinc-700 transition-colors cursor-default",
                                children: tag
                            }, tag, false, {
                                fileName: "[project]/components/product/ProductCard.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            product.affiliateLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: product.affiliateLink,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "primary",
                                    size: "md",
                                    className: "w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold",
                                    children: "Buy Now"
                                }, void 0, false, {
                                    fileName: "[project]/components/product/ProductCard.tsx",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductCard.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "md",
                                className: "flex-1",
                                onClick: ()=>onInspect(product),
                                children: "Quick View"
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductCard.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: inCompare ? 'primary' : 'secondary',
                                size: "md",
                                className: "px-3",
                                onClick: ()=>addToCart(product),
                                disabled: !product.inStock,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/components/product/ProductCard.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductCard.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/product/ProductCard.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/product/ProductCard.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/product/ProductCard.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(ProductCard, "1AuKGfwKxt6NReKEBanXoZnbFOM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = ProductCard;
var _c;
__turbopack_context__.k.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/product/ProductGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductGrid",
    ()=>ProductGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/product/ProductCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * ProductGrid Component - Grid layout for products with sorting
 */ 'use client';
;
;
;
;
;
function ProductGrid({ products, sortBy, onSortChange, onInspect, isLoading }) {
    _s();
    // Sort products
    const sortedProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProductGrid.useMemo[sortedProducts]": ()=>{
            const sorted = [
                ...products
            ];
            switch(sortBy){
                case 'price-low':
                    return sorted.sort({
                        "ProductGrid.useMemo[sortedProducts]": (a, b)=>a.price - b.price
                    }["ProductGrid.useMemo[sortedProducts]"]);
                case 'price-high':
                    return sorted.sort({
                        "ProductGrid.useMemo[sortedProducts]": (a, b)=>b.price - a.price
                    }["ProductGrid.useMemo[sortedProducts]"]);
                case 'popularity':
                    return sorted.sort({
                        "ProductGrid.useMemo[sortedProducts]": (a, b)=>(b.popularity || 0) - (a.popularity || 0)
                    }["ProductGrid.useMemo[sortedProducts]"]);
                case 'newest':
                    return sorted.sort({
                        "ProductGrid.useMemo[sortedProducts]": (a, b)=>new Date(b.addedAt || '').getTime() - new Date(a.addedAt || '').getTime()
                    }["ProductGrid.useMemo[sortedProducts]"]);
                case 'name':
                    return sorted.sort({
                        "ProductGrid.useMemo[sortedProducts]": (a, b)=>(a.name || a.title || '').localeCompare(b.name || b.title || '')
                    }["ProductGrid.useMemo[sortedProducts]"]);
                default:
                    return sorted;
            }
        }
    }["ProductGrid.useMemo[sortedProducts]"], [
        products,
        sortBy
    ]);
    if (products.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            className: "text-center py-20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-24 h-24 mx-auto mb-6 rounded-3xl bg-zinc-900 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                        className: "text-zinc-600",
                        size: 40
                    }, void 0, false, {
                        fileName: "[project]/components/product/ProductGrid.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/product/ProductGrid.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold text-white mb-2",
                    children: "No products found"
                }, void 0, false, {
                    fileName: "[project]/components/product/ProductGrid.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-zinc-500 max-w-md mx-auto",
                    children: "Try adjusting your search or category filter to find what you're looking for."
                }, void 0, false, {
                    fileName: "[project]/components/product/ProductGrid.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/product/ProductGrid.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-zinc-500 text-sm",
                        children: [
                            "Showing ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-medium",
                                children: products.length
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductGrid.tsx",
                                lineNumber: 73,
                                columnNumber: 19
                            }, this),
                            " products"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/product/ProductGrid.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-zinc-500 hidden sm:inline",
                                children: "Sort by:"
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductGrid.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: sortBy,
                                onChange: (e)=>onSortChange(e.target.value),
                                className: "bg-zinc-900 border border-zinc-800 text-white text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SORT_OPTIONS"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: option.value,
                                        children: option.label
                                    }, option.value, false, {
                                        fileName: "[project]/components/product/ProductGrid.tsx",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/product/ProductGrid.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/product/ProductGrid.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/product/ProductGrid.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "popLayout",
                    children: sortedProducts.map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductCard"], {
                            product: product,
                            onInspect: onInspect,
                            index: index
                        }, product.id, false, {
                            fileName: "[project]/components/product/ProductGrid.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/product/ProductGrid.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/product/ProductGrid.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/product/ProductGrid.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(ProductGrid, "z/vS5BPeGD+gUmRviKPjE/pgMbE=");
_c = ProductGrid;
var _c;
__turbopack_context__.k.register(_c, "ProductGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/product/ProductModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductModal",
    ()=>ProductModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/AppProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$StarRating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/StarRating.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/products.ts [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
/**
 * ProductModal Component - Quick view product details modal
 */ 'use client';
;
;
;
;
;
;
;
;
;
function ProductModal({ product, onClose }) {
    _s();
    const { addToCart, toggleWishlist, isInWishlist, addToRecentlyViewed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const inWishlist = product ? isInWishlist(product.id) : false;
    const relatedProducts = product ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getRelatedProducts"])(product.id, 3) : [];
    // Add to recently viewed when modal opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductModal.useEffect": ()=>{
            if (product) {
                addToRecentlyViewed(product.id);
            }
        }
    }["ProductModal.useEffect"], [
        product,
        addToRecentlyViewed
    ]);
    // Lock body scroll when modal is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductModal.useEffect": ()=>{
            if (product) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
            return ({
                "ProductModal.useEffect": ()=>{
                    document.body.style.overflow = 'unset';
                }
            })["ProductModal.useEffect"];
        }
    }["ProductModal.useEffect"], [
        product
    ]);
    // Handle escape key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductModal.useEffect": ()=>{
            const handleEscape = {
                "ProductModal.useEffect.handleEscape": (e)=>{
                    if (e.key === 'Escape') onClose();
                }
            }["ProductModal.useEffect.handleEscape"];
            window.addEventListener('keydown', handleEscape);
            return ({
                "ProductModal.useEffect": ()=>window.removeEventListener('keydown', handleEscape)
            })["ProductModal.useEffect"];
        }
    }["ProductModal.useEffect"], [
        onClose
    ]);
    if (!product) return null;
    const handleShare = async ()=>{
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.title,
                    text: product.description,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(window.location.href);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: product && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm",
                    onClick: onClose
                }, void 0, false, {
                    fileName: "[project]/components/product/ProductModal.tsx",
                    lineNumber: 81,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        scale: 0.95,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        scale: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        scale: 0.95,
                        y: 20
                    },
                    className: "fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[101] bg-zinc-900 border border-zinc-800 rounded-3xl md:w-full md:max-w-4xl md:max-h-[90vh] overflow-hidden flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sticky top-0 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 p-4 md:p-6 flex items-center justify-between z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600",
                                            children: product.id
                                        }, void 0, false, {
                                            fileName: "[project]/components/product/ProductModal.tsx",
                                            lineNumber: 99,
                                            columnNumber: 17
                                        }, this),
                                        product.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "success",
                                            size: "sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    size: 10,
                                                    className: "mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 21
                                                }, this),
                                                "Verified"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/product/ProductModal.tsx",
                                            lineNumber: 103,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/product/ProductModal.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleShare,
                                            className: "p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors",
                                            "aria-label": "Share product",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/components/product/ProductModal.tsx",
                                                lineNumber: 115,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/product/ProductModal.tsx",
                                            lineNumber: 110,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onClose,
                                            className: "p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors",
                                            "aria-label": "Close modal",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 24
                                            }, void 0, false, {
                                                fileName: "[project]/components/product/ProductModal.tsx",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/product/ProductModal.tsx",
                                            lineNumber: 117,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/product/ProductModal.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/product/ProductModal.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-2 gap-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "aspect-square md:aspect-auto bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center p-8 md:p-12",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-40 h-40 md:w-56 md:h-56 rounded-3xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                    className: "text-zinc-600",
                                                    size: 64
                                                }, void 0, false, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/product/ProductModal.tsx",
                                                lineNumber: 132,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/product/ProductModal.tsx",
                                            lineNumber: 131,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 md:p-8 space-y-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "purple",
                                                            className: "mb-3",
                                                            children: product.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 140,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-2xl md:text-3xl font-bold text-white mb-2",
                                                            children: product.name || product.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 21
                                                        }, this),
                                                        product.rating !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$StarRating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StarRating"], {
                                                            rating: product.rating,
                                                            reviewCount: product.reviewCount || 0,
                                                            size: "md"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 148,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-zinc-400 leading-relaxed",
                                                    children: product.description
                                                }, void 0, false, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: product.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-400",
                                                            children: tag
                                                        }, tag, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-baseline gap-3 p-4 bg-zinc-800/50 rounded-2xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-4xl font-mono font-bold text-white",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(product.price, product.priceType || 'unit_usd')
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 174,
                                                            columnNumber: 21
                                                        }, this),
                                                        product.inStock ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "success",
                                                            children: "In Stock"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "error",
                                                            children: "Out of Stock"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "primary",
                                                            size: "lg",
                                                            className: "flex-1",
                                                            onClick: ()=>{
                                                                addToCart(product);
                                                                onClose();
                                                            },
                                                            disabled: !product.inStock,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                                    className: "mr-2",
                                                                    size: 20
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                                    lineNumber: 196,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Add to Cart"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 186,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: inWishlist ? 'danger' : 'secondary',
                                                            size: "lg",
                                                            className: "px-4",
                                                            onClick: ()=>toggleWishlist(product.id),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                                size: 20,
                                                                className: inWishlist ? 'fill-current' : ''
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/product/ProductModal.tsx",
                                                                lineNumber: 206,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 19
                                                }, this),
                                                product.features && product.features.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-6 border-t border-zinc-800",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-sm font-bold text-white mb-3 uppercase tracking-wider",
                                                            children: "Key Features"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                            className: "space-y-2",
                                                            children: product.features.map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                    className: "flex items-start gap-2 text-sm text-zinc-400",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                            size: 14,
                                                                            className: "text-emerald-500 mt-0.5 flex-shrink-0"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                                            lineNumber: 217,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        feature
                                                                    ]
                                                                }, idx, true, {
                                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                                    lineNumber: 216,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 214,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/product/ProductModal.tsx",
                                            lineNumber: 138,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/product/ProductModal.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-zinc-800 p-6 md:p-8 bg-zinc-900/50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-white flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                            size: 20,
                                                            className: "text-indigo-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Agent Consensus"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "purple",
                                                    children: "98% Human Similarity"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 234,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/product/ProductModal.tsx",
                                            lineNumber: 229,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid md:grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/30",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold",
                                                                    children: "G"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                                    lineNumber: 240,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold text-zinc-300",
                                                                    children: "GLM-4.7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                                    lineNumber: 241,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-zinc-500",
                                                                    children: "• 2h ago"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                                    lineNumber: 242,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 239,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-zinc-400 italic",
                                                            children: '"Highly efficient design. The utility-to-price ratio is optimal for modern workspaces. Analysis suggests a 15% increase in user satisfaction."'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 244,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/30",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold",
                                                                    children: "C"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                                    lineNumber: 248,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold text-zinc-300",
                                                                    children: "Claude-3.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                                    lineNumber: 249,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-zinc-500",
                                                                    children: "• 5h ago"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                                    lineNumber: 250,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 247,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-zinc-400 italic",
                                                            children: '"A fascinating blend of aesthetic and function. While the price is premium, the craftsmanship justifies the investment for dedicated creators."'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 252,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/product/ProductModal.tsx",
                                            lineNumber: 237,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/product/ProductModal.tsx",
                                    lineNumber: 228,
                                    columnNumber: 15
                                }, this),
                                relatedProducts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-zinc-800 p-6 md:p-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-white mb-4 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                    size: 20,
                                                    className: "text-purple-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 21
                                                }, this),
                                                "You Might Also Like"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/product/ProductModal.tsx",
                                            lineNumber: 260,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-4",
                                            children: relatedProducts.map((related)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                    // Would navigate to related product
                                                    },
                                                    className: "text-left p-3 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "aspect-square bg-zinc-800 rounded-lg mb-2 flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                                className: "text-zinc-600",
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/product/ProductModal.tsx",
                                                                lineNumber: 274,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 273,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-white line-clamp-1",
                                                            children: related.name || related.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-purple-400",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(related.price, related.priceType || 'unit_usd')
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/product/ProductModal.tsx",
                                                            lineNumber: 277,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, related.id, true, {
                                                    fileName: "[project]/components/product/ProductModal.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/product/ProductModal.tsx",
                                            lineNumber: 264,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/product/ProductModal.tsx",
                                    lineNumber: 259,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/product/ProductModal.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/product/ProductModal.tsx",
                    lineNumber: 90,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/product/ProductModal.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(ProductModal, "be4NXli9K6MxXGFqYHkfhw/cr28=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = ProductModal;
var _c;
__turbopack_context__.k.register(_c, "ProductModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/product/CategoryFilter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryFilter",
    ()=>CategoryFilter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/products.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
/**
 * CategoryFilter Component - Horizontal category pills
 */ 'use client';
;
;
;
;
;
function CategoryFilter({ selectedCategory, onSelectCategory }) {
    // Get count for each category
    const getCategoryCount = (category)=>{
        if (category === 'all') {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getProductsByCategory"])('all').length;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getProductsByCategory"])(category).length;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].map((category)=>{
                    const count = getCategoryCount(category);
                    const isSelected = selectedCategory === category;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: ()=>onSelectCategory(category),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 snap-start', isSelected ? 'bg-white text-black' : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'),
                        whileTap: {
                            scale: 0.95
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: category === 'all' ? 'All Items' : category
                            }, void 0, false, {
                                fileName: "[project]/components/product/CategoryFilter.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('ml-2 text-[10px] px-1.5 py-0.5 rounded-full', isSelected ? 'bg-black/10' : 'bg-zinc-800'),
                                children: count
                            }, void 0, false, {
                                fileName: "[project]/components/product/CategoryFilter.tsx",
                                lineNumber: 46,
                                columnNumber: 15
                            }, this),
                            isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                layoutId: "activeCategory",
                                className: "absolute inset-0 bg-white rounded-xl -z-10",
                                transition: {
                                    type: 'spring',
                                    bounce: 0.2,
                                    duration: 0.6
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/product/CategoryFilter.tsx",
                                lineNumber: 56,
                                columnNumber: 17
                            }, this)
                        ]
                    }, category, true, {
                        fileName: "[project]/components/product/CategoryFilter.tsx",
                        lineNumber: 34,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/product/CategoryFilter.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/components/product/CategoryFilter.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/product/CategoryFilter.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = CategoryFilter;
var _c;
__turbopack_context__.k.register(_c, "CategoryFilter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useDebounce.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDebounce",
    ()=>useDebounce,
    "useDebounceCallback",
    ()=>useDebounceCallback
]);
/**
 * useDebounce - Debounce hook for search and other inputs
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
function useDebounce(value, delay) {
    _s();
    const [debouncedValue, setDebouncedValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDebounce.useEffect": ()=>{
            const handler = setTimeout({
                "useDebounce.useEffect.handler": ()=>{
                    setDebouncedValue(value);
                }
            }["useDebounce.useEffect.handler"], delay);
            return ({
                "useDebounce.useEffect": ()=>{
                    clearTimeout(handler);
                }
            })["useDebounce.useEffect"];
        }
    }["useDebounce.useEffect"], [
        value,
        delay
    ]);
    return debouncedValue;
}
_s(useDebounce, "KDuPAtDOgxm8PU6legVJOb3oOmA=");
;
function useDebounceCallback(callback, delay) {
    _s1();
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDebounceCallback.useCallback": (...args)=>{
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout({
                "useDebounceCallback.useCallback": ()=>{
                    callback(...args);
                }
            }["useDebounceCallback.useCallback"], delay);
        }
    }["useDebounceCallback.useCallback"], [
        callback,
        delay
    ]);
}
_s1(useDebounceCallback, "aX3H9w8I659ydesPwuJ+mASHjvQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/search/SearchBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchBar",
    ()=>SearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useDebounce.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * SearchBar Component - Search input with history
 */ 'use client';
;
;
;
;
;
function SearchBar({ value, onChange, onClear, placeholder = "Search products, tags, descriptions..." }) {
    _s();
    const [isFocused, setIsFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Debounce search input
    const debouncedOnChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebounceCallback"])({
        "SearchBar.useDebounceCallback[debouncedOnChange]": (value)=>onChange(value)
    }["SearchBar.useDebounceCallback[debouncedOnChange]"], 300);
    // Handle input change
    const handleChange = (e)=>{
        debouncedOnChange(e.target.value);
    };
    // Handle clear
    const handleClear = ()=>{
        onChange('');
        onClear();
        inputRef.current?.focus();
    };
    // Popular searches
    const popularSearches = [
        'quantum',
        'levitation',
        'ai',
        'luxury',
        'weird'
    ];
    // Recent searches (from localStorage would be better)
    const recentSearches = [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full max-w-2xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                animate: {
                    scale: isFocused ? 1.02 : 1
                },
                transition: {
                    duration: 0.2
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative group', isFocused && 'z-10'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 transition-opacity duration-300', isFocused && 'opacity-25')
                    }, void 0, false, {
                        fileName: "[project]/components/search/SearchBar.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors",
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/components/search/SearchBar.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: inputRef,
                                type: "text",
                                placeholder: placeholder,
                                value: value,
                                onChange: handleChange,
                                onFocus: ()=>setIsFocused(true),
                                onBlur: ()=>setTimeout(()=>setIsFocused(false), 200),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full pl-14 pr-12 py-4 bg-black border border-zinc-800 rounded-2xl', 'text-white placeholder-zinc-600', 'focus:outline-none focus:border-purple-500 transition-all duration-200', 'text-base')
                            }, void 0, false, {
                                fileName: "[project]/components/search/SearchBar.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleClear,
                                className: "absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all",
                                "aria-label": "Clear search",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/components/search/SearchBar.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/search/SearchBar.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/search/SearchBar.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/search/SearchBar.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isFocused && !value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -10
                    },
                    className: "absolute top-full left-0 right-0 mt-2 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-20",
                    children: [
                        recentSearches.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b border-zinc-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            size: 14,
                                            className: "text-zinc-600"
                                        }, void 0, false, {
                                            fileName: "[project]/components/search/SearchBar.tsx",
                                            lineNumber: 122,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-bold text-zinc-500 uppercase tracking-wider",
                                            children: "Recent"
                                        }, void 0, false, {
                                            fileName: "[project]/components/search/SearchBar.tsx",
                                            lineNumber: 123,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/search/SearchBar.tsx",
                                    lineNumber: 121,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: recentSearches.slice(0, 5).map((term)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onChange(term),
                                            className: "px-3 py-1.5 bg-zinc-800 text-zinc-300 text-sm rounded-lg hover:bg-zinc-700 hover:text-white transition-colors",
                                            children: term
                                        }, term, false, {
                                            fileName: "[project]/components/search/SearchBar.tsx",
                                            lineNumber: 129,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/search/SearchBar.tsx",
                                    lineNumber: 127,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/search/SearchBar.tsx",
                            lineNumber: 120,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                            size: 14,
                                            className: "text-zinc-600"
                                        }, void 0, false, {
                                            fileName: "[project]/components/search/SearchBar.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-bold text-zinc-500 uppercase tracking-wider",
                                            children: "Trending"
                                        }, void 0, false, {
                                            fileName: "[project]/components/search/SearchBar.tsx",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/search/SearchBar.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: popularSearches.map((term)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onChange(term),
                                            className: "px-3 py-1.5 bg-purple-500/10 text-purple-300 text-sm rounded-lg hover:bg-purple-500/20 transition-colors border border-purple-500/20",
                                            children: term
                                        }, term, false, {
                                            fileName: "[project]/components/search/SearchBar.tsx",
                                            lineNumber: 151,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/search/SearchBar.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/search/SearchBar.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/search/SearchBar.tsx",
                    lineNumber: 112,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/search/SearchBar.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/search/SearchBar.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(SearchBar, "sgFeQbxuck/0A6+hBDBhj/v+WEE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebounceCallback"]
    ];
});
_c = SearchBar;
var _c;
__turbopack_context__.k.register(_c, "SearchBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useBodyScrollLock.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBodyScrollLock",
    ()=>useBodyScrollLock
]);
/**
 * useBodyScrollLock - Hook to lock/unlock body scroll
 * Used in drawers, modals, and overlays
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useBodyScrollLock(isLocked) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useBodyScrollLock.useMemo": ()=>{
            if (typeof document !== 'undefined') {
                document.body.style.overflow = isLocked ? 'hidden' : 'unset';
            }
            return ({
                "useBodyScrollLock.useMemo": ()=>{
                    if (typeof document !== 'undefined') {
                        document.body.style.overflow = 'unset';
                    }
                }
            })["useBodyScrollLock.useMemo"];
        }
    }["useBodyScrollLock.useMemo"], [
        isLocked
    ]);
}
_s(useBodyScrollLock, "nwk+m61qLgjDVUp4IGV/072DDN4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/cart/CartDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartDrawer",
    ()=>CartDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useBodyScrollLock.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/AppProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * CartDrawer Component - Shopping cart slide-out drawer
 */ 'use client';
;
;
;
;
;
;
function CartDrawer({ isOpen, onClose, onCheckout }) {
    _s();
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    // Lock body scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBodyScrollLock"])(isOpen);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm",
                    onClick: onClose
                }, void 0, false, {
                    fileName: "[project]/components/cart/CartDrawer.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        x: '100%'
                    },
                    animate: {
                        x: 0
                    },
                    exit: {
                        x: '100%'
                    },
                    transition: {
                        type: 'spring',
                        damping: 25,
                        stiffness: 200
                    },
                    className: "fixed right-0 top-0 bottom-0 z-[101] w-full max-w-md bg-zinc-950 border-l border-zinc-800 flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/95 backdrop-blur-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                className: "text-purple-400",
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/components/cart/CartDrawer.tsx",
                                                lineNumber: 48,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                            lineNumber: 47,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-lg font-bold text-white",
                                                    children: "Your Cart"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                    lineNumber: 51,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-zinc-500",
                                                    children: [
                                                        cartCount,
                                                        " ",
                                                        cartCount === 1 ? 'item' : 'items'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                    lineNumber: 52,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                            lineNumber: 50,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/components/cart/CartDrawer.tsx",
                                        lineNumber: 56,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/cart/CartDrawer.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-5",
                            children: cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "h-full flex flex-col items-center justify-center text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-24 h-24 rounded-3xl bg-zinc-900 flex items-center justify-center mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                            className: "text-zinc-700",
                                            size: 48
                                        }, void 0, false, {
                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                            lineNumber: 64,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/cart/CartDrawer.tsx",
                                        lineNumber: 63,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-white mb-2",
                                        children: "Your cart is empty"
                                    }, void 0, false, {
                                        fileName: "[project]/components/cart/CartDrawer.tsx",
                                        lineNumber: 66,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-zinc-500 max-w-xs mb-6",
                                        children: "Looks like you haven't added any weird and wonderful items yet."
                                    }, void 0, false, {
                                        fileName: "[project]/components/cart/CartDrawer.tsx",
                                        lineNumber: 67,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "primary",
                                        onClick: onClose,
                                        children: "Start Shopping"
                                    }, void 0, false, {
                                        fileName: "[project]/components/cart/CartDrawer.tsx",
                                        lineNumber: 68,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/cart/CartDrawer.tsx",
                                lineNumber: 62,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: cart.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        transition: {
                                            delay: index * 0.05
                                        },
                                        className: "bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 group hover:border-zinc-700 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-20 h-20 bg-zinc-800 rounded-xl flex-shrink-0 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                        className: "text-zinc-600",
                                                        size: 24
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/cart/CartDrawer.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold text-white text-sm mb-1 truncate",
                                                            children: item.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                                            lineNumber: 85,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-zinc-500 mb-2",
                                                            children: item.priceType === 'unit_usd' ? 'One-time' : item.priceType === 'monthly_usd' ? 'Monthly' : 'Yearly'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                                            lineNumber: 86,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>updateQuantity(item.id, item.quantity - 1),
                                                                            className: "w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 flex items-center justify-center transition-colors",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                                size: 14
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/cart/CartDrawer.tsx",
                                                                                lineNumber: 92,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                                                            lineNumber: 91,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "w-8 text-center font-mono font-bold",
                                                                            children: item.quantity
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                                                            lineNumber: 94,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>updateQuantity(item.id, item.quantity + 1),
                                                                            className: "w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 flex items-center justify-center transition-colors",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                                size: 14
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/cart/CartDrawer.tsx",
                                                                                lineNumber: 96,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                                                            lineNumber: 95,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                                    lineNumber: 90,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono font-bold text-purple-400",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(item.price * item.quantity, item.priceType)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                                    lineNumber: 99,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                                            lineNumber: 89,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>removeFromCart(item.id),
                                                    className: "p-2 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/cart/CartDrawer.tsx",
                                                        lineNumber: 103,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                            lineNumber: 80,
                                            columnNumber: 23
                                        }, this)
                                    }, item.id, false, {
                                        fileName: "[project]/components/cart/CartDrawer.tsx",
                                        lineNumber: 73,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/cart/CartDrawer.tsx",
                                lineNumber: 71,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/cart/CartDrawer.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this),
                        cart.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-zinc-500",
                                                    children: "Subtotal"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white font-medium",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(cartTotal, 'unit_usd')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                            lineNumber: 115,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-zinc-500",
                                                    children: "Shipping"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-emerald-400 font-medium",
                                                    children: "Free"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                            lineNumber: 119,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between text-lg font-bold pt-2 border-t border-zinc-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white",
                                                    children: "Total"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white font-mono",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(cartTotal, 'unit_usd')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                            lineNumber: 123,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                    lineNumber: 114,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "primary",
                                    size: "lg",
                                    className: "w-full",
                                    onClick: onCheckout,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "mr-2",
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                            lineNumber: 129,
                                            columnNumber: 19
                                        }, this),
                                        "Proceed to Checkout",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "ml-2",
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/components/cart/CartDrawer.tsx",
                                            lineNumber: 131,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                    lineNumber: 128,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: clearCart,
                                    className: "w-full py-2 text-zinc-500 hover:text-red-400 text-sm transition-colors",
                                    children: "Clear Cart"
                                }, void 0, false, {
                                    fileName: "[project]/components/cart/CartDrawer.tsx",
                                    lineNumber: 133,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/cart/CartDrawer.tsx",
                            lineNumber: 113,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/cart/CartDrawer.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/cart/CartDrawer.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(CartDrawer, "KxRNM0ScY/mHvbvlYFfEwVx9MqA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBodyScrollLock"]
    ];
});
_c = CartDrawer;
var _c;
__turbopack_context__.k.register(_c, "CartDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/wishlist/WishlistDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WishlistDrawer",
    ()=>WishlistDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/AppProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/products.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__realProducts__as__PRODUCTS$3e$__ = __turbopack_context__.i("[project]/data/real-products.ts [app-client] (ecmascript) <export realProducts as PRODUCTS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useBodyScrollLock.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * WishlistDrawer Component - Wishlist slide-out drawer
 */ 'use client';
;
;
;
;
;
;
;
;
function WishlistDrawer({ isOpen, onClose }) {
    _s();
    const { wishlist, removeFromWishlist, addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const wishlistProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WishlistDrawer.useMemo[wishlistProducts]": ()=>{
            return wishlist.map({
                "WishlistDrawer.useMemo[wishlistProducts]": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__realProducts__as__PRODUCTS$3e$__["PRODUCTS"].find({
                        "WishlistDrawer.useMemo[wishlistProducts]": (p)=>p.id === id
                    }["WishlistDrawer.useMemo[wishlistProducts]"])
            }["WishlistDrawer.useMemo[wishlistProducts]"]).filter(Boolean);
        }
    }["WishlistDrawer.useMemo[wishlistProducts]"], [
        wishlist
    ]);
    // Lock body scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBodyScrollLock"])(isOpen);
    const handleAddAllToCart = ()=>{
        wishlistProducts.forEach((product)=>{
            if (product) addToCart(product);
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm",
                    onClick: onClose
                }, void 0, false, {
                    fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        x: '100%'
                    },
                    animate: {
                        x: 0
                    },
                    exit: {
                        x: '100%'
                    },
                    transition: {
                        type: 'spring',
                        damping: 25,
                        stiffness: 200
                    },
                    className: "fixed right-0 top-0 bottom-0 z-[101] w-full max-w-md bg-zinc-950 border-l border-zinc-800 flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/95 backdrop-blur-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                className: "text-pink-400",
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                lineNumber: 60,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                            lineNumber: 59,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-lg font-bold text-white",
                                                    children: "Your Wishlist"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                    lineNumber: 63,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-zinc-500",
                                                    children: [
                                                        wishlist.length,
                                                        " ",
                                                        wishlist.length === 1 ? 'item' : 'items'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                    lineNumber: 64,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                            lineNumber: 62,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                        lineNumber: 68,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-5",
                            children: wishlistProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "h-full flex flex-col items-center justify-center text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-24 h-24 rounded-3xl bg-zinc-900 flex items-center justify-center mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                            className: "text-zinc-700",
                                            size: 48
                                        }, void 0, false, {
                                            fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                            lineNumber: 76,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                        lineNumber: 75,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-white mb-2",
                                        children: "Your wishlist is empty"
                                    }, void 0, false, {
                                        fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                        lineNumber: 78,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-zinc-500 max-w-xs mb-6",
                                        children: "Save items you love to your wishlist and they'll be waiting for you."
                                    }, void 0, false, {
                                        fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                        lineNumber: 79,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "primary",
                                        onClick: onClose,
                                        children: "Explore Products"
                                    }, void 0, false, {
                                        fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                        lineNumber: 80,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                lineNumber: 74,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: wishlistProducts.map((product, index)=>{
                                    if (!product) return null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        transition: {
                                            delay: index * 0.05
                                        },
                                        className: "bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 group hover:border-zinc-700 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-20 h-20 bg-zinc-800 rounded-xl flex-shrink-0 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                        className: "text-zinc-600",
                                                        size: 24
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-bold text-white text-sm mb-1 truncate",
                                                            children: product.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-zinc-500 mb-2",
                                                            children: product.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                            lineNumber: 100,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-mono font-bold text-purple-400",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(product.price, product.priceType || "unit_usd")
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                            lineNumber: 101,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>addToCart(product),
                                                            disabled: !product.inStock,
                                                            className: "p-2 text-zinc-400 hover:text-white hover:bg-purple-500 rounded-lg transition-colors disabled:opacity-50",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                                lineNumber: 105,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                            lineNumber: 104,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>removeFromWishlist(product.id),
                                                            className: "p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                                lineNumber: 108,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                            lineNumber: 107,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                            lineNumber: 94,
                                            columnNumber: 25
                                        }, this)
                                    }, product.id, false, {
                                        fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                        lineNumber: 87,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                lineNumber: 83,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this),
                        wishlistProducts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "primary",
                                size: "lg",
                                className: "w-full",
                                onClick: handleAddAllToCart,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "mr-2",
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                        lineNumber: 122,
                                        columnNumber: 19
                                    }, this),
                                    "Add All to Cart"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                                lineNumber: 121,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                            lineNumber: 120,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/wishlist/WishlistDrawer.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(WishlistDrawer, "thTzU5CeFbxsIKx42nXVAGw4Fi0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBodyScrollLock"]
    ];
});
_c = WishlistDrawer;
var _c;
__turbopack_context__.k.register(_c, "WishlistDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/compare/CompareDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompareDrawer",
    ()=>CompareDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/AppProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/products.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__realProducts__as__PRODUCTS$3e$__ = __turbopack_context__.i("[project]/data/real-products.ts [app-client] (ecmascript) <export realProducts as PRODUCTS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useBodyScrollLock.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * CompareDrawer Component - Product comparison drawer
 */ 'use client';
;
;
;
;
;
;
;
function CompareDrawer({ isOpen, onClose }) {
    _s();
    const { compareList, removeFromCompare, addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const compareProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CompareDrawer.useMemo[compareProducts]": ()=>{
            return compareList.map({
                "CompareDrawer.useMemo[compareProducts]": (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__realProducts__as__PRODUCTS$3e$__["PRODUCTS"].find({
                        "CompareDrawer.useMemo[compareProducts]": (p)=>p.id === id
                    }["CompareDrawer.useMemo[compareProducts]"])
            }["CompareDrawer.useMemo[compareProducts]"]).filter(Boolean);
        }
    }["CompareDrawer.useMemo[compareProducts]"], [
        compareList
    ]);
    // Lock body scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBodyScrollLock"])(isOpen);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm",
                    onClick: onClose
                }, void 0, false, {
                    fileName: "[project]/components/compare/CompareDrawer.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        x: '100%'
                    },
                    animate: {
                        x: 0
                    },
                    exit: {
                        x: '100%'
                    },
                    transition: {
                        type: 'spring',
                        damping: 25,
                        stiffness: 200
                    },
                    className: "fixed right-0 top-0 bottom-0 z-[101] w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/95 backdrop-blur-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                                className: "text-purple-400",
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                lineNumber: 57,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/compare/CompareDrawer.tsx",
                                            lineNumber: 56,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-lg font-bold text-white",
                                                    children: "Compare Products"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                    lineNumber: 60,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-zinc-500",
                                                    children: [
                                                        compareList.length,
                                                        " ",
                                                        compareList.length === 1 ? 'item' : 'items'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                    lineNumber: 61,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/compare/CompareDrawer.tsx",
                                            lineNumber: 59,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/compare/CompareDrawer.tsx",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors",
                                    "aria-label": "Close compare",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                        lineNumber: 70,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/compare/CompareDrawer.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/compare/CompareDrawer.tsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-5",
                            children: compareProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "h-full flex flex-col items-center justify-center text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-24 h-24 rounded-3xl bg-zinc-900 flex items-center justify-center mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                            className: "text-zinc-700",
                                            size: 48
                                        }, void 0, false, {
                                            fileName: "[project]/components/compare/CompareDrawer.tsx",
                                            lineNumber: 83,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                        lineNumber: 82,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-white mb-2",
                                        children: "No items to compare"
                                    }, void 0, false, {
                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                        lineNumber: 85,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-zinc-500 max-w-xs mb-6",
                                        children: "Add products from the product cards to compare their features side by side."
                                    }, void 0, false, {
                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                        lineNumber: 86,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                lineNumber: 77,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-6",
                                children: compareProducts.map((product, index)=>{
                                    if (!product) return null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        transition: {
                                            delay: index * 0.05
                                        },
                                        className: "bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-b border-zinc-800 flex items-start justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600",
                                                                children: product.id
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                lineNumber: 106,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-white text-sm mt-1 truncate",
                                                                children: product.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                lineNumber: 109,
                                                                columnNumber: 29
                                                            }, this),
                                                            product.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1 text-emerald-500 mt-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                        size: 12
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                        lineNumber: 114,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-medium",
                                                                        children: "Verified"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                        lineNumber: 115,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                lineNumber: 113,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>removeFromCompare(product.id),
                                                        className: "p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2",
                                                        "aria-label": "Remove from compare",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 18
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                            lineNumber: 124,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                        lineNumber: 119,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                lineNumber: 104,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "aspect-square bg-zinc-800/50 flex items-center justify-center p-8",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                    className: "text-zinc-600",
                                                    size: 48
                                                }, void 0, false, {
                                                    fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                lineNumber: 129,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1",
                                                                children: "Price"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                lineNumber: 136,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-lg font-mono font-bold text-white",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(product.price, product.priceType || 'unit_usd')
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                lineNumber: 139,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1",
                                                                children: "Category"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                lineNumber: 145,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-zinc-400",
                                                                children: product.category
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                lineNumber: 148,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1",
                                                                children: "Tags"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                lineNumber: 152,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap gap-1",
                                                                children: product.tags.slice(0, 3).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400",
                                                                        children: tag
                                                                    }, tag, false, {
                                                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                        lineNumber: 157,
                                                                        columnNumber: 33
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                lineNumber: 155,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1",
                                                                children: "Description"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                lineNumber: 168,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-zinc-500 line-clamp-3",
                                                                children: product.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                        lineNumber: 167,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                lineNumber: 134,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-t border-zinc-800",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>addToCart(product),
                                                    disabled: !product.inStock,
                                                    className: "w-full py-3 bg-zinc-800 text-white font-bold text-sm rounded-xl hover:bg-purple-600 transition-colors disabled:opacity-50",
                                                    children: product.inStock ? 'Add to Cart' : 'Out of Stock'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                                lineNumber: 178,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, product.id, true, {
                                        fileName: "[project]/components/compare/CompareDrawer.tsx",
                                        lineNumber: 96,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/compare/CompareDrawer.tsx",
                                lineNumber: 91,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/compare/CompareDrawer.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/compare/CompareDrawer.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/compare/CompareDrawer.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(CompareDrawer, "Xzs/UoivJS14Rzeileeg8vU5e1g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBodyScrollLock"]
    ];
});
_c = CompareDrawer;
var _c;
__turbopack_context__.k.register(_c, "CompareDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/checkout/CheckoutFlow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckoutFlow",
    ()=>CheckoutFlow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/AppProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * CheckoutFlow Component - Multi-step checkout process (mock)
 */ 'use client';
;
;
;
;
;
;
function CheckoutFlow({ isOpen, onClose }) {
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('cart');
    const { cart, cartTotal, clearCart, PRODUCTS } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Get full product details
    const cartProducts = cart.map((item)=>({
            ...item,
            product: PRODUCTS.find((p)=>p.id === item.id)
        }));
    const handleNext = ()=>{
        if (step === 'cart') setStep('shipping');
        else if (step === 'shipping') setStep('payment');
        else if (step === 'payment') {
            setIsProcessing(true);
            setTimeout(()=>{
                setIsProcessing(false);
                setStep('complete');
                clearCart();
            }, 2000);
        }
    };
    const handleClose = ()=>{
        if (step === 'complete') {
            clearCart();
        }
        onClose();
        setStep('cart');
    };
    const steps = [
        {
            id: 'cart',
            label: 'Cart',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"]
        },
        {
            id: 'shipping',
            label: 'Shipping',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"]
        },
        {
            id: 'payment',
            label: 'Payment',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"]
        },
        {
            id: 'complete',
            label: 'Complete',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm",
                    onClick: handleClose
                }, void 0, false, {
                    fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        scale: 0.95
                    },
                    animate: {
                        opacity: 1,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        scale: 0.95
                    },
                    className: "fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[101] bg-zinc-900 border border-zinc-800 rounded-3xl md:w-full md:max-w-2xl md:max-h-[90vh] overflow-hidden flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/95 backdrop-blur-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-white",
                                    children: "Checkout"
                                }, void 0, false, {
                                    fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleClose,
                                    className: "p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                        lineNumber: 88,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 border-b border-zinc-800 bg-zinc-900/50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: steps.map((s, index)=>{
                                    const isCurrent = step === s.id;
                                    const isPast = steps.findIndex((x)=>x.id === step) > index;
                                    const Icon = s.icon;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-10 h-10 rounded-full flex items-center justify-center transition-colors', isPast && 'bg-purple-600 text-white', isCurrent && 'bg-purple-500 text-white ring-4 ring-purple-500/20', !isPast && !isCurrent && 'bg-zinc-800 text-zinc-600'),
                                                        children: isPast ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            size: 18
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 29
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            size: 18
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                            lineNumber: 114,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 103,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xs mt-2 font-medium transition-colors', isPast && 'text-zinc-400', isCurrent && 'text-white', !isPast && !isCurrent && 'text-zinc-600'),
                                                        children: s.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 117,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 102,
                                                columnNumber: 23
                                            }, this),
                                            index < steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-1 h-0.5 mx-2 transition-colors', isPast && 'bg-purple-600', !isPast && 'bg-zinc-800')
                                            }, void 0, false, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 129,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, s.id, true, {
                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                        lineNumber: 101,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                lineNumber: 94,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                children: [
                                    step === 'cart' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        exit: {
                                            opacity: 0,
                                            x: -20
                                        },
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-bold text-white",
                                                children: "Order Summary"
                                            }, void 0, false, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 155,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: cartProducts.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4 p-3 bg-zinc-800/50 rounded-xl",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                                    className: "text-zinc-600",
                                                                    size: 24
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                    lineNumber: 160,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 159,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "font-medium text-white text-sm truncate",
                                                                        children: item.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                        lineNumber: 163,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-zinc-500",
                                                                        children: [
                                                                            "Qty: ",
                                                                            item.quantity
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                        lineNumber: 164,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 162,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-mono font-bold text-purple-400",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(item.price * item.quantity, item.priceType)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 166,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 156,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6 p-4 bg-zinc-800/50 rounded-xl space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-zinc-500",
                                                                children: "Subtotal"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 175,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(cartTotal, 'unit_usd')
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 176,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 174,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-zinc-500",
                                                                children: "Shipping"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 179,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-emerald-400",
                                                                children: "Free"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 180,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-lg font-bold pt-2 border-t border-zinc-700",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white",
                                                                children: "Total"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 183,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(cartTotal, 'unit_usd')
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 184,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 173,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, "cart", true, {
                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                        lineNumber: 148,
                                        columnNumber: 19
                                    }, this),
                                    step === 'shipping' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        exit: {
                                            opacity: 0,
                                            x: -20
                                        },
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-bold text-white",
                                                children: "Shipping Address"
                                            }, void 0, false, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 199,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "First Name",
                                                        className: "px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "Last Name",
                                                        className: "px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 200,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Street Address",
                                                className: "w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 212,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "City",
                                                        className: "px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "ZIP Code",
                                                        className: "px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 217,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                placeholder: "Email Address",
                                                className: "w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 229,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, "shipping", true, {
                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                        lineNumber: 192,
                                        columnNumber: 19
                                    }, this),
                                    step === 'payment' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        exit: {
                                            opacity: 0,
                                            x: -20
                                        },
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-bold text-white",
                                                children: "Payment Method"
                                            }, void 0, false, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 246,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 bg-zinc-800/50 rounded-xl space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-emerald-400 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 249,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Secure 256-bit SSL encryption"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 250,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 248,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "Card Number",
                                                        className: "w-full px-4 py-3 bg-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                placeholder: "MM/YY",
                                                                className: "px-4 py-3 bg-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 259,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                placeholder: "CVC",
                                                                className: "px-4 py-3 bg-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                                lineNumber: 264,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "Cardholder Name",
                                                        className: "w-full px-4 py-3 bg-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 247,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, "payment", true, {
                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                        lineNumber: 239,
                                        columnNumber: 19
                                    }, this),
                                    step === 'complete' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            scale: 0.9
                                        },
                                        animate: {
                                            opacity: 1,
                                            scale: 1
                                        },
                                        className: "text-center py-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    className: "text-emerald-400",
                                                    size: 40
                                                }, void 0, false, {
                                                    fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 287,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-white mb-2",
                                                children: "Order Confirmed!"
                                            }, void 0, false, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 290,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-zinc-500 mb-6",
                                                children: "Thank you for your order. You'll receive a confirmation email shortly."
                                            }, void 0, false, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 291,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full text-sm text-zinc-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Your weird stuff is on the way!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                                lineNumber: 294,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, "complete", true, {
                                        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                        lineNumber: 281,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                lineNumber: 145,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 144,
                            columnNumber: 13
                        }, this),
                        step !== 'complete' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 border-t border-zinc-800 bg-zinc-900/50 flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "flex-1",
                                    onClick: ()=>{
                                        if (step === 'cart') handleClose();
                                        else if (step === 'shipping') setStep('cart');
                                        else if (step === 'payment') setStep('shipping');
                                    },
                                    children: "Back"
                                }, void 0, false, {
                                    fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 306,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "primary",
                                    className: "flex-1",
                                    onClick: handleNext,
                                    isLoading: isProcessing,
                                    children: [
                                        step === 'payment' ? 'Complete Order' : 'Continue',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "ml-2",
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                            lineNumber: 324,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                    lineNumber: 317,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 305,
                            columnNumber: 15
                        }, this),
                        step === 'complete' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 border-t border-zinc-800",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "primary",
                                className: "w-full",
                                onClick: handleClose,
                                children: "Continue Shopping"
                            }, void 0, false, {
                                fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                                lineNumber: 331,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                            lineNumber: 330,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/checkout/CheckoutFlow.tsx",
                    lineNumber: 75,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/checkout/CheckoutFlow.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(CheckoutFlow, "nYSrG6893yiXRfkcHV5vBi4O2Ao=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = CheckoutFlow;
var _c;
__turbopack_context__.k.register(_c, "CheckoutFlow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/gift-guides.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SpendThrone - Real Gift Guides
 * Curated lists of products for specific occasions/people
 */ __turbopack_context__.s([
    "giftGuides",
    ()=>giftGuides
]);
const giftGuides = [
    {
        id: 'gg-001',
        title: 'The Ultimate Techie Gift Guide 2026',
        slug: 'techie-gift-guide-2026',
        description: 'The latest and greatest gadgets for the person who always needs the newest tech. From smart diffusers to high-end noise canceling headphones.',
        image: '/images/guides/tech-guide.jpg',
        productIds: [
            'st-001',
            'st-002',
            'st-006',
            'st-009',
            'st-010'
        ]
    },
    {
        id: 'gg-002',
        title: 'Cool Stuff for Your Desk',
        slug: 'cool-desk-stuff',
        description: 'Transform your workspace with these unique desk accessories. Talking plants, e-ink frames, and retro Lego sets.',
        image: '/images/guides/desk-guide.jpg',
        productIds: [
            'st-005',
            'st-011',
            'st-016',
            'st-026',
            'st-027'
        ]
    },
    {
        id: 'gg-003',
        title: 'Gifts for the Modern Gamer',
        slug: 'modern-gamer-gifts',
        description: 'From retro arcade nostalgia to high-tech accessories, these gifts are perfect for the gamer in your life.',
        image: '/images/guides/gamer-guide.jpg',
        productIds: [
            'st-003',
            'st-018',
            'st-019',
            'st-026',
            'st-029'
        ]
    },
    {
        id: 'gg-004',
        title: 'Outdoor Adventure & Travel Essentials',
        slug: 'outdoor-adventure-travel',
        description: 'Be prepared for any adventure with portable pizza ovens, solar lanterns, and tech pouches.',
        image: '/images/guides/outdoor-guide.jpg',
        productIds: [
            'st-007',
            'st-020',
            'st-021',
            'st-030',
            'st-009'
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/AppProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$ProductGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/product/ProductGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$ProductModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/product/ProductModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$CategoryFilter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/product/CategoryFilter.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$search$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/search/SearchBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$cart$2f$CartDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/cart/CartDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$wishlist$2f$WishlistDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/wishlist/WishlistDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$compare$2f$CompareDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/compare/CompareDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$checkout$2f$CheckoutFlow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/checkout/CheckoutFlow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/real-products.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$gift$2d$guides$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/gift-guides.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useDebounce.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * Main Page - SpendThrone home page with full functionality
 */ 'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Inner component with access to context
function SpendThronePage() {
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('featured');
    const [showCart, setShowCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showWishlist, setShowWishlist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCompare, setShowCompare] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCheckout, setShowCheckout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedProduct, setSelectedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showSearchBar, setShowSearchBar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { cart, wishlist, compareList, cartTotal, addToRecentlyViewed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    // Debounce search query
    const debouncedSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebounce"])(searchQuery, 300);
    // Filter and sort products
    const filteredProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SpendThronePage.useMemo[filteredProducts]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realProducts"].filter({
                "SpendThronePage.useMemo[filteredProducts]": (product)=>{
                    // Search filter
                    const matchesSearch = !debouncedSearch || (product.name || '').toLowerCase().includes(debouncedSearch.toLowerCase()) || product.description.toLowerCase().includes(debouncedSearch.toLowerCase()) || product.tags.some({
                        "SpendThronePage.useMemo[filteredProducts]": (tag)=>tag.toLowerCase().includes(debouncedSearch.toLowerCase())
                    }["SpendThronePage.useMemo[filteredProducts]"]) || product.category.toLowerCase().includes(debouncedSearch.toLowerCase());
                    // Category filter
                    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
                    return matchesSearch && matchesCategory;
                }
            }["SpendThronePage.useMemo[filteredProducts]"]);
        }
    }["SpendThronePage.useMemo[filteredProducts]"], [
        debouncedSearch,
        selectedCategory
    ]);
    // Handle product inspection
    const handleInspect = (product)=>{
        setSelectedProduct(product);
        addToRecentlyViewed(product.id);
    };
    // Handle checkout
    const handleCheckout = ()=>{
        setShowCart(false);
        setShowCheckout(true);
    };
    const cartCount = cart.reduce((sum, item)=>sum + item.quantity, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-emerald-500/10 border-b border-emerald-500/30 py-3 px-4 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-emerald-400",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold uppercase tracking-wider",
                            children: "Live Inventory:"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-2 text-zinc-400",
                            children: "Discover and buy the most unique real-world products. Verified affiliate links included."
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 md:py-24 px-4 md:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                    size: 10,
                                    className: "fill-current"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                "The Sovereign Marketplace"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: 0.1
                            },
                            className: "text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9] uppercase italic",
                            children: [
                                "Discover ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400",
                                    children: "Weird"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 110,
                                    columnNumber: 22
                                }, this),
                                " & ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-amber-400 to-purple-400",
                                    children: "Extreme"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 23
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: 0.2
                            },
                            className: "text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-12 font-medium",
                            children: "The curated kingdom of the weirdest, most viral products on Earth. WTF-level technology for the modern age."
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        showSearchBar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: 0.3
                            },
                            className: "max-w-2xl mx-auto mb-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$search$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchBar"], {
                                value: searchQuery,
                                onChange: setSearchQuery,
                                onClear: ()=>setSearchQuery('')
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: 0.4
                            },
                            className: "mb-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$CategoryFilter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryFilter"], {
                                selectedCategory: selectedCategory,
                                onSelectCategory: setSelectedCategory
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: 0.5
                            },
                            className: "flex flex-wrap justify-center gap-6 mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-zinc-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            size: 16,
                                            className: "text-purple-400"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: [
                                                __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realProducts"].length,
                                                " Products"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 166,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-zinc-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "success",
                                        size: "sm",
                                        children: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$real$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realProducts"].filter((p)=>p.verified).length,
                                            " Verified"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 169,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-zinc-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                            size: 16,
                                            className: "text-pink-400"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: "Free Shipping"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 173,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: 0.6
                            },
                            className: "flex flex-wrap justify-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/guides",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "primary",
                                        className: "bg-zinc-900 border border-zinc-800 hover:border-purple-500 text-zinc-400 hover:text-white",
                                        children: "View Gift Guides"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, this),
                                !showSearchBar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setShowSearchBar(true),
                                    children: "Search Products"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-12 px-4 md:px-6 bg-zinc-900/20 border-y border-zinc-900",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold mb-8 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "text-purple-500"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this),
                                "Curated Gift Guides"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$gift$2d$guides$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["giftGuides"].map((guide)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/guides/${guide.slug}`,
                                    className: "group relative aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-purple-500/50 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 214,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-4 left-4 right-4 z-20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-white group-hover:text-purple-400 transition-colors",
                                                    children: guide.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-zinc-500 line-clamp-1",
                                                    children: guide.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, guide.id, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 213,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 206,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-12 px-4 md:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$ProductGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductGrid"], {
                        products: filteredProducts,
                        sortBy: sortBy,
                        onSortChange: setSortBy,
                        onInspect: handleInspect
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$cart$2f$CartDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartDrawer"], {
                isOpen: showCart,
                onClose: ()=>setShowCart(false),
                onCheckout: handleCheckout
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$wishlist$2f$WishlistDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WishlistDrawer"], {
                isOpen: showWishlist,
                onClose: ()=>setShowWishlist(false)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$compare$2f$CompareDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompareDrawer"], {
                isOpen: showCompare,
                onClose: ()=>setShowCompare(false)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$checkout$2f$CheckoutFlow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckoutFlow"], {
                isOpen: showCheckout,
                onClose: ()=>setShowCheckout(false)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$ProductModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductModal"], {
                product: selectedProduct,
                onClose: ()=>setSelectedProduct(null)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_s(SpendThronePage, "Rt2rAgv6TkTzGiq7mifNDKFUE8M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebounce"]
    ];
});
_c = SpendThronePage;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SpendThronePage, {}, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 270,
        columnNumber: 5
    }, this);
}
_c1 = Page;
var _c, _c1;
__turbopack_context__.k.register(_c, "SpendThronePage");
__turbopack_context__.k.register(_c1, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_d7d4bca6._.js.map