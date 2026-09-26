import { API_BASE_URL } from "@/config/api";
import { getPageContent } from "@/lib/pages";
import CertificationsClient, { CertificateItem } from "./CertificationsClient";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shahadot.dev";

export const revalidate = 86400; // Revalidate static cache every 24 hours

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getPageContent("certifications");
  const title = pageContent?.title || "Certifications & Credentials";
  const description =
    pageContent?.subtitle ||
    "Professional certifications earned by MD. Shahadot Hossain in React Native, cloud architecture, and modern software engineering.";

  return {
    title,
    description,
    keywords: [
      "Shahadot Hossain Certifications",
      "Software Engineer Credentials",
      "React Native Certification",
      "Cloud Developer Certification",
      "Professional Development",
    ],
    alternates: {
      canonical: `${SITE_URL}/certifications/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/certifications/`,
      type: "website",
    },
  };
}

async function getCertificates(): Promise<CertificateItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/certificates`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.certificates || [];
  } catch {
    return [];
  }
}

export default async function CertificationsPage() {
  const [certificates, pageContent] = await Promise.all([
    getCertificates(),
    getPageContent('certifications')
  ]);

  return (
    <CertificationsClient
      initialCertificates={certificates}
      pageTitle={pageContent?.title}
      pageSubtitle={pageContent?.subtitle}
      pageBadge={pageContent?.badge}
    />
  );
}
