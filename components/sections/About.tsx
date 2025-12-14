"use client";

import { motion } from "framer-motion";
import { Code, Smartphone, Server, Database, Zap, Shield } from "lucide-react";
import { PaperCard } from "@/components/ui/PaperCard";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function About() {
    const highlights = [
        {
            icon: Smartphone,
            title: "Mobile Development",
            description: "Expert in React Native and Expo, building cross-platform applications with native performance and seamless UX.",
        },
        {
            icon: Code,
            title: "Offline-First Architecture",
            description: "Specialized in creating robust offline-first solutions ensuring 40% improved reliability in low-connectivity scenarios.",
        },
        {
            icon: Zap,
            title: "Real-Time Features",
            description: "Implementing GPS monitoring, location tracking, and real-time data synchronization for field operations.",
        },
        {
            icon: Shield,
            title: "Advanced Security",
            description: "Expertise in face recognition, liveness detection, and secure authentication systems for enterprise applications.",
        },
        {
            icon: Server,
            title: "Backend Integration",
            description: "Proficient in Node.js, Express.js, and Nest.js with microservices architecture and clean code practices.",
        },
        {
            icon: Database,
            title: "Data Management",
            description: "Experience with MongoDB, MySQL, and Prisma ORM for efficient data handling and optimization.",
        },
    ];

    return (
        <section id="about" className="py-16">
            <SectionDivider />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <h2 className="text-4xl font-bold text-stone-900 mb-4">
                    Core <span className="text-blue-600">Competencies</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {highlights.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <PaperCard className="p-6 h-full">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                    <item.icon size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-stone-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-stone-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </PaperCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
