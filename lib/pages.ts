import { API_BASE_URL } from '@/config/api';

export interface PageContent {
  slug: string;
  title: string;
  subtitle: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export async function getPageContent(slug: string): Promise<PageContent | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/pages/${slug}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.page;
  } catch {
    return null;
  }
}
