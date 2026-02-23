"use client";

import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { Star, BookOpen, Shield, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";

interface ApiService {
  id: string;
  name: string;
  description: string;
  category?: string;
  rating?: number;
  price_per_use?: number;
  priceType?: "per_call" | "monthly" | "free";
  price?: number;
  calls?: number;
  endpoint?: string;
  tags?: string[];
  capabilities?: string[];
  featured?: boolean;
  provider?: string;
  seller_wallet?: string;
}

interface ApiCardProps {
  service: ApiService;
  index?: number;
  featured?: boolean;
}

const ApiCard = memo(
  ({ service, index = 0, featured = false }: ApiCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const price = service.price_per_use ?? service.price ?? 0;
    const rating = service.rating ?? 0;
    const provider =
      service.provider ||
      service.seller_wallet?.substring(0, 10) + "..." ||
      "Unknown";
    const tags = service.tags || service.capabilities || [];
    const isFree = price === 0 || service.priceType === "free";

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{
          duration: 0.5,
          delay: Math.min(index * 0.08, 0.5),
          ease: [0.25, 0.1, 0.25, 1],
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`group relative bg-zinc-900/40 border border-zinc-800/50 rounded-2xl backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:bg-zinc-900/60 hover:border-purple-500/30 ${
          featured ? "ring-1 ring-yellow-500/20" : ""
        }`}
        style={{
          boxShadow: isHovered
            ? "0 20px 40px rgba(139, 92, 246, 0.15)"
            : "0 4px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative p-5 md:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg md:text-xl font-bold text-white truncate">
                  {service.name}
                </h3>
                {featured && (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full border border-yellow-500/30 shrink-0"
                  >
                    <Zap size={10} className="fill-current" />
                    Featured
                  </motion.span>
                )}
              </div>
              <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 3).map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="px-2 py-1 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-400 border border-zinc-700/50 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30 transition-colors duration-200 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
                {tags.length > 3 && (
                  <span className="px-2 py-1 rounded-md text-xs font-medium text-zinc-500">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Price Section */}
            <div className="text-right shrink-0">
              <div className="text-2xl md:text-3xl font-bold text-white">
                {isFree ? (
                  <span className="text-green-400">Free</span>
                ) : (
                  <>
                    <span className="text-sm align-top text-zinc-500">$</span>
                    {price.toFixed(3)}
                  </>
                )}
              </div>
              {!isFree && (
                <div className="text-xs text-zinc-500">
                  /{service.priceType === "monthly" ? "mo" : "call"}
                </div>
              )}
              <div className="flex items-center justify-end gap-1 mt-2 text-yellow-400">
                <Star size={14} className="fill-current" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-800/50 my-4" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <div className="p-1.5 rounded-lg bg-zinc-800/50">
                <Shield size={14} />
              </div>
              <span className="truncate max-w-[120px] md:max-w-[160px]">
                {provider}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                aria-label={`View documentation for ${service.name}`}
              >
                <BookOpen size={14} />
                <span className="hidden sm:inline">Docs</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label={`Try ${service.name}`}
              >
                <span>Try Now</span>
                <ExternalLink size={14} className="opacity-70" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);

ApiCard.displayName = "ApiCard";

export default ApiCard;
