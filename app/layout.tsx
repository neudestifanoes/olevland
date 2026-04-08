import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OLEV — Know the moment AI touches your code.",
  description:
    "Know the moment an AI tool reads your proprietary source code. Canary tokens + OS-level monitoring for teams that ship sensitive software.",
  openGraph: {
    title: "OLEV — Know the moment AI touches your code.",
    description:
      "Know the moment an AI tool reads your proprietary source code.",
    url: "https://tryolev.com",
    siteName: "OLEV",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
