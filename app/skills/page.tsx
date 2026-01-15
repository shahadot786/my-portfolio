import { Code2, Smartphone, Server, Database, GitBranch, Cloud, Layers, Zap } from "lucide-react";

const skillCategories = [
    {
        title: "Core Languages",
        icon: Code2,
        skills: ["JavaScript", "TypeScript", "SQL", "Java"],
    },
    {
        title: "Frontend & Mobile",
        icon: Smartphone,
        skills: ["React Native", "Expo", "Next.js", "React.js", "Vue.js"],
    },
    {
        title: "Backend & APIs",
        icon: Server,
        skills: ["Node.js", "Express.js", "GraphQL", "Apollo Server", "Prisma"],
    },
    {
        title: "Databases",
        icon: Database,
        skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "MMKV", "AsyncStorage"],
    },
    {
        title: "State Management",
        icon: GitBranch,
        skills: ["Redux", "Redux Toolkit", "Zustand", "React Query", "Apollo Client"],
    },
    {
        title: "Cloud & DevOps",
        icon: Cloud,
        skills: ["AWS (S3, ECS, EC2)", "Docker", "GitHub Actions", "Vercel", "Firebase"],
    },
    {
        title: "Architecture",
        icon: Layers,
        skills: ["Microservices", "Nx Monorepo", "Clean Architecture", "MVVM/MVC", "Offline-first"],
    },
    {
        title: "Specialized",
        icon: Zap,
        skills: ["Face Detection", "GPS Tracking", "Bluetooth", "WebSockets", "Real-time Systems"],
    },
];

export const metadata = {
    title: "Skills - MD. Shahadot Hossain",
    description: "Technical skills and expertise of MD. Shahadot Hossain specializing in React Native, TypeScript, and Full-stack Development.",
    keywords: [
        "Shahadot Hossain Technical Skills",
        "React Native Expert Bangladesh",
        "TypeScript Developer Bangladesh",
        "Mobile App Architecture Expert",
        "Full Stack Development Tech Stack",
        "Offline-first Sync Specialist",
        "Real-time System Development",
        "Cloud Computing Skills AWS",
        "Enterprise Software Architecture",
        "Cross-platform Mobile Development Skills",
    ],
    alternates: {
        canonical: "https://shahadot-hossain.vercel.app/skills/",
    },
};

export default function SkillsPage() {
    return (
        <div className="container-custom">
            <h1 className="text-3xl font-bold text-white mb-4">Technical Skills</h1>
            <p className="text-zinc-400 mb-12 leading-relaxed">
                A comprehensive overview of technologies and tools I work with. I focus on
                building scalable, high-performance applications with modern tech stacks.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {skillCategories.map((category, index) => (
                    <div key={index} className="card group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                                <category.icon size={20} />
                            </div>
                            <h2 className="text-lg font-semibold text-white">{category.title}</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                                <span key={skill} className="tag">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="border-t border-zinc-800 pt-8">
                <div className="card bg-zinc-900/50">
                    <h3 className="text-lg font-semibold text-white mb-3">Summary</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        With <span className="text-white font-medium">4+ years</span> of experience, I specialize in{" "}
                        <span className="text-white font-medium">React Native</span> and{" "}
                        <span className="text-white font-medium">TypeScript</span> for building enterprise-grade mobile applications.
                        My expertise includes offline-first architecture, real-time systems, and integrating
                        advanced features like biometric verification and GPS tracking.
                    </p>
                </div>
            </div>
        </div>
    );
}
