"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Download, CheckCircle2, ArrowRight, Layers } from "lucide-react";
import Image from "next/image";
import { LeetCodeIcon } from "@/components/icons/LeetCodeIcon";
import { useTheme } from "../providers/theme-provider";
import { useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";

export function Hero() {
    const { theme } = useTheme();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const stats = [
        { label: "Years Experience", value: "4+" },
        { label: "Active Users", value: "10K+" },
        { label: "Daily Transactions", value: "100K+" },
        { label: "Projects Delivered", value: "20+" },
    ];

    const socialLinks = [
        { icon: Github, href: "https://github.com/shahadot786", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/shahadot786", label: "LinkedIn" },
        { icon: LeetCodeIcon, href: "https://leetcode.com/u/shahadot_786/", label: "LeetCode" },
        { icon: Mail, href: "mailto:shahadotrahat786@gmail.com", label: "Email" },
    ];

    return (
        <section
            id="home"
            className="min-h-screen relative overflow-hidden flex items-center bg-background"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Futuristic Mesh Background */}
            <div className="mesh-bg" />

            {/* Animated Glow Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] bg-cyan-500/10 rounded-full blur-[150px] animate-float" style={{ animationDelay: "2s" }} />
            </div>

            <div className="container-custom relative z-10 pt-32 pb-20 md:pt-0 md:pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-sm font-semibold tracking-wide uppercase">Software Architect & Engineer</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-7xl font-black leading-[1.1]"
                            >
                                Engineering <br />
                                <span className="gradient-text">Future-Ready</span> <br />
                                Solutions
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl text-muted-foreground max-w-xl leading-relaxed"
                            >
                                Building scalable, high-performance cross-platform ecosystems with
                                <span className="text-foreground font-semibold"> 4+ years </span>
                                of expertise in enterprise architecture and real-time mobile technologies.
                            </motion.p>
                        </div>

                        {/* Professional Metrics (Condensed) */}
                        <div className="flex flex-wrap gap-6 border-l-2 border-primary/20 pl-6">
                            {stats.slice(0, 2).map((stat, i) => (
                                <div key={stat.label} className="space-y-1">
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a href="#projects" className="btn-primary flex items-center group">
                                <span>View Portfolio</span>
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="/MD_Shahadot_Hosssain.pdf"
                                download
                                className="btn-secondary flex items-center"
                            >
                                <Download className="mr-2 w-4 h-4" />
                                <span>Curriculum Vitae</span>
                            </a>
                        </motion.div>

                        {/* Social Presence */}
                        <div className="flex items-center space-x-4 pt-4">
                            <p className="text-sm font-medium text-muted-foreground mr-2">CONNECT:</p>
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -4, color: "var(--primary)" }}
                                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon size={22} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden lg:flex justify-end pt-12"
                    >
                        <div className="relative w-[450px] h-[450px]">
                            {/* Orbital Rings */}
                            <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
                            <div className="absolute inset-8 border border-cyan-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                            {/* Tech Badges */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute top-10 -left-6 bg-card border border-border p-3 rounded-2xl shadow-xl z-20"
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">100K+</p>
                                        <p className="text-[10px] text-muted-foreground">Daily Executions</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-20 -right-10 bg-card border border-border p-4 rounded-2xl shadow-xl z-20"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center p-2">
                                        <Layers size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">High Scalability</p>
                                        <p className="text-[10px] text-muted-foreground">Serverless Architecture</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Main Hexagon/Circle Container */}
                            <motion.div
                                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                                className="absolute inset-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/20 to-cyan-500/20 border border-white/10 backdrop-blur-3xl p-1 z-10 shadow-2xl shadow-primary/20"
                            >
                                <div
                                    style={{ transform: "translateZ(50px)" }}
                                    className="relative w-full h-full rounded-[1.75rem] overflow-hidden bg-slate-900"
                                >
                                    <Image
                                        src="/avatar.png"
                                        alt="MD. Shahadot Hossain"
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-110"
                                        priority
                                    />
                                </div>
                            </motion.div>

                            {/* Gradient Blobs */}
                            <div className="absolute -z-10 bg-primary/40 w-48 h-48 rounded-full blur-[80px] -top-10 -right-10 animate-pulse" />
                            <div className="absolute -z-10 bg-cyan-500/30 w-40 h-40 rounded-full blur-[80px] -bottom-10 -left-10" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
}
