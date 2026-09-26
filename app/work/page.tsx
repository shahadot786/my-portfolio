import { API_BASE_URL } from "@/config/api";
import { getPageContent } from "@/lib/pages";
import { getProfile } from "@/lib/profile";
import WorkClient from "./WorkClient";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shahadot.dev";

export const revalidate = 86400; // Revalidate static cache every 24 hours

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getPageContent("work");
  const title = pageContent?.title || "Work Experience";
  const description =
    pageContent?.subtitle ||
    "Professional experience of MD. Shahadot Hossain — Software Engineer with 5+ years building enterprise mobile and web applications for Unilever, BAT, Nestlé, and Nagad.";

  return {
    title,
    description,
    keywords: [
      "Shahadot Hossain Work Experience",
      "React Native Engineer Career",
      "Software Engineer Bangladesh",
      "Enterprise Mobile Developer",
      "Unilever App Developer",
      "Nagad App Developer",
      "Full Stack Career",
    ],
    alternates: {
      canonical: `${SITE_URL}/work/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/work/`,
      type: "website",
    },
  };
}

interface Experience {
  _id: string;
  company: string;
  companyUrl?: string;
  location: string;
  title: string;
  period: string;
  isCurrent: boolean;
  description?: string;
  achievements: string[];
  technologies: string[];
  order: number;
}

interface Education {
  _id: string;
  institution: string;
  degree: string;
  period: string;
  location?: string;
  highlights: string[];
}

interface Certificate {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
  verified: boolean;
}

async function getExperiences(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/experiences`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.experiences || [];
  } catch {
    return [];
  }
}

async function getEducation(): Promise<Education[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/education`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.education || [];
  } catch {
    return [];
  }
}

async function getCertificates(): Promise<Certificate[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/certificates`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.certificates || [];
  } catch {
    return [];
  }
}

export default async function WorkPage() {
  const [experiences, education, certificates, pageContent, profile] = await Promise.all([
    getExperiences(),
    getEducation(),
    getCertificates(),
    getPageContent('work'),
    getProfile()
  ]);

  return (
    <WorkClient
      experiences={experiences}
      education={education}
      certificates={certificates}
      pageContent={pageContent}
      profile={profile}
    />
  );
}
