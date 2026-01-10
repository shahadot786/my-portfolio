"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle, Code, ArrowRight } from "lucide-react";

interface ExperienceItem {
    id: string;
    type: "work" | "education";
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    achievements: string[];
    technologies?: string[];
}

const experiences: ExperienceItem[] = [
    {
        id: "hawkeyes",
        type: "work",
        title: "Software Engineer",
        company: "HawkEyes Digital Monitoring",
        location: "Dhaka, Bangladesh",
        period: "June 2023 – Present",
        description: "Driving mobile innovation for Fortune 500 enterprise clients (Unilever, BAT). Architected high-concurrency systems serving institutional field operations across the nation.",
        achievements: [
            "Leading deployment for 10K+ territory managers with 100K+ daily transactions",
            "Architected offline-first sync engine reducing data loss incidents by 92%",
            "Implemented liveness detection & biometric verification for secure field login",
            "Refactored legacy systems into high-performance React Native/TypeScript monorepos",
        ],
        technologies: ["React Native", "Redux", "TypeScript", "Offline-First", "Face Detection", "GPS", "REST"],
    },
    {
        id: "tfp",
        type: "work",
        title: "Jr. React Native Developer",
        company: "TFP Solutions Bangladesh",
        location: "Dhaka, Bangladesh",
        period: "January 2023 – May 2023",
        description: "Developed 'Hello Superstar', a high-traffic social engagement platform connecting celebrities with global fanbases.",
        achievements: [
            "Implemented user authentication and live session management",
            "Optimized media delivery pipelines via AWS S3 integration",
            "Maintained 99.9% application stability during peak event loads",
        ],
        technologies: ["React Native", "AWS S3", "WebSockets", "Real-time Chat"],
    },
    {
        id: "gsda",
        type: "work",
        title: "Frontend Developer",
        company: "GSDA (Global Skills Development)",
        location: "Dhaka, Bangladesh",
        period: "June 2022 – December 2022",
        description: "Engineered responsive web interfaces for institutional learning management systems.",
        achievements: [
            "Increased UX performance score by 25% through codebase modularization",
            "Integrated complex Laravel backend APIs into a high-performance Vue.js frontend",
            "Standardized enterprise components using Tailwind CSS and Redux",
        ],
        technologies: ["Vue.js", "Laravel", "Redux", "Tailwind CSS"],
    },
    {
        id: "education",
        type: "education",
        title: "B.Sc. Computer Science & Engineering",
        company: "Green University of Bangladesh",
        location: "Dhaka, Bangladesh",
        period: "2017 – 2020",
        description: "Foundation in computational theory, software design patterns, and full-stack development methodologies.",
        achievements: [
            "Dean's List / High Academic Standing in Software Engineering modules",
            "Active contributor to university competitive programming team",
            "Consistently delivered high-grade capstone mobile projects",
        ],
        technologies: ["Software Engineering", "DSA", "Mobile Development", "Project Mgmt"],
    },
];

export function Experience() {
    const [selectedId, setSelectedId] = useState(experiences[0].id);
    const selectedExperience = experiences.find((exp) => exp.id === selectedId) || experiences[0];

    return (
        <section id="experience" className="py-24 relative overflow-hidden bg-background">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4 inline-block"
                    >
                        Timeline
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        Professional <span className="gradient-text">Milestones</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A chronology of technical leadership and architectural contributions across
                        high-stakes enterprise environments.
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Navigation Timeline */}
                        <div className="lg:col-span-4 space-y-3">
                            {experiences.map((exp, index) => (
                                <motion.button
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setSelectedId(exp.id)}
                                    className={`w-full group relative p-5 rounded-2xl transition-all duration-300 text-left border ${selectedId === exp.id
                                        ? "bg-primary/10 border-primary/30 shadow-lg shadow-primary/5"
                                        : "bg-secondary/30 border-transparent hover:bg-secondary/50"}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedId === exp.id ? "bg-primary text-white" : "bg-background text-muted-foreground group-hover:text-primary"}`}>
                                            {exp.type === "work" ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <h4 className={`text-sm font-bold truncate ${selectedId === exp.id ? "text-foreground" : "text-muted-foreground"}`}>
                                                {exp.company}
                                            </h4>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{exp.period}</p>
                                        </div>
                                        {selectedId === exp.id && (
                                            <motion.div layoutId="active-indicator" className="text-primary">
                                                <ArrowRight size={16} />
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Details View */}
                        <div className="lg:col-span-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="futuristic-card p-8 md:p-12 h-full flex flex-col"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-border">
                                        <div>
                                            <h3 className="text-3xl font-bold mb-2 tracking-tight">{selectedExperience.title}</h3>
                                            <div className="flex flex-wrap gap-4 text-sm font-medium text-primary">
                                                <span className="flex items-center gap-2">
                                                    <Briefcase size={14} /> {selectedExperience.company}
                                                </span>
                                                <span className="flex items-center gap-2 text-muted-foreground">
                                                    <MapPin size={14} /> {selectedExperience.location}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary text-xs font-bold border border-primary/10">
                                            <Calendar size={14} /> {selectedExperience.period}
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                                        {selectedExperience.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest text-foreground mb-4 flex items-center gap-2">
                                                <CheckCircle size={16} className="text-primary" /> Key Contributions
                                            </h4>
                                            <ul className="space-y-4">
                                                {selectedExperience.achievements.map((item, i) => (
                                                    <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-snug">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {selectedExperience.technologies && (
                                            <div>
                                                <h4 className="text-sm font-black uppercase tracking-widest text-foreground mb-4 flex items-center gap-2">
                                                    <Code size={16} className="text-primary" /> Impact Tech Stack
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedExperience.technologies.map(tech => (
                                                        <span key={tech} className="px-3 py-1 text-[11px] font-bold rounded-lg bg-background border border-border hover:border-primary/30 transition-colors">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
