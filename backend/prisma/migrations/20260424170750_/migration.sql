-- CreateEnum
CREATE TYPE "public"."ResearchVisibility" AS ENUM ('PRIVATE', 'SHARED', 'PUBLIC');

-- CreateEnum
CREATE TYPE "public"."CollaboratorRole" AS ENUM ('OWNER', 'EDITOR', 'VIEWER', 'COMMENTER');

-- CreateTable
CREATE TABLE "public"."ResearchFolder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResearchPaper" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT,
    "content" TEXT,
    "visibility" "public"."ResearchVisibility" NOT NULL DEFAULT 'PRIVATE',
    "authorId" TEXT NOT NULL,
    "folderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchPaper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResearchCollaborator" (
    "id" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "public"."CollaboratorRole" NOT NULL DEFAULT 'VIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchCollaborator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResearchTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResearchPaperTag" (
    "id" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ResearchPaperTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResearchVersionHistory" (
    "id" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT,
    "content" TEXT,
    "version" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResearchVersionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ResearchFolder_ownerId_idx" ON "public"."ResearchFolder"("ownerId");

-- CreateIndex
CREATE INDEX "ResearchPaper_authorId_idx" ON "public"."ResearchPaper"("authorId");

-- CreateIndex
CREATE INDEX "ResearchPaper_folderId_idx" ON "public"."ResearchPaper"("folderId");

-- CreateIndex
CREATE INDEX "ResearchPaper_visibility_idx" ON "public"."ResearchPaper"("visibility");

-- CreateIndex
CREATE INDEX "ResearchCollaborator_paperId_idx" ON "public"."ResearchCollaborator"("paperId");

-- CreateIndex
CREATE INDEX "ResearchCollaborator_userId_idx" ON "public"."ResearchCollaborator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchCollaborator_paperId_userId_key" ON "public"."ResearchCollaborator"("paperId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchTag_name_key" ON "public"."ResearchTag"("name");

-- CreateIndex
CREATE INDEX "ResearchPaperTag_paperId_idx" ON "public"."ResearchPaperTag"("paperId");

-- CreateIndex
CREATE INDEX "ResearchPaperTag_tagId_idx" ON "public"."ResearchPaperTag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchPaperTag_paperId_tagId_key" ON "public"."ResearchPaperTag"("paperId", "tagId");

-- CreateIndex
CREATE INDEX "ResearchVersionHistory_paperId_idx" ON "public"."ResearchVersionHistory"("paperId");

-- CreateIndex
CREATE INDEX "ResearchVersionHistory_createdBy_idx" ON "public"."ResearchVersionHistory"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchVersionHistory_paperId_version_key" ON "public"."ResearchVersionHistory"("paperId", "version");

-- AddForeignKey
ALTER TABLE "public"."ResearchFolder" ADD CONSTRAINT "ResearchFolder_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResearchPaper" ADD CONSTRAINT "ResearchPaper_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResearchPaper" ADD CONSTRAINT "ResearchPaper_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "public"."ResearchFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResearchCollaborator" ADD CONSTRAINT "ResearchCollaborator_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "public"."ResearchPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResearchCollaborator" ADD CONSTRAINT "ResearchCollaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResearchPaperTag" ADD CONSTRAINT "ResearchPaperTag_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "public"."ResearchPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResearchPaperTag" ADD CONSTRAINT "ResearchPaperTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."ResearchTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResearchVersionHistory" ADD CONSTRAINT "ResearchVersionHistory_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "public"."ResearchPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResearchVersionHistory" ADD CONSTRAINT "ResearchVersionHistory_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
