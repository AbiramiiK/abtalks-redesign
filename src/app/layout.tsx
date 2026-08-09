import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jbmono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ABTalks — 60 days. 60 builds. One visible proof.",
  description:
    "The 60-day build challenge for India's college developers. Ship one small project every day, prove it with GitHub commits and LinkedIn posts, and leave with proof recruiters can see.",
  keywords: ["ABTalks", "60 day challenge", "build in public", "college developers", "portfolio"],
};

export const viewport: Viewport = {
  themeColor: "#f6f3ec",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${space.variable} ${inter.variable} ${jbmono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}