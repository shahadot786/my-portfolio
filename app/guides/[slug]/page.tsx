import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { GuideMarkdown } from "@/components/guides/GuideMarkdown";
import { GuideToc } from "@/components/guides/GuideToc";
import { getPublishedGuide, getPublishedGuides } from "@/lib/guides/server";
import { extractToc } from "@/lib/guides/toc";
import { formatDate } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shahadot.dev";

export const revalidate = 3600;

// Pre-rendering (ISR) lets unknown or unpublished slugs answer with a real 404 status instead of a streamed soft 404
export async function generateStaticParams() {
  const guides = await getPublishedGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = await getPublishedGuide(params.slug);
  if (!guide) return { title: "Guide not found", robots: { index: false } };

  const url = `${SITE_URL}/guides/${guide.slug}`;
  const image = guide.coverImage || `${SITE_URL}/avatar.png`;

  return {
    title: guide.title,
    description: guide.summary,
    keywords: guide.tags,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.summary,
      url,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      tags: guide.tags,
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.summary, images: [image] },
  };
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const guide = await getPublishedGuide(params.slug);
  if (!guide) notFound();

  const toc = extractToc(guide.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: guide.title,
    description: guide.summary,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    keywords: guide.tags.join(", "),
    image: guide.coverImage || undefined,
    mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
    author: { "@type": "Person", name: "MD. Shahadot Hossain", url: SITE_URL },
  };

  return (
    <div className="container-custom py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/articles#guides" className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft size={14} /> Back to Knowledge Hub
      </Link>

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="min-w-0">
          <header className="mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-primary" />
                {formatDate(guide.publishedAt ?? guide.updatedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {guide.readingTime} min read
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{guide.title}</h1>
            {guide.summary && <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{guide.summary}</p>}
            {guide.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {guide.tags.map((tag) => (
                  <span key={tag} className="rounded-lg border border-secondary/30 bg-secondary/10 px-2.5 py-0.5 font-mono text-xs text-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="xl:hidden mb-8">
            <GuideToc items={toc} variant="inline" />
          </div>

          <div className="glass-card p-5 sm:p-8">
            <GuideMarkdown content={guide.content} />
          </div>
        </article>

        <aside className="hidden xl:block">
          <GuideToc items={toc} variant="sidebar" />
        </aside>
      </div>
    </div>
  );
}
