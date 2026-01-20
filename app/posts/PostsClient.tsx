"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, ExternalLink, RefreshCw, AlertCircle, Newspaper } from "lucide-react";
import Image from "next/image";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  thumbnail: string;
  description: string;
  categories: string[];
  guid: string;
}

interface PostsResponse {
  posts: MediumPost[];
  cached: boolean;
  lastUpdated: string;
  error?: string;
}

export default function PostsClient() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/medium-posts");
      const data: PostsResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch posts");
      }

      setPosts(data.posts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
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
          <div key={i} className="card animate-pulse">
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
      <div className="card text-center py-12">
        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
        <h3 className="text-white font-medium mb-2">Failed to Load Posts</h3>
        <p className="text-zinc-400 text-sm mb-4">{error}</p>
        <button onClick={fetchPosts} className="btn-secondary inline-flex items-center gap-2">
          <RefreshCw size={14} />
          Try Again
        </button>
      </div>
    );
  }

  // Empty State
  if (posts.length === 0) {
    return (
      <div className="card text-center py-12">
        <Newspaper className="w-10 h-10 text-zinc-500 mx-auto mb-4" />
        <h3 className="text-white font-medium mb-2">No Posts Yet</h3>
        <p className="text-zinc-400 text-sm">Check back soon for new articles.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <a
          key={post.guid}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="card group flex gap-4 hover:border-zinc-600"
        >
          {/* Thumbnail */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
            {post.thumbnail ? (
              <Image
                src={post.thumbnail}
                alt={post.title}
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
          <div className="flex-1 min-w-0">
            {/* Categories */}
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {post.categories.slice(0, 2).map((category, i) => (
                  <span key={i} className="tag text-[10px]">
                    {category}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h3 className="text-white font-medium text-sm md:text-base line-clamp-2 group-hover:text-green-400 transition-colors mb-2">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-zinc-400 text-xs md:text-sm line-clamp-2 mb-3">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 text-[10px] md:text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(post.pubDate)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {estimateReadTime(post.description)} min read
              </span>
              <ExternalLink size={12} className="ml-auto text-zinc-600 group-hover:text-green-400 transition-colors" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
