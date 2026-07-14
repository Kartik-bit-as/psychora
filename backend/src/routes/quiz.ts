import express from "express";

import {
    fetchQuizByTopic,
    submitQuizAnswers
} from "../controllers/quizController";

const router = express.Router();

router.get(
  "/topic/:topicId",
  fetchQuizByTopic
);

router.post(
  "/submit",
  submitQuizAnswers
);

export default router;
