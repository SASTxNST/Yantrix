import { ResearchPaper } from "../entities/ResearchPaper.entity.js";
import { CreatePaperDTO } from "../../application/dtos/research/CreatePaperDTO.js";
import { UpdatePaperDTO } from "../../application/dtos/research/UpdatePaperDTO.js";
import { CollaboratorRole } from "../types/research.types.js";

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

  findCollaboratorByPaperAndUser(
    paperId: string,
    userId: string,
  ): Promise<ResearchCollaboratorAccess | null>;

  update(id: string, data: UpdatePaperDTO): Promise<ResearchPaper>;

  delete(id: string): Promise<void>;
}