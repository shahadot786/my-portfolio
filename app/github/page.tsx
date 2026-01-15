import GitHubClient from "./GitHubClient";

export const metadata = {
  title: "GitHub - MD. Shahadot Hossain",
  description:
    "Open source contributions, technical stack distribution, and recent network activity of MD. Shahadot Hossain.",
  keywords: [
    "Shahadot Hossain GitHub Profile",
    "Open Source Portfolio",
    "Coding Activity Stats",
    "Technical Language Distribution",
    "Software Engineer GitHub Bangladesh",
    "Public Code Repositories",
    "Developer Contribution Feed",
  ],
  alternates: {
    canonical: "https://shahadot-hossain.vercel.app/github/",
  },
};

export default function GitHubPage() {
  return (
    <div className="container-custom">
      <h1 className="text-3xl font-bold text-white mb-4">GitHub</h1>
      <p className="text-zinc-400 mb-8 leading-relaxed">
        Open source contributor and software architect. Here is a live breakdown
        of my technical ecosystem and recent activity.
      </p>
      <GitHubClient />
    </div>
  );
}
