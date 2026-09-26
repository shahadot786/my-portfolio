import { API_BASE_URL } from "@/config/api";
import { getPageContent } from "@/lib/pages";
import SkillsClient from "./SkillsClient";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shahadot.dev";

export const revalidate = 86400; // Revalidate static cache every 24 hours

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getPageContent("skills");
  const title = pageContent?.title || "Technical Skills & Expertise";
  const description =
    pageContent?.subtitle ||
    "Full-stack technical skills of MD. Shahadot Hossain — React Native, TypeScript, Node.js, Next.js, GraphQL, and enterprise mobile architecture.";

  return {
    title,
    description,
    keywords: [
      "React Native Skills",
      "TypeScript Expert",
      "Node.js Developer Skills",
      "Next.js Developer",
      "Mobile Architecture Skills",
      "Full Stack Developer Bangladesh",
      "GraphQL Developer",
      "Software Engineer Skills",
    ],
    alternates: {
      canonical: `${SITE_URL}/skills/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/skills/`,
      type: "website",
    },
  };
}

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
