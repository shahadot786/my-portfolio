"use client";

import { useEffect, useState } from "react";
import { guidesClient } from "@/lib/guides/client";
import type { GuideSummary } from "@/lib/guides/types";
import { GuideCard } from "./GuideCard";

export function GuidesList() {
  const [guides, setGuides] = useState<GuideSummary[] | null>(null);

  useEffect(() => {
    guidesClient.listPublished().then(setGuides).catch(() => setGuides([]));
  }, []);

  if (guides === null) {
    return (
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className="glass-card h-44 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!guides.length) return null;

  return (
    <>
      <h3 className="mb-3 mt-8 font-mono text-xs uppercase tracking-wider text-muted-foreground">All guides</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <GuideCard key={guide._id} guide={guide} />
        ))}
      </div>
    </>
  );
}
