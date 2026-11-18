import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shahariyas C | AI Automation Developer | Full Stack Developer | n8n | LLMs & RAG",
  description:
    "Official portfolio of Shahariyas C: AI Automation Developer & Full Stack Developer with 2+ years of experience building secure web applications and AI-powered automation (n8n, LLMs, RAG, Django, Node.js, React.js, Next.js).",
  keywords: [
    "Shahariyas C",
    "AI Automation Developer",
    "Full Stack Developer",
    "n8n Developer",
    "LLMs and RAG",
    "AI Agents",
    "Django REST",
    "React.js Developer",
    "Next.js Developer",
    "Dubai UAE Developer",
  ],
  authors: [{ name: "Shahariyas C" }],
  creator: "Shahariyas C",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shahariyas.netlify.app",
    title: "Shahariyas C | AI Automation Developer | Full Stack Developer | n8n | LLMs & RAG",
    description:
      "Full Stack Developer and AI Automation Developer with 2+ years of experience building secure web applications and AI-powered automation.",
    siteName: "Shahariyas Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahariyas C | AI Automation Developer | Full Stack Developer | n8n | LLMs & RAG",
    description:
      "Full Stack Developer and AI Automation Developer with 2+ years of experience building secure web applications and AI-powered automation.",
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
