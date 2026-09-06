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
  heroBadge?: string;
  avatar?: string;
  resumeUrl?: string;
  location: string;
  email: string;
  phone?: string;
  availabilityBadge?: string;
  isAvailable?: boolean;
  bio: string[];
  // Hero stats strip
  statsTransactions?: string;
  statsUsers?: string;
  statsClients?: string;
  statsClientsDetail?: string;
  // Integrations
  mediumUsername?: string;
  // Organization / SEO
  currentCompany?: string;
  // AI Assistant
  isAiAssistantEnabled?: boolean;
  aiWelcomeMessage?: string;
  aiStarterPrompts?: string[];
  socialLinks: SocialLink[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export const DEFAULT_PROFILE: Profile = {
  name: "MD. Shahadot Hossain",
  title: "Enterprise Mobile Architect & Full Stack Engineer",
  yearsOfExperience: "5+",
  heroBadge: "Offline-First Architect",
  avatar: "/avatar.png",
  location: "Dhaka, Bangladesh",
  email: "shahadot.swe@gmail.com",
  availabilityBadge: "Available for new opportunities",
  isAvailable: true,
  statsTransactions: "100K+",
  statsUsers: "10K+",
  statsClients: "Fortune 500",
  statsClientsDetail: "Unilever, BAT, Nestlé, Nagad",
  mediumUsername: "shrhossain786",
  currentCompany: "",
  isAiAssistantEnabled: true,
  aiWelcomeMessage: "",
  aiStarterPrompts: [],
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
