import { API_BASE_URL } from "@/config/api";
import { getPageContent } from "@/lib/pages";
import CertificationsClient, { CertificateItem } from "./CertificationsClient";

export const revalidate = 86400; // Revalidate static cache every 24 hours

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
    />
  );
}
