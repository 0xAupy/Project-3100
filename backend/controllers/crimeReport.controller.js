import CrimeReport from "../models/crimeReport.model.js";

// GET all reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await CrimeReport.find().populate("userId", "name email");
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET report by ID
export const getReportById = async (req, res) => {
  try {
    const report = await CrimeReport.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create new report
export const createReport = async (req, res) => {
  try {
    const { title, crimeType, area, location, description } = req.body;
    const userId = req.user ? req.user._id : null;

    const newReport = new CrimeReport({
      title,
      crimeType,
      area,
      location,
      description,
      userId,
      image: req.file ? `/uploads/${req.file.filename}` : null, // ✅ save path
    });

    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a report by ID
// export const deleteReport = async (req, res) => {
//   try {
//     const report = await CrimeReport.findById(req.params.id);
//     if (!report) {
//       return res.status(404).json({ message: "Report not found" });
//     }

//     // Check if the user is the owner of the report or an admin
//     if (
//       report.userId.toString() !== req.user._id.toString() &&
//       req.user.role !== "admin"
//     ) {
//       return res.status(403).json({
//         message: "Not authorized to delete this report",
//       });
//     }

//     // Delete the report
//     await CrimeReport.findByIdAndDelete(req.params.id);

//     res.json({ message: "Report deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// POST /reports/:id/upvote
export const upvoteReport = async (req, res) => {
  try {
    const report = await CrimeReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    // Remove from downvotes if present
    report.downvotes = report.downvotes.filter(
      (uid) => uid.toString() !== req.user._id.toString()
    );

    // Toggle upvote (if already upvoted, remove it)
    if (report.upvotes.includes(req.user._id)) {
      report.upvotes = report.upvotes.filter(
        (uid) => uid.toString() !== req.user._id.toString()
      );
    } else {
      report.upvotes.push(req.user._id);
    }

    await report.save();
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /reports/:id/downvote
export const downvoteReport = async (req, res) => {
  try {
    const report = await CrimeReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    // Remove from upvotes if present
    report.upvotes = report.upvotes.filter(
      (uid) => uid.toString() !== req.user._id.toString()
    );

    // Toggle downvote (if already downvoted, remove it)
    if (report.downvotes.includes(req.user._id)) {
      report.downvotes = report.downvotes.filter(
        (uid) => uid.toString() !== req.user._id.toString()
      );
    } else {
      report.downvotes.push(req.user._id);
    }

    await report.save();
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
