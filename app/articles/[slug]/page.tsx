import { API_BASE_URL } from "@/config/api";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getArticle(slug: string) {
  const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.article;
}

export default async function ArticleDetail({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container-custom">
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Articles
      </Link>

      <article className="max-w-none">
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-500 mb-6 uppercase tracking-widest font-medium">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(article.publishedAt || article.createdAt)}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> 5 min read</span>
            <span className="flex items-center gap-1.5"><User size={14} /> {article.author?.name}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-[1.1]">
            {article.title}
          </h1>

          {article.thumbnail && (
            <div className="aspect-[21/9] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 mb-12 relative">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-zinc max-w-none 
          prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
          prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-lg
          prose-strong:text-white prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-3xl prose-img:border prose-img:border-zinc-800
          prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <footer className="mt-16 pt-8 border-t border-zinc-900 flex flex-wrap gap-2">
          {article.categories.map((cat: string) => (
            <span key={cat} className="tag py-1.5 px-3">
              #{cat.toLowerCase()}
            </span>
          ))}
        </footer>
      </article>
    </div>
  );
}
