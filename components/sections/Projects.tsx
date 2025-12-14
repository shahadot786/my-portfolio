"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { PaperCard } from "@/components/ui/PaperCard";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function Projects() {
    const projects = [
        {
            title: "Unilever TM (M-Lens & CM Supervisor)",
            description: "Enterprise mobile application serving 10,000+ territory managers with 100,000+ daily transactions. Features offline-first architecture, real-time face recognition, and GPS tracking.",
            technologies: ["React Native", "Redux", "Offline-First", "Face Detection", "GPS"],
            metrics: ["10K+ Users", "100K+ Daily Transactions", "99.9% Uptime"],
        },
        {
            title: "BAT MM Automation (CM Live & MS Live)",
            description: "High-performance mobile solution optimized for 1000+ concurrent users. Implements real-time data synchronization and role-based dashboards.",
            technologies: ["React Native", "TypeScript", "Redux Toolkit", "Real-time Sync"],
            metrics: ["1K+ Concurrent Users", "Real-time Updates", "Multi-role Support"],
        },
        {
            title: "Nagad TM Suite",
            description: "Mobile banking territory management application with 10K+ downloads and 4.8★ rating. Features secure authentication and transaction tracking.",
            technologies: ["React Native", "Redux", "Secure Auth", "Analytics"],
            metrics: ["10K+ Downloads", "4.8★ Rating", "High Security"],
        },
        {
            title: "Hello Superstar",
            description: "Fan-based social media platform connecting celebrities with fans globally. Includes live sessions, chat, and personalized greetings.",
            technologies: ["React Native", "AWS S3", "REST APIs", "Real-time Chat"],
            metrics: ["50K+ Downloads", "4.4★+ Rating", "Global Reach"],
        },
        {
            title: "Shopora Multi-Vendor eCommerce",
            description: "Full-stack SaaS platform with microservices architecture. Supports multiple vendors with comprehensive admin and vendor dashboards.",
            technologies: ["Next.js", "Node.js", "MongoDB", "Microservices"],
            metrics: ["Multi-vendor", "Scalable Architecture", "Admin Dashboard"],
        },
        {
            title: "HawkEyes Universe (HE Universe)",
            description: "AI-powered enterprise application with multiple modules for field operations, analytics, and management.",
            technologies: ["React Native", "AI Integration", "Analytics", "Cloud Services"],
            metrics: ["AI-Powered", "Multiple Modules", "Enterprise Scale"],
        },
    ];

    return (
        <section id="projects" className="py-16">
            <SectionDivider />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <h2 className="text-4xl font-bold text-stone-900 mb-4">
                    Featured <span className="text-blue-600">Projects</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <PaperCard className="p-6 h-full flex flex-col">
                            <h3 className="text-xl font-bold text-stone-900 mb-3">
                                {project.title}
                            </h3>
                            <p className="text-sm text-stone-700 leading-relaxed mb-4 flex-1">
                                {project.description}
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs font-semibold text-stone-600 mb-2">Technologies:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-semibold text-stone-600 mb-2">Key Metrics:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.metrics.map((metric) => (
                                            <span
                                                key={metric}
                                                className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded"
                                            >
                                                {metric}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </PaperCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
