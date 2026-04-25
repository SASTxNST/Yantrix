/*
  Warnings:

  - A unique constraint covering the columns `[shareToken]` on the table `ResearchPaper` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."ResearchPaper" ADD COLUMN     "shareToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ResearchPaper_shareToken_key" ON "public"."ResearchPaper"("shareToken");

-- CreateIndex
CREATE INDEX "ResearchPaper_shareToken_idx" ON "public"."ResearchPaper"("shareToken");
