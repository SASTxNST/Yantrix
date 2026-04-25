import crypto from "crypto";
import { CreatePaperDTO } from "../dtos/research/CreatePaperDTO.js";
import { UpdatePaperDTO } from "../dtos/research/UpdatePaperDTO.js";
import { ResearchPaper } from "../../core/entities/ResearchPaper.entity.js";
import { IResearchPaperRepository } from "../../core/interfaces/IResearchPaperRepository.js";
import { ResearchVisibility } from "../../core/types/research.types.js";
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

    if (paper.visibility === "TEAM_ONLY") {
      const collaborator =
        await this.researchPaperRepository.findCollaboratorByPaperAndUser(
          paperId,
          userId,
        );

      if (!collaborator) {
        throw new AppError("Only team members can access this paper", 403);
      }

      return paper;
    }

    throw new AppError("You do not have access to this paper", 403);
  }

  async getPaperByShareToken(shareToken: string): Promise<ResearchPaper> {
    const paper = await this.researchPaperRepository.findByShareToken(shareToken);

    if (!paper || paper.visibility !== "SHARED_LINK") {
      throw new AppError("Shared paper not found or link is invalid", 404);
    }

    return paper;
  }

  async listUserPapers(userId: string): Promise<ResearchPaper[]> {
    return this.researchPaperRepository.findByAuthorId(userId);
  }

  async listPublicPapers(): Promise<ResearchPaper[]> {
    return this.researchPaperRepository.findPublicPapers();
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

  async updateVisibility(
    paperId: string,
    userId: string,
    visibility: ResearchVisibility,
  ): Promise<ResearchPaper> {
    const paper = await this.researchPaperRepository.findById(paperId);

    if (!paper) {
      throw new AppError("Research paper not found", 404);
    }

    if (paper.authorId !== userId) {
      throw new AppError("Only the owner can change visibility", 403);
    }

    const shareToken =
      visibility === "SHARED_LINK"
        ? crypto.randomBytes(24).toString("hex")
        : null;

    return this.researchPaperRepository.updateVisibility(
      paperId,
      visibility,
      shareToken,
    );
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