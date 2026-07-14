import express from "express";
import prisma from "../config/prisma";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  async (req: any, res) => {
    try {

      const topics =
        await prisma.topic.findMany({
          include: {
            progress: {
              where: {
                userId: req.user.userId
              },
              select: {
                completed: true
              }
            }
          }
        });

      const formattedTopics =
        topics.map(topic => ({
          ...topic,
          completed:
            topic.progress.length > 0
              ? topic.progress[0].completed
              : false
        }));

      return res.json({
        success: true,
        topics: formattedTopics
      });

    } catch (error) {

      console.log(
        "[TOPIC ERROR]",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Could not fetch topics"
      });
    }
  }
);


router.get("/:id", async (req, res) => {
  try {

    const topic =
      await prisma.topic.findUnique({
        where: {
          id: req.params.id
        }
      });

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found"
      });
    }

    return res.json({
      success: true,
      topic
    });

  } catch (error) {

    console.log(
      "[TOPIC FETCH ERROR]",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Could not fetch topic"
    });
  }
});

export default router;
