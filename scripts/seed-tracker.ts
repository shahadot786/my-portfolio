import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
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

Day 86: Project 2 Frontend Start
- Hour 1-5: Build FieldConnect Web App - Auth pages

Day 87: Dashboard layouts
- Hour 1-5: Build Dashboard layouts

Day 88: Job listing/detail pages
- Hour 1-5: Profile pages, Real-time notifications

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

Day 118: Production Deployment Part 1
- Hour 1-5: Deploy complete system to AWS Frontend

Day 119: Production Deployment Part 2
- Hour 1-5: Backend to ECS, RDS, DNS, SSL

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
- Hour 1-5: Complete all CRUD operations

Day 136: Real-time notifications
- Hour 1-5: Real-time notifications

Day 137: Payment integration
- Hour 1-5: Payment integration

Day 138: Mobile app polish
- Hour 1-5: Mobile app polish

Day 139: Admin dashboard
- Hour 1-5: Admin dashboard

Day 140: Sprint 2 - Polish & Testing
- Hour 1-5: Comprehensive testing

Day 141: Performance optimization
- Hour 1-5: Performance optimization

Day 142: Security hardening
- Hour 1-5: Security hardening

Day 143: UI/UX refinement
- Hour 1-5: UI/UX refinement

Day 144: Bug fixes
- Hour 1-5: Bug fixes

Day 145: Deployment & Documentation
- Hour 1-5: Production deployment

Day 146: API documentation
- Hour 1-5: API documentation

Day 147: User guide
- Hour 1-5: User guide

Day 148: Video demo creation
- Hour 1-5: Video demo creation

Day 149: GitHub cleanup
- Hour 1-5: GitHub cleanup

Day 150: Month 5 Review
- Hour 1-2: Final demo
- Hour 3: Portfolio update
- Hour 4: Write case study
- Hour 5: Plan Month 6

## MONTH 6: Specialization & Project 3 (Days 151-180)

### Week 22: Interview Preparation (Days 151-157)

Day 151: Data Structures & Algorithms - Arrays, Strings, Hash Tables
- Hour 1-5: Practice: 5 LeetCode problems/day

Day 152: Linked Lists, Stacks, Queues
- Hour 1-5: Practice: 5 LeetCode problems/day

Day 153: Trees, Graphs, DFS/BFS
- Hour 1-5: Practice: 5 LeetCode problems/day

Day 154: System Design Practice - URL shortener
- Hour 1-5: Mock interviews

Day 155: Social media feed
- Hour 1-5: Mock interviews

Day 156: Job marketplace (Field Nation!)
- Hour 1-5: Mock interviews

Day 157: Behavioral Prep
- Hour 1-2: STAR method examples
- Hour 3-4: Field Nation research
- Hour 5: Mock interview

### Week 23-25: Project 3 - Innovation Project (Days 158-175)

Day 158: Project 3 Selection & Setup
- Hour 1-5: Choice A/B/C setup

Day 159-170: Build Project 3
- Hour 1-5: Daily implementation

Day 171: Final testing
- Hour 1-5: Final testing

Day 172: Performance optimization
- Hour 1-5: Performance optimization

Day 173: Video demo
- Hour 1-5: Video demo

Day 174: Blog post
- Hour 1-5: Blog post

Day 175: Project 3 Complete Milestone
- Hour 1-5: Complete review

### Week 26: Final Preparation (Days 176-180)

Day 176: Portfolio Perfection - Polish all 3 projects
- Hour 1-5: Portfolio website creation

Day 177: Update GitHub READMEs
- Hour 1-5: Update GitHub READMEs

Day 178: Create portfolio website & Record demo videos
- Hour 1-5: Final polish

Day 179: Resume & Application
- Hour 1-5: Tailor cover letter, LinkedIn optimization, Submit application!

Day 180: Celebration & Planning
- Hour 1-2: Reflect on 6-month journey
- Hour 3: Set post-application goals
- Hour 4: Network with Field Nation employees
- Hour 5: Plan next steps
`;


async function seed() {
  await mongoose.connect(MONGODB_URI!);
  console.log('Connected to MongoDB');

  const slug = 'field-nation-mastery';
  const startDate = new Date('2024-05-20');
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 180);

  const trackerData = {
    title: '6-Month Field Nation Mastery',
    slug,
    description: 'Intensive 900-hour path to becoming a Senior Software Engineer at Field Nation.',
    startDate,
    endDate,
    totalDays: 180,
    dailyHours: 5,
    status: 'active',
    featured: true,
    color: '#10b981',
    tags: ['NestJS', 'React', 'TypeScript', 'MySQL', 'RabbitMQ', 'AWS', 'Kubernetes'],
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

  // Upsert
  await Tracker.findOneAndUpdate({ slug }, trackerData, { upsert: true, new: true });
  console.log(`Seeded tracker: ${trackerData.title} with ${trackerData.days.length} days`);

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
