"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ExternalLink, RefreshCw, AlertCircle, Newspaper } from "lucide-react";
import { TrackedLink } from "@/components/ui/TrackedLink";

interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  thumbnail: string;
  description: string;
  categories: string[];
  guid: string;
}

interface ArticlesResponse {
  articles: MediumArticle[];
  cached: boolean;
  lastUpdated: string;
  error?: string;
}

export default function ArticlesClient() {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/medium-articles");
      const data: ArticlesResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch articles");
      }

      setArticles(data.articles || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const estimateReadTime = (text: string): number => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card animate-pulse p-6 rounded-2xl">
            <div className="w-full h-44 bg-muted/60 rounded-xl mb-4" />
            <div className="space-y-2.5">
              <div className="h-4 bg-muted/80 rounded w-1/3" />
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-3.5 bg-muted/60 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="glass-card text-center py-12 p-6 rounded-2xl">
        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
        <h3 className="text-foreground font-bold text-lg mb-1">Failed to Load Articles</h3>
        <p className="text-muted-foreground text-xs mb-4">{error}</p>
        <button
          onClick={fetchArticles}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl text-xs hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={14} />
          Try Again
        </button>
      </div>
    );
  }

  // Empty State
  if (articles.length === 0) {
    return (
      <div className="glass-card text-center py-16 rounded-2xl">
        <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-foreground font-bold text-lg mb-1">No Articles Published Yet</h3>
        <p className="text-muted-foreground text-xs font-mono">Check back soon for engineering deep dives and tutorials.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article, idx) => (
        <motion.div
          key={article.guid || idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.08 }}
        >
          <TrackedLink
            href={article.link}
            path="/articles"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card p-6 sm:p-7 flex flex-col justify-between h-full hover:border-primary/50 transition-all"
          >
            <div>
              {/* Full Article Cover Image */}
              {article.thumbnail && (
                <div className="mb-4 relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-border bg-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Meta header */}
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-primary" />
                  {formatDate(article.pubDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {estimateReadTime(article.description)} min read
                </span>
              </div>

              {/* Title */}
              <h2 className="text-foreground font-bold text-lg sm:text-xl leading-snug group-hover:text-primary transition-colors mb-3">
                {article.title}
              </h2>

              {/* Description */}
              <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                {article.description}
              </p>
            </div>

            {/* Categories & Link */}
            <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
              <div className="flex flex-wrap gap-1.5">
                {article.categories?.slice(0, 3).map((category, i) => (
                  <span key={i} className="text-[11px] font-mono text-secondary bg-secondary/10 border border-secondary/30 px-2.5 py-0.5 rounded-lg">
                    {category}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                Read Article <ExternalLink size={12} />
              </span>
            </div>
          </TrackedLink>
        </motion.div>
      ))}
    </div>
  );
}
