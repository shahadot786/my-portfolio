# MD. Shahadot Hossain - Portfolio v2.0

A high-performance, full-stack developer portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and a **custom Express.js Backend**. Designed for total control, it features a complete Admin Dashboard to manage every aspect of the site without touching code.

[![Live Demo](https://img.shields.io/badge/demo-live-emerald)](https://shahadot-hossain.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

## ✨ New in v2.0: Full Admin Control

The portfolio is now powered by a **dynamic backend**, allowing you to update everything from a secure dashboard:

- **🖥️ Admin Dashboard**: Manage Projects, Experience, Education, Skills, and Testimonials via a beautiful, dark-themed UI.
- **📄 Dynamic Pages**: Edit page titles, subtitles, and SEO metadata (Title, Description, Keywords) directly from the admin panel.
- **📝 Automated Medium Blog**: Just paste your Medium URL, and the system automatically scrapes the Title, Thumbnail, and Excerpt. Or, let the frontend RSS feed auto-populate completely.
- **🎓 Verified Credentials**: Showcase certifications with large, premium-looking cover cards and verification badges.
- **💬 Message Center**: View contact form submissions directly in the Admin panel (email notifications disabled for privacy).
- **🛡️ Secure Auth**: JWT-based authentication with Access (7d) and Refresh (120d) tokens.

## 🚀 Standard Features

- **🎨 Minimalist Aesthetic**: Clean "Zinc" design system inspired by modern developer portfolios.
- **📱 Responsive by Design**: Optimized for all devices with a custom mobile bottom navigation bar.
- **🔍 SEO Optimized**: Server-rendered pages with dynamic metadata, sitemaps, and robots.txt.
- **⚡ High Performance**: Disabled aggressive caching for real-time admin updates.

## 🛠️ Project Structure

This is a Monorepo containing both Frontend and Backend:

```
my-portfolio/
├── frontend/             # Next.js 14 App Router (Public + Admin)
│   ├── app/
│   │   ├── admin/        # Protected Admin Dashboard routes
│   │   ├── api/          # Frontend API proxies
│   │   └── (public)/     # Public portfolio pages
│   ├── components/       # Shared UI (Nav, Layouts, Admin)
│   └── lib/              # API clients and utils
│
├── backend/              # Express.js + Mongoose API
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Mongoose Schemas (User, Project, Page...)
│   │   └── routes/       # API endpoints
│   └── scripts/          # Seeding scripts
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- Yarn (Recommended)
- MongoDB running locally or a URI

### Setup

1. **Install Dependencies** (Root)
   ```bash
   yarn install
   ```

2. **Backend Setup**
   Create `backend/.env`:
   ```env
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_super_secret_key
   JWT_REFRESH_SECRET=your_super_refresh_secret
   JWT_EXPIRES_IN=7d
   JWT_REFRESH_EXPIRES_IN=120d
   NODE_ENV=development
   ```

3. **Frontend Setup**
   Create `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Seed Database**
   Populate the database with your real portfolio data:
   ```bash
   yarn workspace @portfolio/backend seed-real
   ```

5. **Run Development Server**
   Start both Frontend and Backend concurrently:
   ```bash
   yarn dev
   ```
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8080](http://localhost:8080)
   - Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 📝 Admin Configuration

Login to `/admin` to manage:
- **Profile**: Update Bio, Avatar, Social Links, and Change Password.
- **Pages**: Customize "Employment History", "Projects" headers and SEO tags.
- **Content**: Add new Projects, Skills, Certificates, and Testimonials.

## 📜 License
Apache License 2.0. Built for the community.
