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
    const res = await fetch(`${API_BASE_URL}/pages/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.page;
  } catch (err) {
    console.error(`Failed to fetch page content for ${slug}`, err);
    return null;
  }
}
