import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { Expertise } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

const SEED_EXPERTISE = [
  {
    title: "Travel Tech & Flight Systems",
    badge: "TT",
    description: "Currently working at iBox Lab Limited, building scalable enterprise web and mobile applications for the travel technology industry. Specializing in developing modern flight booking platforms, airline NDC/GDS integrations, and high-performance digital products.",
    isFeatured: true,
    metrics: [
      { value: "NDC / GDS", label: "Airline Integrations" },
      { value: "100%", label: "Booking Integrity" }
    ],
    tags: ["React.js", "Next.js", "React Native", "TypeScript", "NDC/GDS APIs", "Flight Booking"],
    order: 0
  },
  {
    title: "Enterprise Mobile Architecture",
    badge: "EA",
    description: "Architecting robust mobile applications serving Fortune 500 enterprise clients like Unilever, BAT, Nestlé, L'Oréal, and Nagad. Transforming complex business requirements into scalable, user-centric mobile solutions.",
    isFeatured: false,
    metrics: [
      { value: "10k+", label: "Active Field Users" },
      { value: "100k+", label: "Daily Transactions" }
    ],
    tags: ["React Native", "TypeScript", "Redux", "Zustand", "iOS & Android"],
    order: 1
  },
  {
    title: "Offline-First Systems",
    badge: "OFF",
    description: "Engineering mission-critical systems that function seamlessly in zero or low-connectivity field environments, guaranteeing background synchronization, local storage persistence, and 0% data loss.",
    isFeatured: false,
    metrics: [
      { value: "0%", label: "Data Loss" },
      { value: "100%", label: "Offline Resilience" }
    ],
    tags: ["Offline Architecture", "SQLite", "AsyncStorage", "Background Sync"],
    order: 2
  },
  {
    title: "High-Performance Web & Real-Time Dashboards",
    badge: "RT",
    description: "Implementing high-concurrency real-time tracking, territory management dashboards, and SSG/ISR web applications engineered for sub-second page loads and maximum SEO performance.",
    isFeatured: false,
    metrics: [
      { value: "Sub-second", label: "Load Time" },
      { value: "99.9%", label: "System Uptime" }
    ],
    tags: ["Next.js", "Node.js", "Tailwind CSS", "REST APIs", "MongoDB"],
    order: 3
  }
];

export const GET = withErrorHandling(async (req: NextRequest) => {
    const url = new URL(req.url);
    const reseed = url.searchParams.get('reseed');

    if (reseed === 'true') {
        await Expertise.deleteMany({});
        await Expertise.insertMany(SEED_EXPERTISE);
        revalidatePath('/');
    }

    let items = await Expertise.find().sort({ isFeatured: -1, order: 1 });
    if (!items || items.length === 0) {
        items = await Expertise.insertMany(SEED_EXPERTISE);
        revalidatePath('/');
    }
    return NextResponse.json({ success: true, items });
});

export const POST = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const body = await req.json();
    const item = await Expertise.create(body);
    revalidatePath('/');
    return NextResponse.json({ success: true, item });
}));
