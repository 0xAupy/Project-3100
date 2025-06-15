import express from "express";
import {
  getAllReports,
  getReportById,
  createReport,
  deleteReport,
} from "../controllers/crimeReport.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllReports);
router.get("/:id", getReportById);
router.post("/", protectRoute, createReport);
router.delete("/:id", protectRoute, deleteReport);

export default router;
