import PostsClient from "./PostsClient";

export const metadata = {
  title: "Posts - MD. Shahadot Hossain",
  description:
    "Technical articles, tutorials, and insights on software development, React Native, TypeScript, and enterprise mobile solutions by MD. Shahadot Hossain.",
  keywords: [
    "Shahadot Hossain Blog",
    "Software Engineering Articles",
    "React Native Tutorials",
    "TypeScript Tips",
    "Mobile Development Insights",
    "Technical Blog Bangladesh",
    "Developer Articles",
  ],
  alternates: {
    canonical: "https://shahadot-hossain.vercel.app/posts/",
  },
};

export default function PostsPage() {
  return (
    <div className="container-custom">
      <h1 className="text-3xl font-bold text-white mb-4">Posts</h1>
      <p className="text-zinc-400 mb-8 leading-relaxed">
        Thoughts, tutorials, and insights on software development, architecture,
        and building scalable applications.
      </p>
      <PostsClient />
    </div>
  );
}
