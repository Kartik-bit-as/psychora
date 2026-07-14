/*
  Warnings:

  - You are about to drop the column `type` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "difficulty" DROP DEFAULT;
