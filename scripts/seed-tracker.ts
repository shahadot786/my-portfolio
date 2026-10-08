import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
const DRY_RUN = process.argv.includes('--dry');

if (!MONGODB_URI && !DRY_RUN) {
  console.error('MONGODB_URI is missing');
  process.exit(1);
}

// Define Schema locally to avoid issues with Next.js imports in script
const TrackerSchema = new mongoose.Schema({
  title: String,
  slug: { type: String },
  description: String,
  startDate: Date,
  endDate: Date,
  totalDays: Number,
  dailyHours: Number,
  status: { type: String, default: 'active' },
  tags: [String],
  featured: { type: Boolean, default: false },
  color: { type: String, default: '#34d399' },
  milestones: [{
    title: String,
    dayNumber: Number,
    completed: { type: Boolean, default: false }
  }],
  days: [{
    dayNumber: Number,
    date: Date,
    title: String,
    status: { type: String, default: 'pending' },
    hoursLogged: { type: Number, default: 0 },
    notes: String,
    mood: String,
    checklist: [{
      text: String,
      completed: { type: Boolean, default: false },
      hour: Number
    }]
  }]
}, { timestamps: true });

const Tracker = mongoose.models.Tracker || mongoose.model('Tracker', TrackerSchema);

const planText = `
## MONTH 1: Foundation & TypeScript Mastery (Days 1-30)

### Week 1: JavaScript ES6+ & TypeScript Fundamentals (Days 1-7)

Day 1: Modern JavaScript Review
- Hour 1: ES6+ features (let/const, arrow functions, destructuring)
- Hour 2: Promises, async/await, error handling
- Hour 3: Array methods (map, filter, reduce, forEach)
- Hour 4: Object manipulation, spread/rest operators
- Hour 5: Build: CLI calculator using async operations

Day 2: TypeScript Basics
- Hour 1: TypeScript setup, tsconfig.json, basic types
- Hour 2: Interfaces vs Types, type inference
- Hour 3: Functions, optional parameters, overloading
- Hour 4: Enums, tuples, union types
- Hour 5: Convert yesterday's calculator to TypeScript

Day 3: TypeScript Advanced Types
- Hour 1: Generics fundamentals
- Hour 2: Utility types (Partial, Pick, Omit, Record)
- Hour 3: Type guards, type assertions
- Hour 4: Advanced generics with constraints
- Hour 5: Build: Type-safe data validation library

Day 4: TypeScript OOP
- Hour 1: Classes, inheritance, access modifiers
- Hour 2: Abstract classes, interfaces
- Hour 3: Decorators (experimental)
- Hour 4: Mixins and advanced patterns
- Hour 5: Build: Task management class system

Day 5: TypeScript with Node.js
- Hour 1: Setting up TypeScript Node.js project
- Hour 2: File system operations with types
- Hour 3: HTTP server with Express + TypeScript
- Hour 4: Error handling and middleware typing
- Hour 5: Build: REST API starter with TypeScript

Day 6: Integration Day
- Hour 1-2: Build complete TypeScript CLI tool
- Hour 3-4: Add file operations, async handling
- Hour 5: Documentation and testing

Day 7: Review & Preparation
- Hour 1-2: Review week's concepts, fix gaps
- Hour 3: Write blog post: "My TypeScript Journey"
- Hour 4: Update learning tracker
- Hour 5: Plan next week

### Week 2: Node.js Deep Dive (Days 8-14)

Day 8: Node.js Core Modules
- Hour 1: Node.js architecture, event loop
- Hour 2: fs module (file operations)
- Hour 3: path, os, process modules
- Hour 4: Events and EventEmitter
- Hour 5: Build: File watcher with event emitter

Day 9: HTTP & Express Fundamentals
- Hour 1: HTTP protocol, request/response cycle
- Hour 2: Express.js basics, routing
- Hour 3: Middleware concept and creation
- Hour 4: Request parsing (body, query, params)
- Hour 5: Build: Basic CRUD API

Day 10: Express Advanced Patterns
- Hour 1: Error handling middleware
- Hour 2: Router-level middleware
- Hour 3: Application-level middleware
- Hour 4: Third-party middleware (cors, helmet, morgan)
- Hour 5: Build: Secure API with all middleware types

Day 11: Authentication & Security
- Hour 1: JWT fundamentals, structure
- Hour 2: bcrypt password hashing
- Hour 3: JWT implementation with jsonwebtoken
- Hour 4: Refresh token strategy
- Hour 5: Build: Auth system (register, login, refresh)

Day 12: Input Validation & Error Handling
- Hour 1: class-validator, class-transformer
- Hour 2: Custom validation decorators
- Hour 3: Global error handling
- Hour 4: API response standardization
- Hour 5: Build: Validation layer for auth API

Day 13: Integration Day
- Hour 1-2: Build complete REST API with auth
- Hour 3-4: Add validation, error handling, logging
- Hour 5: Write API documentation

Day 14: Review & Blog
- Hour 1-2: Review Node.js and Express concepts
- Hour 3: Refactor previous week's code
- Hour 4: Write blog: "Building Secure Node.js APIs"
- Hour 5: Update tracker, plan next week

### Week 3: NestJS Framework Mastery (Days 15-21)

Day 15: NestJS Introduction
- Hour 1: NestJS philosophy, architecture
- Hour 2: CLI, project structure, modules
- Hour 3: Controllers and routing
- Hour 4: Providers and services
- Hour 5: Build: First NestJS application

Day 16: Dependency Injection
- Hour 1: DI concept and benefits
- Hour 2: Injectable decorators
- Hour 3: Provider scope (default, request, transient)
- Hour 4: Custom providers
- Hour 5: Build: DI-based service layer

Day 17: TypeORM Integration
- Hour 1: TypeORM basics, entity definition
- Hour 2: Relationships (OneToMany, ManyToOne, ManyToMany)
- Hour 3: Repository pattern
- Hour 4: Query builder, custom repositories
- Hour 5: Build: Database models for user system

Day 18: Validation & Pipes
- Hour 1: Built-in pipes (ValidationPipe, ParseIntPipe)
- Hour 2: Custom pipes
- Hour 3: DTO validation with class-validator
- Hour 4: Transformation pipes
- Hour 5: Build: Complete validation layer

Day 19: Guards & Interceptors
- Hour 1: Authentication guards
- Hour 2: Role-based authorization guards
- Hour 3: Interceptors for logging and transformation
- Hour 4: Custom decorators
- Hour 5: Build: RBAC system

Day 20: Integration Day
- Hour 1-2: Build NestJS API with TypeORM
- Hour 3-4: Add auth, validation, guards
- Hour 5: Testing and documentation

Day 21: Review & Portfolio
- Hour 1-2: Deep dive into weak areas
- Hour 3: Refactor week's code
- Hour 4: Create GitHub repo, README
- Hour 5: Update portfolio, plan next week

### Week 4: MySQL & Database Design (Days 22-30)

Day 22: SQL Fundamentals
- Hour 1: Database concepts, RDBMS basics
- Hour 2: SELECT queries, WHERE, ORDER BY
- Hour 3: JOINs (INNER, LEFT, RIGHT, FULL)
- Hour 4: Aggregate functions (COUNT, SUM, AVG)
- Hour 5: Practice: 20 SQL queries

Day 23: Advanced SQL
- Hour 1: Subqueries and CTEs
- Hour 2: Window functions
- Hour 3: GROUP BY, HAVING
- Hour 4: CASE statements
- Hour 5: Practice: Complex query challenges

Day 24: Database Design
- Hour 1: Normalization (1NF, 2NF, 3NF)
- Hour 2: Entity-Relationship diagrams
- Hour 3: Indexing strategies
- Hour 4: Foreign keys, constraints
- Hour 5: Design: Marketplace database schema

Day 25: MySQL Performance
- Hour 1: Query optimization, EXPLAIN
- Hour 2: Index types (B-tree, Hash, Full-text)
- Hour 3: Query caching
- Hour 4: Database partitioning
- Hour 5: Optimize: Previous database schema

Day 26: Transactions & Concurrency
- Hour 1: ACID properties
- Hour 2: Transaction isolation levels
- Hour 3: Locks and deadlocks
- Hour 4: Stored procedures
- Hour 5: Build: Transaction management in API

Day 27: TypeORM Advanced
- Hour 1: Advanced relationships
- Hour 2: Custom repository methods
- Hour 3: Raw queries in TypeORM
- Hour 4: Migrations
- Hour 5: Build: Migration system for API

Day 28: Integration Day
- Hour 1-2: Design marketplace database
- Hour 3-4: Implement with TypeORM
- Hour 5: Write migrations, seed data

Day 29: Review & Testing
- Hour 1-2: Database performance testing
- Hour 3: Write integration tests
- Hour 4: Documentation
- Hour 5: Update tracker, review month

Day 30: Month 1 Review
- Hour 1-2: Review all Month 1 concepts
- Hour 3: Fix knowledge gaps
- Hour 4: Write blog: "Month 1 Journey"
- Hour 5: Plan Month 2, set new goals

## MONTH 2: Backend Architecture & Microservices (Days 31-60)

### Week 5: Microservices Fundamentals (Days 31-37)

Day 31: Microservices Architecture
- Hour 1: Monolith vs Microservices
- Hour 2: Service boundaries, domain-driven design
- Hour 3: Communication patterns (sync vs async)
- Hour 4: Service discovery
- Hour 5: Design: Break monolith into services

Day 32: API Gateway Pattern
- Hour 1: API Gateway concept, benefits
- Hour 2: Request routing and aggregation
- Hour 3: Rate limiting, caching
- Hour 4: Authentication at gateway
- Hour 5: Build: Simple API Gateway with NestJS

Day 33: Inter-Service Communication
- Hour 1: REST vs gRPC vs Message Queues
- Hour 2: HTTP client setup (axios)
- Hour 3: Service-to-service authentication
- Hour 4: Circuit breaker pattern
- Hour 5: Build: Service communication layer

Day 34: RabbitMQ Fundamentals
- Hour 1: Message queue concepts, AMQP
- Hour 2: Exchanges, queues, bindings
- Hour 3: Message patterns (pub/sub, work queue)
- Hour 4: Dead letter exchanges
- Hour 5: Build: Simple publisher/consumer

Day 35: RabbitMQ with NestJS
- Hour 1: NestJS microservices transport
- Hour 2: @MessagePattern decorator
- Hour 3: Request-response pattern
- Hour 4: Event-based communication
- Hour 5: Build: Event-driven notification system

Day 36: Integration Day
- Hour 1-2: Build 3 microservices (User, Job, Notification)
- Hour 3-4: Connect with RabbitMQ
- Hour 5: Test inter-service communication

Day 37: Review
- Hour 1-2: Review microservices patterns
- Hour 3: Refactor services
- Hour 4: Documentation
- Hour 5: Plan next week

### Week 6: Advanced Backend Patterns (Days 38-44)

Day 38: Caching with Redis
- Hour 1: Redis fundamentals, data types
- Hour 2: Caching strategies (cache-aside, write-through)
- Hour 3: Redis with NestJS
- Hour 4: Session storage with Redis
- Hour 5: Build: Caching layer for API

Day 39: Redis Advanced
- Hour 1: Pub/Sub with Redis
- Hour 2: Redis Streams
- Hour 3: Rate limiting with Redis
- Hour 4: Distributed locks
- Hour 5: Build: Rate limiter middleware

Day 40: WebSockets & Real-time
- Hour 1: WebSocket protocol, Socket.io
- Hour 2: NestJS WebSocket gateway
- Hour 3: Room-based communication
- Hour 4: Authentication with WebSockets
- Hour 5: Build: Real-time notification system

Day 41: Event-Driven Architecture
- Hour 1: Event sourcing concept
- Hour 2: CQRS pattern
- Hour 3: Event store design
- Hour 4: Saga pattern for distributed transactions
- Hour 5: Design: Event-driven job assignment

Day 42: Background Jobs
- Hour 1: Job queue concept, BullMQ
- Hour 2: Job scheduling with cron
- Hour 3: Job retry and failure handling
- Hour 4: Job monitoring
- Hour 5: Build: Background email sender

Day 43: Integration Day
- Hour 1-2: Add Redis caching to microservices
- Hour 3-4: Implement WebSocket notifications
- Hour 5: Add background job processing

Day 44: Review
- Hour 1-2: Review advanced patterns
- Hour 3: Performance testing
- Hour 4: Write blog: "Microservices Patterns"
- Hour 5: Update tracker, plan next week

### Week 7: Testing & Quality (Days 45-51)

Day 45: Unit Testing
- Hour 1: Jest fundamentals, test structure
- Hour 2: Mocking with jest.fn()
- Hour 3: Testing NestJS services
- Hour 4: Testing controllers
- Hour 5: Write: Tests for User service

Day 46: Integration Testing
- Hour 1: Integration test setup
- Hour 2: Testing with database (test DB)
- Hour 3: API endpoint testing
- Hour 4: Testing authentication
- Hour 5: Write: Integration tests for API

Day 47: E2E Testing
- Hour 1: E2E testing concept, Supertest
- Hour 2: Testing complete user flows
- Hour 3: Database setup/teardown
- Hour 4: Testing WebSocket connections
- Hour 5: Write: E2E tests for key flows

Day 48: Testing Best Practices
- Hour 1: Test organization, naming
- Hour 2: Test data management
- Hour 3: CI/CD integration basics
- Hour 4: Code coverage analysis
- Hour 5: Refactor: Improve test quality

Day 49: API Documentation
- Hour 1: Swagger/OpenAPI fundamentals
- Hour 2: NestJS Swagger integration
- Hour 3: DTO documentation
- Hour 4: Authentication documentation
- Hour 5: Generate: Complete API docs

Day 50: Integration Day
- Hour 1-2: Add tests to all services
- Hour 3-4: Generate API documentation
- Hour 5: CI pipeline setup (GitHub Actions)

Day 51: Review
- Hour 1-2: Run all tests, fix failures
- Hour 3: Code quality review
- Hour 4: Documentation review
- Hour 5: Plan next week

### Week 8: Project 1 - Backend Complete (Days 52-60)

Day 52: Project Setup
- Hour 1-2: Monorepo setup (NX/Lerna)
- Hour 3-4: Service scaffolding (User, Job, Notification)
- Hour 5: Database design, ER diagram

Day 53: User Service
- Hour 1-2: User entity, auth logic
- Hour 3-4: Business & Provider profiles
- Hour 5: Tests and documentation

Day 54: Job Service
- Hour 1-2: Job entity, CRUD operations
- Hour 3-4: Application system
- Hour 5: Search and filtering

Day 55: Matching Service
- Hour 1-2: Matching algorithm (skills + location)
- Hour 3-4: Redis caching for matches
- Hour 5: Performance optimization

Day 56: Notification Service
- Hour 1-2: RabbitMQ integration
- Hour 3-4: Email service (SendGrid)
- Hour 5: WebSocket notifications

Day 57: API Gateway
- Hour 1-2: Gateway setup, routing
- Hour 3-4: Rate limiting, auth
- Hour 5: Response aggregation

Day 58: Integration & Testing
- Hour 1-3: End-to-end integration
- Hour 4-5: Comprehensive testing

Day 59: Documentation & Deployment Prep
- Hour 1-2: API documentation
- Hour 3-4: README, architecture diagrams
- Hour 5: Docker-compose setup

Day 60: Month 2 Review
- Hour 1-2: Demo backend to yourself
- Hour 3: Fix critical issues
- Hour 4: Write blog: "Building a Marketplace Backend"
- Hour 5: Plan Month 3 (Frontend focus)

## MONTH 3: Frontend Mastery - React & State Management (Days 61-90)

### Week 9: React Fundamentals (Days 61-67)

Day 61: React Basics
- Hour 1: React concepts, Virtual DOM, JSX
- Hour 2: Components, props, children
- Hour 3: State with useState
- Hour 4: Event handling
- Hour 5: Build: Counter, todo list components

Day 62: React Hooks Deep Dive
- Hour 1: useEffect, dependency array
- Hour 2: useContext for state sharing
- Hour 3: useReducer for complex state
- Hour 4: useRef, useMemo, useCallback
- Hour 5: Build: Custom hooks library

Day 63: Component Patterns
- Hour 1: Container/Presentational pattern
- Hour 2: Compound components
- Hour 3: Render props
- Hour 4: Higher-order components
- Hour 5: Build: Reusable component library

Day 64: Forms & Validation
- Hour 1: Controlled vs uncontrolled inputs
- Hour 2: React Hook Form
- Hour 3: Yup validation schema
- Hour 4: Complex form handling
- Hour 5: Build: Multi-step form

Day 65: React Router
- Hour 1: Client-side routing basics
- Hour 2: Dynamic routes, params
- Hour 3: Protected routes
- Hour 4: Nested routes, layouts
- Hour 5: Build: Multi-page app structure

Day 66: Integration Day
- Hour 1-3: Build authentication flow
- Hour 4-5: Protected dashboard layout

Day 67: Review
- Hour 1-2: Review React concepts
- Hour 3: Refactor previous components
- Hour 4: Component library documentation
- Hour 5: Plan next week

### Week 10: State Management & Advanced React (Days 68-74)

Day 68: Redux Fundamentals
- Hour 1: Redux architecture (store, actions, reducers)
- Hour 2: Redux Toolkit setup
- Hour 3: createSlice, configureStore
- Hour 4: useSelector, useDispatch hooks
- Hour 5: Build: Counter with Redux

Day 69: Redux Advanced
- Hour 1: Async actions with createAsyncThunk
- Hour 2: Redux middleware
- Hour 3: RTK Query basics
- Hour 4: Normalized state
- Hour 5: Build: API data fetching with Redux

Day 70: React Query
- Hour 1: React Query fundamentals
- Hour 2: Queries, mutations
- Hour 3: Caching strategies
- Hour 4: Optimistic updates
- Hour 5: Build: Data fetching layer

Day 71: Performance Optimization
- Hour 1: React DevTools profiler
- Hour 2: React.memo, useMemo, useCallback
- Hour 3: Code splitting with lazy/Suspense
- Hour 4: Virtual scrolling
- Hour 5: Optimize: Previous components

Day 72: TypeScript with React
- Hour 1: Typing components, props
- Hour 2: Typing hooks
- Hour 3: Generic components
- Hour 4: Event typing
- Hour 5: Convert: Components to TypeScript

Day 73: Integration Day
- Hour 1-3: Build dashboard with Redux
- Hour 4-5: Add API integration

Day 74: Review
- Hour 1-2: State management review
- Hour 3: Performance testing
- Hour 4: Write blog: "React State Management Guide"
- Hour 5: Plan next week

### Week 11: Styling & UI/UX (Days 75-81)

Day 75: CSS-in-JS
- Hour 1: Styled-components basics
- Hour 2: Theme provider
- Hour 3: Dynamic styling
- Hour 4: Responsive design
- Hour 5: Build: Themed component library

Day 76: Tailwind CSS
- Hour 1: Tailwind setup, utility classes
- Hour 2: Responsive design with Tailwind
- Hour 3: Custom configuration
- Hour 4: Component patterns with Tailwind
- Hour 5: Build: Landing page with Tailwind

Day 77: UI Libraries
- Hour 1: Material-UI basics
- Hour 2: Chakra UI exploration
- Hour 3: shadcn/ui components
- Hour 4: Customization strategies
- Hour 5: Build: Dashboard with UI library

Day 78: Animations
- Hour 1: CSS animations and transitions
- Hour 2: Framer Motion basics
- Hour 3: Page transitions
- Hour 4: Gesture animations
- Hour 5: Build: Animated UI components

Day 79: Responsive Design
- Hour 1: Mobile-first approach
- Hour 2: Breakpoints and media queries
- Hour 3: Flexbox and Grid mastery
- Hour 4: Touch interactions
- Hour 5: Make: All components responsive

Day 80: Integration Day
- Hour 1-3: Complete UI redesign
- Hour 4-5: Add animations and polish

Day 81: Review
- Hour 1-2: UI/UX review
- Hour 3: Accessibility audit
- Hour 4: Portfolio screenshots
- Hour 5: Plan next week

### Week 12: Advanced Frontend & Project 2 Start (Days 82-90)

Day 82: Real-time Features
- Hour 1: Socket.io-client setup
- Hour 2: Connection management
- Hour 3: Event handling
- Hour 4: Real-time notifications
- Hour 5: Build: Live notification system

Day 83: File Uploads
- Hour 1: File input handling
- Hour 2: Preview before upload
- Hour 3: Drag-and-drop
- Hour 4: Progress tracking
- Hour 5: Build: File upload component

Day 84: Advanced Forms
- Hour 1: Multi-step forms
- Hour 2: Conditional fields
- Hour 3: File uploads in forms
- Hour 4: Form persistence
- Hour 5: Build: Job posting form

Day 85: Error Handling & Loading States
- Hour 1: Error boundaries
- Hour 2: Loading skeletons
- Hour 3: Toast notifications
- Hour 4: Retry logic
- Hour 5: Build: Error handling system

Day 86: Project 2 Frontend Start - Auth & App Shell
- Hour 1: Next.js app setup in the Nx monorepo: shared UI, API client and types packages
- Hour 2: Login, register and refresh-token flow with RTK Query and httpOnly cookies
- Hour 3: Role-based route guards (business vs provider) and layout shell
- Hour 4: Zod + react-hook-form validation with accessible error states
- Hour 5: Build: FieldConnect web auth pages, responsive and themed

Day 87: Dashboard Layouts
- Hour 1: Business dashboard layout: sidebar, top bar, stat cards
- Hour 2: Provider dashboard: upcoming jobs, earnings, availability
- Hour 3: Reusable data table with filters, sorting and pagination
- Hour 4: Skeleton loaders, empty states and error boundaries
- Hour 5: Build: both dashboards wired to mock then real endpoints

Day 88: Job Listing & Detail Pages
- Hour 1: Job search page: filters, geo radius, pagination (cursor based)
- Hour 2: Job detail page with SSR/ISR and SEO metadata
- Hour 3: Apply / accept flow with optimistic updates
- Hour 4: Profile pages: business and provider, avatar upload
- Hour 5: Build: real-time notification bell via Socket.io

Day 89: Integration Testing
- Hour 1-3: Connect frontend to backend
- Hour 4-5: Fix integration issues

Day 90: Month 3 Review
- Hour 1-2: Demo full-stack app
- Hour 3: Polish UI/UX
- Hour 4: Write blog: "React Best Practices"
- Hour 5: Plan Month 4

## MONTH 4: Mobile Development & DevOps (Days 91-120)

### Week 13: React Native Fundamentals (Days 91-97)

Day 91: React Native Setup
- Hour 1: Environment setup (Android Studio/Xcode)
- Hour 2: React Native basics, components
- Hour 3: Style differences (StyleSheet)
- Hour 4: Navigation setup
- Hour 5: Build: Simple mobile app

Day 92: React Native Core Components
- Hour 1: View, Text, Image, ScrollView
- Hour 2: FlatList, SectionList
- Hour 3: TouchableOpacity, Pressable
- Hour 4: Modal, StatusBar
- Hour 5: Build: Product listing screen

Day 93: React Native Navigation
- Hour 1: React Navigation setup
- Hour 2: Stack Navigator
- Hour 3: Tab Navigator
- Hour 4: Drawer Navigator
- Hour 5: Build: Complete navigation flow

Day 94: Forms & Input
- Hour 1: TextInput handling
- Hour 2: Keyboard management
- Hour 3: Form validation in RN
- Hour 4: Platform-specific inputs
- Hour 5: Build: Login/Signup screens

Day 95: API Integration
- Hour 1: Fetch vs Axios in RN
- Hour 2: Async Storage
- Hour 3: Redux with React Native
- Hour 4: Token management
- Hour 5: Build: API-connected app

Day 96: Integration Day
- Hour 1-3: Build job browsing mobile app
- Hour 4-5: Connect to backend API

Day 97: Review
- Hour 1-2: Review React Native concepts
- Hour 3: Test on iOS/Android
- Hour 4: Documentation
- Hour 5: Plan next week

### Week 14: Advanced React Native (Days 98-104)

Day 98: Push Notifications
- Hour 1: Firebase Cloud Messaging setup
- Hour 2: Notification permissions
- Hour 3: Foreground notifications
- Hour 4: Background notifications
- Hour 5: Build: Notification system

Day 99: Camera & Media
- Hour 1: React Native Camera setup
- Hour 2: Taking photos
- Hour 3: Image picker
- Hour 4: Image compression
- Hour 5: Build: Profile photo upload

Day 100: Maps & Location
- Hour 1: React Native Maps setup
- Hour 2: Displaying markers
- Hour 3: Geolocation API
- Hour 4: Distance calculations
- Hour 5: Build: Job location map

Day 101: Performance Optimization
- Hour 1: FlatList optimization
- Hour 2: Image optimization
- Hour 3: Memory management
- Hour 4: Profiling with Flipper
- Hour 5: Optimize: Previous screens

Day 102: Platform-Specific Code
- Hour 1: Platform module
- Hour 2: Platform-specific components
- Hour 3: iOS vs Android differences
- Hour 4: Native modules basics
- Hour 5: Build: Platform-aware features

Day 103: Integration Day
- Hour 1-3: Complete mobile app features
- Hour 4-5: Real-time notifications

Day 104: Review
- Hour 1: Test on real devices
- Hour 2: Fix bugs
- Hour 3: Generate APK/IPA
- Hour 4: Write blog: "React Native Journey"
- Hour 5: Plan next week

### Week 15: Docker & Kubernetes (Days 105-111)

Day 105: Docker Fundamentals
- Hour 1: Docker concepts, images, containers
- Hour 2: Dockerfile creation
- Hour 3: Docker commands
- Hour 4: Multi-stage builds
- Hour 5: Build: Dockerize backend services

Day 106: Docker Compose
- Hour 1: Docker Compose basics
- Hour 2: Service definitions
- Hour 3: Networks and volumes
- Hour 4: Environment variables
- Hour 5: Build: Complete docker-compose.yml

Day 107: Container Optimization
- Hour 1: Image size optimization
- Hour 2: Layer caching strategies
- Hour 3: .dockerignore
- Hour 4: Security best practices
- Hour 5: Optimize: All Docker images

Day 108: Kubernetes Basics
- Hour 1: Kubernetes architecture
- Hour 2: Pods, Services, Deployments
- Hour 3: kubectl commands
- Hour 4: ConfigMaps and Secrets
- Hour 5: Build: Deploy service to Minikube

Day 109: Kubernetes Advanced
- Hour 1: Ingress controllers
- Hour 2: Persistent volumes
- Hour 3: Horizontal Pod Autoscaling
- Hour 4: Health checks
- Hour 5: Build: Production K8s manifests

Day 110: Integration Day
- Hour 1-3: Deploy all microservices to K8s
- Hour 4-5: Test in K8s environment

Day 111: Review
- Hour 1-2: Review Docker/K8s
- Hour 3: Documentation
- Hour 4: Create deployment guide
- Hour 5: Plan next week

### Week 16: AWS & Cloud Deployment (Days 112-120)

Day 112: AWS Fundamentals
- Hour 1: AWS account setup, IAM
- Hour 2: EC2 basics, instance types
- Hour 3: Security groups, key pairs
- Hour 4: Elastic IP, AMI
- Hour 5: Deploy: Backend on EC2

Day 113: AWS Networking
- Hour 1: VPC, subnets
- Hour 2: Route tables, internet gateway
- Hour 3: Load balancers (ALB)
- Hour 4: Auto Scaling Groups
- Hour 5: Setup: Production network

Day 114: AWS Storage & Database
- Hour 1: S3 basics, buckets
- Hour 2: S3 access control
- Hour 3: RDS setup (MySQL)
- Hour 4: RDS backups, replicas
- Hour 5: Migrate: Database to RDS

Day 115: AWS Container Services
- Hour 1: ECR (Container Registry)
- Hour 2: ECS basics
- Hour 3: ECS task definitions
- Hour 4: ECS services
- Hour 5: Deploy: Services to ECS

Day 116: CI/CD Pipeline
- Hour 1: GitHub Actions basics
- Hour 2: Build pipeline
- Hour 3: Test automation in CI
- Hour 4: Deployment pipeline
- Hour 5: Setup: Complete CI/CD

Day 117: Monitoring & Logging
- Hour 1: CloudWatch basics
- Hour 2: CloudWatch Logs
- Hour 3: CloudWatch Alarms
- Hour 4: Application metrics
- Hour 5: Setup: Complete monitoring

Day 118: Production Deployment Part 1 - Frontend
- Hour 1: Build and optimise the Next.js app (bundle analysis, image optimisation)
- Hour 2: Provision S3 + CloudFront with correct cache headers
- Hour 3: Configure custom domain, Route 53 records and ACM SSL
- Hour 4: CI/CD pipeline: lint, test, build, deploy on merge
- Hour 5: Smoke tests, Lighthouse run and rollback plan

Day 119: Production Deployment Part 2 - Backend
- Hour 1: Push service images to ECR and define ECS task definitions
- Hour 2: Provision RDS (MySQL), secrets in Secrets Manager
- Hour 3: ALB, health checks, autoscaling policies
- Hour 4: Wire environment config, DNS and SSL for the API
- Hour 5: Load test the live stack and set CloudWatch alarms

Day 120: Month 4 Review
- Hour 1-2: System health check
- Hour 3: Performance optimization
- Hour 4: Write blog: "Production Deployment Guide"
- Hour 5: Plan Month 5

## MONTH 5: Advanced Topics & Project 2 Completion (Days 121-150)

### Week 17: Advanced Backend (Days 121-127)

Day 121: GraphQL
- Hour 1: GraphQL vs REST
- Hour 2: Schema definition
- Hour 3: Resolvers
- Hour 4: Mutations and subscriptions
- Hour 5: Build: GraphQL API

Day 122: GraphQL Advanced
- Hour 1: DataLoader for N+1 problem
- Hour 2: Authentication in GraphQL
- Hour 3: Error handling
- Hour 4: File uploads
- Hour 5: Build: Complete GraphQL server

Day 123: API Security
- Hour 1: OWASP Top 10
- Hour 2: SQL injection prevention
- Hour 3: XSS, CSRF protection
- Hour 4: Rate limiting strategies
- Hour 5: Audit: Security checklist

Day 124: Payment Integration
- Hour 1: Stripe basics
- Hour 2: Payment intents
- Hour 3: Webhooks
- Hour 4: Stripe Connect (marketplace)
- Hour 5: Build: Payment system

Day 125: Email & SMS
- Hour 1: SendGrid setup
- Hour 2: Email templates
- Hour 3: Transactional emails
- Hour 4: Twilio SMS integration
- Hour 5: Build: Notification service v2

Day 126: Integration Day
- Hour 1-3: Add payment to FieldConnect
- Hour 4-5: Email/SMS notifications

Day 127: Review
- Hour 1-2: Review advanced topics
- Hour 3: Security audit
- Hour 4: Documentation
- Hour 5: Plan next week

### Week 18: System Design & Scalability (Days 128-134)

Day 128: System Design Principles
- Hour 1: CAP theorem
- Hour 2: Database scaling (vertical vs horizontal)
- Hour 3: Caching layers
- Hour 4: CDN usage
- Hour 5: Design: Scalable architecture

Day 129: Load Balancing
- Hour 1: Load balancing algorithms
- Hour 2: NGINX configuration
- Hour 3: Sticky sessions
- Hour 4: Health checks
- Hour 5: Setup: Load balancer

Day 130: Database Replication
- Hour 1: Master-slave replication
- Hour 2: Read replicas
- Hour 3: Sharding strategies
- Hour 4: Database failover
- Hour 5: Setup: Replication

Day 131: Message Queue Patterns
- Hour 1: Competing consumers
- Hour 2: Priority queues
- Hour 3: Dead letter handling
- Hour 4: Message deduplication
- Hour 5: Implement: Advanced patterns

Day 132: Observability
- Hour 1: Logging strategies
- Hour 2: Distributed tracing
- Hour 3: Metrics collection
- Hour 4: APM tools (New Relic/DataDog)
- Hour 5: Setup: Full observability

Day 133: Integration Day
- Hour 1-3: Implement scaling strategies
- Hour 4-5: Performance testing

Day 134: Review
- Hour 1: System design practice
- Hour 2: Architecture documentation
- Hour 3: Write blog: "Scaling Strategies"
- Hour 4: Review system design questions
- Hour 5: Plan next week

### Week 19-21: Project 2 - Complete FieldConnect (Days 135-150)

Day 135: Sprint 1 - Core Features
- Hour 1: Finish job CRUD with ownership and permission checks
- Hour 2: Application lifecycle: apply, shortlist, accept, complete
- Hour 3: Search, filtering and saved searches
- Hour 4: API contract tests for every endpoint
- Hour 5: Update the board and write sprint 1 notes

Day 136: Real-time Notifications
- Hour 1: Design the event model (job.created, application.updated, message.sent)
- Hour 2: Socket.io gateway with auth and rooms
- Hour 3: Push notifications on mobile (Expo notifications)
- Hour 4: Notification preferences and unread counts
- Hour 5: Test reconnects and missed-event catch-up

Day 137: Payment Integration
- Hour 1: Payment flow design: escrow, release, refund states
- Hour 2: Stripe (or SSLCommerz/bKash for local) sandbox integration
- Hour 3: Webhook handler: signature check, idempotency, retries
- Hour 4: Payout ledger with append-only transactions
- Hour 5: Edge cases: partial refunds, duplicate webhooks, failures

Day 138: Mobile App Polish
- Hour 1: Navigation, deep links and splash/onboarding flow
- Hour 2: Offline-friendly lists with MMKV cache and pull-to-refresh
- Hour 3: Performance pass: FlatList tuning, memoisation, Hermes profiling
- Hour 4: Accessibility: labels, touch targets, dynamic type
- Hour 5: Test on a low-end Android device and fix jank

Day 139: Admin Dashboard
- Hour 1: Admin app shell with RBAC and audit log
- Hour 2: User, job and dispute management screens
- Hour 3: Analytics widgets: jobs per day, GMV, conversion
- Hour 4: Bulk actions, CSV export and impersonation safeguards
- Hour 5: Build: moderation queue with approval workflow

Day 140: Sprint 2 - Polish & Testing
- Hour 1: Unit tests for services and hooks (coverage target 80%)
- Hour 2: Integration tests with a real test database
- Hour 3: E2E tests: Playwright for web, Maestro for mobile
- Hour 4: Fix flaky tests and set up CI test reports
- Hour 5: Triage the bug list and plan the hardening week

Day 141: Performance Optimization
- Hour 1: Profile API endpoints and fix N+1 queries
- Hour 2: Add indexes, query plans and Redis caching
- Hour 3: Web: code splitting, streaming, image and font optimisation
- Hour 4: Mobile: startup time, bundle size, memory leaks
- Hour 5: Compare before/after metrics and record them

Day 142: Security Hardening
- Hour 1: OWASP top 10 review against your own API
- Hour 2: Rate limiting, input sanitisation, CSRF and CORS audit
- Hour 3: Secrets management, dependency audit and Dependabot
- Hour 4: JWT rotation, device sessions and token revocation
- Hour 5: Add security headers and write a threat model

Day 143: UI/UX Refinement
- Hour 1: Design review: spacing, typography, colour contrast
- Hour 2: Responsive checks at mobile, tablet and desktop widths
- Hour 3: Micro-interactions and loading feedback with Framer Motion
- Hour 4: Dark/light theme parity and accessibility audit
- Hour 5: Usability test with 2-3 people and note findings

Day 144: Bug Fixes
- Hour 1: Triage open bugs by severity and user impact
- Hour 2: Fix critical and high bugs with regression tests
- Hour 3: Improve error messages and logging context
- Hour 4: Add Sentry (or equivalent) to web, API and mobile
- Hour 5: Verify fixes on staging and update changelog

Day 145: Deployment & Documentation
- Hour 1: Deploy Project 2 to production with blue/green strategy
- Hour 2: Run migrations safely and verify data
- Hour 3: Monitoring dashboards and uptime checks
- Hour 4: Write the runbook: deploy, rollback, incidents
- Hour 5: Post-deploy checklist and smoke tests

Day 146: API Documentation
- Hour 1: Generate OpenAPI specs from NestJS decorators
- Hour 2: Add examples, error formats and auth docs
- Hour 3: Publish with Swagger UI / Redoc
- Hour 4: Postman collection and typed client generation
- Hour 5: Review docs from a new developer's point of view

Day 147: User Guide
- Hour 1: Write the business user guide with screenshots
- Hour 2: Write the provider guide for the mobile app
- Hour 3: FAQ and troubleshooting section
- Hour 4: In-app help and onboarding tooltips
- Hour 5: Proofread and publish alongside the app

Day 148: Video Demo Creation
- Hour 1: Script the demo around real user journeys
- Hour 2: Record web and mobile flows in high quality
- Hour 3: Edit with captions and a short architecture segment
- Hour 4: Export a 3-minute cut and a full walkthrough
- Hour 5: Upload and embed on the portfolio project page

Day 149: GitHub Cleanup
- Hour 1: Clean the commit history, branches and issues
- Hour 2: Write a strong README: architecture, setup, screenshots
- Hour 3: Add LICENSE, CONTRIBUTING and .env.example
- Hour 4: Set up CI badges and release tags
- Hour 5: Pin the repo and add it to the portfolio

Day 150: Month 5 Review
- Hour 1-2: Final demo
- Hour 3: Portfolio update
- Hour 4: Write case study
- Hour 5: Plan Month 6

## MONTH 6: Specialization & Project 3 (Days 151-180)

### Week 22: Interview Preparation (Days 151-157)

Day 151: Data Structures & Algorithms - Arrays, Strings, Hash Tables
- Hour 1: Review: two pointers, sliding window, prefix sums
- Hour 2: Solve 2 array problems (easy to medium) in TypeScript
- Hour 3: Solve 2 string / hash map problems
- Hour 4: Solve 1 harder problem and write the pattern down
- Hour 5: Review mistakes and add them to the notes

Day 152: Linked Lists, Stacks, Queues
- Hour 1: Review: fast/slow pointers, reversing, merge
- Hour 2: Solve 2 linked list problems
- Hour 3: Solve 2 stack/queue problems (monotonic stack)
- Hour 4: Implement an LRU cache from scratch
- Hour 5: Review mistakes and add them to the notes

Day 153: Trees, Graphs, DFS/BFS
- Hour 1: Review: traversal orders, recursion vs iteration
- Hour 2: Solve 2 binary tree problems
- Hour 3: Solve 2 graph problems (BFS shortest path, cycle detection)
- Hour 4: Solve 1 problem with topological sort or union-find
- Hour 5: Review mistakes and add them to the notes

Day 154: System Design Practice - URL Shortener
- Hour 1: Clarify requirements and estimate scale
- Hour 2: Design ID generation, storage and redirects
- Hour 3: Caching, rate limiting and analytics
- Hour 4: Failure modes and trade-offs, then draw the diagram
- Hour 5: Mock interview: explain it out loud in 35 minutes

Day 155: System Design - Social Media Feed
- Hour 1: Requirements: fan-out on write vs read
- Hour 2: Design the timeline service and ranking basics
- Hour 3: Storage, caching and pagination strategy
- Hour 4: Real-time updates and notifications
- Hour 5: Mock interview and self-review against a rubric

Day 156: System Design - Job Marketplace
- Hour 1: Requirements: work orders, providers, scheduling, payments
- Hour 2: Matching and dispatch design, geo search
- Hour 3: Mobile offline sync and conflict handling for field technicians
- Hour 4: Reliability: queues, retries, idempotency, observability
- Hour 5: Mock interview using your own FieldConnect experience

Day 157: Behavioral Prep
- Hour 1-2: STAR method examples
- Hour 3-4: Software engineer role and target company research
- Hour 5: Mock interview

### Week 23-25: Project 3 - FieldSync, an Offline-First Field Service App (Days 158-175)

Day 158: Project 3 Selection & Setup - FieldSync: Offline-First Field Service App
- Hour 1: Finalise scope: React Native + Expo app for field technicians with an offline-first sync engine
- Hour 2: Write the PRD, architecture diagram and data model (WatermelonDB/SQLite or MMKV, plus a NestJS sync API)
- Hour 3: Set up the Nx monorepo: mobile, API, shared types and CI
- Hour 4: Define the sync protocol: change log, versioning, conflict rules
- Hour 5: Create the project board with a 12-day plan

Day 159: Sync Engine - Local Database & Change Log
- Hour 1: Local schema and migrations on device
- Hour 2: Change-log table recording every create/update/delete
- Hour 3: Repository layer with typed queries and tests
- Hour 4: Background queue for pending mutations
- Hour 5: Build: offline create/edit of a work order

Day 160: Sync Engine - Push & Pull API
- Hour 1: NestJS endpoints: pull changes since cursor, push mutations
- Hour 2: Idempotency keys and server-side validation
- Hour 3: Per-device cursors and tombstones for deletes
- Hour 4: Contract tests with shared Zod schemas
- Hour 5: Build: manual sync button end to end

Day 161: Conflict Resolution
- Hour 1: Define rules: last-write-wins vs field-level merge vs manual
- Hour 2: Implement field-level merge with version vectors
- Hour 3: Conflict UI: show both versions and let the user choose
- Hour 4: Property tests with random offline edit sequences
- Hour 5: Reduce data-loss scenarios and document the cases

Day 162: Background Sync & Connectivity
- Hour 1: Network state detection and retry with backoff
- Hour 2: Background tasks (expo-task-manager) and battery-friendly scheduling
- Hour 3: Sync status indicators and error recovery
- Hour 4: Large payload handling: batching and compression
- Hour 5: Test flaky networks with Network Link Conditioner

Day 163: Work Order Features
- Hour 1: Work order list, filters and detail screens
- Hour 2: Checklists, notes and status transitions offline
- Hour 3: Photo capture with local queue and resumable upload
- Hour 4: Signature capture and completion flow
- Hour 5: Build: a full job from assignment to completion offline

Day 164: Live Location & Maps
- Hour 1: Foreground/background location permissions
- Hour 2: Route and distance display with map libraries
- Hour 3: Throttled location uploads and offline buffering
- Hour 4: Geofence check-in/check-out
- Hour 5: Privacy: consent, retention and battery impact review

Day 165: AI Feature - Document OCR
- Hour 1: Capture work order forms or invoices with the camera
- Hour 2: On-device or API OCR, including Bangla text where useful
- Hour 3: Extract fields and pre-fill the form with confidence scores
- Hour 4: Human review step for low-confidence results
- Hour 5: Label AI-generated content clearly in the UI

Day 166: AI Feature - Identity Verification
- Hour 1: Liveness / face match flow design and privacy review
- Hour 2: Camera capture with quality and liveness checks
- Hour 3: Fallback path when verification fails
- Hour 4: Store only what is needed, encrypted, with consent
- Hour 5: Disclose the use of AI to the user at the point of capture

Day 167: Security & Device Protection
- Hour 1: Secure token storage and refresh handling
- Hour 2: Biometric app lock and screen-capture prevention
- Hour 3: Certificate pinning and jailbreak/root checks (where sensible)
- Hour 4: Encrypt local data at rest
- Hour 5: Security review checklist for the mobile app

Day 168: Admin Web Dashboard (Next.js)
- Hour 1: Admin dashboard for dispatch and monitoring
- Hour 2: Technician map, job status board and sync health
- Hour 3: Role-based access and audit logging
- Hour 4: Reports and CSV export
- Hour 5: Deploy the dashboard preview

Day 169: Observability & Performance
- Hour 1: Crash reporting and structured logging
- Hour 2: Sync metrics: lag, failures, conflicts, payload sizes
- Hour 3: Startup time and list performance on low-end devices
- Hour 4: Load test the sync API with thousands of devices
- Hour 5: Fix the top 3 bottlenecks

Day 170: Testing & Release Candidate
- Hour 1: Unit and integration tests for the sync engine
- Hour 2: Maestro E2E flows for offline scenarios
- Hour 3: Beta build through EAS and internal testing
- Hour 4: Fix release blockers and write release notes
- Hour 5: Freeze features and tag the release candidate

Day 171: Final Testing
- Hour 1: Run the full regression on iOS and Android
- Hour 2: Offline-to-online edge case matrix (airplane mode, kill app, low storage)
- Hour 3: Accessibility and localisation pass
- Hour 4: Fix critical findings and re-test
- Hour 5: Sign off the release checklist

Day 172: Performance Optimization
- Hour 1: Profile JS thread and native render performance
- Hour 2: Reduce bundle size and cold start time
- Hour 3: Optimise sync batch sizes and DB indexes
- Hour 4: Memory and battery checks over a long session
- Hour 5: Record before/after numbers for the case study

Day 173: Video Demo
- Hour 1: Script a demo that highlights the offline-first story
- Hour 2: Record the app on real devices, offline and online
- Hour 3: Show the sync and conflict resolution visually
- Hour 4: Edit with captions and architecture overlay
- Hour 5: Publish to YouTube and embed on the portfolio

Day 174: Blog Post
- Hour 1: Outline: problem, architecture, trade-offs, lessons
- Hour 2: Write the draft with diagrams and code snippets
- Hour 3: Add metrics and a short conflict-resolution walkthrough
- Hour 4: Edit for clarity and SEO
- Hour 5: Publish on Medium and your portfolio

Day 175: Project 3 Complete Milestone
- Hour 1: Final demo walkthrough from start to finish
- Hour 2: Update the README, diagrams and setup instructions
- Hour 3: Tag the release and publish the build
- Hour 4: Collect feedback from 2-3 engineers
- Hour 5: Write a retrospective: what worked, what to improve

### Week 26: Final Preparation (Days 176-180)

Day 176: Portfolio Perfection - Polish All 3 Projects
- Hour 1: Add all three projects with outcomes and metrics
- Hour 2: Case study pages: problem, approach, results
- Hour 3: Screenshots, videos and architecture diagrams
- Hour 4: Improve SEO, performance and accessibility of the site
- Hour 5: Ask the AI assistant common questions and tune its answers

Day 177: Update GitHub READMEs
- Hour 1: Rewrite the three project READMEs consistently
- Hour 2: Add architecture diagrams, badges and demo links
- Hour 3: Update the profile README and pinned repositories
- Hour 4: Clean up old repositories
- Hour 5: Verify every link and setup instruction

Day 178: Portfolio Website & Demo Videos
- Hour 1: Final pass on the portfolio content and structure
- Hour 2: Embed demo videos and add case studies
- Hour 3: Cross-browser and mobile checks
- Hour 4: Lighthouse, sitemap and metadata review
- Hour 5: Publish and share a progress post

Day 179: Resume & Application
- Hour 1: Tailor the resume to the role with quantified results
- Hour 2: Write a focused cover letter
- Hour 3: Optimise LinkedIn and GitHub profiles
- Hour 4: Prepare references and a project walkthrough for interviews
- Hour 5: Submit the application

Day 180: Celebration & Planning
- Hour 1-2: Reflect on 6-month journey
- Hour 3: Set post-application goals
- Hour 4: Network with software engineers at your target companies
- Hour 5: Plan next steps
`;


