/*
  Warnings:

  - Added the required column `examId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examId` to the `Validator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "examId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Validator" ADD COLUMN     "examId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Validator" ADD CONSTRAINT "Validator_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
