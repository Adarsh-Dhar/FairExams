/*
  Warnings:

  - Added the required column `examId` to the `Problems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problems" ADD COLUMN     "examId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Problems" ADD CONSTRAINT "Problems_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
