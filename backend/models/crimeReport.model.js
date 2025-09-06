import mongoose from "mongoose";

const crimeReportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    crimeType: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Theft",
        "Assault",
        "Burglary",
        "Vandalism",
        "Fraud",
        "Drug Offense",
        "Homicide",
        "Cybercrime",
        "Domestic Violence",
        "Road Accident",
        "Other",
      ],
    },
    area: { type: String, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "under review", "resolved"],
      default: "pending",
    },

    // 🔽 New fields
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// ✅ Virtual fields for quick counts
crimeReportSchema.virtual("upvoteCount").get(function () {
  return this.upvotes.length;
});
crimeReportSchema.virtual("downvoteCount").get(function () {
  return this.downvotes.length;
});

const CrimeReport = mongoose.model("CrimeReport", crimeReportSchema);
export default CrimeReport;
