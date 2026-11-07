"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Save, CheckCircle2, AlertCircle, Sparkles, ExternalLink, Globe, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export default function ProfileAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    headline: "",
    statement: "",
    email: "",
    phone: "",
    location: "",
    availabilityStatus: "",
    resumeUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    seoTitle: "",
    seoDescription: "",
  });

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setFormData({
            name: data.profile.name || "",
            title: data.profile.title || "",
            headline: data.profile.headline || "",
            statement: data.profile.statement || "",
            email: data.profile.email || "",
            phone: data.profile.phone || "",
            location: data.profile.location || "",
            availabilityStatus: data.profile.availabilityStatus || "",
            resumeUrl: data.profile.resumeUrl || "",
            githubUrl: data.profile.githubUrl || "",
            linkedinUrl: data.profile.linkedinUrl || "",
            seoTitle: data.profile.seoTitle || "",
            seoDescription: data.profile.seoDescription || "",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok) {
        setToast({ type: "success", text: "Profile & branding settings saved and published live!" });
      } else {
        setToast({ type: "error", text: json.error || "Failed to save profile." });
      }
    } catch (err) {
      setToast({ type: "error", text: "Network error occurred." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-500 font-mono text-sm bg-slate-50">
        Loading profile data...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <AdminHeader
        title="Profile, Hero & Branding"
        description="Edit headline, personal statement, contact details, social URLs, and SEO metadata."
      />

      <main className="p-6 sm:p-8 max-w-5xl space-y-6">
        {toast && (
          <div
            className={`p-4 rounded-xl flex items-center space-x-3 text-xs font-mono ${
              toast.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-rose-50 border border-rose-200 text-rose-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            )}
            <span>{toast.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Hero & Branding */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-6 space-y-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span>Hero & Identity</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">Professional Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-slate-700">Primary Value Proposition / Headline</label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-slate-700">About Me Statement / Detailed Bio</label>
              <textarea
                rows={4}
                value={formData.statement}
                onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                placeholder="Comprehensive professional statement shown in Hero and About sections..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none resize-none shadow-xs"
              />
            </div>
          </div>

          {/* 2. Contact & Location */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-6 space-y-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-cyan-600" />
              <span>Contact Coordinates</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* 3. Social & External Links */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-6 space-y-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Github className="w-4 h-4 text-cyan-600" />
              <span>Social & Resume Links</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">GitHub Profile URL</label>
                <input
                  type="text"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">Resume PDF Link</label>
                <input
                  type="text"
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  placeholder="/resume.pdf"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* 4. SEO & Metadata */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-6 space-y-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Globe className="w-4 h-4 text-cyan-600" />
              <span>SEO & Open Graph</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">Meta Title Tag</label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="Shahariyas | Python Full Stack Developer"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">Meta Description</label>
                <input
                  type="text"
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="Production-grade developer portfolio of Shahariyas..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-all duration-200 shadow-md shadow-cyan-600/20 disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Publishing Changes..." : "Save & Publish Profile"}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
