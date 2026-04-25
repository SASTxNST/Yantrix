/*
  Warnings:

  - The values [SHARED] on the enum `ResearchVisibility` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ResearchVisibility_new" AS ENUM ('PRIVATE', 'PUBLIC', 'TEAM_ONLY', 'SHARED_LINK');
ALTER TABLE "public"."ResearchPaper" ALTER COLUMN "visibility" DROP DEFAULT;
ALTER TABLE "public"."ResearchPaper" ALTER COLUMN "visibility" TYPE "public"."ResearchVisibility_new" USING ("visibility"::text::"public"."ResearchVisibility_new");
ALTER TYPE "public"."ResearchVisibility" RENAME TO "ResearchVisibility_old";
ALTER TYPE "public"."ResearchVisibility_new" RENAME TO "ResearchVisibility";
DROP TYPE "public"."ResearchVisibility_old";
ALTER TABLE "public"."ResearchPaper" ALTER COLUMN "visibility" SET DEFAULT 'PRIVATE';
COMMIT;
