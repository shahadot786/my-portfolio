"use client";

import { motion } from "framer-motion";
import { PaperCard } from "@/components/ui/PaperCard";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function Skills() {
    const skillCategories = [
        {
            title: "Mobile Development",
            skills: [
                { name: "React Native", level: 95 },
                { name: "Expo", level: 90 },
                { name: "TypeScript", level: 90 },
                { name: "JavaScript", level: 95 },
            ],
        },
        {
            title: "Frontend Frameworks",
            skills: [
                { name: "Next.js", level: 85 },
                { name: "React.js", level: 90 },
                { name: "Vue.js", level: 75 },
            ],
        },
        {
            title: "Backend & APIs",
            skills: [
                { name: "Node.js", level: 85 },
                { name: "Express.js", level: 85 },
                { name: "Nest.js", level: 80 },
                { name: "REST APIs", level: 90 },
            ],
        },
        {
            title: "State Management",
            skills: [
                { name: "Redux Toolkit", level: 90 },
                { name: "React Query", level: 85 },
                { name: "Context API", level: 90 },
            ],
        },
        {
            title: "Databases",
            skills: [
                { name: "MongoDB", level: 85 },
                { name: "MySQL", level: 80 },
                { name: "Prisma ORM", level: 85 },
            ],
        },
        {
            title: "Specialized Skills",
            skills: [
                { name: "Offline-First Architecture", level: 95 },
                { name: "Face Detection", level: 85 },
                { name: "GPS Tracking", level: 90 },
                { name: "CI/CD", level: 80 },
            ],
        },
    ];

    return (
        <section id="skills" className="py-16">
            <SectionDivider />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <h2 className="text-4xl font-bold text-stone-900 mb-4">
                    Technical <span className="text-blue-600">Skills</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <PaperCard className="p-6">
                            <h3 className="text-lg font-bold text-stone-900 mb-4">
                                {category.title}
                            </h3>
                            <div className="space-y-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-stone-700">
                                                {skill.name}
                                            </span>
                                            <span className="text-xs font-semibold text-blue-600">
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: skillIndex * 0.1 }}
                                                className="h-full bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PaperCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
