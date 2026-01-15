import { ExternalLink } from "lucide-react";

interface Experience {
    company: string;
    location: string;
    title: string;
    period: string;
    current?: boolean;
    description: string;
    achievements: string[];
    technologies: string[];
}

const experiences: Experience[] = [
    {
        company: "HawkEyes Digital Monitoring",
        location: "Dhaka, Bangladesh",
        title: "Software Engineer",
        period: "Jun 2023 — Present",
        current: true,
        description:
            "HawkEyes is a leading technology company providing mobile solutions for Fortune 500 enterprise clients including Unilever, BAT, and Nestlé. I architect and develop high-performance mobile applications for field operations across Bangladesh.",
        achievements: [
            "Leading deployment for 10K+ territory managers with 100K+ daily transactions",
            "Architected offline-first sync engine reducing data loss incidents by 92%",
            "Implemented liveness detection & biometric verification for secure field login",
            "Refactored legacy systems into high-performance React Native/TypeScript monorepos",
            "Built real-time GPS tracking and asset management systems",
            "Developed display capture prevention and security modules",
        ],
        technologies: [
            "TypeScript",
            "React Native",
            "Redux",
            "Offline-first",
            "Face Detection",
            "GPS",
            "REST API",
        ],
    },
    {
        company: "TFP Solutions Bangladesh",
        location: "Dhaka, Bangladesh",
        title: "Jr. React Native Developer",
        period: "Jan 2023 — May 2023",
        description:
            "TFP Solutions is a technology company focused on social engagement platforms. I developed 'Hello Superstar', a high-traffic application connecting celebrities with global fanbases.",
        achievements: [
            "Implemented user authentication and live session management",
            "Optimized media delivery pipelines via AWS S3 integration",
            "Maintained 99.9% application stability during peak event loads",
            "Built real-time chat and notification systems using WebSockets",
        ],
        technologies: ["React Native", "AWS S3", "WebSockets", "Firebase", "Real-time Chat"],
    },
    {
        company: "GSDA (Global Skills Development)",
        location: "Dhaka, Bangladesh",
        title: "Frontend Developer",
        period: "Jun 2022 — Dec 2022",
        description:
            "GSDA is an educational technology company providing learning management systems. I engineered responsive web interfaces for institutional learning platforms.",
        achievements: [
            "Increased UX performance score by 25% through codebase modularization",
            "Integrated complex Laravel backend APIs into high-performance Vue.js frontend",
            "Standardized enterprise components using Tailwind CSS and Redux",
            "Implemented responsive designs for cross-device compatibility",
        ],
        technologies: ["Vue.js", "Laravel", "Redux", "Tailwind CSS", "REST API"],
    },
];

const education = {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Green University of Bangladesh",
    location: "Dhaka, Bangladesh",
    period: "Jan 2017 — Apr 2020",
    highlights: [
        "Dean's List Recognition for Academic Excellence",
        "Led multiple cross-platform mobile capstone projects",
        "Specialized in Software Engineering & Mobile Design",
        "Active participant in regional engineering symposiums",
    ],
};

export const metadata = {
    title: "Work - MD. Shahadot Hossain",
    description: "Employment history and professional experience of MD. Shahadot Hossain, and his education.",
    keywords: [
        "MD. Shahadot Hossain Work Experience",
        "Software Engineer Portfolio Bangladesh",
        "HawkEyes Digital Monitoring Software Engineer",
        "TFP Solutions Bangladesh Experience",
        "GSDA Frontend Developer Experience",
        "Enterprise Mobile App Development Bangladesh",
        "React Native Developer Resume",
        "Unilever Software Vendor Bangladesh",
        "BAT Mobile App Development",
        "Professional Software Engineer Career",
    ],
    alternates: {
        canonical: "https://shahadot-hossain.vercel.app/work/",
    },
};

export default function WorkPage() {
    return (
        <div className="container-custom">
            <h1 className="text-3xl font-bold text-white mb-4">Employment History</h1>
            <p className="text-zinc-400 mb-12 leading-relaxed">
                I have been fortunate to work with some amazing teams. I have worked mostly
                with startups but also with some large enterprises. Here is a brief overview
                of my employment history.
            </p>

            {/* Experience Timeline */}
            <div className="space-y-12 mb-16">
                {experiences.map((exp, index) => (
                    <div key={index} className="border-b border-zinc-800 pb-12 last:border-0">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                            <div>
                                <p className="text-zinc-500 text-sm">{exp.location}</p>
                                <h2 className="text-xl font-semibold text-white">
                                    {exp.title} at {exp.company}
                                </h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-500 text-sm whitespace-nowrap">
                                    {exp.period}
                                </span>
                                {exp.current && (
                                    <span className="tag-highlight">Currently Working</span>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-zinc-400 mb-6 leading-relaxed">{exp.description}</p>

                        {/* Achievements */}
                        <ul className="space-y-2 mb-6">
                            {exp.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
                                    <span className="text-zinc-600 mt-1.5">•</span>
                                    {achievement}
                                </li>
                            ))}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                                <span key={tech} className="tag">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Education Section */}
            <div className="border-t border-zinc-800 pt-12">
                <h2 className="text-2xl font-bold text-white mb-8">Education</h2>

                <div className="border-b border-zinc-800 pb-12">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                        <div>
                            <p className="text-zinc-500 text-sm">{education.location}</p>
                            <h3 className="text-xl font-semibold text-white">{education.degree}</h3>
                            <p className="text-zinc-400">{education.institution}</p>
                        </div>
                        <span className="text-zinc-500 text-sm whitespace-nowrap">
                            {education.period}
                        </span>
                    </div>

                    <ul className="space-y-2 mt-6">
                        {education.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
                                <span className="text-zinc-600 mt-1.5">•</span>
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Certifications */}
            <div className="border-t border-zinc-800 pt-12 mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Certifications</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        "JavaScript (Intermediate) - HackerRank",
                        "React Native Specialized Development",
                        "Advanced Mobile App Architecture",
                        "Web Design & Interface Engineering",
                        "Enterprise System Security & Auth",
                    ].map((cert) => (
                        <span key={cert} className="tag">
                            {cert}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
