"use client";

import { motion } from "framer-motion";
import { Target, Zap, Shield, Globe, Award, Users, BookOpen, Coffee } from "lucide-react";

export function About() {
    const highlights = [
        {
            icon: Target,
            title: "Offline-First Architect",
            description: "Engineering resilient systems that maintain peak performance in disconnected environments with intelligent sync logic.",
            color: "emerald",
        },
        {
            icon: Zap,
            title: "Real-Time Systems",
            description: "Implementing mission-critical GPS orchestration and high-frequency data streaming for large-scale field operations.",
            color: "cyan",
        },
        {
            icon: Shield,
            title: "Embedded Security",
            description: "Integrating biometric verification and data protection protocols into high-traffic enterprise mobile applications.",
            color: "primary",
        },
        {
            icon: Globe,
            title: "Global Scale",
            description: "Architecting ecosystems that process 100K+ daily transactions with 99.9% uptime for Fortune 500 conglomerates.",
            color: "blue",
        },
    ];

    const stats = [
        { icon: Award, label: "Experience", value: "4+ Years" },
        { icon: Users, label: "Users Served", value: "10K+" },
        { icon: Coffee, label: "Projects", value: "20+" },
        { icon: BookOpen, label: "Agile Teams", value: "8+" },
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-background">
            <div className="absolute inset-0 mesh-bg opacity-30" />

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
                        Biography
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        The Mind Behind the <span className="gradient-text">Architecture</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A bridge between complex business logic and exceptional user experiences,
                        specializing in full-stack mobile engineering.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Professional Bio Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div className="futuristic-card p-8 md:p-12">
                            <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-primary" /> Professional Narrative
                            </h3>
                            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                                <p>
                                    As a <span className="text-foreground font-semibold">Specialized Software Engineer</span> with over 4 years of immersive experience,
                                    I've stood at the intersection of architecture and impact. My journey has been defined by
                                    the successful delivery of mission-critical applications for global giants like
                                    <span className="text-primary font-medium"> Unilever, BAT, Nestlé, and Nagad</span>.
                                </p>
                                <p>
                                    I specialize in <span className="text-foreground font-semibold">automation-driven mobile ecosystems</span>. From
                                    engineering offline-first architectures to implementing secure liveness verification
                                    systems, my focus is always on high-concurrency performance and impenetrable reliability.
                                </p>
                                <p>
                                    Beyond code, I am a strategic partner in digital transformation, aligning
                                    cutting-edge technologies with enterprise objectives to achieve 92% reductions
                                    in data loss and exponential gains in field efficiency.
                                </p>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="futuristic-card p-4 text-center group border-none bg-primary/5"
                                >
                                    <stat.icon size={20} className="mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                                    <p className="text-lg font-bold">{stat.value}</p>
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Highlights Grid */}
                    <div className="lg:col-span-5 grid grid-cols-1 gap-6">
                        {highlights.map((highlight, index) => (
                            <motion.div
                                key={highlight.title}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="futuristic-card p-6 flex items-start gap-4 hover:border-primary/30 transition-colors"
                            >
                                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                    <highlight.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-1">{highlight.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Section - Soft Skills & Culture */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 flex flex-col md:flex-row gap-8 items-center justify-between p-8 rounded-3xl bg-secondary/50 border border-border"
                >
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        {["Agile Leader", "Strategic Thinker", "Technical Mentor", "Problem Solver"].map(tag => (
                            <span key={tag} className="px-4 py-1.5 rounded-full bg-background border border-border text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">English</p>
                            <p className="text-sm font-bold">PROFESSIONAL</p>
                        </div>
                        <div className="w-px h-8 bg-border" />
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Bengali</p>
                            <p className="text-sm font-bold">NATIVE</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
