// src/presentation/pages/ResearchVaultPage.tsx

import { useState } from "react";
import {
  FileText,
  Folder,
  Plus,
  Search,
  Upload,
  Eye,
  Star,
  MoreVertical,
  BookOpen,
  Lock,
  Globe,
  Users,
} from "lucide-react";

type PaperVisibility = "PRIVATE" | "SHARED" | "PUBLIC";

type Paper = {
  id: string;
  title: string;
  abstract: string;
  content: string;
  visibility: PaperVisibility;
  status: string;
  updatedAt: string;
  views: number;
  citations: number;
  stars: number;
  tags: string[];
};

const samplePapers: Paper[] = [
  {
    id: "1",
    title: "Deep Learning for Satellite Image Super-Resolution",
    abstract: "A research paper exploring deep learning techniques for satellite imagery.",
    content: "",
    visibility: "PUBLIC",
    status: "Published",
    updatedAt: "Updated 2 hours ago",
    views: 624,
    citations: 32,
    stars: 15,
    tags: ["Deep Learning", "Satellite Imagery", "CV"],
  },
  {
    id: "2",
    title: "Orbital Debris Prediction using ML models",
    abstract: "Predicting orbital debris movement using machine learning methods.",
    content: "",
    visibility: "PRIVATE",
    status: "Draft",
    updatedAt: "Updated 1 day ago",
    views: 142,
    citations: 8,
    stars: 3,
    tags: ["Orbital Mechanics", "Machine Learning", "Space"],
  },
];

