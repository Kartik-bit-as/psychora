/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Topic` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `difficulty` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- DropIndex
DROP INDEX "Subject_title_key";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "completedAt",
DROP COLUMN "createdAt",
DROP COLUMN "difficulty",
DROP COLUMN "updatedAt";

-- Remove old string default first
ALTER TABLE "Quiz"
ALTER COLUMN "difficulty" DROP DEFAULT;

-- Convert existing values to enum
ALTER TABLE "Quiz"
ALTER COLUMN "difficulty"
TYPE "DifficultyLevel"
USING (
  CASE
    WHEN difficulty = 'beginner' THEN 'BEGINNER'::"DifficultyLevel"
    WHEN difficulty = 'intermediate' THEN 'INTERMEDIATE'::"DifficultyLevel"
    WHEN difficulty = 'advanced' THEN 'ADVANCED'::"DifficultyLevel"
    ELSE 'BEGINNER'::"DifficultyLevel"
  END
);

-- Optional: set new enum default
ALTER TABLE "Quiz"
ALTER COLUMN "difficulty"
SET DEFAULT 'BEGINNER';

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "difficulty" "DifficultyLevel" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
