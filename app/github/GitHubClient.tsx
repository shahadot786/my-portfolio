"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Star, GitFork, Users, Book, Loader, Activity, Code2, Globe } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface GitHubData {
    profile: {
        username: string;
        avatarUrl: string;
        bio: string;
        publicRepos: number;
        followers: number;
        following: number;
        profileUrl: string;
        totalStars: number;
    };
    priorityRepos: {
        name: string;
        description: string;
        stars: number;
        forks: number;
        language: string;
        url: string;
        updatedAt: string;
    }[];
    languageProfile: {
        name: string;
        percentage: number;
    }[];
    activity: {
        id: string;
        type: string;
        description: string;
        repo: string;
        date: string;
    }[];
    reposCount: number;
}

const languageColors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-500",
    Java: "bg-orange-500",
    HTML: "bg-red-500",
    CSS: "bg-purple-500",
    Python: "bg-green-500",
    Shell: "bg-zinc-400",
};

export default function GitHubClient() {
    const [data, setData] = useState<GitHubData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/github");
                const json = await res.json();
                if (!res.ok) {
                    throw new Error(json.details || json.error || "Failed to fetch GitHub data");
                }
                setData(json);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader className="animate-spin text-zinc-500 mb-4" size={32} />
                <p className="text-zinc-500">Fetching real-time data from GitHub...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="text-center py-20">
                <p className="text-red-400 mb-4">{error || "Failed to load GitHub data"}</p>
                <button onClick={() => window.location.reload()} className="btn-secondary">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <>
            {/* Profile Overview Card */}
            <div className="card mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={data.profile.avatarUrl}
                            alt={data.profile.username}
                            className="w-20 h-20 rounded-full border border-zinc-700 p-0.5"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-white">@{data.profile.username}</h2>
                            <p className="text-zinc-500 text-sm max-w-sm line-clamp-2">
                                {data.profile.bio || "Full-stack Developer & Mobile Architect"}
                            </p>
                        </div>
                    </div>
                    <a
                        href={data.profile.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center gap-2 w-fit px-6 h-10"
                    >
                        View Profile
                        <ExternalLink size={16} />
                    </a>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-800">
                    <div className="text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-zinc-500 mb-1">
                            <Book size={14} />
                            <span className="text-xs uppercase tracking-wider">Repos</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{data.profile.publicRepos}</p>
                    </div>
                    <div className="text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-zinc-500 mb-1">
                            <Star size={14} />
                            <span className="text-xs uppercase tracking-wider">Stars</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{data.profile.totalStars}</p>
                    </div>
                    <div className="text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-zinc-500 mb-1">
                            <Users size={14} />
                            <span className="text-xs uppercase tracking-wider">Followers</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{data.profile.followers}</p>
                    </div>
                    <div className="text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-zinc-500 mb-1">
                            <Activity size={14} />
                            <span className="text-xs uppercase tracking-wider">Following</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{data.profile.following}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Language Profile */}
                <div className="lg:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <Code2 size={20} className="text-zinc-400" />
                        <h2 className="text-lg font-bold text-white">Language Profile</h2>
                    </div>
                    <div className="space-y-4">
                        {data.languageProfile.map((lang) => (
                            <div key={lang.name}>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-white font-medium">{lang.name}</span>
                                    <span className="text-zinc-500">{lang.percentage}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${languageColors[lang.name] || "bg-zinc-600"} transition-all duration-1000`}
                                        style={{ width: `${lang.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Network Activity */}
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <Globe size={20} className="text-zinc-400" />
                        <h2 className="text-lg font-bold text-white">Network Activity</h2>
                    </div>
                    <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                        {data.activity.map((event) => (
                            <div key={event.id} className="flex gap-4 items-start p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
                                <div className="mt-1 p-1.5 rounded-full bg-zinc-800 text-zinc-400 flex-shrink-0">
                                    <Activity size={12} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-zinc-300 line-clamp-1">{event.description}</p>
                                    <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">
                                        {formatDistanceToNow(new Date(event.date), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Priority Repositories */}
            <h2 className="text-xl font-bold text-white mb-6">Priority Repositories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {data.priorityRepos.map((repo) => (
                    <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card group hover:border-zinc-700 transition-all duration-300"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-white font-semibold group-hover:text-zinc-100 italic">
                                {repo.name}
                            </h3>
                            <ExternalLink size={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                        </div>
                        <p className="text-zinc-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                            {repo.description || "Experimental or private project details suppressed."}
                        </p>
                        <div className="flex items-center gap-4 text-zinc-500 text-[10px] uppercase tracking-widest font-medium">
                            <span className="flex items-center gap-1.5">
                                <span
                                    className={`w-1.5 h-1.5 rounded-full ${languageColors[repo.language] || "bg-zinc-600"}`}
                                />
                                {repo.language || "Unknown"}
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

            {/* View All Redirect */}
            <div className="mt-16 text-center border-t border-zinc-800 pt-8">
                <a
                    href={data.profile.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-sm group"
                >
                    Explore all {data.reposCount} public repositories on GitHub
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
            </div>
        </>
    );
}
