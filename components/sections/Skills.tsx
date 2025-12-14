"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Smartphone,
    Globe,
    Database,
    Server,
    Layers,
    GitBranch,
    Zap,
    Cloud,
    Eye,
    Cpu,
} from "lucide-react";

export function Skills() {
    const skillCategories = [
        {
            title: "Languages",
            icon: Code2,
            color: "blue",
            skills: ["JavaScript", "TypeScript"],
        },
        {
            title: "Frontend Frameworks",
            icon: Smartphone,
            color: "emerald",
            skills: ["React Native", "Expo", "Next.js", "React.js"],
        },
        {
            title: "Backend Technologies",
            icon: Server,
            color: "green",
            skills: ["Node.js", "Express.js", "Nest.js"],
        },
        {
            title: "Architecture & Design",
            icon: Layers,
            color: "cyan",
            skills: [
                "Microservices Architecture",
                "Clean Architecture",
                "MVVM",
                "MVC",
                "Repository Pattern",
                "Monorepo (Nx)",
            ],
        },
        {
            title: "Databases",
            icon: Database,
            color: "yellow",
            skills: ["MongoDB", "MySQL", "Prisma ORM"],
        },
        {
            title: "State Management",
            icon: GitBranch,
            color: "pink",
            skills: ["Redux", "Redux Toolkit", "React Query", "Expo Router", "React Navigation"],
        },
        {
            title: "Styling",
            icon: Globe,
            color: "orange",
            skills: ["Tailwind CSS", "CSS-in-JS", "Styled Components"],
        },
        {
            title: "Tools",
            icon: Zap,
            color: "red",
            skills: [
                "VS Code",
                "Git",
                "GitHub",
                "Xcode",
                "Android Studio",
                "Flipper",
                "Jira",
                "GitHub Actions",
                "Docker",
            ],
        },
        {
            title: "APIs & Services",
            icon: Cloud,
            color: "indigo",
            skills: [
                "REST APIs",
                "GraphQL",
                "AWS S3",
                "Real-time Location Tracking",
                "OCR",
                "Redis",
                "WebSocket",
            ],
        },
        {
            title: "Specialized",
            icon: Eye,
            color: "teal",
            skills: [
                "Offline-first Architecture",
                "Face Detection",
                "Liveness Detection",
                "Object Detection",
                "CI/CD",
            ],
        },
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; border: string; text: string }> = {
            blue: { bg: "from-blue-500 to-blue-700", border: "border-blue-400/50", text: "text-blue-400" },
            emerald: { bg: "from-emerald-500 to-emerald-700", border: "border-emerald-400/50", text: "text-emerald-400" },
            green: { bg: "from-green-500 to-green-700", border: "border-green-400/50", text: "text-green-400" },
            cyan: { bg: "from-cyan-500 to-cyan-700", border: "border-cyan-400/50", text: "text-cyan-400" },
            yellow: { bg: "from-yellow-500 to-yellow-700", border: "border-yellow-400/50", text: "text-yellow-400" },
            pink: { bg: "from-pink-500 to-pink-700", border: "border-pink-400/50", text: "text-pink-400" },
            orange: { bg: "from-orange-500 to-orange-700", border: "border-orange-400/50", text: "text-orange-400" },
            red: { bg: "from-red-500 to-red-700", border: "border-red-400/50", text: "text-red-400" },
            indigo: { bg: "from-indigo-500 to-indigo-700", border: "border-indigo-400/50", text: "text-indigo-400" },
            teal: { bg: "from-teal-500 to-teal-700", border: "border-teal-400/50", text: "text-teal-400" },
        };
        return colors[color] || colors.blue;
    };

    return (
        <section id="skills" className="section-padding bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Comprehensive expertise across the full stack of modern development
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => {
                        const colorClasses = getColorClasses(category.color);
                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                                className={`glass-card p-6 hover:scale-105 transition-all hover:${colorClasses.border}`}
                            >
                                {/* Icon Header */}
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses.bg} flex items-center justify-center`}>
                                        <category.icon size={24} className="text-white" />
                                    </div>
                                    <h3 className={`text-lg font-bold ${colorClasses.text}`}>
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Skills List */}
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <motion.span
                                            key={skill}
                                            whileHover={{ scale: 1.05 }}
                                            className="px-3 py-1.5 text-sm font-medium rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/10 transition-all cursor-default"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-12 text-center glass-card p-8 max-w-4xl mx-auto"
                >
                    <Cpu size={48} className="mx-auto mb-4 text-blue-400" />
                    <h3 className="text-2xl font-bold mb-4 gradient-text">
                        Continuous Learning & Growth
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                        Constantly exploring new technologies and best practices to deliver cutting-edge solutions.
                        Passionate about staying ahead of industry trends and implementing innovative approaches
                        to solve complex problems.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
