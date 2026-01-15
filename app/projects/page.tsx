import { Github, ExternalLink, Smartphone } from "lucide-react";

interface Project {
  title: string;
  description: string;
  metrics?: { label: string; value: string }[];
  technologies: string[];
  github?: string;
  liveDemo?: string;
  appStore?: string;
  playStore?: string;
  appDemo?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Threads Clone",
    description:
      "A full-featured social threads application built with GraphQL, Next.js, and PostgreSQL. Features Supabase authentication with email verification, nested conversation threads, media uploads, follow system, activity feed, hashtags, and @mentions.",
    metrics: [
      { label: "Stack", value: "GraphQL + Next.js" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Auth", value: "Supabase" },
    ],
    technologies: [
      "GraphQL",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "TypeScript",
    ],
    github: "https://github.com/shahadot786/threads-clone",
    liveDemo: "https://threads-clone-three-nu.vercel.app/",
    featured: true,
  },
  {
    title: "Unilever TM (M-Lens & CM Supervisor)",
    description:
      "Multi-role application suite for field operations serving 10,000+ territory managers. Implemented liveness detection, display capture prevention, asset tracking, and real-time location monitoring.",
    metrics: [
      { label: "Users", value: "10K+" },
      { label: "Daily Txns", value: "100K+" },
      { label: "Data Loss Reduction", value: "92%" },
    ],
    technologies: [
      "React Native",
      "Redux",
      "GPS",
      "Offline-first",
      "TypeScript",
    ],
    appStore: "https://apps.apple.com/us/app/m-lens/id6754874179",
    featured: true,
  },
  {
    title: "BAT MM Automation (CM Live & MS Live)",
    description:
      "Developed automation suite with CM Live for field operations and MS Live for supervisory management. Integrated liveness detection, asset tracking, and real-time location monitoring, optimized for 1000+ concurrent users.",
    technologies: ["React Native", "Redux", "REST API", "Location Tracking"],
    featured: true,
  },
  {
    title: "Nagad TM Suite",
    description:
      "Suite of mobile apps for Nagad territory management with role-specific dashboards and offline-first approach. Features user authentication, real-time location tracking, and comprehensive CRUD operations with automatic sync.",
    metrics: [
      { label: "Downloads", value: "10K+" },
      { label: "Active Users", value: "5K+" },
      { label: "Rating", value: "4.8★" },
    ],
    technologies: ["React Native", "MMKV", "Offline Sync", "GPS", "TypeScript"],
    playStore: "https://play.google.com/store/apps/details?id=com.nagadtmsapp",
    featured: true,
  },
  {
    title: "Nexus Monorepo",
    description:
      "A production-ready, type-safe fullstack monorepo template featuring Backend (Node.js/Express/MongoDB), Web (Next.js), and Mobile (React Native/Expo) applications. Microservices architecture with JWT authentication and Redis caching.",
    metrics: [
      { label: "Services", value: "10+" },
      { label: "Auth", value: "JWT + Refresh" },
      { label: "Cache", value: "Redis" },
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "Express.js",
      "React Native",
      "MongoDB",
      "Redis",
      "Nx",
    ],
    github: "https://github.com/shahadot786/fullstack-master-repo",
    liveDemo: "https://nexus-web-portal-demo.vercel.app/",
    appDemo: "https://appetize.io/app/b_lgzl4scji52pd3ghn5lyln5vfe",
    featured: true,
  },
  {
    title: "HawkEyes Universe (HE Universe)",
    description:
      "Advanced prototype showcasing innovative UX and cutting-edge mobile technologies. Features multiple AI modules including FMCG Analysis, Bangla OCR, Facial Recognition, Material Detection, and NLP.",
    technologies: [
      "Expo",
      "React Native",
      "Redux",
      "TypeScript",
      "AI/ML",
      "Liveness",
    ],
    appStore: "https://apps.apple.com/us/app/he-universe/id6754590356",
    featured: true,
  },
  {
    title: "Hello Superstar",
    description:
      "Social media app connecting celebrities and fans with live sessions, auditions, chats, meetups, and E-Showcase. Features fan groups, Q&A sessions, and exclusive paid content.",
    metrics: [
      { label: "Downloads", value: "50K+" },
      { label: "Rating", value: "4.4★" },
    ],
    technologies: ["React Native", "Redux", "Firebase", "AWS S3", "REST API"],
    playStore:
      "https://play.google.com/store/apps/details?id=com.hellosuperstars",
    featured: true,
  },
  {
    title: "Shopora Multi-Vendor eCommerce SaaS",
    description:
      "Full-stack multi-vendor eCommerce platform built with Nx monorepo architecture. Features Express.js API Gateway, Auth Service, Product Service, and Order Service.",
    technologies: [
      "Next.js",
      "Node.js",
      "Prisma",
      "MongoDB",
      "Redis",
      "Nx Monorepo",
    ],
    github: "https://github.com/shahadot786/shopora-multi-vendor-saas",
  },
  {
    title: "URL Shortener (SSR)",
    description:
      "Full-stack URL shortener application with click tracking and analytics. Features server-side rendering with EJS, MongoDB database, and nanoid for generating short URLs.",
    technologies: ["Node.js", "Express.js", "MongoDB", "EJS", "Nanoid"],
    github: "https://github.com/shahadot786/url-shortener-ssr",
    liveDemo: "https://url-shortener-ssr.onrender.com/",
  },
  {
    title: "AI Web Analyzer",
    description:
      "Powerful Playwright-based web scraper with AI analysis capabilities. Features AI-powered content summarization, entity extraction, SEO insights, and sentiment analysis.",
    technologies: ["Node.js", "Playwright", "AI/ML", "Redis", "Express.js"],
    github: "https://github.com/shahadot786/ai-web-analyzer",
  },
  {
    title: "Auth Master Node",
    description:
      "Production-ready authentication backend with JWT access/refresh tokens, role-based access control (RBAC), email verification with OTP, and comprehensive security measures.",
    technologies: [
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "JWT",
    ],
    github: "https://github.com/shahadot786/auth-master-node",
  },
  {
    title: "Movie Finder",
    description:
      "React 19 movie search application with real-time search functionality and trending movies tracking. Built with Vite, uses TMDB API, and Appwrite for backend.",
    technologies: ["React 19", "Vite", "Appwrite", "TMDB API"],
    github: "https://github.com/shahadot786/react-movie-app",
    liveDemo: "https://react-movie-app-new.vercel.app/",
  },
  {
    title: "BARC LMS",
    description:
      "Learning Management System mobile app with offline-first architecture. Features quiz module with 40 questions, course management with automatic caching, and progress tracking.",
    technologies: [
      "React Native",
      "Redux",
      "MMKV",
      "AsyncStorage",
      "Offline-first",
    ],
    github: "https://github.com/shahadot786/barc-lms-react-native",
  },
  {
    title: "Memeify Meme Generator",
    description:
      "Cross-platform meme generator app. Browse templates from Imgflip API, search GIFs from Tenor, add customizable text with multiple fonts, and save/share creations.",
    technologies: [
      "React Native",
      "Expo SDK 54",
      "TypeScript",
      "Zustand",
      "MMKV",
    ],
    github:
      "https://github.com/shahadot786/memeify-react-native-meme-generator",
  },
  {
    title: "Rongta Bluetooth Printer",
    description:
      "React Native application for connecting to Rongta RPP300BU Bluetooth thermal printers. Features device scanning, printer connection management, and formatted receipt printing.",
    technologies: ["React Native", "Bluetooth", "Thermal Printing"],
    github: "https://github.com/shahadot786/rongta-print-demo",
  },
  {
    title: "Android Music Player",
    description:
      "Elegant local music player app built with Jetpack Media3 and ExoPlayer. Features waveform seekbar, notification media controls, background playback, and shuffle/repeat.",
    technologies: ["Java", "Jetpack Media3", "ExoPlayer", "Glide", "Android"],
    github: "https://github.com/shahadot786/android-music-player",
  },
  {
    title: "YouTube Clone React Native",
    description:
      "A fully functional YouTube clone built with React Native, Expo, and TypeScript. Features video browsing, search, channel viewing, and comprehensive error handling.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "React Navigation",
      "RapidAPI",
    ],
    github: "https://github.com/shahadot786/react-native-youtube-clone",
  },
];

