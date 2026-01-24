import ArticlesClient from "./ArticlesClient";
import { getPageContent } from "@/lib/pages";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const pageContent = await getPageContent('articles');
  return (
    <div className="container-custom">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">{pageContent?.title || 'Technical Writings'}</h1>
        <p className="text-zinc-400 leading-relaxed">
          {pageContent?.subtitle || 'Sharing my insights and experiences in software engineering.'}
        </p>
      </div>

      <ArticlesClient />
    </div>
  );
}
