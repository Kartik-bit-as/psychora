import {
    DifficultyLevel,
    PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

export const getRecommendedDifficulty = (
  score: number
): DifficultyLevel => {

  if (score >= 80) {
    return "ADVANCED";
  }

  if (score >= 50) {
    return "INTERMEDIATE";
  }

  return "BEGINNER";
};

export const getNextQuizRecommendation = async (
  topicId: string,
  score: number
) => {

  const difficulty =
    getRecommendedDifficulty(score);

  const nextQuiz =
    await prisma.quiz.findFirst({

      where: {
        topicId,
        difficulty
      },

      select: {
        id: true,
        title: true,
        difficulty: true
      }

    });

  return {
    recommendedDifficulty:
      difficulty,

    nextQuiz
  };
};
