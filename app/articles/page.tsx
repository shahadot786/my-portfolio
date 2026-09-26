import ArticlesClient from "./ArticlesClient";
import { getPageContent } from "@/lib/pages";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shahadot.dev";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getPageContent("articles");
  const title = pageContent?.title || "Technical Writings";
  const description =
    pageContent?.subtitle ||
    "Deep dives into software architecture, scalable mobile systems, and engineering leadership by MD. Shahadot Hossain.";

  return {
    title,
    description,
    keywords: [
      "React Native Articles",
      "Mobile Development Blog",
      "TypeScript Tutorials",
      "Software Architecture",
      "Engineering Leadership",
      "Shahadot Hossain Blog",
      "Offline-first Development",
      "Next.js Articles",
    ],
    alternates: {
      canonical: `${SITE_URL}/articles/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/articles/`,
      type: "website",
    },
  };
}

export default async function ArticlesPage() {
  const pageContent = await getPageContent('articles');
  return (
    <div className="container-custom py-8 space-y-8">
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-medium mb-3">
          {pageContent?.badge || 'Insights, Guides & Engineering Stories'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">{pageContent?.title || 'Technical Writings'}</h1>
        <p className="text-muted-foreground mt-2 text-base max-w-xl leading-relaxed">
          {pageContent?.subtitle || 'Deep dives into software architecture, scalable mobile systems, and engineering leadership.'}
        </p>
      </div>

      <ArticlesClient />
    </div>
  );
}
