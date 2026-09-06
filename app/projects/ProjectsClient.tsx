"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, ExternalLink, Sparkles, Code2 } from "lucide-react";
import { IconMap } from "@/lib/icons";
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

interface ProjectsClientProps {
  projects: Project[];
  pageContent?: { title?: string; subtitle?: string } | null;
}

export default function ProjectsClient({ projects, pageContent }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Featured", "React Native", "TypeScript", "Next.js", "Node.js"];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Featured") return p.featured;
    return p.technologies?.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  return (
    <div className="container-custom py-8 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-medium backdrop-blur-md">
          <FolderOpen size={13} />
          Portfolio Showcase & Featured Systems
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          {pageContent?.title || 'Projects & Systems'}
        </h1>
        <p className="text-muted-foreground mt-2 text-base max-w-2xl leading-relaxed">
          {pageContent?.subtitle || 'A showcase of enterprise mobile platforms, offline-first architectures, and full-stack web solutions.'}
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground font-bold shadow-sm shadow-primary/20"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Featured Projects Spotlight */}
      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {featuredProjects.map((project: Project, index: number) => (
            <motion.div
              key={project._id || index}
              layout
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card p-6 sm:p-8 relative overflow-hidden group"
            >
              {/* Optional Cover Image */}
              {project.image && (
                <div className="mb-6 relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-border bg-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h2>
                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/30 text-primary font-mono text-xs rounded-full shrink-0 font-medium">
                    <Sparkles size={12} />
                    Featured Enterprise System
                  </span>
                )}
              </div>

              <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-muted/40 border border-border">
                  {project.metrics.map((metric: { label: string; value: string }, i: number) => (
                    <div key={i}>
                      <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider">
                        {metric.label}
                      </p>
                      <p className="text-primary font-bold text-base mt-0.5">{metric.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className="px-2.5 py-1 text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
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
                      className="px-4 py-2 bg-card hover:bg-muted/70 border border-border text-foreground text-xs font-mono rounded-xl hover:border-primary hover:text-primary transition-all flex items-center gap-2 shadow-sm active:scale-95"
                    >
                      <Icon size={14} className="text-primary" />
                      <span>{labelMap[link.type] || link.type}</span>
                    </TrackedLink>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Additional Projects */}
      {otherProjects.length > 0 && (
        <div className="pt-8 border-t border-border space-y-6">
          <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Code2 className="text-primary" size={22} />
            Additional Engineering Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherProjects.map((project: Project, index: number) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-3 border-t border-border">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.links && project.links.length > 0 && (
                    <div className="flex items-center gap-2 pt-1">
                      {project.links.map((link, i) => (
                        <TrackedLink
                          key={i}
                          href={link.url}
                          path="/projects"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-muted-foreground hover:text-primary flex items-center gap-1"
                        >
                          <ExternalLink size={12} />
                          <span className="capitalize">{link.type}</span>
                        </TrackedLink>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
