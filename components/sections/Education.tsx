"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";

export function Education() {
    const certifications = [
        "JavaScript Basic Certification",
        "Web Design (Creative IT)",
        "React Specialist",
        "Complete Android App Development Masterclass",
        "Advanced Mobile App Marketing",
    ];

    return (
        <section id="education" className="section-padding bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Education & <span className="gradient-text">Certifications</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Academic background and professional certifications
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8 hover:scale-105 transition-transform"
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                                <GraduationCap size={28} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Education</h3>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-white">
                                Bachelor of Science in Computer Science & Engineering
                            </h4>
                            <p className="text-blue-400 font-medium">Green University of Bangladesh</p>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                <div className="flex items-center space-x-2">
                                    <Calendar size={14} />
                                    <span>January 2017 – April 2020</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin size={14} />
                                    <span>Dhaka, Bangladesh</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-700">
                                <h5 className="text-sm font-semibold text-white mb-3">Highlights:</h5>
                                <ul className="space-y-2">
                                    {[
                                        "Graduated with strong academic performance",
                                        "Led final year projects",
                                        "Built multiple academic software projects",
                                        "Participated in hackathons",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start space-x-2 text-sm text-gray-400">
                                            <span className="text-green-400 mt-1">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8 hover:scale-105 transition-transform"
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                                <Award size={28} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Certifications</h3>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={cert}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="flex items-start space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <Award size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-300 font-medium">{cert}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-700">
                            <p className="text-sm text-gray-400 italic">
                                Committed to continuous learning and professional development in the ever-evolving
                                field of software engineering.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
