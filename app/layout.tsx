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
    <html lang="en" className={`${fontHeading.variable} ${fontBody.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
