# MD Shahadot Hossain - Developer Portfolio

A modern, interactive developer portfolio built with Next.js, React, TypeScript, and Tailwind CSS. Features a VS Code-inspired interface with real-time GitHub integration, interactive code playground, AI chatbot, and dynamic theme system.

## ✨ Features

### Core Features

- **VS Code Interface**: Authentic code editor experience with file tabs and syntax highlighting
- **Real-time GitHub Stats**: Live integration with GitHub API showing repositories, contributions, and activity
- **Interactive Code Playground**: Safe sandbox environment for JavaScript and React experimentation
- **AI Chat Assistant**: Intelligent chatbot for project Q&A and portfolio navigation
- **Dynamic Theme System**: 10 beautiful color themes with persistent preferences
- **Achievement System**: Gamified user engagement with unlockable achievements
- **Responsive Design**: Mobile-first approach optimized for all screen sizes
- **Performance Optimized**: Fast loading with code splitting and optimized assets

### Technical Highlights

- **Next.js 14**: Latest App Router with server components and optimizations
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with custom design system
- **Framer Motion**: Smooth animations and micro-interactions
- **Real GitHub API**: Live data fetching with error handling and caching
- **Progressive Enhancement**: Works without JavaScript for core content

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- GitHub Personal Access Token (optional, for higher API rate limits)

### Installation

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd developer-portfolio
   npm install
   ```

2. **Environment Setup (Optional)**
   Create `.env.local` for GitHub API integration:

   ```env
   NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
   GITHUB_ACCESS_TOKEN=your-github-token
   ```

3. **Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and theme variables
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx          # Main portfolio page
│   ├── sitemap.ts        # SEO sitemap generation
│   └── manifest.json     # PWA manifest
├── components/            # React components
│   ├── providers/        # Context providers (theme, etc.)
│   ├── hero-section.tsx  # Main VS Code interface
│   ├── github-stats.tsx  # Real-time GitHub integration
│   ├── ai-chat.tsx       # AI assistant chatbot
│   ├── theme-selector.tsx # Dynamic theme switching
│   ├── achievement-system.tsx # Gamification system
│   └── playground-section.tsx # Code execution environment
├── public/               # Static assets
├── types/               # TypeScript type definitions
└── lib/                # Utility functions and API clients
```

## 🎨 Customization Guide

### 1. Personal Information

**Update Portfolio Content** (`components/hero-section.tsx`):

```typescript
const fullText = `const developer = {
  name: 'Your Name',
  title: 'Your Title',
  specialization: 'Your Specialization',
  // Update all personal information
};`;
```

**Timeline Data**:

```typescript
const timelineData: TimelineItem[] = [
  {
    date: "2023 - Present",
    title: "Your Current Role",
    company: "Your Company",
    // Add your career history
  },
];
```

**Projects**:

```typescript
const projects: Project[] = [
  {
    title: "Your Project",
    description: "Project description",
    technologies: ["Tech1", "Tech2"],
    // Add your real projects
  },
];
```

### 2. GitHub Integration

**Set Your Username** (`.env.local`):

```env
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
GITHUB_ACCESS_TOKEN=your-personal-access-token
```

The GitHub stats will automatically fetch:

- Repository information
- Contribution statistics
- Language usage
- Recent activity
- Follower/following counts

**GitHub Token Setup**:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token with `public_repo` scope
3. Add to `.env.local` file

### 3. AI Chatbot Customization

**Update Responses** (`components/ai-chat.tsx`):

```typescript
const sampleResponses = {
  "your-project": "Description of your project...",
  skills: "Your skills and expertise...",
  // Customize all responses
};
```

**Connect to Real AI Service**:

```bash
npm install openai
```

```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

### 4. Theme Customization

**Add Custom Colors** (`components/providers/theme-provider.tsx`):

```typescript
const themeColors = {
  yourColor: {
    primary: "rgb(your-color)",
    primaryHover: "rgb(your-hover-color)",
    accent: "rgb(your-accent-color)",
  },
};
```

**Update Tailwind Config** (`tailwind.config.js`):

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-brand-color',
      }
    }
  }
}
```

