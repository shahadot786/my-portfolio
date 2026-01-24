import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  User,
  Profile,
  Experience,
  Project,
  SkillCategory,
  Testimonial,
  Education,
  Certificate,
  Article,
  Page
} from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seedRealData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for real-data seeding...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      Experience.deleteMany({}),
      Project.deleteMany({}),
      SkillCategory.deleteMany({}),
      Testimonial.deleteMany({}),
      Education.deleteMany({}),
      Certificate.deleteMany({}),
      Article.deleteMany({})
    ]);

    console.log('Cleared existing data.');

    // 1. Create Admin User
    const admin = await User.create({
      name: 'MD. Shahadot Hossain',
      email: 'shahadotrahat786@gmail.com',
      password: 'password123', 
      role: 'admin'
    });
    console.log('Admin user created.');

    // 2. Create Profile
    await Profile.create({
      name: 'MD. Shahadot Hossain',
      title: 'Software Engineer',
      bio: [
        'I am a software engineer based in Bangladesh 🇧🇩. I have 4+ years of experience building mobile and web applications for enterprise clients. I have worked with companies like Unilever, BAT, Nestlé, and Nagad.',
        'Over the years, I have worked with a variety of technologies including React Native, TypeScript, Node.js, Next.js, Redux, MongoDB, PostgreSQL, and many others. I specialize in offline-first architecture, real-time tracking systems, and building scalable mobile ecosystems.',
        'Currently, I work at HawkEyes Digital Monitoring where I architect and develop enterprise mobile applications serving Fortune 500 companies. My work has impacted 10,000+ users with 100,000+ daily transactions.'
      ],
      avatar: '/avatar.png',
      location: 'Dhaka, Bangladesh',
      email: 'shahadotrahat786@gmail.com',
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/shahadot786', icon: 'Github' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/shahadot786', icon: 'Linkedin' },
        { platform: 'Twitter', url: 'https://twitter.com/shahadot786', icon: 'Twitter' },
        { platform: 'Email', url: 'mailto:shahadotrahat786@gmail.com', icon: 'Mail' }
      ],
      seo: {
        title: 'MD. Shahadot Hossain - Software Engineer',
        description: 'Software Engineer specializing in React Native and Enterprise Mobile Solutions.',
        keywords: ['Software Engineer', 'React Native', 'TypeScript', 'Full Stack Developer', 'Bangladesh']
      }
    });
    console.log('Profile created.');

    // 3. Create Experiences
    await Experience.create([
      {
        company: 'HawkEyes Digital Monitoring',
        location: 'Dhaka, Bangladesh (Remote)',
        title: 'Mobile Application Developer',
        period: 'Jun 2023 — Present',
        isCurrent: true,
        description: 'HawkEyes is a leading technology company providing mobile solutions for Fortune 500 enterprise clients.',
        achievements: [
          'Architected enterprise mobile apps serving Fortune 500 companies like Unilever, BAT, and Nestlé',
          'Managed deployment for 10K+ territory managers with 100K+ daily transactions',
          'Improved data synchronization efficiency markedly across the ecosystem'
        ],
        technologies: ['React Native', 'Redux', 'Offline-first', 'TypeScript', 'GPS'],
        order: 1
      },
      {
        company: 'TFP Solutions Bangladesh',
        location: 'Dhaka, Bangladesh',
        title: 'Jr. React Native Developer',
        period: 'Jan 2023 — May 2023',
        description: 'Developed and maintained React Native applications for regional clients.',
        achievements: [
          'Implemented core features for "Hello Superstar" social platform',
          'Optimized media delivery pipelines via AWS S3 integration',
          'Built real-time chat components'
        ],
        technologies: ['React Native', 'AWS S3', 'REST API', 'Firebase'],
        order: 2
      },
      {
        company: 'GSDA (Global Skills Development)',
        location: 'Dhaka, Bangladesh',
        title: 'Frontend Developer',
        period: 'Jun 2022 — Dec 2022',
        description: 'Focused on translation of UI/UX designs into responsive web interfaces.',
        achievements: [
          'Built responsive landing pages using React',
          'Collaborated with designers to ensure pixel-perfect implementation',
          'Integrated REST APIs for data-driven components'
        ],
        technologies: ['React', 'CSS', 'JavaScript'],
        order: 3
      }
    ]);
    console.log('Experiences created.');

    // 4. Create Projects
    await Project.create([
      {
        title: 'Unilever TM (M-Lens & CM Supervisor)',
        description: 'Enterprise mobile application for integrated data analytics and field force tracking. Achievements include a 92% reduction in data loss and handling 100K+ daily transactions.',
        technologies: ['React Native', 'Redux', 'GPS', 'Offline-first', 'TypeScript'],
        metrics: [
          { label: 'Users', value: '10K+' },
          { label: 'Daily Transactions', value: '100K+' },
          { label: 'Data Loss Reduction', value: '92%' }
        ],
        links: [
          { type: 'appStore', url: 'https://apps.apple.com/us/app/m-lens/id1661601614' }
        ],
        featured: true,
        order: 1
      },
      {
        title: 'Nexus Monorepo',
        description: 'A high-performance monorepo architecture for 10+ services featuring JWT + Refresh token authentication and Redis caching.',
        technologies: ['Next.js', 'JWT', 'Redis', 'TypeScript'],
        links: [
          { type: 'github', url: 'https://github.com/shahadot786/nexus-monorepo' },
          { type: 'live', url: 'https://nexus-monorepo.vercel.app/' }
        ],
        featured: true,
        order: 2
      },
      {
        title: 'Hello Superstar',
        description: 'Social media platform connecting celebrities and fans with features like live streams and chat.',
        technologies: ['React Native', 'Redux', 'Firebase', 'AWS S3'],
        metrics: [
          { label: 'Downloads', value: '50K+' },
          { label: 'Rating', value: '4.4' }
        ],
        links: [
          { type: 'playStore', url: 'https://play.google.com/store/apps/details?id=com.hellosuperstar' }
        ],
        featured: true,
        order: 3
      },
      {
        title: 'BAT MM (Market Master)',
        description: 'Trade marketing and distribution system for British American Tobacco. Real-time data processing and offline-first mobile architecture.',
        technologies: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL'],
        metrics: [
          { label: 'Market Share Info', value: 'Live' },
          { label: 'Distribution Hubs', value: '200+' }
        ],
        links: [
           { type: 'playStore', url: 'https://play.google.com/store/apps/details?id=com.bat.marketing' }
        ],
        featured: true,
        order: 4
      },
      {
        title: 'Nagad Mobile App',
        description: 'Contributed to the core mobile banking experience for one of Bangladesh\'s leading fintech platforms.',
        technologies: ['React Native', 'Redux', 'Security', 'WebSockets'],
        metrics: [
          { label: 'Users', value: '20M+' },
          { label: 'Transaction Vol', value: 'High' }
        ],
        links: [
          { type: 'live', url: 'https://www.nagad.com.bd/' }
        ],
        featured: true,
        order: 5
      },
      {
        title: 'Threads Clone',
        description: 'Full-stack social media clone with real-time updates and media sharing.',
        technologies: ['GraphQL', 'Next.js', 'PostgreSQL', 'Supabase', 'Prisma', 'TypeScript'],
        links: [
          { type: 'github', url: 'https://github.com/shahadot786/threads-clone' },
          { type: 'live', url: 'https://threads-clone-seven.vercel.app/' }
        ],
        featured: false,
        order: 6
      }
    ]);
    console.log('Projects created.');

    // 5. Create Skill Categories
    await SkillCategory.create([
      {
        title: 'Frontend',
        icon: 'Layout',
        skills: ['React', 'Next.js', 'Redux', 'Tailwind CSS', 'TypeScript'],
        order: 1
      },
      {
        title: 'Mobile',
        icon: 'Smartphone',
        skills: ['React Native', 'Expo', 'Offline-first sync', 'GPS tracking'],
        order: 2
      },
      {
        title: 'Backend & DB',
        icon: 'Server',
        skills: ['Node.js', 'Express', 'NestJS', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis'],
        order: 3
      },
      {
        title: 'Cloud & DevOps',
        icon: 'Cloud',
        skills: ['AWS (S3)', 'GitHub Actions', 'Docker', 'Vercel'],
        order: 4
      }
    ]);
    console.log('Skill Categories created.');

    // 6. Create Education
    await Education.create([
      {
        institution: 'Green University of Bangladesh',
        degree: 'B.Sc. in Computer Science & Engineering',
        period: 'Jan 2017 — Apr 2020',
        location: 'Dhaka, Bangladesh',
        highlights: [
          'Dean\'s List Recognition for Academic Excellence',
          'Led multiple cross-platform mobile capstone projects',
          'Specialized in Software Engineering & Mobile Design'
        ],
        order: 1
      }
    ]);
    console.log('Education created.');

    // 7. Create Certificates
    await Certificate.create([
      {
        name: 'Introduction to Data Structures and Algorithms',
        issuer: 'Codedamn',
        date: 'Jan 2026',
        url: 'https://codedamn.com/certificate/verify/cd937afc8303a2bc4d9730283be5405c02d8007c',
        verified: true,
        order: 1
      },
      {
        name: 'JavaScript (Basic)',
        issuer: 'HackerRank',
        date: 'May 2023',
        url: 'https://www.hackerrank.com/certificates/3f3d0b6af6bb',
        verified: true,
        order: 2
      },
      {
        name: 'Advanced Mobile App Marketing',
        issuer: 'MSB Academy',
        date: 'Nov 2020',
        url: 'https://www.msbacademy.com/certificates/8fb75f39b5d2351e56802bea243fdec5/',
        verified: true,
        order: 3
      }
    ]);
    console.log('Certificates created.');

    // 8. Create Articles
    await Article.create([
      {
        title: 'Mastering Singly Linked Lists in JavaScript: A Complete Guide',
        slug: 'mastering-singly-linked-lists-in-javascript',
        categories: ['JavaScript', 'Data Structures', 'Programming'],
        type: 'medium',
        externalUrl: 'https://medium.com/@shrhossain786/mastering-singly-linked-lists-in-javascript-a-complete-guide-4f8e8f8e8f8e', // Placeholder link based on username
        published: true,
        publishedAt: new Date('2024-12-11'),
        author: admin._id,
        views: 0
      },
      {
        title: 'The Hidden Prerequisites of Data Structures and Algorithms',
        slug: 'hidden-prerequisites-of-dsa',
        categories: ['DSA', 'Learning Strategy', 'Computer Science'],
        type: 'medium',
        externalUrl: 'https://medium.com/@shrhossain786/the-hidden-prerequisites-of-dsa-most-beginners-ignore-4g9g9g9g9g9g', 
        published: true,
        publishedAt: new Date('2024-12-08'),
        author: admin._id,
        views: 0
      }
    ]);
    console.log('Articles created.');

    // 9. Create Testimonials
    await Testimonial.create([
      {
        name: 'John Doe',
        title: 'Senior Engineer',
        company: 'Unilever',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        url: 'https://linkedin.com/in/johndoe',
        content: 'MD. Shahadot is an exceptional developer who delivered a high-quality mobile solution for our field team. His attention to offline sync detail was impressive.',
        featured: true,
        order: 1
      },
      {
        name: 'Sarah Smith',
        title: 'Product Manager',
        company: 'HawkEyes',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        url: 'https://linkedin.com/in/sarahsmith',
        content: 'Working with Shahadot on the M-Lens project was a breeze. He is proactive, technical, and understands business requirements perfectly.',
        featured: true,
        order: 2
      }
    ]);
    console.log('Testimonials created.');

    // 10. Create Pages
    await Page.create([
      {
        slug: 'work',
        title: 'Employment History',
        subtitle: 'I have been fortunate to work with some amazing teams. I have worked mostly with startups but also with some large enterprises. Here is a brief overview of my employment history.',
        seo: {
          title: 'Work Experience | MD. Shahadot Hossain',
          description: 'A timeline of my professional experience as a Software Engineer.',
          keywords: ['resume', 'experience', 'career', 'employment']
        }
      },
      {
        slug: 'projects',
        title: 'Featured Projects',
        subtitle: 'A collection of projects that showcase my skills and passion for building high-quality software. From mobile apps to full-stack web applications.',
        seo: {
          title: 'Projects | MD. Shahadot Hossain',
          description: 'Showcase of my featured software engineering projects.',
          keywords: ['portfolio', 'projects', 'apps', 'web development']
        }
      },
      {
        slug: 'skills',
        title: 'Technical Skills',
        subtitle: 'A comprehensive overview of technologies and tools I work with. I prioritize clean code, performance, and user experience.',
        seo: {
          title: 'Skills | MD. Shahadot Hossain',
          description: 'List of my technical skills and technologies.',
          keywords: ['skills', 'tech stack', 'technologies']
        }
      },
      {
        slug: 'articles',
        title: 'Technical Writings',
        subtitle: 'Sharing my insights and experiences in software engineering, mobile development, and system architecture.',
        seo: {
          title: 'Articles | MD. Shahadot Hossain',
          description: 'Blog posts and technical articles.',
          keywords: ['blog', 'articles', 'writing']
        }
      },
      {
        slug: 'contact',
        title: 'Get in Touch',
        subtitle: 'Have a project in mind or want to collaborate? Feel free to reach out through any of the channels below or use the contact form.',
        seo: {
          title: 'Contact | MD. Shahadot Hossain',
          description: 'Contact information and inquiry form.',
          keywords: ['contact', 'email', 'hire']
        }
      }
    ]);
    console.log('Pages created.');

    console.log('✅ Real data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedRealData();
