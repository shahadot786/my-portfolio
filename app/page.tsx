import { API_BASE_URL } from "@/config/api";
import { HomeClient } from "@/components/sections/HomeClient";

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface Profile {
  name: string;
  title: string;
  avatar?: string;
  resumeUrl?: string;
  availabilityBadge?: string;
  isAvailable?: boolean;
  bio: string[];
  socialLinks: SocialLink[];
}

interface Metric {
  label: string;
  value: string;
}

interface ExpertiseItem {
  _id: string;
  title: string;
  badge: string;
  description: string;
  isFeatured: boolean;
  metrics?: Metric[];
  tags?: string[];
  order: number;
}

interface Testimonial {
  _id: string;
  name: string;
  title: string;
  content: string;
  image?: string;
  url?: string;
  featured: boolean;
}

const DEFAULT_PROFILE: Profile = {
  name: "MD. Shahadot Hossain",
  title: "Enterprise Mobile Architect & Full Stack Engineer",
  avatar: "/avatar.png",
  availabilityBadge: "Available for new opportunities",
  isAvailable: true,
  bio: [
    "Software Engineer with 4+ years of experience specializing in React Native, TypeScript, and enterprise mobile solutions.",
    "Proven track record of building offline-first applications serving 10,000+ users and 100,000+ daily transactions for Fortune 500 clients like Unilever, BAT, Nestlé, and Nagad."
  ],
  socialLinks: []
};

export const revalidate = 86400; // Revalidate static cache every 24 hours

async function getProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${API_BASE_URL}/profile`, { next: { revalidate: 86400 } });
    if (!res.ok) return DEFAULT_PROFILE;
    const data = await res.json();
    return data.profile || DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

async function getExpertise(): Promise<ExpertiseItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/expertise`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.testimonials || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const [profile, testimonials, expertiseItems] = await Promise.all([
    getProfile(),
    getTestimonials(),
    getExpertise()
  ]);

  return (
    <HomeClient
      profile={profile}
      testimonials={testimonials}
      expertiseItems={expertiseItems}
    />
  );
}
