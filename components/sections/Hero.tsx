"use client";

import { motion } from "framer-motion";
import { Briefcase, Award, Users, TrendingUp } from "lucide-react";
import { PaperCard } from "@/components/ui/PaperCard";

export function Hero() {
    const stats = [
        { icon: Briefcase, label: "Years Experience", value: "3.7+" },
        { icon: Users, label: "Active Users", value: "10K+" },
        { icon: TrendingUp, label: "Daily Transactions", value: "100K+" },
        { icon: Award, label: "Projects Delivered", value: "20+" },
    ];

    return (
        <section id="home" className="py-16">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h1 className="text-5xl font-bold text-stone-900 mb-4">
                    Software Engineer
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full mb-6"></div>
                <p className="text-xl text-stone-600 leading-relaxed max-w-3xl">
                    Proficient React Native Developer with <span className="font-semibold text-blue-600">3.7+ years of experience</span> building
                    cross-platform mobile applications for enterprise clients including <span className="font-semibold">Unilever, BAT, Nestlé, and Nagad</span>.
                    Specialized in offline-first architecture, real-time tracking, and cutting-edge mobile technologies.
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <PaperCard className="p-6 text-center">
                            <div className="flex justify-center mb-3">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                                    <stat.icon size={24} className="text-white" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-stone-900 mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-stone-600">{stat.label}</div>
                        </PaperCard>
                    </motion.div>
                ))}
            </div>

            {/* Professional Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <PaperCard className="p-8">
                    <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center">
                        <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-emerald-600 rounded-full mr-3"></span>
                        Professional Summary
                    </h2>
                    <div className="space-y-4 text-stone-700 leading-relaxed">
                        <p>
                            Results-driven Mobile Application Developer with a proven track record of delivering high-impact solutions
                            for Fortune 500 companies. Currently leading development at HawkEyes Digital Monitoring Limited, where I architect
                            and implement enterprise-grade React Native applications serving over 10,000 users daily.
                        </p>
                        <p>
                            My expertise spans the full mobile development lifecycle, from initial architecture design to deployment and
                            maintenance. I specialize in creating offline-first applications that ensure seamless functionality in
                            low-connectivity environments, implementing advanced features like real-time face recognition, liveness detection,
                            and GPS-based tracking systems.
                        </p>
                        <p>
                            With a strong foundation in modern development practices including Clean Architecture, MVVM patterns, and
                            microservices, I consistently deliver scalable, maintainable solutions that exceed client expectations and
                            drive measurable business results.
                        </p>
                    </div>
                </PaperCard>
            </motion.div>
        </section>
    );
}
