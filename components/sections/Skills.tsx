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
            title: "Core Languages",
            icon: Code2,
            color: "blue",
            skills: ["JavaScript", "TypeScript", "SQL"],
        },
        {
            title: "Frontend & Mobile",
            icon: Smartphone,
            color: "emerald",
            skills: ["React Native", "Expo", "Next.js", "React.js"],
        },
        {
            title: "Cloud & Backend",
            icon: Server,
            color: "green",
            skills: ["Node.js", "Express.js", "Prisma", "Apollo Server"],
        },
        {
            title: "Systems Design",
            icon: Layers,
            color: "cyan",
            skills: [
                "Microservices",
                "System Design",
                "Clean Architecture",
                "MVVM/MVC",
                "Nx Monorepo",
            ],
        },
        {
            title: "Data Architecture",
            icon: Database,
            color: "yellow",
            skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
        },
        {
            title: "State & Data Flow",
            icon: GitBranch,
            color: "pink",
            skills: ["Redux", "Toolkit", "React Query", "Zustand"],
        },
        {
            title: "Digital Aesthetics",
            icon: Globe,
            color: "orange",
            skills: ["Tailwind CSS", "Tamagui", "Gluestack", "Shadcn/ui"],
        },
        {
            title: "Dev & Ops Tools",
            icon: Zap,
            color: "red",
            skills: [
                "Docker",
                "AWS (ECS/EC2)",
                "GitHub Actions",
                "Git/GitHub",
                "Serverless",
            ],
        },
        {
            title: "Digital Services",
            icon: Cloud,
            color: "indigo",
            skills: [
                "REST/GraphQL",
                "Supabase",
                "WebSockets",
                "Real-time Tracking",
            ],
        },
    ];

    const getColorStyles = (color: string) => {
        const styles: Record<string, string> = {
            blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
            emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
            green: "bg-primary/10 text-primary border-primary/20",
            cyan: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
            yellow: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
            pink: "bg-pink-500/10 text-pink-500 border-pink-500/20",
            orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
            red: "bg-red-500/10 text-red-500 border-red-500/20",
            indigo: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
            teal: "bg-teal-500/10 text-teal-500 border-teal-500/20",
        };
        return styles[color] || styles.blue;
    };

    return (
        <section id="skills" className="py-24 relative overflow-hidden bg-background">
            <div className="mesh-bg opacity-50" />

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
                        Competencies
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        Technical <span className="gradient-text">Ecosystem</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A curated stack of industry-leading technologies focused on building
                        scalable, high-performance, and future-proof digital products.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => {
                        const styleClasses = getColorStyles(category.color);
                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="futuristic-card p-6 flex flex-col group"
                            >
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${styleClasses} transition-transform duration-300 group-hover:scale-110`}>
                                        <category.icon size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold tracking-tight">
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground border border-border group-hover:border-primary/20 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Architecture Focus */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 relative px-8 py-12 rounded-[2.5rem] overflow-hidden border border-primary/10"
                >
                    <div className="absolute inset-0 bg-primary/5 backdrop-blur-3xl -z-10" />
                    <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                        <div className="bg-primary/10 p-4 rounded-2xl mb-8">
                            <Cpu size={40} className="text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
                            Committed to <span className="text-primary">Engineering Excellence</span>
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-0">
                            Beyond syntax and frameworks, my focus remains on
                            <span className="text-foreground font-semibold"> architectural integrity</span>,
                            offline-first reliability, and real-time synchronization. Every line of code is
                            measured against scalability and long-term maintainability.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
