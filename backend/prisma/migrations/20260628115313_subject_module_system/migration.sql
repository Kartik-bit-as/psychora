/*
  Warnings:

  - You are about to drop the column `description` on the `Topic` table. All the data in the column will be lost.
  - Made the column `moduleId` on table `Topic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Topic"
DROP COLUMN "description",
ADD COLUMN "content" TEXT;
