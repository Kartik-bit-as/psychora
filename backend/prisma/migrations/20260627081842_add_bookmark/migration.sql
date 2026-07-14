/*
  Warnings:

  - You are about to drop the column `learningMode` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `currentStreak` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastActiveDate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "learningMode",
ALTER COLUMN "difficulty" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "currentStreak",
DROP COLUMN "lastActiveDate";