## 🔧 Advanced Configuration

### Environment Variables

```env
# GitHub Integration
NEXT_PUBLIC_GITHUB_USERNAME=your-username
GITHUB_ACCESS_TOKEN=your-token

# AI Chat (Optional)
OPENAI_API_KEY=your-openai-key

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Contact Form (Optional)
CONTACT_API_ENDPOINT=your-contact-endpoint
```

### GitHub API Rate Limits

- **Without token**: 60 requests/hour
- **With token**: 5,000 requests/hour
- **Caching**: Responses cached for 5 minutes

### Performance Optimization

- **Images**: Optimized with Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: GitHub API responses cached
- **Bundle Analysis**: Use `@next/bundle-analyzer`

### SEO Configuration

- **Metadata**: Update in `app/layout.tsx`
- **Sitemap**: Automatically generated in `app/sitemap.ts`
- **Structured Data**: JSON-LD for better search visibility
- **Open Graph**: Social media preview optimization

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Netlify

```bash
npm run build
# Upload build output to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual Deployment

```bash
npm run build
# Upload .next/static and other build files
```

## 📊 GitHub Stats Features

### Real-time Data

- **Repository Stats**: Stars, forks, languages
- **Contribution Activity**: Commits, PRs, issues
- **Profile Information**: Bio, followers, location
- **Recent Repositories**: Latest projects with descriptions
- **Language Distribution**: Visual breakdown of coding languages

### API Integration

- Automatic data fetching every 5 minutes
- Graceful error handling with fallback data
- Rate limit management
- Responsive loading states

## 🎮 Achievement System

### Available Achievements

- **Welcome Visitor**: First portfolio visit
- **Code Explorer**: View multiple code files
- **Project Enthusiast**: Explore all projects
- **AI Conversationalist**: Chat with AI assistant
- **Playground Master**: Run code in playground
- **Coffee Lover**: Spend 5+ minutes on site

### Customization

Add new achievements in `components/achievement-system.tsx`:

```typescript
{
  id: 'custom-achievement',
  title: 'Custom Title',
  description: 'Achievement description',
  icon: YourIcon,
  rarity: 'rare'
}
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] All file tabs work correctly
- [ ] GitHub stats load properly
- [ ] Code playground executes JavaScript/React
- [ ] AI chat responds appropriately
- [ ] Theme switching works
- [ ] Responsive design on mobile/tablet
- [ ] Achievement notifications appear
- [ ] Contact form validation

### Performance Testing

- [ ] Lighthouse score 90+ in all categories
- [ ] Fast loading on slow connections
- [ ] Smooth animations on low-end devices
- [ ] GitHub API error handling

## 🔒 Security & Privacy

### Data Handling

- GitHub data cached locally for 5 minutes
- No personal data stored permanently
- Contact form data processed securely
- Achievement progress stored in localStorage

### API Security

- GitHub token stored securely in environment variables
- Rate limiting implemented
- Error handling prevents data leaks
- CORS properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Submit a pull request

## 📄 License

MIT License - feel free to use this portfolio template for your own projects!

## 🆘 Support & FAQ

### Common Issues

**Q: GitHub stats not loading?**
A: Check your username in `.env.local` and ensure it's correct. Without a token, you're limited to 60 requests/hour.

**Q: Code playground not working?**
A: Ensure JavaScript is enabled. The playground runs in a secure iframe sandbox.

**Q: Themes not persisting?**
A: Check if localStorage is available in your browser and not blocked.

**Q: Mobile layout issues?**
A: The design is mobile-first. Report specific issues with device/browser details.

### Getting Help

1. Check the [GitHub Issues](https://github.com/shahadot786/my-portfolio/issues)
2. Review this documentation
3. Create a new issue with detailed information

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**

_Last updated: September 2025_
