import express from "express";
import {
  getCommentsByReport,
  addCommentToReport,
} from "../controllers/comments.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", getCommentsByReport);
router.post("/", protectRoute, addCommentToReport);
// router.delete("/:id", protectRoute, deleteComment);

export default router;
