"use client";

import { useState, useEffect } from "react";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <TrackedLink
          key={article.guid}
          href={article.link}
          path="/articles"
          target="_blank"
          rel="noopener noreferrer"
          className="group glass-card p-6 flex flex-col justify-between hover:border-[#4edea3] transition-all"
        >
          <div>
            {/* Full Article Cover Image */}
            {article.thumbnail && (
              <div className="mb-4 relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-[#3c4a42] bg-[#09100c]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}

            {/* Meta header */}
            <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-[#4edea3]" />
                {formatDate(article.pubDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {estimateReadTime(article.description)} min read
              </span>
            </div>

            {/* Title */}
            <h2 className="text-[#dde4dd] font-bold text-xl leading-snug group-hover:text-[#4edea3] transition-colors mb-3">
              {article.title}
            </h2>

            {/* Description */}
            <p className="text-[#bbcabf] text-sm line-clamp-3 leading-relaxed mb-6">
              {article.description}
            </p>
          </div>

          {/* Categories & Link */}
          <div className="flex items-center justify-between pt-4 border-t border-[#3c4a42] mt-auto">
            <div className="flex flex-wrap gap-1.5">
              {article.categories.slice(0, 3).map((category, i) => (
                <span key={i} className="text-xs font-mono text-[#4cd7f6] bg-[#03b5d3]/10 border border-[#4cd7f6]/30 px-2.5 py-1 rounded-md">
                  {category}
                </span>
              ))}
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#4edea3] group-hover:translate-x-1 transition-transform">
              Read <ExternalLink size={12} />
            </span>
          </div>
        </TrackedLink>
      ))}
    </div>
  );
}
