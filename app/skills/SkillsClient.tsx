"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Cpu } from "lucide-react";
import { IconMap } from "@/lib/icons";

interface SkillCategory {
  _id: string;
  title: string;
  icon: string;
  skills: string[];
  order: number;
}

interface SkillsClientProps {
  skillCategories: SkillCategory[];
  pageContent?: { title?: string; subtitle?: string; badge?: string } | null;
}

export default function SkillsClient({ skillCategories, pageContent }: SkillsClientProps) {
  const [search, setSearch] = useState("");

  const filteredCategories = skillCategories.map(cat => {
    if (!search.trim()) return cat;
    const filteredSkills = cat.skills.filter(s => 
      s.toLowerCase().includes(search.toLowerCase())
    );
    return {
      ...cat,
      skills: filteredSkills
    };
  }).filter(cat => cat.skills.length > 0);

  const totalSkillsCount = skillCategories.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0);

  return (
    <div className="container-custom py-8 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-medium backdrop-blur-md">
              <Cpu size={13} />
              {pageContent?.badge || "Technical Stack & Competencies"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2">
              {pageContent?.title || 'Technical Skills'}
            </h1>
            <p className="text-muted-foreground mt-2 text-base max-w-2xl leading-relaxed">
              {pageContent?.subtitle || 'A comprehensive overview of technologies, frameworks, and architecture principles I work with daily.'}
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${totalSkillsCount} skills...`}
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-border bg-card/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredCategories.map((category: SkillCategory, index: number) => {
          const Icon = IconMap[category.icon] || IconMap.Code2;
          return (
            <motion.div
              key={category._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card p-6 sm:p-7 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 text-primary group-hover:scale-105 transition-transform">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h2>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {category.skills?.length || 0} Core Technologies
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(category.skills || []).map((skill: string) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-muted/60 dark:bg-card border border-border text-foreground font-mono text-xs rounded-xl hover:border-primary hover:text-primary transition-all cursor-default shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Engineering Philosophy Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-8 border-primary/30 bg-gradient-to-r from-primary/5 via-card to-secondary/5"
      >
        <div className="flex items-center gap-2 mb-3 text-primary">
          <Sparkles size={18} />
          <h3 className="text-lg font-bold text-foreground">Engineering Philosophy</h3>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-4xl">
          I build software prioritizing <span className="text-primary font-semibold">offline-first resilience</span>,{" "}
          <span className="text-primary font-semibold">modular architecture</span>, and{" "}
          <span className="text-primary font-semibold">frictionless user performance</span>. Every architectural
          decision is engineered for enterprise-scale reliability, continuous synchronization, and robust data integrity.
        </p>
      </motion.div>
    </div>
  );
}
