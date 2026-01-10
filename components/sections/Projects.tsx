"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import { SpotlightCard } from "../ui/spotlight-card";
import { Magnetic } from "../ui/magnetic";

export function Projects() {
  const projects = [
    {
      title: "Threads Clone",
      description:
        "A full-featured social threads application built with GraphQL, Next.js, and PostgreSQL. Features Supabase authentication with email verification, nested conversation threads, media uploads, follow system, activity feed, hashtags, @mentions, and a beautiful dark mode UI.",
      image:
        "https://res.cloudinary.com/dmojailax/image/upload/v1767962438/threads-clone_jwhpo2.png",
      technologies: [
        "GraphQL",
        "Next.js",
        "PostgreSQL",
        "Prisma",
        "Supabase",
        "TypeScript",
        "Apollo Server",
      ],
      metrics: [
        "Full CRUD for posts with nested threads",
        "Supabase Auth with email verification",
        "Follow system & activity feed",
        "Hashtags & @mentions support",
      ],
      appStore: "",
      playStore: "",
      github: "https://github.com/shahadot786/threads-clone",
      liveDemo: "https://threads-clone-three-nu.vercel.app/",
      featured: true,
    },
    {
      title: "Unilever TM (M-Lens & CM Supervisor)",
      description:
        "Multi-role application suite for field operations with M-Lens supporting multiple roles and CM Supervisor for supervisory tasks. Implemented liveness detection, display capture prevention, asset tracking, and real-time location monitoring.",
      image:
        "https://res.cloudinary.com/dmojailax/image/upload/v1762875949/uniliver_ohmc80.png",
      technologies: [
        "React Native",
        "Redux",
        "GPS",
        "Offline-first",
        "TypeScript",
      ],
      metrics: [
        "10,000+ TM users",
        "100,000+ daily executions",
        "Real-time data access",
        "Improved field efficiency",
      ],
      appStore: "https://apps.apple.com/us/app/m-lens/id6754874179",
      playStore: "",
      github: "",
      featured: true,
    },
    {
      title: "BAT MM Automation (CM Live & MS Live)",
      description:
        "Developed automation suite with CM Live for field operations and MS Live for supervisory management. Integrated liveness detection, asset tracking, and real-time location monitoring, optimized for 1000+ concurrent users.",
      image:
        "https://res.cloudinary.com/dmojailax/image/upload/v1765714651/bat_qgkp9i.png",
      technologies: ["React Native", "Redux", "REST API", "Location Tracking"],
      metrics: [
        "Improved operational efficiency",
        "Enhanced supervisor oversight",
        "Real-time data reporting",
        "Scalable mobile architecture",
      ],
      appStore: "",
      playStore: "",
      github: "",
      featured: true,
    },
    {
      title: "Nagad TM Suite (Pulse TMR, TMS, MR, MS)",
      description:
        "Built suite of mobile apps for Nagad territory management with role-specific dashboards and offline-first approach. Developed user authentication, real-time location tracking, and comprehensive CRUD operations with automatic sync.",
      image:
        "https://res.cloudinary.com/dmojailax/image/upload/v1762876117/nagad_pjdnzn.png",
      technologies: [
        "React Native",
        "MMKV",
        "Offline Sync",
        "GPS",
        "TypeScript",
      ],
      metrics: [
        "10K+ downloads",
        "5K+ active users",
        "92% data loss reduction",
        "4.8★ rating",
      ],
      appStore: "",
      playStore:
        "https://play.google.com/store/apps/details?id=com.nagadtmsapp",
      github: "",
      featured: true,
    },
    {
      title: "Hello Superstar",
      description:
        "Social media app connecting celebrities and fans with live sessions, auditions, chats, meetups, and E-Showcase. Implemented fan groups, Q&A sessions, and exclusive paid content with AWS S3 integration.",
      image:
        "https://res.cloudinary.com/dmojailax/image/upload/v1765714649/hello-supersatat_e0rato.webp",
      technologies: ["React Native", "Redux", "Firebase", "AWS S3", "REST API"],
      metrics: [
        "50K+ downloads",
        "4.4★+ Play Store rating",
        "Live sessions & fan groups",
        "Exclusive paid content support",
      ],
      appStore: "",
      playStore:
        "https://play.google.com/store/apps/details?id=com.hellosuperstars",
      github: "",
      featured: true,
    },
    {
      title: "Nexus Monorepo",
      description:
        "A production-ready, type-safe fullstack monorepo template featuring Backend (Node.js/Express/MongoDB), Web (Next.js), and Mobile (React Native/Expo) applications. Architected backend with Express.js API Gateway, Auth Service, Todo Service, and 10+ Services; implemented JWT authentication with refresh tokens, Redis caching, rate limiting, and email verification using Resend.",
      image:
        "https://res.cloudinary.com/dmojailax/image/upload/v1766849344/nexus_wipff2.png",
      technologies: [
        "Next.js",
        "Node.js",
        "Express.js",
        "React Native",
        "MongoDB",
        "Redis",
        "Nx Monorepo",
      ],
      metrics: [
        "Microservices architecture",
        "JWT authentication with refresh tokens",
        "WebSocket for realtime service check",
        "Swagger/OpenAPI documentation",
      ],
      appStore: "",
      playStore: "",
      github: "https://github.com/shahadot786/fullstack-master-repo",
      liveDemo: "https://nexus-web-portal-demo.vercel.app/",
      appDemo: "https://appetize.io/app/b_lgzl4scji52pd3ghn5lyln5vfe?device=pixel9pro&osVersion=15.0",
      featured: true,
    },
    {
      title: "Shopora—Multi-Vendor eCommerce SaaS",
      description:
        "Full-stack multi-vendor eCommerce platform built with Nx monorepo architecture. Architected backend with Express.js API Gateway, Auth Service, Product Service, and Order Service. Implemented JWT authentication, Redis caching, and Swagger API documentation.",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      technologies: [
        "Next.js",
        "Node.js",
        "Prisma",
        "MongoDB",
        "Redis",
        "Nx Monorepo",
      ],
      metrics: [
        "Microservices architecture",
        "JWT authentication with refresh tokens",
        "Redis caching & rate limiting",
        "Email verification system",
      ],
      appStore: "",
      playStore: "",
      github: "https://github.com/shahadot786/shopora-multi-vendor-saas",
      featured: false,
    },
    {
      title: "HawkEyes Universe (HE Universe)",
      description:
        "Advanced prototype showcasing innovative UX and cutting-edge mobile technologies. Features multiple AI modules including FMCG Analysis, Bangla OCR, Hotspot, Facial Recognition, Material Detection, NLP, Face Detection, Memo OCR, and more.",
      image:
        "https://res.cloudinary.com/dmojailax/image/upload/v1762875324/he-universe_o2wq7a.png",
      technologies: [
        "Expo",
        "React Native",
        "Redux",
        "TypeScript",
        "AI/ML",
        "Liveness",
      ],
      metrics: [
        "Multiple AI modules",
        "Real-time media analysis",
        "Image, audio, text inputs",
        "Industry-specific insights",
      ],
      appStore: "https://apps.apple.com/us/app/he-universe/id6754590356",
      playStore: "",
      github: "",
      featured: true,
    },
    {
      title: "URL Shortener (SSR)",
      description:
        "Full-stack URL shortener application with click tracking and analytics. Features server-side rendering with EJS, MongoDB database, and nanoid for generating short URLs. Includes detailed analytics dashboard with visit history and timestamps.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      technologies: ["Node.js", "Express.js", "MongoDB", "EJS", "Nanoid"],
      metrics: [
        "URL shortening with nanoid",
        "Click tracking & analytics",
        "Server-side rendering",
        "RESTful API endpoints",
      ],
      appStore: "",
      playStore: "",
      github: "https://github.com/shahadot786/url-shortener-ssr",
      liveDemo: "https://url-shortener-ssr.onrender.com/",
      featured: false,
    },
    {
      title: "AI Web Analyzer",
      description:
        "Powerful Playwright-based web scraper with AI analysis capabilities. Extracts website content including titles, headings, paragraphs, links, and images. Features AI-powered content summarization, entity extraction, SEO insights, sentiment analysis, and readability scoring.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      technologies: ["Node.js", "Playwright", "AI/ML", "Redis", "Express.js"],
      metrics: [
        "Smart web scraping",
        "AI content analysis",
        "SEO insights & scoring",
        "Sentiment analysis",
      ],
      appStore: "",
      playStore: "",
      github: "https://github.com/shahadot786/ai-web-analyzer",
      featured: false,
    },
    {
      title: "Auth Master Node",
      description:
        "Production-ready authentication backend built with TypeScript, featuring JWT access and refresh tokens, role-based access control (RBAC), email verification with OTP, password reset, and comprehensive security measures including rate limiting and input sanitization.",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
      technologies: [
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "JWT",
      ],
      metrics: [
        "JWT authentication & refresh tokens",
        "Role-based access control",
        "Email verification with OTP",
        "Comprehensive security features",
      ],
      appStore: "",
      playStore: "",
      github: "https://github.com/shahadot786/auth-master-node",
      featured: false,
    },
    {
      title: "Movie Finder",
      description:
        "React 19 movie search application with real-time search functionality and trending movies tracking. Built with Vite for optimal performance, uses TMDB API for movie data, and Appwrite for backend services. Features debounced search and modern responsive UI.",
      image:
        "https://res.cloudinary.com/dmojailax/image/upload/v1766851293/react0movie_qpx5i6.png",
      technologies: ["React 19", "Vite", "Appwrite", "TMDB API"],
      metrics: [
        "Real-time movie search",
        "Trending movies tracking",
        "Smart search popularity",
        "Lightning fast performance",
      ],
      appStore: "",
      playStore: "",
      github: "https://github.com/shahadot786/react-movie-app",
      liveDemo: "https://react-movie-app-new.vercel.app/",
      featured: false,
    },
    {
      title: "BARC LMS",
      description:
        "Learning Management System mobile app with offline-first architecture. Features quiz module with 40 questions across 4 categories, course management with automatic caching, progress tracking, and comprehensive learning statistics dashboard.",
      image:
        "https://raw.githubusercontent.com/shahadot786/barc-lms-react-native/refs/heads/master/assets/screenshots/home.jpg",
      technologies: [
        "React Native",
        "Redux",
        "MMKV",
        "AsyncStorage",
        "Offline-first",
      ],
      metrics: [
        "Offline-first architecture",
        "Quiz module with 40 questions",
        "Course management & caching",
        "Learning statistics dashboard",
      ],
      appStore: "",
      playStore: "",
      github: "https://github.com/shahadot786/barc-lms-react-native",
      featured: false,
    },
    {
      title: "Memeify - Meme Generator",
      description:
        "Cross-platform meme generator app built with Expo. Browse meme templates from Imgflip API, search GIFs from Tenor, upload custom images, add customizable text with multiple fonts, and save/share creations. Features dark/light theme support.",
      image:
        "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80",
      technologies: [
        "React Native",
        "Expo SDK 54",
        "TypeScript",
        "Zustand",
        "MMKV",
      ],
      metrics: [
        "Meme templates & GIF integration",
        "Custom text with multiple fonts",
        "Save & share functionality",
        "Cross-platform support",
      ],
      appStore: "",
      playStore: "",
      github:
        "https://github.com/shahadot786/memeify-react-native-meme-generator",
      featured: false,
    },
    {
      title: "Rongta Bluetooth Printer",
      description:
        "React Native application for connecting to Rongta RPP300BU Bluetooth thermal printers. Features Bluetooth device scanning, printer connection management, and formatted receipt printing with custom layouts and thermal printing commands.",
      image:
        "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80",
      technologies: ["React Native", "Bluetooth", "Thermal Printing"],
      metrics: [
        "Bluetooth device scanning",
        "Printer connection management",
        "Formatted receipt printing",
        "Thermal printing commands",
      ],
      appStore: "",
      playStore: "",
      github: "https://github.com/shahadot786/rongta-print-demo",
      featured: false,
    },
    {
      title: "Android Music Player",
      description:
        "Elegant local music player app built with Jetpack Media3 and ExoPlayer. Features waveform seekbar for interactive progress, album art with blurred background, notification media controls, background playback via MediaSessionService, and shuffle/repeat functionality.",
      image:
        "https://raw.githubusercontent.com/shahadot786/android-music-player/refs/heads/master/screenshots/player_ui.png",
      technologies: ["Java", "Jetpack Media3", "ExoPlayer", "Glide", "Android"],
      metrics: [
        "Waveform seekbar",
        "Blur effects & album art",
        "Notification media controls",
        "Background playback",
      ],
      appStore: "",
      playStore: "",
      github: "https://github.com/shahadot786/android-music-player",
      featured: false,
    },
    {
      title: "YouTube Clone - React Native",
      description:
        "A fully functional YouTube clone built with React Native, Expo, and TypeScript. Features include video browsing, search, channel viewing, comprehensive error handling, and modular architecture.",
      image:
        "https://res.cloudinary.com/dmojailax/image/upload/v1765714649/youtube-clone_sviiyq.jpg",
      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "React Navigation",
        "RapidAPI",
      ],
      metrics: [
        "Browse trending videos",
        "Channel pages with playlists",
        "Search functionality",
        "Comprehensive error handling",
      ],
      appStore: "",
      playStore: "",
      github: "https://github.com/shahadot786/react-native-youtube-clone",
      featured: false,
    },
  ];

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4 inline-block"
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Featured <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Architecting robust ecosystems and high-performance applications that drive institutional success and user growth.
          </p>
        </motion.div>

        {/* Featured Projects - Full Width Side-by-Side */}
        <div className="space-y-32 mb-32">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
            >
              {/* Project Visual */}
              <div className="w-full lg:w-3/5 group">
                <div className="relative rounded-3xl overflow-hidden glass-container border border-primary/10 shadow-2xl p-2 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="w-full lg:w-2/5 space-y-6">
                <div className="inline-flex items-center space-x-2 text-primary">
                  <Star size={16} className="fill-current" />
                  <span className="text-xs font-bold uppercase tracking-widest">Industry Highlight</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-semibold rounded-lg bg-secondary text-secondary-foreground border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-4 border-t border-border">
                    {project.metrics.map((metric) => (
                      <div key={metric} className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <TrendingUp size={14} className="text-primary flex-shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-6">
                  {project.github && (
                    <Magnetic>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary py-2 px-4 text-sm flex items-center gap-2">
                        <Github size={16} /> GitHub
                      </a>
                    </Magnetic>
                  )}
                  {project.liveDemo && (
                    <Magnetic>
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    </Magnetic>
                  )}
                  {(project as any).appDemo && (
                    <Magnetic>
                      <a href={(project as any).appDemo} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-4 text-sm flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 border-none">
                        <ExternalLink size={16} /> App Demo
                      </a>
                    </Magnetic>
                  )}
                  {project.appStore && (
                    <Magnetic>
                      <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                        App Store
                      </a>
                    </Magnetic>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Section */}
        <div className="pt-20 border-t border-border">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-between mb-12"
          >
            <h3 className="text-3xl font-bold">Supplemental <span className="text-primary">Developments</span></h3>
            <div className="hidden md:block h-px flex-1 bg-border mx-8" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SpotlightCard className="group flex flex-col h-full p-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>

                  <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h4>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted border border-border">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4">
                    {project.github && (
                      <Magnetic strength={0.2}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2">
                          <Github size={18} />
                        </a>
                      </Magnetic>
                    )}
                    {project.liveDemo && (
                      <Magnetic strength={0.2}>
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2">
                          <ExternalLink size={18} />
                        </a>
                      </Magnetic>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
