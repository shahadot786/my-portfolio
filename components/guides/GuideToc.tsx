"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";
import type { TocItem } from "@/lib/guides/toc";

export function GuideToc({ items, variant }: { items: TocItem[]; variant: "inline" | "sidebar" }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  const list = (
    <ul className="space-y-1 border-l border-border text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "location" : undefined}
            className={`-ml-px block border-l py-1 transition-colors ${item.level === 3 ? "pl-6 text-xs" : "pl-3"} ${
              activeId === item.id
                ? "border-primary font-semibold text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === "inline") {
    return (
      <nav aria-label="Table of contents">
        <details className="glass-card p-4">
          <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-foreground">
            <ListTree size={16} className="text-primary" /> On this page
          </summary>
          <div className="mt-3">{list}</div>
        </details>
      </nav>
    );
  }

  return (
    <nav aria-label="Table of contents" className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        <ListTree size={14} className="text-primary" /> On this page
      </p>
      {list}
    </nav>
  );
}
