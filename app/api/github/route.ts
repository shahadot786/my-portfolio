import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

export async function GET() {
    const token = process.env.GITHUB_ACCESS_TOKEN;
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "shahadot786";

    let octokit = new Octokit({
        auth: token,
    });

    try {
        console.log("Fetching enhanced GitHub data for user:", username);

        let profile;
        let repos: any[] = [];
        let events: any[] = [];

        try {
            // Fetch everything with potential token
            const [{ data: profile_res }, { data: repos_res }, { data: events_res }] = await Promise.all([
                octokit.users.getByUsername({ username }),
                octokit.repos.listForUser({
                    username,
                    sort: "updated",
                    direction: "desc",
                    per_page: 100,
                }),
                octokit.activity.listPublicEventsForUser({
                    username,
                    per_page: 20,
                })
            ]);
            profile = profile_res;
            repos = repos_res;
            events = events_res;
            console.log("Fetched enhanced data with token successfully");
        } catch (error: any) {
            if (error.status === 401 || error.status === 403) {
                console.warn(`GitHub token issue (${error.status}). Falling back to unauthenticated...`);
                octokit = new Octokit();
                const [{ data: profile_res }, { data: repos_res }, { data: events_res }] = await Promise.all([
                    octokit.users.getByUsername({ username }),
                    octokit.repos.listForUser({
                        username,
                        sort: "updated",
                        direction: "desc",
                        per_page: 100,
                    }),
                    octokit.activity.listPublicEventsForUser({
                        username,
                        per_page: 20,
                    })
                ]);
                profile = profile_res;
                repos = repos_res;
                events = events_res;
                console.log("Fetched enhanced data without token successfully");
            } else {
                throw error;
            }
        }

        // 1. Language Profile Calculation
        const languageMap: Record<string, number> = {};
        repos.forEach((repo) => {
            if (repo.language) {
                languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
            }
        });
        const totalWithLanguage = Object.values(languageMap).reduce((a, b) => a + b, 0);
        const languageProfile = Object.entries(languageMap)
            .map(([name, count]) => ({
                name,
                percentage: Math.round((count / totalWithLanguage) * 100),
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5);

        // 2. Priority Repositories (6 most recent)
        const priorityRepos = repos
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
            .slice(0, 6);

        // 3. Network Activity (Formatted Events)
        const activity = events
            .map((event) => {
                let description = "";
                if (event.type === "PushEvent") {
                    description = `Pushed to ${event.repo.name.split("/")[1]}`;
                } else if (event.type === "CreateEvent") {
                    description = `Created ${event.payload.ref_type} in ${event.repo.name.split("/")[1]}`;
                } else if (event.type === "WatchEvent") {
                    description = `Starred ${event.repo.name.split("/")[1]}`;
                } else if (event.type === "PullRequestEvent") {
                    description = `${event.payload.action} PR in ${event.repo.name.split("/")[1]}`;
                } else {
                    description = `Activity in ${event.repo.name.split("/")[1]}`;
                }
                return {
                    id: event.id,
                    type: event.type,
                    description,
                    repo: event.repo.name,
                    date: event.created_at,
                };
            })
            .slice(0, 10);

        return NextResponse.json({
            profile: {
                username: profile.login,
                avatarUrl: profile.avatar_url,
                bio: profile.bio,
                publicRepos: profile.public_repos,
                followers: profile.followers,
                following: profile.following,
                profileUrl: profile.html_url,
                totalStars: repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0),
            },
            priorityRepos: priorityRepos.map((repo) => ({
                name: repo.name,
                description: repo.description,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language,
                url: repo.html_url,
                updatedAt: repo.updated_at,
            })),
            languageProfile,
            activity,
            reposCount: repos.length
        });
    } catch (error: any) {
        console.error("Error fetching GitHub data:", error.message, error.status);
        return NextResponse.json({
            error: "Failed to fetch GitHub data",
            details: error.message,
            status: error.status
        }, { status: error.status || 500 });
    }
}
