"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, ExternalLink, RefreshCw, AlertCircle, Newspaper } from "lucide-react";
import Image from "next/image";
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

      setArticles(data.articles);
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

  const estimateReadTime = (description: string): number => {
    const wordsPerMinute = 200;
    const words = description.split(/\s+/).length;
    return Math.max(3, Math.ceil((words * 5) / wordsPerMinute));
  };

  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card animate-pulse border border-zinc-800 p-6 rounded-2xl bg-zinc-950/50">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-zinc-800 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-zinc-800 rounded w-3/4" />
                <div className="h-4 bg-zinc-800 rounded w-full" />
                <div className="h-4 bg-zinc-800 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="card text-center py-12 border border-zinc-800 rounded-2xl bg-zinc-950/20">
        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
        <h3 className="text-white font-medium mb-2">Failed to Load Articles</h3>
        <p className="text-zinc-400 text-sm mb-4">{error}</p>
        <button onClick={fetchArticles} className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-white transition-colors">
          <RefreshCw size={14} />
          Try Again
        </button>
      </div>
    );
  }

  // Empty State
  if (articles.length === 0) {
    return (
      <div className="card text-center py-12 border border-zinc-800 rounded-2xl bg-zinc-950/20">
        <Newspaper className="w-10 h-10 text-zinc-500 mx-auto mb-4" />
        <h3 className="text-white font-medium mb-2">No Articles Yet</h3>
        <p className="text-zinc-400 text-sm">Check back soon for new articles.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <TrackedLink
          key={article.guid}
          href={article.link}
          path="/articles"
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-4 rounded-2xl border border-zinc-900 bg-zinc-950/50 hover:bg-zinc-900/40 hover:border-zinc-800 transition-all"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnail */}
            <div className="relative w-full md:w-32 h-32 md:h-32 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-800">
              {article.thumbnail ? (
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Newspaper className="w-8 h-8 text-zinc-600" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              {/* Categories */}
              {article.categories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {article.categories.slice(0, 2).map((category, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">
                      {category}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h3 className="text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors mb-2">
                {article.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed mb-3">
                {article.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium uppercase tracking-wide">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {formatDate(article.pubDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {estimateReadTime(article.description)} min read
                </span>
                <span className="flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform ml-auto">
                  Read Story <ExternalLink size={12} />
                </span>
              </div>
            </div>
          </div>
        </TrackedLink>
      ))}
    </div>
  );
}
