"use client";

import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Wrench,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
} from "lucide-react";

interface SkillItem {
  id: string;
  categoryId: string;
  name: string;
  description?: string | null;
  order: number;
}

interface SkillCategoryItem {
  id: string;
  name: string;
  order: number;
  skills: SkillItem[];
}

export default function SkillsAdminPage() {
  const [categories, setCategories] = useState<SkillCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Category Modal
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SkillCategoryItem | null>(null);
  const [categoryName, setCategoryName] = useState("");

  // Skill Modal
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [skillFormData, setSkillFormData] = useState({
    name: "",
    description: "",
  });

  const loadSkills = () => {
    fetch("/api/admin/skills")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadSkills();
  }, []);

  // Category Actions
  const openAddCategory = () => {
    setEditingCategory(null);
    setCategoryName("");
    setCategoryModalOpen(true);
  };

  const openEditCategory = (cat: SkillCategoryItem) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/skills", {
        method: editingCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "category",
          name: categoryName,
          ...(editingCategory ? { id: editingCategory.id, order: editingCategory.order } : {}),
        }),
      });

      if (res.ok) {
        setToast({ type: "success", text: "Category saved successfully!" });
        setCategoryModalOpen(false);
        loadSkills();
      }
    } catch (e) {
      setToast({ type: "error", text: "Failed to save category." });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure? This will delete the category and all its skills.")) return;
    try {
      const res = await fetch(`/api/admin/skills?id=${id}&type=category`, {
        method: "DELETE",
      });
      if (res.ok) {
        setToast({ type: "success", text: "Category deleted." });
        loadSkills();
      }
    } catch (e) {
      setToast({ type: "error", text: "Failed to delete category." });
    }
  };

  // Skill Actions
  const openAddSkill = (catId: string) => {
    setEditingSkill(null);
    setSelectedCategoryId(catId);
    setSkillFormData({ name: "", description: "" });
    setSkillModalOpen(true);
  };

  const openEditSkill = (skill: SkillItem) => {
    setEditingSkill(skill);
    setSelectedCategoryId(skill.categoryId);
    setSkillFormData({
      name: skill.name,
      description: skill.description || "",
    });
    setSkillModalOpen(true);
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/skills", {
        method: editingSkill ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "skill",
          categoryId: selectedCategoryId,
          name: skillFormData.name,
          description: skillFormData.description,
          ...(editingSkill ? { id: editingSkill.id, order: editingSkill.order } : {}),
        }),
      });

      if (res.ok) {
        setToast({ type: "success", text: "Skill item saved successfully!" });
        setSkillModalOpen(false);
        loadSkills();
      }
    } catch (e) {
      setToast({ type: "error", text: "Failed to save skill." });
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm("Delete this skill chip?")) return;
    try {
      const res = await fetch(`/api/admin/skills?id=${id}&type=skill`, {
        method: "DELETE",
      });
      if (res.ok) {
        setToast({ type: "success", text: "Skill deleted." });
        loadSkills();
      }
    } catch (e) {
      setToast({ type: "error", text: "Failed to delete skill." });
    }
  };

  if (loading) {
    return <div className="p-12 text-slate-500 font-mono text-sm bg-slate-50">Loading skills...</div>;
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <AdminHeader
        title="Skills Bento & Tooltip Inspector"
        description="Organize skill categories, customize technical chips, and configure interactive hover tooltips."
        actionButton={
          <button
            onClick={openAddCategory}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Category</span>
          </button>
        }
      />

      <main className="p-6 sm:p-8 max-w-6xl space-y-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-cyan-600" />
                    <h3 className="font-bold text-base text-slate-900">{cat.name}</h3>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openEditCategory(cat)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-slate-100 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group/skill relative flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/30 transition-all text-xs"
                    >
                      <span className="font-mono text-slate-700">{skill.name}</span>

                      {skill.description && (
                        <span title={skill.description}>
                          <HelpCircle className="w-3 h-3 text-cyan-600" />
                        </span>
                      )}

                      <div className="flex items-center opacity-0 group-hover/skill:opacity-100 transition-opacity pl-1 space-x-1">
                        <button
                          onClick={() => openEditSkill(skill)}
                          className="text-slate-400 hover:text-cyan-700 cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => openAddSkill(cat.id)}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-dashed border-slate-300 hover:border-cyan-500 text-xs text-slate-500 hover:text-cyan-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Skill</span>
                  </button>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                {cat.skills.length} skills in category
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Category Modal */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                {editingCategory ? "Edit Category" : "New Skill Category"}
              </h2>
              <button
                onClick={() => setCategoryModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">Category Name</label>
                <input
                  type="text"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Cloud & DevOps"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 cursor-pointer shadow-xs"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {skillModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                {editingSkill ? "Edit Skill Chip" : "Add Skill to Category"}
              </h2>
              <button
                onClick={() => setSkillModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={skillFormData.name}
                  onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                  placeholder="e.g. Django REST Framework"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:border-cyan-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700">
                  Tooltip Explanation (Hover Context)
                </label>
                <textarea
                  rows={3}
                  value={skillFormData.description}
                  onChange={(e) => setSkillFormData({ ...skillFormData, description: e.target.value })}
                  placeholder="Practical production context shown when recruiters hover over this chip..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-cyan-600 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 cursor-pointer shadow-xs"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
