/*
  Warnings:

  - Made the column `moduleId` on table `Topic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "moduleId" SET NOT NULL;
