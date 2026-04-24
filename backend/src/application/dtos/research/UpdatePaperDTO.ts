import { ResearchVisibility } from "../../../core/types/research.types.js";

export interface UpdatePaperDTO {
  title?: string;
  abstract?: string;
  content?: string;
  folderId?: string | null;
  visibility?: ResearchVisibility;
  tagIds?: string[];
}