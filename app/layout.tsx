import type { Metadata } from "next";
import { Host_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const fontHeading = Host_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const fontBody = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://olev.io"),
  title: "OLEV | Prove AI Code Security",
  description:
    "Prove your code is secure with AI audit reports and real-time alerts. Win bigger enterprise contracts.",
  // Tab icon: app/icon.png, app/favicon.ico, app/apple-icon.png (see npm run icons)
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OLEV | Prove AI Code Security",
    description:
      "Prove your code is secure with AI audit reports and real-time alerts. Win bigger enterprise contracts.",
    url: "https://olev.io",
    siteName: "OLEV",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OLEV | Prove AI Code Security",
    description:
      "Prove your code is secure with AI audit reports and real-time alerts. Win bigger enterprise contracts.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontHeading.variable} ${fontBody.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