export const metadata = {
  title: "Projects - MD. Shahadot Hossain",
  description:
    "Showcase of personal and professional software projects by MD. Shahadot Hossain, featuring mobile apps, web platforms, and open-source contributions.",
  keywords: [
    "Shahadot Hossain Software Portfolio",
    "React Native Project Demos",
    "Next.js Full-stack Showcase",
    "GraphQL Social App Prototype",
    "Enterprise Mobile Application Development",
    "Unilever Territory Manager App",
    "BAT Mobile Automation Project",
    "Fullstack Monorepo Template GitHub",
    "Android Music Player Java Source",
    "Open Source Software Bangladesh",
    "Best React Native Developer Bangladesh",
  ],
  alternates: {
    canonical: "https://shahadot-hossain.vercel.app/projects/",
  },
};

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="container-custom">
      <h1 className="text-3xl font-bold text-white mb-4">Projects</h1>
      <p className="text-zinc-400 mb-12 leading-relaxed">
        I have worked on a variety of projects over the years; some of them as a
        hobby, some as a proof of concept and others to solve my own pain
        points. Here are some of the projects that I have worked on.
      </p>

      {/* Featured Projects */}
      <div className="space-y-8 mb-16">
        {featuredProjects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {project.title}
                </h2>
              </div>
              {project.featured && (
                <span className="tag-highlight shrink-0">Featured</span>
              )}
            </div>

            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Metrics */}
            {project.metrics && (
              <div className="flex flex-wrap gap-6 mb-4 py-3 border-y border-zinc-800">
                {project.metrics.map((metric, i) => (
                  <div key={i}>
                    <p className="text-zinc-500 text-xs uppercase tracking-wide">
                      {metric.label}
                    </p>
                    <p className="text-white font-medium">{metric.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 6).map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-1.5"
                >
                  <Github size={16} />
                  GitHub
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-1.5"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
              {project.appStore && (
                <a
                  href={project.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-1.5"
                >
                  <Smartphone size={16} />
                  App Store
                </a>
              )}
              {project.playStore && (
                <a
                  href={project.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-1.5"
                >
                  <Smartphone size={16} />
                  Play Store
                </a>
              )}
              {project.appDemo && (
                <a
                  href={project.appDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-1.5"
                >
                  <Smartphone size={16} />
                  App Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Other Projects */}
      <div className="border-t border-zinc-800 pt-12">
        <h2 className="text-xl font-bold text-white mb-6">More Projects</h2>
        <p className="text-zinc-400 text-sm mb-8">
          Here are some more projects that I have worked on. You can find the
          complete list on my{" "}
          <a
            href="https://github.com/shahadot786"
            target="_blank"
            rel="noopener noreferrer"
            className="link text-green-500"
          >
            GitHub profile
          </a>
          .
        </p>

        <div className="space-y-4">
          {otherProjects.map((project, index) => (
            <a
              key={index}
              href={project.github || project.liveDemo || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 
                         hover:border-zinc-700 hover:bg-zinc-900/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-white font-medium group-hover:text-zinc-100">
                  {project.title.toLowerCase().replace(/\s+/g, "-")}
                </span>
                <span className="text-zinc-600 hidden sm:inline">—</span>
                <span className="text-zinc-500 text-sm hidden sm:inline">
                  {project.description.slice(0, 50)}...
                </span>
              </div>
              <ExternalLink
                size={16}
                className="text-zinc-600 group-hover:text-zinc-400"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
