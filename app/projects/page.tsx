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
    <div className="container-custom py-4 space-y-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Featured Work & Systems
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">{pageContent?.title || 'Projects'}</h1>
        <p className="text-zinc-400 mt-2 text-base max-w-xl leading-relaxed">
          {pageContent?.subtitle || 'A showcase of enterprise mobile platforms, offline-first architectures, and full-stack web solutions.'}
        </p>
      </div>

      {/* Featured Projects */}
      <div className="space-y-6">
        {featuredProjects.map((project: Project, index: number) => (
          <div key={index} className="glass-card p-6 sm:p-8 relative overflow-hidden group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h2>
              {project.featured && (
                <span className="badge-primary shrink-0">
                  Featured System
                </span>
              )}
            </div>

            <p className="text-zinc-300 text-sm mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                {project.metrics.map((metric: { label: string; value: string }, i: number) => (
                  <div key={i}>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                      {metric.label}
                    </p>
                    <p className="text-emerald-400 font-bold text-base mt-0.5">{metric.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.slice(0, 8).map((tech: string) => (
                <span key={tech} className="px-2.5 py-1 text-xs font-semibold text-zinc-300 bg-zinc-800/60 border border-zinc-700/50 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-800/60">
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
                    className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-semibold rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:text-emerald-400 transition-all flex items-center gap-2"
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
        <div className="pt-8 border-t border-zinc-800/80 space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Additional Projects</h2>
          <div className="grid grid-cols-1 gap-3">
            {otherProjects.map((project: Project, index: number) => (
              <TrackedLink
                key={index}
                href={project.links[0]?.url || "#"}
                path="/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center justify-between group hover:border-emerald-500/40"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </span>
                  <span className="text-zinc-600 hidden sm:inline">—</span>
                  <span className="text-zinc-400 text-xs hidden sm:inline">
                    {project.description.slice(0, 70)}...
                  </span>
                </div>
                <ExternalLink
                  size={15}
                  className="text-zinc-500 group-hover:text-emerald-400 transition-colors"
                />
              </TrackedLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
