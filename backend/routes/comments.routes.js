import express from "express";
import isAdmin from "../middleware/isAdmin.middleware.js";
import {
  getCommentsByReport,
  addCommentToReport,
  deleteComment,
} from "../controllers/comments.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", getCommentsByReport);
router.post("/", protectRoute, addCommentToReport);
router.delete("/:commentId", protectRoute, isAdmin, deleteComment);

export default router;
