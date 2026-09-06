"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  name?: string;
  tagline?: string;
}

export function BrandLogo({ size = "md", showTagline = false, className = "", name, tagline }: BrandLogoProps) {
  const isSm = size === "sm";
  const isLg = size === "lg";

  const displayName = name || "Shahadot Hossain";
  const displayTagline = tagline || "Software Architect";

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 sm:gap-3 group shrink-0 ${className}`}>
      {/* Icon Badge */}
      <div
        className={`relative rounded-xl bg-[#10b981]/10 border border-[#4edea3]/30 flex items-center justify-center text-[#4edea3] transition-all duration-300 group-hover:scale-105 group-hover:border-[#4edea3] group-hover:shadow-[0_0_15px_rgba(78,222,163,0.25)] shrink-0 ${
          isSm ? "w-8 h-8 rounded-lg" : isLg ? "w-11 h-11" : "w-9 h-9"
        }`}
      >
        <Terminal size={isSm ? 16 : isLg ? 20 : 18} className="text-[#4edea3]" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3] animate-pulse" />
      </div>

      {/* Typography */}
      <div className="flex flex-col shrink-0">
        <span
          className={`font-signature font-normal text-foreground group-hover:text-primary transition-colors leading-none whitespace-nowrap drop-shadow-[0_0_8px_rgba(78,222,163,0.25)] ${
            isSm ? "text-xl sm:text-2xl" : isLg ? "text-3xl xl:text-4xl" : "text-2xl xl:text-3xl"
          }`}
        >
          {displayName}
        </span>
        {showTagline && (
          <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mt-0.5 whitespace-nowrap">
            {displayTagline}
          </span>
        )}
      </div>
    </Link>
  );
}


