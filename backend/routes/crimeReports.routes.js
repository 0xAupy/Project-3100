import express from "express";
import {
  getAllReports,
  getReportById,
  createReport,
  // deleteReport,
  upvoteReport,
  downvoteReport,
} from "../controllers/crimeReport.controller.js";
import protectRoute from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllReports);
router.get("/:id", getReportById);

// Use multer middleware to handle file upload for "image" field
router.post("/", protectRoute, upload.single("image"), createReport);

router.post("/:id/upvote", protectRoute, upvoteReport);
router.post("/:id/downvote", protectRoute, downvoteReport);
// router.delete("/:id", protectRoute, deleteReport);

export default router;
