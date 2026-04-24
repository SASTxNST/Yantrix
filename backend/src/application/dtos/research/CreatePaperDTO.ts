import { ResearchVisibility } from "../../../core/types/research.types.js";

export interface CreatePaperDTO {
  title: string;
  abstract?: string;
  content?: string;
  folderId?: string;
  visibility?: ResearchVisibility;
  tagIds?: string[];
}