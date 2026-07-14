import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

import prisma from "./config/prisma";

import authRoutes from "./routes/auth";
import bookmarkRoutes from "./routes/bookmark";
import caseRoutes from "./routes/caseRoutes";
import progressRoutes from "./routes/progress";
import quizRoutes from "./routes/quiz";
import topicRoutes from "./routes/topic";
import userRoutes from "./routes/user";

dotenv.config();

const app = express();


// ====================
// Middleware
// ====================

app.use(express.json());

app.use(
  cors()
);

app.use(
  helmet()
);


// ====================
// API Routes
// ====================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/progress",
  progressRoutes
);

app.use(
  "/api/topics",
  topicRoutes
);

app.use(
  "/api/quiz",
  quizRoutes
);

app.use(
  "/api/bookmarks",
  bookmarkRoutes
);

app.use(
  "/api/case",
  caseRoutes
);

// ====================
// Root Route
// ====================

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Psychora API running 🚀"
  });

});


// ====================
// Health Check
// ====================

app.get("/health", async (req, res) => {

  try {

    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      status: "healthy",
      database: "connected"
    });

  } catch {

    res.status(500).json({
      success: false,
      status: "error",
      database: "disconnected"
    });

  }

});


// ====================
// Start Server
// ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});
