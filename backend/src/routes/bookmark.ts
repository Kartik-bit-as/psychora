import express from "express";

import {
    addBookmark,
    fetchBookmarks,
    removeBookmark
} from "../controllers/bookmarkController";

import authMiddleware from "../middleware/auth";

const router = express.Router();


// Protected routes
router.post(
  "/",
  authMiddleware,
  addBookmark
);

router.get(
  "/",
  authMiddleware,
  fetchBookmarks
);

router.delete(
  "/",
  authMiddleware,
  removeBookmark
);

export default router;
