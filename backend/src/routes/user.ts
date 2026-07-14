import express from "express";
import prisma from "../config/prisma";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/profile", authMiddleware, async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    res.json({
      success: true,
      user
    });

  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile"
    });
  }
});

export default router;
