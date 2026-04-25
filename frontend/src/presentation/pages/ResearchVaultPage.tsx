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
  LayoutTemplate,
  Link,
  Copy,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  ResearchService,
  type ResearchPaper as ApiResearchPaper,
} from "../../application/services/ResearchService";

type PaperVisibility = "PRIVATE" | "PUBLIC" | "TEAM_ONLY" | "SHARED_LINK";

type Paper = {
  id: string;
  title: string;
  abstract: string;
  content: string;
  visibility: PaperVisibility;
  shareToken?: string | null;
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

type TemplateKey = "ieee" | "arxiv" | "thesis" | "mission" | "technical";

const researchTemplates: Record<
  TemplateKey,
  {
    label: string;
    description: string;
    title: string;
    abstract: string;
    content: string;
  }
> = {
  ieee: {
    label: "IEEE Paper",
    description: "Structured academic research paper format.",
    title: "IEEE Research Paper",
    abstract:
      "Write a concise summary of the problem, methodology, results, and conclusion.",
    content: `# IEEE Research Paper Title

## Abstract

Write a concise summary of the problem, methodology, results, and conclusion.

## Keywords

keyword one, keyword two, keyword three

## I. Introduction

Introduce the research problem, motivation, background, and contribution.

## II. Related Work

Discuss previous work, existing methods, and research gaps.

## III. Methodology

Explain the proposed approach, system design, algorithms, and workflow.

## IV. Experimental Setup

Describe datasets, tools, hardware, software, and evaluation metrics.

## V. Results and Discussion

Present results, charts, comparisons, observations, and analysis.

Example equation:

$$
E = mc^2
$$

## VI. Conclusion

Summarize findings, limitations, and future scope.

## References

[1] Add reference here.`,
  },

  arxiv: {
    label: "arXiv Format",
    description: "Preprint-style research format.",
    title: "arXiv Research Paper",
    abstract:
      "Provide a clear abstract describing the research contribution and findings.",
    content: `# arXiv Research Paper Title

## Abstract

Provide a clear abstract describing the research contribution and findings.

## 1. Introduction

Explain the problem, motivation, and main contribution.

## 2. Background

Explain required concepts, theory, and domain context.

## 3. Related Work

Compare existing research and identify gaps.

## 4. Method

Describe the proposed method in detail.

## 5. Experiments

Describe datasets, baselines, experimental settings, and metrics.

## 6. Results

Present key findings and analysis.

## 7. Limitations

Discuss limitations and possible failure cases.

## 8. Conclusion

Summarize contribution and future directions.

## References

Add references here.`,
  },

  thesis: {
    label: "Thesis",
    description: "Long-form academic thesis structure.",
    title: "Thesis Document",
    abstract:
      "Summarize the research problem, objectives, methodology, results, and contribution.",
    content: `# Thesis Title

## Declaration

Add declaration here.

## Acknowledgements

Add acknowledgements here.

## Abstract

Summarize the research problem, objectives, methodology, results, and contribution.

## Chapter 1: Introduction

### 1.1 Background

### 1.2 Problem Statement

### 1.3 Objectives

### 1.4 Scope of Work

## Chapter 2: Literature Review

Discuss existing work and research gaps.

## Chapter 3: Methodology

Explain research design, methods, tools, and process.

## Chapter 4: Implementation

Describe system implementation and technical details.

## Chapter 5: Results and Analysis

Present results, observations, and evaluation.

## Chapter 6: Conclusion and Future Work

Summarize the thesis and future improvements.

## References

Add references here.

## Appendices

Add appendix material here.`,
  },

  mission: {
    label: "Mission Report",
    description: "Best for satellite, robotics, and space missions.",
    title: "Mission Report",
    abstract:
      "Summarize the mission objective, system design, execution, findings, and outcome.",
    content: `# Mission Report

## Mission Overview

Describe the mission, background, and purpose.

## Mission Objectives

- Objective 1
- Objective 2
- Objective 3

## System Architecture

Explain the full system architecture.

## Payload Description

Describe payload, sensors, modules, and mission role.

## Hardware Components

List and explain hardware components.

## Software Components

Describe software stack, firmware, dashboard, and backend systems.

## Communication System

Explain transmission, receiving, protocols, and data flow.

## Test Procedure

Describe testing stages and validation process.

## Observations

Record mission observations.

## Data Collected

Describe collected data and its meaning.

## Results

Explain results and performance.

## Challenges Faced

Mention technical and operational challenges.

## Conclusion

Summarize mission outcome.

## Future Improvements

Mention next version improvements.`,
  },

  technical: {
    label: "Technical Documentation",
    description: "For software, APIs, systems, and engineering docs.",
    title: "Technical Documentation",
    abstract:
      "Summarize the system, architecture, implementation details, and usage.",
    content: `# Technical Documentation

## Overview

Explain what this system/project does.

## Problem Statement

Describe the problem being solved.

## System Architecture

Explain architecture, modules, and data flow.

## Tech Stack

- Frontend:
- Backend:
- Database:
- Deployment:

## Installation

\`\`\`bash
npm install
\`\`\`

## Environment Variables

\`\`\`env
DATABASE_URL=
PORT=
JWT_SECRET=
\`\`\`

## API Documentation

### Endpoint Name

\`\`\`http
GET /api/example
\`\`\`

## Database Schema

Explain main database models and relations.

## Core Modules

Describe important modules and responsibilities.

## Workflow

Explain user/system workflow step by step.

## Testing

Explain test strategy and commands.

## Deployment

Explain deployment process.

## Limitations

Mention current limitations.

## Future Scope

Mention planned improvements.`,
  },
};

const featuredTemplateKeys: TemplateKey[] = ["ieee", "mission", "technical"];

function getVisibilityLabel(visibility: PaperVisibility): string {
  const labels: Record<PaperVisibility, string> = {
    PRIVATE: "Private",
    PUBLIC: "Public",
    TEAM_ONLY: "Team Only",
    SHARED_LINK: "Shared via Link",
  };

  return labels[visibility];
}

function getVisibilityIcon(visibility: PaperVisibility) {
  if (visibility === "PRIVATE") return Lock;
  if (visibility === "PUBLIC") return Globe;
  if (visibility === "TEAM_ONLY") return Users;
  return Link;
}

function mapApiPaperToPaper(paper: ApiResearchPaper): Paper {
  return {
    id: paper.id,
    title: paper.title,
    abstract: paper.abstract ?? "",
    content: paper.content ?? "",
    visibility: paper.visibility,
    shareToken: paper.shareToken ?? null,
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
  const [selectedTemplateKey, setSelectedTemplateKey] =
    useState<TemplateKey | null>(null);
  const [showTemplatesSection, setShowTemplatesSection] = useState(false);

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
    setSelectedTemplateKey(null);
    setActivePaper(null);
    setIsEditorOpen(true);
  };

  const openTemplateEditor = (templateKey: TemplateKey) => {
    setPageMessage("");
    setSelectedTemplateKey(templateKey);
    setActivePaper(null);
    setIsEditorOpen(true);
  };

  const openExistingPaper = (paper: Paper) => {
    setPageMessage("");
    setSelectedTemplateKey(null);
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

      savedPaper = await ResearchService.updateVisibility(
        savedPaper.id,
        paperData.visibility,
      );

      const mappedPaper = mapApiPaperToPaper(savedPaper);

      setActivePaper(mappedPaper);
      setSelectedTemplateKey(null);
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
                onClick={() => {
                  if (item === "Templates") setShowTemplatesSection(true);
                  if (item === "Research Vault") setShowTemplatesSection(false);
                }}
                className={`w-full rounded-xl px-3 py-2 text-left transition ${
                  (item === "Research Vault" && !showTemplatesSection) ||
                  (item === "Templates" && showTemplatesSection)
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
                  placeholder="Search papers, templates, datasets..."
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
              <div>
                <h2 className="text-3xl font-bold">
                  {showTemplatesSection ? "Research Templates" : "Research Vault"}
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  {showTemplatesSection
                    ? "Start faster with structured formats for papers, missions, thesis, and documentation."
                    : "Create, manage, autosave, and control visibility of your research papers."}
                </p>
              </div>

              {pageMessage && (
                <p className="rounded-xl border border-white/10 bg-[#101823] px-4 py-2 text-sm text-slate-300">
                  {pageMessage}
                </p>
              )}
            </div>

            {showTemplatesSection ? (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {(Object.keys(researchTemplates) as TemplateKey[]).map((key) => {
                  const template = researchTemplates[key];

                  return (
                    <button
                      key={key}
                      onClick={() => openTemplateEditor(key)}
                      className="rounded-2xl border border-white/10 bg-[#101823] p-5 text-left transition hover:border-indigo-500/60 hover:bg-[#121d2b]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                          <LayoutTemplate size={22} />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold">
                            {template.label}
                          </h3>
                          <p className="mt-2 text-sm text-slate-400">
                            {template.description}
                          </p>
                          <p className="mt-4 text-xs text-indigo-300">
                            Use this template
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Featured Templates</h3>
                    <button
                      onClick={() => setShowTemplatesSection(true)}
                      className="text-sm text-indigo-300 hover:text-indigo-200"
                    >
                      View all templates
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                    {featuredTemplateKeys.map((key) => {
                      const template = researchTemplates[key];

                      return (
                        <button
                          key={key}
                          onClick={() => openTemplateEditor(key)}
                          className="rounded-2xl border border-white/10 bg-[#101823] p-5 text-left transition hover:border-indigo-500/60 hover:bg-[#121d2b]"
                        >
                          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                            <LayoutTemplate size={20} />
                          </div>

                          <h4 className="font-semibold">{template.label}</h4>
                          <p className="mt-2 text-sm text-slate-400">
                            {template.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {loading ? (
                  <div className="rounded-2xl border border-white/10 bg-[#101823] p-10 text-center text-slate-400">
                    Loading papers...
                  </div>
                ) : papers.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-[#101823] p-10 text-center">
                    <p className="text-lg font-semibold">No papers yet</p>
                    <p className="mt-2 text-sm text-slate-400">
                      Create your first research paper or start from a template.
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
                    {papers.map((paper) => {
                      const VisibilityIcon = getVisibilityIcon(paper.visibility);

                      return (
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
                                  <span className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-xs">
                                    <VisibilityIcon size={12} />
                                    {getVisibilityLabel(paper.visibility)}
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
                      );
                    })}
                  </div>
                )}
              </>
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

            <div className="mt-5 rounded-2xl border border-white/10 bg-[#101823] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Featured Templates</h3>
                <button
                  onClick={() => setShowTemplatesSection(true)}
                  className="text-xs text-indigo-300 hover:text-indigo-200"
                >
                  All
                </button>
              </div>

              <div className="space-y-3">
                {featuredTemplateKeys.map((key) => {
                  const template = researchTemplates[key];

                  return (
                    <button
                      key={key}
                      onClick={() => openTemplateEditor(key)}
                      className="flex w-full gap-3 rounded-xl p-2 text-left hover:bg-white/5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                        <LayoutTemplate size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-medium">{template.label}</p>
                        <p className="text-xs text-slate-400">
                          {template.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </main>
      </div>

      {isEditorOpen && (
        <ResearchEditor
          paper={activePaper}
          initialTemplateKey={selectedTemplateKey}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSavePaper}
        />
      )}
    </div>
  );
}

function ResearchEditor({
  paper,
  initialTemplateKey,
  onClose,
  onSave,
}: {
  paper: Paper | null;
  initialTemplateKey: TemplateKey | null;
  onClose: () => void;
  onSave: (paper: SavePaperPayload, options?: SaveOptions) => Promise<Paper>;
}) {
  const initialTemplate = initialTemplateKey
    ? researchTemplates[initialTemplateKey]
    : null;

  const [title, setTitle] = useState(
    paper?.title ?? initialTemplate?.title ?? "",
  );
  const [abstract, setAbstract] = useState(
    paper?.abstract ?? initialTemplate?.abstract ?? "",
  );
  const [content, setContent] = useState(
    paper?.content ?? initialTemplate?.content ?? "",
  );
  const [visibility, setVisibility] = useState<PaperVisibility>(
    paper?.visibility ?? "PRIVATE",
  );
  const [shareToken, setShareToken] = useState<string | null>(
    paper?.shareToken ?? null,
  );
  const [preview, setPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState(
    initialTemplate ? "Template applied. Unsaved changes" : "Ready",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(
    Boolean(initialTemplate),
  );
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [savedPaperId, setSavedPaperId] = useState<string | null>(
    paper?.id ?? null,
  );

  const draftKey = savedPaperId
    ? `research-draft-${savedPaperId}`
    : "research-draft-new";

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const isTitleValid = title.trim().length > 0;
  const sharedLink =
    shareToken && visibility === "SHARED_LINK"
      ? `${window.location.origin}/research/shared/${shareToken}`
      : "";

  const applyTemplate = (templateKey: TemplateKey) => {
    const template = researchTemplates[templateKey];

    setTitle(template.title);
    setAbstract(template.abstract);
    setContent(template.content);
    setHasUnsavedChanges(true);
    setSaveStatus(`${template.label} template applied. Unsaved changes`);
  };

  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);

    if (!savedDraft || initialTemplate) return;

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
  }, [draftKey, paper, initialTemplate]);

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
        setShareToken(savedPaper.shareToken ?? null);
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
      setShareToken(savedPaper.shareToken ?? null);
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

  const handleCopyShareLink = async () => {
    if (!sharedLink) {
      setSaveStatus("Save with Shared via Link visibility first.");
      return;
    }

    await navigator.clipboard.writeText(sharedLink);
    setSaveStatus("Share link copied");
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
                      saveStatus.includes("Saved") ||
                      saveStatus.includes("copied")
                    ? "text-emerald-400"
                    : "text-slate-400"
              }`}
            >
              {saveStatus} · {lastSavedText}
            </p>
          </div>

          <div className="flex gap-3">
            <select
              defaultValue=""
              onChange={(e) => {
                const value = e.target.value as TemplateKey | "";
                if (value) {
                  applyTemplate(value);
                  e.target.value = "";
                }
              }}
              disabled={isSaving}
              className="rounded-xl border border-white/10 bg-[#101823] px-4 py-2 text-sm"
            >
              <option value="">Templates</option>
              {(Object.keys(researchTemplates) as TemplateKey[]).map((key) => (
                <option key={key} value={key}>
                  {researchTemplates[key].label}
                </option>
              ))}
            </select>

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
              <option value="PUBLIC">Public</option>
              <option value="TEAM_ONLY">Team Only</option>
              <option value="SHARED_LINK">Shared via Link</option>
            </select>

            {visibility === "SHARED_LINK" && (
              <button
                onClick={handleCopyShareLink}
                disabled={isSaving || !sharedLink}
                className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Copy size={15} />
                Copy Link
              </button>
            )}

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

            {visibility === "SHARED_LINK" && (
              <div className="mb-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-sm text-indigo-100">
                <p className="font-medium">Shared via Link</p>
                <p className="mt-1 text-indigo-200/80">
                  Anyone with the generated link can view this paper.
                </p>

                {sharedLink ? (
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-black/20 px-3 py-2 text-xs text-slate-300">
                    <span className="truncate">{sharedLink}</span>
                    <button
                      onClick={handleCopyShareLink}
                      className="text-indigo-300 hover:text-indigo-200"
                    >
                      Copy
                    </button>
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-slate-400">
                    Save the paper once to generate the share link.
                  </p>
                )}
              </div>
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
                  {visibility === "PUBLIC" && (
                    <Globe size={15} className="mr-1 inline" />
                  )}
                  {visibility === "TEAM_ONLY" && (
                    <Users size={15} className="mr-1 inline" />
                  )}
                  {visibility === "SHARED_LINK" && (
                    <Link size={15} className="mr-1 inline" />
                  )}
                  {getVisibilityLabel(visibility)}
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