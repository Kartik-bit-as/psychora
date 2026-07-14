import { Response } from "express";
import {
    createBookmark,
    deleteBookmark,
    getBookmarks
} from "../services/bookmarkService";

import { AuthRequest } from "../middleware/auth";


// Helper function
const getAuthenticatedUserId = (
  req: AuthRequest
): string | null => {

  const user =
    req.user as {
      id?: string;
      userId?: string;
    };

  return user?.id || user?.userId || null;
};


// =========================
// CREATE BOOKMARK
// =========================
export const addBookmark = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {

  try {

    const userId =
      getAuthenticatedUserId(req);

    const { topicId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });
    }

    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: "topicId required"
      });
    }

    const bookmark =
      await createBookmark(
        userId,
        String(topicId)
      );

    return res.status(201).json({
      success: true,
      message: "Bookmark created successfully",
      data: bookmark
    });

  } catch (error: any) {

    console.error(
      "Create Bookmark Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to create bookmark"
    });

  }

};


// =========================
// GET BOOKMARKS
// =========================
export const fetchBookmarks = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {

  try {

    const userId =
      getAuthenticatedUserId(req);

    if (!userId) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });

    }

    const bookmarks =
      await getBookmarks(userId);

    return res.status(200).json({
      success: true,
      count: bookmarks.length,
      data: bookmarks
    });

  } catch (error: any) {

    console.error(
      "Fetch Bookmark Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to fetch bookmarks"
    });

  }

};


// =========================
// DELETE BOOKMARK
// =========================
export const removeBookmark = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {

  try {

    const userId =
      getAuthenticatedUserId(req);

    const { topicId } = req.body;

    if (!userId) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });

    }

    if (!topicId) {

      return res.status(400).json({
        success: false,
        message: "topicId required"
      });

    }

    await deleteBookmark(
      userId,
      String(topicId)
    );

    return res.status(200).json({
      success: true,
      message:
        "Bookmark removed successfully"
    });

  } catch (error: any) {

    console.error(
      "Delete Bookmark Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to remove bookmark"
    });

  }

};
