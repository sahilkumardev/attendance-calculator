import "@/styles/globals.css";

import type { Metadata } from "next";
import { MaxWidthWrapper } from "@/components/max-with-wrapper";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Background } from "@/components/background";
import { FontWrapper } from "@/components/font-wrapper";
import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://attendance.sahilkumardev.com"),
  title: "Attendance Calculator",
  description:
    "Calculate your attendance percentage, plan your future attendance, and stay on track with your academic goals.",
  keywords: [
    "Attendance Calculator",
    "College Attendance",
    "Percentage Calculator",
    "Attendance Planner",
    "Student Tools",
    "Next.js",
    "React",
    "TypeScript",
    "javascript",
    "tailwindcss",
  ],
  authors: [
    {
      name: "Sahilkumardev",
      url: "https://sahilkumardev.com",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://attendance.sahilkumardev.com",
    title: "Attendance Calculator",
    description:
      "Calculate your attendance percentage, plan your future attendance, and stay on track with your academic goals.",
    siteName: "Attendance Calculator",
    images: [{ url: "/og-image.png" }],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  creator: "Sahilkumardev",
  twitter: {
    card: "summary",
    title: "Attendance Calculator",
    description:
      "Calculate your attendance percentage, plan your future attendance, and stay on track with your academic goals.",
    creator: "@sahilkumardev",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">
        <QueryProvider>
          <FontWrapper>
            <MaxWidthWrapper>
              <Background />
              <SiteHeader />
              <div className="min-h-[calc(100dvh-6rem)] lg:min-h-screen lg:max-h-screen place-items-center place-content-center px-4">
                {children}
              </div>
              <SiteFooter />
              <Toaster position="top-center" />
            </MaxWidthWrapper>
          </FontWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
