import express from "express";
import { getCrimeTypes } from "../controllers/crimeType.controller.js";

const router = express.Router();

router.get("/", getCrimeTypes);

export default router;
