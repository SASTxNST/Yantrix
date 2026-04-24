import { PrismaClient } from "@prisma/client";
import { ResearchPaper } from "../../core/entities/ResearchPaper.entity.js";
import { IResearchPaperRepository } from "../../core/interfaces/IResearchPaperRepository.js";
import { CreatePaperDTO } from "../../application/dtos/research/CreatePaperDTO.js";
import { UpdatePaperDTO } from "../../application/dtos/research/UpdatePaperDTO.js";

export class ResearchPaperRepository implements IResearchPaperRepository {
  constructor(private prisma: PrismaClient) {}

  private toEntity(paper: any): ResearchPaper {
    return new ResearchPaper(
      paper.id,
      paper.title,
      paper.authorId,
      paper.visibility,
      paper.abstract,
      paper.content,
      paper.folderId,
      paper.createdAt,
      paper.updatedAt,
    );
  }

  async create(authorId: string, data: CreatePaperDTO): Promise<ResearchPaper> {
    const paper = await this.prisma.researchPaper.create({
      data: {
        title: data.title,
        abstract: data.abstract,
        content: data.content,
        folderId: data.folderId,
        visibility: data.visibility ?? "PRIVATE",
        authorId,

        tags: data.tagIds?.length
          ? {
              create: data.tagIds.map((tagId) => ({
                tag: {
                  connect: { id: tagId },
                },
              })),
            }
          : undefined,
      },
    });

    return this.toEntity(paper);
  }

  async update(id: string, data: UpdatePaperDTO): Promise<ResearchPaper> {
    const paper = await this.prisma.researchPaper.update({
      where: { id },
      data: {
        title: data.title,
        abstract: data.abstract,
        content: data.content,
        folderId: data.folderId,
        visibility: data.visibility,

        tags: data.tagIds
          ? {
              deleteMany: {},
              create: data.tagIds.map((tagId) => ({
                tag: {
                  connect: { id: tagId },
                },
              })),
            }
          : undefined,
      },
    });

    return this.toEntity(paper);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.researchPaper.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<ResearchPaper | null> {
    const paper = await this.prisma.researchPaper.findUnique({
      where: { id },
    });

    return paper ? this.toEntity(paper) : null;
  }

  async findByAuthorId(authorId: string): Promise<ResearchPaper[]> {
    const papers = await this.prisma.researchPaper.findMany({
      where: { authorId },
      orderBy: { updatedAt: "desc" },
    });

    return papers.map((paper) => this.toEntity(paper));
  }

  async findPublicPapers(): Promise<ResearchPaper[]> {
    const papers = await this.prisma.researchPaper.findMany({
      where: { visibility: "PUBLIC" },
      orderBy: { updatedAt: "desc" },
    });

    return papers.map((paper) => this.toEntity(paper));
  }

  async findByFolderId(folderId: string): Promise<ResearchPaper[]> {
    const papers = await this.prisma.researchPaper.findMany({
      where: { folderId },
      orderBy: { updatedAt: "desc" },
    });

    return papers.map((paper) => this.toEntity(paper));
  }
}