import { ExternalLink, Star, GitFork, Users, Book } from "lucide-react";

const githubStats = {
    username: "shahadot786",
    profileUrl: "https://github.com/shahadot786",
    repos: 50,
    followers: 100,
    following: 50,
};

const featuredRepos = [
    {
        name: "threads-clone",
        description: "Full-featured social threads application with GraphQL, Next.js, and PostgreSQL",
        stars: 12,
        forks: 5,
        language: "TypeScript",
        url: "https://github.com/shahadot786/threads-clone",
    },
    {
        name: "fullstack-master-repo",
        description: "Production-ready monorepo with Backend, Web (Next.js), and Mobile (React Native)",
        stars: 8,
        forks: 3,
        language: "TypeScript",
        url: "https://github.com/shahadot786/fullstack-master-repo",
    },
    {
        name: "auth-master-node",
        description: "Production-ready authentication backend with JWT, RBAC, and OTP verification",
        stars: 6,
        forks: 2,
        language: "TypeScript",
        url: "https://github.com/shahadot786/auth-master-node",
    },
    {
        name: "ai-web-analyzer",
        description: "Playwright-based web scraper with AI content analysis and SEO insights",
        stars: 5,
        forks: 1,
        language: "JavaScript",
        url: "https://github.com/shahadot786/ai-web-analyzer",
    },
    {
        name: "react-movie-app",
        description: "React 19 movie search app with Vite, TMDB API, and Appwrite backend",
        stars: 4,
        forks: 2,
        language: "TypeScript",
        url: "https://github.com/shahadot786/react-movie-app",
    },
    {
        name: "barc-lms-react-native",
        description: "Offline-first Learning Management System with quiz module and progress tracking",
        stars: 3,
        forks: 1,
        language: "TypeScript",
        url: "https://github.com/shahadot786/barc-lms-react-native",
    },
];

const languageColors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-500",
    Java: "bg-orange-500",
};

export const metadata = {
    title: "GitHub - MD. Shahadot Hossain",
    description: "GitHub profile and open source contributions of MD. Shahadot Hossain",
};

export default function GitHubPage() {
    return (
        <div className="container-custom">
            <h1 className="text-3xl font-bold text-white mb-4">GitHub</h1>
            <p className="text-zinc-400 mb-8 leading-relaxed">
                I am an active open source contributor. Here is an overview of my GitHub
                activity and some of my featured repositories.
            </p>

            {/* GitHub Profile Card */}
            <div className="card mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-zinc-700 flex items-center justify-center text-2xl font-bold text-white">
                            S
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">@{githubStats.username}</h2>
                            <p className="text-zinc-500 text-sm">Software Engineer</p>
                        </div>
                    </div>
                    <a
                        href={githubStats.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center gap-2 w-fit"
                    >
                        View Profile
                        <ExternalLink size={16} />
                    </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-800">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-zinc-400 mb-1">
                            <Book size={14} />
                        </div>
                        <p className="text-2xl font-bold text-white">{githubStats.repos}+</p>
                        <p className="text-zinc-500 text-xs">Repositories</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-zinc-400 mb-1">
                            <Users size={14} />
                        </div>
                        <p className="text-2xl font-bold text-white">{githubStats.followers}+</p>
                        <p className="text-zinc-500 text-xs">Followers</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-zinc-400 mb-1">
                            <Star size={14} />
                        </div>
                        <p className="text-2xl font-bold text-white">50+</p>
                        <p className="text-zinc-500 text-xs">Total Stars</p>
                    </div>
                </div>
            </div>

            {/* Featured Repositories */}
            <h2 className="text-xl font-bold text-white mb-6">Featured Repositories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredRepos.map((repo) => (
                    <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card hover:border-zinc-600 group"
                    >
                        <h3 className="text-white font-medium mb-2 group-hover:text-zinc-100">
                            {repo.name}
                        </h3>
                        <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{repo.description}</p>
                        <div className="flex items-center gap-4 text-zinc-500 text-xs">
                            <span className="flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${languageColors[repo.language] || "bg-zinc-500"}`} />
                                {repo.language}
                            </span>
                            <span className="flex items-center gap-1">
                                <Star size={12} />
                                {repo.stars}
                            </span>
                            <span className="flex items-center gap-1">
                                <GitFork size={12} />
                                {repo.forks}
                            </span>
                        </div>
                    </a>
                ))}
            </div>

            {/* View All Link */}
            <div className="mt-8 text-center">
                <a
                    href={githubStats.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors text-sm"
                >
                    View all repositories on GitHub →
                </a>
            </div>
        </div>
    );
}
