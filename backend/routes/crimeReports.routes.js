import express from "express";
import {
  getAllReports,
  getReportById,
  createReport,
  searchReports,
  deleteReport,
} from "../controllers/crimeReport.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllReports);
router.get("/search", searchReports);
router.get("/:id", getReportById);
router.post("/", protectRoute, createReport); // Protect if you want logged-in users only, or remove protectRoute for anonymous allowed
router.delete("/:id", protectRoute, deleteReport);

export default router;
