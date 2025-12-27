# MD. Shahadot Hossain - Portfolio

A modern, feature-rich developer portfolio built with **Next.js 14**, **React 18**, **TypeScript**, and **Tailwind CSS**. This portfolio showcases professional experience, projects, skills, and includes interactive features like AI-powered chat, GitHub integration, learning tracker, and problem-solving showcase.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://shahadot-hossain.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

## ✨ Features

### 🎯 Core Sections

- **Hero Section**: Eye-catching introduction with animated profile and call-to-action buttons
- **About**: Professional summary highlighting expertise and experience
- **Experience**: Timeline of professional work history with detailed role descriptions
- **Skills**: Comprehensive showcase of technical skills organized by category
- **Projects**: Featured projects with descriptions, technologies, and live/GitHub links
- **Education**: Academic background and certifications
- **Contact**: Interactive contact form with email integration via Resend API
- **Footer**: Social links and additional navigation

### 🤖 AI-Powered Chat Assistant

- **Google Gemini Integration**: Real-time AI chat powered by Gemini 2.0 Flash Lite
- **Context-Aware Responses**: Pre-loaded with portfolio context for accurate answers
- **Live GitHub Data**: Fetches and includes real-time GitHub statistics in responses
- **Suggested Questions**: Quick-start prompts for common inquiries
- **Professional Tone**: Tailored responses about skills, projects, and experience

### 📊 GitHub Integration

- **Real-time Stats**: Live GitHub profile data including repos, followers, and activity
- **Repository Showcase**: Display of recent and featured repositories
- **Language Distribution**: Visual breakdown of coding languages used
- **Contribution Metrics**: Stars, forks, and commit statistics
- **Smart Caching**: 24-hour cache to optimize API rate limits

### 📚 Learning Tracker

- **Daily Progress Tracking**: Log hours studied, topics covered, and LeetCode problems solved
- **GitHub Sync**: Automatically sync learning data to a GitHub repository
- **Statistics Dashboard**: Visual analytics of learning progress and streaks
- **Export/Import**: Backup and restore learning data in JSON format
- **README Generation**: Auto-generate formatted README for GitHub repository

### 🧩 Problem Solving Showcase

- **Multi-Platform Support**: Track problems from LeetCode, HackerRank, CodeForces, and more
- **Detailed Analytics**: Statistics by difficulty, category, and platform
- **Solution Insights**: Time/space complexity, approach, and key learnings
- **Filtering & Search**: Find problems by difficulty, platform, or category
- **Visual Statistics**: Charts showing problem-solving patterns and progress

### 🎨 Design & UX

- **Responsive Design**: Mobile-first approach, optimized for all screen sizes
- **Dark Theme**: Modern dark color scheme with blue accents
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Custom Fonts**: JetBrains Mono for code-like aesthetics
- **Accessibility**: Semantic HTML and ARIA labels for better accessibility
- **Back to Top**: Convenient scroll-to-top button for easy navigation

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.2
- **UI Library**: React 18.3
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 10.18
- **Icons**: Lucide React

### Backend & APIs
- **AI Chat**: Google Generative AI (Gemini 2.0 Flash Lite)
- **Email**: Resend API for contact form
- **GitHub**: Octokit REST API for GitHub integration
- **PDF Generation**: jsPDF + html2canvas for resume export

### Development Tools
- **Package Manager**: Yarn
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript strict mode
- **Build Tool**: Next.js built-in bundler

## 📦 Installation

### Prerequisites
- Node.js 18+ and Yarn/npm
- GitHub Personal Access Token (optional, for higher API rate limits)
- Google Gemini API Key (for AI chat functionality)
- Resend API Key (for contact form)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shahadot786/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env` or `.env.local` file in the root directory:
   ```env
   # GitHub Integration (Optional but recommended)
   NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
   GITHUB_ACCESS_TOKEN=your-github-personal-access-token
   
   # Google Gemini AI (Required for AI Chat)
   GEMINI_API_KEY=your-gemini-api-key
   
   # Resend Email API (Required for Contact Form)
   RESEND_API_KEY=your-resend-api-key
   RESEND_FROM_EMAIL=your-verified-email@domain.com
   RESEND_TO_EMAIL=your-email@domain.com
   ```

4. **Run Development Server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**
   ```bash
   yarn build
   yarn start
   ```

## 🔑 API Keys Setup

### GitHub Personal Access Token
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `public_repo` scope
3. Add to `.env` as `GITHUB_ACCESS_TOKEN`

**Rate Limits:**
- Without token: 60 requests/hour
- With token: 5,000 requests/hour

### Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `.env` as `GEMINI_API_KEY`

### Resend API Key
1. Sign up at [Resend](https://resend.com)
2. Verify your domain or use their test domain
3. Generate API key from dashboard
4. Add to `.env` as `RESEND_API_KEY`

## 📁 Project Structure

```
my-portfolio/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── chat/route.ts        # AI Chat endpoint (Gemini)
│   │   └── contact/route.ts     # Contact form endpoint (Resend)
│   ├── globals.css              # Global styles & Tailwind
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home page
│   ├── manifest.json            # PWA manifest
│   ├── sitemap.ts              # SEO sitemap
│   ├── privacy/                 # Privacy policy page
│   ├── terms/                   # Terms of service page
│   ├── roadmap/                 # Roadmap page
│   └── tracker/                 # Learning tracker page
│
├── components/                   # React Components
│   ├── sections/                # Main page sections
│   │   ├── Navigation.tsx       # Top navigation bar
│   │   ├── Hero.tsx            # Hero section with intro
│   │   ├── About.tsx           # About section
│   │   ├── Experience.tsx      # Work experience timeline
│   │   ├── Skills.tsx          # Skills showcase
│   │   ├── Projects.tsx        # Projects portfolio
│   │   ├── GitHubSection.tsx   # GitHub stats wrapper
│   │   ├── Education.tsx       # Education & certifications
│   │   ├── Contact.tsx         # Contact form
│   │   ├── Footer.tsx          # Footer with links
│   │   └── AIChat.tsx          # AI chatbot interface
│   │
│   ├── providers/               # Context providers
│   │   └── theme-provider.tsx  # Theme context
│   │
│   ├── icons/                   # Custom icon components
│   │   └── LeetCodeIcon.tsx    # LeetCode logo
│   │
│   ├── github-stats.tsx        # GitHub integration component
│   ├── LearningTracker.tsx     # Learning tracker feature
│   ├── problem-solving-section.tsx  # Problem solving showcase
│   ├── playground-section.tsx  # Code playground (if used)
│   ├── theme-selector.tsx      # Theme switcher
│   └── BackToTop.tsx           # Scroll to top button
│
├── lib/                         # Utility functions
├── types/                       # TypeScript type definitions
├── public/                      # Static assets
│   ├── favicon.ico
│   └── og-image.png
│
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🎨 Customization

