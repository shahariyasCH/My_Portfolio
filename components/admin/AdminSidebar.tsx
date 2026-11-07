"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Wrench,
  FolderGit2,
  GraduationCap,
  Sparkles,
  FileText,
  Mail,
  LogOut,
  ExternalLink,
  Shield,
  Home,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Profile & Identity", href: "/admin/profile", icon: User },
    { label: "Work Experience", href: "/admin/experience", icon: Briefcase },
    { label: "Skills Bento", href: "/admin/skills", icon: Wrench },
    { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { label: "Education", href: "/admin/education", icon: GraduationCap },
    { label: "Recruiter Status", href: "/admin/recruiter", icon: Sparkles },
    { label: "Resume PDF", href: "/admin/resume", icon: FileText },
    { label: "Inquiries Inbox", href: "/admin/messages", icon: Mail },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 shadow-sm">
      <div className="p-5">
        {/* Admin Brand */}
        <div className="flex items-center space-x-3 pb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center font-mono font-bold text-white text-base shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm tracking-tight">Admin CMS</div>
            <div className="text-[11px] font-mono text-cyan-700">Shahariyas Portfolio</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 pt-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-cyan-50 text-cyan-800 border border-cyan-200 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-700" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Quick Actions */}
      <div className="p-4 border-t border-slate-200/80 space-y-2 bg-slate-50/50">
        <Link
          href="/"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:text-cyan-700 hover:border-cyan-300 transition-colors shadow-xs"
        >
          <span className="flex items-center gap-2">
            <Home className="w-4 h-4 text-cyan-600" />
            <span>Go to Live Website</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
