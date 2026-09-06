"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ExternalLink, 
  Quote,
  Smartphone,
  Zap
} from "lucide-react";
import { LiveViewCounter } from "@/components/ui/LiveViewCounter";
import { ResumeViewer } from "@/components/ui/ResumeViewer";

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface Profile {
  name: string;
  title: string;
  yearsOfExperience?: string;
  avatar?: string;
  resumeUrl?: string;
  availabilityBadge?: string;
  isAvailable?: boolean;
  bio: string[];
  socialLinks: SocialLink[];
}

interface Metric {
  label: string;
  value: string;
}

interface ExpertiseItem {
  _id: string;
  title: string;
  badge: string;
  description: string;
  isFeatured: boolean;
  metrics?: Metric[];
  tags?: string[];
  order: number;
}

interface Testimonial {
  _id: string;
  name: string;
  title: string;
  content: string;
  image?: string;
  url?: string;
  featured: boolean;
}

interface HomeClientProps {
  profile: Profile;
  testimonials: Testimonial[];
  expertiseItems: ExpertiseItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export function HomeClient({ profile, testimonials, expertiseItems }: HomeClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const featuredItem = expertiseItems.find(e => e.isFeatured) || expertiseItems[0];
  const secondaryItems = expertiseItems.filter(e => e._id !== featuredItem?._id && e.title !== featuredItem?.title);

  const allTags = Array.from(
    new Set(expertiseItems.flatMap((e) => e.tags || []))
  );

  const filteredSecondaryItems = selectedTag
    ? secondaryItems.filter(item => item.tags?.includes(selectedTag))
    : secondaryItems;

  const experienceDisplay = profile.yearsOfExperience
    ? (profile.yearsOfExperience.toLowerCase().includes("year")
        ? profile.yearsOfExperience
        : `${profile.yearsOfExperience} Years`)
    : "5+ Years";

  const keyStats = [
    { label: "Experience", value: experienceDisplay, sub: "Enterprise Mobile & Web" },
    { label: "Daily Transactions", value: "100K+", sub: "High-Throughput Systems" },
    { label: "Active Users", value: "10K+", sub: "Offline-First Architectures" },
    { label: "Enterprise Clients", value: "Fortune 500", sub: "Unilever, BAT, Nestlé, Nagad" },
  ];

  return (
    <div className="container-custom pb-16 space-y-24 relative">
      {/* Ambient Radial Background Glows */}
      <div className="fixed top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 dark:bg-primary/5 blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-secondary/10 dark:bg-secondary/5 blur-[140px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-4"
      >
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            {/* Availability Badge & Live Visitor Counter */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              {profile.isAvailable !== false && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-medium backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span>{profile.availabilityBadge || "Available for new opportunities"}</span>
                </div>
              )}
              <LiveViewCounter variant="badge" />
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-foreground"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
                {profile.name}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2 
              variants={itemVariants}
              className="text-lg sm:text-xl font-medium text-muted-foreground flex items-center gap-2"
            >
              <Smartphone className="w-5 h-5 text-primary shrink-0" />
              {profile.title}
            </motion.h2>
          </div>

          {/* Bio paragraphs with styled emphasis tokens */}
          <motion.div variants={itemVariants} className="space-y-3 text-muted-foreground leading-relaxed text-base">
            {profile.bio.map((para: string, i: number) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: para.replace(
                    /(React Native|JavaScript|React\.js|Next\.js|TypeScript|Node\.js|MongoDB|PostgreSQL|Unilever|BAT|Nestlé|Nagad|offline-first architecture|10,000\+ users|100,000\+ daily transactions|\d+\+?\s*years?)/gi,
                    '<span class="text-primary font-semibold bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">$1</span>',
                  ),
                }}
              />
            ))}
          </motion.div>

          {/* CTA & Actions */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href="/contact"
              className="px-6 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-md shadow-primary/25 flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 bg-card border border-border text-foreground font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm"
            >
              Explore Projects
            </Link>
            <ResumeViewer resumeUrl={profile.resumeUrl} />
          </motion.div>
        </div>

        {/* Hero Photo / Avatar with Ambient Ring */}
        <motion.div 
          variants={itemVariants}
          className="relative group/avatar shrink-0"
        >
          <div className="relative p-1.5 rounded-3xl overflow-hidden bg-gradient-to-tr from-primary/30 via-secondary/20 to-primary/50 shadow-2xl">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-[22px] overflow-hidden bg-card">
              <Image
                src={profile.avatar || "/avatar.png"}
                alt={profile.name}
                fill
                className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

          {/* Floating Badge on Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-3 -left-3 bg-card/90 border border-border/80 backdrop-blur-xl px-3.5 py-1.5 rounded-2xl shadow-lg flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono font-bold text-foreground">Offline-First Architect</span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Enterprise Key Stats Strip */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-card/60 border border-border shadow-sm backdrop-blur-md"
      >
        {keyStats.map((stat, idx) => (
          <div key={idx} className="space-y-1 p-2">
            <p className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-baseline gap-1">
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                {stat.value}
              </span>
            </p>
            <p className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">{stat.label}</p>
            <p className="text-[11px] text-muted-foreground">{stat.sub}</p>
          </div>
        ))}
      </motion.section>

      {/* Technical Expertise (Dynamic Bento Grid) */}
      {expertiseItems.length > 0 && (
        <section className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">Architecture & Solutions</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
                Technical Expertise
              </h3>
            </div>
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-mono transition-all ${
                    selectedTag === null
                      ? "bg-primary text-primary-foreground font-bold"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>
                {allTags.slice(0, 5).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-mono transition-all ${
                      selectedTag === tag
                        ? "bg-primary text-primary-foreground font-bold"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Featured Top Card (Bento Spotlight) */}
          {featuredItem && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 sm:p-8 space-y-6 relative overflow-hidden group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="text-primary text-lg font-extrabold font-mono">
                      {featuredItem.badge || "01"}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {featuredItem.title}
                    </h4>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">Core Technical Pillar</p>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-semibold shrink-0">
                  Featured Competency
                </span>
              </div>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-4xl">
                {featuredItem.description}
              </p>

              {/* Metrics & Tags */}
              <div className="pt-4 border-t border-border space-y-4">
                {featuredItem.metrics && featuredItem.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {featuredItem.metrics.map((m, idx) => (
                      <div key={idx} className="bg-muted/50 border border-border p-3.5 rounded-xl">
                        <div className="text-xl font-extrabold text-foreground">{m.value}</div>
                        <div className="text-[11px] font-mono text-primary uppercase tracking-wider mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {featuredItem.tags && featuredItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {featuredItem.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 border border-primary/25 text-primary font-mono text-xs rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Secondary Bento Grid Cards */}
          {filteredSecondaryItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredSecondaryItems.map((item, idx) => (
                <motion.div 
                  key={item._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="glass-card p-6 flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-secondary/10 border border-secondary/30 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <span className="text-secondary font-mono font-bold text-xs">
                          {item.badge || `0${idx + 2}`}
                        </span>
                      </div>
                      {item.metrics && item.metrics.length > 0 && (
                        <span className="text-[11px] font-mono text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 font-medium">
                          {item.metrics[0].value} {item.metrics[0].label}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                      {item.tags.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Professional Recommendations / Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="space-y-8 pt-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">Social Proof</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
              Professional Recommendations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial: Testimonial, idx: number) => (
              <motion.div
                key={testimonial._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 sm:p-7 flex flex-col justify-between relative group"
              >
                <div className="space-y-4 mb-6">
                  <Quote className="w-8 h-8 text-primary/30" />
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border bg-muted shrink-0">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/15 text-primary font-bold flex items-center justify-center text-sm">
                          {testimonial.name[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-foreground font-semibold text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground text-xs font-mono">{testimonial.title}</p>
                    </div>
                  </div>

                  {testimonial.url && (
                    <a
                      href={testimonial.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                      title="View recommendation source"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
