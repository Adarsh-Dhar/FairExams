/*
  Warnings:

  - Changed the type of `applicationDeadline` on the `Exam` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `examDate` on the `Exam` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `examStartTime` on the `Exam` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "applicationDeadline",
ADD COLUMN     "applicationDeadline" INTEGER NOT NULL,
DROP COLUMN "examDate",
ADD COLUMN     "examDate" INTEGER NOT NULL,
DROP COLUMN "examStartTime",
ADD COLUMN     "examStartTime" INTEGER NOT NULL;
