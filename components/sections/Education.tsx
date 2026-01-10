"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function Education() {
    const certifications = [
        "JavaScript (Intermediate) - HackerRank",
        "React Native Specialized Development",
        "Advanced Mobile App Architecture",
        "Web Design & Interface Engineering",
        "Enterprise System Security & Auth",
    ];

    const highlights = [
        "Dean's List Recognition for Academic Excellence",
        "Led multiple cross-platform mobile capstone projects",
        "Specialized in Software Engineering & Mobile Design",
        "Active participant in regional engineering symposiums",
    ];

    return (
        <section id="education" className="py-24 relative overflow-hidden bg-background">
            <div className="absolute inset-0 mesh-bg opacity-20" />

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
                        Credentials
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        Academic & <span className="gradient-text">Professional</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        The theoretical foundation and continuous specialization that powers
                        my architectural decisions.
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                    {/* Degree Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7"
                    >
                        <div className="futuristic-card p-8 md:p-12 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-5 mb-10">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner shadow-primary/10">
                                        <GraduationCap size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold tracking-tight">Institutional Foundation</h3>
                                        <p className="text-primary font-bold text-sm tracking-widest uppercase mt-1">University Graduate</p>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-12">
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">B.Sc. in Computer Science & Engineering</h4>
                                        <p className="text-muted-foreground flex items-center gap-2 text-sm">
                                            <span className="font-bold text-foreground">Green University of Bangladesh</span> • Dhaka
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-tighter">
                                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground border border-border">
                                            <Calendar size={12} className="text-primary" /> Jan 2017 – Apr 2020
                                        </span>
                                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground border border-border">
                                            <MapPin size={12} className="text-primary" /> Green Campus
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h5 className="text-xs font-black uppercase tracking-widest text-foreground/80 mb-4 pb-2 border-b border-border">Academic Highlights</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {highlights.map((item, i) => (
                                            <div key={i} className="flex gap-3 text-sm text-muted-foreground leading-snug items-start">
                                                <div className="mt-1">
                                                    <CheckCircle2 size={14} className="text-primary" />
                                                </div>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Certifications Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 xl:col-span-5"
                    >
                        <div className="futuristic-card p-8 h-full bg-secondary/30 border-dashed border-primary/20">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                    <Award size={24} />
                                </div>
                                <h3 className="text-xl font-bold">Specialized Certifications</h3>
                            </div>

                            <div className="space-y-4 mb-10">
                                {certifications.map((cert, index) => (
                                    <motion.div
                                        key={cert}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 rounded-xl bg-background border border-border flex items-center gap-4 group hover:border-primary/50 transition-all cursor-default"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                                            <Award size={16} />
                                        </div>
                                        <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                                            {cert}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                                <p className="text-xs text-muted-foreground leading-relaxed italic text-center">
                                    "Committed to life-long learning and maintaining peak professional competency through continuous technical specialization."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
