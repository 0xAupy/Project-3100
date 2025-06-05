import mongoose from "mongoose";

const crimeReportSchema = new mongoose.Schema(
  {
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
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // Null = reported anonymously
    },
    status: {
      type: String,
      enum: ["pending", "under review", "resolved"],
      default: "pending", // Optional: Admin can update status later
    },
  },
  { timestamps: true }
);

const CrimeReport = mongoose.model("CrimeReport", crimeReportSchema);
export default CrimeReport;
