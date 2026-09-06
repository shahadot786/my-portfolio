import { API_BASE_URL } from "@/config/api";
import { getPageContent } from "@/lib/pages";
import SkillsClient from "./SkillsClient";

export const revalidate = 86400; // Revalidate static cache every 24 hours

interface SkillCategory {
  _id: string;
  title: string;
  icon: string;
  skills: string[];
  order: number;
}

async function getSkillCategories(): Promise<SkillCategory[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/skills`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.skills || [];
  } catch {
    return [];
  }
}

export default async function SkillsPage() {
  const [skillCategories, pageContent] = await Promise.all([
    getSkillCategories(),
    getPageContent('skills')
  ]);

  return (
    <SkillsClient
      skillCategories={skillCategories}
      pageContent={pageContent}
    />
  );
}
