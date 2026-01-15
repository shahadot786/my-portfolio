import "./globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/sections/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MD. Shahadot Hossain - Software Engineer",
  description:
    "I am a software engineer based in Bangladesh with 4+ years of experience building mobile and web applications for enterprise clients including Unilever, BAT, Nestlé, and Nagad.",
  keywords:
    "React Native, React, Next.js, TypeScript, JavaScript, Mobile Development, Software Engineer, Full Stack Developer",
  authors: [{ name: "MD. Shahadot Hossain" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shahadot-hossain.vercel.app",
    title: "MD. Shahadot Hossain - Software Engineer",
    description:
      "Building innovative mobile solutions with 4+ years of experience serving 10,000+ users",
    siteName: "MD. Shahadot Hossain",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD. Shahadot Hossain - Software Engineer",
    description: "Building innovative mobile solutions with React Native",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen pt-24 pb-16">{children}</main>
      </body>
    </html>
  );
}
