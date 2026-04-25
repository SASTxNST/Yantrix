// src/presentation/pages/ResearchVaultPage.tsx

import { useEffect, useState } from "react";
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
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  ResearchService,
  type ResearchPaper as ApiResearchPaper,
} from "../../application/services/ResearchService";

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

type SaveOptions = {
  silent?: boolean;
};

type SavePaperPayload = {
  title: string;
  abstract: string;
  content: string;
  visibility: PaperVisibility;
};

function mapApiPaperToPaper(paper: ApiResearchPaper): Paper {
  return {
    id: paper.id,
    title: paper.title,
    abstract: paper.abstract ?? "",
    content: paper.content ?? "",
    visibility: paper.visibility,
    status: paper.visibility === "PUBLIC" ? "Published" : "Draft",
    updatedAt: paper.updatedAt
      ? `Last edited ${new Date(paper.updatedAt).toLocaleString()}`
      : "Updated recently",
    views: 0,
    citations: 0,
    stars: 0,
    tags: [],
  };
}

export default function ResearchVaultPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activePaper, setActivePaper] = useState<Paper | null>(null);
  const [pageMessage, setPageMessage] = useState("");

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const data = await ResearchService.getMyPapers();
      setPapers(data.map(mapApiPaperToPaper));
    } catch (error) {
      console.error("Failed to fetch papers:", error);
      setPageMessage("Failed to load papers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const openNewPaperEditor = () => {
    setPageMessage("");
    setActivePaper(null);
    setIsEditorOpen(true);
  };

  const openExistingPaper = (paper: Paper) => {
    setPageMessage("");
    setActivePaper(paper);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      setPageMessage("Deleting paper...");
      await ResearchService.deletePaper(id);
      await fetchPapers();
      setPageMessage("Paper deleted successfully.");
    } catch (error) {
      console.error(error);
      setPageMessage("Failed to delete paper.");
    }
  };

  const handleSavePaper = async (
    paperData: SavePaperPayload,
    options?: SaveOptions,
  ): Promise<Paper> => {
    try {
      if (!options?.silent) {
        setPageMessage(activePaper ? "Updating paper..." : "Saving paper...");
      }

      let savedPaper: ApiResearchPaper;

      if (activePaper) {
        savedPaper = await ResearchService.updatePaper(activePaper.id, paperData);
      } else {
        savedPaper = await ResearchService.createPaper(paperData);
      }

      const mappedPaper = mapApiPaperToPaper(savedPaper);

      setActivePaper(mappedPaper);
      await fetchPapers();

      if (!options?.silent) {
        setIsEditorOpen(false);
        setPageMessage("Paper saved successfully.");
      }

      return mappedPaper;
    } catch (error) {
      console.error(error);

      if (!options?.silent) {
        setPageMessage("Failed to save paper.");
      }

      throw error;
    }
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
            ].map((item) => (
              <button
                key={item}
                className={`w-full rounded-xl px-3 py-2 text-left transition ${
                  item === "Research Vault"
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
                  placeholder="Search papers..."
                  className="w-full rounded-xl border border-white/10 bg-[#0f1723] px-11 py-3 text-sm outline-none"
                />
              </div>

              <button
                onClick={openNewPaperEditor}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold hover:bg-indigo-500"
              >
                <Plus size={16} />
                New Paper
              </button>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Research Vault</h2>

              {pageMessage && (
                <p className="rounded-xl border border-white/10 bg-[#101823] px-4 py-2 text-sm text-slate-300">
                  {pageMessage}
                </p>
              )}
            </div>

            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-[#101823] p-10 text-center text-slate-400">
                Loading papers...
              </div>
            ) : papers.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#101823] p-10 text-center">
                <p className="text-lg font-semibold">No papers yet</p>
                <p className="mt-2 text-sm text-slate-400">
                  Create your first research paper.
                </p>

                <button
                  onClick={openNewPaperEditor}
                  className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold hover:bg-indigo-500"
                >
                  Create Paper
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {papers.map((paper) => (
                  <div
                    key={paper.id}
                    className="rounded-xl border border-white/10 bg-[#101823] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => openExistingPaper(paper)}
                        className="flex flex-1 items-center gap-4 text-left"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                          <FileText size={22} />
                        </div>

                        <div>
                          <h3 className="font-semibold">{paper.title}</h3>
                          <p className="text-xs text-slate-400">
                            {paper.updatedAt}
                          </p>

                          <div className="mt-2 flex gap-2">
                            <span className="rounded-md bg-white/5 px-2 py-1 text-xs">
                              {paper.visibility}
                            </span>

                            <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
                              {paper.status}
                            </span>
                          </div>
                        </div>
                      </button>

                      <div className="flex items-center gap-5 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Eye size={15} />
                          {paper.views}
                        </span>

                        <span className="flex items-center gap-1">
                          <Star size={15} />
                          {paper.stars}
                        </span>

                        <button
                          onClick={() => handleDelete(paper.id)}
                          className="rounded-lg px-3 py-1 text-red-400 hover:bg-red-500/10"
                        >
                          Delete
                        </button>

                        <MoreVertical size={18} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="w-80 border-l border-white/10 bg-[#0d141f] px-5 py-24">
            <div className="rounded-2xl border border-white/10 bg-[#101823] p-5">
              <h3 className="mb-5 font-semibold">Quick Actions</h3>

              <div className="space-y-4">
                <button
                  onClick={openNewPaperEditor}
                  className="flex w-full gap-3 rounded-xl p-2 text-left hover:bg-white/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Plus size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">New Paper</p>
                    <p className="text-xs text-slate-400">
                      Start writing instantly
                    </p>
                  </div>
                </button>

                <button className="flex w-full gap-3 rounded-xl p-2 text-left hover:bg-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Upload size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Import</p>
                    <p className="text-xs text-slate-400">
                      Upload markdown or docs
                    </p>
                  </div>
                </button>

                <button className="flex w-full gap-3 rounded-xl p-2 text-left hover:bg-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Folder size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">New Folder</p>
                    <p className="text-xs text-slate-400">
                      Organize research work
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </aside>
        </main>
      </div>

      {isEditorOpen && (
        <ResearchEditor
          paper={activePaper}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSavePaper}
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
  onSave: (paper: SavePaperPayload, options?: SaveOptions) => Promise<Paper>;
}) {
  const [title, setTitle] = useState(paper?.title ?? "");
  const [abstract, setAbstract] = useState(paper?.abstract ?? "");
  const [content, setContent] = useState(paper?.content ?? "");
  const [visibility, setVisibility] = useState<PaperVisibility>(
    paper?.visibility ?? "PRIVATE",
  );
  const [preview, setPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Ready");
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [savedPaperId, setSavedPaperId] = useState<string | null>(
    paper?.id ?? null,
  );

  const draftKey = savedPaperId
    ? `research-draft-${savedPaperId}`
    : "research-draft-new";

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const isTitleValid = title.trim().length > 0;

  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);

    if (!savedDraft) return;

    try {
      const parsedDraft = JSON.parse(savedDraft) as Partial<SavePaperPayload>;

      if (!paper) {
        setTitle(parsedDraft.title ?? "");
        setAbstract(parsedDraft.abstract ?? "");
        setContent(parsedDraft.content ?? "");
        setVisibility(parsedDraft.visibility ?? "PRIVATE");
        setHasUnsavedChanges(true);
        setSaveStatus("Recovered local draft");
      }
    } catch {
      localStorage.removeItem(draftKey);
    }
  }, [draftKey, paper]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const timer = window.setTimeout(async () => {
      const draftPayload: SavePaperPayload = {
        title: title.trim(),
        abstract: abstract.trim(),
        content,
        visibility,
      };

      localStorage.setItem(draftKey, JSON.stringify(draftPayload));

      if (!draftPayload.title) {
        setSaveStatus("Local draft saved. Add title to sync.");
        return;
      }

      try {
        setSaveStatus("Autosaving...");

        const savedPaper = await onSave(draftPayload, { silent: true });

        setSavedPaperId(savedPaper.id);
        localStorage.removeItem(draftKey);
        setLastSavedAt(new Date());
        setHasUnsavedChanges(false);
        setSaveStatus("Autosaved");
      } catch (error) {
        console.error(error);
        setSaveStatus("Saved locally. Backend sync failed.");
      }
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [
    title,
    abstract,
    content,
    visibility,
    hasUnsavedChanges,
    draftKey,
    onSave,
  ]);

  const markUnsaved = () => {
    setHasUnsavedChanges(true);
    setSaveStatus("Unsaved changes");
  };

  const handleManualSave = async () => {
    if (!isTitleValid) {
      setSaveStatus("Please enter a title before saving.");
      return;
    }

    try {
      setIsSaving(true);
      setSaveStatus("Saving...");

      const payload: SavePaperPayload = {
        title: title.trim(),
        abstract: abstract.trim(),
        content,
        visibility,
      };

      const savedPaper = await onSave(payload, { silent: false });

      setSavedPaperId(savedPaper.id);
      localStorage.removeItem(draftKey);
      setLastSavedAt(new Date());
      setHasUnsavedChanges(false);
      setSaveStatus("Saved successfully");
    } catch (error) {
      console.error(error);
      setSaveStatus("Save failed. Draft saved locally.");
    } finally {
      setIsSaving(false);
    }
  };

  const lastSavedText = lastSavedAt
    ? `Last saved at ${lastSavedAt.toLocaleTimeString()}`
    : "Not saved yet";

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm">
      <div className="mx-auto flex h-screen max-w-6xl flex-col bg-[#0b111a]">
        <header className="flex items-center justify-between border-b border-white/10 px-8 py-5">
          <div>
            <h2 className="text-xl font-semibold">Research Editor</h2>
            <p
              className={`mt-1 text-sm ${
                saveStatus.includes("failed") ||
                saveStatus.includes("Please") ||
                saveStatus.includes("failed")
                  ? "text-red-400"
                  : saveStatus.includes("Autosaved") ||
                      saveStatus.includes("Saved")
                    ? "text-emerald-400"
                    : "text-slate-400"
              }`}
            >
              {saveStatus} · {lastSavedText}
            </p>
          </div>

          <div className="flex gap-3">
            <select
              value={visibility}
              onChange={(e) => {
                setVisibility(e.target.value as PaperVisibility);
                markUnsaved();
              }}
              disabled={isSaving}
              className="rounded-xl border border-white/10 bg-[#101823] px-4 py-2 text-sm"
            >
              <option value="PRIVATE">Private</option>
              <option value="SHARED">Shared</option>
              <option value="PUBLIC">Public</option>
            </select>

            <button
              onClick={() => setPreview((prev) => !prev)}
              disabled={isSaving}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm"
            >
              {preview ? "Write" : "Preview"}
            </button>

            <button
              onClick={onClose}
              disabled={isSaving}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              onClick={handleManualSave}
              disabled={isSaving || !isTitleValid}
              className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-12 py-8">
          <div className="mx-auto max-w-4xl">
            {!isTitleValid && (
              <p className="mb-3 text-sm text-red-400">
                Title is required to sync this paper with backend.
              </p>
            )}

            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                markUnsaved();
              }}
              disabled={isSaving}
              placeholder="Untitled Research Paper"
              className="mb-6 w-full bg-transparent text-4xl font-bold outline-none"
            />

            <textarea
              value={abstract}
              onChange={(e) => {
                setAbstract(e.target.value);
                markUnsaved();
              }}
              disabled={isSaving}
              placeholder="Write abstract..."
              className="mb-6 min-h-28 w-full rounded-2xl border border-white/10 bg-[#101823] p-5"
            />

            <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
              <div className="flex items-center gap-4">
                <span>
                  {visibility === "PRIVATE" && (
                    <Lock size={15} className="mr-1 inline" />
                  )}
                  {visibility === "SHARED" && (
                    <Users size={15} className="mr-1 inline" />
                  )}
                  {visibility === "PUBLIC" && (
                    <Globe size={15} className="mr-1 inline" />
                  )}
                  {visibility}
                </span>

                <span>{wordCount} words</span>
              </div>

              <span>Markdown + LaTeX supported</span>
            </div>

            {preview ? (
              <div className="prose prose-invert min-h-[500px] max-w-none rounded-2xl border border-white/10 bg-[#101823] p-6">
                {content ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {content}
                  </ReactMarkdown>
                ) : (
                  <p>Nothing to preview.</p>
                )}
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  markUnsaved();
                }}
                disabled={isSaving}
                placeholder={`## Introduction

Inline equation:
$E = mc^2$

Block equation:

$$
F = G \\frac{m_1 m_2}{r^2}
$$`}
                className="min-h-[520px] w-full rounded-2xl border border-white/10 bg-[#101823] p-6 font-mono"
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}