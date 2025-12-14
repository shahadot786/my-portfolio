"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle, Code } from "lucide-react";

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
        title: "Mobile Application Developer",
        company: "HawkEyes Digital Monitoring Limited",
        location: "Dhaka, Bangladesh",
        period: "June 2023 – Present",
        description: "Leading development of React Native applications for major enterprise clients including Unilever, BAT, Nestlé, and Nagad. Progressed from Jr. Developer to Mobile Application Developer, serving 10,000+ territory managers with 100,000+ daily transactions.",
        achievements: [
            "Lead development serving 10,000+ territory managers with 100,000+ daily transactions",
            "Architected offline-first mobile solutions improving reliability by 40%",
            "Implemented advanced features: real-time face recognition, liveness detection, GPS monitoring",
            "Developed multi-role applications with role-specific dashboards",
            "Integrated real-time data synchronization for remote portal access",
            "Created cost-effective cross-platform solutions with consistent UX",
            "Implemented agile methodologies with cutting-edge technologies",
            "Resolved critical technical issues supporting 30% growth in user satisfaction",
            "Built scalable applications for field operations and management",
        ],
        technologies: ["React Native", "Redux", "TypeScript", "Offline-First", "Face Detection", "GPS Tracking", "Redux Toolkit", "REST APIs"],
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
            "Enhanced application functionality and user engagement",
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
            "Implemented Redux, Tailwind CSS, and REST API integration",
        ],
        technologies: ["Vue.js", "Laravel", "Redux", "Tailwind CSS"],
    },
    {
        id: "education",
        type: "education",
        title: "B.Sc. in Computer Science & Engineering",
        company: "Green University of Bangladesh",
        location: "Dhaka, Bangladesh",
        period: "2017 – 2020",
        description: "Comprehensive computer science education with focus on software engineering and mobile development.",
        achievements: [
            "Strong foundation in algorithms and data structures",
            "Specialized in mobile application development",
            "Completed multiple software engineering projects",
            "Active participation in coding competitions",
        ],
        technologies: ["Java", "C++", "Python", "Mobile Development"],
    },
];

export function Experience() {
    const [selectedId, setSelectedId] = useState(experiences[0].id);
    const selectedExperience = experiences.find((exp) => exp.id === selectedId) || experiences[0];

    return (
        <section id="experience" className="section-padding bg-slate-800">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Professional <span className="gradient-text">Journey</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        My career path and educational background in software development
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Side - Timeline Navigation */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-1"
                        >
                            <div className="space-y-2">
                                {experiences.map((exp, index) => (
                                    <motion.button
                                        key={exp.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        onClick={() => setSelectedId(exp.id)}
                                        className={`w-full text-left p-4 rounded-lg transition-all ${selectedId === exp.id
                                            ? "bg-gradient-primary text-white shadow-lg scale-105"
                                            : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                                            }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedId === exp.id
                                                    ? "bg-white/20"
                                                    : "bg-gradient-primary"
                                                    }`}
                                            >
                                                {exp.type === "work" ? (
                                                    <Briefcase size={20} className="text-white" />
                                                ) : (
                                                    <GraduationCap size={20} className="text-white" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-semibold text-sm mb-1 ${selectedId === exp.id ? "text-white" : "text-gray-200"
                                                    }`}>
                                                    {exp.title}
                                                </h3>
                                                <p className={`text-xs truncate ${selectedId === exp.id ? "text-white/80" : "text-gray-400"
                                                    }`}>
                                                    {exp.company}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Side - Experience Details */}
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedId}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.3 }}
                                    className="glass-card p-8"
                                >
                                    {/* Header */}
                                    <div className="mb-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-white mb-2">
                                                    {selectedExperience.title}
                                                </h3>
                                                <p className="text-xl text-blue-400 mb-3">
                                                    {selectedExperience.company}
                                                </p>
                                            </div>
                                            <div
                                                className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedExperience.type === "work"
                                                    ? "bg-blue-500/20"
                                                    : "bg-teal-500/20"
                                                    }`}
                                            >
                                                {selectedExperience.type === "work" ? (
                                                    <Briefcase size={24} className="text-blue-400" />
                                                ) : (
                                                    <GraduationCap size={24} className="text-teal-400" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                            <div className="flex items-center space-x-2">
                                                <Calendar size={16} />
                                                <span>{selectedExperience.period}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <MapPin size={16} />
                                                <span>{selectedExperience.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-300 leading-relaxed mb-6">
                                        {selectedExperience.description}
                                    </p>

                                    {/* Achievements */}
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                                            <CheckCircle size={20} className="text-green-400" />
                                            <span>Key Achievements</span>
                                        </h4>
                                        <ul className="space-y-3">
                                            {selectedExperience.achievements.map((achievement, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-start space-x-3"
                                                >
                                                    <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-300 text-sm">{achievement}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Technologies */}
                                    {selectedExperience.technologies && (
                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                                                <Code size={20} className="text-blue-400" />
                                                <span>Technologies Used</span>
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedExperience.technologies.map((tech, index) => (
                                                    <motion.span
                                                        key={tech}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-sm"
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
