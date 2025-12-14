"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { PaperCard } from "@/components/ui/PaperCard";
import { SectionDivider } from "@/components/ui/SectionDivider";

interface ExperienceItem {
    id: string;
    type: "work" | "education";
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    achievements: string[];
    technologies: string[];
}

const experiences: ExperienceItem[] = [
    {
        id: "hawkeyes-senior",
        type: "work",
        title: "Mobile Application Developer",
        company: "HawkEyes Digital Monitoring Limited",
        location: "Dhaka, Bangladesh",
        period: "July 2024 – Present",
        description: "Leading development of React Native applications for major enterprise clients including Unilever, BAT, Nestlé, and Nagad.",
        achievements: [
            "Lead development serving 10,000+ territory managers with 100,000+ daily transactions",
            "Architected offline-first mobile solutions improving reliability by 40%",
            "Implemented advanced features: real-time face recognition, liveness detection, GPS monitoring",
            "Developed multi-role applications with role-specific dashboards",
        ],
        technologies: ["React Native", "Redux", "TypeScript", "Offline-First", "Face Detection"],
    },
    {
        id: "hawkeyes-junior",
        type: "work",
        title: "Jr. React Native Developer",
        company: "HawkEyes Digital Monitoring Limited",
        location: "Dhaka, Bangladesh",
        period: "June 2023 – June 2024",
        description: "Delivered multiple React Native applications for enterprise clients with high reliability and performance.",
        achievements: [
            "Created cost-effective cross-platform solutions with consistent UX",
            "Implemented agile methodologies with cutting-edge technologies",
            "Resolved critical technical issues supporting 30% growth in user satisfaction",
        ],
        technologies: ["React Native", "TypeScript", "Redux Toolkit", "REST APIs"],
    },
    {
        id: "tfp",
        type: "work",
        title: "Jr. React Native Developer",
        company: "TFP Solutions Bangladesh Ltd",
        location: "Dhaka, Bangladesh",
        period: "January 2023 – May 2023",
        description: "Built Hello Superstar, a fan-based social media app connecting celebrities and fans globally.",
        achievements: [
            "Implemented user authentication, live sessions, and chat features",
            "Utilized REST APIs to retrieve data from AWS S3",
            "Maintained high-quality code with 99% uptime",
        ],
        technologies: ["React Native", "AWS S3", "REST APIs", "Real-time Chat"],
    },
    {
        id: "gsda",
        type: "work",
        title: "Frontend Developer",
        company: "Global Skills Development Agency",
        location: "Dhaka, Bangladesh",
        period: "June 2022 – December 2022",
        description: "Developed online learning platform using Vue.js and Laravel with modern web technologies.",
        achievements: [
            "Designed user-friendly interfaces improving UX by 25%",
            "Created clean, modular frontend codebase",
            "Integrated third-party applications enhancing features",
        ],
        technologies: ["Vue.js", "Laravel", "Tailwind CSS", "REST API"],
    },
];

export function Experience() {
    const [expandedId, setExpandedId] = useState<string | null>(experiences[0].id);

    return (
        <section id="experience" className="py-16">
            <SectionDivider />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <h2 className="text-4xl font-bold text-stone-900 mb-4">
                    Professional <span className="text-blue-600">Experience</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full"></div>
            </motion.div>

            <div className="space-y-4">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <PaperCard className="overflow-hidden" hover={false}>
                            <button
                                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                                className="w-full text-left p-6 hover:bg-stone-50 transition-colors"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4 flex-1">
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                            <Briefcase size={24} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-stone-900 mb-1">
                                                {exp.title}
                                            </h3>
                                            <p className="text-lg text-blue-600 font-medium mb-2">
                                                {exp.company}
                                            </p>
                                            <div className="flex flex-wrap gap-4 text-sm text-stone-600">
                                                <div className="flex items-center space-x-1">
                                                    <Calendar size={14} />
                                                    <span>{exp.period}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <MapPin size={14} />
                                                    <span>{exp.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        {expandedId === exp.id ? (
                                            <ChevronUp size={20} className="text-stone-400" />
                                        ) : (
                                            <ChevronDown size={20} className="text-stone-400" />
                                        )}
                                    </div>
                                </div>
                            </button>

                            {expandedId === exp.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pb-6"
                                >
                                    <div className="pl-16 space-y-4">
                                        <p className="text-stone-700 leading-relaxed">
                                            {exp.description}
                                        </p>

                                        <div>
                                            <h4 className="font-semibold text-stone-900 mb-2">Key Achievements:</h4>
                                            <ul className="space-y-2">
                                                {exp.achievements.map((achievement, i) => (
                                                    <li key={i} className="flex items-start space-x-2 text-sm text-stone-700">
                                                        <span className="text-blue-600 mt-1">▸</span>
                                                        <span>{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-stone-900 mb-2">Technologies:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {exp.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </PaperCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
