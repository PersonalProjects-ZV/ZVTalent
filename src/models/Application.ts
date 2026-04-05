import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  qualification: string;
  experience: string;
  resumeUrl: string;
  resumeText: string;
  aiScore: number | null;
  aiReason: string | null;
  aiStrengths: string[];
  aiWeaknesses: string[];
  aiMatchPercent: number | null;
  aiInterviewQuestions: string[];
  status: "applied" | "shortlisted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    qualification: { type: String, default: "Not specified" },
    experience: { type: String, default: "Not specified" },
    resumeUrl: { type: String, required: true },
    resumeText: { type: String, default: "" },
    aiScore: { type: Number, default: null },
    aiReason: { type: String, default: null },
    aiStrengths: [{ type: String }],
    aiWeaknesses: [{ type: String }],
    aiMatchPercent: { type: Number, default: null },
    aiInterviewQuestions: [{ type: String }],
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);
