import express from "express";
import prisma from "../config/prisma";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post(
  "/save",
  authMiddleware,
  async (req: any, res) => {
    try {

      const { topicId, score } = req.body;

      const progress =
        await prisma.progress.upsert({

          where: {
            userId_topicId: {
              userId: req.user.userId,
              topicId
            }
          },

          update: {
            completed: true,
            score
          },

          create: {
            userId: req.user.userId,
            topicId,
            completed: true,
            score
          }
        });

      return res.json({
        success: true,
        progress
      });

    } catch (error) {

      console.log(
        "[PROGRESS ERROR]",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Could not save progress"
      });
    }
  }
);


router.get(
  "/my-progress",
  authMiddleware,
  async (req: any, res) => {

    try {

      const progress =
        await prisma.progress.findMany({
          where: {
            userId: req.user.userId
          },
          include: {
            topic: true
          }
        });

      const totalTopics =
  await prisma.topic.count();

const completedTopics =
  progress.filter(
    p => p.completed
  ).length;

const percentage =
  totalTopics === 0
    ? 0
    : Math.round(
        (completedTopics / totalTopics) * 100
      );

return res.json({
  success: true,
  progress,
  progressPercentage: percentage
});

    } catch (error) {

      console.log(
        "[FETCH PROGRESS ERROR]",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Could not fetch progress"
      });
    }
  }
);

export default router;
