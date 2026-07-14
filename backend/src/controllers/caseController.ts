import { Request, Response } from "express";

import {
    getCaseByTopic,
    solveCase
} from "../services/caseService";


export const fetchCase = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const topicId =
      typeof req.query.topicId === "string"
        ? req.query.topicId
        : "";

    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: "Topic ID is required"
      });
    }

    const result =
      await getCaseByTopic(topicId);

    return res.status(200).json({

      success: true,

      data: result

    });

  } catch (error) {

    console.error(
      "Fetch case error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Internal server error"

    });

  }

};



export const submitCase = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const {
      caseId,
      answer
    } = req.body;


    // -------- Validation --------

    if (!caseId) {

      return res.status(400).json({

        success: false,
        message: "Case ID required"

      });

    }

    if (!answer) {

      return res.status(400).json({

        success: false,
        message: "Answer required"

      });

    }


    // -------- Service call --------

    const result =
      await solveCase(
        caseId,
        answer
      );


    return res.status(200).json({

      success: true,

      data: result

    });

  } catch (error) {

    console.error(
      "Submit case error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Internal server error"

    });

  }

};
