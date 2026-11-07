import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#f8fafc] text-slate-900 min-h-screen flex flex-col font-sans selection:bg-indigo-500/15 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}
