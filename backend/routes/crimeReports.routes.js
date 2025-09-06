import express from "express";
import isAdmin from "../middleware/isAdmin.middleware.js";
import {
  getAllReports,
  getReportById,
  createReport,
  deleteReport,
  upvoteReport,
  downvoteReport,
} from "../controllers/crimeReport.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createReport);
router.get("/", getAllReports);
router.get("/:id", getReportById);
router.post("/:id/upvote", protectRoute, upvoteReport);
router.post("/:id/downvote", protectRoute, downvoteReport);
router.delete("/:id", protectRoute, isAdmin, deleteReport);

export default router;