// Tasks already covered by the skills, work and projects on the portfolio (React Native Expo/CLI, TypeScript,
// JavaScript, Node.js/Express, Next.js, React, Redux Toolkit/RTK Query/Zustand/React Query, MongoDB, PostgreSQL,
// GraphQL, Tailwind, Framer Motion, Nx monorepo, MMKV/AsyncStorage, Hermes, offline-first sync, JWT/secure tokens,
// biometric/liveness, GPS tracking, Bangla OCR). Values are 1-based checklist positions; 'all' ticks every item.
// Anything not listed (NestJS, MySQL, RabbitMQ, Redis, Docker, Kubernetes, AWS, Stripe, Jest...) stays pending.
const KNOWN: Record<number, number[] | 'all'> = {
  1: 'all', 2: 'all', 3: 'all', 4: [1, 2], 5: 'all', 6: [1, 2],
  8: 'all', 9: 'all', 10: 'all', 11: 'all', 12: [3, 4], 13: [1, 2],
  22: 'all', 52: [1],
  61: 'all', 62: 'all', 63: 'all', 64: [1, 2, 4, 5],
  68: 'all', 69: 'all', 70: 'all', 71: [1, 2, 3], 72: 'all', 73: 'all',
  76: 'all', 77: [3, 4], 78: 'all', 79: 'all', 80: 'all',
  83: [1, 2, 5], 84: [1, 2], 85: [1, 2, 3],
  86: [1, 2, 3, 4], 87: [1, 2, 3, 4],
  91: 'all', 92: 'all', 93: 'all', 94: 'all', 95: 'all',
  99: [1, 2, 3], 100: [3, 4], 101: [1, 2, 3], 102: 'all', 104: [1, 2, 3],
  121: 'all', 122: 'all', 125: [2, 3],
  138: [1, 2, 3],
  159: 'all', 160: [2, 3], 161: [1, 2, 3, 5], 162: [1, 2, 3],
  163: [1, 2], 164: [1, 3], 165: [1, 2, 3], 166: [1, 2, 3], 167: [1, 2],
};

