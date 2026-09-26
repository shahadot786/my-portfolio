import { API_BASE_URL } from "@/config/api";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 86400; // 24 Hours ISR

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shahadot.dev";

async function getArticle(slug: string) {
  const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.article;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Article Not Found" };

  const title = article.title;
  const description =
    article.excerpt || article.summary || `${article.title} – read the full article on shahadot.dev`;
  const thumbnailUrl = article.thumbnail || `${SITE_URL}/avatar.png`;
  const canonicalUrl = `${SITE_URL}/articles/${params.slug}/`;
  const publishedTime = article.publishedAt || article.createdAt;
  const modifiedTime = article.updatedAt || publishedTime;

  return {
    title,
    description,
    keywords: article.categories || [],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [article.author?.name || "MD. Shahadot Hossain"],
      tags: article.categories || [],
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [thumbnailUrl],
    },
  };
}

export default async function ArticleDetail({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/articles/${params.slug}/`;
  const publishedTime = article.publishedAt || article.createdAt;
  const modifiedTime = article.updatedAt || publishedTime;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description:
      article.excerpt || article.summary || article.title,
    image: article.thumbnail ? [article.thumbnail] : [`${SITE_URL}/avatar.png`],
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      "@type": "Person",
      name: article.author?.name || "MD. Shahadot Hossain",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "MD. Shahadot Hossain",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/avatar.png`,
      },
    },
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: (article.categories || []).join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `${SITE_URL}/articles/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="container-custom">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
                priority
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
