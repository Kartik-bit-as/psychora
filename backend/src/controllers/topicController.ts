import { Request, Response } from "express";
import { getTopicByMode } from "../services/topicService";

/**
 * Fetch topic by id and mode
 * Example:
 * GET /api/topics/123?mode=quiz
 */
export const fetchTopic = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const topicId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    // Validate topicId
    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: "Topic ID is required"
      });
    }

    // Handle query type safely
    const mode =
      typeof req.query.mode === "string"
        ? req.query.mode
        : "default";

    // Call service
    const topic = await getTopicByMode(
      topicId,
      mode
    );

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: topic
    });

  } catch (error) {
    console.error("Fetch topic error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