### Update Personal Information

Edit the content in respective component files:

**Hero Section** (`components/sections/Hero.tsx`):
- Name, title, tagline
- Profile image
- Social media links
- Resume download link

**About Section** (`components/sections/About.tsx`):
- Professional summary
- Years of experience
- Key highlights

**Experience** (`components/sections/Experience.tsx`):
- Work history
- Company details
- Role descriptions

**Projects** (`components/sections/Projects.tsx`):
- Project details
- Technologies used
- Live demo and GitHub links
- Project images

**Skills** (`components/sections/Skills.tsx`):
- Technical skills by category
- Proficiency levels

**Education** (`components/sections/Education.tsx`):
- Degrees and certifications
- Institutions
- Dates

### Customize AI Chat Context

Edit `components/sections/AIChat.tsx` to update the `PORTFOLIO_CONTEXT` constant with your information:

```typescript
const PORTFOLIO_CONTEXT = `
You are an AI assistant for [Your Name]'s portfolio. Here's information about them:

**Professional Summary:**
- Your professional summary here...

**Key Projects:**
1. Project 1 - Description
2. Project 2 - Description
...
`;
```

### Update Theme Colors

Modify `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: {
    500: '#your-primary-color',
    // ... other shades
  },
  // ... other color definitions
}
```

### SEO & Metadata

Update `app/layout.tsx` for SEO optimization:

```typescript
export const metadata = {
  title: "Your Name - Your Title",
  description: "Your description",
  keywords: "your, keywords, here",
  // ... other metadata
};
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shahadot786/my-portfolio)

### Netlify

1. Build the project: `yarn build`
2. Deploy the `.next` folder to Netlify
3. Configure environment variables

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
```

Build and run:
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 📊 Features in Detail

### AI Chat Assistant
- Powered by Google Gemini 2.0 Flash Lite
- Real-time GitHub data integration
- Context-aware responses about your portfolio
- Suggested questions for visitors
- Professional and helpful tone

### GitHub Stats
- Live repository statistics
- Recent activity tracking
- Language distribution charts
- Contribution metrics
- Smart caching (24-hour refresh)

### Learning Tracker
- Daily learning logs
- GitHub repository sync
- Progress analytics
- Export/import functionality
- Automatic README generation

### Problem Solving Showcase
- Multi-platform problem tracking
- Detailed solution insights
- Complexity analysis
- Filtering and search
- Visual statistics

### Contact Form
- Email validation
- Spam protection
- Success/error notifications
- Resend API integration
- Professional email templates

## 🔒 Security & Privacy

- **Environment Variables**: Sensitive keys stored securely
- **API Rate Limiting**: Implemented caching to prevent abuse
- **CORS Configuration**: Proper headers for API security
- **Input Validation**: Form inputs sanitized and validated
- **No Data Storage**: Contact form doesn't store user data
- **Privacy Policy**: Included privacy and terms pages

## 📝 Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn type-check   # TypeScript type checking
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**MD. Shahadot Hossain**
- Portfolio: [shahadot-hossain.vercel.app](https://shahadot-hossain.vercel.app)
- GitHub: [@shahadot786](https://github.com/shahadot786)
- LinkedIn: [MD. Shahadot Hossain](https://linkedin.com/in/shahadot-hossain)
- Email: shahadot.cse.bu@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Google Gemini](https://ai.google.dev/) - AI chat integration
- [Resend](https://resend.com/) - Email API
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

## 📈 Performance

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **SEO Optimized**: Semantic HTML, meta tags, sitemap
- **Mobile Responsive**: Optimized for all devices

## 🐛 Known Issues

- GitHub API rate limits may affect stats display without authentication token
- AI chat requires valid Gemini API key to function
- Contact form requires Resend API configuration

## 🔮 Future Enhancements

- [ ] Blog section with MDX support
- [ ] Dark/Light theme toggle
- [ ] Internationalization (i18n)
- [ ] Analytics dashboard
- [ ] More AI chat capabilities
- [ ] Resume builder feature

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**

*Last updated: December 2025*
