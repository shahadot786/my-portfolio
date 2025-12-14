"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { PaperCard } from "@/components/ui/PaperCard";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function Education() {
    const certifications = [
        "JavaScript Basic Certification",
        "Web Design (Creative IT)",
        "React Specialist",
        "Complete Android App Development Masterclass",
        "Advanced Mobile App Marketing",
    ];

    return (
        <section id="education" className="py-16">
            <SectionDivider />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <h2 className="text-4xl font-bold text-stone-900 mb-4">
                    Education & <span className="text-blue-600">Certifications</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Education */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <PaperCard className="p-6">
                        <div className="flex items-start space-x-4 mb-4">
                            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                <GraduationCap size={28} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-stone-900 mb-1">
                                    B.Sc. in Computer Science & Engineering
                                </h3>
                                <p className="text-lg text-blue-600 font-medium">
                                    Green University of Bangladesh
                                </p>
                                <p className="text-sm text-stone-600 mt-1">
                                    2017 – 2020 | Dhaka, Bangladesh
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-stone-700 leading-relaxed">
                            Comprehensive computer science education with focus on software engineering and mobile development.
                            Strong foundation in algorithms, data structures, and modern development practices.
                        </p>
                    </PaperCard>
                </motion.div>

                {/* Certifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <PaperCard className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                                <Award size={28} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-900">
                                Professional Certifications
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={cert}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="flex items-start space-x-3 p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
                                >
                                    <Award size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-stone-700 font-medium">{cert}</span>
                                </motion.div>
                            ))}
                        </div>
                    </PaperCard>
                </motion.div>
            </div>
        </section>
    );
}
