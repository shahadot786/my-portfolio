import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const GITHUB_USERNAME = "shahadot786";

// Fetch latest GitHub data
async function fetchGitHubData() {
    try {
        const headers: HeadersInit = {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "Portfolio-AI-Assistant",
        };

        if (GITHUB_TOKEN) {
            headers["Authorization"] = `token ${GITHUB_TOKEN}`;
        }

        // Fetch user data
        const userResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}`,
            { headers, next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!userResponse.ok) {
            throw new Error("Failed to fetch GitHub user data");
        }

        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
            { headers, next: { revalidate: 3600 } }
        );

        if (!reposResponse.ok) {
            throw new Error("Failed to fetch GitHub repos");
        }

        const reposData = await reposResponse.json();

        // Format recent repositories
        const recentRepos = reposData
            .slice(0, 5)
            .map((repo: any) => ({
                name: repo.name,
                description: repo.description || "No description",
                language: repo.language,
                stars: repo.stargazers_count,
                updated: new Date(repo.updated_at).toLocaleDateString(),
            }));

        return {
            totalRepos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            recentRepos,
            lastUpdated: new Date().toISOString(),
        };
    } catch (error) {
        return null;
    }
}

export async function POST(request: NextRequest) {
    try {
        // Check if API key is configured
        if (!GEMINI_API_KEY) {
            return NextResponse.json(
                {
                    error: "AI service is not configured. Please set up GEMINI_API_KEY in environment variables.",
                    details: "The administrator needs to add GEMINI_API_KEY to .env.local file",
                },
                { status: 503 }
            );
        }

        const body = await request.json();
        const { messages, context } = body;

        if (!messages || messages.length === 0) {
            return NextResponse.json(
                { error: "Messages are required" },
                { status: 400 }
            );
        }

        // Fetch real-time GitHub data
        const githubData = await fetchGitHubData();

        // Build enhanced context with GitHub data
        let enhancedContext = context;

        if (githubData) {
            enhancedContext += `\n\n**REAL-TIME GITHUB DATA (Updated: ${new Date().toLocaleString()}):**
- Total Public Repositories: ${githubData.totalRepos}
- Followers: ${githubData.followers}
- Following: ${githubData.following}

**Recent Repositories:**
${githubData.recentRepos
                    .map(
                        (repo: any, index: number) =>
                            `${index + 1}. ${repo.name} (${repo.language || "N/A"})
   - Description: ${repo.description}
   - Stars: ${repo.stars}
   - Last Updated: ${repo.updated}`
                    )
                    .join("\n")}

Use this real-time data when answering questions about recent work, projects, or GitHub activity.`;
        }

        // Initialize Gemini model
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

        // Build conversation history
        const conversationHistory = messages
            .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
            .join("\n");

        // Create prompt with enhanced context
        const prompt = `${enhancedContext}

Conversation history:
${conversationHistory}

Please provide a helpful, professional, and concise response. If asked about availability or to schedule a meeting, encourage them to use the contact form or email directly. When discussing recent work or projects, use the real-time GitHub data provided above.`;

        // Generate response
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json(
            { message: text, githubDataIncluded: !!githubData },
            { status: 200 }
        );
    } catch (error: any) {

        // Provide more specific error messages
        let errorMessage = "Failed to generate response. Please try again later.";

        if (error.message?.includes("API key")) {
            errorMessage = "Invalid API key. Please check your GEMINI_API_KEY configuration.";
        } else if (error.message?.includes("quota")) {
            errorMessage = "API quota exceeded. Please try again later.";
        } else if (error.message?.includes("network")) {
            errorMessage = "Network error. Please check your internet connection.";
        }

        return NextResponse.json(
            { error: errorMessage, details: error.message },
            { status: 500 }
        );
    }
}
