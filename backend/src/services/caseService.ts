import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCaseByTopic = async (
  topicId: string
) => {

  const psychologyCase =
    await prisma.case.findFirst({

      where: {
        topicId
      }

    });

  if (!psychologyCase) {
    throw new Error("Case not found");
  }

  return psychologyCase;
};


export const solveCase = async (
  caseId: string,
  selectedAnswer: string
) => {

  const psychologyCase =
    await prisma.case.findUnique({

      where: {
        id: caseId
      }

    });

  if (!psychologyCase) {
    throw new Error("Case not found");
  }

  const isCorrect =
    psychologyCase.correctConcept ===
    selectedAnswer;

  return {

    success: true,

    correct: isCorrect,

    explanation:
      `The correct concept is ${psychologyCase.correctConcept}`,

    correctAnswer:
      psychologyCase.correctConcept

  };

};
