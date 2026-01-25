import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { User, Profile, Experience, Project, SkillCategory, Testimonial, Education, Certificate, Article } from '../models/index.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
const seedData = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');
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
            password: 'password123', // User should change this
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
                'I am a Full-stack developer at heart with expertise in all parts of the stack including the frontend, backend, databases, and cloud. Taking rough problem statements and turning them into polished products is my specialty.',
                'Currently, I work at HawkEyes Digital Monitoring where I architect and develop enterprise mobile applications serving Fortune 500 companies. My work has impacted 10,000+ users with 100,000+ daily transactions.'
            ],
            avatar: '/avatar.png',
            location: 'Dhaka, Bangladesh',
            email: 'shahadotrahat786@gmail.com',
            socialLinks: [
                { platform: 'GitHub', url: 'https://github.com/shahadot786', icon: 'Github' },
                { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/shahadot786', icon: 'Linkedin' },
                { platform: 'Twitter', url: 'https://twitter.com/shahadot786', icon: 'Twitter' },
                { platform: 'YouTube', url: 'https://youtube.com/@shahadot786', icon: 'Youtube' },
                { platform: 'Email', url: 'mailto:shahadotrahat786@gmail.com', icon: 'Mail' }
            ],
            seo: {
                title: 'MD. Shahadot Hossain - Software Engineer',
                description: 'Software Engineer specializing in React Native and Enterprise Mobile Solutions with 4+ years of experience.',
                keywords: ['Software Engineer', 'React Native', 'TypeScript', 'Full Stack Developer', 'Bangladesh']
            }
        });
        console.log('Profile created.');
        // 3. Create Experiences
        await Experience.create([
            {
                company: 'HawkEyes Digital Monitoring',
                location: 'Dhaka, Bangladesh',
                title: 'Software Engineer',
                period: 'Jun 2023 — Present',
                isCurrent: true,
                description: 'HawkEyes is a leading technology company providing mobile solutions for Fortune 500 enterprise clients including Unilever, BAT, and Nestlé.',
                achievements: [
                    'Leading deployment for 10K+ territory managers with 100K+ daily transactions',
                    'Architected offline-first sync engine reducing data loss incidents by 92%',
                    'Implemented liveness detection & biometric verification for secure field login',
                    'Built real-time GPS tracking and asset management systems'
                ],
                technologies: ['TypeScript', 'React Native', 'Redux', 'Offline-first', 'GPS'],
                order: 1
            },
            {
                company: 'TFP Solutions Bangladesh',
                location: 'Dhaka, Bangladesh',
                title: 'Jr. React Native Developer',
                period: 'Jan 2023 — May 2023',
                description: 'Developed "Hello Superstar", a high-traffic application connecting celebrities with global fanbases.',
                achievements: [
                    'Implemented user authentication and live session management',
                    'Optimized media delivery pipelines via AWS S3 integration',
                    'Built real-time chat and notification systems using WebSockets'
                ],
                technologies: ['React Native', 'AWS S3', 'WebSockets', 'Firebase'],
                order: 2
            }
        ]);
        console.log('Experiences created.');
        // 4. Create Projects
        await Project.create([
            {
                title: 'Threads Clone',
                description: 'A full-featured social threads application built with GraphQL, Next.js, and PostgreSQL.',
                metrics: [
                    { label: 'Stack', value: 'GraphQL + Next.js' },
                    { label: 'Database', value: 'PostgreSQL' }
                ],
                technologies: ['GraphQL', 'Next.js', 'PostgreSQL', 'Prisma', 'Supabase'],
                links: [
                    { type: 'github', url: 'https://github.com/shahadot786/threads-clone' },
                    { type: 'live', url: 'https://threads-clone-three-nu.vercel.app/' }
                ],
                featured: true,
                order: 1
            },
            {
                title: 'Nexus Monorepo',
                description: 'A production-ready, type-safe fullstack monorepo template featuring Backend, Web, and Mobile.',
                technologies: ['Next.js', 'Node.js', 'Express.js', 'React Native', 'MongoDB', 'Redis'],
                links: [
                    { type: 'github', url: 'https://github.com/shahadot786/fullstack-master-repo' },
                    { type: 'live', url: 'https://nexus-web-portal-demo.vercel.app/' }
                ],
                featured: true,
                order: 2
            }
        ]);
        console.log('Projects created.');
        // 5. Create Skill Categories
        await SkillCategory.create([
            {
                title: 'Core Languages',
                icon: 'Code2',
                skills: ['JavaScript', 'TypeScript', 'SQL', 'Java'],
                order: 1
            },
            {
                title: 'Frontend & Mobile',
                icon: 'Smartphone',
                skills: ['React Native', 'Expo', 'Next.js', 'React.js'],
                order: 2
            },
            {
                title: 'Backend & APIs',
                icon: 'Server',
                skills: ['Node.js', 'Express.js', 'GraphQL', 'Apollo Server', 'Prisma'],
                order: 3
            }
        ]);
        console.log('Skill Categories created.');
        // 6. Create Testimonials
        await Testimonial.create([
            {
                name: 'Saif Uddin',
                title: 'Project Manager at Unilever',
                content: 'Shahadot delivered exceptional mobile solutions for our field operations. His offline-first architecture reduced data loss by 92% and improved our territory management efficiency significantly.',
                featured: true,
                order: 1
            }
        ]);
        console.log('Testimonials created.');
        // 7. Education
        await Education.create({
            degree: 'B.Sc. in Computer Science & Engineering',
            institution: 'Green University of Bangladesh',
            location: 'Dhaka, Bangladesh',
            period: 'Jan 2017 — Apr 2020',
            highlights: [
                "Dean's List Recognition for Academic Excellence",
                'Led multiple cross-platform mobile capstone projects'
            ],
            order: 1
        });
        console.log('Education created.');
        // 8. Certificates
        await Certificate.create({
            name: 'Introduction to Data Structures and Algorithms',
            issuer: 'Codedamn',
            date: 'Jan 2026',
            image: '/certificates/dsa-codedamn.png',
            url: 'https://codedamn.com/certificate/verify/cd937afc8303a2bc4d9730283be5405c02d8007c',
            verified: true,
            order: 1
        });
        console.log('Certificates created.');
        // 9. Articles
        await Article.create([
            {
                title: 'Mastering React Native Performance',
                slug: 'mastering-react-native-performance',
                content: '<p>React Native is a powerful framework, but performance can be tricky. In this article, we explore optimization techniques like memoization, efficient list rendering, and bridge minimization.</p>',
                excerpt: 'Learn how to optimize your React Native applications for better performance.',
                categories: ['React Native', 'Mobile'],
                published: true,
                publishedAt: new Date(),
                author: admin._id,
                views: 120
            },
            {
                title: 'Building Scalable Node.js Backends',
                slug: 'building-scalable-nodejs-backends',
                content: '<p>Scalability is key for enterprise applications. Discover best practices for structuring your Node.js projects, using Redis for caching, and implementing robust error handling.</p>',
                excerpt: 'Best practices for building large-scale Node.js applications.',
                categories: ['Node.js', 'Backend'],
                published: true,
                publishedAt: new Date(),
                author: admin._id,
                views: 85
            }
        ]);
        console.log('Articles created.');
        console.log('✅ Seeding completed successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};
seedData();
//# sourceMappingURL=seed.js.map