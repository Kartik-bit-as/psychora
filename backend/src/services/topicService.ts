import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTopicByMode = async (
  topicId: string,
  mode: string
) => {
  try {

    const topic = await prisma.topic.findUnique({
      where: {
        id: topicId
      },
      include: {
        quizzes: {
          include: {
            questions: {
              include: {
                options: true
              }
            }
          }
        },
        module: true
      }
    });

    if (!topic) {
      throw new Error("Topic not found");
    }

    return {
      ...topic,
      mode
    };

  } catch (error) {
    console.error(
      "Topic service error:",
      error
    );

    throw error;
  }
};
