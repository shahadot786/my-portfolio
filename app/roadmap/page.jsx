"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronRight,
  Book,
  Lightbulb,
  Code,
} from "lucide-react";

const Roadmap = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleItem = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const toggleCheck = (itemId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const roadmapData = [
    {
      id: "fundamentals",
      title: "1. Fundamentals",
      color: "bg-blue-500",
      description: "Master the core technologies that power the web",
      items: [
        {
          id: "html",
          name: "HTML5",
          duration: "1-2 weeks",
          details:
            "Learn semantic HTML elements (header, nav, article, section, footer), forms and input validation, accessibility attributes (ARIA), SEO-friendly markup, multimedia elements (audio, video, canvas)",
          resources: ["MDN Web Docs", "freeCodeCamp", "HTML5 Specification"],
          projects: [
            "Personal portfolio page",
            "Blog layout",
            "Registration form",
          ],
        },
        {
          id: "css",
          name: "CSS3",
          duration: "2-3 weeks",
          details:
            "Master CSS selectors and specificity, Flexbox for one-dimensional layouts, CSS Grid for two-dimensional layouts, responsive design with media queries, CSS animations and transitions, CSS variables and custom properties, positioning (relative, absolute, fixed, sticky)",
          resources: [
            "CSS-Tricks",
            "Flexbox Froggy",
            "Grid Garden",
            "Kevin Powell YouTube",
          ],
          projects: [
            "Responsive navigation menu",
            "Card layout with Grid",
            "Animated landing page",
          ],
        },
        {
          id: "js",
          name: "JavaScript Fundamentals",
          duration: "4-6 weeks",
          details:
            "Variables (let, const, var), data types and type coercion, functions (regular, arrow, IIFE), arrays and array methods (map, filter, reduce, forEach), objects and object methods, DOM manipulation and traversal, event handling and delegation, ES6+ features (destructuring, spread/rest, template literals), async programming (callbacks, Promises, async/await), fetch API and AJAX, error handling with try/catch",
          resources: [
            "JavaScript.info",
            "Eloquent JavaScript",
            "You Don't Know JS",
            "FreeCodeCamp",
          ],
          projects: [
            "Todo list app",
            "Weather app with API",
            "Interactive quiz game",
            "Calculator",
          ],
        },
        {
          id: "git",
          name: "Git & GitHub",
          duration: "1 week",
          details:
            "Initialize repositories (git init), staging and commits (add, commit), branching and merging strategies, resolving merge conflicts, remote repositories (push, pull, fetch), pull requests and code reviews, .gitignore and .gitattributes, GitHub workflows and collaboration",
          resources: [
            "Pro Git Book",
            "GitHub Learning Lab",
            "Git Branching Interactive",
          ],
          projects: [
            "Contribute to open source",
            "Maintain a personal project with proper commits",
          ],
        },
        {
          id: "terminal",
          name: "Command Line",
          duration: "3-5 days",
          details:
            "Navigation commands (cd, ls, pwd), file operations (cp, mv, rm, mkdir, touch), file permissions (chmod), environment variables, piping and redirection, package managers (npm, yarn), process management",
          resources: ["Command Line Crash Course", "Linux Journey"],
          projects: [
            "Create bash scripts for automation",
            "Set up development environment",
          ],
        },
        {
          id: "http",
          name: "HTTP/HTTPS Protocol",
          duration: "3-5 days",
          details:
            "Request methods (GET, POST, PUT, DELETE, PATCH), status codes (2xx, 3xx, 4xx, 5xx), request and response headers, cookies and sessions, CORS (Cross-Origin Resource Sharing), REST principles, SSL/TLS and certificates",
          resources: ["MDN HTTP Documentation", "HTTP Cats for status codes"],
          projects: [
            "Build a simple API client",
            "Analyze network requests in DevTools",
          ],
        },
      ],
    },
    {
      id: "frontend",
      title: "2. Frontend Development",
      color: "bg-purple-500",
      description: "Build modern, interactive user interfaces",
      items: [
        {
          id: "react",
          name: "React.js",
          duration: "4-6 weeks",
          details:
            "JSX syntax and rules, functional components vs class components, props and prop drilling, state management with useState, side effects with useEffect, context API for global state, custom hooks creation, useRef, useCallback, useMemo for optimization, component lifecycle, conditional rendering, lists and keys, forms and controlled components, React Router for navigation",
          resources: [
            "React Official Docs",
            "React Beta Docs",
            "Scrimba React Course",
            "Full Stack Open",
          ],
          projects: [
            "E-commerce product catalog",
            "Social media dashboard",
            "Movie search app",
            "Expense tracker",
          ],
        },
        {
          id: "state-management",
          name: "State Management",
          duration: "2-3 weeks",
          details:
            "Redux Toolkit (slices, store, actions, reducers), Zustand for simpler state, Redux middleware (thunks, saga), state persistence, Recoil or Jotai as alternatives, context vs Redux decisions, immutability principles",
          resources: [
            "Redux Official Docs",
            "Redux Toolkit Tutorial",
            "Zustand GitHub",
          ],
          projects: [
            "Shopping cart with Redux",
            "Multi-page form with state persistence",
          ],
        },
        {
          id: "typescript",
          name: "TypeScript",
          duration: "3-4 weeks",
          details:
            "Type annotations and inference, interfaces vs types, generics for reusable code, union and intersection types, enums, type guards and narrowing, utility types (Partial, Pick, Omit, Required), configuring tsconfig.json, typing third-party libraries, React with TypeScript",
          resources: [
            "TypeScript Handbook",
            "Total TypeScript",
            "Matt Pocock TypeScript tips",
          ],
          projects: [
            "Refactor JavaScript project to TypeScript",
            "Build type-safe API client",
          ],
        },
        {
          id: "styling",
          name: "Modern CSS & Frameworks",
          duration: "2-3 weeks",
          details:
            "Tailwind CSS utility classes and configuration, CSS-in-JS (styled-components, emotion), Material UI or Ant Design components, Sass/SCSS variables and mixins, CSS modules for scoped styling, responsive design patterns, dark mode implementation",
          resources: [
            "Tailwind CSS Docs",
            "Styled Components Docs",
            "MUI Documentation",
          ],
          projects: [
            "Build component library",
            "Responsive admin dashboard",
            "Dark mode toggle system",
          ],
        },
        {
          id: "build-tools",
          name: "Build Tools & Bundlers",
          duration: "1-2 weeks",
          details:
            "Vite for fast development, Webpack configuration and loaders, code splitting and lazy loading, environment variables, asset optimization, tree shaking, source maps for debugging, production builds",
          resources: ["Vite Guide", "Webpack Documentation", "Parcel Docs"],
          projects: [
            "Configure custom Webpack setup",
            "Optimize bundle size analysis",
          ],
        },
        {
          id: "testing-fe",
          name: "Frontend Testing",
          duration: "2-3 weeks",
          details:
            "Jest for unit testing, React Testing Library for component tests, testing hooks and context, mocking API calls and modules, Cypress for end-to-end testing, test-driven development (TDD), code coverage reports, visual regression testing with Storybook",
          resources: [
            "Testing Library Docs",
            "Jest Documentation",
            "Cypress Docs",
          ],
          projects: [
            "Write tests for existing project",
            "TDD a new feature",
            "E2E test suite",
          ],
        },
        {
          id: "performance",
          name: "Performance Optimization",
          duration: "1-2 weeks",
          details:
            "Code splitting with React.lazy, memoization with useMemo and useCallback, virtualization for long lists (react-window), image optimization and lazy loading, Web Vitals (LCP, FID, CLS), lighthouse audits, bundle analysis, service workers and caching",
          resources: [
            "Web.dev Performance",
            "React Performance Docs",
            "Chrome DevTools",
          ],
          projects: [
            "Optimize slow application",
            "Implement infinite scroll with virtualization",
          ],
        },
      ],
    },
    {
      id: "backend",
      title: "3. Backend Development",
      color: "bg-green-500",
      description: "Build robust server-side applications and APIs",
      items: [
        {
          id: "nodejs",
          name: "Node.js Fundamentals",
          duration: "2-3 weeks",
          details:
            "Event loop and non-blocking I/O, modules (CommonJS vs ES modules), file system operations, streams and buffers, event emitters, npm and package.json, node version management (nvm), debugging Node applications, process and child processes",
          resources: [
            "Node.js Official Docs",
            "Node.js Design Patterns Book",
            "NodeSchool",
          ],
          projects: [
            "File upload service",
            "CLI tool",
            "Event-driven chat application",
          ],
        },
        {
          id: "express",
          name: "Express.js",
          duration: "3-4 weeks",
          details:
            "Routing and route parameters, middleware chain and order, request and response objects, serving static files, template engines (EJS, Pug), error handling middleware, cookie and session management, security best practices (helmet, rate limiting), body parsing and file uploads (multer)",
          resources: [
            "Express.js Docs",
            "Express.js Guide",
            "The Node.js Handbook",
          ],
          projects: [
            "RESTful blog API",
            "File upload API",
            "Authentication system",
          ],
        },
        {
          id: "auth",
          name: "Authentication & Authorization",
          duration: "2-3 weeks",
          details:
            "Password hashing with bcrypt, JWT (JSON Web Tokens) structure and validation, refresh token strategy, OAuth 2.0 flow, session-based authentication, role-based access control (RBAC), two-factor authentication (2FA), secure password reset flow, passport.js strategies",
          resources: [
            "JWT.io",
            "Auth0 Blog",
            "OWASP Authentication Cheatsheet",
          ],
          projects: [
            "Full auth system with JWT",
            "OAuth integration",
            "RBAC admin panel",
          ],
        },
        {
          id: "validation",
          name: "Input Validation & Sanitization",
          duration: "1 week",
          details:
            "Schema validation with Joi or Yup, express-validator middleware, sanitizing user input, preventing injection attacks, custom validation rules, validation error handling, file upload validation",
          resources: ["Joi Documentation", "Express Validator Docs"],
          projects: [
            "Validated registration form API",
            "File upload with validation",
          ],
        },
        {
          id: "api-design",
          name: "RESTful API Design",
          duration: "2 weeks",
          details:
            "REST principles and constraints, resource naming conventions, proper HTTP method usage, status code selection, versioning strategies (URL, header), pagination and filtering, HATEOAS principles, API documentation with Swagger/OpenAPI, rate limiting and throttling",
          resources: [
            "REST API Tutorial",
            "API Design Best Practices",
            "Swagger Docs",
          ],
          projects: [
            "Well-documented REST API",
            "API versioning implementation",
          ],
        },
        {
          id: "graphql",
          name: "GraphQL",
          duration: "2-3 weeks",
          details:
            "Schema definition language, queries and mutations, resolvers and data sources, Apollo Server setup, subscriptions for real-time data, DataLoader for batching, GraphQL vs REST trade-offs, error handling, authentication in GraphQL",
          resources: [
            "GraphQL Official Docs",
            "Apollo Server Docs",
            "How to GraphQL",
          ],
          projects: [
            "GraphQL API for blog",
            "Real-time chat with subscriptions",
          ],
        },
        {
          id: "alternative-backend",
          name: "Alternative: Python/Java Backend",
          duration: "4-6 weeks",
          details:
            "Python: Django ORM and admin, Flask routes and blueprints, FastAPI async support. Java: Spring Boot annotations, dependency injection, JPA and Hibernate. Choose based on job market and interest",
          resources: [
            "Django Docs",
            "Flask Mega-Tutorial",
            "Spring Boot Guides",
          ],
          projects: ["Django REST API", "Spring Boot microservice"],
        },
      ],
    },
    {
      id: "database",
      title: "4. Databases & Data Management",
      color: "bg-orange-500",
      description: "Store, retrieve, and manage data effectively",
      items: [
        {
          id: "sql",
          name: "SQL Fundamentals",
          duration: "3-4 weeks",
          details:
            "SELECT queries with WHERE, ORDER BY, LIMIT, JOIN types (INNER, LEFT, RIGHT, FULL), aggregate functions (COUNT, SUM, AVG, MAX, MIN), GROUP BY and HAVING, subqueries and CTEs, indexes and query optimization, transactions and ACID properties, normalization (1NF, 2NF, 3NF), constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE)",
          resources: [
            "SQLBolt",
            "Mode Analytics SQL Tutorial",
            "PostgreSQL Tutorial",
          ],
          projects: [
            "Design school database schema",
            "Complex reporting queries",
            "Query optimization exercise",
          ],
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          duration: "2-3 weeks",
          details:
            "Installation and configuration, psql command-line tool, data types (arrays, JSON, UUID), window functions, full-text search, views and materialized views, triggers and stored procedures, backup and restore, replication basics, performance tuning",
          resources: ["PostgreSQL Official Docs", "PostgreSQL Exercises"],
          projects: [
            "Multi-tenant application database",
            "Implement audit logging with triggers",
          ],
        },
        {
          id: "mongodb",
          name: "MongoDB",
          duration: "2-3 weeks",
          details:
            "Document model and BSON, CRUD operations, aggregation pipeline, indexing strategies, embedded vs referenced documents, schema design patterns, transactions in MongoDB, replica sets, sharding basics, Mongoose ODM for Node.js",
          resources: ["MongoDB University", "MongoDB Docs", "Mongoose Guide"],
          projects: [
            "Social media backend",
            "E-commerce product catalog",
            "Analytics dashboard data",
          ],
        },
        {
          id: "orm",
          name: "ORMs & Query Builders",
          duration: "2 weeks",
          details:
            "Prisma schema and migrations, Sequelize models and associations, TypeORM entities and decorators, query building and raw queries, connection pooling, N+1 query problem solutions, transactions in ORMs",
          resources: ["Prisma Docs", "Sequelize Docs", "TypeORM Guide"],
          projects: ["API with Prisma", "Complex relationships with TypeORM"],
        },
        {
          id: "redis",
          name: "Redis & Caching",
          duration: "1-2 weeks",
          details:
            "Redis data structures (strings, lists, sets, hashes, sorted sets), caching strategies (cache-aside, write-through), session storage, pub/sub messaging, Redis with Node.js (ioredis), cache invalidation strategies, TTL and expiration",
          resources: ["Redis Documentation", "Redis University", "Try Redis"],
          projects: [
            "Implement caching layer",
            "Session store with Redis",
            "Real-time leaderboard",
          ],
        },
        {
          id: "db-advanced",
          name: "Advanced Database Concepts",
          duration: "2-3 weeks",
          details:
            "Database indexing strategies, query optimization and EXPLAIN plans, database migrations and versioning, connection pooling, database security (encryption, access control), backup and disaster recovery, database monitoring, CAP theorem, eventual consistency",
          resources: ["Use The Index Luke", "Database Internals Book"],
          projects: [
            "Performance tune slow queries",
            "Implement migration system",
            "Backup strategy",
          ],
        },
      ],
    },
    {
      id: "devops",
      title: "5. DevOps & Deployment",
      color: "bg-red-500",
      description: "Deploy, monitor, and scale applications",
      items: [
        {
          id: "docker",
          name: "Docker",
          duration: "2-3 weeks",
          details:
            "Dockerfile syntax and best practices, image layers and optimization, docker-compose for multi-container apps, volumes and bind mounts, networking between containers, Docker Hub and registries, multi-stage builds, environment variables and secrets, docker exec and logs",
          resources: [
            "Docker Docs",
            "Docker Mastery Course",
            "Play with Docker",
          ],
          projects: [
            "Dockerize full-stack app",
            "Multi-container development environment",
          ],
        },
        {
          id: "cicd",
          name: "CI/CD Pipelines",
          duration: "2 weeks",
          details:
            "GitHub Actions workflows and triggers, automated testing in pipeline, build and deploy stages, environment variables and secrets, caching dependencies, deployment strategies (blue-green, canary), GitLab CI, Jenkins basics, webhooks and automation",
          resources: ["GitHub Actions Docs", "CI/CD Best Practices"],
          projects: [
            "Automated deployment pipeline",
            "Test and build workflow",
          ],
        },
        {
          id: "cloud",
          name: "Cloud Platforms",
          duration: "3-4 weeks",
          details:
            "AWS: EC2, S3, RDS, Lambda, CloudFront, Elastic Beanstalk. Google Cloud: Compute Engine, Cloud Storage, Cloud SQL, Cloud Functions. Azure: Virtual Machines, Blob Storage, App Service. IAM and security, load balancing, auto-scaling, monitoring and logging",
          resources: [
            "AWS Free Tier",
            "Google Cloud Free Tier",
            "Cloud Computing Concepts",
          ],
          projects: [
            "Deploy app on AWS/GCP",
            "Set up S3 for static hosting",
            "Serverless function",
          ],
        },
        {
          id: "hosting",
          name: "Hosting & Platforms",
          duration: "1 week",
          details:
            "Vercel for Next.js and frontend, Netlify for static sites, Heroku for quick deployment, DigitalOcean droplets and app platform, Railway and Render alternatives, environment configuration, custom domains and SSL, CDN configuration",
          resources: ["Vercel Docs", "Netlify Docs", "DigitalOcean Tutorials"],
          projects: [
            "Deploy frontend to Vercel",
            "Deploy API to Render",
            "Set up custom domain",
          ],
        },
        {
          id: "nginx",
          name: "Web Servers",
          duration: "1-2 weeks",
          details:
            "Nginx configuration syntax, reverse proxy setup, load balancing strategies, SSL certificate installation, serving static files, rate limiting, caching with Nginx, gzip compression, Apache as alternative",
          resources: ["Nginx Documentation", "DigitalOcean Nginx Tutorials"],
          projects: [
            "Configure Nginx reverse proxy",
            "SSL setup with Let's Encrypt",
          ],
        },
        {
          id: "kubernetes",
          name: "Kubernetes (Advanced)",
          duration: "3-4 weeks",
          details:
            "Pods, services, and deployments, ConfigMaps and Secrets, ingress controllers, horizontal pod autoscaling, kubectl commands, Helm for package management, namespaces, persistent volumes, monitoring with Prometheus",
          resources: [
            "Kubernetes Docs",
            "Kubernetes the Hard Way",
            "K8s by Example",
          ],
          projects: ["Deploy microservices on K8s", "Set up monitoring stack"],
        },
        {
          id: "monitoring",
          name: "Monitoring & Logging",
          duration: "1-2 weeks",
          details:
            "Application logging best practices, centralized logging with ELK stack, error tracking with Sentry, application monitoring with DataDog or New Relic, uptime monitoring, log aggregation, alerting strategies, performance metrics",
          resources: [
            "Sentry Docs",
            "DataDog Learning Center",
            "Logging Best Practices",
          ],
          projects: [
            "Implement structured logging",
            "Set up error tracking",
            "Create monitoring dashboard",
          ],
        },
      ],
    },
    {
      id: "security",
      title: "6. Security",
      color: "bg-yellow-600",
      description: "Protect applications and user data",
      items: [
        {
          id: "owasp",
          name: "OWASP Top 10",
          duration: "2 weeks",
          details:
            "Broken access control, cryptographic failures, injection attacks, insecure design, security misconfiguration, vulnerable components, identification and authentication failures, software and data integrity failures, security logging failures, server-side request forgery",
          resources: [
            "OWASP Top 10",
            "OWASP Cheat Sheets",
            "PortSwigger Web Security Academy",
          ],
          projects: [
            "Security audit of application",
            "Fix common vulnerabilities",
          ],
        },
        {
          id: "xss-csrf",
          name: "XSS & CSRF Protection",
          duration: "1 week",
          details:
            "Content Security Policy (CSP), input sanitization, output encoding, CSRF tokens, SameSite cookie attribute, HTTPOnly and Secure flags, DOMPurify for sanitization",
          resources: ["OWASP XSS Prevention", "CSRF Prevention Cheat Sheet"],
          projects: [
            "Implement CSP",
            "Add CSRF protection",
            "Test for XSS vulnerabilities",
          ],
        },
        {
          id: "sql-injection",
          name: "SQL Injection Prevention",
          duration: "1 week",
          details:
            "Parameterized queries, ORM usage, input validation, least privilege database users, prepared statements, stored procedures, avoiding dynamic SQL",
          resources: ["OWASP SQL Injection", "SQL Injection Prevention"],
          projects: [
            "Secure database queries",
            "Audit existing code for SQL injection",
          ],
        },
        {
          id: "https-ssl",
          name: "HTTPS & Encryption",
          duration: "1 week",
          details:
            "SSL/TLS handshake, certificate authorities, Let's Encrypt for free certificates, HSTS (HTTP Strict Transport Security), certificate pinning, TLS versions and cipher suites, encryption at rest and in transit",
          resources: ["How HTTPS Works", "Let's Encrypt Docs", "SSL Labs"],
          projects: [
            "Set up SSL certificate",
            "Configure HSTS",
            "Test SSL configuration",
          ],
        },
        {
          id: "cors",
          name: "CORS Configuration",
          duration: "3-5 days",
          details:
            "CORS headers (Access-Control-Allow-Origin, Methods, Headers), preflight requests, credentials in CORS, CORS middleware configuration, same-origin policy, JSONP alternatives",
          resources: ["MDN CORS", "CORS in Express"],
          projects: ["Configure CORS properly", "Handle preflight requests"],
        },
        {
          id: "secrets",
          name: "Secrets Management",
          duration: "1 week",
          details:
            "Environment variables, .env files and dotenv, secrets in CI/CD, AWS Secrets Manager, HashiCorp Vault, key rotation, avoiding hardcoded secrets, gitignore sensitive files",
          resources: [
            "12 Factor App Config",
            "AWS Secrets Manager",
            "Vault by HashiCorp",
          ],
          projects: [
            "Implement environment-based config",
            "Migrate hardcoded secrets",
          ],
        },
        {
          id: "security-headers",
          name: "Security Headers",
          duration: "3-5 days",
          details:
            "Helmet.js middleware, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Content-Security-Policy, security header testing",
          resources: ["Helmet.js Docs", "Security Headers Website"],
          projects: ["Add security headers", "Test with security scanners"],
        },
      ],
    },
    {
      id: "advanced",
      title: "7. Advanced Concepts",
      color: "bg-indigo-500",
      description: "Master advanced architectures and patterns",
      items: [
        {
          id: "microservices",
          name: "Microservices Architecture",
          duration: "3-4 weeks",
          details:
            "Service decomposition strategies, API gateway pattern, service discovery, inter-service communication, distributed transactions and saga pattern, event-driven architecture, circuit breakers, service mesh, containerization and orchestration",
          resources: [
            "Microservices.io",
            "Building Microservices Book",
            "Martin Fowler Articles",
          ],
          projects: [
            "Convert monolith to microservices",
            "Implement API gateway",
          ],
        },
        {
          id: "websockets",
          name: "WebSockets & Real-time",
          duration: "1-2 weeks",
          details:
            "WebSocket protocol, Socket.io for Node.js, rooms and namespaces, broadcasting events, authentication with WebSockets, scaling WebSockets, Server-Sent Events (SSE) alternative, real-time database sync",
          resources: [
            "Socket.io Docs",
            "WebSocket MDN",
            "Real-time Web Technologies",
          ],
          projects: [
            "Real-time chat application",
            "Live dashboard",
            "Multiplayer game",
          ],
        },
        {
          id: "message-queue",
          name: "Message Queues",
          duration: "2-3 weeks",
          details:
            "Message queue patterns, RabbitMQ exchanges and queues, Kafka topics and partitions, pub/sub messaging, message persistence, dead letter queues, worker processes, job scheduling with Bull/BullMQ",
          resources: [
            "RabbitMQ Tutorials",
            "Kafka Documentation",
            "BullMQ Guide",
          ],
          projects: [
            "Background job processing",
            "Event-driven system",
            "Email queue",
          ],
        },
        {
          id: "serverless",
          name: "Serverless Architecture",
          duration: "2 weeks",
          details:
            "AWS Lambda functions, Google Cloud Functions, Azure Functions, serverless framework, cold starts and warm-up strategies, API Gateway integration, serverless databases (DynamoDB, Firestore), cost optimization",
          resources: [
            "Serverless Framework Docs",
            "AWS Lambda Docs",
            "Serverless Stack",
          ],
          projects: [
            "Serverless REST API",
            "Image processing function",
            "Scheduled tasks",
          ],
        },
        {
          id: "performance-advanced",
          name: "Performance Optimization",
          duration: "2-3 weeks",
          details:
            "Database query optimization, caching strategies (Redis, CDN), code splitting and lazy loading, image optimization (WebP, responsive images), compression (gzip, brotli), profiling and benchmarking, memory leak detection, Web Workers, service workers for offline",
          resources: [
            "Web.dev Performance",
            "High Performance Browser Networking Book",
          ],
          projects: [
            "Optimize slow application",
            "Implement progressive enhancement",
            "Add offline support",
          ],
        },
        {
          id: "pwa",
          name: "Progressive Web Apps",
          duration: "2 weeks",
          details:
            "Service worker lifecycle, caching strategies, offline functionality, push notifications, app manifest, installability, background sync, workbox library",
          resources: ["PWA Guide", "Workbox Docs", "Google PWA Training"],
          projects: [
            "Convert app to PWA",
            "Offline-first application",
            "Push notification system",
          ],
        },
        {
          id: "seo",
          name: "SEO Optimization",
          duration: "1-2 weeks",
          details:
            "Meta tags and Open Graph, semantic HTML, structured data (Schema.org), XML sitemaps, robots.txt, server-side rendering (SSR), static site generation (SSG), Core Web Vitals, mobile optimization, canonical URLs",
          resources: [
            "Google Search Central",
            "Moz Beginner's Guide",
            "Next.js SEO",
          ],
          projects: [
            "Implement SSR for SEO",
            "Add structured data",
            "Optimize for Core Web Vitals",
          ],
        },
        {
          id: "system-design",
          name: "System Design",
          duration: "4-6 weeks",
          details:
            "Scalability principles, load balancing, caching layers, database sharding and replication, CAP theorem, consistency patterns, availability patterns, CDN architecture, rate limiting, designing for failure",
          resources: [
            "System Design Primer",
            "Designing Data-Intensive Applications Book",
            "Grokking System Design",
          ],
          projects: [
            "Design URL shortener",
            "Design social media feed",
            "Design e-commerce system",
          ],
        },
      ],
    },
    {
      id: "soft-skills",
      title: "8. Professional Skills",
      color: "bg-pink-500",
      description: "Develop essential professional competencies",
      items: [
        {
          id: "agile",
          name: "Agile/Scrum Methodologies",
          duration: "1-2 weeks",
          details:
            "Scrum roles (PO, SM, Dev Team), sprint planning and retrospectives, user stories and acceptance criteria, story points and estimation, Kanban boards, daily standups, sprint reviews, agile tools (Jira, Trello)",
          resources: [
            "Scrum Guide",
            "Agile Manifesto",
            "Atlassian Agile Coach",
          ],
          projects: ["Practice with team project", "Create sprint backlog"],
        },
        {
          id: "code-review",
          name: "Code Review Practices",
          duration: "1 week",
          details:
            "Code review checklist, constructive feedback, PR best practices, linting and formatting (ESLint, Prettier), code style guides, reviewing for security and performance, pair programming",
          resources: [
            "Google Engineering Practices",
            "Code Review Best Practices",
          ],
          projects: ["Review open source PRs", "Establish team review process"],
        },
        {
          id: "documentation",
          name: "Technical Documentation",
          duration: "1-2 weeks",
          details:
            "README best practices, API documentation, code comments, architectural decision records (ADRs), runbooks, documentation generators (JSDoc, Swagger), writing clear technical specs",
          resources: [
            "Write the Docs",
            "Documentation Guide",
            "Divio Documentation System",
          ],
          projects: [
            "Document existing project",
            "Create API documentation",
            "Write technical spec",
          ],
        },
        {
          id: "debugging",
          name: "Debugging & Problem Solving",
          duration: "Ongoing",
          details:
            "Browser DevTools mastery, Node.js debugging, reading stack traces, binary search debugging, logging strategies, reproduce bugs reliably, root cause analysis, debugging production issues",
          resources: [
            "Chrome DevTools Docs",
            "Debugging JavaScript",
            "The Art of Debugging",
          ],
          projects: ["Debug complex issue", "Create debugging toolkit"],
        },
        {
          id: "design-patterns",
          name: "Design Patterns",
          duration: "3-4 weeks",
          details:
            "Creational patterns (Singleton, Factory, Builder), structural patterns (Adapter, Decorator, Facade), behavioral patterns (Observer, Strategy, Command), MVC/MVVM patterns, dependency injection, SOLID principles",
          resources: [
            "Design Patterns Book",
            "Refactoring Guru",
            "Patterns.dev",
          ],
          projects: [
            "Refactor code with patterns",
            "Identify patterns in codebases",
          ],
        },
        {
          id: "algorithms",
          name: "Algorithms & Data Structures",
          duration: "6-8 weeks",
          details:
            "Arrays and strings, linked lists, stacks and queues, hash tables, trees (binary, BST, AVL), graphs and graph algorithms, sorting algorithms (quick, merge, heap), searching algorithms (binary search, DFS, BFS), dynamic programming, recursion, time and space complexity (Big O)",
          resources: [
            "LeetCode",
            "HackerRank",
            "Cracking the Coding Interview",
            "AlgoExpert",
          ],
          projects: [
            "Solve 100 coding problems",
            "Implement common data structures",
            "Build algorithm visualizer",
          ],
        },
        {
          id: "testing-strategy",
          name: "Testing Strategy",
          duration: "2-3 weeks",
          details:
            "Test pyramid (unit, integration, E2E), test-driven development (TDD), behavior-driven development (BDD), mocking and stubbing, test coverage analysis, integration testing strategies, continuous testing, testing best practices",
          resources: [
            "Testing JavaScript",
            "Test Pyramid Article",
            "Testing Best Practices",
          ],
          projects: [
            "Write comprehensive test suite",
            "Practice TDD for new feature",
          ],
        },
        {
          id: "communication",
          name: "Communication & Collaboration",
          duration: "Ongoing",
          details:
            "Technical writing skills, explaining concepts to non-technical stakeholders, active listening, remote collaboration, conflict resolution, giving and receiving feedback, presentation skills, asking good questions",
          resources: [
            "Soft Skills Book",
            "The Pragmatic Programmer",
            "Team Geek",
          ],
          projects: [
            "Write technical blog posts",
            "Present project to team",
            "Mentor junior developer",
          ],
        },
      ],
    },
  ];

  const totalItems = roadmapData.reduce(
    (acc, section) => acc + section.items.length,
    0
  );
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Full-Stack Developer Roadmap
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your comprehensive guide to becoming a full-stack developer
          </p>
          <p className="text-slate-400 text-sm mb-6">
            Detailed curriculum with resources, projects, and timelines
          </p>

          {/* Progress Card */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-300 font-medium text-lg">
                Overall Progress
              </span>
              <span className="text-white font-bold text-2xl">{progress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-slate-400 text-sm mt-3">
              {completedItems} of {totalItems} topics completed
            </p>
          </div>
        </div>

        {/* Roadmap Sections */}
        <div className="space-y-6">
          {roadmapData.map((section) => {
            const sectionItems = section.items.length;
            const sectionCompleted = section.items.filter(
              (item) => checkedItems[item.id]
            ).length;
            const sectionProgress = Math.round(
              (sectionCompleted / sectionItems) * 100
            );

            return (
              <div
                key={section.id}
                className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-750 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-3 h-16 ${section.color} rounded-full shadow-lg`}
                    />
                    <div className="text-left flex-1">
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {section.title}
                      </h2>
                      <p className="text-slate-400 text-sm mb-2">
                        {section.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-700 rounded-full h-2 max-w-sm">
                          <div
                            className={`${section.color} h-full rounded-full transition-all duration-300`}
                            style={{ width: `${sectionProgress}%` }}
                          />
                        </div>
                        <span className="text-slate-400 text-sm font-medium">
                          {sectionCompleted}/{sectionItems}
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedSections[section.id] ? (
                    <ChevronDown
                      className="text-slate-400 flex-shrink-0"
                      size={28}
                    />
                  ) : (
                    <ChevronRight
                      className="text-slate-400 flex-shrink-0"
                      size={28}
                    />
                  )}
                </button>

                {/* Section Items */}
                {expandedSections[section.id] && (
                  <div className="px-5 pb-5 space-y-3">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-750 rounded-lg border border-slate-600 overflow-hidden"
                      >
                        {/* Item Header */}
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3 flex-1">
                            <button
                              onClick={() => toggleCheck(item.id)}
                              className="flex-shrink-0"
                            >
                              {checkedItems[item.id] ? (
                                <CheckCircle
                                  className="text-green-400"
                                  size={24}
                                />
                              ) : (
                                <Circle
                                  className="text-slate-500 hover:text-slate-400 transition-colors"
                                  size={24}
                                />
                              )}
                            </button>
                            <div className="flex-1">
                              <h3
                                className={`text-lg font-semibold ${
                                  checkedItems[item.id]
                                    ? "text-slate-400 line-through"
                                    : "text-white"
                                }`}
                              >
                                {item.name}
                              </h3>
                              <span className="text-slate-400 text-sm">
                                ⏱️ {item.duration}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="ml-2 flex-shrink-0"
                          >
                            {expandedItems[item.id] ? (
                              <ChevronDown
                                className="text-slate-400"
                                size={20}
                              />
                            ) : (
                              <ChevronRight
                                className="text-slate-400"
                                size={20}
                              />
                            )}
                          </button>
                        </div>

                        {/* Item Details */}
                        {expandedItems[item.id] && (
                          <div className="px-4 pb-4 space-y-4 border-t border-slate-600 pt-4">
                            {/* Details */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Book className="text-blue-400" size={18} />
                                <h4 className="text-slate-300 font-semibold">
                                  What to Learn
                                </h4>
                              </div>
                              <p className="text-slate-400 text-sm leading-relaxed pl-6">
                                {item.details}
                              </p>
                            </div>

                            {/* Resources */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Lightbulb
                                  className="text-yellow-400"
                                  size={18}
                                />
                                <h4 className="text-slate-300 font-semibold">
                                  Learning Resources
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-2 pl-6">
                                {item.resources.map((resource, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full"
                                  >
                                    {resource}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Projects */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Code className="text-green-400" size={18} />
                                <h4 className="text-slate-300 font-semibold">
                                  Practice Projects
                                </h4>
                              </div>
                              <ul className="space-y-1 pl-6">
                                {item.projects.map((project, idx) => (
                                  <li
                                    key={idx}
                                    className="text-slate-400 text-sm"
                                  >
                                    • {project}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">
              💡 Learning Tips
            </h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>
                • Master fundamentals before advancing - they're the foundation
              </li>
              <li>• Build real projects for every concept you learn</li>
              <li>• Focus deeply on one technology before spreading thin</li>
              <li>• Read other people's code and contribute to open source</li>
              <li>• Code daily, even just 30-60 minutes maintains momentum</li>
              <li>
                • Learn by teaching - write blogs, create tutorials, mentor
                others
              </li>
              <li>
                • Don't just watch tutorials - type every line of code yourself
              </li>
            </ul>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">
              🎯 Career Advice
            </h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• Build a strong portfolio with 3-5 impressive projects</li>
              <li>• Contribute to open source to gain real-world experience</li>
              <li>• Network with developers on Twitter, LinkedIn, Discord</li>
              <li>
                • Practice coding interviews regularly on LeetCode/HackerRank
              </li>
              <li>
                • Create a personal brand through blogging and social media
              </li>
              <li>• Tailor your resume to each job application</li>
              <li>
                • Don't wait to be "ready" - apply when you're 70% qualified
              </li>
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">
            ⏰ Realistic Timeline
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-slate-750 rounded-lg p-4">
              <div className="text-blue-400 font-bold mb-2">3-6 Months</div>
              <div className="text-slate-300">
                Complete fundamentals, build basic projects, understand core
                concepts
              </div>
            </div>
            <div className="bg-slate-750 rounded-lg p-4">
              <div className="text-purple-400 font-bold mb-2">6-12 Months</div>
              <div className="text-slate-300">
                Full-stack capable, multiple projects, job-ready for junior
                positions
              </div>
            </div>
            <div className="bg-slate-750 rounded-lg p-4">
              <div className="text-pink-400 font-bold mb-2">12-24 Months</div>
              <div className="text-slate-300">
                Proficient developer, advanced concepts, ready for mid-level
                roles
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-4 text-center">
            * Timeline varies based on daily study hours, prior experience, and
            learning pace
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>
            Click on topics to expand details • Check off items as you complete
            them
          </p>
          <p className="mt-2">
            Remember: Consistency beats intensity. Keep learning! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
