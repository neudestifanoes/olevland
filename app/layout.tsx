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
  title: "OLEV",
  description:
    "AI is reading your code. Know exactly when.",
  // Tab icon: app/icon.png, app/favicon.ico, app/apple-icon.png (see npm run icons)
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
