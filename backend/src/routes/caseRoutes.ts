import express from "express";

import {
    fetchCase,
    submitCase
} from "../controllers/caseController";

const router = express.Router();

router.get("/", fetchCase);

router.post(
  "/solve",
  submitCase
);

export default router;
