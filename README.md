# MD. Shahadot Hossain - Portfolio v2.0

A high-performance, full-stack developer portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **MongoDB**. This project features a completely integrated backend using Next.js API Routes and a comprehensive Admin Dashboard to manage all content without touching code.

[![Live Demo](https://img.shields.io/badge/demo-live-emerald)](https://shahadot-hossain.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

## ✨ Full Admin Control

The portfolio features a secure dashboard allowing you to update everything dynamically:

- **🖥️ Admin Dashboard**: Manage Projects, Experience, Education, Skills, and Testimonials via a beautiful, dark-themed UI.
- **📊 Analytics**: Built-in tracking for Page Views, Unique Visitors, Link Clicks, Traffic Sources, and Visitor Demographics.
- **📄 Dynamic Pages**: Edit page titles, subtitles, and SEO metadata (Title, Description, Keywords) directly from the admin panel.
- **📝 Automated Medium Blog**: Automatically scrapes or syncs with your Medium blog.
- **💬 Message Center**: View and manage contact form submissions.
- **🛡️ Secure Auth**: JWT-based authentication with session management.

## 🚀 Key Features

- **🎨 Minimalist Aesthetic**: Clean "Zinc" design system.
- **📱 Responsive**: Optimized for all devices with a custom mobile experience.
- **🔍 SEO Optimized**: Server-rendered pages with dynamic metadata and sitemaps.
- **⚡ Performance**: High-speed content delivery with optimized API routes.

## 🛠️ Project Structure

```
my-portfolio/
├── app/                  # Next.js 14 App Router
│   ├── admin/            # Protected Admin Dashboard
│   ├── api/              # Unified API Routes (Backend Logic)
│   └── (public)/         # Public Portfolio Pages
├── components/           # Shared UI Components
├── lib/                  # Database Models, Auth, and Utils
├── config/               # API and App Configuration
└── public/               # Static Assets
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- Yarn (Recommended)
- MongoDB running locally or a MongoDB Atlas URI

### Setup

1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/portfolio

   # JWT Secrets
   JWT_SECRET=your_access_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_EXPIRES_IN=7d
   JWT_REFRESH_EXPIRES_IN=120d

   # App Settings
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NODE_ENV=development
   ```

3. **Database Seeding**
   Populate the database with initial samples:
   ```bash
   node scripts/seed.js
   ```

4. **Run Development Server**
   ```bash
   yarn dev
   ```
   - App: [http://localhost:3000](http://localhost:3000)
   - Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 📜 License
Apache License 2.0. Built for the community.
