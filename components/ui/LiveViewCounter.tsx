"use client";

import { useEffect, useState } from "react";
import { Eye, TrendingUp } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

interface ViewsData {
  totalViews: number;
  totalUnique: number;
  todayViews: number;
}

interface LiveViewCounterProps {
  variant?: "pill" | "footer" | "badge";
  className?: string;
}

export function LiveViewCounter({ variant = "pill", className = "" }: LiveViewCounterProps) {
  const [data, setData] = useState<ViewsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchViews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/analytics/views`, {
        cache: "no-store"
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setData({
            totalViews: json.totalViews || 0,
            totalUnique: json.totalUnique || 0,
            todayViews: json.todayViews || 0
          });
        }
      }
    } catch (err) {
      console.error("Failed to fetch live view count", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViews();
    // Poll live views every 30 seconds to keep it always updated
    const interval = setInterval(fetchViews, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const formattedViews = data ? formatNumber(data.totalViews) : "...";

  if (variant === "footer") {
    return (
      <div className={`inline-flex items-center gap-2 text-xs font-mono text-[#94A3B8] bg-[#0e1511] border border-[#3c4a42]/60 px-3 py-1.5 rounded-full ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
        </span>
        <Eye size={13} className="text-[#4edea3]" />
        <span>
          <strong className="text-[#dde4dd] font-semibold">{formattedViews}</strong> Total Views
        </span>
      </div>
    );
  }

  if (variant === "badge") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs font-medium ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
        </span>
        <TrendingUp size={13} />
        <span>{formattedViews} Portfolio Views</span>
      </div>
    );
  }

  // Default Pill for Navigation
  return (
    <div
      title={data ? `${formatNumber(data.totalUnique)} Unique Visitors (${data.todayViews} Today)` : "Live Portfolio Views"}
      className={`inline-flex items-center gap-2 bg-[#16201a] border border-[#3c4a42] px-3 py-1.5 rounded-full text-xs font-mono text-[#bbcabf] hover:border-[#4edea3]/50 transition-all ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
      </span>
      <Eye size={13} className="text-[#4edea3] shrink-0" />
      <span className="text-[#dde4dd] font-bold font-mono">
        {loading ? "..." : formattedViews}
      </span>
      <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider hidden sm:inline">Views</span>
    </div>
  );
}
