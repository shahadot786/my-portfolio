"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Award, 
  ExternalLink, 
  ShieldCheck, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2 
} from "lucide-react";

interface Experience {
  _id: string;
  company: string;
  companyUrl?: string;
  location: string;
  title: string;
  period: string;
  isCurrent: boolean;
  description?: string;
  achievements: string[];
  technologies: string[];
  order: number;
}

interface Education {
  _id: string;
  institution: string;
  degree: string;
  period: string;
  location?: string;
  highlights: string[];
}

interface Certificate {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
  verified: boolean;
}

interface WorkClientProps {
  experiences: Experience[];
  education: Education[];
  certificates: Certificate[];
  profile?: { yearsOfExperience?: string };
  pageContent?: { title?: string; subtitle?: string; badge?: string } | null;
}

export default function WorkClient({
  experiences,
  education,
  certificates,
  profile,
  pageContent
}: WorkClientProps) {
  const expYears = profile?.yearsOfExperience || "5+";

  return (
    <div className="container-custom py-8 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-medium backdrop-blur-md">
          <Briefcase size={13} />
          {pageContent?.badge || "Career Timeline & Professional Achievements"}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          {pageContent?.title || 'Employment History'}
        </h1>
        <p className="text-muted-foreground mt-2 text-base max-w-2xl leading-relaxed">
          {pageContent?.subtitle || `Over ${expYears} years building high-impact mobile platforms, offline-first architectures, and scalable cloud systems.`}
        </p>
      </motion.div>

      {/* Experience Timeline */}
      <div className="relative space-y-8 before:absolute before:inset-0 before:left-3 sm:before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-border before:to-transparent before:-z-10">
        {experiences.map((exp: Experience, index: number) => (
          <motion.div
            key={exp._id || index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 sm:pl-12"
          >
            {/* Timeline Node Indicator */}
            <div className="absolute left-1 sm:left-3 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-card border-2 border-primary shadow-[0_0_10px_rgba(78,222,163,0.5)] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>

            <div className="glass-card p-6 sm:p-8 relative overflow-hidden group">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
                    <MapPin size={12} className="text-primary" />
                    <span>{exp.location}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {exp.title}{" "}
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1 ml-1"
                      >
                        @ {exp.company}
                        <ExternalLink size={14} className="opacity-80" />
                      </a>
                    ) : (
                      <span className="text-primary ml-1">@ {exp.company}</span>
                    )}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground px-3 py-1 bg-muted/60 rounded-xl border border-border">
                    <Calendar size={12} />
                    {exp.period}
                  </span>
                  {exp.isCurrent && (
                    <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary font-mono text-xs rounded-full flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Current Role
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {exp.description && (
                <p className="text-muted-foreground text-sm sm:text-base mb-5 leading-relaxed">
                  {exp.description}
                </p>
              )}

              {/* Key Achievements */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="space-y-2.5 mb-6">
                  <p className="text-xs font-mono uppercase tracking-wider text-foreground font-bold">Key Architectural Impacts:</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-foreground/90 text-xs sm:text-sm"
                      >
                        <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {exp.technologies.map((tech: string) => (
                    <span key={tech} className="px-2.5 py-1 text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Higher Education Section */}
      {education.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 pt-6 border-t border-border"
        >
          <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2.5">
            <GraduationCap className="text-primary" size={24} />
            Academic Background
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {education.map((edu) => (
              <div key={edu._id} className="glass-card p-6 space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{edu.degree}</h3>
                    <p className="text-primary text-sm font-semibold">{edu.institution}</p>
                  </div>
                  <span className="text-muted-foreground font-mono text-xs px-2.5 py-1 bg-muted/60 rounded-lg border border-border shrink-0">
                    {edu.period}
                  </span>
                </div>
                <ul className="space-y-1.5 pt-2 border-t border-border">
                  {edu.highlights.map((h: string, i: number) => (
                    <li key={i} className="text-muted-foreground text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Certifications Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-primary/30 bg-gradient-to-r from-primary/10 via-card to-secondary/10"
      >
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-medium">
            <ShieldCheck size={14} />
            {certificates.length > 0 ? `${certificates.length} Verified Accreditations` : 'Verified Credentials'}
          </div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Technical Certifications</h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-xl">
            Explore industry-recognized cloud, mobile engineering, and software architecture credentials on the dedicated Certifications page.
          </p>
        </div>

        <Link
          href="/certifications"
          className="px-6 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-md shadow-primary/25 flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <Award size={18} />
          View Certifications
        </Link>
      </motion.div>
    </div>
  );
}
