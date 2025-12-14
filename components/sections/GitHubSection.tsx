"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Eye, Calendar } from "lucide-react";
import { PaperCard } from "@/components/ui/PaperCard";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function GitHubSection() {
    const [stats, setStats] = useState({
        repos: 0,
        followers: 0,
        following: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.github.com/users/shahadot786`)
            .then((res) => res.json())
            .then((data) => {
                setStats({
                    repos: data.public_repos || 0,
                    followers: data.followers || 0,
                    following: data.following || 0,
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const statItems = [
        { label: "Public Repositories", value: stats.repos, icon: Github },
        { label: "Followers", value: stats.followers, icon: Star },
        { label: "Following", value: stats.following, icon: Eye },
    ];

    return (
        <section id="github" className="py-16">
            <SectionDivider />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <h2 className="text-4xl font-bold text-stone-900 mb-4">
                    GitHub <span className="text-blue-600">Activity</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statItems.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <PaperCard className="p-6 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                                    <stat.icon size={28} className="text-white" />
                                </div>
                            </div>
                            {loading ? (
                                <div className="h-10 bg-stone-200 rounded animate-pulse mb-2" />
                            ) : (
                                <div className="text-4xl font-bold text-stone-900 mb-2">
                                    {stat.value}
                                </div>
                            )}
                            <div className="text-sm text-stone-600">{stat.label}</div>
                        </PaperCard>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 text-center"
            >
                <a
                    href="https://github.com/shahadot786"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-all"
                >
                    <Github size={20} />
                    <span>View GitHub Profile</span>
                </a>
            </motion.div>
        </section>
    );
}
