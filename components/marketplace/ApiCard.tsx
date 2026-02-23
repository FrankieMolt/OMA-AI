"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Star, BookOpen, Shield } from "lucide-react";
import { ApiService } from "@/lib/mock-api-data";

interface ApiCardProps {
  service: ApiService;
  index: number;
}

const ApiCard = memo(({ service, index }: ApiCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: Math.min(index * 0.05, 0.5) }}
    className="glass-card p-6 rounded-xl"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
        <p className="text-sm text-zinc-400 mb-3">{service.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {service.tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right ml-4">
        <div className="text-2xl font-bold mb-1">
          {service.priceType === "free"
            ? "Free"
            : `$${service.price.toFixed(3)}`}
          {service.priceType !== "free" && service.priceType === "per_call" && (
            <span className="text-sm font-normal text-zinc-500">/call</span>
          )}
          {service.priceType === "monthly" && (
            <span className="text-sm font-normal text-zinc-500">/mo</span>
          )}
        </div>
        <div className="flex items-center justify-end gap-1 text-sm text-yellow-400">
          <Star className="w-4 h-4 fill-current" />
          {service.rating}
        </div>
        <div className="text-xs text-zinc-500 mt-1">
          {(service.calls / 1000).toFixed(0)}K calls/mo
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <Shield className="w-4 h-4" />
        <span>{service.provider}</span>
      </div>
      <div className="flex gap-2">
        <button
          className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition-colors"
          aria-label={`View documentation for ${service.name}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Docs</span>
        </button>
        <button
          className="btn-primary px-4 py-2 rounded-lg text-sm"
          aria-label={`Try ${service.name}`}
        >
          Try Now
        </button>
      </div>
    </div>
  </motion.div>
));

ApiCard.displayName = "ApiCard";

export default ApiCard;
