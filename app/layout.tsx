import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shahariyas | Python Full Stack Developer & Automation Engineer",
  description:
    "Production-grade developer portfolio of Shahariyas: Python Full Stack Developer, Lead Automation Engineer, and AI & Backend specialist.",
  keywords: [
    "Shahariyas",
    "Python Full Stack Developer",
    "Django REST Framework",
    "UiPath Automation",
    "React.js Developer",
    "Automation Engineer Kerala",
    "Backend Engineer",
  ],
  authors: [{ name: "Shahariyas" }],
  creator: "Shahariyas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shahariyas.dev",
    title: "Shahariyas | Python Full Stack Developer & Automation Engineer",
    description:
      "Building scalable web applications, intelligent automations, and reliable backend systems.",
    siteName: "Shahariyas Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahariyas | Python Full Stack Developer & Automation Engineer",
    description: "Building scalable web applications, intelligent automations, and reliable backend systems.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#f8fafc] text-slate-900 min-h-screen flex flex-col font-sans selection:bg-indigo-500/15 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}
