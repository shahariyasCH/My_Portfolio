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
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
} from "lucide-react";
import { parseJsonArray } from "@/lib/utils";

interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  responsibilities: string;
  techTags: string;
  order: number;
}

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "Kochi, Kerala",
    startDate: "Sep 2025",
    endDate: "",
    isCurrent: false,
    responsibilities: ["", ""],
    techTags: ["Python", "Django"],
  });

  const loadExperiences = () => {
    fetch("/api/admin/experience")
      .then((res) => res.json())
      .then((data) => {
        if (data.experiences) setExperiences(data.experiences);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      company: "",
      title: "",
      location: "Kochi, Kerala",
      startDate: "Sep 2025",
      endDate: "",
      isCurrent: false,
      responsibilities: ["", ""],
      techTags: ["Python", "Django", "PostgreSQL"],
    });
    setModalOpen(true);
  };

  const openEditModal = (item: ExperienceItem) => {
    setEditingItem(item);
    setFormData({
      company: item.company,
      title: item.title,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate || "",
      isCurrent: item.isCurrent,
      responsibilities: parseJsonArray(item.responsibilities),
      techTags: parseJsonArray(item.techTags),
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);

    const payload = {
      ...formData,
      responsibilities: formData.responsibilities.filter((r) => r.trim().length > 0),
      techTags: formData.techTags.filter((t) => t.trim().length > 0),
      ...(editingItem ? { id: editingItem.id } : {}),
    };

    try {
      const res = await fetch("/api/admin/experience", {
        method: editingItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setToast({
          type: "success",
          text: editingItem ? "Experience updated successfully!" : "New experience created!",
        });
        setModalOpen(false);
        loadExperiences();
      } else {
        setToast({ type: "error", text: data.error || "Save operation failed." });
      }
    } catch (err) {
      setToast({ type: "error", text: "Network error occurred." });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this career entry?")) return;

    try {
      const res = await fetch(`/api/admin/experience?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setToast({ type: "success", text: "Experience entry deleted." });
        loadExperiences();
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
      (direction === "down" && index === experiences.length - 1)
    )
      return;

    const newExps = [...experiences];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const temp = newExps[index];
    newExps[index] = newExps[targetIndex];
    newExps[targetIndex] = temp;

    const items = newExps.map((exp, idx) => ({ id: exp.id, order: idx + 1 }));
    setExperiences(newExps);

    try {
      await fetch("/api/admin/experience", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      setToast({ type: "success", text: "Timeline order updated!" });
    } catch (e) {
      loadExperiences();
    }
  };

  if (loading) {
    return <div className="p-12 text-slate-500 font-mono text-sm bg-slate-50">Loading experiences...</div>;
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <AdminHeader
        title="Work Experience Management"
        description="Add, edit, reorder, and remove career history items displayed in the Experience section."
        actionButton={
          <button
            onClick={openAddModal}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Experience</span>
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

        {/* Experience Items List */}
        <div className="space-y-4">
          {experiences.map((exp, idx) => {
            const responsibilities = parseJsonArray(exp.responsibilities);
            const techTags = parseJsonArray(exp.techTags);

            return (
              <div
                key={exp.id}
                className="rounded-2xl bg-white border border-slate-200/90 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-bold text-base text-slate-900">{exp.title}</h3>
                    {exp.isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800">
                        Present Role
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-semibold text-cyan-700">{exp.company}</div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {exp.location}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {techTags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
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
                    disabled={idx === experiences.length - 1}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openEditModal(exp)}
                    className="p-2 rounded-lg bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 text-cyan-700 cursor-pointer"
                    title="Edit Experience"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-2 rounded-lg bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 cursor-pointer"
                    title="Delete Entry"
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
                <Briefcase className="w-5 h-5 text-cyan-600" />
                <span>{editingItem ? "Edit Experience Entry" : "Create New Experience"}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">Job Title / Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">Start Date</label>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    placeholder="Sep 2025"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700">End Date</label>
                  <input
                    type="text"
                    disabled={formData.isCurrent}
                    value={formData.isCurrent ? "Present" : formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    placeholder="Present or Month Year"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none disabled:opacity-40"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="isCurrent"
                  checked={formData.isCurrent}
                  onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
                  className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="isCurrent" className="text-xs font-mono text-slate-700 cursor-pointer">
                  I currently work in this role (Present Role)
                </label>
              </div>

              {/* Responsibilities list */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-medium text-slate-700">
                    Responsibilities & Deliverables
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, responsibilities: [...formData.responsibilities, ""] })}
                    className="text-xs font-mono text-cyan-700 hover:text-cyan-800 cursor-pointer font-semibold"
                  >
                    + Add Bullet
                  </button>
                </div>

                {formData.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => {
                        const updated = [...formData.responsibilities];
                        updated[rIdx] = e.target.value;
                        setFormData({ ...formData, responsibilities: updated });
                      }}
                      placeholder={`Key deliverable or achievement ${rIdx + 1}...`}
                      className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-cyan-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.responsibilities.filter((_, idx) => idx !== rIdx);
                        setFormData({ ...formData, responsibilities: updated });
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-mono font-medium text-slate-700">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.techTags.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      techTags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Python, Django REST Framework, UiPath, PostgreSQL"
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
                  {editingItem ? "Save Changes" : "Create Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
