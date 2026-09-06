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
    // Poll live views every 30 seconds
    const interval = setInterval(fetchViews, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const formattedViews = data ? formatNumber(data.totalViews) : "...";

  if (variant === "footer") {
    return (
      <div className={`inline-flex items-center gap-2 text-xs font-mono text-muted-foreground bg-card/60 border border-border px-3 py-1.5 rounded-full ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <Eye size={13} className="text-primary" />
        <span>
          <strong className="text-foreground font-semibold">{formattedViews}</strong> Total Views
        </span>
      </div>
    );
  }

  if (variant === "badge") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-medium backdrop-blur-md ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <TrendingUp size={13} />
        <span>{formattedViews} Views</span>
      </div>
    );
  }

  // Default Pill
  return (
    <div
      title={data ? `${formatNumber(data.totalUnique)} Unique Visitors (${data.todayViews} Today)` : "Live Portfolio Views"}
      className={`inline-flex items-center gap-2 bg-card/60 border border-border px-3 py-1.5 rounded-full text-xs font-mono text-muted-foreground hover:border-primary/50 transition-all ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </span>
      <Eye size={13} className="text-primary shrink-0" />
      <span className="text-foreground font-bold font-mono">
        {loading ? "..." : formattedViews}
      </span>
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider hidden sm:inline">Views</span>
    </div>
  );
}
