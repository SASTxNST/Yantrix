import { CollaboratorRole, ResearchVisibility } from "../types/research.types";

export class ResearchPaper {
  constructor(
    public id: string,
    public title: string,
    public authorId: string,
    public visibility: ResearchVisibility,
    public abstract?: string | null,
    public content?: string | null,
    public folderId?: string | null,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  isPrivate(): boolean {
    return this.visibility === "PRIVATE";
  }

  isPublic(): boolean {
    return this.visibility === "PUBLIC";
  }

  canBeEditedBy(userId: string, role?: CollaboratorRole): boolean {
    return (
      this.authorId === userId ||
      role === "OWNER" ||
      role === "EDITOR"
    );
  }
}