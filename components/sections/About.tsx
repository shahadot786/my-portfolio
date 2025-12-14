"use client";

import { motion } from "framer-motion";
import { Target, Zap, Shield, Globe } from "lucide-react";

export function About() {
    const highlights = [
        {
            icon: Target,
            title: "Offline-First Architecture",
            description: "Expert in building mobile apps that work seamlessly without internet connectivity with intelligent data synchronization.",
            color: "blue",
        },
        {
            icon: Zap,
            title: "Real-Time Tracking",
            description: "Specialized in implementing GPS monitoring, location tracking, and real-time data synchronization for field operations.",
            color: "purple",
        },
        {
            icon: Shield,
            title: "Advanced Security",
            description: "Proficient in face detection, liveness verification, display capture prevention, and secure authentication systems.",
            color: "cyan",
        },
        {
            icon: Globe,
            title: "Cross-Platform Excellence",
            description: "Building high-performance React Native apps serving 10,000+ users with 100,000+ daily transactions.",
            color: "green",
        },
    ];

    const specializations = [
        "Offline-first Architecture",
        "Real-time Location Tracking",
        "Face Detection & Liveness Verification",
        "Object Detection & OCR",
        "Microservices Architecture",
        "Clean Architecture & Design Patterns",
    ];

    return (
        <section id="about" className="section-padding bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Passionate about building innovative mobile solutions that make a real-world impact
                    </p>
                </motion.div>

                {/* Professional Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-card p-8 md:p-12 mb-12 max-w-5xl mx-auto"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
                        Professional Summary
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        Proficient React Native Developer with <strong className="text-white">3.7+ years of experience</strong> building
                        and maintaining cross-platform mobile applications for enterprise clients, including{" "}
                        <strong className="text-blue-400">Unilever, BAT, Nestlé, and Nagad</strong>.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        Specialized in automation-based operations, delivering applications serving{" "}
                        <strong className="text-white">10,000+ users</strong> with{" "}
                        <strong className="text-white">100,000+ daily transactions</strong>. Expert in offline-first
                        architecture, real-time location tracking, face detection, and liveness verification.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Proven track record implementing agile methodologies and cutting-edge technologies to improve
                        performance, security, and scalability while collaborating with cross-functional teams.
                    </p>
                </motion.div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {highlights.map((highlight, index) => (
                        <motion.div
                            key={highlight.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="glass-card p-6 md:p-8 hover:scale-105 transition-transform"
                        >
                            <div className={`w-14 h-14 rounded-lg bg-gradient-to-br from-${highlight.color}-500 to-${highlight.color}-700 flex items-center justify-center mb-4`}>
                                <highlight.icon size={28} className="text-white" />
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-white">{highlight.title}</h4>
                            <p className="text-gray-400 leading-relaxed">{highlight.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Specializations */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-card p-8 md:p-12 max-w-5xl mx-auto"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 gradient-text text-center">
                        Core Specializations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {specializations.map((spec, index) => (
                            <motion.div
                                key={spec}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.05 * index }}
                                className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                                <span className="text-gray-300 font-medium">{spec}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Soft Skills & Languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-6 md:p-8"
                    >
                        <h4 className="text-xl font-bold mb-4 text-white">Soft Skills</h4>
                        <ul className="space-y-2">
                            {["Agile Methodologies", "Cross-functional Collaboration", "Problem-solving", "Technical Leadership"].map((skill) => (
                                <li key={skill} className="flex items-center space-x-2 text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                    <span>{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-6 md:p-8"
                    >
                        <h4 className="text-xl font-bold mb-4 text-white">Languages</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center justify-between text-gray-300">
                                <span>English</span>
                                <span className="text-sm text-gray-400">Professional</span>
                            </li>
                            <li className="flex items-center justify-between text-gray-300">
                                <span>Bengali</span>
                                <span className="text-sm text-gray-400">Native</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
