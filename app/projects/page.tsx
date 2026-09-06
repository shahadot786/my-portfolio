import { API_BASE_URL } from "@/config/api";
import { getPageContent } from "@/lib/pages";
import ProjectsClient from "./ProjectsClient";

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

export const revalidate = 86400; // Revalidate static cache every 24 hours

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
