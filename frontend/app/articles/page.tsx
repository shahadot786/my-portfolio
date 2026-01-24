import { API_BASE_URL } from "@/config/api";
import { formatDate } from "@/lib/utils";
import { MoveRight, Clock, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Article {
  _id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  excerpt?: string;
  views: number;
  publishedAt?: string;
  createdAt: string;
}

async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${API_BASE_URL}/articles`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.articles;
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="container-custom">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Technical Writings</h1>
        <p className="text-zinc-400 leading-relaxed">
          Sharing my insights and experiences in software engineering,
          mobile development, and system architecture.
        </p>
      </div>

      <div className="space-y-6">
        {articles.length > 0 ? articles.map((article: Article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="block group"
          >
            <article className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/50 hover:bg-zinc-900/40 hover:border-zinc-800 transition-all">
              <div className="flex flex-col md:flex-row gap-6">
                {article.thumbnail && (
                  <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-zinc-800 relative">
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3 uppercase tracking-widest font-medium">
                    <span className="flex items-center gap-1"><Clock size={12} /> {formatDate(article.publishedAt || article.createdAt)}</span>
                    <span className="flex items-center gap-1"><Eye size={12} /> {article.views} views</span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </h2>

                  <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    Read Story
                    <MoveRight size={14} />
                  </div>
                </div>
              </div>
            </article>
          </Link>
        )) : (
          <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
            <p className="text-zinc-500">No articles published yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
