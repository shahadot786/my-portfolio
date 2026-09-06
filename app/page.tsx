import { API_BASE_URL } from "@/config/api";
import { HomeClient } from "@/components/sections/HomeClient";
import { getProfile } from "@/lib/profile";

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

export const revalidate = 86400; // Revalidate static cache every 24 hours


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
