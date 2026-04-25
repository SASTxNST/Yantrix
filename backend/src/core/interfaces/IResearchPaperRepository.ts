import { ResearchPaper } from "../entities/ResearchPaper.entity.js";
import { CreatePaperDTO } from "../../application/dtos/research/CreatePaperDTO.js";
import { UpdatePaperDTO } from "../../application/dtos/research/UpdatePaperDTO.js";
import {
  CollaboratorRole,
  ResearchVisibility,
} from "../types/research.types.js";

export interface ResearchCollaboratorAccess {
  id: string;
  paperId: string;
  userId: string;
  role: CollaboratorRole;
}

export interface IResearchPaperRepository {
  create(authorId: string, data: CreatePaperDTO): Promise<ResearchPaper>;

  findById(id: string): Promise<ResearchPaper | null>;

  findByAuthorId(authorId: string): Promise<ResearchPaper[]>;

  findPublicPapers(): Promise<ResearchPaper[]>;

  findByFolderId(folderId: string): Promise<ResearchPaper[]>;

  findByShareToken(shareToken: string): Promise<ResearchPaper | null>;

  findCollaboratorByPaperAndUser(
    paperId: string,
    userId: string,
  ): Promise<ResearchCollaboratorAccess | null>;

  update(id: string, data: UpdatePaperDTO): Promise<ResearchPaper>;

  updateVisibility(
    id: string,
    visibility: ResearchVisibility,
    shareToken?: string | null,
  ): Promise<ResearchPaper>;

  delete(id: string): Promise<void>;
}