function applyKnown(days: any[]) {
  for (const day of days) {
    const rule = KNOWN[day.dayNumber];
    if (!rule || !day.checklist.length) continue;
    day.checklist.forEach((item: any, i: number) => {
      if (rule === 'all' || rule.includes(i + 1)) item.completed = true;
    });
    const ticked = day.checklist.filter((c: any) => c.completed).length;
    day.hoursLogged = Math.max(day.hoursLogged || 0, ticked);
    if (ticked === day.checklist.length && day.status === 'pending') {
      day.status = 'completed';
      day.notes = day.notes || 'Already covered by existing skills and project work.';
    }
  }
}

async function seed() {

  const slug = 'software-engineer-mastery';
  const legacySlug = 'field-nation-mastery'; // renamed; existing data is migrated to the new slug
  const startDate = new Date('2024-05-20');
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 180);

  const trackerData = {
    title: '6-Month Software Engineer Mastery',
    slug,
    description: 'Intensive 900-hour path to becoming a Senior Software Engineer.',
    startDate,
    endDate,
    totalDays: 180,
    dailyHours: 5,
    status: 'active',
    featured: true,
    color: '#10b981',
    tags: ['NestJS', 'React', 'React Native', 'TypeScript', 'MySQL', 'RabbitMQ', 'AWS', 'Kubernetes', 'Offline-first'],
    milestones: [
      { title: 'TypeScript + Node.js Mastered', dayNumber: 30 },
      { title: 'Project 1 Backend Complete', dayNumber: 60 },
      { title: 'React Mastery Complete', dayNumber: 90 },
      { title: 'Production Deployment Complete', dayNumber: 120 },
      { title: 'Project 2 Complete', dayNumber: 150 },
      { title: 'Ready to land the job!', dayNumber: 180 }
    ],
    days: [] as any[]
  };

  const lines = planText.split('\n').filter(l => l.trim());
  let currentDay = 0;
  let currentTitle = '';
  let currentChecklist: any[] = [];

  let dayRange: number[] = [];
  for (const line of lines) {
    const rangeMatch = line.match(/^(\*\*?)?Day\s+(\d+)\s*[-–—]\s*(\d+)/i);
    const dayMatch = line.match(/^(\*\*?)?Day\s+(\d+)/i);

    if (rangeMatch || dayMatch) {
      if (dayRange.length > 0 || currentDay > 0) {
        const daysToPush = dayRange.length > 0 ? dayRange : [currentDay];
        for (const d of daysToPush) {
          // Avoid duplicate days if plan has overlapping ranges or mixed formats
          if (!trackerData.days.some(existing => existing.dayNumber === d)) {
            trackerData.days.push({
              dayNumber: d,
              title: currentTitle,
              checklist: JSON.parse(JSON.stringify(currentChecklist)), // deep clone
              status: 'pending',
              hoursLogged: 0,
              notes: ''
            });
          }
        }
      }

      if (rangeMatch) {
        const start = parseInt(rangeMatch[2]);
        const end = parseInt(rangeMatch[3]);
        dayRange = [];
        for (let d = start; d <= end; d++) dayRange.push(d);
        currentDay = 0;
        currentTitle = line.replace(/^(\*\*?)?Day\s+\d+\s*[-–—]\s*\d+[:\s]*/i, '').replace(/\*?\*?$/, '').trim();
      } else {
        currentDay = parseInt(dayMatch![2]);
        dayRange = [];
        currentTitle = line.replace(/^(\*\*?)?Day\s+\d+[:\s]*/i, '').replace(/\*?\*?$/, '').trim();
      }
      currentChecklist = [];
    } else if ((dayRange.length > 0 || currentDay > 0) && (line.trim().startsWith('-') || line.trim().startsWith('*'))) {
      const hourMatch = line.match(/Hour\s+(\d+)/i);
      const hour = hourMatch ? parseInt(hourMatch[1]) : currentChecklist.length + 1;
      const text = line.replace(/^[-*]\s*/, '').replace(/Hour\s+\d+[:\s]*/i, '').replace(/\s*\(Hour\s+\d+\)$/i, '').trim();
      if (text) currentChecklist.push({ text, completed: false, hour });
    }
  }

  // Final push for the last day or range
  if (dayRange.length > 0 || currentDay > 0) {
    const daysToPush = dayRange.length > 0 ? dayRange : [currentDay];
    for (const d of daysToPush) {
      if (!trackerData.days.some(existing => existing.dayNumber === d)) {
        trackerData.days.push({
          dayNumber: d,
          title: currentTitle,
          checklist: JSON.parse(JSON.stringify(currentChecklist)),
          status: 'pending',
          hoursLogged: 0,
          notes: ''
        });
      }
    }
  }

  trackerData.days.sort((a, b) => a.dayNumber - b.dayNumber);

  if (DRY_RUN) {
    const missing = Array.from({ length: 180 }, (_, i) => i + 1).filter(n => !trackerData.days.some(d => d.dayNumber === n));
    const thin = trackerData.days.filter(d => d.checklist.length < 3).map(d => d.dayNumber);
    applyKnown(trackerData.days);
    const done = trackerData.days.filter(d => d.status === 'completed').length;
    const partial = trackerData.days.filter(d => d.status !== 'completed' && d.checklist.some((c: any) => c.completed)).length;
    const hours = trackerData.days.reduce((a, d) => a + (d.hoursLogged || 0), 0);
    console.log(`[dry run] known: ${done} days completed, ${partial} partially ticked, ${hours}h logged`);
    console.log(`[dry run] ${trackerData.days.length} days parsed, missing: [${missing}], days with <3 checklist items: [${thin}]`);
    return;
  }

  await mongoose.connect(MONGODB_URI!);
  console.log('Connected to MongoDB');

  // Keep any progress already logged (status, hours, notes, mood, ticked items) when re-seeding
  const existing = await Tracker.findOne({ slug: { $in: [slug, legacySlug] } }).lean<{ days?: any[] }>();
  if (existing?.days?.length) {
    const byDay = new Map(existing.days.map((d: any) => [d.dayNumber, d]));
    for (const day of trackerData.days) {
      const prev = byDay.get(day.dayNumber);
      if (!prev) continue;
      day.status = prev.status;
      day.hoursLogged = prev.hoursLogged;
      day.notes = prev.notes;
      day.mood = prev.mood;
      day.date = prev.date;
      const done = new Set((prev.checklist || []).filter((c: any) => c.completed).map((c: any) => c.text));
      day.checklist.forEach((c: any) => { c.completed = done.has(c.text); });
    }
  }

  applyKnown(trackerData.days);

  // Upsert
  await Tracker.findOneAndUpdate({ slug: { $in: [slug, legacySlug] } }, trackerData, { upsert: true, new: true });
  console.log(`Seeded tracker: ${trackerData.title} with ${trackerData.days.length} days`);

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
