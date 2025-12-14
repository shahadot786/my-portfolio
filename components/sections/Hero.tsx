"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Download, ExternalLink } from "lucide-react";
import Image from "next/image";

export function Hero() {
    const stats = [
        { label: "Years Experience", value: "3.7+" },
        { label: "Active Users", value: "10K+" },
        { label: "Daily Transactions", value: "100K+" },
        { label: "Projects Delivered", value: "20+" },
    ];

    const socialLinks = [
        { icon: Github, href: "https://github.com/shahadot786", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/shahadot786", label: "LinkedIn" },
        { icon: Mail, href: "mailto:shahadotrahat786@gmail.com", label: "Email" },
    ];

    return (
        <section id="home" className="min-h-screen relative overflow-hidden gradient-bg flex items-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
            </div>

            <div className="container-custom relative z-10 py-20 md:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block"
                        >
                            <span className="px-4 py-2 rounded-full text-sm font-medium glass-card">
                                👋 Welcome to my portfolio
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        >
                            Hi, I'm{" "}
                            <span className="gradient-text">MD. Shahadot Hossain</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-2"
                        >
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
                                Software Engineer
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-400">
                                React & React Native Specialist
                            </p>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-lg text-gray-300 leading-relaxed max-w-xl"
                        >
                            Proficient React Native Developer with 3.7+ years of experience building
                            cross-platform mobile applications for enterprise clients. Specialized in
                            offline-first architecture, real-time tracking, and cutting-edge mobile technologies.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center space-x-4 text-gray-400"
                        >
                            <div className="flex items-center space-x-2">
                                <MapPin size={18} className="text-blue-400" />
                                <span className="text-sm">Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone size={18} className="text-blue-400" />
                                <span className="text-sm">+880-1775-020-582</span>
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <a
                                href="#contact"
                                className="btn-primary inline-flex items-center space-x-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                <Mail size={18} />
                                <span>Get In Touch</span>
                            </a>
                            <a
                                href="/MD_Shahadot_Hosssain.pdf"
                                download
                                className="btn-secondary inline-flex items-center space-x-2"
                            >
                                <Download size={18} />
                                <span>Download CV</span>
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex items-center space-x-4 pt-4"
                        >
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 glass-card rounded-lg hover:border-blue-400 transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} className="text-gray-300" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            {/* Gradient Border */}
                            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-50 animate-glow"></div>

                            {/* Animated Rotating Border */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-cyan-500 rounded-full opacity-75 blur-sm animate-spin-slow"></div>

                            {/* Profile Image */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-900">
                                <Image
                                    src="/avatar.png"
                                    alt="MD. Shahadot Hossain"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                                className="absolute -bottom-4 -right-4 glass-card px-6 py-3 rounded-full"
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium">Available for work</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 + index * 0.1 }}
                            className="glass-card p-6 text-center hover:scale-105 transition-transform"
                        >
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
                >
                    <div className="w-1 h-2 bg-gray-400 rounded-full mt-2"></div>
                </motion.div>
            </motion.div>
        </section>
    );
}
