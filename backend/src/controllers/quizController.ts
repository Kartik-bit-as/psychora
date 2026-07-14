import { Request, Response } from "express";

import {
  getQuizByTopic,
  submitQuiz
} from "../services/quizService";


export const fetchQuizByTopic = async (
  req: Request,
  res: Response
) => {

  try {

    const topicId = req.params.topicId as string;

    const quiz = await getQuizByTopic(topicId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: quiz
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};


export const submitQuizAnswers = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      userId,
      quizId,
      answers
    } = req.body;

    const result = await submitQuiz({
  userId,
  quizId,
  answers
});

    return res.status(200).json({
      success: true,
      data: result
    });

   } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      success:false,
      message:error.message
    });

  }

};
