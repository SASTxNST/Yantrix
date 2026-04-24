import { CreatePaperDTO } from "../dtos/research/CreatePaperDTO.js";
import { UpdatePaperDTO } from "../dtos/research/UpdatePaperDTO.js";
import { ResearchPaper } from "../../core/entities/ResearchPaper.entity.js";
import { IResearchPaperRepository } from "../../core/interfaces/IResearchPaperRepository.js";
import { AppError } from "../../shared/error/AppError.js";

export class ResearchPaperService {
  constructor(private researchPaperRepository: IResearchPaperRepository) {}

  async createPaper(
    authorId: string,
    data: CreatePaperDTO,
  ): Promise<ResearchPaper> {
    if (!data.title || data.title.trim().length === 0) {
      throw new AppError("Paper title is required", 400);
    }

    return this.researchPaperRepository.create(authorId, {
      ...data,
      title: data.title.trim(),
      visibility: data.visibility ?? "PRIVATE",
    });
  }

  async getPaperById(
    paperId: string,
    userId?: string,
  ): Promise<ResearchPaper> {
    const paper = await this.researchPaperRepository.findById(paperId);

    if (!paper) {
      throw new AppError("Research paper not found", 404);
    }

    if (paper.visibility === "PUBLIC") {
      return paper;
    }

    if (!userId) {
      throw new AppError("Authentication required", 401);
    }

    if (paper.authorId === userId) {
      return paper;
    }

    const collaborator =
      await this.researchPaperRepository.findCollaboratorByPaperAndUser(
        paperId,
        userId,
      );

    if (!collaborator) {
      throw new AppError("You do not have access to this paper", 403);
    }

    return paper;
  }

  async listUserPapers(userId: string): Promise<ResearchPaper[]> {
    return this.researchPaperRepository.findByAuthorId(userId);
  }

  async updatePaper(
    paperId: string,
    userId: string,
    data: UpdatePaperDTO,
  ): Promise<ResearchPaper> {
    const paper = await this.researchPaperRepository.findById(paperId);

    if (!paper) {
      throw new AppError("Research paper not found", 404);
    }

    const canEdit = await this.canUserEditPaper(paperId, userId, paper.authorId);

    if (!canEdit) {
      throw new AppError("You do not have permission to edit this paper", 403);
    }

    if (data.title !== undefined && data.title.trim().length === 0) {
      throw new AppError("Paper title cannot be empty", 400);
    }

    return this.researchPaperRepository.update(paperId, {
      ...data,
      title: data.title?.trim(),
    });
  }

  async deletePaper(paperId: string, userId: string): Promise<void> {
    const paper = await this.researchPaperRepository.findById(paperId);

    if (!paper) {
      throw new AppError("Research paper not found", 404);
    }

    if (paper.authorId !== userId) {
      throw new AppError("Only the owner can delete this paper", 403);
    }

    await this.researchPaperRepository.delete(paperId);
  }

  async changeVisibility(
    paperId: string,
    userId: string,
    visibility: "PRIVATE" | "SHARED" | "PUBLIC",
  ): Promise<ResearchPaper> {
    const paper = await this.researchPaperRepository.findById(paperId);

    if (!paper) {
      throw new AppError("Research paper not found", 404);
    }

    if (paper.authorId !== userId) {
      throw new AppError("Only the owner can change visibility", 403);
    }

    return this.researchPaperRepository.update(paperId, { visibility });
  }

  private async canUserEditPaper(
    paperId: string,
    userId: string,
    authorId: string,
  ): Promise<boolean> {
    if (authorId === userId) {
      return true;
    }

    const collaborator =
      await this.researchPaperRepository.findCollaboratorByPaperAndUser(
        paperId,
        userId,
      );

    return collaborator?.role === "OWNER" || collaborator?.role === "EDITOR";
  }
}