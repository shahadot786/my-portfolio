import { API_BASE_URL } from "@/config/api";

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  title: string;
  yearsOfExperience?: string;
  avatar?: string;
  resumeUrl?: string;
  location: string;
  email: string;
  phone?: string;
  availabilityBadge?: string;
  isAvailable?: boolean;
  bio: string[];
  socialLinks: SocialLink[];
}

export const DEFAULT_PROFILE: Profile = {
  name: "MD. Shahadot Hossain",
  title: "Enterprise Mobile Architect & Full Stack Engineer",
  yearsOfExperience: "5+",
  avatar: "/avatar.png",
  location: "Dhaka, Bangladesh",
  email: "shahadot.swe@gmail.com",
  availabilityBadge: "Available for new opportunities",
  isAvailable: true,
  bio: [
    "Software Engineer with 5+ years of experience specializing in React Native, TypeScript, and enterprise mobile solutions.",
    "Proven track record of building offline-first applications serving 10,000+ users and 100,000+ daily transactions for Fortune 500 clients like Unilever, BAT, Nestlé, and Nagad."
  ],
  socialLinks: [],
};

export async function getProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${API_BASE_URL}/profile`, { next: { revalidate: 86400 } });
    if (!res.ok) return DEFAULT_PROFILE;
    const data = await res.json();
    return data.profile || DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}
