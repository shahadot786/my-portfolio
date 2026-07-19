import { ExternalLink } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { IconMap } from "@/lib/icons";
import { getPageContent } from "@/lib/pages";
import { TrackedLink } from "@/components/ui/TrackedLink";

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

export const dynamic = "force-dynamic";

async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE_URL}/projects`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.projects;
}

export default async function ProjectsPage() {
  const [projects, pageContent] = await Promise.all([
    getProjects(),
    getPageContent('projects')
  ]);
  const featuredProjects = projects.filter((p: Project) => p.featured);
  const otherProjects = projects.filter((p: Project) => !p.featured);

  return (
    <div className="container-custom py-8 space-y-12">
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs font-medium mb-3">
          Portfolio Showcase & Featured Systems
        </span>
        <h1 className="text-4xl font-extrabold text-[#dde4dd] tracking-tight">{pageContent?.title || 'Projects'}</h1>
        <p className="text-[#bbcabf] mt-2 text-base max-w-xl leading-relaxed">
          {pageContent?.subtitle || 'A showcase of enterprise mobile platforms, offline-first architectures, and full-stack web solutions.'}
        </p>
      </div>

      {/* Featured Projects */}
      <div className="space-y-6">
        {featuredProjects.map((project: Project, index: number) => (
          <div key={index} className="glass-card p-6 sm:p-8 relative overflow-hidden group">
            {/* Optional Cover Image */}
            {project.image && (
              <div className="mb-6 relative w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-[#3c4a42] bg-[#09100c]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-bold text-[#dde4dd] group-hover:text-[#4edea3] transition-colors">
                {project.title}
              </h2>
              {project.featured && (
                <span className="px-3 py-1 bg-[#10b981]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs rounded-full shrink-0">
                  Featured System
                </span>
              )}
            </div>

            <p className="text-[#bbcabf] text-sm mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-[#09100c] border border-[#3c4a42]">
                {project.metrics.map((metric: { label: string; value: string }, i: number) => (
                  <div key={i}>
                    <p className="text-[#94A3B8] font-mono text-[10px] uppercase tracking-wider">
                      {metric.label}
                    </p>
                    <p className="text-[#4edea3] font-bold text-base mt-0.5">{metric.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.slice(0, 8).map((tech: string) => (
                <span key={tech} className="px-2.5 py-1 text-xs font-mono text-[#4edea3] bg-[#10b981]/10 border border-[#4edea3]/30 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-[#3c4a42]">
              {project.links.map((link: { type: string; url: string }, i: number) => {
                const Icon = IconMap[link.type === 'github' ? 'Github' : link.type === 'live' ? 'ExternalLink' : 'Smartphone'] || IconMap.Globe;
                const labelMap: Record<string, string> = {
                  github: 'GitHub Repository',
                  live: 'Live Platform',
                  appStore: 'App Store',
                  playStore: 'Play Store',
                  demo: 'Product Demo'
                };
                return (
                  <TrackedLink
                    key={i}
                    href={link.url}
                    path="/projects"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#1a211d] border border-[#3c4a42] text-[#dde4dd] text-xs font-mono rounded-lg hover:border-[#4edea3] hover:text-[#4edea3] transition-all flex items-center gap-2"
                  >
                    <Icon size={14} />
                    {labelMap[link.type] || link.type}
                  </TrackedLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div className="pt-8 border-t border-[#3c4a42] space-y-4">
          <h2 className="text-xl font-bold text-[#dde4dd] tracking-tight">Additional Projects</h2>
          <div className="grid grid-cols-1 gap-3">
            {otherProjects.map((project: Project, index: number) => (
              <TrackedLink
                key={index}
                href={project.links[0]?.url || "#"}
                path="/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center justify-between group hover:border-[#4edea3]/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#dde4dd] font-semibold text-sm group-hover:text-[#4edea3] transition-colors">
                    {project.title}
                  </span>
                  <span className="text-[#94A3B8] hidden sm:inline">—</span>
                  <span className="text-[#bbcabf] text-xs hidden sm:inline">
                    {project.description.slice(0, 70)}...
                  </span>
                </div>
                <ExternalLink
                  size={15}
                  className="text-[#94A3B8] group-hover:text-[#4edea3] transition-colors"
                />
              </TrackedLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
