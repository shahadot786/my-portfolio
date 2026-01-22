# MD. Shahadot Hossain - Portfolio

A minimalist, high-performance developer portfolio built with **Next.js 14**, **React 18**, **TypeScript**, and **Tailwind CSS**. Designed for speed, SEO, and professional storytelling.

[![Live Demo](https://img.shields.io/badge/demo-live-emerald)](https://shahadot-hossain.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

## ✨ Key Features

- **🚀 Dynamic Medium Articles**: Real-time integration with Medium RSS feed, automatically showcasing latest technical articles with 1-hour caching.
- **🎨 Minimalist Aesthetic**: Clean "Zinc" design system inspired by modern developer portfolios, with subtle emerald highlights.
- **📱 Responsive by Design**: Fully optimized for mobile, tablet, and desktop with a custom mobile bottom navigation bar.
- **🔍 SEO Optimized**: Page-specific metadata, canonical links, sitemaps, and robots.txt for maximum search engine visibility.
- **📮 Interactive Contact**: Seamless contact form integrated with **Resend API** for direct-to-inbox messaging.
- **📈 Professional Showcase**: Dedicated sections for Enterprise Experience, Project Metrics, and Technical Skills.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **API & Integration**: 
  - Medium RSS for automated blog fetching
  - Resend for email communication
- **Deployment**: Vercel (Recommended)

## 📁 Project Structure

```
my-portfolio/
├── app/                  # Next.js App Router
│   ├── api/              # Backend endpoints (Medium, Contact)
│   ├── contact/          # Contact page with form
│   ├── articles/         # Dynamic Medium blog section
│   ├── projects/         # Featured works & metrics
│   ├── skills/           # Technical expertise grid
│   ├── work/             # Employment history & timeline
│   ├── globals.css       # Design system & Tailwind
│   └── layout.tsx        # Global SEO & Navigation
├── components/           # Shared UI components
├── public/               # Static assets (images, robots.txt)
└── next.config.js        # Optimized Next.js configuration
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- Yarn or npm

### Setup

1. **Clone & Install**
   ```bash
   git clone https://github.com/shahadot786/my-portfolio.git
   cd my-portfolio
   yarn install
   ```

2. **Environment Variables**
   Create a `.env` file in the root:
   ```env
   # Medium username (without @)
   NEXT_PUBLIC_MEDIUM_USERNAME=shrhossain786

   # Resend API Key for contact form
   RESEND_API_KEY=your_resend_api_key
   ```

3. **Run**
   ```bash
   yarn dev
   ```

## 📝 Configuration

### Updating Content
Most content is managed directly within the page components for simplicity and performance:
- **Work/Experience**: `app/work/page.tsx`
- **Projects**: `app/projects/page.tsx`
- **Skills**: `app/skills/page.tsx`
- **Home/Bio**: `app/page.tsx`

### SEO Optimization
Global metadata is located in `app/layout.tsx`. Each individual page has its own `export const metadata` object for fine-grained SEO control.

## 📜 License
This project is licensed under the Apache License 2.0.

---
**Built with ❤️ for the Developer Community**