export default function ResearchVaultPage() {
  const [papers, setPapers] = useState<Paper[]>(samplePapers);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activePaper, setActivePaper] = useState<Paper | null>(null);

  const openNewPaperEditor = () => {
    setActivePaper(null);
    setIsEditorOpen(true);
  };

  const openExistingPaper = (paper: Paper) => {
    setActivePaper(paper);
    setIsEditorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b111a] text-white">
      <div className="flex">
        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 bg-[#0d141f] px-4 py-5">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600">
              <BookOpen size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-wide">YANTRIX</h1>
          </div>

          <nav className="space-y-2 text-sm text-slate-300">
            {[
              "Home",
              "Research Vault",
              "My Vault",
              "Drafts",
              "Published",
              "Collaborations",
              "Citations",
              "Notes",
              "Templates",
              "AI Assistant",
              "Datasets",
              "Models",
              "Missions",
              "Simulations",
              "Code Repos",
            ].map((item) => (
              <button
                key={item}
                className={`w-full rounded-xl px-3 py-2 text-left transition ${
                  item === "Research Vault" || item === "My Vault"
                    ? "bg-indigo-600/20 text-white"
                    : "hover:bg-white/5"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="ml-64 flex min-h-screen flex-1">
          <section className="flex-1 px-8 py-6">
            <div className="mb-8 flex items-center justify-between">
              <div className="relative w-[520px]">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  className="w-full rounded-xl border border-white/10 bg-[#0f1723] px-11 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-indigo-500"
                  placeholder="Search papers, datasets, researchers..."
                />
              </div>

              <button
                onClick={openNewPaperEditor}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold hover:bg-indigo-500"
              >
                <Plus size={17} />
                New
              </button>
            </div>

            <div className="mb-8 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold">Research Vault</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Your complete research journey, in one place.
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={openNewPaperEditor}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold hover:bg-indigo-500"
                  >
                    <Plus size={17} />
                    New Paper
                  </button>

                  <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#101823] px-5 py-3 text-sm hover:bg-white/5">
                    <Upload size={16} />
                    Import
                  </button>

                  <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#101823] px-5 py-3 text-sm hover:bg-white/5">
                    <Folder size={16} />
                    New Folder
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {[
                  ["Total Papers", "27", "+3 this month"],
                  ["Views", "4.2K", "+18% this month"],
                  ["Citations", "128", "+7 this month"],
                  ["h-Index", "6", "+1 this month"],
                ].map(([label, value, change]) => (
                  <div
                    key={label}
                    className="w-44 rounded-2xl border border-white/10 bg-[#101823] p-5"
                  >
                    <p className="text-xs text-slate-400">{label}</p>
                    <h3 className="mt-3 text-3xl font-bold">{value}</h3>
                    <p className="mt-2 text-xs text-emerald-400">{change}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5 flex gap-8 border-b border-white/10 text-sm text-slate-400">
              {["All Papers", "My Papers", "Shared with me", "Starred"].map(
                (tab, index) => (
                  <button
                    key={tab}
                    className={`pb-3 ${
                      index === 0
                        ? "border-b-2 border-indigo-500 text-white"
                        : "hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>

            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  className="w-full rounded-xl border border-white/10 bg-[#101823] px-10 py-3 text-sm outline-none placeholder:text-slate-500"
                  placeholder="Search in your vault..."
                />
              </div>

              {["Status", "Visibility", "Type", "Tags"].map((filter) => (
                <button
                  key={filter}
                  className="rounded-xl border border-white/10 bg-[#101823] px-4 py-3 text-sm text-slate-300"
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {papers.map((paper) => (
                <button
                  key={paper.id}
                  onClick={() => openExistingPaper(paper)}
                  className="w-full rounded-xl border border-white/10 bg-[#101823] p-4 text-left transition hover:border-indigo-500/60 hover:bg-[#121d2b]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <FileText size={24} />
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-white">
                            {paper.title}
                          </h3>

                          <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
                            {paper.status}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-400">
                          {paper.updatedAt}
                        </p>

                        <div className="mt-2 flex gap-2">
                          {paper.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-7 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Eye size={15} />
                        {paper.views}
                      </span>
                      <span>{paper.citations}</span>
                      <span className="flex items-center gap-1">
                        <Star size={15} />
                        {paper.stars}
                      </span>
                      <MoreVertical size={18} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="w-80 border-l border-white/10 bg-[#0d141f] px-5 py-24">
            <div className="rounded-2xl border border-white/10 bg-[#101823] p-5">
              <h3 className="mb-5 font-semibold">Create New</h3>

              <div className="space-y-4">
                {[
                  ["New Paper", "Start writing a new research paper"],
                  ["New Note", "Capture ideas and notes"],
                  ["Import from Overleaf", "Import .tex files and continue"],
                  ["Upload Document", "Upload and manage documents"],
                ].map(([title, desc]) => (
                  <button
                    key={title}
                    onClick={title === "New Paper" ? openNewPaperEditor : undefined}
                    className="flex w-full gap-3 rounded-xl p-2 text-left hover:bg-white/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className="text-xs text-slate-400">{desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-[#101823] p-5">
              <h3 className="mb-4 font-semibold">AI Research Assistant</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <p>Summarize a paper</p>
                <p>Find related work</p>
                <p>Improve writing</p>
                <p>Suggest references</p>
              </div>
              <button className="mt-5 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold hover:bg-indigo-500">
                Open Assistant
              </button>
            </div>
          </aside>
        </main>
      </div>

      {isEditorOpen && (
        <ResearchEditor
          paper={activePaper}
          onClose={() => setIsEditorOpen(false)}
          onSave={(paperData) => {
            if (activePaper) {
              setPapers((prev) =>
                prev.map((paper) =>
                  paper.id === activePaper.id ? { ...paper, ...paperData } : paper,
                ),
              );
            } else {
              setPapers((prev) => [
                {
                  id: crypto.randomUUID(),
                  title: paperData.title,
                  abstract: paperData.abstract,
                  content: paperData.content,
                  visibility: paperData.visibility,
                  status: "Draft",
                  updatedAt: "Updated just now",
                  views: 0,
                  citations: 0,
                  stars: 0,
                  tags: [],
                },
                ...prev,
              ]);
            }

            setIsEditorOpen(false);
          }}
        />
      )}
    </div>
  );
}

function ResearchEditor({
  paper,
  onClose,
  onSave,
}: {
  paper: Paper | null;
  onClose: () => void;
  onSave: (paper: {
    title: string;
    abstract: string;
    content: string;
    visibility: PaperVisibility;
  }) => void;
}) {
  const [title, setTitle] = useState(paper?.title ?? "");
  const [abstract, setAbstract] = useState(paper?.abstract ?? "");
  const [content, setContent] = useState(paper?.content ?? "");
  const [visibility, setVisibility] = useState<PaperVisibility>(
    paper?.visibility ?? "PRIVATE",
  );
  const [preview, setPreview] = useState(false);

  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm">
      <div className="mx-auto flex h-screen max-w-6xl flex-col bg-[#0b111a]">
        <header className="flex items-center justify-between border-b border-white/10 px-8 py-5">
          <div>
            <p className="text-sm text-slate-400">
              {paper ? "Edit Research Paper" : "New Research Paper"}
            </p>
            <h2 className="text-xl font-semibold">Research Editor</h2>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as PaperVisibility)}
              className="rounded-xl border border-white/10 bg-[#101823] px-4 py-2 text-sm outline-none"
            >
              <option value="PRIVATE">Private</option>
              <option value="SHARED">Shared</option>
              <option value="PUBLIC">Public</option>
            </select>

            <button
              onClick={() => setPreview((prev) => !prev)}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            >
              {preview ? "Write" : "Preview"}
            </button>

            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              onClick={() =>
                onSave({
                  title,
                  abstract,
                  content,
                  visibility,
                })
              }
              className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold hover:bg-indigo-500"
            >
              Save Draft
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-12 py-8">
          <div className="mx-auto max-w-4xl">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Research Paper"
              className="mb-6 w-full bg-transparent text-4xl font-bold outline-none placeholder:text-slate-600"
            />

            <textarea
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Write your abstract here..."
              className="mb-6 min-h-28 w-full resize-none rounded-2xl border border-white/10 bg-[#101823] p-5 text-sm leading-7 outline-none placeholder:text-slate-500 focus:border-indigo-500"
            />

            <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
              <div className="flex items-center gap-4">
                <span>
                  {visibility === "PRIVATE" && <Lock size={15} className="inline mr-1" />}
                  {visibility === "SHARED" && <Users size={15} className="inline mr-1" />}
                  {visibility === "PUBLIC" && <Globe size={15} className="inline mr-1" />}
                  {visibility}
                </span>
                <span>{wordCount} words</span>
              </div>

              <span>Markdown supported</span>
            </div>

            {preview ? (
              <div className="min-h-[500px] rounded-2xl border border-white/10 bg-[#101823] p-6 leading-8 text-slate-200">
                {content || "Nothing to preview yet."}
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Start writing your research paper...

## Introduction

## Methodology

## Results

## Discussion

## References`}
                className="min-h-[520px] w-full resize-none rounded-2xl border border-white/10 bg-[#101823] p-6 font-mono text-sm leading-8 outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}