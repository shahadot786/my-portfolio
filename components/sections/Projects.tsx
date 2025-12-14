"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star, TrendingUp } from "lucide-react";
import Image from "next/image";

export function Projects() {
    const projects = [
        {
            title: "Unilever TM (M-Lens & CM Supervisor)",
            description:
                "Multi-role application suite for field operations with M-Lens supporting multiple roles and CM Supervisor for supervisory tasks. Implemented liveness detection, display capture prevention, asset tracking, and real-time location monitoring.",
            image: "https://res.cloudinary.com/dmojailax/image/upload/v1762875949/uniliver_ohmc80.png",
            technologies: ["React Native", "Redux", "GPS", "Offline-first", "TypeScript"],
            metrics: [
                "10,000+ TM users",
                "100,000+ daily executions",
                "Real-time data access",
                "Improved field efficiency",
            ],
            appStore: "https://apps.apple.com/us/app/m-lens/id6754874179",
            playStore: "",
            github: "",
            featured: true,
        },
        {
            title: "BAT MM Automation (CM Live & MS Live)",
            description:
                "Developed automation suite with CM Live for field operations and MS Live for supervisory management. Integrated liveness detection, asset tracking, and real-time location monitoring, optimized for 1000+ concurrent users.",
            image: "https://res.cloudinary.com/dmojailax/image/upload/v1765714651/bat_qgkp9i.png",
            technologies: ["React Native", "Redux", "REST API", "Location Tracking"],
            metrics: [
                "Improved operational efficiency",
                "Enhanced supervisor oversight",
                "Real-time data reporting",
                "Scalable mobile architecture",
            ],
            appStore: "",
            playStore: "",
            github: "",
            featured: true,
        },
        {
            title: "Nagad TM Suite (Pulse TMR, TMS, MR, MS)",
            description:
                "Built suite of mobile apps for Nagad territory management with role-specific dashboards and offline-first approach. Developed user authentication, real-time location tracking, and comprehensive CRUD operations with automatic sync.",
            image: "https://res.cloudinary.com/dmojailax/image/upload/v1762876117/nagad_pjdnzn.png",
            technologies: ["React Native", "MMKV", "Offline Sync", "GPS", "TypeScript"],
            metrics: [
                "10K+ downloads",
                "5K+ active users",
                "92% data loss reduction",
                "4.8★ rating",
            ],
            appStore: "",
            playStore: "https://play.google.com/store/apps/details?id=com.nagadtmsapp",
            github: "",
            featured: true,
        },
        {
            title: "Hello Superstar",
            description:
                "Social media app connecting celebrities and fans with live sessions, auditions, chats, meetups, and E-Showcase. Implemented fan groups, Q&A sessions, and exclusive paid content with AWS S3 integration.",
            image: "https://res.cloudinary.com/dmojailax/image/upload/v1765714649/hello-supersatat_e0rato.webp",
            technologies: ["React Native", "Redux", "Firebase", "AWS S3", "REST API"],
            metrics: [
                "50K+ downloads",
                "4.4★+ Play Store rating",
                "Live sessions & fan groups",
                "Exclusive paid content support",
            ],
            appStore: "",
            playStore: "https://play.google.com/store/apps/details?id=com.hellosuperstars",
            github: "",
            featured: true,
        },
        {
            title: "Shopora—Multi-Vendor eCommerce SaaS",
            description:
                "Full-stack multi-vendor eCommerce platform built with Nx monorepo architecture. Architected backend with Express.js API Gateway, Auth Service, Product Service, and Order Service. Implemented JWT authentication, Redis caching, and Swagger API documentation.",
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
            technologies: ["Next.js", "Node.js", "Prisma", "MongoDB", "Redis", "Nx Monorepo"],
            metrics: [
                "Microservices architecture",
                "JWT authentication with refresh tokens",
                "Redis caching & rate limiting",
                "Email verification system",
            ],
            appStore: "",
            playStore: "",
            github: "https://github.com/shahadot786/shopora-multi-vendor-saas",
            featured: false,
        },
        {
            title: "HawkEyes Universe (HE Universe)",
            description:
                "Advanced prototype showcasing innovative UX and cutting-edge mobile technologies. Features multiple AI modules including FMCG Analysis, Bangla OCR, Hotspot, Facial Recognition, Material Detection, NLP, Face Detection, Memo OCR, and more.",
            image: "https://res.cloudinary.com/dmojailax/image/upload/v1762875324/he-universe_o2wq7a.png",
            technologies: ["Expo", "React Native", "Redux", "TypeScript", "AI/ML", "Liveness"],
            metrics: [
                "Multiple AI modules",
                "Real-time media analysis",
                "Image, audio, text inputs",
                "Industry-specific insights",
            ],
            appStore: "https://apps.apple.com/us/app/he-universe/id6754590356",
            playStore: "",
            github: "",
            featured: false,
        },
        {
            title: "YouTube Clone - React Native",
            description:
                "A fully functional YouTube clone built with React Native, Expo, and TypeScript. Features include video browsing, search, channel viewing, comprehensive error handling, and modular architecture.",
            image: "https://res.cloudinary.com/dmojailax/image/upload/v1765714649/youtube-clone_sviiyq.jpg",
            technologies: ["React Native", "Expo", "TypeScript", "React Navigation", "RapidAPI"],
            metrics: [
                "Browse trending videos",
                "Channel pages with playlists",
                "Search functionality",
                "Comprehensive error handling",
            ],
            appStore: "",
            playStore: "",
            github: "https://github.com/shahadot786/react-native-youtube-clone",
            featured: false,
        },
    ];

    const featuredProjects = projects.filter((p) => p.featured);
    const otherProjects = projects.filter((p) => !p.featured);

    return (
        <section id="projects" className="section-padding bg-slate-900">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Showcasing impactful solutions with real-world results for enterprise clients
                    </p>
                </motion.div>

                {/* Featured Projects - Large Cards */}
                <div className="space-y-12 mb-16">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Project Image */}
                            <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="project-card overflow-hidden"
                                >
                                    <div className="relative h-64 md:h-80 lg:h-96">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Project Info */}
                            <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                                <div className="glass-card p-8">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Star size={20} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-medium text-yellow-400">Featured Project</span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                                    {/* Technologies */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-white mb-3">Technologies:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1.5 text-sm font-medium rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Metrics */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                                            <TrendingUp size={16} className="text-green-400" />
                                            <span>Key Metrics:</span>
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {project.metrics.map((metric) => (
                                                <div key={metric} className="flex items-start space-x-2 text-sm text-gray-400">
                                                    <span className="text-green-400 mt-1">✓</span>
                                                    <span>{metric}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="flex flex-wrap gap-3">
                                        {project.appStore && (
                                            <a
                                                href={project.appStore}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-primary inline-flex items-center space-x-2 text-sm"
                                            >
                                                <ExternalLink size={16} />
                                                <span>App Store</span>
                                            </a>
                                        )}
                                        {project.playStore && (
                                            <a
                                                href={project.playStore}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-primary inline-flex items-center space-x-2 text-sm"
                                            >
                                                <ExternalLink size={16} />
                                                <span>Play Store</span>
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary inline-flex items-center space-x-2 text-sm"
                                            >
                                                <Github size={16} />
                                                <span>GitHub</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Other Projects - Grid */}
                <div>
                    <h3 className="text-3xl font-bold mb-8 text-center">
                        Other <span className="gradient-text">Projects</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="project-card overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative h-48">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h4 className="text-xl font-bold mb-3 text-white">{project.title}</h4>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Links */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.appStore && (
                                            <a
                                                href={project.appStore}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                                            >
                                                <ExternalLink size={14} />
                                                <span>App Store</span>
                                            </a>
                                        )}
                                        {project.playStore && (
                                            <a
                                                href={project.playStore}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                                            >
                                                <ExternalLink size={14} />
                                                <span>Play Store</span>
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                                            >
                                                <Github size={14} />
                                                <span>GitHub</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
