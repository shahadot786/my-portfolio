import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { GuideSummary } from "@/lib/guides/types";

export function GuideCard({ guide }: { guide: GuideSummary }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group glass-card flex h-full flex-col justify-between gap-5 p-6 hover:border-primary/50"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-primary" />
            {formatDate(guide.publishedAt ?? guide.updatedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {guide.readingTime} min read
          </span>
        </div>
        <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
          {guide.title}
        </h3>
        {guide.summary && <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{guide.summary}</p>}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex flex-wrap gap-1.5">
          {guide.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-lg border border-secondary/30 bg-secondary/10 px-2.5 py-0.5 font-mono text-xs text-secondary">
              {tag}
            </span>
          ))}
        </div>
        <span className="ml-2 inline-flex shrink-0 items-center gap-1 font-mono text-xs font-bold text-primary transition-transform group-hover:translate-x-1">
          Read <ArrowUpRight size={12} />
        </span>
      </div>
    </Link>
  );
}
