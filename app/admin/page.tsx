import React from "react";
import prisma from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";
import {
  Briefcase,
  FolderGit2,
  Wrench,
  GraduationCap,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Home,
} from "lucide-react";

export default async function AdminDashboardOverview() {
  const profile = await prisma.profile.findUnique({ where: { id: "default" } });
  const experienceCount = await prisma.experience.count();
  const projectCount = await prisma.project.count();
  const categoryCount = await prisma.skillCategory.count();
  const skillCount = await prisma.skill.count();
  const educationCount = await prisma.education.count();
  const messageCount = await prisma.contactMessage.count();
  const recentMessages = await prisma.contactMessage.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const cards = [
    {
      label: "Work Experience",
      count: experienceCount,
      sub: "Active career timeline entries",
      href: "/admin/experience",
      icon: Briefcase,
      color: "text-cyan-700 bg-cyan-50 border-cyan-100",
    },
    {
      label: "Featured Projects",
      count: projectCount,
      sub: "Live web & mobile apps",
      href: "/admin/projects",
      icon: FolderGit2,
      color: "text-blue-700 bg-blue-50 border-blue-100",
    },
    {
      label: "Skills & Proficiencies",
      count: skillCount,
      sub: `Across ${categoryCount} bento categories`,
      href: "/admin/skills",
      icon: Wrench,
      color: "text-teal-700 bg-teal-50 border-teal-100",
    },
    {
      label: "Education Records",
      count: educationCount,
      sub: "Degrees & coursework",
      href: "/admin/education",
      icon: GraduationCap,
      color: "text-indigo-700 bg-indigo-50 border-indigo-100",
    },
    {
      label: "Recruiter Status",
      count: profile?.availabilityStatus || "Active",
      sub: "Live hiring status pill",
      href: "/admin/recruiter",
      icon: Sparkles,
      color: "text-amber-700 bg-amber-50 border-amber-100",
      isPill: true,
    },
    {
      label: "Inquiries Inbox",
      count: messageCount,
      sub: "Direct contact form submissions",
      href: "/admin/messages",
      icon: MessageSquare,
      color: "text-emerald-700 bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <AdminHeader
        title="Portfolio CMS Overview"
        description="Manage, edit, and publish your real-time career profile, work experience, technical skills, projects, and active resume."
      />

      <main className="p-6 sm:p-8 space-y-8 max-w-7xl">
        {/* Quick Jump Banner */}
        <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 rounded-2xl p-6 sm:p-7 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">
              Live Website Sync Active
            </h2>
            <p className="text-sm text-cyan-100 max-w-xl">
              Every change saved in this Admin CMS is immediately published to your live portfolio website without redeploying.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 transition-colors shrink-0 shadow-sm"
          >
            <Home className="w-4 h-4 text-cyan-600" />
            <span>View Live Website</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.label}
                href={c.href}
                className="group relative rounded-2xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between hover:border-cyan-400 hover:shadow-md transition-all duration-200 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl border ${c.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                </div>

                <div className="mt-5 space-y-1">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    {c.label}
                  </div>
                  <div
                    className={`${
                      c.isPill ? "text-lg truncate font-bold text-cyan-700" : "text-3xl font-extrabold text-slate-900"
                    }`}
                  >
                    {c.count}
                  </div>
                  <p className="text-xs text-slate-500">{c.sub}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Inquiries & Live Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Inquiries */}
          <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200/90 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">Recent Contact Inquiries</h3>
                <p className="text-xs text-slate-500">Recruiter and client messages from the contact form</p>
              </div>
              <Link
                href="/admin/messages"
                className="text-xs font-mono text-cyan-700 hover:text-cyan-800 font-semibold"
              >
                View all ({messageCount}) →
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs font-mono bg-slate-50 rounded-xl border border-slate-100">
                No inquiries received yet. Submissions from the contact form will appear here.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-xs text-slate-900">{msg.name}</span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-xs text-slate-500 font-mono">{msg.email}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">{msg.message}</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions Panel */}
          <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200/90 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-base text-slate-900">Quick Edit Shortcuts</h3>
            <div className="space-y-2.5">
              <Link
                href="/admin/profile"
                className="block p-3 rounded-xl bg-slate-50 hover:bg-cyan-50/50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-cyan-800 transition-colors"
              >
                <div className="font-semibold">Edit Name, Title & Bio Statement</div>
                <div className="text-[11px] text-slate-500">Update headline and contact info</div>
              </Link>

              <Link
                href="/admin/resume"
                className="block p-3 rounded-xl bg-slate-50 hover:bg-cyan-50/50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-cyan-800 transition-colors"
              >
                <div className="font-semibold">Upload New Resume PDF</div>
                <div className="text-[11px] text-slate-500">Updates all resume download buttons</div>
              </Link>

              <Link
                href="/admin/projects"
                className="block p-3 rounded-xl bg-slate-50 hover:bg-cyan-50/50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-cyan-800 transition-colors"
              >
                <div className="font-semibold">Add / Modify Projects</div>
                <div className="text-[11px] text-slate-500">Live demos, repos, and case studies</div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
