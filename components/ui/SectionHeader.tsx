"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  gradient?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  className,
  gradient = true,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-2 mb-8", className)}>
      <h2
        className={cn(
          "text-3xl font-bold",
          gradient &&
            "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent",
          !gradient && "text-white",
        )}
      >
        {title}
      </h2>
      {subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}
      <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
    </div>
  );
}
