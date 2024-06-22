/*
  Warnings:

  - Added the required column `essentialValidators` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalValidators` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "essentialValidators" INTEGER NOT NULL,
ADD COLUMN     "totalValidators" INTEGER NOT NULL;
