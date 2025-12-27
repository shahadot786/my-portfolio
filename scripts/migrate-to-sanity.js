/**
 * Data Migration Script for Sanity CMS
 * 
 * This script extracts current static data from components and prepares it
 * for import into Sanity. Run this after setting up your Sanity project.
 * 
 * Usage: node scripts/migrate-to-sanity.js
 */

const fs = require('fs');
const path = require('path');

// Hero Section Data
const heroData = {
  _type: 'hero',
  name: 'MD. Shahadot Hossain',
  title: 'Software Engineer',
  subtitle: 'React & React Native Specialist',
  description: 'Proficient software engineer with 4 years of experience building cross-platform mobile applications for enterprise clients. Specialized in offline-first architecture, real-time tracking, and cutting-edge mobile technologies.',
  location: 'Dhaka, Bangladesh',
  phone: '+880-1775-020-582',
  email: 'shahadotrahat786@gmail.com',
  stats: [
    { label: 'Years Experience', value: '4+' },
    { label: 'Active Users', value: '10K+' },
    { label: 'Daily Transactions', value: '100K+' },
    { label: 'Projects Delivered', value: '20+' },
  ],
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/shahadot786', icon: 'Github' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/shahadot786', icon: 'Linkedin' },
    { platform: 'LeetCode', url: 'https://leetcode.com/u/shahadot_786/', icon: 'LeetCodeIcon' },
    { platform: 'Email', url: 'mailto:shahadotrahat786@gmail.com', icon: 'Mail' },
  ],
  resumeUrl: '/MD_Shahadot_Hosssain.pdf',
};

// About Section Data
const aboutData = {
  _type: 'about',
  summary: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Proficient software engineer with 4 years of experience building and maintaining cross-platform mobile applications for enterprise clients, including Unilever, BAT, Nestlé, and Nagad.',
        },
      ],
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Specialized in automation-based operations, delivering applications serving 10,000+ users with 100,000+ daily transactions. Expert in offline-first architecture, real-time location tracking, face detection, and liveness verification.',
        },
      ],
    },
  ],
  highlights: [
    {
      title: 'Offline-First Architecture',
      description: 'Expert in building mobile apps that work seamlessly without internet connectivity with intelligent data synchronization.',
      icon: 'Target',
      color: 'blue',
    },
    {
      title: 'Real-Time Tracking',
      description: 'Specialized in implementing GPS monitoring, location tracking, and real-time data synchronization for field operations.',
      icon: 'Zap',
      color: 'emerald',
    },
    {
      title: 'Advanced Security',
      description: 'Proficient in face detection, liveness verification, display capture prevention, and secure authentication systems.',
      icon: 'Shield',
      color: 'cyan',
    },
    {
      title: 'Cross-Platform Excellence',
      description: 'Building high-performance React Native apps serving 10,000+ users with 100,000+ daily transactions.',
      icon: 'Globe',
      color: 'green',
    },
  ],
  specializations: [
    'Offline-first Architecture',
    'Real-time Location Tracking',
    'Face Detection & Liveness Verification',
    'Object Detection & OCR',
    'Microservices Architecture',
    'Clean Architecture & Design Patterns',
  ],
  softSkills: [
    'Agile Methodologies',
    'Cross-functional Collaboration',
    'Problem-solving',
    'Technical Leadership',
  ],
  languages: [
    { language: 'English', proficiency: 'Professional' },
    { language: 'Bengali', proficiency: 'Native' },
  ],
};

// Export data
const migrationData = {
  hero: heroData,
  about: aboutData,
  // Add more sections as needed
};

// Save to JSON file
const outputPath = path.join(__dirname, 'sanity-migration-data.json');
fs.writeFileSync(outputPath, JSON.stringify(migrationData, null, 2));

console.log('✅ Migration data exported to:', outputPath);
console.log('📝 Next steps:');
console.log('1. Review the exported data');
console.log('2. Import to Sanity using: npx sanity dataset import sanity-migration-data.json production');
