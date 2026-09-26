import { API_BASE_URL } from "@/config/api";
import { getPageContent } from "@/lib/pages";
import ProjectsClient from "./ProjectsClient";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shahadot.dev";

export const revalidate = 86400; // Revalidate static cache every 24 hours

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getPageContent("projects");
  const title = pageContent?.title || "Projects & Case Studies";
  const description =
    pageContent?.subtitle ||
    "Portfolio of software projects by MD. Shahadot Hossain — including enterprise React Native apps, full-stack web platforms, and open-source tools.";

  return {
    title,
    description,
    keywords: [
      "Shahadot Hossain Projects",
      "React Native Portfolio",
      "Mobile App Case Studies",
      "Full Stack Projects Bangladesh",
      "Open Source Mobile Apps",
      "Enterprise App Portfolio",
      "Software Engineer Projects",
    ],
    alternates: {
      canonical: `${SITE_URL}/projects/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/projects/`,
      type: "website",
    },
  };
}

interface Project {
  _id: string;
  title: string;
  description: string;
  featured: boolean;
  order: number;
  image?: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  links: { type: string; url: string }[];
}

async function getProjects(): Promise<Project[]> {

  try {
    const res = await fetch(`${API_BASE_URL}/projects`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.projects || [];
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const [projects, pageContent] = await Promise.all([
    getProjects(),
    getPageContent('projects')
  ]);

  return (
    <ProjectsClient
      projects={projects}
      pageContent={pageContent}
    />
  );
}
