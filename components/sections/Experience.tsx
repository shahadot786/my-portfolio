"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, TrendingUp } from "lucide-react";

export function Experience() {
    const experiences = [
        {
            type: "work",
            date: "July 2024 – Present",
            title: "Mobile Application Developer",
            company: "HawkEyes Digital Monitoring Limited",
            location: "Dhaka, Bangladesh",
            description:
                "Lead development of React Native applications for Unilever, BAT, Nestlé, and Nagad serving 10,000+ territory managers with 100,000+ daily transactions.",
            achievements: [
                "Architected offline-first mobile solutions ensuring seamless functionality in low/no-connectivity scenarios, improving reliability by 40%",
                "Implemented advanced features: real-time face recognition, liveness detection, display capture prevention, asset tracking, GPS monitoring",
                "Developed multi-role applications (M-Lens, CM Supervisor, CM Live, MS Live) with role-specific dashboards and functionalities",
                "Integrated real-time data synchronization enabling administrators to access market data via remote portals",
                "Collaborated with cross-functional teams to define features and deliver products exceeding client expectations",
            ],
            technologies: ["React Native", "Redux", "TypeScript", "GPS", "Offline-first", "Face Detection"],
        },
        {
            type: "work",
            date: "June 2023 – June 2024",
            title: "Jr. React Native Developer",
            company: "HawkEyes Digital Monitoring Limited",
            location: "Dhaka, Bangladesh",
            description:
                "Delivered multiple React Native applications for enterprise clients with high reliability and performance.",
            achievements: [
                "Delivered multiple React Native applications for enterprise clients with high reliability and performance",
                "Created cost-effective cross-platform solutions providing consistent UX across Android and iOS devices",
                "Implemented agile methodologies integrating cutting-edge technologies for improved performance and security",
                "Resolved critical technical issues supporting app portfolio expansion, contributing to 30% growth in user satisfaction",
            ],
            technologies: ["React Native", "Redux", "JavaScript", "REST API", "Agile"],
        },
        {
            type: "work",
            date: "January 2023 – May 2023",
            title: "Jr. React Native Developer",
            company: "TFP Solutions Bangladesh Ltd",
            location: "Dhaka, Bangladesh",
            description:
                "Built Hello Superstar, a fan-based social media app connecting celebrities and fans globally with two-way communication.",
            achievements: [
                "Implemented user authentication, live sessions, auditions, chats, meetups, personalized greetings, and E-Showcase features",
                "Utilized REST APIs to retrieve data from AWS S3, enhancing application functionality and user engagement",
                "Maintained high-quality, efficient, reusable code following React Native best practices with 99% uptime",
            ],
            technologies: ["React Native", "Redux", "AWS S3", "REST API", "Firebase"],
        },
        {
            type: "work",
            date: "June 2022 – December 2022",
            title: "Frontend Developer",
            company: "Global Skills Development Agency",
            location: "Dhaka, Bangladesh",
            description:
                "Developed online learning platform using Vue.js and Laravel with Redux, Tailwind CSS, and REST API integration.",
            achievements: [
                "Designed user-friendly interfaces simplifying management and improving user experience by 25%",
                "Created clean, modular frontend codebase emphasizing maintainability and scalability",
                "Integrated third-party applications enhancing software features and performance",
            ],
            technologies: ["Vue.js", "Laravel", "Tailwind CSS", "Redux", "REST API"],
        },
        {
            type: "education",
            date: "January 2017 – April 2020",
            title: "Bachelor of Science in Computer Science & Engineering",
            company: "Green University of Bangladesh",
            location: "Dhaka, Bangladesh",
            description:
                "Graduated with a B.Sc. in Computer Science specializing in software engineering and mobile application development.",
            achievements: [
                "Graduated with strong academic performance",
                "Led final year projects",
                "Built multiple academic software projects",
                "Participated in hackathons",
            ],
            technologies: ["Java", "Kotlin", "JavaScript", "Data Structures", "Algorithms"],
        },
    ];

    return (
        <section id="experience" className="section-padding bg-slate-900">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Professional <span className="gradient-text">Journey</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        My career path and key achievements in software development
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"></div>

                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative mb-12 md:mb-16 flex items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div
                                    className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 timeline-dot z-10 ${exp.type === "education" ? "bg-gradient-to-br from-green-400 to-green-600" : ""
                                        }`}
                                ></div>

                                {/* Content Card */}
                                <div
                                    className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                                        }`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="glass-card p-6 md:p-8 hover:border-blue-400/50 transition-all"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                {exp.type === "work" ? (
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                                                        <Briefcase size={20} className="text-white" />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                                                        <GraduationCap size={20} className="text-white" />
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                                                    <p className="text-blue-400 font-medium">{exp.company}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date and Location */}
                                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                                            <div className="flex items-center space-x-2">
                                                <Calendar size={14} />
                                                <span>{exp.date}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <MapPin size={14} />
                                                <span>{exp.location}</span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                                        {/* Achievements */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-white mb-2 flex items-center space-x-2">
                                                <TrendingUp size={14} className="text-green-400" />
                                                <span>Key Achievements:</span>
                                            </h4>
                                            <ul className="space-y-2">
                                                {exp.achievements.map((achievement, i) => (
                                                    <li key={i} className="text-sm text-gray-400 flex items-start">
                                                        <span className="text-blue-400 mr-2 mt-1">▸</span>
                                                        <span>{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Technologies */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-white mb-2">Technologies:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {exp.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
