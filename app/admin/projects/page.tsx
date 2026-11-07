"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Plus,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  ExternalLink,
  Github,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
} from "lucide-react";
import { parseJsonArray } from "@/lib/utils";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string;
  techStack: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  caseStudyUrl?: string | null;
  coverImageUrl?: string | null;
  order: number;
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Full Stack Web Development",
    description: "",
    features: [""],
    techStack: ["Python", "Django", "React.js"],
    liveUrl: "",
    githubUrl: "",
    caseStudyUrl: "",
    coverImageUrl: "",
  });

  const loadProjects = () => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) setProjects(data.projects);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "Full Stack Web Development",
      description: "",
      features: ["", ""],
      techStack: ["Python", "Django", "React.js", "PostgreSQL"],
      liveUrl: "",
      githubUrl: "",
      caseStudyUrl: "",
      coverImageUrl: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (p: ProjectItem) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      category: p.category,
      description: p.description,
      features: parseJsonArray(p.features),
      techStack: parseJsonArray(p.techStack),
      liveUrl: p.liveUrl || "",
      githubUrl: p.githubUrl || "",
      caseStudyUrl: p.caseStudyUrl || "",
      coverImageUrl: p.coverImageUrl || "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);

    const payload = {
      ...formData,
      features: formData.features.filter((f) => f.trim().length > 0),
      techStack: formData.techStack.filter((t) => t.trim().length > 0),
      ...(editingProject ? { id: editingProject.id, order: editingProject.order } : {}),
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: editingProject ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setToast({
          type: "success",
          text: editingProject ? "Project updated successfully!" : "New project published!",
        });
        setModalOpen(false);
        loadProjects();
      } else {
        setToast({ type: "error", text: data.error || "Save operation failed." });
      }
    } catch (err) {
      setToast({ type: "error", text: "Network error occurred." });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setToast({ type: "success", text: "Project deleted." });
        loadProjects();
      } else {
        setToast({ type: "error", text: "Failed to delete item." });
      }
    } catch (e) {
      setToast({ type: "error", text: "Network error occurred." });
    }
  };

  const moveOrder = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === projects.length - 1)
    )
      return;

    const newProjects = [...projects];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;

    const items = newProjects.map((p, idx) => ({ id: p.id, order: idx + 1 }));
    setProjects(newProjects);

    try {
      await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      setToast({ type: "success", text: "Display order updated!" });
    } catch (e) {
      loadProjects();
    }
  };

  if (loading) {
    return <div className="p-12 text-slate-500 font-mono text-sm bg-slate-50">Loading projects...</div>;
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <AdminHeader
        title="Featured Projects Management"
        description="Add, edit, reorder, and link repository and demo endpoints for projects shown in the portfolio."
        actionButton={
          <button
            onClick={openAddModal}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
        }
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

        {/* Project Cards List */}
        <div className="space-y-4">
          {projects.map((proj, idx) => {
            const features = parseJsonArray(proj.features);
            const techStack = parseJsonArray(proj.techStack);

            return (
              <div
                key={proj.id}
                className="rounded-2xl bg-white border border-slate-200/90 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-bold text-base text-slate-900">{proj.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-50 border border-cyan-200 text-cyan-800">
                      {proj.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 max-w-2xl">{proj.description}</p>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 pt-1">
                    {proj.liveUrl && (
                      <span className="text-cyan-700 flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Live Demo
                      </span>
                    )}
                    {proj.githubUrl && (
                      <span className="text-slate-700 flex items-center gap-1">
                        <Github className="w-3 h-3" /> GitHub Repo
                      </span>
                    )}
                    {proj.caseStudyUrl && (
                      <span className="text-cyan-700 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> Case Study
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {techStack.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => moveOrder(idx, "up")}
                    disabled={idx === 0}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => moveOrder(idx, "down")}
                    disabled={idx === projects.length - 1}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-2 rounded-lg bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 text-cyan-700 cursor-pointer"
                    title="Edit Project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="p-2 rounded-lg bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <FolderGit2 className="w-5 h-5 text-cyan-600" />
                <span>{editingProject ? "Edit Project Details" : "Create New Project"}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">Category Tag *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Full Stack & E-Commerce"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">Summary & Architecture *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none resize-none"
                />
              </div>

              {/* Action URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">Live Demo URL</label>
                  <input
                    type="text"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">Case Study URL</label>
                  <input
                    type="text"
                    value={formData.caseStudyUrl}
                    onChange={(e) => setFormData({ ...formData, caseStudyUrl: e.target.value })}
                    placeholder="/case-study or link"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Feature bullets */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-medium text-slate-700">Key Features</label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, features: [...formData.features, ""] })}
                    className="text-xs font-mono text-cyan-700 hover:text-cyan-800 font-semibold cursor-pointer"
                  >
                    + Add Feature
                  </button>
                </div>

                {formData.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => {
                        const updated = [...formData.features];
                        updated[fIdx] = e.target.value;
                        setFormData({ ...formData, features: updated });
                      }}
                      placeholder={`Feature ${fIdx + 1}...`}
                      className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-cyan-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.features.filter((_, idx) => idx !== fIdx);
                        setFormData({ ...formData, features: updated });
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-mono font-medium text-slate-700">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.techStack.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      techStack: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Python, Django, React, PostgreSQL, Tailwind"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 shadow-xs cursor-pointer"
                >
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
