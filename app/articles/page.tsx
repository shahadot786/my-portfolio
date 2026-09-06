import ArticlesClient from "./ArticlesClient";
import { getPageContent } from "@/lib/pages";

export const revalidate = 86400; // ISR revalidate every 24 hours (86400 seconds)

export default async function ArticlesPage() {
  const pageContent = await getPageContent('articles');
  return (
    <div className="container-custom py-8 space-y-8">
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-medium mb-3">
          Insights, Guides & Engineering Stories
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
