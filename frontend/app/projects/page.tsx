import { ExternalLink } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { IconMap } from "@/lib/icons";

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

async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE_URL}/projects`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.projects;
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featuredProjects = projects.filter((p: Project) => p.featured);
  const otherProjects = projects.filter((p: Project) => !p.featured);

  return (
    <div className="container-custom">
      <h1 className="text-3xl font-bold text-white mb-4">Projects</h1>
      <p className="text-zinc-400 mb-12 leading-relaxed">
        I have worked on a variety of projects over the years; some of them as a
        hobby, some as a proof of concept and others to solve my own pain
        points. Here are some of the projects that I have worked on.
      </p>

      {/* Featured Projects */}
      <div className="space-y-8 mb-16">
        {featuredProjects.map((project: Project, index: number) => (
          <div key={index} className="project-card">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {project.title}
                </h2>
              </div>
              {project.featured && (
                <span className="tag-highlight shrink-0">Featured</span>
              )}
            </div>

            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="flex flex-wrap gap-6 mb-4 py-3 border-y border-zinc-800">
                {project.metrics.map((metric: { label: string; value: string }, i: number) => (
                  <div key={i}>
                    <p className="text-zinc-500 text-xs uppercase tracking-wide">
                      {metric.label}
                    </p>
                    <p className="text-white font-medium">{metric.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 6).map((tech: string) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.links.map((link: { type: string; url: string }, i: number) => {
                const Icon = IconMap[link.type === 'github' ? 'Github' : link.type === 'live' ? 'ExternalLink' : 'Smartphone'] || IconMap.Globe;
                return (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost flex items-center gap-1.5"
                  >
                    <Icon size={16} />
                    {link.type.charAt(0).toUpperCase() + link.type.slice(1).replace(/([A-Z])/g, ' $1')}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div className="border-t border-zinc-800 pt-12">
          <h2 className="text-xl font-bold text-white mb-6">More Projects</h2>
          <div className="space-y-4">
            {otherProjects.map((project: Project, index: number) => (
              <a
                key={index}
                href={project.links[0]?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 
                           hover:border-primary/50 hover:bg-zinc-900/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium group-hover:text-zinc-100">
                    {project.title.toLowerCase().replace(/\s+/g, "-")}
                  </span>
                  <span className="text-zinc-600 hidden sm:inline">—</span>
                  <span className="text-zinc-500 text-sm hidden sm:inline">
                    {project.description.slice(0, 50)}...
                  </span>
                </div>
                <ExternalLink
                  size={16}
                  className="text-zinc-600 group-hover:text-zinc-400"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
