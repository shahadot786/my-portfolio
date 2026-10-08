"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, FlaskConical, Languages, ListChecks, Newspaper, Library, Target } from "lucide-react";
import { TrackersPanel } from "./TrackersPanel";

type Tab = "articles" | "guides" | "trackers";

const TABS: { id: Tab; label: string; icon: typeof Newspaper }[] = [
  { id: "articles", label: "Articles", icon: Newspaper },
  { id: "guides", label: "Guides", icon: Library },
  { id: "trackers", label: "Trackers", icon: Target },
];

const PMS_STATS = [
  { icon: BookOpen, label: "28 docs" },
  { icon: Languages, label: "Bangla + English" },
  { icon: ListChecks, label: "Quiz in every doc" },
  { icon: FlaskConical, label: "Hands-on mini PMS lab" },
];

const PMS_TOPICS = [
  { label: "Foundations & front office", doc: 1 },
  { label: "Rates, folio, payments & OTA", doc: 6 },
  { label: "API, data model & architecture", doc: 11 },
  { label: "Bangladesh & global market", doc: 16 },
  { label: "Revenue management & finance", doc: 20 },
  { label: "Testing, go-live & build lab", doc: 23 },
  { label: "AI, interviews & resources", doc: 26 },
];

export function ArticlesTabs({ articles }: { articles: React.ReactNode }) {
  const [tab, setTab] = useState<Tab>("articles");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "guides" || hash === "trackers") setTab(hash);
  }, []);

  const select = (next: Tab) => {
    setTab(next);
    window.history.replaceState(null, "", next === "articles" ? window.location.pathname : `#${next}`);
  };

  return (
    <div className="space-y-6">
      <div role="tablist" aria-label="Content type" className="inline-flex p-1 rounded-2xl border border-border bg-card/60">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            type="button"
            id={`tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`panel-${id}`}
            onClick={() => select(id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              tab === id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {tab === "articles" ? (
        <div role="tabpanel" id="panel-articles" aria-labelledby="tab-articles">
          {articles}
        </div>
      ) : tab === "trackers" ? (
        <div role="tabpanel" id="panel-trackers" aria-labelledby="tab-trackers">
          <TrackersPanel />
        </div>
      ) : (
        <motion.div
          role="tabpanel"
          id="panel-guides"
          aria-labelledby="tab-guides"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="/pms"
            className="group glass-card p-6 sm:p-8 flex flex-col gap-6 hover:border-primary/50"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="badge-primary">Free learning guide</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                  PMS Academy
                </h2>
                <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  A complete guide to hotel Property Management Systems, from front desk basics and reservations to
                  data models, architecture, revenue management, testing and a hands-on mini PMS you build yourself.
                </p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-primary shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>

            <ul className="flex flex-wrap gap-2">
              {PMS_STATS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border bg-muted/50 text-xs font-mono text-foreground"
                >
                  <Icon size={13} className="text-primary" />
                  {label}
                </li>
              ))}
            </ul>

            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary">
              Start reading <ArrowUpRight size={12} />
            </span>
          </a>

          <h3 className="mt-6 mb-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Jump to a topic</h3>
          <div className="flex flex-wrap gap-2">
            {PMS_TOPICS.map((topic) => (
              <a
                key={topic.doc}
                href={`/pms#d${topic.doc}`}
                className="px-3 py-1.5 rounded-xl border border-border bg-card/60 text-xs text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
              >
                {topic.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
