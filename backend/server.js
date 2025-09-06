import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/mongodb.js";

import crimeReportsRoutes from "./routes/crimeReports.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import usersRoutes from "./routes/users.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/reports", crimeReportsRoutes);
app.use("/api/reports/:id/comments", commentsRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
